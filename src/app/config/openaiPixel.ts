/** OpenAI Ads Measurement Pixel helpers (oaiq).
 *  The script is loaded only after marketing consent is given.
 */

const PIXEL_ID = "KonfcdkXumw9Kw5nvJtduo";
const PIXEL_SRC = "https://bzrcdn.openai.com/sdk/oaiq.min.js";

declare global {
  interface Window {
    oaiq?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

function ensureOpenaiStub(): void {
  if (typeof window === "undefined" || window.oaiq) return;
  const q = function (...args: unknown[]) {
    (q as { q: unknown[] }).q.push(args);
  };
  (q as { q: unknown[] }).q = [];
  window.oaiq = q as Window["oaiq"];
}

function injectOpenaiScript(): void {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${PIXEL_SRC}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = PIXEL_SRC;
  document.head.appendChild(script);
}

/** Load the pixel and grant consent. No-ops if marketing cookies are not allowed. */
export function setOpenaiPixelConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  if (!granted) {
    if (typeof window.oaiq === "function") {
      window.oaiq("consent", false);
    }
    return;
  }
  ensureOpenaiStub();
  injectOpenaiScript();
  window.oaiq?.("consent", true);
  window.oaiq?.("init", { pixelId: PIXEL_ID });
}

/** Fire when a lead form / quote request succeeds (only if the pixel was loaded). */
export function measureLeadCreated(): void {
  if (typeof window.oaiq !== "function") return;
  window.oaiq("measure", "lead_created", {
    type: "customer_action",
  });
}
