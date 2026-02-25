import { getRatingsRepository } from '~/server/repositories/ratings.repository'

export default async (event: any) => {
  const requestUrl = event?.node?.req?.url
  const modeFromUrl = requestUrl
    ? new URL(requestUrl, 'http://localhost').searchParams.get('mode')
    : undefined
  const mode = modeFromUrl === 'uprising' ? 'uprising' : 'imperium'
  const repo = getRatingsRepository()
  return repo.getMode(mode)
}
