// Re-export so consumers only need one import
export { maskAadhaar } from './aadhaar-crypto'

export const ROLES = [
  { value: 'technician',        label: 'Technician' },
  { value: 'senior_technician', label: 'Senior Technician' },
  { value: 'supervisor',        label: 'Supervisor' },
  { value: 'manager',           label: 'Manager' },
  { value: 'admin_staff',       label: 'Admin Staff' },
  { value: 'receptionist',      label: 'Receptionist' },
  { value: 'other',             label: 'Other' },
] as const

export type RoleValue = (typeof ROLES)[number]['value']

export interface EmployeeRow {
  id: string
  full_name: string
  mobile: string
  address: string
  email: string | null
  role: RoleValue | null
  experience_years: number | null
  expected_salary: number | null
  profile_photo: string | null
  aadhaar_last4: string | null
  status: 'active' | 'inactive' | 'terminated'
  created_at: string
  updated_at: string
}

// Shape POSTed from the registration form
export interface EmployeeFormPayload {
  full_name: string
  mobile: string
  address: string
  email?: string
  role?: string
  experience_years?: number | null
  expected_salary?: number | null
  profile_photo?: string    // URL after Supabase Storage upload
  aadhaar?: string          // 12-digit plaintext — encrypted server-side, never stored as-is
}

// ── Validation helpers (run on both client + server) ──────────────────────────

export function validateMobile(v: string): string | null {
  if (!v) return 'Mobile number is required'
  if (!/^\d{10}$/.test(v)) return 'Enter a valid 10-digit mobile number'
  return null
}

export function validateAadhaar(v: string): string | null {
  if (!v) return null // optional
  if (!/^\d{12}$/.test(v)) return 'Aadhaar must be exactly 12 digits'
  return null
}

export function validateEmail(v: string): string | null {
  if (!v) return null // optional
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address'
  return null
}
