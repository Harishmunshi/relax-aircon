// Single source of truth for business details shown across the site and in structured data.

export const SITE_URL = 'https://www.relaxaircon.in'
export const BUSINESS_NAME = 'Relax Aircon'
export const OWNER = 'Azhar Munshi'
export const FOUNDED = 2020

export const PHONE_DISPLAY = '+91 70432 45355'
export const PHONE_TEL = '+917043245355'
export const WHATSAPP_NUMBER = '917043245355'

export function whatsappLink(message = 'Hi Relax Aircon, I need service in Vadodara') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const MAPS_LINK = 'https://www.google.com/maps/search/?api=1&query=Relax+Aircon+Vadodara'

export const HOURS = [
  { days: 'Monday to Saturday', time: '8:00 AM to 10:00 PM', schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '22:00' },
  { days: 'Sunday', time: '9:00 AM to 8:00 PM', schemaDays: ['Sunday'], opens: '09:00', closes: '20:00' },
] as const

export const AREAS = [
  'Alkapuri', 'Fatehgunj', 'Gotri', 'Manjalpur', 'Akota', 'Sayajigunj',
  'Vasna', 'Waghodia Road', 'Nizampura', 'Karelibaug', 'Subhanpura', 'Harni',
]

export const BRANDS = ['Daikin', 'Voltas', 'LG', 'Samsung', 'Blue Star', 'Hitachi', 'Lloyd', 'Carrier']

export type Service = {
  id: string
  name: string
  category: string
  description: string
  prices: [string, string][]
  /** Keyword landing page for this service */
  page: string
}

export const SERVICES: Service[] = [
  {
    id: 'ac',
    page: '/ac-service-vadodara',
    name: 'Split and window AC',
    category: 'Air conditioning',
    description: 'Installation, uninstallation, repair, gas refill, wet servicing and annual maintenance contracts for every major brand.',
    prices: [['Service', '₹350+'], ['Repair', '₹350+'], ['Installation', '₹1,200+'], ['Gas refill', '₹2,500+']],
  },
  {
    id: 'central-ac',
    page: '/central-ac-service-vadodara',
    name: 'Central and commercial AC',
    category: 'Commercial',
    description: 'Ducted, cassette and VRF systems for shops, offices and clinics. Installation, repair and scheduled maintenance.',
    prices: [['Service', '₹750+'], ['Repair', '₹500+'], ['Installation', '₹3,000+'], ['Gas refill', '₹4,000+']],
  },
  {
    id: 'fridge',
    page: '/refrigerator-repair-vadodara',
    name: 'Refrigerator',
    category: 'Refrigeration',
    description: 'Cooling problems, compressor and thermostat faults, gas refill and door seal replacement for single and double door models.',
    prices: [['Repair', '₹400+'], ['Gas refill', '₹2,500+']],
  },
  {
    id: 'washing-machine',
    page: '/washing-machine-repair-vadodara',
    name: 'Washing machine',
    category: 'Laundry',
    description: 'Front load and top load. Motor, drum, PCB, drain pump and inlet valve repairs, plus installation.',
    prices: [['Service', '₹299+'], ['Repair', '₹350+'], ['Installation', '₹499+']],
  },
  {
    id: 'deep-freezer',
    page: '/refrigerator-repair-vadodara',
    name: 'Deep freezer and water cooler',
    category: 'Commercial',
    description: 'Servicing and repair of commercial deep freezers and water coolers, with maintenance contracts available.',
    prices: [['Deep freezer', '₹500+'], ['Water cooler', '₹400+'], ['AMC', '₹2,000+']],
  },
  {
    id: 'emergency',
    page: '/fast-ac-repair-vadodara',
    name: 'Emergency repair',
    category: 'Any time',
    description: 'AC down in peak summer or a fridge full of food that stopped cooling. Call and we send the nearest technician.',
    prices: [['Typical arrival', 'Under 2 hrs'], ['Available', '24/7']],
  },
]

export const BOOKING_SERVICES = [
  'AC repair', 'AC service', 'AC installation', 'Gas refill', 'Annual AMC',
  'Central AC', 'Fridge repair', 'Washing machine', 'Deep freezer / cooler', 'Emergency repair',
]

/** Price for one row of a service, e.g. priceOf('ac', 'Gas refill') -> '₹2,500+'. */
export function priceOf(serviceId: string, label: string) {
  const row = SERVICES.find(s => s.id === serviceId)?.prices.find(([l]) => l === label)
  if (!row) throw new Error(`No price "${label}" for service "${serviceId}"`)
  return row[1]
}
