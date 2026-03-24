import { useState, useEffect } from 'react';
import { getCookieConsent, canUseAnalyticsCookies, getCookiePreferences } from './CookieManager';
import { Cookie, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

/**
 * Demo component to show cookie consent status
 * This is just for demonstration - remove in production
 */
export function CookieConsentDemo() {
  const [consentStatus, setConsentStatus] = useState<string>('');
  const [canUseAnalytics, setCanUseAnalytics] = useState(false);
  const [clarityLoaded, setClarityLoaded] = useState(false);
  const [preferences, setPreferences] = useState<any>(null);
  const [cookieCount, setCookieCount] = useState(0);

  useEffect(() => {
    const updateStatus = () => {
      const status = getCookieConsent();
      setConsentStatus(status || 'not-set');
      setCanUseAnalytics(canUseAnalyticsCookies());
      
      // Check if Clarity is loaded
      const isClarityLoaded = typeof (window as any).clarity !== 'undefined';
      setClarityLoaded(isClarityLoaded);
      
      // Load preferences
      const prefs = getCookiePreferences();
      setPreferences(prefs);
      
      // Count cookies
      const cookies = document.cookie.split(';').filter(c => c.trim()).length;
      setCookieCount(cookies);
    };

    updateStatus();

    // Listen for changes
    const interval = setInterval(updateStatus, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-lg p-4 border-2 border-teal-500/30 z-50 max-w-xs">
      <div className="flex items-center gap-2 mb-3">
        <Cookie className="w-5 h-5 text-teal-500" />
        <h4 className="font-bold text-sm">Cookie Status</h4>
        <span className="text-xs text-gray-400">(Demo)</span>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-medium">Consent:</span>
          <div className="flex items-center gap-1">
            {consentStatus === 'accepted' && (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-700 font-semibold">All Accepted</span>
              </>
            )}
            {consentStatus === 'customized' && (
              <>
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span className="text-blue-700 font-semibold">Customized</span>
              </>
            )}
            {consentStatus === 'declined' && (
              <>
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-700 font-semibold">Declined</span>
              </>
            )}
            {consentStatus === 'not-set' && (
              <>
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-700 font-semibold">Not Set</span>
              </>
            )}
          </div>
        </div>

        {preferences && (
          <div className="bg-gray-50 p-2 rounded space-y-1 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Essential:</span>
              <span className="text-green-600 font-semibold">✓ Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Analytics:</span>
              <span className={preferences.analytics ? 'text-green-600 font-semibold' : 'text-red-600'}>
                {preferences.analytics ? '✓ Active' : '✗ Blocked'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Marketing:</span>
              <span className={preferences.marketing ? 'text-green-600 font-semibold' : 'text-red-600'}>
                {preferences.marketing ? '✓ Active' : '✗ Blocked'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Functional:</span>
              <span className={preferences.functional ? 'text-green-600 font-semibold' : 'text-red-600'}>
                {preferences.functional ? '✓ Active' : '✗ Blocked'}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <span className="font-medium">MS Clarity:</span>
          <span className={clarityLoaded ? 'text-green-700' : 'text-red-700'}>
            {clarityLoaded ? '✓ Loaded' : '✗ Not Loaded'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium">Cookies:</span>
          <span className="text-gray-700 font-semibold">{cookieCount} active</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
        <p>Open browser console for logs</p>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem('cookieConsent');
          localStorage.removeItem('cookiePreferences');
          sessionStorage.removeItem('cookieConsent');
          window.location.reload();
        }}
        className="mt-2 w-full px-3 py-1.5 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
      >
        Reset & Reload
      </button>
    </div>
  );
}