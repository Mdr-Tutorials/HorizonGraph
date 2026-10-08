# 契约约定（Conventions）

本文件是契约平面的约定文档，与 types.json / relations.json / ontology.json / vocab/ 同级生效。修订契约文件时同步修订对应 ADR。

## 1. Slug 规范

- 全小写 kebab-case
- 符号归一：C++ → `cpp`，C# → `csharp`，井号与点号剥离
- 版本号小写连字符：`glm-4`、`cpp-20`、`http-3`
- 缩写保留：`k8s`、`llm`
- 中文进入 aliases，id 全 ASCII
- id 发布后保持不变；改名场景在 `data/renames.json` 登记，redirects 由 build 派生
- 保留 slug：五个锚点（meta-concept、meta-architecture、meta-protocol、meta-organization、meta-artifact）与十二个类型根（theory、protocol、language、framework、library、tool、platform、metric、model-family、product、organization、person）专用于本体

## 2. importance 锚定标准

| 值 | 定义 |
|---|---|
| 5 | 教学主线必讲，生态基石 |
| 4 | 生态主流，多数从业者日常接触 |
| 3 | 生态常见，特定领域核心 |
| 2 | 细分场景使用 |
| 1 | 长尾，收录以补全拓扑 |

### popular（全局影响力）

1–100 绝对值，量全局知名度/使用度/产业渗透力，**与 importance 正交**：importance 回答"教学中多核心"，popular 回答"世界上多广泛"。档位：81–100 极高 / 61–80 高 / 41–60 中 / 1–40 低。字段可选；未填视作未知，不参与影响力档位筛选。

录入时先判"圈外普通人或跨行业从业者是否听说过"，再在档内校准。

## 3. 版本实体判定

判定标准：**有独立生态位才开新节点。** 满足任一条即独立成节点：

1. 拥有自己的关系边集合（生态位确实不同）
2. 有独立官方文档或发布物
3. 教学叙事上需要并列对比

通过判定的版本节点以 `version_of` 挂载母体，页面渲染为母体差异视图，时间线按 `first_released` 排序。未通过判定的版本写入节点内版本说明或 description。边界案例由维护者在 PR 中裁决并在此追加先例。

先例：

- C++23 相对 C++：特性集独立、文档独立，独立成节点，version_of cpp
- C++ Concepts 相对 C++20：特性级组成，part_of cpp-20
- GLM-4.5 相对 GLM：共享生态位时并入 GLM 节点，版本差异写入 description

## 4. 内容规范

- 日期一律 `YYYY-MM-DD`
- summary：中文，50 字以内
- name：英文/官方原名；中文译名与俗称进 aliases
- 术语显示全站统一两段式（主名 + 副名，样式仅字号随位置变化）：`display_primary` / `display_secondary` 手动优先，设置任一即完全接管两段；未设置时——组织类主名 = 英文/官方原名、副名 = 首个中文别名；其余有中文名则主名 = 中文名、副名 = 英文名；无中文名则主名 = 英文简称（无简称用英文名）、副名 = 英文全称（主名即全称则留空）
- aliases 中第一个中文别名即显示主名，录入时把最佳中文名排在最前
- description：Markdown，L2 懒加载
- official_site：官方规范、标准提案或权威主页

## 5. 同名与消歧

- 身份由 id 承担，id 跨全图唯一；name/abbreviation/aliases 允许同名，同名异物是正常现象
- 名称易混或冲突时，slug 自带限定词：`glm-llm-zhipu`（智谱大模型）、`glm-stat-model`（统计模型）、`apache-spark`、`spark-framework`
- 先例：公司本体与产品同名时产品加限定词——`gitlab-ci`、`mongodb-database`、`snowflake-data-cloud`、`okta-idp`、`coinbase-exchange`、`binance-exchange`、`palantir-foundry`、`datadog-platform`、`coreweave-cloud`、`metabit-platform`；多义专名按生态分词——`baidu-apollo`（为 GraphQL Apollo 留 `apollo-graphql`）、`iflytek-spark`（`spark` 留给 Apache Spark）、`jane-street-core`、`deepseek-llm`
- 搜索命中多个节点时返回全部命中，以 type、生态、summary 区分；检索层动态匹配，不设消歧登记
- 同词同物（重复实体）由审校合并；slug 与别名近似检测列入百万级批量管线

