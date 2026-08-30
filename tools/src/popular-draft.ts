// popular 全表起草:按名单/规则生成建议值,输出 JSON 报告供审校(不写节点文件)
// 口径:技术知名度 + 使用广泛度;锚点见 contracts/conventions.md 与本次校准
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const nodes: any[] = [];
function walk(d: string) {
  for (const f of readdirSync(d)) {
    const p = path.join(d, f);
    if (typeof f === "string" && f.endsWith(".json")) nodes.push(JSON.parse(readFileSync(p, "utf8")));
    else walk(p);
  }
}
walk(path.join(ROOT, "data", "nodes"));

// ---- 显式名单(校准锚点与重点实体) ----
const P: Record<string, number> = {
  // id 校准补遗(与 data/nodes 实际 slug 对齐)
  cpp: 93, csharp: 88, fsharp: 40, "c-11": 45, "c-17": 38, "c-23": 28, "c-90": 42, "c-99": 48,
  "cpp-98": 45, "cpp-03": 40, "cpp-11": 70, "cpp-14": 50, "cpp-17": 65, "cpp-20": 48, "cpp-23": 35, "cpp-26": 25,
  "cap-theorem": 55, "continuous-integration": 70, "garbage-collection": 72, linking: 55, "k-lang": 42,
  nextjs: 78, openmmlab: 40, "proof-of-history": 25, "public-key-cryptography": 65, "testing-pyramid": 40,
  "undefined-behavior": 40, "virtual-memory": 55, wasm: 70, "windows-nt": 85,
  // 语言 — 极高档/高档
  python: 98, javascript: 98, java: 95, html: 95, c: 93, "c++": 93, sql: 92, "c#": 88, typescript: 85, go: 82, php: 81, rust: 81,
  kotlin: 72, swift: 72, ruby: 68, r: 66, scala: 65, dart: 62, perl: 55,
  // 语言 — 中档/低档
  lua: 55, julia: 52, fortran: 48, cobol: 48, haskell: 48, ocaml: 45, erlang: 45, verilog: 45, prolog: 42, groovy: 42, clojure: 40, elixir: 38, vhdl: 40, scheme: 40, "common-lisp": 35, ada: 35, delphi: 35, "visual-basic": 38, actionscript: 30, gdscript: 30, carbon: 25, zig: 30, scratch: 45, assembly: 50, "q-kdb": 42,
  // C/C++ 版本:跟随普及度
  "c++11": 70, "c++17": 65, "c++98": 45, "c++03": 40, "c++14": 50, "c++20": 48, "c++23": 35, "c++26": 25,
  c11: 45, c99: 48, c90: 42, c17: 38, c23: 28,
  // 教材/文档(用户校准)
  csapp: 85, "k-r": 80, sicp: 68, "the-rust-book": 65, cppreference: 75, "python-tutorial": 70, "a-tour-of-go": 60, clrs: 55, "man-pages": 50,
  // 架构
  "linux-kernel": 97, android: 96, "nt-kernel": 85, jvm: 85, "x86-64": 82, arm: 81, v8: 82, cuda: 78, ebpf: 72, webassembly: 70, harmonyos: 70, blink: 68, "risc-v": 65, kvm: 55, loongarch: 30, evm: 50, sealevel: 30, "5g-ran": 40, bpf: 55, cgroup: 58, namespace: 58, xdp: 35, sbpf: 15,
  // 协议
  http: 97, tcp: 92, ip: 92, tls: 90, pdf: 81, oauth: 82, bitcoin: 85, ethereum: 82, quic: 68, "http-3": 66, vulkan: 66, posix: 62, oci: 55, "fix-protocol": 42, udp: 88, wasi: 45, webgpu: 55, solana: 60,
  // 框架/库
  react: 96, kubernetes: 90, vscode: 98, nodejs: 90, pytorch: 92, openssl: 85, numpy: 85, pandas: 83, nextjs: 78, cilium: 45, "delta-lake": 50, transformers: 72, openmmlab: 40, megengine: 22, "dji-sdk": 30, core: 40, opentelemetry: 52,
  // 工具
  git: 94, docker: 94, llvm: 82, gcc: 81, matlab: 80, gradle: 68, maven: 65, clang: 66, terraform: 66, cargo: 66, npm: 78, pip: 78, pnpm: 60, yarn: 58, qemu: 55, systemd: 62, nodejs: 90, bpftrace: 25,
  // 产品
  chrome: 95, firefox: 78, "h-100": 85, snapdragon: 80, photoshop: 85, postgresql: 82, mysql: 82, redis: 78, mongodb: 72, elasticsearch: 75, prometheus: 70, slack: 75, jira: 72, cursor: 74, autocad: 78, "unreal-engine": 76, unity: 74, ubuntu: 78, etcd: 52, "s3": 80, claude: 92, "wps-office": 60, "wps": 60, wechat: 95, alipay: 85, "zhi-pu-qing-yan": 45, "s-4hana": 46, "now-platform": 44, "sales-cloud": 46, foundry: 44, datadog: 68, snowflake: 72, "hyped-os": 0, hyperos: 45, "meta-mask": 45, metamask: 45, "juice-filesystem": 0, juicefs: 35, "ksqldb": 30, "cppreference": 75,
  "github-actions": 72, "gitlab-ci": 55, "cloudflare-workers": 50, "openshift": 52, "aws-ec2": 0,
  // 公司 — 极高档
  google: 98, microsoft: 96, apple: 95, amazon: 94, nvidia: 94, meta: 92, github: 93, ibm: 88, intel: 90, tsmc: 90, oracle: 88, qualcomm: 86, amd: 85, huawei: 88, tencent: 88, alibaba: 88, bytedance: 84, baidu: 84, openai: 96, anthropic: 88, "samsung": 85, sony: 82, deepseek: 84,
  // 公司 — 高档
  "red-hat": 76, canonical: 62, cloudflare: 76, snowflake: 72, databricks: 72, stripe: 75, salesforce: 74, adobe: 74, "hugging-face": 75, jetbrains: 70, atlassian: 70, xiaomi: 78, "unity-technologies": 68, valve: 65, "docker-inc": 70, gitlab: 74, vercel: 60, "mongodbi": 0,
  // 公司 — 中档/低档(金融/行业/硬件长尾)
  "jane-street": 48, citadel: 45, "two-sigma": 42, palantir: 60, okta: 55, hashicorp: 55, confluent: 45, elastic: 55, "jane-street-core": 35, metabit: 25, okta2: 0, workday: 52, servicenow: 55, fortinet: 45, "palo-alto-networks": 50, crowdstrike: 55, zscaler: 45, "check-point": 40, "two-sigma": 42, coinbase: 60, binance: 62, metamask2: 0, "solana-labs": 45, consensys: 30,
  "smic": 55, "sk-hynix": 45, micron: 45, "media-tek": 55, mediatek: 55, "tokyo-electron": 35, asml: 55, "loongson": 35, "moore-threads": 25, cambricon: 35, biren: 25, "supermicro": 45, "juicedata": 20, "suse": 45, "net-ease": 60, kuaishou: 55, "meituan": 60, jd: 62, pdd: 58, "kingsoft": 45, "i-flytek": 55, iflytek: 55, senseTime: 40, sensetime: 40, megvii: 35, "momenta": 0,
  "unitree": 45, dji: 70, nokia: 60, ericsson: 55, "zte": 50, huawei2: 0, cisco: 72, juniper: 45, arista: 40, broadcom: 55, naver: 50,
  // AI 公司/实验室
  mistral: 68, cohere: 50, xai: 65, perplexity: 60, "scale-ai": 50, stability: 55, "stability-ai": 55, anysphere: 45, groq: 55, cerebras: 45, "moonshot-ai": 55, "zhipu-ai": 55, "01-ai": 40, baichuan: 42, stepfun: 40, minibaxi: 0, minimax: 50, "moonshot": 55, "doubao": 55,
  // 模型族
  gpt: 98, llama: 92, gemini: 0, qwen: 86, glm: 84, "glm-4-5": 55, "glm-4-7": 45, "glm-5": 45, "glm-5-1": 25, "glm-5-2": 20, "glm-5-3": 18, kimi: 60, kling: 55, grok: 68, "stable-diffusion": 76, mistral2: 68, command: 30, ernie: 55, pangu: 40, hyperclova: 25, yi: 35, "minimax-m": 38, baichuan2: 42, step: 30, "deepseek-llm": 88, hunyuan: 55, doubao2: 55, "iflytek-spark": 40,
  // 人物
  "linus-torvalds": 96, "dennis-ritchie": 88, "brian-kernighan": 75, "randal-e-bryant": 55, "david-r-ohallaron": 50, "charles-e-leiserson": 42, "thomas-h-cormen": 42, "ronald-l-rivest": 45, "clifford-stein": 38, "harold-abelson": 50, "gerald-jay-sussman": 48,
  // 概念 — 高档
  transformer: 93, "attention-mechanism": 80, rag: 75, gc: 72, ci: 70, "event-loop": 65, "same-origin-policy": 62, "virtual-dom": 60, acid: 66, cap: 55, consensus: 60, "zero-trust": 58, "object-storage": 55, "service-mesh": 52, raft: 50, "idempotency": 55, "memory-model": 40, "cache-coherence": 35, numa: 35, "memory-hierarchy": 38, interrupt: 45, syscall: 55, scheduler: 50, process: 65, abi: 40, link: 55, dom: 70, "graphics-pipeline": 45, shader: 50, backpropagation: 60, "proof-of-work": 60, "proof-of-stake": 52, "merkle-tree": 45, "vector-database": 55, "git-object-model": 45, um: 0, ub: 35, poh: 25, "test-pyramid": 40, observability: 55, "vector-db": 55, "ownership": 45, "pow": 60, "pos": 52,
};

