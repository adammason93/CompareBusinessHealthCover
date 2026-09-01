/** Ping IndexNow after deploy so Bing/ChatGPT candidate indexes see new URLs faster. */
import { GEO_GUIDES } from "../src/app/content/geo-guides.mjs";

const KEY = "4e7c1a9b8f2d46e0a5c3b8d1e6f0a247";
const HOST = "comparebusinesshealthcover.co.uk";
const ORIGIN = `https://${HOST}`;

const extra = [`${ORIGIN}/`, `${ORIGIN}/llms.txt`, `${ORIGIN}/llms-full.txt`, `${ORIGIN}/sitemap.xml`, `${ORIGIN}/blog`];
const urls = [...new Set([...extra, ...GEO_GUIDES.map((g) => `${ORIGIN}${g.path === "/" ? "/" : g.path}`)])];

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: `${ORIGIN}/${KEY}.txt`,
  urlList: urls,
};

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  console.log(`IndexNow ping ${res.status} (${urls.length} URLs)`);
} catch (err) {
  console.warn("IndexNow ping skipped:", err instanceof Error ? err.message : err);
}
