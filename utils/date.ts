import { format, startOfDay } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export function normalizeDate(date?: Date | number) {
  return date && format(date, 'yyyy-MM-dd')
}

export function getChineseDate(date?: string | number | Date) {
  return utcToZonedTime(date ?? new Date(), 'Asia/Shanghai')
}

export function getStartOfToday() {
  const now = getChineseDate()
  const today = startOfDay(now)
  return today
}
