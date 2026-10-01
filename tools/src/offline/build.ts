import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { injectManifest } from "workbox-build";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const SITE = path.join(ROOT, "web/dist");
const base = (process.env.PUBLIC_BASE_PATH || "/").replace(/\/?$/, "/");
const generated = readFileSync(path.join(ROOT, "web/src/generated/dataset.ts"), "utf8");
const dataVersion = generated.match(/DATA_VERSION\s*=\s*["']([a-f0-9]{64})["']/)?.[1];
if (!dataVersion) throw new Error("Build data before generating the offline release.");
if (!existsSync(path.join(SITE, "term/index.html"))) throw new Error("The offline term shell is missing.");

function files(dir: string): string[] {
  return readdirSync(dir).sort().flatMap((name) => {
    const file = path.join(dir, name);
    return statSync(file).isDirectory() ? files(file) : [file];
  });
}
const sha = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");
const dataManifest = JSON.parse(readFileSync(path.join(SITE, "releases", `${dataVersion}.json`), "utf8"));
for (const [logical, asset] of Object.entries(dataManifest.assets) as [string, { url: string; sha256: string; bytes: number }][]) {
  const file = path.resolve(SITE, asset.url);
  if (!file.startsWith(SITE + path.sep) || !existsSync(file)) throw new Error(`Missing published asset: ${logical}`);
  const bytes = readFileSync(file);
  if (bytes.length !== asset.bytes || sha(bytes) !== asset.sha256) throw new Error(`Corrupt published asset: ${logical}`);
}
const dataFiles = new Set<string>(Object.values(dataManifest.assets).map((asset: any) => asset.url));
dataFiles.add(`releases/${dataVersion}.json`);
const inventory = files(SITE).map((file) => ({ file, relative: path.relative(SITE, file).replaceAll("\\", "/") }))
  .filter(({ relative }) => dataFiles.has(relative) || /\.(html|js|css|wasm|woff2?|svg|png|ico)$/.test(relative))
  .filter(({ relative }) => !relative.startsWith(".cache/") && relative !== "sw.js" && !relative.startsWith("offline/"))
  .map(({ file, relative }) => {
    const bytes = readFileSync(file);
    const digest = sha(bytes);
    return { relative, sha256: digest, bytes: bytes.length, integrity: `sha256-${Buffer.from(digest, "hex").toString("base64")}` };
  }).sort((a, b) => a.relative.localeCompare(b.relative, "en"));
const template = readFileSync(path.join(ROOT, "web/src/sw.js"), "utf8");
const release = sha(Buffer.from(JSON.stringify({ base, dataVersion, worker: sha(Buffer.from(template)), resources: inventory.map(({ relative, sha256 }) => [relative, sha256]) })));
const cacheDir = path.join(ROOT, "dist/.cache");
mkdirSync(cacheDir, { recursive: true });
const source = path.join(cacheDir, "sw-source.js");
writeFileSync(source, template.replace("__HG_RELEASE__", release).replace("__HG_DATA_VERSION__", dataVersion));
const byPath = new Map(inventory.map((entry) => [entry.relative, entry]));
const result = await injectManifest({
  swSrc: source,
  swDest: path.join(SITE, "sw.js"),
  globDirectory: SITE,
  globPatterns: inventory.map((entry) => entry.relative),
  maximumFileSizeToCacheInBytes: 64 * 1024 * 1024,
  manifestTransforms: [async (entries) => ({
    size: inventory.reduce((sum, entry) => sum + entry.bytes, 0),
    manifest: entries.map((entry) => {
      const resource = byPath.get(entry.url);
      if (!resource) throw new Error(`Unlisted offline resource: ${entry.url}`);
      return { url: resource.relative, revision: resource.sha256, integrity: resource.integrity, size: resource.bytes };
    }),
    warnings: [],
  })],
});
if (result.warnings.length) throw new Error(result.warnings.join("\n"));
writeFileSync(path.join(SITE, "offline-release.json"), JSON.stringify({ format: 1, release, dataVersion, base, assets: inventory.length, bytes: inventory.reduce((sum, item) => sum + item.bytes, 0) }) + "\n");
console.log(`Offline release ${release.slice(0, 12)} · ${result.count} resources · ${result.size} bytes · base ${base}`);
