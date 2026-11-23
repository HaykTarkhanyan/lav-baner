import { readFileSync } from "node:fs";

export const HIDDEN_FILE = "src/data/hidden.txt";
export const PICKS_FILE = "src/data/picks.txt";

// The ids in a list file, in file order (comments and blank lines skipped).
function readIds(path: string): string[] {
  return readFileSync(path, "utf-8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

export function readHiddenIds(): Set<string> {
  return new Set(readIds(HIDDEN_FILE));
}

// The "Start here" row on the home page.
export function readPickIds(): string[] {
  return readIds(PICKS_FILE);
}
