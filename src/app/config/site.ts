export const SITE = {
  name: 'Compare Business Healthcover',
  shortName: 'Compare Business Healthcover',
  domain: 'comparebusinesshealthcover.co.uk',
  url: 'https://comparebusinesshealthcover.co.uk',
  email: 'info@comparebusinesshealthcover.co.uk',
  /** Hide public info@ until the mailbox is set up — use contact form + phone instead */
  showPublicEmail: false,
  noreply: 'noreply@comparebusinesshealthcover.co.uk',
  phone: '01484 773038',
  phoneDisplay: '01484 773038',
  twitterHandle: '@CompareBizHealth',
  defaultImage: 'https://comparebusinesshealthcover.co.uk/og-image.jpg',
  themeColor: '#1E5E4A',
  /** Internal lead notification — same broker inbox as sister site */
  leadNotifyEmail: 'matt@myhealthpal.co.uk',
} as const;

export function mailto(email = SITE.email) {
  return `mailto:${email}`;
}

export function emailFrom(displayName = SITE.name) {
  return `${displayName} <${SITE.noreply}>`;
}
