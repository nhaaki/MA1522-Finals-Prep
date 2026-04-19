'use client'

import { useProgress } from '@/lib/progress'

interface SectionProps {
  id: string
  chapterId: string
  meta: string
  title: string
  children: React.ReactNode
}

export default function Section({ id, chapterId, meta, title, children }: SectionProps) {
  const { isDone, toggle } = useProgress()
  const done = isDone(chapterId, id)

  return (
    <section
      className={`py-7 pb-10 border-b border-line-soft last:border-b-0 first:pt-0 section ${done ? 'done' : ''}`}
      id={id}
      data-section-id={id}
    >
      <div className="section-head flex items-start gap-4 mb-[18px]">
        <div className="font-mono text-[12px] text-ink-mute pt-2 tracking-[0.02em] whitespace-nowrap">
          {meta}
        </div>
        <h2 className="font-serif font-normal text-[30px] leading-[1.15] tracking-[-0.01em] m-0 flex-1 text-ink">
          {title}
        </h2>
        <button
          className={`mark-btn appearance-none bg-transparent border border-line text-ink-soft font-sans text-[12px] px-[10px] py-[6px] pl-2 rounded-full cursor-pointer inline-flex items-center gap-[6px] whitespace-nowrap transition-all duration-150 ease-in-out hover:border-accent hover:text-accent-ink ${done ? 'done' : ''}`}
          aria-pressed={done}
          onClick={() => toggle(chapterId, id)}
        >
          <span className={`check w-[14px] h-[14px] rounded-full border-[1.5px] inline-flex items-center justify-center transition-all duration-150 ${done ? 'bg-ok border-ok' : 'border-ink-mute bg-transparent'}`}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-[10px] h-[10px] ${done ? 'opacity-100 text-white' : 'opacity-0'}`}
            >
              <polyline points="4 12 10 18 20 6" />
            </svg>
          </span>
          <span className="label">{done ? 'Reviewed' : 'Mark reviewed'}</span>
        </button>
      </div>
      <div className="section-content text-ink text-[15.5px] leading-[1.7]">{children}</div>
    </section>
  )
}
