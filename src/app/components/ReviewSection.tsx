import { ExternalLink, Star } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { REVIEWS_IO_PUBLIC_PAGE_URL } from "@/config/reviewsIoCarousel";

/**
 * Ask for feedback on Reviews.io (no Google account required). Carousel of live reviews sits below on the landing page.
 */
export function ReviewSection() {
  return (
    <section className="py-12 sm:py-14 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Leave us a review
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Share your experience on{" "}
          <span className="font-medium text-gray-800">Reviews.io</span> — any email works; unlike Google
          reviews, your guests don&apos;t need a Google account.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-left">
          <div className="flex flex-col items-center text-center sm:text-left sm:items-start gap-6">
            <div className="w-full">
              <div className="flex items-center justify-center sm:justify-start gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed mb-2">
                &ldquo;Easy to use and clear to understand. The comparison made it simple to see different health
                insurance options without any pressure. Would recommend if you want a quick and hassle-free way to
                compare policies.&rdquo;
              </p>
              <p className="text-xs font-semibold text-gray-900">— Adam</p>
            </div>

            <Button
              asChild
              className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white rounded-full px-8 py-6 text-base gap-2"
            >
              <a href={REVIEWS_IO_PUBLIC_PAGE_URL} target="_blank" rel="noopener noreferrer">
                Review us on Reviews.io
                <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
              </a>
            </Button>

            <p className="text-sm text-gray-600">
              More verified reviews are shown in the carousel just below — thank you for helping others choose with
              confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
