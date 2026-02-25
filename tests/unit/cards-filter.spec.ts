import { describe, expect, it } from 'vitest'
import { applyCardFilters } from '~/utils/cards-filter'
import { sortCards } from '~/utils/cards-sort'

describe('cards filters', () => {
  it('filters by set and faction', () => {
    const items = [
      { set: 'base', faction: ['imperium'], cost: 3, title: 'A', sortName: 'a', sortCost: 3 },
      { set: 'uprising', faction: ['fremen'], cost: 2, title: 'B', sortName: 'b', sortCost: 2 }
    ]
    const out = applyCardFilters(items as any, { set: 'base', faction: 'imperium' } as any)
    expect(out).toHaveLength(1)
  })

  it('sorts by cost ascending', () => {
    const items = [
      { sortName: 'z', sortCost: 5 },
      { sortName: 'a', sortCost: 1 }
    ]
    const out = sortCards(items as any, 'cost')
    expect(out[0]?.sortCost).toBe(1)
  })
})
