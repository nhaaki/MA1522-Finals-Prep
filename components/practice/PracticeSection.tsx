'use client'

import { useCallback, useEffect, useState } from 'react'
import { getQuestions, bankSize } from '@/lib/questions'
import { Question, Difficulty } from '@/lib/questions/types'
import QuestionCard from './QuestionCard'

const DIFFICULTIES: { label: string; value: Difficulty | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
]

export default function PracticeSection({ chapterId }: { chapterId: string }) {
  const available = bankSize(chapterId)
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')
  const [seed, setSeed] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    setQuestions(
      getQuestions(chapterId, 3, difficulty === 'all' ? undefined : difficulty)
    )
  }, [chapterId, difficulty, seed])

  const regenerate = useCallback(() => setSeed((s) => s + 1), [])

  if (available === 0) {
    return (
      <section
        id="practice"
        data-section-id="practice"
        className="py-7 pb-10 border-t border-line mt-8"
      >
        <h2 className="font-serif font-normal text-[30px] leading-[1.15] tracking-[-0.01em] m-0 mb-3 text-ink">
          Practice
        </h2>
        <p className="text-ink-soft text-[14.5px]">
          No practice questions are available for this chapter yet.
        </p>
      </section>
    )
  }

  return (
    <section
      id="practice"
      data-section-id="practice"
      className="py-7 pb-10 border-t border-line mt-8"
    >
      <div className="flex items-start gap-4 mb-5 flex-wrap">
        <div className="flex-1 min-w-[220px]">
          <div className="font-mono text-[12px] text-ink-mute tracking-[0.02em] mb-1">
            Practice
          </div>
          <h2 className="font-serif font-normal text-[30px] leading-[1.15] tracking-[-0.01em] m-0 text-ink">
            Test yourself
          </h2>
          <p className="text-ink-soft text-[14px] mt-2 max-w-[520px]">
            Randomized questions drawn from this chapter's bank. Each tags the subsections it
            exercises — click a tag to jump back. Filter by difficulty, then hit New set to
            reshuffle.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[11px] text-ink-mute uppercase tracking-[0.06em]">
            Difficulty
          </span>
          <div className="flex gap-1">
            {DIFFICULTIES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => { setDifficulty(value); setSeed((s) => s + 1) }}
                className={`font-sans text-[12px] px-3 py-1 rounded-full border transition-colors ${
                  difficulty === value
                    ? 'bg-accent text-white border-accent'
                    : 'border-line text-ink-soft hover:border-accent hover:text-accent-ink'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={regenerate}
            className="font-sans text-[13px] px-3 py-1.5 rounded-full border border-line text-ink-soft hover:border-accent hover:text-accent-ink transition-colors"
          >
            New set
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {questions.map((q, i) => (
          <QuestionCard key={`${q.id}-${seed}-${i}`} question={q} index={i} />
        ))}
      </div>
    </section>
  )
}
