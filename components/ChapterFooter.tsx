import Link from 'next/link'
import { CHAPTERS } from '@/lib/chapters'

interface ChapterFooterProps {
  slug: string
}

export default function ChapterFooter({ slug }: ChapterFooterProps) {
  const idx = CHAPTERS.findIndex((c) => c.slug === slug)
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null

  return (
    <nav className="chapter-foot mt-14 pt-7 border-t border-line-soft grid grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/chapters/${prev.slug}`}
          className="block px-[22px] py-[18px] border border-line-soft rounded-card text-inherit bg-bg-card no-underline hover:no-underline hover:border-accent transition-[border-color] duration-150"
        >
          <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-mute mb-1">
            ← Previous
          </div>
          <div className="font-serif text-[20px] tracking-[-0.01em] text-ink">{prev.title}</div>
        </Link>
      ) : (
        <div className="opacity-40 px-[22px] py-[18px] border border-line-soft rounded-card bg-bg-card">
          <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-mute mb-1">
            ← Previous
          </div>
          <div className="font-serif text-[20px] tracking-[-0.01em] text-ink">—</div>
        </div>
      )}
      {next ? (
        <Link
          href={`/chapters/${next.slug}`}
          className="block px-[22px] py-[18px] border border-line-soft rounded-card text-inherit bg-bg-card text-right no-underline hover:no-underline hover:border-accent transition-[border-color] duration-150"
        >
          <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-mute mb-1">
            Next →
          </div>
          <div className="font-serif text-[20px] tracking-[-0.01em] text-ink">{next.title}</div>
        </Link>
      ) : (
        <div className="opacity-40 px-[22px] py-[18px] border border-line-soft rounded-card bg-bg-card text-right">
          <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-mute mb-1">
            Next →
          </div>
          <div className="font-serif text-[20px] tracking-[-0.01em] text-ink">—</div>
        </div>
      )}
    </nav>
  )
}
