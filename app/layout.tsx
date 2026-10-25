import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MobileContactBar from '@/components/MobileContactBar'
import {
  SITE_URL, BUSINESS_NAME, OWNER, FOUNDED, PHONE_TEL, HOURS, AREAS, SERVICES,
} from '@/lib/site'

const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' })
const serif = Source_Serif_4({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-serif', display: 'swap' })

const description =
  'AC service and repair at home in Vadodara: gas filling, installation, AMC, fridge and washing machine repair. Same-day visits. Call +91 70432 45355.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'AC Service and Repair in Vadodara | Relax Aircon',
    template: '%s | Relax Aircon',
  },
  description,
  applicationName: BUSINESS_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    title: 'AC Service and Repair in Vadodara | Relax Aircon',
    description,
  },
  twitter: { card: 'summary_large_image', title: 'Relax Aircon, Vadodara', description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
}

export const viewport: Viewport = { themeColor: '#f6f4ef', width: 'device-width', initialScale: 1 }

const schema = {
  '@context': 'https://schema.org',
  '@type': 'HVACBusiness',
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS_NAME,
  url: SITE_URL,
  telephone: PHONE_TEL,
  founder: { '@type': 'Person', name: OWNER },
  foundingDate: String(FOUNDED),
  priceRange: '₹₹',
  image: `${SITE_URL}/opengraph-image`,
  address: { '@type': 'PostalAddress', addressLocality: 'Vadodara', addressRegion: 'Gujarat', addressCountry: 'IN' },
  areaServed: [{ '@type': 'City', name: 'Vadodara' }, ...AREAS.map(a => ({ '@type': 'Place', name: `${a}, Vadodara` }))],
  openingHoursSpecification: HOURS.map(h => ({
    '@type': 'OpeningHoursSpecification', dayOfWeek: h.schemaDays, opens: h.opens, closes: h.closes,
  })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Appliance services',
    itemListElement: SERVICES.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, description: s.description } })),
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Navbar />
        <div id="main">{children}</div>
        <MobileContactBar />
        <Footer />
      </body>
    </html>
  )
}
