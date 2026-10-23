import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import StaffBar from './StaffBar'
import { SESSION_COOKIE, verifySession } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Staff area',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Middleware already enforces this; checking again here means a misconfigured matcher cannot expose pages.
  const session = await verifySession(cookies().get(SESSION_COOKIE)?.value)
  if (!session) redirect('/login')
  return (
    <>
      <StaffBar role={session.role} />
      {children}
    </>
  )
}
