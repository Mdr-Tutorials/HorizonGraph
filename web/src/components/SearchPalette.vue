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
let req = 0;

const flat = computed(() => [...hits.value.terms, ...hits.value.nav]);

function toggle() {
  open.value = !open.value;
  if (open.value) {
    q.value = "";
    hits.value = { terms: [], nav: [] };
    sel.value = 0;
    setTimeout(() => document.getElementById("hg-q")?.focus(), 0);
  }
}
function close() {
  open.value = false;
}
async function run() {
  const r = ++req;
  const res = await search(q.value);
  if (r === req) {
    hits.value = res;
    sel.value = 0;
  }
}
function go(h: Hit) {
  close();
  location.href = `${B}${h.kind === 0 ? "cat" : "term"}/${h.id}`;
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
    sel.value = Math.min(sel.value + 1, flat.value.length - 1);
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
  document.getElementById("hg-search")?.addEventListener("click", toggle);
});
onUnmounted(() => {
  removeEventListener("keydown", onKey);
});
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 bg-page/95 p-4 pt-24" @click.self="close">
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
        <template v-if="hits.terms.length">
          <p class="text-xs text-ink-3">词条</p>
          <button
            v-for="(h, i) in hits.terms"
            :key="h.id"
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
