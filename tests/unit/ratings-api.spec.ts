import { describe, expect, it } from 'vitest'
import handler from '~/server/api/ratings.get'

describe('/api/ratings', () => {
  it('returns imperium mode by default', async () => {
    const result = await handler({ context: { params: {} }, node: {} } as any)
    expect(result.mode).toBe('imperium')
  })
})
