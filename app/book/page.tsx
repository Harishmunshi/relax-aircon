'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function BookForm() {
  const params = useSearchParams()
  const [form, setForm] = useState({ name: '', phone: '', address: '', acType: '', service: params.get('service') || '', problem: '', date: '', time: '' })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address) return alert('Please fill all required fields')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setDone(true)
  }

  const inp = (placeholder: string, key: string, type = 'text') => (
    <input type={type} placeholder={placeholder} value={(form as any)[key]} onChange={e => set(key, e.target.value)}
      style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(0,180,255,0.2)', color: '#f0f8ff', borderRadius: 12, padding: '12px 16px', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
    />
  )

  const sel = (key: string, options: string[]) => (
    <select value={(form as any)[key]} onChange={e => set(key, e.target.value)}
      style={{ width: '100%', background: '#041525', border: '1px solid rgba(0,180,255,0.2)', color: '#f0f8ff', borderRadius: 12, padding: '12px 16px', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}>
      <option value="">Select...</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  )

  if (done) return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '4rem', marginBottom: 20 }}>✅</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', color: '#f0f8ff', marginBottom: 12 }}>Booking Confirmed!</h2>
      <p style={{ color: '#7ba8c4', marginBottom: 8 }}>We will call you within 30 minutes.</p>
      <p style={{ color: '#00d4ff', fontWeight: 600, fontSize: '1.1rem', marginBottom: 30 }}>Azhar Munshi: +91 70432 45355</p>
      <a href="https://wa.me/917043245355?text=Hi%2C%20I%20just%20booked%20a%20service" target="_blank"
        style={{ background: '#25d366', color: 'white', fontWeight: 700, padding: '14px 32px', borderRadius: 50, textDecoration: 'none', fontSize: '1rem' }}>
        Confirm on WhatsApp
      </a>
    </div>
  )

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div><label style={{ color: '#7ba8c4', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Full Name *</label>{inp('Your name', 'name')}</div>
        <div><label style={{ color: '#7ba8c4', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Phone *</label>{inp('+91 XXXXX XXXXX', 'phone')}</div>
      </div>
      <div><label style={{ color: '#7ba8c4', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Full Address *</label>
        <textarea placeholder="Area, Street, Landmark — Vadodara" value={form.address} onChange={e => set('address', e.target.value)} rows={2}
          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(0,180,255,0.2)', color: '#f0f8ff', borderRadius: 12, padding: '12px 16px', fontSize: '0.9rem', outline: 'none', resize: 'none', fontFamily: 'inherit' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div><label style={{ color: '#7ba8c4', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>AC Type</label>{sel('acType', ['Split AC','Window AC','Cassette AC','Central AC','Tower AC'])}</div>
        <div><label style={{ color: '#7ba8c4', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Service</label>{sel('service', ['AC Repair','AC Installation','Gas Refill','Deep Cleaning','Annual AMC','Fridge Repair','Washing Machine','Emergency Repair'])}</div>
      </div>
      <div><label style={{ color: '#7ba8c4', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Problem Description</label>
        <textarea placeholder="AC not cooling, making noise, water leaking..." value={form.problem} onChange={e => set('problem', e.target.value)} rows={3}
          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(0,180,255,0.2)', color: '#f0f8ff', borderRadius: 12, padding: '12px 16px', fontSize: '0.9rem', outline: 'none', resize: 'none', fontFamily: 'inherit' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div><label style={{ color: '#7ba8c4', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Preferred Date</label>{inp('', 'date', 'date')}</div>
        <div><label style={{ color: '#7ba8c4', fontSize: '0.8rem', display: 'block', marginBottom: 6 }}>Preferred Time</label>{sel('time', ['9AM–11AM','11AM–1PM','1PM–3PM','3PM–5PM','5PM–7PM','7PM–9PM'])}</div>
      </div>
      <button type="submit" disabled={loading}
        style={{ width: '100%', background: 'linear-gradient(135deg,#00d4ff,#0099cc)', color: '#020c18', fontWeight: 700, padding: '16px', borderRadius: 50, border: 'none', fontSize: '1rem', cursor: 'pointer', opacity: loading ? 0.6 : 1, fontFamily: 'inherit' }}>
        {loading ? '⏳ Booking...' : '🔧 Confirm Booking'}
      </button>
      <p style={{ textAlign: 'center', color: '#7ba8c4', fontSize: '0.85rem' }}>
        Or call: <a href="tel:+917043245355" style={{ color: '#00d4ff', fontWeight: 700, textDecoration: 'none' }}>+91 70432 45355</a>
      </p>
    </form>
  )
}

export default function BookPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#020c18', paddingTop: 100, paddingBottom: 80, padding: '100px 24px 80px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#00d4ff', display: 'block', marginBottom: 12 }}>Easy Booking</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '3rem', fontWeight: 300, color: '#f0f8ff', marginBottom: 8 }}>Book AC Service</h1>
          <p style={{ color: '#7ba8c4' }}>We confirm within 30 minutes</p>
        </div>
        <div style={{ background: 'linear-gradient(145deg,rgba(7,30,52,0.8),rgba(4,21,37,0.9))', border: '1px solid rgba(0,180,255,0.15)', borderRadius: 24, padding: 32 }}>
          <Suspense fallback={<div style={{ color: '#7ba8c4', textAlign: 'center' }}>Loading...</div>}>
            <BookForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
