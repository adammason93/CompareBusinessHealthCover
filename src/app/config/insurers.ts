export interface InsurerPageContent {
  slug: string;
  name: string;
  logo: string;
  shortDescription: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  intro: string[];
  whoItsFor: string[];
  whatYouGet: string[];
  considerations: string[];
}

export const INSURERS: InsurerPageContent[] = [
  {
    slug: 'insurers/axa-health',
    name: 'AXA Health',
    logo: '/insurers/axa.png',
    shortDescription: 'Global health cover with extensive hospital networks.',
    seo: {
      title: 'AXA Health Insurance UK | Private Medical Insurance Overview',
      description:
        'Learn about AXA Health private medical insurance in the UK: hospital networks, flexible PMI options, and how to compare AXA quotes with FCA-regulated brokers.',
      keywords:
        'AXA health insurance UK, AXA PPP, AXA private medical insurance, compare AXA health quotes UK',
    },
    intro: [
      'AXA Health (often still referred to by customers as AXA PPP) is one of the largest private medical insurance brands in the UK. It is known for broad hospital and specialist access, digital tools, and a range of modular options so you can balance cover and premium.',
      'As with any insurer, the right AXA policy depends on your postcode, age, medical history, and the level of outpatient and mental health cover you want. Comparing alongside other major UK insurers helps you see relative value—not just the brand name.',
    ],
    whoItsFor: [
      'Individuals and families who want access to a wide choice of private hospitals and specialists.',
      'People who value online servicing, apps, and clear documentation when claiming.',
      'Anyone who wants to structure cover with higher excess or stripped-back outpatient options to control cost.',
    ],
    whatYouGet: [
      'Access to private treatment for eligible conditions subject to policy terms, underwriting, and exclusions.',
      'Options often include inpatient/day-patient care, with add-ons for outpatient diagnostics, therapies, and mental health depending on the plan.',
      'Networks and fee structures vary by plan—your broker can explain which hospitals and fee schedules apply to a quote.',
    ],
    considerations: [
      'Premiums rise with age and claims experience; always check excess, co-payment, and any moratorium or full medical underwriting.',
      'Not every broker quotes every AXA product line; a comparison service helps you see what is available to you.',
      'HealthCoverCompare is an introducer, not an insurer. We do not provide advice; FCA-regulated brokers provide quotes and recommendations.',
    ],
  },
  {
    slug: 'insurers/aviva',
    name: 'Aviva',
    logo: '/insurers/aviva.png',
    shortDescription: 'Trusted UK insurer with flexible private medical plans.',
    seo: {
      title: 'Aviva Health Insurance UK | Private Medical Insurance Guide',
      description:
        'Overview of Aviva private health insurance in the UK: core PMI features, who it suits, and how to compare Aviva with other insurers via regulated brokers.',
      keywords:
        'Aviva health insurance UK, Aviva private medical insurance, Aviva PMI quotes, compare Aviva health cover',
    },
    intro: [
      'Aviva is a household name in UK insurance and offers private medical insurance aimed at individuals, families, and businesses. Plans are typically modular, letting you choose the mix of inpatient, outpatient, and extra benefits that match your budget.',
      'Aviva often competes strongly on digital servicing and clarity of policy documents, but suitability still comes down to underwriting, exclusions, and how the plan is priced for your profile.',
    ],
    whoItsFor: [
      'UK residents seeking cover from a large, established insurer with extensive distribution through brokers.',
      'Families who want to add children or partners to a single policy structure.',
      'Employers and employees exploring group or business routes as well as personal cover.',
    ],
    whatYouGet: [
      'Core private medical cover for eligible treatment in line with your chosen plan—usually with flexibility on hospital lists and excess.',
      'Optional areas such as outpatient cover, dental/cash-style add-ons, or mental health support depending on product selection.',
      'Access to claims and policy management through Aviva’s online channels when included in the plan.',
    ],
    considerations: [
      'Pre-existing conditions are assessed in line with underwriting rules; always read the scope of cover and exclusions.',
      'Pricing varies significantly by region and age—comparing multiple quotes is essential.',
      'We may introduce you to brokers who can quote Aviva alongside other insurers so you see the wider market.',
    ],
  },
  {
    slug: 'insurers/vitality',
    name: 'Vitality',
    logo: '/insurers/vitality.png',
    shortDescription: 'Rewards-based health and life insurance.',
    seo: {
      title: 'Vitality Health Insurance UK | Rewards & Private Medical Cover',
      description:
        'What Vitality health insurance offers in the UK: activity-linked rewards, core PMI benefits, and how to compare Vitality plans with other providers.',
      keywords:
        'Vitality health insurance UK, Vitality PMI, Vitality rewards health insurance, compare Vitality medical insurance',
    },
    intro: [
      'Vitality is distinctive in the UK market for linking engagement and healthy living to rewards and, in some cases, premium dynamics. Its private medical insurance sits alongside other protection products, and many customers are drawn to the ecosystem of partners and incentives.',
      'The right question is whether the overall plan structure and hospital access fit your needs—not only the rewards programme.',
    ],
    whoItsFor: [
      'People who are motivated by fitness tracking, screenings, and partner benefits as part of their cover.',
      'Those who want a digitally led experience with clear goals and rewards.',
      'Families and individuals comfortable with plan rules tied to engagement where applicable.',
    ],
    whatYouGet: [
      'Private medical insurance for eligible treatment with options and networks defined in the policy.',
      'A rewards programme that may include partner discounts and incentives subject to terms.',
      'Tools and apps to support engagement and, where included, preventative health measures.',
    ],
    considerations: [
      'Understand how rewards and premiums interact—brokers can explain product rules in plain English.',
      'Compare hospital access and exclusions on a like-for-like basis with other insurers.',
      'HealthCoverCompare is not an insurer; we help you connect with brokers who can compare Vitality and alternatives.',
    ],
  },
  {
    slug: 'insurers/wpa',
    name: 'WPA',
    logo: '/insurers/wpa.png',
    shortDescription: 'Not-for-profit healthcare with personal service.',
    seo: {
      title: 'WPA Health Insurance UK | WPA Private Medical & NHS Top-Up',
      description:
        'About WPA in the UK: not-for-profit ethos, personal service, and flexible health cover options. Compare WPA quotes with other insurers through regulated brokers.',
      keywords:
        'WPA health insurance UK, WPA private medical insurance, WPA healthcare, WPA NHS top up',
    },
    intro: [
      'WPA operates as a not-for-profit healthcare provider in the UK and is known for personalised service and flexible approaches to cover, including options that can complement NHS care in some product lines.',
      'Customers often choose WPA when they want a smaller, relationship-led insurer with a different feel than the largest global brands.',
    ],
    whoItsFor: [
      'People who prioritise service quality and a mutual-style ethos.',
      'Those exploring modular cover or NHS top-up style arrangements (where available and suitable).',
      'Families and individuals who want clear communication from a UK-focused organisation.',
    ],
    whatYouGet: [
      'Private medical cover structured according to the WPA product you select, with underwriting and exclusions as stated in the policy.',
      'A focus on member support and clarity—exact benefits depend on the plan tier.',
      'Options that may be combined across inpatient, outpatient, and additional services depending on underwriting.',
    ],
    considerations: [
      'Hospital lists and pricing differ from larger insurers; comparison is key.',
      'Not all brokers place business with every WPA product—our partners can outline availability.',
      'We do not provide financial advice; brokers discuss suitability and alternatives.',
    ],
  },
  {
    slug: 'insurers/exeter',
    name: 'The Exeter',
    logo: '/insurers/exeter.png',
    shortDescription: 'Specialist health and protection for individuals & families.',
    seo: {
      title: 'The Exeter Health Insurance UK | Private Medical & Protection',
      description:
        'Introduction to The Exeter’s health and protection offering in the UK: specialist focus, flexible underwriting, and comparing Exeter with other PMI providers.',
      keywords:
        'The Exeter health insurance UK, Exeter private medical insurance, Exeter health cover, compare Exeter PMI',
    },
    intro: [
      'The Exeter is a mutual insurer with a long history in UK protection markets. It offers private medical insurance aimed at individuals and families, often emphasising flexibility and member ownership.',
      'Because it is not the largest mass-market TV advertiser, many customers discover it through brokers—making comparison alongside bigger names especially useful.',
    ],
    whoItsFor: [
      'Individuals and families who want a mutual insurer with a reputation for personalised underwriting approaches.',
      'Those who may have been declined or loaded elsewhere—specialist underwriters can still have criteria, but brokers can guide options.',
      'Customers who value stability and clarity from a protection-focused provider.',
    ],
    whatYouGet: [
      'Private medical insurance for eligible treatment with options and limits defined in your policy.',
      'Member benefits associated with mutuality, subject to terms.',
      'Integration with other protection products from the same provider where relevant to your planning.',
    ],
    considerations: [
      'Medical history and occupation can affect terms; disclose fully during application.',
      'Compare Exeter’s network and fees with other insurers for your region.',
      'HealthCoverCompare introduces you to brokers who can quote multiple insurers, not Exeter alone.',
    ],
  },
  {
    slug: 'insurers/freedom',
    name: 'Freedom Health Insurance',
    logo: '/insurers/freedom.png',
    shortDescription: 'Flexible policies tailored to your needs.',
    seo: {
      title: 'Freedom Health Insurance UK | Flexible Private Medical Cover',
      description:
        'Overview of Freedom Health Insurance in the UK: flexible PMI structures, who it suits, and how to compare Freedom quotes with other private medical insurers.',
      keywords:
        'Freedom health insurance UK, Freedom private medical insurance, Freedom PMI, compare Freedom health insurance',
    },
    intro: [
      'Freedom Health Insurance focuses on flexible private medical insurance in the UK, allowing many customers to tailor cover levels, excess, and optional extras to align with budget.',
      'Smaller specialist insurers can sometimes offer niche strengths or underwriting approaches—worth comparing against larger insurers on a like-for-like basis.',
    ],
    whoItsFor: [
      'People who want a bespoke mix of benefits and are willing to trade off optional areas for premium.',
      'Self-employed and families seeking straightforward, flexible product design.',
      'Anyone who wants to compare a specialist insurer alongside mainstream names.',
    ],
    whatYouGet: [
      'Configurable private medical cover with eligibility and exclusions as defined in your policy wording.',
      'Options to adjust excess, cover levels, and add-ons depending on product rules.',
      'Broker-led illustration of how Freedom stacks up on price and benefits versus alternatives.',
    ],
    considerations: [
      'Check insurer financial strength and claims service reputation with your broker.',
      'Ensure hospital lists meet your location needs.',
      'We are an introducer; brokers handle regulated advice and product selection.',
    ],
  },
  {
    slug: 'insurers/cigna',
    name: 'Cigna',
    logo: '/insurers/cigna.png',
    shortDescription: 'International and UK-focused health solutions.',
    seo: {
      title: 'Cigna Health Insurance UK | Global & UK Private Medical Plans',
      description:
        'Learn about Cigna health insurance in the UK: international coverage, expat-friendly options, and UK PMI—compare Cigna with other insurers via FCA-regulated brokers.',
      keywords:
        'Cigna health insurance UK, Cigna global health, Cigna private medical UK, international health insurance Cigna',
    },
    intro: [
      'Cigna is a global health services organisation with a strong UK presence. It is often considered for internationally mobile lives, expats, and those who want worldwide or regional coverage options.',
      'UK domestic private medical insurance is a different product family to international IPMI; brokers help you choose the right category for your situation.',
    ],
    whoItsFor: [
      'Expats, frequent travellers, and internationally mobile professionals.',
      'UK residents seeking comprehensive private medical options where Cigna’s product set fits.',
      'Employers with global mobility programmes alongside UK employees.',
    ],
    whatYouGet: [
      'Depending on product: international medical benefits, emergency evacuation/repatriation, or UK-focused PMI as quoted.',
      'Networks and direct settlement arrangements vary by plan and region.',
      'Digital tools and member support aligned with global operations.',
    ],
    considerations: [
      'International and UK products have different tax, underwriting, and regulatory angles—get professional guidance.',
      'Currency, territory, and renewal rules differ from domestic PMI—always read the schedule.',
      'HealthCoverCompare connects you with brokers who can compare Cigna and alternatives for your profile.',
    ],
  },
];

const bySlug = new Map(INSURERS.map((i) => [i.slug, i]));

/** Previous flat URLs → redirect to /insurers/… (301-style in SPA via replaceState). */
export const LEGACY_INSURER_PATHS: Record<string, string> = {
  'axa-health-insurance': 'insurers/axa-health',
  'aviva-health-insurance': 'insurers/aviva',
  'vitality-health-insurance': 'insurers/vitality',
  'wpa-health-insurance': 'insurers/wpa',
  'exeter-health-insurance': 'insurers/exeter',
  'freedom-health-insurance': 'insurers/freedom',
  'cigna-health-insurance': 'insurers/cigna',
};

export function resolveInsurerRoute(pathnameNoSlash: string): string {
  return LEGACY_INSURER_PATHS[pathnameNoSlash] ?? pathnameNoSlash;
}

export function getInsurerBySlug(slug: string): InsurerPageContent | undefined {
  return bySlug.get(slug);
}
