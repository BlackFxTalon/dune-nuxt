import { describe, expect, it } from 'vitest'
import { getDataProvider } from '~/server/utils/providers'

describe('provider contract', () => {
  it('returns provider with required methods', () => {
    const provider = getDataProvider()
    expect(typeof provider.getCards).toBe('function')
    expect(typeof provider.getLeaders).toBe('function')
    expect(typeof provider.getRatings).toBe('function')
  })
})
