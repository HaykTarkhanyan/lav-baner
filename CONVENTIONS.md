# Conventions

- **Repo type: personal, not client facing.** Commit and push without asking; say in the reply what went out. (Hayk's global rule from 2026-11-20; nobody else works in or deploys from this repo.)
- **Entries:** one block per entry in `src/data/items.yaml`, kebab-case `id`, sections and topics only from `src/taxonomy.ts`. Generate new blocks with `yaml.safe_dump(..., allow_unicode=True)` when scripting, so quoting is always valid (an unquoted `: ` broke the build once).
- **Descriptions:** one or two plain sentences, English and Armenian, factual. Armenian keeps Latin-script titles as they are (no `։` inside an English title).
- **Armenian text:** use the global `armenian-writing` skill for every Armenian string. Never polish sayings or Hayk's own lines.
- **Sayings:** Armenian `text`, literal English `translation`, and a `meaning` only when Hayk has seen it or it is certain. Uncertain meanings are left out, not guessed.
- **Logos:** `src/assets/logos/<id>.webp`, 128 px square (films: 160 px wide poster). Check every fetched logo by eye: generic YouTube letter avatars, banner crops and "latest comic" og:images get deleted, and the entry shows its section emoji instead.
- **Hiding instead of deleting:** remove an entry from the site with `npm run hide -- <id>` (writes `src/data/hidden.txt`); delete the block only when it should be gone for good.
- **Start here:** the home page's top row comes from `src/data/picks.txt` (ids, one per line). Only Hayk chooses these.
- **Search text:** normalize with `src/search.ts` on both sides (build and browser). Never lowercase search text by hand: Armenian և needs the shared rules.
- **Private material:** anything derived from personal exports (Telegram, Drive) lives in the gitignored `_private/` folder, never in tracked files.
