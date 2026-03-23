import { ImageResponse } from 'next/og'
import { getNoteBySlug } from '../../lib/supabase'

export const runtime = 'edge'
export const alt     = 'GateShortNotes Chapter'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }) {
  let title = 'Short Notes', subject = '', branch = ''

  try {
    const note = await getNoteBySlug(params.chapter)
    if (note) {
      title   = note.chapter_name
      subject = note.subject_name
      branch  = note.branch_name
    }
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: '#0f172a',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>
            <span style={{ color: '#3b82f6' }}>Gate</span>
            <span style={{ color: '#a78bfa' }}>Short</span>
            <span>Notes</span>
            <span style={{ color: '#3b82f6' }}>.</span>
            <span style={{ color: '#94a3b8', fontSize: 14 }}>in</span>
          </div>
        </div>

        {/* Center */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: 2 }}>
            {branch} · {subject}
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: '#fff', lineHeight: 1.15, maxWidth: 800 }}>
            {title}
          </div>
          <div style={{ fontSize: 18, color: '#94a3b8' }}>
            Short Notes · Key Concepts · Formulas · PYQ
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {['GATE', 'ESE', 'Railway JE', 'SSC JE'].map(e => (
              <div key={e} style={{ fontSize: 13, fontWeight: 700, background: '#1e3a8a', color: '#93c5fd', padding: '6px 14px', borderRadius: 20 }}>
                {e}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 14, color: '#475569' }}>gateshortnotes.in</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
