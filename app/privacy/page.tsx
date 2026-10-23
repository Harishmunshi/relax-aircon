import type { Metadata } from 'next'
import { BUSINESS_NAME, OWNER, PHONE_DISPLAY, PHONE_TEL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${BUSINESS_NAME} collects and uses your details when you book a service in Vadodara.`,
  alternates: { canonical: '/privacy' },
}

const UPDATED = '23 October 2026'

export default function PrivacyPage() {
  return (
    <main className="section page-top">
      <div className="wrap prose">
        <span className="eyebrow">Legal</span>
        <h1>Privacy policy</h1>
        <p className="muted">Last updated {UPDATED}</p>

        <p>
          This policy explains what personal information {BUSINESS_NAME} (&quot;we&quot;), run by {OWNER} in
          Vadodara, Gujarat, collects when you use relaxaircon.in or book a service, and how we use it.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>Details you give us to book a visit: your name, mobile number, address, the appliance and the problem, and your preferred date and time.</li>
          <li>Messages and photos you send us on WhatsApp or by phone.</li>
          <li>Basic technical data recorded by our hosting provider when you visit the site, such as IP address, browser type and pages requested. This is used for security and to keep the site running.</li>
        </ul>

        <h2>How booking works</h2>
        <p>
          The booking form does not store your details on our website. When you press send, it opens WhatsApp
          with your details filled in, and the message is sent to us only when you send it. WhatsApp is operated
          by Meta and its own privacy policy applies to that message.
        </p>

        <h2>How we use your information</h2>
        <ul>
          <li>To contact you, confirm the visit, send a technician and give you a price.</li>
          <li>To keep a record of the work done so we can honour the repair warranty.</li>
          <li>To answer your questions and complaints.</li>
        </ul>
        <p>We do not sell your information and we do not use it for advertising.</p>

        <h2>Who we share it with</h2>
        <p>
          Only the technician assigned to your job, and service providers that run our website (hosting) or
          communications (WhatsApp, phone). We may disclose information if the law requires it.
        </p>

        <h2>Third-party content</h2>
        <p>The contact page shows an embedded Google Map. Google may set cookies or collect data when the map loads, under Google&apos;s privacy policy.</p>

        <h2>How long we keep it</h2>
        <p>We keep booking and job records for as long as needed for the service, the warranty period and our legal and tax obligations, then delete them.</p>

        <h2>Your choices</h2>
        <p>
          You can ask us to show, correct or delete the personal information we hold about you, subject to
          records we must keep by law. Call or WhatsApp <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.
        </p>

        <h2>Changes</h2>
        <p>If we change this policy we will update the date at the top of this page.</p>
      </div>
    </main>
  )
}
