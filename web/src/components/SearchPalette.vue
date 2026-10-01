<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { Search as SearchIcon } from "lucide-vue-next";
import { search, type Hit } from "../lib/search";
import { TXT } from "../lib/ui";

const B = import.meta.env.BASE_URL;
const open = ref(false);
const q = ref("");
const hits = ref<{ terms: Hit[]; nav: Hit[] }>({ terms: [], nav: [] });
const sel = ref(0);
const loading = ref(false);
const error = ref("");
let req = 0;

const flat = computed(() => [...hits.value.terms, ...hits.value.nav]);

function toggle() {
  open.value = !open.value;
  req++;
  loading.value = false;
  error.value = "";
  if (open.value) {
    q.value = "";
    hits.value = { terms: [], nav: [] };
    sel.value = 0;
    setTimeout(() => document.getElementById("hg-q")?.focus(), 0);
  }
}
function close() {
  open.value = false;
  req++;
  loading.value = false;
}
async function run() {
  const r = ++req;
  loading.value = true;
  error.value = "";
  hits.value = { terms: [], nav: [] };
  sel.value = 0;
  try {
    const res = await search(q.value);
    if (r === req && open.value) {
      hits.value = res;
      sel.value = 0;
    }
  } catch {
    if (r === req && open.value) {
      hits.value = { terms: [], nav: [] };
      error.value = "搜索暂时无法加载，请检查网络连接或重新打开页面。";
    }
  } finally {
    if (r === req) loading.value = false;
  }
}
function go(h: Hit) {
  close();
  const target = `${B}${h.kind === 0 ? "cat" : "term"}/${h.id}`;
  if (h.kind !== 0) {
    window.dispatchEvent(new CustomEvent("hg-term-nav", { detail: { id: h.id } }));
  } else {
    location.href = target;
  }
}
function onKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    toggle();
    return;
  }
  if (!open.value) return;
  if (e.key === "Escape") close();
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    sel.value = Math.max(0, Math.min(sel.value + 1, flat.value.length - 1));
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    sel.value = Math.max(sel.value - 1, 0);
  } else if (e.key === "Enter") {
    const h = flat.value[sel.value];
    if (h) go(h);
  }
}
onMounted(() => {
  addEventListener("keydown", onKey);
  const trigger = document.getElementById("hg-search") as HTMLButtonElement | null;
  trigger?.addEventListener("click", toggle);
  if (trigger) trigger.disabled = false;
});
onUnmounted(() => {
  req++;
  removeEventListener("keydown", onKey);
  const trigger = document.getElementById("hg-search") as HTMLButtonElement | null;
  trigger?.removeEventListener("click", toggle);
  if (trigger) trigger.disabled = true;
});
</script>

<template>
  <div v-if="open" role="dialog" aria-modal="true" aria-label="搜索词条" class="fixed inset-0 z-50 bg-page/95 p-4 pt-24" @click.self="close">
    <div class="max-w-xl mx-auto">
      <div class="flex items-center gap-2 border-b border-line pb-2">
        <SearchIcon :size="16" class="text-ink-3 shrink-0" />
        <input
          id="hg-q"
          v-model="q"
          :placeholder="'搜索词条'"
          class="w-full bg-transparent text-lg outline-none text-ink placeholder:text-ink-3"
          @input="run"
        />
      </div>
      <div class="mt-3">
        <p v-if="loading" class="text-xs text-ink-3">搜索中…</p>
        <p v-else-if="error" class="text-sm text-ink-3">{{ error }}</p>
        <p v-else-if="q.trim() && !flat.length" class="text-sm text-ink-3">未找到匹配词条</p>
        <template v-if="hits.terms.length">
          <p class="text-xs text-ink-3">词条</p>
          <button
            v-for="(h, i) in hits.terms"
            :key="h.id"
            data-search-result="term"
            :data-search-id="h.id"
            class="flex items-baseline gap-2 w-full text-left px-1 py-1 cursor-pointer bg-transparent border-0"
            :class="sel === i ? 'underline' : ''"
            @click="go(h)"
            @mousemove="sel = i"
          >
            <span class="font-term font-medium" :class="TXT[h.realm] ?? TXT.technical">{{ h.primary }}</span>
            <span v-if="h.secondary" class="font-term text-sm text-secondary-name">{{ h.secondary }}</span>
          </button>
        </template>
        <template v-if="hits.nav.length">
          <p class="mt-3 text-xs text-ink-3">导航</p>
          <button
            v-for="(h, i) in hits.nav"
            :key="h.id"
            data-search-result="category"
            :data-search-id="h.id"
            class="flex items-baseline gap-2 w-full text-left px-1 py-1 cursor-pointer bg-transparent border-0"
            :class="sel === hits.terms.length + i ? 'underline' : ''"
            @click="go(h)"
            @mousemove="sel = hits.terms.length + i"
          >
            <span class="font-term font-medium" :class="TXT[h.realm] ?? TXT.technical">{{ h.primary }}</span>
            <span v-if="h.secondary" class="font-term text-sm text-secondary-name">{{ h.secondary }}</span>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
