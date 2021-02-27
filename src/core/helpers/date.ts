import { DateTime } from 'luxon'

export function format(date: string, format: string): string {
  return DateTime.fromISO(date).toFormat(format)
}

export function formatLocale(date: string, locale: string): string {
  return format(date, locale)
}
