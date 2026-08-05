/**
 * Premium Healthcare palette — forest green + fresh green CTAs.
 * Logo uses forest/mint greens on the dark header (no white pill).
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
  /** Cache-busted filename so browsers/CDN pick up the new green mark */
  src: '/logo-v6.png',
  iconSrc: '/favicon-icon.png?v=2',
  businessHandshake: '/images/business-handshake-v2.jpg',
  heroOfficeTeam: '/images/hero-office-team-v4.png',
  width: 1336,
  height: 374,
} as const;