## 6. 生态维度

- 注册表：`vocab/ecosystems.json` 单一树形结构，10 个宏观根为闭集（变更走 major 版本），根以下深度开放、随数据 PR 登记
- 节点字段 `ecosystems[]` 只声明所属圈层，任意层级可命名，多值多归属；宏观归属与全部祖先由 build 沿树派生
- parents 可多亲（DAG）；CI 校验无环且所有链路终于宏观根
- 条目可选 `blurb` / `maintainers`，供生态页叙事
- 生态与本体的分界：生态回答“谁在这个圈里”，本体回答“这是什么”；成员含组织、人物等产业主体时建生态，清一色同类型实体优先考虑本体分类
- 生态页在注册表每个节点派生渲染（预渲染站点页，SEO 入口）

## 7. 词表登记流程

1. 在 vocab/ 对应文件登记新词（value / en / zh，kebab-case value；ecosystems 需 parents）
2. 在同一 PR 中使用该词的数据节点
3. CI 双向校验：数据中出现未登记 value 即失败；登记项连续多个周期未被引用则告警

## 8. 邻域展示契约

- 邻域单表示：不渲染画布、不画边
- 词条页「属于 / 版本 / 子分类」三块并列，其余进「关系」栏；每行 = 关系名 + 客体术语（两段式）
- 「属于」汇集 is_instance_of、version_of 母体、part_of，同一栏可多项
- 持有 version_of 的节点：「属于」显示母体，「版本」显示同一母体下的全部版本（含自身，按 id 字典序；当前项禁用链接）；is_instance_of 分类挂载不进「属于」
- 「子分类」只收本体节点的反向包含，数据节点的 part_of 反向进「关系」

- 排序：关系优先级，同级按 importance 降序、id 字典序；超过阈值折叠
- 引用态词条只显示主名与副名；完整信息只在词条自身页面出现
- 页面元素只保留内容相关项：无装饰边框、无底色面板、无意义文案；结构靠间距与字重表达
- 分类角色节点在搜索结果中以“导航”分区单独展示，词条命中在前
- 持有 version_of 的节点在搜索中折叠于母体名下

## 9. 本体扩展流程

1. 在 ontology.json 增加节点：类型根必填 entity_type，中间分类按需覆写，超根声明数组
2. 子分类以 `parents` 数组指向上级，多亲 DAG——一个分类可属多个上级；挂载一致性由 CI 校验（源 type ∈ 目标分类生效 entity_type 集合，生效集为各 parent 链的并集）；CI 校验无环
3. ontology.json 语义化版本号随变更提升：新增分类为 minor，结构调整（移动/删除）为 major

## 10. 理论域挂载规则

本体理论域分类（type-system、deep-learning、distributed-systems、concurrency-theory、programming-paradigm）按源类型分流：

- 源是 concept / metric → `is_instance_of`（attention-mechanism → deep-learning）
- 源是工程工件（language / framework / library / tool / architecture / product…）→ `implements`（haskell implements type-system、prolog implements programming-paradigm、erlang implements concurrency-theory）

反方向不落图：理论对工件的约束写在理论节点叙述里，「被实现」由 build 从 implements 的 inverse 渲染。

## 11. 招聘语境的关系与别名

- assesses 表评估活动考察知识或方法；prepares_for 表资源或方法用于准备评估。
- describes 表文书或记录描述内容；discusses 表沟通活动涉及议题。它们不推导组成、审批结果、流程先后或录用结论。
- 关系契约的 requires_context 为 true 时，数据边与本体叙事边必须提供非空字符串 context；当前包括 uses、stewarded_by、refers_to、subsidiary_of、can_bias 与上述四种关系。
- OC、HC、JD、STAR、QR、QD 使用 abbreviation；招聘俗称进入 aliases 与正文。歧义俗称可返回多个词条，不为缺少稳定定义的说法建立标准流程节点。
- 详见 ADR-0022；可选的招聘做法与岗位技术须限定场景，不作为所有公司的统一要求。

