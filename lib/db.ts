import 'server-only'
import { neon } from '@neondatabase/serverless'

/**
 * Returns a SQL tagged-template client, or null when DATABASE_URL is not configured.
 * `cache: 'no-store'` stops Next.js from caching query results, which would show stale free slots.
 */
export function getSql() {
  const url = process.env.DATABASE_URL
  return url ? neon(url, { fetchOptions: { cache: 'no-store' } }) : null
}
