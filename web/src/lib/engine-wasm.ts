import type { WasmExports } from "./engine-core";

export async function loadWasm(): Promise<WasmExports> {
  const [module, asset] = await Promise.all([
    import("../generated/wasm/graph_core.js"),
    import("../generated/wasm/graph_core_bg.wasm?url"),
  ]);
  await module.default({ module_or_path: asset.default });
  return { GraphIndex: module.GraphIndex, score_candidates: module.score_candidates };
}
