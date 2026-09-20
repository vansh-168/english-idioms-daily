import { useEffect, useMemo, useState } from 'react'
import { idioms } from '../data/idioms'
import { useBookmarks } from '../context/BookmarksContext'

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function Flashcards() {
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks()
  const [onlyBookmarked, setOnlyBookmarked] = useState(false)
  const [deck, setDeck] = useState(() => shuffle(idioms))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const cards = useMemo(
    () => (onlyBookmarked ? deck.filter((idiom) => bookmarks.includes(idiom.id)) : deck),
    [deck, onlyBookmarked, bookmarks],
  )

  useEffect(() => {
    setIndex(0)
    setFlipped(false)
  }, [onlyBookmarked])

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (cards.length === 0) return
      if (event.key === ' ') {
        event.preventDefault()
        setFlipped((f) => !f)
      } else if (event.key === 'ArrowRight') {
        setFlipped(false)
        setIndex((prev) => (prev + 1) % cards.length)
      } else if (event.key === 'ArrowLeft') {
        setFlipped(false)
        setIndex((prev) => (prev - 1 + cards.length) % cards.length)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [cards])

  const reshuffle = () => {
    setDeck(shuffle(idioms))
    setIndex(0)
    setFlipped(false)
  }

  const goTo = (delta: number) => {
    if (cards.length === 0) return
    setFlipped(false)
    setIndex((prev) => (prev + delta + cards.length) % cards.length)
  }

  return (
    <section className="card flashcards">
      <div className="flashcard-controls">
        <label className="toggle">
          <input
            type="checkbox"
            checked={onlyBookmarked}
            onChange={(event) => setOnlyBookmarked(event.target.checked)}
          />
          Bookmarked only
        </label>
        <button type="button" onClick={reshuffle}>
          Shuffle deck
        </button>
      </div>

      {cards.length === 0 ? (
        <p className="empty-state">No bookmarked idioms yet. Bookmark some first, or turn this filter off.</p>
      ) : (
        <>
          <p className="eyebrow">
            Card {index + 1} of {cards.length}
          </p>

          <div
            className={flipped ? 'flashcard flipped' : 'flashcard'}
            role="button"
            tabIndex={0}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') setFlipped((f) => !f)
            }}
          >
            <div className="flashcard-face flashcard-front">
              <h2>{cards[index].phrase}</h2>
              <p className="hint">Click, press Enter, or press Space to flip</p>
            </div>
            <div className="flashcard-face flashcard-back">
              <p className="meaning">{cards[index].meaning}</p>
              <p className="example">“{cards[index].example}”</p>
            </div>
          </div>

          <div className="card-actions">
            <button type="button" onClick={() => goTo(-1)}>
              ← Prev
            </button>
            <button
              type="button"
              className={isBookmarked(cards[index].id) ? 'bookmark-btn active' : 'bookmark-btn'}
              onClick={() => toggleBookmark(cards[index].id)}
            >
              {isBookmarked(cards[index].id) ? '★ Bookmarked' : '☆ Bookmark'}
            </button>
            <button type="button" onClick={() => goTo(1)}>
              Next →
            </button>
          </div>
        </>
      )}
    </section>
  )
}
