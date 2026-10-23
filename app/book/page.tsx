import type { Metadata } from 'next'
import { Suspense } from 'react'
import BookForm from './BookForm'
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Book AC or Appliance Service in Vadodara',
  description: 'Book an AC, fridge or washing machine service visit in Vadodara. Choose a date and time slot and we confirm by phone.',
  alternates: { canonical: '/book' },
}

export default function BookPage() {
  return (
    <main className="section page-top">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <span className="eyebrow">Book a visit</span>
        <h1>Book a service visit</h1>
        <p className="lead" style={{ marginBottom: 28 }}>
          Fill this in and send it to us on WhatsApp. We reply to confirm your slot. Prefer to talk?
          Call <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.
        </p>
        <div className="panel">
          <Suspense fallback={<div className="skeleton" style={{ height: 320 }} aria-label="Loading form" />}>
            <BookForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
