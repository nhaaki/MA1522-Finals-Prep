interface CalloutProps {
  tag: string
  variant?: 'default' | 'warn'
  children: React.ReactNode
}

export default function Callout({ tag, variant = 'default', children }: CalloutProps) {
  const isWarn = variant === 'warn'
  return (
    <div
      className={`border-l-[3px] px-[18px] py-[14px] my-[18px] rounded-r-[6px] text-[14.5px] ${
        isWarn
          ? 'bg-[color-mix(in_oklch,oklch(0.55_0.15_50)_10%,oklch(0.99_0.005_85))] border-l-warn'
          : 'bg-accent-soft border-l-accent'
      }`}
    >
      <span
        className={`font-mono text-[11px] tracking-[0.08em] uppercase font-semibold mb-1 block ${
          isWarn ? 'text-warn' : 'text-accent-ink'
        }`}
      >
        {tag}
      </span>
      {children}
    </div>
  )
}
