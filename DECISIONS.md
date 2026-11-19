# Decisions

Newest first.

## 10. Hiding entries through a plain text file

- **Date / status:** 2026-11-20, active (Hayk: "an option to easily hide or remove some stuff, it can be a local file, no need for a complicated solution")
- **Decision:** ids listed in `src/data/hidden.txt` are dropped in the content loader, so they vanish from every page, count, search and topic page. `npm run entries / hide / unhide` (scripts/entries.mjs) list ids and edit the file. An unknown id fails the build.
- **Why:** one file, reversible, no admin UI. Tested: hiding 2 ids took the page from 77 to 75 entries; a typo ("exurbia") failed the build; unhiding restored the file byte for byte.
- **Alternatives rejected:** a `hidden: true` field inside items.yaml (means hunting through a 900-line file); a local admin page with checkboxes (needs a server or a copy-paste step, more than asked for).
- **What would change this:** non-technical co-curators need to hide things without a terminal.

## 9. Wordmark hover: tricolor trail

- **Date / status:** 2026-11-19, active (chosen by Hayk: A3 from round 2, with the color order fixed by him)
- **Decision:** each letter of the wordmark lights up in a flag color the moment the pointer touches it and fades back to ink over 1.9 s, so a sweep paints the word. Colors go red, blue, apricot by letter, skipping the space: լ red, ա blue, վ apricot, բ red, ա blue, ն apricot, ե red, ր blue. On touch screens a passive touchmove does the same without blocking scroll. Screen readers get the plain text through an sr-only copy.
- **Why:** Hayk disliked the hearts. Of 16 ideas over two rounds (round 1: still, flowers, swell, tricolor bands, stitched-in, finer stitch, pomegranate; round 2: spotlight, apricot trail, tricolor trail, jam, gleam, plucked string, blossom, double stitch, lanterns) he picked the tricolor trail. My demo counted the space as a letter, which made բ blue; he pointed out it should be red.
- **Alternatives rejected:** the other 15 (comparison pages generated in the session scratchpad).
- **What would change this:** it feels gimmicky after a while; W1 (still beads) is the fallback.

## 8. Logos are downloaded into the repo, not hotlinked

- **Date / status:** 2026-11-19, active (Hayk asked for logos and images)
- **Decision:** each entry's logo is a 128 px WebP in `src/assets/logos/<id>.webp`, optimized by Astro at build (44 px shown, 1x + 2x). Sources, in order: YouTube channel avatar, Telegram channel avatar, the site's apple-touch-icon (>= 96 px), the Facebook page picture, the site's og:image. Films: Wikipedia poster. No logo: the section emoji.
- **Why:** self-hosted images keep the site fast and free of third-party requests and trackers, and they don't break when a CDN URL rotates. 51 logos weigh 260 KB in the repo. Fetched 51 of 61 automatically in 41 s; two Armenian films had no poster anywhere fetchable, and cropped YouTube frames looked bad, so they show the emoji.
- **Alternatives rejected:** hotlinking avatars (YouTube avatar URLs expire, privacy), a runtime favicon service like unavatar.io (third-party dependency on every page view).
- **What would change this:** logos go stale often enough that a scheduled refetch is needed.

## 7. Hashtags open static topic pages

- **Date / status:** 2026-11-19, active (Hayk: "clicking on a hashtag to bring to its page from all locations")
- **Decision:** every topic used by an entry gets `/topics/<key>/` and `/hy/topics/<key>/`, rendered by the same `Home` component with a `topic` prop. All hashtags (on entries and in the header) link there; on a topic page the header shows only related topics. The hashtag row moved out of the sticky filter bar into the header.
- **Why:** real pages are indexable (good for SEO, e.g. "#math" in Armenian) and shareable. As filters in the sticky bar, 31 topics took three rows (~250 px of a 900 px screen).
- **Alternatives rejected:** keeping topics as in-page filters (`?t=math`): not separate pages, not indexed.
- **What would change this:** combining several topics at once becomes a real need.

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

- **Date / status:** 2026-11-19, revisited 2026-11-19 (Hayk liked the design but not the hearts; the hover effect is off until he picks a new one, see DEFERRED_TODO.md)
- **Decision:** background is Yerevan pink tuff `#F7EEE9` (dark mode: basalt `#16171B`), ink blue `#1C2546`, pomegranate accent. Body in Google Sans (one family for Latin and Armenian). The wordmark and section headings are Handjet with the element-shape axis at 8 (beads), switching to 16 (hearts) on hover.
- **Why:** of the 8 Google Fonts families with Armenian glyphs (checked against fonts.google.com metadata on 2026-11-19), Handjet is the only one that can carry an identity; at ELSH 8 it reads like cross-stitch. The font is cut with fontTools to wght 500, ELGR 1, ELSH 8-16, Basic Latin + Armenian: 11.6 KB woff2 (full font 284 KB).
- **Alternatives rejected:** Noto Serif/Sans Armenian everywhere (safe but generic); warm cream + serif (the default look of generated sites).
- **What would change this:** Hayk doesn't like it.
