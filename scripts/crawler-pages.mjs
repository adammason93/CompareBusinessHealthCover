import { GEO_GUIDES } from "../src/app/content/geo-guides.mjs";

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
  "business health insurance tax deductible",
  "SME health insurance cost UK",
];

export const FAQS = GEO_GUIDES.find((g) => g.slug === "home")?.faqs || [];

const navLinks = `
<nav>
  <a href="${ORIGIN}/">Home</a>
  <a href="${ORIGIN}/small-company-health-insurance">Small company</a>
  <a href="${ORIGIN}/sme-health-insurance-2-employees">From 2 employees</a>
  <a href="${ORIGIN}/sme-health-insurance-cost">Cost</a>
  <a href="${ORIGIN}/business-health-insurance-tax">Tax</a>
  <a href="${ORIGIN}/health-insurance-guide">Guide</a>
  <a href="${ORIGIN}/blog">Blog</a>
  <a href="${ORIGIN}/contact-us">Contact</a>
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
      const href = r.slug === "home" ? `${ORIGIN}/` : `${ORIGIN}/${r.slug}`;
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
  const url = `${ORIGIN}${page.path === "/" ? "/" : page.path}`;
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
