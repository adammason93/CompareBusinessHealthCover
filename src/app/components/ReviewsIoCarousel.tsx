/**
 * Reviews.io carousel: loads a static page from /reviews-carousel.html (public/)
 * so script order matches the dashboard embed. No blob: URLs, no sandbox (sandbox can block XHR).
 */
export function ReviewsIoCarousel() {
  return (
    <section
      className="py-8 sm:py-10 bg-gray-50 border-t border-gray-200"
      aria-labelledby="reviewsio-carousel-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="reviewsio-carousel-heading"
          className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-1.5"
        >
          Customer reviews
        </h2>
        <p className="text-center text-gray-600 mb-4 max-w-2xl mx-auto text-sm sm:text-base">
          Independent feedback from Reviews.io — verified customers who used HealthCoverComparison.
        </p>
        <iframe
          title="Customer reviews from Reviews.io"
          src="/reviews-carousel.html"
          className="w-full min-h-[380px] border-0 bg-transparent rounded-lg block"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}
