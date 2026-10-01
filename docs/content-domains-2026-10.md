# 2026-10-01 十二个领域内容补全

本批落实整领域缺失审计列出的全部十二块。新增 354 个数据节点，实质扩写 34 个既有节点，数据节点从 1608 增至 1962；新增 615 条非分类关系。每块都包含基础概念、主要方法，以及与真实标准、数据或工程工具之间的连接。

新增与扩写正文引用 370 个不同 URL（按完整 URL 去重，不等于独立机构数）。全图具有非空 description 的节点从 375 增至 747；该数量只表示正文存在。全部本批内容标为 origin: ai_draft，last_reviewed: 2026-10-01。

## 范围与完整节点清单

### GIS 与遥感（新增 29，既有补充 1）

领域主线：gis → vector-geospatial-data / raster-geospatial-data → coordinate-reference-system → geodetic-datum,geographic-coordinate-system → map-projection → projected-coordinate-system,spatial-analysis → spatial-join → spatial-index → r-tree；postgis → postgresql,geojson / geotiff / geopackage → gdal → qgis / geopandas；wms / wfs / stac 为交换与发现入口,earth-observation → remote-sensing → landsat-data / sentinel-2-data → ndvi / geospatial-resampling。

新增：

- [坐标参考系](../data/nodes/co/coordinate-reference-system.json) — coordinate-reference-system
- [地球观测](../data/nodes/ea/earth-observation.json) — earth-observation
- [地理空间数据抽象库](../data/nodes/gd/gdal.json) — gdal
- [大地基准](../data/nodes/ge/geodetic-datum.json) — geodetic-datum
- [地理坐标系](../data/nodes/ge/geographic-coordinate-system.json) — geographic-coordinate-system
- [GeoJSON 地理数据格式](../data/nodes/ge/geojson.json) — geojson
- [地理数据包](../data/nodes/ge/geopackage.json) — geopackage
- [GeoPandas 地理数据分析库](../data/nodes/ge/geopandas.json) — geopandas
- [地理栅格重采样](../data/nodes/ge/geospatial-resampling.json) — geospatial-resampling
- [地理 TIFF](../data/nodes/ge/geotiff.json) — geotiff
- [地理信息系统](../data/nodes/gi/gis.json) — gis
- [Landsat 卫星数据](../data/nodes/la/landsat-data.json) — landsat-data
- [地图投影](../data/nodes/ma/map-projection.json) — map-projection
- [归一化植被指数](../data/nodes/nd/ndvi.json) — ndvi
- [开放地理空间联盟](../data/nodes/og/ogc.json) — ogc
- [PostGIS 空间扩展](../data/nodes/po/postgis.json) — postgis
- [投影坐标系](../data/nodes/pr/projected-coordinate-system.json) — projected-coordinate-system
- [QGIS 地理信息软件](../data/nodes/qg/qgis.json) — qgis
- [R 树](../data/nodes/r-/r-tree.json) — r-tree
- [地理栅格数据](../data/nodes/ra/raster-geospatial-data.json) — raster-geospatial-data
- [遥感](../data/nodes/re/remote-sensing.json) — remote-sensing
- [Sentinel-2 卫星数据](../data/nodes/se/sentinel-2-data.json) — sentinel-2-data
- [空间分析](../data/nodes/sp/spatial-analysis.json) — spatial-analysis
- [空间索引](../data/nodes/sp/spatial-index.json) — spatial-index
- [空间连接](../data/nodes/sp/spatial-join.json) — spatial-join
- [时空资产目录](../data/nodes/st/stac.json) — stac
- [地理矢量数据](../data/nodes/ve/vector-geospatial-data.json) — vector-geospatial-data
- [Web 要素服务](../data/nodes/wf/wfs.json) — wfs
- [Web 地图服务](../data/nodes/wm/wms.json) — wms

既有补充：[PostgreSQL](../data/nodes/po/postgresql.json)。

本领域正文引用 34 个不同的一手资料 URL；每个节点正文附对应的标准、官方文档、作者教材或论文链接。

### 医疗信息学（新增 26）

领域主线：ehr / emr → clinical-terminology → loinc / snomed-ct / icd-11,health-information-exchange → clinical-interoperability → fhir / hl7-v2 / cda；标准由 hl7 治理,medical-imaging-informatics → pacs → dicom → dicomweb；orthanc / dcm4che 提供具体实现入口,openmrs 实现 emr；hapi-fhir 实现 fhir；smart-on-fhir 提供 FHIR 应用授权与启动约定,clinical-decision-support → ehr / fhir；clinical-data-governance → data-quality / rbac / clinical-data-provenance,clinical-data-de-identification → ehr / clinical-data-provenance；omop-common-data-model → clinical-terminology / data-quality。

新增：

