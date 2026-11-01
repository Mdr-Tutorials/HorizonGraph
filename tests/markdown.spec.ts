import { test, expect } from "@playwright/test";

const base = (process.env.HG_TEST_BASE || "/").replace(/\/?$/, "/");

test("renders a term description and preserves external and internal links", async ({ page, request }) => {
  await request.post("/__test__/reset");
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`${base}term/trident`);
  const description = page.locator(".term-description");
  await expect(description.getByRole("heading", { name: "参考" })).toBeVisible();
  const reference = description.getByRole("link", { name: "Microsoft Learn：MSHTML 体系参考" });
  await expect(reference).toHaveAttribute("href", "https://learn.microsoft.com/previous-versions/windows/internet-explorer/");
  await expect(description.locator("ul > li")).toHaveCount(1);

  // An external URL containing /term/ must retain normal browser navigation.
  const externalIntercepted = await page.evaluate(() => {
    const a = document.createElement("a");
    a.href = "https://example.com/term/rust";
    document.body.append(a);
    let intercepted = false;
    document.addEventListener("click", (event) => {
      intercepted = event.defaultPrevented;
      event.preventDefault();
    }, { once: true });
    a.click();
    a.remove();
    return intercepted;
  });
  expect(externalIntercepted).toBe(false);

  await page.evaluate(() => {
    const a = document.createElement("a");
    a.href = "http://[";
    document.body.append(a);
    document.addEventListener("click", (event) => event.preventDefault(), { once: true });
    a.click();
    a.remove();
  });
  expect(errors).toEqual([]);

  await description.evaluate((element, url) => {
    const a = document.createElement("a");
    a.href = url;
    a.textContent = "词条链接";
    element.append(a);
    (window as any).__markdownNavigation = true;
  }, `${base}term/rust`);
  await description.getByRole("link", { name: "词条链接" }).click();
  await expect(page).toHaveURL(new RegExp(`${base}term/rust$`));
  await expect(page.locator("main h1")).toContainText("Rust");
  expect(await page.evaluate(() => (window as any).__markdownNavigation)).toBe(true);
});
