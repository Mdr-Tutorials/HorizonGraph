import { REALM_OF } from "../generated/contracts.gen";
import { labelOf } from "./ui";
import { CsrIndex, type NeighborIndex } from "./engine-csr";
import { DatasetLoader, EngineDataError } from "./engine-dataset";
import type { EcoLabel, Entry, GraphEngine, NodeView, Row, SearchResult } from "./engine-types";

export type SearchRecord = {
  idx: number; id: string; name: string; abbr: string; aliases: string[]; type: string;
  importance: number; parent: number; primary: string; secondary: string; realm: string; kind: number;
};
export type ScoringRecord = Pick<SearchRecord, "idx" | "id" | "name" | "abbr" | "aliases" | "importance">;
export type WasmExports = {
  GraphIndex: new (bytes: Uint8Array) => NeighborIndex;
  score_candidates(query: string, rowsJson: string): Uint32Array;
};
type GraphManifest = {
  relations: string[];
  contexts: string[];
  relation_display: Record<string, { zh: string; en?: string }>;
  relation_inverse: Record<string, string>;
};
type GraphState = { ids: string[]; nodes: unknown[][]; manifest: GraphManifest; index: NeighborIndex; idToIndex: Map<string, number> };
const ORDER = [
  "属于", "版本", "实现", "依赖", "使用", "考察", "用于准备", "描述", "沟通内容", "指代", "母公司", "可能引入偏差", "扩展", "基座", "内嵌", "组成", "开发者", "治理方", "驱动", "约束", "竞争", "被替代",
  "实例", "被实现", "依赖方", "使用方", "考察场景", "准备资源", "描述于", "沟通场景", "相关称谓", "子公司", "偏差来源", "被扩展", "基于", "内嵌于", "包含", "替代", "开发了", "治理项目", "驱动于", "受约束于", "细分",
];

export function gramBucket(gram: string): number {
  let hash = 2166136261;
  for (let i = 0; i < gram.length; i++) hash = Math.imul(hash ^ gram.charCodeAt(i), 16777619) >>> 0;
  return hash & 15;
}

export function queryGrams(query: string): string[] {
  const characters = Array.from(query);
  const length = Math.min(3, characters.length);
  if (!length) return [];
  const grams = new Set<string>();
  for (let i = 0; i <= characters.length - length; i++) grams.add(characters.slice(i, i + length).join(""));
  return [...grams];
}

export function scoreRecord(query: string, record: ScoringRecord): number {
  if (!query) return 0;
  let score = 0;
  if (record.name.startsWith(query)) score += 30;
  else if (record.name.includes(query)) score += 15;
  if (record.abbr === query) score += 25;
  else if (record.abbr.startsWith(query)) score += 18;
  if (record.aliases.some((alias) => alias.includes(query))) score += 8;
  if (record.id.includes(query)) score += 6;
  if (record.name === query || record.abbr === query || record.id === query || record.aliases.includes(query)) score += 100;
  return score > 0 ? score + record.importance * 2 : 0;
}

function normalizeRecord(record: SearchRecord): ScoringRecord {
  return { idx: record.idx, id: record.id.toLowerCase(), name: record.name.toLowerCase(), abbr: record.abbr.toLowerCase(),
    aliases: record.aliases.map((alias) => alias.toLowerCase()), importance: record.importance };
}

export function rankMatches(records: SearchRecord[], scores: Map<number, number>): SearchResult {
  const matched = records.filter((record) => scores.has(record.idx));
  matched.sort((a, b) => scores.get(b.idx)! - scores.get(a.idx)! || (a.id < b.id ? -1 : a.id === b.id ? 0 : 1));
  const matchedIndices = new Set(matched.map((record) => record.idx));
  const hit = (record: SearchRecord) => ({ idx: record.idx, id: record.id, primary: record.primary,
    secondary: record.secondary, realm: record.realm, kind: record.kind, score: scores.get(record.idx)! });
  return {
    terms: matched.filter((record) => record.kind === 1 && !(record.parent >= 0 && record.parent !== record.idx && matchedIndices.has(record.parent))).slice(0, 8).map(hit),
    nav: matched.filter((record) => record.kind === 0).slice(0, 4).map(hit),
  };
}

