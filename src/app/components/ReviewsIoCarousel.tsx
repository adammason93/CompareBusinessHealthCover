import { useEffect, useState } from "react";
import {
  buildReviewsCarouselEmbedHtml,
  getReviewsIoCarouselConfig,
  REVIEWS_IO_STORE,
} from "@/config/reviewsIoCarousel";

/**
 * Reviews.io carousel runs inside a blob-document iframe so script order matches the dashboard embed
 * (load dist.js, then `new carouselInlineWidget(...)`) without React timing issues on the main page.
 */
export function ReviewsIoCarousel() {
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  useEffect(() => {
    const config = getReviewsIoCarouselConfig(REVIEWS_IO_STORE);
    const html = buildReviewsCarouselEmbedHtml(config);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);
    return () => {
      URL.revokeObjectURL(url);
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
        {iframeSrc ? (
          <iframe
            title="Customer reviews from Reviews.io"
            src={iframeSrc}
            className="w-full min-h-[520px] border-0 bg-transparent rounded-lg"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div
            className="w-full min-h-[320px] rounded-lg bg-gray-100 animate-pulse"
            aria-hidden
          />
        )}
      </div>
    </section>
  );
}
