import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { INSURERS } from "@/app/config/insurers";

interface InsurerCarouselProps {
  onNavigate?: (page: string) => void;
}

export function InsurerCarousel({ onNavigate }: InsurerCarouselProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Detect mobile and set slides dynamically
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      if (width < 768) {
        setSlidesToShow(1); // Mobile: 1 card
      } else if (width < 1024) {
        setSlidesToShow(2); // Tablet: 2 cards
      } else {
        setSlidesToShow(3); // Desktop: 3 cards
      }
    };
    
    updateSlides();
    window.addEventListener('resize', updateSlides);
    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow, // Use state-based value
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    adaptiveHeight: false,
    swipe: true, // Enable swipe
    swipeToSlide: true, // Allow swipe to any slide
    touchMove: true, // Enable touch movement
    touchThreshold: 10, // Sensitivity for swipe
    draggable: true, // Enable mouse drag
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-400 hover:bg-gray-600 transition-colors mt-4"></div>
    ),
    dotsClass: "slick-dots !flex !justify-center !gap-2 !static"
  };

  return (
    <section className="py-12 sm:py-16" style={{ backgroundColor: '#e8ecf1' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4" style={{ color: '#003366' }}>
          Compare Leading Insurers
        </h2>
        <p className="text-center mb-8 sm:mb-12">
          <a
            href="/insurers"
            onClick={(e) => {
              if (onNavigate && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                onNavigate('insurers');
              }
            }}
            className="text-sm font-semibold text-[#003366] underline hover:text-[#0ebcc8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003366] rounded"
          >
            View all insurer guides
          </a>
        </p>
        
        <div className="insurer-carousel-wrapper">
          <Slider {...settings}>
            {INSURERS.map((insurer) => (
              <div key={insurer.slug} className="px-2 sm:px-3">
                <a
                  href={`/${insurer.slug}`}
                  onClick={(e) => {
                    if (
                      onNavigate &&
                      !e.ctrlKey &&
                      !e.metaKey &&
                      !e.shiftKey &&
                      e.button === 0
                    ) {
                      e.preventDefault();
                      onNavigate(insurer.slug);
                    }
                  }}
                  className="block bg-white rounded-lg p-4 sm:p-6 md:p-8 h-64 sm:h-72 md:h-80 flex flex-col items-center justify-between shadow-md hover:shadow-xl transition-shadow cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003366] focus-visible:ring-offset-2"
                >
                  <div className="flex-1 flex items-center justify-center w-full p-4">
                    <img
                      src={insurer.logo}
                      alt={`${insurer.name} logo`}
                      className="max-w-full max-h-full w-auto object-contain"
                      style={{ maxHeight: "120px" }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="text-center mt-4 sm:mt-6 w-full">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-gray-900">
                      {insurer.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {insurer.shortDescription}
                    </p>
                    <span className="inline-block mt-3 text-xs font-semibold text-[#003366] underline">
                      Learn more
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style>{`
        .insurer-carousel-wrapper .slick-slider {
          margin: 0 -8px;
        }
        
        @media (min-width: 640px) {
          .insurer-carousel-wrapper .slick-slider {
            margin: 0 -12px;
          }
        }
        
        .insurer-carousel-wrapper .slick-list {
          overflow: visible;
          padding: 10px 0 !important;
        }
        
        .insurer-carousel-wrapper .slick-track {
          display: flex !important;
          align-items: stretch;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }
        
        .insurer-carousel-wrapper .slick-slide {
          height: inherit !important;
        }
        
        .insurer-carousel-wrapper .slick-slide > div {
          height: 100%;
        }
        
        .insurer-carousel-wrapper .slick-dots {
          bottom: -40px !important;
        }
        
        @media (min-width: 640px) {
          .insurer-carousel-wrapper .slick-dots {
            bottom: -50px !important;
          }
        }
        
        .insurer-carousel-wrapper .slick-dots li {
          margin: 0;
          width: auto;
          height: auto;
        }
        
        .insurer-carousel-wrapper .slick-dots li.slick-active div {
          background-color: #003366 !important;
          width: 30px;
          border-radius: 4px;
        }
        
        /* Only apply opacity transitions on desktop for better mobile performance */
        @media (min-width: 768px) {
          .insurer-carousel-wrapper .slick-slide {
            opacity: 0.6;
            transition: opacity 0.3s ease;
          }
          .insurer-carousel-wrapper .slick-slide.slick-active {
            opacity: 1;
          }
        }

        @media (max-width: 767px) {
          .insurer-carousel-wrapper .slick-slide {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}