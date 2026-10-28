import { NextRequest, NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { emailApplication } from '@/lib/notify'
import { normalizePhone, validPhone } from '@/lib/booking'
import { ROLE_IDS, roleLabel } from '@/lib/careers'

const text = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/** Public: a job application from the Join our team page. */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  if (text(body.website, 50)) return NextResponse.json({ ok: true }) // honeypot

  const name = text(body.name, 80)
  const phoneRaw = text(body.phone, 20)
  const area = text(body.area, 80) || null
  const role = text(body.role, 40)
  const experience = text(body.experience, 40) || null
  const message = text(body.message, 600) || null

  const fields: Record<string, string> = {}
  if (name.length < 2) fields.name = 'Please enter your name'
  if (!validPhone(phoneRaw)) fields.phone = 'Enter a 10 digit Indian mobile number'
  if (!ROLE_IDS.includes(role)) fields.role = 'Please choose a role'
  if (Object.keys(fields).length > 0) return NextResponse.json({ error: 'Validation failed', fields }, { status: 422 })

  const sql = getSql()
  if (!sql) return NextResponse.json({ error: 'Applications are not available right now. Please call us.' }, { status: 503 })

  try {
    const rows = await sql`INSERT INTO applications (name, phone, area, role, experience, message)
      VALUES (${name}, ${normalizePhone(phoneRaw)}, ${area}, ${role}, ${experience}, ${message})
      RETURNING id, name, phone, area, role, experience, message`
    const a = rows[0] as { id: number; name: string; phone: string; area: string | null; role: string; experience: string | null; message: string | null }
    await emailApplication({ ...a, role: roleLabel(a.role) })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) {
    console.error('application error', e)
    return NextResponse.json({ error: 'Could not save your application. Please call us.' }, { status: 500 })
  }
}
