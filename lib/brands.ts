import { BRANDS, PHONE_DISPLAY } from '@/lib/site'

export type BrandPage = {
  slug: string
  brand: string
  title: string
  description: string
  h1: string
  /** One factual line about the brand, shown on its page */
  note: string
}

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-')

const NOTES: Record<string, string> = {
  Daikin: 'Daikin is best known for inverter split ACs, so most of our Daikin jobs involve inverter boards, sensors, fan motors and gas filling. Newer models mostly use R32 gas.',
  Voltas: 'Voltas is one of the most common AC brands in Indian homes and sells window, split and inverter models, so we see everything from older window ACs to new inverter splits.',
  LG: 'Many LG split ACs use inverter compressors. Cooling problems, water leaks and error codes on the display are the most common reasons for a visit.',
  Samsung: 'Samsung makes inverter split and window ACs. Typical calls are for weak cooling, noise from the outdoor unit and error codes or blinking lights on the indoor unit.',
  'Blue Star': 'Blue Star makes home split and window ACs as well as larger commercial and central systems, so we can service both a bedroom unit and a shop or office system.',
  Hitachi: 'Hitachi split and window ACs usually need the same care as other brands: clean filters and coils, a gas check, and a look at the drain and electrical connections.',
  Lloyd: 'Lloyd sells split and window ACs for the Indian market. Servicing, gas filling and repair of cooling and leak problems are our most common Lloyd jobs.',
  Carrier: 'Carrier makes home split ACs as well as larger commercial units, and we service both for homes, shops and offices in Vadodara.',
}

export const BRAND_PAGES: BrandPage[] = BRANDS.map(brand => ({
  slug: `${slugify(brand)}-ac-service-vadodara`,
  brand,
  title: `${brand} AC Service and Repair in Vadodara`,
  description: `${brand} AC service, repair, gas filling and installation at home in Vadodara. Same-day visits, price before work. Call ${PHONE_DISPLAY}.`,
  h1: `${brand} AC service and repair in Vadodara`,
  note: NOTES[brand] ?? `We service and repair ${brand} air conditioners at your home in Vadodara.`,
}))

export const brandBySlug = (slug: string) => BRAND_PAGES.find(b => b.slug === slug)
export const brandPageFor = (brand: string) => BRAND_PAGES.find(b => b.brand === brand)
