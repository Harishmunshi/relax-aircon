'use client'
import { useState, useRef, ChangeEvent } from 'react'
import { supabase } from '@/lib/supabase'
import {
  ROLES,
  validateMobile,
  validateAadhaar,
  validateEmail,
  type EmployeeFormPayload,
} from '@/lib/employee-types'

// ── Styles ──────────────────────────────────────────────────────────────────
const C = {
  dark: '#020c18', card: 'rgba(7,30,52,0.85)', border: 'rgba(0,180,255,0.15)',
  borderErr: 'rgba(255,80,80,0.5)', ice: '#00d4ff', muted: '#7ba8c4',
  white: '#f0f8ff', err: '#ff6b6b', gold: '#c9a84c',
}

const inputStyle = (hasErr: boolean): React.CSSProperties => ({
  width: '100%', background: 'rgba(255,255,255,0.05)',
  border: `1px solid ${hasErr ? C.borderErr : C.border}`,
  color: C.white, borderRadius: 12, padding: '12px 16px',
  fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit',
  transition: 'border-color 0.2s',
})

const labelStyle: React.CSSProperties = {
  color: C.muted, fontSize: '0.78rem', display: 'block',
  marginBottom: 6, letterSpacing: '0.5px',
}

type FormErrors = Partial<Record<keyof EmployeeFormPayload | 'form', string>>

