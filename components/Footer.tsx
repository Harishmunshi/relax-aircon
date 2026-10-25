import Link from 'next/link'
import PublicOnly from '@/components/PublicOnly'
import { LANDING_PAGES } from '@/lib/landing'
import { GUIDES } from '@/lib/guides'
import {
  AREAS, HOURS, PHONE_DISPLAY, PHONE_TEL, OWNER, FOUNDED, MAPS_LINK, whatsappLink,
} from '@/lib/site'

export default function Footer() {
  return (
    <PublicOnly>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <p className="brand" style={{ marginBottom: 8 }}>Relax Aircon</p>
              <p className="muted small">
                Appliance repair and servicing across Vadodara since {FOUNDED}. Run by {OWNER}.
              </p>
              <p style={{ margin: 0 }}><a href={`tel:${PHONE_TEL}`}><strong>{PHONE_DISPLAY}</strong></a></p>
            </div>
            <div>
              <h2>Services</h2>
              <ul>
                {LANDING_PAGES.map(p => (
                  <li key={p.slug}><Link href={`/${p.slug}`}>{p.label} Vadodara</Link></li>
                ))}
                <li><Link href="/services">All services and prices</Link></li>
              </ul>
            </div>
            <div>
              <h2>Areas</h2>
              <ul>
                {AREAS.slice(0, 6).map(a => (
                  <li key={a}><Link href="/contact#areas">{a}</Link></li>
                ))}
                <li><Link href="/contact#areas">All areas</Link></li>
              </ul>
              <h2 style={{ marginTop: 20 }}>AC guides</h2>
              <ul>
                {GUIDES.slice(0, 5).map(g => (
                  <li key={g.slug}><Link href={`/guides/${g.slug}`}>{g.title}</Link></li>
                ))}
                <li><Link href="/guides">All AC guides</Link></li>
              </ul>
            </div>
            <div>
              <h2>Contact</h2>
              <ul>
                <li><a href={`tel:${PHONE_TEL}`}>Call {PHONE_DISPLAY}</a></li>
                <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                <li><a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Vadodara, Gujarat</a></li>
                {HOURS.map(h => <li key={h.days} className="muted small">{h.days}: {h.time}</li>)}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Relax Aircon, Vadodara</span>
            <span>
              <Link href="/guides">AC help guides</Link>
              {' · '}
              <Link href="/privacy">Privacy policy</Link>
              {' · '}
              <Link href="/terms">Terms of service</Link>
            </span>
          </div>
        </div>
      </footer>
    </PublicOnly>
  )
}
