// Help articles that answer common AC questions people search for. Each one links to the matching service page.

export type GuideSection = { heading: string; paragraphs?: string[]; list?: string[] }

export type Guide = {
  slug: string
  title: string
  description: string
  h1: string
  intro: string
  sections: GuideSection[]
  /** Service page this guide sends readers to */
  cta: { href: string; label: string }
  /** Slugs from lib/landing.ts */
  services: string[]
  published: string
}

export const GUIDES: Guide[] = [
  {
    slug: 'ac-not-cooling',
    title: 'AC Not Cooling? 8 Causes and Fixes',
    description: 'AC running but not cooling? The 8 most common causes, what you can check yourself in 5 minutes, and when to call a technician in Vadodara.',
    h1: 'AC not cooling? 8 common causes and what to do',
    intro: 'An AC that runs but does not cool is the most common call we get in Vadodara summers. Before you book a visit, a few quick checks can save you time, and the list below helps you explain the problem to a technician.',
    sections: [
      {
        heading: 'Check these yourself first',
        list: [
          'Remote mode: make sure it is on Cool (snowflake icon), not Fan, Dry or Auto.',
          'Temperature: set it to 24°C. Very low settings like 16°C do not cool faster.',
          'Filters: open the front panel and look at the mesh filters. If they are grey with dust, wash them in plain water, dry and refit.',
          'Outdoor unit: check it is running and not blocked by boxes, plants or a cover.',
          'Doors and windows: an AC sized for a bedroom cannot cool an open hall.',
        ],
      },
      {
        heading: 'The 8 most common causes',
        list: [
          'Dirty filters and indoor coil, which block airflow. Fixed by an AC service.',
          'Low refrigerant gas from a leak. Needs leak repair and gas filling.',
          'Dirty outdoor condenser coil, common near roads and construction in Vadodara.',
          'Faulty capacitor, so the compressor or outdoor fan does not start.',
          'Compressor problem, usually after years without service or after voltage fluctuations.',
          'PCB or sensor fault, especially on inverter ACs. Often shows an error code.',
          'Blocked drain causing ice on the coil, which stops cooling.',
          'AC too small for the room. A 1 ton AC struggles in a large or top-floor room.',
        ],
      },
      {
        heading: 'When to call a technician',
        paragraphs: [
          'Call if the filters are clean and the AC still blows warm air, if you see ice on the pipes, if the outdoor unit is silent, or if the display shows an error code. Switch the AC off if it trips the MCB or smells of burning.',
          'Most cooling problems in Vadodara are fixed in one visit. Our AC repair starts from ₹350 and gas filling from ₹2,500, and you are told the price before any work.',
        ],
      },
    ],
    cta: { href: '/ac-repair-vadodara', label: 'Book AC repair in Vadodara' },
    services: ['ac-repair-vadodara', 'ac-gas-filling-vadodara', 'fast-ac-repair-vadodara', 'ac-service-vadodara'],
    published: '2026-10-25',
  },
  {
    slug: 'ac-water-leaking',
    title: 'AC Water Leaking Indoors? Causes and Fixes',
    description: 'Water dripping from your split AC indoor unit? Why it happens, what you can do right away, and how a technician fixes it for good.',
    h1: 'Why is my AC leaking water inside the room?',
    intro: 'A split AC removes moisture from the air and drains it outside through a pipe. When water drips from the indoor unit instead, something in that drain path has gone wrong. It is usually simple to fix, but leaving it can damage walls and furniture.',
    sections: [
      {
        heading: 'Common causes',
        list: [
          'Blocked drain pipe from dust, algae or insects. The most common cause after the monsoon.',
          'Dirty filters, which make the coil freeze and then drip when the ice melts.',
          'Indoor unit not level, so water runs out of the tray instead of into the pipe.',
          'Drain pipe bent, crushed or sloping upwards after painting or wall work.',
          'Low gas, which can also freeze the coil and cause dripping.',
        ],
      },
      {
        heading: 'What to do right now',
        list: [
          'Switch the AC off and place a towel or bucket under the unit.',
          'Check the outdoor end of the drain pipe. If no water comes out while the AC runs, it is blocked.',
          'Clean the filters if they are dusty.',
          'Do not keep running the AC with a heavy leak near switches or wiring.',
        ],
      },
      {
        heading: 'How a technician fixes it',
        paragraphs: [
          'A technician flushes and clears the drain line, cleans the coil and tray, checks the unit is level and checks gas pressure. A regular AC service before summer and after the monsoon prevents most leaks.',
        ],
      },
    ],
    cta: { href: '/ac-service-vadodara', label: 'Book an AC service in Vadodara' },
    services: ['ac-service-vadodara', 'ac-repair-vadodara', 'fast-ac-repair-vadodara'],
    published: '2026-10-25',
  },
  {
    slug: 'ac-service-cost-vadodara',
    title: 'AC Service and Repair Cost in Vadodara (2026)',
    description: 'AC service, repair, gas filling and installation costs in Vadodara for 2026: starting prices, what changes the bill, and how to avoid overpaying.',
    h1: 'AC service and repair cost in Vadodara (2026 price guide)',
    intro: 'AC prices in Vadodara vary a lot between technicians, and a low headline price can grow once work starts. This guide lists our starting rates and explains what actually changes the final bill.',
    sections: [
      {
        heading: 'Starting prices at Relax Aircon',
        list: [
          'AC service (split or window): from ₹350',
          'AC repair, labour: from ₹350',
          'AC gas filling: from ₹2,500',
          'AC installation: from ₹1,200',
          'Central or commercial AC service: from ₹750',
          'AC annual maintenance contract: from ₹2,000',
        ],
      },
      {
        heading: 'What changes the final price',
        list: [
          'Gas type and amount: R22, R32 and R410A cost differently, and a full refill costs more than a top-up.',
          'Leak repair: a leak has to be fixed before gas filling, or the new gas escapes again.',
          'Spare parts: capacitors, sensors, PCBs, fan motors and compressors are charged separately.',
          'Installation extras: longer copper pipe, an outdoor stand or extra wiring.',
          'AC type: inverter, cassette and central systems take more time than a standard split AC.',
        ],
      },
      {
        heading: 'How to avoid overpaying',
        list: [
          'Ask for the full price, parts included, before the technician starts.',
          'Ask whether gas is really low. A pressure reading should be checked, not guessed.',
          'Ask for the old part back when something is replaced.',
          'Get a warranty on the repair. Ours is 90 days on all repairs.',
        ],
      },
    ],
    cta: { href: '/services', label: 'See all services and prices' },
    services: ['ac-service-vadodara', 'ac-repair-vadodara', 'ac-gas-filling-vadodara', 'ac-installation-vadodara', 'ac-amc-vadodara'],
    published: '2026-10-25',
  },
  {
    slug: 'how-often-service-ac',
    title: 'How Often to Service Your AC in Vadodara',
    description: 'How many times a year an AC needs servicing in Vadodara heat and dust, the best months to book, and signs your AC needs a service now.',
    h1: 'How often should you service your AC in Vadodara?',
    intro: 'Vadodara has long, hot summers, dusty roads and a humid monsoon. All three are hard on air conditioners, so the general "once a year" advice is usually not enough here.',
    sections: [
      {
        heading: 'Our recommendation',
        list: [
          'Homes: twice a year, once in February or March before summer and once in October after the monsoon.',
          'Homes near main roads or construction: every 3 to 4 months, because filters clog faster.',
          'Shops, offices and clinics running ACs all day: every 3 months, ideally on an AMC.',
          'Clean the filters yourself every 2 weeks in summer.',
        ],
      },
      {
        heading: 'Signs your AC needs a service now',
        list: [
          'It takes longer to cool the room than it used to',
          'Your electricity bill has gone up',
          'A musty smell when it starts',
          'Water dripping from the indoor unit',
          'More noise than usual',
        ],
      },
      {
        heading: 'Why regular servicing pays off',
        paragraphs: [
          'A clean AC cools faster and uses less power. Servicing also catches small problems early, like a weak capacitor or a slow gas leak, before they turn into a compressor failure in the middle of May.',
          'If you have several ACs or run a business, an annual maintenance contract handles the schedule for you.',
        ],
      },
    ],
    cta: { href: '/ac-amc-vadodara', label: 'See AC AMC plans in Vadodara' },
    services: ['ac-service-vadodara', 'ac-amc-vadodara', 'premium-ac-service-vadodara', 'central-ac-service-vadodara'],
    published: '2026-10-25',
  },
]

export const guideBySlug = (slug: string) => GUIDES.find(g => g.slug === slug)
