# 2026-10-08 scc、tokei 与软件度量内容补全

本批基线为 3027 个数据节点。检索 ID、名称、缩写、别名及正文，没有发现 scc 或 tokei；已有静态分析、Git 和测试条目仍缺少源码计数、软件指标、仓库演化、质量分析、覆盖与变异测试、实证研究及度量解释的连续路径。

新增 238 个节点、更新既有 10 个，全图增至 3265 个数据节点。全图关系边 9009 条，其中分类挂载 3317 条，其余 5692 条；反向查询索引不重复计数，本体 parents 单独存储。本批新增 457 条非分类关系、删除 8 条既有关系。正文引用 349 个不同的一手资料 URL，按完整 URL 去重，不代表独立机构数。非空 description 从 1962 增至 2208。所有触及节点保留 ai_draft 与 2026-10-08 复核日期。

## 七条内容路径及完整节点清单

### 源码计数工具、规模与计数口径（新增 31，更新 0）

内容主线：scc/tokei/cloc → 代码、注释与空行 → 物理和逻辑行 → 唯一行与重复文件 → 输入筛选与嵌入语言 → 快照差分与模型估算。

新增：

- [Blank Lines of Code](../data/nodes/bl/blank-lines-of-code.json) — blank-lines-of-code
- [Count Lines of Code](../data/nodes/cl/cloc.json) — cloc
- [Code Count Snapshot](../data/nodes/co/code-count-snapshot.json) — code-count-snapshot
- [Code Line Counting](../data/nodes/co/code-line-counting.json) — code-line-counting
- [Comment-aware Source Counting](../data/nodes/co/comment-aware-counting.json) — comment-aware-counting
- [Comment Density](../data/nodes/co/comment-density.json) — comment-density
- [Comment Lines of Code](../data/nodes/co/comment-lines-of-code.json) — comment-lines-of-code
- [Duplicate File Filtering](../data/nodes/du/duplicate-file-filtering.json) — duplicate-file-filtering
- [Embedded Language Counting](../data/nodes/em/embedded-language-counting.json) — embedded-language-counting
- [Generated Source Code](../data/nodes/ge/generated-source-code.json) — generated-source-code
- [GNU wc](../data/nodes/gn/gnu-wc.json) — gnu-wc
- [gocloc](../data/nodes/go/gocloc.json) — gocloc
- [loc (Code Counter)](../data/nodes/lo/loc-code-counter.json) — loc-code-counter
- [loccount](../data/nodes/lo/loccount.json) — loccount
- [scc LOCOMO Cost Estimation](../data/nodes/lo/locomo-cost-estimation.json) — locomo-cost-estimation
- [Logical Lines of Code](../data/nodes/lo/logical-lines-of-code.json) — logical-lines-of-code
- [Minified Source Code](../data/nodes/mi/minified-source-code.json) — minified-source-code
- [Ohcount](../data/nodes/oh/ohcount.json) — ohcount
- [Physical Lines of Code](../data/nodes/ph/physical-lines-of-code.json) — physical-lines-of-code
- [Polyglot (Code Counter)](../data/nodes/po/polyglot-code-counter.json) — polyglot-code-counter
- [Sloc, Cloc and Code](../data/nodes/sc/scc.json) — scc
- [scc DRYness](../data/nodes/sc/scc-dryness.json) — scc-dryness
- [sloc (Code Counter)](../data/nodes/sl/sloc-code-counter.json) — sloc-code-counter
- [SLOCCount](../data/nodes/sl/sloccount.json) — sloccount
- [Source Count Diff](../data/nodes/so/source-count-diff.json) — source-count-diff
- [Source Counting Scope](../data/nodes/so/source-counting-scope.json) — source-counting-scope
- [Source File Count](../data/nodes/so/source-file-count.json) — source-file-count
- [Source Lines of Code](../data/nodes/so/source-lines-of-code.json) — source-lines-of-code
- [Tokei](../data/nodes/to/tokei.json) — tokei
- [Total Source Lines](../data/nodes/to/total-source-lines.json) — total-source-lines
- [Unique Lines of Code](../data/nodes/un/unique-lines-of-code.json) — unique-lines-of-code

此分支正文引用 40 个不同的一手 URL，逐项事实与来源保存在对应节点。

### 复杂度、可维护性、面向对象与估算（新增 44，更新 0）

