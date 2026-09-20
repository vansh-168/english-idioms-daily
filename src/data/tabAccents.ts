import type { Tab } from '../types'

export type Accent = 'blue' | 'yellow' | 'pink' | 'green' | 'purple'

export const tabAccent: Record<Tab, Accent> = {
  daily: 'blue',
  word: 'yellow',
  flashcards: 'pink',
  quiz: 'green',
  bookmarks: 'purple',
}
