import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

/**
 * Server-only Supabase client with service_role key.
 * Bypasses RLS: only use in API routes behind staff auth, never expose to the browser.
 * Returns null when env vars are missing so routes can answer 503 instead of crashing.
 */
export function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return null
  return createClient(url, serviceKey, { auth: { persistSession: false } })
}

export const notConfigured = () =>
  NextResponse.json({ error: 'Database is not configured' }, { status: 503 })

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const EMPLOYEE_STATUSES = ['active', 'inactive', 'terminated'] as const

/** Integer within [min, max], or null for empty. Returns undefined when invalid. */
export function intOrNull(v: unknown, min: number, max: number): number | null | undefined {
  if (v === null || v === undefined || v === '') return null
  const n = typeof v === 'number' ? v : Number(v)
  if (!Number.isInteger(n) || n < min || n > max) return undefined
  return n
}
