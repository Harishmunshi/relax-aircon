import PublicOnly from '@/components/PublicOnly'
import { whatsappLink } from '@/lib/site'

export default function WhatsAppButton() {
  return (
    <PublicOnly>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="wa-float">
        WhatsApp us
      </a>
    </PublicOnly>
  )
}
