import { loadBundle } from "./graph";

const cache = new Map<number, string>();

async function sha1hex(s: string): Promise<string> {
  const h = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(s));
  return [...new Uint8Array(h)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export async function loadDesc(id: string): Promise<string> {
  const b = await loadBundle();
  const i = b.ids.indexOf(id);
  if (i < 0 || cache.has(i)) return cache.get(i) ?? "";
  const h = await sha1hex(id);
  // 构建端使用十六进制分片名（0–9、a–f），请求时保留同一命名。
  const shard: any[] = await fetch(`${import.meta.env.BASE_URL}l2/shard-${h[0]}.json`).then((r) => r.json());
  for (const rec of shard)
    if (rec[0] === i) {
      cache.set(i, rec[1] ?? "");
      return rec[1] ?? "";
    }
  cache.set(i, "");
  return "";
}
