# 2026-10-08 WSL 与容器工程内容补全

本批开始时，全库 id、name、abbreviation、aliases 及相关正文核查未找到 WSLc 或 WSL。已有容器、Docker、containerd、OCI、Linux Namespaces、cgroup 等条目缺少完整正文，Windows/Linux 承载与互操作没有形成主线。本批从微软 WSL containers CLI（wslc.exe）缺失继续审计，按七个相关领域分支补全。

以图形与 Hono 批次完成后的 2238 个数据节点为基线，新增 132 个、实质扩写 20 个，全图增至 2370 个。新增 421 条非分类关系；新增与扩写正文包含 346 个不同的一手资料 URL（按完整 URL 去重，分支来源数不能直接相加）。全图非空 description 从 1087 增至 1238。本批内容统一 origin: ai_draft、last_reviewed: 2026-10-08。

## 范围与完整节点清单

### Windows/Linux 互操作、WSL 与系统虚拟化平台（新增 21，扩写 4）

工程主线：Windows 产品与 NT 内核→WSL 家族/WSL 1 转译/WSL 2 真实内核→发行版与分层配置→Shell/终端/命令互操作→WSLg 图形桥接；Windows 容器的进程与 Hyper-V 隔离→HCS/HNS 宿主服务→hcsshim/runhcs/OCI 执行接口；系统虚拟机→hypervisor→硬件辅助与地址翻译→Hyper-V/KVM/QEMU→utility VM 的平台管理与共享粒度。

新增：

- [Bash](../data/nodes/ba/bash.json) — bash
- [Hardware-assisted Virtualization](../data/nodes/ha/hardware-assisted-virtualization.json) — hardware-assisted-virtualization
- [hcsshim](../data/nodes/hc/hcsshim.json) — hcsshim
- [Host Compute Service](../data/nodes/ho/host-compute-service.json) — host-compute-service
- [Host Networking Service](../data/nodes/ho/host-network-service.json) — host-network-service
- [Hyper-V](../data/nodes/hy/hyper-v.json) — hyper-v
- [Hypervisor](../data/nodes/hy/hypervisor.json) — hypervisor
- [PowerShell](../data/nodes/po/powershell.json) — powershell
- [runhcs](../data/nodes/ru/runhcs.json) — runhcs
- [System Virtual Machine](../data/nodes/sy/system-virtual-machine.json) — system-virtual-machine
- [Utility Virtual Machine](../data/nodes/ut/utility-vm.json) — utility-vm
- [Microsoft Windows](../data/nodes/wi/windows.json) — windows
- [Windows Containers](../data/nodes/wi/windows-containers.json) — windows-containers
- [Windows Terminal](../data/nodes/wi/windows-terminal.json) — windows-terminal
- [Windows Subsystem for Linux](../data/nodes/ws/wsl.json) — wsl
- [WSL 1](../data/nodes/ws/wsl-1.json) — wsl-1
- [WSL 2](../data/nodes/ws/wsl-2.json) — wsl-2
- [WSL Configuration](../data/nodes/ws/wsl-configuration.json) — wsl-configuration
- [WSL Distribution](../data/nodes/ws/wsl-distribution.json) — wsl-distribution
- [WSL Interoperability](../data/nodes/ws/wsl-interop.json) — wsl-interop
- [Windows Subsystem for Linux GUI](../data/nodes/ws/wslg.json) — wslg

既有扩写：[Windows NT Kernel](../data/nodes/wi/windows-nt.json)、[Ubuntu](../data/nodes/ub/ubuntu.json)、[KVM](../data/nodes/kv/kvm.json)、[QEMU](../data/nodes/qe/qemu.json)。

本分支正文引用 65 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### WSL Containers、OCI 与容器运行时（新增 15，扩写 7）

工程主线：OCI 组织 → OCI 规范族 → Runtime / Image / Distribution 三种职责；OCI Runtime bundle → runc / crun → containerd / CRI-O → CRI → Kubernetes；Docker / Podman / nerdctl 用户入口 → 引擎与可选构建、网络后端；Windows → WSL → WSL Containers Session VM → CLI / API / SDK → Linux 容器。

新增：

