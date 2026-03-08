'use client'
import { useState } from 'react'

const JOBS = [
  { id: 'j1', customer: 'Mehul Shah', phone: '9909090909', address: 'Alkapuri, Vadodara', service: 'AC Repair', ac: 'Split AC', date: '2025-06-10', time: '10AM–12PM', problem: 'Not cooling', status: 'assigned' },
  { id: 'j2', customer: 'Sneha Joshi', phone: '9876543210', address: 'Gotri, Vadodara', service: 'Deep Cleaning', ac: 'Split AC', date: '2025-06-10', time: '2PM–4PM', problem: 'Annual cleaning', status: 'assigned' },
  { id: 'j3', customer: 'Kiran Patel', phone: '9988776655', address: 'Fatehgunj, Vadodara', service: 'Gas Refill', ac: 'Window AC', date: '2025-06-09', time: '11AM–1PM', problem: 'Low cooling', status: 'completed' },
]

const C = { dark: '#020c18', card: 'rgba(7,30,52,0.8)', border: 'rgba(0,180,255,0.15)', ice: '#00d4ff', muted: '#7ba8c4', white: '#f0f8ff' }

export default function TechnicianDashboard() {
  const [authed, setAuthed] = useState(false)
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const [jobs, setJobs] = useState(JOBS)

  const login = () => {
    if (id === 'TECH001' && pw === 'tech123') { setAuthed(true); setErr(false) }
    else setErr(true)
  }
  const update = (jobId: string, status: string) => setJobs(p => p.map(j => j.id === jobId ? { ...j, status } : j))

  if (!authed) return (
    <div style={{ minHeight: '100vh', background: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 24, padding: 40, width: '100%', maxWidth: 380, textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔧</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: C.white, marginBottom: 8 }}>Technician Login</h1>
        <p style={{ color: C.muted, fontSize: '0.85rem', marginBottom: 32 }}>Relax Aircon — Field App</p>
        <input placeholder="Technician ID" value={id} onChange={e => setId(e.target.value)}
          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: `1px solid ${err ? '#ff6b6b' : C.border}`, color: C.white, borderRadius: 12, padding: '12px 16px', fontSize: '1rem', outline: 'none', textAlign: 'center', marginBottom: 10, fontFamily: 'inherit' }} />
        <input type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: `1px solid ${err ? '#ff6b6b' : C.border}`, color: C.white, borderRadius: 12, padding: '12px 16px', fontSize: '1rem', outline: 'none', textAlign: 'center', marginBottom: 8, fontFamily: 'inherit' }} />
        {err && <p style={{ color: '#ff6b6b', fontSize: '0.8rem', marginBottom: 8 }}>Invalid. Try TECH001 / tech123</p>}
        <button onClick={login} style={{ width: '100%', background: 'linear-gradient(135deg,#00d4ff,#0099cc)', color: C.dark, fontWeight: 700, padding: 14, borderRadius: 50, border: 'none', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }}>Login →</button>
        <p style={{ color: 'rgba(123,168,196,0.4)', fontSize: '0.75rem', marginTop: 16 }}>Demo: TECH001 / tech123</p>
      </div>
    </div>
  )

  const pending = jobs.filter(j => j.status === 'assigned')
  const done = jobs.filter(j => j.status === 'completed')

  return (
    <div style={{ minHeight: '100vh', background: C.dark, color: C.white }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: `1px solid ${C.border}`, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 40, backdropFilter: 'blur(20px)' }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 600 }}>🔧 Ravi Patel</div>
          <div style={{ color: C.muted, fontSize: '0.75rem' }}>Technician — Relax Aircon</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '4px 12px', borderRadius: 50 }}>● Available</span>
          <button onClick={() => setAuthed(false)} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.muted, padding: '6px 16px', borderRadius: 50, cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>Logout</button>
        </div>
      </div>

      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 28 }}>
          {[['Today\'s Jobs', jobs.length, C.ice], ['Pending', pending.length, '#f59e0b'], ['Completed', done.length, '#10b981']].map(([l, v, c]) => (
            <div key={l as string} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: c as string }}>{v}</div>
              <div style={{ color: C.muted, fontSize: '0.8rem', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: C.white, marginBottom: 16 }}>Today's Jobs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {jobs.map(j => (
            <div key={j.id} style={{ background: C.card, border: `1px solid ${j.status === 'completed' ? 'rgba(16,185,129,0.2)' : C.border}`, borderRadius: 20, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1rem', color: C.white }}>{j.customer}</div>
                  <a href={`tel:${j.phone}`} style={{ color: C.ice, fontSize: '0.85rem', textDecoration: 'none' }}>📞 {j.phone}</a>
                </div>
                <span style={{ fontSize: '0.7rem', padding: '4px 12px', borderRadius: 50, background: j.status === 'completed' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: j.status === 'completed' ? '#10b981' : '#f59e0b' }}>{j.status}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                {[['Service', j.service], ['AC Type', j.ac], ['Time', j.time], ['Problem', j.problem]].map(([k, v]) => (
                  <div key={k} style={{ background: 'rgba(0,180,255,0.04)', borderRadius: 10, padding: '8px 12px' }}>
                    <div style={{ color: C.muted, fontSize: '0.7rem', marginBottom: 2 }}>{k}</div>
                    <div style={{ color: C.white, fontSize: '0.85rem', fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(0,180,255,0.04)', borderRadius: 10, padding: '8px 12px', marginBottom: 14 }}>
                <div style={{ color: C.muted, fontSize: '0.7rem', marginBottom: 2 }}>Address</div>
                <div style={{ color: C.white, fontSize: '0.85rem' }}>📍 {j.address}</div>
              </div>
              {j.status !== 'completed' && (
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href={`https://wa.me/91${j.phone}`} target="_blank" style={{ flex: 1, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', color: '#25d366', padding: '10px', borderRadius: 12, textAlign: 'center', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>WhatsApp</a>
                  <button onClick={() => update(j.id, 'completed')} style={{ flex: 1, background: 'linear-gradient(135deg,#10b981,#059669)', color: 'white', border: 'none', padding: '10px', borderRadius: 12, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'inherit' }}>✅ Mark Complete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
