# լավ բաներ / lav baner

A hand-picked collection of good things: channels, films, music, communities and tools worth your time, Armenian and international. English at `/`, Armenian at `/hy/`.

Live: https://hayktarkhanyan.github.io/lav-baner/

## Suggest something

Fill in the [Google Form](https://forms.gle/t7vc8Q75BiNV7NNj6). No account needed.

## Add an entry yourself

Every entry lives in one file: [`src/data/items.yaml`](src/data/items.yaml). On GitHub, open it, click the pencil icon, add your entry and propose the change. GitHub turns that into a pull request for you.

A regular entry:

```yaml
- id: kurzgesagt                 # unique, lowercase, words joined by -
  section: learn                 # learn | film | music | dance | memes | sayings | photography | initiatives | tools
  armenian: false                # true if Armenian-made or in Armenian
  name: Kurzgesagt - In a Nutshell
  name_hy: Քուրցգեզագտ           # optional
  description:
    en: Beautifully animated videos on science, space and the big questions.
    hy: Գեղեցիկ անիմացված վիդեոներ գիտության և տիեզերքի մասին։
  topics: [science, animation]   # keys from src/taxonomy.ts
  links:                         # link types from src/taxonomy.ts
    website: https://kurzgesagt.org/
    youtube: https://www.youtube.com/@kurzgesagt
```

A saying (proverbs, jokes, quotes) uses `text`, `translation` and `meaning` instead:

```yaml
- id: esh-mi-satki
  section: sayings
  armenian: true
  text: Էշ մի սատկի, գարուն ա գալիս
  translation: Don't die, donkey, spring is coming.
  meaning: Said of promises of better times that will come too late to help.
  topics: [proverb, donkey]
```

**Logo (optional):** put a square image at `src/assets/logos/<id>.webp` (or `.png` / `.jpg`), named after the entry's `id`. Films use a poster (2:3). 128 px is plenty; the build makes the small versions. Without a logo the entry shows its section's emoji.

Every topic gets its own page, `/topics/<topic>/` (and `/hy/topics/<topic>/`), built automatically.

Rules the build checks (it fails with a message if one is broken):

- `section`, `topics` and link types must be names listed in [`src/taxonomy.ts`](src/taxonomy.ts). To add a new topic or link type, add it there with both an English and an Armenian label.
- Regular entries need `name`, `description.en`, `description.hy` and at least one link.
- If a value contains `: ` (colon + space), wrap it in double quotes, or YAML reads it as a new field.
- The order of entries in the file is the order on the page.

## Run it locally

Needs Node 22.23 or newer.

```sh
npm install
npm run dev       # http://localhost:4321/lav-baner/
npm run build     # static site in dist/, ~10 s
```

Pushing to `main` deploys to GitHub Pages through `.github/workflows/deploy.yml`.
