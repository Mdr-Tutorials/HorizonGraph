# 2026-10-01 八个基础领域内容补全

本批落实前次审计列出的八个方向和全部候选，并增加连通学习、工程实现与标准所需的桥接词条。新增 140 个数据节点，实质扩写或补充 99 个既有节点；数据节点从 1468 增至 1608。本次新增 400 条非分类关系。

新增与扩写词条均有正文及主题来源，正文共引用 268 个不同 URL（按完整 URL 去重，不代表独立机构数）。全图有非空 description 的数据节点从 149 增至 375；这一指标只表示字段存在，不评价内容质量。新内容全部保留 origin: ai_draft 和本次研究日期。

## 范围与清单

### 数学与统计（新增 11，既有补充 3）

新增：

- [贝叶斯定理](../data/nodes/ba/bayes-theorem.json) — bayes-theorem
- [条件概率](../data/nodes/co/conditional-probability.json) — conditional-probability
- [协方差](../data/nodes/co/covariance.json) — covariance
- [数学期望](../data/nodes/ex/expected-value.json) — expected-value
- [KL 散度](../data/nodes/kl/kl-divergence.json) — kl-divergence
- [线性代数](../data/nodes/li/linear-algebra.json) — linear-algebra
- [最大似然估计](../data/nodes/ma/maximum-likelihood-estimation.json) — maximum-likelihood-estimation
- [MIT 线性代数](../data/nodes/mi/mit-18-06.json) — mit-18-06
- [概率分布](../data/nodes/pr/probability-distribution.json) — probability-distribution
- [奇异值分解](../data/nodes/si/singular-value-decomposition.json) — singular-value-decomposition
- [统计方差](../data/nodes/st/statistical-variance.json) — statistical-variance

既有补充：[Basic Linear Algebra Subprograms](../data/nodes/bl/blas.json)、[矩阵乘法](../data/nodes/ma/matrix-multiplication.json)、[NumPy](../data/nodes/nu/numpy.json)。

### 经典机器学习、评估与视觉（新增 30，既有补充 13）

新增：

- [分类准确率](../data/nodes/cl/classification-accuracy.json) — classification-accuracy
- [分类精确率](../data/nodes/cl/classification-precision.json) — classification-precision
- [分类召回率](../data/nodes/cl/classification-recall.json) — classification-recall
- [COCO 数据集](../data/nodes/co/coco-dataset.json) — coco-dataset
- [混淆矩阵](../data/nodes/co/confusion-matrix.json) — confusion-matrix
- [交叉验证](../data/nodes/cr/cross-validation.json) — cross-validation
- [数据泄漏](../data/nodes/da/data-leakage.json) — data-leakage
- [决策树](../data/nodes/de/decision-tree.json) — decision-tree
- [Dice 分数](../data/nodes/di/dice-score.json) — dice-score
- [F1 分数](../data/nodes/f1/f1-score.json) — f1-score
- [特征缩放](../data/nodes/fe/feature-scaling.json) — feature-scaling
- [梯度提升](../data/nodes/gr/gradient-boosting.json) — gradient-boosting
- [图像分类](../data/nodes/im/image-classification.json) — image-classification
- [图像分割](../data/nodes/im/image-segmentation.json) — image-segmentation
- [ImageNet 图像数据集](../data/nodes/im/imagenet.json) — imagenet
- [交并比](../data/nodes/in/intersection-over-union.json) — intersection-over-union
- [K 均值聚类](../data/nodes/k-/k-means.json) — k-means
- [线性回归](../data/nodes/li/linear-regression.json) — linear-regression
- [逻辑回归](../data/nodes/lo/logistic-regression.json) — logistic-regression
- [均方误差](../data/nodes/me/mean-squared-error.json) — mean-squared-error
- [目标定位](../data/nodes/ob/object-localization.json) — object-localization
- [主成分分析](../data/nodes/pc/pca.json) — pca
- [随机森林](../data/nodes/ra/random-forest.json) — random-forest
- [残差网络](../data/nodes/re/resnet.json) — resnet
- [ROC 曲线下面积](../data/nodes/ro/roc-auc.json) — roc-auc
- [斯坦福 CS229](../data/nodes/st/stanford-cs229.json) — stanford-cs229
- [支持向量机](../data/nodes/sv/svm.json) — svm
- [训练测试划分](../data/nodes/tr/train-test-split.json) — train-test-split
- [U 形网络](../data/nodes/u-/u-net.json) — u-net
- [视觉 Transformer](../data/nodes/vi/vision-transformer.json) — vision-transformer

