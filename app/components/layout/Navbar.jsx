'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

const EXAMS = ['GATE', 'ESE', 'Railway JE', 'SSC JE', 'ISRO', 'BARC']

export default function Navbar({ onMenuClick }) {
  const { theme, setTheme } = useTheme()
  const [activeExam, setActiveExam] = useState('GATE')

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b bg-brand-navy border-brand-navy">
      {/* Row 1 */}
      <div className="flex items-center h-12 px-4 gap-3">
        <Link href="/" className="flex flex-col gap-0 shrink-0">
          <span className="text-base font-black tracking-tight leading-none">
            <span className="text-white">Gate</span>
            <span className="text-blue-300">Short</span>
            <span className="text-white">Notes</span>
            <span className="text-blue-300">.</span>
            <span className="text-blue-200 text-xs font-bold">in</span>
          </span>
          <span className="text-[10px] text-blue-200 hidden sm:block">
            Engineering Notes for <strong className="text-white">every competitive exam</strong>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/25 bg-white/15">
            <svg className="w-3 h-3 text-white/70" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
              <circle cx="5" cy="5" r="3.5"/><path d="M8 8l2.5 2.5"/>
            </svg>
            <input
              className="bg-transparent outline-none text-xs text-white placeholder-white/60 w-32"
              placeholder="Search chapters..."
            />
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-8 h-8 rounded-lg border border-white/30 bg-white/15 flex items-center justify-content-center text-sm text-white hover:bg-white/25 transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Hamburger (mobile only) */}
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="sm:hidden w-8 h-8 rounded-lg border border-white/30 bg-white/15 flex flex-col items-center justify-center gap-1 p-1"
              aria-label="Open menu"
            >
              <span className="block w-4 h-0.5 bg-white rounded"/>
              <span className="block w-4 h-0.5 bg-white rounded"/>
              <span className="block w-4 h-0.5 bg-white rounded"/>
            </button>
          )}
        </div>
      </div>

      {/* Row 2 — exam tabs */}
      <div className="flex items-center h-8 px-3 gap-0.5 border-t border-white/15 overflow-x-auto scrollbar-none">
        {EXAMS.map((exam, i) => (
          <span key={exam} className="flex items-center">
            <button
              onClick={() => setActiveExam(exam)}
              className={`px-3 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition ${
                activeExam === exam
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/15 hover:text-white'
              }`}
            >
              {exam}
            </button>
            {i < EXAMS.length - 1 && <span className="w-px h-3.5 bg-white/20 mx-0.5"/>}
          </span>
        ))}
      </div>
    </header>
  )
}
