import Link from 'next/link'
import { AREA_PAGES, type AreaPage } from '@/lib/areas'
import { BRAND_PAGES } from '@/lib/brands'
import { LANDING_PAGES } from '@/lib/landing'
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL, priceOf, whatsappLink } from '@/lib/site'

export default function AreaView({ page }: { page: AreaPage }) {
  const { area } = page
  const url = `${SITE_URL}/${page.slug}`
  const prices: [string, string][] = [
    ['AC service', priceOf('ac', 'Service')],
    ['AC repair', priceOf('ac', 'Repair')],
    ['AC gas filling', priceOf('ac', 'Gas refill')],
    ['AC installation', priceOf('ac', 'Installation')],
    ['Fridge repair', priceOf('fridge', 'Repair')],
    ['Washing machine repair', priceOf('washing-machine', 'Repair')],
  ]
  const faqs = [
    { q: `Do you provide AC service in ${area}, Vadodara?`, a: `Yes. Relax Aircon visits homes, shops and offices in ${area} for AC service, repair, gas filling and installation, as well as fridge and washing machine repair.` },
    { q: `How soon can a technician reach ${area}?`, a: `We can usually visit the same day. For urgent breakdowns in ${area}, call ${PHONE_DISPLAY} and we send the nearest available technician, typically in under 2 hours.` },
    { q: `How much does AC service cost in ${area}?`, a: `AC service starts from ${priceOf('ac', 'Service')}, AC repair from ${priceOf('ac', 'Repair')} and gas filling from ${priceOf('ac', 'Gas refill')}. You are told the full price before any work starts.` },
    { q: `Which AC brands do you repair in ${area}?`, a: 'Daikin, Voltas, LG, Samsung, Blue Star, Hitachi, Lloyd, Carrier and other major brands, including inverter models.' },
  ]
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `AC service and repair in ${area}, Vadodara`,
      serviceType: 'AC service and repair',
      url,
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: { '@type': 'Place', name: `${area}, Vadodara` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Areas', item: `${SITE_URL}/areas` },
        { '@type': 'ListItem', position: 3, name: area, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]
  const others = AREA_PAGES.filter(a => a.slug !== page.slug)

  return (
    <main className="section page-top" style={{ paddingBottom: 0 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="breadcrumb small">
          <Link href="/">Home</Link> / <Link href="/areas">Areas</Link> / <span>{area}</span>
        </nav>
        <div className="hero-grid" style={{ marginTop: 16 }}>
          <div>
            <h1>{page.h1}</h1>
            <p className="lead">
              Relax Aircon sends technicians to homes, shops and offices in {area} and across Vadodara. Call, WhatsApp
              or book online for AC service, repair, gas filling and installation. You get the price before work starts,
              and all repairs carry a 90 day warranty.
            </p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-primary">Call {PHONE_DISPLAY}</a>
              <Link href={`/book?service=${encodeURIComponent('AC service')}`} className="btn btn-outline">Book a visit</Link>
            </div>
          </div>
          <aside className="panel" aria-labelledby="area-prices">
            <h2 id="area-prices" style={{ fontSize: '1.25rem' }}>Prices in {area}</h2>
            <table className="price-table">
              <tbody>{prices.map(([n, v]) => <tr key={n}><td>{n}</td><td>{v}</td></tr>)}</tbody>
            </table>
            <p className="muted small" style={{ margin: '12px 0 0' }}>Starting labour rates. Parts and gas quoted before work.</p>
          </aside>
        </div>

        <section style={{ marginTop: 56 }} aria-labelledby="area-services">
          <h2 id="area-services">Services we offer in {area}</h2>
          <ul className="plain-list">
            {LANDING_PAGES.map(l => (
              <li key={l.slug}><Link href={`/${l.slug}`}>{l.label} in {area}, Vadodara</Link></li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: 48 }} aria-labelledby="area-brands">
          <h2 id="area-brands">AC brands we repair in {area}</h2>
          <ul className="tag-list">
            {BRAND_PAGES.map(b => <li key={b.slug}><Link href={`/${b.slug}`}>{b.brand} AC service</Link></li>)}
          </ul>
        </section>

        <section style={{ marginTop: 56 }} aria-labelledby="area-faq">
          <h2 id="area-faq">Questions about AC service in {area}</h2>
          <div className="faq">
            {faqs.map(f => (
              <details key={f.q}><summary>{f.q}</summary><p className="muted">{f.a}</p></details>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }} aria-labelledby="area-others">
          <h2 id="area-others" style={{ fontSize: '1.3rem' }}>We also serve</h2>
          <ul className="tag-list">
            {others.map(a => <li key={a.slug}><Link href={`/${a.slug}`}>{a.area}</Link></li>)}
          </ul>
        </section>
      </div>

      <section className="cta-band" style={{ marginTop: 64 }}>
        <div className="wrap">
          <h2>AC problem in {area}?</h2>
          <p className="muted">Call or WhatsApp {PHONE_DISPLAY}. Same-day visits across Vadodara.</p>
          <div className="btn-row">
            <a href={`tel:${PHONE_TEL}`} className="btn btn-primary">Call now</a>
            <a href={whatsappLink(`Hi Relax Aircon, I need AC service in ${area}, Vadodara`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">WhatsApp us</a>
          </div>
        </div>
      </section>
    </main>
  )
}
