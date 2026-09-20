import { tabAccent } from '../data/tabAccents'
import type { Tab } from '../types'

const TABS: { id: Tab; label: string }[] = [
  { id: 'daily', label: 'Daily Idiom' },
  { id: 'word', label: 'Word of the Day' },
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'bookmarks', label: 'Bookmarks' },
]

export function TabNav({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (tab: Tab) => void }) {
  return (
    <nav className="tab-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={tab.id === activeTab ? `tab active tab-accent-${tabAccent[tab.id]}` : 'tab'}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
