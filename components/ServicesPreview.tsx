import Link from 'next/link'
import { SERVICES, PHONE_TEL } from '@/lib/site'

export default function ServicesPreview({ headingLevel = 'h2' }: { headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel
  return (
    <div className="service-list">
      {SERVICES.map(s => {
        const emergency = s.id === 'emergency'
        return (
          <article key={s.id} id={s.id} className={`service${emergency ? ' service-emergency' : ''}`}>
            <span className="cat">{s.category}</span>
            <Heading style={{ fontSize: '1.35rem', margin: '6px 0 8px' }}>{s.name}</Heading>
            <p className="muted" style={{ margin: 0 }}>{s.description}</p>
            <dl>
              {s.prices.map(([label, price]) => (
                <div key={label}><dt>{label}</dt><dd>{price}</dd></div>
              ))}
            </dl>
            {emergency ? (
              <a href={`tel:${PHONE_TEL}`} className="btn btn-alert">Call for emergency repair</a>
            ) : (
              <Link href={`/book?service=${encodeURIComponent(s.name)}`} className="btn btn-outline">
                Book {s.name.toLowerCase()}
              </Link>
            )}
          </article>
        )
      })}
    </div>
  )
}
