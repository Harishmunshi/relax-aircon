import Image from 'next/image'
import { PHOTOS } from '@/lib/photos'

/** A grid of work photos. Used on the homepage and on service pages. */
export default function WorkPhotos({ ids, sizes = '(max-width: 720px) 100vw, 33vw' }: { ids: string[]; sizes?: string }) {
  const photos = ids.map(id => PHOTOS[id]).filter(Boolean)
  if (photos.length === 0) return null
  return (
    <div className="photo-grid" data-count={photos.length}>
      {photos.map(p => (
        <figure key={p.id} className="photo">
          <Image src={`/photos/${p.id}.webp`} alt={p.alt} width={1400} height={788} sizes={sizes} />
          <figcaption>{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}
