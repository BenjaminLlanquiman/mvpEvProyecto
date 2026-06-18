import type { SVGProps } from 'react'

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconGauge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 18a8.5 8.5 0 1 1 17 0" />
      <path d="M12 14 16 10" />
      <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconUsers(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 20c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6" />
      <circle cx="17" cy="8.5" r="2.5" />
      <path d="M15.5 20c0-2.6 1.9-4.8 4.5-5.6" />
    </svg>
  )
}

export function IconLayoutGrid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="5" height="18" rx="1.5" />
      <rect x="9.5" y="3" width="5" height="12" rx="1.5" />
      <rect x="16" y="3" width="5" height="8" rx="1.5" />
    </svg>
  )
}

export function IconPulse(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h4l2 8 4-16 2 8h6" />
    </svg>
  )
}

export function IconTrendUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 17 9 11 13 15 21 7" />
      <path d="M21 7h-5" />
      <path d="M21 7v5" />
    </svg>
  )
}

export function IconWallet(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="17" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconAlertTriangle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 9v5" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconHeart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-4.4-9.5-9C.7 8.4 2.7 4 7 4c2.1 0 3.7 1.2 5 3 1.3-1.8 2.9-3 5-3 4.3 0 6.3 4.4 4.5 8-2.5 4.6-9.5 9-9.5 9z" />
    </svg>
  )
}

export function IconBank(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 10 12 4l9 6" />
      <path d="M5 10v9" />
      <path d="M9 10v9" />
      <path d="M15 10v9" />
      <path d="M19 10v9" />
      <path d="M3 21h18" />
    </svg>
  )
}

export function IconCap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M6 11.5V17c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-5.5" />
    </svg>
  )
}