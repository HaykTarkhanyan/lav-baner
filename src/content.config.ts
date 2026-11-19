import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";
import { parse } from "yaml";
import { LINK_KEYS, SECTION_KEYS, TOPIC_KEYS } from "./taxonomy";

const url = z.string().url();

// One optional field per link type, and nothing else (strict: unknown keys fail the build).
const links = z
  .object(Object.fromEntries(LINK_KEYS.map((k) => [k, url.optional()])))
  .strict()
  .default({});

const items = defineCollection({
  // getCollection() returns entries sorted by id; `order` keeps the order written in the file.
  loader: file("src/data/items.yaml", {
    parser: (text) => (parse(text) as Record<string, unknown>[]).map((x, i) => ({ ...x, order: i })),
  }),
  schema: z
    .object({
      id: z.string().regex(/^[a-z0-9-]+$/, "id must be kebab-case: a-z, 0-9 and -"),
      order: z.number().int(),
      section: z.enum(SECTION_KEYS),
      armenian: z.boolean().default(false),
      // Regular entries: name (+ Armenian name) and a description in both languages.
      name: z.string().optional(),
      name_hy: z.string().optional(),
      description: z.object({ en: z.string(), hy: z.string() }).optional(),
      // Sayings: the original text, a literal English translation, and the meaning.
      text: z.string().optional(),
      translation: z.string().optional(),
      meaning: z.string().optional(),
      topics: z.array(z.enum(TOPIC_KEYS)).default([]),
      links,
    })
    .superRefine((item, ctx) => {
      if (item.section === "sayings") {
        if (!item.text) ctx.addIssue({ code: "custom", message: `${item.id}: sayings need 'text'` });
        return;
      }
      if (!item.name) ctx.addIssue({ code: "custom", message: `${item.id}: needs 'name'` });
      if (!item.description)
        ctx.addIssue({ code: "custom", message: `${item.id}: needs 'description' with 'en' and 'hy'` });
      if (Object.keys(item.links).length === 0)
        ctx.addIssue({ code: "custom", message: `${item.id}: needs at least one link` });
    }),
});

export const collections = { items };
