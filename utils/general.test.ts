import { expect, test } from 'vitest'
import { normalizeClassName } from '~/utils'

test('normalizeClassName', () => {
  expect(normalizeClassName('text-sm', 'font-bold')).toBe('text-sm font-bold')
})
