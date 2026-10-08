# 2026-10-08 Tern、Ghostty 与开发工具链内容补全

本批从 2754 个数据节点开始，检索 ID、名称、缩写、别名和正文，未找到 Tern 或 Ghostty。对相关路径进一步审查，补全终端、Shell/CLI/TUI、字符与文本布局、原生桌面、语言分析和软件组成的缺口。

新增 273 个节点、实质扩写 30 个，全图增至 3027 个数据节点。全图关系边为 8317 条，其中分类挂载 3079 条，其余 5238 条；反向查询索引不重复计数，本体 parents 单独存储。本批新增 605 条非分类关系，删除 3 条既有关系。正文引用 545 个不同的一手资料 URL，按完整 URL 去重，不代表独立机构数。非空 description 从 1681 增至 1962。所有触及节点保留 ai_draft 与 2026-10-08 复核日期。

## 九条内容路径及完整节点清单

### 终端机制与终端协议（新增 43，扩写 0）

内容主线：终端仿真 → TTY/PTY → 行规程、会话和进程组 → termios 模式与流控制 → ECMA/VT 控制序列 → 输入、图像、剪贴板及能力协商。

新增：

- [ANSI Escape Sequences](../data/nodes/an/ansi-escape-sequence.json) — ansi-escape-sequence
- [Bracketed Paste Mode](../data/nodes/br/bracketed-paste.json) — bracketed-paste
- [Control Sequence Introducer](../data/nodes/co/control-sequence-introducer.json) — control-sequence-introducer
- [Controlling Terminal](../data/nodes/co/controlling-terminal.json) — controlling-terminal
- [Device Control String](../data/nodes/de/device-control-string.json) — device-control-string
- [ECMA-48](../data/nodes/ec/ecma-48.json) — ecma-48
- [Kitty Graphics Protocol](../data/nodes/ki/kitty-graphics-protocol.json) — kitty-graphics-protocol
- [Kitty Keyboard Protocol](../data/nodes/ki/kitty-keyboard-protocol.json) — kitty-keyboard-protocol
- [TTY Line Discipline](../data/nodes/li/line-discipline.json) — line-discipline
- [Operating System Command](../data/nodes/op/operating-system-command.json) — operating-system-command
- [OSC 133 Shell Markers](../data/nodes/os/osc-133.json) — osc-133
- [OSC 52 Clipboard](../data/nodes/os/osc-52.json) — osc-52
- [OSC 8 Hyperlinks](../data/nodes/os/osc-8.json) — osc-8
- [Process Group](../data/nodes/pr/process-group.json) — process-group
- [Pseudoterminal](../data/nodes/ps/pseudoterminal.json) — pseudoterminal
- [Select Graphic Rendition](../data/nodes/se/select-graphic-rendition.json) — select-graphic-rendition
- [Sixel](../data/nodes/si/sixel.json) — sixel
- [Synchronized Output](../data/nodes/sy/synchronized-output.json) — synchronized-output
- [TERM Environment Variable](../data/nodes/te/term-environment-variable.json) — term-environment-variable
- [termcap](../data/nodes/te/termcap.json) — termcap
- [Alternate Screen Buffer](../data/nodes/te/terminal-alternate-screen.json) — terminal-alternate-screen
- [Application Cursor Keys Mode](../data/nodes/te/terminal-application-cursor-mode.json) — terminal-application-cursor-mode
- [Terminal Screen Buffer](../data/nodes/te/terminal-buffer.json) — terminal-buffer
- [Canonical Terminal Input](../data/nodes/te/terminal-canonical-mode.json) — terminal-canonical-mode
- [Terminal Capability Negotiation](../data/nodes/te/terminal-capability-negotiation.json) — terminal-capability-negotiation
- [Cbreak Terminal Mode](../data/nodes/te/terminal-cbreak-mode.json) — terminal-cbreak-mode
- [Terminal Device Attributes](../data/nodes/te/terminal-device-attributes.json) — terminal-device-attributes
- [Terminal Emulation](../data/nodes/te/terminal-emulation.json) — terminal-emulation
- [Terminal Flow Control](../data/nodes/te/terminal-flow-control.json) — terminal-flow-control
- [Terminal Focus Reporting](../data/nodes/te/terminal-focus-reporting.json) — terminal-focus-reporting
- [Terminal Input Encoding](../data/nodes/te/terminal-input-encoding.json) — terminal-input-encoding
- [Terminal Input and Output Security](../data/nodes/te/terminal-input-security.json) — terminal-input-security
- [Terminal Mouse Reporting](../data/nodes/te/terminal-mouse-reporting.json) — terminal-mouse-reporting
- [Raw Terminal Mode](../data/nodes/te/terminal-raw-mode.json) — terminal-raw-mode
- [Terminal Resize Handling](../data/nodes/te/terminal-resize.json) — terminal-resize
- [Terminal Scrollback](../data/nodes/te/terminal-scrollback.json) — terminal-scrollback
- [terminfo](../data/nodes/te/terminfo.json) — terminfo
- [termios](../data/nodes/te/termios.json) — termios
- [TTY](../data/nodes/tt/tty.json) — tty
- [Unix Job Control](../data/nodes/un/unix-job-control.json) — unix-job-control
- [Unix Session](../data/nodes/un/unix-session.json) — unix-session
- [Unix Signal](../data/nodes/un/unix-signal.json) — unix-signal
- [DEC VT100 Control Sequences](../data/nodes/vt/vt100-control-sequences.json) — vt100-control-sequences

