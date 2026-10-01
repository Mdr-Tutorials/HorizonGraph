import http from "node:http";
import { readFileSync, existsSync, statSync, cpSync, mkdirSync, mkdtempSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scratch = path.join(root, "scratch");
mkdirSync(scratch, { recursive: true });
const site = mkdtempSync(path.join(scratch, "browser-site-"));
cpSync(path.join(root, "web/dist"), site, { recursive: true });
const base = (process.env.HG_TEST_BASE || "/").replace(/\/?$/, "/");
const originalSW = readFileSync(path.join(site, "sw.js"), "utf8");
let updated = false;
let corrupt = false;
const generated = readFileSync(path.join(root, "web/src/generated/dataset.ts"), "utf8");
const version = generated.match(/DATA_VERSION\s*=\s*["']([a-f0-9]{64})["']/)[1];
const manifest = JSON.parse(readFileSync(path.join(site, "releases", `${version}.json`), "utf8"));
const corruptPath = manifest.assets["graph/adjacency.bin"].url;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".wasm": "application/wasm", ".woff2": "font/woff2", ".bin": "application/octet-stream", ".svg": "image/svg+xml" };
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  if (url.pathname === "/__test__/health") { response.end("ready"); return; }
  if (url.pathname === "/__test__/update" && request.method === "POST") { updated = true; corrupt = false; response.end("updated"); return; }
  if (url.pathname === "/__test__/broken-update" && request.method === "POST") { updated = true; corrupt = true; response.end("broken"); return; }
  if (url.pathname === "/__test__/reset" && request.method === "POST") { updated = false; corrupt = false; response.end("reset"); return; }
  if (!url.pathname.startsWith(base)) { response.writeHead(404); response.end(); return; }
  let relative;
  try { relative = decodeURIComponent(url.pathname.slice(base.length)); } catch { response.writeHead(400); response.end(); return; }
  let file = path.resolve(site, relative || "index.html");
  if (file !== site && !file.startsWith(site + path.sep)) { response.writeHead(403); response.end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!existsSync(file)) {
    file = path.join(site, "404.html");
    response.statusCode = 404;
  }
  response.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
  response.setHeader("Cache-Control", "no-store");
  if (corrupt && relative === corruptPath) { response.end("corrupt snapshot resource"); return; }
  if (relative === "sw.js") {
    // Change only the release id; resource hashes stay immutable during this lifecycle test.
    response.end(updated ? originalSW.replace(/const RELEASE = "([a-f0-9]{64})"/, 'const RELEASE = "' + "f".repeat(64) + '"') : originalSW);
  } else response.end(readFileSync(file));
});
server.listen(4175, "127.0.0.1", () => console.log(`Browser fixture serving ${base}`));
