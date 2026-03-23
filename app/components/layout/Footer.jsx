import Link from 'next/link'

const BRANCHES = [
  { name: 'Computer Science', slug: 'computer-science' },
  { name: 'Electronics',      slug: 'electronics' },
  { name: 'Mechanical',       slug: 'mechanical' },
  { name: 'Civil',            slug: 'civil' },
  { name: 'Electrical',       slug: 'electrical' },
  { name: 'Engg. Maths',      slug: 'engineering-maths' },
]

const EXAMS = ['GATE', 'ESE / IES', 'Railway JE', 'SSC JE', 'ISRO', 'BARC']

const LINKS = [
  { name: 'GATE Important Topics', href: '/' },
  { name: 'Formula Sheets',        href: '/' },
  { name: 'PYQ Analysis',          href: '/' },
  { name: 'About Us',              href: '/about' },
  { name: 'Contact',               href: '/contact' },
  { name: 'Privacy Policy',        href: '/privacy' },
]

const EXAM_BADGES = [
  { name: 'GATE',       bg: 'bg-blue-50 dark:bg-blue-950',   text: 'text-blue-700 dark:text-blue-300' },
  { name: 'ESE',        bg: 'bg-purple-50 dark:bg-purple-950', text: 'text-purple-700 dark:text-purple-300' },
  { name: 'Railway JE', bg: 'bg-green-50 dark:bg-green-950',  text: 'text-green-700 dark:text-green-300' },
  { name: 'SSC JE',     bg: 'bg-red-50 dark:bg-red-950',     text: 'text-red-700 dark:text-red-300' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-6">
      <div className="max-w-5xl mx-auto px-5 py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-base font-black mb-1 tracking-tight">
              <span className="text-blue-600">Gate</span>
              <span className="text-purple-600">Short</span>
              <span className="text-gray-900 dark:text-white">Notes</span>
              <span className="text-blue-600">.</span>
              <span className="text-sm text-gray-500 font-bold">in</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">gateshortnotes.in</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
              Free, concise short notes for GATE, ESE, Railway JE, SSC JE, ISRO and BARC aspirants.
              Key concepts, formulas and PYQs across all engineering branches.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {EXAM_BADGES.map(b => (
                <span key={b.name} className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${b.bg} ${b.text}`}>
                  {b.name}
                </span>
              ))}
            </div>
          </div>

          {/* Branches */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Branches</h3>
            {BRANCHES.map(b => (
              <Link key={b.slug} href={`/${b.slug}`}
                className="block text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-1.5">
                {b.name}
              </Link>
            ))}
          </div>

          {/* Exams */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Exams</h3>
            {EXAMS.map(e => (
              <span key={e} className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
                {e}
              </span>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Quick Links</h3>
            {LINKS.map(l => (
              <Link key={l.name} href={l.href}
                className="block text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-1.5">
                {l.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            © 2025 GateShortNotes.in LLC · All rights reserved
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Made with ❤️ by <strong className="text-gray-600 dark:text-gray-300">GateShortNotes.in</strong>
          </span>
        </div>
      </div>
    </footer>
  )
}
