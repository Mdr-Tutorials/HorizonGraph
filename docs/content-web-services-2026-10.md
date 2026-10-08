# 2026-10-07 Hono 与 Web 服务内容补全

本批从 Hono 缺失核查继续展开。核查按全库 id、name、abbreviation 和 aliases 进行，原库没有 Hono；HTTP、Express、Node.js、Bun、Deno、Cloudflare Workers、Serverless、REST、OpenAPI 等已有入口，相关机制、标准接口和工具链缺少完整正文与连接。

在图形批次完成的 2114 个数据节点基线上，新增 124 个节点、实质扩写 35 个节点，全图增至 2238 个。新增 407 条非分类关系，正文引用 338 个不同的一手资料 URL（按完整 URL 去重，不等于机构数）。非空 description 从 929 增至 1087。本批内容均标为 ai_draft，研究日期 2026-10-07。

## 范围与完整节点清单

### 现代 Web 框架与标准接口（新增 23，扩写 0）

工程主线：Hono 路由/中间件 → Context → 标准 Request/Response；标准 HTTP 处理函数 → Node 适配器或兼容宿主；路由类型 → Hono Client/hc → Fetch 请求；Fetch、URL、Streams、协作取消与显式缓存分别说明；Fastify/Koa 的 Node 接口与 H3/Elysia/oak 等标准对象接入路径区分。。

新增：

- [取消控制器](../data/nodes/ab/abort-controller.json) — abort-controller
- [取消信号](../data/nodes/ab/abort-signal.json) — abort-signal
- [二进制数据对象接口](../data/nodes/bl/blob-api.json) — blob-api
- [Web缓存接口](../data/nodes/ca/cache-api.json) — cache-api
- [Elysia Web 框架](../data/nodes/el/elysia.json) — elysia
- [Fastify Web 框架](../data/nodes/fa/fastify.json) — fastify
- [Fetch接口](../data/nodes/fe/fetch-api.json) — fetch-api
- [Fetch首部接口](../data/nodes/fe/fetch-headers.json) — fetch-headers
- [Fetch请求对象](../data/nodes/fe/fetch-request.json) — fetch-request
- [Fetch响应对象](../data/nodes/fe/fetch-response.json) — fetch-response
- [表单数据接口](../data/nodes/fo/form-data.json) — form-data
- [H3 Web 框架](../data/nodes/h3/h3.json) — h3
- [Hono Web 框架](../data/nodes/ho/hono.json) — hono
- [Hono hc 客户端](../data/nodes/ho/hono-client.json) — hono-client
- [Hono Node.js 服务端适配器](../data/nodes/ho/hono-node-server.json) — hono-node-server
- [itty-router 微型路由框架](../data/nodes/it/itty-router.json) — itty-router
- [Koa Web 框架](../data/nodes/ko/koa.json) — koa
- [Nitro 服务端框架](../data/nodes/ni/nitro.json) — nitro
- [Oak Web 框架](../data/nodes/oa/oak.json) — oak
- [URL对象接口](../data/nodes/ur/url-api.json) — url-api
- [URL查询参数接口](../data/nodes/ur/url-search-params.json) — url-search-params
- [Web 标准 HTTP 处理函数](../data/nodes/we/web-standard-http-handler.json) — web-standard-http-handler
- [Web流接口](../data/nodes/we/web-streams-api.json) — web-streams-api

本分支正文引用 78 个不同的一手资料 URL，事实对应的具体链接保存在节点正文。

### HTTP 服务、中间件与应用安全机制（新增 27，扩写 16）

工程主线：Hono/Express → HTTP 路由 → 中间件 → 请求上下文 → Request/Response → HTTP → 方法/安全性/幂等性 → 状态码/字段/消息内容 → 内容协商 → HTTP 缓存 → ETag/条件请求 → 内容编码 → Cookie → 会话/签名/SameSite → 来源检查/认证/安全响应头 → REST → 统一接口 → 超媒体状态迁移；HTTP 错误 → Problem Details。

新增：

