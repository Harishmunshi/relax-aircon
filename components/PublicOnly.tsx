'use client'
import { usePathname } from 'next/navigation'

export function isStaffPath(pathname: string) {
  return pathname.startsWith('/dashboard') || pathname.startsWith('/login')
}

/** Renders children only on public pages, hiding site chrome inside the staff area. */
export default function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/'
  if (isStaffPath(pathname)) return null
  return <>{children}</>
}
