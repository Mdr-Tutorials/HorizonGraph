import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { CsrIndex } from "../src/lib/engine-csr";
import { GraphEngineCore, gramBucket, queryGrams, type SearchRecord } from "../src/lib/engine-core";
import { loadDataset, EngineDataError } from "../src/lib/engine-dataset";
import type { DatasetManifest } from "../src/lib/engine-types";

const hash = (bytes: string | Uint8Array) => createHash("sha256").update(bytes).digest("hex");
const encode = (value: unknown) => new TextEncoder().encode(JSON.stringify(value));
const csrWords = [
  0x32434748, 2, 4, 4, 2, 32, 42, 0,
  0, 2, 2, 3, 4, 1, 2, 1, 2, 0, 1, 0, 1, 0xffffffff, 0, 0, 0,
  0, 0, 2, 4, 4, 0, 2, 0, 3, 0, 0, 1, 1, 0xffffffff, 0, 0, 0,
];
function csrBytes(words = csrWords) {
  const bytes = new Uint8Array(words.length * 4), view = new DataView(bytes.buffer);
  words.forEach((word, i) => view.setUint32(i * 4, word, true));
  return bytes;
}

const record = (idx: number, id: string, name: string, extra: Partial<SearchRecord> = {}): SearchRecord => ({
  idx, id, name, abbr: "", aliases: [], type: "tool", importance: 3, parent: -1,
  primary: name, secondary: "", realm: "technical", kind: 1, ...extra,
});
const records = [
  record(0, "alpha-v1", "Alpha 1", { aliases: ["阿尔法一"], parent: 1 }),
  record(1, "alpha", "Alpha", { aliases: ["阿尔法", "多🦀字中文", "C++"], importance: 5 }),
  record(2, "alpha-v2", "Alpha 2", { aliases: ["阿尔法二"], parent: 1 }),
  record(3, "architecture", "Architecture", { kind: 0, realm: "conceptual", type: "meta_concept" }),
];

