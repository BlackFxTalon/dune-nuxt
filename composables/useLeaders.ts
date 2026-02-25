import type { Ref } from 'vue'
import type { Leader } from '~/shared/types/domain'

export interface LeadersFilterState {
  set?: string
  difficulty?: string
}

export const useLeaders = (filters: Ref<LeadersFilterState>) =>
  useAsyncData<Leader[]>('leaders:list', () =>
    $fetch('/api/leaders', { params: filters.value })
  )