既有补充：[吴恩达机器学习课程](../data/nodes/an/andrew-ng-ml.json)、[CNN](../data/nodes/cn/cnn.json)、[交叉熵](../data/nodes/cr/cross-entropy.json)、[机器学习](../data/nodes/ma/machine-learning.json)、[MLflow](../data/nodes/ml/mlflow.json)、[目标检测](../data/nodes/ob/object-detection.json)、[开源计算机视觉库](../data/nodes/op/opencv.json)、[正则化](../data/nodes/re/regularization.json)、[sklearn](../data/nodes/sc/scikit-learn.json)、[监督学习](../data/nodes/su/supervised-learning.json)、[无监督学习](../data/nodes/un/unsupervised-learning.json)、[xgboost](../data/nodes/xg/xgboost.json)、[YOLO 检测模型族](../data/nodes/yo/yolo.json)。

### 操作系统、编译与运行时（新增 24，既有补充 26）

新增：

- [代码生成](../data/nodes/co/code-generation.json) — code-generation
- [公共子表达式消除](../data/nodes/co/common-subexpression-elimination.json) — common-subexpression-elimination
- [条件变量](../data/nodes/co/condition-variable.json) — condition-variable
- [常量折叠](../data/nodes/co/constant-folding.json) — constant-folding
- [上下文无关文法](../data/nodes/co/context-free-grammar.json) — context-free-grammar
- [上下文切换](../data/nodes/co/context-switch.json) — context-switch
- [写时复制](../data/nodes/co/copy-on-write.json) — copy-on-write
- [死代码消除](../data/nodes/de/dead-code-elimination.json) — dead-code-elimination
- [动态链接](../data/nodes/dy/dynamic-linking.json) — dynamic-linking
- [可执行与可链接格式](../data/nodes/el/elf.json) — elf
- [进程间通信](../data/nodes/in/inter-process-communication.json) — inter-process-communication
- [LL 语法分析](../data/nodes/ll/ll-parsing.json) — ll-parsing
- [LR 语法分析](../data/nodes/lr/lr-parsing.json) — lr-parsing
- [标记清除](../data/nodes/ma/mark-sweep.json) — mark-sweep
- [内存屏障](../data/nodes/me/memory-barrier.json) — memory-barrier
- [缺页异常](../data/nodes/pa/page-fault.json) — page-fault
- [页表](../data/nodes/pa/page-table.json) — page-table
- [优先级反转](../data/nodes/pr/priority-inversion.json) — priority-inversion
- [引用计数](../data/nodes/re/reference-counting.json) — reference-counting
- [重定位](../data/nodes/re/relocation.json) — relocation
- [语义分析](../data/nodes/se/semantic-analysis.json) — semantic-analysis
- [全局暂停](../data/nodes/st/stop-the-world.json) — stop-the-world
- [符号表](../data/nodes/sy/symbol-table.json) — symbol-table
- [地址转换后备缓冲](../data/nodes/tl/tlb.json) — tlb

既有补充：[AOT](../data/nodes/ao/aot.json)、[抽象语法树](../data/nodes/as/ast.json)、[Clang](../data/nodes/cl/clang.json)、[编译器](../data/nodes/co/compiler.json)、[CPython](../data/nodes/cp/cpython.json)、[逃逸分析](../data/nodes/es/escape-analysis.json)、[GC](../data/nodes/ga/garbage-collection.json)、[GCC](../data/nodes/gc/gcc.json)、[中间表示](../data/nodes/ir/ir.json)、[JIT](../data/nodes/ji/jit.json)、[JVM](../data/nodes/jv/jvm.json)、[词法分析器](../data/nodes/le/lexer.json)、[链接](../data/nodes/li/linking.json)、[Linux](../data/nodes/li/linux.json)、[Linux 内核](../data/nodes/li/linux-kernel.json)、[LLVM](../data/nodes/ll/llvm.json)、[内存模型](../data/nodes/me/memory-model.json)、[分页机制](../data/nodes/pa/paging.json)、[语法分析器](../data/nodes/pa/parser.json)、[进程](../data/nodes/pr/process.json)、[寄存器分配](../data/nodes/re/register-allocation.json)、[调度器](../data/nodes/sc/scheduler.json)、[SSA](../data/nodes/ss/ssa.json)、[线程](../data/nodes/th/thread.json)、[V8](../data/nodes/v8/v8.json)、[虚拟内存](../data/nodes/vi/virtual-memory.json)。

