# 2026-10-08 HFT 与电子交易内容补全

本批开始时，全库 id、name、abbreviation、aliases 及正文核查未找到 HFT、High-Frequency Trading 或高频交易。已有量化金融、FIX、网络与系统基础条目缺少盘口、订单状态、市场数据恢复、低延迟测量、研究假设与风控监管主线。审计还发现 q/K/kdb+、Citadel/Citadel Securities 和内部投研平台等身份需要纠正。

以图形、Hono 和 WSL/容器批次完成后的 2370 个数据节点为基线，新增 192 个、实质扩写 37 个，全图增至 2562 个。新增 414 条非分类关系；新增与扩写正文包含 378 个不同的一手资料 URL（按完整 URL 去重，分支来源数不能直接相加）。全图非空 description 从 1238 增至 1460。本批内容统一 origin: ai_draft、last_reviewed: 2026-10-08。

## 范围与完整节点清单

### 电子交易、市场微观结构与价格形成（新增 24，扩写 1）

内容主线：electronic-trading → algorithmic-trading → hft：电子接口、自动决策与高频技术分别定义；order-driven-market / quote-driven-market → limit-order-book / 双向报价：不同流动性组织机制；continuous-double-auction / call-auction → matching-engine → price-time-priority / pro-rata-matching；tick-size / lot-size → limit-order-book → best-bid-and-offer → bid-ask-spread / mid-price；market-depth / queue-position / order-book-imbalance → microprice：状态度量与条件价格估计；adverse-selection / market-impact / price-discovery → liquidity：信息、执行成本与市场质量边界。

新增：

- [Adverse Selection](../data/nodes/ad/adverse-selection.json) — adverse-selection
- [Algorithmic Trading](../data/nodes/al/algorithmic-trading.json) — algorithmic-trading
- [Best Bid and Offer](../data/nodes/be/best-bid-and-offer.json) — best-bid-and-offer
- [Bid-Ask Spread](../data/nodes/bi/bid-ask-spread.json) — bid-ask-spread
- [Call Auction](../data/nodes/ca/call-auction.json) — call-auction
- [Continuous Double Auction](../data/nodes/co/continuous-double-auction.json) — continuous-double-auction
- [Electronic Trading](../data/nodes/el/electronic-trading.json) — electronic-trading
- [High-Frequency Trading](../data/nodes/hf/hft.json) — hft
- [Limit Order Book](../data/nodes/li/limit-order-book.json) — limit-order-book
- [Lot Size](../data/nodes/lo/lot-size.json) — lot-size
- [Market Depth](../data/nodes/ma/market-depth.json) — market-depth
- [Market Impact](../data/nodes/ma/market-impact.json) — market-impact
- [Market Microstructure](../data/nodes/ma/market-microstructure.json) — market-microstructure
- [Matching Engine](../data/nodes/ma/matching-engine.json) — matching-engine
- [Microprice](../data/nodes/mi/microprice.json) — microprice
- [Mid-Price](../data/nodes/mi/mid-price.json) — mid-price
- [Order Book Imbalance](../data/nodes/or/order-book-imbalance.json) — order-book-imbalance
- [Order-Driven Market](../data/nodes/or/order-driven-market.json) — order-driven-market
- [Price Discovery](../data/nodes/pr/price-discovery.json) — price-discovery
- [Price-Time Priority](../data/nodes/pr/price-time-priority.json) — price-time-priority
- [Pro-Rata Matching](../data/nodes/pr/pro-rata-matching.json) — pro-rata-matching
- [Queue Position](../data/nodes/qu/queue-position.json) — queue-position
- [Quote-Driven Market](../data/nodes/qu/quote-driven-market.json) — quote-driven-market
- [Tick Size](../data/nodes/ti/tick-size.json) — tick-size

既有扩写：[Liquidity](../data/nodes/li/liquidity.json)。

本分支正文引用 37 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### 订单语义、交易执行系统与执行策略（新增 26，扩写 0）

内容主线：订单价格条件与触发条件 → 有效期、IOC/FOK/GTC → 原生或模拟订单处理；订单生命周期 → OMS → EMS / SOR → Order Gateway → 场所确认与执行回报；做市 / 统计套利 / 延迟套利 / 跨场所套利 → 库存、成交与成本约束；最优执行 → VWAP / TWAP / POV 调度 → VWAP 与 Implementation Shortfall 评价。

