<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-vue-next";
import { loadBundle, rowsOf, nodeOf, ecoChainsOf, ecoNameOf, type Bundle, type Row } from "../lib/graph";
import { loadDesc } from "../lib/l2";
import { TXT } from "../lib/ui";

const B = import.meta.env.BASE_URL;
const id = ref("");
const node = ref<ReturnType<typeof nodeOf> | null>(null);
const rows = ref<Row[]>([]);
const ecoChains = ref<string[][]>([]);
const desc = ref("");
const missing = ref(false);
const loading = ref(true);
const expanded = ref(false);
let bundle: Bundle | null = null;

let initialTitle = "";

function currentId(): string {
  if (typeof location === "undefined") return "";
  const m = location.pathname.match(/\/term\/([^/]+)/);
  return m ? decodeURIComponent(m[1]) : "";
}

const active = computed(() => !!id.value || (loading.value && !!currentId()));

async function show(tid: string) {
  loading.value = true;
  id.value = tid;
  if (!tid) {
    missing.value = true;
    node.value = null;
    rows.value = [];
    loading.value = false;
    return;
  }
  if (!bundle) bundle = await loadBundle();
  const i = bundle.ids.indexOf(tid);
  missing.value = i < 0;
  node.value = i >= 0 ? nodeOf(bundle, i) : null;
  rows.value = i >= 0 ? rowsOf(bundle, i) : [];
  ecoChains.value = i >= 0 ? await ecoChainsOf(i) : [];
  desc.value = "";
  expanded.value = false;
  loading.value = false;
  if (i >= 0) {
    document.title = `${node.value?.primary ?? tid} · HorizonGraph`;
    scrollTo(0, 0);
    desc.value = await loadDesc(tid);
  }
}

function navigate(tid: string, updateHistory = false) {
  const slot = document.getElementById("hg-static-slot");
  if (tid) {
    if (slot) slot.style.display = "none";
    if (updateHistory) {
      history.pushState(null, "", `${B}term/${tid}`);
    }
    show(tid);
  } else {
    if (slot) slot.style.display = "";
    id.value = "";
    node.value = null;
    rows.value = [];
    missing.value = false;
    loading.value = false;
    if (initialTitle) document.title = initialTitle;
  }
}

