import { getDataProvider } from '~/server/utils/providers'

const provider = getDataProvider()

export const getCardsRepository = () => ({
  list: async () => provider.getCards(),
  bySlug: async (slug: string) => provider.getCardBySlug(slug)
})
