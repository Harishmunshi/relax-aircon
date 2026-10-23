'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/site'
import { isStaffPath } from '@/components/PublicOnly'

const links = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/book', label: 'Book a visit' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname() ?? '/'
  if (isStaffPath(pathname)) return null

  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand">Relax Aircon</Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(o => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className={`nav${open ? ' open' : ''}`} aria-label="Main">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a href={`tel:${PHONE_TEL}`} className="header-phone">{PHONE_DISPLAY}</a>
        </nav>
      </div>
    </header>
  )
}
