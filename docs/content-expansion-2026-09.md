# 2026-09-12 图谱内容补充

本次补齐讨论确定的七组 47 个词条，并为新词条与已有概念、软件、协议和机构补充有具体场景的关系。

所有新词条包含中文摘要、说明、来源、分类和至少一条非分类关系（包括由现有词条指入的关系）。来源已核对；内容由 AI 整理，按项目规范保留 origin: ai_draft，供后续人工审校。

## 新增词条

### 基础数据结构与机器学习基础（9）

- [数组](../data/nodes/ar/array.json) — 按整数下标访问元素的基础数据结构，常用连续存储实现。
- [链表](../data/nodes/li/linked-list.json) — 用链接连接节点的线性结构，适合局部插入与删除。
- [栈](../data/nodes/st/stack.json) — 遵循后进先出规则的抽象数据结构，支持入栈与出栈。
- [队列](../data/nodes/qu/queue.json) — 遵循先进先出规则的抽象数据结构，支持入队与出队。
- [矩阵乘法](../data/nodes/ma/matrix-multiplication.json) — 按行列内积组合矩阵的运算，连接线性代数与高性能计算。
- [梯度下降](../data/nodes/gr/gradient-descent.json) — 沿目标函数的负梯度迭代更新参数的优化方法。
- [损失函数](../data/nodes/lo/loss-function.json) — 把预测与目标之间的偏差转化为训练可优化的数值。
- [交叉熵](../data/nodes/cr/cross-entropy.json) — 衡量目标分布与预测分布差异的量，常用作分类损失。
- [正则化](../data/nodes/re/regularization.json) — 通过约束模型或训练过程改善泛化、抑制过拟合的方法。

### RAG 检索环节（5）

- [文档分块](../data/nodes/do/document-chunking.json) — 把长文档切成适合索引、检索和上下文输入的片段。
- [BM25](../data/nodes/bm/bm25.json) — 结合词频、逆文档频率和长度归一化的文本相关性评分。
- [HNSW](../data/nodes/hn/hnsw.json) — 使用分层邻近图加速高维向量近似最近邻检索的算法。
- [混合检索](../data/nodes/hy/hybrid-search.json) — 融合词项与向量等多种检索结果，兼顾精确匹配与语义。
- [重排](../data/nodes/re/reranking.json) — 对初次召回的候选再次评分，改善最终结果的相关性排序。

### 多卡通信与推理执行（8）

- [NCCL](../data/nodes/nc/nccl.json) — 面向 NVIDIA GPU 的集合通信库，支撑多卡与多机计算。
- [NVLink](../data/nodes/nv/nvlink.json) — NVIDIA 的高速互联技术，用于 GPU 等处理器间的数据交换。
- [PCIe](../data/nodes/pc/pcie.json) — 连接处理器、GPU、网卡和存储设备的高速串行互联标准。
- [RDMA](../data/nodes/rd/rdma.json) — 让网络适配器直接访问授权内存区域、降低数据搬运开销的机制。
- [InfiniBand](../data/nodes/in/infiniband.json) — 面向高性能计算的低延迟交换互联，原生支持 RDMA。
- [预填充](../data/nodes/pr/prefill.json) — 处理输入上下文并建立初始状态的自回归模型推理阶段。
- [自回归解码](../data/nodes/de/decode.json) — 根据已有上下文逐步生成后续 token 的模型推理过程。
- [PagedAttention](../data/nodes/pa/paged-attention.json) — 以分页方式组织 KV Cache，减少推理服务中的显存浪费。

### Agent 运行机制（5）

- [AI 智能体](../data/nodes/ai/ai-agent.json) — 根据目标感知环境并选择行动的系统，常结合模型与工具。
- [智能体记忆](../data/nodes/ag/agent-memory.json) — 保存和检索交互信息，使智能体能延续任务或跨会话利用经验。
- [上下文工程](../data/nodes/co/context-engineering.json) — 组织指令、历史、工具结果和检索内容，构造模型所需上下文。
- [LangGraph](../data/nodes/la/langgraph.json) — 以状态图编排任务的运行框架，支持持久执行和人工介入。
- [提示注入](../data/nodes/pr/prompt-injection.json) — 让模型把不可信输入当成指令，从而偏离原定任务的攻击方式。

### 数据与模型生命周期（8）

- [ETL](../data/nodes/et/etl.json) — 先抽取、转换，再加载到目标系统的数据集成流程。
- [ELT](../data/nodes/el/elt.json) — 先将抽取的数据加载到目标平台，再利用平台计算能力转换。
- [CDC](../data/nodes/cd/cdc.json) — 识别源数据的新增、修改与删除，并向下游传播这些变化。
- [Apache Airflow](../data/nodes/ap/apache-airflow.json) — 用代码定义、调度和监控工作流的开源平台。
- [dbt](../data/nodes/db/dbt.json) — 通过声明式模型组织数据转换、测试、文档与血缘的工具体系。
- [Apache Iceberg](../data/nodes/ap/apache-iceberg.json) — 以快照和元数据管理分析表的开放表格式，支持多引擎访问。
- [数据血缘](../data/nodes/da/data-lineage.json) — 记录数据来源、处理步骤和去向，支撑追踪与变更影响分析。
- [MLflow](../data/nodes/ml/mlflow.json) — 管理实验记录、模型制品和模型生命周期的开源平台。