此分支正文引用 50 个不同的一手 URL，逐项事实及来源保存在对应节点正文。

### 终端产品、嵌入库与会话工具（新增 31，扩写 3）

内容主线：Ghostty 与 libghostty → 具体终端产品 → xterm.js/node-pty 与 ConPTY → tmux/Screen/Zellij 会话复用 → Mosh 与 Web 终端 → asciinema 录制与回放。

新增：

- [agg](../data/nodes/ag/agg-asciinema.json) — agg-asciinema
- [Alacritty](../data/nodes/al/alacritty.json) — alacritty
- [asciicast](../data/nodes/as/asciicast.json) — asciicast
- [asciinema CLI](../data/nodes/as/asciinema.json) — asciinema
- [asciinema player](../data/nodes/as/asciinema-player.json) — asciinema-player
- [Windows Pseudoconsole API](../data/nodes/co/conpty.json) — conpty
- [foot](../data/nodes/fo/foot.json) — foot
- [Ghostling](../data/nodes/gh/ghostling.json) — ghostling
- [Ghostty](../data/nodes/gh/ghostty.json) — ghostty
- [GNOME Terminal](../data/nodes/gn/gnome-terminal.json) — gnome-terminal
- [GNU Screen](../data/nodes/gn/gnu-screen.json) — gnu-screen
- [hterm](../data/nodes/ht/hterm.json) — hterm
- [iTerm2](../data/nodes/it/iterm2.json) — iterm2
- [kitty](../data/nodes/ki/kitty.json) — kitty
- [Konsole](../data/nodes/ko/konsole.json) — konsole
- [libghostty](../data/nodes/li/libghostty.json) — libghostty
- [libghostty-vt](../data/nodes/li/libghostty-vt.json) — libghostty-vt
- [libtsm](../data/nodes/li/libtsm.json) — libtsm
- [libvterm](../data/nodes/li/libvterm.json) — libvterm
- [Mosh](../data/nodes/mo/mosh.json) — mosh
- [node-pty](../data/nodes/no/node-pty.json) — node-pty
- [st](../data/nodes/st/st-terminal.json) — st-terminal
- [Terminal Multiplexing](../data/nodes/te/terminal-multiplexing.json) — terminal-multiplexing
- [Terminal Session Recording](../data/nodes/te/terminal-recording.json) — terminal-recording
- [ttyd](../data/nodes/tt/ttyd.json) — ttyd
- [VTE](../data/nodes/vt/vte.json) — vte
- [WeTTY](../data/nodes/we/wetty.json) — wetty
- [WezTerm](../data/nodes/we/wezterm.json) — wezterm
- [xterm](../data/nodes/xt/xterm.json) — xterm
- [xterm.js](../data/nodes/xt/xtermjs.json) — xtermjs
- [Zellij](../data/nodes/ze/zellij.json) — zellij

