import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GUIDES, guideBySlug } from '@/lib/guides'
import { landingBySlug } from '@/lib/landing'
import { SITE_URL, BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = guideBySlug(params.slug)
  if (!g) return {}
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: 'article', title: g.title, description: g.description, url: `${SITE_URL}/guides/${g.slug}` },
  }
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = guideBySlug(params.slug)
  if (!g) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: g.h1,
    description: g.description,
    datePublished: g.published,
    dateModified: g.published,
    mainEntityOfPage: `${SITE_URL}/guides/${g.slug}`,
    author: { '@type': 'Organization', name: BUSINESS_NAME, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#business` },
  }
  const others = GUIDES.filter(o => o.slug !== g.slug)
  const services = g.services.map(landingBySlug).filter(Boolean)

  return (
    <main className="section page-top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="wrap prose">
        <nav aria-label="Breadcrumb" className="breadcrumb small">
          <Link href="/">Home</Link> / <Link href="/guides">AC help guides</Link>
        </nav>
        <h1 style={{ marginTop: 16 }}>{g.h1}</h1>
        <p className="lead">{g.intro}</p>
        {g.sections.map(s => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs?.map(p => <p key={p}>{p}</p>)}
            {s.list && <ul>{s.list.map(i => <li key={i}>{i}</li>)}</ul>}
          </section>
        ))}
        <div className="panel" style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: '1.25rem', marginTop: 0 }}>Need help in Vadodara?</h2>
          <p className="muted">Call or WhatsApp {PHONE_DISPLAY}. Same-day visits, price before work.</p>
          <div className="btn-row">
            <Link href={g.cta.href} className="btn btn-primary">{g.cta.label}</Link>
            <a href={`tel:${PHONE_TEL}`} className="btn btn-outline">Call now</a>
          </div>
        </div>
        <h2 style={{ fontSize: '1.2rem' }}>Related services in Vadodara</h2>
        <ul>{services.map(s => <li key={s!.slug}><Link href={`/${s!.slug}`}>{s!.label} in Vadodara</Link></li>)}</ul>
        <h2 style={{ fontSize: '1.2rem' }}>More AC guides</h2>
        <ul>{others.map(o => <li key={o.slug}><Link href={`/guides/${o.slug}`}>{o.h1}</Link></li>)}</ul>
      </article>
    </main>
  )
}
