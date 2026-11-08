# 2026-11-08 四大整领域（计算机基础、AI扩展、安全合规、工业落地）内容补全

本批全面落实 HorizonGraph 知识图谱在计算机科学基础底座、现代AI产业化体系、安全隐私合规以及垂直工业落地领域的四大整领域系统性扩展。新增 74 个核心规范数据节点，实质扩写 1 个既有节点（`spatial-computing`），更新 40 多个既有交叉节点的领域标签、生态归属与非分类关系，全库数据节点从 3962 增至 4036。新增 12 个受控领域、9 个生态系统以及 13 个本体类型。

全部新节点均遵循中文唯一正本原则，`summary` 严格限制在 50 个汉字以内，正文均包含标准结构（`## 机制` 与核心原理）及 `## 参考` 权威一手文献（学术经典论文、RFC 协议、ISO/SAE 标准规范与官方文档）。本批内容标注 `origin: "ai_draft"`，`last_reviewed: "2026-11-08"`。

---

## 一、契约与本体演进

1. **本体升级（`contracts/ontology.json`）**：
   - 版本从 `0.21.0` 升级为 `0.22.0`，本体类型从 124 增至 137。
   - 新增 13 个本体类：
     - 理论与概念类（继承自 `theory`）：`recommender-system-concept`、`reinforcement-learning-concept`、`mlops-concept`、`ai-safety-concept`、`privacy-compliance-concept`、`audio-speech-concept`、`autonomous-driving-concept`、`spatial-computing-concept`、`cryptography-concept`。
     - 规范与标准类（继承自 `specification`）：`automotive-specification`、`xr-specification`。
     - 评估指标类（继承自 `metric`）：`recommender-metric`、`ai-safety-metric`。

2. **受控领域扩充（`contracts/vocab/domains.json`）**：
   - 版本从 `0.11.0` 升级为 `0.12.0`，受控领域从 84 增至 96。
   - 新增 12 个领域：
     - `data-structures-and-algorithms`（数据结构与算法）
     - `operating-systems`（操作系统）
     - `computer-architecture`（计算机体系结构）
     - `cryptography`（密码学）
     - `recommender-systems`（推荐系统）
     - `reinforcement-learning`（强化学习）
     - `mlops`（机器学习运维与模型服务）
     - `ai-safety`（人工智能安全与对齐）
     - `privacy-and-compliance`（数据隐私与合规）
     - `audio-and-speech-processing`（音频与语音处理）
     - `autonomous-driving`（自动驾驶与网联车）
     - `spatial-computing`（空间计算与XR）

3. **生态系统拓展（`contracts/vocab/ecosystems.json`）**：
   - 版本从 `0.9.0` 升级为 `0.10.0`，生态系统从 108 增至 117。
   - 新增 9 个生态系统，并合规挂靠至十大宏观生态根：
     - `computer-science-foundations-ecosystem`（挂靠 `foundational_theory`）
     - `os-kernel-ecosystem`（挂靠 `os_platforms`）
     - `computer-architecture-ecosystem`（挂靠 `hardware_iot`）
     - `recommender-systems-ecosystem`（挂靠 `ai_data_science`）
     - `rl-ecosystem`（挂靠 `ai_data_science`）
     - `mlops-ecosystem`（挂靠 `ai_data_science`）
     - `ai-safety-ecosystem`（挂靠 `ai_data_science`）
     - `privacy-compliance-ecosystem`（挂靠 `networking_security`）
     - `audio-speech-ecosystem`（挂靠 `ai_data_science`）
     - `autonomous-vehicles-ecosystem`（挂靠 `hardware_iot`）
     - `spatial-computing-ecosystem`（挂靠 `graphics_gaming`）

---

## 二、完整节点清单与领域拓扑

### 领域 1：计算机底层科学底座（CS Foundations，21 新节点）

#### 数据结构与算法（`data-structures-and-algorithms`）
- [排序算法](../data/nodes/so/sorting-algorithm.json) (`sorting-algorithm`)：将无序元素序列按照特定全序关系重排的基础算法族。
- [图算法](../data/nodes/gr/graph-algorithm.json) (`graph-algorithm`)：在图论拓扑结构上遍历、搜索最短路径及拓扑排序的算法体系。
- [贪心算法](../data/nodes/gr/greedy-algorithm.json) (`greedy-algorithm`)：每步选择局部最优以期望达成全局最优解的算法范式。
- [计算复杂度](../data/nodes/co/computational-complexity.json) (`computational-complexity`)：使用大O符号衡量算法在时间与空间渐近资源消耗的理论框架。
- [NP完全性](../data/nodes/np/np-completeness.json) (`np-completeness`)：非确定性多项式时间内可验证且所有NP问题可多项式规约的核心难解问题类。

