/** Keyword-rich page copy for AI/search crawlers (no JS). Keep claims consistent with the live site. */

export const ORIGIN = "https://comparebusinesshealthcover.co.uk";

export const KEYWORDS = [
  "SME health insurance UK",
  "business health insurance",
  "small company health insurance",
  "employee medical cover",
  "group private medical insurance",
  "company health insurance quotes",
  "health insurance for 2 employees",
  "corporate health insurance UK",
  "compare business health cover",
  "small business PMI",
  "employee health benefits UK",
  "group PMI for SMEs",
  "director health insurance",
  "self employed health insurance UK",
];

export const FAQS = [
  {
    q: "What is business health insurance for SMEs?",
    a: "Business health insurance — also called group private medical insurance (PMI) — is an employee benefit arranged by an employer so staff can access private healthcare. For UK SMEs it can reduce sickness absence, support faster treatment, and strengthen recruitment. Schemes can often start from two employees.",
  },
  {
    q: "How many employees do I need for SME health insurance?",
    a: "Many group schemes are available from as few as two employees, so micro-businesses and growing SMEs can access cover as well as larger companies. Eligibility varies by insurer, company structure, and cover level.",
  },
  {
    q: "How much does SME health insurance cost?",
    a: "Cost depends on team size, employee ages, cover level, and insurer. SME schemes often start from a few pounds per employee per week. Comparing quotes from FCA-regulated brokers is the most reliable way to see the market for your business.",
  },
  {
    q: "Is business health insurance tax-efficient?",
    a: "Employer-paid group health insurance is usually treated as a business expense and is generally an allowable deduction for corporation tax. For employees, PMI is typically a taxable benefit in kind and reported via PAYE. Confirm the position with your broker or accountant.",
  },
  {
    q: "Is the comparison service free?",
    a: "Yes. Compare Business Healthcover is free for employers. If you take out a policy through a broker partner, they receive commission from the insurer — this does not increase the premium compared with going direct.",
  },
  {
    q: "Are you an insurer?",
    a: "No. Compare Business Healthcover is an introducer and comparison service operated by MASON & HALL DIGITAL LTD. Quotes and policies are arranged by FCA-regulated broker partners and/or insurers.",
  },
];

const navLinks = `
<nav>
  <a href="${ORIGIN}/">Home</a>
  <a href="${ORIGIN}/business-health-insurance">Business health insurance</a>
  <a href="${ORIGIN}/small-company-health-insurance">Small company health insurance</a>
  <a href="${ORIGIN}/corporate-health-insurance">Corporate health insurance</a>
  <a href="${ORIGIN}/self-employed-health-insurance">Self-employed health insurance</a>
  <a href="${ORIGIN}/health-insurance-guide">SME health insurance guide</a>
  <a href="${ORIGIN}/blog">Blog</a>
  <a href="${ORIGIN}/contact-us">Contact</a>
  <a href="${ORIGIN}/about-us">About</a>
</nav>`;

function faqHtml() {
  return FAQS.map(
    (item) => `<section><h3>${item.q}</h3><p>${item.a}</p></section>`,
  ).join("\n");
}

function page({ path, title, description, keywords, h1, sections }) {
  return { path, title, description, keywords, h1, sections };
}

