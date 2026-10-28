import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { SLOTS, nowIST } from '@/lib/booking'

export const dynamic = 'force-dynamic'

/** Staff only (technician or admin, enforced by middleware): confirmed upcoming jobs, soonest first. */
export async function GET() {
  const sql = getSql()
  if (!sql) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 })
  try {
    const rows = await sql`SELECT id, name, phone, address, appliance, service, problem, to_char(booking_date, 'YYYY-MM-DD') AS booking_date, slot, status
      FROM bookings WHERE booking_date >= ${nowIST().date} AND status = 'confirmed'
      ORDER BY booking_date ASC, id ASC LIMIT 100`
    const order = (slot: string) => SLOTS.findIndex(s => s.id === slot)
    const jobs = [...rows].sort((a, b) => (a.booking_date === b.booking_date ? order(a.slot) - order(b.slot) : a.booking_date < b.booking_date ? -1 : 1))
    return NextResponse.json({ jobs, today: nowIST().date }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e) {
    console.error('technician jobs error', e)
    return NextResponse.json({ error: 'Could not load jobs' }, { status: 500 })
  }
}

/** Technician marks a confirmed job complete. Technicians cannot cancel or edit anything else. */
export async function PATCH(req: NextRequest) {
  let body: { id?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  const id = String(body.id ?? '')
  if (!/^\d{1,12}$/.test(id)) return NextResponse.json({ error: 'Job not found' }, { status: 404 })

  const sql = getSql()
  if (!sql) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 })
  try {
    const rows = await sql`UPDATE bookings SET status = 'completed' WHERE id = ${id} AND status = 'confirmed' RETURNING id`
    if (rows.length === 0) return NextResponse.json({ error: 'Job not found or already updated' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('technician update error', e)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
