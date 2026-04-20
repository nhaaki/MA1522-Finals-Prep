'use client'

import { TypedQuestion } from '@/lib/questions/types'

const hint: Record<TypedQuestion['inputKind'], string> = {
  number: 'Enter a number (e.g. 3/2 or -4).',
  fraction: 'Enter as a/b.',
  vector: 'Enter as (a, b, c).',
  matrix: 'Enter as a,b;c,d with rows separated by ;.',
  expression: 'Enter your answer.',
}

type Props = {
  question: TypedQuestion
  value: string
  onChange: (v: string) => void
  submitted: boolean
  status: 'unanswered' | 'correct' | 'incorrect'
}

export default function TypedInput({ question, value, onChange, submitted, status }: Props) {
  const border =
    status === 'correct'
      ? 'border-ok'
      : status === 'incorrect'
      ? 'border-warn'
      : 'border-line focus:border-accent'
  return (
    <div className="flex flex-col gap-1">
      <input
        type="text"
        className={`font-mono text-[14px] px-3 py-2 rounded-sm border ${border} bg-bg-card outline-none transition-colors`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={submitted}
        placeholder={hint[question.inputKind]}
        aria-label="Your answer"
      />
      <span className="font-mono text-[11px] text-ink-mute">{hint[question.inputKind]}</span>
    </div>
  )
}