### 数据库与数据工程（新增 6，既有补充 19）

新增：

- [数据契约](../data/nodes/da/data-contract.json) — data-contract
- [数据质量](../data/nodes/da/data-quality.json) — data-quality
- [事件时间](../data/nodes/ev/event-time.json) — event-time
- [迟到数据](../data/nodes/la/late-data.json) — late-data
- [模式演进](../data/nodes/sc/schema-evolution.json) — schema-evolution
- [水位线](../data/nodes/wa/watermark.json) — watermark

既有补充：[ACID](../data/nodes/ac/acid.json)、[Flink](../data/nodes/ap/apache-flink.json)、[Apache Iceberg](../data/nodes/ap/apache-iceberg.json)、[Apache Avro](../data/nodes/av/avro.json)、[B 树](../data/nodes/b-/b-tree.json)、[CDC](../data/nodes/cd/cdc.json)、[检查点机制](../data/nodes/ch/checkpointing.json)、[并发控制](../data/nodes/co/concurrency-control.json)、[数据血缘](../data/nodes/da/data-lineage.json)、[dbt](../data/nodes/db/dbt.json)、[ELT](../data/nodes/el/elt.json)、[ETL](../data/nodes/et/etl.json)、[LSM 树](../data/nodes/ls/lsm-tree.json)、[MVCC](../data/nodes/mv/mvcc.json)、[MySQL](../data/nodes/my/mysql.json)、[PostgreSQL](../data/nodes/po/postgresql.json)、[查询优化](../data/nodes/qu/query-optimization.json)、[事务](../data/nodes/tr/transactions.json)、[预写日志](../data/nodes/wa/wal.json)。

### 应用安全与安全工程（新增 20，既有补充 11）

新增：

- [带关联数据的认证加密](../data/nodes/ae/aead.json) — aead
- [Argon2 密码哈希](../data/nodes/ar/argon2.json) — argon2
- [bcrypt 密码哈希](../data/nodes/bc/bcrypt.json) — bcrypt
- [证书链](../data/nodes/ce/certificate-chain.json) — certificate-chain
- [操作系统命令注入](../data/nodes/co/command-injection.json) — command-injection
- [通用漏洞与披露](../data/nodes/cv/cve.json) — cve
- [通用漏洞评分系统](../data/nodes/cv/cvss.json) — cvss
- [通用弱点枚举](../data/nodes/cw/cwe.json) — cwe
- [动态应用安全测试](../data/nodes/da/dast.json) — dast
- [Vault 秘密管理工具](../data/nodes/ha/hashicorp-vault.json) — hashicorp-vault
- [基于哈希的消息认证码](../data/nodes/hm/hmac.json) — hmac
- [不安全直接对象引用](../data/nodes/id/idor.json) — idor
- [不安全反序列化](../data/nodes/in/insecure-deserialization.json) — insecure-deserialization
- [密钥管理服务](../data/nodes/ke/key-management-service.json) — key-management-service
- [在线证书状态协议](../data/nodes/oc/ocsp.json) — ocsp
- [路径遍历](../data/nodes/pa/path-traversal.json) — path-traversal
- [静态应用安全测试](../data/nodes/sa/sast.json) — sast
- [秘密管理](../data/nodes/se/secrets-management.json) — secrets-management
- [服务端请求伪造](../data/nodes/ss/ssrf.json) — ssrf
- [威胁建模](../data/nodes/th/threat-modeling.json) — threat-modeling

既有补充：[认证](../data/nodes/au/authentication.json)、[授权](../data/nodes/au/authorization.json)、[DevSecOps](../data/nodes/de/devsecops.json)、[模糊测试](../data/nodes/fu/fuzzing.json)、[ATT&CK](../data/nodes/mi/mitre-attack.json)、[OpenSSL](../data/nodes/op/openssl.json)、[SBOM](../data/nodes/sb/sbom.json)、[SQL 注入](../data/nodes/sq/sqli.json)、[TLS](../data/nodes/tl/tls.json)、[x509](../data/nodes/x5/x509.json)、[XSS](../data/nodes/xs/xss.json)。