既有扩写：[tmux](../data/nodes/tm/tmux.json)、[Windows Terminal](../data/nodes/wi/windows-terminal.json)、[SSH](../data/nodes/ss/ssh.json)。

此分支正文引用 80 个不同的一手 URL，逐项事实及来源保存在对应节点正文。

### Shell、命令行机制与 TUI（新增 38，扩写 4）

内容主线：Shell/CLI/TUI → 命令展开与引用 → 管道、重定向和退出状态 → 登录与交互模式 → Shell 产品、补全和历史 → 行编辑与文本界面库。

新增：

- [bat](../data/nodes/ba/bat-command.json) — bat-command
- [Bubble Tea](../data/nodes/bu/bubble-tea.json) — bubble-tea
- [clap](../data/nodes/cl/clap.json) — clap
- [Click](../data/nodes/cl/click-python.json) — click-python
- [Cobra](../data/nodes/co/cobra.json) — cobra
- [Command-line Interface](../data/nodes/co/command-line-interface.json) — command-line-interface
- [Command Substitution](../data/nodes/co/command-substitution.json) — command-substitution
- [direnv](../data/nodes/di/direnv.json) — direnv
- [Environment Variable](../data/nodes/en/environment-variable.json) — environment-variable
- [Exit Status](../data/nodes/ex/exit-status.json) — exit-status
- [eza](../data/nodes/ez/eza.json) — eza
- [fish](../data/nodes/fi/fish.json) — fish
- [fzf](../data/nodes/fz/fzf.json) — fzf
- [GNU Readline](../data/nodes/gn/gnu-readline.json) — gnu-readline
- [Interactive Shell](../data/nodes/in/interactive-shell.json) — interactive-shell
- [libedit](../data/nodes/li/libedit.json) — libedit
- [Login Shell](../data/nodes/lo/login-shell.json) — login-shell
- [ncurses](../data/nodes/nc/ncurses.json) — ncurses
- [Notcurses](../data/nodes/no/notcurses.json) — notcurses
- [Nushell](../data/nodes/nu/nushell.json) — nushell
- [Oh My Zsh](../data/nodes/oh/oh-my-zsh.json) — oh-my-zsh
- [POSIX Shell Command Language](../data/nodes/po/posix-shell.json) — posix-shell
- [Rich](../data/nodes/ri/rich-python.json) — rich-python
- [ripgrep](../data/nodes/ri/ripgrep.json) — ripgrep
- [Shell](../data/nodes/sh/shell.json) — shell
- [Shell Completion](../data/nodes/sh/shell-completion.json) — shell-completion
- [Shell Expansion](../data/nodes/sh/shell-expansion.json) — shell-expansion
- [Shell History](../data/nodes/sh/shell-history.json) — shell-history
- [Shell Pipeline](../data/nodes/sh/shell-pipeline.json) — shell-pipeline
- [Shell Prompt](../data/nodes/sh/shell-prompt.json) — shell-prompt
- [Shell Quoting](../data/nodes/sh/shell-quoting.json) — shell-quoting
- [Shell Redirection](../data/nodes/sh/shell-redirection.json) — shell-redirection
- [Shell Startup Files](../data/nodes/sh/shell-startup-files.json) — shell-startup-files
- [Structured Shell Pipeline](../data/nodes/st/structured-shell-pipeline.json) — structured-shell-pipeline
- [Text User Interface](../data/nodes/te/text-user-interface.json) — text-user-interface
- [Textual](../data/nodes/te/textual.json) — textual
- [Typer](../data/nodes/ty/typer.json) — typer
- [zoxide](../data/nodes/zo/zoxide.json) — zoxide

既有扩写：[Bash](../data/nodes/ba/bash.json)、[zsh](../data/nodes/zs/zsh.json)、[PowerShell](../data/nodes/po/powershell.json)、[Starship](../data/nodes/st/starship.json)。

此分支正文引用 87 个不同的一手 URL，逐项事实及来源保存在对应节点正文。

### 命令行基础工具与数据处理（新增 24，扩写 0）

内容主线：GNU 与 BusyBox 工具集 → 文本过滤与选项解析 → Awk/jq/yq/Miller → 文件发现和同步 → curl/libcurl → 构建与任务执行 → 命令参考。

