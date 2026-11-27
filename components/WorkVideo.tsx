/** Click-to-play job video. Nothing downloads until the visitor presses play. */
export default function WorkVideo({ caption = 'Water cooler repair at a Vadodara restaurant' }: { caption?: string }) {
  return (
    <figure className="panel work-video">
      <video controls preload="none" playsInline poster="/videos/water-cooler-repair-poster.jpg" aria-label={caption}>
        <source src="/videos/water-cooler-repair.mp4" type="video/mp4" />
        Your browser cannot play this video.
      </video>
      <figcaption><strong>Watch the repair</strong> · {caption}. About 1 minute, no sound.</figcaption>
    </figure>
  )
}
