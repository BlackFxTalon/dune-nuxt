import { getHousesRepository } from '~/server/repositories/houses.repository'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const repo = getHousesRepository()
  const house = slug ? await repo.bySlug(slug) : null

  if (!house) {
    throw createError({
      statusCode: 404,
      statusMessage: 'House not found'
    })
  }

  return house
})
