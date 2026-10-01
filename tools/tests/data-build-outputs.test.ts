import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { verifyAdjacency, type GraphEdge } from "../src/build/adjacency.js";
import { postingBucket, type SearchRecord } from "../src/build/search-index.js";
import { sha256, type DataManifest } from "../src/build/release.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const json = (name: string): any => JSON.parse(readFileSync(path.join(root, name), "utf8"));
const nodeFiles = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const target = path.join(directory, entry.name);
  return entry.isDirectory() ? nodeFiles(target) : entry.name.endsWith(".json") ? [target] : [];
}).sort();

test("built CSR matches every original data and ontology relation, including pooled contexts", () => {
  const ids: string[] = json("dist/graph/ids.json");
  const graphManifest = json("dist/graph/manifest.json");
  const sources = [...json("contracts/ontology.json").nodes,
    ...nodeFiles(path.join(root, "data", "nodes")).map((file) => JSON.parse(readFileSync(file, "utf8")))];
  assert.deepEqual(ids, sources.map((node) => node.id).sort());
  const index = new Map(ids.map((id, i) => [id, i]));
  const expected: GraphEdge[] = sources.flatMap((node) => (node.relations ?? []).map((edge: any) => [
    index.get(node.id), graphManifest.relations.indexOf(edge.relation_type), index.get(edge.target_id),
    edge.context ? graphManifest.contexts.indexOf(edge.context) : -1,
  ]));
  verifyAdjacency(readFileSync(path.join(root, "dist/graph/adjacency.bin")), ids.length, graphManifest.relations.length, expected);
});

test("ecosystem chains align with every graph id, including empty ontology neighborhoods", () => {
  const ids: string[] = json("dist/graph/ids.json");
  const chains: unknown[] = json("dist/graph/node-ecosystems.json");
  assert.equal(chains.length, ids.length);
  for (let i = 0; i < ids.length; i++) {
    assert(Array.isArray(chains[i]), `${ids[i]} has a missing or null ecosystem record`);
    for (const chain of chains[i] as unknown[]) {
      assert(Array.isArray(chain), `${ids[i]} has an invalid ecosystem path`);
      assert(chain.every((value) => typeof value === "string"));
    }
  }
  for (const node of json("contracts/ontology.json").nodes) assert.deepEqual(chains[ids.indexOf(node.id)], []);
});

test("built query routing preserves current substring results and includes navigation and versions", () => {
  const records: SearchRecord[] = [];
  const postings: Record<string, number[]>[] = [];
  for (let bucket = 0; bucket < 16; bucket++) {
    const shard: SearchRecord[] = json(`dist/search/records-${bucket.toString(16)}.json`);
    for (const row of shard) assert.equal(row.idx % 16, bucket);
    records.push(...shard);
    postings.push(json(`dist/search/postings-${bucket.toString(16)}.json`));
  }
  records.sort((a, b) => a.idx - b.idx);
  const ids: string[] = json("dist/graph/ids.json");
  assert.deepEqual(records.map((record) => record.id), ids);
  assert.equal(records.filter((record) => record.kind === 0).length, json("contracts/ontology.json").nodes.length);
  assert(records.some((record) => record.parent >= 0));
  const queries = new Set(["C++", "OC", "LLM", "Rust", "语言", "机器学习", "招聘", "FLAG", "理论", "+", "@", "no-such-horizon-node"]);
  for (const row of records.filter((record) => record.idx % 17 === 0)) {
    for (const field of [row.id, row.name, row.abbr, ...row.aliases].filter(Boolean)) {
      const points = Array.from(field);
      queries.add(field); queries.add(points[0]);
      queries.add(points.slice(Math.floor(points.length / 2), Math.floor(points.length / 2) + 3).join(""));
    }
  }
  const byIndex = new Map(records.map((row) => [row.idx, row]));
  const matches = (row: SearchRecord, query: string) => [row.id, row.name, row.abbr, ...row.aliases].some((field) => field.toLowerCase().includes(query));
  for (const raw of queries) {
    const query = raw.trim().toLowerCase();
    if (!query) continue;
    const points = Array.from(query), length = Math.min(3, points.length);
    const grams = [...new Set(Array.from({ length: points.length - length + 1 }, (_, i) => points.slice(i, i + length).join("")))];
    const lists = grams.map((gram) => postings[postingBucket(gram)][gram] ?? []);
    const candidates = (lists[0] ?? []).filter((idx) => lists.every((list) => list.includes(idx)));
    const actual = candidates.filter((idx) => matches(byIndex.get(idx)!, query));
    const expected = records.filter((row) => matches(row, query)).map((row) => row.idx);
    assert.deepEqual(actual, expected, `routing changed substring matches for ${JSON.stringify(raw)}`);
  }
});

test("generated deployment manifest pins every logical resource to verified immutable bytes", () => {
  const generated = readFileSync(path.join(root, "web/src/generated/dataset.ts"), "utf8");
  const manifestName = JSON.parse(generated.match(/DATA_MANIFEST = ("[^"]+");/)![1]);
  const manifest: DataManifest = json(`dist/${manifestName}`);
  assert.equal(manifest.format, 2);
  assert.equal(manifestName, `releases/${manifest.dataVersion}.json`);
  for (const [logical, asset] of Object.entries(manifest.assets)) {
    const original = readFileSync(path.join(root, "dist", logical));
    const published = readFileSync(path.join(root, "dist", asset.url));
    assert.deepEqual(published, original, logical);
    assert.equal(sha256(published), asset.sha256, logical);
    assert.equal(published.byteLength, asset.bytes, logical);
    assert.equal(asset.layer, logical.startsWith("l2/") ? "description" : "core");
  }
  assert(manifest.assets["graph/adjacency.bin"]);
  assert(manifest.assets["search/routing.json"]);
  assert(manifest.assets["redirects.json"]);
  assert(Object.keys(manifest.assets).every((logical) => !/^(assets|releases|fonts|\.cache)\//.test(logical)));
});
