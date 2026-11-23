// Search text rules, shared by the build (Entry.astro) and the browser (Home.astro).

const ARMENIAN_TO_LATIN: Record<string, string> = {
  ա: "a", բ: "b", գ: "g", դ: "d", ե: "e", զ: "z", է: "e", ը: "e", թ: "t", ժ: "j", ի: "i", լ: "l", խ: "x",
  ծ: "c", կ: "k", հ: "h", ձ: "z", ղ: "g", ճ: "c", մ: "m", յ: "y", ն: "n", շ: "sh", ո: "o", չ: "c", պ: "p",
  ջ: "j", ռ: "r", ս: "s", վ: "v", տ: "t", ր: "r", ց: "c", ւ: "v", փ: "p", ք: "k", օ: "o", ֆ: "f",
};

// Case, and the three ways to write the Armenian "ev": և, եւ and եվ all count as the same.
// NFKC splits the single character և into ե + ւ. Emphasis marks inside words (Դասավանդի՛ր) are dropped.
export function normalize(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[՛՜՞]/g, "")
    .replace(/եւ/g, "եվ");
}

// Collapses the different ways people type Armenian in Latin letters: menq/menk, tsliky/cliky, voske/oske.
export function fold(latin: string): string {
  return latin
    .replace(/(^|\s)vo/g, "$1o")
    .replace(/tch|ch|ts|tz/g, "c")
    .replace(/kh/g, "x")
    .replace(/gh/g, "g")
    .replace(/zh/g, "j")
    .replace(/dz/g, "z")
    .replace(/ou/g, "u")
    .replace(/ye/g, "e")
    .replace(/q/g, "k")
    .replace(/w/g, "v")
    .replace(/y/g, "e");
}

// Armenian text as loose Latin, so "menq enq" finds Մենք ենք.
export function latinize(armenian: string): string {
  const text = normalize(armenian).replace(/ու/g, "u");
  return fold([...text].map((ch) => ARMENIAN_TO_LATIN[ch] ?? ch).join(""));
}
