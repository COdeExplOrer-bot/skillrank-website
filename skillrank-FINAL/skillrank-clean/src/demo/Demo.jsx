import React, { useState, useEffect, useCallback, useRef } from 'react'
import { WORKERS, SERVICE_TYPES, getEstimate, JOB_STATUSES } from './demoData.js'

// ─── TINY HELPERS ───────────────────────────────────────────────────────────

function Avatar({ initials, color, size = 40 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.32, color: '#fff', flexShrink: 0 }}>
      {initials}
    </div>
  )
}

function RankBadge({ rank, color, bg }) {
  return <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: bg, color, letterSpacing: '0.06em' }}>{rank.toUpperCase()}</span>
}

function Stars({ n = 5 }) {
  return <span style={{ color: '#F5A623', fontSize: 13, letterSpacing: 1 }}>{'★'.repeat(Math.round(n))}{'☆'.repeat(5 - Math.round(n))}</span>
}

function Btn({ children, onClick, color = '#E8420A', textColor = '#fff', outline = false, disabled = false, small = false, full = false, style = {} }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: full ? '100%' : 'auto',
        padding: small ? '8px 16px' : '11px 22px',
        borderRadius: 100,
        border: outline ? `1.5px solid ${color}` : 'none',
        background: disabled ? '#e0e0e0' : outline ? (hov ? color : 'transparent') : (hov ? '#c73408' : color),
        color: disabled ? '#aaa' : outline ? (hov ? '#fff' : color) : textColor,
        fontSize: small ? 12 : 13,
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.18s',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >{children}</button>
  )
}

function Tag({ children, color = '#E8420A', bg = '#FEE8E2' }) {
  return <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 100, background: bg, color }}>{children}</span>
}

function Pulse({ color = '#22c55e' }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 10, height: 10 }}>
      <span style={{ position: 'absolute', width: 10, height: 10, borderRadius: '50%', background: color, opacity: 0.3, animation: 'pulse-dot 2s ease-in-out infinite' }} />
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, position: 'relative' }} />
    </span>
  )
}

// ─── PHONE SHELL ─────────────────────────────────────────────────────────────