- [Container Runtime](../data/nodes/co/container-runtime.json) — container-runtime
- [Container Runtime Interface](../data/nodes/cr/cri.json) — cri
- [CRI-O](../data/nodes/cr/cri-o.json) — cri-o
- [crun](../data/nodes/cr/crun.json) — crun
- [Docker Engine](../data/nodes/do/docker-engine.json) — docker-engine
- [Moby](../data/nodes/mo/moby.json) — moby
- [nerdctl](../data/nodes/ne/nerdctl.json) — nerdctl
- [OCI Runtime Specification](../data/nodes/oc/oci-runtime-spec.json) — oci-runtime-spec
- [Open Container Initiative](../data/nodes/op/open-container-initiative.json) — open-container-initiative
- [Podman](../data/nodes/po/podman.json) — podman
- [runc](../data/nodes/ru/runc.json) — runc
- [WSL Container API](../data/nodes/ws/wsl-container-api.json) — wsl-container-api
- [WSL Container SDK](../data/nodes/ws/wsl-container-sdk.json) — wsl-container-sdk
- [WSL Containers](../data/nodes/ws/wsl-containers.json) — wsl-containers
- [WSLc](../data/nodes/ws/wslc.json) — wslc

既有扩写：[Containers](../data/nodes/co/containers.json)、[Docker](../data/nodes/do/docker.json)、[containerd](../data/nodes/co/containerd.json)、[OCI Specifications](../data/nodes/oc/oci.json)、[Kubernetes](../data/nodes/ku/kubernetes.json)、[Cloud Native Computing Foundation](../data/nodes/cn/cncf.json)、[Docker, Inc.](../data/nodes/do/docker-inc.json)。

本分支正文引用 65 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### 容器镜像结构、构建、交换与分发（新增 20，扩写 0）

工程主线：Dockerfile与上下文 → 多阶段构建 → Buildx客户端 → BuildKit或Buildah → 构建缓存与导出；容器镜像 → 配置与层 → image manifest → image index → 多平台发布和实例选择；image tag名称引用 → 内容摘要 → OCI Image格式 → OCI Distribution传输 → container registry；Skopeo检查/复制/同步 → OCI layout或镜像仓库；ORAS通用工件客户端 → Docker Hub或Harbor。

新增：

- [Build Cache](../data/nodes/bu/build-cache.json) — build-cache
- [Buildah](../data/nodes/bu/buildah.json) — buildah
- [BuildKit](../data/nodes/bu/buildkit.json) — buildkit
- [Container Image](../data/nodes/co/container-image.json) — container-image
- [Container Image Digest](../data/nodes/co/container-image-digest.json) — container-image-digest
- [Container Registry](../data/nodes/co/container-registry.json) — container-registry
- [Docker Buildx](../data/nodes/do/docker-buildx.json) — docker-buildx
- [Docker Hub](../data/nodes/do/docker-hub.json) — docker-hub
- [Dockerfile](../data/nodes/do/dockerfile.json) — dockerfile
- [Harbor](../data/nodes/ha/harbor.json) — harbor
- [Image Index](../data/nodes/im/image-index.json) — image-index
- [Image Layer](../data/nodes/im/image-layer.json) — image-layer
- [Image Manifest](../data/nodes/im/image-manifest.json) — image-manifest
- [Image Tag](../data/nodes/im/image-tag.json) — image-tag
- [Multi-platform Image](../data/nodes/mu/multi-platform-image.json) — multi-platform-image
- [Multi-stage Build](../data/nodes/mu/multi-stage-build.json) — multi-stage-build
- [OCI Distribution Specification](../data/nodes/oc/oci-distribution-spec.json) — oci-distribution-spec
- [OCI Image Specification](../data/nodes/oc/oci-image-spec.json) — oci-image-spec
- [ORAS](../data/nodes/or/oras.json) — oras
- [Skopeo](../data/nodes/sk/skopeo.json) — skopeo

本分支正文引用 49 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### Linux 容器隔离、资源约束与沙箱运行时（新增 14，扩写 3）

工程主线：Linux Namespaces；Linux User Namespace；Linux PID Namespace；Linux Network Namespace；Linux Mount Namespace；cgroup；Linux Capabilities；seccomp；AppArmor；SELinux；Rootless Containers；chroot；Container Isolation；systemd；gVisor；Kata Containers；Firecracker。

新增：