## 12. 企业合称与所指组织

- 企业合称作为 concept，使用 refers_to 指向各组织；它不是 organization，也不代表一个共同法人或组织隶属。
- 多义缩写使用限定 id 与显示名，context 明确该边采用的释义。BAT 的 ByteDance 用法使用 bat-bytedance-alibaba-tencent，只连接字节跳动、阿里巴巴与腾讯；传统 Baidu 用法在正文区分。
- 单一组织的同义名称沿用 aliases；产业圈层沿用 ecosystems，不用指代关系表达泛化关联。
- 公司更名时保持组织 id，更新显示名并将公司旧名保留为 aliases；历史合称可保留原缩写，refers_to 指向同一组织，context 说明旧名与现名。FLAG 的 F 使用旧名 Facebook，指向 meta；不因更名自动制造新的合称。

## 13. 职业、量化与公司主体的边界

- 软件开发岗位的 SWE 与 SDE 合并为同一职业概念的检索入口，不把常见头衔差异强行解释为统一的岗位级别。IC 表示个人贡献者职责路径，不能据此推断初级或没有技术领导责任。
- 岗位 uses 技术、方法或指标必须给出实际场景；风险因素导致评估失真使用 can_bias，不能用 uses 把应避免的错误写成工作方法。
- 薪酬组成写明适用条件。员工期权与 RSU 分别建档；归属、行权与出售不混写为同一步骤。绩效评估、晋升和内部转岗分别定义，不强加统一的公司政策。
- 母子公司分别建组织节点，以 subsidiary_of 记录直接关系；Google 不是 Alphabet 的别名。公司与同名产品也分别建档，以 provides 表达提供关系，旧公司名可与产品名共享检索结果。
- 详见 ADR-0024。金融语境的 FAANG 中，G 可对应上市主体 Alphabet；沿用 Google 名称的历史展开需在正文及边的 context 中说明。
- 公司与同名产品分别建模。既有 linkedin 指职业社交平台，补充 linkedin-company 指公司主体；FLAG 的 L 指向公司，由公司通过 provides 连接平台。既有产品 id 不变。
- 详见 ADR-0023；社区资料只能支持称谓存在，不能据此宣称某种解释已经统一取代其他解释。

## 14. 图形接口、资产与运行时

- API 接口规范按 protocol 建模，挂 api-specification；Canvas 2D、WebGPU、Web Audio 等接口不挂网络应用层协议分类。调用规范使用 uses；实际实现规范的工件才使用 implements。
- 图形资产格式按 protocol 建模，挂 graphics-asset-format；glTF 与 GLB 分别表达场景资产规范与二进制封装，不能将 GLB 混作已有 GLBP 路由协议。编辑器、交换格式与运行库分别建模，允许共享品牌名检索。
- 游戏场景与渲染场景图分别表达生命周期管理与空间层级；图形合批与已有通用 batching 概念区分。可选渲染后端、加载器、物理系统和插件在 uses.context 中明确适用条件，不记录为所有部署的硬依赖。
- 图形、动画、内容制作与可视化机制按对应概念分类；FPS 与帧耗时等指标按 metric 分类。概念、工具、语言和格式使用既有 EntityType，不为每个子领域新造类型。
- 保持既有引擎、API 和工具 id。分支入口、完整清单、语义修正与验证见 ADR-0028 和对应内容批次记录。

## 15. Web 服务、运行时互操作与 API 契约

