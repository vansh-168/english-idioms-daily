import { idioms } from '../data/idioms'
import { useBookmarks } from '../context/BookmarksContext'

export function Bookmarks() {
  const { bookmarks, toggleBookmark } = useBookmarks()
  const bookmarkedIdioms = idioms.filter((idiom) => bookmarks.includes(idiom.id))

  if (bookmarkedIdioms.length === 0) {
    return (
      <section className="card empty-state-card">
        <p className="eyebrow">Bookmarks</p>
        <p>You haven't bookmarked any idioms yet. Star an idiom from Daily Idiom or Flashcards to save it here.</p>
      </section>
    )
  }

  return (
    <section className="card bookmarks">
      <p className="eyebrow">
        {bookmarkedIdioms.length} bookmarked idiom{bookmarkedIdioms.length === 1 ? '' : 's'}
      </p>
      <ul className="bookmark-list">
        {bookmarkedIdioms.map((idiom) => (
          <li key={idiom.id}>
            <div>
              <h3>{idiom.phrase}</h3>
              <p className="meaning">{idiom.meaning}</p>
              <p className="example">“{idiom.example}”</p>
            </div>
            <button type="button" className="bookmark-btn active" onClick={() => toggleBookmark(idiom.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
