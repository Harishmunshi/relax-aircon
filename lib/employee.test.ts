/**
 * Employee Registration — Test Cases
 * Run with: npx tsx lib/employee.test.ts  (after npm install tsx)
 *
 * These are integration-style tests covering happy paths + edge cases.
 * In production, wire these into Jest / Vitest as needed.
 */

import { validateMobile, validateAadhaar, validateEmail } from './employee-types'
import { encryptAadhaar, decryptAadhaar, maskAadhaar } from './aadhaar-crypto'

// ── Helpers ──────────────────────────────────────────────────────────────────
const pass = (name: string) => console.log(`  ✅ PASS  ${name}`)
const fail = (name: string, reason: string) => { console.error(`  ❌ FAIL  ${name}: ${reason}`); process.exitCode = 1 }
const assert = (name: string, cond: boolean, reason = '') => cond ? pass(name) : fail(name, reason)

// ── Happy Path Tests ─────────────────────────────────────────────────────────
console.log('\n── Happy Path ───────────────────────────────────────────────')

// HP-1: Valid mandatory fields pass validation
{
  const name = 'HP-1: Valid mandatory fields pass'
  const mobileErr = validateMobile('9876543210')
  assert(name, mobileErr === null, `Expected null, got: ${mobileErr}`)
}

// HP-2: Optional Aadhaar 12-digit passes; masked correctly
{
  const aadhaarErr = validateAadhaar('123456789012')
  assert('HP-2a: Valid 12-digit Aadhaar passes', aadhaarErr === null)
  const mask = maskAadhaar('1234')
  assert('HP-2b: Aadhaar masked as XXXX-XXXX-1234', mask === 'XXXX-XXXX-1234', `Got: ${mask}`)
}

// HP-3: Aadhaar encrypt → decrypt round-trip is lossless
{
  // Requires AADHAAR_ENCRYPTION_KEY set. Skip gracefully if not.
  if (process.env.AADHAAR_ENCRYPTION_KEY?.length === 64) {
    const plain = '987654321012'
    const encrypted = encryptAadhaar(plain)
    const decrypted = decryptAadhaar(encrypted)
    assert('HP-3: Aadhaar encrypt/decrypt round-trip', decrypted === plain, `Got: ${decrypted}`)
    assert('HP-3b: Encrypted value is never plaintext', encrypted !== plain)
    assert('HP-3c: Encrypted format is iv:tag:cipher', /^[0-9a-f]+:[0-9a-f]+:[0-9a-f]+$/.test(encrypted))
  } else {
    console.log('  ⏭  HP-3: Skipped (AADHAAR_ENCRYPTION_KEY not set)')
  }
}

// ── Edge Case Tests ───────────────────────────────────────────────────────────
console.log('\n── Edge Cases ───────────────────────────────────────────────')

// EC-1: Mobile with fewer than 10 digits fails
{
  const err = validateMobile('98765')
  assert('EC-1a: 5-digit mobile rejected', err !== null)
  const err2 = validateMobile('98765432100') // 11 digits
  assert('EC-1b: 11-digit mobile rejected', err2 !== null)
  const err3 = validateMobile('9876abc123') // non-numeric
  assert('EC-1c: Alpha-numeric mobile rejected', err3 !== null)
}

// EC-2: Aadhaar with 11 digits (too short) fails; empty string passes (optional)
{
  const err11 = validateAadhaar('12345678901') // 11 digits
  assert('EC-2a: 11-digit Aadhaar rejected', err11 !== null)
  const errEmpty = validateAadhaar('')  // optional field — should be null
  assert('EC-2b: Empty Aadhaar passes (field is optional)', errEmpty === null)
}

// EC-3: Invalid email format rejected; empty passes (optional)
{
  const errBad = validateEmail('notanemail')
  assert('EC-3a: "notanemail" rejected', errBad !== null)
  const errEmpty = validateEmail('')
  assert('EC-3b: Empty email passes (optional)', errEmpty === null)
  const errOk = validateEmail('azhar@relaxaircon.in')
  assert('EC-3c: Valid email passes', errOk === null)
}

console.log('\n─────────────────────────────────────────────────────────────\n')

/**
 * API-level tests (run manually or in CI with a real Supabase test project):
 *
 * Duplicate Mobile (409):
 *   POST /api/employee/register  { mobile: "existing_number", ... }
 *   → Expect 409, body.fields.mobile = "Mobile number already registered"
 *
 * Missing mandatory fields (422):
 *   POST /api/employee/register  { mobile: "9876543210" }   (no full_name, address)
 *   → Expect 422, body.fields.full_name and body.fields.address present
 *
 * GET with search filter:
 *   GET /api/employee?search=ravi&role=technician
 *   → Expect 200, all returned rows have full_name containing "ravi" (case-insensitive)
 */