export const PAGES = [
  page({
    path: "/",
    title: "Compare SME Business Health Insurance UK",
    description:
      "Compare business health insurance for UK SMEs and small companies. Employee medical cover from FCA-regulated brokers. Free quotes for teams from 2 employees.",
    keywords:
      "SME health insurance UK, business health insurance, small company medical cover, employee health benefits, compare business health cover, group PMI",
    h1: "Compare business health insurance for UK SMEs",
    sections: [
      `<p>Compare Business Healthcover helps UK small and medium-sized employers compare <strong>business health insurance</strong>, <strong>SME health insurance</strong>, and <strong>employee medical cover</strong> from leading providers. The service is free and no-obligation. Group schemes are often available from just <strong>two employees</strong>.</p>`,
      `<p>We are an introducer. FCA-regulated broker partners compare group private medical insurance (PMI) options so you can see cover levels, exclusions, and premiums before you decide.</p>`,
      `<h2>Why UK SMEs compare group health cover</h2>
      <ul>
        <li>Reduce employee sick days with faster private treatment</li>
        <li>Attract and retain staff with a valued employee benefit</li>
        <li>Often a tax-efficient benefit for the company (confirm with your accountant)</li>
        <li>Flexible cover that can scale as your headcount grows</li>
      </ul>`,
      `<h2>Who we help</h2>
      <ul>
        <li><a href="${ORIGIN}/small-company-health-insurance">Small companies and startups</a> (typically 2–50 staff)</li>
        <li><a href="${ORIGIN}/business-health-insurance">Growing SMEs</a> comparing or renewing group PMI</li>
        <li><a href="${ORIGIN}/corporate-health-insurance">Larger businesses</a> needing corporate health insurance</li>
        <li><a href="${ORIGIN}/self-employed-health-insurance">Self-employed owners and sole traders</a></li>
      </ul>`,
      `<h2>How to get an SME health insurance quote</h2>
      <p>Complete the short enquiry form with company size, location, and the cover you need. A broker partner compares group schemes and explains options. There is no obligation to buy.</p>
      <p><a href="${ORIGIN}/contact-us">Contact Compare Business Healthcover</a> or call 01484 773038.</p>`,
      `<h2>Frequently asked questions</h2>${faqHtml()}`,
    ],
  }),
  page({
    path: "/business-health-insurance",
    title: "Business Health Insurance for UK Companies",
    description:
      "Compare business health insurance for UK companies. Protect your team with private medical cover from FCA-regulated providers. Get competitive SME quotes today.",
    keywords:
      "business health insurance UK, company medical insurance, SME health cover, corporate health insurance, group PMI",
    h1: "Business health insurance",
    sections: [
      `<p>Business health insurance (group PMI) gives employees access to private medical treatment as a workplace benefit. Compare Business Healthcover helps UK companies compare plans so you can protect your team and stay competitive on benefits.</p>`,
      `<h2>Why offer health insurance?</h2>
      <p>It is one of the most valued employee benefits. Private treatment can reduce time off work and help you attract and retain talent. Cover can be arranged for small teams as well as larger workforces.</p>`,
      `<h2>Business benefits</h2>
      <ul>
        <li>Reduce employee sick days</li>
        <li>Attract and retain talent</li>
        <li>Tax-efficient benefit for many employers</li>
        <li>Boost employee morale</li>
        <li>Flexible coverage options</li>
      </ul>
      <p>Related: <a href="${ORIGIN}/small-company-health-insurance">small company health insurance</a> and <a href="${ORIGIN}/corporate-health-insurance">corporate health insurance</a>.</p>`,
    ],
  }),
  page({
    path: "/small-company-health-insurance",
    title: "Small Company Health Insurance UK",
    description:
      "Affordable health insurance for small businesses and SMEs in the UK. Flexible plans starting from 2 employees. Compare quotes from top providers.",
    keywords:
      "small company health insurance, SME medical cover UK, small business health benefits, startup health insurance, health insurance 2 employees",
    h1: "Small company health insurance",
    sections: [
      `<p>Affordable <strong>small company health insurance</strong> for SMEs and startups. Offer your team benefits similar to larger employers without an enterprise-only scheme. Many insurers accept groups from <strong>2 employees</strong>.</p>`,
      `<h2>Perfect for small businesses</h2>
      <p>Small company and SME schemes are designed for lower headcounts — often 2–50 employees — with simpler administration and transparent pricing.</p>`,
      `<h2>SME advantages</h2>
      <ul>
        <li>Affordable group rates</li>
        <li>Easy administration</li>
        <li>Help attracting better staff</li>
        <li>Scalable coverage as you hire</li>
        <li>No large minimum employee count on many schemes</li>
      </ul>`,
    ],
  }),
  page({
    path: "/corporate-health-insurance",
    title: "Corporate Health Insurance UK",
    description:
      "Enterprise health insurance for larger UK businesses. Comprehensive employee medical benefits to attract and retain talent.",
    keywords:
      "corporate health insurance UK, large company medical benefits, enterprise employee health cover, group PMI corporate",
    h1: "Corporate health insurance",
    sections: [
      `<p>Corporate health insurance suits larger UK organisations that need comprehensive employee medical benefits, optional cover tiers, and dedicated account support.</p>`,
      `<p>Compare Business Healthcover introduces you to FCA-regulated brokers who can benchmark corporate PMI, renewal terms, and multi-site or international add-ons.</p>
      <p>If you have a smaller headcount, see <a href="${ORIGIN}/small-company-health-insurance">small company health insurance</a>.</p>`,
    ],
  }),
  page({
    path: "/self-employed-health-insurance",
    title: "Health Insurance for Self-Employed & Sole Traders",
    description:
      "Health insurance for self-employed professionals and sole traders in the UK. Flexible business-friendly plans with tax considerations.",
    keywords:
      "self employed health insurance UK, sole trader medical insurance, freelancer health cover, director PMI",
    h1: "Self-employed health insurance",
    sections: [
      `<p>If you are self-employed, time off work hits income directly. Private health insurance can mean faster diagnosis and treatment so you return to work sooner.</p>`,
      `<h2>Key advantages</h2>
      <ul>
        <li>Get back to work faster</li>
        <li>Protect your earning ability</li>
        <li>Flexible payment options</li>
        <li>Ask your accountant about tax treatment of premiums</li>
      </ul>
      <p>Company directors employing staff should also compare <a href="${ORIGIN}/business-health-insurance">group business health insurance</a>.</p>`,
    ],
  }),
  page({
    path: "/family-health-insurance",
    title: "Group & Family Business Health Options",
    description:
      "Health cover options for business owners extending benefits to directors and families. Compare plans suited to small UK businesses.",
    keywords:
      "director health insurance, business owner medical cover, SME family health benefits, group family PMI",
    h1: "Family and director health cover options",
    sections: [
      `<p>Some SME schemes let business owners extend private medical cover to directors and family members. Compare Business Healthcover helps you explore group and family-style options that still sit within a business benefits discussion.</p>
      <p>Start with <a href="${ORIGIN}/business-health-insurance">business health insurance</a> if you need cover for employees.</p>`,
    ],
  }),
  page({
    path: "/senior-health-insurance",
    title: "Health Cover for Mature Employees",
    description:
      "Business health insurance options for teams including mature employees. Compare SME plans with flexible age criteria.",
    keywords:
      "employee health insurance over 50, mature workforce medical cover UK, group PMI older employees",
    h1: "Health cover for mature employees",
    sections: [
      `<p>Group schemes can include mature employees. Underwriting and premium depend on the age profile of the workforce and the insurer’s rules. Brokers can explain which SME plans are a better fit for mixed-age teams.</p>`,
    ],
  }),
  page({
    path: "/international-health-insurance",
    title: "International Business Health Insurance",
    description:
      "Global health insurance for UK businesses with international staff or overseas operations. Worldwide medical cover for your team.",
    keywords:
      "international business health insurance, expat employee medical cover UK, worldwide group PMI",
    h1: "International business health insurance",
    sections: [
      `<p>UK businesses with overseas staff or travel-heavy roles may need international or worldwide medical cover alongside UK group PMI. Compare options through FCA-regulated partners.</p>`,
    ],
  }),
  page({
    path: "/health-insurance-guide",
    title: "Business Health Insurance Guide for UK SMEs",
    description:
      "Guide to business health insurance for UK SMEs. Learn about employee cover options, costs, tax benefits, and how to choose the right plan for your team.",
    keywords:
      "SME health insurance guide, business medical insurance UK, employee health cover explained, company PMI guide",
    h1: "Business health insurance guide for UK SMEs",
    sections: [
      `<p>This guide explains how <strong>group private medical insurance</strong> works for UK employers: what it covers, how quotes are priced, and how to choose a scheme for your headcount.</p>`,
      `<h2>What is group health insurance?</h2>
      <p>It is private medical cover arranged by an employer for employees (and sometimes dependants). It is not NHS care, and it is not the same as life insurance or income protection.</p>`,
      `<h2>What affects the price?</h2>
      <ul>
        <li>Number of employees and age profile</li>
        <li>Level of cover (inpatient, outpatient, therapies, dental/optical extras)</li>
        <li>Excess, hospital list, and underwriting method</li>
        <li>Claims history on an existing scheme at renewal</li>
      </ul>
      <h2>Next step</h2>
      <p><a href="${ORIGIN}/">Compare SME quotes</a> or read the <a href="${ORIGIN}/blog">business health insurance blog</a>.</p>
      <h2>FAQs</h2>${faqHtml()}`,
    ],
  }),
  page({
    path: "/insurance-types",
    title: "Types of Business Health Insurance UK",
    description:
      "Explore business health insurance options for UK SMEs — from small team cover to corporate schemes. Find the right employee benefit for your company.",
    keywords:
      "types of business health insurance UK, SME PMI options, employee medical cover categories, group vs corporate PMI",
    h1: "Types of business health insurance",
    sections: [
      `<p>UK employers typically choose between small-company SME schemes, wider business group PMI, and corporate arrangements for larger workforces. All provide private medical cover; they differ in scale, underwriting, and administration.</p>
      <ul>
        <li><a href="${ORIGIN}/small-company-health-insurance">Small company / SME schemes</a> — often from 2 employees</li>
        <li><a href="${ORIGIN}/business-health-insurance">Business group PMI</a> — general employee medical cover</li>
        <li><a href="${ORIGIN}/corporate-health-insurance">Corporate schemes</a> — larger teams and tiered benefits</li>
        <li><a href="${ORIGIN}/international-health-insurance">International cover</a> — overseas staff or travel</li>
      </ul>`,
    ],
  }),
  page({
    path: "/about-us",
    title: "About Compare Business Healthcover",
    description:
      "Compare Business Healthcover helps UK SMEs compare business health insurance from FCA-regulated brokers. We simplify employee medical cover comparison.",
    keywords:
      "about compare business health cover, UK SME insurance comparison, business health insurance brokers",
    h1: "About Compare Business Healthcover",
    sections: [
      `<p>Compare Business Healthcover is a UK comparison and introducer service for <strong>SME and business health insurance</strong>. We help employers compare employee medical cover without charging a fee for the enquiry.</p>
      <p>We do not underwrite policies. FCA-regulated broker partners arrange quotes and cover. Trading name of MASON & HALL DIGITAL LTD (Company No. 17086378). ICO: ZC107389. Rotherham, South Yorkshire. Telephone 01484 773038.</p>`,
    ],
  }),
  page({
    path: "/contact-us",
    title: "Contact Us — SME Health Insurance Quotes",
    description:
      "Get in touch with Compare Business Healthcover. Our team helps UK businesses find the right employee health insurance. Call or use the contact form.",
    keywords: "contact business health insurance, SME health cover enquiries UK, compare business healthcover phone",
    h1: "Contact Compare Business Healthcover",
    sections: [
      `<p>Request a free SME health insurance comparison or speak to the team.</p>
      <p>Telephone: <a href="tel:01484773038">01484 773038</a></p>
      <p>Address: 83 Hall Road, Moorgate, Rotherham, South Yorkshire</p>
      <p>Use the contact form on this page (JavaScript) to send a message, or start a quote from the <a href="${ORIGIN}/">homepage</a>.</p>`,
    ],
  }),
  page({
    path: "/blog",
    title: "Business Health Insurance Blog",
    description:
      "Guides and updates on business health insurance for UK SMEs — employee cover, costs, tax benefits, and choosing the right plan for your team.",
    keywords:
      "business health insurance blog, SME medical cover guides UK, employee health benefits articles",
    h1: "Business health insurance blog",
    sections: [
      `<p>Guides for UK employers on group PMI, small business health insurance costs, renewals, and choosing cover. Individual articles are listed in the sitemap and in <a href="${ORIGIN}/llms.txt">llms.txt</a>.</p>`,
    ],
  }),
];

