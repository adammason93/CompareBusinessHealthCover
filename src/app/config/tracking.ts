/** Lead attribution for paid/partner/AI-referral traffic (stored for the session). */

const STORAGE_KEY = "cbhc_lead_attribution";

export type LeadAttribution = {
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPath?: string;
  landingUrl?: string;
  referrer?: string;
  capturedAt: string;
};

/** Vanity paths used in ads → Source column value in Lead Management. */
const PATH_SOURCE_MAP: Record<string, string> = {
  chatgpt: "ChatGPT",
  "chatgpt-ads": "ChatGPT",
};

function routeKeyFromPathname(pathname: string): string {
  return pathname.replace(/^\//, "").replace(/^index\.html$/i, "").replace(/\/+$/, "");
}

export function saveLeadAttribution(attr: LeadAttribution): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attr));
  } catch {
    /* ignore */
  }
}

export function getLeadAttribution(): LeadAttribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LeadAttribution;
  } catch {
    return null;
  }
}

function sourceFromHint(hint: string): string | undefined {
  const h = hint.toLowerCase();
  if (!h) return undefined;
  if (h.includes("chatgpt") || h.includes("openai") || h === "gpt") return "ChatGPT";
  if (h.includes("grok") || h.includes("x.ai") || h.includes("xai")) return "Grok";
  if (h.includes("perplexity")) return "Perplexity";
  if (h.includes("claude") || h.includes("anthropic")) return "Claude";
  if (h.includes("gemini") || h.includes("bard")) return "Gemini";
  if (h.includes("google")) return "Organic";
  if (h.includes("bing") || h.includes("yahoo") || h.includes("duckduckgo")) return "Organic";
  if (h.includes("facebook") || h.includes("instagram") || h.includes("linkedin") || h.includes("twitter") || h.includes("t.co")) {
    return "Social";
  }
  return undefined;
}

function sourceFromReferrer(referrer: string): string | undefined {
  if (!referrer) return undefined;
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return sourceFromHint(host);
  } catch {
    return sourceFromHint(referrer);
  }
}

/**
 * Capture tracking from the current URL on first landing.
 * Supports vanity paths, UTMs, src=, and document.referrer (ChatGPT/Grok/etc).
 */
export function captureLeadAttributionFromLocation(
  pathname = window.location.pathname,
  search = window.location.search,
  referrer = document.referrer,
): LeadAttribution | null {
  const existing = getLeadAttribution();
  if (existing) return existing;

  const path = routeKeyFromPathname(pathname).toLowerCase();
  const params = new URLSearchParams(search);

  const utmSource = (params.get("utm_source") || "").trim();
  const utmMedium = (params.get("utm_medium") || "").trim();
  const utmCampaign = (params.get("utm_campaign") || "").trim();
  const srcParam = (params.get("src") || params.get("source") || "").trim();

  let source: string | undefined = PATH_SOURCE_MAP[path];
  if (!source) source = sourceFromHint(utmSource || srcParam);
  if (!source && utmMedium.toLowerCase() === "cpc") source = "PPC";
  if (!source) source = sourceFromReferrer(referrer);
  if (!source) source = referrer ? "Organic" : "Direct";

  const attr: LeadAttribution = {
    source,
    utmSource: utmSource || undefined,
    utmMedium: utmMedium || undefined,
    utmCampaign: utmCampaign || undefined,
    landingPath: path || "/",
    landingUrl: `${pathname}${search}`.slice(0, 500),
    referrer: referrer ? referrer.slice(0, 500) : undefined,
    capturedAt: new Date().toISOString(),
  };
  saveLeadAttribution(attr);
  return attr;
}

/** Fields to merge into form / contact payloads. */
export function leadAttributionPayload(): {
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPath?: string;
  landingUrl?: string;
  referrer?: string;
} {
  const attr = getLeadAttribution();
  if (!attr) return {};
  return {
    source: attr.source,
    utmSource: attr.utmSource,
    utmMedium: attr.utmMedium,
    utmCampaign: attr.utmCampaign,
    landingPath: attr.landingPath,
    landingUrl: attr.landingUrl,
    referrer: attr.referrer,
  };
}
