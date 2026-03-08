'use client'
import { useState } from 'react'

const testimonials = [
  { name: 'Mehul Shah', area: 'Alkapuri, Vadodara', rating: 5, text: 'Technician arrived in 1.5 hours, fixed my AC perfectly. Very professional and honest about pricing. Best AC service in Vadodara!', service: 'AC Repair' },
  { name: 'Priya Desai', area: 'Fatehgunj, Vadodara', rating: 5, text: 'Got my fridge repaired same day. They diagnosed the compressor issue quickly and charged very fairly. Highly recommend Azhar bhai!', service: 'Fridge Repair' },
  { name: 'Rajesh Patel', area: 'Gotri, Vadodara', rating: 5, text: 'Emergency AC repair at 11 PM in peak summer — they actually came! Fixed within an hour. True 24/7 service. Thank you Relax Aircon!', service: 'Emergency' },
  { name: 'Sneha Joshi', area: 'Manjalpur, Vadodara', rating: 5, text: 'Washing machine repaired in 45 minutes. Very affordable and the technician was extremely knowledgeable. Will call again!', service: 'Washing Machine' },
  { name: 'Amit Trivedi', area: 'Akota, Vadodara', rating: 5, text: 'Annual AMC has been amazing value. They service twice a year, everything works perfectly. No AC issues since I signed up!', service: 'Annual AMC' },
  { name: 'Kiran Patel', area: 'Sayajigunj, Vadodara', rating: 5, text: 'Gas refill done perfectly. AC is cooling like new again. Azhar bhai is very responsive on WhatsApp. Always calling Relax Aircon!', service: 'Gas Refill' },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  return (
    <section style={{ padding: '100px 60px', background: '#020c18' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#00d4ff', marginBottom: 12, display: 'block' }}>Customer Stories</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,4vw,3.8rem)', fontWeight: 300, color: '#f0f8ff', lineHeight: 1.1 }}>
          What Vadodara <strong style={{ fontWeight: 700, color: '#00d4ff' }}>Says</strong>
        </h2>
        <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg,#c9a84c,transparent)', margin: '16px 0 50px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
          {testimonials.map((t, i) => (
            <div key={i} onClick={() => setActive(i)} style={{
              background: active === i ? 'linear-gradient(145deg,rgba(0,153,204,0.1),rgba(0,100,160,0.08))' : 'linear-gradient(145deg,rgba(7,30,52,0.6),rgba(4,21,37,0.8))',
              border: `1px solid ${active === i ? 'rgba(0,212,255,0.3)' : 'rgba(0,180,255,0.15)'}`,
              borderRadius: 24, padding: 32, cursor: 'pointer', transition: 'all 0.3s'
            }}>
              <div style={{ color: '#c9a84c', fontSize: '0.9rem', letterSpacing: 2, marginBottom: 16 }}>{'★'.repeat(t.rating)}</div>
              <p style={{ fontSize: '0.9rem', color: '#7ba8c4', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#0099cc,#0a2540)', border: '1px solid rgba(0,180,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', color: '#00d4ff' }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#f0f8ff' }}>{t.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#7ba8c4', marginTop: 2 }}>{t.area}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '0.65rem', background: 'rgba(0,180,255,0.08)', border: '1px solid rgba(0,180,255,0.15)', color: '#00d4ff', padding: '4px 10px', borderRadius: 50 }}>{t.service}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
