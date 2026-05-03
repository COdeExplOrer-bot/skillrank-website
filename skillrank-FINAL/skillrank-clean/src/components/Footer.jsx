import React from 'react'

export default function Footer({ navigate }) {
  const cols = [
    { title: 'Platform', links: [['Home','home'],['How It Works','howitworks'],['For Workers','forworkers'],['About','about']] },
    { title: 'Company', links: [['Our Mission','about'],['Contact Us','contact'],['Join Waitlist','contact']] },
    { title: 'Workers', links: [['Register','forworkers'],['How Ranking Works','forworkers'],['Earnings','forworkers'],['Worker Safety','forworkers']] },
  ]

  return (
    <footer style={{ background: 'var(--ink)', color: 'white', padding: '64px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" fill="white"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>SkillRank</span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 240 }}>
              India's first trust-based digital identity system for informal workers. Building merit, one job at a time.
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              {['in', 'tw', 'ig'].map(s => (
                <div key={s} style={{
                  width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase',
                  cursor: 'pointer',
                }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>{col.title}</div>
              {col.links.map(([label, page]) => (
                <button key={label} onClick={() => navigate(page)} style={{
                  display: 'block', background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)',
                  fontSize: 14, padding: '5px 0', cursor: 'pointer', fontFamily: 'var(--font-body)',
                  transition: 'color 0.2s', textAlign: 'left',
                }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
                >{label}</button>
              ))}
            </div>
          ))}

          {/* Location */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Location</div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              Kolkata, West Bengal<br />
              India — 734001<br /><br />
              <a href="mailto:hello@skillrank.in" style={{ color: 'var(--accent2)' }}>hello@skillrank.in</a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>© 2025 SkillRank. All rights reserved.</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Made in Kolkata, India 🇮🇳</p>
        </div>
      </div>
    </footer>
  )
}
