/**
 * Premium Healthcare palette — forest green + fresh green CTAs.
 * Logo retains its own navy/teal on the white nav pill.
 */
export const BRAND = {
  /** Primary — nav, heroes */
  navy: '#1E5E4A',
  navyDark: '#174A3A',
  navyDeeper: '#123528',
  navyStrip: '#1A5240',
  /** CTA — fresh green */
  teal: '#48C774',
  tealHover: '#3DB866',
  /** Secondary — emerald */
  tealSoft: '#3FAF78',
  /** Accent — sage */
  tealLight: '#9DC8B3',
  tealMuted: '#E8F2ED',
  /** Panels */
  surface: '#F4F8F6',
  surfaceAlt: '#EBF3EF',
  heading: '#2D2D2D',
} as const;

export const LOGO = {
  src: '/logo.png',
  iconSrc: '/favicon-icon.png',
  businessHandshake: '/images/business-handshake.png',
  width: 1024,
  height: 342,
} as const;