- [AppArmor](../data/nodes/ap/apparmor.json) — apparmor
- [chroot](../data/nodes/ch/chroot.json) — chroot
- [Container Isolation](../data/nodes/co/container-isolation.json) — container-isolation
- [Firecracker](../data/nodes/fi/firecracker.json) — firecracker
- [gVisor](../data/nodes/gv/gvisor.json) — gvisor
- [Kata Containers](../data/nodes/ka/kata-containers.json) — kata-containers
- [Linux Capabilities](../data/nodes/li/linux-capabilities.json) — linux-capabilities
- [Linux Mount Namespace](../data/nodes/mo/mount-namespace.json) — mount-namespace
- [Linux Network Namespace](../data/nodes/ne/network-namespace.json) — network-namespace
- [Linux PID Namespace](../data/nodes/pi/pid-namespace.json) — pid-namespace
- [Rootless Containers](../data/nodes/ro/rootless-container.json) — rootless-container
- [seccomp](../data/nodes/se/seccomp.json) — seccomp
- [SELinux](../data/nodes/se/selinux.json) — selinux
- [Linux User Namespace](../data/nodes/us/user-namespace.json) — user-namespace

既有扩写：[Linux Namespaces](../data/nodes/na/namespace.json)、[cgroup](../data/nodes/cg/cgroup.json)、[systemd](../data/nodes/sy/systemd.json)。

本分支正文引用 36 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### 跨宿主文件访问、容器持久化与网络（新增 24，扩写 4）

工程主线：DrvFs；9P；virtiofs；FUSE；VIRTIO；VHDX；ext4；Filesystem Mount；Bind Mount；Container Volume；OverlayFS；inotify；Container Networking；Container Network Interface；Linux Network Namespace；veth；Linux Bridge；Port Publishing；NAT；Netfilter；nftables；iptables；WSL Networking；WSL Mirrored Networking；WSL DNS Tunneling；Consommé Networking；DNS；SMB；Samba。

新增：

- [Bind Mount](../data/nodes/bi/bind-mount.json) — bind-mount
- [Container Network Interface](../data/nodes/cn/cni.json) — cni
- [Consommé Networking](../data/nodes/co/consomme-networking.json) — consomme-networking
- [Container Networking](../data/nodes/co/container-networking.json) — container-networking
- [Container Volume](../data/nodes/co/container-volume.json) — container-volume
- [DrvFs](../data/nodes/dr/drvfs.json) — drvfs
- [Filesystem Mount](../data/nodes/fi/filesystem-mount.json) — filesystem-mount
- [FUSE](../data/nodes/fu/fuse.json) — fuse
- [inotify](../data/nodes/in/inotify.json) — inotify
- [iptables](../data/nodes/ip/iptables.json) — iptables
- [Linux Bridge](../data/nodes/li/linux-bridge.json) — linux-bridge
- [Netfilter](../data/nodes/ne/netfilter.json) — netfilter
- [nftables](../data/nodes/nf/nftables.json) — nftables
- [OverlayFS](../data/nodes/ov/overlayfs.json) — overlayfs
- [9P](../data/nodes/pl/plan9-file-protocol.json) — plan9-file-protocol
- [Port Publishing](../data/nodes/po/port-publishing.json) — port-publishing
- [Samba](../data/nodes/sa/samba.json) — samba
- [veth](../data/nodes/ve/veth.json) — veth
- [VHDX](../data/nodes/vh/vhdx.json) — vhdx
- [VIRTIO](../data/nodes/vi/virtio.json) — virtio
- [virtiofs](../data/nodes/vi/virtiofs.json) — virtiofs
- [WSL DNS Tunneling](../data/nodes/ws/wsl-dns-tunneling.json) — wsl-dns-tunneling
- [WSL Mirrored Networking](../data/nodes/ws/wsl-mirrored-networking.json) — wsl-mirrored-networking
- [WSL Networking](../data/nodes/ws/wsl-networking.json) — wsl-networking

既有扩写：[ext4](../data/nodes/ex/ext4.json)、[NAT](../data/nodes/na/nat.json)、[DNS](../data/nodes/dn/dns.json)、[SMB](../data/nodes/sm/smb.json)。

本分支正文引用 41 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### 开发环境、开发容器与跨宿主工作区（新增 19，扩写 1）

