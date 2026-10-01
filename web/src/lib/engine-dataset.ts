import type { DatasetManifest } from "./engine-types";

export class EngineDataError extends Error {
  readonly code = "data-corrupt";
  constructor(message: string) {
    super(message);
    this.name = "EngineDataError";
  }
}

export type DatasetOptions = {
  base: string;
  manifest: string | DatasetManifest;
  dataVersion?: string;
  fetch?: typeof fetch;
};

function validateManifest(value: unknown): DatasetManifest {
  const m = value as DatasetManifest;
  if (!m || m.format !== 2 || typeof m.dataVersion !== "string" || !/^[a-f0-9]{64}$/.test(m.dataVersion) ||
      typeof m.schemaVersion !== "string" || !m.assets || typeof m.assets !== "object" || Array.isArray(m.assets)) {
    throw new EngineDataError("数据清单格式不受支持");
  }
  for (const [name, asset] of Object.entries(m.assets)) {
    if (!asset || typeof asset.url !== "string" || !/^[a-f0-9]{64}$/.test(asset.sha256) ||
        !Number.isSafeInteger(asset.bytes) || asset.bytes < 0 || !["core", "description"].includes(asset.layer)) {
      throw new EngineDataError(`数据清单资源无效：${name}`);
    }
  }
  return m;
}

export class DatasetLoader {
  readonly manifest: DatasetManifest;
  readonly base: string;
  private readonly fetcher: typeof fetch;
  private readonly bytes = new Map<string, Promise<Uint8Array>>();
  private readonly json = new Map<string, Promise<unknown>>();

  constructor(manifest: DatasetManifest, options: Pick<DatasetOptions, "base" | "fetch">) {
    this.manifest = validateManifest(manifest);
    this.base = new URL(options.base).href;
    this.fetcher = options.fetch ?? globalThis.fetch.bind(globalThis);
  }

  assetBytes(name: string): Promise<Uint8Array> {
    let pending = this.bytes.get(name);
    if (!pending) {
      pending = this.readBytes(name);
      this.bytes.set(name, pending);
      pending.catch(() => this.bytes.delete(name));
    }
    return pending;
  }

  private async readBytes(name: string): Promise<Uint8Array> {
    const asset = this.manifest.assets[name];
    if (!asset) throw new EngineDataError(`当前数据快照缺少资源：${name}`);
    const response = await this.fetcher(new URL(asset.url, this.base));
    if (!response.ok) throw new Error(`数据资源加载失败：${name} (${response.status})`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.length !== asset.bytes) throw new EngineDataError(`数据资源长度不符：${name}`);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    const hex = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
    if (hex !== asset.sha256) throw new EngineDataError(`数据资源校验失败：${name}`);
    return bytes;
  }

  assetJson<T = unknown>(name: string): Promise<T> {
    let pending = this.json.get(name);
    if (!pending) {
      pending = this.assetBytes(name).then((bytes) => {
        try {
          return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
        } catch {
          throw new EngineDataError(`数据资源 JSON 无效：${name}`);
        }
      });
      this.json.set(name, pending);
      pending.catch(() => this.json.delete(name));
    }
    return pending as Promise<T>;
  }
}

export async function loadDataset(options: DatasetOptions): Promise<DatasetLoader> {
  const fetcher = options.fetch ?? globalThis.fetch.bind(globalThis);
  let manifest: DatasetManifest;
  if (typeof options.manifest === "string") {
    const response = await fetcher(new URL(options.manifest, options.base));
    if (!response.ok) throw new Error(`数据清单加载失败 (${response.status})`);
    let value: unknown;
    try { value = await response.json(); }
    catch { throw new EngineDataError("数据清单 JSON 无效"); }
    manifest = validateManifest(value);
  } else {
    manifest = validateManifest(options.manifest);
  }
  if (options.dataVersion && manifest.dataVersion !== options.dataVersion) {
    throw new EngineDataError("数据清单版本与当前页面不一致");
  }
  const assets = Object.entries(manifest.assets).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
    .map(([name, asset]) => [name, asset.sha256]);
  const canonical = JSON.stringify({ format: 2, schemaVersion: manifest.schemaVersion, assets });
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonical));
  const version = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  if (version !== manifest.dataVersion) throw new EngineDataError("数据清单内容与版本摘要不一致");
  return new DatasetLoader(manifest, { base: options.base, fetch: fetcher });
}
