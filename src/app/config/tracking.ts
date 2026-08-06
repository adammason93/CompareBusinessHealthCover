/** Lead attribution for paid/partner traffic (stored for the session). */

const STORAGE_KEY = "cbhc_lead_attribution";

export type LeadAttribution = {
  source: string;
  /** Optional campaign / medium for reporting */
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPath?: string;
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

/**
 * Capture tracking from the current URL.
 * Supports:
 * - /chatgpt (or /chatgpt-ads)
 * - ?utm_source=chatgpt&utm_medium=cpc&utm_campaign=...
 * - ?src=chatgpt
 */
export function captureLeadAttributionFromLocation(
  pathname = window.location.pathname,
  search = window.location.search,
): LeadAttribution | null {
  const path = routeKeyFromPathname(pathname).toLowerCase();
  const params = new URLSearchParams(search);

  const utmSource = (params.get("utm_source") || "").trim();
  const utmMedium = (params.get("utm_medium") || "").trim();
  const utmCampaign = (params.get("utm_campaign") || "").trim();
  const srcParam = (params.get("src") || params.get("source") || "").trim();

  let source: string | undefined = PATH_SOURCE_MAP[path];

  if (!source) {
    const hint = (utmSource || srcParam).toLowerCase();
    if (hint.includes("chatgpt") || hint === "gpt" || hint === "openai") {
      source = "ChatGPT";
    }
  }

  if (!source) return getLeadAttribution();

  const attr: LeadAttribution = {
    source,
    utmSource: utmSource || undefined,
    utmMedium: utmMedium || undefined,
    utmCampaign: utmCampaign || undefined,
    landingPath: path || "/",
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
} {
  const attr = getLeadAttribution();
  if (!attr) return {};
  return {
    source: attr.source,
    utmSource: attr.utmSource,
    utmMedium: attr.utmMedium,
    utmCampaign: attr.utmCampaign,
    landingPath: attr.landingPath,
  };
}