新增：

- [argparse](../data/nodes/ar/argparse-python.json) — argparse-python
- [Awk](../data/nodes/aw/awk.json) — awk
- [BusyBox](../data/nodes/bu/busybox.json) — busybox
- [Command-line Option](../data/nodes/co/command-line-option.json) — command-line-option
- [curl](../data/nodes/cu/curl.json) — curl
- [fd](../data/nodes/fd/fd-find.json) — fd-find
- [GNU Awk](../data/nodes/ga/gawk.json) — gawk
- [POSIX getopt()](../data/nodes/ge/getopt-posix.json) — getopt-posix
- [GNU Coreutils](../data/nodes/gn/gnu-coreutils.json) — gnu-coreutils
- [GNU Findutils](../data/nodes/gn/gnu-findutils.json) — gnu-findutils
- [GNU Grep](../data/nodes/gn/gnu-grep.json) — gnu-grep
- [GNU Make](../data/nodes/gn/gnu-make.json) — gnu-make
- [GNU Sed](../data/nodes/gn/gnu-sed.json) — gnu-sed
- [jq](../data/nodes/jq/jq.json) — jq
- [just](../data/nodes/ju/just-command.json) — just-command
- [libcurl](../data/nodes/li/libcurl.json) — libcurl
- [man-db](../data/nodes/ma/man-db.json) — man-db
- [Miller](../data/nodes/mi/miller.json) — miller
- [rsync](../data/nodes/rs/rsync.json) — rsync
- [Task](../data/nodes/ta/taskfile.json) — taskfile
- [Text Filtering](../data/nodes/te/text-filtering.json) — text-filtering
- [tldr pages](../data/nodes/tl/tldr-pages.json) — tldr-pages
- [GNU Wget](../data/nodes/wg/wget.json) — wget
- [yq (Mike Farah)](../data/nodes/yq/yq-mikefarah.json) — yq-mikefarah

此分支正文引用 47 个不同的一手 URL，逐项事实及来源保存在对应节点正文。

### Unicode、字体与文本布局（新增 25，扩写 0）

内容主线：码点与编码 → 规范化和字素分段 → emoji 与列宽 → BiDi 和塑形 → 字体发现与回退 → 字形及栅格化 → 实际库、格式和开发字体。

新增：

- [Unicode Combining Character](../data/nodes/co/combining-character.json) — combining-character
- [East Asian Width](../data/nodes/ea/east-asian-width.json) — east-asian-width
- [Unicode Emoji Sequence](../data/nodes/em/emoji-sequence.json) — emoji-sequence
- [Font Fallback](../data/nodes/fo/font-fallback.json) — font-fallback
- [Font Ligature](../data/nodes/fo/font-ligature.json) — font-ligature
- [Font Rasterization](../data/nodes/fo/font-rasterization.json) — font-rasterization
- [Fontconfig](../data/nodes/fo/fontconfig.json) — fontconfig
- [FreeType](../data/nodes/fr/freetype.json) — freetype
- [Glyph](../data/nodes/gl/glyph.json) — glyph
- [Unicode Grapheme Cluster](../data/nodes/gr/grapheme-cluster.json) — grapheme-cluster
- [HarfBuzz](../data/nodes/ha/harfbuzz.json) — harfbuzz
- [International Components for Unicode](../data/nodes/ic/icu.json) — icu
- [JetBrains Mono](../data/nodes/je/jetbrains-mono.json) — jetbrains-mono
- [Monospace Font](../data/nodes/mo/monospace-font.json) — monospace-font
- [Nerd Fonts](../data/nodes/ne/nerd-fonts.json) — nerd-fonts
- [OpenType](../data/nodes/op/opentype.json) — opentype
- [Text Shaping](../data/nodes/te/text-shaping.json) — text-shaping
- [TrueType](../data/nodes/tr/truetype.json) — truetype
- [Unicode](../data/nodes/un/unicode.json) — unicode
- [Unicode Bidirectional Algorithm](../data/nodes/un/unicode-bidi.json) — unicode-bidi
- [Unicode Code Point](../data/nodes/un/unicode-code-point.json) — unicode-code-point
- [Unicode Normalization](../data/nodes/un/unicode-normalization.json) — unicode-normalization
- [UTF-16](../data/nodes/ut/utf-16.json) — utf-16
- [UTF-8](../data/nodes/ut/utf-8.json) — utf-8
- [wcwidth](../data/nodes/wc/wcwidth.json) — wcwidth

