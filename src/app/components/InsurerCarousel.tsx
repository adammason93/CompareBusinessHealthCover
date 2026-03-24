import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import actual insurer logos
import avivaLogo from "figma:asset/f27ae766f2090ae22284d27eb977968de67a2386.png";
import axaLogo from "figma:asset/d2370dcdfc78ecf9d34f19f1bfb58f10d7a0a9cc.png";
import vitalityLogo from "figma:asset/35ba6cb32b0672a59dd5ec0b1a2874415d706af1.png";
import bupaLogo from "figma:asset/bb73eae9e769649695f636e24ba9475d386cd067.png";
import wpaLogo from "figma:asset/e137f0b6807f0c3dfbe8b9c703ff280e531f7fd2.png";
import exeterLogo from "figma:asset/ac231c13ca3a77f9d871511b895fb1ef59d3d290.png";
import freedomLogo from "figma:asset/7b9e131509196f9ff82a0e820831417e5f0b9ac3.png";
import cignaLogo from "figma:asset/900c5ce0c56bb575096c68054a6adbba46f0c09b.png";

const insurers = [
  {
    name: "Aviva Healthcare",
    description: "UK's largest insurer with award-winning Healthier Solutions.",
    logo: avivaLogo,
  },
  {
    name: "AXA Health",
    description: "Trusted since 1940, offering 5-star Defaqto-rated plans.",
    logo: axaLogo,
  },
  {
    name: "Vitality",
    description: "Innovative plans with rewards for healthy living.",
    logo: vitalityLogo,
  },
  {
    name: "Bupa",
    description: "Leading provider with comprehensive coverage and global network.",
    logo: bupaLogo,
  },
  {
    name: "WPA Provident",
    description: "Non-profit organisation focused on customer experience and co-payment options.",
    logo: wpaLogo,
  },
  {
    name: "Exeter Friendly",
    description: "Mutual society offering flexible health cash plans and personal service.",
    logo: exeterLogo,
  },
  {
    name: "Freedom Health",
    description: "Tailored plans with flexible options for individuals and families.",
    logo: freedomLogo,
  },
  {
    name: "Cigna",
    description: "Global health plans with focus on wellness and preventive care.",
    logo: cignaLogo,
  }
];

export function InsurerCarousel() {
  const sliderRef = useRef<Slider>(null);
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12" style={{ color: '#003366' }}>
          Compare Leading Insurers
        </h2>
        
        <div className="insurer-carousel-wrapper">
          <Slider ref={sliderRef} {...settings}>
            {insurers.map((insurer, index) => (
              <div key={index} className="px-2 sm:px-3">
                <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 h-64 sm:h-72 md:h-80 flex flex-col items-center justify-between shadow-md hover:shadow-xl transition-shadow">
                  <div className="flex-1 flex items-center justify-center w-full p-4">
                    <img 
                      src={insurer.logo} 
                      alt={`${insurer.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      style={{ maxHeight: '140px' }}
                    />
                  </div>
                  
                  <div className="text-center mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-gray-900">
                      {insurer.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {insurer.description}
                    </p>
                  </div>
                </div>
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
          \n          .insurer-carousel-wrapper .slick-slide.slick-active {\n            opacity: 1;\n          }\n        }\n        \n        /* Mobile optimization - no opacity effects */\n        @media (max-width: 767px) {\n          .insurer-carousel-wrapper .slick-slide {\n            opacity: 1;\n          }\n        }\n      `}</style>
    </section>
  );
}