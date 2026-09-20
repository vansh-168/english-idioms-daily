import { useState } from 'react'
import { idioms } from '../data/idioms'
import { generateQuiz, type QuizQuestion } from '../utils/quiz'

export function Quiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => generateQuiz(idioms))
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const finished = index >= questions.length

  const restart = () => {
    setQuestions(generateQuiz(idioms))
    setIndex(0)
    setSelected(null)
    setScore(0)
  }

  if (finished) {
    return (
      <section className="card quiz-result">
        <p className="eyebrow">Quiz complete</p>
        <h2>
          You scored {score} / {questions.length}
        </h2>
        <button type="button" onClick={restart}>
          Play again
        </button>
      </section>
    )
  }

  const question = questions[index]

  const selectAnswer = (option: string) => {
    if (selected) return
    setSelected(option)
    if (option === question.correctAnswer) setScore((s) => s + 1)
  }

  const next = () => {
    setSelected(null)
    setIndex((i) => i + 1)
  }

  return (
    <section className="card quiz">
      <p className="eyebrow">
        Question {index + 1} of {questions.length} · Score {score}
      </p>
      <h2>What does “{question.phrase}” mean?</h2>
      <div className="quiz-options">
        {question.options.map((option) => {
          const isCorrect = option === question.correctAnswer
          const isSelected = option === selected
          const answered = selected !== null

          let className = 'quiz-option'
          if (answered && isCorrect) className += ' correct'
          else if (answered && isSelected) className += ' incorrect'

          return (
            <button
              key={option}
              type="button"
              className={className}
              onClick={() => selectAnswer(option)}
              disabled={answered}
            >
              {option}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <button type="button" className="next-btn" onClick={next}>
          {index + 1 === questions.length ? 'See results' : 'Next question'}
        </button>
      )}
    </section>
  )
}
