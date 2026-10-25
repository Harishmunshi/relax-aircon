import Link from 'next/link'
import { BRAND_PAGES, type BrandPage } from '@/lib/brands'
import { AREA_PAGES } from '@/lib/areas'
import { LANDING_PAGES } from '@/lib/landing'
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL, priceOf, whatsappLink } from '@/lib/site'

export default function BrandView({ page }: { page: BrandPage }) {
  const { brand } = page
  const url = `${SITE_URL}/${page.slug}`
  const prices: [string, string][] = [
    [`${brand} AC service`, priceOf('ac', 'Service')],
    [`${brand} AC repair`, priceOf('ac', 'Repair')],
    [`${brand} AC gas filling`, priceOf('ac', 'Gas refill')],
    [`${brand} AC installation`, priceOf('ac', 'Installation')],
  ]
  const faqs = [
    { q: `Do you repair ${brand} ACs in Vadodara?`, a: `Yes. We service, repair and install ${brand} split and window ACs at your home anywhere in Vadodara, including inverter models.` },
    { q: `How much does ${brand} AC service cost in Vadodara?`, a: `AC service starts from ${priceOf('ac', 'Service')} and repair from ${priceOf('ac', 'Repair')}. Parts and gas are quoted before work starts.` },
    { q: `My ${brand} AC shows an error code. What should I do?`, a: `Note the code or blinking pattern, switch the AC off if it keeps tripping, and call us. Error codes differ by model, so the technician checks the code against your unit.` },
    { q: `Are you an authorised ${brand} service centre?`, a: `No. Relax Aircon is an independent service business. Repairs carry our own 90 day warranty. If your ${brand} AC is still under the manufacturer's warranty, check whether our work could affect it before we start.` },
  ]
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${brand} AC service and repair in Vadodara`,
      serviceType: `${brand} AC repair`,
      url,
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: { '@type': 'City', name: 'Vadodara' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: `${SITE_URL}/brands` },
        { '@type': 'ListItem', position: 3, name: brand, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]
  const others = BRAND_PAGES.filter(b => b.slug !== page.slug)

  return (
    <main className="section page-top" style={{ paddingBottom: 0 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="breadcrumb small">
          <Link href="/">Home</Link> / <Link href="/brands">Brands</Link> / <span>{brand}</span>
        </nav>
        <div className="hero-grid" style={{ marginTop: 16 }}>
          <div>
            <h1>{page.h1}</h1>
            <p className="lead">{page.note}</p>
            <p className="muted">
              Call or book online. The technician checks your unit, tells you the full cost, and starts only after you agree.
              All repairs carry a 90 day warranty.
            </p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-primary">Call {PHONE_DISPLAY}</a>
              <Link href={`/book?service=${encodeURIComponent('AC repair')}`} className="btn btn-outline">Book a visit</Link>
            </div>
          </div>
          <aside className="panel" aria-labelledby="brand-prices">
            <h2 id="brand-prices" style={{ fontSize: '1.25rem' }}>{brand} AC prices in Vadodara</h2>
            <table className="price-table">
              <tbody>{prices.map(([n, v]) => <tr key={n}><td>{n}</td><td>{v}</td></tr>)}</tbody>
            </table>
            <p className="muted small" style={{ margin: '12px 0 0' }}>Starting labour rates. Parts and gas quoted before work.</p>
          </aside>
        </div>

        <section style={{ marginTop: 56 }} aria-labelledby="brand-services">
          <h2 id="brand-services">What we do for {brand} ACs</h2>
          <ul className="plain-list">
            {LANDING_PAGES.filter(l => l.slug.startsWith('ac-') || l.slug.includes('-ac-')).map(l => (
              <li key={l.slug}><Link href={`/${l.slug}`}>{l.label} in Vadodara</Link></li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: 48 }} aria-labelledby="brand-areas">
          <h2 id="brand-areas">{brand} AC service across Vadodara</h2>
          <ul className="tag-list">
            {AREA_PAGES.map(a => <li key={a.slug}><Link href={`/${a.slug}`}>{a.area}</Link></li>)}
          </ul>
        </section>

        <section style={{ marginTop: 56 }} aria-labelledby="brand-faq">
          <h2 id="brand-faq">Questions about {brand} AC service</h2>
          <div className="faq">
            {faqs.map(f => (
              <details key={f.q}><summary>{f.q}</summary><p className="muted">{f.a}</p></details>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }} aria-labelledby="brand-others">
          <h2 id="brand-others" style={{ fontSize: '1.3rem' }}>Other brands we service</h2>
          <ul className="tag-list">
            {others.map(b => <li key={b.slug}><Link href={`/${b.slug}`}>{b.brand}</Link></li>)}
          </ul>
          <p className="muted small" style={{ marginTop: 16 }}>
            Brand names are trademarks of their owners. Relax Aircon is an independent service provider.
          </p>
        </section>
      </div>

      <section className="cta-band" style={{ marginTop: 64 }}>
        <div className="wrap">
          <h2>{brand} AC problem?</h2>
          <p className="muted">Call or WhatsApp {PHONE_DISPLAY}. Same-day visits across Vadodara.</p>
          <div className="btn-row">
            <a href={`tel:${PHONE_TEL}`} className="btn btn-primary">Call now</a>
            <a href={whatsappLink(`Hi Relax Aircon, I need ${brand} AC service in Vadodara`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">WhatsApp us</a>
          </div>
        </div>
      </section>
    </main>
  )
}
