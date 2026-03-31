import { useEffect, useRef } from "react";
import {
  getReviewsIoCarouselConfig,
  REVIEWS_IO_STORE,
  REVIEWS_IO_URLS,
  WIDGET_CONTAINER_ID,
} from "@/config/reviewsIoCarousel";

declare global {
  interface Window {
    /** Reviews.io defines this as a plain function, not a constructor — do not use `new`. */
    carouselInlineWidget?: (elementId: string, config: unknown) => void;
  }
}

function ensureStylesheet(href: string, marker: string): void {
  if (document.querySelector(`link[data-reviewsio-carousel="${marker}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.reviewsioCarousel = marker;
  document.head.appendChild(link);
}

/**
 * Inject script once, then wait until `window.carouselInlineWidget` exists.
 * Handles cached scripts and React Strict Mode where `load` may have already fired before we subscribe.
 */
async function ensureCarouselScriptLoaded(src: string): Promise<void> {
  let script = document.querySelector<HTMLScriptElement>(`script[data-reviewsio-carousel-script="1"]`);

  if (!script) {
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      /* Match dashboard embed: no async — avoids racing React paint / other scripts. */
      s.async = false;
      s.dataset.reviewsioCarouselScript = "1";
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Reviews.io script failed to load"));
      document.head.appendChild(s);
      script = s;
    });
  }

  const deadline = Date.now() + 15000;
  while (!window.carouselInlineWidget && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 50));
  }
  if (!window.carouselInlineWidget) {
    throw new Error("Reviews.io: carouselInlineWidget not available after script load");
  }
}

/**
 * Reviews.io iframeless carousel — matches dashboard “Widget installation” embed.
 */
export function ReviewsIoCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    ensureStylesheet(REVIEWS_IO_URLS.carouselCss, "widget");
    ensureStylesheet(REVIEWS_IO_URLS.iconsCss, "icons");

    const run = async () => {
      try {
        await ensureCarouselScriptLoaded(REVIEWS_IO_URLS.script);
      } catch {
        return;
      }
      if (cancelled || !rootRef.current) return;

      const init = window.carouselInlineWidget;
      if (!init) return;

      const config = getReviewsIoCarouselConfig(REVIEWS_IO_STORE);
      try {
        // Let layout commit so the widget can measure the container (empty carousels otherwise).
        await new Promise<void>((r) => requestAnimationFrame(() => r()));
        if (cancelled || !rootRef.current) return;
        /* Plain call — `new` breaks Reviews.io’s non-constructor function (can throw / no-op). */
        init(WIDGET_CONTAINER_ID, config);
      } catch (e) {
        console.error("Reviews.io carousel failed to initialize:", e);
      }
    };

    void run();

    return () => {
      cancelled = true;
      if (rootRef.current) {
        rootRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section
      className="py-14 sm:py-16 bg-gray-50 border-t border-gray-200"
      aria-labelledby="reviewsio-carousel-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="reviewsio-carousel-heading"
          className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2"
        >
          Customer reviews
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Independent feedback from Reviews.io — verified customers who used HealthCoverComparison.
        </p>
        <div
          id={WIDGET_CONTAINER_ID}
          ref={rootRef}
          className="w-full min-h-[320px] reviewsio-carousel-root"
        />
      </div>
    </section>
  );
}
