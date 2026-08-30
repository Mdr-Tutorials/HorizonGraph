<script setup lang="ts">
// 成员列表浏览：排序（影响力/字母/年代）+ 筛选（影响力档位/类型）+ 类型分组开关
// 全部控制收进标题右侧省略号弹出菜单；popular 未填（0）视作未知：排序垫底，档位筛选下不出现
import { computed, onMounted, onUnmounted, ref } from "vue";
import { MoreHorizontal, ArrowDownUp, Filter, Check } from "lucide-vue-next";
import { TYPE_ZH, TXT } from "../lib/ui";

export type Member = {
  id: string;
  primary: string;
  secondary?: string;
  realm: string;
  type: string;
  popular: number; // 0 = 未填
  first_released: string; // "" = 未填
  href: string;
};

const props = withDefaults(defineProps<{ members: Member[]; heading?: string }>(), { heading: "成员" });

const SORTS = [
  { value: "popular", label: "影响力" },
  { value: "alpha", label: "字母" },
  { value: "oldest", label: "最早" },
  { value: "newest", label: "最新" },
] as const;
const BANDS = [
  { value: 4, label: "极高", range: "81-100" },
  { value: 3, label: "高", range: "61-80" },
  { value: 2, label: "中", range: "41-60" },
  { value: 1, label: "低", range: "1-40" },
] as const;

const sort = ref<string>("popular");
const band = ref<number>(0);
const type = ref<string>("");
const grouped = ref(false);
const open = ref(false);
const root = ref<HTMLElement | null>(null);

const typeOptions = computed(() => [...new Set(props.members.map((m) => m.type))].sort());
const hasPopular = computed(() => props.members.some((m) => m.popular > 0));
const hasDates = computed(() => props.members.some((m) => m.first_released));
const dirty = computed(() => sort.value !== "popular" || band.value !== 0 || type.value !== "" || grouped.value);

function toggle() {
  open.value = !open.value;
}
function onDocClick(e: MouseEvent) {
  if (open.value && root.value && !root.value.contains(e.target as Node)) open.value = false;
}
onMounted(() => document.addEventListener("click", onDocClick));
onUnmounted(() => document.removeEventListener("click", onDocClick));

function bandOf(m: Member): number {
  if (m.popular <= 0) return 0;
  if (m.popular >= 81) return 4;
  if (m.popular >= 61) return 3;
  if (m.popular >= 41) return 2;
  return 1;
}
const nameOf = (t: string) => TYPE_ZH[t] ?? t;

function pickSort(v: string) {
  sort.value = v;
}
function pickBand(v: number) {
  band.value = band.value === v ? 0 : v;
}
function pickType(v: string) {
  type.value = type.value === v ? "" : v;
}
function reset() {
  sort.value = "popular";
  band.value = 0;
  type.value = "";
  grouped.value = false;
}

function compare(a: Member, b: Member): number {
  if (sort.value === "popular") {
    // 未填垫底；已填按 popular 降序
    if ((a.popular > 0) !== (b.popular > 0)) return a.popular > 0 ? -1 : 1;
    if (a.popular !== b.popular) return b.popular - a.popular;
    return a.id < b.id ? -1 : 1;
  }
  if (sort.value === "alpha") return a.id < b.id ? -1 : 1;
  if (sort.value === "oldest" || sort.value === "newest") {
    // 年代：未填垫底
    if (!a.first_released !== !b.first_released) return a.first_released ? -1 : 1;
    const d = (a.first_released || "").localeCompare(b.first_released || "");
    if (d) return sort.value === "oldest" ? d : -d;
  }
  return a.id < b.id ? -1 : 1;
}

const shown = computed(() => {
  const f = props.members.filter(
    (m) => (type.value === "" || m.type === type.value) && (band.value === 0 || bandOf(m) === band.value)
  );
  if (grouped.value) {
    const byType = new Map<string, Member[]>();
    for (const m of f) {
      if (!byType.has(m.type)) byType.set(m.type, []);
      byType.get(m.type)!.push(m);
    }
    return [...byType.entries()].sort(([x], [y]) => nameOf(x).localeCompare(nameOf(y), "zh")).map(([t, ms]) => ({
      key: t,
      label: nameOf(t),
      members: [...ms].sort(compare),
    }));
  }
  return [{ key: "", label: "", members: [...f].sort(compare) }];
});

const menuRow = "flex w-full items-center gap-2 rounded px-3 py-1.5 text-left text-sm bg-transparent border-0 cursor-pointer";
const rowOn = "text-ink font-medium";
const rowOff = "text-ink-2 hover:bg-[var(--c-line)]";

