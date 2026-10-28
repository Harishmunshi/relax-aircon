import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { LANDING_PAGES } from '@/lib/landing'
import { GUIDES } from '@/lib/guides'
import { AREA_PAGES } from '@/lib/areas'
import { BRAND_PAGES } from '@/lib/brands'

const pages: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/book', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/commercial-ac-amc-vadodara', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const all = [
    ...pages,
    ...LANDING_PAGES.map(l => ({ path: `/${l.slug}`, priority: 0.9, changeFrequency: 'monthly' as const })),
    { path: '/areas', priority: 0.7, changeFrequency: 'monthly' as const },
    ...AREA_PAGES.map(a => ({ path: `/${a.slug}`, priority: 0.8, changeFrequency: 'monthly' as const })),
    { path: '/brands', priority: 0.7, changeFrequency: 'monthly' as const },
    ...BRAND_PAGES.map(b => ({ path: `/${b.slug}`, priority: 0.8, changeFrequency: 'monthly' as const })),
    { path: '/guides', priority: 0.6, changeFrequency: 'monthly' as const },
    ...GUIDES.map(g => ({ path: `/guides/${g.slug}`, priority: 0.6, changeFrequency: 'yearly' as const })),
  ]
  return all.map(p => ({ url: `${SITE_URL}${p.path}`, changeFrequency: p.changeFrequency, priority: p.priority }))
}
