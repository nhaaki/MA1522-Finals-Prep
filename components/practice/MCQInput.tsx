'use client'

import MathText from './MathText'
import { MCQQuestion } from '@/lib/questions/types'

type Props = {
  question: MCQQuestion
  selected: number | null
  onSelect: (i: number) => void
  submitted: boolean
  name: string
}

export default function MCQInput({ question, selected, onSelect, submitted, name }: Props) {
  return (
    <ul className="list-none m-0 p-0 flex flex-col gap-2">
      {question.options.map((opt, i) => {
        const isSelected = selected === i
        const isAnswer = i === question.answerIndex
        let state = 'default'
        if (submitted) {
          if (isAnswer) state = 'correct'
          else if (isSelected) state = 'wrong'
        } else if (isSelected) state = 'selected'

        const base =
          'flex items-start gap-3 px-3 py-2 rounded-sm border cursor-pointer transition-colors'
        const byState: Record<string, string> = {
          default: 'border-line hover:border-accent hover:bg-accent-soft',
          selected: 'border-accent bg-accent-soft',
          correct: 'border-ok bg-ok/10 text-ink',
          wrong: 'border-warn bg-warn/10 text-ink',
        }
        return (
          <li key={i}>
            <label className={`${base} ${byState[state]} ${submitted ? 'cursor-default' : ''}`}>
              <input
                type="radio"
                name={name}
                className="mt-1 accent-[oklch(0.45_0.14_260)]"
                checked={isSelected}
                disabled={submitted}
                onChange={() => onSelect(i)}
              />
              <MathText text={opt} className="flex-1 text-[14.5px] leading-[1.6]" />
            </label>
          </li>
        )
      })}
    </ul>
  )
}
