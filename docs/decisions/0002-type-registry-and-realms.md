# ADR-0002：类型注册表与 realm 正交拆轴

- 状态：已接受
- 日期：2026-08-29

## 背景

v3.0 中 `abstraction_level` 对 company、model_family、metric 等实体不成立；company 命名错位（CNCF、W3C、Apache 不是公司）；产业图谱缺 person 类型。根因：EntityType 枚举同时承担分类、字段适用性、层级归属三份职责。

## 决策

1. Schema 枚举修正：`company` → `organization`；新增 `person`
2. 引入顶层 realm 维度作为 type 的正交拆轴：
   - conceptual：meta_concept / concept / metric
   - technical：language / protocol / framework / library / tool / architecture / model_family / product
   - industrial：organization / person
3. realm 不写入节点 Schema——它是 type 的函数，存于 `types.json`，由 CI 推导
4. 字段适用性以矩阵存于 `types.json`：`abstraction_level` 对 technical 必填、conceptual 可选、industrial 禁填；各类型其余字段的必填/可选/禁填同理声明

## 后果

正面：`abstraction_level` 分析轴（全栈穿透）不再被非技术实体污染；新增类型只需注册表加一行，Schema 结构不变；为 0003 的 domain/range 校验提供依据。
负面：realm 归属存在灰色地带（如 product 挂 technical），判定文本需写入 types.json。
当前数据量为零，枚举修正的迁移成本为零——该免费窗口关闭后此修正代价为全量重构。

## 关联

0001（契约平面）、0003（domain/range 引用本注册表）
