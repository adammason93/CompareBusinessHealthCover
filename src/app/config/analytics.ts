/** Google Tag Manager / GA4 lead events from the website. */

export const LEAD_SUBMITTED_EVENT = "lead_submitted";

type LeadType = "quote" | "contact";

/**
 * Push a lead event after a successful 200 from the server.
 *
 * Uses `lead_submitted` so the existing live GTM Custom Event trigger
 * ("Lead submitted") can fire the GA4 generate_lead tag. We cannot
 * edit that GTM container from this environment.
 *
 * This does not double-count with the older GTM MutationObserver
 * text listener: that listener only matches wording removed from
 * the success UI in PR #3, and that wording must stay out of the
 * built bundle.
 */
export function pushLeadSubmitted(details: {
  leadType: LeadType;
  referenceNumber?: string | null;
}): void {
  if (typeof window === "undefined") return;
  const dataLayer = ((window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer =
    (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer || []);
  dataLayer.push({
    event: LEAD_SUBMITTED_EVENT,
    lead_type: details.leadType,
    reference_number: details.referenceNumber || undefined,
  });
}
