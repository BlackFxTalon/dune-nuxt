export type GameMode = 'imperium' | 'uprising'

export interface Card {
  slug: string
  title: string
  set: string
  cost: number
  faction: string[]
  sortName: string
  sortCost: number
  type?: string
  text?: string
  image?: string
}

export interface Leader {
  slug: string
  title: string
  set: string
  difficulty: string
  faction: string[]
  ability?: string
  image?: string
}

export interface House {
  slug: string
  title: string
  set: string
  motto?: string
  summary?: string
}

export interface FaqEntry {
  id: string
  question: string
  answer: string
}

export interface RatingEntry {
  player: string
  score: number
  faction?: string
  notes?: string
}

export interface RatingPayload {
  mode: GameMode
  updatedAt: string
  entries: RatingEntry[]
}
