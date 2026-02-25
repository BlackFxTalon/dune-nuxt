import type { Ref } from 'vue'
import type { Card } from '~/shared/types/domain'

export interface CardsFilterState {
  set?: string
  faction?: string
  search?: string
  sort?: 'name' | 'cost'
}

export const useCards = (filters: Ref<CardsFilterState>) =>
  useAsyncData<Card[]>('cards:list', () =>
    $fetch('/api/cards', { params: filters.value })
  )
