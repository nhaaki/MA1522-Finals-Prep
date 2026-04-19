'use client'

import Link from 'next/link'
import { useProgress } from '@/lib/progress'
import type { ChapterMeta } from '@/lib/chapters'

interface ChapterCardProps {
  chapter: ChapterMeta
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
  const { chapterStats } = useProgress()
  const stats = chapterStats(chapter.id, chapter.sections)

  return (
    <Link
      href={`/chapters/${chapter.slug}`}
      className="block bg-bg-card border border-line-soft rounded-card p-6 text-inherit relative transition-[border-color,transform,box-shadow] duration-150 ease-in-out hover:no-underline hover:border-accent hover:-translate-y-px hover:shadow-[0_8px_24px_-12px_oklch(0.4_0.1_260/0.18)] group"
    >
      <div className="font-mono text-[11px] text-ink-mute tracking-[0.12em] uppercase mb-[10px] flex items-center justify-between">
        <span>CHAPTER {String(chapter.num).padStart(2, '0')}</span>
        <span className="px-2 py-[2px] bg-bg-soft rounded-full text-[10px] text-ink-soft">
          {chapter.sections} sections
        </span>
      </div>
      <h3 className="font-serif font-normal text-[26px] leading-[1.15] tracking-[-0.01em] m-0 mb-[10px] text-ink">
        {chapter.title}
      </h3>
      <p className="text-[13.5px] text-ink-soft leading-[1.55] m-0 mb-4">{chapter.blurb}</p>
      <div className="flex items-center gap-[10px] pt-[14px] border-t border-line-soft">
        <div className="flex-1 h-1 bg-bg-soft rounded-full overflow-hidden">
          <div
            className="mini-bar-fill h-full bg-accent"
            style={{ width: `${stats.pct}%` }}
          />
        </div>
        <div className="font-mono text-[11px] text-ink-mute whitespace-nowrap">
          {stats.done} / {stats.total} · {stats.pct}%
        </div>
      </div>
    </Link>
  )
}