function Phone({ label, labelColor = '#E8420A', children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: labelColor, marginBottom: 10, padding: '4px 14px', background: labelColor + '18', borderRadius: 100 }}>{label}</div>
      <div style={{
        width: 340, background: '#0F0F0F', borderRadius: 44, padding: '14px 10px 20px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)',
        position: 'relative',
      }}>
        {/* Notch */}
        <div style={{ width: 100, height: 28, background: '#0F0F0F', borderRadius: 14, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' }} />
          <div style={{ width: 60, height: 6, borderRadius: 3, background: '#1a1a1a' }} />
        </div>
        {/* Screen */}
        <div style={{ borderRadius: 32, overflow: 'hidden', height: 620, background: '#FAFAF7', position: 'relative' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── STATUS BAR ──────────────────────────────────────────────────────────────

function StatusBar({ light = false }) {
  const c = light ? 'rgba(255,255,255,0.8)' : '#555'
  return (
    <div style={{ height: 32, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10, fontWeight: 600, color: c, background: 'transparent' }}>
      <span>9:41</span><span>●●●●</span><span>100%</span>
    </div>
  )
}

// ─── TAB BAR ─────────────────────────────────────────────────────────────────

function TabBar({ tabs, active, onSelect }) {
  return (
    <div style={{ display: 'flex', borderTop: '0.5px solid rgba(0,0,0,0.08)', background: '#FAFAF7', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onSelect(t.id)} style={{
          flex: 1, padding: '8px 4px 10px', border: 'none', background: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: active === t.id ? '#E8420A' : '#aaa', fontSize: 9, fontWeight: 600,
          fontFamily: 'var(--font-body)', letterSpacing: '0.04em', textTransform: 'uppercase',
          transition: 'color 0.15s',
        }}>
          <span style={{ fontSize: 18 }}>{t.icon}</span>{t.label}
        </button>
      ))}
    </div>
  )
}

// ─── SHARED ACTIVITY LOG ─────────────────────────────────────────────────────

function ActivityLog({ log }) {
  const ref = useRef(null)
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight }, [log])
  return (
    <div style={{ background: '#0F0F0F', borderRadius: 16, padding: '16px', height: 180, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: 10 }}>Live Activity Feed</div>
      <div ref={ref} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {log.map((entry, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', animation: i === log.length - 1 ? 'fadeIn 0.3s ease' : 'none' }}>
            <span style={{ fontSize: 12, flexShrink: 0 }}>{entry.icon}</span>
            <span style={{ fontSize: 11, color: '#aaa', lineHeight: 1.4 }}><span style={{ color: entry.color || '#fff', fontWeight: 600 }}>{entry.actor}</span> {entry.text}</span>
            <span style={{ fontSize: 10, color: '#444', marginLeft: 'auto', flexShrink: 0 }}>{entry.time}</span>
          </div>
        ))}
        {log.length === 0 && <div style={{ fontSize: 11, color: '#333', textAlign: 'center', marginTop: 20 }}>Activity will appear here...</div>}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CUSTOMER APP
// ═══════════════════════════════════════════════════════════════════════════════

function CustomerApp({ job, onPostJob, onConfirmComplete, onRateWorker, workerOnline }) {
  const [screen, setScreen] = useState('home')
  const [selectedService, setSelectedService] = useState(null)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [problem, setProblem] = useState('')
  const [rating, setRating] = useState(5)
  const [hovStar, setHovStar] = useState(0)
  const [filterService, setFilterService] = useState('All')
  const [cTab, setCTab] = useState('home')

  // React to job status changes
  useEffect(() => {
    if (job.status === JOB_STATUSES.ACCEPTED) setScreen('tracking')
    if (job.status === JOB_STATUSES.COMPLETED) setScreen('confirm')
    if (job.status === JOB_STATUSES.RATED) { setScreen('home'); setCTab('home') }
  }, [job.status])

  const filteredWorkers = WORKERS.filter(w => filterService === 'All' || w.skill === filterService)

  const handlePostJob = () => {
    if (!selectedWorker) return
    onPostJob({ worker: selectedWorker, service: selectedService, problem })
    setScreen('waiting')
  }

  const content = () => {
    // ── HOME ──
    if (screen === 'home' || cTab === 'home') return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 60 }}>
        <div style={{ background: 'linear-gradient(135deg,#0F0F23,#1A3C8F)', padding: '20px 16px 24px' }}>
          <StatusBar light />
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 2 }}>Good morning,</div>
          <div style={{ color: '#fff', fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 16 }}>Priya Mehta 👋</div>
          <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', borderRadius: 16, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Need urgent help?</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 10 }}>Get a worker in ~10 minutes</div>
            <Btn onClick={() => { setCTab('search'); setScreen('search') }} color='#E8420A' full>🚨 Emergency Booking</Btn>
          </div>
        </div>
        <div style={{ padding: '16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999', marginBottom: 10 }}>Browse Services</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
            {SERVICE_TYPES.map(s => (
              <button key={s.name} onClick={() => { setFilterService(s.name); setCTab('search'); setScreen('search') }} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 12, padding: '12px 6px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#444' }}>{s.name}</div>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999', marginBottom: 10 }}>Recent Jobs</div>
          <div style={{ background: 'white', borderRadius: 12, padding: '12px', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Plumbing — Pipe leak</div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Ajay K. · 2 days ago · ₹380</div>
            </div>
            <Tag color='#0A7A55' bg='#EAF3DE'>Done ✓</Tag>
          </div>
        </div>
      </div>
    )

    // ── SEARCH / WORKER LIST ──
    if (screen === 'search' || cTab === 'search') return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: 60 }}>
        <div style={{ padding: '12px 14px 0' }}>
          <StatusBar />
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 10 }}>Find Workers</div>
          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 10, scrollbarWidth: 'none' }}>
            {['All', ...SERVICE_TYPES.map(s => s.name)].map(f => (
              <button key={f} onClick={() => setFilterService(f)} style={{ flexShrink: 0, padding: '5px 12px', borderRadius: 100, border: `1.5px solid ${filterService === f ? '#E8420A' : 'rgba(0,0,0,0.12)'}`, background: filterService === f ? '#FEE8E2' : 'transparent', color: filterService === f ? '#E8420A' : '#555', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 14px 0' }}>
          {filteredWorkers.map(w => (
            <div key={w.id} onClick={() => { setSelectedWorker(w); setSelectedService(w.skill); setScreen('worker-profile') }} style={{ background: 'white', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 14, padding: '12px', marginBottom: 10, cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <Avatar initials={w.initials} color={w.color} size={42} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{w.name}</div>
                    <Stars n={w.rating} />
                  </div>
                  <div style={{ fontSize: 12, color: '#777', marginTop: 1 }}>{w.skill} · {w.exp}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                <RankBadge rank={w.rank} color={w.rankColor} bg={w.rankBg} />
                <span style={{ fontSize: 11, color: '#888' }}>{w.distance} km</span>
                <span style={{ fontSize: 11, color: '#888' }}>{w.jobs} jobs</span>
                {w.online ? <Tag color='#0A7A55' bg='#EAF3DE'>● Online</Tag> : <Tag color='#888' bg='#eee'>Offline</Tag>}
                <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: '#0A7A55' }}>₹{getEstimate(w.skill)} est.</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )

    // ── WORKER PROFILE ──
    if (screen === 'worker-profile' && selectedWorker) return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'linear-gradient(135deg,#0F0F23,#1A3C8F)', padding: '12px 16px 20px' }}>
          <StatusBar light />
          <button onClick={() => setScreen('search')} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 100, padding: '5px 12px', fontSize: 12, color: 'white', cursor: 'pointer', marginBottom: 10, fontFamily: 'var(--font-body)' }}>← Back</button>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar initials={selectedWorker.initials} color={selectedWorker.color} size={52} />
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>{selectedWorker.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{selectedWorker.skill} · {selectedWorker.distance} km away</div>
              <div style={{ marginTop: 5, display: 'flex', gap: 6 }}>
                <RankBadge rank={selectedWorker.rank} color={selectedWorker.rankColor} bg={selectedWorker.rankBg} />
                {selectedWorker.online ? <Tag color='#22c55e' bg='rgba(34,197,94,0.2)'>● Online now</Tag> : <Tag color='#888' bg='rgba(0,0,0,0.2)'>Offline</Tag>}
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px', paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            {[['⭐ ' + selectedWorker.rating, 'Rating'], [selectedWorker.jobs, 'Jobs Done'], [selectedWorker.completion + '%', 'Completion'], [selectedWorker.repeat + '%', 'Repeat Customers']].map(([v, l]) => (
              <div key={l} style={{ background: '#F5F5F2', borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>{v}</div>
                <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#aaa', marginBottom: 8 }}>Skills</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            {selectedWorker.skills.map(s => <span key={s} style={{ fontSize: 11, padding: '4px 10px', background: '#F0EEF9', color: '#5B3EBB', borderRadius: 100, fontWeight: 500 }}>{s}</span>)}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#aaa', marginBottom: 8 }}>Recent Reviews</div>
          {selectedWorker.reviews.map((r, i) => (
            <div key={i} style={{ background: '#F5F5F2', borderRadius: 10, padding: '10px 12px', marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: '#333', lineHeight: 1.5 }}>"{r.text}"</div>
              <div style={{ fontSize: 10, color: '#888', marginTop: 4 }}>— {r.by}</div>
            </div>
          ))}
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#aaa', margin: '14px 0 8px' }}>Describe Your Problem</div>
          <textarea value={problem} onChange={e => setProblem(e.target.value)} placeholder="E.g. Geyser not heating water..." rows={3} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid rgba(0,0,0,0.12)', fontSize: 13, fontFamily: 'var(--font-body)', resize: 'none', outline: 'none', background: 'white' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px', background: '#FAFAF7', borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#888' }}>Estimated cost</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#0A7A55' }}>₹{getEstimate(selectedWorker.skill)}</span>
          </div>
          <Btn onClick={handlePostJob} disabled={!selectedWorker.online} full color='#E8420A'>{selectedWorker.online ? `Book ${selectedWorker.name.split(' ')[0]} →` : 'Worker is Offline'}</Btn>
        </div>
      </div>
    )

    // ── WAITING FOR ACCEPTANCE ──
    if (screen === 'waiting') return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        <StatusBar />
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FEE8E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 20, animation: 'pulse-dot 2s ease-in-out infinite' }}>📡</div>
        <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 8 }}>Finding your worker...</div>
        <div style={{ fontSize: 13, color: '#888', lineHeight: 1.6, marginBottom: 24 }}>Request sent to {job.worker?.name || 'nearby workers'}. Waiting for acceptance...</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[0.1, 0.2, 0.3].map(d => <div key={d} style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8420A', animation: `pulse-dot 1.2s ease-in-out ${d}s infinite` }} />)}
        </div>
        <div style={{ marginTop: 24, background: '#F5F5F2', borderRadius: 14, padding: '12px 16px', width: '100%' }}>
          <div style={{ fontSize: 12, color: '#888' }}>Sent to</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
            <Avatar initials={job.worker?.initials} color={job.worker?.color} size={36} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{job.worker?.name}</div>
              <div style={{ fontSize: 11, color: '#888' }}>{job.worker?.skill} · {job.worker?.distance} km</div>
            </div>
          </div>
        </div>
      </div>
    )

    // ── TRACKING ──
    if (screen === 'tracking') return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'linear-gradient(135deg,#0A7A55,#0F5E3A)', padding: '12px 16px 16px' }}>
          <StatusBar light />
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginBottom: 2 }}>Job Accepted!</div>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{job.worker?.name} is on the way</div>
        </div>
        {/* Map placeholder */}
        <div style={{ height: 180, background: '#E8F4E8', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,100,50,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,100,50,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 28, animation: 'float 3s ease-in-out infinite' }}>🛵</div>
            <div style={{ fontSize: 11, color: '#0A7A55', fontWeight: 600, marginTop: 4 }}>ETA: ~8 minutes</div>
          </div>
          <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'white', borderRadius: 10, padding: '6px 10px', fontSize: 11, color: '#0A7A55', fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>📍 1.2 km</div>
        </div>
        <div style={{ flex: 1, padding: '14px', overflowY: 'auto', paddingBottom: 80 }}>
          {/* Worker card */}
          <div style={{ background: 'white', borderRadius: 14, padding: '12px', border: '1px solid rgba(0,0,0,0.07)', marginBottom: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
            <Avatar initials={job.worker?.initials} color={job.worker?.color} size={44} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{job.worker?.name}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 3 }}>
                <RankBadge rank={job.worker?.rank || 'Gold'} color={job.worker?.rankColor} bg={job.worker?.rankBg} />
                <Stars n={job.worker?.rating} />
              </div>
            </div>
            <Pulse color='#22c55e' />
          </div>
          <div style={{ background: '#FEE8E2', borderRadius: 12, padding: '10px 14px', marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: '#E8420A', fontWeight: 700, marginBottom: 2 }}>JOB DETAILS</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{job.service}</div>
            <div style={{ fontSize: 12, color: '#777', marginTop: 2 }}>{job.problem || 'Service requested'}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            <Btn onClick={() => {}} color='#1A3C8F' small full>📞 Call Worker</Btn>
            <Btn onClick={() => {}} color='#E8420A' outline small full>🚨 SOS</Btn>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px', background: '#FAFAF7', borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
          {job.status === JOB_STATUSES.ONGOING
            ? <div style={{ textAlign: 'center', padding: '10px', background: '#EAF3DE', borderRadius: 12, fontSize: 13, color: '#0A7A55', fontWeight: 600 }}>✅ Worker has arrived — Job in progress</div>
            : <div style={{ textAlign: 'center', fontSize: 13, color: '#888' }}>Waiting for worker to arrive...</div>
          }
        </div>
      </div>
    )

    // ── CONFIRM COMPLETE ──
    if (screen === 'confirm') return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20 }}>
        <StatusBar />
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)' }}>Job Complete!</div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{job.worker?.name} has marked the job done</div>
        </div>
        <div style={{ background: '#F5F5F2', borderRadius: 14, padding: '14px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#888', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase' }}>Rate {job.worker?.name}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
            {[1,2,3,4,5].map(s => (
              <button key={s} onMouseEnter={() => setHovStar(s)} onMouseLeave={() => setHovStar(0)} onClick={() => setRating(s)} style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: s <= (hovStar || rating) ? '#F5A623' : '#ddd', transition: 'color 0.1s, transform 0.1s', transform: s <= (hovStar || rating) ? 'scale(1.2)' : 'scale(1)' }}>★</button>
            ))}
          </div>
          <div style={{ textAlign: 'center', fontSize: 12, color: '#888' }}>{['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating]}</div>
        </div>
        <div style={{ background: 'white', borderRadius: 14, padding: '14px', border: '1px solid rgba(0,0,0,0.07)', marginBottom: 16 }}>
          {[['Service', `₹${getEstimate(job.worker?.skill || 'Electrician')}`], ['Platform fee (10%)', `-₹${Math.round(getEstimate(job.worker?.skill || 'Electrician') * 0.1)}`]].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666', marginBottom: 6 }}><span>{l}</span><span>{v}</span></div>
          ))}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700 }}>
            <span>Total Paid</span>
            <span style={{ color: '#0A7A55' }}>₹{Math.round(getEstimate(job.worker?.skill || 'Electrician') * 1.1)}</span>
          </div>
        </div>
        <Btn onClick={() => onRateWorker(rating)} color='#E8420A' full>Submit Rating & Pay via UPI ✓</Btn>
      </div>
    )

    return null
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF7', position: 'relative', overflow: 'hidden' }}>
      {content()}
      {['home', 'search'].includes(screen) && (
        <TabBar
          active={cTab}
          onSelect={t => { setCTab(t); if (t === 'home') setScreen('home'); if (t === 'search') setScreen('search') }}
          tabs={[{ id: 'home', icon: '🏠', label: 'Home' }, { id: 'search', icon: '🔍', label: 'Search' }, { id: 'bookings', icon: '📋', label: 'Bookings' }, { id: 'profile', icon: '👤', label: 'Profile' }]}
        />
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// WORKER APP
// ═══════════════════════════════════════════════════════════════════════════════

function WorkerApp({ job, onAccept, onReject, onArrive, onComplete, workerData = WORKERS[0] }) {
  const [screen, setScreen] = useState('home')
  const [online, setOnline] = useState(true)
  const [wTab, setWTab] = useState('home')
  const [timer, setTimer] = useState(30)
  const timerRef = useRef(null)

  useEffect(() => {
    if (job.status === JOB_STATUSES.POSTED) {
      setScreen('incoming')
      setTimer(30)
      timerRef.current = setInterval(() => {
        setTimer(t => {
          if (t <= 1) { clearInterval(timerRef.current); onReject(); return 0 }
          return t - 1
        })
      }, 1000)
    }
    if (job.status === JOB_STATUSES.ACCEPTED) { clearInterval(timerRef.current); setScreen('active') }
    if (job.status === JOB_STATUSES.COMPLETED) { setScreen('done') }
    if (job.status === JOB_STATUSES.RATED) { setScreen('home'); setWTab('home') }
    return () => clearInterval(timerRef.current)
  }, [job.status])

  const earnings = [3200, 4800, 2600, 5500, 6000, 4200, 3400]
  const maxE = Math.max(...earnings)

  const content = () => {
    // ── HOME ──
    if ((screen === 'home' || wTab === 'home') && screen !== 'incoming' && screen !== 'active' && screen !== 'done') return (
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 60 }}>
        <div style={{ background: 'linear-gradient(135deg,#1A0A2E,#2952C4)', padding: '16px 16px 20px' }}>
          <StatusBar light />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Welcome back,</div>
              <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{workerData.name}</div>
            </div>
            <RankBadge rank={workerData.rank} color={workerData.rankColor} bg={workerData.rankBg} />
          </div>
          {/* Availability toggle */}
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginBottom: 2 }}>Status</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: online ? '#4ADE80' : '#aaa', fontSize: 14, fontWeight: 700 }}>
                <Pulse color={online ? '#4ADE80' : '#888'} />
                {online ? 'Online — Accepting Jobs' : 'Offline'}
              </div>
            </div>
            <div onClick={() => setOnline(o => !o)} style={{ width: 48, height: 26, borderRadius: 13, background: online ? '#22c55e' : '#555', cursor: 'pointer', position: 'relative', transition: 'background 0.25s' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: online ? 25 : 3, transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
            </div>
          </div>
        </div>
        <div style={{ padding: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[['₹3,240', 'This week', '#0A7A55'], ['12', 'Jobs done', '#1A3C8F']].map(([v, l, c]) => (
              <div key={l} style={{ background: 'white', borderRadius: 12, padding: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: c, fontFamily: 'var(--font-display)' }}>{v}</div>
                <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#aaa', marginBottom: 8 }}>This Week's Earnings</div>
          <div style={{ background: 'white', borderRadius: 12, padding: '14px', border: '1px solid rgba(0,0,0,0.06)', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 70 }}>
              {earnings.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ width: '100%', height: (v / maxE) * 56 + 6, background: i === 4 ? '#E8420A' : '#E8E8EE', borderRadius: '3px 3px 0 0', transition: 'height 0.3s' }} />
                  <span style={{ fontSize: 9, color: '#aaa' }}>{['M','T','W','T','F','S','S'][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#aaa', marginBottom: 8 }}>Rank Progress</div>
          <div style={{ background: 'white', borderRadius: 12, padding: '14px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              {['New','Bronze','Silver','Gold','Platinum'].map((r, i) => (
                <div key={r} style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: r === workerData.rank ? '#E8420A' : '#F0F0F0', border: r === workerData.rank ? '2px solid #E8420A' : '2px solid transparent', margin: '0 auto 3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: r === workerData.rank ? '#fff' : '#aaa' }}>{r[0]}</div>
                  <div style={{ fontSize: 8, color: r === workerData.rank ? '#E8420A' : '#bbb', fontWeight: r === workerData.rank ? 700 : 400 }}>{r}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 5, background: '#F0F0F0', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '67%', background: 'linear-gradient(90deg,#E8420A,#F5A623)', borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 10, color: '#aaa', marginTop: 5 }}>67% to Platinum · Need 4.9 avg + 15 more jobs</div>
          </div>
        </div>
      </div>
    )

    // ── INCOMING JOB ──
    if (screen === 'incoming') return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'linear-gradient(135deg,#E8420A,#FF6B35)', padding: '14px 16px 16px' }}>
          <StatusBar light />
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginBottom: 2 }}>New Job Request!</div>
          <div style={{ color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: 'var(--font-display)' }}>Respond in {timer}s</div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, marginTop: 10 }}>
            <div style={{ height: '100%', width: `${(timer / 30) * 100}%`, background: 'white', borderRadius: 2, transition: 'width 1s linear' }} />
          </div>
        </div>
        <div style={{ flex: 1, padding: '14px', overflowY: 'auto' }}>
          <div style={{ background: '#FEF3D7', borderRadius: 14, padding: '14px', marginBottom: 12, border: '1px solid #F5A623' }}>
            <div style={{ fontSize: 11, color: '#B07A00', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>Job Details</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{job.service}</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>{job.problem || 'Service requested urgently'}</div>
            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#888' }}>
              <span>📍 1.2 km away</span>
              <span>💰 ₹{getEstimate(job.service || 'Electrician')} est.</span>
              <span>⏱ ~45 min</span>
            </div>
          </div>
          <div style={{ background: '#F5F5F2', borderRadius: 14, padding: '12px 14px', marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>Customer</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2952C4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13 }}>PM</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Priya Mehta</div>
                <div style={{ fontSize: 11, color: '#888' }}>Customer rating: ⭐ 4.7 · Reliable payer</div>
              </div>
            </div>
          </div>
          <div style={{ background: '#EAF3DE', borderRadius: 12, padding: '10px 14px', fontSize: 12, color: '#0A7A55', fontWeight: 600 }}>
            ✓ You earn: ₹{Math.round(getEstimate(job.service || 'Electrician') * 0.9)} after 10% platform fee
          </div>
        </div>
        <div style={{ padding: '12px 14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Btn onClick={onReject} color='#888' outline full>✗ Decline</Btn>
          <Btn onClick={onAccept} color='#0A7A55' full>✓ Accept Job</Btn>
        </div>
      </div>
    )

    // ── ACTIVE JOB ──
    if (screen === 'active') return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'linear-gradient(135deg,#0A7A55,#0F5E3A)', padding: '14px 16px 16px' }}>
          <StatusBar light />
          <Tag color='#fff' bg='rgba(255,255,255,0.2)'>● ACTIVE JOB</Tag>
          <div style={{ color: '#fff', fontSize: 17, fontWeight: 700, fontFamily: 'var(--font-display)', marginTop: 6 }}>{job.service}</div>
        </div>
        <div style={{ flex: 1, padding: '14px', overflowY: 'auto', paddingBottom: 90 }}>
          {/* Map */}
          <div style={{ height: 150, background: '#E8F4E8', borderRadius: 14, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,100,50,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,100,50,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 32, animation: 'pulse-dot 2s ease-in-out infinite' }}>📍</div>
              <div style={{ fontSize: 11, color: '#0A7A55', fontWeight: 600 }}>Flat 4B, Sunrise Apt</div>
              <div style={{ fontSize: 11, color: '#0A7A55' }}>Pradhan Nagar · 1.2 km</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            <Btn onClick={() => {}} color='#1A3C8F' small full>📞 Call Customer</Btn>
            <Btn onClick={() => {}} color='#0A7A55' small full>🗺 Navigate</Btn>
          </div>
          <div style={{ background: '#FEE8E2', borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: '#E8420A', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Problem Description</div>
            <div style={{ fontSize: 13, color: '#444' }}>{job.problem || 'Service requested urgently'}</div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#aaa', marginBottom: 8 }}>Upload Work Proof</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {['📷 Before Photo', '📷 After Photo'].map(l => (
              <div key={l} style={{ height: 72, border: '1.5px dashed rgba(0,0,0,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#aaa', cursor: 'pointer' }}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px', background: '#FAFAF7', borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
          {job.status === JOB_STATUSES.ACCEPTED
            ? <Btn onClick={onArrive} color='#1A3C8F' full>✓ I Have Arrived</Btn>
            : <Btn onClick={onComplete} color='#0A7A55' full>✅ Mark Job Complete</Btn>
          }
        </div>
      </div>
    )

    // ── DONE ──
    if (screen === 'done') return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        <StatusBar />
        <div style={{ fontSize: 56, marginBottom: 12 }}>🏆</div>
        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 6 }}>Job Complete!</div>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>Waiting for customer to confirm...</div>
        <div style={{ background: '#EAF3DE', borderRadius: 14, padding: '16px 20px', width: '100%', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#0A7A55', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Expected Payout</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#0A7A55', fontFamily: 'var(--font-display)' }}>₹{Math.round(getEstimate(job.service || 'Electrician') * 0.9)}</div>
          <div style={{ fontSize: 11, color: '#0A7A55', marginTop: 2 }}>Paid to your UPI within 24 hours</div>
        </div>
        <div style={{ background: '#F5F5F2', borderRadius: 14, padding: '12px 16px', width: '100%', fontSize: 13, color: '#888', lineHeight: 1.6 }}>
          ⭐ A good rating from Priya will help your rank progress to Platinum!
        </div>
      </div>
    )

    return null
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFAF7', position: 'relative', overflow: 'hidden' }}>
      {content()}
      {['home', 'jobs', 'earnings', 'profile'].includes(screen) && (
        <TabBar
          active={wTab}
          onSelect={t => { setWTab(t); setScreen(t) }}
          tabs={[{ id: 'home', icon: '🏠', label: 'Home' }, { id: 'jobs', icon: '💼', label: 'Jobs' }, { id: 'earnings', icon: '₹', label: 'Earn' }, { id: 'profile', icon: '👤', label: 'Profile' }]}
        />
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DEMO PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function Demo() {
  const [job, setJob] = useState({ status: JOB_STATUSES.IDLE, worker: null, service: null, problem: '' })
  const [log, setLog] = useState([])

  const now = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  const addLog = useCallback((icon, actor, text, color) => {
    setLog(l => [...l, { icon, actor, text, color, time: now() }])
  }, [])

  const onPostJob = useCallback((data) => {
    setJob({ status: JOB_STATUSES.POSTED, worker: data.worker, service: data.service, problem: data.problem })
    addLog('📤', 'Priya', `posted a job for ${data.service}`, '#2952C4')
    addLog('📡', 'System', `matched request to ${data.worker.name}`, '#888')
  }, [addLog])

  const onAccept = useCallback(() => {
    setJob(j => ({ ...j, status: JOB_STATUSES.ACCEPTED }))
    addLog('✅', job.worker?.name, 'accepted the job', '#0A7A55')
    addLog('🛵', job.worker?.name, 'is heading to customer', '#0A7A55')
  }, [job.worker, addLog])

  const onReject = useCallback(() => {
    setJob(j => ({ ...j, status: JOB_STATUSES.REJECTED }))
    addLog('❌', job.worker?.name || 'Worker', 'declined or timed out', '#E8420A')
    setTimeout(() => setJob({ status: JOB_STATUSES.IDLE, worker: null, service: null, problem: '' }), 2000)
  }, [job.worker, addLog])

  const onArrive = useCallback(() => {
    setJob(j => ({ ...j, status: JOB_STATUSES.ONGOING }))
    addLog('📍', job.worker?.name, 'arrived at customer location', '#0A7A55')
  }, [job.worker, addLog])

  const onComplete = useCallback(() => {
    setJob(j => ({ ...j, status: JOB_STATUSES.COMPLETED }))
    addLog('🏁', job.worker?.name, 'marked job as complete', '#F5A623')
    addLog('⏳', 'System', 'waiting for customer confirmation', '#888')
  }, [job.worker, addLog])

  const onRateWorker = useCallback((rating) => {
    setJob(j => ({ ...j, status: JOB_STATUSES.RATED }))
    addLog('⭐', 'Priya', `rated ${job.worker?.name} ${rating}/5 stars`, '#F5A623')
    addLog('💸', 'System', `₹${Math.round(getEstimate(job.service || 'Electrician') * 0.9)} sent to ${job.worker?.name}'s UPI`, '#0A7A55')
    addLog('📈', 'System', `${job.worker?.name}'s rank score updated`, '#2952C4')
    setTimeout(() => {
      setJob({ status: JOB_STATUSES.IDLE, worker: null, service: null, problem: '' })
      setLog([])
    }, 5000)
  }, [job.worker, job.service, addLog])

  // Status pill
  const statusMap = {
    [JOB_STATUSES.IDLE]: ['No active job', '#888', '#F0F0F0'],
    [JOB_STATUSES.POSTED]: ['Job Posted — Waiting for worker', '#B07A00', '#FEF3D7'],
    [JOB_STATUSES.MATCHED]: ['Matched — Waiting for response', '#1A3C8F', '#E6F1FF'],
    [JOB_STATUSES.ACCEPTED]: ['Accepted — Worker on the way', '#0A7A55', '#EAF3DE'],
    [JOB_STATUSES.ONGOING]: ['Ongoing — Job in progress', '#2952C4', '#E6F1FF'],
    [JOB_STATUSES.COMPLETED]: ['Completed — Awaiting rating', '#F5A623', '#FEF3D7'],
    [JOB_STATUSES.RATED]: ['Rated & Paid ✓', '#0A7A55', '#EAF3DE'],
    [JOB_STATUSES.REJECTED]: ['Declined — Searching again...', '#E8420A', '#FEE8E2'],
  }
  const [statusLabel, statusColor, statusBg] = statusMap[job.status] || statusMap[JOB_STATUSES.IDLE]

  return (
    <div style={{ paddingTop: 68, background: '#0A0A0A', minHeight: '100vh', color: 'white' }}>
      {/* Header */}
      <div style={{ background: '#111', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E8420A', marginBottom: 4 }}>Interactive Demo</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(20px,3vw,30px)', marginBottom: 4 }}>SkillRank — Live Prototype</h1>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', maxWidth: 500 }}>Post a job as a customer and respond as a worker. Both sides update in real time — no backend needed.</p>
            </div>
            <div style={{ background: statusBg, borderRadius: 100, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Pulse color={statusColor} />
              <span style={{ fontSize: 13, fontWeight: 600, color: statusColor }}>{statusLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div style={{ background: '#151515', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '14px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 24, overflowX: 'auto', flexWrap: 'wrap' }}>
          {[
            ['1', 'Customer: Tap a service or Search, pick a worker, tap Book'],
            ['2', 'Worker: See the incoming request with countdown, Accept or Decline'],
            ['3', 'Worker: Tap "I Have Arrived" then "Mark Complete"'],
            ['4', 'Customer: Rate the worker and pay — see everything update live'],
          ].map(([n, t]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#E8420A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{n}</div>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Phone label="Customer — Priya Mehta" labelColor="#2952C4">
            <CustomerApp job={job} onPostJob={onPostJob} onConfirmComplete={onComplete} onRateWorker={onRateWorker} />
          </Phone>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 280, flexShrink: 0, paddingTop: 40 }}>
            <ActivityLog log={log} />
            <div style={{ background: '#151515', borderRadius: 14, padding: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: 12 }}>Job State</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {Object.values(JOB_STATUSES).map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: job.status === s ? '#E8420A' : '#222', border: `1px solid ${job.status === s ? '#E8420A' : '#333'}`, transition: 'all 0.3s' }} />
                    <span style={{ fontSize: 11, color: job.status === s ? '#fff' : '#444', fontWeight: job.status === s ? 700 : 400, textTransform: 'capitalize', transition: 'color 0.3s' }}>{s.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Phone label="Worker — Ramesh Sharma" labelColor="#F5A623">
            <WorkerApp job={job} onAccept={onAccept} onReject={onReject} onArrive={onArrive} onComplete={onComplete} />
          </Phone>
        </div>
      </div>
    </div>
  )
}
