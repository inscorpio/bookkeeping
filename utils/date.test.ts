import { expect, test } from 'vitest'
import { normalizeDate } from '~/utils'

test('normalizeDate', () => {
  const date = normalizeDate(new Date(2023, 10, 4))
  expect(date).toBe('2023-11-04')
})
