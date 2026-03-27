import { getInsurerBySlug } from '@/app/config/insurers';

export const SEO_CONFIG = {
  siteName: 'HealthCoverCompare',
  siteUrl: 'https://healthcovercomparison.co.uk',
  defaultImage: 'https://healthcovercomparison.co.uk/og-image.jpg',
  twitterHandle: '@HealthCoverUK',

  pages: {
    home: {
      title: 'UK Private Health Insurance Quotes',
      description:
        'Compare UK private health insurance with our FCA regulated broker partners: family, business or individual cover, major insurers, and no-obligation quotes. Start online in minutes.',
      keywords:
        'compare health insurance UK, private health insurance quotes, PMI comparison UK, medical insurance UK, family health insurance, business health insurance',
    },

    'health-insurance-guide': {
      title: 'Private Health Insurance UK: How It Works & What It Costs',
      description:
        'Plain-English guide to private medical insurance (PMI) in the UK: what’s covered, typical costs, NHS vs private, and how to compare policies before you buy.',
      keywords:
        'private health insurance UK guide, PMI explained UK, how much is health insurance UK, NHS vs private healthcare, compare PMI',
    },

    'business-health-insurance': {
      title: 'Business Health Insurance UK | Employee & Company Medical Cover',
      description:
        'Compare business health insurance for UK companies. Group PMI for staff wellbeing and retention—quotes via FCA-regulated brokers. SMEs to larger teams.',
      keywords:
        'business health insurance UK, company medical insurance, employee health cover UK, group PMI SME, corporate medical insurance quotes',
    },

    'family-health-insurance': {
      title: 'Family Health Insurance UK | Private Medical Cover for Families',
      description:
        'Compare family private health insurance in the UK. Cover for children and adults, outpatient and inpatient options—get matched to brokers who can quote major insurers.',
      keywords:
        'family health insurance UK, private medical insurance for family, children health cover UK, family PMI quotes',
    },

    'self-employed-health-insurance': {
      title: 'Self-Employed Health Insurance UK | PMI for Freelancers & Sole Traders',
      description:
        'Private health insurance for self-employed people in the UK. Flexible PMI when you have no company scheme—understand tax angles and compare options with regulated brokers.',
      keywords:
        'self employed health insurance UK, freelancer private medical insurance, sole trader health cover UK, PMI self employed',
    },

    'senior-health-insurance': {
      title: 'Health Insurance for Over 50s & Seniors UK | Private Medical Cover',
      description:
        'Compare health insurance for older adults in the UK. Plans for over 50s and seniors—understand eligibility, exclusions and how brokers help you compare quotes.',
      keywords:
        'over 50 health insurance UK, senior private medical insurance, health insurance over 65 UK, elderly PMI UK',
    },

    'international-health-insurance': {
      title: 'International Health Insurance UK | Global & Expat Medical Cover',
      description:
        'Compare international health insurance from the UK: expats, frequent travellers, and worldwide coverage. Worldwide treatment and repatriation options via brokers.',
      keywords:
        'international health insurance UK, expat medical insurance, global health insurance UK, worldwide PMI',
    },

    'corporate-health-insurance': {
      title: 'Corporate Health Insurance UK | Large Company Employee Benefits',
      description:
        'Enterprise and corporate private medical insurance for UK organisations. Employee benefits schemes, retention and wellbeing—compare approaches with FCA-regulated brokers.',
      keywords:
        'corporate health insurance UK, large company PMI, employee medical benefits UK, enterprise health insurance',
    },

    'small-company-health-insurance': {
      title: 'Small Business Health Insurance UK | SME & Startup Medical Cover',
      description:
        'Affordable health insurance for small UK businesses and startups—from a handful of employees upward. Compare group PMI options and broker support for SMEs.',
      keywords:
        'small business health insurance UK, SME health insurance, startup employee medical cover, group health insurance small company',
    },

    'insurance-types': {
      title: 'Types of Private Health Insurance in the UK Explained',
      description:
        'Understand types of UK private medical insurance: inpatient, outpatient, dental, cash plans, and extras. Choose the right structure before you compare quotes.',
      keywords:
        'types of health insurance UK, PMI types, outpatient vs inpatient UK, private medical insurance options',
    },

    'partner-insurers': {
      title: 'Partner Insurers & Brokers | UK Health Insurance Providers',
      description:
        'We work with leading UK private medical insurers and FCA-regulated brokers. Compare Aviva, AXA, Bupa, Vitality-style cover and more—see who we partner with.',
      keywords:
        'UK health insurance providers, private medical insurers UK, FCA regulated insurance brokers, compare health insurers',
    },

    insurers: {
      title: 'UK Health Insurers | Private Medical Insurance Guides',
      description:
        'Browse leading UK private health insurers: AXA, Aviva, Vitality, WPA, The Exeter, Freedom, Cigna. Read neutral guides and compare quotes with FCA-regulated brokers.',
      keywords:
        'UK health insurers list, private medical insurers UK, PMI providers UK, compare UK health insurance companies',
    },

    'nhs-waiting-times-england': {
      title: 'NHS Waiting Times England | Key Statistics & PDF Download',
      description:
        'NHS waiting times and key statistics for England: elective RTT lists, A&E four-hour waits, cancer pathways, ambulances—plus download the UK Parliament Commons Library briefing PDF.',
      keywords:
        'NHS waiting times England, NHS waiting list UK, RTT 18 weeks, A&E waiting times NHS, NHS key statistics England PDF',
    },

    'bma-private-medical-insurance-guide': {
      title: 'BMA Guide: Buying Private Medical Insurance (UK) | PDF & Key Points',
      description:
        'Summary of the BMA patient guide on private medical insurance: underwriting types, exclusions, consultant choice, PHIN, claims and switching—download the full September 2019 PDF.',
      keywords:
        'BMA private medical insurance guide, PMI patient guide UK, private health insurance questions to ask, moratorium underwriting UK',
    },

    'about-us': {
      title: 'About HealthCoverCompare | UK Health Insurance Comparison',
      description:
        'HealthCoverCompare is a UK introducer helping you compare private health insurance. We connect you with FCA-regulated brokers—no advice on site; brokers provide quotes and suitability.',
      keywords:
        'about HealthCoverCompare, UK health insurance comparison service, FCA regulated insurance introduction, private medical insurance UK',
    },

    'contact-us': {
      title: 'Contact HealthCoverCompare | Health Insurance Enquiries UK',
      description:
        'Contact HealthCoverCompare by phone or email for health insurance comparison enquiries. UK-based details—brokers handle quotes and product questions.',
      keywords:
        'contact HealthCoverCompare, health insurance enquiry UK, private medical insurance contact',
    },

    'privacy-policy': {
      title: 'Privacy Policy',
      description:
        'How we collect, use and protect your personal data when you use HealthCoverCompare. GDPR-focused summary for UK users.',
      keywords: 'privacy policy, GDPR UK, data protection HealthCoverCompare',
    },

    'terms-conditions': {
      title: 'Terms & Conditions',
      description:
        'Terms of use for HealthCoverCompare’s website and comparison service. Read our disclaimers, limitations and legal information.',
      keywords: 'terms and conditions UK, website terms of use, insurance comparison terms',
    },

    /** Same content as terms-conditions — route used by some internal links */
    'terms-and-conditions': {
      title: 'Terms & Conditions',
      description:
        'Terms of use for HealthCoverCompare’s website and comparison service. Read our disclaimers, limitations and legal information.',
      keywords: 'terms and conditions UK, website terms of use, insurance comparison terms',
    },

    'cookie-policy': {
      title: 'Cookie Policy',
      description:
        'How HealthCoverCompare uses cookies and similar technologies. Manage preferences and learn about essential vs optional cookies.',
      keywords: 'cookie policy UK, cookie consent, website cookies',
    },

    disclaimer: {
      title: 'Disclaimer',
      description:
        'Important information about our role as an introducer, FCA-regulated brokers, and limits of our comparison service. Read before using the site.',
      keywords: 'insurance disclaimer UK, introducer disclaimer, FCA broker services',
    },

    sitemap: {
      title: 'Sitemap',
      description:
        'Browse all HealthCoverCompare pages: guides, product areas and legal pages. UK private health insurance comparison hub.',
      keywords: 'sitemap, health insurance pages UK, HealthCoverCompare navigation',
    },

    'admin-leads': {
      title: 'Admin',
      description: 'Internal leads view.',
      keywords: '',
      noindex: true,
    },
  },
};

export function getSEOConfig(page: string) {
  const insurer = getInsurerBySlug(page);
  if (insurer) {
    return {
      title: insurer.seo.title,
      description: insurer.seo.description,
      keywords: insurer.seo.keywords,
    };
  }
  return SEO_CONFIG.pages[page as keyof typeof SEO_CONFIG.pages] || SEO_CONFIG.pages.home;
}
