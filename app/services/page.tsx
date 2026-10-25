import type { Metadata } from 'next'
import Link from 'next/link'
import ServicesPreview from '@/components/ServicesPreview'
import PopularServices from '@/components/PopularServices'
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Appliance Repair Services and Prices, Vadodara',
  description:
    'AC repair, service, installation and gas refill in Vadodara, plus fridge, washing machine, deep freezer and central AC work. Starting prices listed.',
  alternates: { canonical: '/services' },
}

const notes = [
  'Prices shown are labour starting rates for a standard unit.',
  'Spare parts and gas are charged separately and quoted to you before work starts.',
  'No hidden charges: the price you agree to is the price you pay.',
  'All repairs carry a 90 day warranty.',
]

export default function ServicesPage() {
  return (
    <main className="section page-top">
      <div className="wrap">
        <span className="eyebrow">Services</span>
        <h1>Appliance services in Vadodara</h1>
        <p className="lead" style={{ marginBottom: 36 }}>
          Everything we work on, with starting prices. Not sure what you need? Call{' '}
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a> and describe the problem.
        </p>
        <ServicesPreview />
        <PopularServices />
        <div className="two-col" style={{ marginTop: 48 }}>
          <div>
            <h2>How pricing works</h2>
            <ul className="plain-list muted">{notes.map(n => <li key={n}>{n}</li>)}</ul>
          </div>
          <div className="panel">
            <h2 style={{ fontSize: '1.3rem' }}>Ready to book?</h2>
            <p className="muted">Pick a slot online and we will call to confirm.</p>
            <Link href="/book" className="btn btn-primary">Book a visit</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
