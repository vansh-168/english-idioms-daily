import { useEffect, useMemo, useState } from 'react'
import { idioms } from '../data/idioms'
import { dayOfYear } from '../utils/date'
import { useBookmarks } from '../context/BookmarksContext'
import { useDate } from '../context/DateContext'

export function DailyIdiom() {
  const { viewedDate, offsetDays } = useDate()
  const dailyIndex = useMemo(() => dayOfYear(viewedDate) % idioms.length, [viewedDate])
  const [index, setIndex] = useState(dailyIndex)
  const { isBookmarked, toggleBookmark } = useBookmarks()

  useEffect(() => {
    setIndex(dailyIndex)
  }, [dailyIndex])

  const idiom = idioms[index]

  const showAnother = () => {
    if (idioms.length <= 1) return
    let next = Math.floor(Math.random() * idioms.length)
    while (next === index) {
      next = Math.floor(Math.random() * idioms.length)
    }
    setIndex(next)
  }

  const label = index !== dailyIndex ? 'Explore' : offsetDays === 0 ? "Today's idiom" : 'Idiom for this day'

  return (
    <section className="card daily-idiom">
      <p className="eyebrow">{label}</p>
      <h2>{idiom.phrase}</h2>
      <p className="meaning">{idiom.meaning}</p>
      <p className="example">“{idiom.example}”</p>
      <div className="card-actions">
        <button type="button" onClick={showAnother}>
          Show another idiom
        </button>
        <button
          type="button"
          className={isBookmarked(idiom.id) ? 'bookmark-btn active' : 'bookmark-btn'}
          onClick={() => toggleBookmark(idiom.id)}
        >
          {isBookmarked(idiom.id) ? '★ Bookmarked' : '☆ Bookmark'}
        </button>
      </div>
    </section>
  )
}