- [HTTP Bearer 令牌认证](../data/nodes/be/bearer-token-authentication.json) — bearer-token-authentication
- [HTTP 条件请求](../data/nodes/co/conditional-request.json) — conditional-request
- [HTTP 内容协商](../data/nodes/co/content-negotiation.json) — content-negotiation
- [实体标签](../data/nodes/et/etag.json) — etag
- [Fetch 元数据请求头](../data/nodes/fe/fetch-metadata.json) — fetch-metadata
- [超媒体驱动应用状态](../data/nodes/ha/hateoas.json) — hateoas
- [HTTP 严格传输安全](../data/nodes/hs/hsts.json) — hsts
- [HTTP Basic 认证](../data/nodes/ht/http-basic-authentication.json) — http-basic-authentication
- [HTTP 缓存](../data/nodes/ht/http-caching.json) — http-caching
- [HTTP 内容编码](../data/nodes/ht/http-content-encoding.json) — http-content-encoding
- [浏览器 Cookie](../data/nodes/ht/http-cookie.json) — http-cookie
- [HTTP 字段](../data/nodes/ht/http-header.json) — http-header
- [HTTP 消息内容](../data/nodes/ht/http-message-body.json) — http-message-body
- [HTTP 请求方法](../data/nodes/ht/http-method.json) — http-method
- [HTTP 中间件](../data/nodes/ht/http-middleware.json) — http-middleware
- [HTTP 应用路由](../data/nodes/ht/http-routing.json) — http-routing
- [HTTP 安全方法](../data/nodes/ht/http-safe-method.json) — http-safe-method
- [HTTP 安全响应头](../data/nodes/ht/http-security-headers.json) — http-security-headers
- [HTTP 应用会话](../data/nodes/ht/http-session.json) — http-session
- [HTTP 状态码](../data/nodes/ht/http-status-code.json) — http-status-code
- [多部分表单数据](../data/nodes/mu/multipart-form-data.json) — multipart-form-data
- [HTTP API 问题详情](../data/nodes/pr/problem-details.json) — problem-details
- [HTTP 请求体大小限制](../data/nodes/re/request-body-limit.json) — request-body-limit
- [请求上下文](../data/nodes/re/request-context.json) — request-context
- [Cookie SameSite 属性](../data/nodes/sa/same-site-cookie.json) — same-site-cookie
- [签名 Cookie](../data/nodes/si/signed-cookie.json) — signed-cookie
- [REST 统一接口](../data/nodes/un/uniform-interface.json) — uniform-interface

既有扩写：[HTTP](../data/nodes/ht/http.json)、[安全超文本传输协议](../data/nodes/ht/https.json)、[HTTP/2](../data/nodes/ht/http-2.json)、[HTTP/3](../data/nodes/ht/http-3.json)、[表述性状态转移](../data/nodes/re/rest.json)、[跨域资源共享](../data/nodes/co/cors.json)、[跨站请求伪造](../data/nodes/cs/csrf.json)、[内容安全策略](../data/nodes/cs/csp.json)、[同源策略](../data/nodes/sa/same-origin-policy.json)、[JWT](../data/nodes/jw/jwt.json)、[限流](../data/nodes/ra/rate-limiting.json)、[服务器推送事件](../data/nodes/ss/sse.json)、[Express](../data/nodes/ex/express.json)、[幂等性](../data/nodes/id/idempotency.json)、[缓存](../data/nodes/ca/caching.json)、[gzip](../data/nodes/gz/gzip.json)。

本分支正文引用 55 个不同的一手资料 URL，事实对应的具体链接保存在节点正文。

### 跨运行时标准、边缘平台与执行生命周期（新增 12，扩写 10）

工程主线：Ecma / WinterTC → ECMA-429 → 共同 Web API；运行时与引擎 → 框架适配 → 请求生命周期、流式响应与取消；Workers bindings / ExecutionContext → 平台执行限制 → Wrangler；Lambda 初始化、环境复用与快照恢复分别说明，冷暖调用按测量目标区分。。

新增：

- [Workers 绑定](../data/nodes/cl/cloudflare-worker-bindings.json) — cloudflare-worker-bindings
- [Worker 执行上下文接口](../data/nodes/cl/cloudflare-workers-execution-context.json) — cloudflare-workers-execution-context
- [Ecma 国际](../data/nodes/ec/ecma-international.json) — ecma-international
- [JavaScriptCore 引擎](../data/nodes/ja/javascriptcore.json) — javascriptcore
- [Minimum Common Web API](../data/nodes/mi/minimum-common-web-api.json) — minimum-common-web-api
- [HTTP 请求生命周期](../data/nodes/re/request-lifecycle.json) — request-lifecycle
- [运行时适配器](../data/nodes/ru/runtime-adapter.json) — runtime-adapter
- [运行时兼容性](../data/nodes/ru/runtime-compatibility.json) — runtime-compatibility
- [无服务器冷启动](../data/nodes/se/serverless-cold-start.json) — serverless-cold-start
- [WinterTC](../data/nodes/wi/wintertc.json) — wintertc
- [workerd](../data/nodes/wo/workerd.json) — workerd
- [Wrangler](../data/nodes/wr/wrangler.json) — wrangler

