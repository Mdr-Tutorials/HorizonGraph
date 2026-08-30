import { readdirSync, readFileSync, existsSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

// 派生平面构建：前置 pnpm validate 通过。全部产物确定性排序，可重复构建。
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const CONTRACTS = path.join(ROOT, "contracts");
const DATA = path.join(ROOT, "data");
const DIST = path.join(ROOT, "dist");

const J = (p: string): any => JSON.parse(readFileSync(p, "utf8"));
const sha1 = (s: string | Buffer) => createHash("sha1").update(s).digest("hex");

const typesJ = J(path.join(CONTRACTS, "types.json"));
const relationsJ = J(path.join(CONTRACTS, "relations.json"));
const ontologyJ = J(path.join(CONTRACTS, "ontology.json"));
const ecoJ = J(path.join(CONTRACTS, "vocab", "ecosystems.json"));

function* walk(dir: string, ext = ".json"): Generator<string> {
  if (!existsSync(dir)) return;
  for (const f of readdirSync(dir).sort()) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) yield* walk(p, ext);
    else if (f.endsWith(ext)) yield p;
  }
}

// ---------- 增量：输入指纹（契约 + 数据 + 构建源码） ----------
const inputs: Record<string, string> = {};
for (const f of [...walk(CONTRACTS), ...walk(path.join(DATA, "nodes")), ...walk(path.join(ROOT, "tools", "src"), ".ts")])
  inputs[path.relative(ROOT, f).replaceAll("\\", "/")] = sha1(readFileSync(f, "utf8"));

const statePath = path.join(DIST, ".cache", "state.json");
if (
  existsSync(statePath) &&
  existsSync(path.join(DIST, "graph", "edges.json")) &&
  existsSync(path.join(DIST, "fonts", "harmony-sc-400.woff2")) &&
  JSON.stringify(J(statePath).inputs) === JSON.stringify(inputs)
) {
  console.log("输入无变化，跳过构建");
  process.exit(0);
}

const write = (rel: string, data: unknown) => {
  const p = path.join(DIST, rel);
  mkdirSync(path.dirname(p), { recursive: true });
  const s = typeof data === "string" ? data : JSON.stringify(data);
  writeFileSync(p, s.endsWith("\n") ? s : s + "\n");
};

// ---------- 加载与索引 ----------
const onto: any[] = ontologyJ.nodes;
const dataNodes: any[] = [];
for (const f of walk(path.join(DATA, "nodes"))) dataNodes.push(J(f));
dataNodes.sort((a, b) => (a.id < b.id ? -1 : 1));
const ontoMap = new Map(onto.map((o) => [o.id, o]));
const nodeMap = new Map(dataNodes.map((n) => [n.id, n]));

const allIds = [...ontoMap.keys(), ...nodeMap.keys()].sort();
const idx = new Map(allIds.map((id, i) => [id, i]));
const relKeys = Object.keys(relationsJ.relations).sort();
const relIdx = new Map(relKeys.map((k, i) => [k, i]));

// ---------- L0 记录（与 ids 对齐）：[name, abbr, type, summary, importance, status, first, ecosystems, kind] ----------
const records = allIds.map((id) => {
  const o = ontoMap.get(id);
  if (o) return [o.name, "", "meta_concept", o.summary, o.importance ?? 0, "", "", [], 0, "", o.aliases ?? [], "", "", "", 0];
  const n = nodeMap.get(id)!;
  return [n.name, n.abbreviation ?? "", n.type, n.summary, n.importance, n.status, n.first_released ?? "", n.ecosystems ?? [], 1, n.abstraction_level ?? "", n.aliases ?? [], n.official_site ?? "", n.display_primary ?? "", n.display_secondary ?? "", n.popular ?? 0];
});

// ---------- 边表：[src_idx, rel_idx, tgt_idx, ctx_idx|-1]，上下文入池 ----------
const ctxPool = new Map<string, number>();
const ctxIdx = (c?: string) => {
  if (!c) return -1;
  if (!ctxPool.has(c)) ctxPool.set(c, ctxPool.size);
  return ctxPool.get(c)!;
};
const edges: number[][] = [];
for (const n of dataNodes)
  for (const e of n.relations ?? [])
    edges.push([idx.get(n.id)!, relIdx.get(e.relation_type)!, idx.get(e.target_id)!, ctxIdx(e.context)]);
for (const o of onto)
  for (const e of o.relations ?? [])
    edges.push([idx.get(o.id)!, relIdx.get(e.relation_type)!, idx.get(e.target_id)!, ctxIdx(e.context)]);
edges.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3]);
const contexts = [...ctxPool.entries()].sort((a, b) => a[1] - b[1]).map(([c]) => c);

