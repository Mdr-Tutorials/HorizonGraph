# ADR-0025：版本化数据快照、端侧查询引擎与完整离线发布

- 状态：已接受
- 日期：2026-10-01

## 背景

ADR-0011、0014、0015 已确定每节点 JSON 的作者格式、Astro 静态站点、客户端词条视图及 WASM 和离线目标。最初实现用固定 URL 加载图、搜索和正文 JSON；每次构建按 id 排序重新分配整数下标，旧缓存与新分片混用会把下标解释成其他实体。图邻域查询还需要扫描边表，搜索首次加载全部分片。

本决策落实版本绑定、查询入口与完整离线发布。历史 ADR 中的容量目标继续保留，容量和响应时间通过后续测量确认。

## 决策

### 1. 用内容哈希发布不可变数据快照

`pnpm build:data` 保留 `dist/graph/`、`search/`、`l2/`、`site/` 等逻辑文件，供 Astro 构建和校验读取，同时为各逻辑资源写出 `dist/assets/data/<sha256>.<ext>`。`dist/releases/<dataVersion>.json` 记录逻辑名、URL、SHA-256、字节数和 `core` / `description` 层级。

`dataVersion` 是格式号、Schema 版本及按逻辑名排序的资源摘要清单的 SHA-256；清单不包含自身。字体、站点代码和 HTML 属于离线发布资源，另由站点发布摘要绑定。

构建生成 `web/src/generated/dataset.ts`。HTML 中的 `hg-dataset` 元信息和浏览器代码引用同一版本的清单。所有浏览器数据请求通过 `DatasetLoader`，先验证清单摘要及页面版本，再验证每个资源的长度与 SHA-256。统计、生态、搜索和正文都遵守这条加载路径。固定逻辑 URL 用于构建读取，浏览器使用清单解析出的内容哈希 URL。

整数节点和关系下标只在单个快照内使用。UI、地址和消息参数使用稳定 id；一次页面会话保持同一 `dataVersion`。

### 2. 用双向 CSR 查询邻域，WASM 和 JavaScript 共用协议

构建输出 `graph/adjacency.bin`，格式为 HGC2/version 2，全部字段使用小端 u32。文件包含节点和边数量、关系数量，以及出边/入边的偏移、另一端节点、关系和上下文数组。无上下文使用 `0xffffffff`。

Rust crate `crates/graph-core/` 导出 `GraphIndex` 与 `score_candidates`。GraphIndex 校验头、总大小、偏移单调性、端点和节点/关系范围，持有解码结果；`neighbors(node, direction)` 返回 `[other, relation, context, ...]` 的 Uint32Array。引擎保留 id 到整数下标的映射，词条查询直接读取相应 CSR 区间；版本词条额外读取母体入边以呈现版本兄弟。

UI 不接触 WASM 内存指针。Worker 内的 JavaScript 解码器提供同样的邻域接口，并在创建 WASM GraphIndex 前校验资源间索引和上下文范围。

### 3. 在单个 Dedicated Worker 中处理查询

词条、邻域、生态、正文和搜索经过统一异步引擎。消息带 `requestId`、`dataVersion`、操作名和参数；响应匹配同一请求与版本。词条导航和搜索组件忽略已被后续操作替代的结果，避免异步响应覆盖当前页面。

当前默认使用 Worker 内的 JavaScript 后端；构建时设置 `PUBLIC_ENGINE_BACKEND=wasm` 可以启用真实 WASM 后端。实测当前数据上 WASM 搜索的候选 JSON 序列化/解析和跨边界调用开销大于收益，因此不凭底层解码性能启用默认加速。基准工具区分纯解码、完整引擎查询和初始化成本；未来更改默认值须有端到端证据。

WASM 模式按需加载 Vite 生成的 wasm-bindgen ES module 与 `.wasm`。WASM 代码加载或初始化失败时使用 Worker 内的 JavaScript 实现；Worker 本身无法启动或消息通道失败时使用主线程 JavaScript。数据摘要错误、结构错误或已加载解码器的错误会显式传播，不能通过回退掩盖。

搜索索引包含数据节点和本体导航记录。构建从小写 id、name、abbr、aliases 提取 Unicode 码点的 1/2/3-gram，用 FNV-1a UTF-16 哈希分配 16 个倒排桶；记录按 `idx % 16` 分配。查询选择长度不超过 3 的 gram，读取所需倒排桶、取交集，再读取候选记录桶和核验完整字段。搜索不依赖全图加载。

WASM scorer 和 JavaScript scorer 共享现有精确、前缀、包含匹配及 importance 权重。小写归一化由 JavaScript 统一执行，保持 Unicode 行为；排序和截取在打分后完成。版本仅在母体也命中时折叠，本体进入导航结果，数据节点进入词条结果。

### 4. 在 Astro 构建后生成完整离线发布

