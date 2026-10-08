# ADR-0032：Google Antigravity 与智能体开发

- 状态：已接受
- 日期：2026-10-08

## 背景

对 2562 个数据节点的 id、名称、缩写、别名及正文检索，没有找到 Google Antigravity。已有编程助手、MCP、代理框架与浏览器测试条目不足以解释代理执行、扩展互操作、软件工程环境、权限和评估的完整路径。既有 HumanEval 和 DOM 的类型与所指身份也需要对齐。

本批按九个分支补全：Antigravity 产品家族、编程代理产品、IDE 与软件工程、智能体运行与协作、扩展与协议、执行安全、浏览器自动化、评估验证、Google AI 生态。完整节点清单、直接来源和验证见 [内容批次记录](../content-antigravity-and-agent-development-2026-10.md)。

## 决策

1. 本体 92 → 95，版本 0.15.0。新增 agent-systems-concept、ai-software-engineering-concept、browser-automation-concept，均继承 theory。明确既有 developer-environment-concept 同时覆盖开发工具、代码工作区、语言服务、调试与跨宿主环境；通用 IDE 机制不因此归成 AI 专属概念。安全机制复用 application-security-concept，评估指标复用 metric，评估数据制品复用 dataset。不为每个功能新增 EntityType。
2. 领域 71 → 74，版本 0.9.0。新增 agent-development、ai-assisted-software-engineering、browser-automation。通用安全、机器学习、统计与软件工程领域继续复用。
3. 生态 93 → 96，版本 0.7.0。AI 辅助软件工程兼属 AI/数据科学与软件工程工具链；浏览器自动化兼属 Web 与软件工程工具链；Google AI 归入 AI/数据科学。三者不被泛化为全部属于 LLM agent、IDE 或公有云，具体成员按实际范围声明。
4. 类型 Schema 保持 3.5.1，二十九种关系与十个宏观生态根不变。Google Antigravity 产品家族、独立桌面控制台、IDE、CLI、本地 Python SDK、托管 agent 与编辑器扩展分别建档，远程控制作为运行能力概念；同一品牌不等于同一工件。
5. 保持已有 id。HumanEval 所指为任务数据集，以 product 挂 dataset；pass@k 单独为 metric。DOM 所指为树与事件接口规范，以 protocol 挂 api-specification，删除不成立的 HTML 组成关系。AI 源代码生成与既有编译器目标代码生成分开；代理工作流检查点与已有流处理检查点保留各自范围。
6. Agent harness、会话、状态、记忆、产物存储、压缩、检查点与协作分别定义。通用规则、技能、插件和钩子与具体宿主配置及便携规范分开；LSP 与 DAP 不混为同一消息协议。ReAct 等多义名字使用限定 id，不覆盖已有 React 框架。
7. 不把被评审的攻击或风险对象记录成评审方法采用的技术。confused-deputy 与 excessive-agency 有充分来源及分类挂载，本批没有可证实的非分类关系时明确保留分类访问，不为非分类连通数量制造关系。

## 产品、规范与关系边界

Google 当前资料分别描述桌面、IDE、CLI 与本地 SDK；托管 Antigravity agent 经 Gemini Interactions API 调用，本地 Python 包不是该服务的同名客户端。托管预览的工具、输入与结构化输出支持范围不能从 IDE 或 SDK 推导。产品和特定 SDK 的发布状态分别记录，不把品牌 GA 当成所有组件已经稳定。[Antigravity 文档入口](https://www.antigravity.google/docs/home)、[SDK](https://www.antigravity.google/docs/sdk/overview)、[托管 agent](https://ai.google.dev/gemini-api/docs/antigravity-agent)

桌面 macOS/Linux 的新权限系统、Windows 的旧设置、CLI 与 SDK 策略接口有不同条件。页面读取授权与页面交互授权分开，独立浏览器 profile 不等于操作系统沙箱，子代理上下文独立也不等于权限隔离。规则和技能中的文字不能自行建立强制授权边界。[权限文档](https://www.antigravity.google/docs/permissions/)、[沙箱文档](https://www.antigravity.google/docs/sandbox/)

MCP 按当前正式 2026-07-28 规范记录自包含请求和多轮请求机制；旧版初始化与会话语义按版本限定，可选扩展与所有客户端的实际支持分开。Agent Skills、Agent Plugins、MCP、A2A 和 Agent Client Protocol 各有规范身份，不因名称或配置文件相似就推导符合标准。宿主和客户端实现协议，模型族本身不因此 implements MCP。[MCP 当前规范](https://modelcontextprotocol.io/specification/2026-07-28)、[Agent Skills](https://agentskills.io/specification)、[Agent Plugins 1.0.0](https://github.com/agentplugins/agent-plugins-spec/blob/main/spec/1.0.0.md)

uses 必须由实际调用或采用者持有，并在必要时限定语言包、平台、配置与任务。代码索引不自动证明使用语义嵌入，公开浏览器操作能力不证明内部采用 Playwright 或 CDP。源码基础、实现语言、运行依赖与可选集成分开，产品之间不凭功能相似添加演进或依赖关系。

评估任务集、执行 harness、判定规则、成功率、成本及可靠性指标分别记录。截图、测试输出、轨迹和产物是可供检查的证据，不自动证明任务正确完成。基准分数注明版本、环境、预算与成功条件，不推导为所有真实项目表现或产品排行。

## 结果

Google Antigravity 可沿编码工具、IDE、执行、扩展、浏览器、权限与评估路径进入具体协议、实现及相邻生态。所有本批作者内容保留 ai_draft 和 2026-10-08 复核日期；最终校验、完整构建与 JS/真实 WASM 检索结果写入内容批次记录。
