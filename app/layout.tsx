import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Relax Aircon | #1 AC Service in Vadodara — Repair, Installation, Gas Refill',
  description: "Vadodara's most trusted AC, fridge & washing machine service. Fast repair, installation, gas refill. 24/7 emergency. Call Azhar Munshi: +91 70432 45355",
  keywords: 'AC repair Vadodara, AC service Vadodara, fridge repair Vadodara, washing machine repair Vadodara, Relax Aircon, Azhar Munshi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Relax Aircon",
    "telephone": "+917043245355",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Vadodara",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 08:00-22:00",
    "priceRange": "₹₹",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "847" }
  }
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      <body>
        <Navbar />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  )
}
