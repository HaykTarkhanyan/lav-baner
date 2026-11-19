# Decisions

Newest first.

## 6. A build hook re-parses items.yaml so a syntax error fails the build

- **Date / status:** 2026-11-19, active
- **Decision:** `astro.config.mjs` parses `src/data/items.yaml` with `yaml` in `astro:build:start` and throws on a syntax error.
- **Why:** Astro's `file()` loader catches parse errors, logs one line ("Error reading data from src/data/items.yaml") and keeps the previous entries. Tested: with a broken line appended, `astro build` exited 0 and would have published the old (or, on a fresh CI checkout, empty) list. With the hook it exits 1 and prints `Nested mappings are not allowed ... at line 507, column 9`.
- **Alternatives rejected:** an inline loader that parses the file itself (loses live reload in `astro dev`); only checking for an empty collection in the page (does not catch the stale-cache case).
- **What would change this:** Astro's file loader starts failing the build on parse errors itself.

## 5. Sections by kind of thing, plus a separate Armenian / International switch

- **Date / status:** 2026-11-19, active (chosen by Hayk, Q7)
- **Decision:** Sections are learn, film, music, dance, memes, sayings, photography, initiatives, tools. Whether an entry is Armenian is a separate boolean, filtered by the Everything / Armenian / International switch and shown as a small tricolor mark.
- **Why:** the first list was grouped Armenian / ML / General, but with film, music and photography added an Armenian film would have to pick between "Armenian" and "Film", and "all Armenian music" would not be filterable.
- **Alternatives rejected:** keeping Armenian as a section (simpler, but the overlap problem above).
- **What would change this:** most entries turn out Armenian and the switch stops being useful.

## 4. Suggestions come in through a Google Form

- **Date / status:** 2026-11-19, active (chosen by Hayk, Q3)
- **Decision:** the "Suggest a good thing" links go to the Google Form the old `random` site already used (`forms.gle/t7vc8Q75BiNV7NNj6`). Entries are added to `items.yaml` by hand.
- **Why:** anyone can fill a form without a GitHub account.
- **Alternatives rejected:** GitHub issue form (needs a GitHub account), PR-only (non-coders won't do it).
- **What would change this:** a lot of suggestions arrive and copying them by hand becomes a chore; then a script that turns form responses into YAML stubs.

## 3. Bilingual through two URL trees, not a JavaScript toggle

- **Date / status:** 2026-11-19, active (Hayk asked for an EN/HY toggle and good SEO, Q2 + Q5)
- **Decision:** English at `/lav-baner/`, Armenian at `/lav-baner/hy/`, linked with `hreflang` tags and a sitemap with language alternates. The toggle is a link between the two and keeps the current filters.
- **Why:** search engines index one language per URL; a JS toggle would hide one language from them.
- **Alternatives rejected:** client-side toggle on one page.
- **What would change this:** nothing likely.

## 2. Astro, one YAML data file, GitHub Pages

- **Date / status:** 2026-11-19, active (chosen by Hayk, Q1 + Q5)
- **Decision:** Astro 7 static site, all entries in `src/data/items.yaml` validated by a Zod schema against a fixed vocabulary in `src/taxonomy.ts`, deployed to GitHub Pages with `withastro/action`.
- **Why:** Hayk wanted good SEO and was fine with more setup. Astro pre-renders every entry into the HTML, ships no JS except a small filter script, and has built-in i18n routing and sitemap alternates. A single YAML file is the easiest thing for contributors to edit.
- **Alternatives rejected:** plain HTML + JS reading the YAML (no SEO, entries invisible without JS); Jekyll (GitHub Pages pins Jekyll 3.10 and only runs allowlisted plugins; I believe i18n plugins are not on that list, so it would have needed an Action build anyway).
- **What would change this:** the site needs per-entry pages or a CMS for non-technical editors.

## 1. Visual direction: pink tuff, basalt, beaded wordmark

- **Date / status:** 2026-11-19, active
- **Decision:** background is Yerevan pink tuff `#F7EEE9` (dark mode: basalt `#16171B`), ink blue `#1C2546`, pomegranate accent. Body in Google Sans (one family for Latin and Armenian). The wordmark and section headings are Handjet with the element-shape axis at 8 (beads), switching to 16 (hearts) on hover.
- **Why:** of the 8 Google Fonts families with Armenian glyphs (checked against fonts.google.com metadata on 2026-11-19), Handjet is the only one that can carry an identity; at ELSH 8 it reads like cross-stitch. The font is cut with fontTools to wght 500, ELGR 1, ELSH 8-16, Basic Latin + Armenian: 11.6 KB woff2 (full font 284 KB).
- **Alternatives rejected:** Noto Serif/Sans Armenian everywhere (safe but generic); warm cream + serif (the default look of generated sites).
- **What would change this:** Hayk doesn't like it.