- [临床文档架构](../data/nodes/cd/cda.json) — cda
- [临床数据去标识化](../data/nodes/cl/clinical-data-de-identification.json) — clinical-data-de-identification
- [临床数据治理](../data/nodes/cl/clinical-data-governance.json) — clinical-data-governance
- [临床数据来源追踪](../data/nodes/cl/clinical-data-provenance.json) — clinical-data-provenance
- [临床决策支持](../data/nodes/cl/clinical-decision-support.json) — clinical-decision-support
- [医疗互操作性](../data/nodes/cl/clinical-interoperability.json) — clinical-interoperability
- [临床术语系统](../data/nodes/cl/clinical-terminology.json) — clinical-terminology
- [dcm4che DICOM 工具库](../data/nodes/dc/dcm4che.json) — dcm4che
- [医学数字成像与通信](../data/nodes/di/dicom.json) — dicom
- [DICOM Web 服务](../data/nodes/di/dicomweb.json) — dicomweb
- [电子健康记录](../data/nodes/eh/ehr.json) — ehr
- [电子病历](../data/nodes/em/emr.json) — emr
- [FHIR 医疗数据交换标准](../data/nodes/fh/fhir.json) — fhir
- [HAPI FHIR](../data/nodes/ha/hapi-fhir.json) — hapi-fhir
- [健康信息交换](../data/nodes/he/health-information-exchange.json) — health-information-exchange
- [健康七层国际](../data/nodes/hl/hl7.json) — hl7
- [HL7 V2.x 消息](../data/nodes/hl/hl7-v2.json) — hl7-v2
- [国际疾病分类第十一次修订](../data/nodes/ic/icd-11.json) — icd-11
- [LOINC 检验与观察编码](../data/nodes/lo/loinc.json) — loinc
- [医学影像信息学](../data/nodes/me/medical-imaging-informatics.json) — medical-imaging-informatics
- [OMOP 通用数据模型](../data/nodes/om/omop-common-data-model.json) — omop-common-data-model
- [开源医疗记录系统](../data/nodes/op/openmrs.json) — openmrs
- [Orthanc DICOM 服务器](../data/nodes/or/orthanc.json) — orthanc
- [影像归档与通信系统](../data/nodes/pa/pacs.json) — pacs
- [SMART 医疗应用集成](../data/nodes/sm/smart-on-fhir.json) — smart-on-fhir
- [系统化医学临床术语](../data/nodes/sn/snomed-ct.json) — snomed-ct

本领域正文引用 25 个不同的一手资料 URL；每个节点正文附对应的标准、官方文档、作者教材或论文链接。

### 生物信息学与计算生物（新增 29，既有补充 2）

领域主线：genomics → dna-sequencing / next-generation-sequencing → fastq；reference-genome → genome / fasta,sequence-alignment → dynamic-programming；bwa / blast 实现比对；sam-bam → samtools 提供转换、排序和索引,variant-calling → reference-genome / sam-bam / vcf；gatk 实现变异检测并使用局部 sequence-assembly,transcriptomics → rna-seq → next-generation-sequencing / sequence-alignment；gene-expression 约束测量解释,proteomics → uniprot / gene-ontology；biopython / bioconductor 为编程与分析入口,snakemake → bwa / samtools；nextflow → blast，均以官方示例限定可选工具关系,computational-biology → protein-structure-prediction / systems-biology；alphafold 实现结构预测并按版本说明边界。

新增：

- [Bioconductor 生物数据分析项目](../data/nodes/bi/bioconductor.json) — bioconductor
- [Biopython 生物计算库](../data/nodes/bi/biopython.json) — biopython
- [BLAST 序列检索](../data/nodes/bl/blast.json) — blast
- [BWA 比对器](../data/nodes/bw/bwa.json) — bwa
- [计算生物学](../data/nodes/co/computational-biology.json) — computational-biology
- [DNA 测序](../data/nodes/dn/dna-sequencing.json) — dna-sequencing
- [FASTA 序列格式](../data/nodes/fa/fasta.json) — fasta
- [FASTQ 读段格式](../data/nodes/fa/fastq.json) — fastq
- [GATK 基因组分析工具](../data/nodes/ga/gatk.json) — gatk
- [基因表达](../data/nodes/ge/gene-expression.json) — gene-expression
- [Gene Ontology](../data/nodes/ge/gene-ontology.json) — gene-ontology
- [基因组](../data/nodes/ge/genome.json) — genome
- [基因组学](../data/nodes/ge/genomics.json) — genomics
- [下一代测序](../data/nodes/ne/next-generation-sequencing.json) — next-generation-sequencing
- [Nextflow 工作流系统](../data/nodes/ne/nextflow.json) — nextflow
- [蛋白质结构预测](../data/nodes/pr/protein-structure-prediction.json) — protein-structure-prediction
- [蛋白质组学](../data/nodes/pr/proteomics.json) — proteomics
- [参考基因组](../data/nodes/re/reference-genome.json) — reference-genome
- [RNA 测序](../data/nodes/rn/rna-seq.json) — rna-seq
- [SAM 文本格式](../data/nodes/sa/sam-bam.json) — sam-bam
- [SAMtools 比对数据工具](../data/nodes/sa/samtools.json) — samtools
- [序列比对](../data/nodes/se/sequence-alignment.json) — sequence-alignment
- [序列组装](../data/nodes/se/sequence-assembly.json) — sequence-assembly
- [Snakemake 工作流系统](../data/nodes/sn/snakemake.json) — snakemake
- [系统生物学](../data/nodes/sy/systems-biology.json) — systems-biology
- [转录组学](../data/nodes/tr/transcriptomics.json) — transcriptomics
- [通用蛋白质资源](../data/nodes/un/uniprot.json) — uniprot
- [变异检测](../data/nodes/va/variant-calling.json) — variant-calling
- [VCF 变异格式](../data/nodes/vc/vcf.json) — vcf

既有补充：[生物信息学](../data/nodes/bi/bioinformatics.json)、[AlphaFold](../data/nodes/al/alphafold.json)。

本领域正文引用 39 个不同的一手资料 URL；每个节点正文附对应的标准、官方文档、作者教材或论文链接。

### 电力与能源系统（新增 26，既有补充 4）

领域主线：electric-power-system,three-phase-power,power-transformer,per-unit-system,power-flow,optimal-power-flow,power-system-state-estimation,reactive-power,power-factor,smart-grid,distributed-energy-resources,microgrid,iec-61850,power-electronics,pwm,mosfet,rectifier,dc-dc-converter,inverter,battery-energy-storage,battery-management-system,state-of-charge,state-of-health,energy-management-system,opendss,pandapower,matpower,tdp,pue,power-wall,usb-pd。

新增：

