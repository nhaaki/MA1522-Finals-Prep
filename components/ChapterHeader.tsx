import Link from 'next/link'
import { CHAPTERS } from '@/lib/chapters'

interface ChapterHeaderProps {
  slug: string
}

export default function ChapterHeader({ slug }: ChapterHeaderProps) {
  const idx = CHAPTERS.findIndex((c) => c.slug === slug)
  const chapter = CHAPTERS[idx]
  if (!chapter) return null

  const prev = idx > 0 ? CHAPTERS[idx - 1] : null
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null

  return (
    <div className="pt-3 pb-9 border-b border-line-soft mb-11">
      <div className="font-mono text-[12px] text-ink-mute mb-5 tracking-[0.02em]">
        <Link href="/" className="text-ink-mute hover:text-accent no-underline hover:no-underline">
          Home
        </Link>
        <span className="mx-[10px] text-line">/</span>
        Chapter {chapter.num}
      </div>
      <div className="font-mono text-[12px] tracking-[0.1em] uppercase text-accent-ink mb-[14px]">
        Chapter {String(chapter.num).padStart(2, '0')} · {chapter.sections} sections
      </div>
      <h1 className="font-serif font-normal text-[clamp(36px,5vw,52px)] leading-[1.05] tracking-[-0.015em] m-0 mb-4">
        {chapter.title}
      </h1>
      <p className="max-w-[640px] text-[16.5px] text-ink-soft leading-[1.6] m-0 mb-6">
        {chapter.blurb}
      </p>
      <nav className="flex items-center gap-4 text-[13px] text-ink-soft">
        {prev ? (
          <Link
            href={`/chapters/${prev.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-[6px] text-ink-soft hover:border-accent hover:text-accent-ink no-underline hover:no-underline"
          >
            ← Chapter {prev.num} · {prev.title}
          </Link>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-[6px] text-ink-soft hover:border-accent hover:text-accent-ink no-underline hover:no-underline"
          >
            ← Home
          </Link>
        )}
        <div className="flex-1" />
        {next && (
          <Link
            href={`/chapters/${next.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-[6px] text-ink-soft hover:border-accent hover:text-accent-ink no-underline hover:no-underline"
          >
            Chapter {next.num} · {next.title} →
          </Link>
        )}
      </nav>
    </div>
  )
}
