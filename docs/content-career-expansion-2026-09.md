# 2026-09-20 职业、量化与公司内容续补

承接[招聘与求职内容补充](content-recruitment-2026-09.md)，本批新增 38 个词条、完善 17 个已有词条，新增 91 条非分类关系。数据词条从 1,430 增至 1,468，本体分类从 43 增至 46，关系类型从 27 增至 29。

新增词条均包含摘要、正文、中文与英文检索入口、分类、资料来源及非分类邻域。新撰写内容保留 ai_draft 标记，核对日期为 2026-09-20。岗位技术关系按工作场景限定；公司公开流程作为实例，不推广为统一招聘、薪酬或职业政策。

## 软件、数据与量化岗位（5）

- [软件工程师 SWE／SDE](../data/nodes/so/software-engineer.json)：统一常见软件开发头衔的检索入口，解释工作范围与头衔差异。
- [数据科学家 DS](../data/nodes/da/data-scientist.json)：数据分析、统计与模型验证。
- [数据分析师 DA](../data/nodes/da/data-analyst.json)：指标口径、业务分析及结果沟通。
- [机器学习工程师 MLE](../data/nodes/ma/machine-learning-engineer.json)：模型构建、评估、工程交付与生产运行。
- [量化交易员 QT](../data/nodes/qu/quantitative-trader.json)：交易决策、执行反馈和风险管理，说明与 QR／QD 的分工重叠。

同时为 DBA、QA、嵌入式工程师、安全工程师、产品经理、软件架构师和 SRE 补齐正文、来源和实际工作中的技术关系。职业岗位分类现有 23 个词条，全部具有正文与来源，并可从 JD 访问。

## 量化研究与指标（8）

- [量化因子](../data/nodes/qu/quantitative-factor.json)
- [回测](../data/nodes/ba/backtesting.json)
- [样本外验证 OOS](../data/nodes/ou/out-of-sample-validation.json)
- [前视偏差](../data/nodes/lo/look-ahead-bias.json)
- [交易成本](../data/nodes/tr/transaction-cost.json)
- [滑点](../data/nodes/sl/slippage.json)
- [最大回撤 MDD](../data/nodes/ma/maximum-drawdown.json)
- [夏普比率](../data/nodes/sh/sharpe-ratio.json)

QR 连接因子、回测与样本外验证；QD 连接限定于研究平台开发场景的回测。回测连接成本、滑点和两项指标，前视偏差通过 can_bias 表达可能造成的结果失真。

最大回撤和夏普比率使用 metric 类型。正文明确净值、观察区间、频率、符号、基准收益、标准差和年化假设等计算口径；风险因子与预测信号、样本外测试与反复调参、滑点与费用不混为一项。

## 招聘参与者与机制（6）

- [招聘专员 Recruiter](../data/nodes/re/recruiter.json)
- [用人经理 HM](../data/nodes/hi/hiring-manager.json)
- [候选人跟踪系统 ATS](../data/nodes/ap/applicant-tracking-system.json)
- [团队匹配](../data/nodes/te/team-matching.json)
- [录用评审](../data/nodes/hi/hiring-review.json)
- [招聘背景调查](../data/nodes/em/employment-background-check.json)

Recruiter 与 HM 按实际职责分开；ATS 表示软件类别，不推断统一的自动筛选方式。团队匹配引用 Snowflake 与 Roblox 的公开说明，明确发生时间可以不同。录用评审、编制或薪酬审批以及背景调查不推导为固定顺序，也不单凭其中一个环节推断录用。

背景调查正文区分法域，EEOC 与 FTC 的资料仅作为美国语境的规则实例。

## 薪酬组成与权益（5）

- [基本工资 Base Salary](../data/nodes/ba/base-salary.json)
- [薪酬奖金 Bonus](../data/nodes/co/compensation-bonus.json)
- [签约奖金 Sign-on Bonus](../data/nodes/si/sign-on-bonus.json)
- [限制性股票单位 RSU](../data/nodes/re/restricted-stock-unit.json)
- [股权归属 Vesting](../data/nodes/eq/equity-vesting.json)

为原有[员工期权](../data/nodes/st/stock-option.json)补充完整正文，区分授予、归属、行权和出售，修正摘要中容易被误读为统一回购机制的表述。

[薪酬包](../data/nodes/to/total-compensation.json)增加 TC 缩写，并连接适用的薪酬组成；[薪酬协商](../data/nodes/sa/salary-negotiation.json)连接相应沟通内容。一次性签约奖金、目标奖金和权益估值不能直接视为持续、保证的现金收入。原有 compensation（肌肉代偿）节点完全保留。

