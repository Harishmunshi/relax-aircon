import Link from 'next/link'
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/site'

export default function NotFound() {
  return (
    <main className="section page-top">
      <div className="wrap" style={{ maxWidth: 640 }}>
        <span className="eyebrow">Page not found</span>
        <h1>We could not find that page</h1>
        <p className="lead">The link may be old or mistyped. These might help:</p>
        <div className="btn-row" style={{ marginTop: 20 }}>
          <Link href="/" className="btn btn-primary">Home</Link>
          <Link href="/services" className="btn btn-outline">Services</Link>
          <a href={`tel:${PHONE_TEL}`} className="btn btn-outline">Call {PHONE_DISPLAY}</a>
        </div>
      </div>
    </main>
  )
}
