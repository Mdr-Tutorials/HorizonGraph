import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  base: process.env.PUBLIC_BASE_PATH || "/",
  publicDir: "../dist",
  integrations: [vue()],
  vite: { plugins: [tailwindcss()] },
});
