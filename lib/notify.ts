import 'server-only'
import { SLOTS, slotLabel } from '@/lib/booking'
import { SITE_URL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/site'

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

type Row = [string, string | null | undefined]

/** One email through Resend. Returns false (and never throws) when email is not set up or fails. */
async function send(to: string[], subject: string, html: string, text: string) {
  const key = process.env.RESEND_API_KEY
  if (!key || to.length === 0) return false
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.BOOKING_FROM_EMAIL || 'Relax Aircon <onboarding@resend.dev>',
        to,
        subject,
        html,
        text,
      }),
    })
    if (!res.ok) console.error('Resend error', res.status)
    return res.ok
  } catch (e) {
    console.error('Email failed', e)
    return false
  }
}

const ownerRecipients = () => (process.env.BOOKING_NOTIFY_EMAIL ?? '').split(',').map(a => a.trim()).filter(Boolean)

const table = (rows: Row[]) =>
  `<table cellpadding="0" cellspacing="0" style="width:100%;font-size:15px">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6b7783;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 0">${esc(v!)}</td></tr>`)
    .join('')}</table>`

/** A blue-headed card: heading + big line, a details table, and action buttons. */
function card(kicker: string, headline: string, rows: Row[], buttons: string, footer: string) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#15212c">
  <div style="background:#1c4e89;color:#ffffff;padding:18px 22px;border-radius:8px 8px 0 0">
    <div style="font-size:13px;opacity:.85">${esc(kicker)}</div>
    <div style="font-size:22px;font-weight:700;margin-top:4px">${esc(headline)}</div>
  </div>
  <div style="border:1px solid #e0dbd0;border-top:0;padding:18px 22px;border-radius:0 0 8px 8px">
    ${table(rows)}
    <div style="margin-top:16px">${buttons}</div>
    <p style="margin:12px 0 0;font-size:13px;color:#6b7783">${footer}</p>
  </div>
</div>`
}

const plain = (lines: string[], rows: Row[]) =>
  [...lines, ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join('\n')

/** One-tap "add to Google Calendar" link for a booking (IST, floating local time). */
function calendarUrl(b: BookingRecord) {
  const slot = SLOTS.find(s => s.id === b.slot)
  const day = b.booking_date.replace(/-/g, '')
  const hh = (h: number) => String(h).padStart(2, '0')
  const start = slot?.startHour ?? 9
  const details = [`Phone: ${b.phone}`, b.service && `Service: ${b.service}`, b.appliance && `Appliance: ${b.appliance}`, b.problem && `Problem: ${b.problem}`].filter(Boolean).join('\n')
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Relax Aircon: ${b.name}${b.service ? ` (${b.service})` : ''}`,
    dates: `${day}T${hh(start)}0000/${day}T${hh(start + 2)}0000`,
    ctz: 'Asia/Kolkata',
    details,
    location: `${b.address}, Vadodara`,
  })
  return `https://calendar.google.com/calendar/render?${q}`
}

/** Alert to the owner about a new booking. */
export async function emailOwner(b: BookingRecord) {
  const to = ownerRecipients()
  if (to.length === 0) return false
  const when = `${b.booking_date}, ${slotLabel(b.slot)}`
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.address}, Vadodara`)}`
  const calUrl = calendarUrl(b)
  const rows: Row[] = [['Customer', b.name], ['Phone', b.phone], ['Address', b.address], ['Appliance', b.appliance], ['Service', b.service], ['Problem', b.problem]]
  const html = card(
    `New booking #${b.id}`, when, rows,
    button(`tel:+91${b.phone}`, 'Call customer', '#1c4e89') + button(`https://wa.me/91${b.phone}`, 'WhatsApp customer', '#1f7a4d') + button(mapUrl, 'Open in Maps', '#4b5966') + button(calUrl, 'Add to Google Calendar', '#8a5a00'),
    `Confirm or cancel it in the <a href="${SITE_URL}/dashboard/admin">bookings dashboard</a>.`,
  )
  const text = plain([`New booking #${b.id}: ${when}`], rows) + `\nCall: +91${b.phone}\nWhatsApp: https://wa.me/91${b.phone}\nMap: ${mapUrl}\nAdd to Google Calendar: ${calUrl}\nDashboard: ${SITE_URL}/dashboard/admin`
  return send(to, `New booking: ${b.name}, ${when}`, html, text)
}

/** Confirmation to the customer, only when they gave an email address. */
export async function emailCustomer(b: BookingRecord, email: string) {
  const when = `${b.booking_date}, ${slotLabel(b.slot)}`
  const rows: Row[] = [['Date and time', when], ['Service', b.service], ['Appliance', b.appliance], ['Address', b.address]]
  const html = card(
    'Booking received', `Thank you, ${b.name}`, rows,
    button(`tel:${PHONE_TEL}`, `Call ${PHONE_DISPLAY}`, '#1c4e89'),
    `We will call you on ${esc(b.phone)} to confirm your visit. If you need to change it, call us on ${esc(PHONE_DISPLAY)}. Relax Aircon, Vadodara.`,
  )
  const text = plain([`Hi ${b.name}, thank you for booking with Relax Aircon.`], rows) + `\nWe will call you on ${b.phone} to confirm. To change it, call ${PHONE_DISPLAY}.`
  return send([email], `Your Relax Aircon booking: ${when}`, html, text)
}

/** Alert to the owner about a job application. */
export async function emailApplication(a: { id: number; name: string; phone: string; area: string | null; role: string; experience: string | null; message: string | null }) {
  const to = ownerRecipients()
  if (to.length === 0) return false
  const rows: Row[] = [['Name', a.name], ['Phone', a.phone], ['Area', a.area], ['Role', a.role], ['Experience', a.experience], ['Message', a.message]]
  const html = card(
    `Job application #${a.id}`, `${a.name} applied`, rows,
    button(`tel:+91${a.phone}`, 'Call applicant', '#1c4e89') + button(`https://wa.me/91${a.phone}`, 'WhatsApp applicant', '#1f7a4d'),
    `Sent from the Join our team page on relaxaircon.in.`,
  )
  return send(to, `Job application: ${a.name} (${a.role})`, html, plain([`Job application #${a.id}`], rows))
}

/** Alert to the owner about a commercial quote request. */
export async function emailQuote(q: { id: number; company: string; contact_name: string; phone: string; email: string | null; site_type: string | null; units: string | null; contract: string | null; details: string | null }) {
  const to = ownerRecipients()
  if (to.length === 0) return false
  const rows: Row[] = [['Company', q.company], ['Contact', q.contact_name], ['Phone', q.phone], ['Email', q.email], ['Site type', q.site_type], ['AC units', q.units], ['Contract', q.contract], ['Details', q.details]]
  const html = card(
    `Quote request #${q.id}`, q.company, rows,
    button(`tel:+91${q.phone}`, `Call ${esc(q.contact_name)}`, '#1c4e89') + button(`https://wa.me/91${q.phone}`, 'WhatsApp', '#1f7a4d') + (q.email ? button(`mailto:${q.email}`, 'Email', '#4b5966') : ''),
    `Commercial AC and AMC enquiry from relaxaircon.in.`,
  )
  return send(to, `Quote request: ${q.company}`, html, plain([`Quote request #${q.id}`], rows))
}
