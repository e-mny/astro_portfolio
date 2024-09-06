import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";

import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// Environment Loading
import { loadEnv } from "vite";
const { JAWG_ACCESS_TOKEN } = loadEnv(import.meta.env.MODE, process.cwd(), "");
console.log(JAWG_ACCESS_TOKEN)


// https://astro.build/config
export default defineConfig({
  site: "https://gianmarco.xyz/",
  integrations: [sitemap(), robotsTxt({
    sitemap: [
      "https://gianmarco.xyz/sitemap-index.xml",
      "https://gianmarco.xyz/sitemap-0.xml",
    ],
  }), solidJs(), icon(), svelte(), tailwind()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },}),
  vite: {
    assetsInclude: "**/*.riv",
  },
});