新增：

- [Cross-Venue Arbitrage](../data/nodes/cr/cross-venue-arbitrage.json) — cross-venue-arbitrage
- [Execution Management System](../data/nodes/ex/execution-management-system.json) — execution-management-system
- [Fill or Kill](../data/nodes/fi/fill-or-kill.json) — fill-or-kill
- [Good Till Cancelled](../data/nodes/go/good-till-cancelled.json) — good-till-cancelled
- [Iceberg Order](../data/nodes/ic/iceberg-order.json) — iceberg-order
- [Immediate or Cancel](../data/nodes/im/immediate-or-cancel.json) — immediate-or-cancel
- [Implementation Shortfall](../data/nodes/im/implementation-shortfall.json) — implementation-shortfall
- [Latency Arbitrage](../data/nodes/la/latency-arbitrage.json) — latency-arbitrage
- [Limit Order](../data/nodes/li/limit-order.json) — limit-order
- [Maker-Taker Fees](../data/nodes/ma/maker-taker-fees.json) — maker-taker-fees
- [Market Making](../data/nodes/ma/market-making.json) — market-making
- [Market Order](../data/nodes/ma/market-order.json) — market-order
- [Optimal Execution](../data/nodes/op/optimal-execution.json) — optimal-execution
- [Order Cancel/Replace](../data/nodes/or/order-cancel-replace.json) — order-cancel-replace
- [Order Gateway](../data/nodes/or/order-gateway.json) — order-gateway
- [Order Lifecycle](../data/nodes/or/order-lifecycle.json) — order-lifecycle
- [Order Management System](../data/nodes/or/order-management-system.json) — order-management-system
- [Participation of Volume](../data/nodes/pa/participation-of-volume.json) — participation-of-volume
- [Post-Only Order](../data/nodes/po/post-only-order.json) — post-only-order
- [Smart Order Routing](../data/nodes/sm/smart-order-routing.json) — smart-order-routing
- [Statistical Arbitrage](../data/nodes/st/statistical-arbitrage.json) — statistical-arbitrage
- [Stop Order](../data/nodes/st/stop-order.json) — stop-order
- [Time in Force](../data/nodes/ti/time-in-force.json) — time-in-force
- [TWAP Execution](../data/nodes/tw/twap-execution.json) — twap-execution
- [Volume-Weighted Average Price](../data/nodes/vo/volume-weighted-average-price.json) — volume-weighted-average-price
- [VWAP Execution](../data/nodes/vw/vwap-execution.json) — vwap-execution

本分支正文引用 38 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### 行情表示、接入恢复与交易消息规范（新增 24，扩写 1）

内容主线：Market Data；Market by Order；Market by Price；Top of Book；Financial Instrument Reference Data；Direct Market Feed；Securities Information Processor；Feed Handler；Market Data Normalization；Incremental Market Data；Market Data Snapshot；Market Data Sequence Number；Market Data Gap Recovery；Nasdaq TotalView-ITCH；Nasdaq OUCH；SoupBinTCP；MoldUDP64；FIX Protocol；FIX Session Protocol；FIX Performance Session Layer；Simple Binary Encoding；FIX Adapted for Streaming；CME MDP 3.0；CME iLink 3；FIX Trading Community。

新增：