- Fetch Request/Response、URL、Streams 等接口规范挂 api-specification。HTTP 方法、路由、中间件与上下文按机制概念建模；网络路由器和 OSI 会话层不能充作 HTTP 应用路由或会话。
- 框架调用运行时接口使用 uses；平台适配器、校验器和 OpenAPI 插件具有各自工件身份，框架不会因存在可选集成而硬依赖所有后端或工具。平台绑定与执行上下文必须限定平台、存续和资源条件。
- 编译期类型共享、运行时数据校验、API 描述格式、认证授权与契约测试分别说明。Hono RPC 的类型推导不等于运行时校验，也不能替代安全边界或验证任意服务器实现符合契约。
- 通用缓存、幂等性、背压及类型推导复用已有节点；HTTP 缓存、条件请求等机制通过限定场景连接。库与语言、运行时与实现语言、格式与原始研发者的关系不得从品牌或源码名称推断。
- 标准状态与兼容性使用检索时的一手资料；正式 ECMA-429 与 WinterTC 不写成历史草案，跨运行时 API 支持不推断完全等同浏览器或 Node.js。完整范围与来源见 ADR-0029 和对应内容批次记录。

## 16. WSL、容器与跨宿主开发

- WSL 平台、WSL 1/2 架构切片、WSLc CLI、容器功能、原生 API 与 SDK 分别建档；同一品牌不代表同一工件。普通 WSL 发行版与 WSLc 会话的 VM、配置及安全边界分别说明。
- OCI 组织、规范族、Runtime/Image/Distribution 规范分开。已有 oci 保留稳定 id 与 protocol 身份，明确为规范族入口；组织和具体规范各有身份，不把组织写成可实现的协议。Registry API 不等同 Engine 管理 API。
- Linux Namespaces 与 cgroup 是内核机制；以 concept 挂 os-mechanism。平台、runtime 与工具采用机制用限定 uses，不把实现语言、常用后端或某条平台路径写成所有部署的硬依赖。
- 镜像、运行容器、卷、bind mount、文件共享接口与网络模式分别记录。跨文件系统性能、变更通知与权限语义分别核验，不从其中一个属性推断其他属性。
- 开发容器和 Compose 的声明规范与 CLI、插件、远程服务分别建档。社区工具不归为微软内置能力；GA 产品、历史预览、语言投影状态和路线图按当前一手资料明确限定。
- 制品 digest、签名、来源证明、SBOM 和漏洞扫描分别建模；它们不等同授权、安全认证或完整供应链保证。完整范围与来源见 ADR-0030 和对应内容批次记录。

## 17. HFT、电子交易与低延迟系统

- HFT、一般算法交易及电子交易各有范围。法域认定条件、消息频率与典型行业特征分别说明；阈值注明市场、主体、计数口径和日期，不推广为全球定义。
- 通用撮合引擎、OMS、EMS、网关及交易模拟机制使用 concept；具体软件和商业场所、行情产品使用各自实体类型。行情表示、价格或成本指标、编码、会话与业务规范分开，MBO 不保证完整排队信息。
- 既有 k-lang 保留稳定 id，明确定义为 q；K 数组语言和 kdb+ 数据库分开。Citadel 与 Citadel Securities 分开，不因品牌相近推导组织隶属。RSS、Lean、服务熔断的既有含义保留，新网络或金融含义用限定 id 消歧。
- io_uring、epoll 等具体 API 以 protocol 挂 api-specification，内核机制、API 与包装库分别说明。通用低延迟生态不继承金融根；实际金融成员可另行声明金融生态。
- 指标采用关系从实际评估或执行主体出发，不由被评估的能力、状态或效应持有 uses。可选后端和场所特有行为在 context 中限定，不形成全部 HFT 的无条件软件或硬件依赖。
- UTC 偏差、时间戳分辨率、采集精度与端到端时延不互相替代；法规概念不作可实现协议，草案不作已发布标准。完整范围、辖区边界与来源见 ADR-0031 和对应内容批次记录。

## 18. 智能体开发、扩展与评估

