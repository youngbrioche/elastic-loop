import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    socialDescription: z.string().optional(),
    kicker: z.string(),
    order: z.number(),
    status: z.enum(['seed', 'final']),
    updated: z.coerce.date(),
  }),
});

export const collections = { pages };
