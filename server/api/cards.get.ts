import { getCardsRepository } from '~/server/repositories/cards.repository'

export default defineEventHandler(async () => {
  const repo = getCardsRepository()
  return repo.list()
})
