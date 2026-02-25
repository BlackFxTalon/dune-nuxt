import { getDataProvider } from '~/server/utils/providers'

const provider = getDataProvider()

export const getHousesRepository = () => ({
  list: async () => provider.getHouses(),
  bySlug: async (slug: string) => provider.getHouseBySlug(slug)
})
