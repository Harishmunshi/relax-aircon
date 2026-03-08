import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase-server'
import { encryptAadhaar } from '@/lib/aadhaar-crypto'
import {
  validateMobile,
  validateAadhaar,
  validateEmail,
  type EmployeeFormPayload,
} from '@/lib/employee-types'

export async function POST(req: NextRequest) {
  let body: EmployeeFormPayload

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // ── Server-side validation ──────────────────────────────────────────────────
  const errors: Record<string, string> = {}

  if (!body.full_name?.trim() || body.full_name.trim().length < 2)
    errors.full_name = 'Full name is required (min 2 characters)'

  const mobileErr = validateMobile(body.mobile?.trim() ?? '')
  if (mobileErr) errors.mobile = mobileErr

  if (!body.address?.trim() || body.address.trim().length < 5)
    errors.address = 'Address is required (min 5 characters)'

  const emailErr = validateEmail(body.email?.trim() ?? '')
  if (emailErr) errors.email = emailErr

  const aadhaarErr = validateAadhaar(body.aadhaar?.trim() ?? '')
  if (aadhaarErr) errors.aadhaar = aadhaarErr

  if (Object.keys(errors).length > 0)
    return NextResponse.json({ error: 'Validation failed', fields: errors }, { status: 422 })

  // ── Encrypt Aadhaar before touching the DB ──────────────────────────────────
  let aadhaar_encrypted: string | null = null
  let aadhaar_last4: string | null = null

  if (body.aadhaar?.trim()) {
    try {
      aadhaar_encrypted = encryptAadhaar(body.aadhaar.trim())
      aadhaar_last4 = body.aadhaar.trim().slice(-4)
    } catch (e) {
      console.error('Aadhaar encryption failed:', e)
      return NextResponse.json(
        { error: 'Server encryption configuration error. Contact admin.' },
        { status: 500 }
      )
    }
  }

  // ── Duplicate mobile check + insert ────────────────────────────────────────
  const db = createServerSupabase()

  // Check duplicate mobile
  const { data: existing } = await db
    .from('employees')
    .select('id')
    .eq('mobile', body.mobile.trim())
    .maybeSingle()

  if (existing)
    return NextResponse.json(
      { error: 'An employee with this mobile number already exists', fields: { mobile: 'Mobile number already registered' } },
      { status: 409 }
    )

  const { data, error } = await db
    .from('employees')
    .insert({
      full_name:       body.full_name.trim(),
      mobile:          body.mobile.trim(),
      address:         body.address.trim(),
      email:           body.email?.trim() || null,
      role:            body.role || null,
      experience_years: body.experience_years ?? null,
      expected_salary: body.expected_salary ?? null,
      profile_photo:   body.profile_photo || null,
      aadhaar_encrypted,
      aadhaar_last4,
    })
    .select('id, full_name, mobile, role, created_at')
    .single()

  if (error) {
    // Supabase unique constraint fallback (race condition safety)
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Duplicate entry', fields: { mobile: 'Mobile number already registered' } },
        { status: 409 }
      )
    }
    console.error('DB insert error:', error)
    return NextResponse.json({ error: 'Database error. Try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true, employee: data }, { status: 201 })
}
