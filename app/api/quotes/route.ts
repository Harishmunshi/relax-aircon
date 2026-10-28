import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { emailQuote } from '@/lib/notify'
import { normalizePhone, validPhone } from '@/lib/booking'

const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Public: a commercial AC / AMC quote request. */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  if (text(body.website, 50)) return NextResponse.json({ ok: true }) // honeypot

  const company = text(body.company, 120)
  const contact_name = text(body.contact_name, 80)
  const phoneRaw = text(body.phone, 20)
  const email = text(body.email, 254) || null
  const site_type = text(body.site_type, 40) || null
  const units = text(body.units, 40) || null
  const contract = text(body.contract, 40) || null
  const details = text(body.details, 800) || null

  const fields: Record<string, string> = {}
  if (company.length < 2) fields.company = 'Please enter your company or site name'
  if (contact_name.length < 2) fields.contact_name = 'Please enter a contact name'
  if (!validPhone(phoneRaw)) fields.phone = 'Enter a 10 digit Indian mobile number'
  if (email && !EMAIL_RE.test(email)) fields.email = 'Enter a valid email address'
  if (Object.keys(fields).length > 0) return NextResponse.json({ error: 'Validation failed', fields }, { status: 422 })

  const sql = getSql()
  if (!sql) return NextResponse.json({ error: 'Quote requests are not available right now. Please call us.' }, { status: 503 })

  try {
    const rows = await sql`INSERT INTO quotes (company, contact_name, phone, email, site_type, units, contract, details)
      VALUES (${company}, ${contact_name}, ${normalizePhone(phoneRaw)}, ${email}, ${site_type}, ${units}, ${contract}, ${details})
      RETURNING id, company, contact_name, phone, email, site_type, units, contract, details`
    await emailQuote(rows[0] as Parameters<typeof emailQuote>[0])
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) {
    console.error('quote error', e)
    return NextResponse.json({ error: 'Could not save your request. Please call us.' }, { status: 500 })
  }
}
