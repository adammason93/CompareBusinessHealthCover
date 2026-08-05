/**
 * Site palette — charcoal + burgundy (corporate B2B).
 * Distinct from the sister site's blue-teal look; logo retains its own navy/teal.
 */
export const BRAND = {
  /** Nav, heroes, headings */
  navy: '#252830',
  navyDark: '#1A1D24',
  navyDeeper: '#14161B',
  navyStrip: '#2F3440',
  /** CTAs, links, accents — softened wine burgundy */
  teal: '#A04D5E',
  tealHover: '#854052',
  tealSoft: '#B86B7A',
  tealLight: '#E0B8BE',
  tealMuted: '#FAF2F4',
  /** Soft page panels — warm stone with a blush tint */
  surface: '#F4F0F1',
  surfaceAlt: '#EBE4E6',
  heading: '#252830',
} as const;

export const LOGO = {
  src: '/logo.png',
  iconSrc: '/favicon-icon.png',
  businessHandshake: '/images/business-handshake.png',
  width: 1024,
  height: 342,
} as const;
