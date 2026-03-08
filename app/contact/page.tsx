import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Relax Aircon Vadodara | Call +91 70432 45355',
  description: 'Contact Relax Aircon for AC service in Vadodara. Call or WhatsApp Azhar Munshi: +91 70432 45355. 24/7 emergency available.',
}

export default function ContactPage() {
  const areas = ['Alkapuri','Fatehgunj','Gotri','Manjalpur','Akota','Sayajigunj','Vasna','Waghodia Rd','Nizampura','Karelibaug','Subhanpura','Harni']
  return (
    <main style={{ minHeight: '100vh', background: '#020c18', paddingTop: 100 }}>
      <section style={{ padding: '60px 60px 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#00d4ff', display: 'block', marginBottom: 12 }}>Get In Touch</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '3.5rem', fontWeight: 300, color: '#f0f8ff', marginBottom: 12 }}>
              Contact <strong style={{ fontWeight: 700, color: '#00d4ff' }}>Us</strong>
            </h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <a href="tel:+917043245355" style={{ background: 'rgba(0,180,255,0.04)', border: '1px solid rgba(0,180,255,0.15)', borderRadius: 20, padding: 24, textDecoration: 'none', display: 'block', transition: 'all 0.3s' }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>📞</div>
              <div style={{ color: '#7ba8c4', fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 4 }}>Call Us</div>
              <div style={{ color: '#00d4ff', fontWeight: 700, fontSize: '1.2rem' }}>+91 70432 45355</div>
              <div style={{ color: '#7ba8c4', fontSize: '0.8rem', marginTop: 4 }}>Azhar Munshi — 8AM to 10PM</div>
            </a>
            <a href="https://wa.me/917043245355?text=Hi%20Relax%20Aircon%2C%20I%20need%20service" target="_blank" style={{ background: 'rgba(37,211,102,0.04)', border: '1px solid rgba(37,211,102,0.2)', borderRadius: 20, padding: 24, textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>💬</div>
              <div style={{ color: '#7ba8c4', fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 4 }}>WhatsApp</div>
              <div style={{ color: '#25d366', fontWeight: 700, fontSize: '1.2rem' }}>+91 70432 45355</div>
              <div style={{ color: '#7ba8c4', fontSize: '0.8rem', marginTop: 4 }}>Replies within 10 minutes</div>
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
            <div style={{ background: 'rgba(0,180,255,0.04)', border: '1px solid rgba(0,180,255,0.15)', borderRadius: 20, padding: 24 }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>📍</div>
              <div style={{ color: '#7ba8c4', fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 8 }}>Service Areas</div>
              <div style={{ color: '#f0f8ff', fontWeight: 600, marginBottom: 12 }}>All of Vadodara, Gujarat</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
                {areas.map(a => <span key={a} style={{ background: 'rgba(0,180,255,0.06)', border: '1px solid rgba(0,180,255,0.15)', color: '#7ba8c4', fontSize: '0.7rem', padding: '3px 10px', borderRadius: 50 }}>{a}</span>)}
              </div>
            </div>
            <div style={{ background: 'rgba(0,180,255,0.04)', border: '1px solid rgba(0,180,255,0.15)', borderRadius: 20, padding: 24 }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>⏰</div>
              <div style={{ color: '#7ba8c4', fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 12 }}>Working Hours</div>
              {[['Monday–Saturday','8:00 AM – 10:00 PM'],['Sunday','9:00 AM – 8:00 PM'],['🚨 Emergency','24 Hours / 7 Days']].map(([d, t]) => (
                <div key={d} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(0,180,255,0.08)' }}>
                  <span style={{ color: '#7ba8c4', fontSize: '0.85rem' }}>{d}</span>
                  <span style={{ color: d.includes('🚨') ? '#ff6b6b' : '#00d4ff', fontSize: '0.85rem', fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(0,180,255,0.15)' }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118467.78825803358!2d73.10149!3d22.30720!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5873e0a3ec3%3A0x20f3f5c41f6e2e9f!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1699000000000"
              width="100%" height="350" style={{ display: 'block', filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) saturate(1.2)', border: 0 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Vadodara Map" />
          </div>
        </div>
      </section>
    </main>
  )
}
