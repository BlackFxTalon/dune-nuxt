import type { Ref } from 'vue'
import type { GameMode, RatingPayload } from '~/shared/types/domain'

export const useRatings = (mode: Ref<GameMode>) =>
  useAsyncData<RatingPayload>(() => `ratings:${mode.value}`, () =>
    $fetch('/api/ratings', { params: { mode: mode.value } })
  )
