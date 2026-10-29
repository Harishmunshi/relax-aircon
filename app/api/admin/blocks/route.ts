import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { SLOT_IDS, isDateString, nowIST } from '@/lib/booking'

export const dynamic = 'force-dynamic'

/** Admin only (enforced by middleware): upcoming blocked days and slots. */
export async function GET() {
  const sql = getSql()
  if (!sql) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 })
  try {
    const blocks = await sql`SELECT id, to_char(block_date, 'YYYY-MM-DD') AS block_date, slot, reason
      FROM blocked_slots WHERE block_date >= ${nowIST().date} ORDER BY block_date ASC, slot ASC NULLS FIRST LIMIT 200`
    return NextResponse.json({ blocks })
  } catch (e) {
    console.error('blocks list error', e)
    return NextResponse.json({ error: 'Could not load blocked slots' }, { status: 500 })
  }
}

/** Block a whole day (slot omitted) or a single slot. */
export async function POST(req: NextRequest) {
  let body: { date?: unknown; slot?: unknown; reason?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (!isDateString(body.date)) return NextResponse.json({ error: 'Choose a date' }, { status: 422 })
  const slot = body.slot ? String(body.slot) : null
  if (slot && !SLOT_IDS.includes(slot)) return NextResponse.json({ error: 'Invalid slot' }, { status: 422 })
  const reason = typeof body.reason === 'string' ? body.reason.trim().slice(0, 100) || null : null

  const sql = getSql()
  if (!sql) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 })
  try {
    await sql`INSERT INTO blocked_slots (block_date, slot, reason) VALUES (${body.date}, ${slot}, ${reason}) ON CONFLICT DO NOTHING`
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) {
    console.error('block create error', e)
    return NextResponse.json({ error: 'Could not block that time' }, { status: 500 })
  }
}

/** Unblock by id. */
export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get('id') ?? ''
  if (!/^\d{1,12}$/.test(id)) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const sql = getSql()
  if (!sql) return NextResponse.json({ error: 'Database is not configured' }, { status: 503 })
  try {
    await sql`DELETE FROM blocked_slots WHERE id = ${id}`
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('block delete error', e)
    return NextResponse.json({ error: 'Could not unblock' }, { status: 500 })
  }
}