- [CME iLink 3](../data/nodes/cm/cme-ilink-3.json) — cme-ilink-3
- [CME MDP 3.0](../data/nodes/cm/cme-mdp-3.json) — cme-mdp-3
- [Direct Market Feed](../data/nodes/di/direct-market-feed.json) — direct-market-feed
- [FIX Adapted for Streaming](../data/nodes/fa/fast-protocol.json) — fast-protocol
- [Feed Handler](../data/nodes/fe/feed-handler.json) — feed-handler
- [Financial Instrument Reference Data](../data/nodes/fi/financial-instrument-reference-data.json) — financial-instrument-reference-data
- [FIX Session Protocol](../data/nodes/fi/fix-session-protocol.json) — fix-session-protocol
- [FIX Trading Community](../data/nodes/fi/fix-trading-community.json) — fix-trading-community
- [FIX Performance Session Layer](../data/nodes/fi/fixp.json) — fixp
- [Incremental Market Data](../data/nodes/in/incremental-market-data.json) — incremental-market-data
- [Market by Order](../data/nodes/ma/market-by-order.json) — market-by-order
- [Market by Price](../data/nodes/ma/market-by-price.json) — market-by-price
- [Market Data](../data/nodes/ma/market-data.json) — market-data
- [Market Data Gap Recovery](../data/nodes/ma/market-data-gap-recovery.json) — market-data-gap-recovery
- [Market Data Normalization](../data/nodes/ma/market-data-normalization.json) — market-data-normalization
- [Market Data Sequence Number](../data/nodes/ma/market-data-sequence-number.json) — market-data-sequence-number
- [Market Data Snapshot](../data/nodes/ma/market-data-snapshot.json) — market-data-snapshot
- [MoldUDP64](../data/nodes/mo/moldudp64.json) — moldudp64
- [Nasdaq OUCH](../data/nodes/na/nasdaq-ouch.json) — nasdaq-ouch
- [Nasdaq TotalView-ITCH](../data/nodes/na/nasdaq-totalview-itch.json) — nasdaq-totalview-itch
- [Securities Information Processor](../data/nodes/se/securities-information-processor.json) — securities-information-processor
- [Simple Binary Encoding](../data/nodes/si/simple-binary-encoding.json) — simple-binary-encoding
- [SoupBinTCP](../data/nodes/so/soupbintcp.json) — soupbintcp
- [Top of Book](../data/nodes/to/top-of-book.json) — top-of-book

既有扩写：[FIX Protocol](../data/nodes/fi/fix-protocol.json)。

本分支正文引用 44 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### 低延迟系统工程（新增 21，扩写 10）

内容主线：明确端到端边界与延迟预算 → 分布、尾延迟和遗漏偏差 → 并发进度与有界队列 → 内存局部性和预分配 → CPU调度、轮询与I/O → 同负载验证延迟和吞吐。

新增：

- [Busy Polling](../data/nodes/bu/busy-polling.json) — busy-polling
- [Coordinated Omission](../data/nodes/co/coordinated-omission.json) — coordinated-omission
- [CPU Affinity](../data/nodes/cp/cpu-affinity.json) — cpu-affinity
- [CPU Isolation](../data/nodes/cp/cpu-isolation.json) — cpu-isolation
- [End-to-End Latency](../data/nodes/en/end-to-end-latency.json) — end-to-end-latency
- [False Sharing](../data/nodes/fa/false-sharing.json) — false-sharing
- [HdrHistogram](../data/nodes/hd/hdr-histogram.json) — hdr-histogram
- [Huge Pages](../data/nodes/hu/huge-pages.json) — huge-pages
- [Latency Budget](../data/nodes/la/latency-budget.json) — latency-budget
- [Latency Jitter](../data/nodes/la/latency-jitter.json) — latency-jitter
- [Lock-Free Programming](../data/nodes/lo/lock-free-programming.json) — lock-free-programming
- [Low-Latency Systems Engineering](../data/nodes/lo/low-latency-systems-engineering.json) — low-latency-systems-engineering
- [Memory Preallocation](../data/nodes/me/memory-preallocation.json) — memory-preallocation
- [Multiple-Producer Multiple-Consumer Queue](../data/nodes/mp/mpmc-queue.json) — mpmc-queue
- [Object Pooling](../data/nodes/ob/object-pooling.json) — object-pooling
- [perf](../data/nodes/pe/perf.json) — perf
- [Real-Time Scheduling](../data/nodes/re/real-time-scheduling.json) — real-time-scheduling
- [Ring Buffer](../data/nodes/ri/ring-buffer.json) — ring-buffer
- [Single-Producer Single-Consumer Queue](../data/nodes/sp/spsc-queue.json) — spsc-queue
- [Tail Latency](../data/nodes/ta/tail-latency.json) — tail-latency
- [Wait-Free Programming](../data/nodes/wa/wait-free-programming.json) — wait-free-programming

既有扩写：[NUMA](../data/nodes/nu/numa.json)、[Cache Coherence](../data/nodes/ca/cache-coherence.json)、[Compare-and-Swap](../data/nodes/ca/cas.json)、[Zero Copy](../data/nodes/ze/zero-copy.json)、[io_uring](../data/nodes/io/io-uring.json)、[epoll](../data/nodes/ep/epoll.json)、[Latency](../data/nodes/la/latency.json)、[Throughput](../data/nodes/th/throughput.json)、[Spinlock](../data/nodes/sp/spinlock.json)、[Mutual Exclusion Lock](../data/nodes/mu/mutex.json)。

