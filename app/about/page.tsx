import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Relax Aircon | Azhar Munshi — Vadodara AC Service Since 2020',
  description: 'Learn about Relax Aircon by Azhar Munshi. Trusted AC service in Vadodara since 2020. Expert technicians, affordable pricing.',
}

export default function AboutPage() {
  const why = [
    { icon: '⚡', title: 'Fast Response', desc: 'Technician at your door within 2 hours across all Vadodara' },
    { icon: '🛡️', title: 'Verified Techs', desc: 'Background-checked, trained professionals only' },
    { icon: '💰', title: 'Best Pricing', desc: 'Transparent rates, zero hidden charges guaranteed' },
    { icon: '📋', title: '90-Day Warranty', desc: 'On all repairs — we fully stand behind our work' },
    { icon: '🔧', title: 'All Brands', desc: 'Daikin, Voltas, LG, Samsung, Blue Star, Hitachi & more' },
    { icon: '📞', title: '24/7 Support', desc: 'Call or WhatsApp anytime — emergency always available' },
  ]
  return (
    <main style={{ minHeight: '100vh', background: '#020c18', paddingTop: 100 }}>
      <section style={{ padding: '60px 60px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#00d4ff', display: 'block', marginBottom: 12 }}>Our Story</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,5vw,5rem)', fontWeight: 300, color: '#f0f8ff', lineHeight: 1.1, marginBottom: 20 }}>
            Cooling Vadodara<br /><strong style={{ fontWeight: 700, color: '#00d4ff' }}>Since 2020</strong>
          </h1>
          <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg,#c9a84c,transparent)', marginBottom: 60 }} />

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 60 }}>
            {[['2020','Founded'],['10K+','Customers'],['4.9★','Rating'],['24/7','Support']].map(([v, l]) => (
              <div key={l} style={{ background: 'linear-gradient(145deg,rgba(0,153,204,0.08),rgba(0,100,160,0.05))', border: '1px solid rgba(0,180,255,0.15)', borderRadius: 20, padding: 28, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.8rem', fontWeight: 700, background: 'linear-gradient(135deg,#00d4ff,#f0f8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
                <div style={{ color: '#7ba8c4', fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase' as const, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Story */}
          <div style={{ background: 'linear-gradient(145deg,rgba(7,30,52,0.8),rgba(4,21,37,0.9))', border: '1px solid rgba(0,180,255,0.15)', borderRadius: 24, padding: 40, marginBottom: 60 }}>
            <p style={{ color: '#7ba8c4', fontSize: '1rem', lineHeight: 1.8, marginBottom: 16 }}>
              Founded in 2020 by <strong style={{ color: '#f0f8ff' }}>Azhar Munshi</strong>, Relax Aircon started with a simple mission — provide fast, honest, and affordable appliance service to every home and business in Vadodara.
            </p>
            <p style={{ color: '#7ba8c4', fontSize: '1rem', lineHeight: 1.8, marginBottom: 16 }}>
              What started as a small repair operation has grown into the city's most trusted name for AC, refrigerator, and washing machine services. We've built our reputation one satisfied customer at a time.
            </p>
            <p style={{ color: '#00d4ff', fontSize: '1rem', lineHeight: 1.8, fontWeight: 500 }}>
              Today we serve 10,000+ happy customers across all areas of Vadodara — from Alkapuri to Waghodia Road.
            </p>

            {/* Owner card */}
            <div style={{ marginTop: 32, background: 'linear-gradient(145deg,rgba(201,168,76,0.08),rgba(10,25,45,0.9))', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 20, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a84c,#e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: '#020c18', flexShrink: 0 }}>A</div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 600, color: '#f0f8ff' }}>Azhar Munshi</div>
                <div style={{ color: '#e8c97a', fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase' as const, marginTop: 4 }}>Founder & Owner</div>
                <a href="tel:+917043245355" style={{ color: '#00d4ff', fontSize: '0.95rem', fontWeight: 600, marginTop: 8, display: 'block', textDecoration: 'none' }}>📞 +91 70432 45355</a>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', fontWeight: 300, color: '#f0f8ff', marginBottom: 32, textAlign: 'center' }}>
            Why Choose <strong style={{ fontWeight: 700, color: '#00d4ff' }}>Relax Aircon?</strong>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16, marginBottom: 60 }}>
            {why.map(w => (
              <div key={w.title} style={{ background: 'rgba(0,180,255,0.04)', border: '1px solid rgba(0,180,255,0.15)', borderRadius: 20, padding: 24 }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{w.icon}</div>
                <div style={{ fontWeight: 600, color: '#f0f8ff', marginBottom: 6 }}>{w.title}</div>
                <div style={{ color: '#7ba8c4', fontSize: '0.85rem', lineHeight: 1.6 }}>{w.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/book" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#00d4ff,#0099cc)', color: '#020c18', fontWeight: 700, fontSize: '1rem', padding: '16px 40px', borderRadius: 50, textDecoration: 'none', boxShadow: '0 8px 40px rgba(0,212,255,0.35)' }}>
              🔧 Book a Service Now →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
