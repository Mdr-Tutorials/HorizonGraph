import { loadBundle } from "./graph";
import { labelOf } from "./ui";

export type Hit = {
  idx: number;
  id: string;
  primary: string;
  secondary: string;
  realm: string;
  kind: number;
  score: number;
};

let shardsP: Promise<any[][]> | null = null;

function loadShards(): Promise<any[][]> {
  if (!shardsP)
    shardsP = (async () => {
      const B = import.meta.env.BASE_URL;
      const m = await fetch(B + "search/manifest.json").then((r) => r.json());
      return Promise.all(m.files.map((f: string) => fetch(B + "search/" + f).then((r) => r.json())));
    })();
  return shardsP;
}

export async function search(q: string): Promise<{ terms: Hit[]; nav: Hit[] }> {
  const query = q.trim().toLowerCase();
  if (!query) return { terms: [], nav: [] };
  const [shards, b] = await Promise.all([loadShards(), loadBundle()]);

  const hits: Hit[] = [];
  const parentOf = new Map<number, number>();
  for (const shard of shards)
    for (const r of shard) {
      const [idx, id, name, abbr, aliases, type, importance, vp] = r;
      if (vp >= 0) parentOf.set(idx, vp);
      let score = 0;
      const n = String(name).toLowerCase();
      if (n.startsWith(query)) score += 30;
      else if (n.includes(query)) score += 15;
      const ab = String(abbr ?? "").toLowerCase();
      if (ab === query) score += 25;
      else if (ab.startsWith(query)) score += 18;
      if ((aliases ?? []).some((a: string) => String(a).toLowerCase().includes(query))) score += 8;
      if (String(id).includes(query)) score += 6;
      if (score > 0) {
        const rec = b.nodes[idx] ?? [];
        const l = labelOf(String(name), abbr, aliases ?? [], String(rec[12] ?? ""), String(rec[13] ?? ""));
        hits.push({
          idx,
          id,
          primary: l.primary,
          secondary: l.secondary,
          realm: "",
          kind: Number(rec[8] ?? 1),
          score: score + Number(importance) * 2,
        });
      }
    }

  hits.sort((a, x) => x.score - a.score || (a.id < x.id ? -1 : 1));
  const kept = hits.filter((h, i) => hits.findIndex((y) => y.idx === h.idx) === i);
  const keptSet = new Set(kept.map((h) => h.idx));
  const terms = kept
    .filter((h) => {
      const p = parentOf.get(h.idx);
      return !(p !== undefined && p !== h.idx && keptSet.has(p));
    })
    .slice(0, 8);
  const nav = kept.filter((h) => h.kind === 0).slice(0, 4);
  return { terms, nav };
}
