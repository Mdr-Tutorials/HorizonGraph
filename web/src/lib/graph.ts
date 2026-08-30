import { REALM_OF } from "../generated/contracts.gen";
import { labelOf } from "./ui";

export type Bundle = {
  ids: string[];
  nodes: any[][];
  edges: number[][];
  reverse: Record<string, number[][]>;
  manifest: any;
};

let p: Promise<Bundle> | null = null;

export function loadBundle(): Promise<Bundle> {
  if (!p)
    p = (async () => {
      const B = import.meta.env.BASE_URL;
      const [ids, nodes, edges, reverse, manifest] = await Promise.all(
        ["graph/ids.json", "graph/nodes.json", "graph/edges.json", "graph/reverse.json", "graph/manifest.json"].map((f) =>
          fetch(B + f).then((r) => r.json())
        )
      );
      return { ids, nodes, edges, reverse, manifest } as Bundle;
    })();
  return p;
}

export function nodeOf(b: Bundle, i: number) {
  const n = b.nodes[i] ?? [];
  const type = String(n[2] ?? "");
  const name = String(n[0] ?? "");
  const abbr = String(n[1] ?? "");
  const aliases = (n[10] ?? []) as string[];
  const l = labelOf(name, abbr, aliases, String(n[12] ?? ""), String(n[13] ?? ""), type);
  return {
    primary: l.primary,
    secondary: l.secondary,
    name,
    abbr,
    type,
    summary: String(n[3] ?? ""),
    popular: Number(n[14] ?? 0),
    importance: Number(n[4] ?? 0),
    status: String(n[5] ?? ""),
    first: String(n[6] ?? ""),
    ecosystems: (n[7] ?? []) as string[],
    kind: Number(n[8] ?? 1),
    level: String(n[9] ?? ""),
    aliases,
    official: String(n[11] ?? ""),
    realm: REALM_OF[type] ?? "technical",
  };
}

export type Entry = ReturnType<typeof nodeOf> & { idx: number; id: string };

// ---------- 生态链：node-ecosystems.json（自顶向下全链）与生态词表（中文名） ----------
let ecoChains: Promise<string[][]> | null = null;
let ecoVocab: Promise<Record<string, { zh: string; en: string }>> | null = null;

function loadEcoVocab(): Promise<Record<string, { zh: string; en: string }>> {
  ecoVocab ??= (async () => {
    const B = import.meta.env.BASE_URL;
    const j = await fetch(B + "eco-vocab.json").then((r) => r.json());
    return Object.fromEntries((j.entries as any[]).map((e) => [e.value, { zh: e.zh, en: e.en ?? "" }]));
  })();
  return ecoVocab;
}

export async function ecoChainsOf(i: number): Promise<string[][]> {
  ecoChains ??= (async () => {
    const B = import.meta.env.BASE_URL;
    const [chains, names] = await Promise.all([
      fetch(B + "graph/node-ecosystems.json").then((r) => r.json()),
      loadEcoVocab(),
    ]);
    nodeEcoNames = names;
    return chains as string[][];
  })();
  return (await ecoChains)[i] ?? [];
}

let nodeEcoNames: Record<string, { zh: string; en: string }> = {};
export function ecoNameOf(v: string): { zh: string; en: string } {
  return nodeEcoNames[v] ?? { zh: v, en: "" };
}

export function entryOf(b: Bundle, i: number): Entry {
  return { ...nodeOf(b, i), idx: i, id: b.ids[i] };
}

const ORDER = [
  "属于", "版本", "实现", "依赖", "扩展", "基座", "内嵌", "组成", "开发者", "驱动", "约束", "竞争", "被替代",
  "实例", "被实现", "依赖方", "被扩展", "基于", "内嵌于", "包含", "替代", "开发了", "驱动于", "受约束于", "细分",
];

export type Row = { label: string; entry: Entry };

export function rowsOf(b: Bundle, i: number): Row[] {
  const rows: Row[] = [];
  const rels: string[] = b.manifest.relations;
  const vOf = rels.indexOf("version_of");
  const families = b.edges.filter((e) => e[0] === i && e[1] === vOf).map((e) => e[2]);
  const slice = families.length > 0;
  const seen = new Set<string>();
  const push = (label: string, idx: number) => {
    const key = `${label}:${idx}`;
    if (seen.has(key)) return;
    if (idx === i && label !== "版本") return;
    seen.add(key);
    rows.push({ label, entry: entryOf(b, idx) });
  };

  for (const e of b.edges) {
    if (e[0] !== i) continue;
    const rel = rels[e[1]];
    if (rel === "version_of" || rel === "part_of") {
      push("属于", e[2]);
      continue;
    }
    if (rel === "is_instance_of" && slice) continue;
    push(b.manifest.relation_display?.[rel]?.zh ?? rel, e[2]);
  }
  for (const e of b.reverse[String(i)] ?? []) {
    const rel = rels[e[0]];
    push(rel === "version_of" ? "版本" : (b.manifest.relation_inverse?.[rel] ?? rel), e[1]);
  }
  if (slice) {
    for (const f of families)
      for (const e of b.reverse[String(f)] ?? [])
        if (e[0] === vOf) push("版本", e[1]);
  }

  return rows.sort(
    (a, x) =>
      ORDER.indexOf(a.label) - ORDER.indexOf(x.label) ||
      (a.label === "版本" ? (a.entry.id < x.entry.id ? -1 : 1) : 0) ||
      x.entry.importance - a.entry.importance ||
      (a.entry.id < x.entry.id ? -1 : 1)
  );
}
