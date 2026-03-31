import { useEffect } from "react";
import {
  getReviewsIoCarouselConfig,
  REVIEWS_IO_STORE,
  REVIEWS_IO_URLS,
  REVIEWS_IO_WIDGET_CONTAINER_ID,
} from "@/config/reviewsIoCarousel";

declare global {
  interface Window {
    /** Dashboard embed uses `new carouselInlineWidget(...)` */
    carouselInlineWidget?: new (elementId: string, config: unknown) => unknown;
  }
}

/** If index.html script did not run (e.g. odd cache), inject once. */
function injectCarouselScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="carousel-inline-iframeless"]')) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Reviews.io script"));
    document.head.appendChild(s);
  });
}

async function waitForCarouselInlineWidget(): Promise<void> {
  const deadline = Date.now() + 20000;
  while (!window.carouselInlineWidget && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 40));
  }
  if (window.carouselInlineWidget) return;

  console.warn("Reviews.io: script not on window yet — injecting fallback");
  try {
    await injectCarouselScriptOnce(REVIEWS_IO_URLS.script);
  } catch (e) {
    console.error("Reviews.io: fallback script load failed:", e);
    throw e;
  }

  const deadline2 = Date.now() + 15000;
  while (!window.carouselInlineWidget && Date.now() < deadline2) {
    await new Promise((r) => setTimeout(r, 40));
  }
  if (!window.carouselInlineWidget) {
    throw new Error("Reviews.io: carouselInlineWidget is still undefined after load");
  }
}

/**
 * Reviews.io iframeless carousel — matches dashboard embed (fixed id + `new carouselInlineWidget`).
 */
export function ReviewsIoCarousel() {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        await waitForCarouselInlineWidget();
      } catch (e) {
        console.error("Reviews.io:", e);
        return;
      }
      if (cancelled) return;

      const Ctor = window.carouselInlineWidget;
      if (!Ctor) {
        console.error("Reviews.io: carouselInlineWidget missing");
        return;
      }

      const el = document.getElementById(REVIEWS_IO_WIDGET_CONTAINER_ID);
      if (!el) {
        console.error("Reviews.io: container #reviewsio-carousel-widget not in DOM");
        return;
      }
      if (el.querySelector(".CarouselWidget-prefix")) {
        return;
      }

      const config = getReviewsIoCarouselConfig(REVIEWS_IO_STORE);
      try {
        await new Promise<void>((r) => {
          requestAnimationFrame(() => requestAnimationFrame(() => r()));
        });
        if (cancelled) return;
        if (!document.getElementById(REVIEWS_IO_WIDGET_CONTAINER_ID)) return;

        new Ctor(REVIEWS_IO_WIDGET_CONTAINER_ID, config);
      } catch (e) {
        console.error("Reviews.io carousel init threw:", e);
      }
    };

    void run();

    return () => {
      cancelled = true;
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
          id={REVIEWS_IO_WIDGET_CONTAINER_ID}
          className="w-full min-h-[320px] reviewsio-carousel-root"
        />
      </div>
    </section>
  );
}
