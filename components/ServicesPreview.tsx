import Link from 'next/link'

const services = [
  { icon: '❄️', name: 'Air Conditioner', cat: 'Split & Window AC', desc: 'Installation, repair, gas refill, cleaning & AMC.', prices: [['Installation','₹1,200+'],['Repair','₹350+'],['Gas Refill','₹2,500+'],['Service','₹350+']], featured: false },
  { icon: '🏢', name: 'Central AC System', cat: 'Central AC', desc: 'Commercial & industrial central AC installation, repair and maintenance.', prices: [['Installation','₹3,000+'],['Repair','₹500+'],['Gas Refill','₹4,000+'],['Service','₹750+']], featured: true },
  { icon: '🧊', name: 'Fridge & Freezer', cat: 'Refrigeration', desc: 'All fridge repairs — cooling, compressor, gas refill, thermostat.', prices: [['Fridge Repair','₹400+'],['Gas Refill','₹2,500+'],['Deep Freezer','₹500+'],['Water Cooler','₹400+']], featured: false },
  { icon: '🌀', name: 'Washing Machine', cat: 'Laundry', desc: 'Front load, top load — motor, drum, PCB, water pump repairs.', prices: [['Repair','₹350+'],['Service','₹299+'],['Installation','₹499+']], featured: false },
  { icon: '🏪', name: 'Deep Freezer & Cooler', cat: 'Commercial', desc: 'Commercial deep freezer and water cooler servicing.', prices: [['Deep Freezer','₹500+'],['Water Cooler','₹400+'],['AMC','₹2,000+']], featured: false },
  { icon: '🚨', name: 'Emergency Repair', cat: '24/7 Emergency', desc: 'Technician at your door in under 2 hours, anywhere in Vadodara.', prices: [['Response Time','< 2 Hrs'],['Available','24/7/365']], featured: false, emergency: true },
]

const S = {
  card: (featured: boolean, emergency: boolean) => ({
    background: featured ? 'linear-gradient(145deg,rgba(10,25,45,0.9),rgba(15,20,35,0.95))' : 'linear-gradient(145deg,rgba(7,30,52,0.8),rgba(4,21,37,0.9))',
    border: `1px solid ${emergency ? 'rgba(255,80,80,0.2)' : featured ? 'rgba(201,168,76,0.3)' : 'rgba(0,180,255,0.15)'}`,
    borderRadius: 24, padding: 32, position: 'relative' as const, overflow: 'hidden' as const,
    transition: 'all 0.4s', display: 'flex', flexDirection: 'column' as const
  })
}

export default function ServicesPreview() {
  return (
    <section style={{ padding: '100px 60px', background: '#041525' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#00d4ff', marginBottom: 12, display: 'block' }}>What We Fix</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,4vw,3.8rem)', fontWeight: 300, color: '#f0f8ff', lineHeight: 1.1 }}>
          Premium <strong style={{ fontWeight: 700, color: '#00d4ff' }}>Services</strong><br />For Every Appliance
        </h2>
        <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg,#c9a84c,transparent)', margin: '16px 0 40px' }} />
        <p style={{ color: '#7ba8c4', fontSize: '1rem', lineHeight: 1.7, maxWidth: 500, marginBottom: 60 }}>
          From split ACs to deep freezers — expert hands, honest pricing, same-day service across all of Vadodara.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
          {services.map(s => (
            <div key={s.name} style={S.card(s.featured ?? false, s.emergency ?? false)}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' as const, color: s.emergency ? '#ff6b6b' : s.featured ? '#c9a84c' : '#c9a84c', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 20, height: 1, background: s.emergency ? '#ff6b6b' : '#c9a84c' }} />
                {s.cat}
              </div>
              <div style={{ width: 60, height: 60, background: s.emergency ? 'rgba(255,60,60,0.08)' : s.featured ? 'rgba(201,168,76,0.08)' : 'rgba(0,180,255,0.08)', border: `1px solid ${s.emergency ? 'rgba(255,80,80,0.2)' : s.featured ? 'rgba(201,168,76,0.2)' : 'rgba(0,180,255,0.15)'}`, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', marginBottom: 20 }}>
                {s.icon}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 600, color: '#f0f8ff', marginBottom: 8 }}>{s.name}</div>
              <p style={{ fontSize: '0.85rem', color: '#7ba8c4', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>{s.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 24 }}>
                {s.prices.map(([n, v]) => (
                  <div key={n} style={{ background: s.emergency ? 'rgba(255,60,60,0.06)' : s.featured ? 'rgba(201,168,76,0.06)' : 'rgba(0,180,255,0.06)', border: `1px solid ${s.emergency ? 'rgba(255,80,80,0.15)' : s.featured ? 'rgba(201,168,76,0.12)' : 'rgba(0,180,255,0.12)'}`, borderRadius: 8, padding: '6px 12px', fontSize: '0.75rem' }}>
                    <span style={{ color: '#7ba8c4', display: 'block', marginBottom: 2 }}>{n}</span>
                    <span style={{ color: s.emergency ? '#ff6b6b' : s.featured ? '#e8c97a' : '#00d4ff', fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
              {s.emergency ? (
                <a href="tel:+917043245355" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: '1px solid rgba(255,80,80,0.3)', color: '#ff6b6b', padding: '12px 20px', borderRadius: 12, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                  Call Emergency Now <span>→</span>
                </a>
              ) : (
                <Link href={`/book?service=${encodeURIComponent(s.name)}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: `1px solid ${s.featured ? 'rgba(201,168,76,0.3)' : 'rgba(0,180,255,0.2)'}`, color: s.featured ? '#e8c97a' : '#00d4ff', padding: '12px 20px', borderRadius: 12, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                  Book {s.name} <span>→</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
