/**
 * Trustpilot invite.js — queues `createInvitation` on `window.tp` (loaded from index.html).
 * @see https://support.trustpilot.com/hc/en-us/articles/4406046492690
 */

type TrustpilotInvitation = {
  recipientEmail: string;
  recipientName: string;
  referenceId: string;
  source: string;
};

function sendInvitation(payload: TrustpilotInvitation): void {
  if (typeof window === "undefined") return;
  const tp = (window as unknown as { tp?: (...args: unknown[]) => void }).tp;
  if (typeof tp !== "function") {
    console.warn("Trustpilot: tp() is not available");
    return;
  }
  try {
    tp("createInvitation", payload);
  } catch (e) {
    console.warn("Trustpilot createInvitation failed:", e);
  }
}

/** After a successful insurance quote form submission (EnhancedMultiStepForm). */
export function requestTrustpilotInvitationAfterQuote(data: {
  email?: string;
  firstName?: string;
  lastName?: string;
}): void {
  const email = data.email?.trim();
  if (!email) return;
  const name =
    [data.firstName, data.lastName].filter(Boolean).join(" ").trim() || "Customer";
  sendInvitation({
    recipientEmail: email,
    recipientName: name,
    referenceId: `Quote_${Date.now()}`,
    source: "InvitationScript",
  });
}

/** After a successful contact form submission (name + email). */
export function requestTrustpilotInvitationAfterContact(data: { name?: string; email?: string }): void {
  const email = data.email?.trim();
  if (!email) return;
  const name = data.name?.trim() || "Customer";
  sendInvitation({
    recipientEmail: email,
    recipientName: name,
    referenceId: `Contact_${Date.now()}`,
    source: "InvitationScript",
  });
}
