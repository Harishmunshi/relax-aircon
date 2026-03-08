import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import ServicesPreview from '@/components/ServicesPreview'
import Testimonials from '@/components/Testimonials'

export const metadata: Metadata = {
  title: 'Relax Aircon | Best AC Service in Vadodara — Repair, Installation, Gas Refill',
  description: "Vadodara's most trusted AC, fridge & washing machine service. Fast repair, installation, gas refill. 24/7 emergency. Call Azhar Munshi: +91 70432 45355",
}

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <Testimonials />

      {/* CTA Section */}
      <section style={{ padding: '100px 60px', background: '#041525', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', background: 'linear-gradient(145deg,rgba(0,153,204,0.08),rgba(0,100,160,0.05))', border: '1px solid rgba(0,180,255,0.15)', borderRadius: 32, padding: '70px 60px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#00d4ff,transparent)' }} />
          <p style={{ fontSize: '0.7rem', letterSpacing: 4, textTransform: 'uppercase' as const, color: '#c9a84c', marginBottom: 16 }}>Get In Touch</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '3rem', fontWeight: 300, color: '#f0f8ff', marginBottom: 16 }}>
            Ready to <strong style={{ fontWeight: 700, color: '#00d4ff' }}>Fix It</strong> Today?
          </h2>
          <p style={{ color: '#7ba8c4', marginBottom: 40, fontSize: '1rem' }}>Call or WhatsApp Azhar Munshi directly — fastest response in Vadodara</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <a href="tel:+917043245355" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#00d4ff,#0099cc)', color: '#020c18', fontWeight: 700, fontSize: '0.9rem', padding: '16px 36px', borderRadius: 50, textDecoration: 'none', boxShadow: '0 8px 40px rgba(0,212,255,0.35)' }}>
              📞 +91 70432 45355
            </a>
            <a href="https://wa.me/917043245355?text=Hi%20Relax%20Aircon%2C%20I%20need%20service%20in%20Vadodara" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff', fontWeight: 500, fontSize: '0.9rem', padding: '16px 36px', borderRadius: 50, textDecoration: 'none' }}>
              💬 WhatsApp Us
            </a>
          </div>
          <p style={{ marginTop: 24, color: '#7ba8c4', fontSize: '0.8rem' }}>Alkapuri • Fatehgunj • Gotri • Manjalpur • Akota • Sayajigunj • Vasna • Waghodia Rd</p>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: '80px 60px', background: '#020c18' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#00d4ff', marginBottom: 12, display: 'block' }}>Find Us</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,4vw,3.5rem)', fontWeight: 300, color: '#f0f8ff', marginBottom: 40 }}>
            We Serve All of <strong style={{ fontWeight: 700, color: '#00d4ff' }}>Vadodara</strong>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '📞', label: 'Call Us', value: '+91 70432 45355', sub: 'Azhar Munshi — 8AM to 10PM', href: 'tel:+917043245355', color: '#00d4ff' },
                { icon: '💬', label: 'WhatsApp', value: '+91 70432 45355', sub: 'Usually replies in 10 minutes', href: 'https://wa.me/917043245355', color: '#25d366' },
                { icon: '⏰', label: 'Hours', value: 'Mon–Sun: 8AM – 10PM', sub: '🚨 24/7 Emergency Available', href: '#', color: '#f0f8ff' },
              ].map(c => (
                <a key={c.label} href={c.href} style={{ background: 'rgba(0,180,255,0.04)', border: '1px solid rgba(0,180,255,0.15)', borderRadius: 20, padding: 20, textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ color: '#7ba8c4', fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 4 }}>{c.label}</div>
                  <div style={{ color: c.color, fontWeight: 600, fontSize: '0.95rem' }}>{c.value}</div>
                  <div style={{ color: '#7ba8c4', fontSize: '0.75rem', marginTop: 3 }}>{c.sub}</div>
                </a>
              ))}
            </div>
            <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(0,180,255,0.15)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118467.78825803358!2d73.10149!3d22.30720!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5873e0a3ec3%3A0x20f3f5c41f6e2e9f!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1699000000000"
                width="100%" height="420" style={{ display: 'block', filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) saturate(1.2)', border: 0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Vadodara Map"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