- 品牌家族、IDE、CLI、SDK、编辑器扩展与托管服务分别表达实际交付身份。本地运行与云端 API 的能力、发布状态和权限默认值按产品面及平台限定，不能由同一名称互相推导。
- 会话、运行状态、记忆、上下文压缩、执行检查点和产物存储分别定义。模型提出工具调用，宿主执行代码负责校验和授权；模型族不因宿主支持 MCP 而 implements MCP。
- 技能、规则、插件与生命周期钩子是不同扩展机制；开放规范与宿主配置分开。MCP 核心和可选扩展按版本记录，A2A 的代理互操作与 ACP 的编辑器接口分别建档；同名缩写可共享检索但不混身份。
- 源码基础、实现语言、运行依赖和可选集成分别说明；浏览器操作能力不证明使用某个内部协议或库。独立 context window、Chrome profile 和操作系统沙箱各有实际边界，文字规则本身不构成授权强制措施。
- 数据集以 product 挂 dataset，指标为 metric，评估执行器保留具体软件身份。HumanEval 与 pass@k 分开，DOM 按具体树与事件接口规范建档；AI 源代码生成不覆盖编译器代码生成。
- 评估注明任务、版本、环境、预算、判定规则和可重复条件。测试输出、轨迹、截图及产物支持审查，不自动代表任务成功或产品普遍质量。完整范围和来源见 ADR-0032 与对应内容批次记录。
- 风险对象不是评审方法采用的技术。没有可证实的非分类关系时，保留有来源的分类挂载并在内容记录中明确说明，不为连通数量目标制造 uses、组成或依赖边。

## 19. 终端、语言工具链与软件组成

- Tern JavaScript 分析器与容器软件组成检查器分用限定 id，允许同名检索。编辑器、解析器、推断引擎、语言服务、自有查询协议与 LSP 适配器分别表达；源码托管迁移、旧代际与停止维护不能互相推导。
- 终端仿真器、Shell、TTY/PTY、进程会话、作业控制与会话复用按各自机制建档。Windows Console Host、ConPTY API 与 Windows Terminal 分开；标准流、POSIX 描述符、C 流对象和 Windows HANDLE 不能混为同一对象。
- ECMA 终端控制序列与特定实现的扩展分开，键盘、图像、鼠标、剪贴板与同步输出按实际支持连接。tip 文档、库 API 和终端应用正式版分别注明成熟度及平台范围。
- Unicode 码点、编码单元、字素簇、字形和终端列宽分别说明；双向排布、塑形、字体回退和栅格化有各自职责。字体资产使用 product，标准格式与具体接口按实质分类，不统一视作 API。
- 字节流管道、对象管道、退出状态、诊断通道与重定向分别表达。POSIX Shell、Fish、Nushell 和 PowerShell 的语法及外部程序交互语义按宿主限定。
- 组件发现、软件标识、许可证据、SBOM 结构与完整性、漏洞匹配、VEX 和来源证明分别记录；原生功能与可选检测器不混，清单与声明不自动构成安全或法律结论。完整范围与来源见 ADR-0033 和对应内容批次记录。

## 20. 软件度量、仓库分析与质量验证

- 软件规模、结构、质量、测试和交付指标使用 metric；估算、解释和研究方法使用 concept，具体工具、库、平台、文档和数据集按交付身份分类。源码行数、功能点、相对估算和人月分别定义，不写成无条件可换算单位。
- 物理与逻辑行、代码与注释、空行、文件数、唯一行和重复率分别说明。统计范围、生成与供应商代码、嵌入语言、忽略规则、工具版本及构建特性会影响对象与分母；默认行为和可选配置不能混写。
- 工具实际使用指标和方法可持有 uses；公式输入也可由计算指标持有 uses，context 说明计算口径。被评估对象不反向使用评估方法或指标；历史相关性、风险或能力不充作采用、组成或硬依赖。
- 圈复杂度定义与词法近似、可维护性公式变体、克隆与唯一行分别说明。成本模型及修复时间是有假设的估计，计数和检测阈值不自动证明质量、生产力、因果或实际工作量。
- 仓库语言份额、源码计数、历史变更与贡献、声明责任和身份解析各有范围。Git 历史完整性、重命名启发式和研究采样需注明条件，不能从版本记录推导完整的个人工作或缺陷来源。
- 覆盖、插桩与变异指标按对象、排除、分母、超时和等价判定定义。DORA、SPACE、DevEx 和实证研究按当前原始资料解释作用域、效度和外推边界；版本或产品代际的状态分别限定。完整范围和来源见 ADR-0034 及对应内容批次记录。
