import type { Metadata } from 'next'
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms that apply when you book a repair, service or installation with ${BUSINESS_NAME} in Vadodara.`,
  alternates: { canonical: '/terms' },
}

const UPDATED = '23 October 2026'

export default function TermsPage() {
  return (
    <main className="section page-top">
      <div className="wrap prose">
        <span className="eyebrow">Legal</span>
        <h1>Terms of service</h1>
        <p className="muted">Last updated {UPDATED}</p>

        <p>These terms apply when you use relaxaircon.in or book a service with {BUSINESS_NAME}, Vadodara.</p>

        <h2>Bookings</h2>
        <p>
          A booking request is confirmed only when we reply by phone or WhatsApp with a visit time. Time slots
          are a target, and we will tell you if a technician is running late.
        </p>

        <h2>Prices</h2>
        <ul>
          <li>Prices on this website are starting labour rates and may change without notice.</li>
          <li>Spare parts, refrigerant gas and materials are charged separately.</li>
          <li>We tell you the full cost after inspection. Work starts only after you agree to it.</li>
        </ul>

        <h2>Payment</h2>
        <p>Payment is due when the work is completed unless we agree otherwise in writing, for example for an annual maintenance contract.</p>

        <h2>Warranty</h2>
        <p>
          Repairs carry a 90 day warranty covering the same fault on the same part we repaired. It does not
          cover damage from power surges, physical damage, misuse, or repairs by anyone else after our visit.
          Manufacturer warranties on new parts apply as issued by the manufacturer.
        </p>

        <h2>Your responsibilities</h2>
        <p>Please give accurate details, provide safe access to the appliance and a working power supply, and tell us about any earlier repairs.</p>

        <h2>Cancellations</h2>
        <p>Let us know as early as possible if you need to cancel or move a visit.</p>

        <h2>Liability</h2>
        <p>We take care with your property. Our liability for any claim relating to a job is limited to the amount you paid for that job, except where the law does not allow such a limit.</p>

        <h2>Contact</h2>
        <p>Questions about these terms: call or WhatsApp <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.</p>
      </div>
    </main>
  )
}
