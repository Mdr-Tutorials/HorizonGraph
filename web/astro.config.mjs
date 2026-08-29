import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  // BASE_URL 拼接处均假定期末尾带 "/"（如 `${B}cat/...`），这里统一归一化
  base: (process.env.PUBLIC_BASE_PATH || "/").replace(/\/?$/, "/"),
  publicDir: "../dist",
  integrations: [vue()],
  vite: { plugins: [tailwindcss()] },
});
