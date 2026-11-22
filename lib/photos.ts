// Work photos in /public/photos. Alt text describes what the picture shows.

export type Photo = { id: string; alt: string; caption: string }

export const PHOTOS: Record<string, Photo> = {
  'ac-coil-jet-wash': { id: 'ac-coil-jet-wash', alt: 'Technician jet-washing an AC indoor coil with a protective cover and drain hose', caption: 'Jet-wash coil cleaning with a protective cover' },
  'ac-filter-washing': { id: 'ac-filter-washing', alt: 'AC air filters being rinsed under a tap', caption: 'Washing the AC filters' },
  'ac-wet-service-cleaning': { id: 'ac-wet-service-cleaning', alt: 'Technician cleaning an AC coil during a wet service, with the water draining into a bucket', caption: 'Wet service at the customer\'s home' },
  'ac-indoor-unit-opened': { id: 'ac-indoor-unit-opened', alt: 'Technician on a ladder opening the front panel of a wall-mounted AC', caption: 'Opening the indoor unit for inspection' },
  'ac-gas-pressure-check': { id: 'ac-gas-pressure-check', alt: 'Technician checking AC gas pressure with a manifold gauge connected to the outdoor unit', caption: 'Checking gas pressure with a manifold gauge' },
  'ac-outdoor-unit': { id: 'ac-outdoor-unit', alt: 'Split AC outdoor unit mounted on a wall bracket with insulated piping', caption: 'Outdoor unit on a wall bracket' },
  'ac-cooling-after-service': { id: 'ac-cooling-after-service', alt: 'A split AC running at 24 degrees with the remote in hand after service', caption: 'Cooling again after service' },
  'drain-pipe-before-after': { id: 'drain-pipe-before-after', alt: 'AC drain pipe before cleaning, blocked with dirt, and after cleaning, clear', caption: 'Drain pipe before and after cleaning' },
  'tools-and-equipment': { id: 'tools-and-equipment', alt: 'Toolbox, vacuum pump, gas gauges, multimeter and hand tools laid out on a floor', caption: 'Our tools: vacuum pump, gauges and multimeter' },
  'fridge-compressor-check': { id: 'fridge-compressor-check', alt: 'Technician testing a refrigerator compressor with a multimeter', caption: 'Testing a fridge compressor' },
  'washing-machine-repair': { id: 'washing-machine-repair', alt: 'Technician repairing the motor area of a top-load washing machine', caption: 'Washing machine repair' },
}

/** Six photos for the homepage gallery. */
export const HOME_GALLERY = [
  'ac-coil-jet-wash', 'ac-filter-washing', 'drain-pipe-before-after',
  'ac-gas-pressure-check', 'fridge-compressor-check', 'washing-machine-repair',
]

/** Photos shown on each service page, by page slug. */
export const PAGE_PHOTOS: Record<string, string[]> = {
  'ac-service-vadodara': ['ac-coil-jet-wash', 'ac-filter-washing'],
  'premium-ac-service-vadodara': ['ac-wet-service-cleaning', 'ac-indoor-unit-opened'],
  'ac-repair-vadodara': ['ac-indoor-unit-opened', 'tools-and-equipment'],
  'ac-gas-filling-vadodara': ['ac-gas-pressure-check', 'tools-and-equipment'],
  'ac-installation-vadodara': ['ac-outdoor-unit', 'ac-cooling-after-service'],
  'fast-ac-repair-vadodara': ['ac-gas-pressure-check', 'ac-indoor-unit-opened'],
  'ac-amc-vadodara': ['drain-pipe-before-after', 'ac-filter-washing'],
  'refrigerator-repair-vadodara': ['fridge-compressor-check'],
  'washing-machine-repair-vadodara': ['washing-machine-repair'],
}
