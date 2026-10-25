import PublicOnly from '@/components/PublicOnly'
import { PHONE_TEL, whatsappLink } from '@/lib/site'

/** Sticky Call / WhatsApp bar at the bottom of the screen on phones. */
export default function MobileContactBar() {
  return (
    <PublicOnly>
      <div className="mobile-bar">
        <a href={`tel:${PHONE_TEL}`} className="call">Call now</a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="wa">WhatsApp</a>
      </div>
    </PublicOnly>
  )
}
