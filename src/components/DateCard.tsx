import { useDate } from '../context/DateContext'

function formatParts(date: Date) {
  return {
    weekday: date.toLocaleDateString(undefined, { weekday: 'long' }),
    day: date.getDate(),
    month: date.toLocaleDateString(undefined, { month: 'long' }),
    year: date.getFullYear(),
  }
}

export function DateCard() {
  const { viewedDate, offsetDays, shiftDay, resetToToday } = useDate()
  const { weekday, day, month, year } = formatParts(viewedDate)
  const isToday = offsetDays === 0

  return (
    <div className="date-widget">
      <span className={isToday ? 'date-tag today' : 'date-tag preview'}>{isToday ? 'Today' : 'Preview'}</span>

      <div className="date-row">
        <button type="button" className="date-arrow" onClick={() => shiftDay(-1)} aria-label="Previous day">
          ◀
        </button>

        <div className="date-face">
          <span className="date-month">{month}</span>
          <span className="date-day">{day}</span>
          <span className="date-sub">
            {weekday}, {year}
          </span>
        </div>

        <button type="button" className="date-arrow" onClick={() => shiftDay(1)} aria-label="Next day">
          ▶
        </button>
      </div>

      {!isToday && (
        <button type="button" className="date-today-btn" onClick={resetToToday}>
          Jump to today
        </button>
      )}
    </div>
  )
}
