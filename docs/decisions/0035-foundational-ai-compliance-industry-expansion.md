# ADR-0035：计算机基础、AI垂直扩展、安全合规与关键工业领域补全

- 状态：已接受
- 日期：2026-11-08

## 背景

在完成软件度量、代码分析与仓库分析（ADR-0034）后，图谱数据节点规模已达 3962 个。通过全库领域覆盖度与骨干拓扑审计发现，虽然图谱在编译器、编程语言、Web服务、金融工程、云原生与基础数学等局部具备纵深，但存在四大系统性整领域缺失：

1. **计算机底层科学底座（CS Foundations）**：算法与数据结构、操作系统内核机制、计算机体系结构与指令集、现代密码学体系。大量核心算法（如 `quicksort`、`dijkstra`、`aes`、`rsa`）零散漂浮，缺乏承托的上层抽象概念节点与生态骨架。
2. **AI垂直扩展（AI Extensions）**：工业级推荐系统（召回、粗排、精排、重排架构与评估指标）、强化学习（MDP、Policy Gradient、Actor-Critic、PPO及大模型RLHF回路）、MLOps（模型推理服务、特征工程存储、模型注册表与全生命周期监控）。
3. **AI安全、对齐、隐私与合规（AI Safety & Compliance）**：大模型对齐机制、机理解释性、红队演练、对抗鲁棒性、差分隐私、隐私计算、GDPR/PIPL等合规法律法规以及 SOC 2/ISO 27001 等行业安全认证标准。
4. **关键垂直工业落地领域（Key Applied Industry Domains）**：语音与音频处理（ASR、TTS、音频编解码、空间音频、VAD）、自动驾驶（传感器融合、高精地图、ADAS、AUTOSAR、V2X通信、点云感知）、空间计算与XR（VR、AR、MR、OpenXR、WebXR、SLAM、视频透视VST）。

为填补这四大维度的空白，建立完整的工业与学术知识链条，本批通过统一契约演进、系统搜集节点、精细设计拓扑关系与文献引用，完成整领域扩展。

## 决策

1. **本体升级**：本体分类从 124 扩展至 137，版本升至 `0.22.0`。新增 13 个本体类型：
   - 理论与概念类（继承 `theory`）：`recommender-system-concept`、`reinforcement-learning-concept`、`mlops-concept`、`ai-safety-concept`、`privacy-compliance-concept`、`audio-speech-concept`、`autonomous-driving-concept`、`spatial-computing-concept`、`cryptography-concept`。
   - 规格与标准类（继承 `specification`）：`automotive-specification`、`xr-specification`。
   - 指标类（继承 `metric`）：`recommender-metric`、`ai-safety-metric`。
2. **受控领域扩充**：领域从 84 扩展至 96，版本升至 `0.12.0`。新增 12 个领域标识：
   - 计算机底层：`data-structures-and-algorithms`、`operating-systems`、`computer-architecture`、`cryptography`。
   - AI扩展：`recommender-systems`、`reinforcement-learning`、`mlops`。
   - 安全合规：`ai-safety`、`privacy-and-compliance`。
   - 垂直应用：`audio-and-speech-processing`、`autonomous-driving`、`spatial-computing`。
3. **生态骨干拓展**：生态从 108 扩展至 117，版本升至 `0.10.0`。新增 9 个生态标识，所有新生态均具备合规的 parent 路径并严谨挂靠至十大宏观生态根：
   - `computer-science-foundations-ecosystem`（挂载于 `foundational_theory`）
   - `os-kernel-ecosystem`（挂载于 `os_platforms`）
   - `computer-architecture-ecosystem`（挂载于 `hardware_iot`）
   - `recommender-systems-ecosystem`、`rl-ecosystem`、`mlops-ecosystem`、`ai-safety-ecosystem`（挂载于 `ai_data_science`）
   - `privacy-compliance-ecosystem`（挂载于 `networking_security`）
   - `audio-speech-ecosystem`（挂载于 `ai_data_science`）
   - `autonomous-vehicles-ecosystem`（挂载于 `hardware_iot`）
   - `spatial-computing-ecosystem`（挂载于 `graphics_gaming`）
4. **数据节点建设**：全库数据节点从 3962 扩展至 4036。新增 74 个核心数据节点，实质扩写 1 个既有节点（`spatial-computing`），并对 40 多个既有交叉节点更新领域标签、生态归属与非分类关系边（如 `quicksort`、`linux-kernel`、`virtual-memory`、`risc-v`、`x86-64`、`ppo`、`rlhf`、`vllm`、`prompt-injection`、`gdpr`、`pipl`、`can`、`vision-pro` 等）。
5. **严密的关系约束与拓扑规范**：
   - 严格遵循 `contracts/relations.json` 规则：`concept` 节点不能作为 `implements` 的主语（domain），法律合规（`gdpr`、`pipl`）或算法特化使用 `specializes` 或 `uses`。
   - `uses` 关系强制附带学术与工程限定的 `context` 字段，且 target 必须为数据平面实体节点，禁止将本体层元概念或 organization 实体作为使用目标。
   - 对称性替代与竞争关系（`alternative_to`、`competes_with`）严格保证只存储在字典序较小的源节点一侧（如 `dynamic-programming` $\rightarrow$ `greedy-algorithm`、`openxr` $\rightarrow$ `webxr`、`post-quantum-cryptography` $\rightarrow$ `rsa`）。
   - 规范和工具类实体（`specification` 与 `tool`）强制补齐合规的 `abstraction_level` 属性。
6. **中文第一正本与权威一手引注**：
   - 每一个新节点严格遵守 `summary` 不超过 50 个汉字的规则。
   - 每一个新节点均包含结构化 Markdown 说明（`## 机制`、深入工作原理与工业难点、以及 `## 参考` 一手文献、RFC 或国际权威标准规范）。

## 结果

HorizonGraph 完成了向计算机科学底层底座、现代AI产业化栈（推荐/强化/运维/安全合规）与物理空间工业融合体系（车载/XR/语音）的重大跨越。

所有数据与契约均通过：
- 全量契约校验（`pnpm validate`：4036 节点、137 本体、117 生态、28 关系，0 错误）
- 代码生成（`pnpm gen`）与全量数据派生编译（`pnpm build:data`：生成 11044 条有向边，4535 个静态资源）
- 核心引擎单元测试（`pnpm test:unit`：23 项测试全部通过）
- Rust/WASM 图查询底层验证（`cargo test`：7 项测试全部通过，发布包编译通过）
- 静态站点构建与离线发布校验（`pnpm build`）
