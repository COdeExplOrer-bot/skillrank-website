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
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(28px)', transition: `all 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style }}>{children}</div>
}

export default function HowItWorks({ navigate }) {
  const [tab, setTab] = useState('customer')

  const customerSteps = [
    { n: '01', icon: '📍', title: 'Open SkillRank', desc: 'Search for your service or tap "Get Help Fast" for emergency booking. Your location is detected automatically.' },
    { n: '02', icon: '🗺️', title: 'See workers near you', desc: 'A live map shows available, verified workers nearby. Filter by rank, price, or distance.' },
    { n: '03', icon: '👤', title: 'View profiles & rank', desc: 'Every worker has a verified profile with rank (Bronze to Platinum), ratings, job count, and customer reviews.' },
    { n: '04', icon: '📅', title: 'Book instantly or schedule', desc: 'Emergency booking sends your request to nearby workers. First to accept is assigned. Or schedule for a specific time.' },
    { n: '05', icon: '📍', title: 'Track in real time', desc: 'Once booked, track your worker on a live map with ETA. Call them directly if needed.' },
    { n: '06', icon: '✅', title: 'Pay safely & rate', desc: 'Payment is held in escrow until job is confirmed complete. Release via UPI in one tap. Rate your worker to help the community.' },
  ]

  const workerSteps = [
    { n: '01', icon: '📝', title: 'Register free', desc: 'Sign up with your phone number and a selfie. List your skills. No upfront payment, no Aadhaar required to start.' },
    { n: '02', icon: '✅', title: 'Get verified', desc: 'Complete eKYC via DigiLocker to boost your Trust Score. Verified workers get priority in search results.' },
    { n: '03', icon: '🟢', title: 'Go online', desc: 'Toggle your availability. Job requests come in as notifications with job details, location, estimated pay, and customer rating.' },
    { n: '04', icon: '⚡', title: 'Accept jobs', desc: 'Accept or decline any job. Complete the work, upload before/after proof photos, and mark it done.' },
    { n: '05', icon: '₹', title: 'Get paid in 24 hours', desc: 'Earnings land in your UPI account within 24 hours of job completion. No delays, no middlemen.' },
    { n: '06', icon: '🏆', title: 'Build your rank', desc: 'Every job builds your Performance Score. Earn Bronze, Silver, Gold, Platinum — your rank is your professional identity.' },
  ]

  const steps = tab === 'customer' ? customerSteps : workerSteps

  const faqs = [
    { q: 'How are workers verified?', a: 'Workers complete phone verification on signup. Full KYC via DigiLocker is optional but increases their Trust Score. We also track job completion rates and customer ratings continuously.' },
    { q: 'What if I am unhappy with the work?', a: 'Payment is held in escrow until you confirm the job is complete. If there is a dispute, our support team reviews before releasing funds. Workers with repeated issues get their accounts reviewed.' },
    { q: 'How does the ranking system work?', a: 'Worker rank is calculated using a Performance Score: average rating (30%), completion rate (25%), repeat customer ratio (15%), on-time rate (15%), and response rate (15%). A stability buffer prevents one bad review from unfairly impacting rank.' },
    { q: 'Is SkillRank available in my city?', a: 'We are launching in Siliguri, West Bengal first. Join the waitlist and we will notify you when we expand to your city.' },
    { q: 'What does SkillRank charge?', a: 'Customers pay a small platform fee of ~10% on top of the worker\'s service charge. Workers receive their full agreed payment minus this commission. There are no hidden charges.' },
    { q: 'What is emergency booking?', a: '"Get Help Fast" broadcasts your request to the top 5 available workers within 5km simultaneously. The first one to accept is assigned. Average response time is under 10 minutes.' },
  ]

  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ background: 'var(--ink)', color: 'white', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <Anim><p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: 12 }}>How It Works</p></Anim>
          <Anim delay={0.1}><h1 style={{ fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, marginBottom: 20 }}>Simple, safe, and fast.</h1></Anim>
          <Anim delay={0.2}><p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>Whether you need a worker or you are one, SkillRank is designed to make every interaction trustworthy.</p></Anim>
        </div>
      </section>

      {/* Tab switcher */}
      <section style={{ padding: '48px 24px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Anim>
            <div style={{ display: 'flex', background: 'var(--paper2)', borderRadius: 100, padding: 4, width: 'fit-content', margin: '0 auto 48px', gap: 4 }}>
              {[['customer', 'I need a worker'], ['worker', 'I am a worker']].map(([id, label]) => (
                <button key={id} onClick={() => setTab(id)} style={{
                  padding: '12px 28px', borderRadius: 100, border: 'none', fontSize: 14, fontWeight: 600,
                  fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.25s',
                  background: tab === id ? 'var(--ink)' : 'transparent',
                  color: tab === id ? 'white' : '#666',
                }}>{label}</button>
              ))}
            </div>
          </Anim>

          {/* Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20, marginBottom: 80 }}>
            {steps.map((step, i) => (
              <Anim key={step.n} delay={i * 0.07}>
                <div style={{ display: 'flex', gap: 16, padding: '24px', background: 'white', borderRadius: 16, border: '1px solid rgba(0,0,0,0.07)', height: '100%' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, color: 'var(--accent)', letterSpacing: '0.06em', marginBottom: 4 }}>{step.n}</div>
                    <div style={{ fontSize: 28 }}>{step.icon}</div>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>{step.desc}</p>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* Safety section */}
      <section style={{ padding: '80px 24px', background: 'var(--paper2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Anim style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>Safety First</p>
            <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800 }}>Built for trust at every step</h2>
          </Anim>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { icon: '🔒', title: 'Escrow Payments', desc: 'Money held safely until job is confirmed complete by both sides.' },
              { icon: '🆔', title: 'Verified Identity', desc: 'Phone verification on all accounts. Optional eKYC for higher trust score.' },
              { icon: '🚨', title: 'SOS Button', desc: 'Both workers and customers can trigger an SOS if they feel unsafe.' },
              { icon: '⭐', title: 'Transparent Ratings', desc: 'Every job generates a rating. Fake reviews are detected by our fraud system.' },
              { icon: '📷', title: 'Work Proof', desc: 'Workers upload before/after photos for every job. Disputes resolved with evidence.' },
              { icon: '🛡️', title: 'Fraud Detection', desc: 'Automated monitoring flags suspicious patterns: fake ratings, off-platform contact, location mismatches.' },
            ].map((f, i) => (
              <Anim key={f.title} delay={i * 0.07}>
                <div style={{ background: 'white', borderRadius: 16, padding: '24px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </Anim>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Anim style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>FAQ</p>
            <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800 }}>Common questions</h2>
          </Anim>
          {faqs.map((faq, i) => (
            <Anim key={i} delay={i * 0.05}>
              <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '20px 0',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                }}>
                  <span style={{ fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>{faq.q}</span>
                  <span style={{ fontSize: 20, color: 'var(--accent)', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                  <p style={{ fontSize: 15, color: '#555', lineHeight: 1.75, paddingBottom: 20 }}>{faq.a}</p>
                </div>
              </div>
            </Anim>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 24px', background: 'var(--ink)', textAlign: 'center' }}>
        <Anim>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: 'white', marginBottom: 16 }}>Ready to get started?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>Join our waitlist and be first when we launch.</p>
          <button onClick={() => navigate('contact')} style={{
            background: 'var(--accent)', border: 'none', padding: '16px 40px',
            borderRadius: 100, fontSize: 15, fontWeight: 700, color: 'white',
            fontFamily: 'var(--font-body)', cursor: 'pointer',
          }}>Join Waitlist →</button>
        </Anim>
      </section>
    </div>
  )
}
