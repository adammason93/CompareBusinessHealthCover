import { useState, useEffect } from 'react';
import { Cookie, Settings, X, Check, Info, Shield, BarChart, Target } from 'lucide-react';
import { setOpenaiPixelConsent } from '@/app/config/openaiPixel';

interface CookieManagerProps {
  onNavigate?: (page: string) => void;
}

interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

/** Re-prompt after six months. Shorter windows were blocking returning ad visitors. */
export const COOKIE_BANNER_EVENT = "cbhc-cookie-banner";

function dispatchCookieBannerVisibility(visible: boolean): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COOKIE_BANNER_EVENT, { detail: { visible } }));
}

const COOKIE_CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000;

function getConsentTimestamp(): number | null {
  const raw =
    localStorage.getItem('cookieConsentDate') || sessionStorage.getItem('cookieConsentDate');
  if (!raw) return null;
  const t = Date.parse(raw);
  return Number.isFinite(t) ? t : null;
}

/** True if the user has a consent choice (accept, decline, or custom) still within the TTL. */
function hasFreshCookieConsentChoice(): boolean {
  const hasChoice = Boolean(
    localStorage.getItem('cookieConsent') || sessionStorage.getItem('cookieConsent')
  );
  if (!hasChoice) return false;
  const ts = getConsentTimestamp();
  // No date = treat as stale so banner reappears
  if (ts == null) return false;
  return Date.now() - ts < COOKIE_CONSENT_TTL_MS;
}

