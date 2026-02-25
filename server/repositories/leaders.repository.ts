import { getDataProvider } from '~/server/utils/providers'

const provider = getDataProvider()

export const getLeadersRepository = () => ({
  list: async () => provider.getLeaders(),
  bySlug: async (slug: string) => provider.getLeaderBySlug(slug)
})
