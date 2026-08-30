// 将 tools/popular-draft.json 的 popular 写入 data/nodes/**(仅写 >0 的值)
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const draft = JSON.parse(readFileSync(path.join(ROOT, "tools", "popular-draft.json"), "utf8"));
const TODAY = "2026-08-30";

let written = 0, checked = 0;

function* jsonFiles(d: string): Generator<string> {
  for (const f of readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) yield* jsonFiles(p);
    else if (f.name.endsWith(".json")) yield p;
  }
}

for (const file of jsonFiles(path.join(ROOT, "data", "nodes"))) {
  const raw = readFileSync(file, "utf8");
  const j = JSON.parse(raw);
  checked++;
  const hit = draft[j.id];
  if (!hit || !hit.popular) continue;
  j.popular = hit.popular;
  j.last_reviewed = TODAY;
  // 保持键序:popular 插在 importance 之后(若存在),否则追加尾部
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(j)) {
    out[k] = v;
    if (k === "importance") out.popular = j.popular;
  }
  if (out.popular === undefined) out.popular = j.popular;
  writeFileSync(file, JSON.stringify(out, null, 2) + "\n", "utf8");
  written++;
}
console.log(`扫描 ${checked} 个节点文件,写入 ${written} 个 popular 值`);