#### 操作系统（`operating-systems`）
- [操作系统](../data/nodes/op/operating-system.json) (`operating-system`)：管理计算机硬件算力与软件资源并为上层提供统一抽象的核心系统软件。
- [文件系统](../data/nodes/fi/file-system.json) (`file-system`)：在非易失性持久化存储设备上组织、索引、检索与权限控制数据的系统模块。
- [系统调用](../data/nodes/sy/system-call.json) (`system-call`)：用户态应用程序向操作系统内核请求特权级硬件服务的受控编程接口。
- [进程调度](../data/nodes/pr/process-scheduling.json) (`process-scheduling`)：根据优先级与时间片算法将有限CPU核心算力分配给就绪任务的内核机制。
- [中断处理](../data/nodes/in/interrupt-handling.json) (`interrupt-handling`)：CPU响应硬件异步信号或异常事件并切换至预设服务例程的底层控制流程。

#### 计算机体系结构（`computer-architecture`）
- [CPU架构](../data/nodes/cp/cpu-architecture.json) (`cpu-architecture`)：定义中央处理器逻辑单元互联、微架构流水线与执行引擎的硬件系统设计。
- [CPU流水线](../data/nodes/cp/cpu-pipeline.json) (`cpu-pipeline`)：将指令拆解为取指、译码、执行、访存和写回并并行推进的微架构加速技术。
- [存储器层次结构](../data/nodes/ca/cache-hierarchy.json) (`cache-hierarchy`)：利用局部性原理通过多级SRAM缓存缩小CPU与主存延迟鸿沟的存储架构。
- [SIMD向量化](../data/nodes/si/simd-vectorization.json) (`simd-vectorization`)：单条指令同时对多个数据元素执行相同数学操作的数据级并行计算技术。

#### 现代密码学（`cryptography`）
- [密码散列函数](../data/nodes/cr/cryptographic-hash-function.json) (`cryptographic-hash-function`)：将任意长度输入映射为固定长度抗碰撞与单向不可逆摘要的密码学算法。
- [对称加密](../data/nodes/sy/symmetric-encryption.json) (`symmetric-encryption`)：通信双方使用同一预共享密钥完成数据加解密的高效密码体系。
- [非对称加密](../data/nodes/as/asymmetric-encryption.json) (`asymmetric-encryption`)：基于公钥加密私钥解密数学单向陷门函数的现代密码体制。
- [数字签名](../data/nodes/di/digital-signature.json) (`digital-signature`)：利用私钥对消息摘要签名以实现真实性认证与防抵赖的密码学机制。
- [密钥交换协议](../data/nodes/ke/key-exchange.json) (`key-exchange`)：允许通信双方在不安全公共信道上协商生成共享对称密钥的密码学协议。
- [后量子密码学](../data/nodes/po/post-quantum-cryptography.json) (`post-quantum-cryptography`)：能够抵御经典计算机与未来大规模量子计算机 Shor 算法攻击的新一代密码学算法。
- [椭圆曲线密码学](../data/nodes/el/elliptic-curve-cryptography.json) (`elliptic-curve-cryptography`)：基于代数曲线离散对数计算难解性提供更短密钥和更高安全强度的公钥密码技术。

---

### 领域 2：现代AI工业化扩展（AI Extensions，20 新节点）

#### 工业推荐系统（`recommender-systems`）
- [推荐系统](../data/nodes/re/recommender-system.json) (`recommender-system`)：在大规模候选集合中根据用户偏好实时预测并筛选个性化信息的内容分发架构。
- [协同过滤](../data/nodes/co/collaborative-filtering.json) (`collaborative-filtering`)：基于群体用户历史交互行为相似性推断目标用户潜在兴趣的经典算法。
- [矩阵分解](../data/nodes/ma/matrix-factorization.json) (`matrix-factorization`)：将高维稀疏用户-物品交互矩阵映射为低维密集隐向量点积的表征学习方法。
- [排序学习](../data/nodes/le/learning-to-rank.json) (`learning-to-rank`)：利用机器学习构建以列表整体排序指标为优化目标的排序建模范式。
- [双塔模型](../data/nodes/tw/two-tower-model.json) (`two-tower-model`)：将用户画像与候选物品分别编码进低维向量空间以支持ANN向量检索的大规模召回架构。
- [多任务排序](../data/nodes/mu/multi-task-ranking.json) (`multi-task-ranking`)：联合建模点击率、转化率、停留时长等多个业务目标的深度多任务学习架构。
- [NDCG指标](../data/nodes/nd/ndcg-metric.json) (`ndcg-metric`)：考虑元素相关度与排位顺序衰减惩罚的信息检索与推荐排序质量评价指标。

