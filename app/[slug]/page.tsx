import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LANDING_PAGES, landingBySlug } from '@/lib/landing'
import { AREAS, SITE_URL, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return LANDING_PAGES.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = landingBySlug(params.slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: `${page.title} | Relax Aircon`, description: page.description, url: `${SITE_URL}/${page.slug}` },
  }
}

export default function LandingPage({ params }: { params: { slug: string } }) {
  const page = landingBySlug(params.slug)
  if (!page) notFound()

  const url = `${SITE_URL}/${page.slug}`
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${page.serviceName} in Vadodara`,
      serviceType: page.serviceName,
      description: page.description,
      url,
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: { '@type': 'City', name: 'Vadodara' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: page.label, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ]
  const related = page.related.map(landingBySlug).filter(Boolean)

  return (
    <main className="section page-top" style={{ paddingBottom: 0 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="breadcrumb small">
          <Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span>{page.label}</span>
        </nav>

        <div className="hero-grid" style={{ marginTop: 16 }}>
          <div>
            <h1>{page.h1}</h1>
            <p className="lead">{page.intro}</p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-primary">Call {PHONE_DISPLAY}</a>
              <Link href={`/book?service=${encodeURIComponent(page.label)}`} className="btn btn-outline">Book a visit</Link>
            </div>
          </div>
          <aside className="panel" aria-labelledby="lp-prices">
            <h2 id="lp-prices" style={{ fontSize: '1.25rem' }}>Prices in Vadodara</h2>
            <table className="price-table">
              <tbody>{page.prices.map(([n, v]) => <tr key={n}><td>{n}</td><td>{v}</td></tr>)}</tbody>
            </table>
            <p className="muted small" style={{ margin: '12px 0 0' }}>Starting labour rates. Parts and gas quoted before work.</p>
          </aside>
        </div>

        <div className="two-col" style={{ marginTop: 56 }}>
          <section>
            <h2>{page.includesTitle}</h2>
            <ul className="plain-list">{page.includes.map(i => <li key={i}>{i}</li>)}</ul>
          </section>
          <section>
            <h2>{page.problemsTitle}</h2>
            <ul className="plain-list">{page.problems.map(i => <li key={i}>{i}</li>)}</ul>
          </section>
        </div>

        <section style={{ marginTop: 56 }} aria-labelledby="lp-faq">
          <h2 id="lp-faq">Questions about {page.label.toLowerCase()} in Vadodara</h2>
          <div className="faq">
            {page.faqs.map(f => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p className="muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 56 }} aria-labelledby="lp-areas">
          <h2 id="lp-areas">{page.label} across Vadodara</h2>
          <p className="muted">We visit homes, offices and shops in every part of the city, including:</p>
          <ul className="tag-list">{AREAS.map(a => <li key={a}>{a}</li>)}</ul>
        </section>

        {related.length > 0 && (
          <section style={{ marginTop: 56 }} aria-labelledby="lp-related">
            <h2 id="lp-related" style={{ fontSize: '1.3rem' }}>Related services</h2>
            <ul className="tag-list">
              {related.map(r => <li key={r!.slug}><Link href={`/${r!.slug}`}>{r!.label} in Vadodara</Link></li>)}
            </ul>
          </section>
        )}
      </div>

      <section className="cta-band" style={{ marginTop: 64 }}>
        <div className="wrap">
          <h2>Need {page.label.toLowerCase()} today?</h2>
          <p className="muted">Call or WhatsApp {PHONE_DISPLAY}. Same-day visits across Vadodara.</p>
          <div className="btn-row">
            <a href={`tel:${PHONE_TEL}`} className="btn btn-primary">Call now</a>
            <a href={whatsappLink(`Hi Relax Aircon, I need ${page.label.toLowerCase()} in Vadodara`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">WhatsApp us</a>
          </div>
        </div>
      </section>
    </main>
  )
}
