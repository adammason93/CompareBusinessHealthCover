import { useState, useEffect, useRef } from "react";
import { LandingPage } from "@/app/components/LandingPage";
import { QuoteForm } from "@/app/components/QuoteForm";
import { SuccessPage } from "@/app/components/SuccessPage";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { AuthModal } from "@/app/components/AuthModal";
import { MySubmissions } from "@/app/components/MySubmissions";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { CookieManager } from "@/app/components/CookieManager";
import { CookieSettingsButton } from "@/app/components/CookieSettingsButton";
import { ContactUs } from "@/app/pages/ContactUs";
import { GeoGuidePage } from "@/app/components/GeoGuidePage";
import { getGeoGuide } from "@/app/content/geo-guides.mjs";
import { PrivacyPolicy } from "@/app/pages/PrivacyPolicy";
import { TermsConditions } from "@/app/pages/TermsConditions";
import { CookiePolicy } from "@/app/components/CookiePolicy";
import { Sitemap } from "@/app/components/Sitemap";
import { Disclaimer } from "@/app/pages/Disclaimer";
import { AdminLeads } from "@/app/pages/AdminLeads";
import { BlogIndexPage } from "@/app/pages/BlogIndexPage";
import { BlogPostPage } from "@/app/pages/BlogPostPage";
import { BlogAdminPage } from "@/app/pages/BlogAdminPage";
import { StaticFileServer } from "@/app/components/StaticFileServer";
import { SEOHead } from "@/app/components/SEOHead";
import { getSEOConfig } from "@/app/config/seo";
import { SITE, canonicalPageUrl } from "@/app/config/site";
import { captureLeadAttributionFromLocation, leadAttributionPayload } from "@/app/config/tracking";
import { measureLeadCreated } from "@/app/config/openaiPixel";
import { pushLeadSubmitted } from "@/app/config/analytics";
import { projectId, publicAnonKey } from "/utils/supabase/info";

/** `/blog-admin/` must match `blog-admin` (hosts often normalize with a trailing slash). */
function routeKeyFromPathname(pathname: string): string {
  const key = pathname.replace(/^\//, "").replace(/^index\.html$/i, "").replace(/\/+$/, "");
  if (key === "terms-and-conditions") return "terms-conditions";
  if (key === "providers") return "small-business-health-insurance-providers";
  if (key === "privacy") return "privacy-policy";
  if (key === "contact") return "contact-us";
  return key;
}

function pathForPage(page: string): string {
  if (!page || page === "home") return "/";
  if (page.startsWith("static/")) return `/${page.replace("static/", "")}`;
  return `/${page.replace(/^\/+|\/+$/g, "")}/`;
}

function rewriteLegacyTermsUrl(): void {
  if (/^\/terms-and-conditions\/?$/i.test(window.location.pathname)) {
    window.history.replaceState(
      { page: "terms-conditions" },
      "",
      `/terms-conditions/${window.location.search}`,
    );
  }
}

function rewriteLegacyProvidersUrl(): void {
  if (/^\/providers\/?$/i.test(window.location.pathname)) {
    window.history.replaceState(
      { page: "small-business-health-insurance-providers" },
      "",
      `/small-business-health-insurance-providers/${window.location.search}`,
    );
  }
}

const CHATGPT_LANDING_PATHS = new Set(["chatgpt", "chatgpt-ads"]);

function resolveInitialPage(): string {
  // Stamp attribution from vanity paths / UTMs before normalising the route
  captureLeadAttributionFromLocation();
  rewriteLegacyTermsUrl();
  rewriteLegacyProvidersUrl();

  const pathname = routeKeyFromPathname(window.location.pathname);

  if (pathname === 'sitemap.xml' || pathname === 'robots.txt' || pathname === 'test-static.txt') {
    return `static/${pathname}`;
  }

  // ChatGPT ad landing → home (attribution already stored)
  if (CHATGPT_LANDING_PATHS.has(pathname)) {
    const keep = window.location.search;
    window.history.replaceState({ page: 'home' }, '', keep ? `/${keep}` : '/');
    return 'home';
  }

  if (pathname) {
    return pathname;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  if (pageParam) {
    return pageParam;
  }

  const hash = window.location.hash.slice(1);
  return hash || 'home';
}


const QUOTE_SUBMISSION_ID_KEY = "businessHealthFormSubmissionId";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function createQuoteSubmissionId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }
}

function getOrCreateQuoteSubmissionId(): string {
  try {
    const existing = localStorage.getItem(QUOTE_SUBMISSION_ID_KEY);
    if (existing && UUID_PATTERN.test(existing)) {
      return existing.toLowerCase();
    }
  } catch {
    // Ignore storage errors and create a fresh id
  }
  const id = createQuoteSubmissionId();
  try {
    localStorage.setItem(QUOTE_SUBMISSION_ID_KEY, id);
  } catch {
    // Still submit with an in-memory id
  }
  return id;
}

