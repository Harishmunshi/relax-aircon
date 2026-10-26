import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { SLOTS, nowIST } from '@/lib/booking'

export const dynamic = 'force-dynamic'

const FILTERS = ['upcoming', 'pending', 'confirmed', 'completed', 'cancelled', 'all'] as const

/** Admin only (enforced by middleware). Lists bookings, soonest first. */
export async function GET(req: NextRequest) {
  const filter = new URL(req.url).searchParams.get('filter') ?? 'upcoming'
  if (!(FILTERS as readonly string[]).includes(filter)) return NextResponse.json({ error: 'Invalid filter' }, { status: 400 })

  const sql = getSql()
  if (!sql) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 })

  const today = nowIST().date
  try {
    let rows
    if (filter === 'upcoming') {
      rows = await sql`SELECT id, name, phone, address, appliance, service, problem, to_char(booking_date, 'YYYY-MM-DD') AS booking_date, slot, status, created_at
        FROM bookings WHERE booking_date >= ${today} AND status IN ('pending', 'confirmed')
        ORDER BY booking_date ASC, id ASC LIMIT 200`
    } else if (filter === 'all') {
      rows = await sql`SELECT id, name, phone, address, appliance, service, problem, to_char(booking_date, 'YYYY-MM-DD') AS booking_date, slot, status, created_at
        FROM bookings ORDER BY booking_date DESC, id DESC LIMIT 200`
    } else {
      rows = await sql`SELECT id, name, phone, address, appliance, service, problem, to_char(booking_date, 'YYYY-MM-DD') AS booking_date, slot, status, created_at
        FROM bookings WHERE status = ${filter} ORDER BY booking_date DESC, id DESC LIMIT 200`
    }
    const order = (slot: string) => SLOTS.findIndex(s => s.id === slot)
    const bookings = filter === 'upcoming'
      ? [...rows].sort((a, b) => (a.booking_date === b.booking_date ? order(a.slot) - order(b.slot) : a.booking_date < b.booking_date ? -1 : 1))
      : rows

    const counts = await sql`SELECT status, count(*)::int AS n FROM bookings GROUP BY status`
    return NextResponse.json({ bookings, counts: Object.fromEntries(counts.map(c => [c.status, c.n])), today })
  } catch (e) {
    console.error('admin bookings error', e)
    return NextResponse.json({ error: 'Could not load bookings' }, { status: 500 })
  }
}
