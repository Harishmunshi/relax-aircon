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

  {
    slug: 'fridge-not-cooling',
    title: 'Fridge Not Cooling? Causes and What to Check',
    description: 'Refrigerator not cooling or freezer not freezing? The common causes, quick checks you can do yourself, and when to call a technician in Vadodara.',
    h1: 'Fridge not cooling? Common causes and what to check',
    intro: 'A fridge that stops cooling can spoil food within hours. Some causes are simple and take two minutes to check; others need a technician. Here is how to tell the difference.',
    sections: [
      {
        heading: 'Check these first',
        list: [
          'Power: confirm the plug is firmly in and the socket works with another appliance.',
          'Thermostat dial: make sure it has not been turned to a low setting or off by accident.',
          'Door: check that nothing blocks it from closing and the rubber seal is not torn or dirty.',
          'Back and sides: leave a gap of a few inches so the fridge can release heat.',
          'Overloading: packed shelves block airflow. Remove some items and wait a few hours.',
        ],
      },
      {
        heading: 'Common causes when those checks are fine',
        list: [
          'Faulty thermostat or temperature sensor, so the compressor does not switch on when it should.',
          'Dirty condenser coils at the back or bottom, which stop the fridge from shedding heat.',
          'Ice blocking the vents because of a defrost problem, often seen as a thick frost layer at the back.',
          'Worn door gasket letting warm air in.',
          'Refrigerant gas leak. This needs a leak repair and gas filling.',
          'Compressor or start relay fault. The fridge hums or clicks but does not start cooling.',
        ],
      },
      {
        heading: 'When to call a technician',
        paragraphs: [
          'Call if the fridge still does not cool after the basic checks, if the compressor clicks without starting, or if there is a build-up of ice at the back. Move perishable food to another fridge or a cooler in the meantime. Our fridge repair in Vadodara starts from ₹400, and you are told the full price before any work.',
        ],
      },
    ],
    cta: { href: '/refrigerator-repair-vadodara', label: 'Book fridge repair in Vadodara' },
    services: ['refrigerator-repair-vadodara'],
    published: '2026-10-26',
  },
  {
    slug: 'washing-machine-not-draining',
    title: 'Washing Machine Not Draining or Spinning',
    description: 'Washing machine not draining water or not spinning? Common causes, what to check at home, and when a repair is needed in Vadodara.',
    h1: 'Washing machine not draining or spinning? What to check',
    intro: 'When a washing machine stops draining or spinning, clothes stay soaked and the door may not unlock. Many cases are a blockage you can clear yourself.',
    sections: [
      {
        heading: 'Check these first',
        list: [
          'Drain hose: make sure it is not kinked, bent behind the machine or pushed too deep into the drain.',
          'Pump filter: many front load machines have a small filter door at the bottom front. Clean out coins, hair and lint (keep a towel and tray ready for water).',
          'Load: an unbalanced or overloaded drum can stop the spin cycle. Redistribute the clothes.',
          'Door or lid: the machine will not spin if the lock is not engaged. Close it firmly.',
          'Power reset: switch off at the socket for a minute and restart the cycle.',
        ],
      },
      {
        heading: 'Common causes when it still does not work',
        list: [
          'Failed drain pump, often making a humming or grinding noise.',
          'Faulty lid switch or door lock.',
          'Worn drive belt or motor problem, so the drum does not turn.',
          'Control board (PCB) fault, sometimes with an error code on the display.',
          'Inlet valve fault if the machine is not filling with water.',
        ],
      },
      {
        heading: 'When to call a technician',
        paragraphs: [
          'Call if the pump filter is clear but water still does not leave, if the drum does not turn at all, or if the display shows an error code. Do not open the door while there is water inside. Our washing machine repair in Vadodara starts from ₹350, and you get the price before work begins.',
        ],
      },
    ],
    cta: { href: '/washing-machine-repair-vadodara', label: 'Book washing machine repair in Vadodara' },
    services: ['washing-machine-repair-vadodara'],
    published: '2026-10-26',
  },
  {
    slug: 'inverter-vs-non-inverter-ac',
    title: 'Inverter vs Non-Inverter AC: Which to Buy',
    description: 'Inverter or non-inverter AC? The difference in running cost, cooling and repair, and which suits a Vadodara home or shop.',
    h1: 'Inverter vs non-inverter AC: which should you buy?',
    intro: 'The difference is how the compressor runs. A non-inverter AC switches the compressor fully on and off. An inverter AC changes the compressor speed to hold the temperature, which saves electricity when it runs for long hours.',
    sections: [
      {
        heading: 'Quick comparison',
        list: [
          'Running cost: inverter ACs use less electricity when used for many hours a day.',
          'Purchase price: inverter models usually cost more upfront.',
          'Cooling: inverter ACs hold a steady temperature, while non-inverter units cycle on and off.',
          'Noise: inverter ACs are generally quieter once the room has cooled.',
          'Repairs: inverter boards (PCB) cost more to replace than the simpler controls in non-inverter units.',
        ],
      },
      {
        heading: 'Which one suits you',
        list: [
          'Bedrooms and offices used 8 or more hours a day: an inverter AC usually pays for itself in lower bills.',
          'Guest rooms or spaces used a few hours a week: a non-inverter AC can be the cheaper choice overall.',
          'Shops and clinics with long hours: inverter or cassette units, with a maintenance contract.',
        ],
      },
      {
        heading: 'Installation and service matter more than the type',
        paragraphs: [
          'A poorly installed inverter AC will cool badly and cost more to run than a well installed non-inverter one. Whichever you choose, have it fitted properly and serviced twice a year. We install and service both types in Vadodara.',
        ],
      },
    ],
    cta: { href: '/ac-installation-vadodara', label: 'AC installation in Vadodara' },
    services: ['ac-installation-vadodara', 'ac-repair-vadodara', 'ac-service-vadodara'],
    published: '2026-10-26',
  },
  {
    slug: 'ac-gas-leak-signs',
    title: 'AC Gas Leak: Signs, Causes and What to Do',
    description: 'How to tell if your AC has a gas leak: warning signs, why it happens, and why a leak must be fixed before refilling gas.',
    h1: 'AC gas leak: signs, causes and what to do',
    intro: 'An AC does not use up its refrigerant gas. If the level is low, there is a leak somewhere, and topping up without fixing it only buys a few weeks.',
    sections: [
      {
        heading: 'Signs of a gas leak',
        list: [
          'The AC runs but the air is not cold, or cooling gets weaker over weeks.',
          'Ice forms on the copper pipes or on the indoor coil.',
          'The outdoor unit runs constantly without cooling the room.',
          'A hissing or bubbling sound near the indoor unit or pipes.',
          'Oily residue at the pipe joints or flare connections.',
        ],
      },
      {
        heading: 'Where leaks usually happen',
        list: [
          'Flare nut joints where the copper pipe meets the indoor or outdoor unit, especially after installation or shifting.',
          'Pinholes in the copper coil from corrosion.',
          'Damaged pipes crushed or bent during fitting.',
          'Service valves on the outdoor unit.',
        ],
      },
      {
        heading: 'What to do',
        paragraphs: [
          'Switch the AC off and call a technician. A proper job finds the leak with a pressure test, repairs it, then fills the correct gas for your model. Our AC gas filling in Vadodara starts from ₹2,500 and always includes the leak check first.',
        ],
      },
    ],
    cta: { href: '/ac-gas-filling-vadodara', label: 'AC gas filling in Vadodara' },
    services: ['ac-gas-filling-vadodara', 'ac-repair-vadodara', 'fast-ac-repair-vadodara'],
    published: '2026-10-26',
  },
]

export const guideBySlug = (slug: string) => GUIDES.find(g => g.slug === slug)