### 机器人、感知与控制（新增 13，既有补充 7）

新增：

- [反馈控制](../data/nodes/fe/feedback-control.json) — feedback-control
- [Gazebo 仿真器](../data/nodes/ga/gazebo.json) — gazebo
- [惯性测量单元](../data/nodes/im/imu.json) — imu
- [逆运动学](../data/nodes/in/inverse-kinematics.json) — inverse-kinematics
- [卡尔曼滤波](../data/nodes/ka/kalman-filter.json) — kalman-filter
- [激光雷达](../data/nodes/li/lidar.json) — lidar
- [现代机器人学](../data/nodes/mo/modern-robotics.json) — modern-robotics
- [MoveIt 2](../data/nodes/mo/moveit.json) — moveit
- [Nav2](../data/nodes/na/nav2.json) — nav2
- [路径规划](../data/nodes/pa/path-planning.json) — path-planning
- [PID 控制](../data/nodes/pi/pid-control.json) — pid-control
- [机器人状态估计包](../data/nodes/ro/robot-localization.json) — robot-localization
- [同时定位与建图](../data/nodes/sl/slam.json) — slam

既有补充：[Apollo](../data/nodes/ba/baidu-apollo.json)、[DJI SDK](../data/nodes/dj/dji-sdk.json)、[具身智能](../data/nodes/em/embodied-ai.json)、[Jetson](../data/nodes/nv/nvidia-jetson.json)、[Robot Operating System](../data/nodes/ro/ros.json)、[虚实迁移](../data/nodes/si/sim-to-real.json)、[宇树 G1](../data/nodes/un/unitree-g1.json)。

### 数字电路与芯片设计（新增 26，既有补充 15）

新增：

- [专用集成电路](../data/nodes/as/asic.json) — asic
- [布尔代数](../data/nodes/bo/boolean-algebra.json) — boolean-algebra
- [时钟域跨越](../data/nodes/cl/clock-domain-crossing.json) — clock-domain-crossing
- [互补金属氧化物半导体](../data/nodes/cm/cmos.json) — cmos
- [晶片上晶圆上基板封装](../data/nodes/co/cowos.json) — cowos
- [数字电路](../data/nodes/di/digital-circuit.json) — digital-circuit
- [动态随机存取存储器](../data/nodes/dr/dram.json) — dram
- [触发器](../data/nodes/fl/flip-flop.json) — flip-flop
- [现场可编程门阵列](../data/nodes/fp/fpga.json) — fpga
- [保持时间](../data/nodes/ho/hold-time.json) — hold-time
- [逻辑门](../data/nodes/lo/logic-gate.json) — logic-gate
- [逻辑综合](../data/nodes/lo/logic-synthesis.json) — logic-synthesis
- [金属氧化物半导体场效应晶体管](../data/nodes/mo/mosfet.json) — mosfet
- [nextpnr](../data/nodes/ne/nextpnr.json) — nextpnr
- [openroad](../data/nodes/op/openroad.json) — openroad
- [opensta](../data/nodes/op/opensta.json) — opensta
- [布局布线](../data/nodes/pl/place-and-route.json) — place-and-route
- [工艺设计套件](../data/nodes/pr/process-design-kit.json) — process-design-kit
- [questa](../data/nodes/qu/questa.json) — questa
- [寄存器传输级](../data/nodes/rt/rtl.json) — rtl
- [建立时间](../data/nodes/se/setup-time.json) — setup-time
- [标准单元](../data/nodes/st/standard-cell.json) — standard-cell
- [静态时序分析](../data/nodes/st/static-timing-analysis.json) — static-timing-analysis
- [硅通孔](../data/nodes/th/through-silicon-via.json) — through-silicon-via
- [晶体管](../data/nodes/tr/transistor.json) — transistor
- [yosys](../data/nodes/yo/yosys.json) — yosys