#### 强化学习（`reinforcement-learning`）
- [马尔可夫决策过程](../data/nodes/ma/markov-decision-process.json) (`markov-decision-process`)：形式化建模序贯决策问题中状态、动作、转移概率与即时奖励的数学框架。
- [Q学习](../data/nodes/q-/q-learning.json) (`q-learning`)：利用时序差分更新动作价值函数以逼近最优控制策略的无模型强化学习算法。
- [策略梯度](../data/nodes/po/policy-gradient.json) (`policy-gradient`)：通过计算期望累积回报对参数化策略分布梯度的强化学习直接优化范式。
- [Actor-Critic架构](../data/nodes/ac/actor-critic.json) (`actor-critic`)：结合策略生成网络Actor与价值评估网络Critic的经典低方差强化学习架构。
- [多臂老虎机](../data/nodes/mu/multi-armed-bandit.json) (`multi-armed-bandit`)：在未知奖励分布的多个选项间权衡试错探索与收益利用的序贯决策模型。
- [奖励模型](../data/nodes/re/reward-model.json) (`reward-model`)：学习人类标注对比偏好并将模型输出映射为标量奖励引导策略优化的评价模型。

#### MLOps 与模型服务（`mlops`）
- [MLOps](../data/nodes/ml/mlops.json) (`mlops`)：将机器学习模型研发、持续部署、自动重训与监控治理标准化的工程化体系。
- [模型服务](../data/nodes/mo/model-serving.json) (`model-serving`)：将训练好的模型封装为低延迟高并发高吞吐网络推理API端点的基础设施。
- [Triton推理服务器](../data/nodes/tr/triton-inference-server.json) (`triton-inference-server`)：NVIDIA开源的高性能跨框架AI模型并发推理与动态批处理服务引擎。
- [特征工程存储](../data/nodes/fe/feature-store.json) (`feature-store`)：统一管理机器学习离线训练与在线低延迟推理特征的一致性数据平台。
- [模型注册表](../data/nodes/mo/model-registry.json) (`model-registry`)：集中存储与版本化管理模型元数据、权重产物与发布生命周期流转的中心仓库。
- [持续训练](../data/nodes/co/continuous-training.json) (`continuous-training`)：在生产环境中根据数据漂移或定时触发自动重训并验证上线新模型的自动化流水线。
- [模型监控](../data/nodes/mo/model-monitoring.json) (`model-monitoring`)：持续跟踪评估生产环境推理性能、特征分布漂移及服务质量降级的全链路可观测平台。

---

### 领域 3：AI安全、对齐、隐私与合规（AI Safety & Compliance，13 新节点）

#### 人工智能安全与对齐（`ai-safety`）
- [AI安全](../data/nodes/ai/ai-safety.json) (`ai-safety`)：预防人工智能系统偏离人类预期、产生意外有害后果或被恶意利用的综合研究领域。
- [AI对齐](../data/nodes/ai/ai-alignment.json) (`ai-alignment`)：引导大语言模型及自主智能体行为严格契合人类真实意图、道德伦理与价值观的技术。
- [机理解释性](../data/nodes/me/mechanistic-interpretability.json) (`mechanistic-interpretability`)：逆向工程分析神经网络内部权重与激活模式以揭示底层算法计算逻辑的可解释性范式。
- [红队演练](../data/nodes/re/red-teaming.json) (`red-teaming`)：模拟攻击者构造恶意诱导与越狱提示词以系统性暴露AI系统脆弱性的安全评估方法。
- [宪法AI](../data/nodes/co/constitutional-ai.json) (`constitutional-ai`)：通过预设原则法则让AI在RLAIF无人工介入下自我评判与修正对齐的无害化技术。
- [对抗鲁棒性](../data/nodes/ad/adversarial-robustness.json) (`adversarial-robustness`)：模型防御输入微小恶意扰动与越狱攻击以维持预期正确行为输出的安全能力。

