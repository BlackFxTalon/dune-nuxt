import { describe, expect, it } from 'vitest'
import cards from '~/content/cards/base-sample.json'

describe('cards schema', () => {
  it('contains required keys', () => {
    expect(cards[0]).toHaveProperty('slug')
    expect(cards[0]).toHaveProperty('set')
    expect(cards[0]).toHaveProperty('cost')
  })
})
