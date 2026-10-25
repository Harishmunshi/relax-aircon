'use client'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { BOOKING_SERVICES, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/site'
import { MAX_DAYS_AHEAD, addDays, slotLabel, validPhone } from '@/lib/booking'

const APPLIANCES = ['Split AC', 'Window AC', 'Cassette AC', 'Central AC', 'Tower AC', 'Refrigerator', 'Washing machine', 'Deep freezer', 'Water cooler']

type Form = { name: string; phone: string; address: string; appliance: string; service: string; problem: string; date: string; slot: string; website: string }
type Errors = Partial<Record<keyof Form | 'form', string>>
type SlotInfo = { id: string; label: string; available: boolean; reason: 'booked' | 'unavailable' | null }

function todayIST() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date())
}

export default function BookForm() {
  const params = useSearchParams()
  const preset = params.get('service') ?? ''
  const [form, setForm] = useState<Form>({
    name: '', phone: '', address: '', appliance: '', problem: '', date: '', slot: '', website: '',
    service: preset.slice(0, 60),
  })
  const [errors, setErrors] = useState<Errors>({})
  const [slots, setSlots] = useState<SlotInfo[] | null>(null)
  const [slotsState, setSlotsState] = useState<'idle' | 'loading' | 'error' | 'offline'>('idle')
  const [submitting, setSubmitting] = useState(false)
  const [offline, setOffline] = useState(false)
  const [done, setDone] = useState<{ summary: string } | null>(null)

  const set = (k: keyof Form, v: string) => {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => ({ ...p, [k]: undefined, form: undefined }))
  }

  const loadSlots = useCallback(async (date: string) => {
    setSlotsState('loading')
    setSlots(null)
    try {
      const res = await fetch(`/api/bookings/slots?date=${encodeURIComponent(date)}`, { cache: 'no-store' })
      if (res.status === 503) { setSlotsState('offline'); return }
      if (!res.ok) throw new Error('slots')
      const json = await res.json()
      setSlots(json.slots)
      setSlotsState('idle')
      setForm(p => (json.slots.some((s: SlotInfo) => s.id === p.slot && s.available) ? p : { ...p, slot: '' }))
    } catch {
      setSlotsState('error')
    }
  }, [])

  useEffect(() => {
    if (form.date) loadSlots(form.date)
  }, [form.date, loadSlots])

  // If the booking database is not connected, fall back to sending the request on WhatsApp.
  useEffect(() => {
    fetch(`/api/bookings/slots?date=${todayIST()}`, { cache: 'no-store' })
      .then(r => { if (r.status === 503) setOffline(true) })
      .catch(() => {})
  }, [])

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const e: Errors = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your name'
    if (!validPhone(form.phone)) e.phone = 'Enter a 10 digit Indian mobile number'
    if (form.address.trim().length < 5) e.address = 'Please enter your area and street'
    if (!offline) {
      if (!form.date) e.date = 'Please choose a date'
      else if (!form.slot) e.slot = 'Please choose a free time slot'
    }
    setErrors(e)
    if (Object.keys(e).length > 0) return

    if (offline) {
      const lines = [
        'New booking request (relaxaircon.in)',
        `Name: ${form.name.trim()}`, `Phone: ${form.phone.trim()}`, `Address: ${form.address.trim()}`,
        form.appliance && `Appliance: ${form.appliance}`, form.service && `Service: ${form.service}`,
        form.problem.trim() && `Problem: ${form.problem.trim()}`, form.date && `Preferred date: ${form.date}`,
      ].filter(Boolean).join('\n')
      window.open(whatsappLink(lines), '_blank', 'noopener,noreferrer')
      setDone({ summary: lines })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json().catch(() => ({}))
      if (res.status === 409) {
        setErrors({ slot: json.error || 'That slot was just booked. Please choose another.' })
        await loadSlots(form.date)
      } else if (!res.ok) {
        setErrors(json.fields ? { ...json.fields, form: json.error } : { form: json.error || 'Could not save your booking. Please call us.' })
      } else {
        const lines = [
          `Hi Relax Aircon, I booked a visit on ${form.date}, ${slotLabel(form.slot)}.`,
          `Name: ${form.name.trim()}`,
          form.service && `Service: ${form.service}`,
        ].filter(Boolean).join('\n')
        setDone({ summary: lines })
      }
    } catch {
      setErrors({ form: 'Network problem. Please try again or call us.' })
    }
    setSubmitting(false)
  }

  if (done) return (
    <div role="status">
      <h2 style={{ fontSize: '1.6rem' }}>Booking received</h2>
      {offline ? (
        <p>We opened WhatsApp with your details. Press send there and we will reply to confirm a time.</p>
      ) : (
        <p>
          Your slot is reserved for <strong>{form.date}</strong>, <strong>{slotLabel(form.slot)}</strong>.
          We will call you on {form.phone} to confirm.
        </p>
      )}
      <div className="btn-row">
        <a href={whatsappLink(done.summary)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Confirm on WhatsApp</a>
        <a href={`tel:${PHONE_TEL}`} className="btn btn-outline">Call {PHONE_DISPLAY}</a>
      </div>
    </div>
  )

  const field = (key: keyof Form, label: string, input: React.ReactNode) => (
    <div className="field">
      <label htmlFor={`f-${key}`}>{label}</label>
      {input}
      {errors[key] && <p className="err" id={`e-${key}`}>{errors[key]}</p>}
    </div>
  )
  const aria = (key: keyof Form) => ({ id: `f-${key}`, 'aria-invalid': !!errors[key], 'aria-describedby': errors[key] ? `e-${key}` : undefined })
  const minDate = todayIST()
  const maxDate = addDays(minDate, MAX_DAYS_AHEAD)

  return (
    <form onSubmit={submit} className="form" noValidate>
      <div className="form-row">
        {field('name', 'Full name (required)', <input {...aria('name')} autoComplete="name" maxLength={80} value={form.name} onChange={e => set('name', e.target.value)} />)}
        {field('phone', 'Mobile number (required)', <input {...aria('phone')} type="tel" inputMode="tel" autoComplete="tel" maxLength={16} placeholder="98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} />)}
      </div>
      {field('address', 'Address in Vadodara (required)', <textarea {...aria('address')} rows={2} maxLength={300} autoComplete="street-address" placeholder="House, street, area, landmark" value={form.address} onChange={e => set('address', e.target.value)} />)}
      <div className="form-row">
        {field('appliance', 'Appliance', (
          <select {...aria('appliance')} value={form.appliance} onChange={e => set('appliance', e.target.value)}>
            <option value="">Choose one</option>
            {APPLIANCES.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
        {field('service', 'Service needed', (
          <select {...aria('service')} value={form.service} onChange={e => set('service', e.target.value)}>
            <option value="">Choose one</option>
            {form.service && !BOOKING_SERVICES.includes(form.service) && <option>{form.service}</option>}
            {BOOKING_SERVICES.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
      </div>
      {field('problem', 'What is the problem?', <textarea {...aria('problem')} rows={3} maxLength={500} placeholder="For example: not cooling, water leaking, making noise, error code E4" value={form.problem} onChange={e => set('problem', e.target.value)} />)}

      {field('date', 'Preferred date (required)', <input {...aria('date')} type="date" min={minDate} max={maxDate} value={form.date} onChange={e => set('date', e.target.value)} />)}

      {offline && <p className="notice" style={{ margin: 0 }}>Live slot booking is not available right now. Send your request and we will confirm a time on WhatsApp or by phone.</p>}
      <fieldset className="slot-fieldset" hidden={offline} aria-describedby={errors.slot ? 'e-slot' : undefined}>
        <legend>Time slot (required)</legend>
        {!form.date && <p className="muted small" style={{ margin: 0 }}>Choose a date to see free time slots.</p>}
        {slotsState === 'loading' && <p className="muted small" style={{ margin: 0 }}>Checking free slots...</p>}
        {slotsState === 'error' && <p className="err" style={{ margin: 0 }}>Could not load slots. <button type="button" className="link-btn" onClick={() => loadSlots(form.date)}>Try again</button></p>}
        {slotsState === 'offline' && <p className="muted small" style={{ margin: 0 }}>Online slot booking is not available right now. Please call {PHONE_DISPLAY}.</p>}
        {slots && (
          <div className="slot-grid">
            {slots.map(s => (
              <button
                key={s.id}
                type="button"
                className={`slot${form.slot === s.id ? ' selected' : ''}${s.available ? '' : ' taken'}`}
                disabled={!s.available}
                aria-pressed={form.slot === s.id}
                onClick={() => set('slot', s.id)}
              >
                <span>{s.label}</span>
                {!s.available && <small>{s.reason === 'booked' ? 'Booked' : 'Unavailable'}</small>}
              </button>
            ))}
          </div>
        )}
        {errors.slot && <p className="err" id="e-slot">{errors.slot}</p>}
      </fieldset>

      {/* Honeypot: hidden from people, filled by bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={e => set('website', e.target.value)} />
      </div>

      {errors.form && <p className="notice notice-error" role="alert" style={{ margin: 0 }}>{errors.form}</p>}
      <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Booking...' : 'Confirm booking'}</button>
      <p className="small muted" style={{ margin: 0 }}>
        Your details go to Relax Aircon only. See our <Link href="/privacy">privacy policy</Link>.
      </p>
    </form>
  )
}
