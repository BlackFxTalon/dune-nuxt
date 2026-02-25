import { getLeadersRepository } from '~/server/repositories/leaders.repository'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const repo = getLeadersRepository()
  const leader = slug ? await repo.bySlug(slug) : null

  if (!leader) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Leader not found'
    })
  }

  return leader
})
