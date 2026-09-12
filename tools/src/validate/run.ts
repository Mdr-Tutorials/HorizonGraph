import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const CONTRACTS = path.join(ROOT, "contracts");
const DATA_NODES = path.join(ROOT, "data", "nodes");

const J = (p: string): any => JSON.parse(readFileSync(p, "utf8"));
const typesJ = J(path.join(CONTRACTS, "types.json"));
const relationsJ = J(path.join(CONTRACTS, "relations.json"));
const ontologyJ = J(path.join(CONTRACTS, "ontology.json"));
const ecoJ = J(path.join(CONTRACTS, "vocab", "ecosystems.json"));
const domJ = J(path.join(CONTRACTS, "vocab", "domains.json"));
const tagJ = J(path.join(CONTRACTS, "vocab", "tags.json"));

const errors: string[] = [];
const warnings: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

const FIELDS = Object.keys(typesJ.fields);
const DATA_TYPES = new Set(Object.keys(typesJ.enums.EntityType).filter((t: string) => t !== "meta_concept"));
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

// ---------- 本体 ----------
type ONode = { id: string; name: string; aliases?: string[]; parents?: string[]; relations?: any[]; entity_type?: string | string[] };
const onto = new Map<string, ONode>();
for (const n of ontologyJ.nodes as ONode[]) {
  if (onto.has(n.id)) err(`ontology: 重复 id ${n.id}`);
  onto.set(n.id, n);
}
for (const n of onto.values())
  for (const p of n.parents ?? [])
    if (!onto.has(p)) err(`ontology: ${n.id} 的 parent ${p} 不存在`);

const effMemo = new Map<string, Set<string>>();
function effTypes(id: string, seen = new Set<string>()): Set<string> {
  const memo = effMemo.get(id);
  if (memo) return memo;
  if (seen.has(id)) { err(`ontology: ${id} 存在环`); return new Set(); }
  seen.add(id);
  const n = onto.get(id)!;
  let s = new Set<string>();
  if (n.entity_type) s = new Set(Array.isArray(n.entity_type) ? n.entity_type : [n.entity_type]);
  else for (const p of n.parents ?? []) for (const t of effTypes(p, seen)) s.add(t);
  effMemo.set(id, s);
  return s;
}
const anchors = new Set((ontologyJ.nodes as ONode[]).filter((n) => (n.parents ?? []).length === 0).map((n) => n.id));
for (const n of onto.values()) if (effTypes(n.id).size === 0) err(`ontology: ${n.id} 无法解析生效 entity_type`);

// ---------- 生态注册表 ----------
type EEntry = { value: string; parents?: string[] };
const eco = new Map<string, EEntry>();
for (const e of ecoJ.entries as EEntry[]) {
  if (eco.has(e.value)) err(`ecosystems: 重复 ${e.value}`);
  eco.set(e.value, e);
}
for (const e of eco.values())
  for (const p of e.parents ?? []) if (!eco.has(p)) err(`ecosystems: ${e.value} 的 parent ${p} 未登记`);

const ecoOkMemo = new Map<string, boolean>();
function ecoOk(id: string, seen = new Set<string>()): boolean {
  const memo = ecoOkMemo.get(id);
  if (memo !== undefined) return memo;
  if (seen.has(id)) { err(`ecosystems: ${id} 存在环`); return false; }
  seen.add(id);
  const ps = eco.get(id)!.parents ?? [];
  const ok = ps.length === 0 ? true : ps.every((p) => ecoOk(p, seen));
  ecoOkMemo.set(id, ok);
  return ok;
}
for (const e of eco.values()) if (!ecoOk(e.value)) err(`ecosystems: ${e.value} 链路未终于宏观根`);

const domSet = new Set((domJ.entries as { value: string }[]).map((e) => e.value));
const tagSet = new Set((tagJ.entries as { value: string }[]).map((e) => e.value));
const usedEco = new Set<string>();
const usedDom = new Set<string>();
const usedTag = new Set<string>();

// ---------- 加载数据节点 ----------
function* walk(dir: string): Generator<string> {
  if (!existsSync(dir)) return;
  for (const f of readdirSync(dir)) {
    const p = path.join(dir, f);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (f.endsWith(".json")) yield p;
  }
}

type Node = any & { id: string; type: string };
const nodes = new Map<string, { n: Node; file: string }>();
const rel = relationsJ.relations as Record<string, any>;

