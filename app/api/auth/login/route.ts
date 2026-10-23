import { NextRequest, NextResponse } from 'next/server'
import {
  SESSION_COOKIE, SESSION_MAX_AGE, authConfigured, checkPassword, createSession, safeNext, type Role,
} from '@/lib/auth'

// Best-effort brute-force throttle. Per server instance, so it slows attackers rather than stopping a
// distributed attack; strong passwords in env vars are the real protection.
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5
const attempts = new Map<string, { count: number; first: number }>()

function clientKey(req: NextRequest) {
  return req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

function throttled(key: string) {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || now - entry.first > WINDOW_MS) return false
  return entry.count >= MAX_ATTEMPTS
}

function recordFailure(key: string) {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || now - entry.first > WINDOW_MS) attempts.set(key, { count: 1, first: now })
  else entry.count++
  if (attempts.size > 5000) attempts.clear()
}

export async function POST(req: NextRequest) {
  if (!authConfigured()) {
    return NextResponse.json({ error: 'Staff login is not set up yet.' }, { status: 503 })
  }

  const key = clientKey(req)
  if (throttled(key)) {
    return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 })
  }

  let body: { role?: unknown; password?: unknown; next?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const role: Role | null = body.role === 'admin' || body.role === 'technician' ? body.role : null
  const password = typeof body.password === 'string' ? body.password.slice(0, 200) : ''

  if (!role || !password || !(await checkPassword(role, password))) {
    recordFailure(key)
    await new Promise(r => setTimeout(r, 400))
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  attempts.delete(key)
  const res = NextResponse.json({ ok: true, redirect: safeNext(typeof body.next === 'string' ? body.next : null, role) })
  res.cookies.set(SESSION_COOKIE, await createSession(role), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  return res
}
