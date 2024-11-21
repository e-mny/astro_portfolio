import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";

import react from "@astrojs/react";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://enochmok.vercel.app/",
  integrations: [
    sitemap(),
    robotsTxt({
      sitemap: [
        "https://enochmok.vercel.app/sitemap-index.xml",
        "https://enochmok.vercel.app/sitemap-0.xml",
      ],
    }),
    icon(),
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
