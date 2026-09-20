import { useTheme } from '../context/ThemeContext'
import { useStreak } from '../context/StreakContext'
import { DateCard } from './DateCard'

export function Hero() {
  const { theme, toggleTheme } = useTheme()
  const streak = useStreak()

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-main">
          <div className="hero-title-box">
            <h1>English Idioms Everyday</h1>
          </div>
          <p className="hero-tagline">
            One idiom, one word, one quiz — every single day. Flip the cards until they stick.
          </p>
        </div>

        <div className="hero-side">
          <div className="hero-actions">
            <span className="streak-badge" title={`Longest streak: ${streak.longest} day(s)`}>
              🔥 {streak.count} day{streak.count === 1 ? '' : 's'}
            </span>
            <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
          <DateCard />
        </div>
      </div>
    </section>
  )
}
