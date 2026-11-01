import { ImageResponse } from 'next/og'
import Logo from '@/components/Logo'

export const runtime = 'edge'

// 512 px logo: download it to use as the Google Business Profile logo and social profile picture.
export function GET() {
  return new ImageResponse(<Logo size={512} />, { width: 512, height: 512 })
}