- [电池储能系统](../data/nodes/ba/battery-energy-storage.json) — battery-energy-storage
- [电池管理系统](../data/nodes/ba/battery-management-system.json) — battery-management-system
- [直流变换器](../data/nodes/dc/dc-dc-converter.json) — dc-dc-converter
- [分布式能源资源](../data/nodes/di/distributed-energy-resources.json) — distributed-energy-resources
- [电力系统](../data/nodes/el/electric-power-system.json) — electric-power-system
- [能量管理系统](../data/nodes/en/energy-management-system.json) — energy-management-system
- [IEC 61850 标准系列](../data/nodes/ie/iec-61850.json) — iec-61850
- [逆变器](../data/nodes/in/inverter.json) — inverter
- [MATPOWER](../data/nodes/ma/matpower.json) — matpower
- [微电网](../data/nodes/mi/microgrid.json) — microgrid
- [OpenDSS](../data/nodes/op/opendss.json) — opendss
- [最优潮流](../data/nodes/op/optimal-power-flow.json) — optimal-power-flow
- [pandapower](../data/nodes/pa/pandapower.json) — pandapower
- [标幺制](../data/nodes/pe/per-unit-system.json) — per-unit-system
- [电力电子](../data/nodes/po/power-electronics.json) — power-electronics
- [功率因数](../data/nodes/po/power-factor.json) — power-factor
- [潮流分析](../data/nodes/po/power-flow.json) — power-flow
- [电力系统状态估计](../data/nodes/po/power-system-state-estimation.json) — power-system-state-estimation
- [电力变压器](../data/nodes/po/power-transformer.json) — power-transformer
- [脉宽调制](../data/nodes/pw/pwm.json) — pwm
- [无功功率](../data/nodes/re/reactive-power.json) — reactive-power
- [整流器](../data/nodes/re/rectifier.json) — rectifier
- [智能电网](../data/nodes/sm/smart-grid.json) — smart-grid
- [荷电状态](../data/nodes/st/state-of-charge.json) — state-of-charge
- [健康状态](../data/nodes/st/state-of-health.json) — state-of-health
- [三相电力](../data/nodes/th/three-phase-power.json) — three-phase-power

既有补充：[热设计功耗](../data/nodes/td/tdp.json)、[电能使用效率](../data/nodes/pu/pue.json)、[功耗墙](../data/nodes/po/power-wall.json)、[PD 快充](../data/nodes/us/usb-pd.json)。

本领域正文引用 30 个不同的一手资料 URL；每个节点正文附对应的标准、官方文档、作者教材或论文链接。

### 材料科学与计算化学（新增 35）

领域主线：物质结构与性质 → 电子结构/原子模拟 → 数值工具与数据 → 材料发现与化学信息。

新增：

- [第一性原理计算](../data/nodes/ab/ab-initio-calculation.json) — ab-initio-calculation
- [原子模拟环境](../data/nodes/as/ase-atomic-simulation.json) — ase-atomic-simulation
- [电子能带结构](../data/nodes/ba/band-structure.json) — band-structure
- [玻恩—奥本海默近似](../data/nodes/bo/born-oppenheimer-approximation.json) — born-oppenheimer-approximation
- [布拉维点阵](../data/nodes/br/bravais-lattice.json) — bravais-lattice
- [化学信息学](../data/nodes/ch/cheminformatics.json) — cheminformatics
- [计算化学](../data/nodes/co/computational-chemistry.json) — computational-chemistry
- [晶体结构](../data/nodes/cr/crystal-structure.json) — crystal-structure
- [晶体学](../data/nodes/cr/crystallography.json) — crystallography
- [密度泛函理论](../data/nodes/de/density-functional-theory.json) — density-functional-theory
- [分子力场](../data/nodes/fo/force-field.json) — force-field
- [形成能](../data/nodes/fo/formation-energy.json) — formation-energy
- [几何优化](../data/nodes/ge/geometry-optimization.json) — geometry-optimization
- [GROMACS 分子模拟软件](../data/nodes/gr/gromacs.json) — gromacs
- [科恩—沈方程](../data/nodes/ko/kohn-sham-equations.json) — kohn-sham-equations
- [LAMMPS 分子动力学软件](../data/nodes/la/lammps.json) — lammps
- [材料信息学](../data/nodes/ma/materials-informatics.json) — materials-informatics
- [材料项目](../data/nodes/ma/materials-project.json) — materials-project
- [材料科学](../data/nodes/ma/materials-science.json) — materials-science
- [分子动力学](../data/nodes/mo/molecular-dynamics.json) — molecular-dynamics
- [分子力学](../data/nodes/mo/molecular-mechanics.json) — molecular-mechanics
- [OpenMM 分子模拟库](../data/nodes/op/openmm.json) — openmm
- [周期性边界条件](../data/nodes/pe/periodic-boundary-condition.json) — periodic-boundary-condition
- [声子](../data/nodes/ph/phonon.json) — phonon
- [平面波基组](../data/nodes/pl/plane-wave-basis.json) — plane-wave-basis
- [势能面](../data/nodes/po/potential-energy-surface.json) — potential-energy-surface
- [赝势](../data/nodes/ps/pseudopotential.json) — pseudopotential
- [Python 材料分析库](../data/nodes/py/pymatgen.json) — pymatgen
- [量子 ESPRESSO](../data/nodes/qu/quantum-espresso.json) — quantum-espresso
- [RDKit 化学信息工具包](../data/nodes/rd/rdkit.json) — rdkit
- [倒易点阵](../data/nodes/re/reciprocal-lattice.json) — reciprocal-lattice
- [简化分子线性输入规范](../data/nodes/sm/smiles.json) — smiles
- [热力学稳定性](../data/nodes/th/thermodynamic-stability.json) — thermodynamic-stability
- [晶胞](../data/nodes/un/unit-cell.json) — unit-cell
- [维也纳从头算模拟软件包](../data/nodes/va/vasp.json) — vasp

