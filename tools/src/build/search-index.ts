export type SearchRecord = {
  idx: number;
  id: string;
  name: string;
  abbr: string;
  aliases: string[];
  type: string;
  importance: number;
  parent: number;
  primary: string;
  secondary: string;
  realm: string;
  kind: number;
};

export const SEARCH_SHARDS = 16;
export const SEARCH_ROUTING = {
  format: 1,
  shards: SEARCH_SHARDS,
  gramLengths: [1, 2, 3],
  postingsHash: "fnv1a-utf16",
  recordsHash: "idx-modulo",
} as const;

export function postingBucket(gram: string): number {
  let hash = 2166136261;
  for (let i = 0; i < gram.length; i++) hash = Math.imul(hash ^ gram.charCodeAt(i), 16777619) >>> 0;
  return hash & (SEARCH_SHARDS - 1);
}

export function gramsOf(value: string, lengths: readonly number[] = SEARCH_ROUTING.gramLengths): string[] {
  const points = Array.from(value);
  const grams = new Set<string>();
  for (const length of lengths)
    for (let i = 0; i + length <= points.length; i++) grams.add(points.slice(i, i + length).join(""));
  return [...grams].sort();
}

// Mirrors web/src/lib/ui.ts labelOf so search can render without loading the graph.
export function searchLabel(name: string, abbr: string, aliases: string[], primary = "", secondary = "", type = ""): { primary: string; secondary: string } {
  if (primary) return { primary, secondary: secondary && secondary !== primary ? secondary : "" };
  const zh = aliases.find((alias) => /[一-鿿]/.test(alias));
  if (type === "organization") return { primary: name, secondary: zh && zh !== name ? zh : "" };
  if (zh) return { primary: zh, secondary: name };
  if (abbr && abbr !== name) return { primary: abbr, secondary: name };
  return { primary: name, secondary: "" };
}

export function createSearchIndex(input: readonly SearchRecord[]): {
  records: SearchRecord[][];
  postings: Record<string, number[]>[];
} {
  const records: SearchRecord[][] = Array.from({ length: SEARCH_SHARDS }, () => []);
  const postingsRaw: Map<string, Set<number>>[] = Array.from({ length: SEARCH_SHARDS }, () => new Map());
  for (const record of [...input].sort((a, b) => a.idx - b.idx)) {
    records[record.idx % SEARCH_SHARDS].push(record);
    const grams = new Set<string>();
    for (const field of [record.id, record.name, record.abbr, ...record.aliases])
      for (const gram of gramsOf(field.toLowerCase())) grams.add(gram);
    for (const gram of grams) {
      const bucket = postingsRaw[postingBucket(gram)];
      if (!bucket.has(gram)) bucket.set(gram, new Set());
      bucket.get(gram)!.add(record.idx);
    }
  }
  const postings = postingsRaw.map((bucket) => Object.fromEntries(
    [...bucket.entries()].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
      .map(([gram, ids]) => [gram, [...ids].sort((a, b) => a - b)])
  ));
  return { records, postings };
}
