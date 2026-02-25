import { describe, expect, it } from 'vitest'
import { getCardsRepository } from '~/server/repositories/cards.repository'

describe('cards repository', () => {
  it('returns array of cards', async () => {
    const repo = getCardsRepository()
    const cards = await repo.list()
    expect(Array.isArray(cards)).toBe(true)
  })
})