## 入职与职业发展（9）

- [入职适应 Onboarding](../data/nodes/em/employee-onboarding.json)
- [实习转正](../data/nodes/in/internship-conversion.json)
- [试用期](../data/nodes/em/employment-probation.json)
- [内部转岗](../data/nodes/in/internal-transfer.json)
- [绩效评估](../data/nodes/pe/performance-review.json)
- [晋升](../data/nodes/ca/career-promotion.json)
- [个人贡献者 IC](../data/nodes/in/individual-contributor.json)
- [工程经理 EM](../data/nodes/en/engineering-manager.json)
- [职业双通道](../data/nodes/ca/career-dual-ladder.json)

入职适应、实习转正和通过试用期分别定义。试用期正文明确中国大陆劳动合同语境，未规定跨地区统一期限。内部转岗与晋升、绩效评估与成长潜力也分别说明。

职业双通道通过职级以及 IC、EM 的实际职业规划和辅导场景连入图谱；IC 不等于初级岗位，也不表示没有领导责任。转为人员管理意味着职责变化，不是唯一的专业成长终点。

## 企业主体、产品与合称（5）

- [Alphabet](../data/nodes/al/alphabet.json)
- [XXVI Holdings](../data/nodes/xx/xxvi-holdings.json)
- [Facebook 产品](../data/nodes/fa/facebook-platform.json)
- [Netflix 公司](../data/nodes/ne/netflix.json)
- [FAANG](../data/nodes/fa/faang-facebook-apple-amazon-netflix-google.json)

移除 Google 的错误别名 Alphabet，同时保留 Google 的 id 与既有关系。Google 的原始重组说明见[官方公告](https://blog.google/alphabet/google-alphabet/)；近期控股链参考 [FCC 2026 年公开通知第 4 页](https://docs.fcc.gov/public/attachments/DA-26-155A1.pdf)与 [Alphabet 2025 年末主要子公司清单](https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/googexhibit2101q42025.htm)。

subsidiary_of 只记录直接母子公司关系：Google → XXVI Holdings → Alphabet。FCC 文件中控股信息的基准日为 2025-04-25，正文和关系 context 均明确记录；不能把 2015 年重组时的直接关系直接当作后续控股层级。

Meta 通过 provides 连接 Facebook 产品；Facebook 公司旧名保留在 Meta 的别名中。Facebook 搜索同时呈现公司与产品，结合类型和副名辨认。

FAANG 沿用 Facebook、Apple、Amazon、Netflix、Google 的历史展开，按金融语境将 G 连接至上市主体 Alphabet，并说明 Google 的控股层级。FLAG 仍连接 Meta、LinkedIn 公司、Amazon、Google。各合称独立解释，成员不混合，不因公司更名自动制造新的简称。

## 分类、关系与检索

新增“职业发展”“量化研究概念”“量化绩效指标”三个分类。新增 subsidiary_of（母公司／子公司）和 can_bias（可能引入偏差／偏差来源）两种关系，均要求非空 context；规范方向与类型边界见 [ADR-0024](decisions/0024-career-quant-and-company-boundaries.md)。

SWE／SDE、DS、DA、MLE、QT、IC、EM、HM、ATS、RSU、TC、OOS、MDD 与 FAANG 均可检索。QT 保留原有 Qt 框架结果；JD 也继续保留京东与职位描述两个语境。OC、QR、QD、BAT、FLAG 等上一批检索入口继续通过检查。

## 验证

- 全量 pnpm build 通过：1,468 个数据节点、46 个本体分类、64 个生态、29 个关系类型、2,901 条边、112 个静态页面。
- 调用实际前端 search、loadDesc 和 rowsOf，完成 315 项检索断言、55 项正文加载检查、91 条新增非分类关系的正反向检查。
- 验证全部 38 个新词条都有非分类邻域，全部 23 个岗位都有正文、资料来源及 JD 反向入口。
- 验证三类新导航页及职业岗位页的成员数量，以及最大回撤和夏普比率的 metric 类型。
- 43 个隔离 CLI 场景通过：保留上一批 24 个场景，新增 19 个场景覆盖两种新关系的有效输入、类型边界、缺失或非法 context、死边、禁止本体目标及自环。
- 对照本批开始前的 1,430 节点快照，1,413 个未涉及节点完全一致，全部既有节点与关系保留。唯一移除的既有别名为 Google 节点中的 Alphabet，该主体已独立建档。
- git diff --check 通过。

本批的临时创作脚本、快照和验证报告位于被 Git 忽略的 scratch/career-continuation；正式交付为数据、契约、前端关系标签与本记录。
