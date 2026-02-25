import type { Card } from '~/shared/types/domain'

export const sortCards = (cards: Card[], mode: 'name' | 'cost') =>
  [...cards].sort((a, b) =>
    mode === 'name'
      ? a.sortName.localeCompare(b.sortName, 'en')
      : a.sortCost - b.sortCost
  )
