import { createContext, useContext, useState, type ReactNode } from 'react'

type DateContextValue = {
  viewedDate: Date
  offsetDays: number
  shiftDay: (delta: number) => void
  resetToToday: () => void
}

const DateContext = createContext<DateContextValue | null>(null)

function addDays(base: Date, days: number): Date {
  const next = new Date(base)
  next.setDate(next.getDate() + days)
  return next
}

export function DateProvider({ children }: { children: ReactNode }) {
  const [offsetDays, setOffsetDays] = useState(0)
  const viewedDate = addDays(new Date(), offsetDays)

  const shiftDay = (delta: number) => setOffsetDays((current) => current + delta)
  const resetToToday = () => setOffsetDays(0)

  return (
    <DateContext.Provider value={{ viewedDate, offsetDays, shiftDay, resetToToday }}>
      {children}
    </DateContext.Provider>
  )
}

export function useDate() {
  const context = useContext(DateContext)
  if (!context) throw new Error('useDate must be used within a DateProvider')
  return context
}
