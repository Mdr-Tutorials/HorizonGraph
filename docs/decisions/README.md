# 架构决策记录（ADR）

本目录记录 HorizonGraph 的架构决策。每份 ADR 对应一个决策，一经接受不再删除。

## 约定

- 命名：`NNNN-kebab-title.md`，编号递增不复用
- 状态：已接受 / 试行中 / 已被取代（<新 ADR 编号>）

## 索引

| 编号 | 标题 | 状态 | 日期 |
|---|---|---|---|
| [0001](0001-three-plane-architecture.md) | 三平面架构：数据、契约、派生分离 | 已接受 | 2026-08-29 |
| [0002](0002-type-registry-and-realms.md) | 类型注册表与 realm 正交拆轴 | 已接受 | 2026-08-29 |
| [0003](0003-relation-spec-and-unidirectional-edges.md) | 关系规格表与单向边存储 | 已接受 | 2026-08-29 |
| [0004](0004-controlled-vocabularies.md) | 受控词表与登记模式 | 已接受 | 2026-08-29 |
| [0005](0005-unified-metadata-block.md) | 统一节点元数据块 | 已接受 | 2026-08-29 |
| [0006](0006-id-immutability-and-slug-rules.md) | ID 不可变与 slug 规范 | 已接受 | 2026-08-29 |
| [0007](0007-locale-policy-chinese-canonical.md) | 内容语言政策：中文唯一正本 | 已接受 | 2026-08-29 |
| [0008](0008-version-entity-criterion.md) | 版本实体判定：独立生态位标准 | 已接受 | 2026-08-29 |
| [0009](0009-contract-first-rollout.md) | 先契约后数据：试点—冻结—铺量 | 已接受 | 2026-08-29 |
| [0010](0010-classification-skeleton-plane.md) | 分类骨架的平面归属与搜索降权 | 已接受 | 2026-08-29 |
| [0011](0011-million-scale-infrastructure.md) | 百万级基础设施：单一终态架构 | 已接受 | 2026-08-29 |
| [0012](0012-license.md) | 许可证：数据 CC BY-NC-SA，代码 MIT | 已接受 | 2026-08-29 |
| [0013](0013-ci-validation-suite.md) | CI 校验套件：强制平面落地 | 已接受 | 2026-08-29 |
| [0014](0014-repository-architecture.md) | 仓库架构：单仓三区与派生物不入库 | 已接受 | 2026-08-29 |
| [0015](0015-frontend-stack-million-scale.md) | 前端技术栈：百万级终态，无分层 | 已接受 | 2026-08-29 |
| [0016](0016-ecosystem-dimension-and-worldview.md) | 生态维度与顶层骨架 | 已接受 | 2026-08-29 |
| [0017](0017-version-slice-relation.md) | version_of 切片关系 | 已接受 | 2026-08-29 |
| [0018](0018-homonym-disambiguation.md) | 同名消歧：id 承担身份 | 已接受 | 2026-08-29 |
