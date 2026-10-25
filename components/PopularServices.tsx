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
      <p className="small muted" style={{ marginTop: 14 }}>
        Not sure what is wrong? Read our <Link href="/guides/ac-not-cooling">AC not cooling guide</Link> or the{' '}
        <Link href="/guides/ac-service-cost-vadodara">AC price guide for Vadodara</Link>.
      </p>
    </div>
  )
}
