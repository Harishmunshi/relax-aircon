import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { LANDING_PAGES } from '@/lib/landing'
import { GUIDES } from '@/lib/guides'

const pages: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/book', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const all = [
    ...pages,
    ...LANDING_PAGES.map(l => ({ path: `/${l.slug}`, priority: 0.9, changeFrequency: 'monthly' as const })),
    { path: '/guides', priority: 0.6, changeFrequency: 'monthly' as const },
    ...GUIDES.map(g => ({ path: `/guides/${g.slug}`, priority: 0.6, changeFrequency: 'yearly' as const })),
  ]
  return all.map(p => ({ url: `${SITE_URL}${p.path}`, lastModified, changeFrequency: p.changeFrequency, priority: p.priority }))
}
