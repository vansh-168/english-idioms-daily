import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { todayKey, yesterdayKey } from '../utils/date'

type StreakData = {
  count: number
  longest: number
  lastVisit: string | null
}

const StreakContext = createContext<StreakData | null>(null)

const initialStreak: StreakData = { count: 0, longest: 0, lastVisit: null }

export function StreakProvider({ children }: { children: ReactNode }) {
  const [streak, setStreak] = useLocalStorage<StreakData>('idioms-streak', initialStreak)

  useEffect(() => {
    const today = todayKey()

    setStreak((current) => {
      if (current.lastVisit === today) return current

      const isConsecutiveDay = current.lastVisit === yesterdayKey()
      const count = isConsecutiveDay ? current.count + 1 : 1

      return { count, longest: Math.max(current.longest, count), lastVisit: today }
    })
  }, [setStreak])

  return <StreakContext.Provider value={streak}>{children}</StreakContext.Provider>
}

export function useStreak() {
  const context = useContext(StreakContext)
  if (!context) throw new Error('useStreak must be used within a StreakProvider')
  return context
}