// ---------- 反向索引：{ tgt_idx: [[rel_idx, src_idx, ctx_idx], ...] } ----------
const reverseRaw: Record<string, number[][]> = {};
for (const [s, r, t, c] of edges) (reverseRaw[String(t)] ??= []).push([r, s, c]);
const reverse: Record<string, number[][]> = {};
for (const k of Object.keys(reverseRaw).sort()) {
  reverse[k] = reverseRaw[k].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

// ---------- version_of 折叠（搜索用）；版本节点不进分类实例与生态成员列表 ----------
const vOf = new Map<number, number>();
for (const n of dataNodes)
  for (const e of n.relations ?? [])
    if (e.relation_type === "version_of") vOf.set(idx.get(n.id)!, idx.get(e.target_id)!);
const isVersion = (i: number) => vOf.has(i);

// ---------- 搜索分片：[idx, id, name, abbr, aliases, type, importance, version_parent_idx] ----------
const SHARDS = 16;
const shards: any[][] = Array.from({ length: SHARDS }, () => []);
for (const n of dataNodes) {
  const i = idx.get(n.id)!;
  shards[parseInt(sha1(n.id)[0], 16)].push([
    i, n.id, n.name, n.abbreviation ?? "", n.aliases ?? [], n.type, n.importance, vOf.get(i) ?? -1, n.popular ?? 0,
  ]);
}
for (const s of shards) s.sort((a, b) => (a[1] < b[1] ? -1 : 1));

// ---------- 分类树与实例 ----------
const effMemo = new Map<string, string[]>();
const eff = (id: string): string[] => {
  if (effMemo.has(id)) return effMemo.get(id)!;
  const o = ontoMap.get(id)!;
  let out: string[];
  if (o.entity_type) out = Array.isArray(o.entity_type) ? o.entity_type : [o.entity_type];
  else {
    const s = new Set<string>();
    for (const p of o.parents ?? []) for (const t of eff(p)) s.add(t);
    out = [...s].sort();
  }
  effMemo.set(id, out);
  return out;
};
const taxonomy = onto.map((o) => ({
  id: o.id,
  name: o.name,
  zh: o.aliases?.[0] ?? "",
  summary: o.summary,
  parents: (o.parents ?? []).slice().sort(),
  entity_types: eff(o.id),
  instances: dataNodes
    .filter((n) => (n.relations ?? []).some((e: any) => e.relation_type === "is_instance_of" && e.target_id === o.id))
    .filter((n) => !isVersion(idx.get(n.id)!))
    .map((n) => idx.get(n.id)!)
    .sort((a, b) => a - b),
}));

// ---------- 生态页数据 ----------
const ecoEntries: any[] = ecoJ.entries;
const membersOf: Record<string, number[]> = {};
for (const n of dataNodes)
  if (!isVersion(idx.get(n.id)!))
    for (const e of n.ecosystems ?? []) (membersOf[e] ??= []).push(idx.get(n.id)!);
const descendants = (v: string): string[] => {
  const out: string[] = [];
  const seen = new Set<string>([v]);
  const grow = (x: string) => {
    for (const e of ecoEntries)
      if ((e.parents ?? []).includes(x) && !seen.has(e.value)) {
        seen.add(e.value);
        out.push(e.value);
        grow(e.value);
      }
  };
  grow(v);
  return out;
};
for (const e of ecoEntries) {
  const children = ecoEntries
    .filter((x) => (x.parents ?? []).includes(e.value))
    .map((x) => x.value)
    .sort();
  let members = [...(membersOf[e.value] ?? [])];
  for (const d of descendants(e.value)) members.push(...(membersOf[d] ?? []));
  members = [...new Set(members)].sort((a, b) => records[b][4] - records[a][4] || (allIds[a] < allIds[b] ? -1 : 1));
  write(`site/ecosystems/${e.value}.json`, {
    value: e.value,
    en: e.en ?? "",
    zh: e.zh,
    blurb: e.blurb ?? "",
    maintainers: e.maintainers ?? [],
    parents: (e.parents ?? []).slice().sort(),
    children,
    members,
    member_count: members.length,
  });
}

// ---------- 节点生态链：自顶向下去重路径（多亲 DAG 拆为多链，根在前） ----------
const ecoParents: Record<string, string[]> = {};
for (const e of ecoEntries) ecoParents[e.value] = (e.parents ?? []).slice().sort();
const chainsOf = (v: string, seen = new Set<string>()): string[][] => {
  const ps = ecoParents[v] ?? [];
  if (ps.length === 0) return [[v]];
  const out: string[][] = [];
  for (const p of ps) {
    if (seen.has(p)) continue;
    seen.add(p);
    for (const chain of chainsOf(p, seen)) out.push([...chain, v]);
  }
  return out;
};
const nodeEcosystems: string[][] = [];
for (const n of dataNodes) {
  const chains: string[][] = [];
  const seenChain = new Set<string>();
  for (const e of n.ecosystems ?? [])
    for (const chain of chainsOf(e)) {
      const key = chain.join(">");
      if (!seenChain.has(key)) {
        seenChain.add(key);
        chains.push(chain);
      }
    }
  nodeEcosystems[idx.get(n.id)!] = chains;
}
write("graph/node-ecosystems.json", nodeEcosystems);
// 生态词表随产物发布，供 SPA 词条页「生态」栏取中文名
write("eco-vocab.json", ecoJ);
// 词表副本给前端 fetch（SPA public 目录即 dist）
write("contracts-vocab/ecosystems.json", ecoJ);

// ---------- 世界观图（由 relations 的 domain/range 派生元关系） ----------
const anchors = onto.filter((o) => (o.parents ?? []).length === 0);
const anchorIdxs = new Set(anchors.map((a) => idx.get(a.id)!));
const metaEdges = edges
  .filter(([s, , t]) => anchorIdxs.has(s) && anchorIdxs.has(t))
  .map(([s, r, t]) => ({ from: allIds[s], relation: relKeys[r], to: allIds[t] }));
write("site/worldview.json", {
  anchors: anchors.map((a) => ({ id: a.id, name: a.name, zh: a.aliases?.[0] ?? "", entity_types: eff(a.id) })),
  meta_edges: metaEdges,
  plate_edges: [
    { from: "meta-artifact", to: "ecosystem", label: "汇聚" },
    { from: "meta-organization", to: "ecosystem", label: "主导" }
  ],
  ecosystem_roots: ecoEntries
    .filter((e) => (e.parents ?? []).length === 0)
    .map((e) => ({ value: e.value, en: e.en, zh: e.zh })),
});

// ---------- redirects 与汇总写出 ----------
const renamesPath = path.join(DATA, "renames.json");
write("redirects.json", existsSync(renamesPath) ? J(renamesPath) : { entries: [] });

write("graph/ids.json", allIds);
write("graph/nodes.json", records);
write("graph/edges.json", edges);
write("graph/reverse.json", reverse);
const relDisplay: Record<string, { zh: string; en: string }> = {};
const relInverse: Record<string, string> = {};
for (const k of relKeys) {
  relDisplay[k] = relationsJ.display?.[k] ?? { zh: k, en: k };
  relInverse[k] = relationsJ.relations[k].inverse_display?.zh ?? k;
}
const l2Shards: any[][] = Array.from({ length: SHARDS }, () => []);
for (const n of dataNodes) l2Shards[parseInt(sha1(n.id)[0], 16)].push([idx.get(n.id)!, n.description ?? null]);
for (const s of l2Shards) s.sort((a, b) => a[0] - b[0]);
write("graph/manifest.json", {
  format: 1,
  schema: typesJ.schema_version,
  relations: relKeys,
  relation_display: relDisplay,
  relation_inverse: relInverse,
  contexts,
  counts: { ids: allIds.length, data_nodes: dataNodes.length, ontology: onto.length, edges: edges.length },
});
for (let s = 0; s < SHARDS; s++) write(`l2/shard-${s.toString(16)}.json`, l2Shards[s]);
write("search/manifest.json", {
  shards: SHARDS,
  strategy: "sha1(id) 首个十六进制位",
  record: "[idx, id, name, abbr, aliases, type, importance, version_parent_idx, popular]",
  files: Array.from({ length: SHARDS }, (_, i) => `shard-${i.toString(16)}.json`),
});
shards.forEach((s, i) => write(`search/shard-${i.toString(16)}.json`, s));
write("site/taxonomy.json", taxonomy);

// ---------- 术语中文字体：HarmonyOS Sans SC 构建期子集化（charset 随数据派生） ----------
const UI_CHARS = "词条导航搜索官方父分类子分类父生态子生态成员实例主导未找到返回首页收起展开全部主题加载·—→←、。，；：？！（）【】《》";
let charsetBuf = "";
for (let c = 0x20; c <= 0x7e; c++) charsetBuf += String.fromCharCode(c);
const collect = (v: any): void => {
  if (typeof v === "string") charsetBuf += v;
  else if (Array.isArray(v)) v.forEach(collect);
  else if (v && typeof v === "object") Object.values(v).forEach(collect);
};
collect(dataNodes);
collect(onto);
collect(ecoEntries);
collect(relDisplay);
collect(relInverse);
const charset = [...new Set(charsetBuf + UI_CHARS)].join("");
const fontCachePath = path.join(DIST, ".cache", "font.json");
if (!existsSync(fontCachePath) || J(fontCachePath).sha !== sha1(charset)) {
  const req = createRequire(import.meta.url);
  const pkgDir = path.dirname(req.resolve("@lobehub/webfont-harmony-sans-sc/package.json"));
  const { default: subsetFont } = await import("subset-font");
  for (const [file, weight] of [["Regular", "400"], ["Bold", "700"]] as const) {
    const src = readFileSync(path.join(pkgDir, "fonts", `HarmonyOS_Sans_SC_${file}.woff2`));
    const out = await subsetFont(src, charset, { targetFormat: "woff2" });
    const p = path.join(DIST, "fonts", `harmony-sc-${weight}.woff2`);
    mkdirSync(path.dirname(p), { recursive: true });
    writeFileSync(p, out);
  }
  write(".cache/font.json", { sha: sha1(charset), chars: charset.length });
}

write(".cache/state.json", { inputs });

let files = 0;
let bytes = 0;
for (const f of walk(DIST)) {
  files += 1;
  bytes += statSync(f).size;
}
console.log(
  `构建完成：节点 ${dataNodes.length} · 本体 ${onto.length} · 边 ${edges.length} · 生态页 ${ecoEntries.length} · 文件 ${files} · ${(bytes / 1024).toFixed(1)} KB`
);
