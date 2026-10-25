import 'server-only'
import { slotLabel } from '@/lib/booking'

export type BookingRecord = {
  id: number
  name: string
  phone: string
  address: string
  appliance: string | null
  service: string | null
  problem: string | null
  booking_date: string
  slot: string
}

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

/**
 * Emails the owner about a new booking through Resend. Does nothing (and returns false) when the
 * email env vars are not set, so a missing email setup never blocks a booking.
 */
export async function emailOwner(b: BookingRecord) {
  const key = process.env.RESEND_API_KEY
  const to = process.env.BOOKING_NOTIFY_EMAIL
  if (!key || !to) return false

  const rows: [string, string | null][] = [
    ['Name', b.name], ['Phone', b.phone], ['Address', b.address],
    ['Date', b.booking_date], ['Time slot', slotLabel(b.slot)],
    ['Appliance', b.appliance], ['Service', b.service], ['Problem', b.problem],
  ]
  const html = `<h2>New booking #${b.id}</h2><table cellpadding="6">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v!)}</td></tr>`)
    .join('')}</table><p><a href="tel:+91${b.phone}">Call customer</a> · <a href="https://wa.me/91${b.phone}">WhatsApp customer</a></p>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.BOOKING_FROM_EMAIL || 'Relax Aircon <onboarding@resend.dev>',
        to: [to],
        subject: `New booking: ${b.name}, ${b.booking_date} ${slotLabel(b.slot)}`,
        html,
      }),
    })
    if (!res.ok) console.error('Resend error', res.status)
    return res.ok
  } catch (e) {
    console.error('Booking email failed', e)
    return false
  }
}
