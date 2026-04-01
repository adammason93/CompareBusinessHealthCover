import { useEffect } from "react";
import { REVIEWS_IO_STORE } from "@/config/reviewsIoCarousel";

const BADGE_SCRIPT_SRC = "https://widget.reviews.io/badge-modern/dist.js";
const CONTAINER_ID = "reviewsio-footer-badge";

type ReviewsBadgeModernFn = (
  elementId: string,
  options: { store: string; primaryClr: string; starsClr: string },
) => void;

/**
 * Reviews.io “modern” badge (footer). Loads script once; teal matches homepage widget.
 */
export function ReviewsIoFooterBadge() {
  useEffect(() => {
    let cancelled = false;

    const cfg = {
      store: REVIEWS_IO_STORE,
      primaryClr: "#009689",
      starsClr: "#009689",
    };

    const run = () => {
      if (cancelled) return;
      const el = document.getElementById(CONTAINER_ID);
      const badge = (window as Window & { reviewsBadgeModern?: ReviewsBadgeModernFn }).reviewsBadgeModern;
      if (!el || !badge) return;
      el.innerHTML = "";
      badge(CONTAINER_ID, cfg);
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${BADGE_SCRIPT_SRC}"]`);
    if (existing) {
      if ((window as Window & { reviewsBadgeModern?: ReviewsBadgeModernFn }).reviewsBadgeModern) {
        run();
      } else {
        existing.addEventListener("load", run, { once: true });
      }
      return () => {
        cancelled = true;
        existing.removeEventListener("load", run);
        const el = document.getElementById(CONTAINER_ID);
        if (el) el.innerHTML = "";
      };
    }

    const script = document.createElement("script");
    script.src = BADGE_SCRIPT_SRC;
    script.async = true;
    script.onload = () => run();
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      const el = document.getElementById(CONTAINER_ID);
      if (el) el.innerHTML = "";
    };
  }, []);

  return <div id={CONTAINER_ID} className="max-w-[160px]" />;
}
