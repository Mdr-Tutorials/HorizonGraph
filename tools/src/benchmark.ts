import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { cpus } from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { DatasetAsset, DatasetManifest, GraphEngine } from "../../web/src/lib/engine-types.js";

// CPU benchmarks of production modules. Data files are read before timing; the in-memory
// fetch still exercises Response handling, SHA-256 validation, JSON parsing and caches.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const BASE = "https://benchmark.invalid/";
type Backend = "js" | "wasm";
type NeighborIndex = { neighbors(node: number, direction: number): Uint32Array };
type WasmExports = { GraphIndex: new (bytes: Uint8Array) => NeighborIndex; score_candidates(query: string, rowsJson: string): Uint32Array };
type NativeWasm = { GraphIndex: new (bytes: Uint8Array) => NeighborIndex & { free(): void }; score_candidates: WasmExports["score_candidates"] };
type Fixture = { name: string; manifest: DatasetManifest; buffers: Map<string, Uint8Array>; ids: string[]; csr: Uint8Array; edges: number; };
type Counter = { requests: number; bytes: number; urls: Set<string> };
type Job = { run(): unknown | Promise<unknown>; cleanup?(): void };
type Summary = { backend: Backend; samples: number; warmupSamples: number; operationsPerSample: number; medianMs: number; p95Ms: number; meanMs: number; minMs: number; maxMs: number };
type Result = { scenario: string; operation: string; query?: string; node?: string; candidates?: number; loadedAssets?: number; loadedBytes?: number; js: Summary; wasm: Summary; medianJsOverWasm: number };

const options = { samples: 25, warmup: 5, batch: 64, largeNodes: 100_000, largeDegree: 3, output: "", queries: ["rust", "c++", "rag", "机器学习", "a"] };
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  const [key, inline] = args[i].split("=", 2);
  if (key === "--help") {
    console.log("Usage: pnpm -C tools exec tsx src/benchmark.ts [--samples 25] [--warmup 5] [--batch 64] [--large-nodes 100000] [--large-degree 3] [--queries rust,c++,rag,机器学习,a] [--output scratch/benchmark.json]");
    process.exit(0);
  }
  const value = inline ?? args[++i];
  if (value === undefined) throw new Error(`Missing value for ${key}`);
  switch (key) {
    case "--samples": options.samples = Number(value); break;
    case "--warmup": options.warmup = Number(value); break;
    case "--batch": options.batch = Number(value); break;
    case "--large-nodes": options.largeNodes = Number(value); break;
    case "--large-degree": options.largeDegree = Number(value); break;
    case "--queries": options.queries = value.split(",").map((query) => query.trim()).filter(Boolean); break;
    case "--output": options.output = value; break;
    default: throw new Error(`Unknown benchmark option: ${key}`);
  }
}
for (const [name, value] of Object.entries(options)) {
  if (typeof value === "number" && (!Number.isSafeInteger(value) || value < (name === "warmup" ? 0 : 1))) throw new Error(`${name} must be an integer ${name === "warmup" ? ">= 0" : ">= 1"}`);
}
if (options.largeDegree > 29 || options.largeNodes <= 1 || options.largeNodes * options.largeDegree > 0xffffffff || !options.queries.length)
  throw new Error("Synthetic CSR requires at least 2 nodes, degree <= 29 and a u32 edge count; queries must not be empty.");

// Load the same Vite-owned production modules via tsx. Dynamic file URLs avoid
// imposing the tools' NodeNext resolution rules on the frontend's bundler imports.
const { GraphEngineCore, queryGrams, gramBucket }: {
  GraphEngineCore: new (dataset: unknown, options?: { loadWasm?(): Promise<WasmExports> }) => GraphEngine;
  queryGrams(query: string): string[]; gramBucket(gram: string): number;
} = await import(pathToFileURL(path.join(ROOT, "web/src/lib/engine-core.ts")).href);
const { CsrIndex }: { CsrIndex: new (bytes: Uint8Array) => NeighborIndex & { edgeCount: number } } =
  await import(pathToFileURL(path.join(ROOT, "web/src/lib/engine-csr.ts")).href);