for (const file of walk(DATA_NODES)) {
  const rel0 = path.relative(ROOT, file).replaceAll("\\", "/");
  let n: Node;
  try { n = JSON.parse(readFileSync(file, "utf8")); }
  catch { err(`${rel0}: JSON 解析失败`); continue; }
  const m = rel0.match(/^data\/nodes\/([a-z0-9-]{1,2})\/(.+)\.json$/);
  if (!m) err(`${rel0}: 路径不符合 data/nodes/<id前两字符>/<id>.json`);
  else {
    if (m[1] !== n.id?.slice(0, 2)) err(`${rel0}: 分片目录与 id 前缀不一致`);
    if (m[2] !== n.id) err(`${rel0}: 文件名与 id 不一致`);
  }
  if (nodes.has(n.id)) err(`${rel0}: id ${n.id} 重复`);
  if (onto.has(n.id)) err(`${rel0}: id ${n.id} 与本体节点冲突`);
  if (!SLUG.test(n.id ?? "")) err(`${rel0}: id 不符合 slug 规范`);
  nodes.set(n.id, { n, file: rel0 });
}

// ---------- 结构校验 ----------
for (const { n, file } of nodes.values()) {
  const t = n.type;
  if (!DATA_TYPES.has(t)) { err(`${file}: 非法 type ${t}（meta_concept 不入数据平面）`); continue; }
  const app = typesJ.types[t]?.applicability ?? {};
  const level = (f: string) => app[f] ?? typesJ.applicability_default;
  for (const key of Object.keys(n)) if (!FIELDS.includes(key)) err(`${file}: 未知字段 ${key}`);
  for (const f of FIELDS) {
    const lv = level(f);
    const present = n[f] !== undefined && n[f] !== null;
    if (lv === "required" && !present) err(`${file}: 缺少必填字段 ${f}`);
    if (lv === "forbidden" && present) err(`${file}: ${t} 类型禁止字段 ${f}`);
  }
  if (n.summary && Array.from(String(n.summary)).length > 50) err(`${file}: summary 超过 50 字`);
  if (n.importance !== undefined && !(Number.isInteger(n.importance) && n.importance >= 1 && n.importance <= 5))
    err(`${file}: importance 须为 1-5 整数`);
  if (n.popular !== undefined && !(Number.isInteger(n.popular) && n.popular >= 1 && n.popular <= 100))
    err(`${file}: popular 须为 1-100 整数`);
  for (const d of [n.first_released, n.deprecated_at, n.last_reviewed])
    if (d !== undefined && !DATE.test(d)) err(`${file}: 日期 ${d} 须为 YYYY-MM-DD`);
  if (n.status === "deprecated" && !n.deprecated_at) err(`${file}: status=deprecated 须填 deprecated_at`);
  if (n.aliases !== undefined && !Array.isArray(n.aliases)) err(`${file}: aliases 须为数组`);
  for (const e of n.ecosystems ?? []) { usedEco.add(e); if (!eco.has(e)) err(`${file}: ecosystems 未登记值 ${e}`); }
  for (const d of n.domains ?? []) { usedDom.add(d); if (!domSet.has(d)) err(`${file}: domains 未登记值 ${d}`); }
  for (const g of n.tags ?? []) { usedTag.add(g); if (!tagSet.has(g)) err(`${file}: tags 未登记值 ${g}`); }
}

// ---------- 边校验 ----------
for (const { n, file } of nodes.values()) {
  const t = n.type;
  const seenPair = new Set<string>();
  for (const e of n.relations ?? []) {
    const rt = e?.relation_type;
    if (!rel[rt]) { err(`${file}: 未知关系 ${String(rt)}`); continue; }
    const tid = e.target_id;
    const pair = `${rt}:${tid}`;
    if (seenPair.has(pair)) { err(`${file}: 重复边 ${pair}`); continue; }
    seenPair.add(pair);
    if (tid === n.id) { err(`${file}: 自环边 ${pair}`); continue; }
    const spec = rel[rt];
    if ((rt === "uses" || rt === "stewarded_by") && (typeof e.context !== "string" || !e.context.trim()))
      err(`${file}: ${rt} 必须提供非空 context，说明使用场景或治理职责`);
    if (!spec.domain.includes(t)) { err(`${file}: ${rt} 的 domain 不含类型 ${t}`); continue; }

    if (rt === "is_instance_of") {
      if (!onto.has(tid)) { err(`${file}: is_instance_of 目标 ${tid} 必须是本体节点`); continue; }
      if (anchors.has(tid)) { err(`${file}: 禁止直挂锚点 ${tid}，请挂类型根或中间分类`); continue; }
      if (!effTypes(tid).has(t))
        err(`${file}: ${t} 不能挂载 ${tid}（生效类型 ${[...effTypes(tid)].join("/") || "无"}）`);
      continue;
    }

    if (onto.has(tid)) {
      if (!spec.range.includes("meta_concept")) err(`${file}: ${rt} 的目标应为数据节点，${tid} 是本体节点`);
      else {
        const eff = [...effTypes(tid)];
        if (!eff.some((x) => spec.range.includes(x)))
          err(`${file}: ${rt} 的 range 与 ${tid} 生效类型 ${eff.join("/")} 不符`);
      }
      continue;
    }

    const target = nodes.get(tid);
    if (!target) { err(`${file}: 死边 ${pair}（目标不存在）`); continue; }
    if (!spec.range.includes(target.n.type)) err(`${file}: ${rt} 的 range 不含目标类型 ${target.n.type}`);
    if (rt === "version_of" && target.n.type !== t) err(`${file}: version_of 要求源与目标同 type`);
    if (rt === "competes_with" || rt === "alternative_to") {
      if (n.id > tid) err(`${file}: ${rt} 应存于字典序较小一侧`);
      const back = (target.n.relations ?? []).some(
        (b: any) => b.relation_type === rt && b.target_id === n.id
      );
      if (back) err(`${file}: ${rt} 与 ${tid} 镜像双存`);
      const twin = rt === "competes_with" ? "alternative_to" : "competes_with";
      const twinHere = (n.relations ?? []).some((b: any) => b.relation_type === twin && b.target_id === tid);
      const twinThere = (target.n.relations ?? []).some((b: any) => b.relation_type === twin && b.target_id === n.id);
      if (twinHere || twinThere) err(`${file}: ${n.id} 与 ${tid} 同时存在 competes_with 与 alternative_to`);
    }
    if (rt === "deprecated_by" && n.status !== "deprecated")
      err(`${file}: deprecated_by 要求源 status=deprecated 且填 deprecated_at`);
  }
}