此分支正文引用 52 个不同的一手 URL，逐项事实及来源保存在对应节点正文。

### 原生桌面界面与窗口系统（新增 25，扩写 0）

内容主线：窗口系统 → 显示服务器、窗口管理与合成 → X11/Wayland/XWayland → GTK/GLib/libadwaita → AppKit/SwiftUI → Pango/Cairo/Core Text/DirectWrite → 输入法与键盘映射。

新增：

- [AppKit](../data/nodes/ap/appkit.json) — appkit
- [Cairo](../data/nodes/ca/cairo.json) — cairo
- [Core Text](../data/nodes/co/core-text.json) — core-text
- [DirectWrite](../data/nodes/di/directwrite.json) — directwrite
- [Display Compositor](../data/nodes/di/display-compositor.json) — display-compositor
- [Display Server](../data/nodes/di/display-server.json) — display-server
- [Fcitx 5](../data/nodes/fc/fcitx5.json) — fcitx5
- [GIO](../data/nodes/gi/gio.json) — gio
- [GLib](../data/nodes/gl/glib.json) — glib
- [GObject](../data/nodes/go/gobject.json) — gobject
- [GTK](../data/nodes/gt/gtk.json) — gtk
- [GTK 4](../data/nodes/gt/gtk4.json) — gtk4
- [IBus](../data/nodes/ib/ibus.json) — ibus
- [Input Method Framework](../data/nodes/in/input-method-framework.json) — input-method-framework
- [libadwaita](../data/nodes/li/libadwaita.json) — libadwaita
- [libxkbcommon](../data/nodes/li/libxkbcommon.json) — libxkbcommon
- [Pango](../data/nodes/pa/pango.json) — pango
- [SwiftUI](../data/nodes/sw/swiftui.json) — swiftui
- [Text Layout](../data/nodes/te/text-layout.json) — text-layout
- [Wayland](../data/nodes/wa/wayland.json) — wayland
- [Window Manager](../data/nodes/wi/window-manager.json) — window-manager
- [Window System](../data/nodes/wi/window-system.json) — window-system
- [X11](../data/nodes/x1/x11.json) — x11
- [Xorg Server](../data/nodes/xo/xorg-server.json) — xorg-server
- [XWayland](../data/nodes/xw/xwayland.json) — xwayland

此分支正文引用 48 个不同的一手 URL，逐项事实及来源保存在对应节点正文。

### Tern JS 与语言分析工具链（新增 42，扩写 13）

内容主线：Tern JS 与独有查询协议 → JavaScript 解析器和 AST 格式 → 增量与容错分析 → 推断、符号和数据流 → CodeMirror/Lezer → 经典 TypeScript 服务与原生 LSP → ctags 和导航。

新增：

