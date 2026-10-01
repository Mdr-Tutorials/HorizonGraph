import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { decodeAdjacency, encodeAdjacency, verifyAdjacency, type GraphEdge } from "../src/build/adjacency.js";
import { createSearchIndex, gramsOf, postingBucket, searchLabel, type SearchRecord } from "../src/build/search-index.js";
import { completeDataRelease, generatedDataset, publishDataRelease, sha256 } from "../src/build/release.js";

test("CSR preserves incoming and outgoing original relations, contexts and empty neighborhoods", () => {
  const edges: GraphEdge[] = [[3, 1, 1, -1], [0, 2, 1, 0], [0, 0, 3, 2], [1, 2, 1, 1]];
  const bytes = encodeAdjacency(5, 3, edges);
  const graph = decodeAdjacency(bytes);
  assert.equal(bytes.subarray(0, 4).toString(), "HGC2");
  assert.deepEqual([...graph.outOffsets], [0, 2, 3, 3, 4, 4]);
  assert.deepEqual([...graph.inOffsets], [0, 0, 3, 3, 4, 4]);
  assert.deepEqual([...graph.outTargets], [3, 1, 1, 1]);
  assert.deepEqual([...graph.outContexts], [2, 0, 1, 0xffffffff]);
  verifyAdjacency(bytes, 5, 3, edges);
  assert.deepEqual(encodeAdjacency(5, 3, [...edges].reverse()), bytes);
  verifyAdjacency(encodeAdjacency(0, 0, []), 0, 0, []);
});

test("CSR rejects malformed header, size, offsets, references and inconsistent inverse data", () => {
  const edges: GraphEdge[] = [[0, 0, 1, -1]];
  const bytes = encodeAdjacency(2, 1, edges);
  const change = (offset: number, value: number) => { const copy = Buffer.from(bytes); copy.writeUInt32LE(value, offset); return copy; };
  assert.throws(() => decodeAdjacency(bytes.subarray(0, bytes.length - 1)), /alignment/);
  assert.throws(() => decodeAdjacency(change(0, 0)), /header/);
  assert.throws(() => decodeAdjacency(change(24, 999)), /size/);
  assert.throws(() => decodeAdjacency(change(32, 1)), /endpoints/);
  assert.throws(() => decodeAdjacency(change(36, 2)), /offsets/);
  assert.throws(() => decodeAdjacency(change(44, 2)), /node/);
  assert.throws(() => decodeAdjacency(change(48, 1)), /relation/);
  // Incoming source is at word 17: mutate it to a valid, incorrect source.
  assert.throws(() => verifyAdjacency(change(68, 1), 2, 1, edges), /original relations/);
  assert.throws(() => encodeAdjacency(2, 1, [[2, 0, 1, -1]]), /node table/);
});

const record = (idx: number, id: string, name: string, aliases: string[], parent = -1, kind = 1): SearchRecord => ({
  idx, id, name, abbr: "", aliases, type: kind ? "concept" : "meta_concept", importance: 4,
  parent, primary: aliases[0] ?? name, secondary: name, realm: "conceptual", kind,
});