const { loadDataset }: {
  loadDataset(options: { base: string; manifest: DatasetManifest; dataVersion: string; fetch: typeof fetch }): Promise<unknown>;
} = await import(pathToFileURL(path.join(ROOT, "web/src/lib/engine-dataset.ts")).href);

const json = (relative: string) => JSON.parse(readFileSync(path.join(ROOT, relative), "utf8"));
const digest = (bytes: Uint8Array | string) => createHash("sha256").update(bytes).digest("hex");
const counter = (): Counter => ({ requests: 0, bytes: 0, urls: new Set() });
function fetcher(fixture: Fixture, counts: Counter): typeof fetch {
  return (async (input: URL | Request | string) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    const name = url.pathname.slice(1);
    const bytes = fixture.buffers.get(name);
    if (!bytes) return new Response("missing benchmark asset", { status: 404 });
    counts.requests++; counts.bytes += bytes.byteLength; counts.urls.add(name);
    return new Response(bytes as BodyInit, { headers: { "Content-Type": name.endsWith(".json") ? "application/json" : "application/octet-stream" } });
  }) as typeof fetch;
}

function actualFixture(): Fixture {
  const generated = readFileSync(path.join(ROOT, "web/src/generated/dataset.ts"), "utf8");
  const name = generated.match(/DATA_MANIFEST\s*=\s*["']([^"']+)["']/)?.[1];
  if (!name) throw new Error("Run pnpm build:data before benchmarking.");
  const manifest: DatasetManifest = json(`dist/${name}`);
  const buffers = new Map<string, Uint8Array>();
  for (const asset of Object.values(manifest.assets)) {
    const bytes = readFileSync(path.join(ROOT, "dist", asset.url));
    assert.equal(bytes.byteLength, asset.bytes, asset.url);
    assert.equal(digest(bytes), asset.sha256, asset.url);
    buffers.set(asset.url, bytes);
  }
  const ids: string[] = json("dist/graph/ids.json");
  const csr = buffers.get(manifest.assets["graph/adjacency.bin"].url)!;
  return { name: "actual", manifest, buffers, ids, csr, edges: new CsrIndex(csr).edgeCount };
}

function syntheticFixture(): Fixture {
  const nodes = options.largeNodes, degree = options.largeDegree, edges = nodes * degree;
  const wordCount = 8 + 2 * (nodes + 1) + 6 * edges;
  const csr = Buffer.alloc(wordCount * 4);
  const put = (word: number, value: number) => csr.writeUInt32LE(value, word * 4);
  [0x32434748, 2, nodes, edges, degree, 32, wordCount, 0].forEach((value, word) => put(word, value));
  const out = 8, incoming = out + nodes + 1 + 3 * edges;
  for (let node = 0; node <= nodes; node++) { put(out + node, node * degree); put(incoming + node, node * degree); }
  for (let node = 0; node < nodes; node++) {
    for (let relation = 0; relation < degree; relation++) {
      const at = node * degree + relation, step = (1 + relation * 7919) % nodes;
      put(out + nodes + 1 + at, (node + step) % nodes);
      put(out + nodes + 1 + edges + at, relation);
      put(out + nodes + 1 + 2 * edges + at, 0xffffffff);
      put(incoming + nodes + 1 + at, (node - step + nodes) % nodes);
      put(incoming + nodes + 1 + edges + at, relation);
      put(incoming + nodes + 1 + 2 * edges + at, 0xffffffff);
    }
  }
  const width = String(nodes - 1).length;
  const ids = Array.from({ length: nodes }, (_, node) => `node-${String(node).padStart(width, "0")}`);
  const records = ids.map((id) => [id, "", "concept", "", 3, "active", "", [], 1, "", [], "", "", "", 0]);
  const relations = Array.from({ length: degree }, (_, i) => `benchmark_relation_${i}`);
  const graphManifest = { relations, contexts: [], relation_display: Object.fromEntries(relations.map((relation) => [relation, { zh: relation }])),
    relation_inverse: Object.fromEntries(relations.map((relation) => [relation, relation])) };
  const logical: Record<string, Uint8Array> = {
    "graph/ids.json": Buffer.from(JSON.stringify(ids) + "\n"),
    "graph/nodes.json": Buffer.from(JSON.stringify(records) + "\n"),
    "graph/manifest.json": Buffer.from(JSON.stringify(graphManifest) + "\n"),
    "graph/adjacency.bin": csr,
  };
  const assets: Record<string, DatasetAsset> = {}, buffers = new Map<string, Uint8Array>();
  for (const [name, bytes] of Object.entries(logical).sort(([a], [b]) => a < b ? -1 : 1)) {
    const sha256 = digest(bytes), url = `assets/data/${sha256}${path.extname(name)}`;
    assets[name] = { url, sha256, bytes: bytes.byteLength, layer: "core" }; buffers.set(url, bytes);
  }
  const dataVersion = digest(JSON.stringify({ format: 2, schemaVersion: "benchmark-synthetic-1", assets: Object.entries(assets).map(([name, asset]) => [name, asset.sha256]) }));
  return { name: "synthetic-uniform", manifest: { format: 2, dataVersion, schemaVersion: "benchmark-synthetic-1", assets }, buffers, ids, csr, edges };
}

