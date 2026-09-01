/**
 * After Vite build, write per-route HTML so crawlers that do not run JS still
 * see unique titles, copy, FAQs, and JSON-LD. Also writes llms.txt, llms-full.txt,
 * and a sitemap that includes those routes (plus live blog posts when the API is reachable).
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  FAQS,
  KEYWORDS,
  NOINDEX_PAGES,
  ORIGIN,
  PAGES,
  articleHtml,
  jsonLd,
  pageUrl,
} from "./crawler-pages.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const publicDir = join(root, "public");

const BLOG_LIST =
  "https://bjylempevckvbpzpiicx.supabase.co/functions/v1/make-server-2031af1c/blog/posts?site=cbhc";
const BLOG_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqeWxlbXBldmNrdmJwenBpaWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI1ODgsImV4cCI6MjA4NDQ3ODU4OH0.QNgiklDhLOSD_cCCKvKg8CLgatgldvoT4pn3oRYH0lc";

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function setMeta(html, attr, name, content) {
  const re = new RegExp(`<meta[^>]*\\s${attr}=["']${name}["'][^>]*>`, "i");
  const tag = `<meta ${attr}="${name}" content="${escapeAttr(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function setTitle(html, title) {
  const full = `${title} | Compare Business Healthcover`;
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(full)}</title>`);
}

function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escapeAttr(url)}" />`;
  if (/<link[^>]*rel=["']canonical["'][^>]*>/i.test(html)) {
    return html.replace(/<link[^>]*rel=["']canonical["'][^>]*>/i, tag);
  }
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function injectJsonLd(html, graph) {
  const scripts = graph
    .map(
      (node) =>
        `    <script type="application/ld+json">${JSON.stringify(node)}</script>`,
    )
    .join("\n");
  const stripped = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi,
    "",
  );
  return stripped.replace("</head>", `${scripts}\n  </head>`);
}

function injectArticle(html, article) {
  if (/<div id="root"[^>]*>[\s\S]*?<\/div>/.test(html)) {
    return html.replace(
      /<div id="root"[^>]*>[\s\S]*?<\/div>/,
      `<div id="root">${article}</div>`,
    );
  }
  return html.replace('<div id="root"></div>', `<div id="root">${article}</div>`);
}

function applyPage(template, page, extraInner = "") {
  const url = pageUrl(page.path);
  let html = template;
  html = setTitle(html, page.title);
  html = setMeta(html, "name", "title", `${page.title} | Compare Business Healthcover`);
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "name", "keywords", page.keywords);
  html = setMeta(html, "name", "robots", page.noindex ? "noindex, nofollow" : "index, follow");
  html = setCanonical(html, url);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", `${page.title} | Compare Business Healthcover`);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "name", "twitter:title", `${page.title} | Compare Business Healthcover`);
  html = setMeta(html, "name", "twitter:description", page.description);
  html = injectJsonLd(html, page.noindex ? [] : jsonLd(page));
  html = injectArticle(html, articleHtml(page, extraInner));
  return html;
}

function outPathFor(pagePath) {
  if (pagePath === "/") return join(dist, "index.html");
  return join(dist, pagePath.replace(/^\//, ""), "index.html");
}

function llmsTxt(blogLines) {
  const pageLines = PAGES.map((p) => {
    const url = pageUrl(p.path);
    return `- [${p.h1}](${url}): ${p.description}`;
  });
  return `# Compare Business Healthcover

> Free UK comparison of SME and business health insurance (group private medical insurance) from 2 employees. Introducer to FCA-regulated brokers — not an insurer.

Compare Business Healthcover is a trading name of MASON & HALL DIGITAL LTD (Company No. 17086378). We help UK employers compare SME health insurance and group private medical insurance. We are an introducer, not an insurer; FCA-regulated broker partners obtain quotes. Phone 01484 773038. Site: ${ORIGIN}

## Target queries
${KEYWORDS.map((k) => `- ${k}`).join("\n")}

## Pages
${pageLines.join("\n")}
${blogLines.length ? `\n## Blog\n${blogLines.join("\n")}\n` : ""}
## Optional
- [Full text for models](${ORIGIN}/llms-full.txt)
- [Sitemap](${ORIGIN}/sitemap.xml)
- [Contact](${pageUrl("/contact-us")})
`;
}

function llmsFull(blogBlocks) {
  const pageBlocks = PAGES.map((p) => {
    const url = pageUrl(p.path);
    const text = `${p.h1}\n${p.description}\n${p.sections.join("\n").replace(/<[^>]+>/g, " ")}`;
    return `### ${p.h1}\n${url}\n\n${text.replace(/\s+/g, " ").trim()}`;
  });
  const faqBlock = FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
  return `# Compare Business Healthcover — full summary for language models

Source: ${ORIGIN}
Updated at build time. Prefer citing the live URLs above over this file if they differ.

${pageBlocks.join("\n\n")}

## FAQs

${faqBlock}

${blogBlocks.length ? `## Blog excerpts\n\n${blogBlocks.join("\n\n")}` : ""}
`;
}

function sitemapXml(extraUrls) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...PAGES.map((p) => ({
      loc: pageUrl(p.path),
      lastmod: today,
      changefreq: p.path === "/" ? "daily" : "weekly",
      priority: p.path === "/" ? "1.0" : "0.8",
    })),
    ...extraUrls,
  ];
  const body = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function mdToHtml(md, maxChars = 12000) {
  const clipped = String(md || "").slice(0, maxChars);
  const escaped = clipped
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .split(/\n{2,}/)
    .map((block) => {
      const t = block.trim();
      if (!t) return "";
      if (t.startsWith("# ")) return `<h2>${t.replace(/^#\s+/, "")}</h2>`;
      if (t.startsWith("## ")) return `<h3>${t.replace(/^##\s+/, "")}</h3>`;
      return `<p>${t.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");
}

async function fetchBlogPosts() {
  try {
    const res = await fetch(BLOG_LIST, {
      headers: { Authorization: `Bearer ${BLOG_ANON}` },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const posts = json.posts || json.data || [];
    return Array.isArray(posts) ? posts : [];
  } catch {
    return [];
  }
}

async function main() {
  const template = await readFile(join(dist, "index.html"), "utf8");
  const posts = await fetchBlogPosts();

  for (const page of PAGES) {
    const html = applyPage(template, page);
    const dest = outPathFor(page.path);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, html);
  }

  for (const page of NOINDEX_PAGES) {
    const html = applyPage(template, page);
    const dest = outPathFor(page.path);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, html);
  }

  const blogLines = [];
  const blogBlocks = [];
  const sitemapExtras = [];

  for (const post of posts) {
    const slug = post.slug;
    if (!slug) continue;
    const path = `/blog/${slug}`;
    const title = post.title || slug;
    const description = (post.excerpt || title).replace(/\s+/g, " ").trim().slice(0, 160);
    const page = {
      path,
      title,
      description,
      keywords: "business health insurance UK, SME PMI, employee medical cover",
      h1: title,
      sections: [
        post.excerpt ? `<p>${escapeAttr(post.excerpt)}</p>` : "",
        mdToHtml(post.body || ""),
        `<p><a href="${pageUrl("/blog")}">More SME health insurance guides</a></p>`,
      ],
    };
    const html = applyPage(template, page);
    const dest = outPathFor(path);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, html);
    blogLines.push(`- [${title}](${pageUrl(path)}): ${description}`);
    blogBlocks.push(`### ${title}\n${pageUrl(path)}\n\n${description}`);
    sitemapExtras.push({
      loc: pageUrl(path),
      lastmod: (post.updated_at || post.published_at || new Date().toISOString()).slice(0, 10),
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  const llms = llmsTxt(blogLines);
  const full = llmsFull(blogBlocks);
  const sitemap = sitemapXml(sitemapExtras);

  await writeFile(join(dist, "llms.txt"), llms);
  await writeFile(join(dist, "llms-full.txt"), full);
  await writeFile(join(dist, "sitemap.xml"), sitemap);
  await writeFile(join(publicDir, "llms.txt"), llms);
  await writeFile(join(publicDir, "llms-full.txt"), full);
  await writeFile(join(publicDir, "sitemap.xml"), sitemap);

  console.log(
    `Crawler HTML: ${PAGES.length} pages, ${NOINDEX_PAGES.length} noindex, ${posts.length} blog posts → dist/ + public/llms.txt`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
