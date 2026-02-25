import { getHousesRepository } from '~/server/repositories/houses.repository'

export default defineEventHandler(async () => {
  const repo = getHousesRepository()
  return repo.list()
})
