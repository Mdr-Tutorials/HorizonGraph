import { loadDataset } from "../lib/engine-dataset";
import { GraphEngineCore } from "../lib/engine-core";
import { loadWasm } from "../lib/engine-wasm";
import type { EngineInitPayload, EngineRequest, EngineResponse } from "../lib/engine-types";

let engine: GraphEngineCore | undefined;
let version = "";

self.addEventListener("message", async (event: MessageEvent<EngineRequest>) => {
  const request = event.data;
  const response: EngineResponse = { requestId: request.requestId, dataVersion: request.dataVersion, op: request.op };
  try {
    if (request.op === "init") {
      if (engine) throw new Error("图谱 Worker 已初始化");
      const options = request.payload as EngineInitPayload;
      if (!options || (options.backend !== "js" && options.backend !== "wasm")) throw new Error("图谱 Worker 后端选项无效");
      const dataset = await loadDataset({ ...options, dataVersion: request.dataVersion });
      engine = new GraphEngineCore(dataset, options.backend === "wasm" ? { loadWasm } : {});
      version = dataset.manifest.dataVersion;
      response.value = null;
    } else {
      if (!engine || request.dataVersion !== version) throw new Error("图谱 Worker 数据版本不一致");
      const payload = request.payload as string;
      switch (request.op) {
        case "getNode": response.value = await engine.getNode(payload); break;
        case "getRelations": response.value = await engine.getRelations(payload); break;
        case "getEcoChains": response.value = await engine.getEcoChains(payload); break;
        case "getDescription": response.value = await engine.getDescription(payload); break;
        case "search": response.value = await engine.search(payload); break;
        case "diagnostics": response.value = await engine.diagnostics(); break;
        default: throw new Error("未知图谱 Worker 请求");
      }
    }
  } catch (error) {
    const caught = error instanceof Error ? error : new Error(String(error));
    response.error = { name: caught.name, message: caught.message,
      ...("code" in caught && typeof caught.code === "string" ? { code: caught.code } : {}) };
  }
  self.postMessage(response);
});
