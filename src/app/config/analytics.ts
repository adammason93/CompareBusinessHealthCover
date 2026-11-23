/** Google Tag Manager / GA4 lead events from the website. */

export const LEAD_SUBMITTED_APP_EVENT = "lead_submitted_app";

type LeadType = "quote" | "contact";

/**
 * Push a lead event after a successful 200 from the server.
 *
 * This uses `lead_submitted_app`, not `lead_submitted`.
 * GTM currently also fires `lead_submitted` from a MutationObserver that looks
 * for the old success-page wording. Using a distinct name avoids double-counting
 * until GTM is switched over (see the pull request notes).
 */
export function pushLeadSubmittedApp(details: {
  leadType: LeadType;
  referenceNumber?: string | null;
}): void {
  if (typeof window === "undefined") return;
  const dataLayer = ((window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer =
    (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer || []);
  dataLayer.push({
    event: LEAD_SUBMITTED_APP_EVENT,
    lead_type: details.leadType,
    reference_number: details.referenceNumber || undefined,
  });
}