既有补充：[先进封装](../data/nodes/ad/advanced-packaging.json)、[ARM](../data/nodes/ar/arm.json)、[ASML](../data/nodes/as/asml.json)、[EUV 光刻机](../data/nodes/as/asml-euv.json)、[Chiplet](../data/nodes/ch/chiplet.json)、[EDA](../data/nodes/ed/eda.json)、[高带宽内存](../data/nodes/hb/hbm.json)、[SK hynix HBM3E](../data/nodes/hb/hbm3e.json)、[光刻](../data/nodes/ph/photolithography.json)、[RISC-V](../data/nodes/ri/risc-v.json)、[Siemens EDA](../data/nodes/si/siemens-eda.json)、[流片](../data/nodes/ta/tapeout.json)、[台积电](../data/nodes/ts/tsmc.json)、[Verilog HDL](../data/nodes/ve/verilog.json)、[超高速集成电路硬件描述语言](../data/nodes/vh/vhdl.json)。

### 人机交互与无障碍（新增 10，既有补充 5）

新增：

- [无障碍自动测试引擎](../data/nodes/ax/axe-core.json) — axe-core
- [设计系统](../data/nodes/de/design-system.json) — design-system
- [菲茨定律](../data/nodes/fi/fitts-law.json) — fitts-law
- [希克定律](../data/nodes/hi/hick-law.json) — hick-law
- [交互设计](../data/nodes/in/interaction-design.json) — interaction-design
- [易用性](../data/nodes/us/usability.json) — usability
- [易用性测试](../data/nodes/us/usability-testing.json) — usability-testing
- [用户研究](../data/nodes/us/user-research.json) — user-research
- [无障碍富互联网应用](../data/nodes/wa/wai-aria.json) — wai-aria
- [Web 内容无障碍指南](../data/nodes/wc/wcag.json) — wcag

既有补充：[无障碍](../data/nodes/ac/accessibility.json)、[人体工学](../data/nodes/er/ergonomics.json)、[HTML](../data/nodes/ht/html.json)、[产品经理](../data/nodes/pr/product-manager.json)、[shadcn/ui](../data/nodes/sh/shadcn-ui.json)。

## 连接与消歧

- 数学/统计 → NumPy、BLAS → 回归、聚类、树模型 → scikit-learn、XGBoost → 验证与指标；MIT 18.06、Stanford CS229 和既有吴恩达课程连接相应知识。
- 视觉任务 → ResNet、ViT、U-Net → ImageNet、COCO 与 IoU/Dice → OpenCV、YOLO。模型架构与具体权重制品分开解释，不按层数或模型尺寸重复造节点。
- 页表/缺页/TLB → 虚拟内存；上下文切换/同步 → Linux；语法语义/IR/优化 → LLVM/GCC；链接与内存回收 → 运行时。
- 事件时间/Watermark/迟到数据 → 流处理；模式演进/契约/质量 → Iceberg、dbt 与既有数据管线。
- 威胁建模 → 弱点与漏洞标识 → SAST/DAST → 密钥、凭证与交付安全。CVE 标识、CWE 弱点分类、CVSS 严重性评分各自保留边界。
- LiDAR/IMU → Kalman/SLAM → 路径规划/逆运动学 → 反馈/PID；ROS、Nav2、MoveIt、robot_localization 与 Gazebo 连接到具体软件路径。
- 逻辑/器件 → RTL → 综合 → 布局布线/时序 → FPGA/ASIC；开源 EDA 工具和产业节点提供实现与制造入口。
- 用户研究 → 交互设计/设计系统 → 易用性测试 → WCAG/WAI-ARIA → HTML、shadcn/ui、axe-core 与 Playwright 的实际路径。

统计方差 statistical-variance 不覆盖 variance 的类型变型；COCO 数据集 coco-dataset 不覆盖 Cocos；易用性 usability 不覆盖系统可用性 availability。SystemVerilog 继续在 Verilog 母节点说明。

## 修正的旧语义

