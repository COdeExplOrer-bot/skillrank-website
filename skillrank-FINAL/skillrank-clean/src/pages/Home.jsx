import React, { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function AnimSection({ children, style }) {
  const [ref, vis] = useInView()
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(32px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)', ...style }}>
      {children}
    </div>
  )
}

const services = [
  { icon: '⚡', name: 'Electrician', color: '#FEF3D7', accent: '#B07A00' },
  { icon: '🔧', name: 'Plumber', color: '#E6F4FF', accent: '#1A5FA0' },
  { icon: '🖌️', name: 'Painter', color: '#FFF0E6', accent: '#B04A00' },
  { icon: '🔩', name: 'Mechanic', color: '#EDFAF4', accent: '#0A6B42' },
  { icon: '🧹', name: 'Cleaning', color: '#F0ECFF', accent: '#5A3EAA' },
  { icon: '🏗️', name: 'Helper', color: '#FFF5E6', accent: '#9A5E00' },
  { icon: '❄️', name: 'AC Repair', color: '#E6F8FF', accent: '#006A8A' },
  { icon: '📦', name: 'Shifting', color: '#FFF0F5', accent: '#AA2255' },
]

const stats = [
  { val: '450M+', label: 'Informal workers in India' },
  { val: '< 2%', label: 'Have digital identity' },
  { val: '10 min', label: 'Average booking time' },
  { val: '₹0', label: 'Middleman cut' },
]

const testimonials = [
  { name: 'Priya M.', role: 'Customer, Siliguri', text: 'I found a verified electrician in 8 minutes. He had a Gold rank and 200+ jobs — I felt safe letting him in.', rating: 5 },
  { name: 'Ramesh S.', role: 'Electrician, 8 yrs exp', text: "I used to wait outside hardware shops. Now I earn ₹12,000 a month and have a Gold rank. My reputation is finally mine.", rating: 5 },
  { name: 'Sunil P.', role: 'Painting Contractor', text: 'Hiring 3 extra workers for a big job used to take 2 days. On SkillRank I staffed up in 30 minutes.', rating: 5 },
]

