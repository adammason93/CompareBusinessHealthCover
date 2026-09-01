import { useState, useEffect } from "react";
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
import { ContactUs } from "@/app/pages/ContactUs";
import { GeoGuidePage } from "@/app/components/GeoGuidePage";
import { getGeoGuide } from "@/app/content/geo-guides.mjs";
import { PrivacyPolicy } from "@/app/pages/PrivacyPolicy";
import { TermsConditions } from "@/app/pages/TermsConditions";
import { CookiePolicy } from "@/app/components/CookiePolicy";
import { TermsAndConditions } from "@/app/components/TermsAndConditions";
import { Sitemap } from "@/app/components/Sitemap";
import { Disclaimer } from "@/app/pages/Disclaimer";
import { AdminLeads } from "@/app/pages/AdminLeads";
import { BlogIndexPage } from "@/app/pages/BlogIndexPage";
import { BlogPostPage } from "@/app/pages/BlogPostPage";
import { BlogAdminPage } from "@/app/pages/BlogAdminPage";
import { StaticFileServer } from "@/app/components/StaticFileServer";
import { SEOHead } from "@/app/components/SEOHead";
import { getSEOConfig } from "@/app/config/seo";
import { SITE } from "@/app/config/site";
import { captureLeadAttributionFromLocation, leadAttributionPayload } from "@/app/config/tracking";
import { measureLeadCreated } from "@/app/config/openaiPixel";
import { projectId, publicAnonKey } from "/utils/supabase/info";

/** `/blog-admin/` must match `blog-admin` (hosts often normalize with a trailing slash). */
function routeKeyFromPathname(pathname: string): string {
  return pathname.replace(/^\//, "").replace(/^index\.html$/i, "").replace(/\/+$/, "");
}

const CHATGPT_LANDING_PATHS = new Set(["chatgpt", "chatgpt-ads"]);

function resolveInitialPage(): string {
  // Stamp attribution from vanity paths / UTMs before normalising the route
  captureLeadAttributionFromLocation();

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

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submissionReference, setSubmissionReference] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setSubmissionReference(null);
    
    try {
      console.log("Form submitted:", data);
      
      // Use user's auth token if logged in, otherwise use public anon key
      const token = authToken || publicAnonKey;
      console.log('Submitting with token type:', authToken ? 'User JWT' : 'Anon Key');
      
      // Send form data to backend
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2031af1c/submit-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          sourceWebsite: SITE.domain,
          ...leadAttributionPayload(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Failed to submit form:', result);
        // Still show success page even if email fails, as data is saved
        if (result.note) {
          console.log(result.note);
        }
        measureLeadCreated();
      } else {
        console.log('Form submitted successfully:', result);
        if (result.referenceNumber) {
          setSubmissionReference(result.referenceNumber);
        }
        measureLeadCreated();
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
    setSubmissionReference(null);
  };

  const handleBackToLanding = () => {
    setIsFormOpen(false);
  };

  const handleNavigate = (page: string) => {
    const target = page.replace(/\/+$/, "") || "home";
    setCurrentPage(target);
    if (target.startsWith('static/')) {
      const file = target.replace('static/', '');
      window.history.pushState({ page: target }, '', `/${file}`);
    } else if (target === 'home') {
      window.history.pushState({ page: 'home' }, '', '/');
    } else {
      window.history.pushState({ page: target }, '', `/${target}`);
    }
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
      <EmbeddedForm onSubmit={handleFormSubmit} onBack={handleBackToLanding} />
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
      case 'terms-and-conditions':
        return <TermsAndConditions onGetStarted={handleGetStarted} />;
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
        canonical={`${SITE.url}/${currentPage === 'home' ? '' : currentPage}`}
      />

      {/* Debug Info - Minimized */}
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        background: 'rgba(0,0,0,0.6)', 
        color: 'white', 
        padding: '4px 8px', 
        zIndex: 9999, 
        fontSize: '9px',
        maxWidth: '120px',
        borderTopRightRadius: '4px',
        opacity: 0.5
      }}>
        <div>Page: <strong>{currentPage}</strong></div>
      </div>
      
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
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent
          className="!fixed !inset-x-2 !top-2 !bottom-2 !left-2 !right-2 !translate-x-0 !translate-y-0 !max-w-none !w-auto !h-auto max-h-[calc(100dvh-1rem)] sm:!inset-auto sm:!top-[50%] sm:!left-[50%] sm:!bottom-auto sm:!right-auto sm:!translate-x-[-50%] sm:!translate-y-[-50%] sm:!max-w-[75vw] sm:!w-[75vw] sm:!h-[85vh] overflow-hidden !p-0 bg-white rounded-xl"
        >
          <div className="h-full max-h-[calc(100dvh-1rem)] sm:max-h-[85vh] overflow-y-auto overscroll-contain">
            <EnhancedMultiStepForm onSubmit={handleFormSubmit} onBack={handleBackToLanding} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Overlay */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="!max-w-[95vw] sm:!max-w-[500px] md:!max-w-[600px] !w-auto p-0 bg-white overflow-y-auto max-h-[90vh]">
          <SuccessPage onReset={handleReset} referenceNumber={submissionReference} />
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