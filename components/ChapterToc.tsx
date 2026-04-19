'use client'

import { useEffect, useRef, useState } from 'react'

interface TocItem {
  id: string
  label: string
}

interface ChapterTocProps {
  items: TocItem[]
}

export default function ChapterToc({ items }: ChapterTocProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          const el = visible[0].target as HTMLElement
          const id = el.dataset.sectionId
          if (id) setActive(id)
        }
      },
      { rootMargin: '-100px 0px -55% 0px', threshold: 0 },
    )

    items.forEach(({ id }) => {
      const el = document.querySelector(`[data-section-id="${id}"]`)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [items])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    const y = target.getBoundingClientRect().top + window.scrollY - 72
    window.scrollTo({ top: y, behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
    setActive(id)
  }

  return (
    <aside className="toc">
      <div className="font-mono text-[11px] text-ink-mute tracking-[0.12em] uppercase mb-[14px] pb-[10px] border-b border-line-soft">
        On this page
      </div>
      <ul className="list-none p-0 m-0">
        {items.map(({ id, label }) => {
          const [num, ...rest] = label.split(' ')
          return (
            <li key={id} className="m-0">
              <a
                href={`#${id}`}
                data-section={id}
                onClick={(e) => handleClick(e, id)}
                className={`block py-[7px] px-[10px] pl-3 text-[13px] leading-[1.35] border-l-2 rounded-r-[6px] transition-[color,border-color,background] duration-[120ms] no-underline hover:no-underline hover:text-ink hover:bg-bg-soft ${
                  active === id
                    ? 'active text-accent-ink border-l-accent bg-accent-soft font-medium'
                    : 'text-ink-soft border-l-transparent'
                }`}
              >
                <span className="font-mono text-[11px] text-ink-mute mr-2">{num}</span>
                {rest.join(' ')}
              </a>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
