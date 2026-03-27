import { useState, useEffect, lazy, Suspense } from "react";
import { LandingPage } from "@/app/components/LandingPage";
import { EnhancedMultiStepForm } from "@/app/components/EnhancedMultiStepForm";
import { SuccessPage } from "@/app/components/SuccessPage";
import { EmbeddedForm } from "@/app/components/EmbeddedForm";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { AuthModal } from "@/app/components/AuthModal";
import { MySubmissions } from "@/app/components/MySubmissions";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { CookieManager } from "@/app/components/CookieManager";
import { CookieSettingsButton } from "@/app/components/CookieSettingsButton";
import { SEOHead } from "@/app/components/SEOHead";
import { ChatBot } from "@/app/components/ChatBot";
import { SiteChatProvider } from "@/app/context/SiteChatContext";
import { getSEOConfig } from "@/app/config/seo";
import { getInsurerBySlug, resolveInsurerRoute } from "@/app/config/insurers";
import { publicAnonKey } from "/utils/supabase/info";
import { supabaseEdgeUrl } from "/utils/supabase/edge";

const PageFallback = () => (
  <div
    className="min-h-[50vh] flex items-center justify-center bg-gray-50 text-gray-500 text-sm"
    role="status"
    aria-live="polite"
  >
    Loading…
  </div>
);

