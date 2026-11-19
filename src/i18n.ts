import type { Lang } from "./taxonomy";

export const SITE = {
  url: "https://hayktarkhanyan.github.io",
  base: "/lav-baner",
  // Suggestions go to this Google Form (the same one the old "random" site used).
  suggestForm: "https://forms.gle/t7vc8Q75BiNV7NNj6",
  repo: "https://github.com/HaykTarkhanyan/lav-baner",
};

export const UI = {
  en: {
    title: "lav baner: good things worth your time",
    metaDescription:
      "A hand-picked list of channels, films, music, communities and tools worth your time, Armenian and international.",
    gloss: "lav baner, Armenian for “good things”",
    intro:
      "A hand-picked list of channels, films, music, communities and tools that are worth your time. Some are Armenian, some are not.",
    suggest: "Suggest a good thing",
    origin: { all: "Everything", armenian: "Armenian", international: "International" },
    allSections: "All",
    searchLabel: "Search",
    searchPlaceholder: (n: number) => `Search ${n} things`,
    topicsLabel: "Topics",
    showing: (shown: number, total: number) => `${shown} of ${total}`,
    emptyTitle: "Nothing matches these filters.",
    clearFilters: "Clear filters",
    emptySection: "Nothing here yet.",
    armenianMark: "Armenian",
    meaningLabel: "Meaning",
    footer: "Made in Yerevan and Munich. Know something that belongs here?",
    source: "Source on GitHub",
    switchTo: "Հայերեն",
    topicTitle: (topic: string) => `#${topic} on lav baner`,
    topicDescription: (topic: string, n: number) =>
      `${n} hand-picked good things tagged ${topic}: channels, films, communities and tools worth your time.`,
    topicCount: (n: number) => (n === 1 ? "1 thing" : `${n} things`),
    backHome: "All good things",
  },
  hy: {
    title: "Լավ բաներ",
    metaDescription:
      "Ձեռքով ընտրված ալիքներ, ֆիլմեր, երաժշտություն, համայնքներ և գործիքներ, որոնց վրա արժե ժամանակ ծախսել՝ հայկական ու միջազգային։",
    gloss: "",
    intro:
      "Ձեռքով ընտրված ալիքներ, ֆիլմեր, երաժշտություն, համայնքներ ու գործիքներ, որոնց վրա արժե ժամանակ ծախսել։ Մի մասը հայկական է, մի մասը՝ ոչ։",
    suggest: "Առաջարկել լավ բան",
    origin: { all: "Բոլորը", armenian: "Հայկական", international: "Միջազգային" },
    allSections: "Բոլորը",
    searchLabel: "Որոնում",
    searchPlaceholder: (n: number) => `Որոնել ${n} բանի մեջ`,
    topicsLabel: "Թեմաներ",
    showing: (shown: number, total: number) => `${shown}՝ ${total}-ից`,
    emptyTitle: "Այս ֆիլտրերով ոչինչ չգտնվեց։",
    clearFilters: "Մաքրել ֆիլտրերը",
    emptySection: "Այստեղ դեռ ոչինչ չկա։",
    armenianMark: "Հայկական",
    meaningLabel: "Իմաստը",
    footer: "Պատրաստված է Երևանում և Մյունխենում։ Գիտե՞ք մի բան, որ պետք է այստեղ լինի։",
    source: "Կոդը GitHub-ում",
    switchTo: "English",
    topicTitle: (topic: string) => `#${topic} | Լավ բաներ`,
    topicDescription: (topic: string, n: number) =>
      `${n} ձեռքով ընտրված լավ բան «${topic}» թեմայով՝ ալիքներ, ֆիլմեր, համայնքներ և գործիքներ։`,
    topicCount: (n: number) => `${n} բան`,
    backHome: "Բոլոր լավ բաները",
  },
} satisfies Record<Lang, unknown>;

export function pathFor(lang: Lang, topic?: string): string {
  const root = lang === "en" ? `${SITE.base}/` : `${SITE.base}/hy/`;
  return topic ? `${root}topics/${topic}/` : root;
}

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path}`;
}