### 可靠性（6）

- [SLI](../data/nodes/sl/sli.json) — 从用户体验出发量化服务表现的指标，如成功率或请求延迟。
- [SLO](../data/nodes/sl/slo.json) — 在规定统计范围或时间窗口内为服务指标设定的目标。
- [SLA](../data/nodes/sl/sla.json) — 约定服务等级及未达标时相应处理方式的服务协议。
- [错误预算](../data/nodes/er/error-budget.json) — 在既定服务目标和统计窗口内允许的不良事件额度。
- [背压](../data/nodes/ba/backpressure.json) — 下游通过反馈限制上游发送速度，避免缓冲与任务持续堆积。
- [指数退避](../data/nodes/ex/exponential-backoff.json) — 失败重试时按指数增长等待间隔，以缓解持续竞争或服务压力。

### 标准组织与基金会（6）

- [IETF](../data/nodes/ie/ietf.json) — 以开放协作流程制定和演进互联网技术标准的组织。
- [W3C](../data/nodes/w3/w3c.json) — 推动 Web 标准互操作性、可访问性与长期演进的国际组织。
- [IEEE](../data/nodes/ie/ieee.json) — 涵盖电气、电子与计算技术的专业组织，并开展技术标准工作。
- [Khronos Group](../data/nodes/kh/khronos-group.json) — 制定图形、计算与相关跨平台开放接口标准的产业联盟。
- [Apache 软件基金会](../data/nodes/ap/apache-software-foundation.json) — 为 Apache 开源项目提供社区治理与基础支持的非营利基金会。
- [Linux 基金会](../data/nodes/li/linux-foundation.json) — 为开源项目与技术社区提供中立治理、协作和基础服务的基金会。

## 关系与边界

- 方法使用与项目治理的语义、方向和上下文要求见 [ADR-0021](decisions/0021-method-use-and-stewardship.md)。
- 可选路径在 context 中注明；例如 RAG 不一定使用向量数据库，NCCL 不要求每个部署都具备 NVLink。
- 标准或项目的治理归属使用 stewarded_by；不据此推断原始作者、代码维护者或全部版权归属。
- 反向关系由构建生成，不手工存储镜像边。
- 本次补充以下局部路径：BFS／队列；矩阵乘法／NumPy／PyTorch；RAG／混合检索／BM25／HNSW；PyTorch／NCCL／互联；数据管线／Airflow／dbt／Iceberg；SRE／SLO／错误预算。

## 校验口径

关键实现和治理关系还参考了以下一手资料：

- [PyTorch 分布式通信后端](https://docs.pytorch.org/docs/stable/distributed)：NCCL 属于可选的 CUDA GPU 通信后端。
- [Airflow Spark provider](https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/index.html) 与 [OpenLineage provider](https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html)：作业提交和血缘采集由对应集成承载。
- [MLflow PyTorch 集成](https://mlflow.org/docs/latest/ml/deep-learning/pytorch/) 与 [Databricks 最初发布资料](https://pages.databricks.com/Reg-Introducing-MLflow.html)：区分框架集成和项目发起方。
- [gRPC 连接退避](https://github.com/grpc/grpc/blob/master/doc/connection-backoff.md) 与 [Flink 背压监控](https://nightlies.apache.org/flink/flink-docs-stable/docs/ops/monitoring/back_pressure/)：限定重连和上下游流控的实际场景。
- [IEEE 802 工作组](https://www.ieee802.org/802SC.shtml)、[Apache 社区治理](https://www.apache.org/foundation/how-it-works/) 与 [CNCF 组织关系](https://www.cncf.io/about/who-we-are/)：治理关系不推导发明或原始研发归属。

- 全量契约校验与站点构建：pnpm build。
- 检查全部 47 个新词条在搜索、详情和关系派生产物中可用。
- 检查新关系的合法与非法输入，包括缺少上下文、类型不符和失效引用。
- 将本次执行前的数据快照作为比较基线，检查已有字段及原有关系得到保留。

实际调用前端搜索与详情加载函数时，发现旧详情加载器将十六进制分片编号 a–f 转成十进制 10–15，请求了不存在的文件。本次新增词条中 17 个受影响。现已统一为构建端的十六进制文件名，避免词条可搜到但正文加载失败。

验证结果：完整 pnpm build 通过，生成 103 个静态页面；调用实际前端函数验证了全部 47 个新词条的搜索、正文、分类和双向关系。10 个隔离的 CLI 校验场景全部通过，覆盖有效关系、缺少或无效上下文、错误类型、死边、重复边和自环。与执行前快照比较，原有 1,349 个词条的既有字段和关系均得到保留；git diff --check 通过。

## 本次数据统计

- 词条：1349 → 1396。
- 新增非分类关系：136 条。
- 补充关系的已有词条：48 个。
- 无非分类入边或出边的词条：471 → 450。
