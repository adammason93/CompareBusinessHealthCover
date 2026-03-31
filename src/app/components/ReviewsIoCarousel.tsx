/**
 * Reviews.io carousel: loads a static page from /reviews-carousel.html (public/)
 * so script order matches the dashboard embed. No blob: URLs, no sandbox (sandbox can block XHR).
 */
export function ReviewsIoCarousel() {
  return (
    <section
      className="py-12 sm:py-14 bg-gradient-to-br from-teal-50 via-sky-50/80 to-blue-50"
      aria-labelledby="reviewsio-carousel-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="reviewsio-carousel-heading"
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-3"
        >
          Customer reviews
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
          Independent feedback from Reviews.io — verified customers who used HealthCoverComparison.
        </p>

        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 sm:p-8 md:p-10">
          <iframe
            title="Customer reviews from Reviews.io"
            src="/reviews-carousel.html"
            className="w-full min-h-[380px] border-0 bg-transparent rounded-xl block"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}