const shownCount = computed(() => shown.value.reduce((s, g) => s + g.members.length, 0));
</script>

<template>
  <div ref="root" class="relative mt-8">
    <!-- 无 JS 降级：静态完整列表（爬虫/禁 JS 可见） -->
    <noscript>
      <slot />
    </noscript>

    <!-- 标题行：标题 + 计数 + 省略号按钮 -->
    <div class="relative flex items-baseline gap-2">
      <h2 class="text-sm font-semibold text-ink-2 flex items-baseline gap-2 m-0">
        {{ props.heading }}
        <span class="font-mono text-xs font-normal text-ink-3">{{ shownCount }}</span>
      </h2>
      <!-- 锚点容器：弹层贴省略号按钮 -->
      <div class="relative self-center shrink-0">
        <button
          @click="toggle()"
          aria-label="排序与筛选"
          title="排序与筛选"
          class="inline-flex items-center cursor-pointer bg-transparent border-0 p-1 rounded"
          :class="dirty ? 'text-ink' : 'text-ink-3 hover:text-ink-2'"
        >
          <MoreHorizontal :size="16" />
        </button>
        <div
          v-if="open"
          class="absolute left-0 top-full z-20 mt-1 w-48 rounded-lg border border-line bg-page shadow-lg p-1.5"
        >
      <p class="flex items-center gap-1.5 px-3 pt-1 pb-0.5 text-xs text-ink-3">
        <ArrowDownUp :size="12" /> 排序
      </p>
      <button
        v-for="s in SORTS"
        :key="s.value"
        @click="pickSort(s.value)"
        :class="[menuRow, sort === s.value ? rowOn : rowOff]"
      >
        <Check v-if="sort === s.value" :size="13" class="shrink-0" />
        <span v-else class="w-[13px] shrink-0"></span>
        {{ s.label }}
      </button>

      <template v-if="hasPopular">
        <p class="flex items-center gap-1.5 px-3 pt-2 pb-0.5 text-xs text-ink-3">
          <Filter :size="12" /> 影响力
        </p>
        <button
          v-for="b in BANDS"
          :key="b.value"
          @click="pickBand(b.value)"
          :title="b.range"
          :class="[menuRow, band === b.value ? rowOn : rowOff]"
        >
          <Check v-if="band === b.value" :size="13" class="shrink-0" />
          <span v-else class="w-[13px] shrink-0"></span>
          {{ b.label }}
          <span class="ml-auto font-mono text-[10px] text-ink-3">{{ b.range }}</span>
        </button>
      </template>

      <template v-if="typeOptions.length > 1">
        <p class="flex items-center gap-1.5 px-3 pt-2 pb-0.5 text-xs text-ink-3">
          <Filter :size="12" /> 类型
        </p>
        <button
          v-for="t in typeOptions"
          :key="t"
          @click="pickType(t)"
          :class="[menuRow, type === t ? rowOn : rowOff]"
        >
          <Check v-if="type === t" :size="13" class="shrink-0" />
          <span v-else class="w-[13px] shrink-0"></span>
          {{ nameOf(t) }}
        </button>
        <button v-if="type" @click="pickType('')" :class="menuRow">
          <span class="w-[13px] shrink-0"></span> 全部类型
        </button>
      </template>

      <label class="flex w-full items-center gap-2 rounded px-3 py-1.5 text-left text-sm text-ink-2 cursor-pointer hover:bg-[var(--c-line)]">
        <input type="checkbox" v-model="grouped" class="accent-[var(--c-accent)]" />
        按类型分组
      </label>

      <button v-if="dirty" @click="reset()" class="mt-1 w-full rounded border-0 border-t border-line pt-2 pb-1 text-center text-xs text-ink-3 hover:text-ink-2 bg-transparent cursor-pointer">
        恢复默认
      </button>
        </div>
      </div>
    </div>

    <!-- 列表 -->
    <section v-for="g in shown" :key="g.key" class="mt-2">
      <h3 v-if="g.label" class="text-xs font-semibold text-ink-3 mt-4">{{ g.label }}</h3>
      <ul class="term-grid mt-2">
        <li v-for="m in g.members" :key="m.id">
          <a :href="m.href" class="inline-block w-fit py-1 hover:underline no-underline">
            <span class="font-term font-medium" :class="TXT[m.realm] ?? TXT.technical">{{ m.primary }}</span>
            <span v-if="m.secondary" class="font-term text-sm text-secondary-name">{{ m.secondary }}</span>
          </a>
        </li>
      </ul>
    </section>
    <p v-if="shown.every((g) => !g.members.length)" class="mt-4 text-sm text-ink-3">无符合条件的成员</p>
  </div>
</template>