import type { GameMode } from '~/shared/types/domain'
import { getDataProvider } from '~/server/utils/providers'

const provider = getDataProvider()

export const getRatingsRepository = () => ({
  getMode: async (mode: GameMode) => provider.getRatings(mode)
})