export default function EmployeeRegisterPage() {
  const [form, setForm] = useState<EmployeeFormPayload>({
    full_name: '', mobile: '', address: '', email: '',
    role: '', aadhaar: '', experience_years: null, expected_salary: null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: keyof EmployeeFormPayload, v: unknown) => {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => ({ ...p, [k]: undefined }))
  }

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setErrors(p => ({ ...p, profile_photo: 'Photo must be under 5MB' }))
      return
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrors(p => ({ ...p, profile_photo: 'Only JPG, PNG, WebP allowed' }))
      return
    }
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
    setErrors(p => ({ ...p, profile_photo: undefined }))
  }

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.full_name.trim() || form.full_name.trim().length < 2)
      e.full_name = 'Full name is required'
    const mErr = validateMobile(form.mobile.trim())
    if (mErr) e.mobile = mErr
    if (!form.address.trim() || form.address.trim().length < 5)
      e.address = 'Address is required'
    const aErr = validateAadhaar(form.aadhaar?.trim() ?? '')
    if (aErr) e.aadhaar = aErr
    const eErr = validateEmail(form.email?.trim() ?? '')
    if (eErr) e.email = eErr
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    // 1. Upload photo to Supabase Storage if provided
    let profile_photo: string | undefined
    if (photoFile) {
      const ext = photoFile.name.split('.').pop()
      const path = `employees/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadErr } = await supabase.storage
        .from('employee-photos')
        .upload(path, photoFile, { upsert: false, contentType: photoFile.type })
      if (uploadErr) {
        setErrors({ form: 'Photo upload failed. Continue without photo or try again.' })
        setSubmitting(false)
        return
      }
      const { data: urlData } = supabase.storage.from('employee-photos').getPublicUrl(path)
      profile_photo = urlData.publicUrl
    }

    // 2. POST to API — Aadhaar encryption happens server-side
    const payload: EmployeeFormPayload = {
      full_name: form.full_name.trim(),
      mobile: form.mobile.trim(),
      address: form.address.trim(),
      email: form.email?.trim() || undefined,
      role: form.role || undefined,
      aadhaar: form.aadhaar?.trim() || undefined,
      experience_years: form.experience_years || undefined,
      expected_salary: form.expected_salary || undefined,
      profile_photo,
    }

    const res = await fetch('/api/employee/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const json = await res.json()

    if (!res.ok) {
      if (json.fields) setErrors(json.fields)
      else setErrors({ form: json.error || 'Registration failed. Try again.' })
      setSubmitting(false)
      return
    }

    setSuccess(true)
    setSubmitting(false)
  }

  // ── Success State ──────────────────────────────────────────────────────────
  if (success) return (
    <div style={{ minHeight: '100vh', background: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: C.card, border: '1px solid rgba(16,185,129,0.3)', borderRadius: 24, padding: 48, maxWidth: 480, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>✅</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', color: C.white, marginBottom: 8 }}>Registration Successful</h2>
        <p style={{ color: C.muted, marginBottom: 28 }}>Your profile has been submitted. Azhar Munshi will review and activate your account.</p>
        <p style={{ color: C.ice, fontWeight: 600, marginBottom: 28 }}>📞 +91 70432 45355</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => { setSuccess(false); setForm({ full_name:'',mobile:'',address:'',email:'',role:'',aadhaar:'',experience_years:null,expected_salary:null }); setPhotoPreview(null) }}
            style={{ background: 'rgba(0,212,255,0.1)', border: `1px solid ${C.border}`, color: C.ice, padding: '12px 28px', borderRadius: 50, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
            Register Another
          </button>
          <a href="/dashboard/admin" style={{ background: 'linear-gradient(135deg,#00d4ff,#0099cc)', color: C.dark, padding: '12px 28px', borderRadius: 50, textDecoration: 'none', fontWeight: 700 }}>
            View All Staff →
          </a>
        </div>
      </div>
    </div>
  )

  const F = ({ name, label, required, children }: { name: keyof FormErrors; label: string; required?: boolean; children: React.ReactNode }) => (
    <div>
      <label style={labelStyle}>{label}{required && <span style={{ color: C.err }}> *</span>}</label>
      {children}
      {errors[name] && <p style={{ color: C.err, fontSize: '0.75rem', marginTop: 5 }}>⚠ {errors[name]}</p>}
    </div>
  )

  return (
    <main style={{ minHeight: '100vh', background: C.dark, paddingTop: 90, paddingBottom: 60 }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.ice, display: 'block', marginBottom: 10 }}>Staff Onboarding</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 300, color: C.white, marginBottom: 8 }}>
            Employee <strong style={{ fontWeight: 700, color: C.ice }}>Registration</strong>
          </h1>
          <p style={{ color: C.muted, fontSize: '0.9rem' }}>Join the Relax Aircon team</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 24, padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Global error */}
            {errors.form && (
              <div style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: 12, padding: '12px 16px', color: C.err, fontSize: '0.85rem' }}>
                ⚠ {errors.form}
              </div>
            )}

            {/* Photo Upload */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div onClick={() => fileRef.current?.click()} style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(0,180,255,0.06)', border: `2px dashed ${errors.profile_photo ? C.borderErr : C.border}`, cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {photoPreview
                  ? <img src={photoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontSize: '1.8rem' }}>📷</span>}
              </div>
              <div>
                <button type="button" onClick={() => fileRef.current?.click()} style={{ background: 'rgba(0,212,255,0.08)', border: `1px solid ${C.border}`, color: C.ice, padding: '8px 18px', borderRadius: 50, cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>
                  Upload Photo
                </button>
                <p style={{ color: C.muted, fontSize: '0.72rem', marginTop: 5 }}>Optional • JPG/PNG/WebP • Max 5MB</p>
                {errors.profile_photo && <p style={{ color: C.err, fontSize: '0.72rem', marginTop: 3 }}>⚠ {errors.profile_photo}</p>}
              </div>
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhoto} style={{ display: 'none' }} />
            </div>

            <div style={{ height: 1, background: C.border }} />

            {/* Section: Mandatory */}
            <p style={{ fontSize: '0.7rem', letterSpacing: 3, textTransform: 'uppercase', color: C.gold }}>Required Information</p>

            <F name="full_name" label="Full Name" required>
              <input type="text" placeholder="e.g. Ravi Sharma" value={form.full_name}
                onChange={e => set('full_name', e.target.value)} style={inputStyle(!!errors.full_name)} autoComplete="name" />
            </F>

            <F name="mobile" label="Mobile Number" required>
              <input type="tel" placeholder="10-digit mobile number" value={form.mobile} maxLength={10}
                onChange={e => set('mobile', e.target.value.replace(/\D/g, ''))} style={inputStyle(!!errors.mobile)} />
            </F>

            <F name="address" label="Full Address" required>
              <textarea placeholder="Area, street, city..." value={form.address} rows={3}
                onChange={e => set('address', e.target.value)}
                style={{ ...inputStyle(!!errors.address), resize: 'vertical' }} />
            </F>

            <div style={{ height: 1, background: C.border }} />

            {/* Section: Optional */}
            <p style={{ fontSize: '0.7rem', letterSpacing: 3, textTransform: 'uppercase', color: C.gold }}>Optional Information</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <F name="role" label="Role / Designation">
                <select value={form.role} onChange={e => set('role', e.target.value)}
                  style={{ ...inputStyle(false), background: '#041525' }}>
                  <option value="">Select role...</option>
                  {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </F>

              <F name="experience_years" label="Experience (Years)">
                <input type="number" placeholder="e.g. 3" min={0} max={50}
                  value={form.experience_years ?? ''}
                  onChange={e => set('experience_years', e.target.value ? parseInt(e.target.value) : null)}
                  style={inputStyle(false)} />
              </F>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <F name="email" label="Email Address">
                <input type="email" placeholder="you@email.com" value={form.email ?? ''}
                  onChange={e => set('email', e.target.value)} style={inputStyle(!!errors.email)} />
              </F>

              <F name="expected_salary" label="Expected Salary / Month (₹)">
                <input type="number" placeholder="e.g. 18000" min={0}
                  value={form.expected_salary ?? ''}
                  onChange={e => set('expected_salary', e.target.value ? parseInt(e.target.value) : null)}
                  style={inputStyle(false)} />
              </F>
            </div>

            <F name="aadhaar" label="Aadhaar Number">
              <input type="text" placeholder="12-digit Aadhaar (stored encrypted)" value={form.aadhaar ?? ''} maxLength={12}
                onChange={e => set('aadhaar', e.target.value.replace(/\D/g, ''))} style={inputStyle(!!errors.aadhaar)} />
              <p style={{ color: 'rgba(123,168,196,0.5)', fontSize: '0.7rem', marginTop: 4 }}>
                🔒 Encrypted at rest using AES-256. Displayed as XXXX-XXXX-1234.
              </p>
            </F>

            <button type="submit" disabled={submitting} style={{
              width: '100%', background: submitting ? 'rgba(0,180,255,0.3)' : 'linear-gradient(135deg,#00d4ff,#0099cc)',
              color: C.dark, fontWeight: 700, padding: '16px', borderRadius: 50, border: 'none',
              fontSize: '1rem', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
              boxShadow: submitting ? 'none' : '0 8px 30px rgba(0,212,255,0.3)',
              marginTop: 6,
            }}>
              {submitting ? '⏳ Submitting...' : '✅ Register Employee'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
