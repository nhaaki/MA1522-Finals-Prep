'use client'

import { useState } from 'react'
import { Question } from '@/lib/questions/types'
import MathText from './MathText'
import MCQInput from './MCQInput'
import TypedInput from './TypedInput'
import ResultBadge from './ResultBadge'
import { getChapter } from '@/lib/chapters'

const diffClass: Record<string, string> = {
  easy: 'bg-ok/10 text-[oklch(0.40_0.13_155)] border-ok/40',
  medium: 'bg-accent-soft text-accent-ink border-accent/40',
  hard: 'bg-warn/10 text-[oklch(0.45_0.15_50)] border-warn/40',
}

function conceptLabel(chapterId: string, conceptId: string): string {
  const num = chapterId.replace('ch', '')
  const chapter = getChapter(num)
  if (!chapter) return conceptId
  const entry = chapter.toc.find((t) => t.id === conceptId)
  return entry ? entry.label.replace(/^[0-9]+\.[0-9]+\s*/, '') : conceptId
}

export default function QuestionCard({ question, index }: { question: Question; index: number }) {
  const [mcqSelected, setMcqSelected] = useState<number | null>(null)
  const [typedValue, setTypedValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState<boolean | null>(null)
  const [shake, setShake] = useState(false)

  const onSubmit = () => {
    let ok = false
    if (question.format === 'mcq') {
      if (mcqSelected === null) return
      ok = mcqSelected === question.answerIndex
    } else {
      if (typedValue.trim() === '') return
      ok = question.verify(typedValue)
    }
    setCorrect(ok)
    setSubmitted(true)
    if (!ok) {
      setShake(true)
      setTimeout(() => setShake(false), 450)
    }
  }

  const canSubmit =
    !submitted && (question.format === 'mcq' ? mcqSelected !== null : typedValue.trim() !== '')

  return (
    <div
      className={`practice-card ${shake ? 'practice-shake' : ''} bg-bg-card border border-line rounded-card px-5 py-4 flex flex-col gap-3`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] text-ink-mute">Q{index + 1}</span>
        <span
          className={`font-mono text-[10.5px] uppercase tracking-[0.08em] px-2 py-[2px] rounded-full border ${diffClass[question.difficulty]}`}
        >
          {question.difficulty}
        </span>
        {question.origin && (
          <span className="font-mono text-[11px] text-ink-mute px-2 py-[2px] rounded-full bg-bg-soft border border-line-soft">
            {question.origin}
          </span>
        )}
        <span className="flex flex-wrap gap-1 ml-auto">
          {question.concepts.map((c) => (
            <a
              key={c}
              href={`#${c}`}
              className="font-mono text-[11px] px-2 py-[2px] rounded-full bg-accent-soft text-accent-ink hover:bg-accent hover:text-white transition-colors"
              title={conceptLabel(question.chapterId, c)}
            >
              §{c.replace(/^s/, '')}
            </a>
          ))}
        </span>
      </div>

      <div className="prompt text-[15px] text-ink leading-[1.7]">
        <MathText text={question.prompt} />
      </div>

      {question.format === 'mcq' ? (
        <MCQInput
          question={question}
          selected={mcqSelected}
          onSelect={setMcqSelected}
          submitted={submitted}
          name={`q-${question.id}-${index}`}
        />
      ) : (
        <TypedInput
          question={question}
          value={typedValue}
          onChange={setTypedValue}
          submitted={submitted}
          status={!submitted ? 'unanswered' : correct ? 'correct' : 'incorrect'}
        />
      )}

      <div className="flex items-center gap-3 mt-1">
        {!submitted ? (
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="font-sans text-[13px] px-4 py-2 rounded-full bg-accent text-white border border-accent hover:bg-accent-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        ) : (
          <>
            <ResultBadge status={correct ? 'correct' : 'incorrect'} />
            <span className={`font-sans text-[13px] font-medium ${correct ? 'text-[oklch(0.40_0.13_155)]' : 'text-[oklch(0.45_0.15_50)]'}`}>
              {correct ? 'Correct' : 'Not quite'}
            </span>
          </>
        )}
      </div>

      {submitted && (
        <div className="mt-1 border-t border-line-soft pt-3 flex flex-col gap-1 text-[14px]">
          {question.format === 'typed' && (
            <div>
              <span className="font-mono text-[11px] text-ink-mute uppercase tracking-[0.06em] mr-2">Answer</span>
              <span className="font-mono text-ink">{question.canonicalAnswer}</span>
            </div>
          )}
          {question.explanation && (
            <div className="text-ink-soft leading-[1.6]">
              <MathText text={question.explanation} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
