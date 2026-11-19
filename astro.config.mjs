// @ts-check
import { readFileSync } from "node:fs";
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { parse } from "yaml";

// Astro's file() loader only logs a YAML syntax error and keeps the previous (or no)
// entries, so a broken items.yaml could publish stale or empty data. Parse it here
// first: a syntax error fails the build with the line and column. Same for hidden.txt:
// an id that matches no entry (a typo) fails the build instead of hiding nothing.
const strictItemsYaml = {
  name: "strict-items-yaml",
  hooks: {
    "astro:build:start": () => {
      const items = parse(readFileSync("src/data/items.yaml", "utf-8"));
      const ids = new Set(items.map((x) => x.id));
      const hidden = readFileSync("src/data/hidden.txt", "utf-8")
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#"));
      const unknown = hidden.filter((id) => !ids.has(id));
      if (unknown.length > 0) {
        throw new Error(`src/data/hidden.txt lists ids that are not in items.yaml: ${unknown.join(", ")}`);
      }
    },
  },
};

export default defineConfig({
  site: "https://hayktarkhanyan.github.io",
  base: "/lav-baner",
  trailingSlash: "always",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "hy"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    strictItemsYaml,
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", hy: "hy" } },
    }),
  ],
  fonts: [
    {
      // Body text. One family that covers both Latin and Armenian.
      name: "Google Sans",
      cssVariable: "--font-body",
      provider: fontProviders.google(),
      weights: [400, 500, 700],
      styles: ["normal"],
      subsets: ["latin", "armenian"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      // Wordmark + section headings. Handjet, cut down with fontTools to wght 500,
      // ELGR 1 and the ELSH axis 8-16 (beads -> hearts), Basic Latin + Armenian only.
      name: "Handjet",
      cssVariable: "--font-mark",
      provider: fontProviders.local(),
      options: {
        variants: [
          { src: ["./src/assets/fonts/handjet-wordmark.woff2"], weight: 500, style: "normal" },
        ],
      },
      fallbacks: ["monospace"],
    },
  ],
});
