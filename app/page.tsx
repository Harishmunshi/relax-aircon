import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import ServicesPreview from '@/components/ServicesPreview'
import { AREAS, BRANDS, PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: 'AC Repair and Service in Vadodara | Relax Aircon' },
  alternates: { canonical: '/' },
}

const steps = [
  { title: 'Tell us the problem', body: 'Call, WhatsApp or book online. Mention the brand and what the appliance is doing.' },
  { title: 'Get a time slot', body: 'We confirm a visit time by phone, usually the same day for repairs.' },
  { title: 'Inspection and price', body: 'The technician checks the unit and tells you the full cost before starting.' },
  { title: 'Repair and warranty', body: 'Work is done on the spot where possible. All repairs carry a 90 day warranty.' },
]

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="section" aria-labelledby="services-heading">
        <div className="wrap">
          <span className="eyebrow">What we repair</span>
          <h2 id="services-heading">Services and starting prices</h2>
          <p className="lead" style={{ marginBottom: 32 }}>
            Home and commercial appliances, all major brands. Prices are labour starting rates.
          </p>
          <ServicesPreview headingLevel="h3" />
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="how-heading">
        <div className="wrap">
          <span className="eyebrow">How a visit works</span>
          <h2 id="how-heading">From your call to a working AC</h2>
          <ol className="steps">
            {steps.map(s => (
              <li key={s.title}><h3>{s.title}</h3><p className="muted">{s.body}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="coverage-heading">
        <div className="wrap two-col">
          <div>
            <h2 id="coverage-heading">Areas we cover in Vadodara</h2>
            <p className="muted">We visit homes, shops and offices across the city, including:</p>
            <ul className="tag-list">{AREAS.map(a => <li key={a}>{a}</li>)}</ul>
            <p className="small muted" style={{ marginTop: 14 }}>Not listed? <Link href="/contact">Ask us</Link>, we probably cover it.</p>
          </div>
          <div>
            <h2>Brands we work on</h2>
            <p className="muted">Split, window, cassette and central units from:</p>
            <ul className="tag-list">{BRANDS.map(b => <li key={b}>{b}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2>Need it fixed today?</h2>
          <p className="muted">Call or WhatsApp {PHONE_DISPLAY}. Fastest response in Vadodara.</p>
          <div className="btn-row">
            <a href={`tel:${PHONE_TEL}`} className="btn btn-primary">Call now</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Message on WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  )
}
