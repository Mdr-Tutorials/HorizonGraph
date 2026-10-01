import { EngineDataError } from "./engine-dataset";

export interface NeighborIndex {
  neighbors(node: number, direction: number): Uint32Array;
}

export class CsrIndex implements NeighborIndex {
  readonly nodeCount: number;
  readonly edgeCount: number;
  readonly relationCount: number;
  readonly contexts: Uint32Array[];
  private readonly offsets: Uint32Array[];
  private readonly others: Uint32Array[];
  private readonly relations: Uint32Array[];

  constructor(bytes: Uint8Array) {
    if (bytes.byteLength < 32 || bytes.byteLength % 4 !== 0) throw new EngineDataError("CSR 数据长度无效");
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const words = new Uint32Array(bytes.byteLength / 4);
    for (let i = 0; i < words.length; i++) words[i] = view.getUint32(i * 4, true);
    const [magic, format, nodes, edges, relationCount, header, total, reserved] = words;
    if (magic !== 0x32434748 || format !== 2 || header !== 32 || reserved !== 0 || total !== words.length ||
        total !== 8 + 2 * (nodes + 1) + 6 * edges) throw new EngineDataError("CSR 数据头无效");
    this.nodeCount = nodes;
    this.edgeCount = edges;
    this.relationCount = relationCount;
    let cursor = 8;
    const take = (length: number) => { const section = words.subarray(cursor, cursor + length); cursor += length; return section; };
    const outOffsets = take(nodes + 1), outTargets = take(edges), outRelations = take(edges), outContexts = take(edges);
    const inOffsets = take(nodes + 1), inSources = take(edges), inRelations = take(edges), inContexts = take(edges);
    this.offsets = [outOffsets, inOffsets];
    this.others = [outTargets, inSources];
    this.relations = [outRelations, inRelations];
    this.contexts = [outContexts, inContexts];
    for (let direction = 0; direction < 2; direction++) {
      const offsets = this.offsets[direction];
      if (offsets[0] !== 0 || offsets[nodes] !== edges) throw new EngineDataError("CSR 索引边界无效");
      for (let i = 1; i <= nodes; i++) {
        if (offsets[i] < offsets[i - 1] || offsets[i] > edges) throw new EngineDataError("CSR 索引顺序无效");
      }
      for (let i = 0; i < edges; i++) {
        if (this.others[direction][i] >= nodes || this.relations[direction][i] >= relationCount) {
          throw new EngineDataError("CSR 节点或关系索引越界");
        }
      }
    }
  }

  neighbors(node: number, direction: number): Uint32Array {
    if (!Number.isInteger(node) || node < 0 || node >= this.nodeCount || (direction !== 0 && direction !== 1)) {
      throw new EngineDataError("CSR 查询索引越界");
    }
    const start = this.offsets[direction][node], end = this.offsets[direction][node + 1];
    const result = new Uint32Array((end - start) * 3);
    for (let i = start; i < end; i++) {
      const at = (i - start) * 3;
      result[at] = this.others[direction][i];
      result[at + 1] = this.relations[direction][i];
      result[at + 2] = this.contexts[direction][i];
    }
    return result;
  }
}
