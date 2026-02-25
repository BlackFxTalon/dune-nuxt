import { getCardsRepository } from '~/server/repositories/cards.repository'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const repo = getCardsRepository()
  const card = slug ? await repo.bySlug(slug) : null

  if (!card) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Card not found'
    })
  }

  return card
})
