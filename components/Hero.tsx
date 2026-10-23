import Link from 'next/link'
import { PHONE_DISPLAY, PHONE_TEL, FOUNDED } from '@/lib/site'
import AcUnit from '@/components/AcUnit'

const quickPrices: [string, string][] = [
  ['AC service', '₹350+'],
  ['AC repair', '₹350+'],
  ['AC installation', '₹1,200+'],
  ['AC gas refill', '₹2,500+'],
  ['Fridge repair', '₹400+'],
  ['Washing machine repair', '₹350+'],
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">AC, fridge and washing machine service in Vadodara</span>
          <h1>AC not cooling? We can usually be there today.</h1>
          <p className="lead">
            Relax Aircon repairs, services and installs air conditioners, refrigerators and washing
            machines across Vadodara. You talk directly to the owner, Azhar Munshi, and you get the
            price before work starts.
          </p>
          <div className="btn-row" style={{ marginTop: 28 }}>
            <Link href="/book" className="btn btn-primary">Book a visit</Link>
            <a href={`tel:${PHONE_TEL}`} className="btn btn-outline">Call {PHONE_DISPLAY}</a>
          </div>
          <ul className="facts">
            <li><strong>Since {FOUNDED}</strong> in Vadodara</li>
            <li><strong>All major brands</strong> serviced</li>
            <li><strong>Emergency calls</strong> taken 24/7</li>
          </ul>
        </div>
        <div>
          <AcUnit />
          <aside className="panel" aria-labelledby="price-heading">
          <h2 id="price-heading" style={{ fontSize: '1.25rem' }}>Starting prices</h2>
          <table className="price-table">
            <thead><tr><th scope="col">Service</th><th scope="col">From</th></tr></thead>
            <tbody>
              {quickPrices.map(([name, price]) => (
                <tr key={name}><td>{name}</td><td>{price}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="muted small" style={{ margin: '14px 0 0' }}>
            Spare parts and gas are charged separately. We confirm the full cost after inspection, before any work.{' '}
            <Link href="/services">See all prices</Link>
          </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
