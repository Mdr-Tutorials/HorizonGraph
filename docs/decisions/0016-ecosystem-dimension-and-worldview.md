# ADR-0016：生态维度与顶层骨架

- 状态：已接受
- 日期：2026-08-29

## 背景

六锚点世界观提案（Ecosystem / Concept / Architecture / Protocol / Organization / Artifact）要求生态成为顶层骨架的一维。生态做图节点会与 ecosystems 字段构成同一事实双表示；元关系（organization develops artifact 等）属类型级语句，入图会造成元边短路。生态层级曾拟两层封顶以防词表影子上本体，被否——封顶削弱认知纵深，违背"认知重于检索"的核心目的。

## 决策

1. **顶层骨架**：六维世界观采纳为五个叙事超根（meta-concept / meta-architecture / meta-protocol / meta-organization / meta-artifact）入 ontology.json，十二类型根挂其下；词条挂载仍只指向类型根与中间分类，锚点不接 is_instance_of。生态不入图。世界观图由锚点间的实际关系边派生（关系即数据，无专用叙事字段），生态圈作底板
2. **生态维度 = 单一树形注册表** `vocab/ecosystems.json`：十个宏观根闭集（第十群定名 enterprise_industry 企业与行业应用），根以下深度开放不封顶；parents[] 多亲成 DAG；CI 校验无环且所有链路终于宏观根
3. **单一事实源**：节点只声明 `ecosystems[]`（任意层级、多值多归属），宏观归属与全部祖先由 build 沿树派生；macro_ecosystems 字段从 Schema 删除
4. **生态页**在注册表每个节点派生渲染，属预渲染站点页，承担 SEO 入口；blurb / maintainers 存注册表条目，机构维护生态（如 Linux 基金会之于 Linux 生态）的事实安放于此
5. **生态与本体的分界**：生态回答"谁在这个圈里"，本体回答"这是什么"；成员含组织、人物等产业主体时建生态，清一色同类型实体优先考虑本体分类

## 后果

正面：认知纵深不受层级限制；生态归属单一事实源；生态页补齐 SEO 入口缺口。
负面：注册表治理为长期成本；生态/本体边界判定存在主观空间，靠先例积累收敛。

## 关联

0004（词表登记）、0008（版本判定）、0010（分类骨架平面归属）、0014（仓库架构）、0015（站点页与节点页二分）
