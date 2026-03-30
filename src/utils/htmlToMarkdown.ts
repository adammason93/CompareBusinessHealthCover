import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "_",
  strongDelimiter: "**",
});
turndown.use(gfm);

/**
 * Converts clipboard HTML (Word, Google Docs, web pages) to GitHub-flavoured Markdown
 * so pasted content keeps headings, bold, lists, links, and tables.
 */
export function clipHtmlToMarkdown(html: string): string | null {
  const trimmed = html.trim();
  if (trimmed.length < 3) return null;

  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("script, style, noscript, iframe").forEach((el) => el.remove());
  const body = doc.body;
  const text = body.textContent?.trim() ?? "";
  const hasBlockOrMedia =
    body.querySelector("img, table, hr, br") ||
    body.querySelector("h1,h2,h3,h4,h5,h6,strong,b,em,i,ul,ol,li,blockquote,pre,code");
  if (text.length === 0 && !hasBlockOrMedia) return null;

  let md = turndown.turndown(body.innerHTML);
  md = md.replace(/\n{3,}/g, "\n\n").trim();
  if (!md) return null;
  return md;
}

/** Replaces common unicode bullets with Markdown list markers when pasting plain text. */
export function normalizePlainPasteBullets(text: string): string {
  return text
    .split("\n")
    .map((line) => line.replace(/^(\s*)[•·▪▸]\s+/u, "$1- "))
    .join("\n");
}
