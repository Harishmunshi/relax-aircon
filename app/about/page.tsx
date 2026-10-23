import type { Metadata } from 'next'
import Link from 'next/link'
import { OWNER, FOUNDED, PHONE_DISPLAY, PHONE_TEL, BRANDS } from '@/lib/site'

export const metadata: Metadata = {
  title: `About Relax Aircon and ${OWNER}`,
  description: `Relax Aircon is a Vadodara appliance service run by ${OWNER} since ${FOUNDED}. AC, fridge and washing machine repair with upfront pricing.`,
  alternates: { canonical: '/about' },
}

const promises = [
  ['Upfront pricing', 'You hear the full cost after inspection and before any work. No surprise add-ons.'],
  ['Verified technicians', 'Background-checked, trained professionals only.'],
  ['90 day warranty', 'On all repairs. We stand behind our work.'],
  ['All major brands', `${BRANDS.slice(0, 6).join(', ')} and more.`],
] as const

export default function AboutPage() {
  return (
    <main className="section page-top">
      <div className="wrap">
        <span className="eyebrow">About us</span>
        <h1>Vadodara&apos;s appliance service since {FOUNDED}</h1>
        <div className="two-col" style={{ marginTop: 28 }}>
          <div>
            <p className="lead">
              {OWNER} started Relax Aircon in {FOUNDED} to give Vadodara homes and businesses fast,
              honest and affordable appliance repair. You can call or WhatsApp Azhar directly.
            </p>
            <p className="muted">
              What started as a small repair operation now covers air conditioners, refrigerators,
              washing machines, deep freezers and commercial central AC across the city. We built
              the business one satisfied customer at a time.
            </p>
            <p className="muted">
              Questions before you book? Call <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.
            </p>
          </div>
          <div className="panel">
            <h2 style={{ fontSize: '1.3rem' }}>What you can expect</h2>
            <dl style={{ margin: 0 }}>
              {promises.map(([title, body]) => (
                <div key={title} style={{ padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                  <dt style={{ fontWeight: 600 }}>{title}</dt>
                  <dd className="muted" style={{ margin: '2px 0 0' }}>{body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="btn-row" style={{ marginTop: 40 }}>
          <Link href="/book" className="btn btn-primary">Book a visit</Link>
          <Link href="/services" className="btn btn-outline">See services and prices</Link>
        </div>
      </div>
    </main>
  )
}