- MVCC 的普通快照读取减少读写阻塞，但写写冲突、显式锁及具体隔离规则仍可能等待；删除摘要中的无条件保证。
- DJI SDK 家族的 C++ 与 Linux 开发路径改为限定场景的 uses/runs_on，不再作为全部套件的硬依赖。
- Unitree G1 的 PyTorch 关系改为官方强化学习训练路径中的 uses，C++ 控制 SDK 不据此产生硬依赖。
- G1 的 Linux 硬依赖也移除：SDK 的 Ubuntu 构建要求不足以推出硬件产品全部运行路径的直接依赖。
- TLS 的 X.509 路径限定为相应证书认证场景；PostgreSQL 的 SQL 关系表达实际 SQL 接口使用，不当作工件依赖。
- HBM3e 不作为 H100 的基座：NVIDIA 官方规格区分 H100 SXM 的 HBM3 与 H200 的 HBM3e。
- 网络架构与任务的关系由任务持有，例如分类任务 uses ResNet/ViT；设计系统采用 shadcn/ui 的源码组件路径也由设计系统持有，不把用途写成反向使用。
- Fitts 定律明确区分目标几何宽度与按落点分布估计的有效宽度；Modern Robotics 入口和版次按作者教材主页核实。
- 原有分类边只在具体分类替代泛 theory 时细化；其余删改以审计记录和一手证据为准。

## 一手资料与研究口径

每篇正文提供与该主题对应的直接链接。主要来源包括：

- [MIT 线性代数课程](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)与[Stanford CS229](https://cs229.stanford.edu/)；[scikit-learn 官方文档](https://scikit-learn.org/stable/user_guide.html)和相应原始视觉论文。
- [Linux 内核文档](https://docs.kernel.org/)、[OSTEP 作者教材](https://pages.cs.wisc.edu/~remzi/OSTEP/)、[LLVM 文档](https://llvm.org/docs/)、[PostgreSQL MVCC](https://www.postgresql.org/docs/current/mvcc.html)及项目特定数据工程文档。
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)、[CVE 官方项目](https://www.cve.org/)、[CWE 官方项目](https://cwe.mitre.org/)与[FIRST CVSS](https://www.first.org/cvss/)。
- [Nav2 导航概念](https://docs.nav2.org/rolling/getting_started/navigation_concepts/)、[MoveIt](https://moveit.picknik.ai/)、[Gazebo](https://gazebosim.org/docs/latest/getstarted/)及滤波/SLAM 原始教材和研究资料。ROS 文档遇到访问限制时采用官方仓库与可访问的项目文档。
- [Yosys 文档](https://yosyshq.readthedocs.io/projects/yosys/en/latest/)、[OpenROAD](https://openroad.readthedocs.io/en/latest/)、AMD/Siemens 的技术手册和厂商规格资料。
- [GOV.UK 用户研究](https://www.gov.uk/service-manual/user-research/start-by-learning-user-needs)、[W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)、[WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)及 Fitts/Hick 研究资料。

网络检索提供证据入口，不把搜索摘要当作完整阅读。付费或受限标准只根据可访问的官方摘要描述范围；版本化 API 文档不自动代表当前版本接口。失效链接、可选路径与论文条件在核查中逐项处理。

## 契约与验证

本体新增十二个分类，domains 新增七个主题，见 [ADR-0026](decisions/0026-foundational-content-classification.md)。产品类型的说明明确包括教材、课程与数据集等资料制品，实体类型和关系类型数量保持不变。

使用执行前的 1,468 节点快照对照新增、改写和删改关系；所有新增节点均有非分类入边或出边，239 个新增及改写节点均有 Markdown 来源链接。19 条原存储边有删改，其中 9 条是分类细化，10 条是非分类语义修订；本批新增 400 条非分类边，净增 390 条。

执行结果：

- pnpm build 通过：1,608 数据节点、58 本体节点、3,436 条构建边、64 生态页、125 静态页面；发布的完整离线快照包含 333 个资源，共 8,242,086 字节。
- pnpm test:unit：21/21 通过，包含当前数据逐边 CSR 比对、搜索路由与实际 WASM 解码/评分。
- pnpm test:browser：8/8 通过，覆盖 Worker、真实 WASM、失败回退、完整离线、更新切换、损坏更新丢弃与缓存修复。
- 对全部 140 个新增 id 调用实际搜索引擎，均可检索；239 个新增或改写词条的详情摘要和 L2 正文逐一与源数据一致。
- 16 个别名与消歧断言通过，覆盖统计方差/类型变型、COCO/Cocos、易用性/Availability、两种 CDC、SystemVerilog 等。
- web TypeScript 与 tools/tsconfig.build.json 检查通过；内容、契约与文档 git diff --check 通过。

验证使用新生成的数据版本 5731392c7516a6ab0c007fb18160428fbc3380204d31359c4d4a2ed7abbf2da0。以上测试检查数据一致性与运行行为，内容仍按 ai_draft 标记供人工审校。
