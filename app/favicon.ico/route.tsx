import { ImageResponse } from 'next/og'
import Logo from '@/components/Logo'

export const runtime = 'edge'

// Google and old browsers request /favicon.ico directly, so serve the logo there too.
export function GET() {
  return new ImageResponse(<Logo size={48} />, { width: 48, height: 48 })
}
