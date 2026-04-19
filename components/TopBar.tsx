import Link from 'next/link'

interface TopBarProps {
  showChaptersLink?: boolean
}

export default function TopBar({ showChaptersLink = false }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link
          href="/"
          className="flex items-center gap-[10px] font-serif text-[22px] text-ink tracking-[-0.01em] no-underline hover:no-underline"
        >
          <span
            className="w-7 h-7 rounded-[6px] bg-accent text-white inline-flex items-center justify-center font-mono text-[13px] font-semibold"
          >
            λ
          </span>
          MA1522
          <span className="brand-sub-hide font-sans text-[12px] text-ink-mute tracking-[0.04em] uppercase ml-2 pl-3 border-l border-line">
            Revision Hub
          </span>
        </Link>
        <div className="flex-1" />
        {showChaptersLink ? (
          <Link
            href="/"
            className="text-[13px] text-ink-soft px-[10px] py-[6px] rounded-[6px] hover:bg-bg-soft hover:text-ink no-underline hover:no-underline"
          >
            All chapters
          </Link>
        ) : (
          <>
            <a
              href="#chapters"
              className="text-[13px] text-ink-soft px-[10px] py-[6px] rounded-[6px] hover:bg-bg-soft hover:text-ink no-underline hover:no-underline"
            >
              Chapters
            </a>
          </>
        )}
      </div>
    </header>
  )
}