既有扩写：[Node.js](../data/nodes/no/nodejs.json)、[Deno](../data/nodes/de/deno.json)、[Bun](../data/nodes/bu/bun.json)、[Cloudflare Workers](../data/nodes/cl/cloudflare-workers.json)、[边缘计算](../data/nodes/ed/edge-computing.json)、[无服务器架构](../data/nodes/se/serverless.json)、[AWS Lambda](../data/nodes/aw/aws-lambda.json)、[背压](../data/nodes/ba/backpressure.json)、[事件循环](../data/nodes/ev/event-loop.json)、[WebSocket](../data/nodes/we/websocket.json)。

本分支正文引用 59 个不同的一手资料 URL，事实对应的具体链接保存在节点正文。

### 类型化 API、运行时模式与契约工具链（新增 53，扩写 7）

工程主线：API 契约 → 代码优先或契约优先设计 → 路由类型 / 接口描述 → 客户端与文档生成；外部数据 → 运行时 Schema 校验 → 转换后的输入输出；Standard Schema 与 JSON Schema 交换分开说明；消费者契约、Schema 驱动测试、属性测试和网络模拟分别接入。。

新增：

- [Ajv 校验库](../data/nodes/aj/ajv.json) — ajv
- [API 客户端](../data/nodes/ap/api-client.json) — api-client
- [API 客户端生成](../data/nodes/ap/api-client-generation.json) — api-client-generation
- [API 契约](../data/nodes/ap/api-contract.json) — api-contract
- [API 文档生成](../data/nodes/ap/api-documentation-generation.json) — api-documentation-generation
- [ArkType 校验库](../data/nodes/ar/arktype.json) — arktype
- [代码优先 API 设计](../data/nodes/co/code-first-api-design.json) — code-first-api-design
- [消费者驱动契约测试](../data/nodes/co/consumer-driven-contract-testing.json) — consumer-driven-contract-testing
- [契约优先 API 设计](../data/nodes/co/contract-first-api-design.json) — contract-first-api-design
- [契约测试](../data/nodes/co/contract-testing.json) — contract-testing
- [fast-check 性质测试库](../data/nodes/fa/fast-check.json) — fast-check
- [Hono OpenAPI 中间件](../data/nodes/ho/hono-openapi.json) — hono-openapi
- [Hono Standard Schema 校验器](../data/nodes/ho/hono-standard-validator.json) — hono-standard-validator
- [Zod OpenAPI Hono](../data/nodes/ho/hono-zod-openapi.json) — hono-zod-openapi
- [Hono Zod 校验中间件](../data/nodes/ho/hono-zod-validator.json) — hono-zod-validator
- [Hypothesis 性质测试库](../data/nodes/hy/hypothesis.json) — hypothesis
- [接口定义语言](../data/nodes/in/interface-definition-language.json) — interface-definition-language
- [Joi 校验库](../data/nodes/jo/joi.json) — joi
- [JSON 模式](../data/nodes/js/json-schema.json) — json-schema
- [JSON 类型定义](../data/nodes/js/json-type-definition.json) — json-type-definition
- [marshmallow 序列化库](../data/nodes/ma/marshmallow.json) — marshmallow
- [MSW 网络模拟库](../data/nodes/ms/msw.json) — msw
- [openapi-fetch](../data/nodes/op/openapi-fetch.json) — openapi-fetch
- [OpenAPI 代码生成器](../data/nodes/op/openapi-generator.json) — openapi-generator
- [OpenAPI TypeScript 类型生成器](../data/nodes/op/openapi-typescript.json) — openapi-typescript
- [oRPC](../data/nodes/or/orpc.json) — orpc
- [Orval API 生成工具](../data/nodes/or/orval.json) — orval
- [Pact 契约测试](../data/nodes/pa/pact.json) — pact
- [性质测试](../data/nodes/pr/property-based-testing.json) — property-based-testing
- [Pydantic 校验库](../data/nodes/py/pydantic.json) — pydantic
- [QuickCheck 性质测试库](../data/nodes/qu/quickcheck.json) — quickcheck
- [Redoc 社区版](../data/nodes/re/redoc.json) — redoc
- [远程过程调用](../data/nodes/re/remote-procedure-call.json) — remote-procedure-call
- [Scalar API 参考文档](../data/nodes/sc/scalar-api-reference.json) — scalar-api-reference
- [Schema 驱动 API 测试](../data/nodes/sc/schema-based-api-testing.json) — schema-based-api-testing
- [模式校验](../data/nodes/sc/schema-validation.json) — schema-validation
- [Schemathesis 接口测试](../data/nodes/sc/schemathesis.json) — schemathesis
- [Smithy 接口定义语言](../data/nodes/sm/smithy.json) — smithy
- [Spectral API 规范检查器](../data/nodes/sp/spectral.json) — spectral
- [标准 JSON Schema 接口](../data/nodes/st/standard-json-schema.json) — standard-json-schema
- [标准模式接口](../data/nodes/st/standard-schema.json) — standard-schema
- [Supertest HTTP 测试库](../data/nodes/su/supertest.json) — supertest
- [Swagger 代码生成器](../data/nodes/sw/swagger-codegen.json) — swagger-codegen
- [Swagger 交互文档](../data/nodes/sw/swagger-ui.json) — swagger-ui
- [tRPC](../data/nodes/tr/trpc.json) — trpc
- [ts-rest](../data/nodes/ts/ts-rest.json) — ts-rest
- [类型安全 API](../data/nodes/ty/type-safe-api.json) — type-safe-api
- [TypeBox 模式库](../data/nodes/ty/typebox.json) — typebox
- [TypeSpec 接口描述语言](../data/nodes/ty/typespec.json) — typespec
- [typia 类型校验库](../data/nodes/ty/typia.json) — typia
- [Valibot 校验库](../data/nodes/va/valibot.json) — valibot
- [Yup 校验库](../data/nodes/yu/yup.json) — yup
- [Zod 校验库](../data/nodes/zo/zod.json) — zod

