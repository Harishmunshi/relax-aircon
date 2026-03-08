'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '120px 60px 80px', background: '#020c18' }}>

      {/* BG orbs */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 70% 50%,rgba(0,153,204,0.12) 0%,transparent 60%),radial-gradient(ellipse 40% 40% at 20% 80%,rgba(201,168,76,0.06) 0%,transparent 50%)' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,0.04) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* Orbs */}
      {[
        { w: 500, h: 500, bg: 'rgba(0,153,204,0.08)', top: -100, right: -100, delay: '0s' },
        { w: 300, h: 300, bg: 'rgba(201,168,76,0.06)', bottom: 0, left: '10%', delay: '3s' },
        { w: 200, h: 200, bg: 'rgba(0,212,255,0.1)', top: '30%', right: '22%', delay: '1.5s' },
      ].map((o, i) => (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
          width: o.w, height: o.h, background: o.bg,
          top: o.top ?? 'auto', bottom: (o as any).bottom ?? 'auto',
          left: (o as any).left ?? 'auto', right: (o as any).right ?? 'auto',
          animation: `orbFloat 8s ease-in-out infinite`, animationDelay: o.delay
        }} />
      ))}

      {/* Snowflakes */}
      {mounted && ['❄','❅','❆','✦','·'].flatMap((c, ci) =>
        Array.from({ length: 6 }, (_, i) => (
          <div key={`${ci}-${i}`} style={{
            position: 'absolute', color: '#00d4ff', opacity: 0, fontSize: `${8 + Math.random() * 10}px`,
            left: `${Math.random() * 100}%`, top: 0,
            animation: `snowFall ${5 + Math.random() * 8}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`, pointerEvents: 'none'
          }}>{c}</div>
        ))
      )}

      {/* CONTENT */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 600 }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 50, padding: '8px 18px', marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, background: '#c9a84c', borderRadius: '50%', animation: 'badgePulse 2s infinite' }} />
          <span style={{ color: '#e8c97a', fontSize: '0.75rem', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const }}>Vadodara's Premium Service</span>
        </div>

        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#00d4ff', marginBottom: 16 }}>
          AC • Fridge • Washing Machine
        </p>

        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3.5rem,7vw,6rem)', fontWeight: 300, lineHeight: 1.05, color: '#f0f8ff', marginBottom: 12, letterSpacing: -1 }}>
          <strong style={{ fontWeight: 700, background: 'linear-gradient(135deg,#00d4ff 0%,#fff 50%,#0099cc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Cooling</strong> Your<br />
          <span style={{ fontStyle: 'italic', fontWeight: 300, background: 'linear-gradient(135deg,#c9a84c,#e8c97a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Comfort</span><br />
          Since 2020
        </h1>

        <p style={{ fontSize: '1.05rem', color: '#7ba8c4', lineHeight: 1.7, marginBottom: 40, fontWeight: 300, maxWidth: 480 }}>
          Vadodara's most trusted appliance service. Expert repair, installation & maintenance for AC, refrigerators, washing machines & more.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' as const, marginBottom: 60 }}>
          <Link href="/book" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#00d4ff,#0099cc)', color: '#020c18', fontWeight: 700, fontSize: '0.9rem', padding: '16px 36px', borderRadius: 50, textDecoration: 'none', boxShadow: '0 8px 40px rgba(0,212,255,0.35)', animation: 'pulse-glow 2s infinite' }}>
            🔧 Book Service Now
          </Link>
          <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff', fontWeight: 500, fontSize: '0.9rem', padding: '16px 36px', borderRadius: 50, textDecoration: 'none' }}>
            View Services →
          </Link>
          <a href="tel:+917043245355" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff6b6b', fontWeight: 600, fontSize: '0.85rem', padding: '14px 28px', borderRadius: 50, textDecoration: 'none' }}>
            🚨 Emergency: +91 70432 45355
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' as const }}>
          {[['10K+','Happy Customers'],['5+','Years Experience'],['4.9★','Google Rating'],['24/7','Emergency']].map(([val, label], i, arr) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', fontWeight: 700, background: 'linear-gradient(135deg,#f0f8ff,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: '0.72rem', color: '#7ba8c4', letterSpacing: '1.5px', textTransform: 'uppercase' as const, marginTop: 4 }}>{label}</div>
              </div>
              {i < arr.length - 1 && <div style={{ width: 1, height: 40, background: 'rgba(0,180,255,0.15)' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* 3D AC VISUAL */}
      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '52%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }} className="hidden lg:flex">
        <div style={{ position: 'relative', width: 480, height: 480 }}>
          {/* Glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 200, background: 'radial-gradient(ellipse,rgba(0,180,255,0.15) 0%,transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />

          {/* Floating tags */}
          {[
            { icon: '❄️', name: 'AC Repair', price: 'From ₹350', style: { top: 20, right: 20, animationDelay: '0s' } },
            { icon: '🧊', name: 'Fridge Repair', price: 'From ₹400', style: { bottom: 120, left: 0, animationDelay: '1.5s' } },
            { icon: '🌀', name: 'Gas Refill', price: 'From ₹2,500', style: { top: 180, left: -20, animationDelay: '3s' } },
          ].map(tag => (
            <div key={tag.name} style={{
              position: 'absolute', background: 'rgba(2,12,24,0.85)', border: '1px solid rgba(0,180,255,0.15)',
              backdropFilter: 'blur(20px)', borderRadius: 16, padding: '12px 18px',
              animation: 'tagFloat 5s ease-in-out infinite', ...tag.style
            }}>
              <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>{tag.icon}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#f0f8ff', letterSpacing: 1 }}>{tag.name}</div>
              <div style={{ fontSize: '0.65rem', color: '#00d4ff', marginTop: 2 }}>{tag.price}</div>
            </div>
          ))}

          {/* 3D AC Unit */}
          <div style={{ position: 'relative', width: 380, height: 160, margin: '60px auto 0', transform: 'perspective(1000px) rotateX(10deg) rotateY(-15deg)', animation: 'acFloat 4s ease-in-out infinite', filter: 'drop-shadow(0 40px 60px rgba(0,180,255,0.4))' }}>
            <div style={{ width: 380, height: 160, background: 'linear-gradient(160deg,#1a3a5c 0%,#0d2540 40%,#091c34 100%)', borderRadius: 20, border: '1px solid rgba(0,180,255,0.3)', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.1),0 0 60px rgba(0,180,255,0.2)' }}>
              {/* Screen */}
              <div style={{ position: 'absolute', top: 20, left: 24, width: 100, height: 56, background: 'linear-gradient(135deg,#001a2e,#002a44)', borderRadius: 8, border: '1px solid rgba(0,180,255,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: '1.4rem', fontWeight: 800, color: '#00d4ff', textShadow: '0 0 10px #00d4ff', letterSpacing: -1 }}>18°C</div>
                <div style={{ fontSize: '0.55rem', color: 'rgba(0,212,255,0.6)', letterSpacing: 2, textTransform: 'uppercase' as const }}>COOLING</div>
              </div>
              {/* Vents */}
              <div style={{ position: 'absolute', top: '50%', right: 24, transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[0,0.3,0.6,0.9,1.2,1.5].map((delay, i) => (
                  <div key={i} style={{ width: 200, height: 3, background: 'linear-gradient(90deg,transparent,rgba(0,180,255,0.4),transparent)', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: '-100%', width: '60%', height: '100%', background: 'linear-gradient(90deg,transparent,rgba(0,212,255,0.8),transparent)', animation: `ventGlow 2s ease-in-out infinite`, animationDelay: `${delay}s` }} />
                  </div>
                ))}
              </div>
              {/* LEDs */}
              <div style={{ position: 'absolute', bottom: 18, left: 24, display: 'flex', gap: 8 }}>
                {[['#00ff88','#00ff88'],['#00d4ff','#00d4ff'],['#c9a84c','#c9a84c']].map(([bg, shadow], i) => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: bg, boxShadow: `0 0 8px ${shadow}`, animation: 'ledBlink 2s ease-in-out infinite', animationDelay: `${i * 0.5}s` }} />
                ))}
              </div>
              <div style={{ position: 'absolute', bottom: 16, right: 24, fontFamily: "'Cormorant Garamond',serif", fontSize: '0.9rem', fontWeight: 600, color: 'rgba(0,180,255,0.5)', letterSpacing: 3, textTransform: 'uppercase' as const }}>Relax Aircon</div>
            </div>
            {/* Flap */}
            <div style={{ position: 'absolute', bottom: -14, left: '10%', right: '10%', height: 14, background: 'linear-gradient(180deg,#0d2540,#071828)', borderRadius: '0 0 10px 10px', border: '1px solid rgba(0,180,255,0.15)', borderTop: 'none' }} />
            {/* Cold air */}
            <div style={{ position: 'absolute', bottom: -20, left: 0, right: 0, height: 120, display: 'flex', justifyContent: 'space-around' }}>
              {[0,0.2,0.4,0.6,0.8,1.0,1.2].map((delay, i) => (
                <div key={i} style={{ width: 2, background: 'linear-gradient(180deg,rgba(0,212,255,0.6),transparent)', borderRadius: 2, animation: 'coldFlow 1.5s ease-in-out infinite', animationDelay: `${delay}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
