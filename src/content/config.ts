import { defineCollection, z } from 'astro:content';

const journeyCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    category: z.enum(['identity', 'company', 'properties', 'ai', 'directory', 'website', 'social']),
    label: z.string(),
    benefit: z.string().optional(),
    description: z.string().optional(),
    completed: z.boolean().default(false),
    locked: z.boolean().default(false),
    unlockAt: z.number().optional(),
    href: z.string(),
    xp: z.number().optional(),
    priority: z.number(),
    weight: z.number().optional(),
  }),
});

const curriculumCollection = defineCollection({
  type: 'data', // Changed to 'data' for JSON
  schema: z.object({
    title: z.string(),
    description: z.string(),
    level: z.enum(['Foundational', 'Professional', 'Advanced']),
    duration: z.string(),
    xp: z.number(),
    order: z.number(),
    implementationTrigger: z.object({
      label: z.string(),
      href: z.string(),
      context: z.string()
    }).optional()
  }),
});

export const collections = {
  'journey': journeyCollection,
  'curriculum': curriculumCollection,
};
