import { useState } from 'react'
import { Hero } from './components/Hero'
import { TabNav } from './components/TabNav'
import { SectionHeader } from './components/SectionHeader'
import { DailyIdiom } from './components/DailyIdiom'
import { WordOfDay } from './components/WordOfDay'
import { Flashcards } from './components/Flashcards'
import { Quiz } from './components/Quiz'
import { Bookmarks } from './components/Bookmarks'
import { ThemeProvider } from './context/ThemeContext'
import { BookmarksProvider } from './context/BookmarksContext'
import { StreakProvider } from './context/StreakContext'
import { DateProvider } from './context/DateContext'
import { tabAccent } from './data/tabAccents'
import type { Tab } from './types'
import './App.css'

function AppContent() {
  const [tab, setTab] = useState<Tab>('daily')

  return (
    <div className="page">
      <Hero />
      <div className="app">
        <TabNav activeTab={tab} onTabChange={setTab} />
        <SectionHeader tab={tab} />
        <main className={`app-main accent-${tabAccent[tab]}`}>
          {tab === 'daily' && <DailyIdiom />}
          {tab === 'word' && <WordOfDay />}
          {tab === 'flashcards' && <Flashcards />}
          {tab === 'quiz' && <Quiz />}
          {tab === 'bookmarks' && <Bookmarks />}
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <DateProvider>
        <StreakProvider>
          <BookmarksProvider>
            <AppContent />
          </BookmarksProvider>
        </StreakProvider>
      </DateProvider>
    </ThemeProvider>
  )
}

export default App
