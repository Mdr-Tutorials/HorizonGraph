# HorizonGraph 子领域深挖计划(四维度全量,约 180 词条 / 20 个子领域包)

## Schema 准备(先行,一次到位)
- **domains.json**(0.1.0 → 0.2.0,登记制):新增 `career-development`、`quantum-computing`、`computer-history`、`industry-landscape`
- **ontology.json**(0.6.0 → 0.7.0,minor):新增 3 个分类——`career`(挂 meta-concept,职业角色)、`quantum-computing`(挂 theory)、`computer-history`(挂 theory),各自获得 /cat/ 聚合页
- 宏观生态根(闭集)不动;需要聚合页的子领域按需在现有根下登记子生态

## 分四批执行(沿用成熟流程:生成脚本 → 织关系 → pnpm validate → build:data → 提交推送)

### 批 A:技术深水区(8 包,约 77 词条)
A1 数据库与存储(~20):MVCC、查询优化器、向量化执行、并发控制、分库分表、NewSQL、列存/行存、纠删码、RAID、Ceph、RUM 假说等 → 与 MySQL/PostgreSQL/TiDB/S3/JuiceFS 织网
A2 OS 与网络(~18):io_uring、epoll、页缓存、ext4/btrfs/ZFS、CFS→EEVDF、拥塞控制(BBR)、NAT、SDN、CDN 原理、DoH → 与 44 个协议节点连线
A3 AI 工程(~15):数据/张量/流水线并行、KV Cache、LoRA/PEFT、RLHF/DPO、MoE、Scaling Law、扩散模型、多模态、评测基准(MMLU/HumanEval) → 与 vLLM/transformers/模型族强织网
A4 安全与编译与 Web3(~24):Fuzzing、IDA/Ghidra、SBOM、DevSecOps、PQC、ATT&CK;JIT、GC 族、运行时设计;zk-SNARK、Arbitrum/Optimism/zkSync、DeFi、MEV → 与 security 59 节点、llvm/ir、Solidity/EVM 连线

### 批 B:视野与历史(6 包,约 59 词条)
计算机史(~15):冯·诺依曼、仙童八叛逆、施乐 PARC、ARPANET、摩尔定律、Stallman 与开源运动、AI 寒冬、中国互联网简史;半导体产业链(~10):EDA 三巨头、ARM IP 授权模式、流片/封测、Chiplet;量子计算(~10)挂新分类;AI4Science(~8):AlphaFold 等;产业宏观(~8):开源商业模式、个保法/GDPR;前沿趋势(~8):具身智能、空间计算、边缘计算、脑机接口

### 批 C:就业维度(3 包,约 23 词条)
职业角色 12 个(前端/后端/全栈/算法/数据/嵌入式/SRE/测试/安全/DBA/架构师/产品经理),挂新 `career` 分类,以 depends_on 连技能栈;竞赛与路径(ACM-ICPC、Kaggle、CTF、GSoC);面试方法(系统设计面试、行为面试、LeetCode 平台)

### 批 D:日常使用(3 包,约 30 词条)
个人数字生活(小程序、公众号、支付清算、密码管理器、网盘同步);效率工具链(Obsidian/Notion/Raycast、zsh/tmux/Starship、Postman/Bruno);消费硬件(WiFi 6/7、PD 快充、NAS、显示参数)

## 统一约定
- 新节点一律 `origin: ai_draft`、popular 留空、last_reviewed 2026-09-05、summary ≤50 字
- 关系优先复用 15 种现有类型;概念间对比用 alternative_to;不再新增关系类型
- 每批:写入 → pnpm validate → 完整 build → 浏览器抽查 → 提交推送
- 四批完成后跑一次全图边审计(复用启发式脚本),收尾补漏

预计总量约 180 新节点 + 4 domain 值 + 3 本体分类;全部完成后图谱将达 1000+ 节点。