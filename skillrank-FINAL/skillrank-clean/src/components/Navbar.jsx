import React, { useState, useEffect } from 'react'

export default function Navbar({ navigate, current }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'howitworks', label: 'How It Works' },
    { id: 'forworkers', label: 'For Workers' },
    { id: 'about', label: 'About' },
    { id: 'demo', label: '▶ Live Demo', highlight: true },
    { id: 'contact', label: 'Contact' },
  ]

  const textColor = scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.92)'
  const activeColor = '#FF6B35'
  const borderColor = 'rgba(255,255,255,0.5)'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 24px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          <button onClick={() => navigate('home')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" fill="white"/>
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'white' }}>SkillRank</span>
          </button>

          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {links.map(l => (
              <button key={l.id} onClick={() => navigate(l.id)} style={{
                background: l.highlight ? 'rgba(232,66,10,0.2)' : 'none',
                border: l.highlight ? '1px solid rgba(232,66,10,0.5)' : 'none',
                padding: '8px 14px', borderRadius: l.highlight ? 100 : 8,
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: current === l.id ? 700 : 500,
                color: current === l.id ? activeColor : (l.highlight ? '#FF6B35' : textColor),
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}>{l.label}</button>
            ))}
          </div>

          <div className="hide-mobile" style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => navigate('contact')} style={{
              background: 'none', border: `1.5px solid ${borderColor}`,
              padding: '9px 20px', borderRadius: 100, fontSize: 13, fontWeight: 500,
              fontFamily: 'var(--font-body)', color: 'white', transition: 'all 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >Join Waitlist</button>
            <button onClick={() => navigate('forworkers')} style={{
              background: 'var(--accent)', border: 'none', padding: '9px 20px',
              borderRadius: 100, fontSize: 13, fontWeight: 600, color: 'white',
              fontFamily: 'var(--font-body)', transition: 'all 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#c73408'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
            >Register as Worker</button>
          </div>

          <button className="hide-desktop" onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none', border: 'none', padding: 8, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5,
          }}>
            <div style={{ width: 22, height: 2, background: 'white', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <div style={{ width: 22, height: 2, background: 'white', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
            <div style={{ width: 22, height: 2, background: 'white', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px 24px' }}>
            {links.map(l => (
              <button key={l.id} onClick={() => { navigate(l.id); setMenuOpen(false) }} style={{
                display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none',
                padding: '13px 0', fontSize: 15, fontWeight: current === l.id ? 700 : 400,
                color: current === l.id ? 'var(--accent)' : 'rgba(255,255,255,0.8)',
                fontFamily: 'var(--font-body)', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer',
              }}>{l.label}</button>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              <button onClick={() => { navigate('contact'); setMenuOpen(false) }} style={{
                background: 'none', border: '1.5px solid rgba(255,255,255,0.3)', padding: '12px',
                borderRadius: 100, fontSize: 14, fontWeight: 500, color: 'white', fontFamily: 'var(--font-body)', cursor: 'pointer',
              }}>Join Waitlist</button>
              <button onClick={() => { navigate('forworkers'); setMenuOpen(false) }} style={{
                background: 'var(--accent)', border: 'none', padding: '12px',
                borderRadius: 100, fontSize: 14, fontWeight: 600, color: 'white', fontFamily: 'var(--font-body)', cursor: 'pointer',
              }}>Register as Worker</button>
            </div>
          </div>
        )}
      </nav>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/919999999999?text=Hi%2C%20I%20want%20to%20know%20more%20about%20SkillRank%20in%20Kolkata"
        target="_blank" rel="noopener noreferrer"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%',
          background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', textDecoration: 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  )
}
