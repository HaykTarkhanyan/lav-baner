// The fixed vocabulary for items.yaml. The content schema only accepts keys listed here,
// so a typo in items.yaml fails the build instead of silently creating a new filter.
// To add a section, topic or link type: add it here with both labels.

type Label = { en: string; hy: string };

// Order here = order on the page. The emoji also stands in for a missing logo.
export const SECTIONS = {
  learn: { en: "Learn", hy: "Սովորել", emoji: "🎓" },
  film: { en: "Film", hy: "Ֆիլմեր", emoji: "🎬" },
  music: { en: "Music", hy: "Երաժշտություն", emoji: "🎵" },
  dance: { en: "Dance", hy: "Պար", emoji: "💃" },
  memes: { en: "Memes & satire", hy: "Մեմեր և երգիծանք", emoji: "😂" },
  sayings: { en: "Jokes & sayings", hy: "Անեկդոտներ և ասացվածքներ", emoji: "🫏" },
  photography: { en: "Photography", hy: "Լուսանկարչություն", emoji: "📷" },
  food: { en: "Food", hy: "Ուտելիք", emoji: "🍯" },
  initiatives: { en: "Initiatives", hy: "Նախաձեռնություններ", emoji: "🤝" },
  tools: { en: "Tools & maps", hy: "Գործիքներ և քարտեզներ", emoji: "🧭" },
} satisfies Record<string, Label & { emoji: string }>;

export const TOPICS = {
  ai: { en: "AI", hy: "ԱԲ" },
  math: { en: "math", hy: "մաթեմատիկա" },
  programming: { en: "programming", hy: "ծրագրավորում" },
  science: { en: "science", hy: "գիտություն" },
  history: { en: "history", hy: "պատմություն" },
  ideas: { en: "ideas", hy: "մտքեր" },
  education: { en: "education", hy: "կրթություն" },
  "in-armenian": { en: "dubbed into Armenian", hy: "հայերեն թարգմանված" },
  podcast: { en: "podcast", hy: "փոդքասթ" },
  lectures: { en: "lectures", hy: "դասախոսություններ" },
  course: { en: "course", hy: "դասընթաց" },
  community: { en: "community", hy: "համայնք" },
  news: { en: "news", hy: "լուրեր" },
  satire: { en: "satire", hy: "երգիծանք" },
  comedy: { en: "comedy", hy: "կատակերգություն" },
  kargin: { en: "Kargin", hy: "Կարգին" },
  folk: { en: "folk", hy: "ժողովրդական" },
  classic: { en: "classic", hy: "դասական" },
  animation: { en: "animation", hy: "անիմացիա" },
  proverb: { en: "proverbs", hy: "ասացվածքներ" },
  donkey: { en: "donkey", hy: "էշ" },
  language: { en: "language", hy: "լեզու" },
  joke: { en: "jokes", hy: "անեկդոտներ" },
  grants: { en: "grants", hy: "դրամաշնորհներ" },
  charity: { en: "charity", hy: "բարեգործություն" },
  regions: { en: "regions", hy: "մարզեր" },
  culture: { en: "culture", hy: "մշակույթ" },
  maps: { en: "maps", hy: "քարտեզներ" },
  outdoors: { en: "outdoors", hy: "արշավներ" },
  yerevan: { en: "Yerevan", hy: "Երևան" },
  design: { en: "design", hy: "դիզայն" },
  psychology: { en: "psychology", hy: "հոգեբանություն" },
  free: { en: "free", hy: "անվճար" },
} satisfies Record<string, Label>;

// Order here = order of the link icons on an entry. The first link an entry has
// (in this order) becomes the link on its name.
export const LINK_TYPES = {
  website: { en: "Website", hy: "Կայք" },
  youtube: { en: "YouTube", hy: "YouTube" },
  wikipedia: { en: "Wikipedia", hy: "Վիքիպեդիա" },
  imdb: { en: "IMDb", hy: "IMDb" },
  telegram: { en: "Telegram", hy: "Telegram" },
  instagram: { en: "Instagram", hy: "Instagram" },
  facebook: { en: "Facebook", hy: "Facebook" },
  x: { en: "X", hy: "X" },
  tiktok: { en: "TikTok", hy: "TikTok" },
  patreon: { en: "Patreon", hy: "Patreon" },
  spotify: { en: "Spotify", hy: "Spotify" },
  apple_podcasts: { en: "Apple Podcasts", hy: "Apple Podcasts" },
  github: { en: "GitHub", hy: "GitHub" },
  linkedin: { en: "LinkedIn", hy: "LinkedIn" },
  notion: { en: "Notion", hy: "Notion" },
  reddit: { en: "Reddit", hy: "Reddit" },
  sheet: { en: "Spreadsheet", hy: "Աղյուսակ" },
  pdf: { en: "PDF", hy: "PDF" },
  map: { en: "Map", hy: "Քարտեզ" },
  app_store: { en: "App Store", hy: "App Store" },
  google_play: { en: "Google Play", hy: "Google Play" },
} satisfies Record<string, Label>;

export type Lang = "en" | "hy";
export type SectionKey = keyof typeof SECTIONS;
export type TopicKey = keyof typeof TOPICS;
export type LinkKey = keyof typeof LINK_TYPES;

export const SECTION_KEYS = Object.keys(SECTIONS) as [SectionKey, ...SectionKey[]];
export const TOPIC_KEYS = Object.keys(TOPICS) as [TopicKey, ...TopicKey[]];
export const LINK_KEYS = Object.keys(LINK_TYPES) as [LinkKey, ...LinkKey[]];

// Shorter names for the section bar, which has to fit on one line.
export const SECTION_CHIPS: Partial<Record<SectionKey, Label>> = {
  memes: { en: "Memes", hy: "Մեմեր" },
  sayings: { en: "Sayings", hy: "Ասացվածքներ" },
  photography: { en: "Photos", hy: "Լուսանկարներ" },
  initiatives: { en: "Initiatives", hy: "Նախաձեռնություններ" },
  tools: { en: "Tools", hy: "Գործիքներ" },
};

// Other words search should accept for a section or topic.
export const SEARCH_ALIASES: Partial<Record<SectionKey | TopicKey, string>> = {
  film: "movie movies cinema կինո",
  music: "song songs երգ երգեր",
  dance: "dancing",
  memes: "meme funny",
  photography: "photo photos ֆոտո",
  food: "jam",
  initiatives: "ngo nonprofit",
  tools: "app apps",
  ai: "artificial intelligence machine learning ml",
  math: "mathematics maths",
  programming: "coding code",
  podcast: "podcasts",
  course: "courses",
  lectures: "lecture",
  joke: "anekdot",
};