#### 数据隐私与合规（`privacy-and-compliance`）
- [差分隐私](../data/nodes/di/differential-privacy.json) (`differential-privacy`)：通过在计算中注入受控噪声确保单个体记录是否在数据集中均不可被反推的数学框架。
- [隐私计算](../data/nodes/pr/privacy-preserving-computation.json) (`privacy-preserving-computation`)：在数据保持加密密文不可见的前提下实现多方联合计算与协同分析的技术体系。
- [数据保护](../data/nodes/da/data-protection.json) (`data-protection`)：通过合规管理与安全技术保障个人敏感信息不被未授权访问、滥用或泄露的制度体系。
- [合规监管](../data/nodes/re/regulatory-compliance.json) (`regulatory-compliance`)：企业与技术系统遵循国家法律法规、行业监管政策与行业准则的治理流程。
- [SOC 2认证](../data/nodes/so/soc-2.json) (`soc-2`)：针对云服务提供商安全性、可用性、处理完整性、保密性与隐私性的第三方独立审计标准。
- [ISO 27001标准](../data/nodes/is/iso-27001.json) (`iso-27001`)：国际标准化组织制定的建立、实施与持续改进信息安全管理体系的权威国际标准。
- [知识产权与AI](../data/nodes/in/intellectual-property.json) (`intellectual-property`)：规范生成式AI模型训练数据版权、衍生权及模型生成物法律保护归属的法理体系。

---

### 领域 4：关键垂直工业应用（Key Applied Industry Domains，20 新节点 + 1 实质扩写）

#### 音频与语音处理（`audio-and-speech-processing`）
- [语音识别](../data/nodes/sp/speech-recognition.json) (`speech-recognition`)：将人类连续语音声学时域信号自动转写为可读文本符号的AI技术体系。
- [语音合成](../data/nodes/te/text-to-speech.json) (`text-to-speech`)：将任意文本字符转换为自然流畅且富有表现力的人声波形的声学技术。
- [音频编解码](../data/nodes/au/audio-codec.json) (`audio-codec`)：在保真度与比特率权衡下对数字音频波形进行压缩编码与解压缩的技术。
- [空间音频](../data/nodes/sp/spatial-audio.json) (`spatial-audio`)：利用双耳滤波与声学物理建模模拟具有三维方位感与空间包围感的音频技术。
- [声学模型](../data/nodes/ac/acoustic-model.json) (`acoustic-model`)：建立语音特征向量序列与语言基本发音单元之间概率映射关系的统计模型。
- [语音活动检测](../data/nodes/vo/voice-activity-detection.json) (`voice-activity-detection`)：实时判断连续音频流中是否存在人类有效语音信号的前端信号处理技术。

#### 自动驾驶与网联车（`autonomous-driving`）
- [自动驾驶](../data/nodes/au/autonomous-driving.json) (`autonomous-driving`)：依托车载感知、高精定位与决策规划实现汽车无人自主安全通行的系统工程。
- [AUTOSAR规范](../data/nodes/au/autosar.json) (`autosar`)：全球汽车制造商与供应商共同制定的汽车电子控制单元开放系统软件架构标准。
- [高精地图](../data/nodes/hd/hd-map.json) (`hd-map`)：具备厘米级绝对精度与精细车道级拓扑语义的自动驾驶先验地图。
- [高级驾驶辅助系统](../data/nodes/ad/adas.json) (`adas`)：利用车载感知与主动安全算法协助驾驶员操作以降低交通事故风险的控制系统。
- [多传感器融合](../data/nodes/se/sensor-fusion.json) (`sensor-fusion`)：综合处理多种异构传感器观测数据以消除单一传感器感知盲区与测量误差的技术。
- [车联万物通信](../data/nodes/v2/v2x-communication.json) (`v2x-communication`)：支持车辆与周围车辆、基础设施、行人和网络之间实时双向通信的信息交互标准。
- [点云感知](../data/nodes/po/point-cloud-perception.json) (`point-cloud-perception`)：利用深度学习对三维空间激光雷达反射点云进行目标检测与几何分割的视觉算法。

