import { ImageResponse } from 'next/og'
import Logo from '@/components/Logo'

export const runtime = 'edge'
export const size = { width: 192, height: 192 }
export const contentType = 'image/png'

// Site icon shown in browser tabs and next to the site in Google results.
export default function Icon() {
  return new ImageResponse(<Logo size={192} />, size)
}
