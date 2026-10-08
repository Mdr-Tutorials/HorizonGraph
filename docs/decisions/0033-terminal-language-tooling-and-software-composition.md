# ADR-0033：终端、语言工具链与软件组成

- 状态：已接受
- 日期：2026-10-08

## 背景

对上一批完成后的 2754 个数据节点检索 ID、名称、缩写、别名及正文，未找到 Tern 或 Ghostty。已有 Windows Terminal、Shell、语言服务器及 SBOM 条目仍缺少终端机制与协议、字符与字体处理、具体分析器和清单消费的完整路径。

Tern 有两个独立的开发工具项目：JavaScript 代码分析引擎与容器软件包检查/SBOM 工具。本批分别收录两者，并沿终端工程、Shell/CLI/TUI、Unicode 与排版、语言分析和软件组成扩展。完整清单、计数和验证见 [内容批次记录](../content-tern-ghostty-and-developer-tooling-2026-10.md)。

## 决策

1. 本体 95 → 101，版本 0.16.0。新增 terminal-concept、command-line-concept、language-tooling-concept、text-layout-concept、desktop-interface-concept，均继承 theory；terminal-specification 继承 protocol。操作系统资源机制复用 os-mechanism，供应链概念复用 software-supply-chain-concept。字体资源按 product、字体库按 library、具体工具按 tool 表达。
2. 领域 74 → 79，版本 0.10.0。新增 terminal-engineering、command-line-tools、language-tooling、text-rendering、desktop-application-development；软件组成与 SBOM 继续使用已登记的 software-supply-chain。没有为同名项目重复登记领域。
3. 生态 96 → 101，版本 0.8.0。终端与 Shell/CLI 同时归入操作系统和软件工程工具链，语言工具链兼属语言运行时及编辑器生态，Unicode/文本渲染兼属图形及 Web，桌面 GUI/窗口系统兼属操作系统、图形与工具链。成员按实际产品范围声明，不因同一批收录而附加所有生态。
4. 类型 Schema 保持 3.5.1、二十九种关系和十个宏观生态根不变。保留所有既有节点 ID；两个 Tern 分别使用 tern-js 与 tern-container，允许相同 name 与 Tern 搜索名，以类型、摘要和限定别名消歧。
5. API、控制序列规范、文件交换格式、软件库和工具分别记录。规范不因运行在网络连接上就统一归为网络协议，也不因属于代码工具就全部挂 api-specification。termios、ConPTY 与 wcwidth 按具体接口身份表达；终端私有扩展注明来源和能力范围。

## 终端与文本边界

终端仿真器负责输入编码与输出呈现，Shell 解释命令，TTY/PTY 与相应操作系统接口承载通信和控制。终端多标签窗口、终端会话复用、Shell 的作业控制与进程组并非同一层机制。Windows Console Host、ConPTY 和 Windows Terminal 各有交付及接口身份，标准流不等于某个图形窗口。[Microsoft 定义](https://learn.microsoft.com/en-us/windows/console/definitions)

ECMA 控制序列、xterm 扩展、Kitty 键盘/图像协议、Sixel、OSC 8/52/133 与同步输出分别说明。支持其中一个协议不能推导支持其他协议；剪贴板读写和粘贴处理有各自权限与输入边界。Ghostty 的正式版本、开发分支和 libghostty 接口成熟度按当前官方材料限定，未发布功能不作为全部安装实例的能力。[Ghostty 功能](https://ghostty.org/docs/features)、[SSH 开发版本条件](https://ghostty.org/docs/features/ssh)

码点、编码单元、字素簇、字形和终端列宽分别定义。Unicode 分段、双向算法和文本塑形有不同作用；字体连字、字符组合和 emoji 序列不保证都占同一个固定列数。HarfBuzz、FreeType、Fontconfig 与实际字体资产分别建档，库的功能以现行接口资料为准。

平台原生 GUI 框架、窗口协议、显示服务器、窗口管理器与合成器分别说明。GTK/libadwaita、AppKit/SwiftUI 与终端文本引擎具有不同职责；Wayland 协议不是某个合成器的别名，XWayland 提供 X 客户端兼容路径，不把所有 X11/Wayland 交互自动视为同一个 API。

## 语言工具链与软件组成边界

Tern JS 的 JSON 查询接口、tsserver 协议与 LSP 是不同接口。编辑器、解析器、推断引擎、语言服务与 LSP 适配器分别记录；容错解析、静态类型检查、补全结果与重命名行为的保证范围注明实现条件。CodeMirror 品牌、不同代际实现与其解析库按真实关系连接，迁移源码托管位置不等于项目废弃。[Tern 手册](https://ternjs.net/doc/manual.html)

容器 Tern 逐层发现软件包和生成清单；可选许可证检测器与工具原生能力分开。组件发现、软件标识、许可声明和证据、漏洞匹配、VEX、清单校验、来源证明与安全决策各有范围。SBOM 结构有效不证明完整，签名或 VEX 声明也不自动证明目标安全；描述字段不作为法律结论。[Tern 容器项目](https://github.com/tern-tools/tern)

实际采用者持有 uses，规范实现方持有 implements，context 限定平台、配置或可选后端；不把实现语言、社区插件、品牌归属或功能相似写成无条件硬依赖。新增节点通过可证实的关系接入图谱，不能为数量目标制造组成和依赖边。

## 结果

两个 Tern 可通过同名搜索分别进入语言分析与容器软件组成路径，Ghostty 可沿终端、操作系统、协议、字符处理及交互工具继续探索。新增与扩写内容均保留 ai_draft 和 2026-10-08 复核日期；最终构建、真实 JS/WASM 检索和离线检查结果写入内容批次记录。
