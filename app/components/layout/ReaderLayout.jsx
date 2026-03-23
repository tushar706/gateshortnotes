'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import AdSlot from '../ui/AdSlot'

function groupBySubject(chapters) {
  return chapters.reduce((acc, ch) => {
    const key = ch.subject_name
    if (!acc[key]) acc[key] = []
    acc[key].push(ch)
    return acc
  }, {})
}

function NavbarInner({ onMenuClick }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeExam, setActiveExam] = useState('GATE')
  const EXAMS = ['GATE', 'ESE', 'Railway JE', 'SSC JE', 'ISRO', 'BARC']

  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b" style={{ background: '#1e3a8a', borderColor: '#1e3a8a' }}>
      <div className="flex items-center h-12 px-4 gap-3">
        <Link href="/" className="flex flex-col gap-0 shrink-0">
          <span className="text-base font-black tracking-tight leading-none">
            <span style={{ color: '#fff' }}>Gate</span>
            <span style={{ color: '#93c5fd' }}>Short</span>
            <span style={{ color: '#fff' }}>Notes</span>
            <span style={{ color: '#93c5fd' }}>.</span>
            <span style={{ color: '#bfdbfe', fontSize: '11px', fontWeight: 700 }}>in</span>
          </span>
          <span className="text-[10px] hidden sm:block" style={{ color: '#bfdbfe' }}>
            Engineering Notes for <strong style={{ color: '#fff' }}>every competitive exam</strong>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.15)' }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
              <circle cx="5" cy="5" r="3.5"/><path d="M8 8l2.5 2.5"/>
            </svg>
            <input className="bg-transparent outline-none text-xs w-32" style={{ color: '#fff' }} placeholder="Search chapters..."/>
          </div>
          {mounted && (
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}
          {onMenuClick && (
            <button onClick={onMenuClick}
              className="sm:hidden w-8 h-8 rounded-lg flex flex-col items-center justify-center gap-1 p-1"
              style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.15)' }}>
              <span className="block w-4 h-0.5 rounded" style={{ background: '#fff' }}/>
              <span className="block w-4 h-0.5 rounded" style={{ background: '#fff' }}/>
              <span className="block w-4 h-0.5 rounded" style={{ background: '#fff' }}/>
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center h-8 px-3 gap-0.5 overflow-x-auto"
        style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
        {EXAMS.map((exam, i) => (
          <span key={exam} className="flex items-center">
            <button onClick={() => setActiveExam(exam)}
              className="px-3 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition"
              style={{ background: activeExam === exam ? 'rgba(255,255,255,0.2)' : 'transparent', color: activeExam === exam ? '#fff' : 'rgba(255,255,255,0.7)' }}>
              {exam}
            </button>
            {i < EXAMS.length - 1 && <span className="w-px h-3.5 mx-0.5" style={{ background: 'rgba(255,255,255,0.2)' }}/>}
          </span>
        ))}
      </div>
    </header>
  )
}

export default function ReaderLayout({ branch, allChapters, children, currentSlug, toc = [] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openSubjects, setOpenSubjects] = useState({})
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [mounted, setMounted] = useState(false)
  const mainRef = useRef(null)

  const grouped = groupBySubject(allChapters)

  useEffect(() => {
    setMounted(true)
    const initial = {}
    Object.keys(grouped).forEach(subj => {
      const has = grouped[subj].some(ch => ch.slug === currentSlug)
      if (has) initial[subj] = true
    })
    if (!Object.keys(initial).length) {
      Object.keys(grouped).forEach(s => { initial[s] = true })
    }
    setOpenSubjects(initial)
  }, [currentSlug])

  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    const onScroll = () => {
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight)
      setProgress(Math.round(pct * 100))
      if (toc.length) {
        let active = 0
        toc.forEach((item, i) => {
          const sec = document.getElementById(item.id)
          if (sec && sec.offsetTop <= el.scrollTop + 80) active = i
        })
        setActiveSection(active)
      }
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [toc])

  const toggleSubject = (subj) => setOpenSubjects(prev => ({ ...prev, [subj]: !prev[subj] }))

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    const container = mainRef.current
    if (el && container) container.scrollTop = el.offsetTop - 16
  }

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
        <div style={{ height: '82px', background: '#1e3a8a' }} />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-sm text-gray-400">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <NavbarInner onMenuClick={() => setSidebarOpen(true)} />

      <div className="fixed top-0 left-0 w-full h-0.5 z-50 bg-gray-200 dark:bg-gray-800">
        <div className="h-full transition-all duration-100"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#2563eb,#7c3aed)' }} />
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 82px)' }}>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-20 sm:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`
          w-64 shrink-0 flex flex-col border-r border-gray-200 dark:border-gray-800
          bg-white dark:bg-gray-900 overflow-hidden z-30
          fixed sm:relative inset-y-0 left-0 transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
        `} style={{ top: '82px', height: 'calc(100vh - 82px)' }}>

          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">
            <Link href="/"
              className="text-xs font-semibold px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 transition">
              ← Home
            </Link>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate">{branch?.name}</span>
            <button className="sm:hidden ml-auto text-gray-400" onClick={() => setSidebarOpen(false)}>✕</button>
          </div>

          <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
            <input
              className="w-full text-xs border border-gray-200 dark:border-gray-700 rounded-md px-2.5 py-1.5 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none focus:border-blue-400"
              placeholder="Search chapters..."
              onChange={e => {
                const q = e.target.value.toLowerCase()
                document.querySelectorAll('.sidebar-ch-item').forEach(el => {
                  el.style.display = (!q || el.textContent.toLowerCase().includes(q)) ? '' : 'none'
                })
                if (q) setOpenSubjects(Object.fromEntries(Object.keys(grouped).map(s => [s, true])))
              }}
            />
          </div>

          <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
            <AdSlot type="sidebar" />
          </div>

          <nav className="flex-1 overflow-y-auto py-1">
            {Object.keys(grouped).map(subj => (
              <div key={subj}>
                <button onClick={() => toggleSubject(subj)}
                  className="w-full flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <span className={`text-[8px] transition-transform ${openSubjects[subj] ? 'rotate-90' : ''}`}>▶</span>
                  {subj}
                </button>
                {openSubjects[subj] && (
                  <div>
                    {grouped[subj].map(ch => (
                      <Link key={ch.id} href={`/${branch?.slug}/${ch.slug}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`sidebar-ch-item flex items-center gap-1.5 px-3 py-1.5 pl-6 text-[11px] border-l-2 transition ${
                          ch.slug === currentSlug
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}>
                        <span className="flex-1 truncate">{ch.chapter_name}</span>
                        {ch.gate_important && <span className="text-amber-500 text-[10px]">★</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        <main ref={mainRef} className="flex-1 overflow-y-auto min-w-0 flex">
          <div className="flex-1 min-w-0">{children}</div>

          <aside className="hidden xl:flex w-52 shrink-0 flex-col gap-3 px-3 py-4 border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
            {toc.length > 0 && (
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
                <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  On this page
                </div>
                {toc.map((item, i) => (
                  <button key={item.id} onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left block px-3 py-1.5 text-xs border-l-2 transition ${
                      activeSection === i
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
            <AdSlot type="rectangle" />
            <AdSlot type="rectangle" />
          </aside>
        </main>
      </div>
    </div>
  )
}
