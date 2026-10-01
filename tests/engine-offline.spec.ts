import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";

const base = (process.env.HG_TEST_BASE || "/").replace(/\/?$/, "/");
const source = readFileSync(path.resolve("web/src/generated/dataset.ts"), "utf8");
const version = source.match(/DATA_VERSION\s*=\s*["']([a-f0-9]{64})["']/)![1];
const manifest = JSON.parse(readFileSync(path.resolve(`web/dist/releases/${version}.json`), "utf8"));
const graphURLs = new Set(["graph/ids.json", "graph/nodes.json", "graph/adjacency.bin", "graph/reverse.json", "graph/edges.json"].map((name) => base + manifest.assets[name].url));

async function instrument(page: Page, forceWasm = true) {
  await page.addInitScript((forceWasm) => {
    const state = window as any;
    state.__hgWorkers = [];
    state.__hgResponses = [];
    const Native = window.Worker;
    window.Worker = class extends Native {
      constructor(url: string | URL, options?: WorkerOptions) {
        super(url, options);
        state.__hgWorkers.push(this);
        this.addEventListener("message", (event) => state.__hgResponses.push(event.data));
      }
      postMessage(message: any, transfer: Transferable[] = []) {
        if (forceWasm && message.op === "init") message = { ...message, payload: { ...message.payload, backend: "wasm" } };
        super.postMessage(message, transfer);
      }
    };
  }, forceWasm);
}
async function diagnostics(page: Page) {
  const requestId = Math.floor(Math.random() * 1_000_000) + 10_000_000;
  await page.evaluate(({ requestId, version }) => {
    (window as any).__hgWorkers[0].postMessage({ requestId, dataVersion: version, op: "diagnostics" });
  }, { requestId, version });
  await expect.poll(() => page.evaluate((id) => (window as any).__hgResponses.find((response: any) => response.requestId === id), requestId)).toBeTruthy();
  return page.evaluate((id) => (window as any).__hgResponses.find((response: any) => response.requestId === id).value, requestId);
}
async function find(page: Page, query: string) {
  await page.locator("#hg-search").click();
  await page.locator("#hg-q").fill(query);
  await expect(page.locator("button[data-search-result='term'][data-search-id='rust']")).toBeVisible();
}
async function ready(page: Page) {
  await expect.poll(() => page.evaluate(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration?.active) return false;
    const channel = new MessageChannel();
    return new Promise<boolean>((resolve) => {
      const timeout = setTimeout(() => { channel.port1.close(); resolve(false); }, 2000);
      channel.port1.onmessage = (event) => { clearTimeout(timeout); channel.port1.close(); resolve(event.data.ready); };
      registration.active!.postMessage({ type: "HG_STATUS" }, [channel.port2]);
    });
  }), { timeout: 45000 }).toBe(true);
}

test.beforeEach(async ({ request }) => { await request.post("/__test__/reset"); });

test("configured backend runs in a Worker and loads WASM only when enabled", async ({ browser }) => {
  const context = await browser.newContext({ serviceWorkers: "block" });
  const page = await context.newPage();
  await instrument(page, false);
  const requests: string[] = [];
  page.on("request", (request) => requests.push(new URL(request.url()).pathname));
  await page.goto(base);
  await find(page, "rust");
  const wasmEnabled = process.env.PUBLIC_ENGINE_BACKEND === "wasm";
  expect((await diagnostics(page)).backend).toBe(wasmEnabled ? "wasm" : "js");
  expect(requests.some((url) => url.endsWith(".wasm"))).toBe(wasmEnabled);
  expect(requests.some((url) => url.includes("graph.worker-"))).toBe(true);
  await context.close();
});

test("real WASM search routes candidates without loading the graph", async ({ browser }) => {
  const context = await browser.newContext({ serviceWorkers: "block" });
  const page = await context.newPage();
  await instrument(page);
  const requests: string[] = [];
  const errors: string[] = [];
  page.on("request", (request) => requests.push(new URL(request.url()).pathname));
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base);
  await find(page, "Rust");
  expect((await diagnostics(page)).backend).toBe("wasm");
  expect(requests.some((url) => graphURLs.has(url))).toBe(false);
  await page.locator("button[data-search-result='term'][data-search-id='rust']").click();
  await expect(page.locator("main")).toContainText("Rust");
  await expect.poll(() => requests.includes(base + manifest.assets["graph/adjacency.bin"].url)).toBe(true);
  expect(errors).toEqual([]);
  await context.close();
});

test("failed WASM initialization preserves search and graph through JS", async ({ browser }) => {
  const context = await browser.newContext({ serviceWorkers: "block" });
  await context.route(/\.wasm(?:\?|$)/, (route) => route.abort());
  const page = await context.newPage();
  await instrument(page);
  await page.goto(base);
  await find(page, "rust");
  expect((await diagnostics(page)).backend).toBe("js");
  await page.locator("button[data-search-result='term'][data-search-id='rust']").click();
  await expect(page.locator("main")).toContainText("Rust");
  await expect(page.locator(`main a[href='${base}term/llvm']`).first()).toBeVisible();
  await context.close();
});

