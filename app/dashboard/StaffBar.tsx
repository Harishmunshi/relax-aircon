'use client'
import Link from 'next/link'
import type { Role } from '@/lib/auth'

export default function StaffBar({ role }: { role: Role }) {
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.assign('/login')
  }
  return (
    <div className="staff-bar">
      <div className="wrap">
        <strong>Relax Aircon staff</strong>
        <nav className="staff-nav" aria-label="Staff">
          {role === 'admin' ? (
            <>
              <Link href="/dashboard/admin">Bookings</Link>
              <Link href="/dashboard/employees">Employees</Link>
              <Link href="/dashboard/technician">Technician view</Link>
            </>
          ) : (
            <Link href="/dashboard/technician">My jobs</Link>
          )}
          <button type="button" onClick={logout}>Log out</button>
        </nav>
      </div>
    </div>
  )
}
