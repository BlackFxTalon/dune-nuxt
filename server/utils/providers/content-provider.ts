import type { Card, FaqEntry, House, Leader, RatingPayload } from '~/shared/types/domain'
import type { DataProvider } from '~/shared/types/providers'

const cards: Card[] = []
const leaders: Leader[] = []
const houses: House[] = []
const faqEntries: FaqEntry[] = []

const ratingsByMode: Record<'imperium' | 'uprising', RatingPayload> = {
  imperium: {
    mode: 'imperium',
    updatedAt: new Date(0).toISOString(),
    entries: []
  },
  uprising: {
    mode: 'uprising',
    updatedAt: new Date(0).toISOString(),
    entries: []
  }
}

export const contentProvider: DataProvider = {
  async getCards() {
    return cards
  },
  async getCardBySlug(slug: string) {
    return cards.find((card) => card.slug === slug) ?? null
  },
  async getLeaders() {
    return leaders
  },
  async getLeaderBySlug(slug: string) {
    return leaders.find((leader) => leader.slug === slug) ?? null
  },
  async getHouses() {
    return houses
  },
  async getHouseBySlug(slug: string) {
    return houses.find((house) => house.slug === slug) ?? null
  },
  async getFaq() {
    return faqEntries
  },
  async getRatings(mode: 'imperium' | 'uprising') {
    return ratingsByMode[mode]
  }
}
