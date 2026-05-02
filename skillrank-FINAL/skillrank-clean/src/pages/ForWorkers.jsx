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

const ranks = [
  { name: 'Unranked', color: '#F0F0F0', text: '#666', bg: '#FAFAFA', requirements: ['Fresh start — boosted visibility for first 10 jobs', 'Phone verification required'], perks: ['Get job requests', 'Boosted in search during onboarding'] },
  { name: 'Bronze', color: '#FAE8D0', text: '#7A4A00', bg: '#FFFAF5', requirements: ['25+ completed jobs', '3.5+ average rating', '70%+ completion rate'], perks: ['Bronze badge on profile', 'Higher trust score'] },
  { name: 'Silver', color: '#E8E8EE', text: '#444', bg: '#F8F8FC', requirements: ['75+ completed jobs', '4.0+ average rating', '80%+ completion rate'], perks: ['Silver badge', 'Priority in standard search results'] },
  { name: 'Gold', color: '#FEF3D7', text: '#8A6000', bg: '#FFFDF0', requirements: ['150+ completed jobs', '4.5+ average rating', '90%+ completion rate'], perks: ['Gold badge', 'Top search placement', 'Featured in emergency booking'] },
  { name: 'Platinum', color: '#EEECFD', text: '#5B3EBB', bg: '#F8F7FF', requirements: ['300+ completed jobs', '4.8+ average rating', '95%+ completion rate', 'Full KYC verified'], perks: ['Platinum badge', 'Top of all searches', 'Early access to new features', 'Priority support'] },
]

