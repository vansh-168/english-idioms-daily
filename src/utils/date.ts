function formatDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function todayKey(): string {
  return formatDateKey(new Date())
}

export function yesterdayKey(): string {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return formatDateKey(date)
}

export function dayOfYear(date: Date = new Date()): number {
  const startOfYear = new Date(date.getFullYear(), 0, 0)
  const diffMs = date.getTime() - startOfYear.getTime()
  return Math.floor(diffMs / 86_400_000)
}

export function formatDisplayDate(date: Date = new Date()): string {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