`pnpm build:offline` 扫描最终 `web/dist`，包含当前数据清单及全部资源、全部 L2 正文、站点 HTML、JS/CSS、Worker/WASM、字体和图像。工具检查发布数据的内容哈希，再通过 Workbox `injectManifest` 注入资源清单。生成的 Service Worker 使用每个资源的 SHA-256 integrity；站点 `release` 摘要同时绑定 base、dataVersion、Worker 模板和完整资源清单。

当前采用完整预缓存：`core` / `description` 是数据资源标签，离线安装会缓存两者。下载受并发限制；只有全部资源成功后写入 ready 标记，失败安装会丢弃未完成缓存。界面确认 ready 标记、资源齐全及数据版本匹配后显示“离线可用”。浏览器可因存储压力或用户操作清理缓存，离线状态需重新检查，不承诺永久存储。检查发现缺失资源时撤下就绪状态，联网重试通过同一资源清单和 integrity 补齐缓存，成功后恢复就绪标记。

SW 固定发布在 `${BASE_URL}sw.js`，scope 使用同一个 BASE_URL。Cache 名包含完整 scope 和 release，只清理本项目缓存，支持 GitHub Pages 项目子路径。

`/term/` 是真实静态壳，受控 `/term/<id>` 导航返回同版本壳，词条仍从当前地址读取 id。首页、分类和生态页使用预缓存 HTML；未知路径离线时使用 404。数据、WASM、JS 等资源请求不能收到 HTML 导航兜底。

### 5. 更新经过 waiting，显式更新重载各页

新 SW 完成预缓存后默认 waiting，旧标签页继续使用原快照。没有无条件 `skipWaiting()` 或 `clients.claim()`。用户选择“更新并刷新”后，waiting Worker 记录请求并激活；显式更新才 claim 客户端，各页监听 `controllerchange` 并整体刷新。

首次安装不会接管已打开的页面；关于弹窗提供“刷新启用离线”，刷新或下次导航后页面受控。安装完成后的“离线可用”指完整发布已下载，当前页面是否受控单独判断。

新 Worker 可按内容哈希 URL 从旧发布缓存读取资源，不用新资源替代旧索引。页面报告 release/dataVersion 就绪；只有当前 scope 的窗口均确认本次发布后才清理更旧缓存，并保留当前及上一份缓存。未知或仍使用旧版本的窗口会延后清理。

### 6. 固定构建工具并验证真实执行路径

`rust-toolchain.toml` 固定 Rust 1.96.1 与 wasm32-unknown-unknown。Cargo.lock 入库，wasm-bindgen crate 和 CLI 均固定 0.2.126；`tools/src/wasm/build.ts` 检查版本，用 locked Cargo release build 和 `wasm-bindgen --target web` 生成前端绑定。

完整顺序是 `gen → validate → build:data → build:wasm → build:web → build:offline`。`pnpm dev` 先生成类型、数据和 WASM，再启动 Astro；Service Worker 仅用于生产构建。单独 `build:web` 或 `build:offline` 依赖前置生成物，常规发布使用 `pnpm build`。

验证分为原生 Rust 单测、数据构建/JS 引擎/实际 WASM 单测和 Chromium 浏览器测试。实际 WASM 测试加载生成 ESM 和 wasm bytes，逐节点核对构建图的出入边。浏览器测试覆盖真实 WASM、WASM 和 Worker 不可用时的 JavaScript 回退、完整离线导航与搜索、两个旧标签页等待并显式更新、损坏更新保留旧版及缺失缓存重试；CI 分别验证根路径的默认 JS 构建和 `/HorizonGraph/` 子路径的 WASM 构建。运行方法见根 README。

## 当前边界与代价

全图 L0 元数据和 CSR 在首次图查询时加载；搜索可以独立按候选桶加载。数据构建和校验仍全量读入，缓存只在输入未变且工件完整时跳过，尚未实现逐节点增量、流式全图校验或定期校验调度。完整离线会下载全部搜索和正文资源，并在更新时临时占用多个发布缓存。未来容量调整需以实际数据规模、内存、磁盘和下载测量为依据。

本决策不声明百万节点容量已经验证，也不声明 WASM 必然比 JavaScript 快。现有测试用于验证格式、语义、版本一致性与离线更新行为。

## 关联与参考

- [ADR-0011](0011-million-scale-infrastructure.md)：容量目标与作者格式。
- [ADR-0013](0013-ci-validation-suite.md)、[ADR-0014](0014-repository-architecture.md)：校验目标与仓库边界。
- [ADR-0015](0015-frontend-stack-million-scale.md)、[ADR-0017](0017-version-slice-relation.md)：前端模型与版本关系。
- [rustup 工具链文件](https://rust-lang.github.io/rustup/overrides.html#the-toolchain-file)、[wasm-bindgen web 部署](https://wasm-bindgen.github.io/wasm-bindgen/reference/deployment.html)：固定工具链与 ES module 生成。
- [Service Worker scope](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)、[Service Worker 生命周期](https://web.dev/articles/service-worker-lifecycle)：子路径、waiting 与显式激活的依据。
- [浏览器存储配额和淘汰](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)：离线存储可用性边界。
