'use client'
import { useState } from 'react'

const BOOKINGS = [
  { id: '1', name: 'Mehul Shah', phone: '9909090909', address: 'Alkapuri, Vadodara', service: 'AC Repair', ac: 'Split AC', date: '2025-06-10', time: '10AM–12PM', status: 'pending' },
  { id: '2', name: 'Priya Desai', phone: '9898989898', address: 'Fatehgunj, Vadodara', service: 'Gas Refill', ac: 'Window AC', date: '2025-06-10', time: '2PM–4PM', status: 'completed' },
  { id: '3', name: 'Amit Trivedi', phone: '9090909090', address: 'Manjalpur, Vadodara', service: 'Deep Cleaning', ac: 'Split AC', date: '2025-06-10', time: '11AM–1PM', status: 'in-progress' },
  { id: '4', name: 'Sneha Joshi', phone: '9876543210', address: 'Gotri, Vadodara', service: 'Installation', ac: 'Cassette AC', date: '2025-06-11', time: '9AM–11AM', status: 'pending' },
]
const TECHS = [
  { id: 't1', name: 'Ravi Patel', phone: '9876543210', available: true, jobs: 142, rating: 4.9 },
  { id: 't2', name: 'Suresh Kumar', phone: '9876543211', available: false, jobs: 98, rating: 4.8 },
  { id: 't3', name: 'Deepak Shah', phone: '9876543212', available: true, jobs: 76, rating: 4.7 },
]

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const [bookings, setBookings] = useState(BOOKINGS)
  const [tab, setTab] = useState('overview')

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    inProgress: bookings.filter(b => b.status === 'in-progress').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  }

  const login = () => pw === 'admin123' ? (setAuthed(true), setErr(false)) : setErr(true)
  const updateStatus = (id: string, status: string) => setBookings(p => p.map(b => b.id === id ? { ...b, status } : b))

  const C = { dark: '#020c18', card: 'rgba(7,30,52,0.8)', border: 'rgba(0,180,255,0.15)', ice: '#00d4ff', muted: '#7ba8c4', white: '#f0f8ff' }

  if (!authed) return (
    <div style={{ minHeight: '100vh', background: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 24, padding: 40, width: '100%', maxWidth: 380, textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔐</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', color: C.white, marginBottom: 8 }}>Admin Login</h1>
        <p style={{ color: C.muted, fontSize: '0.85rem', marginBottom: 32 }}>Relax Aircon — Owner Panel</p>
        <input type="password" placeholder="Enter password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: `1px solid ${err ? '#ff6b6b' : C.border}`, color: C.white, borderRadius: 12, padding: '12px 16px', fontSize: '1rem', outline: 'none', textAlign: 'center', marginBottom: 8, fontFamily: 'inherit' }} />
        {err && <p style={{ color: '#ff6b6b', fontSize: '0.8rem', marginBottom: 8 }}>Wrong password. Try: admin123</p>}
        <button onClick={login} style={{ width: '100%', background: 'linear-gradient(135deg,#00d4ff,#0099cc)', color: C.dark, fontWeight: 700, padding: 14, borderRadius: 50, border: 'none', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }}>Login →</button>
        <p style={{ color: 'rgba(123,168,196,0.4)', fontSize: '0.75rem', marginTop: 16 }}>Demo: admin123</p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: C.dark, color: C.white }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: `1px solid ${C.border}`, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 40, backdropFilter: 'blur(20px)' }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', fontWeight: 600 }}>❄️ Relax Aircon — Admin</div>
          <div style={{ color: C.muted, fontSize: '0.75rem' }}>Welcome, Azhar Munshi</div>
        </div>
        <button onClick={() => setAuthed(false)} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.muted, padding: '6px 16px', borderRadius: 50, cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>Logout</button>
      </div>

      <div style={{ padding: 24 }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
          {[['Total',stats.total,'#00d4ff'],['Pending',stats.pending,'#f59e0b'],['In Progress',stats.inProgress,'#3b82f6'],['Completed',stats.completed,'#10b981']].map(([l,v,c]) => (
            <div key={l as string} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: c as string }}>{v}</div>
              <div style={{ color: C.muted, fontSize: '0.8rem', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Revenue */}
        <div style={{ background: 'linear-gradient(135deg,rgba(0,153,204,0.1),rgba(0,100,160,0.08))', border: `1px solid rgba(0,180,255,0.2)`, borderRadius: 16, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <div style={{ color: C.muted, fontSize: '0.75rem', marginBottom: 4 }}>ESTIMATED REVENUE</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: C.ice }}>₹{(stats.completed * 1200).toLocaleString()}</div>
            <div style={{ color: C.muted, fontSize: '0.8rem' }}>Avg ₹1,200/job × {stats.completed} completed</div>
          </div>
          <div style={{ fontSize: '3rem' }}>💰</div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', padding: 4, borderRadius: 12, width: 'fit-content', marginBottom: 24 }}>
          {['overview','bookings','technicians'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, textTransform: 'capitalize' as const, fontFamily: 'inherit', background: tab === t ? 'linear-gradient(135deg,#00d4ff,#0099cc)' : 'transparent', color: tab === t ? C.dark : C.muted }}>
              {t}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 16 }}>Technician Status</div>
              {TECHS.map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid rgba(0,180,255,0.08)` }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#0099cc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: C.dark }}>{t.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: C.white, fontSize: '0.9rem', fontWeight: 500 }}>{t.name}</div>
                    <div style={{ color: C.muted, fontSize: '0.75rem' }}>{t.jobs} jobs • ⭐{t.rating}</div>
                  </div>
                  <span style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: 50, background: t.available ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: t.available ? '#10b981' : '#ef4444' }}>{t.available ? 'Free' : 'Busy'}</span>
                </div>
              ))}
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 16 }}>Recent Bookings</div>
              {bookings.slice(0, 4).map(b => (
                <div key={b.id} style={{ padding: '10px 0', borderBottom: `1px solid rgba(0,180,255,0.08)` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: C.white, fontSize: '0.85rem', fontWeight: 500 }}>{b.name}</div>
                      <div style={{ color: C.muted, fontSize: '0.75rem' }}>{b.service} • {b.date}</div>
                    </div>
                    <span style={{ fontSize: '0.65rem', padding: '3px 8px', borderRadius: 50, background: b.status === 'pending' ? 'rgba(245,158,11,0.15)' : b.status === 'in-progress' ? 'rgba(59,130,246,0.15)' : 'rgba(16,185,129,0.15)', color: b.status === 'pending' ? '#f59e0b' : b.status === 'in-progress' ? '#3b82f6' : '#10b981' }}>{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOOKINGS */}
        {tab === 'bookings' && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600 }}>All Bookings ({bookings.length})</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {['Customer','Service','Date','Status','Action'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: C.muted, fontSize: '0.75rem', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' as const, fontFamily: 'inherit' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id} style={{ borderBottom: `1px solid rgba(0,180,255,0.05)` }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ color: C.white, fontSize: '0.85rem', fontWeight: 500 }}>{b.name}</div>
                        <div style={{ color: C.muted, fontSize: '0.75rem' }}>{b.phone}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ color: C.ice, fontSize: '0.85rem' }}>{b.service}</div>
                        <div style={{ color: C.muted, fontSize: '0.75rem' }}>{b.ac}</div>
                      </td>
                      <td style={{ padding: '12px 16px', color: C.white, fontSize: '0.85rem' }}>{b.date}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: 50, background: b.status === 'pending' ? 'rgba(245,158,11,0.15)' : b.status === 'in-progress' ? 'rgba(59,130,246,0.15)' : 'rgba(16,185,129,0.15)', color: b.status === 'pending' ? '#f59e0b' : b.status === 'in-progress' ? '#3b82f6' : '#10b981' }}>{b.status}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {b.status === 'pending' && <button onClick={() => updateStatus(b.id, 'in-progress')} style={{ background: 'rgba(0,212,255,0.1)', border: `1px solid rgba(0,212,255,0.3)`, color: C.ice, padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'inherit' }}>Accept</button>}
                        {b.status === 'in-progress' && <button onClick={() => updateStatus(b.id, 'completed')} style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'inherit' }}>Complete</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TECHNICIANS */}
        {tab === 'technicians' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
            {TECHS.map(t => (
              <div key={t.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#0099cc)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: C.dark, fontSize: '1.2rem' }}>{t.name[0]}</div>
                  <div>
                    <div style={{ color: C.white, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ color: C.muted, fontSize: '0.75rem' }}>{t.phone}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
                  <div style={{ background: 'rgba(0,180,255,0.06)', borderRadius: 10, padding: 10 }}>
                    <div style={{ color: C.ice, fontWeight: 700 }}>{t.jobs}</div>
                    <div style={{ color: C.muted, fontSize: '0.7rem' }}>Jobs</div>
                  </div>
                  <div style={{ background: 'rgba(0,180,255,0.06)', borderRadius: 10, padding: 10 }}>
                    <div style={{ color: '#f59e0b', fontWeight: 700 }}>⭐{t.rating}</div>
                    <div style={{ color: C.muted, fontSize: '0.7rem' }}>Rating</div>
                  </div>
                  <div style={{ background: 'rgba(0,180,255,0.06)', borderRadius: 10, padding: 10 }}>
                    <div style={{ color: t.available ? '#10b981' : '#ef4444', fontWeight: 700, fontSize: '0.75rem' }}>{t.available ? 'FREE' : 'BUSY'}</div>
                    <div style={{ color: C.muted, fontSize: '0.7rem' }}>Status</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