既有扩写：[FastAPI](../data/nodes/fa/fastapi.json)、[GraphQL](../data/nodes/gr/graphql.json)、[gRPC](../data/nodes/gr/grpc.json)、[OpenAPI Specification](../data/nodes/op/openapi.json)、[Protocol Buffers](../data/nodes/pr/protocol-buffers.json)、[类型推断](../data/nodes/ty/type-inference.json)、[TypeScript](../data/nodes/ty/typescript.json)。

本分支正文引用 133 个不同的一手资料 URL，事实对应的具体链接保存在节点正文。

### 服务端 HTML 与渐进交互界面（新增 9，扩写 2）

工程主线：JSX → Hono JSX / Preact → 服务端 HTML；htmx → 服务端驱动的页面更新与渐进增强，Alpine.js 提供局部浏览器交互；需要客户端组件接管时使用 hydration，局部接管可采用 islands；Vite 连接 SSR 的构建与开发。。

新增：

- [Alpine.js](../data/nodes/al/alpinejs.json) — alpinejs
- [Hono JSX](../data/nodes/ho/hono-jsx.json) — hono-jsx
- [htmx](../data/nodes/ht/htmx.json) — htmx
- [客户端水合](../data/nodes/hy/hydration.json) — hydration
- [交互孤岛](../data/nodes/is/islands-architecture.json) — islands-architecture
- [JSX 语法](../data/nodes/js/jsx.json) — jsx
- [Preact](../data/nodes/pr/preact.json) — preact
- [渐进式增强](../data/nodes/pr/progressive-enhancement.json) — progressive-enhancement
- [服务端驱动界面](../data/nodes/se/server-driven-ui.json) — server-driven-ui

既有扩写：[服务端渲染](../data/nodes/ss/ssr.json)、[Vite](../data/nodes/vi/vite.json)。

本分支正文引用 24 个不同的一手资料 URL，事实对应的具体链接保存在节点正文。

## 分类与边界

