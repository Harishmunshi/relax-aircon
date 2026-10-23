import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase, notConfigured, UUID_RE, EMPLOYEE_STATUSES, intOrNull } from '@/lib/supabase-server'
import { ROLES } from '@/lib/employee-types'

const ROLE_VALUES: string[] = ROLES.map(r => r.value)

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!UUID_RE.test(params.id)) return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
  const db = createServerSupabase()
  if (!db) return notConfigured()

  const { data, error } = await db
    .from('employees')
    .select(
      'id, full_name, mobile, address, email, role, experience_years, expected_salary, profile_photo, aadhaar_last4, status, created_at, updated_at'
    )
    .eq('id', params.id)
    .single()

  if (error?.code === 'PGRST116')
    return NextResponse.json({ error: 'Employee not found' }, { status: 404 })

  if (error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })

  return NextResponse.json({ employee: data })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!UUID_RE.test(params.id)) return NextResponse.json({ error: 'Employee not found' }, { status: 404 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })

  const updates: Record<string, unknown> = {}
  if ('status' in body) {
    if (!(EMPLOYEE_STATUSES as readonly unknown[]).includes(body.status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    updates.status = body.status
  }
  if ('role' in body) {
    if (body.role !== null && !ROLE_VALUES.includes(body.role as string)) return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    updates.role = body.role
  }
  if ('expected_salary' in body) {
    const v = intOrNull(body.expected_salary, 0, 10_000_000)
    if (v === undefined) return NextResponse.json({ error: 'Invalid expected_salary' }, { status: 400 })
    updates.expected_salary = v
  }
  if ('experience_years' in body) {
    const v = intOrNull(body.experience_years, 0, 50)
    if (v === undefined) return NextResponse.json({ error: 'Invalid experience_years' }, { status: 400 })
    updates.experience_years = v
  }

  if (Object.keys(updates).length === 0)
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })

  const db = createServerSupabase()
  if (!db) return notConfigured()
  const { data, error } = await db
    .from('employees')
    .update(updates)
    .eq('id', params.id)
    .select('id, full_name, role, status, updated_at')
    .single()

  if (error?.code === 'PGRST116')
    return NextResponse.json({ error: 'Employee not found' }, { status: 404 })

  if (error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })

  return NextResponse.json({ employee: data })
}
