import type { Card } from '~/shared/types/domain'
import type { CardsFilterState } from '~/composables/useCards'

export const applyCardFilters = (cards: Card[], filters: CardsFilterState) => {
  const setFilter = (filters.set || '').trim()
  const factionFilter = (filters.faction || '').trim()
  const searchFilter = (filters.search || '').trim().toLowerCase()

  return cards.filter((card) => {
    if (setFilter && card.set !== setFilter) {
      return false
    }

    if (factionFilter && !card.faction.includes(factionFilter)) {
      return false
    }

    if (searchFilter && !card.title.toLowerCase().includes(searchFilter)) {
      return false
    }

    return true
  })
}