export function CookieManager({ onNavigate }: CookieManagerProps) {
  const [isVisible, setIsVisible] = useState(() => !hasFreshCookieConsentChoice());
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    dispatchCookieBannerVisibility(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (!hasFreshCookieConsentChoice()) {
      setIsVisible(true);
    } else {
      loadPreferences();
    }

    const handleOpenPreferences = () => {
      loadPreferences();
      setShowCustomize(true);
      setIsVisible(true);
    };

    window.addEventListener('open-cookie-preferences', handleOpenPreferences);
    window.addEventListener('storage', handleStorageChange);

    // Re-check when the 24h window elapses while the tab stays open
    const interval = window.setInterval(() => {
      if (!hasFreshCookieConsentChoice()) {
        setIsVisible(true);
      }
    }, 60_000);

    return () => {
      window.removeEventListener('open-cookie-preferences', handleOpenPreferences);
      window.removeEventListener('storage', handleStorageChange);
      window.clearInterval(interval);
    };
  }, []);

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'cookieConsent' || e.key === 'cookiePreferences') {
      loadPreferences();
    }
  };

  const loadPreferences = () => {
    const savedPrefs = localStorage.getItem('cookiePreferences');
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs);
        setPreferences(prefs);
      } catch (error) {
        console.error('Failed to load cookie preferences:', error);
      }
    }
  };

  const savePreferences = (prefs: CookiePreferences) => {
    console.log('💾 Saving cookie preferences:', prefs);
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    localStorage.setItem('cookieConsent', 'customized');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    // Remove any session-based decline
    sessionStorage.removeItem('cookieConsent');
    
    setPreferences(prefs);
  };

  const handleAcceptAll = () => {
    console.log('✅ All cookies accepted');
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    
    savePreferences(allAccepted);
    localStorage.setItem('cookieConsent', 'accepted');
    
    // Initialize tracking
    initializeTracking(allAccepted);
    
    setIsVisible(false);
    setShowCustomize(false);
  };

  const handleDeclineAll = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };

    const declinedAt = new Date().toISOString();
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieConsentDate', declinedAt);
    localStorage.setItem('cookiePreferences', JSON.stringify(essentialOnly));
    sessionStorage.removeItem('cookieConsent');
    sessionStorage.removeItem('cookieConsentDate');

    clearTrackingCookies();
    applyGoogleConsent(essentialOnly);
    setOpenaiPixelConsent(false);

    setPreferences(essentialOnly);
    setIsVisible(false);
    setShowCustomize(false);
  };

  const handleSaveCustom = () => {
    console.log('⚙️ Custom preferences saved:', preferences);
    savePreferences(preferences);
    
    // Initialize only selected tracking
    initializeTracking(preferences);
    
    // Clear disabled tracking
    if (!preferences.analytics) {
      clearAnalyticsCookies();
    }
    if (!preferences.marketing) {
      clearMarketingCookies();
    }
    
    setIsVisible(false);
    setShowCustomize(false);
  };

  const applyGoogleConsent = (prefs: CookiePreferences) => {
    if (typeof (window as any).gtag !== 'function') return;
    console.log('📊 Updating Google consent', {
      analytics: prefs.analytics,
      marketing: prefs.marketing,
    });
    (window as any).gtag('consent', 'update', {
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
      ad_storage: prefs.marketing ? 'granted' : 'denied',
      ad_user_data: prefs.marketing ? 'granted' : 'denied',
      ad_personalization: prefs.marketing ? 'granted' : 'denied',
    });
  };

  const initializeTracking = (prefs: CookiePreferences) => {
    applyGoogleConsent(prefs);

    if (prefs.analytics) {
      // Initialize Microsoft Clarity
      if (typeof window !== 'undefined' && (window as any).initClarity) {
        console.log('📊 Initializing Microsoft Clarity');
        (window as any).initClarity();
      }
    }

    setOpenaiPixelConsent(prefs.marketing);
  };

  const clearTrackingCookies = () => {
    console.log('🧹 Clearing all tracking cookies');
    clearAnalyticsCookies();
    clearMarketingCookies();
  };

  const clearAnalyticsCookies = () => {
    console.log('🧹 Clearing analytics cookies');
    // Clear Microsoft Clarity cookies
    deleteCookie('_clck');
    deleteCookie('_clsk');
    deleteCookie('CLID');
    deleteCookie('ANONCHK');
    deleteCookie('MR');
    deleteCookie('MUID');
    deleteCookie('SM');
    
    // Clear Google Analytics cookies
    deleteCookie('_ga');
    deleteCookie('_gid');
    deleteCookie('_gat');
    const gaCookies = document.cookie.split(';').filter(c => c.trim().startsWith('_ga_'));
    gaCookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      deleteCookie(cookieName);
    });
  };

  const clearMarketingCookies = () => {
    console.log('🧹 Clearing marketing cookies');
    // Clear common marketing cookies
    deleteCookie('_fbp');
    deleteCookie('fr');
    deleteCookie('_gcl_au');
  };

  const deleteCookie = (name: string) => {
    // Delete for current domain
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // Delete for parent domain
    const domain = window.location.hostname;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    // Delete for root domain
    const rootDomain = domain.split('.').slice(-2).join('.');
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain}`;
  };

  if (!isVisible) return null;

  if (showCustomize) {
    return (
      <>
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/60 z-[9998]" />
        
        {/* Customize Panel */}
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
          <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-navy-dark to-brand-navy p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="w-6 h-6 text-brand-teal" />
                  <h3 className="text-2xl font-bold text-white">Cookie Preferences</h3>
                </div>
                <button
                  onClick={() => setShowCustomize(false)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Essential Cookies */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Shield className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Essential Cookies</h4>
                      <p className="text-sm text-gray-600">
                        Required for the website to function properly. These cannot be disabled.
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Examples: Session management, form submissions, security
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-xs text-green-600 font-medium">Always Active</span>
                    <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <BarChart className="w-5 h-5 text-brand-teal mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Analytics Cookies</h4>
                      <p className="text-sm text-gray-600">
                        Help us understand how visitors use our website and improve user experience.
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Examples: Microsoft Clarity, Google Analytics, page views, user journey
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.analytics ? 'bg-brand-teal' : 'bg-gray-300'
                    } flex items-center ${preferences.analytics ? 'justify-end' : 'justify-start'} px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Target className="w-5 h-5 text-brand-navy mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Marketing Cookies</h4>
                      <p className="text-sm text-gray-600">
                        Used to track visitors across websites to display relevant advertisements.
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Examples: Facebook Pixel, Google Ads, retargeting
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.marketing ? 'bg-brand-teal' : 'bg-gray-300'
                    } flex items-center ${preferences.marketing ? 'justify-end' : 'justify-start'} px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Info className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Functional Cookies</h4>
                      <p className="text-sm text-gray-600">
                        Enable enhanced functionality and personalisation, such as remembering preferences.
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Examples: Language preferences, user interface customization
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setPreferences({ ...preferences, functional: !preferences.functional })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      preferences.functional ? 'bg-brand-teal' : 'bg-gray-300'
                    } flex items-center ${preferences.functional ? 'justify-end' : 'justify-start'} px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>
              </div>

              {/* Info Footer */}
              <div className="bg-brand-surface p-4 rounded-lg">
                <p className="text-xs text-gray-600">
                  For more information about how we use cookies, please read our{' '}
                  <button
                    onClick={() => {
                      setShowCustomize(false);
                      setIsVisible(false);
                      onNavigate?.('cookie-policy');
                    }}
                    className="text-brand-teal hover:text-brand-teal-hover underline"
                  >
                    Cookie Policy
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-brand-surface px-6 py-4 flex gap-3 justify-end border-t">
              <button
                onClick={() => setShowCustomize(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-6 py-2 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-lg font-semibold transition-colors shadow-lg shadow-brand-teal/20"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4 pointer-events-none"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="pointer-events-auto max-w-4xl mx-auto bg-brand-navy text-white rounded-lg shadow-xl border border-brand-teal/20 px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <p className="text-sm text-gray-200 leading-snug flex-1">
            We use cookies to measure visits and improve our ads, if you accept.
            Essential cookies keep the site working. Read our{' '}
            <button
              type="button"
              onClick={() => onNavigate?.('cookie-policy')}
              className="text-white underline font-medium"
            >
              cookie policy
            </button>{' '}
            and{' '}
            <button
              type="button"
              onClick={() => onNavigate?.('privacy-policy')}
              className="text-white underline font-medium"
            >
              privacy policy
            </button>.
          </p>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-4 py-2.5 min-w-[8.5rem] bg-brand-teal hover:bg-brand-teal-hover text-white rounded-lg font-semibold text-sm"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={handleDeclineAll}
              className="px-4 py-2.5 min-w-[8.5rem] bg-white text-brand-navy hover:bg-brand-surface rounded-lg font-semibold text-sm"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => setShowCustomize(true)}
              className="px-4 py-2.5 bg-transparent text-white border border-white/50 hover:bg-white/10 rounded-lg font-semibold text-sm"
            >
              Customize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility functions to check cookie consent status
export function getCookieConsent(): 'accepted' | 'declined' | 'customized' | null {
  const localConsent = localStorage.getItem('cookieConsent');
  const sessionConsent = sessionStorage.getItem('cookieConsent');

  if (localConsent === 'accepted') return 'accepted';
  if (localConsent === 'customized') return 'customized';
  if (localConsent === 'declined' || sessionConsent === 'declined') return 'declined';
  return null;
}

export function getCookiePreferences(): CookiePreferences | null {
  const savedPrefs = localStorage.getItem('cookiePreferences');
  if (savedPrefs) {
    try {
      return JSON.parse(savedPrefs);
    } catch (error) {
      console.error('Failed to parse cookie preferences:', error);
      return null;
    }
  }
  return null;
}

export function canUseAnalyticsCookies(): boolean {
  const consent = getCookieConsent();
  if (consent === 'accepted') return true;
  if (consent === 'customized') {
    const prefs = getCookiePreferences();
    return prefs?.analytics ?? false;
  }
  return false;
}

export function canUseMarketingCookies(): boolean {
  const consent = getCookieConsent();
  if (consent === 'accepted') return true;
  if (consent === 'customized') {
    const prefs = getCookiePreferences();
    return prefs?.marketing ?? false;
  }
  return false;
}

export function canUseFunctionalCookies(): boolean {
  const consent = getCookieConsent();
  if (consent === 'accepted') return true;
  if (consent === 'customized') {
    const prefs = getCookiePreferences();
    return prefs?.functional ?? false;
  }
  return false;
}

export function resetCookieConsent(): void {
  localStorage.removeItem('cookieConsent');
  localStorage.removeItem('cookiePreferences');
  localStorage.removeItem('cookieConsentDate');
  sessionStorage.removeItem('cookieConsent');
  sessionStorage.removeItem('cookieConsentDate');
  console.log('🔄 Cookie consent reset - reload page to see banner');
}