function fixture(options: { corruptCsr?: boolean; tamperAsset?: string; failOnce?: string; importance?: number } = {}) {
  const assets = new Map<string, Uint8Array>();
  const nodes = records.map((r) => [r.name, "", r.type, `About ${r.name}`, r.importance, "active", "", [], r.kind, "", r.aliases, "", r.primary, "", 80]);
  assets.set("graph/ids.json", encode(records.map((r) => r.id)));
  assets.set("graph/nodes.json", encode(nodes));
  assets.set("graph/manifest.json", encode({ relations: ["version_of", "depends_on"], contexts: ["context"],
    relation_display: { depends_on: { zh: "依赖" } }, relation_inverse: { depends_on: "依赖方" } }));
  const words = [...csrWords];
  if (options.corruptCsr) words[13] = 4;
  assets.set("graph/adjacency.bin", csrBytes(words));
  assets.set("graph/node-ecosystems.json", encode([[["web", "compiler"]], [], [], []]));
  assets.set("eco-vocab.json", encode({ entries: [{ value: "web", zh: "Web", en: "Web" }, { value: "compiler", zh: "编译器", en: "Compiler" }] }));
  const descriptionBucket = createHash("sha1").update("alpha").digest("hex")[0];
  assets.set(`l2/shard-${descriptionBucket}.json`, encode([[1, "Long description"]]));
  assets.set("search/routing.json", encode({ format: 1, shards: 16, gramLengths: [1, 2, 3], postingsHash: "fnv1a-utf16", recordsHash: "idx-modulo" }));
  const postings: Map<string, Set<number>> = new Map();
  for (const r of records) {
    for (const text of [r.id, r.name, r.abbr, ...r.aliases]) {
      const characters = Array.from(text.toLowerCase());
      for (let length = 1; length <= 3; length++) {
        for (let i = 0; i <= characters.length - length; i++) {
          const gram = characters.slice(i, i + length).join("");
          if (!postings.has(gram)) postings.set(gram, new Set());
          postings.get(gram)!.add(r.idx);
        }
      }
    }
  }
  for (let bucket = 0; bucket < 16; bucket++) {
    assets.set(`search/records-${bucket.toString(16)}.json`, encode(records.filter((r) => r.idx % 16 === bucket)
      .map((r) => options.importance === undefined ? r : { ...r, importance: options.importance })));
    const table = Object.fromEntries([...postings].filter(([gram]) => gramBucket(gram) === bucket)
      .map(([gram, indices]) => [gram, [...indices].sort((a, b) => a - b)]));
    assets.set(`search/postings-${bucket.toString(16)}.json`, encode(table));
  }
  const manifest: DatasetManifest = { format: 2, dataVersion: "", schemaVersion: "test", assets: {} };
  const resources = new Map<string, { name: string; bytes: Uint8Array }>();
  for (const [name, bytes] of [...assets].sort(([a], [b]) => a < b ? -1 : 1)) {
    const digest = hash(bytes), url = `assets/data/${digest}.${name.endsWith("bin") ? "bin" : "json"}`;
    manifest.assets[name] = { url, sha256: digest, bytes: bytes.length, layer: name.startsWith("l2/") ? "description" : "core" };
    resources.set(url, { name, bytes });
  }
  manifest.dataVersion = hash(JSON.stringify({ format: 2, schemaVersion: manifest.schemaVersion, assets: Object.entries(manifest.assets).map(([name, asset]) => [name, asset.sha256]) }));
  const requests: string[] = [];
  let failed = false;
  const fetcher: typeof fetch = async (input) => {
    const resource = resources.get(new URL(String(input)).pathname.replace("/HorizonGraph/", ""));
    assert.ok(resource, `Unexpected resource ${input}`);
    requests.push(resource.name);
    if (resource.name === options.failOnce && !failed) { failed = true; return new Response(null, { status: 503 }); }
    const bytes = resource.name === options.tamperAsset ? new Uint8Array(resource.bytes.length) : resource.bytes;
    return new Response(new Uint8Array(bytes).buffer);
  };
  return { manifest, requests, open: () => loadDataset({ base: "https://test.invalid/HorizonGraph/", manifest, fetch: fetcher }) };
}

test("CSR reads both directions and rejects malformed headers, offsets and endpoints", () => {
  const csr = new CsrIndex(csrBytes());
  assert.deepEqual([...csr.neighbors(0, 0)], [1, 0, 0xffffffff, 2, 1, 0]);
  assert.deepEqual([...csr.neighbors(2, 1)], [0, 1, 0, 3, 1, 0]);
  assert.deepEqual([...csr.neighbors(1, 0)], []);
  for (const [word, value] of [[0, 0], [6, 41], [10, 1], [13, 4], [17, 2]]) {
    const invalid = [...csrWords]; invalid[word] = value;
    assert.throws(() => new CsrIndex(csrBytes(invalid)), EngineDataError);
  }
  assert.throws(() => csr.neighbors(4, 0), EngineDataError);
});

test("search preserves substring, punctuation, astral Unicode and version folding without loading graph", async () => {
  const f = fixture(), engine = new GraphEngineCore(await f.open());
  assert.deepEqual((await engine.search("  ALPHA ")).terms.map((hit) => hit.id), ["alpha"]);
  assert.deepEqual((await engine.search("Alpha 2")).terms.map((hit) => hit.id), ["alpha-v2"]);
  for (const query of ["尔法", "🦀", "🦀字", "多🦀字", "++", "字中"]) {
    assert.ok((await engine.search(query)).terms.some((hit) => hit.id === "alpha"), query);
  }
  const navigation = await engine.search("architecture");
  assert.equal(navigation.terms.length, 0);
  assert.deepEqual(navigation.nav.map((hit) => hit.id), ["architecture"]);
  assert.deepEqual(await engine.search("no-match"), { terms: [], nav: [] });
  assert.ok(f.requests.every((name) => name.startsWith("search/")));
  assert.deepEqual(queryGrams("多🦀字中"), ["多🦀字", "🦀字中"]);
});