本领域正文引用 26 个不同的一手资料 URL；每个节点正文附对应的标准、官方文档、作者教材或论文链接。

### 模拟电子与射频（新增 29，既有补充 3）

领域主线：ohms-law,kirchhoffs-laws,resistor,capacitor,inductor,rc-circuit,rlc-circuit,transistor,mosfet,operational-amplifier,negative-feedback,active-filter,adc,dac,quantization-noise,rf-engineering,transmission-line,impedance,s-parameters,smith-chart,impedance-matching,antenna,low-noise-amplifier,mixer,phase-locked-loop,voltage-controlled-oscillator,power-amplifier,spice,ngspice,ltspice。

新增：

- [有源滤波器](../data/nodes/ac/active-filter.json) — active-filter
- [模数转换器](../data/nodes/ad/adc.json) — adc
- [模拟电路](../data/nodes/an/analog-circuit.json) — analog-circuit
- [天线](../data/nodes/an/antenna.json) — antenna
- [电容器](../data/nodes/ca/capacitor.json) — capacitor
- [数模转换器](../data/nodes/da/dac.json) — dac
- [阻抗](../data/nodes/im/impedance.json) — impedance
- [阻抗匹配](../data/nodes/im/impedance-matching.json) — impedance-matching
- [电感器](../data/nodes/in/inductor.json) — inductor
- [基尔霍夫定律](../data/nodes/ki/kirchhoffs-laws.json) — kirchhoffs-laws
- [低噪声放大器](../data/nodes/lo/low-noise-amplifier.json) — low-noise-amplifier
- [LTspice](../data/nodes/lt/ltspice.json) — ltspice
- [射频混频器](../data/nodes/mi/mixer.json) — mixer
- [负反馈](../data/nodes/ne/negative-feedback.json) — negative-feedback
- [ngspice](../data/nodes/ng/ngspice.json) — ngspice
- [欧姆定律](../data/nodes/oh/ohms-law.json) — ohms-law
- [运算放大器](../data/nodes/op/operational-amplifier.json) — operational-amplifier
- [锁相环](../data/nodes/ph/phase-locked-loop.json) — phase-locked-loop
- [射频功率放大器](../data/nodes/po/power-amplifier.json) — power-amplifier
- [量化噪声](../data/nodes/qu/quantization-noise.json) — quantization-noise
- [RC 电路](../data/nodes/rc/rc-circuit.json) — rc-circuit
- [电阻器](../data/nodes/re/resistor.json) — resistor
- [射频工程](../data/nodes/rf/rf-engineering.json) — rf-engineering
- [RLC 电路](../data/nodes/rl/rlc-circuit.json) — rlc-circuit
- [散射参数](../data/nodes/s-/s-parameters.json) — s-parameters
- [史密斯圆图](../data/nodes/sm/smith-chart.json) — smith-chart
- [SPICE 电路仿真](../data/nodes/sp/spice.json) — spice
- [传输线](../data/nodes/tr/transmission-line.json) — transmission-line
- [压控振荡器](../data/nodes/vo/voltage-controlled-oscillator.json) — voltage-controlled-oscillator

既有补充：[晶体管](../data/nodes/tr/transistor.json)、[金属氧化物半导体场效应晶体管](../data/nodes/mo/mosfet.json)、[互补金属氧化物半导体](../data/nodes/cm/cmos.json)。

本领域正文引用 28 个不同的一手资料 URL；每个节点正文附对应的标准、官方文档、作者教材或论文链接。

### 工业自动化（新增 28，既有补充 5）

领域主线：industrial-automation,process-control,feedback-control,pid-control,plc,plc-scan-cycle,dcs,scada,mes,iec-61131-3,ladder-diagram,structured-text,function-block-diagram,codesys,codesys-group,openplc,fieldbus,modbus,can,industrial-ethernet,ethercat,profinet,opc-ua,opc-foundation,functional-safety,safety-integrity-level,iec-61508,iec-62443,isa-88,isa-95,iec,isa,digital-twin。

新增：

- [CODESYS 开发系统](../data/nodes/co/codesys.json) — codesys
- [CODESYS 集团](../data/nodes/co/codesys-group.json) — codesys-group
- [分布式控制系统](../data/nodes/dc/dcs.json) — dcs
- [EtherCAT 工业以太网](../data/nodes/et/ethercat.json) — ethercat
- [现场总线](../data/nodes/fi/fieldbus.json) — fieldbus
- [功能块图](../data/nodes/fu/function-block-diagram.json) — function-block-diagram
- [功能安全](../data/nodes/fu/functional-safety.json) — functional-safety
- [国际电工委员会](../data/nodes/ie/iec.json) — iec
- [IEC 61131-3 编程语言标准](../data/nodes/ie/iec-61131-3.json) — iec-61131-3
- [IEC 61508 功能安全标准](../data/nodes/ie/iec-61508.json) — iec-61508
- [ISA/IEC 62443 工控安全标准](../data/nodes/ie/iec-62443.json) — iec-62443
- [工业自动化](../data/nodes/in/industrial-automation.json) — industrial-automation
- [工业以太网](../data/nodes/in/industrial-ethernet.json) — industrial-ethernet
- [国际自动化学会](../data/nodes/is/isa.json) — isa
- [ISA-88 批次控制标准](../data/nodes/is/isa-88.json) — isa-88
- [ISA-95 企业控制集成标准](../data/nodes/is/isa-95.json) — isa-95
- [梯形图](../data/nodes/la/ladder-diagram.json) — ladder-diagram
- [制造执行系统](../data/nodes/me/mes.json) — mes
- [OPC 基金会](../data/nodes/op/opc-foundation.json) — opc-foundation
- [OPC 统一架构](../data/nodes/op/opc-ua.json) — opc-ua
- [OpenPLC](../data/nodes/op/openplc.json) — openplc
- [可编程逻辑控制器](../data/nodes/pl/plc.json) — plc
- [PLC 扫描周期](../data/nodes/pl/plc-scan-cycle.json) — plc-scan-cycle
- [过程控制](../data/nodes/pr/process-control.json) — process-control
- [PROFINET 工业以太网](../data/nodes/pr/profinet.json) — profinet
- [安全完整性等级](../data/nodes/sa/safety-integrity-level.json) — safety-integrity-level
- [监控与数据采集](../data/nodes/sc/scada.json) — scada
- [结构化文本](../data/nodes/st/structured-text.json) — structured-text

