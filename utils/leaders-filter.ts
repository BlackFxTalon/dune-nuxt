import type { LeadersFilterState } from '~/composables/useLeaders'
import type { Leader } from '~/shared/types/domain'

export const filterLeaders = (leaders: Leader[], filters: LeadersFilterState) => {
  const setFilter = (filters.set || '').trim()
  const difficultyFilter = (filters.difficulty || '').trim()

  return leaders.filter((leader) => {
    if (setFilter && leader.set !== setFilter) {
      return false
    }

    if (difficultyFilter && leader.difficulty !== difficultyFilter) {
      return false
    }

    return true
  })
}
