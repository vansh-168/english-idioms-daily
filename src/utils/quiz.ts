import type { Idiom } from '../types'

export type QuizQuestion = {
  idiomId: string
  phrase: string
  options: string[]
  correctAnswer: string
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function generateQuiz(idioms: Idiom[], count = 8): QuizQuestion[] {
  const chosen = shuffle(idioms).slice(0, Math.min(count, idioms.length))

  return chosen.map((idiom) => {
    const distractors = shuffle(idioms.filter((candidate) => candidate.id !== idiom.id))
      .slice(0, 3)
      .map((candidate) => candidate.meaning)

    return {
      idiomId: idiom.id,
      phrase: idiom.phrase,
      options: shuffle([idiom.meaning, ...distractors]),
      correctAnswer: idiom.meaning,
    }
  })
}
