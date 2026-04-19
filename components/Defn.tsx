interface DefnProps {
  children: React.ReactNode
}

export default function Defn({ children }: DefnProps) {
  return (
    <div className="bg-bg-card border border-line-soft rounded-[6px] px-[18px] py-[14px] my-[14px]">
      <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-mute mb-[6px]">
        Definition
      </div>
      <div>{children}</div>
    </div>
  )
}
