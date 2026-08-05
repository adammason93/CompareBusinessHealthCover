import { Shield, Check, Star, ArrowRight, ChevronDown, Heart, Home as HomeIcon, FileText } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, MessageCircle, Phone, Mail, TrendingUp, Headphones, PiggyBank } from "lucide-react";
import { useState, useEffect, useRef, memo } from "react";
import { ContactFormModal } from "@/app/components/ContactFormModal";
import { Users, Building2 } from "lucide-react";
import { FAQSection } from "@/app/components/FAQSection";
import { ChatBot } from "@/app/components/ChatBot";
import { Header } from "@/app/components/Header";
import { LandingPageProps } from "@/app/components/LandingPageProps";
import { ReviewSection } from "@/app/components/ReviewSection";
import { Footer } from "@/app/components/Footer";
import { InsurerCarousel } from "@/app/components/InsurerCarousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SITE } from "@/app/config/site";
import { LOGO } from "@/app/config/brand";

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
  const bannerSentinelRef = useRef<HTMLDivElement>(null);

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
    priceMatch: {
      title: "Price Match Guarantee",
      icon: <PiggyBank className="w-12 h-12 text-yellow-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Our brokers are so confident in their ability to find you the best deals that they offer a comprehensive price match guarantee. If you find a cheaper quote for the same level of cover elsewhere, they'll match it or beat it.
          </p>
          <h4 className="font-semibold text-gray-900 text-lg">How It Works:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Find a cheaper quote for identical cover with the same insurer</li>
            <li>Provide our brokers with proof of the competing quote within 7 days</li>
            <li>They'll verify the details and match or beat the price</li>
            <li>Your new policy will include all the same benefits and coverage</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Our brokers' price match guarantee ensures you always get the most competitive rates available in the market, giving you complete peace of mind that you're getting the best value for your money.
          </p>
        </div>
      )
    },
    noObligation: {
      title: "No-Obligation Quotes",
      icon: <MessageCircle className="w-12 h-12 text-brand-teal" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Getting a quote from us is completely complimentary and comes with absolutely no obligation to purchase. We believe in empowering you to make informed decisions without any pressure or commitment.
          </p>
          <h4 className="font-semibold text-gray-900 text-lg">What This Means For You:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Compare quotes at your own pace with zero pressure</li>
            <li>Take time to review options with your leadership team</li>
            <li>No sales calls or pushy follow-ups - we respect your time</li>
            <li>Complete transparency with no hidden fees or charges</li>
            <li>Walk away at any time with no consequences</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Our goal is to provide you with the information you need to make the right choice for your health insurance needs. You're in control every step of the way.
          </p>
        </div>
      )
    },
    allInsurers: {
      title: "Market Leading Insurance",
      icon: <TrendingUp className="w-12 h-12 text-brand-teal" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            We work with all of the UK's leading health insurance providers to ensure you have access to the widest range of policies and the most competitive prices available.
          </p>
          <h4 className="font-semibold text-gray-900 text-lg">Our Partner Insurers Include:</h4>
          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="bg-gray-50 p-3 rounded-lg text-center font-semibold text-gray-900">Bupa</div>
            <div className="bg-gray-50 p-3 rounded-lg text-center font-semibold text-gray-900">AXA Health</div>
            <div className="bg-gray-50 p-3 rounded-lg text-center font-semibold text-gray-900">Vitality</div>
            <div className="bg-gray-50 p-3 rounded-lg text-center font-semibold text-gray-900">Aviva</div>
            <div className="bg-gray-50 p-3 rounded-lg text-center font-semibold text-gray-900">WPA</div>
            <div className="bg-gray-50 p-3 rounded-lg text-center font-semibold text-gray-900">The Exeter</div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            By comparing quotes from multiple top-rated insurers in one place, you save time and can be confident you're seeing the full market. Each insurer offers different strengths, policy options, and pricing structures, so comparing ensures you find the perfect fit for your needs and budget.
          </p>
        </div>
      )
    },
    independent: {
      title: "Independent & Impartial",
      icon: <Shield className="w-12 h-12 text-yellow-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            As an independent comparison service, our FCA regulated broker partners are not tied to any single insurance provider. Their advice is impartial and focused on finding the right group scheme for your business and workforce.
          </p>
          <h4 className="font-semibold text-gray-900 text-lg">Why Independence Matters:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Our broker partners have no bias towards any particular insurer or product</li>
            <li>Their recommendations are based purely on your needs and budget</li>
            <li>They're not incentivized to sell you more expensive policies</li>
            <li>Complete transparency in how they present options to you</li>
            <li>They work for you, not the insurance companies</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            This independence ensures you receive honest, objective guidance that puts your interests first. Our FCA regulated broker partners are here to help you navigate the complex world of health insurance with confidence.
          </p>
        </div>
      )
    },
    expertAdvice: {
      title: "Expert Advice",
      icon: <Headphones className="w-12 h-12 text-pink-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Our FCA regulated broker partners are qualified health insurance specialists with years of industry experience to help you understand your options and make informed decisions about your health cover.
          </p>
          <h4 className="font-semibold text-gray-900 text-lg">Our Broker Partners Provide:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Personalised advice tailored to your unique health needs</li>
            <li>Clear explanations of policy terms, exclusions, and benefits</li>
            <li>Guidance on the right level of cover for your situation</li>
            <li>Help understanding medical underwriting and pre-existing conditions</li>
            <li>Ongoing support even after you've purchased your policy</li>
            <li>Assistance with claims processes and policy queries</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Whether you're buying health insurance for the first time or looking to switch providers, our FCA regulated broker partners are available to answer your questions and guide you through every step of the process.
          </p>
        </div>
      )
    },
    saveHassle: {
      title: "Save Yourself the Hassle",
      icon: <Check className="w-12 h-12 text-pink-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            We understand that comparing health insurance policies can be time-consuming and overwhelming. That's why we do all the hard work for you, making the entire process simple, quick, and stress-free.
          </p>
          <h4 className="font-semibold text-gray-900 text-lg">We Handle Everything:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Thousands of policy options in minutes, not hours</li>
            <li>We contact multiple insurers on your behalf</li>
            <li>Simplified comparison tables showing key differences</li>
            <li>All quotes presented in one easy-to-understand format</li>
            <li>We handle all the paperwork and administration</li>
            <li>Smooth transition if you're switching providers</li>
            <li>Ongoing support for renewals and policy changes</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Instead of spending hours researching and contacting individual insurers, you can complete one simple form and let us do the rest. We'll present you with the best options matched to your needs, saving you valuable time and effort.
          </p>
        </div>
      )
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 circle-pattern">
      <Header
        onGetStarted={onGetStarted}
        onNavigate={(page) => onNavigate?.(page)}
        onOpenAuth={onOpenAuth}
        onLogout={onLogout}
        onViewSubmissions={onViewSubmissions}
        user={user}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden circle-pattern" style={{ backgroundColor: '#1D2D50' }}>
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-30">
          <ImageWithFallback 
            src={LOGO.businessHandshake}
            alt="Business team discussing employee health cover"
            className="w-full h-full object-cover object-right"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1D2D50] via-[#1D2D50]/80 to-transparent"></div>
        </div>
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
                Compare SME health insurance and give your team the cover they deserve.
              </h1>
            </div>
            
            {/* Right Column - Benefits & Buttons */}
            <div>
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <HeroTypewriter />
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
                  <span className="text-white text-base sm:text-lg">Cover from just 2 employees — built for growing SMEs</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
                  <span className="text-white text-base sm:text-lg">Attract and retain staff with valued employee benefits</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <button 
                  onClick={onGetStarted} 
                  className="button-hover-animate bg-white hover:bg-gray-100 text-black rounded-full px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-medium shadow-lg cursor-pointer w-full sm:w-auto text-center"
                >
                  Get an SME quote <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 inline-block" />
                </button>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="button-hover-animate bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-medium shadow-lg cursor-pointer w-full sm:w-auto text-center"
                >
                  Get in touch
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits Strip - Dark Background */}
        <div className="border-t border-gray-600 text-white" style={{ backgroundColor: '#1a2847' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-white" />
                <span className="text-white">Tax-efficient employee health benefits for UK SMEs</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-white" />
                <span className="text-white">Flexible cover for teams of 2 to 250+ employees</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-white" />
                <span className="text-white">Compare quotes from leading UK business insurers</span>
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
              <span className="text-xs sm:text-sm">Trusted by UK Businesses</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-900">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-brand-teal-hover" />
              <span className="text-xs sm:text-sm">Leading Business Insurers</span>
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
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-brand-teal hover:text-brand-teal text-xs sm:text-sm transition-colors whitespace-nowrap"
            >
              Compare business cover options
            </button>
            <button 
              onClick={() => scrollToSection('why-health-insurance')}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-brand-teal hover:text-brand-teal text-xs sm:text-sm transition-colors whitespace-nowrap"
            >
              Why offer employee cover?
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-brand-teal hover:text-brand-teal text-xs sm:text-sm transition-colors whitespace-nowrap"
            >
              How group schemes work
            </button>
            <button 
              onClick={() => scrollToSection('why-use-us')}
              className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-brand-teal hover:text-brand-teal text-xs sm:text-sm transition-colors whitespace-nowrap"
            >
              Why use us?
            </button>
          </div>
        </div>
      </section>

      {/* Insurer Carousel */}
      <InsurerCarousel />

      {/* How Do We Work Section - Find Your Best Health Cover */}
      <section id="find-best-cover" className="py-20 pb-0" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-center text-gray-900 mb-4">
            Compare <span style={{ fontWeight: 900 }}>employee health cover</span> for your business
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            UK employers use us to compare group health insurance from leading providers — saving time, controlling costs, and building benefits packages that help attract and retain staff.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-8 pb-32">
            <div 
              onClick={() => setBenefitModalOpen('priceMatch')}
              className="bg-white rounded-lg p-8 shadow-sm text-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-40 rounded-xl mx-auto mb-6 overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1580508174046-170816f65662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWdneSUyMGJhbmslMjBzYXZpbmdzJTIwbW9uZXl8ZW58MXx8fHwxNzcxNTk0OTQ0fDA&ixlib=rb-4.1.0&q=70&w=400"
                  alt="Price Match Guarantee"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-3 font-semibold text-gray-900">Price Match Guarantee</h3>
              <p className="text-gray-600">
                Get a better price elsewhere? We'll match or beat it.
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
                  alt="All leading insurers"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-3 font-semibold text-gray-900">Market Leading Insurance</h3>
              <p className="text-gray-600">
                Compare quotes from the top health insurers.
              </p>
            </div>

            <div 
              onClick={() => setBenefitModalOpen('independent')}
              className="bg-white rounded-lg p-8 shadow-sm text-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-40 rounded-xl mx-auto mb-6 overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1721352794721-9a2f91f8dcbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxhbmNlJTIwc2NhbGVzJTIwanVzdGljZSUyMGZhaXJuZXNzJTIwaW1wYXJ0aWFsfGVufDF8fHx8MTc3MTU5NTkyMXww&ixlib=rb-4.1.0&q=70&w=400"
                  alt="Independent & impartial"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-3 font-semibold text-gray-900">Independent & impartial</h3>
              <p className="text-gray-600">
                Our FCA regulated broker partners provide advice based on what's best for you.
              </p>
            </div>

            <div 
              onClick={() => setBenefitModalOpen('expertAdvice')}
              className="bg-white rounded-lg p-8 shadow-sm text-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-40 rounded-xl mx-auto mb-6 overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1647866427893-0057366e91b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjBzdXBwb3J0JTIwaGVhZHBob25lcyUyMGhlbHB8ZW58MXx8fHwxNzcxNTk0OTQ5fDA&ixlib=rb-4.1.0&q=70&w=400"
                  alt="Expert Advice"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-3 font-semibold text-gray-900">Expert Advice</h3>
              <p className="text-gray-600">
                Expert advisers give you free, impartial help.
              </p>
            </div>

            <div 
              onClick={() => setBenefitModalOpen('saveHassle')}
              className="bg-white rounded-lg p-8 shadow-sm text-center cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-40 rounded-xl mx-auto mb-6 overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1737505191896-8e3cb72e4df9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG9jayUyMHRpbWUlMjBlZmZpY2llbmN5JTIwcHJvZHVjdGl2aXR5fGVufDF8fHx8MTc3MTU1MzEyOXww&ixlib=rb-4.1.0&q=70&w=400"
                  alt="Save yourself the hassle"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-3 font-semibold text-gray-900">Save yourself the hassle</h3>
              <p className="text-gray-600">
                All the hard work done for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Take Out Health Insurance Section */}
      <section id="why-health-insurance" className="relative py-32 overflow-hidden -mt-1" style={{ backgroundColor: '#1f2255' }}>
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-30">
          <ImageWithFallback 
            src={LOGO.businessHandshake}
            alt="Business professionals in meeting"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1f2255]/90 via-[#1f2255]/85 to-[#1f2255]/90"></div>
        </div>
        
        {/* Curved top border */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
            <path d="M0,0 L0,60 Q600,120 1200,60 L1200,0 Z" fill="#f9fafb"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
          <h2 className="text-3xl sm:text-4xl text-center text-white mb-16 font-bold">
            Why offer employee health cover?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12 pb-24">
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
        
        {/* Curved bottom border */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
            <path d="M0,120 L0,60 Q600,0 1200,60 L1200,120 Z" fill="#f9fafb"></path>
          </svg>
        </div>
      </section>

      {/* How Does Health Insurance Work Section */}
      <section id="how-it-works" className="py-16" style={{ backgroundColor: '#f9fafb' }}>
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
                  Premiums are typically paid by the employer, often with tax-efficient treatment as a business expense. Employees may receive cover as a core benefit or on a voluntary basis, depending on the scheme structure.
                </p>
                <p>
                  Our FCA-regulated broker partners help you compare options from leading UK insurers, explain underwriting requirements, and find a scheme suited to your workforce — from small teams of two upwards.
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
                  Tell us about your company size, location, and the level of cover you need. We connect you with specialist brokers who compare group schemes from the UK&apos;s leading business health insurers.
                </p>
                <p>
                  Whether you&apos;re setting up cover for the first time or reviewing an existing scheme at renewal, we simplify the process — one enquiry, multiple competitive quotes, expert guidance throughout.
                </p>
                <p>
                  There is no obligation to proceed. Start with a free SME quote and see what employee health cover could cost your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Us Section */}
      <section id="why-use-us" className="py-16" style={{ backgroundColor: '#16233d' }}>
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
              <span className="text-gray-900">5-Star Defaqto Rated Insurers</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2 shadow-sm">
              <Check className="w-5 h-5 text-brand-teal" />
              <span className="text-gray-900">Expert Broker Guidance</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2 shadow-sm">
              <Check className="w-5 h-5 text-brand-teal" />
              <span className="text-gray-900">Competitive Group Premiums</span>
            </div>
            <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2 shadow-sm">
              <Check className="w-5 h-5 text-brand-teal" />
              <span className="text-gray-900">Trusted by UK Employers</span>
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

      {/* Already Covered Section */}
      <section className="bg-gray-50 py-0">
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <img 
              src={LOGO.businessHandshake}
              alt="Business team reviewing employee benefits"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
          <div className="bg-black text-white p-8 lg:p-12 flex flex-col justify-center" style={{ backgroundColor: '#1D2D50' }}>
            <h2 className="text-3xl lg:text-4xl mb-4">Renewing Your Group Scheme?<br />Compare &amp; Save</h2>
            <p className="text-lg lg:text-xl mb-6">Review your employee health cover before renewal</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                <span className="text-base lg:text-lg">Benchmark against the wider market</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                <span className="text-base lg:text-lg">Reduce group premium costs</span>
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

      {/* Review Section */}
      <ReviewSection />

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* ChatBot */}
      <ChatBot />

      {/* Benefit Details Modal */}
      {benefitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(225, 226, 242, 0.3)' }}>
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
            <div className="sticky bottom-0 bg-gray-50 border-t px-8 py-6 flex justify-end gap-3">
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

      {/* Sticky Bottom Banner */}
      {showStickyBanner && (
        <div 
          className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 transition-transform duration-300 flex justify-center px-2 sm:px-4"
          style={{
            transform: showStickyBanner ? 'translateY(0)' : 'translateY(100%)'
          }}
        >
          <div 
            className="py-3 px-4 sm:py-5 sm:px-6 rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-[85%]"
            style={{ backgroundColor: '#26B4AF' }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-1">
                  Get an SME health insurance quote
                </h3>
                <p className="text-white text-xs sm:text-sm md:text-base">
                  Compare group cover options for your business — free and no obligation
                </p>
              </div>
              <button
                onClick={onGetStarted}
                className="bg-white hover:bg-gray-50 text-gray-900 rounded-full px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base md:text-lg font-semibold transition-colors whitespace-nowrap shadow-lg w-full sm:w-auto"
              >
                Get SME Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}