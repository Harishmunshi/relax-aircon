// Keyword landing pages. Each page targets one search intent ("ac gas filling vadodara", etc.).
// Keep claims in line with lib/site.ts: same-day visits, under 2 hr emergency arrival, 90 day warranty,
// price before work, all major brands.

export type Faq = { q: string; a: string }

export type LandingPage = {
  slug: string
  /** <title>, without the "| Relax Aircon" suffix */
  title: string
  description: string
  h1: string
  intro: string
  /** Name used in the Service schema */
  serviceName: string
  /** Rows for the price table */
  prices: [string, string][]
  includesTitle: string
  includes: string[]
  problemsTitle: string
  problems: string[]
  faqs: Faq[]
  /** Short label for links */
  label: string
  related: string[]
}

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: 'ac-service-vadodara',
    label: 'AC service',
    title: 'AC Service in Vadodara at Home, From ₹350',
    description:
      'AC service at home in Vadodara from ₹350. Split, window and inverter AC cleaning and cooling check. Same-day visits. Call +91 70432 45355.',
    h1: 'AC service in Vadodara',
    intro:
      'Regular AC servicing keeps your unit cooling properly, lowers your electricity bill and stops small faults becoming expensive repairs. We service split, window and inverter ACs at your home anywhere in Vadodara, usually on the same day you call.',
    serviceName: 'AC servicing',
    prices: [['Split AC service', '₹350+'], ['Window AC service', '₹350+'], ['Central / commercial AC service', '₹750+']],
    includesTitle: 'What an AC service includes',
    includes: [
      'Filter cleaning and indoor coil cleaning',
      'Outdoor unit check and cleaning',
      'Drain pipe check to stop water leakage',
      'Gas pressure and cooling performance check',
      'Electrical connections and remote check',
      'A clear report of anything that needs repair, with the price, before any extra work',
    ],
    problemsTitle: 'Book a service if your AC is',
    problems: ['Cooling less than before', 'Smelling musty when switched on', 'Dripping water indoors', 'Running loud or noisy', 'Not serviced for more than 6 months'],
    faqs: [
      { q: 'How often should I get my AC serviced in Vadodara?', a: 'At least twice a year: once before summer starts and once after the monsoon. Dust and humidity in Vadodara clog filters and coils quickly, so homes near main roads may need it more often.' },
      { q: 'How much does AC service cost in Vadodara?', a: 'Our AC service starts from ₹350 for a split or window AC. If the technician finds a fault, you are told the repair price first and nothing is done without your approval.' },
      { q: 'Do you service all brands?', a: 'Yes. Daikin, Voltas, LG, Samsung, Blue Star, Hitachi, Lloyd, Carrier and other major brands, including inverter models.' },
    ],
    related: ['ac-repair-vadodara', 'ac-gas-filling-vadodara', 'ac-amc-vadodara', 'premium-ac-service-vadodara'],
  },
  {
    slug: 'ac-repair-vadodara',
    label: 'AC repair',
    title: 'AC Repair in Vadodara, Same-Day, All Brands',
    description:
      'Same-day AC repair in Vadodara from ₹350. Not cooling, water leaking, error codes, inverter PCB. Price before work, 90 day warranty.',
    h1: 'AC repair in Vadodara',
    intro:
      'When your AC stops cooling in a Vadodara summer, you need it fixed today, not next week. Our technicians repair split, window, cassette and inverter ACs at your home, tell you the cost before starting, and back the repair with a 90 day warranty.',
    serviceName: 'AC repair',
    prices: [['AC repair (labour)', '₹350+'], ['Gas filling', '₹2,500+'], ['Central AC repair', '₹500+']],
    includesTitle: 'AC faults we fix',
    includes: [
      'AC not cooling or cooling slowly',
      'Water leaking from the indoor unit',
      'Compressor not starting or tripping',
      'PCB, sensor and capacitor faults',
      'Error codes and blinking lights on inverter ACs',
      'Fan motor, noise and vibration problems',
    ],
    problemsTitle: 'How the repair works',
    problems: ['We diagnose the fault at your home', 'You get the full price, parts included, before work starts', 'Most repairs are done on the spot', 'Repairs carry a 90 day warranty'],
    faqs: [
      { q: 'Why is my AC running but not cooling?', a: 'The most common causes are a dirty filter or coil, low gas from a leak, or a faulty capacitor or sensor. A technician can usually find the cause in one visit.' },
      { q: 'Can you repair my AC today?', a: 'For most areas of Vadodara we can visit the same day. For urgent breakdowns, call us and we send the nearest technician, typically in under 2 hours.' },
      { q: 'Do you repair inverter ACs?', a: 'Yes, including inverter PCB and error code faults on all major brands.' },
      { q: 'Is there a warranty on AC repair?', a: 'Yes, all our repairs carry a 90 day warranty.' },
    ],
    related: ['fast-ac-repair-vadodara', 'ac-gas-filling-vadodara', 'ac-service-vadodara', 'central-ac-service-vadodara'],
  },
  {
    slug: 'ac-gas-filling-vadodara',
    label: 'AC gas filling',
    title: 'AC Gas Filling in Vadodara, From ₹2,500',
    description:
      'AC gas filling in Vadodara from ₹2,500. Leak check and repair before refill. R22, R32 and R410A for split, window and inverter ACs.',
    h1: 'AC gas filling in Vadodara',
    intro:
      'If your AC blows air but does not cool, it may be low on refrigerant gas. We check for leaks first, fix them, and then fill the correct gas for your model, so you are not paying for a refill that leaks out again.',
    serviceName: 'AC gas filling',
    prices: [['Split / window AC gas filling', '₹2,500+'], ['Central / commercial AC gas filling', '₹4,000+']],
    includesTitle: 'How we do gas filling',
    includes: [
      'Pressure check to confirm the gas is actually low',
      'Leak detection on pipes, joints and coils',
      'Leak repair before refilling',
      'Filling the right refrigerant for your AC (R22, R32 or R410A)',
      'Cooling test after filling',
    ],
    problemsTitle: 'Signs your AC needs gas',
    problems: ['Air comes out but is not cold', 'Ice forming on the pipes or indoor coil', 'Outdoor unit runs but room stays warm', 'Hissing sound near the pipes'],
    faqs: [
      { q: 'How much does AC gas filling cost in Vadodara?', a: 'AC gas filling starts from ₹2,500 for split and window ACs. The final price depends on the gas type and whether a leak needs repair, and you are told before any work.' },
      { q: 'How often does an AC need gas?', a: 'A healthy AC should not need regular gas. If it needs gas again, there is a leak, and fixing that leak is part of our gas filling job.' },
      { q: 'Which gas does my AC use?', a: 'Older ACs mostly use R22. Newer and inverter models usually use R32 or R410A. The technician checks your model and uses the correct one.' },
    ],
    related: ['ac-repair-vadodara', 'ac-service-vadodara', 'fast-ac-repair-vadodara'],
  },
  {
    slug: 'ac-installation-vadodara',
    label: 'AC installation',
    title: 'AC Installation in Vadodara, From ₹1,200',
    description:
      'Split and window AC installation in Vadodara from ₹1,200. New AC fitting, uninstallation and shifting. All brands. Call +91 70432 45355.',
    h1: 'AC installation in Vadodara',
    intro:
      'A badly installed AC loses gas, leaks water and cools poorly from day one. We install new split and window ACs properly, and we also uninstall and reinstall ACs when you shift home or office in Vadodara.',
    serviceName: 'AC installation',
    prices: [['Split / window AC installation', '₹1,200+'], ['Central / cassette AC installation', '₹3,000+']],
    includesTitle: 'What installation includes',
    includes: [
      'Choosing the right spot for indoor and outdoor units',
      'Wall mounting and outdoor stand fitting',
      'Copper pipe, drain pipe and wiring connections',
      'Vacuum and leak test before starting',
      'Cooling test and a demo of the remote',
      'Uninstallation and reinstallation when you shift',
    ],
    problemsTitle: 'Good to know',
    problems: ['Extra copper pipe, stands and wiring are charged at cost and quoted first', 'We install all brands, including inverter models', 'Old AC removal can be done in the same visit'],
    faqs: [
      { q: 'What is the AC installation charge in Vadodara?', a: 'Split and window AC installation starts from ₹1,200. Extra pipe length or an outdoor stand is quoted before work starts.' },
      { q: 'Do you install ACs bought online?', a: 'Yes, we install ACs from any brand or store.' },
      { q: 'Can you move my AC to a new house?', a: 'Yes. We uninstall it, and reinstall it at your new home in Vadodara with a leak check.' },
    ],
    related: ['ac-service-vadodara', 'ac-gas-filling-vadodara', 'central-ac-service-vadodara'],
  },
  {
    slug: 'premium-ac-service-vadodara',
    label: 'Premium AC service',
    title: 'Premium AC Service in Vadodara, Same-Day',
    description:
      'Premium AC service in Vadodara: verified technicians, price before work, same-day visits and a 90 day warranty. Call +91 70432 45355.',
    h1: 'Premium AC service in Vadodara',
    intro:
      'Premium does not have to mean overpriced. It means a background-checked technician who arrives when promised, explains the problem in plain words, quotes the full price before starting, and stands behind the work. That is how Relax Aircon has served Vadodara since 2020.',
    serviceName: 'Premium AC service',
    prices: [['AC service', '₹350+'], ['AC repair', '₹350+'], ['Gas filling', '₹2,500+'], ['Annual maintenance (AMC)', '₹2,000+']],
    includesTitle: 'What makes the service premium',
    includes: [
      'Verified, trained technicians only',
      'Price confirmed before any work, no hidden charges',
      'Same-day visits across Vadodara',
      '90 day warranty on all repairs',
      'Direct line to the owner, Azhar Munshi, on call or WhatsApp',
      'All major brands, including inverter and premium models',
    ],
    problemsTitle: 'Ideal for',
    problems: ['Inverter and high-end split ACs', 'Homes with several AC units', 'Offices, clinics and shops that cannot afford downtime', 'Anyone tired of technicians who do not show up'],
    faqs: [
      { q: 'What is included in a premium AC service?', a: 'Full cleaning of the indoor and outdoor units, gas and cooling checks, electrical checks, and a clear report with prices for anything that needs fixing.' },
      { q: 'Do you service premium brands like Daikin and Hitachi?', a: 'Yes, we service all major brands including Daikin, Hitachi, Blue Star, LG, Samsung and Voltas inverter models.' },
      { q: 'Can I get a regular service plan?', a: 'Yes. Our annual maintenance contract (AMC) covers scheduled services through the year. See our AC AMC page.' },
    ],
    related: ['ac-amc-vadodara', 'ac-service-vadodara', 'central-ac-service-vadodara'],
  },
  {
    slug: 'fast-ac-repair-vadodara',
    label: 'Fast / emergency AC repair',
    title: 'Fast AC Repair in Vadodara, 24/7 Emergency',
    description:
      'AC broke down? Fast AC repair in Vadodara, same day and 24/7. A technician is typically with you in under 2 hours. Call +91 70432 45355.',
    h1: 'Fast AC repair in Vadodara, same day',
    intro:
      'In a Vadodara summer, an AC breakdown cannot wait. Call us and we send the nearest available technician, typically in under 2 hours. Emergency calls are taken 24 hours a day, 7 days a week.',
    serviceName: 'Emergency AC repair',
    prices: [['Typical arrival', 'Under 2 hrs'], ['Emergency calls', '24/7'], ['AC repair (labour)', '₹350+']],
    includesTitle: 'For the fastest visit',
    includes: [
      'Call +91 70432 45355 instead of booking online',
      'Tell us your area, AC brand and what is happening',
      'Send a photo or video of the error on WhatsApp if you can',
      'Keep the AC switched off if it is tripping or smells of burning',
    ],
    problemsTitle: 'Common emergencies',
    problems: ['AC completely stopped cooling', 'AC tripping the MCB or sparking', 'Heavy water leakage indoors', 'Burning smell from the unit', 'Commercial AC down in a shop or clinic'],
    faqs: [
      { q: 'How fast can a technician reach me?', a: 'Typically in under 2 hours within Vadodara, depending on your area and time of day.' },
      { q: 'Do you repair ACs at night?', a: 'Yes, emergency calls are taken 24/7. Call the number directly for night visits.' },
      { q: 'Is there an extra charge for emergency visits?', a: 'Any charge is told to you on the phone before the technician leaves.' },
    ],
    related: ['ac-repair-vadodara', 'ac-gas-filling-vadodara', 'central-ac-service-vadodara'],
  },
  {
    slug: 'ac-amc-vadodara',
    label: 'AC AMC',
    title: 'AC AMC in Vadodara, Annual Maintenance',
    description:
      'AC annual maintenance contract in Vadodara from ₹2,000. Scheduled servicing for homes, offices and shops. Call +91 70432 45355.',
    h1: 'AC annual maintenance contract (AMC) in Vadodara',
    intro:
      'An AMC takes AC care off your list. We service your units on a schedule through the year, so they keep cooling efficiently and faults are caught early. Ideal for homes with several ACs, offices, shops and clinics.',
    serviceName: 'AC annual maintenance contract',
    prices: [['AC AMC', '₹2,000+'], ['Deep freezer / cooler AMC', '₹2,000+']],
    includesTitle: 'What the AMC covers',
    includes: ['Scheduled services through the year', 'Cleaning of indoor and outdoor units', 'Cooling and gas pressure checks', 'Faults caught early, before a breakdown', 'One point of contact for all your units'],
    problemsTitle: 'Best for',
    problems: ['Homes with 2 or more ACs', 'Offices and shops', 'Clinics, labs and server rooms', 'Rental properties'],
    faqs: [
      { q: 'How many services are included in an AMC?', a: 'It depends on the plan and number of units. Call us with your unit count and we will suggest a schedule and price.' },
      { q: 'Does the AMC cover spare parts?', a: 'Parts are quoted separately unless your plan includes them. We will explain exactly what is covered before you sign up.' },
    ],
    related: ['premium-ac-service-vadodara', 'ac-service-vadodara', 'central-ac-service-vadodara'],
  },
  {
    slug: 'central-ac-service-vadodara',
    label: 'Central / commercial AC',
    title: 'Central and Commercial AC Service, Vadodara',
    description:
      'Central, cassette and VRF AC installation, repair and servicing in Vadodara for offices, shops and clinics. Service from ₹750.',
    h1: 'Central and commercial AC service in Vadodara',
    intro:
      'When a central or cassette AC fails at a shop, office or clinic, it costs you customers. We install, service and repair ducted, cassette and VRF systems across Vadodara, with maintenance contracts to keep them running.',
    serviceName: 'Central AC service',
    prices: [['Service', '₹750+'], ['Repair', '₹500+'], ['Installation', '₹3,000+'], ['Gas filling', '₹4,000+']],
    includesTitle: 'Systems we work on',
    includes: ['Cassette ACs', 'Ducted central ACs', 'VRF / VRV systems', 'Tower and floor-standing ACs', 'Multiple split units in offices'],
    problemsTitle: 'Who we work with',
    problems: ['Offices and co-working spaces', 'Shops and showrooms', 'Clinics and hospitals', 'Restaurants and banquet halls'],
    faqs: [
      { q: 'Do you offer maintenance contracts for offices?', a: 'Yes. See our AC AMC page or call us with the number and type of units.' },
      { q: 'Can you service outside business hours?', a: 'We work 7 days a week, including Sundays, and take emergency calls any time.' },
    ],
    related: ['ac-amc-vadodara', 'fast-ac-repair-vadodara', 'ac-installation-vadodara'],
  },
  {
    slug: 'refrigerator-repair-vadodara',
    label: 'Refrigerator repair',
    title: 'Refrigerator Repair in Vadodara, From ₹400',
    description:
      'Fridge repair at home in Vadodara from ₹400. Not cooling, compressor, thermostat, gas filling. Single and double door, all brands.',
    h1: 'Refrigerator repair in Vadodara',
    intro:
      'A fridge that stops cooling can spoil a week of groceries overnight. We repair single door, double door and side-by-side refrigerators at your home in Vadodara, usually on the same day.',
    serviceName: 'Refrigerator repair',
    prices: [['Fridge repair', '₹400+'], ['Fridge gas filling', '₹2,500+'], ['Deep freezer repair', '₹500+']],
    includesTitle: 'Fridge problems we fix',
    includes: ['Fridge not cooling or freezer not freezing', 'Compressor not starting', 'Thermostat and sensor faults', 'Gas leak and gas filling', 'Ice build-up and defrost problems', 'Door gasket replacement'],
    problemsTitle: 'Brands we repair',
    problems: ['LG', 'Samsung', 'Whirlpool', 'Godrej', 'Haier', 'Voltas and other brands'],
    faqs: [
      { q: 'Why is my fridge not cooling?', a: 'Common causes are a faulty thermostat, a defrost problem, a gas leak or a compressor fault. A technician can usually diagnose it in one visit.' },
      { q: 'How much does fridge repair cost in Vadodara?', a: 'Fridge repair starts from ₹400. Gas filling starts from ₹2,500. You get the full price before any work.' },
    ],
    related: ['washing-machine-repair-vadodara', 'ac-repair-vadodara'],
  },
  {
    slug: 'washing-machine-repair-vadodara',
    label: 'Washing machine repair',
    title: 'Washing Machine Repair in Vadodara, ₹350+',
    description:
      'Washing machine repair at home in Vadodara from ₹350. Front load and top load: not spinning, not draining, drum, motor and PCB faults.',
    h1: 'Washing machine repair in Vadodara',
    intro:
      'We repair fully automatic and semi automatic washing machines, front load and top load, at your home anywhere in Vadodara.',
    serviceName: 'Washing machine repair',
    prices: [['Washing machine service', '₹299+'], ['Washing machine repair', '₹350+'], ['Installation', '₹499+']],
    includesTitle: 'Problems we fix',
    includes: ['Not spinning or drum not turning', 'Water not draining or not filling', 'Loud noise or shaking', 'Door lock and error codes', 'Motor, PCB, drain pump and inlet valve faults'],
    problemsTitle: 'Brands we repair',
    problems: ['LG', 'Samsung', 'IFB', 'Whirlpool', 'Bosch', 'Godrej and other brands'],
    faqs: [
      { q: 'Do you repair front load washing machines?', a: 'Yes, both front load and top load, fully automatic and semi automatic.' },
      { q: 'How much does washing machine repair cost?', a: 'Repair starts from ₹350 and a general service from ₹299. Parts are quoted before work.' },
    ],
    related: ['refrigerator-repair-vadodara', 'ac-repair-vadodara'],
  },
]

export const landingBySlug = (slug: string) => LANDING_PAGES.find(p => p.slug === slug)
