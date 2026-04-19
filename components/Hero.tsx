'use client'

import { useProgress } from '@/lib/progress'
import { CHAPTERS } from '@/lib/chapters'

export default function Hero() {
  const { overallStats, reset } = useProgress()
  const stats = overallStats(CHAPTERS)

  const handleReset = () => {
    if (confirm('Reset all chapter progress? This clears your "reviewed" marks.')) {
      reset()
    }
  }

  return (
    <section className="py-10 pb-12 border-b border-line-soft mb-12">
      <div className="font-mono text-[12px] text-accent-ink tracking-[0.1em] uppercase mb-[18px]">
        NUS · AY2025/26 · Semester 2
      </div>
      <h1 className="font-serif font-normal text-[clamp(40px,6vw,68px)] leading-[1.02] tracking-[-0.015em] m-0 mb-5">
        Linear Algebra,
        <br />
        <em className="italic text-accent-ink">chapter by chapter.</em>
      </h1>
      <p className="max-w-[620px] text-[17px] text-ink-soft leading-[1.55] m-0">
        A clean, focused companion for revising MA1522 — Linear Algebra for Computing. Work through
        each chapter at your own pace, mark what you&rsquo;ve reviewed, and keep the key
        definitions, theorems, and algorithms at hand.
      </p>

      <div className="mt-7 flex gap-7 flex-wrap text-[13px] text-ink-mute">
        <div className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-accent inline-block" />
          <strong className="text-ink font-medium">7</strong>&nbsp;chapters
        </div>
        <div className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-accent inline-block" />
          <strong className="text-ink font-medium">37</strong>&nbsp;sections
        </div>
        <div className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-accent inline-block" />
          Progress saved locally
        </div>
      </div>

      {/* Progress strip */}
      <div className="mt-6 bg-bg-card border border-line-soft rounded-card px-5 py-4 flex items-center gap-5">
        <div className="text-[13px] text-ink-soft whitespace-nowrap">
          Overall progress ·{' '}
          <strong className="text-ink font-semibold">
            {stats.done} / {stats.total}
          </strong>
        </div>
        <div className="flex-1 h-[6px] bg-bg-soft rounded-full overflow-hidden border border-line-soft">
          <div
            className="progress-bar-fill h-full bg-accent"
            style={{ width: `${stats.pct}%` }}
          />
        </div>
        <div className="font-mono text-[13px] text-ink-soft">
          <strong className="text-ink font-semibold">{stats.pct}%</strong>
        </div>
        <button
          onClick={handleReset}
          className="bg-transparent border border-line text-ink-soft text-[12px] px-[10px] py-1 rounded-[6px] cursor-pointer font-sans hover:bg-bg-soft hover:text-ink"
        >
          Reset
        </button>
      </div>
    </section>
  )
}
