// List entries and hide/unhide them via src/data/hidden.txt. Runs in well under a second.
//   npm run entries [-- word]      list ids (optionally only those matching a word)
//   npm run hide -- id [id ...]    hide entries
//   npm run unhide -- id [id ...]  show them again
import { readFileSync, writeFileSync } from "node:fs";
import { parse } from "yaml";

const ITEMS = "src/data/items.yaml";
const HIDDEN = "src/data/hidden.txt";

const items = parse(readFileSync(ITEMS, "utf-8"));
const ids = new Set(items.map((x) => x.id));
const hiddenLines = readFileSync(HIDDEN, "utf-8").split(/\r?\n/);
const hidden = new Set(hiddenLines.map((l) => l.trim()).filter((l) => l && !l.startsWith("#")));

const [command = "list", ...args] = process.argv.slice(2);

function checkIds(list) {
  const unknown = list.filter((id) => !ids.has(id));
  if (list.length === 0 || unknown.length > 0) {
    console.error(list.length === 0 ? "Give at least one id." : `Unknown id(s): ${unknown.join(", ")}`);
    console.error("Find ids with: npm run entries -- <word>");
    process.exit(1);
  }
}

if (command === "list") {
  const word = args.join(" ").toLowerCase();
  const rows = items.filter((x) =>
    [x.id, x.section, x.name, x.name_hy, x.text, ...(x.topics ?? [])].join(" ").toLowerCase().includes(word),
  );
  const width = Math.max(...rows.map((x) => x.id.length), 2);
  for (const x of rows) {
    const mark = hidden.has(x.id) ? "HIDDEN " : "       ";
    console.log(`${mark}${x.id.padEnd(width)}  ${x.section.padEnd(12)}${x.name ?? x.text}`);
  }
  console.log(`\n${rows.length} of ${items.length} entries shown, ${hidden.size} hidden in total.`);
} else if (command === "hide") {
  checkIds(args);
  const added = args.filter((id) => !hidden.has(id));
  const current = hiddenLines.join("\n").replace(/\n*$/, "\n");
  writeFileSync(HIDDEN, current + added.map((id) => `${id}\n`).join(""));
  console.log(added.length ? `Hidden: ${added.join(", ")}` : "Already hidden.");
} else if (command === "unhide") {
  checkIds(args);
  const keep = hiddenLines.filter((l) => !args.includes(l.trim()));
  writeFileSync(HIDDEN, keep.join("\n"));
  console.log(`Visible again: ${args.join(", ")}`);
} else {
  console.error(`Unknown command "${command}". Use list, hide or unhide.`);
  process.exit(1);
}
