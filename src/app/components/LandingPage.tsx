import { Shield, Check, Star, ArrowRight, ChevronDown, ChevronUp, Heart, Home as HomeIcon, FileText, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, MessageCircle, Phone, Mail, TrendingUp, Headphones, PiggyBank } from "lucide-react";
import { useState, useEffect, useRef, memo } from "react";
import { ContactFormModal } from "@/app/components/ContactFormModal";
import { Users, Building2 } from "lucide-react";
import { FAQSection } from "@/app/components/FAQSection";
import { GeoGuideBody } from "@/app/components/GeoGuidePage";
import { Header } from "@/app/components/Header";
import { LandingPageProps } from "@/app/components/LandingPageProps";
// Temporarily hidden — Google review account not set up for this site yet
// import { ReviewSection } from "@/app/components/ReviewSection";
import { HomeBlogSection } from "@/app/components/HomeBlogSection";
import { Footer } from "@/app/components/Footer";
import { InsurerCarousel } from "@/app/components/InsurerCarousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SITE } from "@/app/config/site";
import { LOGO } from "@/app/config/brand";

const STICKY_BANNER_MINIMIZED_KEY = "cbhc_sticky_quote_minimized";

const HERO_SENTENCES = [
  "SME Health Insurance From Just 2 Employees",
  'Compare UK Business Health Cover',
  'Protect Your Team & Retain Top Talent',
];

const HeroTypewriter = memo(function HeroTypewriter() {
  const [typewriterText, setTypewriterText] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSentence = HERO_SENTENCES[currentSentenceIndex];
    if (!currentSentence) return;

    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && typewriterText === currentSentence) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typewriterText === '') {
        setIsDeleting(false);
        setCurrentSentenceIndex((prev) => (prev + 1) % HERO_SENTENCES.length);
      } else if (isDeleting) {
        setTypewriterText(currentSentence.substring(0, typewriterText.length - 1));
      } else {
        setTypewriterText(currentSentence.substring(0, typewriterText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, currentSentenceIndex]);

  return (
    <div className="flex items-center gap-3 min-h-[28px] sm:min-h-[32px]">
      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
      <span className="text-white text-base sm:text-lg">{typewriterText}</span>
    </div>
  );
});

