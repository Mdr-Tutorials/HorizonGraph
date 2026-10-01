<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { DATA_VERSION } from "../generated/dataset";

const status = ref<"preparing" | "ready" | "failed" | "unsupported">("preparing");
const updateReady = ref(false);
const controlled = ref(false);
let registration: ServiceWorkerRegistration | undefined;
let disposed = false;

async function checkStatus() {
  if (!registration?.active || disposed) return;
  const worker = registration.active;
  const channel = new MessageChannel();
  const answer = await new Promise<{ ready: boolean; dataVersion: string; release: string } | null>((resolve) => {
    const timeout = setTimeout(() => { channel.port1.close(); resolve(null); }, 5000);
    channel.port1.onmessage = (event) => {
      clearTimeout(timeout);
      channel.port1.close();
      resolve(event.data);
    };
    worker.postMessage({ type: "HG_STATUS" }, [channel.port2]);
  });
  if (disposed) return;
  if (answer) {
    controlled.value = !!navigator.serviceWorker.controller;
    status.value = answer.dataVersion !== DATA_VERSION ? "preparing" : answer.ready ? "ready" : "failed";
    if (status.value === "ready") worker.postMessage({ type: "HG_CLIENT_READY", release: answer.release, dataVersion: DATA_VERSION });
  }
  updateReady.value = !!registration.waiting;
}

function watchWorker(worker: ServiceWorker | null) {
  worker?.addEventListener("statechange", () => {
    if (disposed) return;
    updateReady.value = !!registration?.waiting;
    if (worker.state === "activated") void checkStatus();
    if (worker.state === "redundant" && !registration?.active) status.value = "failed";
  });
}

function update() {
  // Every controlled tab listens for controllerchange and reloads its complete snapshot.
  registration?.waiting?.postMessage({ type: "HG_SKIP_WAITING" });
}
function controllerChanged() { location.reload(); }
function refresh() { location.reload(); }
function online() { void registration?.update().catch(() => {}); void checkStatus(); }
async function retry() {
  status.value = "preparing";
  try {
    if (registration) {
      await registration.update();
      if (registration.active) {
        const channel = new MessageChannel();
        const repaired = await new Promise<boolean>((resolve) => {
          const timeout = setTimeout(() => { channel.port1.close(); resolve(false); }, 60000);
          channel.port1.onmessage = (event) => { clearTimeout(timeout); channel.port1.close(); resolve(event.data.ready === true); };
          registration!.active!.postMessage({ type: "HG_REPAIR" }, [channel.port2]);
        });
        if (!repaired) { status.value = "failed"; return; }
        await checkStatus();
      }
    } else await register();
  } catch { status.value = "failed"; }
}
function visible() { if (!document.hidden) void checkStatus(); }

async function register() {
  const B = import.meta.env.BASE_URL;
  registration = await navigator.serviceWorker.register(`${B}sw.js`, { scope: B, updateViaCache: "none" });
  if (disposed) return;
  watchWorker(registration.installing);
  updateReady.value = !!registration.waiting;
  registration.addEventListener("updatefound", () => watchWorker(registration?.installing ?? null));
  if (registration.active) await checkStatus();
  else {
    await navigator.serviceWorker.ready;
    await checkStatus();
  }
}

onMounted(async () => {
  if (!import.meta.env.PROD || !("serviceWorker" in navigator)) {
    status.value = "unsupported";
    return;
  }
  navigator.serviceWorker.addEventListener("controllerchange", controllerChanged);
  addEventListener("online", online);
  document.addEventListener("visibilitychange", visible);
  try {
    await register();
  } catch {
    if (!disposed) status.value = "failed";
  }
});

onUnmounted(() => {
  disposed = true;
  navigator.serviceWorker?.removeEventListener("controllerchange", controllerChanged);
  removeEventListener("online", online);
  document.removeEventListener("visibilitychange", visible);
});
</script>

<template>
  <p v-if="status !== 'unsupported'" class="m-0 text-sm text-ink-2" aria-live="polite" data-offline-status>
    <span v-if="status === 'ready'">离线可用</span>
    <span v-else-if="status === 'preparing'">正在准备离线内容</span>
    <span v-else>离线内容下载未完成，联网后可重试</span>
    <button v-if="status === 'failed'" class="ml-3 cursor-pointer border-0 bg-transparent p-0 text-accent underline underline-offset-2" @click="retry">重试</button>
    <button v-if="updateReady" class="ml-3 cursor-pointer border-0 bg-transparent p-0 text-accent underline underline-offset-2" @click="update">更新并刷新</button>
    <button v-else-if="status === 'ready' && !controlled" class="ml-3 cursor-pointer border-0 bg-transparent p-0 text-accent underline underline-offset-2" @click="refresh">刷新启用离线</button>
  </p>
</template>