本分支正文引用 48 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### 低延迟网络数据路径、网卡队列与时钟测量（新增 28，扩写 10）

内容主线：Ethernet → NIC/SmartNIC → DMA/队列 → RSS/NAPI/中断合并 → socket 或条件化内核旁路后端；XDP/AF_XDP、DPDK、netmap、OpenOnload/ef_vi：分别说明接口层、协议栈与驱动模式；IP multicast → IPv4 IGMPv3；不把组成员管理当作可靠传输或组播路由；NTP/PTP → 时钟偏移与漂移 → LinuxPTP/PHC → 硬件时间戳；本机 monotonic/TSC 单独测区间；ethtool 能力查询与队列调参 → 指定采集位置的延迟测量 → 交易所托管的物理路径边界；TCP/UDP 与 socket → 观测点和抓包 → libpcap/Npcap → pcap/pcapng → Wireshark；与低延迟路径和时钟测量相接。。

新增：

- [AF_XDP](../data/nodes/af/af-xdp.json) — af-xdp
- [Clock Drift](../data/nodes/cl/clock-drift.json) — clock-drift
- [Clock Offset](../data/nodes/cl/clock-offset.json) — clock-offset
- [Clock Synchronization](../data/nodes/cl/clock-synchronization.json) — clock-synchronization
- [Direct Memory Access](../data/nodes/dm/dma.json) — dma
- [DPDK](../data/nodes/dp/dpdk.json) — dpdk
- [ef_vi](../data/nodes/ef/ef-vi.json) — ef-vi
- [ethtool](../data/nodes/et/ethtool.json) — ethtool
- [Exchange Colocation](../data/nodes/ex/exchange-colocation.json) — exchange-colocation
- [Hardware Timestamping](../data/nodes/ha/hardware-timestamping.json) — hardware-timestamping
- [IGMP](../data/nodes/ig/igmp.json) — igmp
- [Interrupt Coalescing](../data/nodes/in/interrupt-coalescing.json) — interrupt-coalescing
- [IP Multicast](../data/nodes/ip/ip-multicast.json) — ip-multicast
- [Kernel Bypass](../data/nodes/ke/kernel-bypass.json) — kernel-bypass
- [libpcap](../data/nodes/li/libpcap.json) — libpcap
- [LinuxPTP](../data/nodes/li/linuxptp.json) — linuxptp
- [Monotonic Clock](../data/nodes/mo/monotonic-clock.json) — monotonic-clock
- [NAPI](../data/nodes/na/napi.json) — napi
- [netmap](../data/nodes/ne/netmap.json) — netmap
- [Network Interface Card](../data/nodes/ne/network-interface-card.json) — network-interface-card
- [Npcap](../data/nodes/np/npcap.json) — npcap
- [OpenOnload](../data/nodes/op/openonload.json) — openonload
- [pcap File Format](../data/nodes/pc/pcap-format.json) — pcap-format
- [pcapng File Format](../data/nodes/pc/pcapng-format.json) — pcapng-format
- [Precision Time Protocol](../data/nodes/pt/ptp.json) — ptp
- [Receive Side Scaling](../data/nodes/re/receive-side-scaling.json) — receive-side-scaling
- [SmartNIC](../data/nodes/sm/smartnic.json) — smartnic
- [Time Stamp Counter](../data/nodes/ts/tsc.json) — tsc

既有扩写：[Ethernet](../data/nodes/et/ethernet.json)、[NTP](../data/nodes/nt/ntp.json)、[XDP](../data/nodes/xd/xdp.json)、[eBPF](../data/nodes/eb/ebpf.json)、[Interrupt](../data/nodes/in/interrupt.json)、[Transmission Control Protocol](../data/nodes/tc/tcp.json)、[User Datagram Protocol](../data/nodes/ud/udp.json)、[Network Socket](../data/nodes/so/socket.json)、[Packet Capture](../data/nodes/pa/packet-capture.json)、[Wireshark](../data/nodes/wi/wireshark.json)。

