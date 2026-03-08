import type { Metadata } from 'next'
import ServicesPreview from '@/components/ServicesPreview'

export const metadata: Metadata = {
  title: 'AC Services in Vadodara | Repair, Installation, Gas Refill — Relax Aircon',
  description: 'Complete AC services in Vadodara: repair, installation, gas refill, fridge repair, washing machine. Best prices. Call +91 70432 45355',
}

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: 80 }}>
      <div style={{ padding: '60px 60px 20px', background: '#041525' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#00d4ff', display: 'block', marginBottom: 12 }}>All Services</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: '#f0f8ff' }}>
            AC Services in <strong style={{ fontWeight: 700, color: '#00d4ff' }}>Vadodara</strong>
          </h1>
        </div>
      </div>
      <ServicesPreview />
    </main>
  )
}
