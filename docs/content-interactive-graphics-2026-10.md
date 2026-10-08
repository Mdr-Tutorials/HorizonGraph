# 2026-10-07 实时图形与交互内容补全

本批落实 PixiJS 缺失审计提出的全部六个分支。新增 152 个数据节点，实质扩写 31 个既有节点，数据节点从 1962 增至 2114；新增 495 条非分类关系。

新增与扩写正文引用 313 个不同的一手资料 URL（按完整 URL 去重，不等于独立机构数）。全图非空 description 从 747 增至 929；该数量表示正文存在。本批全部内容标为 origin: ai_draft，last_reviewed: 2026-10-07。

## 范围与完整节点清单

### 浏览器 2D 渲染、画布编辑与矢量机制（新增 16，扩写 3）

工程主线：SVG / Canvas 2D / OffscreenCanvas → 路径、填充规则、变换、裁剪与合成 → PixiJS → WebGL / WebGPU → 精灵、纹理与场景图 → Konva / Fabric.js → Canvas 2D → 对象编辑、命中检测与导出 → Paper.js → Bézier 路径 → 几何编辑与 SVG 交换。

新增：

- [仿射变换](../data/nodes/af/affine-transform.json) — affine-transform
- [透明度合成](../data/nodes/al/alpha-compositing.json) — alpha-compositing
- [贝塞尔曲线](../data/nodes/be/bezier-curve.json) — bezier-curve
- [二维画布 API](../data/nodes/ca/canvas-2d.json) — canvas-2d
- [画布绘制状态](../data/nodes/ca/canvas-state.json) — canvas-state
- [裁剪路径](../data/nodes/cl/clipping-path.json) — clipping-path
- [绘图路径](../data/nodes/dr/drawing-path.json) — drawing-path
- [Fabric.js](../data/nodes/fa/fabricjs.json) — fabricjs
- [填充规则](../data/nodes/fi/fill-rule.json) — fill-rule
- [Konva](../data/nodes/ko/konva.json) — konva
- [离屏画布](../data/nodes/of/offscreen-canvas.json) — offscreen-canvas
- [Paper.js](../data/nodes/pa/paperjs.json) — paperjs
- [二维路径接口](../data/nodes/pa/path2d.json) — path2d
- [PixiJS](../data/nodes/pi/pixijs.json) — pixijs
- [预乘透明度](../data/nodes/pr/premultiplied-alpha.json) — premultiplied-alpha
- [矢量图形](../data/nodes/ve/vector-graphics.json) — vector-graphics

既有扩写：[可缩放矢量图形](../data/nodes/sv/svg.json)、[WebGL](../data/nodes/we/webgl.json)、[WebGPU](../data/nodes/we/webgpu.json)。

本分支正文引用 38 个不同的一手资料 URL，每个节点正文附对应的主题链接。

### 实时渲染机制（新增 38，扩写 10）

工程主线：场景图 → 坐标变换 → 相机投影 → 几何/材质 → 绘制调用 → 渲染通道与目标 → 纹理 → 图集与采样 → 精灵 → 图形合批 → 光照模型 → BRDF → PBR；光栅化与光追分别组织工作 → 命中测试 → 对象拾取；视锥剔除减少不可见工作 → 片元输出 → 深度测试/Alpha 混合 → 后处理 → GPU缓冲→绑定布局→顶点/片元/计算程序→GLSL/HLSL/WGSL → DirectX 接口家族 → Direct3D → 图形与计算管线。

新增：

