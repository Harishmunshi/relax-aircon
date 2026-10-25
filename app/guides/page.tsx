import type { Metadata } from 'next'
import Link from 'next/link'
import { GUIDES } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'AC Help Guides: Problems, Costs and Servicing',
  description: 'Practical AC guides for Vadodara homes: AC not cooling, water leaking, service and repair costs, and how often to service your AC.',
  alternates: { canonical: '/guides' },
}

export default function GuidesIndex() {
  return (
    <main className="section page-top">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <span className="eyebrow">Help guides</span>
        <h1>AC help guides</h1>
        <p className="lead">Answers to the questions we hear most from customers in Vadodara.</p>
        <div style={{ marginTop: 28, borderTop: '1px solid var(--line)' }}>
          {GUIDES.map(g => (
            <article key={g.slug} style={{ padding: '20px 0', borderBottom: '1px solid var(--line)' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: 6 }}><Link href={`/guides/${g.slug}`}>{g.h1}</Link></h2>
              <p className="muted" style={{ margin: 0 }}>{g.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
