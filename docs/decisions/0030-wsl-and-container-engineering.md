# ADR-0030：WSL、跨宿主开发与容器工程

- 状态：已接受
- 日期：2026-10-08

## 背景

全库名称、缩写、别名和稳定 id 核查未找到 WSLc 或 WSL。已有 Docker、containerd、容器、Linux Namespaces 与 cgroup 等条目仅提供摘要，缺少 Windows/Linux 互操作、容器规范、构建与开发环境主线。仅添加一个命令名称不能解释其宿主、执行、文件和网络边界。

本批按七个相互连接的分支补全：Windows/WSL 与系统虚拟化、容器运行时与标准、镜像构建及分发、隔离与资源控制、文件系统与网络、开发环境、软件供应链。具体节点与来源见本批内容记录。

## 决策

1. 本体从 81 增至 86，新增 container-concept、virtualization-concept、developer-environment-concept、software-supply-chain-concept 及 container-specification；版本为 0.13.0。四个概念分类与一个规范分类复用已有实体类型。
2. 领域从 62 增至 66，新增 containerization、virtualization、developer-environments 与 software-supply-chain；版本为 0.7.0。
3. 生态从 85 增至 89，新增 container-ecosystem、wsl-ecosystem、dev-container-ecosystem 与 software-supply-chain-ecosystem；版本为 0.5.0。沿用十个封闭宏观根及多亲 DAG。通用软件供应链生态仅继承安全和 CI/CD 生态；涉及容器的具体成员按事实另行声明容器生态，不将全部供应链内容派生为容器工程。
4. 类型 Schema 保持 3.5.1，二十九种关系类型不变。规范、接口、格式、CLI、运行时、平台、SDK、组织与机制按实际身份建模；可选实现和平台条件在正文及关系 context 中限定。
5. 保持已发布 id。已有 oci 沿用 protocol 类型，作为 OCI Specifications 规范族入口；组织 Open Container Initiative 独立建档，运行时、镜像与分发规范分别建档。以实际采用或实现关系替换模糊的规范族连接。
6. Linux Namespaces 与 cgroup 按内核机制纠正为 concept，挂 os-mechanism，保留稳定 id。调用内核机制使用有场景说明的 uses，不能因主题相关将机制当成所有部署的硬依赖。

## 实现与版本边界

WSL、WSL 1、WSL 2 描述平台与架构差异；WSLc CLI、WSL containers 功能、容器 API 与 SDK 分别描述调用和执行层次。普通发行版的管理与安全说明不直接推广到 WSLc session，也不把 session 级 VM 等同于每个容器单独拥有 VM。

WSL containers 的总体状态以 [2026-09-29 正式发布说明](https://blogs.windows.com/windowsdeveloper/2026/09/29/wsl-containers-now-generally-available/)和 [WSL 3.0.1 发布记录](https://github.com/microsoft/WSL/releases/tag/3.0.1)为准。历史最低可用版本、语言投影的独立预览状态和社区项目的旧预览文字分别限定。官方 Compose 路线图不写成已提供的功能；社区编排与桌面工具不归为微软内置组件。

WSLc 的内部 containerd、Docker Engine 与 Buildx 路径使用固定版本源码说明，不据此推导全部 Docker 客户端、参数或外部服务端点均受支持。OCI 镜像互操作、运行规范、Registry 分发 API 与 Engine 管理 API 是不同的契约。

文件挂载按 Windows 路径、Linux 文件系统和挂载后端分别说明。性能、文件通知、权限与持久性是不同属性；不由性能提升推导完整 inotify 事件保证。普通 WSL 配置与 WSLc 会话配置也分别说明，不混用默认值。

命名空间、资源控制、rootless、虚拟机隔离与沙箱分别记录实际机制。镜像 digest、签名、来源证明、SBOM 与漏洞扫描分别连接；它们不相互替代，也不表示已经完整验证所有运行配置和供应链风险。

## 结果

从 Windows/Linux 宿主和 WSLc 入口可以进入规范、执行与隔离、构建分发、文件网络、开发环境和制品验证主线。来源和适用范围保存在节点正文；本批作者内容保留 ai_draft，最终校验、构建与检索结果记入内容批次记录。
