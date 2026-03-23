import { getBranches, getAllChaptersByBranch } from '../lib/supabase'
import ReaderLayout from '../components/layout/ReaderLayout'
import AdSlot from '../components/ui/AdSlot'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  try {
    const branches = await getBranches()
    const branch = branches.find(b => b.slug === params.branch)
    if (!branch) return {}
    return {
      title: `${branch.name} Short Notes – GATE, ESE, Railway JE | GateShortNotes.in`,
      description: `Free ${branch.name} short notes for GATE, ESE and Railway JE. Key concepts, formulas and PYQs.`,
    }
  } catch {
    return {}
  }
}

function groupBySubject(chapters) {
  return chapters.reduce((acc, ch) => {
    if (!acc[ch.subject_name]) acc[ch.subject_name] = []
    acc[ch.subject_name].push(ch)
    return acc
  }, {})
}

export default async function BranchPage({ params }) {
  let branches = [], allChapters = [], branch = null

  try {
    branches = await getBranches()
    branch = branches.find(b => b.slug === params.branch)
    if (!branch) notFound()
    allChapters = await getAllChaptersByBranch(branch.id)
  } catch (e) {
    console.error('BranchPage error:', e)
    notFound()
  }

  const grouped = groupBySubject(allChapters)

  return (
    <ReaderLayout branch={branch} allChapters={allChapters} currentSlug={null}>
      <div className="max-w-2xl mx-auto px-5 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-5 flex-wrap">
          <Link href="/" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            GateShortNotes.in
          </Link>
          <span>›</span>
          <span className="text-gray-600 dark:text-gray-300 font-semibold">{branch.name}</span>
        </nav>

        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
          {branch.name}
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
          {allChapters.length} chapters · Select a chapter to start reading
        </p>

        <AdSlot type="leaderboard" className="mb-6" />

        {Object.keys(grouped).length === 0 && (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <p className="text-lg font-semibold mb-2">No chapters yet</p>
            <p className="text-sm">Content coming soon!</p>
          </div>
        )}

        {Object.keys(grouped).map(subj => (
          <div key={subj} className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-1">
              {subj}
            </h2>
            <div className="flex flex-col gap-1.5">
              {grouped[subj].map(ch => (
                <Link
                  key={ch.id}
                  href={`/${branch.slug}/${ch.slug}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-0.5 transition-all group"
                >
                  <span className="flex-1 text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {ch.chapter_name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    {ch.gate_important && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                        ★ GATE
                      </span>
                    )}
                    {ch.concepts?.length > 0 && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                        {ch.concepts.length} concepts
                      </span>
                    )}
                    {ch.formulas?.length > 0 && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                        {ch.formulas.length} formulas
                      </span>
                    )}
                    <span className="text-gray-300 dark:text-gray-600 group-hover:text-blue-400 transition text-sm">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ReaderLayout>
  )
}
