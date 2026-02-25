import { getLeadersRepository } from '~/server/repositories/leaders.repository'

export default defineEventHandler(async () => {
  const repo = getLeadersRepository()
  return repo.list()
})
