/** OpenAI Ads Measurement Pixel helpers (oaiq). */

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

export function setOpenaiPixelConsent(granted: boolean): void {
  if (typeof window.oaiq !== "function") return;
  window.oaiq("consent", granted);
}

/** Fire when a lead form / quote request succeeds. */
export function measureLeadCreated(): void {
  if (typeof window.oaiq !== "function") return;
  window.oaiq("measure", "lead_created", {
    type: "customer_action",
  });
}