function viewOf(graph: GraphState, idx: number): NodeView {
  const n = graph.nodes[idx];
  const type = String(n[2] ?? ""), name = String(n[0] ?? ""), abbr = String(n[1] ?? "");
  const aliases = (n[10] ?? []) as string[];
  const label = labelOf(name, abbr, aliases, String(n[12] ?? ""), String(n[13] ?? ""), type);
  return { ...label, name, abbr, type, summary: String(n[3] ?? ""), popular: Number(n[14] ?? 0),
    importance: Number(n[4] ?? 0), status: String(n[5] ?? ""), first: String(n[6] ?? ""),
    ecosystems: (n[7] ?? []) as string[], kind: Number(n[8] ?? 1), level: String(n[9] ?? ""), aliases,
    official: String(n[11] ?? ""), realm: REALM_OF[type] ?? "technical" };
}

export class GraphEngineCore implements GraphEngine {
  private graph?: Promise<GraphState>;
  private ids?: Promise<string[]>;
  private wasmPromise?: Promise<WasmExports | null>;
  private wasm: WasmExports | null = null;
  private wasmUnavailable?: string;
  private routing?: Promise<void>;
  private postings = new Map<number, Promise<Record<string, number[]>>>();
  private records = new Map<number, Promise<Map<number, SearchRecord>>>();
  private eco?: Promise<{ chains: string[][][]; vocab: Map<string, EcoLabel> }>;

  constructor(readonly dataset: DatasetLoader, private options: { loadWasm?: () => Promise<WasmExports> } = {}) {}

  private ensureWasm(): Promise<WasmExports | null> {
    this.wasmPromise ??= (async () => {
      if (!this.options.loadWasm) return null;
      try {
        this.wasm = await this.options.loadWasm();
        return this.wasm;
      } catch (error) {
        // Only code loading/initialization can fall back. Data decoding happens below, outside this catch.
        this.wasmUnavailable = error instanceof Error ? error.message : String(error);
        return null;
      }
    })();
    return this.wasmPromise;
  }