#### 空间计算与XR（`spatial-computing`）
- [空间计算（实质扩写）](../data/nodes/sp/spatial-computing.json) (`spatial-computing`)：融合三维物理现实与数字化内容无缝交互并具备环境感知能力的新一代人机交互范式。
- [虚拟现实](../data/nodes/vi/virtual-reality.json) (`virtual-reality`)：利用头戴式显示器完全隔绝外部视觉并生成纯三维数字化拟真世界的沉浸技术。
- [增强现实](../data/nodes/au/augmented-reality.json) (`augmented-reality`)：在用户观察到的真实物理环境视野上实时精确叠加数字化虚拟信息的技术。
- [混合现实](../data/nodes/mi/mixed-reality.json) (`mixed-reality`)：物理现实实体与虚拟数字图元共存且能够发生双向实时遮挡与交互的高级形态。
- [OpenXR规范](../data/nodes/op/openxr.json) (`openxr`)：Khronos组织制定的消除XR硬件平台碎片化的开放免版税跨平台API标准。
- [WebXR设备API](../data/nodes/we/webxr.json) (`webxr`)：W3C制定的允许在Web浏览器中直接访问与渲染VR和AR设备的标准API。
- [SLAM算法](../data/nodes/si/simultaneous-localization-and-mapping.json) (`simultaneous-localization-and-mapping`)：智能体在未知环境中实时估计自身位姿并构建周围环境三维地图的算法技术。
- [视频透视](../data/nodes/pa/passthrough-video.json) (`passthrough-video`)：利用外置摄像头采集物理世界画面并经过视差矫正重投影至近眼屏的透视技术。

---

## 三、既有节点跨领域关联更新

本批更新了 40+ 个已有代表性节点，补充了新领域/生态标签，并建立坚实的非分类拓扑边：
- `quicksort` $\rightarrow$ `specializes` $\rightarrow$ `sorting-algorithm`
- `dijkstra`, `a-star` $\rightarrow$ `specializes` $\rightarrow$ `graph-algorithm`
- `dynamic-programming` $\rightarrow$ `alternative_to` $\rightarrow$ `greedy-algorithm`
- `virtual-memory` $\rightarrow$ `part_of` $\rightarrow$ `operating-system`
- `linux-kernel` $\rightarrow$ `implements` $\rightarrow$ `operating-system`
- `cache-coherence` $\rightarrow$ `part_of` $\rightarrow$ `cache-hierarchy`
- `branch-prediction` $\rightarrow$ `part_of` $\rightarrow$ `cpu-pipeline`
- `aes`, `rsa`, `ecc`, `sha-2` $\rightarrow$ `implements` $\rightarrow$ 密码学相应抽象算法概念
- `post-quantum-cryptography` $\rightarrow$ `alternative_to` $\rightarrow$ `rsa`
- `reinforcement-learning` $\rightarrow$ `uses` $\rightarrow$ `markov-decision-process`
- `ppo` $\rightarrow$ `uses` $\rightarrow$ `actor-critic`
- `rlhf` $\rightarrow$ `uses` $\rightarrow$ `reward-model`
- `vllm` $\rightarrow$ `implements` $\rightarrow$ `model-serving`
- `mlflow` $\rightarrow$ `implements` $\rightarrow$ `model-registry`
- `prompt-injection` $\rightarrow$ `part_of` $\rightarrow$ `ai-safety`
- `gdpr`, `pipl` $\rightarrow$ `specializes` $\rightarrow$ `data-protection`
- `whispercpp` $\rightarrow$ `implements` $\rightarrow$ `speech-recognition`
- `opus` $\rightarrow$ `implements` $\rightarrow$ `audio-codec`
- `baidu-apollo` $\rightarrow$ `implements` $\rightarrow$ `autonomous-driving`
- `vision-pro` $\rightarrow$ `implements` $\rightarrow$ `spatial-computing`
- `meta-quest` $\rightarrow$ `implements` $\rightarrow$ `virtual-reality`

---

## 四、验证结果

1. **契约校验**：
   ```bash
   pnpm validate
   ```
   输出：`节点 4036 · 本体 137 · 生态 117 · 关系 28 · 校验通过`
2. **代码生成与全量构建**：
   ```bash
   pnpm gen && pnpm build:data
   ```
   输出：`构建完成：节点 4036 · 本体 137 · 边 11044 · 生态页 117 · 文件 4535 · 158253.2 KB`
3. **单元测试与 Rust/WASM 查询引擎验证**：
   ```bash
   pnpm test:unit
   cargo test --locked --manifest-path crates/graph-core/Cargo.toml
   ```
   输出：Node.js 端侧 23 项测试全部通过；Rust 原生端 7 项核心 CSR/WASM 测试全部通过。
4. **全站发布构建与离线包生成**：
   ```bash
   pnpm build
   ```
   输出：静态站点与离线发布包生成完毕（518 资源，24989144 字节）。
