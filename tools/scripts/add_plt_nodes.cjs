const fs = require('fs');
const path = require('path');

const nodes = [
  // 1. Foundations & Computational Models
  {
    id: 'lambda-calculus',
    name: 'Lambda Calculus',
    display_primary: 'λ演算',
    display_secondary: 'Lambda Calculus',
    aliases: ['Lambda Calculus', '拉姆达演算'],
    type: 'concept',
    domains: ['programming-languages', 'formal-methods'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '邱奇创立的极简函数定义与替换形式模型，图灵完备，现代函数式语言基石。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'curry-howard',
    name: 'Curry-Howard Correspondence',
    display_primary: '柯里-霍华德同构',
    display_secondary: 'Curry-Howard Isomorphism',
    aliases: ['命题即类型', 'Propositions-as-Types', '柯里霍华德同构'],
    type: 'concept',
    domains: ['programming-languages', 'formal-methods'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '揭示命题即类型、证明即程序、证明化简即程序求值的逻辑与计算终极对称性。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'category-theory',
    name: 'Category Theory',
    display_primary: '范畴论',
    display_secondary: 'Category Theory',
    aliases: ['范畴学'],
    type: 'concept',
    domains: ['programming-languages', 'formal-methods'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '研究对象与态射组合结构的数学理论，为函子、单子与高级类型提供代数语义。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'fixed-point',
    name: 'Fixed-Point Combinator',
    display_primary: '不动点理论',
    display_secondary: 'Fixed-Point Theory',
    aliases: ['不动点', 'Y组合子', 'Fixed-Point'],
    type: 'concept',
    domains: ['programming-languages', 'formal-methods'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '作用于自身仍保持不变的数学解；递归函数在语义学上具备良定义的存在性基础。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },

  // 2. Type Theory & Type Systems
  {
    id: 'polymorphism',
    name: 'Polymorphism',
    display_primary: '多态性',
    display_secondary: 'Type Polymorphism',
    aliases: ['多态', '类型多态'],
    type: 'concept',
    domains: ['programming-languages'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'type-system' }
    ],
    summary: '使同一段代码或操作符能处理多种不同类型数据的统一类型抽象机制。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'subtyping',
    name: 'Subtyping',
    display_primary: '子类型',
    display_secondary: 'Subtyping',
    aliases: ['子类型多态', '包含多态'],
    type: 'concept',
    domains: ['programming-languages'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'type-system' },
      { relation_type: 'governs', target_id: 'generics' }
    ],
    summary: '类型间基于安全可替换性建立的偏序关系，面向对象类型系统的理论根基。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'variance',
    name: 'Variance',
    display_primary: '型变',
    display_secondary: 'Type Variance',
    aliases: ['协变与逆变', 'Covariance and Contravariance'],
    type: 'concept',
    domains: ['programming-languages'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'type-system' }
    ],
    summary: '约束复杂复合类型在子类型继承中的方向保持性（协变、逆变与不变）。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'nominal-typing',
    name: 'Nominal Typing',
    display_primary: '名义类型',
    display_secondary: 'Nominal Type System',
    aliases: ['标称类型', '显式类型'],
    type: 'concept',
    domains: ['programming-languages'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'type-system' },
      { relation_type: 'alternative_to', target_id: 'structural-typing' }
    ],
    summary: '仅依据显式声明的类型名称判定类型相容性的机制，如 Java 与 C++。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'structural-typing',
    name: 'Structural Typing',
    display_primary: '结构类型',
    display_secondary: 'Structural Type System',
    aliases: ['形状类型', '静态鸭子类型'],
    type: 'concept',
    domains: ['programming-languages'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'type-system' }
    ],
    summary: '仅凭属性与方法签名集合是否满足形状判定相容性的机制，如 TypeScript 与 Go。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'abstract-data-type',
    name: 'Abstract Data Type',
    abbreviation: 'ADT',
    display_primary: '抽象数据类型',
    display_secondary: 'Abstract Data Type',
    aliases: ['ADT', '抽象数据型'],
    type: 'concept',
    domains: ['programming-languages', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'data-structure' },
      { relation_type: 'alternative_to', target_id: 'algebraic-data-type' }
    ],
    summary: '仅通过对外操作接口定义行为、隐藏具体底层实现的数据结构数学模型。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'algebraic-data-type',
    name: 'Algebraic Data Type',
    abbreviation: 'ADT',
    display_primary: '代数数据类型',
    display_secondary: 'Algebraic Data Type',
    aliases: ['ADT', '和积类型', '代数类型'],
    type: 'concept',
    domains: ['programming-languages'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'type-system' }
    ],
    summary: '由积类型（元组/结构体）与和类型（枚举）正交组合构建的现代数据建模范式。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'dependent-types',
    name: 'Dependent Types',
    display_primary: '依值类型',
    display_secondary: 'Dependent Typing',
    aliases: ['依赖类型'],
    type: 'concept',
    domains: ['programming-languages', 'formal-methods'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'type-system' }
    ],
    summary: '允许类型直接依赖并包含运行时的具体值，将断言推入编译期绝对证明的系统。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'affine-types',
    name: 'Affine Types',
    display_primary: '仿射类型',
    display_secondary: 'Affine Logic & Types',
    aliases: ['仿射类型系统'],
    type: 'concept',
    domains: ['programming-languages', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'type-system' },
      { relation_type: 'alternative_to', target_id: 'linear-types' },
      { relation_type: 'governs', target_id: 'ownership' }
    ],
    summary: '约束每个绑定的值在生命周期内至多被消费一次的类型系统，Rust 所有权的数学源头。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'linear-types',
    name: 'Linear Types',
    display_primary: '线性类型',
    display_secondary: 'Linear Logic & Types',
    aliases: ['线性类型系统'],
    type: 'concept',
    domains: ['programming-languages', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'type-system' }
    ],
    summary: '基于线性逻辑，强制要求每个值在生命周期内必须且只能被精确消费一次的类型系统。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },

  // 3. Formal Semantics
  {
    id: 'operational-semantics',
    name: 'Operational Semantics',
    display_primary: '操作语义',
    display_secondary: 'Operational Semantics',
    aliases: ['小步语义', '大步语义', '结构化操作语义'],
    type: 'concept',
    domains: ['programming-languages', 'formal-methods'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '通过在抽象机上定义状态迁移转换规则，精确刻画程序每一步执行推演的语义学体系。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'denotational-semantics',
    name: 'Denotational Semantics',
    display_primary: '指称语义',
    display_secondary: 'Denotational Semantics',
    aliases: ['指称语义学'],
    type: 'concept',
    domains: ['programming-languages', 'formal-methods'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '将语法成分直接映射为拓扑域与偏序格中的数学对象与不动点的组合式语义体系。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'axiomatic-semantics',
    name: 'Axiomatic Semantics',
    display_primary: '公理语义',
    display_secondary: 'Axiomatic Semantics',
    aliases: ['霍尔逻辑', 'Hoare Logic'],
    type: 'concept',
    domains: ['programming-languages', 'formal-methods'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '基于霍尔三元组前置条件与后置条件断言，直接证明程序满足正确性规约的语义体系。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },

  // 4. Control Flow & Effects
  {
    id: 'continuation',
    name: 'Continuation',
    display_primary: '延续',
    display_secondary: 'Continuation',
    aliases: ['续体', '计算的未来'],
    type: 'concept',
    domains: ['programming-languages', 'compilers'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' },
      { relation_type: 'governs', target_id: 'cps' }
    ],
    summary: '代表程序在某一点等待接收计算结果的剩余全部流程，将控制流完全具象化的高阶抽象。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'cps',
    name: 'Continuation-Passing Style',
    display_primary: 'CPS变换',
    display_secondary: 'Continuation-Passing Style',
    aliases: ['续体传递风格', 'CPS'],
    type: 'concept',
    domains: ['programming-languages', 'compilers'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '将函数调用改写为显式传入下一个待执行延续的编程与编译控制流规整技术。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'algebraic-effects',
    name: 'Algebraic Effects',
    display_primary: '代数效应',
    display_secondary: 'Algebraic Effects and Handlers',
    aliases: ['效应系统', '可恢复异常'],
    type: 'concept',
    domains: ['programming-languages'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '将副作用请求与具体处理逻辑彻底解耦、支持原位挂起与恢复执行的高级效应范式。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'monad',
    name: 'Monad',
    display_primary: '单子',
    display_secondary: 'Monad',
    aliases: ['单子模式', '自函子范畴上的幺半群'],
    type: 'concept',
    domains: ['programming-languages', 'formal-methods'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '范畴论在计算中的投影，将纯函数计算与副作用安全封装、串联组合的经典代数抽象。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'tail-call',
    name: 'Tail Call Optimization',
    display_primary: '尾调用优化',
    display_secondary: 'Tail Call Optimization',
    aliases: ['尾递归优化', 'TCO'],
    type: 'concept',
    domains: ['programming-languages', 'compilers'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '函数最后一步直接调用函数时直接复用当前栈帧、支持无限递归不耗尽栈的运行时技术。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },

  // 5. Memory Safety & Invariants
  {
    id: 'borrow-checker',
    name: 'Borrow Checker',
    display_primary: '借用检查',
    display_secondary: 'Borrow Checker',
    aliases: ['借用检查器'],
    type: 'concept',
    domains: ['programming-languages', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' },
      { relation_type: 'governs', target_id: 'ownership' }
    ],
    summary: '依据共享只读、可变排他的互斥准则，在编译期静态杜绝数据竞态与空悬指针的算法。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'lifetimes',
    name: 'Lifetimes',
    display_primary: '静态生命周期',
    display_secondary: 'Lifetimes in Rust',
    aliases: ['生命周期参数', '生命周期'],
    type: 'concept',
    domains: ['programming-languages', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'type-system' }
    ],
    summary: '编译器静态推演并验证引用生存期绝对小于底层宿主资源有效存续区间的形式化理论。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'generational-hypothesis',
    name: 'Generational Hypothesis',
    display_primary: '分代假说',
    display_secondary: 'Weak Generational Hypothesis',
    aliases: ['弱分代假说'],
    type: 'concept',
    domains: ['programming-languages', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' },
      { relation_type: 'governs', target_id: 'garbage-collection' }
    ],
    summary: '绝大多数程序对象朝生夕死的经验法则，将堆划分为新生代与老年代以削减停顿的基石。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },

  // 6. IR & Program Analysis
  {
    id: 'cfg',
    name: 'Control Flow Graph',
    display_primary: '控制流图',
    display_secondary: 'Control Flow Graph',
    aliases: ['CFG'],
    type: 'concept',
    domains: ['compilers', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' },
      { relation_type: 'governs', target_id: 'ssa' }
    ],
    summary: '以不可分割基本块为节点、控制跳转路径为有向边的程序流拓扑结构，编译优化的基底。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 5
  },
  {
    id: 'escape-analysis',
    name: 'Escape Analysis',
    display_primary: '逃逸分析',
    display_secondary: 'Escape Analysis',
    aliases: ['对象逃逸分析'],
    type: 'concept',
    domains: ['compilers', 'systems-programming'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '静态判定对象指针是否逃逸出当前函数栈或线程，决定栈上分配与锁消除的优化技术。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  },
  {
    id: 'abstract-interpretation',
    name: 'Abstract Interpretation',
    display_primary: '抽象解释',
    display_secondary: 'Abstract Interpretation',
    aliases: ['抽象解释理论'],
    type: 'concept',
    domains: ['compilers', 'formal-methods'],
    relations: [
      { relation_type: 'is_instance_of', target_id: 'theory' }
    ],
    summary: '将程序执行状态空间投影逼近至有限数学格上、证明程序语义性质的高阶静态分析理论。',
    status: 'active',
    origin: 'curated',
    last_reviewed: '2026-09-08',
    importance: 4
  }
];

const nodesDir = path.resolve(__dirname, '..', '..', 'data', 'nodes');
let created = 0;

for (const n of nodes) {
  const prefix = n.id.slice(0, 2);
  const dir = path.join(nodesDir, prefix);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, n.id + '.json');
  fs.writeFileSync(file, JSON.stringify(n, null, 2) + '\n', 'utf8');
  created++;
}

console.log(`Successfully written ${created} PLT nodes.`);
