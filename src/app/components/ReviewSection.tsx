import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function ReviewSection() {
  const reviewUrl = "https://search.google.com/local/writereview?placeid=ChIJJ0AV2EEKeUgRAdZzBt6rT10";
  const [rating, setRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch Google rating
    const fetchRating = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2031af1c/google-reviews`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.rating) {
            setRating(data.rating);
            setTotalRatings(data.total_ratings);
          }
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRating();
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-8 h-8">
            <Star className="w-8 h-8 text-gray-300 absolute" />
            <div className="overflow-hidden absolute" style={{ width: '50%' }}>
              <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-8 h-8 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-brand-teal-muted to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Leave Us a Review
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          We'd love to hear about your experience with Compare Business Cover
        </p>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: QR Code */}
            <div className="flex flex-col items-center">
              <p className="text-gray-700 mb-4 font-medium">
                Scan to leave a review
              </p>
              <div className="w-64 h-64 border-4 border-gray-200 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-sm text-gray-600">QR Code</p>
                  <p className="text-xs text-gray-500 mt-2">Scan with your phone</p>
                </div>
              </div>
            </div>

            {/* Right: Link & Info */}
            <div className="flex flex-col items-center justify-center space-y-6">
              {isLoading ? (
                <p className="text-gray-700 leading-relaxed">
                  Loading rating...
                </p>
              ) : (
                <>
                  {rating && (
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-5xl font-bold text-gray-900">{rating.toFixed(1)}</span>
                        <div className="flex flex-col items-start">
                          <div className="flex items-center gap-1">
                            {renderStars(rating)}
                          </div>
                          {totalRatings && (
                            <p className="text-sm text-gray-600 mt-1">
                              Based on {totalRatings.toLocaleString()} reviews
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Adam's Review */}
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic text-sm leading-relaxed mb-2">
                      "Easy to use and clear to understand. The comparison made it simple to see different health insurance options without any pressure. Would recommend if you want a quick and hassle-free way to compare policies."
                    </p>
                    <p className="text-xs font-semibold text-gray-900">
                      - Adam
                    </p>
                  </div>

                  <a
                    href={reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal-hover text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    <Star className="w-5 h-5" />
                    Leave a Google Review
                  </a>

                  <p className="text-sm text-gray-500">
                    It only takes a minute and means the world to us!
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Google Badge */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-sm text-gray-600">Verified by Google</span>
        </div>
      </div>
    </section>
  );
}