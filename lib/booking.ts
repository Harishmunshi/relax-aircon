// Shared booking rules, used by the form (browser) and the API routes (server).

export const SLOTS = [
  { id: '9-11', label: '9 AM to 11 AM', startHour: 9 },
  { id: '11-13', label: '11 AM to 1 PM', startHour: 11 },
  { id: '13-15', label: '1 PM to 3 PM', startHour: 13 },
  { id: '15-17', label: '3 PM to 5 PM', startHour: 15 },
  { id: '17-19', label: '5 PM to 7 PM', startHour: 17 },
  { id: '19-21', label: '7 PM to 9 PM', startHour: 19 },
] as const

export type SlotId = (typeof SLOTS)[number]['id']
export const SLOT_IDS: string[] = SLOTS.map(s => s.id)
export const slotLabel = (id: string) => SLOTS.find(s => s.id === id)?.label ?? id

/** How many days ahead customers can book. */
export const MAX_DAYS_AHEAD = 45

/** Current date and hour in India (the business runs on IST regardless of server timezone). */
export function nowIST() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (t: string) => parts.find(p => p.type === t)!.value
  return { date: `${get('year')}-${get('month')}-${get('day')}`, hour: Number(get('hour')) }
}

export function addDays(date: string, days: number) {
  const d = new Date(`${date}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

export const isDateString = (v: unknown): v is string =>
  typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(`${v}T00:00:00Z`))

/** True when the slot can still be booked: not in the past and within the booking window. */
export function slotBookable(date: string, slotId: string) {
  const slot = SLOTS.find(s => s.id === slotId)
  if (!slot) return false
  const now = nowIST()
  if (date < now.date || date > addDays(now.date, MAX_DAYS_AHEAD)) return false
  if (date === now.date && slot.startHour <= now.hour) return false
  return true
}

export const normalizePhone = (v: string) => v.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
export const validPhone = (v: string) => /^[6-9]\d{9}$/.test(normalizePhone(v))
