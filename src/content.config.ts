import { defineCollection, z } from 'astro:content';

const speakers = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string(),
    categories: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    talkTitle: z.string().optional(),
    talkDate: z.string().optional(),
    talkTime: z.string().optional(),
    talkVenue: z.string().optional(),
  }),
});

const programme = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    venue: z.string(),
    categories: z.array(z.string()),
    speakers: z.array(z.string()).optional(),
    ticketRequired: z.boolean().default(true),
    familyFriendly: z.boolean().default(false),
  }),
});

const tickets = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    price: z.number(),
    earlybirdPrice: z.number().optional(),
    earlybirdEnds: z.string().optional(),
    localPrice: z.number().optional(),
    includes: z.array(z.string()),
    available: z.boolean().default(true),
    order: z.number(),
    purchaseUrl: z.string().optional(),
    highlight: z.boolean().default(false),
    variant: z.enum(['bright', 'white', 'sludge']).default('white'),
  }),
});

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    category: z.string(),
    order: z.number(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
});

export const collections = {
  speakers,
  programme,
  tickets,
  faq,
  pages,
};
