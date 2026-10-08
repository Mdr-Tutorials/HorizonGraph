# ADR-0029：Web 服务、边缘运行时与 API 契约

- 状态：已接受
- 日期：2026-10-07

## 背景

图形批次完成后，仓库已有 2114 个数据节点，但按 id、name、abbreviation 和 aliases 全量核对，Hono 未收录。HTTP、Express、OpenAPI、Node.js、Deno、Bun、Cloudflare Workers、Serverless 及安全机制存在入口，多数缺少正文；Web 标准请求对象、中间件处理链、跨运行时适配和 API 契约工具链没有完整骨架。

## 决策

1. 以 Hono 为检查入口，同批补齐五个分支：Web 标准接口与轻量服务框架、HTTP 消息与中间件及状态防护、边缘和无服务器运行时、类型化 API 与校验/生成/契约测试、服务端 HTML 与渐进交互。已有节点复用和扩写，不将整个 Web 后端、云计算或应用安全领域描述为空白。
2. ontology 从 0.11.0 升至 0.12.0，新增 web-service-concept、edge-runtime-concept、api-contract-concept 三个继承 theory 的概念分类，合计 81 个本体节点。API 接口仍挂 api-specification；语言、标准、组织、库、工具与概念按真实身份分流。
3. domains 从 0.5.0 升至 0.6.0，新增 web-services、edge-computing、api-engineering，合计 62 个领域标识。Web 开发、云基础设施、网络、安全、数据工程及编程语言沿用已有标识，允许交叉归属。
4. ecosystems 从 0.3.0 升至 0.4.0，新增 web-service-ecosystem、edge-serverless-ecosystem、typed-api-ecosystem，合计 85 个生态。既有十个宏观根继续封闭。EntityType、字段结构和二十九种关系类型保持兼容。
5. Hono 核心、客户端组件、Node 适配器和独立校验/OpenAPI 插件分别建档。使用可选适配器、运行时、校验器或渲染工具须限定场景，不将 TypeScript 类型支持、Zod、某个云平台或 Redis 写成框架核心的普遍硬依赖。
6. 编译期端到端类型推导、运行时输入校验、语言无关 API 描述、消费者/提供者契约测试与业务授权分别说明。JSON Schema、Standard Schema、OpenAPI 和类型描述语言不能只因都出现 schema 一词而合并。测试工具实现的测试方法与被测框架分开。
7. 复用通用 idempotency、caching、backpressure 与 type-inference；新增 HTTP 特有的缓存、条件请求和中间件语义。网络路由器、OSI 会话层与 HTTP 应用路由、HTTP 会话分别建模。Cookie 作用域与同源规则、Bearer 与 JWT、签名与加密、CSRF 与 CORS 各说明边界。
8. 依据一手资料纠正已有摘要、关系和标准状态。HTTP 总节点不能无条件依赖 TCP；跨运行时兼容不意味着所有 Node API 等价；运行时单体二进制不因实现语言而必然要求用户安装该语言工具链。WinterTC/TC55 与 ECMA-429 使用当前正式资料，平台请求结束后的执行具有具体条件。
9. 每个新增节点具备至少两段实质正文、主题对应的官方/标准/作者资料及非分类连接；新增和扩写内容均保留 ai_draft，研究日期 2026-10-07。完整清单、出处、语义修正及实际验证写入批次记录。
10. 完整生产构建统一生成图形与 Hono 两批的版本化数据、搜索、正文、邻域、WASM 和离线清单；分别按两个冻结基线审核节点增量，并在最终实际构建产物中检查两批全部新增 id、正文、摘要、邻域与别名消歧。

## 后果

图谱从 Hono 可探索标准请求对象、HTTP 服务处理、平台适配、API 契约、运行校验、客户端生成和测试，也可进入同类框架及已有云计算、安全、类型系统知识。版本化数据与离线发布继续沿用现有工程管线。

完整范围、节点清单、来源和验证见 [Hono 与 Web 服务内容补全记录](../content-web-services-2026-10.md)。

## 关联

0004（受控词表）、0018（同名消歧）、0021（方法使用与治理）、0025（版本化快照）、0027（整领域扩展）、0028（实时图形与交互内容）