内容主线：控制流与词法复杂度 → Halstead/ABC → 可维护性与类/包指标 → 功能规模 → COCOMO → 投入单位与相对估算。

新增：

- [ABC Software Metric](../data/nodes/ab/abc-metric.json) — abc-metric
- [Afferent Coupling](../data/nodes/af/afferent-coupling.json) — afferent-coupling
- [CK](../data/nodes/ck/ck-java-metrics.json) — ck-java-metrics
- [Chidamber–Kemerer Metrics Suite](../data/nodes/ck/ck-metrics.json) — ck-metrics
- [Constructive Cost Model](../data/nodes/co/cocomo.json) — cocomo
- [Constructive Cost Model II](../data/nodes/co/cocomo-ii.json) — cocomo-ii
- [Cognitive Complexity](../data/nodes/co/cognitive-complexity.json) — cognitive-complexity
- [COSMIC Functional Size](../data/nodes/co/cosmic-functional-size.json) — cosmic-functional-size
- [COSMIC Functional Size Measurement](../data/nodes/co/cosmic-sizing.json) — cosmic-sizing
- [Coupling Between Objects](../data/nodes/co/coupling-between-objects.json) — coupling-between-objects
- [Cyclomatic Complexity](../data/nodes/cy/cyclomatic-complexity.json) — cyclomatic-complexity
- [Depth of Inheritance Tree](../data/nodes/de/depth-of-inheritance-tree.json) — depth-of-inheritance-tree
- [Distance from Main Sequence](../data/nodes/di/distance-from-main-sequence.json) — distance-from-main-sequence
- [Efferent Coupling](../data/nodes/ef/efferent-coupling.json) — efferent-coupling
- [Essential Complexity](../data/nodes/es/essential-complexity.json) — essential-complexity
- [Software Fan-In](../data/nodes/fa/fan-in.json) — fan-in
- [Software Fan-Out](../data/nodes/fa/fan-out.json) — fan-out
- [Function Point Analysis](../data/nodes/fu/function-point-analysis.json) — function-point-analysis
- [Function Points](../data/nodes/fu/function-points.json) — function-points
- [Halstead Difficulty](../data/nodes/ha/halstead-difficulty.json) — halstead-difficulty
- [Halstead Effort](../data/nodes/ha/halstead-effort.json) — halstead-effort
- [Halstead Metrics](../data/nodes/ha/halstead-metrics.json) — halstead-metrics
- [Halstead Volume](../data/nodes/ha/halstead-volume.json) — halstead-volume
- [JDepend](../data/nodes/jd/jdepend.json) — jdepend
- [Lack of Cohesion of Methods](../data/nodes/la/lack-of-cohesion-of-methods.json) — lack-of-cohesion-of-methods
- [Loose Class Cohesion](../data/nodes/lo/loose-class-cohesion.json) — loose-class-cohesion
- [Maintainability Index](../data/nodes/ma/maintainability-index.json) — maintainability-index
- [NDepend](../data/nodes/nd/ndepend.json) — ndepend
- [NPath Complexity](../data/nodes/np/npath-complexity.json) — npath-complexity
- [Number of Children](../data/nodes/nu/number-of-children.json) — number-of-children
- [Package Abstractness](../data/nodes/pa/package-abstractness.json) — package-abstractness
- [Package Instability](../data/nodes/pa/package-instability.json) — package-instability
- [Person-Month](../data/nodes/pe/person-month.json) — person-month
- [Planning Poker](../data/nodes/pl/planning-poker.json) — planning-poker
- [Response for a Class](../data/nodes/re/response-for-a-class.json) — response-for-a-class
- [Software Cohesion](../data/nodes/so/software-cohesion.json) — software-cohesion
- [Software Complexity Analysis](../data/nodes/so/software-complexity-analysis.json) — software-complexity-analysis
- [Software Coupling](../data/nodes/so/software-coupling.json) — software-coupling
- [Software Effort Estimation](../data/nodes/so/software-effort-estimation.json) — software-effort-estimation
- [Software Size Estimation](../data/nodes/so/software-size-estimation.json) — software-size-estimation
- [Story Points](../data/nodes/st/story-points.json) — story-points
- [Tight Class Cohesion](../data/nodes/ti/tight-class-cohesion.json) — tight-class-cohesion
- [Weighted Methods per Class](../data/nodes/we/weighted-methods-per-class.json) — weighted-methods-per-class
- [Wideband Delphi](../data/nodes/wi/wideband-delphi.json) — wideband-delphi

