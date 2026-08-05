import { useState } from 'react';
import { Cookie } from 'lucide-react';
import { resetCookieConsent } from './CookieManager';

/**
 * Floating button that allows users to change cookie preferences at any time
 */
export function CookieSettingsButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    resetCookieConsent();
    window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 left-6 z-30 bg-gradient-to-r from-[#16233d] to-[#1D2D50] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-teal/30 hover:border-brand-teal/50 group"
      aria-label="Cookie Settings"
      title="Cookie Settings"
    >
      <Cookie className="w-5 h-5 text-brand-teal group-hover:scale-110 transition-transform" />
      
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
          Cookie Settings
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </button>
  );
}