const HealthInsuranceGuide = lazy(() =>
  import("@/app/pages/HealthInsuranceGuide").then((m) => ({ default: m.HealthInsuranceGuide }))
);
const BusinessHealthInsurance = lazy(() =>
  import("@/app/pages/BusinessHealthInsurance").then((m) => ({ default: m.BusinessHealthInsurance }))
);
const SelfEmployedHealthInsurance = lazy(() =>
  import("@/app/pages/SelfEmployedHealthInsurance").then((m) => ({ default: m.SelfEmployedHealthInsurance }))
);
const CorporateHealthInsurance = lazy(() =>
  import("@/app/pages/CorporateHealthInsurance").then((m) => ({ default: m.CorporateHealthInsurance }))
);
const FamilyHealthInsurance = lazy(() =>
  import("@/app/pages/FamilyHealthInsurance").then((m) => ({ default: m.FamilyHealthInsurance }))
);
const SeniorHealthInsurance = lazy(() =>
  import("@/app/pages/SeniorHealthInsurance").then((m) => ({ default: m.SeniorHealthInsurance }))
);
const InternationalHealthInsurance = lazy(() =>
  import("@/app/pages/InternationalHealthInsurance").then((m) => ({ default: m.InternationalHealthInsurance }))
);
const SmallCompanyHealthInsurance = lazy(() =>
  import("@/app/pages/SmallCompanyHealthInsurance").then((m) => ({ default: m.SmallCompanyHealthInsurance }))
);
const AboutUs = lazy(() => import("@/app/pages/AboutUs").then((m) => ({ default: m.AboutUs })));
const ContactUs = lazy(() => import("@/app/pages/ContactUs").then((m) => ({ default: m.ContactUs })));
const PrivacyPolicy = lazy(() =>
  import("@/app/pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy }))
);
const TermsConditions = lazy(() =>
  import("@/app/pages/TermsConditions").then((m) => ({ default: m.TermsConditions }))
);
const CookiePolicy = lazy(() =>
  import("@/app/components/CookiePolicy").then((m) => ({ default: m.CookiePolicy }))
);
const TermsAndConditions = lazy(() =>
  import("@/app/components/TermsAndConditions").then((m) => ({ default: m.TermsAndConditions }))
);
const InsuranceTypes = lazy(() =>
  import("@/app/components/InsuranceTypes").then((m) => ({ default: m.InsuranceTypes }))
);
const PartnerInsurers = lazy(() =>
  import("@/app/components/PartnerInsurers").then((m) => ({ default: m.PartnerInsurers }))
);
const Sitemap = lazy(() => import("@/app/components/Sitemap").then((m) => ({ default: m.Sitemap })));
const Disclaimer = lazy(() => import("@/app/pages/Disclaimer").then((m) => ({ default: m.Disclaimer })));
const AdminLeads = lazy(() => import("@/app/pages/AdminLeads").then((m) => ({ default: m.AdminLeads })));
const StaticFileServer = lazy(() =>
  import("@/app/components/StaticFileServer").then((m) => ({ default: m.StaticFileServer }))
);
const InsurerProfilePage = lazy(() =>
  import("@/app/pages/InsurerProfilePage").then((m) => ({ default: m.InsurerProfilePage }))
);
const InsurersHubPage = lazy(() =>
  import("@/app/pages/InsurersHubPage").then((m) => ({ default: m.InsurersHubPage }))
);
const NhsWaitingTimesEngland = lazy(() =>
  import("@/app/pages/NhsWaitingTimesEngland").then((m) => ({ default: m.NhsWaitingTimesEngland }))
);
const BmaPrivateMedicalInsuranceGuide = lazy(() =>
  import("@/app/pages/BmaPrivateMedicalInsuranceGuide").then((m) => ({
    default: m.BmaPrivateMedicalInsuranceGuide,
  }))
);

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    const pathname = window.location.pathname.slice(1).replace(/^index\.html$/i, '');

    if (pathname === 'sitemap.xml' || pathname === 'robots.txt' || pathname === 'test-static.txt') {
      console.log('🔍 Static file requested:', pathname, '- Will serve from /static/ route');
      return `static/${pathname}`;
    }

    if (pathname && pathname !== '') {
      const resolved = resolveInsurerRoute(pathname);
      if (resolved !== pathname) {
        window.history.replaceState({}, '', `/${resolved}`);
      }
      return resolved;
    }
    
    // Check query params (for mobile)
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) {
      return resolveInsurerRoute(pageParam);
    }

    const hash = window.location.hash.slice(1);
    return (hash ? resolveInsurerRoute(hash) : null) || 'home';
  });
  const [user, setUser] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Handle URL hash navigation (does not override pathname-based routes like /about-us)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setCurrentPage(hash);
      } else {
        const path = window.location.pathname.replace(/^\//, '').replace(/^index\.html$/i, '');
        if (!path) {
          setCurrentPage('home');
        }
      }
    };

    handleHashChange();
    setTimeout(handleHashChange, 100);
    setTimeout(handleHashChange, 500);
    setTimeout(handleHashChange, 1000);

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      let pathname = window.location.pathname.replace(/^\//, '').replace(/^index\.html$/i, '');
      if (pathname === 'sitemap.xml' || pathname === 'robots.txt' || pathname === 'test-static.txt') {
        setCurrentPage(`static/${pathname}`);
        return;
      }
      if (!pathname) {
        setCurrentPage('home');
        return;
      }
      const resolved = resolveInsurerRoute(pathname);
      if (resolved !== pathname) {
        window.history.replaceState({}, '', `/${resolved}`);
      }
      setCurrentPage(resolved);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Debug current page
  useEffect(() => {
    console.log('📄 Current page:', currentPage);
  }, [currentPage]);

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('authToken');
    if (savedUser && savedToken) {
      // Validate token format (JWT should start with 'eyJ')
      if (savedToken.startsWith('eyJ') && savedToken.length > 100) {
        console.log('✅ Valid JWT token found in localStorage');
        setUser(JSON.parse(savedUser));
        setAuthToken(savedToken);
      } else {
        console.warn('⚠️ Invalid token format detected - clearing session');
        console.log('Token:', savedToken.substring(0, 50));
        // Clear invalid token
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  const handleGetStarted = () => {
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    // Prevent duplicate submissions
    if (isSubmitting) {
      console.log('⚠️ Submission already in progress, ignoring duplicate request');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Form submitted:", data);
      
      // Use user's auth token if logged in, otherwise use public anon key
      const token = authToken || publicAnonKey;
      console.log('Submitting with token type:', authToken ? 'User JWT' : 'Anon Key');
      
      // Send form data to backend
      const response = await fetch(supabaseEdgeUrl('/submit-form'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Failed to submit form:', result);
        // Still show success page even if email fails, as data is saved
        if (result.note) {
          console.log(result.note);
        }
      } else {
        console.log('Form submitted successfully:', result);
      }

      setIsFormOpen(false);
      setIsSuccessOpen(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show success page as failsafe
      setIsFormOpen(false);
      setIsSuccessOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccessOpen(false);
  };

  const handleBackToLanding = () => {
    setIsFormOpen(false);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page.startsWith('static/')) {
      const file = page.replace('static/', '');
      window.history.pushState({ page }, '', `/${file}`);
      return;
    }
    if (page === 'home') {
      window.history.pushState({ page: 'home' }, '', '/');
      return;
    }
    window.history.pushState({ page }, '', `/${page}`);
  };

  const handleAuthSuccess = (userData: any, token: string) => {
    console.log('🔐 Auth success - User:', userData);
    console.log('🔐 Auth success - Token:', token ? `${token.substring(0, 30)}...` : 'null');
    console.log('🔐 Token length:', token?.length);
    console.log('🔐 Token starts with eyJ:', token?.startsWith('eyJ'));
    
    setUser(userData);
    setAuthToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
  };

  const handleLogout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleViewSubmissions = () => {
    setIsSubmissionsOpen(true);
  };

  const renderEmbeddedForm = () => {
    return (
      <EmbeddedForm onSubmit={handleFormSubmit} onBack={handleBackToLanding} />
    );
  };

  // Get SEO config for current page
  const seoConfig = getSEOConfig(currentPage);

  const renderPage = () => {
    // Handle static file requests
    if (currentPage.startsWith('static/')) {
      const fileName = currentPage.replace('static/', '');
      return <StaticFileServer fileName={fileName} />;
    }

    switch (currentPage) {
      case 'health-insurance-guide':
        return <HealthInsuranceGuide onGetStarted={handleGetStarted} />;
      case 'business-health-insurance':
        return <BusinessHealthInsurance onGetStarted={handleGetStarted} />;
      case 'self-employed-health-insurance':
        return <SelfEmployedHealthInsurance onGetStarted={handleGetStarted} />;
      case 'corporate-health-insurance':
        return <CorporateHealthInsurance onGetStarted={handleGetStarted} />;
      case 'family-health-insurance':
        return <FamilyHealthInsurance onGetStarted={handleGetStarted} />;
      case 'senior-health-insurance':
        return <SeniorHealthInsurance onGetStarted={handleGetStarted} />;
      case 'international-health-insurance':
        return <InternationalHealthInsurance onGetStarted={handleGetStarted} />;
      case 'small-company-health-insurance':
        return <SmallCompanyHealthInsurance onGetStarted={handleGetStarted} />;
      case 'about-us':
        return <AboutUs onGetStarted={handleGetStarted} />;
      case 'contact-us':
        return <ContactUs onGetStarted={handleGetStarted} />;
      case 'privacy-policy':
        return <PrivacyPolicy onGetStarted={handleGetStarted} />;
      case 'terms-conditions':
        return <TermsConditions onGetStarted={handleGetStarted} />;
      case 'cookie-policy':
        return <CookiePolicy onGetStarted={handleGetStarted} />;
      case 'terms-and-conditions':
        return <TermsAndConditions onGetStarted={handleGetStarted} />;
      case 'insurance-types':
        return <InsuranceTypes onGetStarted={handleGetStarted} />;
      case 'partner-insurers':
        return <PartnerInsurers onNavigate={handleNavigate} />;
      case 'insurers':
        return <InsurersHubPage onGetStarted={handleGetStarted} onNavigate={handleNavigate} />;
      case 'nhs-waiting-times-england':
        return <NhsWaitingTimesEngland onGetStarted={handleGetStarted} />;
      case 'bma-private-medical-insurance-guide':
        return <BmaPrivateMedicalInsuranceGuide onGetStarted={handleGetStarted} />;
      case 'sitemap':
        return <Sitemap onNavigate={handleNavigate} />;
      case 'disclaimer':
        return <Disclaimer onGetStarted={handleGetStarted} />;
      case 'home':
        return null; // Home is handled separately in the main render
      default: {
        const insurer = getInsurerBySlug(currentPage);
        if (insurer) {
          return (
            <InsurerProfilePage
              insurer={insurer}
              onGetStarted={handleGetStarted}
              onNavigate={handleNavigate}
            />
          );
        }
        console.warn('⚠️ Unknown page:', currentPage, '- Redirecting to home');
        if (currentPage !== 'home') {
          setTimeout(() => setCurrentPage('home'), 0);
        }
        return null;
      }
    }
  };

  return (
    <SiteChatProvider>
    <div>
      {/* SEO Meta Tags */}
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        noindex={seoConfig.noindex}
        canonical={`https://healthcovercomparison.co.uk/${currentPage === 'home' ? '' : currentPage}`}
      />

      {import.meta.env.DEV && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            background: "rgba(0,0,0,0.6)",
            color: "white",
            padding: "4px 8px",
            zIndex: 9999,
            fontSize: "9px",
            maxWidth: "120px",
            borderTopRightRadius: "4px",
            opacity: 0.5,
          }}
        >
          <div>
            Page: <strong>{currentPage}</strong>
          </div>
        </div>
      )}

      {currentPage === "admin-leads" ? (
        <main id="main-content">
          <Suspense fallback={<PageFallback />}>
            <AdminLeads />
          </Suspense>
        </main>
      ) : currentPage.startsWith("static/") ? (
        <main id="main-content">
          <Suspense fallback={<PageFallback />}>{renderPage()}</Suspense>
        </main>
      ) : currentPage === "home" ? (
        <LandingPage 
          onGetStarted={handleGetStarted} 
          onNavigate={handleNavigate}
          renderEmbeddedForm={renderEmbeddedForm}
          onOpenAuth={handleOpenAuthModal}
          onLogout={handleLogout}
          onViewSubmissions={handleViewSubmissions}
          user={user}
        />
      ) : (
        <>
          <Header
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuthModal}
            onLogout={handleLogout}
            onViewSubmissions={handleViewSubmissions}
            user={user}
          />
          <main id="main-content">
            <Suspense fallback={<PageFallback />}>{renderPage()}</Suspense>
          </main>
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      
      {/* Form Overlay */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="!max-w-[95vw] sm:!max-w-[75vw] !w-[95vw] sm:!w-[75vw] !h-[90vh] sm:!h-[85vh] overflow-hidden !p-0 bg-white" style={{ maxWidth: '95vw', width: '95vw', height: '90vh' }}>
          <div className="h-full overflow-y-auto">
            <EnhancedMultiStepForm onSubmit={handleFormSubmit} onBack={handleBackToLanding} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Overlay */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="!max-w-[95vw] sm:!max-w-[500px] md:!max-w-[600px] !w-auto p-0 bg-white overflow-y-auto max-h-[90vh]">
          <SuccessPage onReset={handleReset} />
        </DialogContent>
      </Dialog>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess} 
      />

      {/* Submissions Modal */}
      <MySubmissions 
        isOpen={isSubmissionsOpen} 
        onClose={() => setIsSubmissionsOpen(false)}
        user={user}
        authToken={authToken}
      />

      {/* Cookie Consent */}
      <CookieManager onNavigate={handleNavigate} />
      
      {/* Cookie Settings Button (permanent access) */}
      <CookieSettingsButton />

      {currentPage !== "admin-leads" && !currentPage.startsWith("static/") && <ChatBot />}
    </div>
    </SiteChatProvider>
  );
}