本体从 78 增至 81（0.12.0），领域从 59 增至 62（0.6.0），生态从 82 增至 85（0.4.0）。新增三个概念分类、三个领域和三个子生态；沿用现有字段、实体类型和二十九种关系。具体决策见 [ADR-0029](decisions/0029-web-services-and-api-contracts.md)。

Hono 核心、Hono Client、Node 适配器及独立校验/OpenAPI 插件分别建档。框架采用标准接口、路由与中间件机制；可选后端、工具和校验器具有明确场景，不强加全平台硬依赖。

编译期类型共享、运行时校验、规范化 API 描述、SDK 生成与契约测试分别连接。已有数据工程 data-contract 与编译器 code-generation 保留原定义，新 API 契约与客户端生成机制具有独立语义。HC 编制与 hc 客户端允许同名搜索，依靠 id/type/摘要消歧。

SSR、服务端 HTML 交换与浏览器 hydration 分开说明；SSR 不必建立客户端组件状态，渐进增强不等同特定前端框架。JSX 是语法扩展，Hono JSX 的服务端与客户端能力按实际入口限定。

## 语义修正

- HTTP 总语义与 TCP/QUIC 的版本映射分开；HTTP/2 和 HTTP/3 的多路复用、可靠性与队头阻塞边界写明。
- Cookie 作用域与同源规则分开；JWT、Bearer、签名 Cookie、CORS、CSRF 和业务授权不能相互替代。缓存 no-cache 与 no-store、幂等效果与响应相等也分别说明。
- OpenAPI、GraphQL 挂载 API 规范，不误作网络应用层协议；gRPC 的默认 Protobuf 路径用场景限定，不将可替代的格式绝对化。
- 运行时提供能力与实现语言分开，平台支持 WebAssembly、Node 兼容或特定 Web API 均按支持范围说明；后台任务存续不等同可靠任务队列。
- WinterTC/TC55 与 [ECMA-429 第 1 版](https://ecma-international.org/publications-and-standards/standards/ecma-429/)使用当前正式资料。Bun 摘要采用实际功能描述，正文按当前官方资料记录引擎与兼容性。
- [H3 v2](https://h3.dev/migration)与 [Nitro 3](https://nitro.build/docs/migration)按当前测试版文档限定，Nitro 迁移方向为从 2 升级到 3；ts-rest 的 Standard Schema 支持也明确候选版条件。
- 冷启动作为初始化现象建模，限定其混入稳态性能测量时的偏差；SnapStart 的快照缓存归属于 AWS Lambda，并写明支持的运行时与发布版本范围。移除 Spectral 与 CI、ExecutionContext 与生命周期等主语或方向不符的 uses 边。
- 已有 id、资料状态和对应领域身份保留；删除或替换误义边的理由记录于正文和批次审计。

## 验证

- 全库校验通过，零错误、零警告；本批所有 124 个新增节点均有非分类入边或出边，全部 159 篇新增/扩写正文都有来源和本批元数据。
- 完整生产构建通过，统一生成图形与 Web 服务两批的版本化数据、索引、正文、WASM、站点和离线资源清单。
- 21 项单测、8 项 Chromium 测试、web/tools TypeScript 检查通过。
- 实际构建产物通过 124 个新增 id 搜索、159 个摘要/正文/邻域检查，以及 390 个名称、别名和同名消歧查询。
- 最终数据快照：`99d11756b03fd2a7c30d7c36df15744c733a096de86b6170a1a1a202f1e28c67`。

## 一手资料体系

以 [Hono 文档](https://hono.dev/docs)、[Fetch](https://fetch.spec.whatwg.org/)、[URL](https://url.spec.whatwg.org/)、[Streams](https://streams.spec.whatwg.org/)和 DOM/Service Worker 的接口规范为标准入口。HTTP 语义、缓存与版本映射使用 IETF RFC 正文；浏览器请求防护使用对应 W3C/WHATWG 标准及项目官方实现文档。

跨运行时部分使用 Node.js、Deno、Bun、Cloudflare、AWS 与 Ecma 的官方规范和运行时文档。API 契约使用 OpenAPI、JSON Schema、Standard Schema、GraphQL/gRPC 及类型描述语言的正式资料，校验库、生成器、文档工具和测试工具分别引用各项目当前官方机制指南。服务端 UI 使用 Hono、TypeScript、React/Preact、HTMX、Alpine、Astro 与 Vite 官方说明。具体事实对应各节点正文的直接链接。
