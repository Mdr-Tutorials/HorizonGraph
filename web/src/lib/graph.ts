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
  const l = labelOf(name, abbr, aliases, String(n[12] ?? ""), String(n[13] ?? ""));
  return {
    primary: l.primary,
    secondary: l.secondary,
    name,
    abbr,
    type,
    summary: String(n[3] ?? ""),
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
  for (const e of b.edges)
    if (e[0] === i)
      rows.push({ label: b.manifest.relation_display?.[rels[e[1]]]?.zh ?? rels[e[1]], entry: entryOf(b, e[2]) });
  for (const e of b.reverse[String(i)] ?? [])
    rows.push({ label: b.manifest.relation_inverse?.[rels[e[0]]] ?? rels[e[0]], entry: entryOf(b, e[1]) });
  return rows.sort(
    (a, x) =>
      ORDER.indexOf(a.label) - ORDER.indexOf(x.label) ||
      x.entry.importance - a.entry.importance ||
      (a.entry.id < x.entry.id ? -1 : 1)
  );
}
