import Link from 'next/link'
import { LANDING_PAGES } from '@/lib/landing'

export default function PopularServices() {
  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ fontSize: '1.15rem' }}>Popular services in Vadodara</h3>
      <ul className="tag-list">
        {LANDING_PAGES.map(p => (
          <li key={p.slug}><Link href={`/${p.slug}`}>{p.label} in Vadodara</Link></li>
        ))}
      </ul>
    </div>
  )
}