既有补充：[Modbus](../data/nodes/mo/modbus.json)、[控制器局域网](../data/nodes/ca/can.json)、[数字孪生](../data/nodes/di/digital-twin.json)、[PID 控制](../data/nodes/pi/pid-control.json)、[反馈控制](../data/nodes/fe/feedback-control.json)。

本领域正文引用 36 个不同的一手资料 URL；每个节点正文附对应的标准、官方文档、作者教材或论文链接。

### 运筹与数学优化（新增 30，既有补充 2）

领域主线：决策与优化模型 → 可行域/凸性 → 对偶/KKT → 线性、整数、二次与半正定规划 → 单纯形/内点/梯度与组合搜索 → CVXPY/OR-Tools/Gurobi/CPLEX。

新增：

- [分支定界](../data/nodes/br/branch-and-bound.json) — branch-and-bound
- [组合优化](../data/nodes/co/combinatorial-optimization.json) — combinatorial-optimization
- [约束规划](../data/nodes/co/constraint-programming.json) — constraint-programming
- [凸函数](../data/nodes/co/convex-function.json) — convex-function
- [凸优化](../data/nodes/co/convex-optimization.json) — convex-optimization
- [凸集](../data/nodes/co/convex-set.json) — convex-set
- [坐标下降](../data/nodes/co/coordinate-descent.json) — coordinate-descent
- [Python 凸优化建模库](../data/nodes/cv/cvxpy.json) — cvxpy
- [可行域](../data/nodes/fe/feasible-region.json) — feasible-region
- [谷歌运筹优化工具](../data/nodes/go/google-or-tools.json) — google-or-tools
- [Gurobi 优化器](../data/nodes/gu/gurobi.json) — gurobi
- [IBM ILOG CPLEX Optimization Studio](../data/nodes/ib/ibm-ilog-cplex.json) — ibm-ilog-cplex
- [整数规划](../data/nodes/in/integer-programming.json) — integer-programming
- [内点法](../data/nodes/in/interior-point-method.json) — interior-point-method
- [KKT 条件](../data/nodes/kk/kkt-conditions.json) — kkt-conditions
- [拉格朗日对偶](../data/nodes/la/lagrange-duality.json) — lagrange-duality
- [拉格朗日函数](../data/nodes/la/lagrangian.json) — lagrangian
- [线性规划](../data/nodes/li/linear-programming.json) — linear-programming
- [数学优化](../data/nodes/ma/mathematical-optimization.json) — mathematical-optimization
- [混合整数规划](../data/nodes/mi/mixed-integer-programming.json) — mixed-integer-programming
- [牛顿法](../data/nodes/ne/newton-method.json) — newton-method
- [非线性规划](../data/nodes/no/nonlinear-programming.json) — nonlinear-programming
- [运筹学](../data/nodes/op/operations-research.json) — operations-research
- [优化问题](../data/nodes/op/optimization-problem.json) — optimization-problem
- [优化求解器](../data/nodes/op/optimization-solver.json) — optimization-solver
- [二次规划](../data/nodes/qu/quadratic-programming.json) — quadratic-programming
- [拟牛顿法](../data/nodes/qu/quasi-newton-method.json) — quasi-newton-method
- [半正定规划](../data/nodes/se/semidefinite-programming.json) — semidefinite-programming
- [单纯形法](../data/nodes/si/simplex-method.json) — simplex-method
- [随机梯度下降](../data/nodes/st/stochastic-gradient-descent.json) — stochastic-gradient-descent

既有补充：[梯度下降](../data/nodes/gr/gradient-descent.json)、[动态规划](../data/nodes/dy/dynamic-programming.json)。

本领域正文引用 21 个不同的一手资料 URL；每个节点正文附对应的标准、官方文档、作者教材或论文链接。

### 科学计算、工程仿真与机械 CAD/CAM（新增 30，既有补充 10）

领域主线：物理模型与 ODE/PDE → 离散/积分/插值 → 网格与稀疏方程 → LAPACK/SciPy/PETSc/OpenFOAM → 条件数、浮点误差与稳定性；参数化 CAD/B-rep/CSG → FreeCAD/OpenCASCADE → Gmsh → 数值分析与 CAM。

新增：