此分支正文引用 62 个不同的一手 URL，逐项事实与来源保存在对应节点。

### 仓库识别、Git 历史与软件演化（新增 44，更新 2）

内容主线：语言识别与仓库语言份额 → Git 数据取得和历史边界 → churn/hotspot/coupling → 贡献身份与责任 → 仓库采样与缺陷定位 → 分析工具与研究数据。

新增：

- [Bus Factor](../data/nodes/bu/bus-factor.json) — bus-factor
- [Change Frequency](../data/nodes/ch/change-frequency.json) — change-frequency
- [Change Hotspot](../data/nodes/ch/change-hotspot.json) — change-hotspot
- [Change Set Size](../data/nodes/ch/changeset-size.json) — changeset-size
- [Code Age](../data/nodes/co/code-age.json) — code-age
- [Code Churn](../data/nodes/co/code-churn.json) — code-churn
- [Code Maat](../data/nodes/co/code-maat.json) — code-maat
- [Code Ownership](../data/nodes/co/code-ownership.json) — code-ownership
- [CodeScene](../data/nodes/co/codescene.json) — codescene
- [Developer Ownership Share](../data/nodes/de/developer-ownership-share.json) — developer-ownership-share
- [go-enry](../data/nodes/en/enry.json) — enry
- [enry CLI](../data/nodes/en/enry-cli.json) — enry-cli
- [Generated Code Exclusion](../data/nodes/ge/generated-code-exclusion.json) — generated-code-exclusion
- [GH Archive](../data/nodes/gh/gh-archive.json) — gh-archive
- [GHTorrent](../data/nodes/gh/ghtorrent.json) — ghtorrent
- [Git Author and Committer](../data/nodes/gi/git-author-committer.json) — git-author-committer
- [git blame](../data/nodes/gi/git-blame.json) — git-blame
- [git diff](../data/nodes/gi/git-diff.json) — git-diff
- [Git First-Parent History](../data/nodes/gi/git-first-parent.json) — git-first-parent
- [git log](../data/nodes/gi/git-log.json) — git-log
- [Git Mailmap](../data/nodes/gi/git-mailmap.json) — git-mailmap
- [Git Merge Commit](../data/nodes/gi/git-merge-commit.json) — git-merge-commit
- [Git Numstat](../data/nodes/gi/git-numstat.json) — git-numstat
- [Git of Theseus](../data/nodes/gi/git-of-theseus.json) — git-of-theseus
- [Git Partial Clone](../data/nodes/gi/git-partial-clone.json) — git-partial-clone
- [Git Rename Detection](../data/nodes/gi/git-rename-detection.json) — git-rename-detection
- [Git Shallow Clone](../data/nodes/gi/git-shallow-clone.json) — git-shallow-clone
- [git-sizer](../data/nodes/gi/git-sizer.json) — git-sizer
- [Git Attributes](../data/nodes/gi/gitattributes.json) — gitattributes
- [GitHub CODEOWNERS](../data/nodes/gi/github-codeowners.json) — github-codeowners
- [GitHub Linguist](../data/nodes/gi/github-linguist.json) — github-linguist
- [Git Ignore Rules](../data/nodes/gi/gitignore.json) — gitignore
- [GitStats](../data/nodes/gi/gitstats.json) — gitstats
- [Mining Software Repositories](../data/nodes/mi/mining-software-repositories.json) — mining-software-repositories
- [PyDriller](../data/nodes/py/pydriller.json) — pydriller
- [Repository Analysis](../data/nodes/re/repository-analysis.json) — repository-analysis
- [Repository Identity Resolution](../data/nodes/re/repository-identity-resolution.json) — repository-identity-resolution
- [Repository Language Share](../data/nodes/re/repository-language-share.json) — repository-language-share
- [Repository Sampling Bias](../data/nodes/re/repository-sampling-bias.json) — repository-sampling-bias
- [Source Language Detection](../data/nodes/so/source-language-detection.json) — source-language-detection
- [SZZ Algorithm](../data/nodes/sz/szz-algorithm.json) — szz-algorithm
- [SZZ Unleashed](../data/nodes/sz/szz-unleashed.json) — szz-unleashed
- [Temporal Coupling](../data/nodes/te/temporal-coupling.json) — temporal-coupling
- [Vendored Code Exclusion](../data/nodes/ve/vendored-code-exclusion.json) — vendored-code-exclusion

