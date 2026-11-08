# ADR-0036：计算机科学算法与理论知识版图扩展

- 状态：已接受
- 日期：2026-11-08

## 背景

在完成 ADR-0035 对整领域骨干体系的拓展后，图谱数据节点规模达到 4036 个。通过对计算机底层科学基础进行专项覆盖度审计，发现尽管图谱拥有若干零散的基础算法（如二叉树、简单排序、BFS/DFS 等），但计算机科学经典学科体系中的**计算理论底座、高级与概率型数据结构、网络流与高阶图论算法、经典字符串与组合几何算法、以及分布式计算经典一致性理论**存在系统性成片空白。此外，上一轮引入的受控领域标签 `data-structures-and-algorithms` 仅挂载了少量节点，缺少理论纵深支撑。

为使 HorizonGraph 真正成为全栈穿透、兼具工程落地与理论基石的科技知识图谱，本批全面建设经典算法与计算理论骨架体系。

## 决策

1. **本体升级**：本体分类从 137 扩展至 138，版本升至 `0.23.0`。在 `theory` 下新增 `theoretical-computer-science-concept`（理论计算机科学概念），作为可计算性、形式语言、自动机与计算复杂性理论的分类挂载点。
2. **受控领域扩充**：领域从 96 扩展至 97，版本升至 `0.13.0`。新增 `theoretical-computer-science`（理论计算机科学），与已有的 `data-structures-and-algorithms`、`mathematics`、`distributed-systems` 形成正交覆盖。
3. **生态系统拓展**：生态从 117 扩展至 118，版本升至 `0.11.0`。新增 `algorithms-and-theory-ecosystem`（算法与计算理论生态），合规挂载至十大宏观生态根中的 `devops_tooling` 与 `ai_data_science`。
4. **数据节点规模建设**：全库数据节点从 4036 扩展至 4088。新增 52 个高质量核心规范节点，涵盖六大经典集群：
   - **计算理论与自动机**：`halting-problem`、`church-turing-thesis`、`chomsky-hierarchy`、`deterministic-finite-automaton`、`nondeterministic-finite-automaton`、`pushdown-automaton`、`decidability`、`p-vs-np`、`np-hard`、`polynomial-time-reduction`。
   - **算法分析与复杂度理论**：`master-theorem`、`amortized-analysis`、`time-complexity`、`space-complexity`。
   - **高级与概率型数据结构**：`treap`、`splay-tree`、`kd-tree`、`fibonacci-heap`、`hyperloglog`、`count-min-sketch`、`cuckoo-filter`、`cartesian-tree`、`quadtree`、`octree`。
   - **网络流与高阶图论算法**：`max-flow-min-cut`、`ford-fulkerson`、`edmonds-karp`、`dinic-algorithm`、`bipartite-matching`、`hungarian-algorithm`、`strongly-connected-components`、`kosaraju-algorithm`、`johnson-algorithm`、`articulation-point`、`eulerian-path`。
   - **经典字符串、几何与数值算法**：`aho-corasick`、`manacher-algorithm`、`z-algorithm`、`convex-hull`、`simplex-algorithm`、`karatsuba-multiplication`、`reservoir-sampling`、`fisher-yates-shuffle`、`burrows-wheeler-transform`、`lz77`、`lzw`。
   - **分布式计算与一致性理论**：`byzantine-generals-problem`、`flp-impossibility`、`three-phase-commit`、`lamport-timestamp`、`quorum-consensus`、`gossip-protocol`。
5. **既有节点深化与拓扑关联**：
   - 对 30 个此前缺失领域归属的经典算法与数据结构（如 `bellman-ford`、`bfs`、`dfs`、`floyd-warshall`、`kruskal-algorithm`、`prim-algorithm`、`topological-sort`、`merge-sort`、`heap-sort`、`red-black-tree`、`avl-tree`、`trie`、`b-tree`、`skip-list`、`lsm-tree` 等）补全 `data-structures-and-algorithms` 领域与 `algorithms-and-theory-ecosystem` 生态标签，并建立特化边（`specializes -> graph-algorithm / sorting-algorithm / binary-search-tree`）。
   - 在 `bloom-filter` 上建立与 `cuckoo-filter` 的对称替代关系（`alternative_to`）。
   - 在 `dijkstra` 上建立与 `fibonacci-heap` 的使用关系（`uses`），在 `vector-clock` 与 `lamport-timestamp` 之间建立因果演进关联。
6. **契约与引注纪律**：
   - 严格恪守 `contracts/relations.json` 规则：概念节点（`concept`）不得作为 `bases_for` 的主语；`uses` 必须携带明确限定场景的 `context`，且目标必须为具体数据节点，禁止指向本体节点。
   - 摘要严格约束在 50 个汉字以内，正文统一配备算法内部机制推导与权威原著（CLRS、Sipser、Knuth TAOCP、Tarjan、Turing 1936、Cook 1971、Lamport 1978 等）。

## 结果

图谱形成了自“图灵停机问题/自动机模型 $\rightarrow$ 复杂度与主定理推导 $\rightarrow$ 高级平衡与概率结构 $\rightarrow$ 网络流与多项式运筹 $\rightarrow$ 分布式拜占庭容错与FLP不可能定理”的严密理论与算法骨干闭环。

全量契约校验（`pnpm validate`：4088 节点、138 本体、118 生态、28 关系）、双端代码生成（`pnpm gen`）、图索引构建（`pnpm build:data`：11,188 条有向边）、23 项端侧单元测试（`pnpm test:unit`）及 7 项 Rust/WASM 图查询测试（`cargo test`）全数通过。
