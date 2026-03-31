import { useEffect, useRef } from "react";
import {
  getReviewsIoCarouselConfig,
  REVIEWS_IO_STORE,
  REVIEWS_IO_URLS,
  WIDGET_CONTAINER_ID,
} from "@/config/reviewsIoCarousel";

declare global {
  interface Window {
    carouselInlineWidget?: new (elementId: string, config: unknown) => unknown;
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

function loadCarouselScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-reviewsio-carousel-script="1"]`);
    if (existing) {
      if (window.carouselInlineWidget) {
        queueMicrotask(() => resolve());
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Reviews.io script failed")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.reviewsioCarouselScript = "1";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Reviews.io script failed"));
    document.head.appendChild(script);
  });
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
        await loadCarouselScript(REVIEWS_IO_URLS.script);
      } catch {
        return;
      }
      if (cancelled || !rootRef.current) return;

      const Widget = window.carouselInlineWidget;
      if (!Widget) return;

      const config = getReviewsIoCarouselConfig(REVIEWS_IO_STORE);
      try {
        new Widget(WIDGET_CONTAINER_ID, config);
      } catch {
        /* ignore */
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
        <div id={WIDGET_CONTAINER_ID} ref={rootRef} className="min-h-[200px]" />
      </div>
    </section>
  );
}