export default function ForWorkers({ navigate }) {
  const [activeRank, setActiveRank] = useState(2)

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: 'white', padding: '80px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(245,166,35,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <Anim><p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>For Workers</p></Anim>
            <Anim delay={0.1}><h1 style={{ fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 20 }}>Your skills.<br /><span style={{ color: 'var(--gold)' }}>Your reputation.</span><br />Your income.</h1></Anim>
            <Anim delay={0.2}><p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 32 }}>SkillRank gives every skilled worker in India a verifiable digital identity — and a path to earn more, grow their reputation, and never depend on a middleman again.</p></Anim>
            <Anim delay={0.3}><button onClick={() => navigate('contact')} style={{
              background: 'var(--gold)', border: 'none', padding: '16px 36px',
              borderRadius: 100, fontSize: 15, fontWeight: 700, color: 'var(--ink)',
              fontFamily: 'var(--font-body)', cursor: 'pointer',
            }}>Register as Worker →</button></Anim>
          </div>
          <Anim delay={0.2} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['₹12,400', 'Avg monthly earnings for Gold workers'], ['24 hrs', 'Max time to receive payment'], ['0%', 'Middleman commission'], ['Your rank', 'Yours forever — no one can take it']].map(([val, label]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--gold)' }}>{val}</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', maxWidth: 200, textAlign: 'right' }}>{label}</span>
              </div>
            ))}
          </Anim>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Anim style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Why SkillRank</p>
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800 }}>Everything a worker deserves</h2>
          </Anim>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {[
              { icon: '🏆', title: 'Build a lasting reputation', desc: 'Your rank is yours. Every job you complete strengthens your professional identity — something no middleman can take from you.' },
              { icon: '💸', title: 'Get paid in 24 hours', desc: 'No waiting weeks for a contractor to pay you. Earnings land in your UPI account within 24 hours of job completion.' },
              { icon: '📱', title: 'Bengali & Hindi app', desc: 'The app is designed for you. Bengali and Hindi first. Voice-based interactions. Large icons. Works on low-end phones and slow internet.' },
              { icon: '🌐', title: 'Reach more customers', desc: 'Stop waiting outside shops. Customers in your area find you on the app. Your reach grows beyond who already knows you.' },
              { icon: '🛡️', title: 'Your safety matters', desc: 'SOS button if you feel unsafe at a job. Customer ratings shown before you accept. Dispute support if a customer is unfair.' },
              { icon: '📈', title: 'Grow your income', desc: 'Gold and Platinum workers are shown first in search. Higher rank = more jobs = more income. The system rewards hard work.' },
            ].map((b, i) => (
              <Anim key={b.title} delay={i * 0.07}>
                <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '24px', height: '100%' }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{b.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{b.title}</h3>
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75 }}>{b.desc}</p>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* Rank system */}
      <section style={{ padding: '80px 24px', background: 'var(--paper2)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Anim style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Ranking System</p>
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800 }}>Your journey from New to Platinum</h2>
          </Anim>

          {/* Rank pills */}
          <Anim>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
              {ranks.map((r, i) => (
                <button key={r.name} onClick={() => setActiveRank(i)} style={{
                  padding: '10px 20px', borderRadius: 100, border: `2px solid ${activeRank === i ? r.text : 'transparent'}`,
                  background: r.color, color: r.text, fontWeight: 700, fontSize: 13,
                  fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s',
                  transform: activeRank === i ? 'scale(1.05)' : 'scale(1)',
                }}>{r.name}</button>
              ))}
            </div>
          </Anim>

          {/* Active rank detail */}
          <Anim>
            <div style={{ background: ranks[activeRank].bg, border: `2px solid ${ranks[activeRank].color}`, borderRadius: 20, padding: '32px', transition: 'all 0.3s' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: ranks[activeRank].text, marginBottom: 16 }}>{ranks[activeRank].name}</div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Requirements</p>
                  {ranks[activeRank].requirements.map(r => (
                    <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                      <span style={{ color: ranks[activeRank].text, fontWeight: 700, marginTop: 2 }}>✓</span>
                      <span style={{ fontSize: 14, color: '#444', lineHeight: 1.5 }}>{r}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Benefits</p>
                  {ranks[activeRank].perks.map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700, marginTop: 2 }}>★</span>
                      <span style={{ fontSize: 14, color: '#444', lineHeight: 1.5 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Anim>

          <Anim style={{ marginTop: 20, textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#888' }}>Ranks update after every job. A stability buffer of 5+ consecutive jobs prevents unfair demotion from a single bad review.</p>
          </Anim>
        </div>
      </section>

      {/* Earnings calculator */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <Anim style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Earnings</p>
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800 }}>What can you earn on SkillRank?</h2>
          </Anim>
          <Anim>
            <EarningsCalc />
          </Anim>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 24px', background: 'var(--gold)', textAlign: 'center' }}>
        <Anim>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 14 }}>Your skills are worth more.</h2>
          <p style={{ fontSize: 16, color: 'rgba(0,0,0,0.55)', marginBottom: 32 }}>Register now and start building your SkillRank reputation.</p>
          <button onClick={() => navigate('contact')} style={{
            background: 'var(--ink)', border: 'none', padding: '16px 40px',
            borderRadius: 100, fontSize: 15, fontWeight: 700, color: 'white',
            fontFamily: 'var(--font-body)', cursor: 'pointer',
          }}>Register as Worker →</button>
        </Anim>
      </section>
    </div>
  )
}

function EarningsCalc() {
  const [jobs, setJobs] = useState(8)
  const [price, setPrice] = useState(350)
  const gross = jobs * price
  const commission = Math.round(gross * 0.10)
  const net = gross - commission

  return (
    <div style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 20, padding: '32px' }}>
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 500, marginBottom: 10, color: '#333' }}>
          <span>Jobs per month</span><span style={{ color: 'var(--accent)', fontWeight: 700 }}>{jobs}</span>
        </label>
        <input type="range" min={2} max={30} value={jobs} onChange={e => setJobs(+e.target.value)} style={{ width: '100%', accentColor: 'var(--accent)' }} />
      </div>
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 500, marginBottom: 10, color: '#333' }}>
          <span>Average job price (₹)</span><span style={{ color: 'var(--accent)', fontWeight: 700 }}>₹{price}</span>
        </label>
        <input type="range" min={150} max={2000} step={50} value={price} onChange={e => setPrice(+e.target.value)} style={{ width: '100%', accentColor: 'var(--accent)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[['Gross', `₹${gross.toLocaleString('en-IN')}`, '#333'], ['Platform fee', `-₹${commission.toLocaleString('en-IN')}`, 'var(--accent)'], ['You earn', `₹${net.toLocaleString('en-IN')}`, 'var(--green)']].map(([l, v, c]) => (
          <div key={l} style={{ background: 'var(--paper2)', borderRadius: 12, padding: '14px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{l} / month</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: '#aaa', marginTop: 14, textAlign: 'center' }}>No middleman cut. Direct UPI to your account within 24 hours.</p>
    </div>
  )
}
