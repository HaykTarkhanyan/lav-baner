import { readFileSync } from "node:fs";

export const HIDDEN_FILE = "src/data/hidden.txt";

// Ids listed in src/data/hidden.txt (comments and blank lines skipped).
export function readHiddenIds(): Set<string> {
  return new Set(
    readFileSync(HIDDEN_FILE, "utf-8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#")),
  );
}
