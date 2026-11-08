# 2026-11-08 计算机科学核心算法与理论知识版图扩展

本批全面落实 HorizonGraph 知识图谱在计算机科学经典算法与理论基石上的系统性建设。新增 52 个高质量规范数据节点，更新 30 个既有核心经典算法与数据结构的领域标签与拓扑关系，全库数据节点从 4036 增至 4088，有向边规模达 11,188 条。

新增 1 个受控领域（`theoretical-computer-science`）、1 个生态系统（`algorithms-and-theory-ecosystem`）以及 1 个本体分类（`theoretical-computer-science-concept`）。全部新节点遵循中文唯一正本原则，`summary` 严格 $\le 50$ 汉字，正文配齐标准结构推导与权威原著（CLRS、Sipser、Knuth TAOCP、Tarjan、Turing 1936、Cook 1971、Lamport 1978 等）。本批内容标注 `origin: "ai_draft"`，`last_reviewed: "2026-11-08"`。

---

## 一、契约与本体演进

1. **本体升级（`contracts/ontology.json`）**：
   - 版本从 `0.22.0` 升级为 `0.23.0`，本体类型增至 138。
   - 新增 `theoretical-computer-science-concept`（理论计算机科学概念），挂载于 `theory` 下，为可计算性、形式语言、自动机与计算复杂性理论提供精确的分类归属。
2. **受控领域扩充（`contracts/vocab/domains.json`）**：
   - 版本从 `0.12.0` 升级为 `0.13.0`，受控领域增至 97。
   - 新增 `theoretical-computer-science`（理论计算机科学），与已有的 `data-structures-and-algorithms`、`mathematics`、`distributed-systems` 形成正交覆盖。
3. **生态系统拓展（`contracts/vocab/ecosystems.json`）**：
   - 版本从 `0.10.0` 升级为 `0.11.0`，生态系统增至 118。
   - 新增 `algorithms-and-theory-ecosystem`（算法与计算理论生态），合规挂靠至十大宏观生态根中的 `devops_tooling` 与 `ai_data_science`。

---

## 二、新增 52 个核心数据节点清单

### 集群 1：计算理论与形式语言（10 节点）
- [停机问题](../data/nodes/ha/halting-problem.json) (`halting-problem`)：图灵证明的不存在通用算法判定任意程序在给定输入下是否会终止的经典命题。
- [丘奇-图灵论题](../data/nodes/ch/church-turing-thesis.json) (`church-turing-thesis`)：关于直观可计算函数与图灵机可计算函数在数学计算能力上严格等价的根本假说。
- [乔姆斯基谱系](../data/nodes/ch/chomsky-hierarchy.json) (`chomsky-hierarchy`)：将形式文法划分为0型至3型并与不同计算能力自动机模型严格对应的层级分类理论。
- [确定有限状态自动机](../data/nodes/de/deterministic-finite-automaton.json) (`deterministic-finite-automaton`)：转移状态完全唯一确定的有限状态自动机，正规语言与词法分析的底层计算模型。
- [非确定有限状态自动机](../data/nodes/no/nondeterministic-finite-automaton.json) (`nondeterministic-finite-automaton`)：具有多重可选转移状态分支并在概念上并行探索所有可能执行路径的有限状态机。
- [下推自动机](../data/nodes/pu/pushdown-automaton.json) (`pushdown-automaton`)：配备后进先出栈式辅助存储以识别上下文无关语言并支撑语法分析的计算模型。
- [可判定性](../data/nodes/de/decidability.json) (`decidability`)：形式逻辑与计算理论中判定问题是否存在能够在有限步内给出确定真假答案的性质。
- [P vs NP问题](../data/nodes/p-/p-vs-np.json) (`p-vs-np`)：探讨多项式时间内可验证解的问题是否一定能在多项式时间内求解的千禧数学难题。
- [NP难](../data/nodes/np/np-hard.json) (`np-hard`)：至少与NP中最难问题一样困难且所有NP问题均可在多项式时间内规约至其的复杂性类。
- [多项式时间归约](../data/nodes/po/polynomial-time-reduction.json) (`polynomial-time-reduction`)：将一个计算问题实例在多项式时间内转换为另一问题实例以证明其复杂度的关键方法。

