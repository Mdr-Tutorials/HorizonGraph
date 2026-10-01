export type DatasetAsset = {
  url: string;
  sha256: string;
  bytes: number;
  layer: "core" | "description";
};

export type DatasetManifest = {
  format: 2;
  dataVersion: string;
  schemaVersion: string;
  assets: Record<string, DatasetAsset>;
};

export type NodeView = {
  primary: string;
  secondary: string;
  name: string;
  abbr: string;
  type: string;
  summary: string;
  popular: number;
  importance: number;
  status: string;
  first: string;
  ecosystems: string[];
  kind: number;
  level: string;
  aliases: string[];
  official: string;
  realm: string;
};

export type Entry = NodeView & { id: string };
export type Row = { label: string; entry: Entry };
export type EcoLabel = { value: string; zh: string; en: string };
export type Hit = {
  idx: number;
  id: string;
  primary: string;
  secondary: string;
  realm: string;
  kind: number;
  score: number;
};
export type SearchResult = { terms: Hit[]; nav: Hit[] };
export type EngineDiagnostics = { backend: "js" | "wasm"; dataVersion: string; wasmUnavailable?: string };
export type EngineBackend = "js" | "wasm";
export type EngineInitPayload = { base: string; manifest: DatasetManifest; backend: EngineBackend };

export interface GraphEngine {
  getNode(id: string): Promise<NodeView | null>;
  getRelations(id: string): Promise<Row[]>;
  getEcoChains(id: string): Promise<EcoLabel[][]>;
  search(query: string): Promise<SearchResult>;
  getDescription(id: string): Promise<string>;
  diagnostics(): Promise<EngineDiagnostics>;
}

export type EngineOperation = keyof GraphEngine | "init";
export type EngineRequest = { requestId: number; dataVersion: string; op: EngineOperation; payload: unknown };
export type EngineResponse = {
  requestId: number;
  dataVersion: string;
  op: EngineOperation;
  value?: unknown;
  error?: { name: string; message: string; code?: string };
};
