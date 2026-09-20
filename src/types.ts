export type Idiom = {
  id: string
  phrase: string
  meaning: string
  example: string
}

export type WordEntry = {
  word: string
  phonetic?: string
  partOfSpeech?: string
  definition: string
  example: string
}

export type Tab = 'daily' | 'word' | 'flashcards' | 'quiz' | 'bookmarks'
