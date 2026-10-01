import { DATA_MANIFEST, DATA_VERSION } from "../generated/dataset";
import { loadDataset as openDataset, type DatasetOptions, DatasetLoader } from "./engine-dataset";

export { EngineDataError, DatasetLoader } from "./engine-dataset";
export type { DatasetOptions } from "./engine-dataset";
export type { DatasetManifest, DatasetAsset } from "./engine-types";

let defaultDataset: Promise<DatasetLoader> | undefined;

export function loadDataset(options?: DatasetOptions): Promise<DatasetLoader> {
  if (options) return openDataset(options);
  if (!defaultDataset) {
    const base = new URL(import.meta.env.BASE_URL, location.href).href;
    const pinnedManifest = document.querySelector<HTMLMetaElement>('meta[name="hg-dataset"]')?.content || DATA_MANIFEST;
    defaultDataset = openDataset({ base, manifest: pinnedManifest, dataVersion: DATA_VERSION });
    defaultDataset.catch(() => { defaultDataset = undefined; });
  }
  return defaultDataset;
}

export async function assetJson<T = unknown>(logicalName: string, dataset?: DatasetLoader): Promise<T> {
  return (dataset ?? await loadDataset()).assetJson<T>(logicalName);
}

export async function assetBytes(logicalName: string, dataset?: DatasetLoader): Promise<Uint8Array> {
  return (dataset ?? await loadDataset()).assetBytes(logicalName);
}

export async function warmCore(logicalNames?: string[]): Promise<void> {
  const dataset = await loadDataset();
  const names = logicalNames ?? Object.keys(dataset.manifest.assets).filter((name) => dataset.manifest.assets[name].layer === "core");
  await Promise.all(names.map((name) => dataset.assetBytes(name)));
}