既有更新：[Git](../data/nodes/gi/git.json)、[Git Object Model](../data/nodes/gi/git-object-model.json)。

此分支正文引用 83 个不同的一手 URL，逐项事实与来源保存在对应节点。

### 软件质量、克隆、技术债与质量分析器（新增 44，更新 1）

内容主线：质量属性与技术债 → 异味及克隆检测 → 分析与评估工具 → Sonar 产品和扫描 → 质量门、规则与新代码范围 → 具体语言检查器。

新增：

- [BigCloneBench](../data/nodes/bi/bigclonebench.json) — bigclonebench
- [BigCloneEval](../data/nodes/bi/bigcloneeval.json) — bigcloneeval
- [Checkstyle](../data/nodes/ch/checkstyle.json) — checkstyle
- [Code Clone](../data/nodes/co/code-clone.json) — code-clone
- [Code Clone Detection](../data/nodes/co/code-clone-detection.json) — code-clone-detection
- [Code Duplication Density](../data/nodes/co/code-duplication-density.json) — code-duplication-density
- [Code Smell](../data/nodes/co/code-smell.json) — code-smell
- [Defect Density](../data/nodes/de/defect-density.json) — defect-density
- [Flake8](../data/nodes/fl/flake8.json) — flake8
- [ISO/IEC 25010:2023](../data/nodes/is/iso-iec-25010-2023.json) — iso-iec-25010-2023
- [jscpd](../data/nodes/js/jscpd.json) — jscpd
- [jscpd v4](../data/nodes/js/jscpd-4.json) — jscpd-4
- [jscpd v5](../data/nodes/js/jscpd-5.json) — jscpd-5
- [Lizard](../data/nodes/li/lizard.json) — lizard
- [New Code Period](../data/nodes/ne/new-code-period.json) — new-code-period
- [NiCad](../data/nodes/ni/nicad.json) — nicad
- [PMD](../data/nodes/pm/pmd.json) — pmd
- [PMD CPD](../data/nodes/pm/pmd-cpd.json) — pmd-cpd
- [Pylint](../data/nodes/py/pylint.json) — pylint
- [Quality Gate](../data/nodes/qu/quality-gate.json) — quality-gate
- [Quality Profile](../data/nodes/qu/quality-profile.json) — quality-profile
- [Radon](../data/nodes/ra/radon.json) — radon
- [Remediation Effort](../data/nodes/re/remediation-effort.json) — remediation-effort
- [Ruff](../data/nodes/ru/ruff.json) — ruff
- [Software Maintainability](../data/nodes/so/software-maintainability.json) — software-maintainability
- [Software Quality](../data/nodes/so/software-quality.json) — software-quality
- [Software Quality Evaluation](../data/nodes/so/software-quality-evaluation.json) — software-quality-evaluation
- [SonarQube Cloud](../data/nodes/so/sonarqube-cloud.json) — sonarqube-cloud
- [SonarQube Community Build](../data/nodes/so/sonarqube-community-build.json) — sonarqube-community-build
- [SonarQube Server](../data/nodes/so/sonarqube-server.json) — sonarqube-server
- [SonarScanner CLI](../data/nodes/so/sonarscanner-cli.json) — sonarscanner-cli
- [SourcererCC](../data/nodes/so/sourcerercc.json) — sourcerercc
- [SpotBugs](../data/nodes/sp/spotbugs.json) — spotbugs
- [Static Analysis Baseline](../data/nodes/st/static-analysis-baseline.json) — static-analysis-baseline
- [Static Analysis Rule](../data/nodes/st/static-analysis-rule.json) — static-analysis-rule
- [Static Rule Violation Count](../data/nodes/st/static-rule-violation-count.json) — static-rule-violation-count
- [Syntax-based Clone Detection](../data/nodes/sy/syntax-based-clone-detection.json) — syntax-based-clone-detection
- [Technical Debt](../data/nodes/te/technical-debt.json) — technical-debt
- [Technical Debt Interest](../data/nodes/te/technical-debt-interest.json) — technical-debt-interest
- [Technical Debt Management](../data/nodes/te/technical-debt-management.json) — technical-debt-management
- [Technical Debt Principal](../data/nodes/te/technical-debt-principal.json) — technical-debt-principal
- [Technical Debt Ratio](../data/nodes/te/technical-debt-ratio.json) — technical-debt-ratio
- [Technical Debt Register](../data/nodes/te/technical-debt-register.json) — technical-debt-register
- [Token-based Clone Detection](../data/nodes/to/token-based-clone-detection.json) — token-based-clone-detection