- [GPU Alpha 混合](../data/nodes/al/alpha-blending.json) — alpha-blending
- [双向反射分布函数](../data/nodes/br/brdf.json) — brdf
- [相机投影](../data/nodes/ca/camera-projection.json) — camera-projection
- [色彩管理](../data/nodes/co/color-management.json) — color-management
- [计算着色器](../data/nodes/co/compute-shader.json) — compute-shader
- [坐标变换](../data/nodes/co/coordinate-transform.json) — coordinate-transform
- [深度测试](../data/nodes/de/depth-testing.json) — depth-testing
- [Direct3D 图形接口](../data/nodes/di/direct3d.json) — direct3d
- [绘制调用](../data/nodes/dr/draw-call.json) — draw-call
- [片元着色器](../data/nodes/fr/fragment-shader.json) — fragment-shader
- [帧时间](../data/nodes/fr/frame-time.json) — frame-time
- [帧率](../data/nodes/fr/frames-per-second.json) — frames-per-second
- [视锥剔除](../data/nodes/fr/frustum-culling.json) — frustum-culling
- [GPU缓冲区](../data/nodes/gp/gpu-buffer.json) — gpu-buffer
- [GPU 实例化](../data/nodes/gp/gpu-instancing.json) — gpu-instancing
- [图形合批](../data/nodes/gr/graphics-batching.json) — graphics-batching
- [命中测试](../data/nodes/hi/hit-testing.json) — hit-testing
- [索引缓冲区](../data/nodes/in/index-buffer.json) — index-buffer
- [光照模型](../data/nodes/li/lighting-model.json) — lighting-model
- [多级渐远纹理](../data/nodes/mi/mipmapping.json) — mipmapping
- [法线映射](../data/nodes/no/normal-mapping.json) — normal-mapping
- [对象拾取](../data/nodes/ob/object-picking.json) — object-picking
- [粒子系统](../data/nodes/pa/particle-system.json) — particle-system
- [后处理](../data/nodes/po/post-processing.json) — post-processing
- [渲染通道](../data/nodes/re/render-pass.json) — render-pass
- [渲染目标](../data/nodes/re/render-target.json) — render-target
- [渲染几何](../data/nodes/re/rendering-geometry.json) — rendering-geometry
- [渲染材质](../data/nodes/re/rendering-material.json) — rendering-material
- [场景图](../data/nodes/sc/scene-graph.json) — scene-graph
- [精灵](../data/nodes/sp/sprite.json) — sprite
- [纹理](../data/nodes/te/texture.json) — texture
- [纹理图集](../data/nodes/te/texture-atlas.json) — texture-atlas
- [纹理采样](../data/nodes/te/texture-sampling.json) — texture-sampling
- [统一变量缓冲区](../data/nodes/un/uniform-buffer.json) — uniform-buffer
- [顶点缓冲区](../data/nodes/ve/vertex-buffer.json) — vertex-buffer
- [顶点着色器](../data/nodes/ve/vertex-shader.json) — vertex-shader
- [视口](../data/nodes/vi/viewport.json) — viewport
- [WebGPU着色语言](../data/nodes/wg/wgsl.json) — wgsl

既有扩写：[渲染管线](../data/nodes/gr/graphics-pipeline.json)、[光栅化](../data/nodes/ra/rasterization.json)、[光线追踪](../data/nodes/ra/ray-tracing.json)、[基于物理的渲染](../data/nodes/pb/pbr.json)、[Vulkan](../data/nodes/vu/vulkan.json)、[DirectX](../data/nodes/di/directx.json)、[Metal](../data/nodes/me/metal.json)、[着色器程序](../data/nodes/sh/shader.json)、[GLSL](../data/nodes/gl/glsl.json)、[HLSL](../data/nodes/hl/hlsl.json)。

本分支正文引用 70 个不同的一手资料 URL，每个节点正文附对应的主题链接。

### 游戏与交互运行时（新增 15，扩写 11）

工程主线：game-engine → game-loop → fixed-timestep / request-animation-frame → game-scene → input-handling → gamepad-api；game-scene → prefab → collision-detection → spatial-index；rigid-body-dynamics → collision-detection / ordinary-differential-equation → asset-loading → resource-lifecycle → reference-counting；audio-playback → web-audio-api → Unity Animator → animation-state-machine；既有 Phaser / Godot / Unity / Unreal / Cocos / ECS / Box2D 作为实现入口。

新增：

- [动画状态机](../data/nodes/an/animation-state-machine.json) — animation-state-machine
- [运行时资源加载](../data/nodes/as/asset-loading.json) — asset-loading
- [交互音频播放](../data/nodes/au/audio-playback.json) — audio-playback
- [碰撞检测](../data/nodes/co/collision-detection.json) — collision-detection
- [固定时间步](../data/nodes/fi/fixed-timestep.json) — fixed-timestep
- [游戏引擎](../data/nodes/ga/game-engine.json) — game-engine
- [游戏循环](../data/nodes/ga/game-loop.json) — game-loop
- [游戏场景](../data/nodes/ga/game-scene.json) — game-scene
- [游戏手柄接口](../data/nodes/ga/gamepad-api.json) — gamepad-api
- [游戏输入处理](../data/nodes/in/input-handling.json) — input-handling
- [预制体](../data/nodes/pr/prefab.json) — prefab
- [动画帧请求接口](../data/nodes/re/request-animation-frame.json) — request-animation-frame
- [运行时资源生命周期](../data/nodes/re/resource-lifecycle.json) — resource-lifecycle
- [刚体动力学](../data/nodes/ri/rigid-body-dynamics.json) — rigid-body-dynamics
- [网页音频接口](../data/nodes/we/web-audio-api.json) — web-audio-api

