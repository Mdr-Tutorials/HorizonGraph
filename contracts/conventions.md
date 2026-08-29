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
