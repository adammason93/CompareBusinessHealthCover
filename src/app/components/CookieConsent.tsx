import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

interface CookieConsentProps {
  onNavigate?: (page: string) => void;
}

export function CookieConsent({ onNavigate }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a brief delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    console.log('✅ Cookies accepted');
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
    
    // Initialize Microsoft Clarity and other analytics
    if (typeof window !== 'undefined' && (window as any).initClarity) {
      (window as any).initClarity();
    }
    
    // For future analytics integrations
    // Example: window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  };

  const handleDecline = () => {
    console.log('❌ Cookies declined');
    // Store decline in sessionStorage (temporary) instead of localStorage
    sessionStorage.setItem('cookieConsent', 'declined');
    sessionStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
    
    // Ensure no tracking cookies are set
    // Clear any existing tracking cookies if necessary
  };

  const handleCustomize = () => {
    console.log('⚙️ Opening cookie policy');
    onNavigate?.('cookie-policy');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />
      
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-brand-navy-dark to-brand-navy rounded-lg shadow-2xl border border-brand-teal/20 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              {/* Cookie Icon */}
              <div className="flex-shrink-0">
                <div className="bg-brand-teal/10 p-3 rounded-full">
                  <Cookie className="w-6 h-6 text-brand-teal" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  🍪 Cookie Consent
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  We use cookies to enhance your browsing experience, analyse site traffic, and personalise content. 
                  By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or 
                  decline non-essential cookies.
                </p>
                <p className="text-gray-400 text-xs mb-4">
                  Essential cookies are always enabled to ensure the website functions properly. For more information, 
                  please read our{' '}
                  <button 
                    onClick={() => onNavigate?.('cookie-policy')}
                    className="text-brand-teal hover:text-brand-teal-light underline"
                  >
                    Cookie Policy
                  </button>{' '}
                  and{' '}
                  <button 
                    onClick={() => onNavigate?.('privacy-policy')}
                    className="text-brand-teal hover:text-brand-teal-light underline"
                  >
                    Privacy Policy
                  </button>.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleAccept}
                    className="px-6 py-2.5 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-lg font-semibold transition-colors shadow-lg shadow-brand-teal/20"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleDecline}
                    className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Decline Non-Essential
                  </button>
                  <button
                    onClick={handleCustomize}
                    className="px-6 py-2.5 bg-transparent hover:bg-white/5 text-brand-teal border border-brand-teal/50 rounded-lg font-semibold transition-colors"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Utility functions to check cookie consent status
export function getCookieConsent(): 'accepted' | 'declined' | null {
  const localConsent = localStorage.getItem('cookieConsent');
  const sessionConsent = sessionStorage.getItem('cookieConsent');
  
  if (localConsent === 'accepted') return 'accepted';
  if (sessionConsent === 'declined') return 'declined';
  return null;
}

export function canUseAnalyticsCookies(): boolean {
  return getCookieConsent() === 'accepted';
}

export function canUseMarketingCookies(): boolean {
  return getCookieConsent() === 'accepted';
}