  private getIds(): Promise<string[]> {
    this.ids ??= this.dataset.assetJson<unknown>("graph/ids.json").then((ids) => {
      if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string") || new Set(ids).size !== ids.length) {
        throw new EngineDataError("节点 ID 表无效");
      }
      return ids;
    });
    const pending = this.ids;
    pending.catch(() => { if (this.ids === pending) this.ids = undefined; });
    return this.ids;
  }

  private ensureGraph(): Promise<GraphState> {
    this.graph ??= (async () => {
      const [ids, rawNodes, manifest, bytes, wasm] = await Promise.all([
        this.getIds(), this.dataset.assetJson<unknown>("graph/nodes.json"),
        this.dataset.assetJson<GraphManifest>("graph/manifest.json"), this.dataset.assetBytes("graph/adjacency.bin"), this.ensureWasm(),
      ]);
      const csr = new CsrIndex(bytes);
      if (!Array.isArray(rawNodes) || rawNodes.length !== ids.length || ids.length !== csr.nodeCount ||
          rawNodes.some((node) => !Array.isArray(node) || (node[7] != null && !Array.isArray(node[7])) || (node[10] != null && !Array.isArray(node[10]))) ||
          !manifest || !Array.isArray(manifest.relations) || manifest.relations.some((r) => typeof r !== "string") ||
          manifest.relations.length !== csr.relationCount || !Array.isArray(manifest.contexts) ||
          !manifest.relation_display || !manifest.relation_inverse) throw new EngineDataError("图谱资源索引不一致");
      for (const contexts of csr.contexts) {
        for (const context of contexts) {
          if (context !== 0xffffffff && context >= manifest.contexts.length) throw new EngineDataError("关系上下文索引越界");
        }
      }
      // Validate with the JS decoder before constructing WASM, so corrupt data never silently selects another backend.
      const index = wasm ? new wasm.GraphIndex(bytes) : csr;
      return { ids, nodes: rawNodes as unknown[][], manifest, index, idToIndex: new Map(ids.map((id, i) => [id, i])) };
    })();
    const pending = this.graph;
    pending.catch(() => { if (this.graph === pending) this.graph = undefined; });
    return this.graph;
  }

  async getNode(id: string): Promise<NodeView | null> {
    const graph = await this.ensureGraph();
    const idx = graph.idToIndex.get(id);
    return idx === undefined ? null : viewOf(graph, idx);
  }

  async getRelations(id: string): Promise<Row[]> {
    const graph = await this.ensureGraph();
    const idx = graph.idToIndex.get(id);
    if (idx === undefined) return [];
    const out = graph.index.neighbors(idx, 0), incoming = graph.index.neighbors(idx, 1);
    const relations = graph.manifest.relations, version = relations.indexOf("version_of");
    const families: number[] = [];
    for (let i = 0; i < out.length; i += 3) if (out[i + 1] === version) families.push(out[i]);
    const rows: Row[] = [], seen = new Set<string>();
    const push = (label: string, other: number) => {
      const key = `${label}:${other}`;
      if (seen.has(key) || (other === idx && label !== "版本")) return;
      seen.add(key);
      const entry: Entry = { ...viewOf(graph, other), id: graph.ids[other] };
      rows.push({ label, entry });
    };
    for (let i = 0; i < out.length; i += 3) {
      const relation = relations[out[i + 1]];
      if (relation === "version_of" || relation === "part_of") push("属于", out[i]);
      else if (!(relation === "is_instance_of" && families.length)) push(graph.manifest.relation_display[relation]?.zh ?? relation, out[i]);
    }
    for (let i = 0; i < incoming.length; i += 3) {
      const relation = relations[incoming[i + 1]];
      push(relation === "version_of" ? "版本" : (graph.manifest.relation_inverse[relation] ?? relation), incoming[i]);
    }
    for (const family of families) {
      const siblings = graph.index.neighbors(family, 1);
      for (let i = 0; i < siblings.length; i += 3) if (siblings[i + 1] === version) push("版本", siblings[i]);
    }
    return rows.sort((a, b) => ORDER.indexOf(a.label) - ORDER.indexOf(b.label) ||
      (a.label === "版本" ? (a.entry.id < b.entry.id ? -1 : a.entry.id === b.entry.id ? 0 : 1) : 0) ||
      b.entry.importance - a.entry.importance || (a.entry.id < b.entry.id ? -1 : a.entry.id === b.entry.id ? 0 : 1));
  }

  async getEcoChains(id: string): Promise<EcoLabel[][]> {
    const ids = await this.getIds(), idx = ids.indexOf(id);
    if (idx < 0) return [];
    this.eco ??= (async () => {
      const [chains, raw] = await Promise.all([
        this.dataset.assetJson<string[][][]>("graph/node-ecosystems.json"),
        this.dataset.assetJson<{ entries: Array<{ value: string; zh: string; en?: string }> }>("eco-vocab.json"),
      ]);
      if (!Array.isArray(chains) || chains.length !== ids.length || !raw || !Array.isArray(raw.entries) ||
          chains.some((node) => !Array.isArray(node) || node.some((chain) => !Array.isArray(chain) || chain.some((v) => typeof v !== "string")))) {
        throw new EngineDataError("生态链资源无效");
      }
      const vocab = new Map(raw.entries.map((entry) => [entry.value, { value: entry.value, zh: entry.zh, en: entry.en ?? "" }]));
      return { chains, vocab };
    })();
    const pending = this.eco;
    pending.catch(() => { if (this.eco === pending) this.eco = undefined; });
    const eco = await pending;
    return eco.chains[idx].map((chain) => chain.map((value) => eco.vocab.get(value) ?? { value, zh: value, en: "" }));
  }

  private ensureRouting(): Promise<void> {
    this.routing ??= this.dataset.assetJson<any>("search/routing.json").then((routing) => {
      if (!routing || routing.format !== 1 || routing.shards !== 16 || JSON.stringify(routing.gramLengths) !== "[1,2,3]" ||
          routing.postingsHash !== "fnv1a-utf16" || routing.recordsHash !== "idx-modulo") throw new EngineDataError("搜索路由格式不受支持");
    });
    const pending = this.routing;
    pending.catch(() => { if (this.routing === pending) this.routing = undefined; });
    return this.routing;
  }

  private getPostings(bucket: number): Promise<Record<string, number[]>> {
    if (!this.postings.has(bucket)) {
      this.postings.set(bucket, this.dataset.assetJson<Record<string, number[]>>(`search/postings-${bucket.toString(16)}.json`).then((postings) => {
        if (!postings || typeof postings !== "object" || Array.isArray(postings)) throw new EngineDataError("搜索倒排表无效");
        for (const [gram, indices] of Object.entries(postings)) {
          if (gramBucket(gram) !== bucket || !Array.isArray(indices) || indices.some((idx, i) =>
            !Number.isSafeInteger(idx) || idx < 0 || (i > 0 && idx <= indices[i - 1]))) throw new EngineDataError("搜索倒排索引无效");
        }
        return postings;
      }));
    }
    const pending = this.postings.get(bucket)!;
    pending.catch(() => { if (this.postings.get(bucket) === pending) this.postings.delete(bucket); });
    return pending;
  }

  private getRecords(bucket: number): Promise<Map<number, SearchRecord>> {
    if (!this.records.has(bucket)) {
      this.records.set(bucket, this.dataset.assetJson<SearchRecord[]>(`search/records-${bucket.toString(16)}.json`).then((records) => {
        if (!Array.isArray(records)) throw new EngineDataError("搜索记录表无效");
        const result = new Map<number, SearchRecord>();
        for (const record of records) {
          if (!record || !Number.isSafeInteger(record.idx) || record.idx < 0 || record.idx > 0xffffffff || record.idx % 16 !== bucket || result.has(record.idx) ||
              !Number.isSafeInteger(record.parent) || record.parent < -1 || record.parent > 0xffffffff || ![0, 1].includes(record.kind) ||
              !Number.isInteger(record.importance) || record.importance < 0 || record.importance > 5 ||
              !Array.isArray(record.aliases) || record.aliases.some((alias) => typeof alias !== "string") ||
              [record.id, record.name, record.abbr, record.type, record.primary, record.secondary, record.realm].some((value) => typeof value !== "string")) {
            throw new EngineDataError("搜索记录字段无效");
          }
          result.set(record.idx, record);
        }
        return result;
      }));
    }
    const pending = this.records.get(bucket)!;
    pending.catch(() => { if (this.records.get(bucket) === pending) this.records.delete(bucket); });
    return pending;
  }

  async search(rawQuery: string): Promise<SearchResult> {
    const query = rawQuery.trim().toLowerCase();
    if (!query) return { terms: [], nav: [] };
    await this.ensureRouting();
    const grams = queryGrams(query), buckets = [...new Set(grams.map(gramBucket))];
    const postings = new Map(await Promise.all(buckets.map(async (bucket) => [bucket, await this.getPostings(bucket)] as const)));
    const lists = grams.map((gram) => postings.get(gramBucket(gram))![gram] ?? []).sort((a, b) => a.length - b.length);
    if (!lists[0]?.length) return { terms: [], nav: [] };
    const sets = lists.slice(1).map((list) => new Set(list));
    const candidates = lists[0].filter((idx) => sets.every((set) => set.has(idx)));
    if (!candidates.length) return { terms: [], nav: [] };
    const recordBuckets = [...new Set(candidates.map((idx) => idx % 16))];
    const tables = new Map(await Promise.all(recordBuckets.map(async (bucket) => [bucket, await this.getRecords(bucket)] as const)));
    const records = candidates.map((idx) => {
      const record = tables.get(idx % 16)!.get(idx);
      if (!record) throw new EngineDataError("搜索倒排索引指向缺失记录");
      return record;
    });
    const normalized = records.map(normalizeRecord), wasm = await this.ensureWasm(), scores = new Map<number, number>();
    if (wasm) {
      const pairs = wasm.score_candidates(query, JSON.stringify(normalized));
      if (pairs.length % 2) throw new EngineDataError("WASM 搜索结果格式无效");
      const valid = new Set(candidates);
      for (let i = 0; i < pairs.length; i += 2) {
        if (!valid.has(pairs[i]) || scores.has(pairs[i]) || !pairs[i + 1]) throw new EngineDataError("WASM 搜索结果索引无效");
        scores.set(pairs[i], pairs[i + 1]);
      }
    } else {
      for (const record of normalized) {
        const score = scoreRecord(query, record);
        if (score > 0) scores.set(record.idx, score);
      }
    }
    return rankMatches(records, scores);
  }

  async getDescription(id: string): Promise<string> {
    const ids = await this.getIds(), idx = ids.indexOf(id);
    if (idx < 0) return "";
    const digest = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(id));
    const bucket = new Uint8Array(digest)[0] >>> 4;
    const records = await this.dataset.assetJson<unknown>(`l2/shard-${bucket.toString(16)}.json`);
    if (!Array.isArray(records) || records.some((record) => !Array.isArray(record) || !Number.isSafeInteger(record[0]) ||
        record[0] < 0 || record[0] >= ids.length || (record[1] != null && typeof record[1] !== "string"))) throw new EngineDataError("词条说明资源无效");
    return records.find((record) => record[0] === idx)?.[1] ?? "";
  }

  async diagnostics() {
    return { backend: this.wasm ? "wasm" as const : "js" as const, dataVersion: this.dataset.manifest.dataVersion,
      ...(this.wasmUnavailable ? { wasmUnavailable: this.wasmUnavailable } : {}) };
  }
}
