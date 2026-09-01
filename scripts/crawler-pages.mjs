import { GEO_GUIDES } from "../src/app/content/geo-guides.mjs";

export const ORIGIN = "https://comparebusinesshealthcover.co.uk";

/** Canonical HTML URL. Homepage is `/`; other pages use a trailing slash. */
export function pageUrl(path) {
  if (!path || path === "/") return `${ORIGIN}/`;
  const clean = String(path).replace(/\/+$/, "");
  const withSlash = clean.startsWith("/") ? clean : `/${clean}`;
  return `${ORIGIN}${withSlash}/`;
}

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
  "business health insurance tax deductible",
  "SME health insurance cost UK",
];

export const FAQS = GEO_GUIDES.find((g) => g.slug === "home")?.faqs || [];

const navLinks = `
<nav>
  <a href="${ORIGIN}/">Home</a>
  <a href="${pageUrl("/small-company-health-insurance")}">Small company</a>
  <a href="${pageUrl("/sme-health-insurance-2-employees")}">From 2 employees</a>
  <a href="${pageUrl("/sme-health-insurance-cost")}">Cost</a>
  <a href="${pageUrl("/business-health-insurance-tax")}">Tax</a>
  <a href="${pageUrl("/health-insurance-guide")}">Guide</a>
  <a href="${pageUrl("/blog")}">Blog</a>
  <a href="${pageUrl("/contact-us")}">Contact</a>
</nav>`;

function sectionHtml(section) {
  const paras = (section.paragraphs || []).map((p) => `<p>${p}</p>`).join("\n");
  const bullets = section.bullets?.length
    ? `<ul>${section.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`
    : "";
  let table = "";
  if (section.table) {
    table = `<table><thead><tr>${section.table.headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${section.table.rows
      .map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join("")}</tr>`)
      .join("")}</tbody></table>`;
  }
  return `<h2>${section.h2}</h2>\n${paras}\n${bullets}\n${table}`;
}

function faqsHtml(faqs) {
  if (!faqs?.length) return "";
  return `<h2>Frequently asked questions</h2>${faqs.map((f) => `<section><h3>${f.q}</h3><p>${f.a}</p></section>`).join("\n")}`;
}

function relatedHtml(related) {
  if (!related?.length) return "";
  const links = related
    .map((r) => {
      const href = r.slug === "home" ? `${ORIGIN}/` : pageUrl(`/${r.slug}`);
      return `<a href="${href}">${r.label}</a>`;
    })
    .join(" · ");
  return `<p>Related: ${links}</p>`;
}

export const PAGES = GEO_GUIDES.map((g) => ({
  path: g.path,
  title: g.title,
  description: g.description,
  keywords: g.keywords,
  h1: g.h1,
  faqs: g.faqs || [],
  sections: [
    `<p>${g.intro}</p>`,
    ...g.sections.map(sectionHtml),
    faqsHtml(g.faqs),
    relatedHtml(g.related),
  ],
}));

export function articleHtml(page, extraInner = "") {
  const sections = page.sections.join("\n");
  const route = page.path === "/" ? "home" : page.path.slice(1);
  return `
<article class="cbhc-crawler-content" data-cbhc-route="${route}">
  ${navLinks}
  <header>
    <p>Compare Business Healthcover</p>
    <h1>${page.h1}</h1>
    <p>${page.description}</p>
  </header>
  ${sections}
  ${extraInner}
  <footer>
    <p>Compare Business Healthcover is an introducer, not an insurer. Call 01484 773038. <a href="${ORIGIN}/llms.txt">llms.txt</a></p>
  </footer>
</article>`;
}

export function jsonLd(page) {
  const url = pageUrl(page.path);
  const crumbs = [{ "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` }];
  if (page.path !== "/") {
    crumbs.push({ "@type": "ListItem", position: 2, name: page.h1, item: url });
  }
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url,
      isPartOf: { "@type": "WebSite", name: "Compare Business Healthcover", url: ORIGIN },
    },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs },
  ];
  if (page.faqs?.length) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((item) => ({
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
      serviceType: ["Business Health Insurance Comparison", "SME Medical Insurance"],
    });
  }
  return graph;
}

/** Legal/utility HTML for crawlers. Not listed in the sitemap. */
export const NOINDEX_PAGES = [
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "How Compare Business Healthcover collects, uses and protects personal data under UK GDPR.",
    keywords: "privacy policy, GDPR, data protection UK",
    h1: "Privacy Policy",
    noindex: true,
    sections: [
      "<p>Compare Business Healthcover is a trading name of MASON &amp; HALL DIGITAL LTD (Company No. 17086378). This page explains how we collect, use and protect personal information in line with UK GDPR and the Data Protection Act 2018.</p>",
      "<p>The full policy on this URL covers who we are, what data we collect from quote enquiries, how we share introductions with FCA-regulated broker partners, retention, and your rights. Last updated February 2026.</p>",
    ],
  },
  {
    path: "/terms-conditions",
    title: "Terms & Conditions",
    description:
      "Terms for using Compare Business Healthcover, an introducer to FCA-regulated broker partners.",
    keywords: "terms and conditions, service terms UK",
    h1: "Terms &amp; Conditions",
    noindex: true,
    sections: [
      "<p>These terms apply to use of comparebusinesshealthcover.co.uk. Compare Business Healthcover is an introducer and comparison service, not an insurer, and does not give personalised financial advice.</p>",
      "<p>Quotes and policies are arranged by FCA-regulated broker partners and/or insurers and remain subject to their eligibility, underwriting and terms. Effective date February 2026.</p>",
    ],
  },
  {
    path: "/cookie-policy",
    title: "Cookie Policy",
    description: "How Compare Business Healthcover uses cookies and how to manage consent.",
    keywords: "cookie policy UK, cookie consent",
    h1: "Cookie Policy",
    noindex: true,
    sections: [
      "<p>This site uses cookies to remember consent, run essential functions, and — if you accept — analytics and marketing measurement. You can change preferences at any time via the cookie settings control.</p>",
    ],
  },
  {
    path: "/disclaimer",
    title: "Disclaimer",
    description:
      "Compare Business Healthcover is an introducer, not an insurer. We connect UK businesses with FCA-regulated brokers.",
    keywords: "insurance disclaimer, introducer, FCA brokers",
    h1: "Disclaimer",
    noindex: true,
    sections: [
      "<p>Compare Business Healthcover does not sell insurance policies itself. We introduce UK businesses to FCA-regulated broker partners who obtain quotes. Information on this site is general and is not personalised advice.</p>",
      "<p>Cover, exclusions, premiums and tax treatment depend on the insurer, the scheme and your circumstances. Confirm details with the broker and a qualified adviser before buying.</p>",
    ],
  },
];

