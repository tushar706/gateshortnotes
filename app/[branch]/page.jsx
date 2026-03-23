import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getBranches, getAllChaptersByBranch, getNoteBySlug, getPrevNextChapters } from '../../lib/supabase'
import ReaderLayout from '../../components/layout/ReaderLayout'
import { FormulaRow } from '../../components/sections/FormulaRenderer'
import AdSlot from '../../components/ui/AdSlot'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }) {
  try {
    const note = await getNoteBySlug(params.chapter)
    if (!note) return {}
    return {
      title: note.meta_title || `${note.chapter_name} – Short Notes | GateShortNotes.in`,
      description: note.meta_description || `${note.chapter_name} short notes for GATE with key concepts, formulas and PYQs.`,
    }
  } catch { return {} }
}

function buildToc(note) {
  const toc = []
  if (note.rich_content)          toc.push({ id: 'sec-overview',  label: 'Overview' })
  if (note.concepts?.length)      toc.push({ id: 'sec-concepts',  label: 'Key Concepts' })
  if (note.formulas?.length)      toc.push({ id: 'sec-formulas',  label: 'Formulas' })
  if (note.gate_tips?.length)     toc.push({ id: 'sec-tips',      label: 'GATE Tips' })
  if (note.pyq_reference?.length) toc.push({ id: 'sec-pyq',       label: 'PYQ Reference' })
  return toc
}

function SectionHeader({ color, label }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className={`w-0.5 h-4 rounded-full ${color} shrink-0`} />
      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">{label}</h2>
    </div>
  )
}

export default async function ChapterPage({ params }) {
  let note = null, allChapters = [], prevNext = { prev: null, next: null }, branch = null

  try {
    note = await getNoteBySlug(params.chapter)
    if (!note) notFound()
    const branches = await getBranches()
    branch = branches.find(b => b.slug === params.branch) || { slug: params.branch, name: note.branch_name, id: note.branch_id }
    allChapters = await getAllChaptersByBranch(note.branch_id)
    prevNext    = await getPrevNextChapters(note.subject_id, note.id)
  } catch (e) {
    console.error('ChapterPage error:', e)
    notFound()
  }

  const toc = buildToc(note)

  return (
    <ReaderLayout branch={branch} allChapters={allChapters} currentSlug={note.slug} toc={toc}>
      <article className="max-w-2xl mx-auto px-5 py-6">

        <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-5 flex-wrap">
          <Link href="/" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">GateShortNotes.in</Link>
          <span>›</span>
          <Link href={`/${params.branch}`} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">{note.branch_name}</Link>
          <span>›</span>
          <span className="text-gray-500 dark:text-gray-400">{note.subject_name}</span>
          <span>›</span>
          <span className="text-gray-700 dark:text-gray-300 font-semibold truncate max-w-[160px]">{note.chapter_name}</span>
        </nav>

        {note.cover_image_url && (
          <div className="relative w-full h-40 rounded-xl overflow-hidden mb-5 border border-gray-200 dark:border-gray-800">
            <Image src={note.cover_image_url} alt={note.chapter_name} fill className="object-cover" />
          </div>
        )}

        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-tight">
          {note.chapter_name}
        </h1>
        <div className="flex flex-wrap gap-2 mb-3">
          {note.gate_important && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">★ GATE Important</span>
          )}
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">{note.subject_name}</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{note.branch_name}</span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          {note.branch_name} · {note.subject_name} · Updated {new Date(note.updated_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </p>

        {note.rich_content && (
          <section id="sec-overview" className="mb-6">
            <SectionHeader color="bg-indigo-500" label="Overview" />
            <div className="note-prose" dangerouslySetInnerHTML={{ __html: note.rich_content }} />
          </section>
        )}

        {note.concepts?.length > 0 && (
          <section id="sec-concepts" className="mb-6">
            <SectionHeader color="bg-blue-500" label="Key Concepts" />
            <div className="flex flex-col">
              {note.concepts.map((c, i) => (
                <div key={i} className="flex gap-2.5 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {note.formulas?.length > 0 && (
          <section id="sec-formulas" className="mb-6">
            <SectionHeader color="bg-purple-500" label="Formulas" />
            {note.formulas.map((f, i) => (
              <FormulaRow key={i} label={f.label} expression={f.expression} />
            ))}
          </section>
        )}

        {note.gate_tips?.length > 0 && (
          <section id="sec-tips" className="mb-6">
            <SectionHeader color="bg-amber-500" label="GATE Tips" />
            <div className="flex flex-col">
              {note.gate_tips.map((t, i) => (
                <div key={i} className="flex gap-2.5 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {note.pyq_reference?.length > 0 && (
          <section id="sec-pyq" className="mb-6">
            <SectionHeader color="bg-red-500" label="PYQ Reference" />
            <div className="flex flex-col gap-2">
              {note.pyq_reference.map((p, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 items-start">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 shrink-0">{p.year}</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{p.question}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {note.content_images?.length > 0 && (
          <section className="mb-6">
            <SectionHeader color="bg-teal-500" label="Diagrams & Images" />
            <div className="flex flex-col gap-3">
              {note.content_images.map((img, i) => (
                <figure key={i} className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                  <img src={img.url} alt={img.caption || `Figure ${i + 1}`} className="w-full" />
                  {img.caption && (
                    <figcaption className="text-xs text-center text-gray-400 dark:text-gray-500 px-3 py-2 bg-gray-50 dark:bg-gray-900">{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {note.author_name && (
          <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mb-5">
            {note.author_photo_url ? (
              <Image src={note.author_photo_url} alt={note.author_name} width={36} height={36} className="rounded-full object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 shrink-0">
                {note.author_name[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{note.author_name}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Content Author</p>
            </div>
          </div>
        )}

        <AdSlot type="leaderboard" className="mb-5" />

        <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          {prevNext.prev ? (
            <Link href={`/${params.branch}/${prevNext.prev.slug}`}
              className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition group">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 group-hover:text-blue-500">← Previous</p>
              <p className="text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{prevNext.prev.chapter_name}</p>
            </Link>
          ) : <div className="flex-1" />}
          {prevNext.next && (
            <Link href={`/${params.branch}/${prevNext.next.slug}`}
              className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition text-right group">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1 group-hover:text-blue-500">Next →</p>
              <p className="text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{prevNext.next.chapter_name}</p>
            </Link>
          )}
        </div>
      </article>
    </ReaderLayout>
  )
}
