import { SITE } from './site';

export const SEO_CONFIG = {
  siteName: SITE.name,
  siteUrl: SITE.url,
  defaultImage: SITE.defaultImage,
  twitterHandle: SITE.twitterHandle,

  pages: {
    home: {
      title: 'Compare SME Business Health Insurance UK',
      description:
        'Compare business health insurance for UK SMEs and small companies. Employee medical cover from FCA-regulated brokers. Free quotes for teams from 2 employees.',
      keywords:
        'SME health insurance UK, business health insurance, small company medical cover, employee health benefits, compare business health cover',
    },

    'health-insurance-guide': {
      title: 'Business Health Insurance Guide for UK SMEs',
      description:
        'Guide to business health insurance for UK SMEs. Learn about employee cover options, costs, tax benefits, and how to choose the right plan for your team.',
      keywords:
        'SME health insurance guide, business medical insurance UK, employee health cover explained, company PMI guide',
    },

    'business-health-insurance': {
      title: 'Business Health Insurance for UK Companies',
      description:
        'Compare business health insurance for UK companies. Protect your team with private medical cover from FCA-regulated providers. Get competitive SME quotes today.',
      keywords:
        'business health insurance UK, company medical insurance, SME health cover, corporate health insurance',
    },

    'family-health-insurance': {
      title: 'Group & Family Business Health Options',
      description:
        'Health cover options for business owners extending benefits to directors and families. Compare plans suited to small UK businesses.',
      keywords: 'director health insurance, business owner medical cover, SME family health benefits',
    },

    'self-employed-health-insurance': {
      title: 'Health Insurance for Self-Employed & Sole Traders',
      description:
        'Health insurance for self-employed professionals and sole traders in the UK. Flexible business-friendly plans with tax considerations.',
      keywords: 'self employed health insurance UK, sole trader medical insurance, freelancer health cover',
    },

    'senior-health-insurance': {
      title: 'Health Cover for Mature Employees',
      description:
        'Business health insurance options for teams including mature employees. Compare SME plans with flexible age criteria.',
      keywords: 'employee health insurance over 50, mature workforce medical cover UK',
    },

    'international-health-insurance': {
      title: 'International Business Health Insurance',
      description:
        'Global health insurance for UK businesses with international staff or overseas operations. Worldwide medical cover for your team.',
      keywords: 'international business health insurance, expat employee medical cover UK',
    },

    'corporate-health-insurance': {
      title: 'Corporate Health Insurance UK',
      description:
        'Enterprise health insurance for larger UK businesses. Comprehensive employee medical benefits to attract and retain talent.',
      keywords: 'corporate health insurance UK, large company medical benefits, enterprise employee health cover',
    },

    'small-company-health-insurance': {
      title: 'Small Company Health Insurance UK',
      description:
        'Affordable health insurance for small businesses and SMEs in the UK. Flexible plans starting from 2 employees. Compare quotes from top providers.',
      keywords:
        'small company health insurance, SME medical cover UK, small business health benefits, startup health insurance',
    },

    'insurance-types': {
      title: 'Types of Business Health Insurance UK',
      description:
        'Explore business health insurance options for UK SMEs — from small team cover to corporate schemes. Find the right employee benefit for your company.',
      keywords: 'types of business health insurance UK, SME PMI options, employee medical cover categories',
    },

    'partner-insurers': {
      title: 'Our Partner Business Insurers',
      description:
        "Work with the UK's leading business health insurance providers. All broker partners are FCA-regulated for your protection.",
      keywords: 'UK business health insurance providers, FCA regulated insurance brokers, SME medical insurers',
    },

    'about-us': {
      title: `About ${SITE.name}`,
      description: `${SITE.name} helps UK SMEs compare business health insurance from FCA-regulated brokers. We simplify employee medical cover comparison so you can find the right plan for your team.`,
      keywords: 'about compare business health cover, UK SME insurance comparison, business health insurance brokers',
    },

    'contact-us': {
      title: 'Contact Us',
      description: `Get in touch with ${SITE.name}. Our team helps UK businesses find the right employee health insurance. Call us or fill out our contact form.`,
      keywords: 'contact business health insurance, SME health cover enquiries UK',
    },

    'privacy-policy': {
      title: 'Privacy Policy',
      description: 'Our commitment to protecting your personal data. Read our GDPR-compliant privacy policy.',
      keywords: 'privacy policy, GDPR compliance, data protection UK',
      noindex: true,
    },

    'terms-conditions': {
      title: 'Terms & Conditions',
      description: `Terms and conditions for using ${SITE.name}. Read our service terms, disclaimers, and legal information.`,
      keywords: 'terms and conditions, service terms, legal disclaimer UK',
      noindex: true,
    },

    'cookie-policy': {
      title: 'Cookie Policy',
      description: `Learn how ${SITE.name} uses cookies. Manage your cookie preferences anytime.`,
      keywords: 'cookie policy UK, cookie consent, website cookies',
      noindex: true,
    },

    disclaimer: {
      title: 'Disclaimer',
      description:
        'Important disclaimer about our business health insurance comparison services. We connect you with FCA-regulated brokers.',
      keywords: 'insurance disclaimer, FCA compliance, broker services disclaimer',
      noindex: true,
    },

    sitemap: {
      title: 'Sitemap',
      description: `Complete sitemap of ${SITE.name}. Browse all business health insurance guides and resources.`,
      keywords: 'site map, SME health insurance pages UK',
    },
  },
};

export function getSEOConfig(page: string) {
  return SEO_CONFIG.pages[page as keyof typeof SEO_CONFIG.pages] || SEO_CONFIG.pages.home;
}
