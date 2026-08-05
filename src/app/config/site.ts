export const SITE = {
  name: 'Compare Business Healthcover',
  shortName: 'Compare Business Healthcover',
  domain: 'comparebusinesshealthcover.co.uk',
  url: 'https://comparebusinesshealthcover.co.uk',
  email: 'info@comparebusinesshealthcover.co.uk',
  noreply: 'noreply@comparebusinesshealthcover.co.uk',
  phone: '01484 773038',
  phoneDisplay: '01484 773038',
  twitterHandle: '@CompareBizHealth',
  defaultImage: 'https://comparebusinesshealthcover.co.uk/og-image.jpg',
  themeColor: '#252830',
  /** Internal lead notification — same broker inbox as sister site */
  leadNotifyEmail: 'matt@myhealthpal.co.uk',
} as const;

export function mailto(email = SITE.email) {
  return `mailto:${email}`;
}

export function emailFrom(displayName = SITE.name) {
  return `${displayName} <${SITE.noreply}>`;
}
