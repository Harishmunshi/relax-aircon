import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { SLOTS, isDateString, slotBookable } from '@/lib/booking'

export const dynamic = 'force-dynamic'

/** Public: which slots on a date are still free. Returns slot ids only, no customer details. */
export async function GET(req: NextRequest) {
  const date = new URL(req.url).searchParams.get('date')
  if (!isDateString(date)) return NextResponse.json({ error: 'Invalid date' }, { status: 400 })

  const sql = getSql()
  if (!sql) return NextResponse.json({ error: 'Online booking is not available right now' }, { status: 503 })

  try {
    const rows = await sql`SELECT slot FROM bookings WHERE booking_date = ${date} AND status <> 'cancelled'`
    const blockRows = await sql`SELECT slot FROM blocked_slots WHERE block_date = ${date}`
    const booked = new Set(rows.map(r => r.slot as string))
    const dayBlocked = blockRows.some(r => r.slot === null)
    const blocked = new Set(blockRows.map(r => r.slot as string | null))
    const slots = SLOTS.map(s => {
      const off = dayBlocked || blocked.has(s.id)
      return {
        id: s.id,
        label: s.label,
        available: !booked.has(s.id) && !off && slotBookable(date, s.id),
        reason: booked.has(s.id) ? 'booked' : off || !slotBookable(date, s.id) ? 'unavailable' : null,
      }
    })
    return NextResponse.json({ date, slots }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e) {
    console.error('slots error', e)
    return NextResponse.json({ error: 'Could not load slots' }, { status: 500 })
  }
}