既有更新：[ESLint](../data/nodes/es/eslint.json)。

此分支正文引用 63 个不同的一手 URL，逐项事实与来源保存在对应节点。

### 测试覆盖、变异与反馈有效性（新增 37，更新 6）

内容主线：插桩 → 行、语句、分支、条件、路径和 MC/DC → 覆盖工具 → 变异及判定口径 → 变异工具 → 回归、测试选择和不稳定测试。

新增：

- [Branch Coverage](../data/nodes/br/branch-coverage.json) — branch-coverage
- [c8](../data/nodes/c8/c8.json) — c8
- [Code Coverage](../data/nodes/co/code-coverage.json) — code-coverage
- [Condition Coverage](../data/nodes/co/condition-coverage.json) — condition-coverage
- [Coverage-Based Testing](../data/nodes/co/coverage-based-testing.json) — coverage-based-testing
- [Coverage Exclusion](../data/nodes/co/coverage-exclusion.json) — coverage-exclusion
- [Coverage Instrumentation](../data/nodes/co/coverage-instrumentation.json) — coverage-instrumentation
- [Coverage.py](../data/nodes/co/coverage-py.json) — coverage-py
- [Decision Coverage](../data/nodes/de/decision-coverage.json) — decision-coverage
- [Ekstazi](../data/nodes/ek/ekstazi.json) — ekstazi
- [Equivalent Mutant](../data/nodes/eq/equivalent-mutant.json) — equivalent-mutant
- [Flaky Test](../data/nodes/fl/flaky-test.json) — flaky-test
- [gcov](../data/nodes/gc/gcov.json) — gcov
- [IstanbulJS](../data/nodes/is/istanbuljs.json) — istanbuljs
- [JaCoCo](../data/nodes/ja/jacoco.json) — jacoco
- [LCOV](../data/nodes/lc/lcov.json) — lcov
- [Line Coverage](../data/nodes/li/line-coverage.json) — line-coverage
- [llvm-cov](../data/nodes/ll/llvm-cov.json) — llvm-cov
- [Modified Condition/Decision Coverage](../data/nodes/mo/modified-condition-decision-coverage.json) — modified-condition-decision-coverage
- [Mutant Killing](../data/nodes/mu/mutant-killing.json) — mutant-killing
- [Mutation Operator](../data/nodes/mu/mutation-operator.json) — mutation-operator
- [Mutation Score](../data/nodes/mu/mutation-score.json) — mutation-score
- [Mutation Testing](../data/nodes/mu/mutation-testing.json) — mutation-testing
- [Mutation Testing Report](../data/nodes/mu/mutation-testing-report.json) — mutation-testing-report
- [mutmut](../data/nodes/mu/mutmut.json) — mutmut
- [nyc](../data/nodes/ny/nyc.json) — nyc
- [Path Coverage](../data/nodes/pa/path-coverage.json) — path-coverage
- [PIT](../data/nodes/pi/pit-mutation-testing.json) — pit-mutation-testing
- [pytest-cov](../data/nodes/py/pytest-cov.json) — pytest-cov
- [Regression Testing](../data/nodes/re/regression-testing.json) — regression-testing
- [Statement Coverage](../data/nodes/st/statement-coverage.json) — statement-coverage
- [StrykerJS](../data/nodes/st/stryker-js.json) — stryker-js
- [Surviving Mutant](../data/nodes/su/surviving-mutant.json) — surviving-mutant
- [Test Adequacy](../data/nodes/te/test-adequacy.json) — test-adequacy
- [Test Impact Analysis](../data/nodes/te/test-impact-analysis.json) — test-impact-analysis
- [Test Case Prioritization](../data/nodes/te/test-prioritization.json) — test-prioritization
- [Regression Test Selection](../data/nodes/te/test-selection.json) — test-selection

既有更新：[Unit Testing](../data/nodes/un/unit-testing.json)、[Integration Testing](../data/nodes/in/integration-testing.json)、[Test Pyramid](../data/nodes/te/testing-pyramid.json)、[pytest](../data/nodes/py/pytest.json)、[Vitest](../data/nodes/vi/vitest.json)、[E2E Testing](../data/nodes/e2/e2e-testing.json)。