// ---------- 本体边校验（与数据节点同一规则：域值取生效类型集合） ----------
for (const o of onto.values()) {
  const eff = [...effTypes(o.id)];
  const seenPair = new Set<string>();
  let specCount = 0;
  for (const e of (o.relations ?? []) as any[]) {
    const rt = e?.relation_type;
    if (!rel[rt]) { err(`ontology ${o.id}: 未知关系 ${String(rt)}`); continue; }
    const tid = e.target_id;
    const pair = `${rt}:${tid}`;
    if (seenPair.has(pair)) { err(`ontology ${o.id}: 重复边 ${pair}`); continue; }
    seenPair.add(pair);
    if (tid === o.id) { err(`ontology ${o.id}: 自环边 ${pair}`); continue; }
    if (rt === "specializes") {
      specCount += 1;
      if (specCount > 1) err(`ontology ${o.id}: 分类骨架为单亲树，至多一条 specializes 边`);
      if (!onto.has(tid)) err(`ontology ${o.id}: specializes 目标 ${tid} 不存在`);
      continue;
    }
    if (rt === "is_instance_of") { err(`ontology ${o.id}: is_instance_of 只能由数据节点持有`); continue; }
    const spec = rel[rt];
    if (!eff.some((t) => spec.domain.includes(t))) {
      err(`ontology ${o.id}: ${rt} 的 domain 与生效类型 ${eff.join("/") || "无"} 不符`);
      continue;
    }
    if (onto.has(tid)) {
      const teff = [...effTypes(tid)];
      if (!teff.some((t) => spec.range.includes(t)))
        err(`ontology ${o.id}: ${rt} 的 range 与 ${tid} 生效类型 ${teff.join("/") || "无"} 不符`);
    } else {
      const target = nodes.get(tid);
      if (!target) { err(`ontology ${o.id}: 死边 ${pair}`); continue; }
      if (!spec.range.includes(target.n.type)) err(`ontology ${o.id}: ${rt} 的 range 不含目标类型 ${target.n.type}`);
    }
  }
}

// ---------- 许可文件 ----------
for (const f of ["LICENSE", "LICENSE-DATA.md"])
  if (!existsSync(path.join(ROOT, f))) err(`根目录缺少 ${f}`);

// ---------- 词表未引用告警 ----------
const ecoClosure = new Set(usedEco);
const markAnc = (id: string) => {
  for (const p of eco.get(id)?.parents ?? []) if (!ecoClosure.has(p)) { ecoClosure.add(p); markAnc(p); }
};
for (const u of usedEco) markAnc(u);
for (const e of eco.values())
  if ((e.parents ?? []).length > 0 && !ecoClosure.has(e.value)) warn(`ecosystems: ${e.value} 未被引用`);
for (const d of domSet) if (!usedDom.has(d)) warn(`domains: ${d} 未被引用`);
for (const g of tagSet) if (!usedTag.has(g)) warn(`tags: ${g} 未被引用`);

// ---------- 汇总 ----------
console.log(`节点 ${nodes.size} · 本体 ${onto.size} · 生态 ${eco.size} · 关系 ${Object.keys(rel).length}`);
if (warnings.length) {
  console.log(`警告 ${warnings.length} 条（词表未引用属正常，铺量后收敛）：`);
  for (const w of warnings.slice(0, 8)) console.log(`  ⚠ ${w}`);
  if (warnings.length > 8) console.log(`  …共 ${warnings.length} 条`);
}
if (errors.length) {
  console.error(`校验失败，错误 ${errors.length} 条：`);
  for (const e of errors.slice(0, 30)) console.error(`  ✗ ${e}`);
  if (errors.length > 30) console.error(`  …共 ${errors.length} 条`);
  process.exit(1);
}
console.log("校验通过");