let sink = 0;
function consume(value: unknown): void {
  let token = 0;
  if (value instanceof Uint32Array) token = value.length ^ (value[0] ?? 0) ^ (value[value.length - 1] ?? 0);
  else if (Array.isArray(value)) token = value.length;
  else if (value && typeof value === "object" && "terms" in value) token = (value as { terms: unknown[] }).terms.length;
  sink = (Math.imul(sink ^ token, 16777619) + 1) >>> 0;
}
function summarize(backend: Backend, times: number[], operationsPerSample: number, warmupSamples: number): Summary {
  const sorted = times.map((ms) => ms / operationsPerSample).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return { backend, samples: sorted.length, warmupSamples, operationsPerSample,
    medianMs: sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2,
    p95Ms: sorted[Math.ceil(sorted.length * 0.95) - 1], meanMs: sorted.reduce((sum, value) => sum + value, 0) / sorted.length,
    minMs: sorted[0], maxMs: sorted[sorted.length - 1] };
}
const results: Result[] = [];
async function measure(details: Omit<Result, "js" | "wasm" | "medianJsOverWasm">, make: (backend: Backend) => Job,
  operationsPerSample = 1, samples = options.samples, warmupSamples = options.warmup): Promise<void> {
  const times: Record<Backend, number[]> = { js: [], wasm: [] };
  for (let iteration = -warmupSamples; iteration < samples; iteration++) {
    // Interleave the implementations instead of measuring one entire backend first.
    const order: Backend[] = iteration % 2 ? ["wasm", "js"] : ["js", "wasm"];
    for (const backend of order) {
      const job = make(backend);
      try {
        const start = performance.now();
        const value = await job.run();
        const elapsed = performance.now() - start;
        consume(value);
        if (iteration >= 0) times[backend].push(elapsed);
      } finally { job.cleanup?.(); }
    }
  }
  const js = summarize("js", times.js, operationsPerSample, warmupSamples), wasm = summarize("wasm", times.wasm, operationsPerSample, warmupSamples);
  results.push({ ...details, js, wasm, medianJsOverWasm: js.medianMs / wasm.medianMs });
}

const wasmPath = path.join(ROOT, "web/src/generated/wasm/graph_core_bg.wasm");
const gluePath = path.join(ROOT, "web/src/generated/wasm/graph_core.js");
if (!existsSync(wasmPath) || !existsSync(gluePath)) throw new Error("Build real WASM before benchmarking: pnpm build:wasm");
const wasmBytes = readFileSync(wasmPath);
const startupAt = performance.now();
const bindings = await import(pathToFileURL(gluePath).href);
await bindings.default({ module_or_path: wasmBytes });
const wasmStartupMs = performance.now() - startupAt;
const wasm: NativeWasm = { GraphIndex: bindings.GraphIndex, score_candidates: bindings.score_candidates };

