import type { Metadata } from 'next'
import Link from 'next/link'
import EnquiryForm, { type FormField } from '@/components/EnquiryForm'
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL, BRANDS, priceOf, whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Commercial AC and AMC in Vadodara',
  description: 'AC annual maintenance contracts and repair for offices, hospitals, hotels, shops and factories in Vadodara. Request a quote for bulk and yearly contracts.',
  alternates: { canonical: '/commercial-ac-amc-vadodara' },
}

const fields: FormField[] = [
  { name: 'company', label: 'Company or site name', required: true, maxLength: 120 },
  { name: 'contact_name', label: 'Contact person', required: true, half: true, maxLength: 80 },
  { name: 'phone', label: 'Mobile number', type: 'tel', required: true, half: true, maxLength: 16, placeholder: '98765 43210' },
  { name: 'email', label: 'Email', type: 'email', maxLength: 254, placeholder: 'name@company.com' },
  { name: 'site_type', label: 'Type of site', type: 'select', half: true, options: ['Office', 'Hospital or clinic', 'Hotel or restaurant', 'Shop or showroom', 'Factory or warehouse', 'School or institute', 'Other'].map(v => ({ value: v, label: v })) },
  { name: 'units', label: 'Number of AC units', type: 'select', half: true, options: ['1 to 5', '6 to 20', '21 to 50', '51 to 100', 'More than 100'].map(v => ({ value: v, label: v })) },
  { name: 'contract', label: 'What do you need?', type: 'select', options: ['Annual maintenance contract (AMC)', 'One-time service or repair', 'New installation', 'Not sure yet'].map(v => ({ value: v, label: v })) },
  { name: 'details', label: 'Details', type: 'textarea', maxLength: 800, placeholder: 'AC types and brands, locations, anything urgent' },
]

const needs = [
  ['Annual maintenance contracts', 'Scheduled servicing through the year for every unit on your site, so faults are caught before a breakdown.'],
  ['Breakdown repair', 'Call us when a unit fails. Emergency calls are taken 24/7.'],
  ['Installation and shifting', 'New split, cassette and ducted units, and moving units when you change premises.'],
  ['Central and VRF systems', 'Ducted, cassette and VRF systems for larger buildings.'],
]

const sites = ['Offices and co-working spaces', 'Hospitals, clinics and labs', 'Hotels, restaurants and banquet halls', 'Shops, showrooms and malls', 'Factories and warehouses', 'Schools and institutes']

const faqs = [
  { q: 'Do you offer annual maintenance contracts for offices?', a: `Yes. AMC starts from ${priceOf('deep-freezer', 'AMC')} and the price depends on the number and type of units. Send your details and we will prepare a quote.` },
  { q: 'Can you handle many AC units at one site?', a: 'Yes. Tell us how many units and which brands, and we will plan the servicing schedule for the whole site.' },
  { q: 'Which brands do you service?', a: `${BRANDS.join(', ')} and other major brands, including inverter and central systems.` },
  { q: 'What if a unit breaks down between services?', a: 'Call us. Emergency calls are taken 24/7 and repairs carry a 90 day warranty.' },
]

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Commercial AC maintenance and repair in Vadodara',
    serviceType: 'Commercial AC annual maintenance contract',
    url: `${SITE_URL}/commercial-ac-amc-vadodara`,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: 'Vadodara' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
]

export default function CommercialPage() {
  return (
    <main className="section page-top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="breadcrumb small"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span>Commercial AC and AMC</span></nav>
        <div className="hero-grid" style={{ marginTop: 16 }}>
          <div>
            <h1>Commercial AC service and AMC in Vadodara</h1>
            <p className="lead">
              Keep every AC running at your office, clinic, hotel or factory. Relax Aircon handles annual maintenance
              contracts, breakdown repair and installation across Vadodara, from a few units to a whole building.
            </p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-primary">Call {PHONE_DISPLAY}</a>
              <a href={whatsappLink('Hi Relax Aircon, I want a quote for commercial AC service / AMC')} target="_blank" rel="noopener noreferrer" className="btn btn-outline">WhatsApp us</a>
            </div>
          </div>
          <aside className="panel" aria-labelledby="quote">
            <h2 id="quote" style={{ fontSize: '1.25rem' }}>Request a quote</h2>
            <EnquiryForm
              endpoint="/api/quotes"
              fields={fields}
              submitLabel="Request quote"
              successTitle="Request received"
              successBody="Thank you. We will call you to understand your site and then send a quote. For urgent work, call us on the number below."
            />
          </aside>
        </div>

        <section style={{ marginTop: 56 }} aria-labelledby="needs">
          <h2 id="needs">What we do for businesses</h2>
          <div className="service-list" style={{ marginTop: 16 }}>
            {needs.map(([t, d]) => (
              <article key={t} className="service"><h3 style={{ fontSize: '1.2rem', margin: '0 0 8px' }}>{t}</h3><p className="muted" style={{ margin: 0 }}>{d}</p></article>
            ))}
          </div>
        </section>

        <div className="two-col" style={{ marginTop: 48 }}>
          <section aria-labelledby="sites">
            <h2 id="sites">Sites we work with</h2>
            <ul className="plain-list">{sites.map(s => <li key={s}>{s}</li>)}</ul>
          </section>
          <section aria-labelledby="start">
            <h2 id="start">How to get started</h2>
            <ol className="plain-list">
              <li>Send the form above with your units and site type.</li>
              <li>We call you to understand what you have and what you need.</li>
              <li>You receive a quote. Work starts after you approve it.</li>
            </ol>
          </section>
        </div>

        <section style={{ marginTop: 56 }} aria-labelledby="faq">
          <h2 id="faq">Questions about commercial AC service</h2>
          <div className="faq">{faqs.map(f => <details key={f.q}><summary>{f.q}</summary><p className="muted">{f.a}</p></details>)}</div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: '1.3rem' }}>Related pages</h2>
          <ul className="tag-list">
            <li><Link href="/ac-amc-vadodara">AC AMC in Vadodara</Link></li>
            <li><Link href="/central-ac-service-vadodara">Central AC service</Link></li>
            <li><Link href="/fast-ac-repair-vadodara">Emergency AC repair</Link></li>
            <li><Link href="/guides/how-often-service-ac">How often to service an AC</Link></li>
          </ul>
        </section>
      </div>
    </main>
  )
}
