import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase-server'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = createServerSupabase()

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
  const body = await req.json()
  const allowed = ['status', 'role', 'expected_salary', 'experience_years']
  const updates: Record<string, unknown> = {}

  for (const key of allowed) {
    if (key in body) updates[key] = body[key]
  }

  if (Object.keys(updates).length === 0)
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })

  const db = createServerSupabase()
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