// ---- 本批只出:纯技术实体(概念/协议/架构/工具/库/框架/语言)+ 教材文档;产业实体(组织/产品/人物/模型族)留待人工 ----
const TECH_TYPES = new Set(["concept", "protocol", "architecture", "tool", "library", "framework", "language"]);
// 版本节点不参与 popular(跟随母体,不单独标定)
const VERSION_RE = /-(?:98|03|11|14|17|20|23|26|90|99)$|^(?:c|cpp)-\d+$/;
// 教材/文档类产品单独放行
const DOCS = new Set(["csapp", "k-r", "sicp", "clrs", "cppreference", "man-pages", "the-rust-book", "python-tutorial", "a-tour-of-go"]);

const out: Record<string, { name: string; type: string; popular: number; note?: string }> = {};
let skip = 0;
for (const n of nodes) {
  const isTech = TECH_TYPES.has(n.type);
  const isDoc = DOCS.has(n.id) || n.type === "product" && DOCS.has(n.id);
  if (!isTech && !isDoc) { skip++; continue; }
  if (VERSION_RE.test(n.id)) { skip++; continue; }
  const v = P[n.id];
  if (v === undefined) {
    out[n.id] = { name: n.display_primary || n.name, type: n.type, popular: 0, note: "名单未覆盖,待定值" };
  } else {
    out[n.id] = { name: n.display_primary || n.name, type: n.type, popular: v };
  }
}
console.log("总节点:", nodes.length, "· 本批出稿:", Object.keys(out).length, "· 跳过(产业实体):", skip);
const bands: Record<string, number> = { 极高: 0, 高: 0, 中: 0, 低: 0, 未定: 0 };
for (const v of Object.values(out)) {
  if (!v.popular) bands.未定++;
  else if (v.popular >= 81) bands.极高++;
  else if (v.popular >= 61) bands.高++;
  else if (v.popular >= 41) bands.中++;
  else bands.低++;
}
console.log(JSON.stringify(bands));
writeFileSync(path.join(ROOT, "tools", "popular-draft.json"), JSON.stringify(out, null, 1), "utf8");
console.log("已写 tools/popular-draft.json");