本分支正文引用 60 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### 高频交易研究、回测与市场仿真（新增 20，扩写 6）

内容主线：时点可用数据与历史证券集合 → 前视/幸存者偏差控制 → 样本外和滚动验证；事件驱动回测 → 确定性调度与历史行情重放 → 交易所仿真 → 排队、延迟和部分成交；成交记录与费用 → 滑点/交易成本 → markout 与交易成本分析；订单簿事件 → OFI、Hawkes、queue-reactive；库存与冲击假设 → Avellaneda–Stoikov / Almgren–Chriss；HftBacktest、ABIDES、QuantConnect LEAN、NautilusTrader → 各自实现的研究和仿真机制。

新增：

- [ABIDES](../data/nodes/ab/abides.json) — abides
- [Almgren–Chriss Model](../data/nodes/al/almgren-chriss-model.json) — almgren-chriss-model
- [Avellaneda–Stoikov Model](../data/nodes/av/avellaneda-stoikov-model.json) — avellaneda-stoikov-model
- [Backtest Overfitting](../data/nodes/ba/backtest-overfitting.json) — backtest-overfitting
- [Deterministic Replay](../data/nodes/de/deterministic-replay.json) — deterministic-replay
- [Event-driven Backtesting](../data/nodes/ev/event-driven-backtesting.json) — event-driven-backtesting
- [Exchange Simulator](../data/nodes/ex/exchange-simulator.json) — exchange-simulator
- [Hawkes Process](../data/nodes/ha/hawkes-process.json) — hawkes-process
- [HftBacktest](../data/nodes/hf/hftbacktest.json) — hftbacktest
- [Historical Market Data Replay](../data/nodes/hi/historical-market-data-replay.json) — historical-market-data-replay
- [Markout](../data/nodes/ma/markout.json) — markout
- [NautilusTrader](../data/nodes/na/nautilus-trader.json) — nautilus-trader
- [Order Flow Imbalance](../data/nodes/or/order-flow-imbalance.json) — order-flow-imbalance
- [Point-in-time Data](../data/nodes/po/point-in-time-data.json) — point-in-time-data
- [LEAN Algorithmic Trading Engine](../data/nodes/qu/quantconnect-lean.json) — quantconnect-lean
- [Queue Position Model](../data/nodes/qu/queue-position-model.json) — queue-position-model
- [Queue-reactive Model](../data/nodes/qu/queue-reactive-model.json) — queue-reactive-model
- [Survivorship Bias](../data/nodes/su/survivorship-bias.json) — survivorship-bias
- [Transaction Cost Analysis](../data/nodes/tr/transaction-cost-analysis.json) — transaction-cost-analysis
- [Walk-forward Validation](../data/nodes/wa/walk-forward-validation.json) — walk-forward-validation

既有扩写：[Backtesting](../data/nodes/ba/backtesting.json)、[Look-Ahead Bias](../data/nodes/lo/look-ahead-bias.json)、[Out-of-Sample Validation](../data/nodes/ou/out-of-sample-validation.json)、[Transaction Cost](../data/nodes/tr/transaction-cost.json)、[Slippage](../data/nodes/sl/slippage.json)、[Quantitative Factor](../data/nodes/qu/quantitative-factor.json)。

本分支正文引用 39 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### 交易风险、市场完整性与辖区监管控制（新增 23，扩写 1）

内容主线：市场接入与算法治理 → 交易前风险检查 → 授信、持仓、价格数量和消息速率控制；运行中异常 → 紧急撤单与断线撤单 → 成交回报副本、审计记录与对账；虚假报单与分层操纵 → 订单全生命周期监控 → 报撤成交比与证据复核；市场波动控制 → 市场级熔断、单证券LULD价格带与交易暂停；做市库存风险 → 报价与持仓边界；金融对冲 → 协方差与回归估计；美国15c3-5、欧盟MiFID II/RTS6及现行业务时钟、中国证券与期货程序化交易规则按辖区分开。

新增：

