export const SEO_CONFIG = {
  siteName: 'HealthCoverCompare',
  siteUrl: 'https://healthcovercomparison.co.uk',
  defaultImage: 'https://healthcovercomparison.co.uk/og-image.jpg',
  twitterHandle: '@HealthCoverUK',
  
  pages: {
    home: {
      title: 'Compare Health Insurance Quotes UK',
      description: 'Find the best health insurance deals in the UK. Compare quotes from leading providers for family, business, and individual health cover. FCA-regulated broker partners.',
      keywords: 'health insurance UK, private health insurance, compare health insurance, medical insurance quotes, UK health cover, family health insurance',
    },
    
    'health-insurance-guide': {
      title: 'UK Health Insurance Guide 2026',
      description: 'Complete guide to private health insurance in the UK. Learn about coverage options, costs, benefits, and how to choose the right plan for your needs.',
      keywords: 'health insurance guide UK, private medical insurance guide, PMI explained, health cover options UK',
    },
    
    'business-health-insurance': {
      title: 'Business Health Insurance UK',
      description: 'Comprehensive business health insurance for UK companies. Protect your team with private medical cover from FCA-regulated providers. Get competitive quotes today.',
      keywords: 'business health insurance, company medical insurance, SME health cover, corporate health insurance UK',
    },
    
    'family-health-insurance': {
      title: 'Family Health Insurance UK',
      description: 'Affordable family health insurance plans in the UK. Comprehensive medical cover for your loved ones from trusted providers. Compare quotes and save.',
      keywords: 'family health insurance UK, private family medical cover, children health insurance, family PMI',
    },
    
    'self-employed-health-insurance': {
      title: 'Self-Employed Health Insurance UK',
      description: 'Health insurance for self-employed professionals in the UK. Flexible plans, tax benefits, and comprehensive medical cover. Get instant quotes.',
      keywords: 'self employed health insurance, freelancer medical insurance, sole trader health cover UK',
    },
    
    'senior-health-insurance': {
      title: 'Senior Health Insurance UK',
      description: 'Specialized health insurance for seniors and over 65s in the UK. Comprehensive medical cover with no age limits from leading providers.',
      keywords: 'senior health insurance UK, over 65 medical insurance, elderly health cover, pensioner health insurance',
    },
    
    'international-health-insurance': {
      title: 'International Health Insurance UK',
      description: 'Global health insurance for UK expats and international travelers. Worldwide medical cover with emergency repatriation. Compare quotes now.',
      keywords: 'international health insurance, expat medical cover UK, global health insurance, worldwide PMI',
    },
    
    'corporate-health-insurance': {
      title: 'Corporate Health Insurance UK',
      description: 'Enterprise health insurance solutions for large UK corporations. Attract and retain top talent with comprehensive employee medical benefits.',
      keywords: 'corporate health insurance, large company medical benefits, employee health cover, enterprise PMI UK',
    },
    
    'small-company-health-insurance': {
      title: 'Small Company Health Insurance UK',
      description: 'Affordable health insurance for small businesses and SMEs in the UK. Flexible plans starting from 2 employees. Compare quotes from top providers.',
      keywords: 'small company health insurance, SME medical cover UK, small business health benefits, startup health insurance',
    },
    
    'insurance-types': {
      title: 'Types of Health Insurance UK',
      description: 'Explore all types of health insurance available in the UK. From family plans to business cover, understand your options and find the right fit.',
      keywords: 'types of health insurance UK, PMI types, medical insurance options, health cover categories',
    },
    
    'partner-insurers': {
      title: 'Our Partner Insurance Providers',
      description: 'Work with the UK\'s leading health insurance providers. All our broker partners are FCA-regulated for your protection and peace of mind.',
      keywords: 'UK health insurance providers, FCA regulated insurance brokers, medical insurance companies UK',
    },
    
    'about-us': {
      title: 'About HealthCoverCompare',
      description: 'HealthCoverCompare connects UK customers with FCA-regulated insurance brokers. Our mission is to simplify health insurance comparison and help you find the best cover.',
      keywords: 'about healthcovercompare, UK insurance comparison, FCA regulated brokers, health insurance lead generation',
    },
    
    'contact-us': {
      title: 'Contact Us',
      description: 'Get in touch with HealthCoverCompare. Our team is here to help you find the right health insurance solution. Call us or fill out our contact form.',
      keywords: 'contact healthcovercompare, health insurance enquiries UK, insurance broker contact',
    },
    
    'privacy-policy': {
      title: 'Privacy Policy',
      description: 'Our commitment to protecting your personal data. Read our GDPR-compliant privacy policy and learn how we handle your information.',
      keywords: 'privacy policy, GDPR compliance, data protection UK, cookie policy',
      noindex: true,
    },
    
    'terms-conditions': {
      title: 'Terms & Conditions',
      description: 'Terms and conditions for using HealthCoverCompare. Read our service terms, disclaimers, and legal information.',
      keywords: 'terms and conditions, service terms, legal disclaimer UK',
      noindex: true,
    },
    
    'cookie-policy': {
      title: 'Cookie Policy',
      description: 'Learn how HealthCoverCompare uses cookies to improve your browsing experience. Manage your cookie preferences anytime.',
      keywords: 'cookie policy UK, cookie consent, website cookies, tracking preferences',
      noindex: true,
    },
    
    'disclaimer': {
      title: 'Disclaimer',
      description: 'Important disclaimer about our health insurance comparison services. We connect you with FCA-regulated brokers who provide professional advice.',
      keywords: 'insurance disclaimer, FCA compliance, broker services disclaimer',
      noindex: true,
    },
    
    'sitemap': {
      title: 'Sitemap',
      description: 'Complete sitemap of HealthCoverCompare. Browse all our health insurance guides, resources, and information pages.',
      keywords: 'site map, website navigation, health insurance pages UK',
    },
  }
};

export function getSEOConfig(page: string) {
  return SEO_CONFIG.pages[page as keyof typeof SEO_CONFIG.pages] || SEO_CONFIG.pages.home;
}
