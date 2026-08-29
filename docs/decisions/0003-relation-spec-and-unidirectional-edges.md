# ADR-0003：关系规格表与单向边存储

- 状态：已接受
- 日期：2026-08-29

## 背景

v3.0 的 13 种 RelationType 语义只存在于注释：无方向归属约定（对称的 competes_with 会产生镜像双存）；part_of / embeds / bases_for / depends_on 重叠度过高；无类型约束导致死边风险。

## 决策

1. 新增契约文件 `relations.json`，每条关系声明五项规格：
   - 规范方向（该边存在哪一侧，canonical_owner）
   - 对称性（如 competes_with 为 symmetric，存于 id 字典序较小一侧）
   - 逆边名（inverse_display，派生反向索引的展示用）
   - domain / range（允许的源/目标 EntityType 组合，如 developed_by 的 range 限定为 organization / person）
   - 判定文本（与语义近邻的选择标准，贡献文档的唯一来源）
2. 数据平面只存规范方向的边；反向视图（谁依赖我、某组织开发了什么）由 build 派生成反向索引文件，永不手录、永不双存
3. 对称关系只允许单向存储；CI 校验不存在镜像边与重复边
4. CI 校验 domain/range 与目标存在性，非法引用直接失败——死边检测成为规格表的副产品
5. 自环全部禁止：自举（如 GCC 用 GCC 编译）属叙事，写入 description；试点批次后复核
6. 13 条关系全部入表，不预先删减；试点批次后（0009）依据实际录入分歧做一次合并评审并修订本 ADR，重点评审 depends_on 与 bases_for 的边界

## 后果

正面：反向查询由派生一次性解决；一致性由 CI 保证而非录入者自觉。
负面：合并评审完成前枚举存在冗余；录入者必须查规格表选边，学习成本高于自由录入。

## 关联

0001、0002（domain/range 引用类型注册表）、0009（试点后评审）
