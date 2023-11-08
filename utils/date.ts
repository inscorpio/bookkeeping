import { format } from 'date-fns'

export function normalizeDate(date?: Date | number) {
  return date && format(date, 'yyyy-MM-dd')
}
