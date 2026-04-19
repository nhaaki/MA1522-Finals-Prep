import TopBar from '@/components/TopBar'
import Hero from '@/components/Hero'
import ChapterCard from '@/components/ChapterCard'
import { CHAPTERS } from '@/lib/chapters'

export default function Home() {
  return (
    <>
      <TopBar />
      <main className="page max-w-site mx-auto px-7 pt-10 pb-[120px]">
        <Hero />
        <section id="chapters">
          <h2 className="font-serif font-normal text-[28px] tracking-[-0.01em] m-0 mb-[6px]">
            Chapters
          </h2>
          <p className="text-ink-mute text-[14px] mb-[26px]">
            Every chapter is its own page, with all sections, definitions, and theorems laid out
            cleanly.
          </p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[18px]">
            {CHAPTERS.map((ch) => (
              <ChapterCard key={ch.id} chapter={ch} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