### 集群 2：算法分析与复杂度理论（4 节点）
- [主定理](../data/nodes/ma/master-theorem.json) (`master-theorem`)：直接给出分治递归方程式渐近时间复杂度紧确界解的三分情况通用数学定理。
- [平摊分析](../data/nodes/am/amortized-analysis.json) (`amortized-analysis`)：通过聚合分析、记账法或势能函数衡量数据结构一系列最坏操作序列平均开销的方法。
- [时间复杂度](../data/nodes/ti/time-complexity.json) (`time-complexity`)：使用渐近数学符号量化度量算法运行所需基本计算步数随输入规模增长的函数关系。
- [空间复杂度](../data/nodes/sp/space-complexity.json) (`space-complexity`)：量化度量算法在执行生命周期中所占用的动态临时辅助内存随输入规模增长的函数关系。

### 集群 3：高级与概率型数据结构（10 节点）
- [树堆](../data/nodes/tr/treap.json) (`treap`)：结合二叉搜索树的键值顺序与堆的随机优先级以维持统计平衡的树形结构。
- [伸展树](../data/nodes/sp/splay-tree.json) (`splay-tree`)：通过双旋转将最近被访问的节点调整移动至根节点的自平衡二叉搜索树。
- [k-d树](../data/nodes/kd/kd-tree.json) (`kd-tree`)：对高维空间点集沿各坐标维度交替递归进行超平面划分的多维空间二叉检索树。
- [斐波那契堆](../data/nodes/fi/fibonacci-heap.json) (`fibonacci-heap`)：由一组树构成的松散堆结构，支持常数平摊阶的合并与减键操作。
- [HyperLogLog](../data/nodes/hy/hyperloglog.json) (`hyperloglog`)：利用极小内存消耗与哈希前导零概率统计估计超大规模数据集基数的算法结构。
- [Count-Min Sketch](../data/nodes/co/count-min-sketch.json) (`count-min-sketch`)：利用多重独立哈希函数将高并发流式数据映射至二维矩阵的频数估计概率结构。
- [布谷鸟过滤器](../data/nodes/cu/cuckoo-filter.json) (`cuckoo-filter`)：基于布谷鸟哈希存储元素短指纹且支持高效动态删除操作的紧凑集合过滤器。
- [笛卡尔树](../data/nodes/ca/cartesian-tree.json) (`cartesian-tree`)：同时满足中序遍历下标严格递增与节点权值二叉堆偏序性质的树形数据结构。
- [四叉树](../data/nodes/qu/quadtree.json) (`quadtree`)：将二维平面空间递归正交分解为四个象限子区域以加速空间查询的树形结构。
- [八叉树](../data/nodes/oc/octree.json) (`octree`)：将三维立体空间递归正交划分为八个八分体卦限的三维空间划分层次数据结构。

