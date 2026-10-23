'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { BOOKING_SERVICES, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/site'

const APPLIANCES = ['Split AC', 'Window AC', 'Cassette AC', 'Central AC', 'Tower AC', 'Refrigerator', 'Washing machine', 'Deep freezer', 'Water cooler']
const SLOTS = ['9 AM to 11 AM', '11 AM to 1 PM', '1 PM to 3 PM', '3 PM to 5 PM', '5 PM to 7 PM', '7 PM to 9 PM']

type Form = { name: string; phone: string; address: string; appliance: string; service: string; problem: string; date: string; time: string }
type Errors = Partial<Record<keyof Form, string>>

function today() {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

export default function BookForm() {
  const params = useSearchParams()
  const preset = params.get('service') ?? ''
  const [form, setForm] = useState<Form>({
    name: '', phone: '', address: '', appliance: '', problem: '', date: '', time: '',
    service: preset.slice(0, 60),
  })
  const [errors, setErrors] = useState<Errors>({})
  const [sentLink, setSentLink] = useState<string | null>(null)

  const set = (k: keyof Form, v: string) => {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => ({ ...p, [k]: undefined }))
  }

  const validate = () => {
    const e: Errors = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your name'
    const digits = form.phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
    if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a 10 digit Indian mobile number'
    if (form.address.trim().length < 5) e.address = 'Please enter your area and street'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    const lines = [
      'New booking request (relaxaircon.in)',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Address: ${form.address.trim()}`,
      form.appliance && `Appliance: ${form.appliance}`,
      form.service && `Service: ${form.service}`,
      form.problem.trim() && `Problem: ${form.problem.trim()}`,
      form.date && `Preferred date: ${form.date}`,
      form.time && `Preferred time: ${form.time}`,
    ].filter(Boolean).join('\n')
    const link = whatsappLink(lines)
    setSentLink(link)
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  if (sentLink) return (
    <div role="status">
      <h2 style={{ fontSize: '1.5rem' }}>One more step: press send in WhatsApp</h2>
      <p className="muted">
        We opened WhatsApp with your booking details filled in. Your booking reaches us once you send
        that message. We reply to confirm the time slot.
      </p>
      <div className="btn-row">
        <a href={sentLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open WhatsApp again</a>
        <a href={`tel:${PHONE_TEL}`} className="btn btn-outline">Or call {PHONE_DISPLAY}</a>
      </div>
      <p className="small muted" style={{ marginTop: 16 }}>
        <button type="button" onClick={() => setSentLink(null)} style={{ background: 'none', border: 0, padding: 0, color: 'var(--accent)', textDecoration: 'underline', cursor: 'pointer', font: 'inherit' }}>
          Edit booking details
        </button>
      </p>
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
      <div className="form-row">
        {field('date', 'Preferred date', <input {...aria('date')} type="date" min={today()} value={form.date} onChange={e => set('date', e.target.value)} />)}
        {field('time', 'Preferred time', (
          <select {...aria('time')} value={form.time} onChange={e => set('time', e.target.value)}>
            <option value="">Any time</option>
            {SLOTS.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
      </div>
      <button type="submit" className="btn btn-primary">Send booking on WhatsApp</button>
      <p className="small muted" style={{ margin: 0 }}>
        Your details go only to Relax Aircon through WhatsApp. See our <Link href="/privacy">privacy policy</Link>.
      </p>
    </form>
  )
}