function onClick(e: MouseEvent) {
  if (e.defaultPrevented) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  const a = (e.target as HTMLElement).closest("a");
  if (!a) return;
  const href = a.getAttribute("href");
  if (!href) return;
  const m = href.match(/\/term\/([^/?#]+)/);
  if (!m) return;
  e.preventDefault();
  const tid = decodeURIComponent(m[1]);
  navigate(tid, true);
}

function onPop() {
  navigate(currentId(), false);
}

function onCustomNav(e: Event) {
  const tid = (e as CustomEvent).detail?.id;
  if (tid) navigate(tid, true);
}

onMounted(() => {
  initialTitle = document.title;
  const tid = currentId();
  if (tid) {
    navigate(tid, false);
  } else {
    loading.value = false;
  }
  addEventListener("popstate", onPop);
  document.addEventListener("click", onClick);
  addEventListener("hg-term-nav", onCustomNav as EventListener);
});

onUnmounted(() => {
  removeEventListener("popstate", onPop);
  document.removeEventListener("click", onClick);
  removeEventListener("hg-term-nav", onCustomNav as EventListener);
});
function href(en: Row["entry"]) {
  return `${B}${en.kind === 0 ? "cat" : "term"}/${en.id}`;
}
const ecoRows = computed(() =>
  ecoChains.value.map((chain, ci) => ({ chain, key: ci, label: chain[chain.length - 1] }))
);
function ecoZh(v: string): string {
  return ecoNameOf(v).zh;
}
const navRows = computed(() => rows.value.filter((r) => r.label === "属于"));
const verRows = computed(() => rows.value.filter((r) => r.label === "版本"));
const kinRows = computed(() => rows.value.filter((r) => r.label === "包含" && r.entry.kind === 0));
const relRows = computed(
  () => rows.value.filter((r) => !navRows.value.includes(r) && !verRows.value.includes(r) && !kinRows.value.includes(r))
);
function visible() {
  return expanded.value ? relRows.value : relRows.value.slice(0, 24);
}
function toggle() {
  expanded.value = !expanded.value;
}
// 知名度档位:81-100 极高 / 61-80 高 / 41-60 中 / 1-40 低;0 = 未标定不显示
const POPULAR_BANDS: [number, string][] = [
  [81, "极高知名度"],
  [61, "高知名度"],
  [41, "中知名度"],
  [1, "低知名度"],
];
const popularBand = computed(() => {
  const p = node.value?.popular ?? 0;
  if (!p) return "";
  return POPULAR_BANDS.find(([min]) => p >= min)![1];
});
</script>

<template>
  <div v-if="active">
    <p v-if="loading" class="font-mono text-sm text-ink-3 py-24 text-center">loading</p>
    <div v-else-if="missing" class="py-24 text-center">
      <p class="font-mono text-ink-2">{{ id || "404" }}</p>
      <p class="mt-2 text-sm text-ink-3">未找到词条 · <a :href="B" class="text-accent hover:underline">返回首页</a></p>
    </div>
    <article v-else-if="node">
    <header>
      <h1 class="text-2xl font-semibold flex items-baseline gap-3 flex-wrap">
        <span class="font-term" :class="TXT[node.realm] ?? TXT.technical">{{ node.primary }}</span>
        <span v-if="node.secondary" class="font-term text-base font-normal text-secondary-name">{{ node.secondary }}</span>
        <a
          v-if="node.official"
          :href="node.official"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center text-accent hover:underline no-underline"
        >
          <ArrowUpRight :size="15" class="translate-y-0.5" />
        </a>
      </h1>
      <p class="mt-2 text-sm text-ink-3 flex items-baseline gap-4 flex-wrap">
        <span v-if="popularBand" class="inline-flex items-baseline gap-1.5">
          <span class="font-mono text-sm text-ink-2">{{ node.popular }}</span>
          <span>{{ popularBand }}</span>
        </span>
        <span v-if="node.aliases.length" class="group relative inline-flex items-baseline gap-1.5">
          <span class="font-mono text-xs">{{ node.aliases.length }}</span>
          <span class="cursor-default">别名</span>
          <span
            class="pointer-events-none absolute left-0 top-full z-10 mt-1 hidden w-max max-w-[70vw] rounded border border-line bg-page px-2.5 py-1.5 text-sm text-ink-2 shadow-lg group-hover:block"
          >{{ node.aliases.join(" · ") }}</span>
        </span>
      </p>
    </header>
    <p class="mt-5 leading-7">{{ node.summary }}</p>

    <section class="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
      <div v-if="node.kind === 1">
        <h2 class="text-sm font-semibold text-ink-2">属于</h2>
        <ul class="mt-2">
          <li v-for="r in navRows" :key="r.entry.id" class="py-1">
            <a :href="href(r.entry)" class="w-fit hover:underline no-underline">
              <span class="font-term font-medium text-realm-concept">{{ r.entry.primary }}</span>
              <span v-if="r.entry.secondary" class="font-term text-sm text-secondary-name">{{ r.entry.secondary }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="verRows.length">
        <h2 class="text-sm font-semibold text-ink-2">
          版本<span class="font-mono text-xs font-normal text-ink-3 ml-2">{{ verRows.length }}</span>
        </h2>
        <ul class="mt-2">
          <li v-for="r in verRows" :key="r.entry.id" class="py-1">
            <a v-if="r.entry.id !== id" :href="href(r.entry)" class="w-fit hover:underline no-underline">
              <span class="font-term font-medium" :class="TXT[r.entry.realm] ?? TXT.technical">{{ r.entry.primary }}</span>
              <span v-if="r.entry.secondary" class="font-term text-sm text-secondary-name">{{ r.entry.secondary }}</span>
            </a>
            <span v-else class="w-fit">
              <span class="font-term font-medium" :class="TXT[r.entry.realm] ?? TXT.technical">{{ r.entry.primary }}</span>
              <span v-if="r.entry.secondary" class="font-term text-sm text-secondary-name">{{ r.entry.secondary }}</span>
            </span>
          </li>
        </ul>
      </div>
      <div v-if="kinRows.length">
        <h2 class="text-sm font-semibold text-ink-2">
          子分类<span class="font-mono text-xs font-normal text-ink-3 ml-2">{{ kinRows.length }}</span>
        </h2>
        <ul class="mt-2">
          <li v-for="r in kinRows" :key="r.entry.id" class="py-1">
            <a :href="href(r.entry)" class="w-fit hover:underline no-underline">
              <span class="font-term font-medium text-realm-concept">{{ r.entry.primary }}</span>
              <span v-if="r.entry.secondary" class="font-term text-sm text-secondary-name">{{ r.entry.secondary }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="ecoRows.length">
        <h2 class="text-sm font-semibold text-ink-2">
          生态<span class="font-mono text-xs font-normal text-ink-3 ml-2">{{ ecoChains.length }}</span>
        </h2>
        <ul class="mt-2">
          <li v-for="c in ecoRows" :key="c.key" class="py-1">
            <template v-for="(v, vi) in c.chain" :key="v">
              <a :href="`${B}eco/${v}`" class="font-term font-medium text-realm-tech w-fit hover:underline no-underline whitespace-nowrap">{{ ecoZh(v) }}</a>
              <span v-if="vi < c.chain.length - 1" class="text-ink-3">&nbsp;→&nbsp;</span>
            </template>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="relRows.length" class="mt-8">
      <h2 class="text-sm font-semibold text-ink-2">
        关系<span class="font-mono text-xs font-normal text-ink-3 ml-2">{{ relRows.length }}</span>
      </h2>
      <ul class="term-grid mt-2">
        <li v-for="r in visible()" :key="r.label + r.entry.id" class="py-1">
          <a :href="href(r.entry)" class="inline-flex items-baseline gap-3 w-fit hover:underline no-underline">
            <span class="w-16 shrink-0 text-sm text-ink-3">{{ r.label }}</span>
            <span class="font-term font-medium" :class="TXT[r.entry.realm] ?? TXT.technical">{{ r.entry.primary }}</span>
            <span v-if="r.entry.secondary" class="font-term text-sm text-secondary-name">{{ r.entry.secondary }}</span>
          </a>
        </li>
      </ul>
      <button
        v-if="rows.length > 24"
        @click="toggle()"
        class="mt-1 inline-flex items-center gap-1 text-xs text-ink-3 hover:text-ink-2 cursor-pointer bg-transparent border-0 p-0"
      >
        {{ expanded ? "收起" : `展开全部 ${rows.length}` }}
        <component :is="expanded ? ChevronUp : ChevronDown" :size="12" />
      </button>
    </section>

    <p v-if="desc" class="mt-10 pt-6 border-t border-line text-sm leading-7 text-ink-2 whitespace-pre-line">{{ desc }}</p>
    </article>
  </div>
</template>