- [Audit Trail](../data/nodes/au/audit-trail.json) — audit-trail
- [Best Execution](../data/nodes/be/best-execution.json) — best-execution
- [Cancel on Disconnect](../data/nodes/ca/cancel-on-disconnect.json) — cancel-on-disconnect
- [China Program Trading Supervision](../data/nodes/ch/china-program-trading-supervision.json) — china-program-trading-supervision
- [Credit Limit](../data/nodes/cr/credit-limit.json) — credit-limit
- [Drop Copy](../data/nodes/dr/drop-copy.json) — drop-copy
- [EU Algorithmic Trading Controls](../data/nodes/eu/eu-algorithmic-trading-controls.json) — eu-algorithmic-trading-controls
- [EU Business Clock Synchronization](../data/nodes/eu/eu-business-clock-synchronization.json) — eu-business-clock-synchronization
- [Fat-finger Check](../data/nodes/fa/fat-finger-check.json) — fat-finger-check
- [Inventory Risk](../data/nodes/in/inventory-risk.json) — inventory-risk
- [Limit Up-Limit Down](../data/nodes/li/limit-up-limit-down.json) — limit-up-limit-down
- [Market Circuit Breaker](../data/nodes/ma/market-circuit-breaker.json) — market-circuit-breaker
- [Market Surveillance](../data/nodes/ma/market-surveillance.json) — market-surveillance
- [Order Layering](../data/nodes/or/order-layering.json) — order-layering
- [Order Rate Limits](../data/nodes/or/order-rate-limits.json) — order-rate-limits
- [Order Spoofing](../data/nodes/or/order-spoofing.json) — order-spoofing
- [Order-to-trade Ratio](../data/nodes/or/order-to-trade-ratio.json) — order-to-trade-ratio
- [Position Limit](../data/nodes/po/position-limit.json) — position-limit
- [Pre-trade Risk Control](../data/nodes/pr/pre-trade-risk-control.json) — pre-trade-risk-control
- [Self-trade Prevention](../data/nodes/se/self-trade-prevention.json) — self-trade-prevention
- [Trading Halt](../data/nodes/tr/trading-halt.json) — trading-halt
- [Trading Kill Switch](../data/nodes/tr/trading-kill-switch.json) — trading-kill-switch
- [US Market Access Rule](../data/nodes/us/us-market-access-rule.json) — us-market-access-rule

既有扩写：[Hedging](../data/nodes/he/hedging.json)。

本分支正文引用 46 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### 交易所、行情供应商与量化机构（新增 16，扩写 5）

内容主线：Nasdaq, Inc.；Nasdaq TotalView；CME Group；CME Globex；NYSE Pillar；Bloomberg B-PIPE；LSEG Real-Time – Direct；Citadel Securities Equities Services；MetaBit Platform。

新增：

- [Bloomberg B-PIPE](../data/nodes/bl/bloomberg-b-pipe.json) — bloomberg-b-pipe
- [Bloomberg L.P.](../data/nodes/bl/bloomberg-company.json) — bloomberg-company
- [Cboe BZX Equities Market](../data/nodes/cb/cboe-bzx-market.json) — cboe-bzx-market
- [Cboe Global Markets](../data/nodes/cb/cboe-global-markets.json) — cboe-global-markets
- [Citadel Securities](../data/nodes/ci/citadel-securities.json) — citadel-securities
- [Citadel Securities Equities Services](../data/nodes/ci/citadel-securities-equities-services.json) — citadel-securities-equities-services
- [CME Globex](../data/nodes/cm/cme-globex.json) — cme-globex
- [CME Group](../data/nodes/cm/cme-group.json) — cme-group
- [Intercontinental Exchange](../data/nodes/in/intercontinental-exchange.json) — intercontinental-exchange
- [KX](../data/nodes/kx/kx.json) — kx
- [London Stock Exchange Group](../data/nodes/ls/lseg.json) — lseg
- [LSEG Real-Time – Direct](../data/nodes/ls/lseg-realtime-direct.json) — lseg-realtime-direct
- [Nasdaq, Inc.](../data/nodes/na/nasdaq.json) — nasdaq
- [Nasdaq TotalView](../data/nodes/na/nasdaq-totalview.json) — nasdaq-totalview
- [New York Stock Exchange](../data/nodes/ne/new-york-stock-exchange.json) — new-york-stock-exchange
- [NYSE Pillar](../data/nodes/ny/nyse-pillar.json) — nyse-pillar

既有扩写：[Citadel](../data/nodes/ci/citadel.json)、[Jane Street](../data/nodes/ja/jane-street.json)、[Two Sigma](../data/nodes/tw/two-sigma.json)、[Metabit](../data/nodes/me/metabit.json)、[MetaBit Platform](../data/nodes/me/metabit-platform.json)。