test("complete snapshot supports fresh term navigation, search and category pages offline", async ({ page, context }) => {
  await instrument(page);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base);
  await ready(page);
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
  await context.setOffline(true);
  await page.goto(`${base}term/langgraph`);
  await expect(page.locator("main")).toContainText("LangGraph");
  await expect(page.locator("main")).toContainText("状态");
  expect((await diagnostics(page)).backend).toBe("wasm");
  await find(page, "Rust");
  await page.locator("button[data-search-result='term'][data-search-id='rust']").click();
  await expect(page.locator("main")).toContainText("Rust");
  await page.goto(`${base}cat/language`);
  await expect(page.locator("main")).toContainText("Rust");
  await page.goto(`${base}eco/python-ecosystem`);
  await expect(page.locator("main")).toContainText("Python");
  await page.locator("#hg-info").click();
  await expect(page.locator("[data-offline-status]")).toContainText("离线可用");
  expect(errors).toEqual([]);
});

test("waiting updates preserve two old tabs and refresh both on explicit activation", async ({ page, context, request }) => {
  await page.goto(base);
  await ready(page);
  // The initial document is still uncontrolled; explicit activation must refresh it too.
  expect(await page.evaluate(() => navigator.serviceWorker.controller)).toBeNull();
  const second = await context.newPage();
  await second.goto(`${base}term/rust`);
  await expect(second.locator("main")).toContainText("Rust");
  const oldScript = await page.evaluate(async () => (await navigator.serviceWorker.getRegistration())!.active!.scriptURL);
  await request.post("/__test__/update");
  await page.evaluate(async () => { await (await navigator.serviceWorker.getRegistration())!.update(); });
  await expect.poll(() => page.evaluate(async () => !!(await navigator.serviceWorker.getRegistration())?.waiting)).toBe(true);
  expect(await page.evaluate(async () => (await navigator.serviceWorker.getRegistration())!.active!.scriptURL)).toBe(oldScript);
  await second.locator("#hg-search").click();
  await second.locator("#hg-q").fill("C++");
  await expect(second.locator("button[data-search-result='term'][data-search-id='cpp']")).toBeVisible();
  const firstNavigation = page.waitForEvent("framenavigated", (frame) => frame === page.mainFrame());
  const secondNavigation = second.waitForEvent("framenavigated", (frame) => frame === second.mainFrame());
  await page.evaluate(async () => (await navigator.serviceWorker.getRegistration())!.waiting!.postMessage({ type: "HG_SKIP_WAITING" }));
  await Promise.all([firstNavigation, secondNavigation]);
  await ready(page);
  await expect.poll(() => page.evaluate(async () => {
    const names = await caches.keys();
    return names.some((name) => name.endsWith("f".repeat(64)));
  })).toBe(true);
  await expect(second.locator("main")).toContainText("Rust");
});

test("a corrupt update is discarded while the complete previous snapshot stays usable offline", async ({ page, context, request }) => {
  await page.goto(base);
  await ready(page);
  await page.reload();
  const oldCacheNames = await page.evaluate(() => caches.keys());
  await request.post("/__test__/broken-update");
  const state = await page.evaluate(async () => {
    const registration = (await navigator.serviceWorker.getRegistration())!;
    const finished = new Promise<string>((resolve) => {
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing!;
        worker.addEventListener("statechange", () => {
          if (worker.state === "redundant" || worker.state === "installed") resolve(worker.state);
        });
      }, { once: true });
    });
    await registration.update();
    return finished;
  });
  expect(state).toBe("redundant");
  expect(await page.evaluate(() => caches.keys())).toEqual(oldCacheNames);
  await ready(page);
  await context.setOffline(true);
  await page.goto(`${base}term/langgraph`);
  await expect(page.locator("main")).toContainText("LangGraph");
  await find(page, "rust");
});

test("an evicted resource removes the ready status and retry repairs the complete snapshot", async ({ page, context }) => {
  await page.goto(base);
  await ready(page);
  await page.reload();
  await page.evaluate(async (resource) => {
    for (const name of await caches.keys()) {
      if (name.startsWith("hg:")) await (await caches.open(name)).delete(new URL(resource, location.origin).href);
    }
    document.dispatchEvent(new Event("visibilitychange"));
  }, base + manifest.assets["graph/adjacency.bin"].url);
  await page.locator("#hg-info").click();
  await expect(page.locator("[data-offline-status]")).toContainText("下载未完成");
  await page.locator("[data-offline-status] button", { hasText: "重试" }).click();
  await expect(page.locator("[data-offline-status]")).toContainText("离线可用");
  await context.setOffline(true);
  await page.goto(`${base}term/rust`);
  await expect(page.locator(`main a[href='${base}term/llvm']`).first()).toBeVisible();
});

test("blocked Worker construction uses the same JS engine inline", async ({ browser }) => {
  const context = await browser.newContext({ serviceWorkers: "block" });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.Worker = class { constructor() { throw new Error("Worker unavailable"); } } as any;
  });
  await page.goto(base);
  await find(page, "rust");
  await page.locator("button[data-search-result='term'][data-search-id='rust']").click();
  await expect(page.locator(`main a[href='${base}term/llvm']`).first()).toBeVisible();
  await context.close();
});