test("a selective search fetches only necessary postings and candidate record buckets", async () => {
  const f = fixture(), engine = new GraphEngineCore(await f.open());
  await engine.search("architecture");
  const expected = new Set(queryGrams("architecture").map((gram) => `search/postings-${gramBucket(gram).toString(16)}.json`));
  assert.deepEqual(new Set(f.requests), new Set(["search/routing.json", "search/records-3.json", ...expected]));
  const before = f.requests.length;
  await engine.search("architecture");
  assert.equal(f.requests.length, before);
});

test("graph queries preserve version siblings, direction labels, ecosystems and lazy descriptions", async () => {
  const f = fixture(), engine = new GraphEngineCore(await f.open());
  assert.equal((await engine.getNode("alpha"))?.primary, "Alpha");
  assert.equal(await engine.getNode("missing"), null);
  const rows = await engine.getRelations("alpha-v1");
  assert.deepEqual(rows.filter((r) => r.label === "版本").map((r) => r.entry.id), ["alpha-v1", "alpha-v2"]);
  assert.ok(rows.some((r) => r.label === "属于" && r.entry.id === "alpha"));
  assert.ok(rows.some((r) => r.label === "依赖" && r.entry.id === "alpha-v2"));
  assert.deepEqual(await engine.getEcoChains("alpha-v1"), [[{ value: "web", zh: "Web", en: "Web" }, { value: "compiler", zh: "编译器", en: "Compiler" }]]);
  assert.ok(!f.requests.some((name) => name.startsWith("l2/")));
  assert.equal(await engine.getDescription("alpha"), "Long description");
  assert.ok(!f.requests.includes("graph/edges.json") && !f.requests.includes("graph/reverse.json"));
});

test("WASM loading can fall back while data or WASM decoder failures remain visible", async () => {
  const f = fixture(), engine = new GraphEngineCore(await f.open(), { loadWasm: async () => { throw new Error("WASM unavailable"); } });
  assert.equal((await engine.search("alpha")).terms[0].id, "alpha");
  assert.deepEqual(await engine.diagnostics(), { backend: "js", dataVersion: f.manifest.dataVersion, wasmUnavailable: "WASM unavailable" });
  let constructed = 0;
  const exports = { GraphIndex: class { constructor() { constructed++; throw new Error("WASM decode failure"); } neighbors() { return new Uint32Array(); } }, score_candidates() { return new Uint32Array(); } };
  const corrupt = fixture({ corruptCsr: true }), corruptEngine = new GraphEngineCore(await corrupt.open(), { loadWasm: async () => exports });
  await assert.rejects(corruptEngine.getNode("alpha"), EngineDataError);
  assert.equal(constructed, 0);
  const valid = fixture(), wasmEngine = new GraphEngineCore(await valid.open(), { loadWasm: async () => exports });
  await assert.rejects(wasmEngine.getNode("alpha"), /WASM decode failure/);
  assert.equal(constructed, 1);
});

test("resource and manifest hashes are enforced and a transient failure can be retried", async () => {
  const tampered = fixture({ tamperAsset: "search/routing.json" }), badEngine = new GraphEngineCore(await tampered.open());
  await assert.rejects(badEngine.search("alpha"), EngineDataError);
  const changed = fixture(); changed.manifest.assets["search/routing.json"].sha256 = "0".repeat(64);
  await assert.rejects(changed.open(), EngineDataError);
  const transient = fixture({ failOnce: "search/routing.json" }), engine = new GraphEngineCore(await transient.open());
  await assert.rejects(engine.search("alpha"), /503/);
  assert.equal((await engine.search("alpha")).terms[0].id, "alpha");
});

test("invalid importance values are rejected before either scoring backend runs", async () => {
  for (const importance of [-1, 1.5, 6]) {
    const f = fixture({ importance }), engine = new GraphEngineCore(await f.open());
    await assert.rejects(engine.search("alpha"), EngineDataError);
  }
});