本分支正文引用 41 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### 电子交易软件、数据工具与并发库（新增 10，扩写 3）

内容主线：FIX Protocol；FIX Session Protocol；QuickFIX；QuickFIX/J；Fix8；kdb+；q；K；Bloomberg BLPAPI；Aeron；Agrona；LMAX Disruptor；Chronicle Queue；Jane Street Core；OCaml。

新增：

- [Aeron](../data/nodes/ae/aeron.json) — aeron
- [Agrona](../data/nodes/ag/agrona.json) — agrona
- [Bloomberg BLPAPI](../data/nodes/bl/blpapi.json) — blpapi
- [Chronicle Queue](../data/nodes/ch/chronicle-queue.json) — chronicle-queue
- [Fix8](../data/nodes/fi/fix8.json) — fix8
- [K](../data/nodes/k-/k-array-language.json) — k-array-language
- [kdb+](../data/nodes/kd/kdb-plus.json) — kdb-plus
- [LMAX Disruptor](../data/nodes/lm/lmax-disruptor.json) — lmax-disruptor
- [QuickFIX](../data/nodes/qu/quickfix.json) — quickfix
- [QuickFIX/J](../data/nodes/qu/quickfixj.json) — quickfixj

既有扩写：[q](../data/nodes/k-/k-lang.json)、[Jane Street Core](../data/nodes/ja/jane-street-core.json)、[OCaml](../data/nodes/oc/ocaml.json)。

本分支正文引用 35 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

## 分类与身份

本体 86 → 92（0.14.0）、领域 66 → 71（0.8.0）、生态 89 → 93（0.6.0）。新增四个概念分类、交易规范分类及市场指标分类、五个领域、四个子生态；类型 Schema 保持 3.5.1，二十九种关系和十个宏观生态根不变。分类与身份决策见 [ADR-0031](decisions/0031-hft-and-electronic-trading.md)。

通用撮合引擎、OMS、EMS、订单网关和模拟机制是 concept，具体软件、交易场所和商业数据服务分别建档。报价对、盘口深度、排队位置、markout、OFI 与执行价格或成本指标有独立口径；订单规则参数不冒充普遍可比较的绩效指标。

既有 k-lang 保持稳定 id，明确为 q 语言；K 数组语言和 kdb+ 产品分别建档，删除错误共享别名及无依据的精确发布日期。OCaml 首次 1.00 公告日期按创始人一手说明纠正。Citadel 与 Citadel Securities 各有组织身份，不推导母子关系；Metabit Platform 明确为内部投研系统，供应商历史案例中的技术选择不记为所有部署的硬依赖。

io_uring 和 epoll 明确为具体 Linux API/ABI 规范，挂 api-specification、抽象层 kernel_os；具体接口、内核机制与库包装各有边界。原 RSS 订阅协议、Lean 证明语言和服务熔断概念保持原义，新网络或金融含义采用限定 id。通用低延迟生态仅继承操作系统、网络和硬件根，实际金融成员按事实另行声明金融生态。

## 来源与适用范围

