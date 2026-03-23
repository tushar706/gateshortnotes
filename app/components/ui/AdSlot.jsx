'use client'
// Drop-in AdSense slot — replace data-ad-* with your real values

export default function AdSlot({ type = 'leaderboard', className = '' }) {
  const sizes = {
    leaderboard: 'h-[90px]',   // 728×90
    rectangle:   'h-[250px]',  // 300×250
    sidebar:     'h-[120px]',  // 160×120
  }

  // In production: replace this div with your real AdSense <ins> tag
  // <ins className="adsbygoogle" data-ad-client="ca-pub-XXXX" data-ad-slot="YYYY" .../>
  return (
    <div className={`
      w-full ${sizes[type]} rounded-lg border border-dashed
      border-gray-200 dark:border-gray-700
      bg-gray-50 dark:bg-gray-900
      flex items-center justify-center
      text-[10px] font-semibold uppercase tracking-wider
      text-gray-300 dark:text-gray-600
      ${className}
    `}>
      Advertisement
    </div>
  )
}