test("routed n-gram candidates retain substring recall across aliases, symbols and Unicode", () => {
  const rows = [record(0, "cpp", "C++", ["C++ 语言", "Ω😀语言"]), record(17, "cpp-23", "C++23", ["C++ 23"], 0),
    record(2, "ocaml", "OCaml", ["函数式语言"]), record(3, "theory", "Theory", ["理论"], -1, 0)];
  const index = createSearchIndex(rows);
  const queries = ["C++", "+", "语言", "Ω😀", "😀语", "OC", "cpp-", "theory", "理论", "式", "none"];
  for (const q of queries) {
    const query = q.trim().toLowerCase();
    const grams = gramsOf(query, [Math.min(3, Array.from(query).length)]);
    const lists = grams.map((gram) => index.postings[postingBucket(gram)][gram] ?? []);
    const candidates = (lists[0] ?? []).filter((idx) => lists.every((list) => list.includes(idx)));
    const expected = rows.filter((row) => [row.id, row.name, row.abbr, ...row.aliases].some((field) => field.toLowerCase().includes(query)));
    for (const row of expected) assert(candidates.includes(row.idx), `${q} omitted ${row.id}`);
    const matched = candidates.filter((idx) => {
      const row = index.records[idx % 16].find((entry) => entry.idx === idx)!;
      return [row.id, row.name, row.abbr, ...row.aliases].some((field) => field.toLowerCase().includes(query));
    });
    assert.deepEqual(matched, expected.map((row) => row.idx).sort((a, b) => a - b));
  }
  assert.deepEqual(createSearchIndex([...rows].reverse()), index);
  assert.equal(index.records[1][0].parent, 0);
  assert.equal(index.records[3][0].kind, 0);
});

test("search records follow the existing two-part display name policy", () => {
  assert.deepEqual(searchLabel("Tensor", "", ["张量"]), { primary: "张量", secondary: "Tensor" });
  assert.deepEqual(searchLabel("Acme", "", ["艾克米"], "", "", "organization"), { primary: "Acme", secondary: "艾克米" });
  assert.deepEqual(searchLabel("Large Language Model", "LLM", []), { primary: "LLM", secondary: "Large Language Model" });
  assert.deepEqual(searchLabel("Rust", "", [], "Rust", "Rust"), { primary: "Rust", secondary: "" });
});

test("data releases deterministically pin hashes, layers and generation; corrupted assets invalidate cache", () => {
  const temp = mkdtempSync(path.join(os.tmpdir(), "horizon-release-"));
  try {
    const sources: Record<string, string | Buffer> = {
      "graph/adjacency.bin": encodeAdjacency(2, 1, [[0, 0, 1, -1]]),
      "search/routing.json": "{\"format\":1}\n",
      "l2/shard-0.json": "[[0,\"正文\"]]\n",
      "redirects.json": "{\"entries\":[]}\n",
    };
    for (const [name, bytes] of Object.entries(sources)) {
      const target = path.join(temp, name); mkdirSync(path.dirname(target), { recursive: true }); writeFileSync(target, bytes);
    }
    const first = publishDataRelease(temp, "3.5.0", Object.keys(sources));
    const second = publishDataRelease(temp, "3.5.0", Object.keys(sources).reverse());
    assert.deepEqual(first, second);
    assert.equal(first.assets["l2/shard-0.json"].layer, "description");
    assert.equal(first.assets["graph/adjacency.bin"].layer, "core");
    for (const asset of Object.values(first.assets)) {
      const bytes = readFileSync(path.join(temp, asset.url));
      assert.equal(bytes.byteLength, asset.bytes); assert.equal(sha256(bytes), asset.sha256);
    }
    const generated = path.join(temp, "dataset.ts"); writeFileSync(generated, generatedDataset(first));
    assert(completeDataRelease(temp, first.dataVersion, generated));
    assert.notEqual(publishDataRelease(temp, "3.6.0", Object.keys(sources)).dataVersion, first.dataVersion);
    const url = first.assets["graph/adjacency.bin"].url;
    writeFileSync(path.join(temp, url), "damaged");
    assert(!completeDataRelease(temp, first.dataVersion, generated));
    publishDataRelease(temp, "3.5.0", Object.keys(sources));
    assert(completeDataRelease(temp, first.dataVersion, generated));
    writeFileSync(path.join(temp, "redirects.json"), "{\"entries\":[{\"from\":\"old\",\"to\":\"new\"}]}\n");
    assert(!completeDataRelease(temp, first.dataVersion, generated));
    assert.notEqual(publishDataRelease(temp, "3.5.0", Object.keys(sources)).dataVersion, first.dataVersion);
  } finally { rmSync(temp, { recursive: true, force: true }); }
});
