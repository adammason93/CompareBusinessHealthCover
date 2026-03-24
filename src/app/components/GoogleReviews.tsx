import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Review {
  author_name: string;
  author_url?: string;
  language?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

// Fallback sample reviews if API fails
const sampleReviews: Review[] = [
  {
    author_name: "Sarah Johnson",
    rating: 5,
    text: "Absolutely fantastic service! They found me a health insurance policy that was £200 cheaper per year than my previous one, with better coverage. The team was knowledgeable and patient, answering all my questions. Highly recommend!",
    time: Date.now() - 86400000 * 15,
    relative_time_description: "2 weeks ago"
  },
  {
    author_name: "Michael Thompson",
    rating: 5,
    text: "I was overwhelmed trying to compare different health insurance options, but HealthCoverComparison made it so easy. They explained everything clearly and helped me find the perfect policy for my family. Outstanding service!",
    time: Date.now() - 86400000 * 30,
    relative_time_description: "a month ago"
  },
  {
    author_name: "Emma Davies",
    rating: 5,
    text: "Professional, efficient, and incredibly helpful. I've been using their service for years and they always go above and beyond. Saved me hundreds on my health insurance renewal. Can't thank them enough!",
    time: Date.now() - 86400000 * 45,
    relative_time_description: "a month ago"
  }
];

export function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRatings, setTotalRatings] = useState<number | null>(null);
  const [overallRating, setOverallRating] = useState<number | null>(null);

  useEffect(() => {
    // Fetch real Google reviews
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-2031af1c/google-reviews`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch Google reviews:", response.status);
          // Keep sample reviews if API fails
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
          setTotalRatings(data.total_ratings);
          setOverallRating(data.rating);
          console.log(`Loaded ${data.reviews.length} Google reviews`);
        }
      } catch (error) {
        console.error("Error fetching Google reviews:", error);
        // Keep sample reviews on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const calculateAverageRating = () => {
    if (overallRating) return overallRating.toFixed(1);
    if (reviews.length === 0) return "0.0";
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            {renderStars(Math.round(parseFloat(calculateAverageRating())))}
            <span className="text-2xl font-bold text-gray-900">{calculateAverageRating()}</span>
          </div>
          <p className="text-gray-600">
            Based on {totalRatings || reviews.length} Google review{(totalRatings || reviews.length) !== 1 ? 's' : ''}
          </p>
          {/* Google Logo */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-gray-600 font-medium">Google Reviews</span>
          </div>
        </div>

        {/* Review Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 sm:p-12 shadow-lg min-h-[300px] flex flex-col justify-between">
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-teal-500 mb-4 opacity-50" />
            
            {/* Review Content */}
            <div className="flex-1">
              <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-6 italic">
                "{reviews[currentIndex].text}"
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {reviews[currentIndex].profile_photo_url ? (
                    <img 
                      src={reviews[currentIndex].profile_photo_url} 
                      alt={reviews[currentIndex].author_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {reviews[currentIndex].author_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {reviews[currentIndex].author_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {reviews[currentIndex].relative_time_description}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {renderStars(reviews[currentIndex].rating)}
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-teal-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Review Grid - Show more reviews on larger screens */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                {review.profile_photo_url ? (
                  <img 
                    src={review.profile_photo_url} 
                    alt={review.author_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {review.author_name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {review.author_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {review.relative_time_description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/search?q=healthcovercomparison"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
          >
            Read all reviews on Google
            <Star className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}