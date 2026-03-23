import Link from 'next/link'
import { getBranches } from './lib/supabase'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AdSlot from './components/ui/AdSlot'

export const metadata = {
  title: 'GateShortNotes.in – Engineering Notes for GATE, ESE, Railway JE & SSC JE',
  description: 'Free concise short notes for GATE, ESE, Railway JE, SSC JE, ISRO and BARC. Key concepts, formulas and PYQs across all engineering branches.',
}

const BRANCH_STYLES = {
  'computer-science':  { bar: 'from-blue-600 to-purple-600',  icon: '💻', iconBg: 'bg-blue-50 dark:bg-blue-950',    tags: ['DSA','OS','DBMS'],         arrow: 'text-blue-600'   },
  'electronics':       { bar: 'from-amber-500 to-red-500',    icon: '⚡', iconBg: 'bg-amber-50 dark:bg-amber-950',  tags: ['Analog','Digital','Signals'],arrow: 'text-amber-500'  },
  'mechanical':        { bar: 'from-emerald-600 to-cyan-600', icon: '⚙️', iconBg: 'bg-emerald-50 dark:bg-emerald-950',tags:['Thermo','Fluids','SOM'],   arrow: 'text-emerald-600'},
  'civil':             { bar: 'from-violet-600 to-pink-600',  icon: '🏗️', iconBg: 'bg-violet-50 dark:bg-violet-950',tags: ['Structures','Geotech'],    arrow: 'text-violet-600' },
  'engineering-maths': { bar: 'from-red-600 to-orange-500',  icon: '📐', iconBg: 'bg-red-50 dark:bg-red-950',      tags: ['Calculus','Algebra'],       arrow: 'text-red-600'    },
  'electrical':        { bar: 'from-cyan-600 to-indigo-600', icon: '🔋', iconBg: 'bg-cyan-50 dark:bg-cyan-950',    tags: ['Circuits','Machines'],      arrow: 'text-cyan-600'   },
}

const TAG_STYLES = [
  'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
]

export default async function HomePage() {
  let branches = []
  try {
    branches = await getBranches()
  } catch (e) {
    // fallback — show static cards
  }

  // Fallback static branches if DB is empty
  if (!branches.length) {
    branches = [
      { id:1, name:'Computer Science',    slug:'computer-science',  short_code:'CS' },
      { id:2, name:'Electronics',         slug:'electronics',       short_code:'ECE' },
      { id:3, name:'Mechanical',          slug:'mechanical',        short_code:'ME' },
      { id:4, name:'Civil',               slug:'civil',             short_code:'CE' },
      { id:5, name:'Engineering Maths',   slug:'engineering-maths', short_code:'MA' },
      { id:6, name:'Electrical',          slug:'electrical',        short_code:'EE' },
    ]
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="flex-1">
        {/* Top Ad */}
        <div className="max-w-5xl mx-auto px-4 pt-4">
          <AdSlot type="leaderboard" />
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 py-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-4">
            📚 GATE · ESE · Railway JE · SSC JE
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-3 leading-tight">
            The smartest way to revise for<br/>
            <span className="text-blue-600">GATE</span>, <span className="text-purple-600">ESE</span> & all engineering exams
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-6 leading-relaxed">
            Concise short notes with key concepts, formulas, exam tips and previous year questions —
            organized by branch, subject and chapter.
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {[
              { num: '200+', label: 'Chapters',  color: 'text-blue-600'   },
              { num: '500+', label: 'Formulas',  color: 'text-purple-600' },
              { num: '300+', label: 'PYQs',      color: 'text-cyan-600'   },
              { num: '6',    label: 'Branches',  color: 'text-emerald-600'},
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className={`text-xl font-black ${s.color}`}>{s.num}</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Branch Grid */}
        <section className="max-w-5xl mx-auto px-4 pb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Select Branch
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {branches.map(branch => {
              const style = BRANCH_STYLES[branch.slug] || BRANCH_STYLES['computer-science']
              return (
                <Link
                  key={branch.id}
                  href={`/${branch.slug}`}
                  className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:-translate-y-0.5 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-150"
                >
                  <div className={`h-1 bg-gradient-to-r ${style.bar}`} />
                  <div className="p-4">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`w-8 h-8 rounded-lg ${style.iconBg} flex items-center justify-center text-base shrink-0`}>
                        {style.icon}
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{branch.name}</span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2.5">
                      {branch.short_code} · Tap to explore all subjects
                    </p>
                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      {(style.tags || []).map((tag, i) => (
                        <span key={tag} className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${TAG_STYLES[i % 3]}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-xs text-gray-400 dark:text-gray-500">Open notes</span>
                      <span className={`text-xs font-bold ${style.arrow}`}>→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Bottom Ad */}
        <div className="max-w-5xl mx-auto px-4 pb-6">
          <AdSlot type="leaderboard" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
