<!-- 检查清单：PR 清单会在 CI 中逐项机器校验，人工聚焦内容质量即可 -->

## 类型

- [ ] 数据：新增/修改节点（`data/nodes/`）
- [ ] 生态/词表：登记新值（`contracts/vocab/`，须与数据同一 PR）
- [ ] 本体：分类骨架变更（`contracts/ontology.json`，语义化版本号）
- [ ] 工具/前端代码

## 说明

<!-- 描述本次改动。新增节点请附上结构依据（挂载分类、关系选型依据）。 -->

## 提交前自查

- [ ] `pnpm validate` 通过（新增节点：字段矩阵、slug、边域值、词表登记）
- [ ] 新词已同步登记进 `contracts/vocab/`
- [ ] 日期为 `YYYY-MM-DD`，summary 中文 ≤50 字
- [ ] 关系边方向符合 `relations.json` 的 canonical_owner