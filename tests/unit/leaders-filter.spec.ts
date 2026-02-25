import { describe, expect, it } from 'vitest'
import { filterLeaders } from '~/utils/leaders-filter'

describe('leaders filters', () => {
  it('filters by set and difficulty', () => {
    const leaders = [
      { set: 'base', difficulty: 'easy' },
      { set: 'uprising', difficulty: 'hard' }
    ]
    const out = filterLeaders(leaders as any, { set: 'base', difficulty: 'easy' } as any)
    expect(out).toHaveLength(1)
  })
})
