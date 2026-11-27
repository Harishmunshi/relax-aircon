import WorkVideo from '@/components/WorkVideo'
import { FEATURED_REVIEWS, GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_PROFILE_URL, GOOGLE_REVIEW_URL } from '@/lib/site'

/** Real customer quotes from the Google Business Profile. */
export default function ReviewsStrip() {
  return (
    <section className="section section-alt" aria-labelledby="reviews-heading">
      <div className="wrap">
        <span className="eyebrow">What customers say</span>
        <h2 id="reviews-heading">Rated {GOOGLE_RATING} on Google</h2>
        <p className="rating-line">
          <span className="stars" aria-hidden="true">★★★★★</span>
          <span>{GOOGLE_RATING} from {GOOGLE_REVIEW_COUNT} Google reviews</span>
          <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer">Read them on Google</a>
        </p>
        <div className="review-layout">
        <div className="review-grid">
          {FEATURED_REVIEWS.map(r => (
            <figure key={r.name} className="panel review">
              <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption><strong>{r.name}</strong> · {r.detail}</figcaption>
            </figure>
          ))}
        </div>
        <WorkVideo />
        </div>
        <p style={{ marginTop: 20 }}>
          Used our service? <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">Leave a Google review</a>.
        </p>
      </div>
    </section>
  )
}