export function LandingPage({ onGetStarted, onNavigate, renderEmbeddedForm, onOpenAuth, onLogout, onViewSubmissions, user }: LandingPageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [benefitModalOpen, setBenefitModalOpen] = useState<string | null>(null);
  const [showStickyBanner, setShowStickyBanner] = useState(false);
  const [stickyBannerMinimized, setStickyBannerMinimized] = useState(() => {
    try {
      return sessionStorage.getItem(STICKY_BANNER_MINIMIZED_KEY) === "1";
    } catch {
      return false;
    }
  });
  const bannerSentinelRef = useRef<HTMLDivElement>(null);

  const minimizeStickyBanner = () => {
    setStickyBannerMinimized(true);
    try {
      sessionStorage.setItem(STICKY_BANNER_MINIMIZED_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const expandStickyBanner = () => {
    setStickyBannerMinimized(false);
    try {
      sessionStorage.removeItem(STICKY_BANNER_MINIMIZED_KEY);
    } catch {
      /* ignore */
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    const checkMobile = () => {
      // Debounce resize events
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const isMobileView = window.innerWidth < 1024;
        setIsMobile(isMobileView);
      }, 150);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const sentinel = bannerSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBanner((prev) => {
          const next = !entry.isIntersecting;
          return prev === next ? prev : next;
        });
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const benefitDetails = {
    freeEnquire: {
      title: "Free to enquire",
      icon: <PiggyBank className="w-12 h-12 text-yellow-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            The introduction on this site is free for the employer. You submit company facts; we pass the enquiry to FCA-regulated broker partners. There is no obligation to buy.
          </p>
          <h4 className="font-semibold text-gray-900 text-lg">If you take a policy</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Quotes and policies are arranged by the broker and/or insurer, not by Compare Business Healthcover</li>
            <li>The broker is typically paid by the insurer as commission</li>
            <li>That commission does not usually increase the premium versus going to the same insurer direct</li>
            <li>You can walk away at any stage</li>
          </ul>
        </div>
      )
    },
    noObligation: {
      title: "No-obligation quotes",
      icon: <MessageCircle className="w-12 h-12 text-brand-teal" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Completing the enquiry does not commit you to a policy. Broker partners should explain options so you can review them with your leadership team in your own time.
          </p>
          <h4 className="font-semibold text-gray-900 text-lg">What this means</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Compare quotes without a purchase obligation</li>
            <li>Cover, exclusions and eligibility still depend on the insurer</li>
            <li>Compare Business Healthcover is an introducer, not an insurer</li>
          </ul>
        </div>
      )
    },
    allInsurers: {
      title: "UK group PMI insurers",
      icon: <TrendingUp className="w-12 h-12 text-brand-teal" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Broker partners compare group schemes from insurers willing to quote for your workforce. Panels change. Naming an insurer here is not a recommendation to buy them, and we do not claim to cover every provider in the market.
          </p>
          <h4 className="font-semibold text-gray-900 text-lg">Names that often appear on SME panels</h4>
          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="bg-brand-teal-muted p-3 rounded-lg text-center font-semibold text-gray-900">Bupa</div>
            <div className="bg-brand-teal-muted p-3 rounded-lg text-center font-semibold text-gray-900">AXA Health</div>
            <div className="bg-brand-teal-muted p-3 rounded-lg text-center font-semibold text-gray-900">Vitality</div>
            <div className="bg-brand-teal-muted p-3 rounded-lg text-center font-semibold text-gray-900">Aviva</div>
            <div className="bg-brand-teal-muted p-3 rounded-lg text-center font-semibold text-gray-900">WPA</div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Availability depends on headcount, occupations, location and the broker’s panel at the time of quote.
          </p>
        </div>
      )
    },
    independent: {
      title: "Introducer, not an insurer",
      icon: <Shield className="w-12 h-12 text-yellow-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Compare Business Healthcover is not tied to a single insurer and is not FCA authorised. Personalised advice sits with the FCA-regulated broker who arranges the policy. Brokers are typically paid by insurers if you take cover — that is normal in UK PMI, and it should be disclosed at quote stage.
          </p>
          <h4 className="font-semibold text-gray-900 text-lg">What we will not claim</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>We do not invent “best buy” scores or guaranteed savings</li>
            <li>We do not pretend this website is the regulated adviser</li>
            <li>We do not underwrite or bind policies</li>
          </ul>
        </div>
      )
    },
    expertAdvice: {
      title: "Broker partners",
      icon: <Headphones className="w-12 h-12 text-pink-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            After an enquiry, an FCA-regulated broker partner can explain group scheme options, exclusions, underwriting and renewal. That advice is theirs, not Compare Business Healthcover’s.
          </p>
          <h4 className="font-semibold text-gray-900 text-lg">They can typically help with</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Like-for-like comparisons (same excess, hospital list and outpatient cap)</li>
            <li>Moratorium versus full medical underwriting</li>
            <li>Membership changes and renewal timing</li>
          </ul>
        </div>
      )
    },
    saveHassle: {
      title: "One enquiry",
      icon: <Check className="w-12 h-12 text-pink-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Complete one form with company size, location and the cover you want. We introduce you to a broker who obtains quotes. You still decide whether to proceed; administration of any policy sits with the broker and insurer.
          </p>
        </div>
      )
    }
  };
  
  return (
    <div className="min-h-screen bg-background circle-pattern">
      <Header
        onGetStarted={onGetStarted}
        onNavigate={(page) => onNavigate?.(page)}
        onOpenAuth={onOpenAuth}
        onLogout={onLogout}
        onViewSubmissions={onViewSubmissions}
        user={user}
      />

      {/* Hero Section */}
      <section className="section-hero relative overflow-hidden">
        <div className="relative">
          <div className="section-hero-image">
            <ImageWithFallback 
              src={LOGO.heroOfficeTeam}
              alt="Business team collaborating in a modern office"
              className="object-cover object-right"
              loading="eager"
              fetchpriority="high"
              width={1983}
              height={793}
            />
          </div>
          <div className="section-hero-overlay" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm mb-8 sm:mb-12 text-gray-300">
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              <span>SME Health Insurance</span>
            </div>

            {/* Hero Content */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center pb-16 sm:pb-24">
              {/* Left Column - Heading */}
              <div>
                <p className="text-brand-teal-light text-sm sm:text-base font-semibold uppercase tracking-wide mb-3">
                  For UK Small, Medium and Large Corporate Businesses
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-extrabold text-white">
                  Compare business health insurance for UK SMEs
                </h1>
                <p className="mt-4 text-white/90 text-base sm:text-lg font-medium">
                  Group private medical insurance for employers, typically from two employees. Free introduction to FCA-regulated brokers — we are not an insurer.
                </p>
              </div>
              
              {/* Right Column - Benefits & Buttons */}
              <div className="[text-shadow:0_1px_2px_rgb(0_0_0_/_0.45),0_2px_12px_rgb(30_94_74_/_0.35)]">
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <HeroTypewriter />
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 drop-shadow" />
                    <span className="text-white text-base sm:text-lg font-medium">Cover from just 2 employees — built for growing SMEs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 drop-shadow" />
                    <span className="text-white text-base sm:text-lg font-medium">Attract and retain staff with valued employee benefits</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <button 
                    onClick={onGetStarted} 
                    className="button-hover-animate bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-medium shadow-lg cursor-pointer w-full sm:w-auto text-center [text-shadow:none]"
                  >
                    Get an SME quote <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 inline-block" />
                  </button>
                  <button 
                    onClick={() => setIsContactModalOpen(true)}
                    className="button-hover-animate border-2 border-white text-white hover:bg-white/15 rounded-full px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-medium shadow-lg cursor-pointer w-full sm:w-auto text-center bg-black/20 backdrop-blur-[2px]"
                  >
                    Get in touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits Strip - solid bar below photo (not under the image) */}
        <div className="section-strip relative z-10 border-t border-brand-navy-dark/40 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-white" />
                <span className="text-white">Employer-paid premiums are often a business expense — confirm tax with your accountant</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-white" />
                <span className="text-white">Flexible cover for teams of 2 to 250+ employees</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-white" />
                <span className="text-white">Compare group PMI quotes via FCA-regulated broker partners</span>
              </div>
            </div>
          </div>
        </div>
        <div ref={bannerSentinelRef} className="h-px w-full" aria-hidden="true" />
      </section>

      {/* Trust Section */}
      <section className="bg-white py-4 sm:py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 text-gray-900">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal" />
              <span className="text-xs sm:text-sm">Broker Partners FCA Regulated</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-900">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal-hover" />
              <span className="text-xs sm:text-sm">UK employers, from two staff</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-900">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal-hover" />
              <span className="text-xs sm:text-sm">Group PMI insurers via brokers</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-900">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal" />
              <span className="text-xs sm:text-sm">Employee Benefits Specialists</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-900">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal" />
              <span className="text-xs sm:text-sm">Free SME Quotes</span>
            </div>
          </div>
          
          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-2 max-w-6xl mx-auto">
            <button 
              onClick={() => scrollToSection('find-best-cover')}
              className="px-4 py-2 rounded-full border border-brand-navy/20 bg-brand-teal-muted/40 text-brand-navy hover:border-brand-teal hover:bg-brand-teal-muted hover:text-brand-navy text-xs sm:text-sm transition-colors whitespace-nowrap font-medium"
            >
              Compare business cover options
            </button>
            <button 
              onClick={() => scrollToSection('why-health-insurance')}
              className="px-4 py-2 rounded-full border border-brand-navy/20 bg-brand-teal-muted/40 text-brand-navy hover:border-brand-teal hover:bg-brand-teal-muted hover:text-brand-navy text-xs sm:text-sm transition-colors whitespace-nowrap font-medium"
            >
              Why offer employee cover?
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="px-4 py-2 rounded-full border border-brand-navy/20 bg-brand-teal-muted/40 text-brand-navy hover:border-brand-teal hover:bg-brand-teal-muted hover:text-brand-navy text-xs sm:text-sm transition-colors whitespace-nowrap font-medium"
            >
              How group schemes work
            </button>
            <button 
              onClick={() => scrollToSection('why-use-us')}
              className="px-4 py-2 rounded-full border border-brand-navy/20 bg-brand-teal-muted/40 text-brand-navy hover:border-brand-teal hover:bg-brand-teal-muted hover:text-brand-navy text-xs sm:text-sm transition-colors whitespace-nowrap font-medium"
            >
              Why use us?
            </button>
          </div>

          <nav className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mt-6" aria-label="Key guides">
            {[
              { label: "Business health insurance", page: "business-health-insurance" },
              { label: "How much it costs", page: "sme-health-insurance-cost" },
              { label: "From 2 employees", page: "sme-health-insurance-2-employees" },
              { label: "Tax treatment", page: "business-health-insurance-tax" },
            ].map((item) => (
              <button
                key={item.page}
                type="button"
                onClick={() => onNavigate?.(item.page)}
                className="px-4 py-2 rounded-full bg-brand-navy text-white hover:bg-brand-navy-dark text-xs sm:text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Insurer Carousel */}
      <InsurerCarousel />

      {/* How Do We Work Section - Find Your Best Health Cover */}
      <section id="find-best-cover" className="section-muted py-20 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-center text-gray-900 mb-4">
            Compare <span style={{ fontWeight: 900 }}>employee health cover</span> for your business
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Compare group private medical insurance for UK SMEs through FCA-regulated broker partners. One enquiry, no obligation to buy. We are an introducer, not an insurer.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-8 pb-32">
            <div 
              onClick={() => setBenefitModalOpen('freeEnquire')}
              className="bg-white rounded-lg p-8 shadow-sm text-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-40 rounded-xl mx-auto mb-6 overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1580508174046-170816f65662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWdneSUyMGJhbmslMjBzYXZpbmdzJTIwbW9uZXl8ZW58MXx8fHwxNzcxNTk0OTQ0fDA&ixlib=rb-4.1.0&q=70&w=400"
                  alt="Free to enquire"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-3 font-semibold text-gray-900">Free to enquire</h3>
              <p className="text-gray-600">
                Introduction is free. No obligation to take a policy.
              </p>
            </div>

            <div 
              onClick={() => setBenefitModalOpen('noObligation')}
              className="bg-white rounded-lg p-8 shadow-sm text-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-40 rounded-xl mx-auto mb-6 overflow-hidden">
                <ImageWithFallback 
                  src={LOGO.businessHandshake}
                  alt="No-obligation quotes"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-3 font-semibold text-gray-900">No-obligation quotes</h3>
              <p className="text-gray-600">
                You're never under pressure to buy from our partners.
              </p>
            </div>

            <div 
              onClick={() => setBenefitModalOpen('allInsurers')}
              className="bg-white rounded-lg p-8 shadow-sm text-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-40 rounded-xl mx-auto mb-6 overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1583521214690-73421a1829a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBkb2N1bWVudHMlMjBjb21wYXJpc29uJTIwcGFwZXJ3b3JrfGVufDF8fHx8MTc3MTU5NDk0NXww&ixlib=rb-4.1.0&q=70&w=400"
                  alt="UK group PMI insurers"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-3 font-semibold text-gray-900">UK group PMI insurers</h3>
              <p className="text-gray-600">
                Brokers compare schemes from insurers willing to quote your workforce.
              </p>
            </div>

            <div 
              onClick={() => setBenefitModalOpen('independent')}
              className="bg-white rounded-lg p-8 shadow-sm text-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-40 rounded-xl mx-auto mb-6 overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1721352794721-9a2f91f8dcbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxhbmNlJTIwc2NhbGVzJTIwanVzdGljZSUyMGZhaXJuZXNzJTIwaW1wYXJ0aWFsfGVufDF8fHx8MTc3MTU5NTkyMXww&ixlib=rb-4.1.0&q=70&w=400"
                  alt="Introducer, not an insurer"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-3 font-semibold text-gray-900">Introducer, not an insurer</h3>
              <p className="text-gray-600">
                We are not FCA authorised. Advice sits with the broker who arranges cover.
              </p>
            </div>

            <div 
              onClick={() => setBenefitModalOpen('expertAdvice')}
              className="bg-white rounded-lg p-8 shadow-sm text-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-40 rounded-xl mx-auto mb-6 overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1647866427893-0057366e91b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjBzdXBwb3J0JTIwaGVhZHBob25lcyUyMGhlbHB8ZW58MXx8fHwxNzcxNTk0OTQ5fDA&ixlib=rb-4.1.0&q=70&w=400"
                  alt="FCA-regulated broker partners"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-3 font-semibold text-gray-900">Broker partners</h3>
              <p className="text-gray-600">
                FCA-regulated brokers explain quotes, exclusions and underwriting.
              </p>
            </div>

            <div 
              onClick={() => setBenefitModalOpen('saveHassle')}
              className="bg-white rounded-lg p-8 shadow-sm text-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-40 rounded-xl mx-auto mb-6 overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1737505191896-8e3cb72e4df9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG9jayUyMHRpbWUlMjBlZmZpY2llbmN5JTIwcHJvZHVjdGl2aXR5fGVufDF8fHx8MTc3MTU1MzEyOXww&ixlib=rb-4.1.0&q=70&w=400"
                  alt="One enquiry"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-3 font-semibold text-gray-900">One enquiry</h3>
              <p className="text-gray-600">
                One form. Brokers obtain the quotes. You decide whether to proceed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Take Out Health Insurance Section */}
      <section id="why-health-insurance" className="relative pt-32 overflow-hidden -mt-1 bg-brand-navy-dark text-white">
        <div className="section-hero-image">
          <ImageWithFallback 
            src={LOGO.businessHandshake}
            alt="Business professionals shaking hands"
            className="object-center"
          />
        </div>
        <div className="section-dark-overlay" />
        
        {/* Curved top border */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
            <path d="M0,0 L0,60 Q600,120 1200,60 L1200,0 Z" fill="var(--brand-surface)"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
          <h2 className="text-3xl sm:text-4xl text-center text-white mb-16 font-bold">
            Why offer employee health cover?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12 pb-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="w-12 h-12 text-brand-teal-light" />
              </div>
              <h3 className="text-xl text-white mb-4 font-semibold">Attract &amp; Retain Talent</h3>
              <p className="text-gray-300 leading-relaxed">
                Group health cover is one of the most valued employee benefits — helping you compete for skilled staff and improve retention in a tight labour market.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Building2 className="w-12 h-12 text-brand-teal-light" />
              </div>
              <h3 className="text-xl text-white mb-4 font-semibold">Reduce Absence &amp; Downtime</h3>
              <p className="text-gray-300 leading-relaxed">
                Faster access to private treatment helps employees return to work sooner, reducing the cost and disruption of long-term sickness absence.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Heart className="w-12 h-12 text-brand-teal-light" />
              </div>
              <h3 className="text-xl text-white mb-4 font-semibold">Support Workforce Wellbeing</h3>
              <p className="text-gray-300 leading-relaxed">
                Demonstrate a genuine commitment to your team&apos;s health — boosting morale, engagement, and your reputation as a responsible employer.
              </p>
            </div>
          </div>
        </div>
        
        {/* Curved bottom — in flow so no straight navy strip under the wave */}
        <div className="relative z-10 -mb-px leading-[0]">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 sm:h-24 block" aria-hidden="true">
            <path d="M0,120 L0,60 Q600,0 1200,60 L1200,120 Z" fill="var(--brand-surface)" />
          </svg>
        </div>
      </section>

      {/* How Does Health Insurance Work Section */}
      <section id="how-it-works" className="section-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl sm:text-4xl text-gray-900 mb-6 text-center font-extrabold">
                How do business health schemes work?
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  A group health insurance policy covers eligible employees under a single scheme arranged by the employer. Cover levels, eligibility rules, and cost-sharing can be tailored to your business size and budget.
                </p>
                <p>
                  Premiums are typically paid by the employer and are often treated as a business expense. Employees usually have a taxable benefit in kind. Confirm the position with your accountant — it is not automatic for every structure.
                </p>
                <p>
                  Our FCA-regulated broker partners help you compare options from UK group PMI insurers willing to quote, explain underwriting requirements, and find a scheme suited to your workforce — from small teams of two upwards.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="text-3xl sm:text-4xl text-gray-900 mb-6 text-center font-extrabold">
                Comparing SME cover with us
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Tell us about your company size, location, and the cover you need. We introduce you to FCA-regulated brokers who compare group schemes from insurers willing to quote.
                </p>
                <p>
                  Whether you&apos;re setting up cover for the first time or reviewing an existing scheme at renewal, one enquiry is enough to start. There is no obligation to proceed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Us Section */}
      <section id="why-use-us" className="bg-brand-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-center text-white mb-12">
            Why Use Us?
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2 shadow-sm">
              <Check className="w-5 h-5 text-brand-teal" />
              <span className="text-gray-900">Free SME Comparison Service</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2 shadow-sm">
              <Check className="w-5 h-5 text-brand-teal" />
              <span className="text-gray-900">Established UK group PMI insurers</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2 shadow-sm">
              <Check className="w-5 h-5 text-brand-teal" />
              <span className="text-gray-900">Broker explains quotes and exclusions</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2 shadow-sm">
              <Check className="w-5 h-5 text-brand-teal" />
              <span className="text-gray-900">Like-for-like quote comparison</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2 shadow-sm">
              <Check className="w-5 h-5 text-brand-teal" />
              <span className="text-gray-900">Used by UK employers</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2 shadow-sm">
              <Check className="w-5 h-5 text-brand-teal" />
              <span className="text-gray-900">FCA Regulated Partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
      <section className="bg-white border-t border-gray-100">
        <h2 className="sr-only">SME health insurance explained</h2>
        <GeoGuideBody slug="home" onNavigate={onNavigate} hideFaqs />
      </section>

      {/* Already Covered Section */}
      <section className="bg-brand-surface py-0">
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <img 
              src={LOGO.businessHandshake}
              alt="Business team reviewing employee benefits"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
          <div className="bg-brand-navy-dark text-white p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-3xl lg:text-4xl mb-4">Renewing your group scheme?<br />Compare before you accept</h2>
            <p className="text-lg lg:text-xl mb-6">Review employee health cover before the renewal date</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                <span className="text-base lg:text-lg">Benchmark against the wider market</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                <span className="text-base lg:text-lg">See whether like-for-like quotes change the premium</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                <span className="text-base lg:text-lg">Maintain continuity for employees</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                <span className="text-base lg:text-lg">Switch providers with broker support</span>
              </div>
            </div>

            <Button 
              onClick={onGetStarted}
              className="bg-white hover:bg-gray-100 text-black rounded-full px-8 py-6 text-lg w-fit"
            >
              Get an SME Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Review Section — temporarily hidden until Google review account is set up */}
      {/* <ReviewSection /> */}

      <HomeBlogSection onNavigate={onNavigate} />

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Benefit Details Modal */}
      {benefitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-brand-teal-muted/80">
                  {benefitDetails[benefitModalOpen as keyof typeof benefitDetails].icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {benefitDetails[benefitModalOpen as keyof typeof benefitDetails].title}
                </h3>
              </div>
              <button 
                onClick={() => setBenefitModalOpen(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-8 py-6">
              {benefitDetails[benefitModalOpen as keyof typeof benefitDetails].content}
            </div>
            <div className="sticky bottom-0 bg-brand-surface border-t px-8 py-6 flex justify-end gap-3">
              <button 
                onClick={() => setBenefitModalOpen(null)}
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-gray-400 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setBenefitModalOpen(null);
                  onGetStarted();
                }}
                className="px-6 py-2 rounded-full bg-brand-teal hover:bg-brand-teal-hover text-white transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Banner — can be minimised so it does not block the page */}
      {showStickyBanner && (
        stickyBannerMinimized ? (
          <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-2">
            <button
              type="button"
              onClick={onGetStarted}
              className="bg-brand-navy hover:bg-brand-navy-dark text-white rounded-full px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold shadow-2xl transition-colors"
            >
              Get SME Quote
            </button>
            <button
              type="button"
              onClick={expandStickyBanner}
              className="bg-white text-brand-navy border border-brand-navy/20 hover:bg-brand-surface rounded-full p-2.5 shadow-lg transition-colors"
              aria-label="Expand quote banner"
              title="Expand"
            >
              <ChevronUp className="w-5 h-5" aria-hidden />
            </button>
          </div>
        ) : (
          <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 transition-transform duration-300 flex justify-center px-2 sm:px-4">
            <div className="relative py-3 px-4 sm:py-5 sm:px-6 rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-[85%] bg-brand-navy">
              <button
                type="button"
                onClick={minimizeStickyBanner}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Minimise quote banner"
                title="Minimise"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
              </button>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 pr-6 sm:pr-8">
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-1">
                    Get an SME health insurance quote
                  </h3>
                  <p className="text-white text-xs sm:text-sm md:text-base">
                    Compare group cover options for your business — free and no obligation
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="bg-white hover:bg-brand-surface text-gray-900 rounded-full px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base md:text-lg font-semibold transition-colors whitespace-nowrap shadow-lg w-full sm:w-auto"
                >
                  Get SME Quote
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}