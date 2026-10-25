import type { Metadata } from 'next'
import Link from 'next/link'
import { AREA_PAGES } from '@/lib/areas'
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Areas We Serve in Vadodara',
  description: 'Relax Aircon provides AC service, repair and installation in Alkapuri, Fatehgunj, Gotri, Manjalpur, Akota, Sayajigunj, Vasna, Waghodia Road and more.',
  alternates: { canonical: '/areas' },
}

export default function AreasPage() {
  return (
    <main className="section page-top">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <span className="eyebrow">Service areas</span>
        <h1>Areas we serve in Vadodara</h1>
        <p className="lead">
          We send technicians to homes, shops and offices in these parts of Vadodara. Pick your area for prices and
          booking, or call <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.
        </p>
        <ul className="plain-list" style={{ marginTop: 28 }}>
          {AREA_PAGES.map(a => (
            <li key={a.slug}><Link href={`/${a.slug}`}>AC service in {a.area}</Link></li>
          ))}
        </ul>
        <p className="muted" style={{ marginTop: 28 }}>
          Not on the list? Call us. We may still be able to visit.
        </p>
      </div>
    </main>
  )
}