async function engine(fixture: Fixture, backend: Backend, counts = counter()) {
  const live: Array<NeighborIndex & { free(): void }> = [];
  const tracked: WasmExports = {
    GraphIndex: class implements NeighborIndex {
      private graph: NeighborIndex & { free(): void };
      constructor(bytes: Uint8Array) { this.graph = new wasm.GraphIndex(bytes); live.push(this.graph); }
      neighbors(node: number, direction: number) { return this.graph.neighbors(node, direction); }
    },
    score_candidates: wasm.score_candidates,
  };
  const dataset = await loadDataset({ base: BASE, manifest: fixture.manifest, dataVersion: fixture.manifest.dataVersion, fetch: fetcher(fixture, counts) });
  const core = new GraphEngineCore(dataset, backend === "wasm" ? { loadWasm: async () => tracked } : {});
  return { core, counts, dispose: () => { for (const graph of live) graph.free(); live.length = 0; } };
}

const actual = actualFixture();
for (const rawQuery of options.queries) {
  const query = rawQuery.trim().toLowerCase();
  const validation = { js: await engine(actual, "js"), wasm: await engine(actual, "wasm") };
  try {
    assert.deepEqual(await validation.js.core.search(query), await validation.wasm.core.search(query));
    assert.equal((await validation.wasm.core.diagnostics()).backend, "wasm");
    const grams = queryGrams(query);
    const lists = grams.map((gram) => json(`dist/search/postings-${gramBucket(gram).toString(16)}.json`)[gram] ?? []) as number[][];
    const candidates = (lists[0] ?? []).filter((idx) => lists.every((list) => list.includes(idx))).length;
    const loadedAssets = validation.js.counts.requests, loadedBytes = validation.js.counts.bytes;
    await measure({ scenario: actual.name, operation: "cold-search", query, candidates, loadedAssets, loadedBytes }, (backend) => {
      let state: Awaited<ReturnType<typeof engine>> | undefined;
      return { run: async () => { state = await engine(actual, backend); return state.core.search(query); }, cleanup: () => state?.dispose() };
    });
    await measure({ scenario: actual.name, operation: "hot-search", query, candidates }, (backend) => ({ run: async () => {
      let value;
      for (let i = 0; i < options.batch; i++) value = await validation[backend].core.search(query);
      return value;
    } }), options.batch);
  } finally { validation.js.dispose(); validation.wasm.dispose(); }
}

const synthetic = syntheticFixture();
for (const fixture of [actual, synthetic]) {
  const jsIndex = new CsrIndex(fixture.csr), wasmIndex = new wasm.GraphIndex(fixture.csr);
  try {
    // Check outputs before timing so the benchmark cannot quietly measure the JS fallback.
    for (const node of [0, Math.floor(fixture.ids.length / 2), fixture.ids.length - 1])
      for (const direction of [0, 1]) assert.deepEqual(wasmIndex.neighbors(node, direction), jsIndex.neighbors(node, direction));
    await measure({ scenario: fixture.name, operation: "csr-decode" }, (backend) => {
      let index: NeighborIndex & { free?(): void };
      return { run: () => { index = backend === "js" ? new CsrIndex(fixture.csr) : new wasm.GraphIndex(fixture.csr); return index; },
        cleanup: () => index?.free?.() };
    }, 1, options.samples, Math.max(20, options.warmup));
    await measure({ scenario: fixture.name, operation: "hot-neighbor" }, (backend) => ({ run: () => {
      const index = backend === "js" ? jsIndex : wasmIndex;
      for (let i = 0; i < options.batch; i++) consume(index.neighbors((i * 7919) % fixture.ids.length, i & 1));
    } }), options.batch);
  } finally { wasmIndex.free(); }

  const preferred = fixture.name === "actual" ? "rust" : fixture.ids[0];
  const validation = { js: await engine(fixture, "js"), wasm: await engine(fixture, "wasm") };
  try {
    assert.deepEqual(await validation.js.core.getRelations(preferred), await validation.wasm.core.getRelations(preferred));
    assert.equal((await validation.wasm.core.diagnostics()).backend, "wasm");
    await measure({ scenario: fixture.name, operation: "cold-relations", node: preferred,
      loadedAssets: validation.js.counts.requests, loadedBytes: validation.js.counts.bytes }, (backend) => {
      let state: Awaited<ReturnType<typeof engine>> | undefined;
      return { run: async () => { state = await engine(fixture, backend); return state.core.getRelations(preferred); }, cleanup: () => state?.dispose() };
    });
    const selected = [preferred];
    if (fixture.name === "actual") {
      const index = new CsrIndex(fixture.csr);
      let hub = 0, maximum = 0;
      for (let i = 0; i < fixture.ids.length; i++) {
        const degree = index.neighbors(i, 0).length + index.neighbors(i, 1).length;
        if (degree > maximum) { maximum = degree; hub = i; }
      }
      if (fixture.ids[hub] !== preferred) selected.push(fixture.ids[hub]);
    }
    for (const node of selected) {
      assert.deepEqual(await validation.js.core.getRelations(node), await validation.wasm.core.getRelations(node));
      await measure({ scenario: fixture.name, operation: "hot-relations", node }, (backend) => ({ run: async () => {
        let rows;
        for (let i = 0; i < options.batch; i++) rows = await validation[backend].core.getRelations(node);
        return rows;
      } }), options.batch);
    }
  } finally { validation.js.dispose(); validation.wasm.dispose(); }
}

