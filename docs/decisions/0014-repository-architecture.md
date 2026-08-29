# ADR-0014：仓库架构——单仓三区与派生物不入库

- 状态：已接受
- 日期：2026-08-29

## 背景

契约文件动工前须先确定仓库物理布局。硬约束：社区单一低门槛贡献入口（ADR-0013）、百万级容量（ADR-0011）、三平面分离（ADR-0001）。

## 决策

### 1. 单仓 monorepo

数据、契约、工具、前端同仓。理由：数据与契约同仓，同一 CI 门禁才能交叉校验（domain/range 引用类型注册表、词表覆盖、本体完整性）；社区贡献只有一个入口。数据仓与代码仓分离方案被否——跨仓引用让 CI 与贡献流程复杂化。远期数据体量超限时拆分属新 ADR。

### 2. 目录布局

```
HorizonGraph/
├── README.md                 # 北极星：愿景五条 + 快速上手（规划）
├── LICENSE                   # MIT（代码）
├── LICENSE-DATA.md           # CC BY-NC-SA 4.0（数据）
├── docs/
│   ├── decisions/            # ADR（本目录）
│   ├── license-faq.md        # NC 边界解释口径（规划，ADR-0012 要求）
│   └── schema-reference.md   # 由 types.json 生成的可读参考（规划）
├── contracts/                # 契约平面（手写，规则唯一来源）
│   ├── types.json            # EntityType / realm / 字段适用性矩阵
│   ├── relations.json        # 关系五项规格
│   ├── ontology.json         # 分类骨架：全部非叶子节点及层级（ADR-0010）
│   ├── conventions.md        # 约定文档
│   └── vocab/
│       ├── ecosystems.json   # 生态维度树形注册表（ADR-0016）
│       ├── domains.json
│       └── tags.json
├── data/                     # 数据平面（手写，唯一事实源）
│   ├── nodes/
│   │   └── <id前两字符>/<id>.json
│   └── renames.json          # 改名记录 → build 派生 redirects（ADR-0006）
├── tools/                    # 构建与校验（TypeScript / pnpm）
│   └── src/
│       ├── gen/              # 从 types.json 生成 TS 类型与校验 schema
│       ├── validate/         # ADR-0013 八项校验
│       └── build/            # bundle / 分片搜索索引 / 反向索引 / 生态页 / 世界观图，增量构建
├── web/                      # 前端：客户端切片引擎与渲染
├── dist/                     # 派生平面（gitignore，仅存在于 CI）
└── .github/workflows/
    ├── validate.yml          # PR 触发增量校验
    └── deploy.yml            # main 构建 → Pages 部署 + 定期全图校验
```

### 3. 派生物不入库

`dist/` 全量 gitignore，仓库中不存在任何派生文件。CI 经 Actions 缓存恢复上次产物、增量重建、以 artifact 直接部署 GitHub Pages。git 仓库永远只含手写内容。词表漂移检测走双向 CI 校验，不提交派生快照。

### 4. 单一来源 + 代码生成

`types.json` 是 Schema 的唯一来源：字段定义、类型、适用性矩阵全部在此。`tools/src/gen` 生成 TS 类型与校验 schema，禁止任何手写的重复 Schema 定义——消灭 Schema 双源漂移。原 TechTermSchema v3.0 的 TS 接口由生成物取代。

### 5. 节点路径分片

`data/nodes/<id 前两字符>/<id>.json`，从第一天分散目录，百万级文件量下路径永不再迁移。GitHub 网页编辑器可正常创建嵌套路径文件，不损害低门槛贡献。

### 6. 分支模型

main 分支保护，PR-only。PR → validate.yml（增量）；合并 → deploy.yml（构建 + 部署）；deploy.yml 附定期全图校验（ADR-0013）。

## 后果

正面：贡献单一入口；CI 门禁覆盖全部平面；仓库无派生噪声，diff 永远是手写内容；无路径迁移悬崖。
负面：单仓体积随数据增长（压力阀：bulk 生成脚本，作者格式不变）；Actions 缓存为增量构建所必需，CI 复杂度上升。

## 关联

0001（三平面）、0004（词表注册表）、0006（renames）、0010（ontology 位置）、0011（百万级）、0013（校验与增量）、0016（生态注册表）
