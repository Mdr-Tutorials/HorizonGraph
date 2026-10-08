# HorizonGraph

面向中文学生与从业者的全栈科技与 AI 产业知识图谱。

**北极星**

1. 认知重于检索——拓扑探索破除"不知道自己不知道"
2. 全栈全链穿透——理论 → 内核/硬件 → 框架 → 大模型/商业实体
3. 真实网状拓扑——多归属、竞争、演进，如实反映技术生态
4. Build-Time Rich, Runtime Free——构建期生成索引，浏览器查询，运行期静态托管
5. 活态演进——保留技术血缘与历史脉络

**快速上手**

准备 Node.js 22、pnpm 11 和 [rustup](https://rust-lang.org/tools/install/)。Windows 的原生 Rust 测试需要 Visual Studio C++ Build Tools；按 rustup 安装提示配置。仓库通过 `rust-toolchain.toml` 固定 Rust 版本，WASM 构建要求 CLI 与 crate 的 wasm-bindgen 版本一致。

```bash
rustup toolchain install 1.96.1 --profile minimal --target wasm32-unknown-unknown
cargo install wasm-bindgen-cli --version 0.2.126 --locked
pnpm install --frozen-lockfile
pnpm build      # 生成类型 → 校验数据 → 数据快照 → WASM → Astro → 离线发布
pnpm dev        # 生成类型、数据和 WASM 后启动 Astro 开发服务器
```

Service Worker 在生产构建中启用。验证离线行为前先运行 `pnpm build`，再用 `pnpm -C web preview` 预览最终站点；开发服务器用于编辑和调试。在关于弹窗等待“离线可用”，首次安装点击“刷新启用离线”，之后可以断网打开词条、搜索、分类、生态和正文。更新下载完成后由“更新并刷新”切换整个页面快照。

查询默认在 Worker 内运行 JavaScript。构建时设置 `PUBLIC_ENGINE_BACKEND=wasm` 可启用 Rust/WASM；WASM 初始化失败自动回退到 JavaScript。当前规模的实测中 JSON 评分跨边界开销超过收益，因此保留 WASM 能力及实际执行测试，以 JavaScript 作为默认后端。

首次运行浏览器测试需安装 [Playwright Chromium](https://playwright.dev/docs/browsers)：

```bash
pnpm exec playwright install chromium
pnpm test       # 数据构建、JS 引擎、实际 WASM 单测，以及 Chromium 离线/更新测试
cargo test --locked --manifest-path crates/graph-core/Cargo.toml
```

测试使用已有构建产物，因此修改数据、引擎或离线代码后先重跑 `pnpm build`。可分别运行 `pnpm test:unit` 和 `pnpm test:browser`；Linux CI 用 `pnpm exec playwright install --with-deps chromium` 安装浏览器系统依赖。

可复现的 CPU 基准覆盖当前快照和 10 万节点 / 30 万边的合成 CSR，分别测冷/热搜索、邻域、完整关系读取和真实 WASM 初始化：

```bash
pnpm benchmark --samples 25 --warmup 8 --batch 128 --output scratch/benchmark-results.json
```

JSON 包含环境、数据版本、median/p95 和加载字节数。数据预先读入内存，计时包括资源校验、JSON 解析和核心查询，不包含网络、浏览器 Worker 消息及 UI 渲染；不能将其等同于用户交互延迟。

仅编辑节点时，`pnpm gen` 和 `pnpm validate` 可独立检查契约、路径、字段和关系。`pnpm build:data` 只重建数据；更新可部署站点仍需完整构建。

**内容入口**：[八个基础领域补全清单与来源](docs/content-foundations-2026-10.md) · [十二个领域补全清单与来源](docs/content-domains-2026-10.md) · [实时图形与交互内容补全清单](docs/content-interactive-graphics-2026-10.md) · [Hono 与 Web 服务补全清单](docs/content-web-services-2026-10.md) · [WSL 与容器工程补全清单](docs/content-wsl-container-engineering-2026-10.md) · [HFT 与电子交易补全清单](docs/content-hft-and-electronic-trading-2026-10.md) · [Antigravity 与智能体开发补全清单](docs/content-antigravity-and-agent-development-2026-10.md) · [Tern、Ghostty 与开发工具链补全清单](docs/content-tern-ghostty-and-developer-tooling-2026-10.md) · [scc、tokei 与软件度量补全清单](docs/content-scc-tokei-and-software-measurement-2026-10.md)。

**架构入口**：`docs/decisions/`（ADR 0001–0034）· [端侧引擎与离线发布](docs/decisions/0025-versioned-engine-and-offline-release.md) · [基础内容分类](docs/decisions/0026-foundational-content-classification.md) · [整领域内容扩展](docs/decisions/0027-whole-domain-content-expansion.md) · [实时图形与交互内容](docs/decisions/0028-interactive-graphics-content.md) · [Web 服务与 API 契约](docs/decisions/0029-web-services-and-api-contracts.md) · [WSL 与容器工程](docs/decisions/0030-wsl-and-container-engineering.md) · [HFT 与电子交易](docs/decisions/0031-hft-and-electronic-trading.md) · [Antigravity 与智能体开发](docs/decisions/0032-antigravity-and-agent-development.md) · [终端、语言工具链与软件组成](docs/decisions/0033-terminal-language-tooling-and-software-composition.md) · [软件度量、仓库分析与质量验证](docs/decisions/0034-software-measurement-and-repository-analysis.md) · `contracts/`（Schema 唯一来源）

**许可**：代码 MIT，数据 CC BY-NC-SA 4.0