- [边界表示](../data/nodes/bo/boundary-representation.json) — boundary-representation
- [计算流体力学](../data/nodes/co/computational-fluid-dynamics.json) — computational-fluid-dynamics
- [计算网格](../data/nodes/co/computational-mesh.json) — computational-mesh
- [计算机辅助设计](../data/nodes/co/computer-aided-design.json) — computer-aided-design
- [计算机辅助制造](../data/nodes/co/computer-aided-manufacturing.json) — computer-aided-manufacturing
- [条件数](../data/nodes/co/condition-number.json) — condition-number
- [构造实体几何](../data/nodes/co/constructive-solid-geometry.json) — constructive-solid-geometry
- [有限差分法](../data/nodes/fi/finite-difference-method.json) — finite-difference-method
- [有限元法](../data/nodes/fi/finite-element-method.json) — finite-element-method
- [有限体积法](../data/nodes/fi/finite-volume-method.json) — finite-volume-method
- [浮点运算](../data/nodes/fl/floating-point-arithmetic.json) — floating-point-arithmetic
- [自由参数化 CAD](../data/nodes/fr/freecad.json) — freecad
- [三维有限元网格生成器](../data/nodes/gm/gmsh.json) — gmsh
- [线性代数计算库](../data/nodes/la/lapack.json) — lapack
- [数值分析](../data/nodes/nu/numerical-analysis.json) — numerical-analysis
- [数值积分](../data/nodes/nu/numerical-integration.json) — numerical-integration
- [数值插值](../data/nodes/nu/numerical-interpolation.json) — numerical-interpolation
- [数值稳定性](../data/nodes/nu/numerical-stability.json) — numerical-stability
- [Open CASCADE Technology](../data/nodes/op/opencascade.json) — opencascade
- [开放场运算与操纵工具箱](../data/nodes/op/openfoam.json) — openfoam
- [常微分方程](../data/nodes/or/ordinary-differential-equation.json) — ordinary-differential-equation
- [参数化建模](../data/nodes/pa/parametric-modeling.json) — parametric-modeling
- [偏微分方程](../data/nodes/pa/partial-differential-equation.json) — partial-differential-equation
- [可扩展科学计算工具库](../data/nodes/pe/petsc.json) — petsc
- [数值求根](../data/nodes/ro/root-finding.json) — root-finding
- [龙格－库塔方法](../data/nodes/ru/runge-kutta-method.json) — runge-kutta-method
- [科学计算](../data/nodes/sc/scientific-computing.json) — scientific-computing
- [Python 科学计算库](../data/nodes/sc/scipy.json) — scipy
- [稀疏线性求解方法](../data/nodes/sp/sparse-linear-solver.json) — sparse-linear-solver
- [稀疏矩阵](../data/nodes/sp/sparse-matrix.json) — sparse-matrix

既有补充：[NumPy](../data/nodes/nu/numpy.json)、[BLAS](../data/nodes/bl/blas.json)、[MATLAB](../data/nodes/ma/matlab.json)、[Julia 语言](../data/nodes/ju/julia.json)、[Fortran](../data/nodes/fo/fortran.json)、[线性代数](../data/nodes/li/linear-algebra.json)、[奇异值分解](../data/nodes/si/singular-value-decomposition.json)、[神经算子](../data/nodes/ne/neural-operator.json)、[AutoCAD](../data/nodes/au/autocad.json)、[Autodesk](../data/nodes/au/autodesk.json)。

本领域正文引用 48 个不同的一手资料 URL；每个节点正文附对应的标准、官方文档、作者教材或论文链接。

### 数字信号处理与信号系统（新增 27，既有补充 2）

领域主线：信号与 LTI → 脉冲响应/卷积 → 采样与混叠 → Fourier/DFT/FFT → 窗、泄漏与频谱 → FIR/IIR/设计 → STFT/小波/多速率 → FFTW/GNU Radio/FFmpeg/GStreamer。

新增：

- [混叠](../data/nodes/al/aliasing.json) — aliasing
- [卷积](../data/nodes/co/convolution.json) — convolution
- [数字滤波器](../data/nodes/di/digital-filter.json) — digital-filter
- [离散傅里叶变换](../data/nodes/di/discrete-fourier-transform.json) — discrete-fourier-transform
- [快速傅里叶变换](../data/nodes/fa/fast-fourier-transform.json) — fast-fourier-transform
- [音视频转码工具](../data/nodes/ff/ffmpeg.json) — ffmpeg
- [最快西方傅里叶变换库](../data/nodes/ff/fftw.json) — fftw
- [滤波器设计](../data/nodes/fi/filter-design.json) — filter-design
- [有限脉冲响应滤波器](../data/nodes/fi/fir-filter.json) — fir-filter
- [傅里叶变换](../data/nodes/fo/fourier-transform.json) — fourier-transform
- [频谱](../data/nodes/fr/frequency-spectrum.json) — frequency-spectrum
- [GNU 软件无线电](../data/nodes/gn/gnu-radio.json) — gnu-radio
- [流媒体管线框架](../data/nodes/gs/gstreamer.json) — gstreamer
- [无限脉冲响应滤波器](../data/nodes/ii/iir-filter.json) — iir-filter
- [脉冲响应](../data/nodes/im/impulse-response.json) — impulse-response
- [拉普拉斯变换](../data/nodes/la/laplace-transform.json) — laplace-transform
- [线性时不变系统](../data/nodes/li/linear-time-invariant-system.json) — linear-time-invariant-system
- [多速率信号处理](../data/nodes/mu/multirate-signal-processing.json) — multirate-signal-processing
- [物理信噪比](../data/nodes/ph/physical-signal-to-noise-ratio.json) — physical-signal-to-noise-ratio
- [采样定理](../data/nodes/sa/sampling-theorem.json) — sampling-theorem
- [短时傅里叶变换](../data/nodes/sh/short-time-fourier-transform.json) — short-time-fourier-transform
- [信号](../data/nodes/si/signal.json) — signal
- [信号处理](../data/nodes/si/signal-processing.json) — signal-processing
- [频谱泄漏](../data/nodes/sp/spectral-leakage.json) — spectral-leakage
- [小波变换](../data/nodes/wa/wavelet-transform.json) — wavelet-transform
- [窗函数](../data/nodes/wi/window-function.json) — window-function
- [Z 变换](../data/nodes/z-/z-transform.json) — z-transform