- [Acorn](../data/nodes/ac/acorn.json) — acorn
- [acorn-loose](../data/nodes/ac/acorn-loose.json) — acorn-loose
- [acorn-walk](../data/nodes/ac/acorn-walk.json) — acorn-walk
- [Code Tag Index](../data/nodes/co/code-tag-index.json) — code-tag-index
- [CodeMirror](../data/nodes/co/codemirror.json) — codemirror
- [CodeMirror 5](../data/nodes/co/codemirror-5.json) — codemirror-5
- [CodeMirror 6](../data/nodes/co/codemirror-6.json) — codemirror-6
- [Constraint-Based Type Inference](../data/nodes/co/constraint-based-type-inference.json) — constraint-based-type-inference
- [Control-Flow Analysis](../data/nodes/co/control-flow-analysis.json) — control-flow-analysis
- [Ctags Tag File Format](../data/nodes/ct/ctags-format.json) — ctags-format
- [Data-Flow Analysis](../data/nodes/da/data-flow-analysis.json) — data-flow-analysis
- [Error-Recovery Parsing](../data/nodes/er/error-recovery-parsing.json) — error-recovery-parsing
- [Espree](../data/nodes/es/espree.json) — espree
- [Esprima](../data/nodes/es/esprima.json) — esprima
- [Estraverse](../data/nodes/es/estraverse.json) — estraverse
- [ESTree](../data/nodes/es/estree.json) — estree
- [Exuberant Ctags](../data/nodes/ex/exuberant-ctags.json) — exuberant-ctags
- [Find References](../data/nodes/fi/find-references.json) — find-references
- [Flow](../data/nodes/fl/flow-type-checker.json) — flow-type-checker
- [GNU etags](../data/nodes/gn/gnu-etags.json) — gnu-etags
- [Go to Definition](../data/nodes/go/go-to-definition.json) — go-to-definition
- [Incremental Program Analysis](../data/nodes/in/incremental-analysis.json) — incremental-analysis
- [JSDoc](../data/nodes/js/jsdoc.json) — jsdoc
- [Lexical Scope](../data/nodes/le/lexical-scope.json) — lexical-scope
- [Lezer](../data/nodes/le/lezer.json) — lezer
- [Name Resolution](../data/nodes/na/name-resolution.json) — name-resolution
- [Rename Refactoring](../data/nodes/re/rename-refactoring.json) — rename-refactoring
- [Semantic Tokens](../data/nodes/se/semantic-tokens.json) — semantic-tokens
- [Source Map](../data/nodes/so/source-map.json) — source-map
- [Static Program Analysis](../data/nodes/st/static-analysis.json) — static-analysis
- [SWC](../data/nodes/sw/swc.json) — swc
- [Syntax Highlighting](../data/nodes/sy/syntax-highlighting.json) — syntax-highlighting
- [Emacs TAGS Format](../data/nodes/ta/tags-format.json) — tags-format
- [Tern](../data/nodes/te/tern-js.json) — tern-js
- [Tern JSON Query Protocol](../data/nodes/te/tern-query-protocol.json) — tern-query-protocol
- [tsserver](../data/nodes/ts/tsserver.json) — tsserver
- [tsserver Protocol](../data/nodes/ts/tsserver-protocol.json) — tsserver-protocol
- [TypeScript Language Server](../data/nodes/ty/typescript-language-server.json) — typescript-language-server
- [TypeScript Language Service](../data/nodes/ty/typescript-language-service.json) — typescript-language-service
- [TypeScript Native Compiler](../data/nodes/ty/typescript-native-compiler.json) — typescript-native-compiler
- [TypeScript Native Language Server](../data/nodes/ty/typescript-native-language-server.json) — typescript-native-language-server
- [Universal Ctags](../data/nodes/un/universal-ctags.json) — universal-ctags

既有扩写：[Babel](../data/nodes/ba/babel.json)、[esbuild](../data/nodes/es/esbuild.json)、[Type Inference](../data/nodes/ty/type-inference.json)、[AST](../data/nodes/as/ast.json)、[Symbol Table](../data/nodes/sy/symbol-table.json)、[Language Server](../data/nodes/la/language-server.json)、[Language Server Protocol](../data/nodes/la/language-server-protocol.json)、[Tree-sitter](../data/nodes/tr/tree-sitter.json)、[TypeScript](../data/nodes/ty/typescript.json)、[JavaScript](../data/nodes/ja/javascript.json)、[Code Completion](../data/nodes/co/code-completion.json)、[Incremental Parsing](../data/nodes/in/incremental-parsing.json)、[Semantic Analysis](../data/nodes/se/semantic-analysis.json)。

此分支正文引用 90 个不同的一手 URL，逐项事实及来源保存在对应节点正文。

### Tern 容器工具与软件组成（新增 40，扩写 9）

内容主线：容器 Tern → 包与二进制组件发现 → PURL/CPE/SWID 标识 → 许可证据 → SBOM 生成、校验和完整性 → 漏洞匹配与 VEX → 清单消费、聚合和生命周期。

新增：