- HFT、算法交易与电子交易有不同范围。[MiFID II 定义](https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mifid-ii/article-4-definitions)的同时满足条件与 [ESMA 2026 年监管说明](https://www.esma.europa.eu/sites/default/files/2026-02/ESMA74-1505669079-10311_Supervisory_Briefing_on_Algorithmic_Trading_in_the_EU.pdf)分别引用；非约束性说明不当成新法，也不建立所有 HFT 的 FPGA、AI 或语言硬依赖。
- ITCH 与 OUCH 分别承担行情和订单入口；FIX 业务、经典会话、FIXP、SBE 和 FAST 各有身份。商业 TotalView 产品与 ITCH 消息规范分开。MBO、MBP、top-of-book 和 BBO 指标有不同粒度；行情序号、快照、重置和恢复均按源与会话作用域解释。
- 订单取消请求与取消成功、TCP 传输确认与业务接受不同。Post-Only 等指令按场所解释，[Nasdaq 官方说明](https://nasdaqtrader.com/content/ProductsServices/Trading/postonly_factsheet.pdf)中的特定执行路径不被泛化为全部市场保证。
- CPU 绑定不等于隔离或独占；CAS 不保证算法无锁，无锁不保证每次操作有界完成，无等待步骤上限不等于墙钟期限。尾分位数、延迟抖动、协调遗漏和端到端事件边界分开记录，零复制注明路径和所有权成本。
- UDP 不保证可靠交付、顺序或时延；TCP 规范不要求实现只能在内核。socket 身份考虑地址族、连接对端及命名空间。报文采集注明观测点、截取长度、丢包及卸载影响，时间戳单位不证明采集精度或 UTC 同步。pcap 与 pcapng 文档按检索时的 IETF 草案状态说明。
- 回测注明当时可获得信息、费用、时延、队列与成交假设。历史回放无法无条件模拟新增策略对市场的反馈；AS/AC、Hawkes 与 queue-reactive 模型有各自假设，不作为普遍市场定律。框架的实际支持范围使用当前官方资料，不将旧版本限制误作永久能力边界。
- 美国 [Market Access Rule FAQ](https://www.sec.gov/rules-regulations/staff-guidance/trading-markets-frequently-asked-questions/divisionsmarketregfaq-0)按经纪商接入责任限定；已撤回的 Reg AT 不作现行规则。部分最小报价单位与接入费上限修订的合规期限依据 [SEC 2026-06-11 命令](https://www.sec.gov/files/rules/exorders/2026/34-105656.pdf)已延至 2027 年 11 月首个营业日，延期范围和其他待审提案分开。
- 欧盟 [2025/1155](https://eur-lex.europa.eu/eli/reg_del/2025/1155/oj/eng) 的新时钟规定自 2026-03-02 生效，HFT 相关 UTC 偏差和时间戳粒度要求分别说明；旧 RTS 25 数字不作为欧盟现行要求，英国规则另行限定。中国证券 [程序化交易细则](https://www.sse.com.cn/lawandrules/sselawsrules2025/trade/universal/c/c_20250612_10781696.shtml)注明单账户、申报加撤单和证券市场范围，不套用为全部期货市场的阈值。
- LULD 日间现行保护与 [2026-08-05 批准的隔夜修订](https://www.sec.gov/files/rules/sro/nms/2026/34-106042.pdf)分别记录。隔夜路线预计 2026-12-06 实施，截至复核日尚未启用，其触带机制也不与日间 Trading Pause 混写。

## 关系审阅

九个分支均经过作者自查及独立只读交叉审阅，问题由所属作者修正。uses 保留实际调用或采用场景；能力、效应和模型应用任务不冒充使用者。分类、实现、治理、提供、约束与组成分开，组织归属只记录有依据的直接关系，集团服务交付在 context 中明确范围。可选集成不作为普遍硬依赖。

## 验证

- 全库校验通过，零错误、零警告。全部 192 个新增节点具有非分类入边或出边；全部 229 篇新增/扩写正文含至少三个实质段落和两个直接来源，并使用本批日期与 ai_draft。
- 完整生产构建通过，生成统一版本的数据、索引、正文、Rust/WASM、静态站点与完整离线资源清单。
- 21 项单测、8 项 Chromium 测试与 web/tools TypeScript 检查通过。浏览器覆盖 WASM、初始化失败回退和 Service Worker 离线流程。
- 实际构建产物在 JS 与真实 WASM 两个后端验证 192 个新增 ID 搜索、229 篇摘要/正文/邻域读取及 806 次名称、别名和缩写查询，搜索与邻域结果一致。查询包括 HFT/高频交易、q/K/kdb+ 和 RSS/Lean 同名消歧。
- 离线资源：425 项，15679276 字节；发布版本：`ef5ff58a7adc`。
- 数据快照：`421fc2cb278481a2ba868cb202535a2440e3e40830cb4e571d0d6fa354644298`。

## 一手资料入口

交易所、数据与消息规范使用 Nasdaq、CME、NYSE、Cboe、FIX Trading Community 及厂商官方资料；研究模型使用原始论文和软件项目文档。通用系统与网络使用 Linux 官方机制文档、man-pages、IETF RFC/草案及对应项目仓库。监管节点采用现行官方规则、正式批准与延期文件，避免仅据新闻摘要判断效力。组织和产品使用公司官方说明或原厂用户案例，具体来源保存在各节点正文。
