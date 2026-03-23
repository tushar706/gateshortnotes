'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

const EXAMS = ['GATE', 'ESE', 'Railway JE', 'SSC JE', 'ISRO', 'BARC']

export default function Navbar({ onMenuClick }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeExam, setActiveExam] = useState('GATE')

  // Only render theme toggle after mount to avoid hydration mismatch
  useEffect(() => { setMounted(true) }, [])

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b" style={{ background: '#1e3a8a', borderColor: '#1e3a8a' }}>
      {/* Row 1 */}
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
          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.15)' }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
              <circle cx="5" cy="5" r="3.5"/><path d="M8 8l2.5 2.5"/>
            </svg>
            <input
              className="bg-transparent outline-none text-xs w-32"
              style={{ color: '#fff' }}
              placeholder="Search chapters..."
            />
          </div>

          {/* Theme toggle — only after mount */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition"
              style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.15)', color: '#fff' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}

          {/* Hamburger (mobile only) */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="sm:hidden w-8 h-8 rounded-lg flex flex-col items-center justify-center gap-1 p-1"
              style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.15)' }}
              aria-label="Open menu"
            >
              <span className="block w-4 h-0.5 rounded" style={{ background: '#fff' }}/>
              <span className="block w-4 h-0.5 rounded" style={{ background: '#fff' }}/>
              <span className="block w-4 h-0.5 rounded" style={{ background: '#fff' }}/>
            </button>
          )}
        </div>
      </div>

      {/* Row 2 — exam tabs */}
      <div className="flex items-center h-8 px-3 gap-0.5 overflow-x-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
        {EXAMS.map((exam, i) => (
          <span key={exam} className="flex items-center">
            <button
              onClick={() => setActiveExam(exam)}
              className="px-3 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition"
              style={{
                background: activeExam === exam ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: activeExam === exam ? '#fff' : 'rgba(255,255,255,0.7)',
              }}
            >
              {exam}
            </button>
            {i < EXAMS.length - 1 && (
              <span className="w-px h-3.5 mx-0.5" style={{ background: 'rgba(255,255,255,0.2)' }}/>
            )}
          </span>
        ))}
      </div>
    </header>
  )
}
