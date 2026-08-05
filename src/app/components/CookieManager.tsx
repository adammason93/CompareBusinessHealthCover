import { useState, useEffect } from 'react';
import { Cookie, Settings, X, Check, Info, Shield, BarChart, Target } from 'lucide-react';

interface CookieManagerProps {
  onNavigate?: (page: string) => void;
}

interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

function hasCookieConsentChoice(): boolean {
  return Boolean(
    localStorage.getItem('cookieConsent') || sessionStorage.getItem('cookieConsent')
  );
}

export function CookieManager({ onNavigate }: CookieManagerProps) {
  const [isVisible, setIsVisible] = useState(() => !hasCookieConsentChoice());
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    if (!hasCookieConsentChoice()) {
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

    return () => {
      window.removeEventListener('open-cookie-preferences', handleOpenPreferences);
      window.removeEventListener('storage', handleStorageChange);
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
    console.log('❌ Non-essential cookies declined');
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    
    // Store in sessionStorage (temporary)
    sessionStorage.setItem('cookieConsent', 'declined');
    sessionStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    // Clear localStorage consent
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('cookiePreferences');
    
    // Clear tracking cookies
    clearTrackingCookies();
    
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

  const initializeTracking = (prefs: CookiePreferences) => {
    if (prefs.analytics) {
      // Initialize Microsoft Clarity
      if (typeof window !== 'undefined' && (window as any).initClarity) {
        console.log('📊 Initializing Microsoft Clarity');
        (window as any).initClarity();
      }
      
      // Initialize Google Analytics if present
      if (typeof (window as any).gtag === 'function') {
        console.log('📊 Initializing Google Analytics');
        (window as any).gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
      }
    }
    
    if (prefs.marketing) {
      // Initialize marketing cookies
      if (typeof (window as any).gtag === 'function') {
        console.log('🎯 Initializing Marketing cookies');
        (window as any).gtag('consent', 'update', {
          'ad_storage': 'granted'
        });
      }
    }
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
            <div className="bg-gradient-to-r from-[#16233d] to-[#1D2D50] p-6">
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
              <div className="bg-gray-50 p-4 rounded-lg">
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
            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t">
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
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[9998]" />
      
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 animate-slide-up">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#16233d] to-[#1D2D50] rounded-lg shadow-2xl border border-brand-teal/20 overflow-hidden">
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
                    onClick={() => {
                      setIsVisible(false);
                      onNavigate?.('cookie-policy');
                    }}
                    className="text-brand-teal hover:text-brand-teal-light underline"
                  >
                    Cookie Policy
                  </button>{' '}
                  and{' '}
                  <button 
                    onClick={() => {
                      setIsVisible(false);
                      onNavigate?.('privacy-policy');
                    }}
                    className="text-brand-teal hover:text-brand-teal-light underline"
                  >
                    Privacy Policy
                  </button>.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2.5 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-lg font-semibold transition-colors shadow-lg shadow-brand-teal/20"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleDeclineAll}
                    className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Decline Non-Essential
                  </button>
                  <button
                    onClick={() => setShowCustomize(true)}
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
export function getCookieConsent(): 'accepted' | 'declined' | 'customized' | null {
  const localConsent = localStorage.getItem('cookieConsent');
  const sessionConsent = sessionStorage.getItem('cookieConsent');
  
  if (localConsent === 'accepted') return 'accepted';
  if (localConsent === 'customized') return 'customized';
  if (sessionConsent === 'declined') return 'declined';
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
