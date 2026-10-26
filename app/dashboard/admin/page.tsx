'use client'
import { useCallback, useEffect, useState } from 'react'
import { slotLabel, normalizePhone } from '@/lib/booking'

type Booking = {
  id: string; name: string; phone: string; address: string
  appliance: string | null; service: string | null; problem: string | null
  booking_date: string; slot: string; status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

const FILTERS = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'pending', label: 'Pending' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
  { id: 'all', label: 'All' },
]

const BADGE: Record<string, string> = { pending: 'badge-pending', confirmed: 'badge-progress', completed: 'badge-done', cancelled: '' }

// Next action for each status: [label, new status, button class]
const ACTIONS: Record<string, [string, string, string][]> = {
  pending: [['Confirm', 'confirmed', 'btn-primary'], ['Cancel', 'cancelled', 'btn-outline']],
  confirmed: [['Mark complete', 'completed', 'btn-primary'], ['Cancel', 'cancelled', 'btn-outline']],
  completed: [],
  cancelled: [['Restore', 'pending', 'btn-outline']],
}

function prettyDate(d: string, today: string) {
  const label = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${d}T00:00:00Z`))
  return d === today ? `Today, ${label}` : label
}

export default function AdminBookings() {
  const [filter, setFilter] = useState('upcoming')
  const [bookings, setBookings] = useState<Booking[] | null>(null)
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [today, setToday] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError('')
    try {
      const res = await fetch(`/api/admin/bookings?filter=${filter}`, { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Could not load bookings')
      setBookings(json.bookings)
      setCounts(json.counts)
      setToday(json.today)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load bookings')
      setBookings([])
    }
  }, [filter])

  useEffect(() => { setBookings(null); load() }, [load])

  const setStatus = async (id: string, status: string) => {
    setBusy(id)
    setError('')
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Update failed')
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed')
    }
    setBusy(null)
  }

  const stats: [string, number][] = [
    ['Pending', counts.pending ?? 0], ['Confirmed', counts.confirmed ?? 0],
    ['Completed', counts.completed ?? 0], ['Cancelled', counts.cancelled ?? 0],
  ]

  return (
    <main className="section" style={{ paddingTop: 32 }}>
      <div className="wrap">
        <h1 style={{ fontSize: '1.8rem' }}>Bookings</h1>

        <div className="stat-row">
          {stats.map(([label, n]) => (
            <div key={label} className="stat"><div className="num">{bookings === null ? '–' : n}</div><div className="lbl">{label}</div></div>
          ))}
        </div>

        <div className="tabs" role="tablist" aria-label="Filter bookings">
          {FILTERS.map(f => (
            <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
          ))}
        </div>

        {error && <p className="notice notice-error" role="alert">{error}</p>}

        {bookings === null && (
          <div aria-label="Loading bookings">
            {[0, 1, 2].map(i => <div key={i} className="skeleton" style={{ height: 88, marginBottom: 12 }} />)}
          </div>
        )}

        {bookings && bookings.length === 0 && !error && (
          <div className="panel" style={{ textAlign: 'center' }}>
            <p style={{ margin: 0 }}><strong>No bookings here yet.</strong></p>
            <p className="muted" style={{ margin: '4px 0 0' }}>New online bookings appear here as soon as customers submit them.</p>
          </div>
        )}

        {bookings && bookings.map(b => (
          <article key={b.id} className="panel booking-card" style={{ marginBottom: 12, opacity: b.status === 'cancelled' ? 0.7 : 1 }}>
            <div className="booking-head">
              <div>
                <strong>{prettyDate(b.booking_date, today)}</strong>, {slotLabel(b.slot)}
              </div>
              <span className={`badge ${BADGE[b.status]}`}>{b.status}</span>
            </div>
            <p style={{ margin: '8px 0 0' }}>
              <strong>{b.name}</strong> · {b.service || 'Service not chosen'}{b.appliance ? ` · ${b.appliance}` : ''}
            </p>
            <p className="muted small" style={{ margin: '4px 0 0' }}>{b.address}</p>
            {b.problem && <p className="small" style={{ margin: '4px 0 0' }}>Problem: {b.problem}</p>}
            <div className="btn-row" style={{ marginTop: 12 }}>
              <a href={`tel:+91${normalizePhone(b.phone)}`} className="btn btn-outline">Call {b.phone}</a>
              <a href={`https://wa.me/91${normalizePhone(b.phone)}?text=${encodeURIComponent(`Hi ${b.name}, this is Relax Aircon about your booking on ${b.booking_date}, ${slotLabel(b.slot)}.`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">WhatsApp</a>
              {ACTIONS[b.status].map(([label, next, cls]) => (
                <button key={next} className={`btn ${cls}`} disabled={busy === b.id} onClick={() => setStatus(b.id, next)}>{label}</button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
