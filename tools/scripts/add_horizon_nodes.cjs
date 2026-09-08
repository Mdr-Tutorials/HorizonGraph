const fs = require('fs');
const path = require('path');

const nodes = [
  // 1. Technical Physics & Architecture
  {
    id: 'memory-wall',
    name: 'Memory Wall',
    display_primary: '显存墙',
    display_secondary: 'Memory Wall',
    aliases: ['内存墙'],
    type: 'concept',
    domains: ['high-performance-computing', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' },
      { relation_type: 'governs', target_id: 'speculative-decoding' }
    ],
    summary: '内存带宽与容量增速落后于处理器算力增速带来的物理吞吐瓶颈。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'interconnect-wall',
    name: 'Interconnect Wall',
    display_primary: '互联墙',
    display_secondary: 'Interconnect Wall',
    aliases: ['网络互联墙'],
    type: 'concept',
    domains: ['high-performance-computing', 'networking', 'distributed-systems'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '跨芯片与跨机柜网络通信速率滞后导致的分布式算力扩展瓶颈。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'power-wall',
    name: 'Power Wall',
    display_primary: '功耗墙',
    display_secondary: 'Power Wall',
    aliases: ['能耗墙'],
    type: 'concept',
    domains: ['high-performance-computing', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '芯片散热能力与数据中心供电极限对处理器频率与密度的物理约束。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'advanced-packaging',
    name: 'Advanced Packaging',
    display_primary: '先进封装',
    display_secondary: 'Advanced Packaging',
    aliases: ['2.5D/3D封装', '晶圆级封装'],
    type: 'concept',
    domains: ['high-performance-computing', 'industry-landscape'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' },
      { relation_type: 'governs', target_id: 'chiplet' }
    ],
    summary: '超越单芯片物理微缩极限，在微米级中介层上集成异构芯粒的工艺。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'hbm',
    name: 'HBM',
    display_primary: '高带宽显存',
    display_secondary: 'High Bandwidth Memory',
    aliases: ['HBM显存', '高带宽内存'],
    type: 'concept',
    domains: ['high-performance-computing', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '通过 3D 硅通孔垂直堆叠 DRAM、提供 TB/s 级吞吐的显存架构。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'cpo',
    name: 'CPO',
    display_primary: '光电共封',
    display_secondary: 'Co-Packaged Optics',
    aliases: ['共封装光学', '光电共封装'],
    type: 'concept',
    domains: ['high-performance-computing', 'networking', 'industry-landscape'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '将光学引擎与计算芯片封装在同一基板上以降低功耗的高速互联方案。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'liquid-cooling',
    name: 'Liquid Cooling',
    display_primary: '液冷技术',
    display_secondary: 'Liquid Cooling',
    aliases: ['液冷散热', '浸没式液冷', '冷板式液冷'],
    type: 'concept',
    domains: ['cloud-infrastructure', 'high-performance-computing'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '采用冷却液体循环直接导出高密度算力机柜高额废热的散热基础设施。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'lossless-network',
    name: 'Lossless Network',
    display_primary: '无损网络',
    display_secondary: 'Lossless Network',
    aliases: ['无损以太网'],
    type: 'concept',
    domains: ['networking', 'distributed-systems', 'high-performance-computing'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '结合 PFC 与 ECN 拥塞控制、确保大规模并行计算集群零丢包的网络体系。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'heterogeneous-computing',
    name: 'Heterogeneous Computing',
    display_primary: '异构计算',
    display_secondary: 'Heterogeneous Computing',
    aliases: ['异构并行计算'],
    type: 'concept',
    domains: ['high-performance-computing', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '统筹 CPU、GPU、NPU 等多种架构计算单元协同完成计算密集任务的范式。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },

  // 2. Metrics & Economics
  {
    id: 'mfu',
    name: 'MFU',
    display_primary: '算力利用率',
    display_secondary: 'Model FLOPs Utilization',
    aliases: ['模型算力利用率'],
    type: 'metric',
    domains: ['machine-learning', 'high-performance-computing'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'metric' }
    ],
    summary: '大模型训练或推理实际达到的算力吞吐占硬件理论峰值算力的百分比。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'ttft',
    name: 'TTFT',
    display_primary: '首字延迟',
    display_secondary: 'Time to First Token',
    aliases: ['首 Token 延迟'],
    type: 'metric',
    domains: ['machine-learning', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'metric' }
    ],
    summary: '大语言模型接收到 Prompt 后输出第一个 Token 所需的端到端耗时。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'tpot',
    name: 'TPOT',
    display_primary: '每词延迟',
    display_secondary: 'Time Per Output Token',
    aliases: ['生成延迟', '词生成耗时'],
    type: 'metric',
    domains: ['machine-learning', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'metric' }
    ],
    summary: '大语言模型在自回归解码阶段生成单个 Token 的平均耗时。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'unit-economics',
    name: 'Unit Economics',
    display_primary: '单位经济学',
    display_secondary: 'Unit Economics',
    aliases: ['单体经济模型'],
    type: 'concept',
    domains: ['industry-landscape', 'personal-finance'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '衡量商业模式在最小产出单元（如单用户、单Token）上收支利润的度量框架。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },

  // 3. Embodied & Novel Paradigms
  {
    id: 'world-model',
    name: 'World Model',
    display_primary: '世界模型',
    display_secondary: 'World Model',
    aliases: ['物理世界模型'],
    type: 'concept',
    domains: ['machine-learning'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'deep-learning' }
    ],
    summary: '在潜空间表征物理世界时空规律与动力学因果、支持未来推演的生成模型。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'sim-to-real',
    name: 'Sim-to-Real',
    display_primary: '虚实迁移',
    display_secondary: 'Simulation to Reality',
    aliases: ['仿真到真实迁移'],
    type: 'concept',
    domains: ['machine-learning', 'embedded-systems'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'deep-learning' }
    ],
    summary: '将高仿真虚拟环境中训练出的控制策略平滑泛化到物理实体机器人的技术。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'ai4s',
    name: 'AI for Science',
    display_primary: '科学智能',
    display_secondary: 'AI for Science',
    aliases: ['AI4S', '人工智能驱动科学研究'],
    type: 'concept',
    domains: ['machine-learning', 'high-performance-computing'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'deep-learning' }
    ],
    summary: '利用机器学习模型逼近自然法则、加速微观分子与宏观物理科学探索的范式。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'neural-operator',
    name: 'Neural Operator',
    display_primary: '神经算子',
    display_secondary: 'Neural Operator',
    aliases: ['傅里叶神经算子', 'FNO'],
    type: 'concept',
    domains: ['machine-learning', 'high-performance-computing'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'deep-learning' }
    ],
    summary: '能够直接在无限维函数空间学习映射、将偏微分方程求解加速百千倍的神经网络。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'pim',
    name: 'Processing In Memory',
    display_primary: '存算一体',
    display_secondary: 'PIM',
    aliases: ['近存计算', '内存计算'],
    type: 'concept',
    domains: ['high-performance-computing', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '将计算逻辑直接嵌入存储介质中，免去总线数据搬运开销的非冯计算架构。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'neuromorphic-computing',
    name: 'Neuromorphic Computing',
    display_primary: '神经拟态',
    display_secondary: 'Neuromorphic Computing',
    aliases: ['类脑计算', '脉冲神经网络计算'],
    type: 'concept',
    domains: ['high-performance-computing', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '模仿人脑神经元电脉冲通信机制构建、具备超低静态功耗与事件驱动特性的架构。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'zkp',
    name: 'Zero-Knowledge Proof',
    display_primary: '零知识证明',
    display_secondary: 'Zero-Knowledge Proof',
    aliases: ['ZKP', '零知识验证'],
    type: 'concept',
    domains: ['security', 'formal-methods'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '在不向验证者透露任何输入细节的前提下，数学上严密证明计算正确性的密码原语。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'homomorphic-encryption',
    name: 'Homomorphic Encryption',
    display_primary: '同态加密',
    display_secondary: 'Homomorphic Encryption',
    aliases: ['全同态加密', 'FHE'],
    type: 'concept',
    domains: ['security', 'formal-methods'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '对密文进行特定算术操作后解密所得结果与直接在明文上操作一致的密码技术。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'confidential-computing',
    name: 'Confidential Computing',
    display_primary: '机密计算',
    display_secondary: 'Confidential Computing',
    aliases: ['可信执行环境', 'TEE计算'],
    type: 'concept',
    domains: ['security', 'cloud-infrastructure'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '利用基于硬件的安全隔离飞地（TEE），确保数据在内存计算过程中不被窥探。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },

  // 4. Data Engineering & Systems Lineage
  {
    id: 'synthetic-data',
    name: 'Synthetic Data',
    display_primary: '合成数据',
    display_secondary: 'Synthetic Data',
    aliases: ['人造数据', 'AI生成数据'],
    type: 'concept',
    domains: ['machine-learning', 'databases'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '由算法规则或大模型反思推演生成、用于扩增预训练与强化学习的高质量人造语料。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'prm',
    name: 'Process Reward Model',
    display_primary: '过程奖励',
    display_secondary: 'Process Reward Model',
    aliases: ['PRM', '过程监督模型'],
    type: 'concept',
    domains: ['machine-learning'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'deep-learning' }
    ],
    summary: '对复杂推理思维链中的每一个中间步骤单独给出反馈打分的强化学习奖励模型。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'rejection-sampling',
    name: 'Rejection Sampling',
    display_primary: '拒绝采样',
    display_secondary: 'Rejection Sampling',
    aliases: ['拒绝采样微调'],
    type: 'concept',
    domains: ['machine-learning'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'algorithm' }
    ],
    summary: '对大模型批量采样的输出候选集依据规则或打分模型筛选留优的高效对齐后训练法。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'benchmark',
    name: 'Benchmark',
    display_primary: '基准测试',
    display_secondary: 'Benchmark',
    aliases: ['基准评测', '性能基准'],
    type: 'concept',
    domains: ['systems-programming', 'machine-learning'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '在标准化、可重复的严苛工作负载下定量评估软硬件系统或模型能力的度量实验套件。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'niah',
    name: 'Needle in a Haystack',
    display_primary: '大海捞针',
    display_secondary: 'Needle In A Haystack',
    aliases: ['NIAH测试', '大海捞针测试'],
    type: 'concept',
    domains: ['machine-learning'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'deep-learning' }
    ],
    summary: '将关键事实碎片隐匿于超长上下文中检索，测试大模型长程注意力保真度的评测范式。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'checkpointing',
    name: 'Checkpointing',
    display_primary: '检查点机制',
    display_secondary: 'Checkpointing',
    aliases: ['检查点保存', '状态快照保存'],
    type: 'concept',
    domains: ['distributed-systems', 'high-performance-computing'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'distributed-systems' }
    ],
    summary: '定期将分布式训练或计算状态全量序列化落盘，以便故障宕机后快速回滚断点续跑。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'silent-data-corruption',
    name: 'Silent Data Corruption',
    display_primary: '静默损坏',
    display_secondary: 'Silent Data Corruption',
    aliases: ['静默数据损坏', 'SDC'],
    type: 'concept',
    domains: ['systems-programming', 'distributed-systems'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '芯片晶体管翻转或存储介质退化导致的、未触发任何系统报错的隐秘数据畸变现象。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'paging',
    name: 'Paging',
    display_primary: '分页机制',
    display_secondary: 'Paging',
    aliases: ['内存分页', '虚拟内存分页'],
    type: 'concept',
    domains: ['systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '操作系统将物理内存划分为固定大小页框以消除外部碎片的经典内存离散管理机制。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'formal-verification',
    name: 'Formal Verification',
    display_primary: '形式化验证',
    display_secondary: 'Formal Verification',
    aliases: ['形式化证明'],
    type: 'concept',
    domains: ['formal-methods', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '利用数理逻辑严密证明软硬件设计完全满足形式化规格、绝无死锁与越界漏洞的工程。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'orthogonality',
    name: 'Orthogonality',
    display_primary: '正交性',
    display_secondary: 'Orthogonality',
    aliases: ['概念正交', '正交设计'],
    type: 'concept',
    domains: ['programming-languages', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '系统内部各特性相互独立解耦、变更某一特性不会在其他维度引发意外副作用的原则。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },

  // 5. Learning & Cognition
  {
    id: 'slow-variables',
    name: 'Slow Variables',
    display_primary: '慢变量',
    display_secondary: 'Slow Variables',
    aliases: ['底层慢变量', '长半衰期知识'],
    type: 'concept',
    domains: ['learning-cognition', 'career-development'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '知识体系中半衰期极长、底层通用、终身受益的核心基石（如体系结构、操作系统）。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'fast-variables',
    name: 'Fast Variables',
    display_primary: '快变量',
    display_secondary: 'Fast Variables',
    aliases: ['应用快变量', '短半衰期知识'],
    type: 'concept',
    domains: ['learning-cognition', 'career-development'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '更迭速度快、半衰期短的应用表层工具与语法糖，宜查表即用而不宜耗费过度心力死记。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'metacognition',
    name: 'Metacognition',
    display_primary: '元认知',
    display_secondary: 'Metacognition',
    aliases: ['元思考', '反思认知'],
    type: 'concept',
    domains: ['learning-cognition'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '对自身思考过程的自我意识、反思监控与动态调优能力，终身自学的核心发动机。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'feynman-technique',
    name: 'Feynman Technique',
    display_primary: '费曼法',
    display_secondary: 'Feynman Technique',
    aliases: ['费曼技巧', '费曼学习法'],
    type: 'concept',
    domains: ['learning-cognition'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '通过向非专业人士通俗转述复杂技术、用输出倒逼输入以检测并弥补自身认知漏洞的方法。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'source-tracing',
    name: 'Source Tracing',
    display_primary: '溯源习惯',
    display_secondary: 'Source Tracing',
    aliases: ['源码溯源', '一手信息源'],
    type: 'concept',
    domains: ['learning-cognition'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '跳过二次二手转述，直接阅读 RFC 规范、官方设计提案、学术论文与底层源码的求知路径。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'signal-to-noise-ratio',
    name: 'Signal-to-Noise Ratio',
    display_primary: '信噪比',
    display_secondary: 'SNR in Information',
    aliases: ['信息信噪比'],
    type: 'concept',
    domains: ['learning-cognition'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '在海量算法推荐与焦虑营销中识别核心硬核技术、滤除碎片噪音的信息环境管理能力。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'mental-model',
    name: 'Mental Model',
    display_primary: '心智模型',
    display_secondary: 'Mental Model',
    aliases: ['思维模型'],
    type: 'concept',
    domains: ['learning-cognition'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '跨学科提炼的高阶认知透镜（如第一性原理、反向思维、二阶效应），用于简化真实复杂性。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'tutorial-hell',
    name: 'Tutorial Hell',
    display_primary: '教程地狱',
    display_secondary: 'Tutorial Hell',
    aliases: ['做题家陷阱', '教学依赖综合征'],
    type: 'concept',
    domains: ['learning-cognition', 'career-development'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '长期被动观看教学视频与抄写代码，产生虚假精通感却始终无法独立构建项目的技能停滞陷阱。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },

  // 6. Working & Career
  {
    id: 'ecological-niche',
    name: 'Ecological Niche',
    display_primary: '生态位',
    display_secondary: 'Professional Niche',
    aliases: ['职业生态位'],
    type: 'concept',
    domains: ['career-development', 'industry-landscape'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '个人在行业分工、组织系统及技术栈生态中不可替代的差异化独特生存位势。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'macro-cycles',
    name: 'Macro Cycles',
    display_primary: '周期规律',
    display_secondary: 'Macro Cycles',
    aliases: ['行业周期', '康波周期', '技术炒作周期'],
    type: 'concept',
    domains: ['career-development', 'industry-landscape'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '资本流动、技术演进与人才就业的盛衰交替节律；顺应周期方能破除行业波动焦虑。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'leverage',
    name: 'Leverage',
    display_primary: '个人杠杆',
    display_secondary: 'Career Leverage',
    aliases: ['认知杠杆', '代码杠杆'],
    type: 'concept',
    domains: ['career-development', 'personal-finance'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '借助软件无边际成本复制、资本协作与传播媒介，将单位工时产出放大百千倍的不对称支点。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'managing-up',
    name: 'Managing Up',
    display_primary: '向上管理',
    display_secondary: 'Managing Up',
    aliases: ['向上协同', '预期管理'],
    type: 'concept',
    domains: ['career-development'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '主动对齐上级商业目标、管理交付预期、争取组织资源并将技术重构转化为商业价值的能力。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'game-theory',
    name: 'Game Theory',
    display_primary: '博弈论',
    display_secondary: 'Game Theory',
    aliases: ['策略博弈'],
    type: 'concept',
    domains: ['career-development', 'distributed-systems'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '多方理性决策主体在规则与激励约束下追求自身效益最大化时的策略互动与制衡科学。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'trade-off',
    name: 'Trade-Off',
    display_primary: '权衡妥协',
    display_secondary: 'Trade-Off',
    aliases: ['工程妥协', '取舍之道'],
    type: 'concept',
    domains: ['systems-programming', 'career-development'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '工程现实中没有完美解，在吞吐、延迟、成本、复杂度之间理性放弃次要诉求的决策精髓。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'moat',
    name: 'Moat',
    display_primary: '护城河',
    display_secondary: 'Economic Moat',
    aliases: ['经济护城河', '竞争壁垒'],
    type: 'concept',
    domains: ['career-development', 'industry-landscape'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '长期防御外部竞争对手侵蚀、阻断低水平内卷替代的结构性竞争优势与壁垒组合。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'non-compete',
    name: 'Non-Compete Agreement',
    display_primary: '竞业限制',
    display_secondary: 'Non-Compete',
    aliases: ['竞业禁止', '竞业协议'],
    type: 'concept',
    domains: ['career-development'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '用人单位限制离职员工加入竞对的法律约定；从业者需明晰补偿金生效要件与合法边界。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'stock-option',
    name: 'Stock Option',
    display_primary: '期权激励',
    display_secondary: 'Stock Option',
    aliases: ['员工期权', '股权激励'],
    type: 'concept',
    domains: ['career-development', 'personal-finance'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '在约定周期内以固定行权价购买公司股票的权利；含归属期与回购机制等核心权益规则。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },

  // 7. Living & Health
  {
    id: 'ergonomics',
    name: 'Ergonomics',
    display_primary: '人体工学',
    display_secondary: 'Ergonomics',
    aliases: ['工效学', '人机工程学'],
    type: 'concept',
    domains: ['health-ergonomics', 'human-computer-interaction'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '优化工作装备与坐姿视线，最大限度降低高强度久坐脑力工作者肌肉骨骼慢性损伤的学科。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'compensation',
    name: 'Physical Compensation',
    display_primary: '肌肉代偿',
    display_secondary: 'Compensation Pattern',
    aliases: ['病理代偿', '骨骼代偿'],
    type: 'concept',
    domains: ['health-ergonomics'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '某处核心肌群因长期静止退化时，邻近关节与韧带过度负荷补位引发的恶性劳损链条。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'circadian-rhythm',
    name: 'Circadian Rhythm',
    display_primary: '昼夜节律',
    display_secondary: 'Circadian Rhythm',
    aliases: ['生物钟', '睡眠节律'],
    type: 'concept',
    domains: ['health-ergonomics'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '受光照与褪黑素严格调控的人体生理时钟；抵御屏幕夜间蓝光造成的内分泌紊乱与失眠。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'xerophthalmia',
    name: 'Dry Eye Syndrome',
    display_primary: '干眼症',
    display_secondary: 'Xerophthalmia',
    aliases: ['干眼病', '视疲劳综合征'],
    type: 'concept',
    domains: ['health-ergonomics'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '长期紧盯荧光屏导致眨眼频次骤降、泪膜蒸发过快引发的慢性进行性眼表病变。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'resistance-training',
    name: 'Resistance Training',
    display_primary: '抗阻训练',
    display_secondary: 'Resistance Training',
    aliases: ['力量训练', '负重抗阻'],
    type: 'concept',
    domains: ['health-ergonomics'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '通过负重力量运动强化后背竖脊肌、臀桥与核心力量，是对抗久坐脊椎崩溃最硬核的处方。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'flow-state',
    name: 'Flow State',
    display_primary: '心流状态',
    display_secondary: 'Flow State',
    aliases: ['心流', '极致专注'],
    type: 'concept',
    domains: ['health-ergonomics', 'learning-cognition'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '当技术挑战与个人能力达到精密平衡时，浑然忘却时间流逝的高效创造力精神体验。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'burnout',
    name: 'Burnout',
    display_primary: '职业倦怠',
    display_secondary: 'Job Burnout',
    aliases: ['身心枯竭', '精神耗竭'],
    type: 'concept',
    domains: ['health-ergonomics', 'career-development'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '长期在高压与缺乏正向反馈环境下工作导致的情感麻木、生理衰竭与效能感彻底丧失。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'impostor-syndrome',
    name: 'Impostor Syndrome',
    display_primary: '冒名综合征',
    display_secondary: 'Impostor Syndrome',
    aliases: ['冒充者综合征', '骗子综合征'],
    type: 'concept',
    domains: ['health-ergonomics', 'learning-cognition'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '即便取得显著成就，内心仍固执认为自己只是侥幸的欺世盗名者、随时会被拆穿的心理偏差。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'boundaries',
    name: 'Psychological Boundaries',
    display_primary: '心理边界感',
    display_secondary: 'Personal Boundaries',
    aliases: ['边界感', '工作生活界限'],
    type: 'concept',
    domains: ['health-ergonomics', 'career-development'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '果断划定工作与个人生活的物理与数字边界，断然阻断无序通讯蚕食私人休整的自我防护机制。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },

  // 8. Wealth & Era Philosophy
  {
    id: 'cash-flow',
    name: 'Cash Flow',
    display_primary: '现金流',
    display_secondary: 'Cash Flow',
    aliases: ['净现金流'],
    type: 'concept',
    domains: ['personal-finance'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '周期内自由流入与流出的资金净额；是从业者抵御周期风险与转型探索的生命线。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest',
    display_primary: '复利法则',
    display_secondary: 'Compound Interest',
    aliases: ['复利效应', '指数增长'],
    type: 'concept',
    domains: ['personal-finance', 'learning-cognition'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '将收益与新增知识持续并入本金、在时间长河中产生非线性指数级增长的数学铁律。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'hedging',
    name: 'Hedging',
    display_primary: '风险对冲',
    display_secondary: 'Risk Hedging',
    aliases: ['对冲策略'],
    type: 'concept',
    domains: ['personal-finance', 'quantitative-finance'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '配置负相关资产或发展第二技能曲线，化解单点行业衰退或意外裁员的灭顶风险。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'liquidity',
    name: 'Liquidity',
    display_primary: '资产流动性',
    display_secondary: 'Asset Liquidity',
    aliases: ['流动性'],
    type: 'concept',
    domains: ['personal-finance'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '资产在不承担显著折价损失的前提下，迅速转换变现为可用现金的敏捷程度。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'safety-buffer',
    name: 'Safety Buffer',
    display_primary: '安全备用金',
    display_secondary: 'Emergency Fund',
    aliases: ['应急备用金', '安全气囊'],
    type: 'concept',
    domains: ['personal-finance'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '强制隔离开设、能够无条件覆盖全家 6 至 12 个月日常刚性开支的保本防波堤资金。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'passive-income',
    name: 'Passive Income',
    display_primary: '被动收入',
    display_secondary: 'Passive Income',
    aliases: ['资产性收入', '睡后收入'],
    type: 'concept',
    domains: ['personal-finance'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '脱离实时体力与时间捆绑，由独立软件许可、知识版权与生息资产自动产生的持续收益。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'indie-hacking',
    name: 'Indie Hacking',
    display_primary: '独立开发',
    display_secondary: 'Indie Hacking',
    aliases: ['独立开发者', '单人微型创业'],
    type: 'concept',
    domains: ['personal-finance', 'career-development'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '不依赖大厂雇佣，由单人端到端完成痛点洞察、轻量开发、海外收单与运营闭环的生存方式。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'antifragility',
    name: 'Antifragility',
    display_primary: '反脆弱',
    display_secondary: 'Antifragility',
    aliases: ['反脆弱性'],
    type: 'concept',
    domains: ['learning-cognition', 'career-development'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '不仅不畏惧外界混乱、压力与突发震荡，反而能在波动与危机中实现进化壮大的超强特质。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'curation',
    name: 'Curation',
    display_primary: '系统策展',
    display_secondary: 'Curation',
    aliases: ['知识策展', '品味鉴赏'],
    type: 'concept',
    domains: ['learning-cognition', 'career-development'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '在生成式 AI 大规模泛滥代码与垃圾信息的时代，负责去粗取精、架构统筹的高级鉴别力。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'intent',
    name: 'Intent',
    display_primary: '主观意图',
    display_secondary: 'Human Intent',
    aliases: ['人类意图', '目标设定'],
    type: 'concept',
    domains: ['learning-cognition', 'human-computer-interaction'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '当语法与繁琐实现被机器完全接管后，人类独存且不可替代的定义真问题与价值取向的源头。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'attention',
    name: 'Attention Capital',
    display_primary: '专注力资本',
    display_secondary: 'Attention Capital',
    aliases: ['深度专注力', '注意力资产'],
    type: 'concept',
    domains: ['learning-cognition', 'health-ergonomics'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '抵御快餐多巴胺碎片劫持、能够沉浸数小时从事长程高难度深度工作（Deep Work）的稀缺财富。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'accountability',
    name: 'Accountability',
    display_primary: '终极责任',
    display_secondary: 'Accountability',
    aliases: ['责任承担', '终极担保'],
    type: 'concept',
    domains: ['career-development', 'security'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '算法不坐牢、模型不担责；面对生产灾难与法律合规底线时，人类作为唯一兜底者的终极属性。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'barbell-strategy',
    name: 'Barbell Strategy',
    display_primary: '杠铃策略',
    display_secondary: 'Barbell Strategy',
    aliases: ['杠铃式配置'],
    type: 'concept',
    domains: ['personal-finance', 'career-development'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '一端锁死极度保守的基础底线（健康、慢变量、储蓄），另一端极度开放下注高潜力前沿。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'symbiosis',
    name: 'Human-AI Symbiosis',
    display_primary: '人机共生',
    display_secondary: 'Symbiosis',
    aliases: ['人机协同进化', '共生智能'],
    type: 'concept',
    domains: ['learning-cognition', 'human-computer-interaction'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '将机器智能视为人类外挂式大脑与执行延伸，在共生中完成从业者角色重塑与跃迁的新形态。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  }
];

const nodesDir = path.resolve(__dirname, '..', '..', 'data', 'nodes');
let created = 0;

for (const n of nodes) {
  const prefix = n.id.slice(0, 2);
  const dir = path.join(nodesDir, prefix);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, n.id + '.json');
  fs.writeFileSync(file, JSON.stringify(n, null, 2) + '\n', 'utf8');
  created++;
}

console.log(`Successfully written ${created} nodes.`);
