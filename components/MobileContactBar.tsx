import Link from 'next/link'
import PublicOnly from '@/components/PublicOnly'
import { PHONE_TEL, whatsappLink } from '@/lib/site'

/** Sticky Call / WhatsApp bar at the bottom of the screen on phones. */
export default function MobileContactBar() {
  return (
    <PublicOnly>
      <div className="mobile-bar">
        <a href={`tel:${PHONE_TEL}`} className="call">Call</a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="wa">WhatsApp</a>
        <Link href="/book" className="book">Book</Link>
      </div>
    </PublicOnly>
  )
}
