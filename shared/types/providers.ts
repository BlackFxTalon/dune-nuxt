import type { Card, FaqEntry, House, Leader, RatingPayload } from './domain'

export interface DataProvider {
  getCards(): Promise<Card[]>
  getCardBySlug(slug: string): Promise<Card | null>
  getLeaders(): Promise<Leader[]>
  getLeaderBySlug(slug: string): Promise<Leader | null>
  getHouses(): Promise<House[]>
  getHouseBySlug(slug: string): Promise<House | null>
  getFaq(): Promise<FaqEntry[]>
  getRatings(mode: 'imperium' | 'uprising'): Promise<RatingPayload>
}
