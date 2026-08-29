<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-vue-next";
import { loadBundle, rowsOf, nodeOf, type Bundle, type Row } from "../lib/graph";
import { loadDesc } from "../lib/l2";
import { TXT } from "../lib/ui";

const B = import.meta.env.BASE_URL;
const id = ref("");
const node = ref<ReturnType<typeof nodeOf> | null>(null);
const rows = ref<Row[]>([]);
const desc = ref("");
const missing = ref(false);
const loading = ref(true);
const expanded = ref(false);
let bundle: Bundle | null = null;

function currentId(): string {
  const m = location.pathname.match(/\/term\/([^/]+)/);
  return m ? decodeURIComponent(m[1]) : "";
}
async function show(tid: string) {
  loading.value = true;
  id.value = tid;
  if (!tid) {
    missing.value = true;
    node.value = null;
    blocks.value = [];
    loading.value = false;
    return;
  }
  if (!bundle) bundle = await loadBundle();
  const i = bundle.ids.indexOf(tid);
  missing.value = i < 0;
  node.value = i >= 0 ? nodeOf(bundle, i) : null;
  rows.value = i >= 0 ? rowsOf(bundle, i) : [];
  desc.value = "";
  expanded.value = false;
  loading.value = false;
  if (i >= 0) {
    document.title = `${node.value?.primary ?? tid} · HorizonGraph`;
    scrollTo(0, 0);
    desc.value = await loadDesc(tid);
  }
}
function onClick(e: MouseEvent) {
  const a = (e.target as HTMLElement).closest("a");
  if (!a) return;
  const m = a.getAttribute("href")?.match(/\/term\/([^/?#]+)/);
  if (!m) return;
  e.preventDefault();
  const tid = decodeURIComponent(m[1]);
  history.pushState(null, "", `${B}term/${tid}`);
  show(tid);
}
function onPop() {
  show(currentId());
}
onMounted(() => {
  show(currentId());
  addEventListener("popstate", onPop);
  document.addEventListener("click", onClick);
});
onUnmounted(() => {
  removeEventListener("popstate", onPop);
  document.removeEventListener("click", onClick);
});
function href(en: Row["entry"]) {
  return `${B}${en.kind === 0 ? "cat" : "term"}/${en.id}`;
}
const navRows = computed(() => rows.value.filter((r) => r.label === "属于"));
const verRows = computed(() =>
  rows.value.filter((r) => r.label === "版本" || (r.label === "包含" && /^\d+$/.test(r.entry.id.split("/").pop() ?? "")))
);
const kinRows = computed(() => rows.value.filter((r) => r.label === "包含" && !verRows.value.includes(r)));
const relRows = computed(
  () => rows.value.filter((r) => !navRows.value.includes(r) && !verRows.value.includes(r) && !kinRows.value.includes(r))
);
function visible() {
  return expanded.value ? relRows.value : relRows.value.slice(0, 24);
}
function toggle() {
  expanded.value = !expanded.value;
}
</script>

<template>
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
          <ArrowUpRight :size="15" />
        </a>
      </h1>
      <p v-if="node.aliases.length" class="mt-2 text-sm text-ink-2">{{ node.aliases.join(" · ") }}</p>
    </header>
    <p class="mt-5 leading-7">{{ node.summary }}</p>

    <section class="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
      <div v-if="node.kind === 1">
        <h2 class="text-sm font-semibold text-ink-2">属于</h2>
        <ul class="mt-2">
          <li v-for="r in navRows" :key="r.entry.id" class="py-1">
            <a :href="href(r.entry)" class="w-fit hover:underline no-underline">
              <span class="font-term font-semibold text-realm-concept">{{ r.entry.primary }}</span>
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
            <a :href="href(r.entry)" class="w-fit hover:underline no-underline">
              <span class="font-term font-semibold" :class="TXT[r.entry.realm] ?? TXT.technical">{{ r.entry.primary }}</span>
              <span v-if="r.entry.secondary" class="font-term text-sm text-secondary-name">{{ r.entry.secondary }}</span>
            </a>
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
              <span class="font-term font-semibold text-realm-concept">{{ r.entry.primary }}</span>
              <span v-if="r.entry.secondary" class="font-term text-sm text-secondary-name">{{ r.entry.secondary }}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="relRows.length" class="mt-8">
      <h2 class="text-sm font-semibold text-ink-2">
        关系<span class="font-mono text-xs font-normal text-ink-3 ml-2">{{ relRows.length }}</span>
      </h2>
      <ul class="mt-2">
        <li v-for="r in visible()" :key="r.label + r.entry.id" class="py-1">
          <a :href="href(r.entry)" class="w-fit hover:underline no-underline">
            <span class="inline-block w-16 text-sm text-ink-3">{{ r.label }}</span>
            <span class="font-term font-semibold" :class="TXT[r.entry.realm] ?? TXT.technical">{{ r.entry.primary }}</span>
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
</template>