export default function Home({ navigate }) {
  const [count, setCount] = useState({ workers: 0, jobs: 0, cities: 0 })
  const [statsRef, statsVis] = useInView()

  useEffect(() => {
    if (!statsVis) return
    const targets = { workers: 500, jobs: 12000, cities: 3 }
    const duration = 1800
    const steps = 60
    let step = 0
    const interval = setInterval(() => {
      step++
      const p = step / steps
      const ease = 1 - Math.pow(1 - p, 3)
      setCount({
        workers: Math.round(targets.workers * ease),
        jobs: Math.round(targets.jobs * ease),
        cities: Math.round(targets.cities * ease),
      })
      if (step >= steps) clearInterval(interval)
    }, duration / steps)
    return () => clearInterval(interval)
  }, [statsVis])

  return (
    <div>
      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'var(--ink)', color: 'white',
        paddingTop: 80, overflow: 'hidden', position: 'relative',
      }}>
        {/* BG grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(232,66,10,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(41,82,196,0.18) 0%, transparent 50%)', pointerEvents: 'none' }} />
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 40, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
            {/* Left */}
            <div>
              <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,66,10,0.2)', border: '1px solid rgba(232,66,10,0.4)', borderRadius: 100, padding: '6px 14px', marginBottom: 24 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent2)', animation: 'pulse-dot 2s ease-in-out infinite' }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent2)', letterSpacing: '0.04em' }}>NOW LAUNCHING IN SILIGURI</span>
              </div>

              <h1 className="animate-fade-up delay-1" style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.0, marginBottom: 24 }}>
                Find trusted<br />
                <span style={{ color: 'var(--accent)' }}>skilled workers</span><br />
                near you.
              </h1>

              <p className="animate-fade-up delay-2" style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 480, marginBottom: 36 }}>
                SkillRank connects you with verified, ranked local workers — electricians, plumbers, painters and more. Book in minutes. Pay fairly. Trust completely.
              </p>

              <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('contact')} style={{
                  background: 'var(--accent)', border: 'none', padding: '16px 32px',
                  borderRadius: 100, fontSize: 15, fontWeight: 600, color: 'white',
                  fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 0 0 0 rgba(232,66,10,0.4)',
                }}
                onMouseEnter={e => { e.target.style.background = '#c73408'; e.target.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.target.style.background = 'var(--accent)'; e.target.style.transform = 'translateY(0)' }}
                >Join the Waitlist →</button>
                <button onClick={() => navigate('howitworks')} style={{
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
                  padding: '16px 32px', borderRadius: 100, fontSize: 15, fontWeight: 500,
                  color: 'white', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
                onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.08)'}
                >See How It Works</button>
              </div>

              {/* Trust row */}
              <div className="animate-fade-up delay-4" style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                {[['✓', 'Verified workers'], ['✓', 'Ranked by performance'], ['✓', 'Safe in-home service']].map(([icon, text]) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
                    <span style={{ color: 'var(--accent2)', fontWeight: 700 }}>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating card mockup */}
            <div className="animate-fade-up delay-3 hide-mobile" style={{ position: 'relative', height: 480 }}>
              {/* Main card */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24,
                padding: 24, width: 280, animation: 'float 4s ease-in-out infinite',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#2952C4,#7B68EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>RS</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>Ramesh Sharma</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Electrician · Siliguri</div>
                  </div>
                  <div style={{ marginLeft: 'auto', background: '#FEF3D7', color: '#B07A00', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 100, letterSpacing: '0.04em' }}>GOLD</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                  {[['4.8', 'Rating'], ['312', 'Jobs'], ['94%', 'Completion'], ['8 yrs', 'Experience']].map(([v, l]) => (
                    <div key={l} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>{v}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--accent)', borderRadius: 10, padding: '12px', textAlign: 'center', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  Book Ramesh — ₹350 est.
                </div>
              </div>

              {/* Floating mini cards */}
              <div style={{ position: 'absolute', top: 40, right: 0, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '10px 14px', fontSize: 12, animation: 'float 4s ease-in-out 1s infinite' }}>
                <div style={{ color: '#4ADE80', fontWeight: 600, marginBottom: 2 }}>● Online now</div>
                <div style={{ color: 'rgba(255,255,255,0.5)' }}>1.2 km away</div>
              </div>
              <div style={{ position: 'absolute', bottom: 60, left: 0, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '10px 14px', fontSize: 12, animation: 'float 4s ease-in-out 0.5s infinite' }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>⭐⭐⭐⭐⭐</div>
                <div style={{ color: 'rgba(255,255,255,0.5)' }}>68% repeat customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.4 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: 'white', animation: 'float 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ─── MARQUEE SERVICES ─── */}
      <section style={{ background: 'var(--accent)', padding: '16px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', animation: 'marquee 20s linear infinite', width: 'max-content', gap: 0 }}>
          {[...services, ...services].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 28px', whiteSpace: 'nowrap', color: 'white', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-display)' }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span> {s.name}
              <span style={{ marginLeft: 20, opacity: 0.4 }}>·</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ background: 'var(--paper2)', padding: '80px 24px' }} ref={statsRef}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <AnimSection>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>The Opportunity</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 48 }}>India's informal workforce needs SkillRank</h2>
          </AnimSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {stats.map((s, i) => (
              <AnimSection key={s.label} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div style={{ background: 'white', borderRadius: var_r_lg(), padding: '32px 24px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px,4vw,48px)', color: 'var(--accent)', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 14, color: '#666', marginTop: 8 }}>{s.label}</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimSection style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Services</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>Every skill you need,<br />ranked and verified.</h2>
          </AnimSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {services.map((s, i) => (
              <AnimSection key={s.name} style={{ transitionDelay: `${i * 0.06}s` }}>
                <div style={{
                  background: s.color, borderRadius: 16, padding: '28px 24px',
                  cursor: 'pointer', transition: 'all 0.25s', border: `1px solid ${s.color}`,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: s.accent }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: s.accent, opacity: 0.7, marginTop: 4 }}>Verified & Ranked</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS PREVIEW ─── */}
      <section style={{ padding: '80px 24px', background: 'var(--ink)', color: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimSection style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: 8 }}>Simple Process</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>Book a worker in 3 steps</h2>
          </AnimSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {[
              { n: '01', title: 'Find', desc: 'Search by service type or use emergency booking. See ranked workers near you on a live map.' },
              { n: '02', title: 'Book', desc: 'View worker profiles with ratings, rank, and reviews. Book instantly or schedule for later.' },
              { n: '03', title: 'Pay Safely', desc: 'Payment held in escrow until job is complete. Rate your worker. Funds released instantly via UPI.' },
            ].map((step, i) => (
              <AnimSection key={step.n} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div style={{ borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 64, color: 'rgba(255,255,255,0.07)', lineHeight: 1, marginBottom: -16 }}>{step.n}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
          <AnimSection style={{ textAlign: 'center', marginTop: 48 }}>
            <button onClick={() => navigate('howitworks')} style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.25)', padding: '14px 32px',
              borderRadius: 100, fontSize: 14, fontWeight: 500, color: 'white',
              fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.08)'}
            onMouseLeave={e => e.target.style.background = 'none'}
            >Full explanation →</button>
          </AnimSection>
        </div>
      </section>

      {/* ─── RANK SYSTEM PREVIEW ─── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>
            <AnimSection>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>The SkillRank System</p>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginBottom: 20 }}>Merit-based ranking that rewards hard work</h2>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.8, marginBottom: 28 }}>
                Every worker starts unranked and earns their way up through completed jobs, customer ratings, and reliability. A Gold rank takes hard work to earn — and it belongs to the worker forever.
              </p>
              <button onClick={() => navigate('forworkers')} style={{
                background: 'var(--ink)', border: 'none', padding: '14px 28px',
                borderRadius: 100, fontSize: 14, fontWeight: 600, color: 'white',
                fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.background = '#333'}
              onMouseLeave={e => e.target.style.background = 'var(--ink)'}
              >How ranking works →</button>
            </AnimSection>

            <AnimSection>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { rank: 'Unranked', color: '#F0F0F0', text: '#666', bar: 15, desc: 'New workers — boosted visibility for first 10 jobs' },
                  { rank: 'Bronze', color: '#FAE8D0', text: 'var(--bronze)', bar: 35, desc: '25+ jobs · 3.5+ avg rating · 70%+ completion' },
                  { rank: 'Silver', color: '#E8E8EE', text: '#555', bar: 55, desc: '75+ jobs · 4.0+ avg rating · 80%+ completion' },
                  { rank: 'Gold', color: '#FEF3D7', text: '#B07A00', bar: 75, desc: '150+ jobs · 4.5+ avg rating · 90%+ completion' },
                  { rank: 'Platinum', color: '#EEECFD', text: 'var(--platinum)', bar: 100, desc: '300+ jobs · 4.8+ avg rating · 95%+ completion' },
                ].map((r, i) => (
                  <div key={r.rank} style={{ background: r.color, borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: r.text, minWidth: 72 }}>{r.rank}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 5, background: 'rgba(0,0,0,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${r.bar}%`, background: r.text, borderRadius: 3, opacity: 0.6 }} />
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: r.text, opacity: 0.7, maxWidth: 160 }}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: '80px 24px', background: 'var(--paper2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <AnimSection style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Stories</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>Real people. Real impact.</h2>
          </AnimSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <AnimSection key={t.name} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div style={{ background: 'white', borderRadius: 20, padding: '28px 24px', height: '100%', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 20, marginBottom: 16, letterSpacing: 2 }}>{'★'.repeat(t.rating)}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: '#333', marginBottom: 20, fontStyle: 'italic' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: 'white' }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: '#999' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ padding: '80px 24px', background: 'var(--accent)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <AnimSection>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
              Ready to find a worker you can trust?
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', marginBottom: 36 }}>
              Join thousands of customers and workers launching in Siliguri.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('contact')} style={{
                background: 'white', border: 'none', padding: '16px 36px',
                borderRadius: 100, fontSize: 15, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)' }}
              onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none' }}
              >Join the Waitlist</button>
              <button onClick={() => navigate('forworkers')} style={{
                background: 'rgba(0,0,0,0.15)', border: '1.5px solid rgba(255,255,255,0.5)', padding: '16px 36px',
                borderRadius: 100, fontSize: 15, fontWeight: 600, color: 'white',
                fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.background = 'rgba(0,0,0,0.25)'}
              onMouseLeave={e => e.target.style.background = 'rgba(0,0,0,0.15)'}
              >Register as Worker</button>
            </div>
          </AnimSection>
        </div>
      </section>
    </div>
  )
}

function var_r_lg() { return '20px' }
