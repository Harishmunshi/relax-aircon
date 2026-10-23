import { ImageResponse } from 'next/og'
import { PHONE_DISPLAY } from '@/lib/site'

export const runtime = 'edge'
export const alt = 'Relax Aircon, AC repair and service in Vadodara'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#f6f4ef', color: '#15212c', padding: 72, fontFamily: 'Georgia, serif' }}>
        <div style={{ fontSize: 36, fontWeight: 700 }}>Relax Aircon</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>AC, fridge and washing machine repair in Vadodara</div>
          <div style={{ fontSize: 34, marginTop: 28, color: '#4b5966' }}>{`Same-day visits. Price before work. Call ${PHONE_DISPLAY}`}</div>
        </div>
      </div>
    ),
    size,
  )
}
