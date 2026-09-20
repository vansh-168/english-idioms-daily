import { useEffect, useState } from 'react'
import { wordList } from '../data/wordOfDay'
import { dayOfYear } from '../utils/date'
import { useDate } from '../context/DateContext'
import type { WordEntry } from '../types'

type FetchStatus = 'loading' | 'live' | 'fallback'

type DictionaryApiResponse = Array<{
  phonetic?: string
  meanings: Array<{
    partOfSpeech: string
    definitions: Array<{ definition: string; example?: string }>
  }>
}>

export function WordOfDay() {
  const { viewedDate, offsetDays } = useDate()
  const fallback = wordList[dayOfYear(viewedDate) % wordList.length]
  const [entry, setEntry] = useState<WordEntry>(fallback)
  const [status, setStatus] = useState<FetchStatus>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    async function loadWord() {
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${fallback.word}`)
        if (!response.ok) throw new Error('Word not found')

        const data = (await response.json()) as DictionaryApiResponse
        const meaning = data[0]?.meanings[0]
        const definitionEntry = meaning?.definitions[0]
        if (!definitionEntry) throw new Error('No definition available')

        if (!cancelled) {
          setEntry({
            word: fallback.word,
            phonetic: data[0]?.phonetic || fallback.phonetic,
            partOfSpeech: meaning?.partOfSpeech || fallback.partOfSpeech,
            definition: definitionEntry.definition,
            example: definitionEntry.example || fallback.example,
          })
          setStatus('live')
        }
      } catch {
        if (!cancelled) {
          setEntry(fallback)
          setStatus('fallback')
        }
      }
    }

    loadWord()

    return () => {
      cancelled = true
    }
  }, [fallback])

  return (
    <section className="card word-of-day">
      <p className="eyebrow">{offsetDays === 0 ? 'Word of the Day' : 'Word for this day'}</p>
      <h2>
        {entry.word}
        {entry.phonetic ? <span className="phonetic"> {entry.phonetic}</span> : null}
      </h2>
      {entry.partOfSpeech ? <p className="part-of-speech">{entry.partOfSpeech}</p> : null}
      <p className="meaning">{entry.definition}</p>
      <p className="example">“{entry.example}”</p>
      <p className="source-note">
        {status === 'loading' && 'Looking up the latest definition…'}
        {status === 'live' && 'Live definition from the Free Dictionary API'}
        {status === 'fallback' && 'Showing curated definition (API unavailable)'}
      </p>
    </section>
  )
}
