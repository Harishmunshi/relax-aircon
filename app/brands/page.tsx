import type { Metadata } from 'next'
import Link from 'next/link'
import { BRAND_PAGES } from '@/lib/brands'
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AC Brands We Repair in Vadodara',
  description: 'We service and repair Daikin, Voltas, LG, Samsung, Blue Star, Hitachi, Lloyd and Carrier air conditioners at home in Vadodara.',
  alternates: { canonical: '/brands' },
}

export default function BrandsPage() {
  return (
    <main className="section page-top">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <span className="eyebrow">Brands</span>
        <h1>AC brands we repair in Vadodara</h1>
        <p className="lead">
          Split, window, cassette and central units from these brands. Call <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a> if
          your brand is not listed.
        </p>
        <ul className="plain-list" style={{ marginTop: 28 }}>
          {BRAND_PAGES.map(b => (
            <li key={b.slug}><Link href={`/${b.slug}`}>{b.brand} AC service and repair in Vadodara</Link></li>
          ))}
        </ul>
        <p className="muted small" style={{ marginTop: 28 }}>
          Brand names are trademarks of their owners. Relax Aircon is an independent service provider.
        </p>
      </div>
    </main>
  )
}