工程主线：developer-environment → reproducible-development-environment → dev-container-spec；dev-container-spec → dev-container-cli → vscode-dev-containers / github-codespaces / devpod；compose-spec → docker-compose / wslc-compose → docker-engine / wslc；本地桌面管理：docker-desktop / podman-desktop / wslc-desktop；跨宿主 VM：lima → colima；vagrant / multipass；WSL 编辑：vscode-remote-wsl；宿主集成用户空间：distrobox → podman / docker。

新增：

- [Colima](../data/nodes/co/colima.json) — colima
- [Compose Specification](../data/nodes/co/compose-spec.json) — compose-spec
- [Dev Container CLI](../data/nodes/de/dev-container-cli.json) — dev-container-cli
- [Development Containers Specification](../data/nodes/de/dev-container-spec.json) — dev-container-spec
- [Developer Environment](../data/nodes/de/developer-environment.json) — developer-environment
- [DevPod](../data/nodes/de/devpod.json) — devpod
- [Distrobox](../data/nodes/di/distrobox.json) — distrobox
- [Docker Compose](../data/nodes/do/docker-compose.json) — docker-compose
- [Docker Desktop](../data/nodes/do/docker-desktop.json) — docker-desktop
- [GitHub Codespaces](../data/nodes/gi/github-codespaces.json) — github-codespaces
- [Lima](../data/nodes/li/lima.json) — lima
- [Multipass](../data/nodes/mu/multipass.json) — multipass
- [Podman Desktop](../data/nodes/po/podman-desktop.json) — podman-desktop
- [Reproducible Development Environment](../data/nodes/re/reproducible-development-environment.json) — reproducible-development-environment
- [Vagrant](../data/nodes/va/vagrant.json) — vagrant
- [VS Code Dev Containers](../data/nodes/vs/vscode-dev-containers.json) — vscode-dev-containers
- [VS Code WSL](../data/nodes/vs/vscode-remote-wsl.json) — vscode-remote-wsl
- [wslc-compose](../data/nodes/ws/wslc-compose.json) — wslc-compose
- [WSLC Desktop](../data/nodes/ws/wslc-desktop.json) — wslc-desktop

既有扩写：[VS Code](../data/nodes/vs/vscode.json)。

本分支正文引用 55 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

### 软件供应链与镜像信任（新增 19，扩写 1）

工程主线：组件清单与交换格式 → 已知漏洞比对 → 构建来源与声明绑定 → 镜像签名 → 身份证书与透明日志 → 消费方信任策略验证。

新增：

- [Artifact Attestation](../data/nodes/ar/artifact-attestation.json) — artifact-attestation
- [Build Provenance](../data/nodes/bu/build-provenance.json) — build-provenance
- [Cosign](../data/nodes/co/cosign.json) — cosign
- [CycloneDX](../data/nodes/cy/cyclonedx.json) — cyclonedx
- [Fulcio](../data/nodes/fu/fulcio.json) — fulcio
- [Grype](../data/nodes/gr/grype.json) — grype
- [Image Signing](../data/nodes/im/image-signing.json) — image-signing
- [in-toto](../data/nodes/in/in-toto.json) — in-toto
- [in-toto Statement](../data/nodes/in/in-toto-statement.json) — in-toto-statement
- [Notary Project](../data/nodes/no/notary-project.json) — notary-project
- [Notation](../data/nodes/no/notation.json) — notation
- [Rekor](../data/nodes/re/rekor.json) — rekor
- [Reproducible Build](../data/nodes/re/reproducible-build.json) — reproducible-build
- [Sigstore](../data/nodes/si/sigstore.json) — sigstore
- [Supply-chain Levels for Software Artifacts](../data/nodes/sl/slsa.json) — slsa
- [System Package Data Exchange](../data/nodes/sp/spdx.json) — spdx
- [Syft](../data/nodes/sy/syft.json) — syft
- [Trivy](../data/nodes/tr/trivy.json) — trivy
- [Vulnerability Scanning](../data/nodes/vu/vulnerability-scanning.json) — vulnerability-scanning

既有扩写：[SBOM](../data/nodes/sb/sbom.json)。

本分支正文引用 43 个不同的一手资料 URL，具体事实和直接来源保存在节点正文。

## 分类与身份