既有扩写：[Phaser](../data/nodes/ph/phaser.json)、[Unity 引擎](../data/nodes/un/unity.json)、[虚幻引擎](../data/nodes/un/unreal-engine.json)、[Godot](../data/nodes/go/godot.json)、[Cocos](../data/nodes/co/cocos.json)、[GDScript](../data/nodes/gd/gdscript.json)、[Source](../data/nodes/so/source-engine.json)、[NeoX](../data/nodes/ne/neox.json)、[实体组件系统](../data/nodes/ec/ecs.json)、[Box2D](../data/nodes/bo/box2d.json)、[A 星算法](../data/nodes/a-/a-star.json)。

本分支正文引用 60 个不同的一手资料 URL，每个节点正文附对应的主题链接。

### 创意编程与计算机动画（新增 24，扩写 0）

工程主线：创意编程 → 时间线与补间 → 骨骼、形变与程序化动作 → 交互状态 → 编辑器、格式与跨平台运行库。

新增：

- [动画混合](../data/nodes/an/animation-blending.json) — animation-blending
- [动画重定向](../data/nodes/an/animation-retargeting.json) — animation-retargeting
- [动画时间线](../data/nodes/an/animation-timeline.json) — animation-timeline
- [Anime.js](../data/nodes/an/animejs.json) — animejs
- [创意编程](../data/nodes/cr/creative-coding.json) — creative-coding
- [缓动函数](../data/nodes/ea/easing-function.json) — easing-function
- [GSAP](../data/nodes/gs/gsap.json) — gsap
- [交互式动画](../data/nodes/in/interactive-animation.json) — interactive-animation
- [关键帧动画](../data/nodes/ke/keyframe-animation.json) — keyframe-animation
- [Lottie 动画格式](../data/nodes/lo/lottie.json) — lottie
- [Lottie Web 播放器](../data/nodes/lo/lottie-web.json) — lottie-web
- [形变目标动画](../data/nodes/mo/morph-target-animation.json) — morph-target-animation
- [路径运动动画](../data/nodes/mo/motion-path-animation.json) — motion-path-animation
- [p5.js 创意编程库](../data/nodes/p5/p5js.json) — p5js
- [程序化动画](../data/nodes/pr/procedural-animation.json) — procedural-animation
- [Processing 创意编程环境](../data/nodes/pr/processing.json) — processing
- [Rive 动画编辑器](../data/nodes/ri/rive.json) — rive
- [Rive 文件格式](../data/nodes/ri/rive-file-format.json) — rive-file-format
- [Rive 运行库](../data/nodes/ri/rive-runtime.json) — rive-runtime
- [骨骼动画](../data/nodes/sk/skeletal-animation.json) — skeletal-animation
- [Spine 骨骼动画编辑器](../data/nodes/sp/spine.json) — spine
- [Spine 运行库](../data/nodes/sp/spine-runtimes.json) — spine-runtimes
- [补间动画](../data/nodes/tw/tweening.json) — tweening
- [Two.js 二维绘图库](../data/nodes/tw/twojs.json) — twojs

本分支正文引用 45 个不同的一手资料 URL，每个节点正文附对应的主题链接。

### 数字内容制作与资产管线（新增 31，扩写 4）

工程主线：模型制作与拓扑 → UV、材质与纹理 → 绑定及动画 → 交换与场景组装 → 压缩、LOD与验证 → 浏览器运行时加载。

新增：