- [Binary Component Identification](../data/nodes/bi/binary-component-identification.json) — binary-component-identification
- [CycloneDX Generator](../data/nodes/cd/cdxgen.json) — cdxgen
- [Software Component Dependency Graph](../data/nodes/co/component-dependency-graph.json) — component-dependency-graph
- [Software Component Inventory](../data/nodes/co/component-inventory.json) — component-inventory
- [Concluded License](../data/nodes/co/concluded-license.json) — concluded-license
- [Common Platform Enumeration](../data/nodes/cp/cpe.json) — cpe
- [Common Security Advisory Framework](../data/nodes/cs/csaf.json) — csaf
- [CycloneDX CLI](../data/nodes/cy/cyclonedx-cli.json) — cyclonedx-cli
- [CycloneDX VEX](../data/nodes/cy/cyclonedx-vex.json) — cyclonedx-vex
- [Declared License](../data/nodes/de/declared-license.json) — declared-license
- [Dependency Confusion](../data/nodes/de/dependency-confusion.json) — dependency-confusion
- [Dependency-Track](../data/nodes/de/dependency-track.json) — dependency-track
- [Evidence-based Component Identification](../data/nodes/ev/evidence-based-component-identification.json) — evidence-based-component-identification
- [FOSSology](../data/nodes/fo/fossology.json) — fossology
- [Graph for Understanding Artifact Composition](../data/nodes/gu/guac.json) — guac
- [License Detection](../data/nodes/li/license-detection.json) — license-detection
- [Microsoft SBOM Tool](../data/nodes/mi/microsoft-sbom-tool.json) — microsoft-sbom-tool
- [OpenVEX](../data/nodes/op/openvex.json) — openvex
- [OSS Review Toolkit](../data/nodes/os/oss-review-toolkit.json) — oss-review-toolkit
- [Open Source Vulnerabilities](../data/nodes/os/osv.json) — osv
- [OSV-Scanner](../data/nodes/os/osv-scanner.json) — osv-scanner
- [Open Source Vulnerability Format](../data/nodes/os/osv-schema.json) — osv-schema
- [Package Typosquatting](../data/nodes/pa/package-typosquatting.json) — package-typosquatting
- [Package-URL](../data/nodes/pa/package-url.json) — package-url
- [SBOM Aggregation](../data/nodes/sb/sbom-aggregation.json) — sbom-aggregation
- [SBOM Attestation](../data/nodes/sb/sbom-attestation.json) — sbom-attestation
- [SBOM Completeness](../data/nodes/sb/sbom-completeness.json) — sbom-completeness
- [SBOM Diff](../data/nodes/sb/sbom-diff.json) — sbom-diff
- [SBOM Generation](../data/nodes/sb/sbom-generation.json) — sbom-generation
- [SBOM Lifecycle](../data/nodes/sb/sbom-lifecycle.json) — sbom-lifecycle
- [SBOM Validation](../data/nodes/sb/sbom-validation.json) — sbom-validation
- [ScanCode Toolkit](../data/nodes/sc/scancode-toolkit.json) — scancode-toolkit
- [Software Composition Analysis](../data/nodes/so/software-composition-analysis.json) — software-composition-analysis
- [SPDX License Expression](../data/nodes/sp/spdx-license-expression.json) — spdx-license-expression
- [SPDX License List](../data/nodes/sp/spdx-license-list.json) — spdx-license-list
- [SPDX Tools Python](../data/nodes/sp/spdx-tools-python.json) — spdx-tools-python
- [Software Identification Tags](../data/nodes/sw/swid.json) — swid
- [Tern](../data/nodes/te/tern-container.json) — tern-container
- [Vulnerability Exploitability eXchange](../data/nodes/ve/vex.json) — vex
- [Vulnerability Matching](../data/nodes/vu/vulnerability-matching.json) — vulnerability-matching

既有扩写：[Artifact Attestation](../data/nodes/ar/artifact-attestation.json)、[Build Provenance](../data/nodes/bu/build-provenance.json)、[CycloneDX](../data/nodes/cy/cyclonedx.json)、[Grype](../data/nodes/gr/grype.json)、[SBOM](../data/nodes/sb/sbom.json)、[System Package Data Exchange](../data/nodes/sp/spdx.json)、[Syft](../data/nodes/sy/syft.json)、[Trivy](../data/nodes/tr/trivy.json)、[Vulnerability Scanning](../data/nodes/vu/vulnerability-scanning.json)。

