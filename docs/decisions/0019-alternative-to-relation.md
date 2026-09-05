# 0019 — alternative_to 替代方案关系

状态：已接受 · 2026-09-05

## 背景

批量录入与全图边审计中两次撞上同一 schema 缺口：`competes_with` 的 domain/range 限定工程工件（language…product），导致两类高频叙事无法落图——

1. **概念间的对比**：Paxos 对 Raft、光栅化对光线追踪、CRDT 对 OT、REST 对 GraphQL（跨类型：概念对协议）、B+树对 LSM-Tree；
2. **组织间的对比**：GitHub 对 GitLab、Gitee 对 GitHub。

这些边要么被迫省略（页面缺失关键叙事），要么被错误建模后由 CI 拦下（多轮返工成本）。

## 决策

新增对称关系 `alternative_to`（显示：替代方案 / alternative to）：

- **domain/range**：全部 12 种数据类型。概念、度量、组织、人物之间，以及跨类型（如概念对协议）的对比均可表达。
- **与 competes_with 的分界**：competes_with 表工程工件之间同生态位的市场竞争；alternative_to 表认知层面的"同类可选、社区惯于对比"。同一对节点两者不得并存。
- **存储规则**：与 competes_with 一致——对称关系仅存一份，存于 id 字典序较小一侧；禁止镜像双存；禁止自环。
- **CI**：校验器将 competes_with 的侧向检查与镜像检查泛化到 alternative_to，并新增两条关系的互斥检查。

## 后果

- 之前被 domain 拦下的对比叙事可以补录（首批 12 对）。
- 录入时需在两条关系间做判断：工程工件对工程工件的市场竞争走 competes_with；其余对比走 alternative_to。判定歧义列入合并评审重点。
- 关系总数 13 → 14，relations.json 版本 1.2.0 → 1.3.0。