既有补充：[CNN](../data/nodes/cn/cnn.json)、[卡尔曼滤波](../data/nodes/ka/kalman-filter.json)。

本领域正文引用 30 个不同的一手资料 URL；每个节点正文附对应的标准、官方文档、作者教材或论文链接。

### 信息论与编码（新增 26，既有补充 3）

领域主线：信源与分布 → 熵/条件熵/互信息 → Kraft/前缀/Huffman/算术编码 → 信道与容量/编码定理 → 线性/Hamming/RS/LDPC/卷积/Turbo/Polar → 率失真。

新增：

- [算术编码](../data/nodes/ar/arithmetic-coding.json) — arithmetic-coding
- [二元对称信道](../data/nodes/bi/binary-symmetric-channel.json) — binary-symmetric-channel
- [分组码](../data/nodes/bl/block-code.json) — block-code
- [信道容量](../data/nodes/ch/channel-capacity.json) — channel-capacity
- [信道编码](../data/nodes/ch/channel-coding.json) — channel-coding
- [信道编码定理](../data/nodes/ch/channel-coding-theorem.json) — channel-coding-theorem
- [通信信道](../data/nodes/co/communication-channel.json) — communication-channel
- [条件熵](../data/nodes/co/conditional-entropy.json) — conditional-entropy
- [卷积码](../data/nodes/co/convolutional-code.json) — convolutional-code
- [纠错码](../data/nodes/er/error-correcting-code.json) — error-correcting-code
- [汉明码](../data/nodes/ha/hamming-code.json) — hamming-code
- [信息源](../data/nodes/in/information-source.json) — information-source
- [信息论](../data/nodes/in/information-theory.json) — information-theory
- [联合熵](../data/nodes/jo/joint-entropy.json) — joint-entropy
- [克拉夫特－麦克米兰不等式](../data/nodes/kr/kraft-inequality.json) — kraft-inequality
- [低密度奇偶校验码](../data/nodes/ld/ldpc-code.json) — ldpc-code
- [线性码](../data/nodes/li/linear-code.json) — linear-code
- [互信息](../data/nodes/mu/mutual-information.json) — mutual-information
- [极化码](../data/nodes/po/polar-code.json) — polar-code
- [前缀码](../data/nodes/pr/prefix-code.json) — prefix-code
- [率失真理论](../data/nodes/ra/rate-distortion-theory.json) — rate-distortion-theory
- [里德－所罗门码](../data/nodes/re/reed-solomon-code.json) — reed-solomon-code
- [香农熵](../data/nodes/sh/shannon-entropy.json) — shannon-entropy
- [信源编码](../data/nodes/so/source-coding.json) — source-coding
- [信源编码定理](../data/nodes/so/source-coding-theorem.json) — source-coding-theorem
- [Turbo 码](../data/nodes/tu/turbo-code.json) — turbo-code

既有补充：[霍夫曼编码](../data/nodes/hu/huffman.json)、[交叉熵](../data/nodes/cr/cross-entropy.json)、[KL 散度](../data/nodes/kl/kl-divergence.json)。

本领域正文引用 23 个不同的一手资料 URL；每个节点正文附对应的标准、官方文档、作者教材或论文链接。

### 知识工程、知识表示与语义网（新增 39，既有补充 2）

领域主线：逻辑与知识模型 → 本体/图表示 → 查询、校验与推理 → 知识工具/数据 → 共享与应用。

新增：

- [Apache Jena 语义网框架](../data/nodes/ap/apache-jena.json) — apache-jena
- [后向链推理](../data/nodes/ba/backward-chaining.json) — backward-chaining
- [封闭世界假设](../data/nodes/cl/closed-world-assumption.json) — closed-world-assumption
- [Cypher 图查询语言](../data/nodes/cy/cypher.json) — cypher
- [Datalog 逻辑查询语言](../data/nodes/da/datalog.json) — datalog
- [DBpedia 知识项目](../data/nodes/db/dbpedia.json) — dbpedia
- [描述逻辑](../data/nodes/de/description-logic.json) — description-logic
- [实体解析](../data/nodes/en/entity-resolution.json) — entity-resolution
- [专家系统](../data/nodes/ex/expert-system.json) — expert-system
- [一阶逻辑](../data/nodes/fi/first-order-logic.json) — first-order-logic
- [前向链推理](../data/nodes/fo/forward-chaining.json) — forward-chaining
- [关联数据 JSON 表示](../data/nodes/js/json-ld.json) — json-ld
- [知识库](../data/nodes/kn/knowledge-base.json) — knowledge-base
- [知识工程](../data/nodes/kn/knowledge-engineering.json) — knowledge-engineering
- [知识图谱](../data/nodes/kn/knowledge-graph.json) — knowledge-graph
- [知识表示](../data/nodes/kn/knowledge-representation.json) — knowledge-representation
- [关联数据](../data/nodes/li/linked-data.json) — linked-data
- [逻辑蕴涵](../data/nodes/lo/logical-entailment.json) — logical-entailment
- [N-Triples RDF 序列化](../data/nodes/n-/n-triples.json) — n-triples
- [本体工程](../data/nodes/on/ontology-engineering.json) — ontology-engineering
- [开放世界假设](../data/nodes/op/open-world-assumption.json) — open-world-assumption
- [Web 本体语言](../data/nodes/ow/owl.json) — owl
- [Owlready2 Python 本体库](../data/nodes/ow/owlready2.json) — owlready2
- [属性图](../data/nodes/pr/property-graph.json) — property-graph
- [Protégé 本体编辑器](../data/nodes/pr/protege.json) — protege
- [资源描述框架](../data/nodes/rd/rdf.json) — rdf
- [RDFLib Python RDF 库](../data/nodes/rd/rdflib.json) — rdflib
- [RDF 模式](../data/nodes/rd/rdfs.json) — rdfs
- [规则引擎](../data/nodes/ru/rule-engine.json) — rule-engine
- [语义互操作](../data/nodes/se/semantic-interoperability.json) — semantic-interoperability
- [语义网](../data/nodes/se/semantic-web.json) — semantic-web
- [形状约束语言](../data/nodes/sh/shacl.json) — shacl
- [简单知识组织系统](../data/nodes/sk/skos.json) — skos
- [SPARQL 图查询语言](../data/nodes/sp/sparql.json) — sparql
- [三元组存储](../data/nodes/tr/triple-store.json) — triple-store
- [Turtle RDF 序列化](../data/nodes/tu/turtle.json) — turtle
- [合一](../data/nodes/un/unification.json) — unification
- [W3C 来源模型](../data/nodes/w3/w3c-prov.json) — w3c-prov
- [维基数据](../data/nodes/wi/wikidata.json) — wikidata

