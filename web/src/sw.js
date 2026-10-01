// The build injects this release's complete resource manifest after Astro emits its assets.
const RELEASE = "__HG_RELEASE__";
const DATA_VERSION = "__HG_DATA_VERSION__";
const PRECACHE = self.__WB_MANIFEST;
const BASE = new URL(self.registration.scope);
const PREFIX = `hg:${encodeURIComponent(BASE.href)}:`;
const CACHE = `${PREFIX}${RELEASE}`;
const READY = new URL(`__offline_ready__/${RELEASE}`, BASE).href;
const urls = new Set(PRECACHE.map((entry) => new URL(entry.url, BASE).href));
const resources = new Map(PRECACHE.map((entry) => [new URL(entry.url, BASE).href, entry]));
const clientReleases = new Map();
const FORCE_UPDATE = new URL(`__offline_force_update__/${RELEASE}`, BASE).href;

async function cleanUnusedReleases() {
  const windows = (await self.clients.matchAll({ type: "window", includeUncontrolled: true })).filter((client) => client.url.startsWith(BASE.href));
  if (windows.some((client) => clientReleases.get(client.id) !== RELEASE)) return;
  const names = (await caches.keys()).filter((name) => name.startsWith(PREFIX));
  const previous = names.filter((name) => name !== CACHE).slice(-1);
  await Promise.all(names.filter((name) => name !== CACHE && !previous.includes(name)).map((name) => caches.delete(name)));
}

async function downloadSnapshot(missingOnly = false) {
    const cache = await caches.open(CACHE);
    await cache.delete(READY);
    let cursor = 0;
    const failures = [];
    // Limit parallel downloads; wait for every writer before discarding a failed install.
    await Promise.all(Array.from({ length: 6 }, async () => {
      while (cursor < PRECACHE.length) {
        const entry = PRECACHE[cursor++];
        try {
          const url = new URL(entry.url, BASE).href;
          if (missingOnly && await cache.match(url)) continue;
          const response = await fetch(url, { cache: "reload", integrity: entry.integrity });
          if (!response.ok || response.type === "opaque") throw new Error(`HTTP ${response.status}: ${url}`);
          await cache.put(url, response);
        } catch (error) {
          failures.push(String(error));
        }
      }
    }));
    if (failures.length) {
      if (!missingOnly) await caches.delete(CACHE);
      throw new Error(`Offline installation failed: ${failures[0]}`);
    }
    await cache.put(READY, new Response(JSON.stringify({ release: RELEASE, dataVersion: DATA_VERSION, ready: true })));
}

self.addEventListener("install", (event) => {
  event.waitUntil(downloadSnapshot());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // A requested immediate update can still have old documents alive. Preserve their assets.
    await cleanUnusedReleases();
    const cache = await caches.open(CACHE);
    if (await cache.match(FORCE_UPDATE)) {
      await cache.delete(FORCE_UPDATE);
      // Explicit updates reload every tab, including the initially uncontrolled document.
      await self.clients.claim();
    }
    // No unconditional claim: an already running document keeps its current controller.
  })());
});

async function cachedResource(url) {
  const current = await (await caches.open(CACHE)).match(url);
  if (current) return current;
  // Only content-addressed assets may be served from older releases.
  if (/\/assets\/data\/[a-f0-9]{64}\./.test(url) || /\/_astro\//.test(url) || /\/releases\/[a-f0-9]{64}\.json$/.test(url)) {
    const names = (await caches.keys()).filter((name) => name.startsWith(PREFIX) && name !== CACHE);
    for (const name of names) {
      const response = await (await caches.open(name)).match(url);
      if (response) return response;
    }
  }
  return undefined;
}

function documentURL(url) {
  if (url.pathname.endsWith(".html")) return new URL(url.pathname, BASE).href;
  return new URL(`${url.pathname.replace(/\/$/, "")}/index.html`, BASE).href;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== BASE.origin || !url.pathname.startsWith(BASE.pathname)) return;
  if (url.pathname === new URL("sw.js", BASE).pathname) return;
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      const relative = url.pathname.slice(BASE.pathname.length);
      const key = relative.startsWith("term/") ? new URL("term/index.html", BASE).href : documentURL(url);
      const cached = await cachedResource(key);
      if (cached) return cached;
      try {
        return await fetch(request);
      } catch {
        return (await cachedResource(new URL("404.html", BASE).href)) ?? new Response("离线页面尚未下载", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
      }
    })());
    return;
  }
  // Data and executable resources never receive an HTML navigation fallback.
  if (urls.has(url.href) || /\/assets\/data\/|\/_astro\/|\/releases\//.test(url.pathname)) {
    event.respondWith((async () => {
      const cached = await cachedResource(url.href);
      if (cached) return cached;
      const entry = resources.get(url.href);
      const response = await fetch(request, { integrity: entry?.integrity });
      if (response.ok && response.headers.get("Content-Type")?.includes("text/html")) throw new Error("Expected a data or executable resource, received HTML");
      if (response.ok && urls.has(url.href)) await (await caches.open(CACHE)).put(url.href, response.clone());
      return response;
    })());
  }
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "HG_REPAIR") {
    event.waitUntil((async () => {
      try {
        await downloadSnapshot(true);
        event.ports[0]?.postMessage({ ready: true });
      } catch (error) {
        event.ports[0]?.postMessage({ ready: false, error: String(error) });
      }
    })());
    return;
  }
  if (event.data?.type === "HG_SKIP_WAITING") {
    event.waitUntil((async () => {
      await (await caches.open(CACHE)).put(FORCE_UPDATE, new Response("requested"));
      await self.skipWaiting();
    })());
    return;
  }
  if (event.data?.type === "HG_CLIENT_READY" && event.data.release === RELEASE && event.data.dataVersion === DATA_VERSION && event.source?.id) {
    clientReleases.set(event.source.id, RELEASE);
    event.waitUntil(cleanUnusedReleases());
    return;
  }
  if (event.data?.type !== "HG_STATUS") return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const marker = await cache.match(READY);
    let ready = !!marker;
    if (ready) {
      const keys = new Set((await cache.keys()).map((request) => request.url));
      ready = [...urls].every((url) => keys.has(url));
    }
    event.ports[0]?.postMessage({ release: RELEASE, dataVersion: DATA_VERSION, ready, assets: PRECACHE.length });
  })());
});
