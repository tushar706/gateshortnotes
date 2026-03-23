import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 text-center">
      <div className="text-6xl font-black text-gray-200 dark:text-gray-800 mb-4">404</div>
      <h1 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Page not found</h1>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
        The chapter or page you are looking for does not exist or has been moved.
      </p>
      <Link href="/"
        className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition">
        ← Back to Home
      </Link>
    </div>
  )
}