- [资产压缩](../data/nodes/as/asset-compression.json) — asset-compression
- [资产管线](../data/nodes/as/asset-pipeline.json) — asset-pipeline
- [资产验证](../data/nodes/as/asset-validation.json) — asset-validation
- [Babylon.js 三维引擎](../data/nodes/ba/babylonjs.json) — babylonjs
- [Blender](../data/nodes/bl/blender.json) — blender
- [数字内容制作](../data/nodes/di/digital-content-creation.json) — digital-content-creation
- [Draco 几何压缩](../data/nodes/dr/draco.json) — draco
- [FBX 资产格式](../data/nodes/fb/fbx.json) — fbx
- [二进制 glTF](../data/nodes/gl/glb.json) — glb
- [图形传输格式](../data/nodes/gl/gltf.json) — gltf
- [glTF Transform](../data/nodes/gl/gltf-transform.json) — gltf-transform
- [胡迪尼](../data/nodes/ho/houdini.json) — houdini
- [KTX 2](../data/nodes/kt/ktx2.json) — ktx2
- [细节层次](../data/nodes/le/level-of-detail.json) — level-of-detail
- [玛雅](../data/nodes/ma/maya.json) — maya
- [网格优化](../data/nodes/me/mesh-optimization.json) — mesh-optimization
- [网格优化库](../data/nodes/me/meshoptimizer.json) — meshoptimizer
- [开放通用场景描述](../data/nodes/op/openusd.json) — openusd
- [多边形建模](../data/nodes/po/polygon-modeling.json) — polygon-modeling
- [程序化建模](../data/nodes/pr/procedural-modeling.json) — procedural-modeling
- [重拓扑](../data/nodes/re/retopology.json) — retopology
- [绑定](../data/nodes/ri/rigging.json) — rigging
- [Adobe Substance 3D](../data/nodes/su/substance-3d.json) — substance-3d
- [Adobe Substance 3D Designer](../data/nodes/su/substance-3d-designer.json) — substance-3d-designer
- [Adobe Substance 3D Painter](../data/nodes/su/substance-3d-painter.json) — substance-3d-painter
- [纹理烘焙](../data/nodes/te/texture-baking.json) — texture-baking
- [纹理绘制](../data/nodes/te/texture-painting.json) — texture-painting
- [通用场景描述](../data/nodes/us/usd.json) — usd
- [USDZ 资产包](../data/nodes/us/usdz.json) — usdz
- [UV 映射](../data/nodes/uv/uv-mapping.json) — uv-mapping
- [OBJ 模型格式](../data/nodes/wa/wavefront-obj.json) — wavefront-obj

既有扩写：[Three.js](../data/nodes/th/threejs.json)、[Photoshop](../data/nodes/ph/photoshop.json)、[Adobe](../data/nodes/ad/adobe.json)、[Autodesk](../data/nodes/au/autodesk.json)。

本分支正文引用 50 个不同的一手资料 URL，每个节点正文附对应的主题链接。

### 交互可视化与浏览器地理空间（新增 28，扩写 3）

工程主线：数据字段与变换 → 视觉编码与尺度 → 图元与图层 → 刷选和多视图联动 → 地图投影、瓦片与三维流式内容。

新增：

- [AntV G2](../data/nodes/an/antv-g2.json) — antv-g2
- [AntV G6](../data/nodes/an/antv-g6.json) — antv-g6
- [AntV L7](../data/nodes/an/antv-l7.json) — antv-l7
- [CesiumJS](../data/nodes/ce/cesium.json) — cesium
- [图表坐标轴](../data/nodes/ch/chart-axis.json) — chart-axis
- [Chart.js](../data/nodes/ch/chartjs.json) — chartjs
- [数据连接](../data/nodes/da/data-join.json) — data-join
- [可视化尺度](../data/nodes/da/data-scale.json) — data-scale
- [deck.gl](../data/nodes/de/deckgl.json) — deckgl
- [刷选](../data/nodes/in/interaction-brushing.json) — interaction-brushing
- [图层化可视化](../data/nodes/la/layered-visualization.json) — layered-visualization
- [Leaflet](../data/nodes/le/leaflet.json) — leaflet
- [多视图联动](../data/nodes/li/linked-views.json) — linked-views
- [Mapbox 样式规范](../data/nodes/ma/map-style-specification.json) — map-style-specification
- [地图瓦片金字塔](../data/nodes/ma/map-tile-pyramid.json) — map-tile-pyramid
- [Mapbox GL JS](../data/nodes/ma/mapbox.json) — mapbox
- [Mapbox 矢量瓦片规范](../data/nodes/ma/mapbox-vector-tile.json) — mapbox-vector-tile
- [MapLibre GL JS](../data/nodes/ma/maplibre.json) — maplibre
- [MapLibre 样式规范](../data/nodes/ma/maplibre-style-specification.json) — maplibre-style-specification
- [OpenLayers](../data/nodes/op/openlayers.json) — openlayers
- [Plotly.js](../data/nodes/pl/plotly.json) — plotly
- [三维瓦片](../data/nodes/th/three-dimensional-tiles.json) — three-dimensional-tiles
- [矢量瓦片](../data/nodes/ve/vector-tiles.json) — vector-tiles
- [Vega 可视化语法](../data/nodes/ve/vega.json) — vega
- [Vega-Lite 可视化语法](../data/nodes/ve/vega-lite.json) — vega-lite
- [视觉编码](../data/nodes/vi/visual-encoding.json) — visual-encoding
- [可视化数据流](../data/nodes/vi/visualization-dataflow.json) — visualization-dataflow
- [Web 地图](../data/nodes/we/web-map.json) — web-map

