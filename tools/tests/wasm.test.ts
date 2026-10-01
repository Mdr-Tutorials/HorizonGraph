import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import init, { GraphIndex, score_candidates } from "../../web/src/generated/wasm/graph_core.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
await init({ module_or_path: readFileSync(path.join(ROOT, "web/src/generated/wasm/graph_core_bg.wasm")) });

const words = [
  0x32434748, 2, 3, 2, 2, 32, 28, 0,
  0, 1, 1, 2, 1, 1, 0, 1, 0xffffffff, 7,
  0, 0, 2, 2, 0, 2, 0, 1, 0xffffffff, 7,
];
function encode(values: number[]): Uint8Array {
  const bytes = new Uint8Array(values.length * 4);
  const view = new DataView(bytes.buffer);
  values.forEach((value, index) => view.setUint32(index * 4, value, true));
  return bytes;
}

test("actual WASM decodes CSR directions and context sentinel", () => {
  const graph = new GraphIndex(encode(words));
  try {
    assert.equal(graph.node_count, 3);
    assert.equal(graph.edge_count, 2);
    assert.equal(graph.relation_count, 2);
    assert.deepEqual([...graph.neighbors(0, 0)], [1, 0, 0xffffffff]);
    assert.deepEqual([...graph.neighbors(1, 1)], [0, 0, 0xffffffff, 2, 1, 7]);
    assert.equal(graph.neighbors(1, 0).length, 0);
    assert.throws(() => graph.neighbors(3, 0));
    assert.throws(() => graph.neighbors(0, 2));
    for (const invalid of [-1, 0.5, 0x100000000, NaN, Infinity]) {
      assert.throws(() => graph.neighbors(invalid, 0));
      assert.throws(() => graph.neighbors(0, invalid));
    }
  } finally {
    graph.free();
  }
});

test("actual WASM rejects corrupt CSR rather than trapping", () => {
  for (const [index, value] of [[0, 0], [2, 0xffffffff], [3, 0xffffffff], [6, 27], [9, 2], [12, 3], [14, 2], [19, 3], [22, 3]]) {
    const corrupt = words.slice();
    corrupt[index] = value;
    assert.throws(() => new GraphIndex(encode(corrupt)));
  }
  assert.throws(() => new GraphIndex(new Uint8Array(31)));
});

type Row = { idx: number; id: string; name: string; abbr: string; aliases: string[]; importance: number };
function jsScores(query: string, rows: Row[]) {
  const pairs: number[] = [];
  if (!query) return pairs;
  for (const row of rows) {
    let score = row.name.startsWith(query) ? 30 : row.name.includes(query) ? 15 : 0;
    score += row.abbr === query ? 25 : row.abbr.startsWith(query) ? 18 : 0;
    if (row.aliases.some((alias) => alias.includes(query))) score += 8;
    if (row.id.includes(query)) score += 6;
    if (row.name === query || row.abbr === query || row.id === query || row.aliases.includes(query)) score += 100;
    if (score > 0) pairs.push(row.idx, score + row.importance * 2);
  }
  return pairs;
}

test("actual WASM preserves exact-match priority, Chinese aliases, symbols and JS normalization", () => {
  const rows: Row[] = [
    { idx: 0, id: "oc", name: "oc", abbr: "oc", aliases: ["开放计算"], importance: 3 },
    { idx: 1, id: "ocaml", name: "ocaml", abbr: "", aliases: [], importance: 5 },
    { idx: 2, id: "cpp", name: "c++", abbr: "c++", aliases: ["cplusplus"], importance: 5 },
    { idx: 3, id: "special", name: "İΣ😀".toLowerCase(), abbr: "", aliases: ["中文", "a😀b"], importance: 0 },
  ];
  for (const raw of [" OC ", "cam", "开放", "开放计算", "c++", "+", "😀", "Σ", "İ", "中文", "no-match", ""]) {
    const query = raw.trim().toLowerCase();
    assert.deepEqual([...score_candidates(query, JSON.stringify(rows))], jsScores(query, rows));
  }
  assert.deepEqual([...score_candidates("oc", JSON.stringify(rows))], [0, 167, 1, 46]);
});

test("actual WASM rejects candidate numeric overflow and malformed JSON", () => {
  const base = { idx: 0, id: "x", name: "x", abbr: "", aliases: [], importance: 3 };
  for (const change of [{ importance: 6 }, { importance: 0xffffffff }, { importance: -1 }, { importance: 1.5 }, { importance: "3" }, { idx: 0x100000000 }, { idx: -1 }]) {
    assert.throws(() => score_candidates("x", JSON.stringify([{ ...base, ...change }])));
  }
  assert.throws(() => score_candidates("x", "not-json"));
});

const adjacencyPath = path.join(ROOT, "dist/graph/adjacency.bin");
test("actual WASM adjacency matches every outgoing and incoming edge in the built dataset", { skip: !existsSync(adjacencyPath) }, () => {
  const graph = new GraphIndex(readFileSync(adjacencyPath));
  const ids: string[] = JSON.parse(readFileSync(path.join(ROOT, "dist/graph/ids.json"), "utf8"));
  const edges: number[][] = JSON.parse(readFileSync(path.join(ROOT, "dist/graph/edges.json"), "utf8"));
  const expectedOut: number[][][] = ids.map(() => []);
  const expectedIn: number[][][] = ids.map(() => []);
  const unsignedContext = (context: number) => context < 0 ? 0xffffffff : context;
  for (const [source, relation, target, context] of edges) {
    expectedOut[source].push([target, relation, unsignedContext(context)]);
    expectedIn[target].push([source, relation, unsignedContext(context)]);
  }
  const compare = (left: number[], right: number[]) => left[1] - right[1] || left[0] - right[0] || left[2] - right[2];
  try {
    assert.equal(graph.node_count, ids.length);
    assert.equal(graph.edge_count, edges.length);
    for (let node = 0; node < ids.length; node++) {
      assert.deepEqual([...graph.neighbors(node, 0)], expectedOut[node].sort(compare).flat(), `outgoing ${ids[node]}`);
      assert.deepEqual([...graph.neighbors(node, 1)], expectedIn[node].sort(compare).flat(), `incoming ${ids[node]}`);
    }
  } finally {
    graph.free();
  }
});
