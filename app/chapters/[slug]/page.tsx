import { notFound } from 'next/navigation'
import TopBar from '@/components/TopBar'
import ChapterHeader from '@/components/ChapterHeader'
import ChapterToc from '@/components/ChapterToc'
import ChapterFooter from '@/components/ChapterFooter'
import { getChapter, CHAPTERS } from '@/lib/chapters'

type Props = {
  params: Promise<{ slug: string }>
}

const chapterImports: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  '1': () => import('@/content/chapters/1-linear-systems.mdx'),
  '2': () => import('@/content/chapters/2-matrices.mdx'),
  '3': () => import('@/content/chapters/3-vector-spaces.mdx'),
  '4': () => import('@/content/chapters/4-rank.mdx'),
  '5': () => import('@/content/chapters/5-orthogonality.mdx'),
  '6': () => import('@/content/chapters/6-eigenvalues.mdx'),
  '7': () => import('@/content/chapters/7-linear-transformations.mdx'),
}

export async function generateStaticParams() {
  return CHAPTERS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const chapter = getChapter(slug)
  if (!chapter) return {}
  return {
    title: `Chapter ${chapter.num} — ${chapter.title} · MA1522`,
    description: chapter.blurb,
  }
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params
  const chapter = getChapter(slug)
  if (!chapter) notFound()

  const loader = chapterImports[slug]
  if (!loader) notFound()

  const { default: MDXContent } = await loader()

  return (
    <>
      <TopBar showChaptersLink />
      <main className="page max-w-site mx-auto px-7 pt-10 pb-[120px]">
        <ChapterHeader slug={slug} />
        <div className="chapter-body">
          <ChapterToc items={chapter.toc} />
          <div className="sections max-w-read">
            <MDXContent />
          </div>
        </div>
        <ChapterFooter slug={slug} />
      </main>
    </>
  )
}
