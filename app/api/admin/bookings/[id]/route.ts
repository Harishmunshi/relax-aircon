import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled']

/** Admin only (enforced by middleware). Changes a booking's status. Cancelling frees the slot. */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!/^\d{1,12}$/.test(params.id)) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })

  let body: { status?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (typeof body.status !== 'string' || !STATUSES.includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const sql = getSql()
  if (!sql) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 })

  try {
    const rows = await sql`UPDATE bookings SET status = ${body.status} WHERE id = ${params.id} RETURNING id, status`
    if (rows.length === 0) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    return NextResponse.json({ booking: rows[0] })
  } catch (e: unknown) {
    if ((e as { code?: string }).code === '23505') {
      return NextResponse.json({ error: 'That slot has since been booked by someone else, so this booking cannot be restored.' }, { status: 409 })
    }
    console.error('update booking error', e)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
