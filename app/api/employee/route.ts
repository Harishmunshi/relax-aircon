import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search')?.trim() ?? ''
  const role   = searchParams.get('role')?.trim() ?? ''
  const status = searchParams.get('status')?.trim() ?? 'active'
  const page   = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit  = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20')))
  const offset = (page - 1) * limit

  const db = createServerSupabase()

  // NOTE: never select aadhaar_encrypted — return only masked last4
  let query = db
    .from('employees')
    .select(
      'id, full_name, mobile, address, email, role, experience_years, expected_salary, profile_photo, aadhaar_last4, status, created_at',
      { count: 'exact' }
    )

  if (status) query = query.eq('status', status)
  if (role)   query = query.eq('role', role)
  if (search) query = query.or(`full_name.ilike.%${search}%,mobile.ilike.%${search}%,email.ilike.%${search}%`)

  query = query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) {
    console.error('GET /api/employee error:', error)
    return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 })
  }

  return NextResponse.json({
    employees: data ?? [],
    total: count ?? 0,
    page,
    limit,
  })
}
