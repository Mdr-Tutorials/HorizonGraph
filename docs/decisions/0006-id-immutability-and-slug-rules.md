# ADR-0006：ID 不可变与 slug 规范

- 状态：已接受
- 日期：2026-08-29

## 背景

id 同时是主键、URL 路径与静态 JSON 文件名，被搜索引擎收录后改 id 即死链。v3.0 未定义 slug 形态规范（cpp20 还是 c-plus-plus-20？glm4 还是 glm-4？）。

## 决策

1. 铁律：**id 一经发布永不改名**
2. slug 规范写入契约文档 conventions：
   - 全小写 kebab-case
   - 符号归一：C++ → cpp，C# → csharp，# 与点号剥离
   - 版本号小写连字符：glm-4、cpp-20
   - 缩写不展开：k8s、llm 保留
   - 中文不进 id
3. 更名场景不改数据：build 依据一张手写的 rename 记录派生 redirects 文件，旧 id 永久重定向
4. CI 校验新增节点 id 符合 slug 规范

## 后果

正面：URL 稳定性与 SEO 有保障；重命名成本转移到派生层。
负面：边界案例（python-3 vs python3）需判定文本覆盖，维护者保留裁决权。

## 关联

0001（派生平面承载 redirects）
