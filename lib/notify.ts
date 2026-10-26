import 'server-only'
import { slotLabel } from '@/lib/booking'
import { SITE_URL } from '@/lib/site'

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

const button = (href: string, label: string, bg: string) =>
  `<a href="${href}" style="display:inline-block;background:${bg};color:#ffffff;text-decoration:none;font-weight:600;padding:12px 18px;border-radius:6px;margin:0 8px 8px 0">${label}</a>`

/**
 * Emails the owner about a new booking through Resend. Does nothing (and returns false) when the
 * email env vars are not set, so a missing email setup never blocks a booking.
 */
export async function emailOwner(b: BookingRecord) {
  const key = process.env.RESEND_API_KEY
  const to = process.env.BOOKING_NOTIFY_EMAIL
  if (!key || !to) return false

  const when = `${b.booking_date}, ${slotLabel(b.slot)}`
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.address}, Vadodara`)}`
  const rows: [string, string | null][] = [
    ['Customer', b.name], ['Phone', b.phone], ['Address', b.address],
    ['Appliance', b.appliance], ['Service', b.service], ['Problem', b.problem],
  ]

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#15212c">
  <div style="background:#1c4e89;color:#ffffff;padding:18px 22px;border-radius:8px 8px 0 0">
    <div style="font-size:13px;opacity:.85">New booking #${b.id}</div>
    <div style="font-size:22px;font-weight:700;margin-top:4px">${esc(when)}</div>
  </div>
  <div style="border:1px solid #e0dbd0;border-top:0;padding:18px 22px;border-radius:0 0 8px 8px">
    <table cellpadding="0" cellspacing="0" style="width:100%;font-size:15px">${rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6b7783;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 0">${esc(v!)}</td></tr>`)
      .join('')}</table>
    <div style="margin-top:16px">
      ${button(`tel:+91${b.phone}`, 'Call customer', '#1c4e89')}
      ${button(`https://wa.me/91${b.phone}`, 'WhatsApp customer', '#1f7a4d')}
      ${button(mapUrl, 'Open in Maps', '#4b5966')}
    </div>
    <p style="margin:12px 0 0;font-size:13px;color:#6b7783">Confirm or cancel it in the <a href="${SITE_URL}/dashboard/admin">bookings dashboard</a>.</p>
  </div>
</div>`

  const text = [
    `New booking #${b.id}: ${when}`,
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    `Call: +91${b.phone}`,
    `WhatsApp: https://wa.me/91${b.phone}`,
    `Map: ${mapUrl}`,
    `Dashboard: ${SITE_URL}/dashboard/admin`,
  ].join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.BOOKING_FROM_EMAIL || 'Relax Aircon <onboarding@resend.dev>',
        to: [to],
        subject: `New booking: ${b.name}, ${when}`,
        html,
        text,
      }),
    })
    if (!res.ok) console.error('Resend error', res.status)
    return res.ok
  } catch (e) {
    console.error('Booking email failed', e)
    return false
  }
}