既有补充：[Prolog 语言](../data/nodes/pr/prolog.json)、[Neo4j](../data/nodes/ne/neo4j.json)。

本领域正文引用 35 个不同的一手资料 URL；每个节点正文附对应的标准、官方文档、作者教材或论文链接。

## 分类、身份与关系

- domains：34 → 53，新增十九个主题标签，允许领域交叉归属。
- ontology：58 → 70，新增十二个概念分类；工具、数据制品、语言、标准、组织与度量继续按真实身份分类。
- ecosystems：64 → 75，新增十一个子生态，既有十个宏观根保持封闭。
- EntityType 与二十九种关系类型沿用既有契约；分类与建模决策见 [ADR-0027](decisions/0027-whole-domain-content-expansion.md)。

保持既有 id，不将同名对象合并。DFT 分别指密度泛函理论与离散傅里叶变换；功率变压器与 Transformer 模型分开；物理信噪比与既有认知语境的“信噪比”分开。RDF 是数据模型，Turtle 和 JSON-LD 是交换格式；OWL 逻辑推理与 SHACL 数据校验采用不同语义。

uses 连接实际使用的方法、模型或数据格式，并在 context 中说明场景；标准定义不等于任意两个产品必然互操作，可选求解器和模拟路线也不当作普遍依赖。本批未删除既有非分类边。

扩写同时纠正旧节点的身份与能力边界：神经算子不再把 FNO 当作同义词或承诺普遍加速倍数；TDP 与实际电功耗、PUE 与整体可持续性、普通控制器与安全认证分别说明。交叉审查还纠正分子动力学时间推进与数值求积的关系，并移除把组件角色、支持任务或结果目标误写成方法使用的边。

## 验证

- 全库契约、词表、本体、文件路径、关系类型/方向、引用和中文摘要校验通过，零错误、零警告。
- 354 个新增节点均至少有一条非分类入边或出边；本批全部 388 个新增/扩写节点都有正文、一手来源、ai_draft 状态和研究日期。
- 完整生产构建通过，统一生成数据快照、搜索与邻域索引、正文分块、Rust/WASM、站点及离线资源。
- 21 项 JS/WASM/构建单测与 8 项 Chromium 浏览器测试通过；web 与 tools 的 TypeScript 检查通过。
- 对构建后的实际数据执行 354 个新增 id 搜索、388 个新增/扩写节点的正文与摘要一致性及邻域读取，并通过 30 组中英文别名/同名消歧检查，包括 DFT 与 GO 的不同实体。

本批验证的数据快照版本为 `391407a3340fad835e7becec04a4d64e9d48a3f46141cfe8f1cafdd5e2f03968`，离线发布版本为 `ff030c445e2c`。后续内容变更需按仓库流程重新生成快照和验证。

## 主要资料体系

地理与遥感以 [OGC 标准](https://www.ogc.org/standards/) 和 [GDAL 官方文档](https://gdal.org/en/stable/) 为入口；医疗互操作参考 [HL7 FHIR](https://hl7.org/fhir/) 与 [DICOM 标准](https://www.dicomstandard.org/current)；生物数据与工具参考 [SAMtools 规范](https://samtools.github.io/hts-specs/) 和 [Bioconductor](https://www.bioconductor.org/)。

电力与工业参考 [pandapower](https://pandapower.readthedocs.io/en/latest/)、[OPC UA](https://opcfoundation.org/about/opc-technologies/opc-ua/) 及 IEC/ISA 的具体规范说明；模拟与射频参考器件厂商基础教程与 [ngspice](https://ngspice.sourceforge.io/docs.html)。优化与数值计算参考 [CVXPY](https://www.cvxpy.org/)、[SciPy](https://docs.scipy.org/doc/scipy/)、[PETSc](https://petsc.org/release/) 和研究作者教材；信号与媒体参考 [FFTW](https://www.fftw.org/fftw3_doc/)、[FFmpeg](https://ffmpeg.org/documentation.html) 和相关课程。

材料与计算化学参考 [Materials Project 方法](https://docs.materialsproject.org/methodology/materials-methodology/overview)、[VASP 理论](https://vasp.at/wiki/index.php/Category:Theory)、[GROMACS 手册](https://manual.gromacs.org/current/reference-manual/algorithms/molecular-dynamics.html) 与 [RDKit](https://www.rdkit.org/docs/GettingStartedInPython.html)；知识表示参考 [Poole 与 Mackworth 作者教材](https://artint.info/3e/html/ArtInt3e.Ch15.html)、[W3C RDF](https://www.w3.org/TR/rdf11-concepts/)、[OWL](https://www.w3.org/TR/owl2-overview/) 与 [SHACL](https://www.w3.org/TR/shacl/)。具体事实使用各节点正文的主题链接，以上为资料体系入口。
