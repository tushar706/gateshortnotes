import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './components/layout/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://gateshortnotes.in'),
  title: {
    default: 'GateShortNotes.in – Engineering Notes for GATE, ESE, Railway JE & SSC JE',
    template: '%s | GateShortNotes.in',
  },
  description: 'Free concise short notes for GATE, ESE, Railway JE, SSC JE, ISRO and BARC. Key concepts, formulas and previous year questions across all engineering branches.',
  keywords: ['GATE notes', 'ESE notes', 'Railway JE', 'SSC JE', 'engineering notes', 'GATE preparation', 'short notes'],
  authors: [{ name: 'GateShortNotes.in' }],
  creator: 'GateShortNotes.in LLC',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://gateshortnotes.in',
    siteName: 'GateShortNotes.in',
    title: 'GateShortNotes.in – Engineering Notes for GATE, ESE, Railway JE & SSC JE',
    description: 'Free concise short notes for GATE, ESE, Railway JE, SSC JE. Key concepts, formulas and PYQs.',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GateShortNotes.in – Engineering Notes',
    description: 'Free concise short notes for GATE, ESE, Railway JE, SSC JE.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