export function articleHtml(page, extraInner = "") {
  const sections = page.sections.join("\n");
  return `
<article class="cbhc-crawler-content" data-cbhc-route="${page.path === "/" ? "home" : page.path.slice(1)}">
  ${navLinks}
  <header>
    <p>Compare Business Healthcover</p>
    <h1>${page.h1}</h1>
    <p>${page.description}</p>
  </header>
  ${sections}
  ${extraInner}
  <footer>
    <p>Compare Business Healthcover is an introducer, not an insurer. Call 01484 773038. <a href="${ORIGIN}/llms.txt">llms.txt</a> · <a href="${ORIGIN}/sitemap.xml">sitemap.xml</a></p>
  </footer>
</article>`;
}

export function jsonLd(page) {
  const url = `${ORIGIN}${page.path === "/" ? "/" : page.path}`;
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
  ];
  if (page.path !== "/") {
    crumbs.push({
      "@type": "ListItem",
      position: 2,
      name: page.h1,
      item: url,
    });
  }
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url,
      isPartOf: { "@type": "WebSite", name: "Compare Business Healthcover", url: ORIGIN },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "article"] },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs,
    },
  ];
  if (page.path === "/" || page.path === "/health-insurance-guide") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }
  if (page.path === "/") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FinancialService",
      name: "Compare Business Healthcover",
      description: page.description,
      url: ORIGIN,
      telephone: "01484-773038",
      areaServed: { "@type": "Country", name: "United Kingdom" },
      serviceType: [
        "Business Health Insurance Comparison",
        "SME Medical Insurance",
        "Employee Health Benefits",
      ],
    });
  }
  return graph;
}