### 集群 4：网络流与高阶图论算法（11 节点）
- [最大流最小割定理](../data/nodes/ma/max-flow-min-cut.json) (`max-flow-min-cut`)：网络流理论基石，断言流网络中从源点到汇点的最大流量等于最小割的容量。
- [Ford-Fulkerson算法](../data/nodes/fo/ford-fulkerson.json) (`ford-fulkerson`)：通过在残余网络中持续迭代寻找增广路径以求解网络最大流的经典方法。
- [Edmonds-Karp算法](../data/nodes/ed/edmonds-karp.json) (`edmonds-karp`)：采用广度优先搜索寻找最短边数增广路径以保证多项式时间界的最大流算法。
- [Dinic算法](../data/nodes/di/dinic-algorithm.json) (`dinic-algorithm`)：结合广度优先构建分层网络与深度优先推进多路阻塞流的高效最大流算法。
- [二分图匹配](../data/nodes/bi/bipartite-matching.json) (`bipartite-matching`)：在顶点集划分为两互斥子集的二分图上寻找边两两不共用顶点的最大边子集。
- [匈牙利算法](../data/nodes/hu/hungarian-algorithm.json) (`hungarian-algorithm`)：通过在二分图相等子图上持续搜索增广交替路径求解二分图最大匹配的多项式算法。
- [强连通分量](../data/nodes/st/strongly-connected-components.json) (`strongly-connected-components`)：有向图中任意两顶点均相互双向可达的最大极大连通子图等价类划分。
- [Kosaraju算法](../data/nodes/ko/kosaraju-algorithm.json) (`kosaraju-algorithm`)：基于两次反向深度优先搜索在线性时间内分解有向图全部强连通分量的图算法。
- [Johnson全源最短路算法](../data/nodes/jo/johnson-algorithm.json) (`johnson-algorithm`)：结合Bellman-Ford势能重赋权与Dijkstra求解稀疏图全源最短路径的高效算法。
- [割点与割边](../data/nodes/ar/articulation-point.json) (`articulation-point`)：在连通无向图中移除后会导致图不连通的割点以及对应断开连通分支的割边桥。
- [欧拉通路与欧拉回路](../data/nodes/eu/eulerian-path.json) (`eulerian-path`)：在图论中恰好无重复遍历图中每一条边的连续行走轨迹或闭合环路。

### 集群 5：经典字符串、组合几何与数值算法（11 节点）
- [AC自动机](../data/nodes/ah/aho-corasick.json) (`aho-corasick`)：将字典树与KMP失配指针结合以在线性时间内同时匹配多模式串的自动机算法。
- [Manacher算法](../data/nodes/ma/manacher-algorithm.json) (`manacher-algorithm`)：利用回文对称性与最大右边界将字符串最长回文子串搜索压至线性时间的算法。
- [Z算法](../data/nodes/z-/z-algorithm.json) (`z-algorithm`)：在线性时间内计算字符串所有后缀与主串的最长公共前缀长度的扩展匹配算法。
- [凸包算法](../data/nodes/co/convex-hull.json) (`convex-hull`)：计算二维平面点集中能够完全包络所有点的最小凸多边形顶点的计算几何问题。
- [单纯形法](../data/nodes/si/simplex-algorithm.json) (`simplex-algorithm`)：求解线性规划标准型约束多面体并在相邻极点间沿边迭代寻优的最优化经典算法。
- [Karatsuba大整数乘法](../data/nodes/ka/karatsuba-multiplication.json) (`karatsuba-multiplication`)：利用分治思想将高位低位乘法次数缩减为三次以加速大整数相乘的快速算法。
- [蓄水池抽样](../data/nodes/re/reservoir-sampling.json) (`reservoir-sampling`)：在未知总体长度的流式单向数据中以恒定空间实现随机等概率抽样的经典算法。
- [Fisher-Yates洗牌算法](../data/nodes/fi/fisher-yates-shuffle.json) (`fisher-yates-shuffle`)：在原址线性时间内生成有限序列所有可能全排列且完全无偏的离散随机洗牌算法。
- [BWT变换](../data/nodes/bu/burrows-wheeler-transform.json) (`burrows-wheeler-transform`)：通过对字符串所有循环移位排序重排字符以大幅提升后续熵编码压缩率的可逆变换。
- [LZ77算法](../data/nodes/lz/lz77.json) (`lz77`)：利用滑动窗口内历史出现重复文本的偏移量与长度元组实现无损数据压缩的算法。
- [LZW算法](../data/nodes/lz/lzw.json) (`lzw`)：通过动态构建字符串模式字典将变长字符序列映射为定长编码的高效无损压缩算法。