const fixtureInfo = (fixture: Fixture) => ({ scenario: fixture.name, dataVersion: fixture.manifest.dataVersion,
  nodes: fixture.ids.length, edges: fixture.edges, csrBytes: fixture.csr.byteLength,
  assetBytes: Object.values(fixture.manifest.assets).reduce((sum, asset) => sum + asset.bytes, 0) });
const report = {
  format: 1,
  environment: { node: process.version, platform: process.platform, arch: process.arch, cpu: cpus()[0]?.model ?? "unknown", logicalCpus: cpus().length },
  config: { samples: options.samples, warmup: options.warmup, operationsPerHotSample: options.batch, queries: options.queries,
    syntheticNodes: options.largeNodes, syntheticDegree: options.largeDegree },
  methodology: {
    timeUnit: "milliseconds per operation", percentiles: "median; nearest-rank p95",
    transport: "Preloaded in-memory bytes; no network, filesystem reads or Worker message latency inside timings. Production DatasetLoader Response/SHA-256/JSON validation is timed.",
    cold: "A fresh DatasetLoader and GraphEngineCore per operation; pinned manifest validation included. WASM code is already initialized; first initialization is reported separately.",
    hot: "Reuse a core whose query or graph assets are already loaded; candidates are normalized/scored/ranked on every call. Timing a batch and dividing by its operation count reduces timer noise.",
    graph: "csr-decode is raw CsrIndex vs actual WASM GraphIndex. cold-relations follows the production core and therefore includes JS CSR validation even for WASM, plus id/node JSON parsing and relation rendering.",
    synthetic: "Deterministic uniform graph with equal outgoing/incoming degree, synthetic node labels and no contexts. It expands only graph benchmarks; search uses the actual generated dataset.",
    order: "Alternating JS/WASM samples with warmup; temporary WASM graphs are explicitly freed after timing. No speed or latency assertion is made.",
    runtime: "Default Node/V8 garbage collection and OS scheduling; no CPU isolation. Hot p95 describes batch-normalized samples, not browser interaction latency. The single WASM startup observation includes importing generated JS glue.",
  },
  wasm: { bytes: wasmBytes.byteLength, sha256: digest(wasmBytes), firstModuleImportAndInitializationMs: wasmStartupMs },
  datasets: [fixtureInfo(actual), fixtureInfo(synthetic)],
  results,
  checksum: sink >>> 0,
};
const serialized = JSON.stringify(report, null, 2) + "\n";
if (options.output) {
  const target = path.resolve(ROOT, options.output); mkdirSync(path.dirname(target), { recursive: true }); writeFileSync(target, serialized);
}
process.stdout.write(serialized);
