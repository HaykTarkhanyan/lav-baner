# Deferred

- **"Start here" picks (U10):** the row is built and hidden. Hayk will choose 6-8 entries; they go in `src/data/picks.txt`.
- **9 entries still show the section emoji (2026-11-23):** `we-and-our-mountains` (no poster on any Wikipedia, IMDb blocked), `burastan-murabba` and `musipedia-tapping` (Cloudflare block), `kharuyk` (Instagram needs a login), `chtesutyun` (site has no image), `ashot-nakashyan-webinars`, `armenian-dialects`, `armenian-bands-list`, `yerevan-street-names` (only generic platform logos). An image from Hayk would fix any of them: save it as `src/assets/logos/<id>.webp`.

- **Proverb meanings to get from Hayk** (my guesses were taken off the live site on 2026-11-19; add a `meaning:` line to each in `items.yaml`):
  - `urishi-harsi-tutuzov` Ուրիշի հարսի տուտուզով փեսուն լավություն անել (my guess was "to be generous at someone else's expense")
  - `mati-u-matanu-arank` Մտնել մատի ու մատանու արանքը (guess: "to meddle between two very close people")
  - `tan-el-che` Թան էլ չէ, փրթած մածուն (guess: "neither one thing nor the other")
  - Also: a native read of all Armenian descriptions (all written by Claude).

- **Cherry-pick from the `weekly_links` Google Sheet** (Hayk's Drive, the weekly course picks: Video, Meme, Music Arm, Music Global, Kargin quote, Wallpaper). ~265 linked cells. The CSV export loses the hyperlinks; export the sheet as `.xlsx` and read `cell.hyperlink.target` with openpyxl instead. The `Topic` column is the course syllabus, not content. Hayk said: "we cherry pick from it later" (2026-11-19).
  - Wallpaper column = 12 photos (mostly Unsplash, Armenian photographers), a natural seed for Photography.
  - Kargin column = 39 quotes with links, for Jokes & sayings.
- **Hell News Telegram / Instagram:** asked for, not found (2026-11-19). Only the Facebook page could be confirmed.
- **ML EVN Telegram:** groups are invite-only ("Request an invitation" on mlevn.org), no public link.
- **Bare link on the old random site:** https://www.youtube.com/watch?v=9DGNqnpMpbc ("чунга-чанга" by talur999). Unclear why it was listed; ask Hayk.
- **Custom domain** (e.g. a `.am`): better for SEO than `hayktarkhanyan.github.io/lav-baner`; one line in `astro.config.mjs` + `i18n.ts` and a CNAME.
- **Search Console:** submit `https://hayktarkhanyan.github.io/lav-baner/sitemap-index.xml` (robots.txt can't point to it, since robots.txt only works at the domain root).
