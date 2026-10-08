# ADR-0031：HFT、电子交易与低延迟系统

- 状态：已接受
- 日期：2026-10-08

## 背景

全库稳定 id、名称、缩写、别名与正文核查没有找到 HFT 或高频交易。已有量化金融、FIX、网络和并发条目无法解释盘口、订单状态、市场数据恢复、研究假设及交易风险之间的完整路径。少量组织和语言节点还混淆了不同主体或工件身份。

本批按九个分支补全：市场微观结构、订单与执行、行情及交易规范、低延迟系统、网络与时钟、量化研究与回测、风控与监管、产业主体与产品、软件基础设施。通用网络采集基础并入网络与时钟分支。具体清单、直接来源和最终验证见 [内容批次记录](../content-hft-and-electronic-trading-2026-10.md)。

## 决策

1. 本体 86 → 92，版本 0.14.0。新增 market-microstructure-concept、electronic-trading-concept、low-latency-systems-concept、trading-risk-concept、trading-specification 与 market-metric。沿用 concept、protocol、metric 等既有实体类型，研究方法继续使用 quantitative-method。
2. 领域 66 → 71，版本 0.8.0。新增 market-microstructure、electronic-trading、low-latency-systems、financial-risk-management 与 financial-market-regulation。
3. 生态 89 → 93，版本 0.6.0。电子交易与市场数据生态继承金融科技；量化研究兼属金融科技和 AI/数据科学。通用低延迟系统仅继承操作系统、网络和硬件三个宏观根，不把全部低延迟技术归为金融。
4. 类型 Schema 保持 3.5.1，二十九种关系与十个宏观生态根不变。通用撮合引擎、OMS、EMS、网关和模拟机制使用 concept；具体软件、交易平台、商业数据服务和协议分别建档。法规范围说明作为概念，不误作可实现的消息协议。
5. 保持已发布 id。k-lang 明确为 q 语言，K 数组语言和 kdb+ 数据库另行建档，移除混用别名及无来源精确日期。Citadel 与 Citadel Securities 分别为投资管理和做市主体，不推导母子关系。现有 RSS 订阅协议、Lean 证明语言及服务熔断概念保留原义，新义使用限定 id。
6. io-uring、epoll 明确为 Linux 具体 API，以 protocol 挂 api-specification、抽象层为 kernel_os；接口、内核机制和用户态包装库分开说明。CAS、锁、时钟和报文采集等通用机制不因金融应用而变成 HFT 专属技术。

## 事实与关系边界

HFT 以 hft 为稳定入口。一般算法交易、电子交易及高频交易有不同范围；法域中的认定条件与典型行业特征分别说明。MiFID II 的三个同时满足的定义条件不能简化为一个全球消息频率阈值，也不能推导 HFT 必须使用 AI、FPGA 或某门语言。[ESMA 定义](https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mifid-ii/article-4-definitions)

盘口数据层级与报价指标分别建模，MBO 不保证揭示隐藏量或真实排队状态。行情编码、会话、传输和业务消息分开，ITCH、OUCH 与商业 TotalView 数据产品分别建档。订单确认与 TCP 传输确认不同，Pending Cancel/Replace 不表示业务操作成功。

uses 的主语必须是实际调用或采用者；评估者使用某个指标，不能写成被评估的能力或效应使用指标。条件性的后端、传输、软件集成和交易场所规则写入 context，不建立所有 HFT 的统一硬依赖。因果、治理和组成也不得仅凭主题相关推导。

网络时间戳分辨率、时钟 UTC 偏差、采集精度与端到端时延分别说明；尾分位数不直接相加，CAS 不保证整个算法无锁，无等待步骤上限也不等同墙钟期限。pcap/pcapng 的格式说明按当前草案状态引用，不称为已发布 RFC。

现行监管内容注明复核日期、辖区、市场和主体。[中国证券市场程序化交易细则](https://www.sse.com.cn/lawandrules/sselawsrules2025/trade/universal/c/c_20250612_10781696.shtml)的单账户报告与撤单口径不推广到所有期货市场；美国 Market Access Rule 与欧盟算法交易控制分别说明。截至复核日，欧盟 [2025/1155](https://eur-lex.europa.eu/eli/reg_del/2025/1155/oj/eng) 的新时钟规定已于 2026-03-02 生效；旧 RTS 25 数值不作为欧盟现行规则，英国承接规则独立核验。美国部分最小报价单位和接入费上限修订的合规期限由 [2026-06-11 SEC 命令](https://www.sec.gov/files/rules/exorders/2026/34-105656.pdf)延至 2027 年 11 月首个营业日，不把延期条款或待审提案写成已经全面实施。

## 结果

HFT 入口可沿盘口、执行、行情、计算通信、研究与控制路径进入实际组织、产品和软件。新内容与已有网络、系统、语言和金融节点连接；所有本批作者内容保留 ai_draft 与 2026-10-08 复核日期，最终校验、完整构建和实际检索结果写入内容批次记录。
