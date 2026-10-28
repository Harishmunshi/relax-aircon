// Roles shown on the Join our team page. Edit here to change what the page and the form offer.

export type Role = { id: string; label: string; summary: string; skills: string[] }

export const ROLES: Role[] = [
  {
    id: 'ac-technician',
    label: 'AC technician',
    summary: 'Service, repair, gas filling and installation of split, window and inverter ACs at customers\' homes and offices in Vadodara.',
    skills: ['Experience with split and window ACs', 'Can diagnose cooling, leak and electrical faults', 'Own basic tools and a two-wheeler are a plus', 'Polite with customers and on time'],
  },
  {
    id: 'technician-helper',
    label: 'Technician helper',
    summary: 'Assists senior technicians on installations and servicing, and learns on the job. Freshers can apply.',
    skills: ['No experience needed, willingness to learn', 'Physically fit for ladder and outdoor-unit work', 'Honest, punctual and respectful'],
  },
  {
    id: 'fridge-washing-technician',
    label: 'Fridge and washing machine technician',
    summary: 'Repairs refrigerators, deep freezers and washing machines at customers\' homes.',
    skills: ['Experience with fridge or washing machine repair', 'Can diagnose compressor, thermostat, motor and PCB faults', 'Clear communication with customers'],
  },
]

export const ROLE_IDS = [...ROLES.map(r => r.id), 'other']
export const roleLabel = (id: string) => (id === 'other' ? 'Other' : ROLES.find(r => r.id === id)?.label ?? id)
