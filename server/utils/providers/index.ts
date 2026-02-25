import type { DataProvider } from '~/shared/types/providers'
import { contentProvider } from './content-provider'

export const getDataProvider = (): DataProvider => {
  return contentProvider
}
