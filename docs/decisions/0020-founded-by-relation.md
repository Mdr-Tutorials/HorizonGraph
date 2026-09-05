# 0020 — founded_by 创始关系

状态：已接受 · 2026-09-05

## 背景

人物层铺开中国科技公司创始人后，"老板与公司"的联系没有合法的关系类型可表达：

- `developed_by` 的语义是**作品的亲手研发归属**（GLM-4 → 智谱 AI、Linux → Linus），domain 排除 organization，且把创始人的商业身份等同于研发者会污染数据质量——梁文锋没有亲手研发 DeepSeek 模型，杨植麟不写 Kimi 的代码；
- 其余关系（part_of、powers 等）均不覆盖"组织由某人创立"的叙事。

## 决策

新增方向性关系 `founded_by`（显示：创始人 / founded by）：

- **domain**：organization；**range**：person。
- **canonical_owner**：公司方——组织持有边指向创始人个人（腾讯 founded_by 马化腾）。
- **与 developed_by 的分界**：developed_by 表作品的亲手研发归属，founded_by 表组织的创立归属；创始人不因其身份自动成为产品研发者。个人亲手创造的仍走 developed_by（Python → Guido）。
- 非对称，无侧向规则；禁止自环。

## 后果

- relations.json 版本 1.3.0 → 1.4.0，关系总数 14 → 15。
- 首批 16 条边随中国创始人批次落地（腾讯、阿里、蚂蚁、字节、百度、华为、小米、京东、拼多多、美团、网易、金山、月之暗面、DeepSeek、大疆、中芯国际）。
- "创始人兼首任核心开发者"的重叠场景（如 Linus 之于 Linux）允许两条关系并存：组织 founded_by 人物 + 作品 developed_by 人物。
