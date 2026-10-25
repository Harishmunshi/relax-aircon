// Staff session handling. Uses Web Crypto so it runs in both middleware (edge) and API routes (node).
// Passwords and the signing secret come from env vars; if they are missing, login is disabled.

export type Role = 'admin' | 'technician'

export const SESSION_COOKIE = 'ra_session'
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours

const enc = new TextEncoder()

function b64url(bytes: Uint8Array) {
  let s = ''
  bytes.forEach(b => { s += String.fromCharCode(b) })
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromB64url(s: string) {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(bin, c => c.charCodeAt(0))
}

function secret() {
  const s = process.env.SESSION_SECRET ?? ''
  return s.length >= 32 ? s : null
}

async function hmac(data: string, key: string) {
  const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return new Uint8Array(await crypto.subtle.sign('HMAC', k, enc.encode(data)))
}

function equalBytes(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

export function authConfigured() {
  return !!secret() && (process.env.ADMIN_PASSWORD ?? '').length >= 8
}

/** Constant-time password check against the env var for that role. */
export async function checkPassword(role: Role, password: string) {
  const key = secret()
  const expected = role === 'admin' ? process.env.ADMIN_PASSWORD : process.env.TECH_PASSWORD
  if (!key || !expected || expected.length < 8) return false
  // Compare HMACs so lengths match and timing does not leak the password.
  const [a, b] = await Promise.all([hmac(password, key), hmac(expected, key)])
  return equalBytes(a, b)
}

export async function createSession(role: Role) {
  const key = secret()
  if (!key) throw new Error('SESSION_SECRET is not configured')
  const payload = b64url(enc.encode(JSON.stringify({ role, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE })))
  const sig = b64url(await hmac(payload, key))
  return `${payload}.${sig}`
}

export async function verifySession(token: string | undefined): Promise<{ role: Role } | null> {
  const key = secret()
  if (!key || !token) return null
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return null
  try {
    const expected = await hmac(payload, key)
    if (!equalBytes(expected, fromB64url(sig))) return null
    const data = JSON.parse(new TextDecoder().decode(fromB64url(payload)))
    if (typeof data.exp !== 'number' || data.exp < Date.now() / 1000) return null
    if (data.role !== 'admin' && data.role !== 'technician') return null
    return { role: data.role }
  } catch {
    return null
  }
}

/** Only allow redirects back into the staff area, never to another site. */
export function safeNext(next: string | null | undefined, role: Role) {
  const home = role === 'admin' ? '/dashboard/admin' : '/dashboard/technician'
  if (!next || !next.startsWith('/dashboard') || next.startsWith('//')) return home
  if (role === 'technician' && !next.startsWith('/dashboard/technician')) return home
  return next
}