此分支正文引用 83 个不同的一手 URL，逐项事实及来源保存在对应节点正文。

### 标准流、系统资源与 Windows 控制台（新增 5，扩写 1）

内容主线：POSIX 接口与 Shell 标准 → 描述符与标准流 → 匿名管道与 POSIX FIFO → Console Host → 终端与伪控制台接口。

新增：

- [Anonymous Pipe](../data/nodes/an/anonymous-pipe.json) — anonymous-pipe
- [Windows Console Host](../data/nodes/co/console-host.json) — console-host
- [File Descriptor](../data/nodes/fi/file-descriptor.json) — file-descriptor
- [POSIX Named Pipe (FIFO)](../data/nodes/na/named-pipe.json) — named-pipe
- [Standard Streams](../data/nodes/st/standard-streams.json) — standard-streams

既有扩写：[POSIX](../data/nodes/po/posix.json)。

此分支正文引用 12 个不同的一手 URL，逐项事实及来源保存在对应节点正文。

## 身份、版本与关系边界

- tern-js 与 tern-container 分别指 JavaScript 分析器与容器包检查/SBOM 工具，name 可同为 Tern；限定别名和摘要消歧，同名搜索必须返回两者。Tern 查询协议与 LSP 分开。
- 终端、Shell、PTY、Console Host 和 ConPTY 具有不同职责，窗口分割、会话复用与作业控制分别记录；xterm.js 的显示能力不等于启动子进程的系统桥接。
- Ghostty 桌面应用的平台支持与 libghostty 库分别限定；开发分支文档、未独立标记版本的库接口与正式应用发行分开。私有终端扩展不写成全部终端通用标准。
- Unicode 正式标准与未来草案分开，码点、编码单元、字素、字形和列数分别说明；East Asian Width 不能不加条件地替代现代终端的全部宽度算法。
- 原生 GUI 框架、窗口协议、显示服务、合成器与输入法各有接口身份；XWayland 是特定兼容路径，GTK4 版本实体与 GTK 家族分别表达。
- CodeMirror 迁移源码托管位置不等于废弃；TypeScript 原生编译器/LSP 与经典 tsserver、Language Service 及其嵌入 API 按正式发布和版本范围说明。
- SBOM 发现、许可声明与证据、清单校验、漏洞匹配和 VEX 分别表达；结构有效、签名存在和安全声明不自动证明完整或无风险。Tern 的可选 ScanCode 集成不写成所有运行都必需的功能。
- 所有新增节点都有真实非分类入边或出边，无仅为连通数量补造的 uses、组成或依赖。

## 分类与契约

本体 95 → 101（0.16.0）、领域 74 → 79（0.10.0）、生态 96 → 101（0.8.0）。新增分类、具体挂载与平台边界见 [ADR-0033](decisions/0033-terminal-language-tooling-and-software-composition.md) 与 [约定第19节](../contracts/conventions.md)。Schema 3.5.1、二十九种关系、十个宏观生态根不变。

## 验证

- 全量节点、分类、词表、必填字段、关系域值、镜像方向与 context 校验通过。
- 新增及扩写内容至少三段实质正文、至少两条一手引用、摘要不超过五十字；基线节点未删除，新增节点无非分类孤立。
- 三组独立内容复核及桌面子复核完成，剩余必须修复问题为零。
- 完整生产构建通过；21 项单元测试、8 项 Chromium 浏览器测试，以及 web/tools TypeScript 检查通过。浏览器测试覆盖真实 WASM、失败回退、离线安装/更新/恢复与双标签快照。
- 对全部 273 个新增 ID 搜索、303 个摘要/正文/邻域，以及 899 项名称/别名/缩写检索执行实际 JavaScript 和 WASM 两端核验；结果一致，WASM 后端没有静默回退。Tern 同名双实体检索与 Ghostty 检索均通过。
- 数据版本：`dd19bf6d1edd59990b8964aa539e720a4d55903eec344f853422bf64febfbd4a`；离线发布：`60f904384b96`，包含 450 个资源。

生成资源与验证日志保留在忽略目录，事实来源为 data/nodes 与 contracts 中的作者文件。