### 集群 6：分布式理论与一致性模型（6 节点）
- [拜占庭将军问题](../data/nodes/by/byzantine-generals-problem.json) (`byzantine-generals-problem`)：系统存在任意伪造与恶意对抗节点时达成分布式一致性的经典理论难题。
- [FLP不可能定理](../data/nodes/fl/flp-impossibility.json) (`flp-impossibility`)：纯异步分布式网络中即使只有一个节点崩溃也不存在确定性共识算法的否定性定理。
- [三阶段提交](../data/nodes/th/three-phase-commit.json) (`three-phase-commit`)：在两阶段提交中引入预提交阶段与超时机制以缓解协调者单点阻塞的原子提交协议。
- [Lamport时间戳](../data/nodes/la/lamport-timestamp.json) (`lamport-timestamp`)：基于偏序事件发生先于关系为分布式系统中全部事件分配全局单调递增逻辑序号的机制。
- [Quorum法定人数机制](../data/nodes/qu/quorum-consensus.json) (`quorum-consensus`)：基于抽屉原理要求读集合与写集合必有交集以保证去中心化数据强一致性的共识机制。
- [Gossip协议](../data/nodes/go/gossip-protocol.json) (`gossip-protocol`)：节点间随机周期性成对交换状态以指数级收敛达成去中心化最终一致性的流行病通信协议。

---

## 三、既有节点拓扑联动

本批重点对 30 个既有经典数据结构与算法补全了 `data-structures-and-algorithms` / `theoretical-computer-science` 领域标签与 `algorithms-and-theory-ecosystem` 生态归属，并建立严密跨层关系：
- `dijkstra` $\rightarrow$ `uses` $\rightarrow$ `fibonacci-heap`（在理论极限下以斐波那契堆作为优先队列可将单源最短路复杂度降至 $O(E + V \\log V)$）
- `bloom-filter` $\rightarrow$ `alternative_to` $\rightarrow$ `cuckoo-filter`（支持删除的哈希指纹过滤器替代方案）
- `aho-corasick` $\rightarrow$ `uses` $\rightarrow$ `trie` & `kmp`
- `bellman-ford`, `bfs`, `dfs`, `floyd-warshall`, `kruskal-algorithm`, `prim-algorithm`, `topological-sort` $\rightarrow$ `specializes` $\rightarrow$ `graph-algorithm`
- `merge-sort`, `heap-sort`, `insertion-sort`, `bubble-sort` $\rightarrow$ `specializes` $\rightarrow$ `sorting-algorithm`
- `red-black-tree`, `avl-tree` $\rightarrow$ `specializes` $\rightarrow$ `binary-search-tree`
- `turing-machine`, `np-completeness`, `cap-theorem`, `paxos`, `raft`, `vector-clock` 补充 `theoretical-computer-science` 领域与生态联动。

---

## 四、验证结果

1. **全量契约校验**：
   ```bash
   pnpm validate
   ```
   输出：`节点 4088 · 本体 138 · 生态 118 · 关系 28 · 校验通过`（0 错误）。
2. **双端代码生成与全量构建**：
   ```bash
   pnpm gen && pnpm build:data
   ```
   输出：`构建完成：节点 4088 · 本体 138 · 边 11188 · 生态页 118 · 文件 4727 · 166265.2 KB`
3. **单元测试与 Rust/WASM 图查询引擎验证**：
   ```bash
   pnpm test:unit
   cargo test --locked --manifest-path crates/graph-core/Cargo.toml
   ```
   输出：Node.js 侧 23 项测试全部通过；Rust 原生端 7 项核心单测全部通过。
4. **全站发布构建与离线包生成**：
   ```bash
   pnpm build
   ```
   输出：`Offline release b7f095ac8f04 · 521 resources · 25466610 bytes · base /`，包含生成的 `/eco/algorithms-and-theory-ecosystem/index.html` 生态页面。
