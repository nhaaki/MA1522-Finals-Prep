interface ExampleProps {
  title?: string
  children: React.ReactNode
}

export default function Example({ title, children }: ExampleProps) {
  return (
    <div className="bg-bg-card border border-line-soft border-l-[3px] border-l-accent px-5 py-4 pb-[18px] my-[18px] rounded-r-[6px]">
      <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-accent-ink font-semibold mb-[6px] block">
        Example
      </span>
      {title && (
        <div className="font-serif text-[18px] italic text-ink mb-[10px] leading-[1.3]">
          {title}
        </div>
      )}
      <div className="[&_.math-display:last-child]:mb-0 [&_p:last-child]:mb-0">{children}</div>
    </div>
  )
}
