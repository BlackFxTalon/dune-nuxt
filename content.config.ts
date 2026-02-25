import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    news: defineCollection({
      type: 'page',
      source: 'news/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string()
      })
    }),
    articles: defineCollection({
      type: 'page',
      source: 'articles/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string()
      })
    }),
    leaders: defineCollection({
      type: 'page',
      source: 'leaders/*.md',
      schema: z.object({
        title: z.string(),
        set: z.string(),
        difficulty: z.string(),
        faction: z.array(z.string())
      })
    }),
    houses: defineCollection({
      type: 'page',
      source: 'houses/*.md',
      schema: z.object({
        title: z.string(),
        set: z.string(),
        motto: z.string().optional()
      })
    }),
    faq: defineCollection({
      type: 'page',
      source: 'faq/*.md',
      schema: z.object({
        title: z.string()
      })
    })
  }
})
