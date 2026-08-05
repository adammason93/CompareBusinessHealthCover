/**
 * Site palette — warm charcoal + amber/gold.
 * Distinct from the sister site's blue-teal look; logo retains its own navy/teal.
 */
export const BRAND = {
  /** Nav, heroes, headings */
  navy: '#252830',
  navyDark: '#1A1D24',
  navyDeeper: '#14161B',
  navyStrip: '#2F3440',
  /** CTAs, links, accents */
  teal: '#D97706',
  tealHover: '#B45309',
  tealSoft: '#F59E0B',
  tealLight: '#FCD34D',
  tealMuted: '#FEF3C7',
  /** Soft page panels — warm stone */
  surface: '#F3F1ED',
  surfaceAlt: '#EAE6E0',
  heading: '#252830',
} as const;

export const LOGO = {
  src: '/logo.png',
  iconSrc: '/favicon-icon.png',
  businessHandshake: '/images/business-handshake.png',
  width: 1024,
  height: 342,
} as const;
