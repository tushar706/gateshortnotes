'use client'
import { useEffect, useRef } from 'react'
import katex from 'katex'

export function KaTeXFormula({ expression, display = false }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !expression) return
    try {
      katex.render(expression, ref.current, {
        throwOnError: false,
        displayMode: display,
        output: 'html',
      })
    } catch (e) {
      if (ref.current) ref.current.textContent = expression
    }
  }, [expression, display])

  return <span ref={ref} />
}

export function FormulaRow({ label, expression }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-2">
      <span className="text-xs font-bold text-gray-400 dark:text-gray-500 min-w-[100px] shrink-0">{label}</span>
      <span className="text-sm font-serif italic text-gray-800 dark:text-gray-200 overflow-x-auto">
        <KaTeXFormula expression={expression} display={false} />
      </span>
    </div>
  )
}
