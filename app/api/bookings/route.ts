import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { emailCustomer, emailOwner } from '@/lib/notify'
import { isDateString, normalizePhone, slotBookable, validPhone } from '@/lib/booking'

const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/** Public: create a booking. The unique index on (date, slot) makes double booking impossible. */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  // Honeypot: real visitors never fill this hidden field.
  if (text(body.website, 50)) return NextResponse.json({ ok: true })

  const name = text(body.name, 80)
  const phoneRaw = text(body.phone, 20)
  const address = text(body.address, 300)
  const appliance = text(body.appliance, 40) || null
  const service = text(body.service, 60) || null
  const problem = text(body.problem, 500) || null
  const date = body.date
  const slot = text(body.slot, 10)
  const email = text(body.email, 254)

  const fields: Record<string, string> = {}
  if (name.length < 2) fields.name = 'Please enter your name'
  if (!validPhone(phoneRaw)) fields.phone = 'Enter a 10 digit Indian mobile number'
  if (address.length < 5) fields.address = 'Please enter your area and street'
  if (!isDateString(date)) fields.date = 'Please choose a date'
  if (!slot) fields.slot = 'Please choose a time slot'
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = 'Enter a valid email address or leave it empty'
  if (Object.keys(fields).length > 0) return NextResponse.json({ error: 'Validation failed', fields }, { status: 422 })

  if (!slotBookable(date as string, slot)) {
    return NextResponse.json({ error: 'That slot is not available. Please choose another.', fields: { slot: 'Not available' } }, { status: 409 })
  }

  const sql = getSql()
  if (!sql) return NextResponse.json({ error: 'Online booking is not available right now. Please call us.' }, { status: 503 })

  const phone = normalizePhone(phoneRaw)
  try {
    const blocked = await sql`SELECT 1 FROM blocked_slots WHERE block_date = ${date as string} AND (slot IS NULL OR slot = ${slot}) LIMIT 1`
    if (blocked.length > 0) {
      return NextResponse.json({ error: 'That slot is not available. Please choose another.', fields: { slot: 'Not available' } }, { status: 409 })
    }
    const rows = await sql`
      INSERT INTO bookings (name, phone, address, appliance, service, problem, booking_date, slot)
      VALUES (${name}, ${phone}, ${address}, ${appliance}, ${service}, ${problem}, ${date as string}, ${slot})
      RETURNING id, name, phone, address, appliance, service, problem, to_char(booking_date, 'YYYY-MM-DD') AS booking_date, slot`
    const booking = rows[0] as Parameters<typeof emailOwner>[0]
    const emailed = await emailOwner(booking)
    // The customer's email is used once for the confirmation and is not stored.
    if (email) await emailCustomer(booking, email)
    return NextResponse.json({ ok: true, id: booking.id, emailed }, { status: 201 })
  } catch (e: unknown) {
    const code = (e as { code?: string }).code
    if (code === '23505') {
      return NextResponse.json({ error: 'Sorry, that slot was just booked. Please choose another.', fields: { slot: 'Just booked' } }, { status: 409 })
    }
    console.error('booking error', e)
    return NextResponse.json({ error: 'Could not save your booking. Please call us.' }, { status: 500 })
  }
}
