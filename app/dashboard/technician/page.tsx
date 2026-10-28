'use client'
import { useCallback, useEffect, useState } from 'react'
import { slotLabel, normalizePhone } from '@/lib/booking'

type Job = {
  id: string; name: string; phone: string; address: string
  appliance: string | null; service: string | null; problem: string | null
  booking_date: string; slot: string
}

function prettyDate(d: string, today: string) {
  const label = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${d}T00:00:00Z`))
  return d === today ? `Today, ${label}` : label
}

export default function TechnicianJobs() {
  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [today, setToday] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError('')
    try {
      const res = await fetch('/api/technician/bookings', { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Could not load jobs')
      setJobs(json.jobs)
      setToday(json.today)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load jobs')
      setJobs([])
    }
  }, [])

  useEffect(() => { load() }, [load])

  const complete = async (id: string) => {
    setBusy(id)
    setError('')
    try {
      const res = await fetch('/api/technician/bookings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Update failed')
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed')
    }
    setBusy(null)
  }

  return (
    <main className="section" style={{ paddingTop: 32 }}>
      <div className="wrap">
        <h1 style={{ fontSize: '1.8rem' }}>My jobs</h1>
        <p className="muted">Confirmed visits, soonest first.</p>

        {error && <p className="notice notice-error" role="alert">{error}</p>}

        {jobs === null && [0, 1].map(i => <div key={i} className="skeleton" style={{ height: 96, marginBottom: 12 }} />)}

        {jobs && jobs.length === 0 && !error && (
          <div className="panel" style={{ textAlign: 'center' }}>
            <p style={{ margin: 0 }}><strong>No confirmed jobs right now.</strong></p>
            <p className="muted" style={{ margin: '4px 0 0' }}>Jobs appear here once the office confirms a booking.</p>
          </div>
        )}

        {jobs && jobs.map(j => (
          <article key={j.id} className="panel booking-card" style={{ marginBottom: 12 }}>
            <div className="booking-head">
              <div><strong>{prettyDate(j.booking_date, today)}</strong>, {slotLabel(j.slot)}</div>
            </div>
            <p style={{ margin: '8px 0 0' }}><strong>{j.name}</strong> · {j.service || 'Service not chosen'}{j.appliance ? ` · ${j.appliance}` : ''}</p>
            <p className="muted small" style={{ margin: '4px 0 0' }}>{j.address}</p>
            {j.problem && <p className="small" style={{ margin: '4px 0 0' }}>Problem: {j.problem}</p>}
            <div className="btn-row" style={{ marginTop: 12 }}>
              <a href={`tel:+91${normalizePhone(j.phone)}`} className="btn btn-outline">Call {j.phone}</a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${j.address}, Vadodara`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Open in Maps</a>
              <button className="btn btn-primary" disabled={busy === j.id} onClick={() => complete(j.id)}>Mark complete</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
