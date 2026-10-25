import { AREAS, PHONE_DISPLAY } from '@/lib/site'

export type AreaPage = {
  slug: string
  area: string
  title: string
  description: string
  h1: string
}

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-')

/** One page per service area, e.g. /ac-service-alkapuri-vadodara. Edit the area list in lib/site.ts. */
export const AREA_PAGES: AreaPage[] = AREAS.map(area => ({
  slug: `ac-service-${slugify(area)}-vadodara`,
  area,
  title: `AC Service in ${area}, Vadodara`,
  description: `AC service and repair in ${area}, Vadodara: gas filling, installation, fridge and washing machine repair. Same-day visits. Call ${PHONE_DISPLAY}.`,
  h1: `AC service and repair in ${area}, Vadodara`,
}))

export const areaBySlug = (slug: string) => AREA_PAGES.find(a => a.slug === slug)
export const areaPageFor = (area: string) => AREA_PAGES.find(a => a.area === area)
