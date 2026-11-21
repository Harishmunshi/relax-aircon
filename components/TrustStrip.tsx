const points = [
  { mark: '1', title: 'Talk to the owner', body: 'Azhar Munshi takes your call' },
  { mark: '₹', title: 'Price before work', body: 'You approve the cost first' },
  { mark: '90', title: '90 day warranty', body: 'On every repair' },
  { mark: '✓', title: 'Usually same day', body: 'Visits for most repairs' },
]

/** Four short promises under the hero. */
export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Why customers choose Relax Aircon">
      <div className="wrap">
        <ul>
          {points.map(p => (
            <li key={p.title}>
              <span className="trust-dot" aria-hidden="true">{p.mark}</span>
              <span><strong>{p.title}</strong>{p.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
