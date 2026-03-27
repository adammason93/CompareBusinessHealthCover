export interface ComparisonParty {
  name: string;
  /** Link to our guide when we have one */
  guideSlug?: string;
  /** Public logo path, or null for a text placeholder */
  logo: string | null;
  shortTagline: string;
  /** Insurer’s own UK health / PMI area — for “verify on their site”, not an endorsement */
  officialProductUrl?: string;
}

export interface InsurerComparisonContent {
  slug: string;
  left: ComparisonParty;
  right: ComparisonParty;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  intro: string[];
  /** Side-by-side comparison — general positioning, not live pricing */
  dimensions: { label: string; left: string; right: string }[];
  takeaway: string[];
  relatedSlugs: string[];
}

export const INSURER_COMPARISONS: InsurerComparisonContent[] = [
  {
    slug: 'compare/axa-health-vs-bupa',
    left: {
      name: 'AXA Health',
      guideSlug: 'insurers/axa-health',
      logo: '/insurers/axa.png',
      shortTagline: 'Large UK PMI brand with broad networks and modular cover.',
      officialProductUrl: 'https://www.axahealth.co.uk/',
    },
    right: {
      name: 'Bupa',
      shortTagline: 'Major UK provider, including its own hospitals and clinics.',
      logo: '/insurers/bupa.png',
      officialProductUrl: 'https://www.bupa.co.uk/health/insurance',
    },
    seo: {
      title: 'AXA Health vs Bupa UK | Private Medical Insurance Compared',
      description:
        'High-level comparison of AXA Health and Bupa private medical insurance in the UK: networks, how plans are structured, and why like-for-like quotes matter. Not advice—FCA brokers compare both.',
      keywords:
        'AXA vs Bupa health insurance, AXA Health Bupa comparison UK, private medical insurance AXA Bupa, compare PMI UK',
    },
    intro: [
      'AXA Health and Bupa are two of the best-known names in UK private medical insurance. Both can offer comprehensive cover, but they are not interchangeable: hospital lists, fee structures, underwriting, and optional benefits differ by product and by your personal details.',
      'This page explains typical positioning so you know what to discuss with an FCA-regulated broker. It is not a recommendation, ranking, or quote. Premiums and eligibility always depend on underwriting and the insurer’s current terms.',
    ],
    dimensions: [
      {
        label: 'What shoppers often compare first',
        left: 'Modular plans and digital tools; strong broker distribution. Often chosen when you want flexibility on excess and outpatient add-ons.',
        right: 'Very large UK footprint and brand recognition; integrated care including Bupa-owned facilities where relevant to the plan.',
      },
      {
        label: 'Hospital and specialist access',
        left: 'Networks and fee schedules vary by plan tier—your schedule lists where treatment is covered in full or subject to limits.',
        right: 'Broad access options; own hospitals can feature for some policies. Always match consultant and hospital choice to the policy wording.',
      },
      {
        label: 'Servicing and claims',
        left: 'Online servicing and apps are a common strength; claims routes depend on the product you buy.',
        right: 'Established claims and member services; specifics depend on plan and channel (e.g. personal vs corporate).',
      },
      {
        label: 'How to choose between them',
        left: 'Use a broker to map your must-have hospitals, excess, and outpatient needs, then compare AXA’s quote with alternatives on the same basis.',
        right: 'Same process: disclose medical history fully and compare Bupa alongside AXA (and others) on like-for-like cover, not headline brand alone.',
      },
    ],
    takeaway: [
      'The “better” insurer is the one whose policy terms, network, and price fit you after underwriting—not the logo alone.',
      'Small differences in outpatient limits, mental health cover, or cancer pathways can outweigh small premium gaps.',
      'HealthCoverCompare introduces you to FCA-regulated brokers who can obtain and explain quotes; we do not give advice on site.',
    ],
    relatedSlugs: ['compare/vitality-vs-bupa'],
  },
  {
    slug: 'compare/vitality-vs-bupa',
    left: {
      name: 'Vitality',
      guideSlug: 'insurers/vitality',
      logo: '/insurers/vitality.png',
      shortTagline: 'PMI with a strong focus on engagement, rewards, and wellbeing.',
      officialProductUrl: 'https://www.vitality.co.uk/health-insurance/',
    },
    right: {
      name: 'Bupa',
      shortTagline: 'Major UK provider, including its own hospitals and clinics.',
      logo: '/insurers/bupa.png',
      officialProductUrl: 'https://www.bupa.co.uk/health/insurance',
    },
    seo: {
      title: 'Vitality vs Bupa UK | Private Health Insurance Compared',
      description:
        'Compare Vitality and Bupa private medical insurance at a high level: rewards and engagement vs breadth of provision. Understand what to check before you get like-for-like quotes from FCA brokers.',
      keywords:
        'Vitality vs Bupa, Vitality Bupa health insurance UK, compare Vitality and Bupa PMI, private medical insurance comparison',
    },
    intro: [
      'Vitality and Bupa both sell private medical insurance in the UK, but they stand out for different reasons. Vitality is widely associated with activity-linked rewards and a digital-first engagement model; Bupa is often associated with scale, integrated healthcare, and long-established PMI propositions.',
      'Neither approach is universally “better”—it depends on whether you will use rewards and engagement features, how you want to access hospitals, and what your broker quotes on a comparable level of cover.',
    ],
    dimensions: [
      {
        label: 'Distinctive angle',
        left: 'Rewards and healthy-living programmes can be central to the proposition; understand how they interact with premiums and benefits in your quote.',
        right: 'Emphasis on comprehensive UK PMI and, for some customers, access to Bupa’s own facilities and extensive networks.',
      },
      {
        label: 'Cover structure',
        left: 'Core PMI plus options; engagement benefits sit alongside medical cover—check policy documents for what is insured vs promotional.',
        right: 'Wide range of personal and business products; features and limits depend on the plan your broker recommends.',
      },
      {
        label: 'Who it may suit',
        left: 'People who want motivation from rewards and are comfortable engaging with apps and partner benefits.',
        right: 'Those prioritising a traditional large insurer footprint and clarity on where they can be treated under the policy.',
      },
      {
        label: 'Practical comparison tip',
        left: 'Ask your broker to model Vitality with and without engagement assumptions, and to spell out hospital lists and exclusions.',
        right: 'Ask for the same excess, outpatient limits, and cancer care wording when comparing Bupa with Vitality—otherwise premiums are not comparable.',
      },
    ],
    takeaway: [
      'If you will not use rewards or linked apps, weigh whether that part of the proposition matters to you alongside pure medical cover.',
      'Underwriting outcomes (loadings, exclusions, moratorium) can matter more than brand once cover is matched.',
      'Use one comparison form to have brokers quote multiple insurers, including Vitality and Bupa where available on their panel.',
    ],
    relatedSlugs: ['compare/axa-health-vs-bupa'],
  },
];

const bySlug = new Map(INSURER_COMPARISONS.map((c) => [c.slug, c]));

export function getComparisonBySlug(slug: string): InsurerComparisonContent | undefined {
  return bySlug.get(slug);
}
