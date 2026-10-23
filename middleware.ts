import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE, verifySession } from '@/lib/auth'

const MUTATING = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  const isApi = pathname.startsWith('/api/')

  // Block cross-site form posts to any API route (CSRF defence on top of SameSite cookies).
  if (isApi && MUTATING.has(req.method)) {
    const origin = req.headers.get('origin')
    if (origin && origin !== req.nextUrl.origin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  // Login and logout endpoints are public.
  if (pathname.startsWith('/api/auth/')) return NextResponse.next()

  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value)

  if (!session) {
    if (isApi) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.search = `?next=${encodeURIComponent(pathname + search)}`
    return NextResponse.redirect(url)
  }

  const home = session.role === 'admin' ? '/dashboard/admin' : '/dashboard/technician'
  if (pathname === '/dashboard' || pathname === '/dashboard/') {
    return NextResponse.redirect(new URL(home, req.url))
  }

  // Technicians only see their own job list. Everything else (staff records, admin) is admin-only.
  if (session.role !== 'admin' && !pathname.startsWith('/dashboard/technician')) {
    if (isApi) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    return NextResponse.redirect(new URL(home, req.url))
  }

  const res = NextResponse.next()
  res.headers.set('Cache-Control', 'private, no-store')
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return res
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/api/:path*'],
}
