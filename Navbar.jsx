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
    { id: 'demo', label: '▶ Live Demo' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(250,250,247,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        {/* Logo */}
        <button onClick={() => navigate('home')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2Z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--ink)' }}>SkillRank</span>
        </button>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {links.map(l => (
            <button key={l.id} onClick={() => navigate(l.id)} style={{
              background: 'none', border: 'none', padding: '8px 14px', borderRadius: 8,
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: current === l.id ? 500 : 400,
              color: current === l.id ? 'var(--accent)' : 'var(--ink)', cursor: 'pointer',
              transition: 'color 0.2s',
            }}>{l.label}</button>
          ))}
        </div>

        {/* CTA */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('contact')} style={{
            background: 'none', border: '1.5px solid var(--ink)', padding: '9px 20px',
            borderRadius: 100, fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-body)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.background = 'var(--ink)'; e.target.style.color = 'white' }}
          onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = 'inherit' }}
          >Join Waitlist</button>
          <button onClick={() => navigate('forworkers')} style={{
            background: 'var(--accent)', border: 'none', padding: '9px 20px',
            borderRadius: 100, fontSize: 13, fontWeight: 500, color: 'white', fontFamily: 'var(--font-body)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = '#c73408'}
          onMouseLeave={e => e.target.style.background = 'var(--accent)'}
          >Register as Worker</button>
        </div>

        {/* Mobile hamburger */}
        <button className="hide-desktop" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', padding: 8, cursor: 'pointer',
        }}>
          <div style={{ width: 22, height: 2, background: 'var(--ink)', marginBottom: 5, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <div style={{ width: 22, height: 2, background: 'var(--ink)', marginBottom: 5, opacity: menuOpen ? 0 : 1 }} />
          <div style={{ width: 22, height: 2, background: 'var(--ink)', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none', transition: 'all 0.3s' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--paper)', borderTop: '1px solid rgba(0,0,0,0.08)',
          padding: '16px 24px 24px',
        }}>
          {links.map(l => (
            <button key={l.id} onClick={() => { navigate(l.id); setMenuOpen(false) }} style={{
              display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none',
              padding: '12px 0', fontSize: 16, fontWeight: current === l.id ? 600 : 400,
              color: current === l.id ? 'var(--accent)' : 'var(--ink)', fontFamily: 'var(--font-body)',
              borderBottom: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer',
            }}>{l.label}</button>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
            <button onClick={() => { navigate('contact'); setMenuOpen(false) }} style={{
              background: 'none', border: '1.5px solid var(--ink)', padding: '12px', borderRadius: 100, fontSize: 14, fontWeight: 500,
            }}>Join Waitlist</button>
            <button onClick={() => { navigate('forworkers'); setMenuOpen(false) }} style={{
              background: 'var(--accent)', border: 'none', padding: '12px', borderRadius: 100, fontSize: 14, fontWeight: 500, color: 'white',
            }}>Register as Worker</button>
          </div>
        </div>
      )}
    </nav>
  )
}
