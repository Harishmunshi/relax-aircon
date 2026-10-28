import type { Metadata } from 'next'
import Link from 'next/link'
import EnquiryForm, { type FormField } from '@/components/EnquiryForm'
import { ROLES } from '@/lib/careers'
import { AREA_PAGES } from '@/lib/areas'
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL, FOUNDED } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Join Our Team: AC Technician Jobs in Vadodara',
  description: 'Relax Aircon is always looking for AC technicians, helpers and fridge or washing machine technicians in Vadodara. Apply online in two minutes.',
  alternates: { canonical: '/careers' },
}

const fields: FormField[] = [
  { name: 'name', label: 'Full name', required: true, half: true, maxLength: 80 },
  { name: 'phone', label: 'Mobile number', type: 'tel', required: true, half: true, maxLength: 16, placeholder: '98765 43210' },
  { name: 'role', label: 'Role you are applying for', type: 'select', required: true, options: [...ROLES.map(r => ({ value: r.id, label: r.label })), { value: 'other', label: 'Other' }] },
  { name: 'area', label: 'Area where you live', half: true, maxLength: 80, placeholder: 'For example: Gotri' },
  { name: 'experience', label: 'Experience', type: 'select', half: true, options: ['No experience', 'Under 1 year', '1 to 3 years', '3 to 5 years', 'More than 5 years'].map(v => ({ value: v, label: v })) },
  { name: 'message', label: 'Anything else we should know?', type: 'textarea', maxLength: 600, placeholder: 'Brands you have worked on, tools you own, languages you speak' },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Join our team', item: `${SITE_URL}/careers` },
  ],
}

export default function CareersPage() {
  return (
    <main className="section page-top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="breadcrumb small"><Link href="/">Home</Link> / <span>Join our team</span></nav>
        <div className="hero-grid" style={{ marginTop: 16 }}>
          <div>
            <h1>Join our team</h1>
            <p className="lead">
              Relax Aircon has served homes and businesses across Vadodara since {FOUNDED}. We are always looking for
              honest, hard-working people who want to build a career in AC and appliance service.
            </p>
            <p className="muted">
              There are no fixed vacancies on this page. Send your details and we will call you when a suitable role is
              open in your area. Prefer to talk first? Call <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.
            </p>
          </div>
          <aside className="panel">
            <h2 style={{ fontSize: '1.25rem' }}>Apply now</h2>
            <EnquiryForm
              endpoint="/api/applications"
              fields={fields}
              submitLabel="Send application"
              successTitle="Application received"
              successBody="Thank you for applying. We will call you on the number you gave if there is a suitable role. Keep your phone reachable."
            />
          </aside>
        </div>

        <section style={{ marginTop: 56 }} aria-labelledby="roles">
          <h2 id="roles">Roles we hire for</h2>
          <div className="service-list" style={{ marginTop: 16 }}>
            {ROLES.map(r => (
              <article key={r.id} className="service">
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 8px' }}>{r.label}</h3>
                <p className="muted" style={{ margin: 0 }}>{r.summary}</p>
                <ul className="plain-list muted" style={{ marginTop: 12 }}>{r.skills.map(s => <li key={s}>{s}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }} aria-labelledby="how">
          <h2 id="how">How hiring works</h2>
          <ol className="plain-list">
            <li>Fill in the form above, or call us.</li>
            <li>We call shortlisted candidates to talk about the role.</li>
          </ol>
          <p className="muted small">We never ask applicants for money. If anyone asks you for a fee in our name, do not pay and call us.</p>
        </section>

        <section style={{ marginTop: 48 }} aria-labelledby="areas">
          <h2 id="areas" style={{ fontSize: '1.3rem' }}>Where you would work</h2>
          <p className="muted">Jobs are across Vadodara, including:</p>
          <ul className="tag-list">{AREA_PAGES.map(a => <li key={a.slug}><Link href={`/${a.slug}`}>{a.area}</Link></li>)}</ul>
        </section>
      </div>
    </main>
  )
}
