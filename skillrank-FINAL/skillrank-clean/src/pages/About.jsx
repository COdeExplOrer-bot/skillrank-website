import React, { useEffect, useRef, useState } from 'react'

function useInView() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, vis]
}
function Anim({ children, delay = 0, style }) {
  const [ref, vis] = useInView()
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(28px)', transition: `all 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style }}>{children}</div>
}

const values = [
  { icon: '⚖️', title: 'Merit over connections', desc: 'Your rank should reflect your work, not who you know. Every worker earns their way up through performance.' },
  { icon: '🤝', title: 'Trust is earned, not assumed', desc: 'We build verification and accountability into every interaction — for both workers and customers.' },
  { icon: '🌱', title: 'Workers first', desc: "Our north star is simple: every worker should earn more this month than last month. Everything we build serves that goal." },
  { icon: '🏙️', title: 'Built for Bharat', desc: "We are building for Tier-2 and Tier-3 India — in local languages, for local realities. Not a copy of a Western startup." },
]

const team = [
  { initials: 'F', name: 'Founder', role: 'CEO & Product', location: 'Siliguri, WB', color: '#2952C4' },
  { initials: 'C', name: 'Co-Founder', role: 'Technology', location: 'Siliguri, WB', color: '#0A7A55' },
  { initials: 'C', name: 'Co-Founder', role: 'Operations', location: 'Siliguri, WB', color: '#E8420A' },
]

export default function About({ navigate }) {
  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ padding: '80px 24px 64px', background: 'var(--ink)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 60%, rgba(41,82,196,0.2) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <Anim><p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: 12 }}>Our Story</p></Anim>
          <Anim delay={0.1}><h1 style={{ fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 20 }}>We're building India's first merit-based identity for informal workers.</h1></Anim>
          <Anim delay={0.2}><p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>450 million workers in India have no digital professional identity. No verifiable track record. No way to prove their reliability to strangers. SkillRank changes that.</p></Anim>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
          <Anim>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>Why We Exist</p>
            <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, marginBottom: 20 }}>The problem we're solving</h2>
            <p style={{ fontSize: 16, color: '#444', lineHeight: 1.85, marginBottom: 20 }}>
              Meet Ramesh. He's a 28-year-old electrician with 8 years of experience. He's skilled, reliable, and honest. But every morning he waits outside a hardware shop hoping someone will hire him. When they do, 30–40% of his pay goes to a middleman.
            </p>
            <p style={{ fontSize: 16, color: '#444', lineHeight: 1.85, marginBottom: 20 }}>
              Ramesh has no resume. No LinkedIn. No way to tell a stranger he's trustworthy. His reputation exists only in the heads of people who already know him.
            </p>
            <p style={{ fontSize: 16, color: '#444', lineHeight: 1.85 }}>
              <strong>SkillRank gives Ramesh a digital reputation that grows with every job he completes.</strong> A Gold rank that proves to any stranger that this person delivers. A profile that travels with him everywhere.
            </p>
          </Anim>
          <Anim delay={0.1}>
            <div style={{ background: 'var(--paper2)', borderRadius: 20, padding: '32px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 56, color: 'rgba(0,0,0,0.06)', lineHeight: 1, marginBottom: -10 }}>"</div>
              <p style={{ fontSize: 18, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.7, marginBottom: 20 }}>SkillRank is not a service marketplace. It is India's first merit-based digital identity system for informal workers.</p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 16, fontSize: 14, color: '#888' }}>— SkillRank Mission Statement</div>
            </div>
          </Anim>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 24px', background: 'var(--paper2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Anim style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Values</p>
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800 }}>What we stand for</h2>
          </Anim>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {values.map((v, i) => (
              <Anim key={v.title} delay={i * 0.08}>
                <div style={{ background: 'white', borderRadius: 16, padding: '28px 24px', border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{v.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75 }}>{v.desc}</p>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* North star */}
      <section style={{ padding: '80px 24px', background: 'var(--accent)', color: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <Anim>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 16 }}>Our North Star</p>
            <h2 style={{ fontSize: 'clamp(24px,4vw,44px)', fontWeight: 800, lineHeight: 1.2 }}>Every worker should earn more this month than they did last month.</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginTop: 20 }}>Everything we build — every feature, every algorithm, every design decision — serves this one goal.</p>
          </Anim>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Anim style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>The Team</p>
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800 }}>Built in Siliguri, for India</h2>
            <p style={{ fontSize: 16, color: '#666', marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>We are building in our home market — we understand the culture, the language, and the daily reality of workers and customers here.</p>
          </Anim>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {team.map((m, i) => (
              <Anim key={i} delay={i * 0.1}>
                <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px 24px', textAlign: 'center' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: 'white', margin: '0 auto 16px' }}>{m.initials}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{m.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, marginBottom: 4 }}>{m.role}</div>
                  <div style={{ fontSize: 12, color: '#999' }}>{m.location}</div>
                </div>
              </Anim>
            ))}
          </div>
          <Anim style={{ textAlign: 'center', marginTop: 36 }}>
            <button onClick={() => navigate('contact')} style={{
              background: 'var(--ink)', border: 'none', padding: '14px 32px',
              borderRadius: 100, fontSize: 14, fontWeight: 600, color: 'white',
              fontFamily: 'var(--font-body)', cursor: 'pointer',
            }}>Get in touch →</button>
          </Anim>
        </div>
      </section>
    </div>
  )
}
