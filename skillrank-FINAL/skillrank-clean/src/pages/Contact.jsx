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

function Input({ label, type = 'text', placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 6 }}>
        {label}{required && <span style={{ color: 'var(--accent)', marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '12px 16px', borderRadius: 10,
          border: `1.5px solid ${focused ? 'var(--accent)' : 'rgba(0,0,0,0.12)'}`,
          fontSize: 14, fontFamily: 'var(--font-body)', background: 'white',
          outline: 'none', transition: 'border-color 0.2s', color: 'var(--ink)',
        }}
      />
    </div>
  )
}

function Select({ label, value, onChange, options, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 6 }}>
        {label}{required && <span style={{ color: 'var(--accent)', marginLeft: 3 }}>*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '12px 16px', borderRadius: 10,
          border: `1.5px solid ${focused ? 'var(--accent)' : 'rgba(0,0,0,0.12)'}`,
          fontSize: 14, fontFamily: 'var(--font-body)', background: 'white',
          outline: 'none', transition: 'border-color 0.2s', color: value ? 'var(--ink)' : '#aaa',
          appearance: 'none', cursor: 'pointer',
        }}
      >
        {options.map(o => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
      </select>
    </div>
  )
}

export default function Contact() {
  const [tab, setTab] = useState('customer')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Customer form state
  const [cName, setCName] = useState('')
  const [cPhone, setCPhone] = useState('')
  const [cCity, setCCity] = useState('')
  const [cService, setCService] = useState('')

  // Worker form state
  const [wName, setWName] = useState('')
  const [wPhone, setWPhone] = useState('')
  const [wCity, setWCity] = useState('')
  const [wSkill, setWSkill] = useState('')
  const [wExp, setWExp] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  const services = [
    { value: '', label: 'Select a service', disabled: true },
    { value: 'electrician', label: 'Electrician' },
    { value: 'plumber', label: 'Plumber' },
    { value: 'painter', label: 'Painter' },
    { value: 'mechanic', label: 'Mechanic' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'helper', label: 'General Helper' },
    { value: 'ac', label: 'AC Repair' },
    { value: 'other', label: 'Other' },
  ]

  const skills = [
    { value: '', label: 'Select your skill', disabled: true },
    { value: 'electrician', label: 'Electrician' },
    { value: 'plumber', label: 'Plumber' },
    { value: 'painter', label: 'Painter' },
    { value: 'mechanic', label: 'Mechanic' },
    { value: 'cleaning', label: 'Cleaner' },
    { value: 'helper', label: 'General Helper' },
    { value: 'carpenter', label: 'Carpenter' },
    { value: 'ac', label: 'AC Technician' },
    { value: 'other', label: 'Other' },
  ]

  const expOptions = [
    { value: '', label: 'Years of experience', disabled: true },
    { value: '0-1', label: 'Less than 1 year' },
    { value: '1-3', label: '1–3 years' },
    { value: '3-5', label: '3–5 years' },
    { value: '5-10', label: '5–10 years' },
    { value: '10+', label: '10+ years' },
  ]

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: 'white', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Anim><p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: 12 }}>Early Access</p></Anim>
          <Anim delay={0.1}><h1 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>Join the SkillRank waitlist</h1></Anim>
          <Anim delay={0.2}><p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>We're launching in Kolkata first. Sign up early and be among the first to access the platform — whether you need workers or you are one.</p></Anim>
        </div>
      </section>

      {/* Form section */}
      <section style={{ padding: '64px 24px 80px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          {!submitted ? (
            <>
              {/* Tab switcher */}
              <Anim>
                <div style={{ display: 'flex', background: 'var(--paper2)', borderRadius: 100, padding: 4, marginBottom: 32, gap: 4 }}>
                  {[['customer', '🏠 I need workers'], ['worker', '🔧 I am a worker']].map(([id, label]) => (
                    <button key={id} onClick={() => setTab(id)} style={{
                      flex: 1, padding: '12px', borderRadius: 100, border: 'none', fontSize: 14,
                      fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.25s',
                      background: tab === id ? 'var(--ink)' : 'transparent',
                      color: tab === id ? 'white' : '#777',
                    }}>{label}</button>
                  ))}
                </div>
              </Anim>

              <Anim delay={0.1}>
                <div style={{ background: 'white', borderRadius: 20, padding: '32px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                  {tab === 'customer' ? (
                    <form onSubmit={handleSubmit}>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, marginBottom: 6 }}>Customer Waitlist</h2>
                      <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>We'll notify you as soon as SkillRank launches in your area.</p>
                      <Input label="Full Name" placeholder="Your full name" value={cName} onChange={e => setCName(e.target.value)} required />
                      <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" value={cPhone} onChange={e => setCPhone(e.target.value)} required />
                      <Input label="City" placeholder="e.g. Kolkata" value={cCity} onChange={e => setCCity(e.target.value)} required />
                      <Select label="Service most needed" value={cService} onChange={e => setCService(e.target.value)} options={services} />
                      <button type="submit" disabled={loading || !cName || !cPhone || !cCity} style={{
                        width: '100%', padding: '14px', borderRadius: 100, border: 'none',
                        background: loading ? '#ccc' : 'var(--accent)', color: 'white',
                        fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)',
                        cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', marginTop: 8,
                      }}>
                        {loading ? 'Submitting...' : 'Join Waitlist →'}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, marginBottom: 6 }}>Worker Registration</h2>
                      <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>Be among the first verified workers on SkillRank.</p>
                      <Input label="Full Name" placeholder="Your full name" value={wName} onChange={e => setWName(e.target.value)} required />
                      <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" value={wPhone} onChange={e => setWPhone(e.target.value)} required />
                      <Input label="City" placeholder="e.g. Kolkata" value={wCity} onChange={e => setWCity(e.target.value)} required />
                      <Select label="Primary Skill" value={wSkill} onChange={e => setWSkill(e.target.value)} options={skills} required />
                      <Select label="Experience" value={wExp} onChange={e => setWExp(e.target.value)} options={expOptions} />
                      <div style={{ background: '#EAF3DE', borderRadius: 10, padding: '12px 14px', marginBottom: 18, fontSize: 13, color: '#27500A' }}>
                        ✓ Free to register · ₹500 joining bonus for first 3 jobs · Get paid in 24 hours
                      </div>
                      <button type="submit" disabled={loading || !wName || !wPhone || !wCity || !wSkill} style={{
                        width: '100%', padding: '14px', borderRadius: 100, border: 'none',
                        background: loading ? '#ccc' : 'var(--gold)', color: 'var(--ink)',
                        fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)',
                        cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', marginTop: 8,
                      }}>
                        {loading ? 'Submitting...' : 'Register as Worker →'}
                      </button>
                    </form>
                  )}
                </div>
              </Anim>
            </>
          ) : (
            <Anim>
              <div style={{ textAlign: 'center', background: 'white', borderRadius: 20, padding: '56px 32px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32 }}>✓</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, marginBottom: 10, color: 'var(--ink)' }}>You're on the list!</h2>
                <p style={{ fontSize: 15, color: '#666', lineHeight: 1.7, maxWidth: 360, margin: '0 auto 28px' }}>
                  Thanks for joining. We'll reach out on WhatsApp when SkillRank launches in your area. Tell your friends!
                </p>
                <button onClick={() => setSubmitted(false)} style={{
                  background: 'var(--ink)', border: 'none', padding: '12px 28px',
                  borderRadius: 100, fontSize: 14, fontWeight: 600, color: 'white',
                  fontFamily: 'var(--font-body)', cursor: 'pointer',
                }}>Back to form</button>
              </div>
            </Anim>
          )}

          {/* Contact info */}
          <Anim delay={0.2} style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '📧', label: 'Email', value: 'hello@skillrank.in' },
              { icon: '📍', label: 'Location', value: 'Kolkata, WB, India' },
              { icon: '📱', label: 'WhatsApp', value: '+91 XXXXX XXXXX' },
              { icon: '🕐', label: 'Response time', value: 'Within 24 hours' },
            ].map(c => (
              <div key={c.label} style={{ background: 'var(--paper2)', borderRadius: 14, padding: '16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{c.value}</div>
                </div>
              </div>
            ))}
          </Anim>
        </div>
      </section>
    </div>
  )
}
