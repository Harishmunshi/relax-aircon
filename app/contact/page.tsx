import type { Metadata } from 'next'
import Link from 'next/link'
import { AREA_PAGES } from '@/lib/areas'
import { HOURS, PHONE_DISPLAY, PHONE_TEL, OWNER, MAPS_LINK, whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Relax Aircon, Vadodara',
  description: `Call or WhatsApp ${OWNER} on ${PHONE_DISPLAY} for AC, fridge and washing machine service anywhere in Vadodara. Opening hours and service areas.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main className="section page-top">
      <div className="wrap">
        <span className="eyebrow">Contact</span>
        <h1>Talk to us</h1>
        <p className="lead" style={{ marginBottom: 32 }}>The fastest way to book is a phone call or a WhatsApp message.</p>

        <div className="contact-grid" style={{ marginBottom: 40 }}>
          <a href={`tel:${PHONE_TEL}`} className="panel contact-card">
            <span className="label">Phone</span>
            <div className="value">{PHONE_DISPLAY}</div>
            <div className="muted small">{OWNER}, owner</div>
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="panel contact-card">
            <span className="label">WhatsApp</span>
            <div className="value">{PHONE_DISPLAY}</div>
            <div className="muted small">Send photos of the unit or error code</div>
          </a>
          <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="panel contact-card">
            <span className="label">Location</span>
            <div className="value">Vadodara, Gujarat</div>
            <div className="muted small">We come to you</div>
          </a>
        </div>

        <div className="two-col" style={{ marginBottom: 40 }}>
          <div>
            <h2>Opening hours</h2>
            <table className="hours-table">
              <tbody>
                {HOURS.map(h => <tr key={h.days}><td>{h.days}</td><td>{h.time}</td></tr>)}
                <tr><td>Emergency repairs</td><td>Any time, by phone</td></tr>
              </tbody>
            </table>
          </div>
          <div id="areas" style={{ scrollMarginTop: 80 }}>
            <h2>Service areas</h2>
            <p className="muted">All of Vadodara, including:</p>
            <ul className="tag-list">{AREA_PAGES.map(a => <li key={a.slug}><Link href={`/${a.slug}`}>{a.area}</Link></li>)}</ul>
          </div>
        </div>

        <div className="map-frame">
          <iframe
            src="https://www.google.com/maps?q=Vadodara,+Gujarat&output=embed"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Map of Vadodara, our service area"
          />
        </div>
      </div>
    </main>
  )
}
