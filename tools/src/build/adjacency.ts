export type GraphEdge = readonly [source: number, relation: number, target: number, context: number];

const MAGIC = 0x32434748;
const FORMAT = 2;
const HEADER_WORDS = 8;
const NO_CONTEXT = 0xffffffff;

export type Adjacency = {
  nodeCount: number;
  edgeCount: number;
  relationCount: number;
  outOffsets: Uint32Array;
  outTargets: Uint32Array;
  outRelations: Uint32Array;
  outContexts: Uint32Array;
  inOffsets: Uint32Array;
  inSources: Uint32Array;
  inRelations: Uint32Array;
  inContexts: Uint32Array;
};

const uint32 = (value: number, label: string): number => {
  if (!Number.isInteger(value) || value < 0 || value > NO_CONTEXT)
    throw new Error(`${label} must be an unsigned 32-bit integer`);
  return value;
};

const offsetsOf = (nodeCount: number, rows: readonly GraphEdge[], column: 0 | 2): Uint32Array => {
  const offsets = new Uint32Array(nodeCount + 1);
  for (const row of rows) offsets[row[column] + 1]++;
  for (let i = 1; i < offsets.length; i++) offsets[i] += offsets[i - 1];
  return offsets;
};

/** HGC2 little-endian CSR; never rely on the host typed-array byte order. */
export function encodeAdjacency(nodeCount: number, relationCount: number, input: readonly GraphEdge[]): Buffer {
  uint32(nodeCount, "node count");
  uint32(relationCount, "relation count");
  uint32(input.length, "edge count");
  for (const [source, relation, target, context] of input) {
    if (uint32(source, "source") >= nodeCount || uint32(target, "target") >= nodeCount)
      throw new Error("graph edge points outside the node table");
    if (uint32(relation, "relation") >= relationCount) throw new Error("graph relation is outside the relation table");
    if (context !== -1) uint32(context, "context");
  }
  const outgoing = [...input].sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3]);
  const incoming = [...input].sort((a, b) => a[2] - b[2] || a[1] - b[1] || a[0] - b[0] || a[3] - b[3]);
  const words = HEADER_WORDS + 2 * (nodeCount + 1) + 6 * input.length;
  uint32(words, "total word count");
  const out = Buffer.alloc(words * 4);
  let offset = 0;
  const append = (values: Iterable<number>) => {
    for (const value of values) { out.writeUInt32LE(value, offset); offset += 4; }
  };
  append([MAGIC, FORMAT, nodeCount, input.length, relationCount, HEADER_WORDS * 4, words, 0]);
  append(offsetsOf(nodeCount, outgoing, 0));
  append(outgoing.map((edge) => edge[2]));
  append(outgoing.map((edge) => edge[1]));
  append(outgoing.map((edge) => edge[3] === -1 ? NO_CONTEXT : edge[3]));
  append(offsetsOf(nodeCount, incoming, 2));
  append(incoming.map((edge) => edge[0]));
  append(incoming.map((edge) => edge[1]));
  append(incoming.map((edge) => edge[3] === -1 ? NO_CONTEXT : edge[3]));
  verifyAdjacency(out, nodeCount, relationCount, input);
  return out;
}

/** Also used by build verification to detect incomplete or incompatible output. */
export function decodeAdjacency(bytes: Uint8Array): Adjacency {
  if (bytes.byteLength < HEADER_WORDS * 4 || bytes.byteLength % 4 !== 0) throw new Error("invalid CSR byte alignment or header");
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const word = (i: number) => view.getUint32(i * 4, true);
  if (word(0) !== MAGIC || word(1) !== FORMAT || word(5) !== HEADER_WORDS * 4 || word(7) !== 0)
    throw new Error("unsupported CSR header");
  const nodeCount = word(2), edgeCount = word(3), relationCount = word(4);
  const totalWords = HEADER_WORDS + 2 * (nodeCount + 1) + 6 * edgeCount;
  if (word(6) !== totalWords || totalWords * 4 !== bytes.byteLength) throw new Error("invalid CSR section size");
  let cursor = HEADER_WORDS;
  const section = (length: number): Uint32Array => {
    const values = new Uint32Array(length);
    for (let i = 0; i < length; i++) values[i] = word(cursor++);
    return values;
  };
  const graph: Adjacency = {
    nodeCount, edgeCount, relationCount,
    outOffsets: section(nodeCount + 1), outTargets: section(edgeCount),
    outRelations: section(edgeCount), outContexts: section(edgeCount),
    inOffsets: section(nodeCount + 1), inSources: section(edgeCount),
    inRelations: section(edgeCount), inContexts: section(edgeCount),
  };
  for (const offsets of [graph.outOffsets, graph.inOffsets]) {
    if (offsets[0] !== 0 || offsets[nodeCount] !== edgeCount) throw new Error("invalid CSR offset endpoints");
    for (let i = 1; i < offsets.length; i++)
      if (offsets[i] < offsets[i - 1] || offsets[i] > edgeCount) throw new Error("invalid CSR offsets");
  }
  for (const nodes of [graph.outTargets, graph.inSources])
    for (const value of nodes) if (value >= nodeCount) throw new Error("CSR node is outside the node table");
  for (const relations of [graph.outRelations, graph.inRelations])
    for (const value of relations) if (value >= relationCount) throw new Error("CSR relation is outside the relation table");
  return graph;
}

export function verifyAdjacency(bytes: Uint8Array, nodeCount: number, relationCount: number, original: readonly GraphEdge[]): void {
  const graph = decodeAdjacency(bytes);
  if (graph.nodeCount !== nodeCount || graph.relationCount !== relationCount || graph.edgeCount !== original.length)
    throw new Error("CSR metadata differs from the source graph");
  const outgoing: GraphEdge[] = [], incoming: GraphEdge[] = [];
  const context = (value: number) => value === NO_CONTEXT ? -1 : value;
  for (let node = 0; node < nodeCount; node++) {
    for (let i = graph.outOffsets[node]; i < graph.outOffsets[node + 1]; i++)
      outgoing.push([node, graph.outRelations[i], graph.outTargets[i], context(graph.outContexts[i])]);
    for (let i = graph.inOffsets[node]; i < graph.inOffsets[node + 1]; i++)
      incoming.push([graph.inSources[i], graph.inRelations[i], node, context(graph.inContexts[i])]);
  }
  const compare = (a: GraphEdge, b: GraphEdge) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3];
  const expected = JSON.stringify([...original].sort(compare));
  if (JSON.stringify(outgoing.sort(compare)) !== expected || JSON.stringify(incoming.sort(compare)) !== expected)
    throw new Error("CSR outgoing or incoming graph differs from the original relations");
}