既有扩写：[D3.js](../data/nodes/d3/d3js.json)、[ECharts](../data/nodes/ec/echarts.json)、[AntV](../data/nodes/an/antv.json)。

本分支正文引用 54 个不同的一手资料 URL，每个节点正文附对应的主题链接。

## 分类与身份

- ontology：70 → 78，新增六个概念分类和两个规范分类；版本 0.11.0。
- domains：53 → 59，新增六个领域标识；版本 0.5.0。
- ecosystems：75 → 82，新增七个子生态，仍为十个封闭宏观根；版本 0.3.0。
- schema_version：3.5.1，更新 protocol、tool、product 与 ai_draft 来源状态的文字说明，字段和枚举值兼容。二十九种关系类型不变。

接口规范挂 api-specification，资产格式挂 graphics-asset-format。工具、播放器、文件格式与语言分别建档；Lottie、Rive、Spine 及 OpenUSD 的制作/交换/执行身份不混写。FPS、帧耗时挂 metric，并说明统计窗口与时间口径。

GLB 与既有 GLBP 路由协议分别检索；游戏场景与渲染场景图、图形合批与既有 batching、渲染几何与计算网格各有独立身份。

## 语义修正与资料边界

调用图形 API 的库使用 uses 并说明后端；移除将库误写为实现 WebGL 规范的边。WebGL/WebGPU 的挂载从网络应用层协议改为 API 规范。可选加载器、物理系统与后端不记录为所有部署的硬依赖。Phaser 没有新增普遍依赖 PixiJS 的关系。

PixiJS 后端按官方版本文档说明，实验性 Canvas 支持不推广为完整稳定兼容。MapLibre 与 Mapbox 样式规范分别建档，不推断当前分支完全兼容。动画播放器和二进制资产的版本兼容条件在正文中限定。

既有 Adobe 摘要误称 Figma 的东家，本批根据 [Adobe 终止合并公告](https://news.adobe.com/news/news-details/2023/adobe-and-figma-mutually-agree-to-terminate-merger-agreement)纠正。现有组织和产品 id 保持不变。新增边与移除的错误边按实际内容审计计数，不将替换误算为纯净增长。

## 验证

- 全库契约、词表、本体、文件路径、引用、摘要、关系类型与存储方向验证通过，零错误、零警告。
- 全部 152 个新增节点都有非分类入边或出边；全部 183 个新增/扩写节点都有正文、来源、ai_draft 状态及本批日期。
- 完整生产构建通过，生成版本化数据快照、搜索与邻域索引、正文分块、Rust/WASM、站点与离线资源清单。
- 21 项单测、8 项 Chromium 测试通过；web 和 tools 的 TypeScript 检查通过。
- 实际构建产物通过 152 个新增 id 搜索、183 个正文/摘要/邻域读取和 500 个名称与别名查询检查。
- 以下最终数据快照同时包含随后完成的 Hono/Web 服务批次；上述增量按图形批次冻结时的基线统计。
- 数据快照版本：`99d11756b03fd2a7c30d7c36df15744c733a096de86b6170a1a1a202f1e28c67`。

## 一手资料入口

二维图形参考 [WHATWG Canvas 标准](https://html.spec.whatwg.org/multipage/canvas.html)、[PixiJS 架构](https://pixijs.com/8.x/guides/concepts/architecture)、[Konva 概览](https://konvajs.org/docs/overview.html)与 Fabric/Paper 官方文档。GPU 接口参考 [WebGPU](https://www.w3.org/TR/webgpu/)、[WGSL](https://www.w3.org/TR/WGSL/)与 [Khronos WebGL 注册表](https://registry.khronos.org/webgl/)。

游戏运行时参考 Phaser、Godot、Unity、Unreal、Cocos 和 Box2D 的官方指南；创意编程和动画参考 p5.js、Processing、GSAP、Anime.js、Lottie、Rive 与 Spine 的文档及格式规范。资产管线参考 Blender、Autodesk、SideFX、Adobe、Khronos 的标准与工具文档，以及 Three.js、Babylon.js 和优化库的项目文档。

可视化参考 D3、Vega、Chart.js、Plotly、ECharts、AntV、deck.gl 的官方机制文档；地图参考 Cesium、Leaflet、OpenLayers、MapLibre、Mapbox 的 API 与样式说明，以及 OGC 3D Tiles。事实对应的具体链接保存于各节点正文。分类与关系决策见 [ADR-0028](decisions/0028-interactive-graphics-content.md)。
