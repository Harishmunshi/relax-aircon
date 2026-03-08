import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#020c18', borderTop: '1px solid rgba(0,180,255,0.15)', padding: '60px 60px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 50 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: '1.8rem' }}>❄️</span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', fontWeight: 600, color: '#f0f8ff' }}>Relax<span style={{ color: '#00d4ff' }}>Aircon</span></span>
            </div>
            <p style={{ color: '#7ba8c4', fontSize: '0.85rem', lineHeight: 1.7, margin: '16px 0 20px', maxWidth: 280 }}>
              Vadodara's most trusted appliance service since 2020. AC, Fridge, Washing Machine & more.
            </p>
            <p style={{ color: '#00d4ff', fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>+91 70432 45355</p>
            <p style={{ color: '#7ba8c4', fontSize: '0.8rem' }}>Azhar Munshi — Owner</p>
          </div>
          {[
            { title: 'Services', links: [['AC Repair & Install','#'],['Gas Refill','#'],['Fridge Repair','#'],['Washing Machine','#'],['Deep Freezer','#'],['Central AC','#']] },
            { title: 'Areas', links: [['Alkapuri','#'],['Fatehgunj','#'],['Gotri','#'],['Manjalpur','#'],['Akota','#'],['Waghodia Rd','#']] },
            { title: 'Contact', links: [['📞 +91 70432 45355','tel:+917043245355'],['💬 WhatsApp','https://wa.me/917043245355'],['📍 Vadodara, Gujarat','#'],['⏰ 8AM–10PM Daily','#'],['🚨 24/7 Emergency','tel:+917043245355']] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' as const, color: '#7ba8c4', marginBottom: 20 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(([label, href]) => (
                  <a key={label} href={href} style={{ color: 'rgba(123,168,196,0.7)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}>{label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(0,180,255,0.15)', paddingTop: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 12 }}>
          <p style={{ fontSize: '0.8rem', color: '#7ba8c4' }}>© 2025 Relax Aircon. All rights reserved. Vadodara, Gujarat.</p>
          <p style={{ fontSize: '0.72rem', color: 'rgba(123,168,196,0.4)' }}>AC Repair Vadodara • AC Service Vadodara • Fridge Repair Vadodara • Washing Machine Repair Vadodara</p>
        </div>
      </div>
    </footer>
  )
}