此分支正文引用 56 个不同的一手 URL，逐项事实与来源保存在对应节点。

### 实证研究、工程度量与基准方法（新增 34，更新 1）

内容主线：度量效度、可靠性和标度 → GQM/SPACE/DevEx/DORA → 五项交付指标 → 软件实证研究方法 → 基准工作负载、预热和缓存 → hyperfine。

新增：

- [Software Benchmark Experimental Design](../data/nodes/be/benchmark-experimental-design.json) — benchmark-experimental-design
- [Benchmark Warmup](../data/nodes/be/benchmark-warmup.json) — benchmark-warmup
- [Benchmark Workload Representativeness](../data/nodes/be/benchmark-workload-representativeness.json) — benchmark-workload-representativeness
- [Change Fail Rate](../data/nodes/ch/change-fail-rate.json) — change-fail-rate
- [Change Lead Time](../data/nodes/ch/change-lead-time.json) — change-lead-time
- [Cold-Cache Benchmark](../data/nodes/co/cold-cache-benchmark.json) — cold-cache-benchmark
- [Construct Validity](../data/nodes/co/construct-validity.json) — construct-validity
- [Controlled Software Engineering Experiment](../data/nodes/co/controlled-software-experiment.json) — controlled-software-experiment
- [Deployment Frequency](../data/nodes/de/deployment-frequency.json) — deployment-frequency
- [Deployment Rework Rate](../data/nodes/de/deployment-rework-rate.json) — deployment-rework-rate
- [DevEx Framework](../data/nodes/de/devex-framework.json) — devex-framework
- [DORA Software Delivery Performance Metrics](../data/nodes/do/dora-metrics.json) — dora-metrics
- [Empirical Software Engineering](../data/nodes/em/empirical-software-engineering.json) — empirical-software-engineering
- [End-to-End Performance Benchmark](../data/nodes/en/end-to-end-performance-benchmark.json) — end-to-end-performance-benchmark
- [External Validity in Software Engineering Studies](../data/nodes/ex/external-validity.json) — external-validity
- [Failed Deployment Recovery Time](../data/nodes/fa/failed-deployment-recovery-time.json) — failed-deployment-recovery-time
- [Goal Question Metric](../data/nodes/go/goal-question-metric.json) — goal-question-metric
- [Goodhart's Law](../data/nodes/go/goodharts-law.json) — goodharts-law
- [hyperfine](../data/nodes/hy/hyperfine.json) — hyperfine
- [Internal Validity in Software Engineering Studies](../data/nodes/in/internal-validity.json) — internal-validity
- [Measurement Reliability](../data/nodes/me/measurement-reliability.json) — measurement-reliability
- [Measurement Scale](../data/nodes/me/measurement-scale.json) — measurement-scale
- [Measurement Validity](../data/nodes/me/measurement-validity.json) — measurement-validity
- [Microbenchmark](../data/nodes/mi/microbenchmark.json) — microbenchmark
- [Performance Regression Testing](../data/nodes/pe/performance-regression-testing.json) — performance-regression-testing
- [Software Engineering Case Study](../data/nodes/so/software-case-study.json) — software-case-study
- [Software Developer Productivity](../data/nodes/so/software-developer-productivity.json) — software-developer-productivity
- [Software Engineering Quasi-Experiment](../data/nodes/so/software-quasi-experiment.json) — software-quasi-experiment
- [Software Research Replication](../data/nodes/so/software-research-replication.json) — software-research-replication
- [Software Research Reproducibility](../data/nodes/so/software-research-reproducibility.json) — software-research-reproducibility
- [Selection Bias in Software Engineering Research](../data/nodes/so/software-research-selection-bias.json) — software-research-selection-bias
- [Software Engineering Questionnaire Survey](../data/nodes/so/software-survey-research.json) — software-survey-research
- [SPACE Framework](../data/nodes/sp/space-framework.json) — space-framework
- [Statistical Conclusion Validity](../data/nodes/st/statistical-conclusion-validity.json) — statistical-conclusion-validity

既有更新：[Benchmark](../data/nodes/be/benchmark.json)。

此分支正文引用 41 个不同的一手 URL，逐项事实与来源保存在对应节点。

### 软件工程与度量基础入口（新增 4，更新 0）

内容主线：软件工程 → 软件度量 → 测量过程与决策 → SWEBOK 知识领域导航。

新增：

- [Software Engineering](../data/nodes/so/software-engineering.json) — software-engineering
- [Software Measurement](../data/nodes/so/software-measurement.json) — software-measurement
- [Software Measurement Process](../data/nodes/so/software-measurement-process.json) — software-measurement-process
- [Guide to the Software Engineering Body of Knowledge](../data/nodes/sw/swebok.json) — swebok

此分支正文引用 7 个不同的一手 URL，逐项事实与来源保存在对应节点。

## 事实、口径与关系边界

- scc、tokei 与同类工具按实际项目身份建档。源码分支、正式发行、可选构建特性及运行选项分别限定，不把某次作者基准推广为所有环境的通用排名。
- 物理/逻辑行、代码/注释/空行、总行数、文件数、唯一行和重复文件分别定义。语言识别、生成与供应商文件、忽略规则、嵌入内容及快照输入会改变统计范围或分母。
- scc 的词法复杂度不是精确控制流图计算；DRYness 依据实现口径解释，不替代语义克隆率。COCOMO/LOCOMO 是有假设的估算，不是实际成本账单或生产力证明。tokei 输入既有统计的行为不写成自动差分或去重。
- 圈复杂度、认知复杂度、NPath、Halstead、可维护性及 OO/包指标保留定义与实现差异；功能点、源码规模、story points 和人月不作跨团队通用换算。
- 仓库语言份额、历史贡献、声明责任、作者/提交者、完整/浅/部分历史与重命名启发式分别记录。SZZ、churn、hotspot、ownership 和时间耦合不自动建立因果或个人绩效结论。
- 克隆、异味、债务、检测器、质量门、质量配置与新代码范围各有职责。具体工具代际、平台产品和可选扫描能力按现行资料限定，修复时间估算不写成真实统一工作量。
- 覆盖与变异指标注明对象、分母、排除、错误、等价和超时规则。工具不同不能只凭同名指标假定等价；高覆盖与高变异分数不构成业务正确性证明。
- DORA 按当前五项官方指标、服务/应用范围与时间窗解释；SPACE 和 DevEx 是多维框架。研究效度、相关与因果、基准工作负载、预热与缓存的边界分别说明。
- 工具采用的方法和指标由采用者持有 uses，公式输入可由指标持有 uses；被测对象不反向使用测量方法。没有来源支持的边不会为了连通数量加入。

仅有分类挂载的新增节点：[Person-Month](../data/nodes/pe/person-month.json)、[Software Developer Productivity](../data/nodes/so/software-developer-productivity.json)、[Software Research Reproducibility](../data/nodes/so/software-research-reproducibility.json)。这些定义分别表示计量单位、被测构念或研究结果性质。它们保留有来源的独立身份；现有关系无法精确表达其作为输出或被评价对象的联系时，不用主题相关性或反向 uses 伪造采用关系。

## 分类与契约

本体 101 → 107（0.17.0）、领域 79 → 84（0.11.0）、生态 101 → 106（0.9.0）。Schema 3.5.1、二十九种关系和十个宏观生态根保持原约定。具体挂载与口径边界见 [ADR-0034](decisions/0034-software-measurement-and-repository-analysis.md) 和 [约定第20节](../contracts/conventions.md)。

## 验证

- 全量节点、分类、词表、必填字段、关系域值、镜像方向与 context 校验通过。
- 全部触及节点至少三段实质正文、至少两条一手引用、摘要不超过五十字；基线节点未删除。
- 4 组独立内容复核完成，覆盖全部 248 个触及节点及新增分类、约定和 ADR；剩余必须修复问题为零。
- 完整生产构建通过；21 项单元测试、8 项 Chromium 浏览器测试，以及 web/tools TypeScript 检查通过。浏览器检查包括真实 WASM、失败回退、离线安装/更新/恢复和双标签快照。
- 全部 238 个新增 ID 搜索、248 个摘要/正文/邻域，以及 828 项名称/别名/缩写检索在实际 JavaScript 与 WASM 两端核验，结果一致，WASM 后端没有静默回退。scc/tokei/SLOC/DORA 和既有 Tern/Ghostty 搜索均通过。
- 数据版本：`35dbe2c5e90765cd7d542512898eefcf24130c5ea91a7d41693862f66acd202b`；离线发布：`32e35db9060d`，包含 466 个资源。

生成资源与验证日志保留在忽略目录，事实来源为 data/nodes 与 contracts 中的作者文件。
