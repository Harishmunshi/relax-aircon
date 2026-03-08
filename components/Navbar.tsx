'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  if (pathname.startsWith('/dashboard')) return null

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '14px 60px' : '20px 60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(2,12,24,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,180,255,0.15)' : 'none',
      transition: 'all 0.4s',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <span style={{ fontSize: '1.6rem' }}>❄️</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 600, color: '#f0f8ff', letterSpacing: 1 }}>
          Relax<span style={{ color: '#00d4ff' }}>Aircon</span>
        </span>
      </Link>

      <div style={{ display: 'flex', gap: 32, listStyle: 'none' }} className="hidden md:flex">
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            color: pathname === l.href ? '#00d4ff' : '#7ba8c4',
            textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
            letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'color 0.3s'
          }}>{l.label}</Link>
        ))}
      </div>

      <Link href="/book" style={{
        background: 'linear-gradient(135deg,#00d4ff,#0099cc)', color: '#020c18',
        fontWeight: 700, fontSize: '0.8rem', padding: '10px 24px', borderRadius: 50,
        textDecoration: 'none', letterSpacing: 1, textTransform: 'uppercase' as const,
        boxShadow: '0 0 20px rgba(0,212,255,0.3)'
      }} className="hidden md:block">Book Now</Link>

      <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#f0f8ff', cursor: 'pointer' }} className="md:hidden">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(2,12,24,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,180,255,0.15)', padding: '20px 30px',
          display: 'flex', flexDirection: 'column', gap: 16
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              color: '#7ba8c4', textDecoration: 'none', fontSize: '0.9rem',
              fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase' as const
            }}>{l.label}</Link>
          ))}
          <a href="tel:+917043245355" style={{
            background: 'linear-gradient(135deg,#00d4ff,#0099cc)', color: '#020c18',
            fontWeight: 700, padding: '12px 20px', borderRadius: 50, textAlign: 'center',
            textDecoration: 'none', fontSize: '0.9rem'
          }}>📞 +91 70432 45355</a>
        </div>
      )}
    </nav>
  )
}
