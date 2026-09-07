import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const learn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    published: z.string(),
    updated: z.string().optional(),
    category: z.string(),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(true),
    clientApproved: z.boolean().default(false),
  }),
});
export const collections = { learn, work };