本体 81 → 86（0.13.0）、领域 62 → 66（0.7.0）、生态 85 → 89（0.5.0）。新增四个概念分类和一个规范分类、四个领域、四个子生态；类型 Schema 保持 3.5.1，二十九种关系和十个宏观生态根不变。分类与身份决策见 [ADR-0030](decisions/0030-wsl-and-container-engineering.md)。

WSL 平台、WSL 1/2 架构、WSLc CLI、容器功能、API 与 SDK 分别建档。OCI 的组织、规范族与 Runtime/Image/Distribution 规范分别说明；规范不混作软件或组织，工具的实现与治理关系分别记录。Linux Namespaces 和 cgroup 按内核机制纠正为 concept，稳定 id 保持不变。

镜像、运行容器、镜像层、manifest/index、tag/digest、卷与 bind mount 各有定义。开发容器和 Compose 的声明规范与执行工具、编辑器插件及远程服务分别建档；供应链的清单、签名、证明与扫描各有边界。

## 版本、关系与事实边界

- [微软 2026-09-29 发布说明](https://blogs.windows.com/windowsdeveloper/2026/09/29/wsl-containers-now-generally-available/)与 [WSL 3.0.1 发布记录](https://github.com/microsoft/WSL/releases/tag/3.0.1)确认 WSL containers 整体正式发布。历史最低版本、SDK 语言投影的独立预览状态和社区项目的旧描述分开限定；官方 Compose 路线图不记作已提供的命令。
- [WSLc 架构](https://devblogs.microsoft.com/commandline/wslc-architecture-deep-dive/)中的 session、VM、普通发行版和容器是不同的生命周期对象；不将 session 管理写成每个容器一个独立 VM，也不把普通 WSL 的安全描述直接套到新的 session 实现。
- WSLc 内部复用 containerd、Docker Engine 和 Buildx 的路径使用固定版本源码说明。内部实现不等于完整公共 Docker CLI/API 兼容承诺，OCI 分发接口不等同 Engine 管理接口。
- Windows 路径、Linux 文件系统、DrvFs、9P、virtiofs、VHD 和 bind mount 分别说明。性能、变更事件、权限与持久性不互相推导；WSLc 会话配置与普通 WSL 配置分别限定。
- Docker 的 Linux/Windows 路径、QEMU 的软件模拟和不同加速后端、Kubernetes 控制平面与工作节点支持范围分别说明，移除错误的无条件硬依赖。containerd 原始研发与 CNCF 治理分别表达。
- DNS 的可用传输路径不简化为必须使用 UDP；SMB 协议与 Samba 实现分别建档，文件共享主题相近不足以推断它们与 WSL 挂载后端的依赖关系。
- 命名空间、资源约束、rootless、沙箱和虚拟机隔离分别说明。制品 digest、签名、来源证明、SBOM、漏洞扫描与授权不是同一种证据，也不构成普遍安全保证。

## 验证

- 全库校验零错误、零警告；所有 132 个新增节点有非分类入边或出边，全部 152 篇新增/扩写正文附来源与本批元数据。
- 完整生产构建通过，生成统一版本的数据、索引、正文、Rust/WASM、静态站点与离线资源清单。
- 21 项单测、8 项 Chromium 测试，以及 web/tools TypeScript 检查通过。
- 实际构建产物验证 132 个新增 ID 搜索、152 篇摘要/正文/邻域读取、419 次名称/别名/缩写查询；版本词条按实际搜索契约允许折叠至匹配的母体。
- 数据快照：`080c86c2ce669b296db89e40b7927217c9db2b3bad08db5f4d637318e91c40aa`。

## 一手资料入口

微软来源包括现行 WSL Learn 文档、wsl.dev 架构和 API、Windows 发布公告及固定 WSL 3.0.1 源码；Linux 机制使用 kernel.org 与 Linux man-pages。OCI、Docker、containerd、Podman、BuildKit、Buildah、ORAS 等分别使用对应项目的规范与实现资料。

开发环境使用 Development Containers、VS Code、GitHub、Lima 等项目官方资料；社区 WSLc 工具使用其作者仓库并明确项目归属。供应链使用 SPDX、CycloneDX、SLSA、Sigstore、Notary Project、in-toto 及扫描工具官方文档，版本和验证条件分别限定。具体主题来源链接保存在每个节点正文。
