import type { Card, FaqEntry, House, Leader, RatingPayload } from '~/shared/types/domain'
import type { DataProvider } from '~/shared/types/providers'
import cardsData from '~/content/cards/base-sample.json'
import imperiumRatings from '~/content/ratings/imperium.json'
import uprisingRatings from '~/content/ratings/uprising.json'

const cards: Card[] = cardsData as Card[]

const leaders: Leader[] = [
  {
    slug: 'chani',
    title: 'Chani',
    set: 'base',
    difficulty: 'medium',
    faction: ['fremen']
  }
]

const houses: House[] = [
  {
    slug: 'dom-atreides',
    title: 'House Atreides',
    set: 'base',
    motto: 'Here I am, here I remain.',
    summary: 'Political flexibility and steady tempo.'
  }
]

const faqEntries: FaqEntry[] = [
  {
    id: 'what-is-this',
    question: 'What is this site?',
    answer: 'A fan-made reference for Dune Imperium players.'
  },
  {
    id: 'is-official',
    question: 'Is this official?',
    answer: 'No, this is a community project.'
  }
]

const ratingsByMode: Record<'imperium' | 'uprising', RatingPayload> = {
  imperium: imperiumRatings as RatingPayload,
  uprising: uprisingRatings as RatingPayload
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
