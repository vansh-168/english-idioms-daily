import type { Tab } from '../types'

export const tabCopy: Record<Tab, { title: string; subtitle: string }> = {
  daily: { title: 'Daily Idiom', subtitle: "Today's Phrase" },
  word: { title: 'Word of the Day', subtitle: 'Learn Something New' },
  flashcards: { title: 'Flashcards', subtitle: 'Flip to Reveal' },
  quiz: { title: 'Quiz', subtitle: 'Test Yourself' },
  bookmarks: { title: 'Bookmarks', subtitle: 'Your Saved List' },
}
