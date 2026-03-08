'use client'
import { useState, useEffect, useCallback } from 'react'
import { ROLES, maskAadhaar, type EmployeeRow } from '@/lib/employee-types'

const C = {
  dark: '#020c18', card: 'rgba(7,30,52,0.85)', border: 'rgba(0,180,255,0.15)',
  ice: '#00d4ff', muted: '#7ba8c4', white: '#f0f8ff', gold: '#c9a84c',
  err: '#ff6b6b',
}

const ROLE_LABEL: Record<string, string> = Object.fromEntries(ROLES.map(r => [r.value, r.label]))

const statusColors: Record<string, { bg: string; text: string }> = {
  active:     { bg: 'rgba(16,185,129,0.15)', text: '#10b981' },
  inactive:   { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b' },
  terminated: { bg: 'rgba(239,68,68,0.15)',  text: '#ef4444' },
}

export default function EmployeesPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState(false)

  const [employees, setEmployees] = useState<EmployeeRow[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterStatus, setFilterStatus] = useState('active')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<EmployeeRow | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  const limit = 10

  const fetchEmployees = useCallback(async () => {
    setLoading(true)
    setError('')
    const params = new URLSearchParams({
      page: String(page), limit: String(limit),
      ...(search && { search }),
      ...(filterRole && { role: filterRole }),
      ...(filterStatus && { status: filterStatus }),
    })
    try {
      const res = await fetch(`/api/employee?${params}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Fetch failed')
      setEmployees(json.employees)
      setTotal(json.total)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load employees')
    }
    setLoading(false)
  }, [page, search, filterRole, filterStatus])

  useEffect(() => { if (authed) fetchEmployees() }, [authed, fetchEmployees])

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); if (authed) fetchEmployees() }, 350)
    return () => clearTimeout(t)
  }, [search]) // eslint-disable-line

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    const res = await fetch(`/api/employee/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      fetchEmployees()
      if (selected?.id === id) setSelected(null)
    }
    setUpdating(null)
  }

  const totalPages = Math.ceil(total / limit)

  // ── Login Gate ─────────────────────────────────────────────────────────────
  if (!authed) return (
    <div style={{ minHeight: '100vh', background: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 24, padding: 40, maxWidth: 360, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>👥</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', color: C.white, marginBottom: 6 }}>Staff Panel</h1>
        <p style={{ color: C.muted, fontSize: '0.82rem', marginBottom: 28 }}>Admin access required</p>
        <input type="password" placeholder="Admin password" value={pw}
          onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && (pw === 'admin123' ? (setAuthed(true), setPwErr(false)) : setPwErr(true))}
          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: `1px solid ${pwErr ? C.err : C.border}`, color: C.white, borderRadius: 12, padding: '12px 16px', fontSize: '1rem', outline: 'none', textAlign: 'center', fontFamily: 'inherit', marginBottom: 8 }} />
        {pwErr && <p style={{ color: C.err, fontSize: '0.8rem', marginBottom: 8 }}>Wrong password</p>}
        <button onClick={() => pw === 'admin123' ? (setAuthed(true), setPwErr(false)) : setPwErr(true)}
          style={{ width: '100%', background: 'linear-gradient(135deg,#00d4ff,#0099cc)', color: C.dark, fontWeight: 700, padding: 14, borderRadius: 50, border: 'none', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', marginTop: 6 }}>
          Enter →
        </button>
      </div>
    </div>
  )

  // ── Detail Drawer ──────────────────────────────────────────────────────────
  const Drawer = () => {
    if (!selected) return null
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
        <div onClick={() => setSelected(null)} style={{ flex: 1, background: 'rgba(2,12,24,0.8)', backdropFilter: 'blur(4px)' }} />
        <div style={{ width: 360, background: '#041525', borderLeft: `1px solid ${C.border}`, overflowY: 'auto', padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', color: C.white }}>Employee Detail</span>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: C.muted, fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
          </div>

          {/* Photo */}
          <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg,#0099cc,#0a2540)', border: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, overflow: 'hidden' }}>
            {selected.profile_photo
              ? <img src={selected.profile_photo} alt={selected.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ fontWeight: 700, fontSize: '1.5rem', color: C.ice }}>{selected.full_name[0]}</span>}
          </div>

          <h2 style={{ color: C.white, fontSize: '1.1rem', fontWeight: 600, marginBottom: 4 }}>{selected.full_name}</h2>
          <p style={{ color: C.muted, fontSize: '0.8rem', marginBottom: 20 }}>
            {selected.role ? ROLE_LABEL[selected.role] ?? selected.role : 'No role assigned'}
          </p>

          {[
            ['📞 Mobile', selected.mobile],
            ['📧 Email', selected.email ?? '—'],
            ['📍 Address', selected.address],
            ['🔒 Aadhaar', selected.aadhaar_last4 ? maskAadhaar(selected.aadhaar_last4) : '—'],
            ['💼 Experience', selected.experience_years != null ? `${selected.experience_years} yrs` : '—'],
            ['💰 Expected Salary', selected.expected_salary != null ? `₹${selected.expected_salary.toLocaleString('en-IN')}/mo` : '—'],
            ['📅 Joined', new Date(selected.created_at).toLocaleDateString('en-IN')],
          ].map(([k, v]) => (
            <div key={k as string} style={{ padding: '10px 0', borderBottom: '1px solid rgba(0,180,255,0.08)' }}>
              <div style={{ color: C.muted, fontSize: '0.72rem', marginBottom: 2 }}>{k}</div>
              <div style={{ color: C.white, fontSize: '0.88rem' }}>{v}</div>
            </div>
          ))}

          {/* Status actions */}
          <div style={{ marginTop: 20 }}>
            <p style={{ color: C.muted, fontSize: '0.72rem', marginBottom: 10 }}>CHANGE STATUS</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(['active', 'inactive', 'terminated'] as const).filter(s => s !== selected.status).map(s => (
                <button key={s} onClick={() => updateStatus(selected.id, s)} disabled={updating === selected.id}
                  style={{ background: statusColors[s].bg, border: `1px solid ${statusColors[s].text}33`, color: statusColors[s].text, padding: '10px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize' }}>
                  {updating === selected.id ? '...' : `Set ${s}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Main Panel ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: C.dark, color: C.white }}>
      <Drawer />

      {/* Top bar */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: `1px solid ${C.border}`, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 40, backdropFilter: 'blur(20px)', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', fontWeight: 600 }}>👥 Staff Management</div>
          <div style={{ color: C.muted, fontSize: '0.75rem' }}>{total} employee{total !== 1 ? 's' : ''} found</div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href="/dashboard/employees/register" style={{ background: 'linear-gradient(135deg,#00d4ff,#0099cc)', color: C.dark, fontWeight: 700, padding: '9px 20px', borderRadius: 50, textDecoration: 'none', fontSize: '0.82rem' }}>
            + Register Employee
          </a>
          <button onClick={() => setAuthed(false)} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.muted, padding: '8px 16px', borderRadius: 50, cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ padding: 24 }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12, marginBottom: 24 }}>
          {[['Total',total,C.ice],['Active','—','#10b981'],['Inactive','—','#f59e0b'],['Terminated','—','#ef4444']].map(([l,v,c],i) => (
            <div key={l as string} onClick={() => { if(i>0) { setFilterStatus(['','active','inactive','terminated'][i]); setPage(1) } }}
              style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '16px 18px', cursor: i > 0 ? 'pointer' : 'default', transition: 'border-color 0.2s', borderColor: filterStatus === ['','active','inactive','terminated'][i] && i > 0 ? c as string : C.border }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: c as string }}>{i === 0 ? total : '—'}</div>
              <div style={{ color: C.muted, fontSize: '0.75rem', marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <input placeholder="🔍 Search by name, mobile, email..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 220, background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, color: C.white, borderRadius: 12, padding: '10px 16px', fontSize: '0.88rem', outline: 'none', fontFamily: 'inherit' }} />
          <select value={filterRole} onChange={e => { setFilterRole(e.target.value); setPage(1) }}
            style={{ background: '#041525', border: `1px solid ${C.border}`, color: C.muted, borderRadius: 12, padding: '10px 16px', fontSize: '0.88rem', outline: 'none', fontFamily: 'inherit' }}>
            <option value="">All Roles</option>
            {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
            style={{ background: '#041525', border: `1px solid ${C.border}`, color: C.muted, borderRadius: 12, padding: '10px 16px', fontSize: '0.88rem', outline: 'none', fontFamily: 'inherit' }}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="terminated">Terminated</option>
            <option value="">All Statuses</option>
          </select>
        </div>

        {/* Table */}
        {error && (
          <div style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 12, padding: '12px 16px', color: C.err, marginBottom: 16 }}>
            ⚠ {error} — <button onClick={fetchEmployees} style={{ background: 'none', border: 'none', color: C.ice, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>Retry</button>
          </div>
        )}

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: 60, textAlign: 'center', color: C.muted }}>Loading employees...</div>
          ) : employees.length === 0 ? (
            <div style={{ padding: 60, textAlign: 'center', color: C.muted }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>👤</div>
              No employees found.{' '}
              <a href="/dashboard/employees/register" style={{ color: C.ice, textDecoration: 'none', fontWeight: 600 }}>Register the first one →</a>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {['Employee','Role','Mobile','Salary','Aadhaar','Status','Joined','Action'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: C.muted, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id} onClick={() => setSelected(emp)}
                      style={{ borderBottom: '1px solid rgba(0,180,255,0.06)', cursor: 'pointer', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.04)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#0099cc,#0a2540)', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                            {emp.profile_photo
                              ? <img src={emp.profile_photo} alt={emp.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              : <span style={{ fontWeight: 700, fontSize: '0.9rem', color: C.ice }}>{emp.full_name[0]}</span>}
                          </div>
                          <div>
                            <div style={{ color: C.white, fontSize: '0.85rem', fontWeight: 500 }}>{emp.full_name}</div>
                            <div style={{ color: C.muted, fontSize: '0.72rem' }}>{emp.email ?? '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', color: C.ice, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                        {emp.role ? (ROLE_LABEL[emp.role] ?? emp.role) : <span style={{ color: C.muted }}>—</span>}
                      </td>
                      <td style={{ padding: '14px 16px', color: C.white, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{emp.mobile}</td>
                      <td style={{ padding: '14px 16px', color: C.white, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                        {emp.expected_salary != null ? `₹${emp.expected_salary.toLocaleString('en-IN')}` : <span style={{ color: C.muted }}>—</span>}
                      </td>
                      <td style={{ padding: '14px 16px', color: C.muted, fontSize: '0.82rem', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                        {emp.aadhaar_last4 ? maskAadhaar(emp.aadhaar_last4) : '—'}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: 50, background: statusColors[emp.status]?.bg, color: statusColors[emp.status]?.text, whiteSpace: 'nowrap' }}>
                          {emp.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: C.muted, fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                        {new Date(emp.created_at).toLocaleDateString('en-IN')}
                      </td>
                      <td style={{ padding: '14px 16px' }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelected(emp)}
                          style={{ background: 'rgba(0,180,255,0.08)', border: `1px solid ${C.border}`, color: C.ice, padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'inherit' }}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 20 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{ background: 'rgba(0,180,255,0.08)', border: `1px solid ${C.border}`, color: page === 1 ? C.muted : C.ice, padding: '8px 16px', borderRadius: 10, cursor: page === 1 ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>← Prev</button>
            <span style={{ color: C.muted, fontSize: '0.85rem' }}>Page {page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              style={{ background: 'rgba(0,180,255,0.08)', border: `1px solid ${C.border}`, color: page === totalPages ? C.muted : C.ice, padding: '8px 16px', borderRadius: 10, cursor: page === totalPages ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>Next →</button>
          </div>
        )}
      </div>
    </div>
  )
}
