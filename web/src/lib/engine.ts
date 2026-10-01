import { loadDataset } from "./dataset";
import { GraphEngineCore } from "./engine-core";
import { DatasetLoader, EngineDataError } from "./engine-dataset";
import type { EcoLabel, EngineDiagnostics, EngineInitPayload, EngineOperation, EngineResponse, GraphEngine, NodeView, Row, SearchResult } from "./engine-types";

class WorkerUnavailableError extends Error {
  constructor(message: string) { super(message); this.name = "WorkerUnavailableError"; }
}
type Pending = { op: EngineOperation; resolve(value: unknown): void; reject(error: Error): void };

class WorkerTransport {
  private requestId = 0;
  private pending = new Map<number, Pending>();
  private failure?: WorkerUnavailableError;
  private ready: Promise<unknown>;

  constructor(private worker: Worker, private dataset: DatasetLoader) {
    worker.addEventListener("message", (event: MessageEvent<EngineResponse>) => {
      const response = event.data;
      const pending = this.pending.get(response?.requestId);
      if (!pending) return;
      this.pending.delete(response.requestId);
      if (response.dataVersion !== dataset.manifest.dataVersion || response.op !== pending.op) {
        pending.reject(new EngineDataError("图谱 Worker 响应与当前请求不一致"));
      } else if (response.error) {
        const error = response.error.code === "data-corrupt" ? new EngineDataError(response.error.message) : new Error(response.error.message);
        error.name = response.error.name;
        pending.reject(error);
      } else {
        pending.resolve(response.value);
      }
    });
    worker.addEventListener("error", (event) => { event.preventDefault(); this.fail("图谱 Worker 无法运行"); });
    worker.addEventListener("messageerror", () => this.fail("图谱 Worker 消息无法读取"));
    const payload: EngineInitPayload = {
      base: dataset.base,
      manifest: dataset.manifest,
      backend: import.meta.env.PUBLIC_ENGINE_BACKEND === "wasm" ? "wasm" : "js",
    };
    this.ready = this.send("init", payload);
  }

  private send(op: EngineOperation, payload: unknown): Promise<unknown> {
    if (this.failure) return Promise.reject(this.failure);
    const requestId = ++this.requestId;
    return new Promise((resolve, reject) => {
      this.pending.set(requestId, { op, resolve, reject });
      try { this.worker.postMessage({ requestId, dataVersion: this.dataset.manifest.dataVersion, op, payload }); }
      catch { this.fail("图谱 Worker 请求无法发送"); }
    });
  }

  async call(op: Exclude<EngineOperation, "init">, payload: unknown): Promise<unknown> {
    await this.ready;
    return this.send(op, payload);
  }

  private fail(message: string) {
    this.failure ??= new WorkerUnavailableError(message);
    this.worker.terminate();
    for (const pending of this.pending.values()) pending.reject(this.failure);
    this.pending.clear();
  }

  dispose() { this.fail("图谱 Worker 已关闭"); }
}

class EngineClient implements GraphEngine {
  private transport?: WorkerTransport;
  private fallback?: GraphEngineCore;

  constructor(private dataset: DatasetLoader) {
    if (typeof Worker !== "undefined") {
      try {
        this.transport = new WorkerTransport(new Worker(new URL("../workers/graph.worker.ts", import.meta.url), { type: "module" }), dataset);
      } catch { this.fallback = new GraphEngineCore(dataset); }
    } else {
      this.fallback = new GraphEngineCore(dataset);
    }
  }

  private async call<T>(op: Exclude<EngineOperation, "init">, payload?: string): Promise<T> {
    if (this.transport) {
      try { return await this.transport.call(op, payload) as T; }
      catch (error) {
        if (!(error instanceof WorkerUnavailableError)) throw error;
        this.transport?.dispose();
        this.transport = undefined;
      }
    }
    this.fallback ??= new GraphEngineCore(this.dataset);
    if (op === "diagnostics") return await this.fallback.diagnostics() as T;
    return await this.fallback[op](payload ?? "") as T;
  }

  getNode(id: string) { return this.call<NodeView | null>("getNode", id); }
  getRelations(id: string) { return this.call<Row[]>("getRelations", id); }
  getEcoChains(id: string) { return this.call<EcoLabel[][]>("getEcoChains", id); }
  getDescription(id: string) { return this.call<string>("getDescription", id); }
  search(query: string) { return this.call<SearchResult>("search", query); }
  diagnostics() { return this.call<EngineDiagnostics>("diagnostics"); }
}

let client: Promise<GraphEngine> | undefined;
export function getEngine(): Promise<GraphEngine> {
  if (!client) {
    client = loadDataset().then((dataset) => new EngineClient(dataset));
    client.catch(() => { client = undefined; });
  }
  return client;
}

export const getNode = async (id: string) => (await getEngine()).getNode(id);
export const getRelations = async (id: string) => (await getEngine()).getRelations(id);
export const getEcoChains = async (id: string) => (await getEngine()).getEcoChains(id);
export const search = async (query: string) => (await getEngine()).search(query);
export const getDescription = async (id: string) => (await getEngine()).getDescription(id);
