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
  teal: '#157A3C',
  tealHover: '#116332',
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
  src: '/logo-v6.webp',
  srcPng: '/logo-v6.png',
  srcSetWebp: '/logo-v6-400.webp 400w, /logo-v6-800.webp 800w, /logo-v6-1336.webp 1336w',
  iconSrc: '/favicon-icon.png?v=3',
  businessHandshake: '/images/business-handshake-v2-1200.jpg',
  businessHandshakeWebp:
    '/images/business-handshake-v2-800.webp 800w, /images/business-handshake-v2-1200.webp 1200w, /images/business-handshake-v2-1600.webp 1600w',
  heroOfficeTeam: '/images/hero-office-team-v4-1200.jpg',
  heroOfficeTeamWebp:
    '/images/hero-office-team-v4-800.webp 800w, /images/hero-office-team-v4-1200.webp 1200w, /images/hero-office-team-v4-1600.webp 1600w, /images/hero-office-team-v4-1983.webp 1983w',
  heroOfficeTeamAvif:
    '/images/hero-office-team-v4-800.avif 800w, /images/hero-office-team-v4-1200.avif 1200w, /images/hero-office-team-v4-1600.avif 1600w',
  heroPreload: '/images/hero-office-team-v4-800.webp',
  width: 1336,
  height: 374,
} as const;
