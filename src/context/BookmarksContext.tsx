import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

type BookmarksContextValue = {
  bookmarks: string[]
  isBookmarked: (id: string) => boolean
  toggleBookmark: (id: string) => void
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null)

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('idioms-bookmarks', [])

  const isBookmarked = (id: string) => bookmarks.includes(id)

  const toggleBookmark = (id: string) => {
    setBookmarks((current) =>
      current.includes(id) ? current.filter((bookmarkedId) => bookmarkedId !== id) : [...current, id],
    )
  }

  return (
    <BookmarksContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  )
}

export function useBookmarks() {
  const context = useContext(BookmarksContext)
  if (!context) throw new Error('useBookmarks must be used within a BookmarksProvider')
  return context
}
