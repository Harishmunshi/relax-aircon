'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/site'

export type FormField = {
  name: string
  label: string
  type?: 'text' | 'tel' | 'email' | 'select' | 'textarea'
  required?: boolean
  options?: { value: string; label: string }[]
  placeholder?: string
  maxLength?: number
  half?: boolean
}

type Props = {
  endpoint: string
  fields: FormField[]
  submitLabel: string
  successTitle: string
  successBody: string
}

/** Small public form: posts JSON to an API route, shows field errors, a honeypot, and a thank-you screen. */
export default function EnquiryForm({ endpoint, fields, submitLabel, successTitle, successBody }: Props) {
  const [values, setValues] = useState<Record<string, string>>({ website: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k: string, v: string) => {
    setValues(p => ({ ...p, [k]: v }))
    setErrors(p => ({ ...p, [k]: '', form: '' }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const missing: Record<string, string> = {}
    for (const f of fields) if (f.required && !(values[f.name] ?? '').trim()) missing[f.name] = 'This field is required'
    if (Object.keys(missing).length > 0) { setErrors(missing); return }

    setBusy(true)
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) setErrors({ ...(json.fields ?? {}), form: json.error || 'Something went wrong. Please call us.' })
      else setDone(true)
    } catch {
      setErrors({ form: 'Network problem. Please try again or call us.' })
    }
    setBusy(false)
  }

  if (done) return (
    <div role="status">
      <h2 style={{ fontSize: '1.5rem' }}>{successTitle}</h2>
      <p className="muted">{successBody}</p>
      <div className="btn-row">
        <a href={`tel:${PHONE_TEL}`} className="btn btn-outline">Call {PHONE_DISPLAY}</a>
        <Link href="/" className="btn btn-outline">Back to home</Link>
      </div>
    </div>
  )

  const input = (f: FormField) => {
    const id = `f-${f.name}`
    const common = { id, 'aria-invalid': !!errors[f.name], 'aria-describedby': errors[f.name] ? `e-${f.name}` : undefined, value: values[f.name] ?? '' }
    if (f.type === 'select') return (
      <select {...common} onChange={e => set(f.name, e.target.value)}>
        <option value="">Choose one</option>
        {f.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    )
    if (f.type === 'textarea') return <textarea {...common} rows={4} maxLength={f.maxLength} placeholder={f.placeholder} onChange={e => set(f.name, e.target.value)} />
    return <input {...common} type={f.type ?? 'text'} inputMode={f.type === 'tel' ? 'tel' : undefined} maxLength={f.maxLength} placeholder={f.placeholder} onChange={e => set(f.name, e.target.value)} />
  }

  // Pair consecutive "half" fields into one row so short fields sit side by side.
  const rows: FormField[][] = []
  for (const f of fields) {
    const last = rows[rows.length - 1]
    if (f.half && last && last.length === 1 && last[0].half) last.push(f)
    else rows.push([f])
  }

  return (
    <form onSubmit={submit} className="form" noValidate>
      {rows.map((row, i) => (
        <div key={i} className={row.length > 1 ? 'form-row' : undefined}>
          {row.map(f => (
            <div key={f.name} className="field">
              <label htmlFor={`f-${f.name}`}>{f.label}{f.required ? ' (required)' : ''}</label>
              {input(f)}
              {errors[f.name] && <p className="err" id={`e-${f.name}`}>{errors[f.name]}</p>}
            </div>
          ))}
        </div>
      ))}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={e => set('website', e.target.value)} />
      </div>
      {errors.form && <p className="notice notice-error" role="alert" style={{ margin: 0 }}>{errors.form}</p>}
      <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? 'Sending...' : submitLabel}</button>
      <p className="small muted" style={{ margin: 0 }}>Your details go only to Relax Aircon. See our <Link href="/privacy">privacy policy</Link>.</p>
    </form>
  )
}