function clearQuoteSubmissionId() {
  try {
    localStorage.removeItem(QUOTE_SUBMISSION_ID_KEY);
  } catch {
    // Ignore storage errors
  }
}

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submissionReference, setSubmissionReference] = useState<string | null>(null);
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isSubmittingRef = useRef(false);
  const [currentPage, setCurrentPage] = useState(resolveInitialPage);
  const [user, setUser] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [blogSeoOverride, setBlogSeoOverride] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    if (!currentPage.startsWith("blog/") || currentPage === "blog") {
      setBlogSeoOverride(null);
    }
  }, [currentPage]);

  // Prefer path-based URLs; only use hash when there is no real path.
  useEffect(() => {
    const syncFromLocation = () => {
      captureLeadAttributionFromLocation();
      rewriteLegacyTermsUrl();
      rewriteLegacyProvidersUrl();
      const pathname = routeKeyFromPathname(window.location.pathname);
      if (pathname === 'sitemap.xml' || pathname === 'robots.txt' || pathname === 'test-static.txt') {
        setCurrentPage(`static/${pathname}`);
        window.scrollTo(0, 0);
        return;
      }
      if (CHATGPT_LANDING_PATHS.has(pathname)) {
        const keep = window.location.search;
        window.history.replaceState({ page: 'home' }, '', keep ? `/${keep}` : '/');
        setCurrentPage('home');
        window.scrollTo(0, 0);
        return;
      }
      if (pathname) {
        setCurrentPage(pathname);
        window.scrollTo(0, 0);
        return;
      }
      const hash = window.location.hash.slice(1);
      setCurrentPage(hash || 'home');
      window.scrollTo(0, 0);
    };

    syncFromLocation();
    window.addEventListener('hashchange', syncFromLocation);
    window.addEventListener('popstate', syncFromLocation);
    return () => {
      window.removeEventListener('hashchange', syncFromLocation);
      window.removeEventListener('popstate', syncFromLocation);
    };
  }, []);

  // Debug current page, and tell Google Tag Manager about in-app navigations.
  // The first view is sent by the GTM container itself.
  const skipInitialPageView = useRef(true);
  useEffect(() => {
    console.log('📄 Current page:', currentPage);
    if (skipInitialPageView.current) {
      skipInitialPageView.current = false;
      return;
    }
    const dataLayer = ((window as any).dataLayer = (window as any).dataLayer || []);
    dataLayer.push({
      event: 'page_view',
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title,
    });
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
    setSubmitError(null);
    const embedded = document.getElementById("quote-form");
    if (embedded) {
      embedded.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmissionReference(null);
    setConfirmationEmailSent(true);

    const quoteSubmitError = `Sorry, we couldn't send your quote just now. Your answers are still here — please try again. If it keeps happening, call us on ${SITE.phoneDisplay}.`;

    try {
      // Use user's auth token if logged in, otherwise use public anon key
      const token = authToken || publicAnonKey;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2031af1c/submit-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          submissionId: getOrCreateQuoteSubmissionId(),
          sourceWebsite: SITE.domain,
          ...leadAttributionPayload(),
        }),
      });

      let result: { referenceNumber?: string; emailSent?: boolean } | null = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        console.error('Failed to submit form:', result);
        setSubmitError(quoteSubmitError);
        return;
      }

      if (result?.referenceNumber) {
        setSubmissionReference(result.referenceNumber);
      }
      setConfirmationEmailSent(result?.emailSent !== false);
      measureLeadCreated();
      pushLeadSubmitted({
        leadType: "quote",
        referenceNumber: result?.referenceNumber ?? null,
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('businessHealthFormDraft');
      }
      clearQuoteSubmissionId();
      setIsFormOpen(false);
      setIsSuccessOpen(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(quoteSubmitError);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccessOpen(false);
    setSubmissionReference(null);
    setConfirmationEmailSent(true);
  };

  const handleBackToLanding = () => {
    if (isSubmittingRef.current) return;
    setSubmitError(null);
    setIsFormOpen(false);
  };

  const handleNavigate = (page: string) => {
    let target = page.replace(/^\/+|\/+$/g, "") || "home";
    if (target === "terms-and-conditions") target = "terms-conditions";
    if (target === "privacy") target = "privacy-policy";
    if (target === "contact") target = "contact-us";
    setCurrentPage(target);
    window.history.pushState({ page: target }, "", pathForPage(target));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    });
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
      <QuoteForm
        variant="embedded"
        onSubmit={handleFormSubmit}
        onBack={handleBackToLanding}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onNavigate={handleNavigate}
      />
    );
  };

  const baseSeo = getSEOConfig(currentPage);
  const seoConfig =
    blogSeoOverride && currentPage.startsWith("blog/") && currentPage !== "blog"
      ? { ...baseSeo, title: blogSeoOverride.title, description: blogSeoOverride.description }
      : baseSeo;

  const renderPage = () => {
    // Handle static file requests
    if (currentPage.startsWith('static/')) {
      const fileName = currentPage.replace('static/', '');
      return <StaticFileServer fileName={fileName} />;
    }

    if (currentPage !== 'contact-us' && getGeoGuide(currentPage)) {
      return (
        <GeoGuidePage
          slug={currentPage}
          onGetStarted={handleGetStarted}
          onNavigate={handleNavigate}
          renderEmbeddedForm={renderEmbeddedForm}
        />
      );
    }

    switch (currentPage) {
      case 'contact-us':
        return <ContactUs onGetStarted={handleGetStarted} />;
      case 'privacy-policy':
        return <PrivacyPolicy onGetStarted={handleGetStarted} />;
      case 'terms-conditions':
        return <TermsConditions onGetStarted={handleGetStarted} />;
      case 'cookie-policy':
        return <CookiePolicy onGetStarted={handleGetStarted} />;
      case 'sitemap':
        return <Sitemap onNavigate={handleNavigate} />;
      case 'disclaimer':
        return <Disclaimer onGetStarted={handleGetStarted} />;
      case 'blog':
        return <BlogIndexPage onNavigate={handleNavigate} onGetStarted={handleGetStarted} />;
      case 'blog-admin':
        return null; // Rendered with chrome separately
      case 'home':
        return null; // Home is handled separately in the main render
      default: {
        if (currentPage.startsWith('blog/')) {
          const slug = currentPage.slice('blog/'.length);
          if (slug) {
            return (
              <BlogPostPage
                slug={slug}
                onNavigate={handleNavigate}
                onGetStarted={handleGetStarted}
                onMetaLoaded={setBlogSeoOverride}
              />
            );
          }
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
    <div>
      {/* SEO Meta Tags */}
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        noindex={seoConfig.noindex}
        canonical={canonicalPageUrl(currentPage)}
      />

      {currentPage === 'admin-leads' ? (
        <AdminLeads />
      ) : currentPage === 'blog-admin' ? (
        <>
          <Header
            onGetStarted={handleGetStarted}
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuthModal}
            onLogout={handleLogout}
            onViewSubmissions={handleViewSubmissions}
            user={user}
          />
          <BlogAdminPage />
          <Footer onNavigate={handleNavigate} />
        </>
      ) : currentPage.startsWith('static/') ? (
        // Render static files without header/footer
        renderPage()
      ) : currentPage === 'home' ? (
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
            onGetStarted={handleGetStarted} 
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuthModal}
            onLogout={handleLogout}
            onViewSubmissions={handleViewSubmissions}
            user={user}
          />
          {renderPage()}
          <Footer onNavigate={handleNavigate} />
        </>
      )}
      
      {/* Form Overlay */}
      <Dialog
        open={isFormOpen}
        onOpenChange={(open) => {
          if (isSubmitting) return;
          setIsFormOpen(open);
          if (!open) setSubmitError(null);
        }}
      >
        <DialogContent
          className="!fixed !inset-x-2 !top-2 !bottom-2 !left-2 !right-2 !translate-x-0 !translate-y-0 !max-w-none !w-auto !h-auto max-h-[calc(100dvh-1rem)] sm:!inset-auto sm:!top-[50%] sm:!left-[50%] sm:!bottom-auto sm:!right-auto sm:!translate-x-[-50%] sm:!translate-y-[-50%] sm:!max-w-[75vw] sm:!w-[75vw] sm:!h-[85vh] overflow-hidden !p-0 bg-white rounded-xl"
        >
          <div className="h-full max-h-[calc(100dvh-1rem)] sm:max-h-[85vh] overflow-y-auto overscroll-contain">
            <QuoteForm
              variant="modal"
              onSubmit={handleFormSubmit}
              onBack={handleBackToLanding}
              isSubmitting={isSubmitting}
              submitError={submitError}
              onNavigate={handleNavigate}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Overlay */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="!max-w-[95vw] sm:!max-w-[500px] md:!max-w-[600px] !w-auto p-0 bg-white overflow-y-auto max-h-[90vh]">
          <SuccessPage onReset={handleReset} referenceNumber={submissionReference} emailSent={confirmationEmailSent} />
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
    </div>
  );
}