// Relax Aircon logo: an "RA" monogram with a cool-air line underneath. Shared by the icon routes.
export default function Logo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#1c4e89" />
      <path
        d="M10 46V15H20a8 8 0 0 1 0 16H10M20 31L29 46M37.5 46L46 15L54.5 46M40.5 36H51.5"
        stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M12 55H52" stroke="#8ec5ff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
