import { ChevronDown, Menu, X } from "lucide-react";
import { useState, memo } from "react";
import { ContactFormModal } from "@/app/components/ContactFormModal";
import { BusinessCoverNavMenu } from "@/app/components/BusinessCoverNavMenu";
import { Logo } from "@/app/components/Logo";
import { BUSINESS_COVER_NAV_LABEL } from "@/app/config/navigation";

interface HeaderProps {
  onGetStarted: () => void;
  onNavigate: (page: string) => void;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onViewSubmissions?: () => void;
  user?: any;
}

export const Header = memo(function Header({ onGetStarted, onNavigate }: HeaderProps) {
  const [coverDropdownOpen, setCoverDropdownOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setCoverDropdownOpen(false);
  };

  return (
    <>
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <Logo onClick={() => onNavigate('home')} size="md" />

            <nav className="hidden lg:flex items-center gap-6">
              <div
                className="relative"
                onMouseEnter={() => setCoverDropdownOpen(true)}
                onMouseLeave={() => setCoverDropdownOpen(false)}
              >
                <button className="text-gray-900 hover:text-brand-teal flex items-center gap-1 py-2 whitespace-nowrap font-medium">
                  {BUSINESS_COVER_NAV_LABEL}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {coverDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-brand-navy text-white rounded-lg shadow-lg py-4 px-6 min-w-[300px]">
                      <BusinessCoverNavMenu onNavigate={onNavigate} />
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => onNavigate('about-us')}
                className="text-gray-900 hover:text-brand-teal py-2 whitespace-nowrap"
              >
                About Us
              </button>
              <button
                onClick={() => onNavigate('contact-us')}
                className="text-gray-900 hover:text-brand-teal py-2 whitespace-nowrap"
              >
                Contact Us
              </button>
              <button
                onClick={onGetStarted}
                className="bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full px-6 py-2.5 text-sm font-medium whitespace-nowrap"
              >
                Get SME Quote
              </button>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-brand-teal p-2"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <button
                  onClick={() => setCoverDropdownOpen(!coverDropdownOpen)}
                  className="flex items-center justify-between w-full text-gray-900 font-medium py-2"
                >
                  {BUSINESS_COVER_NAV_LABEL}
                  <ChevronDown className={`w-5 h-5 transition-transform ${coverDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {coverDropdownOpen && (
                  <div className="pl-4 mt-2">
                    <BusinessCoverNavMenu
                      onNavigate={onNavigate}
                      onItemClick={closeMobileMenu}
                      variant="mobile"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  onNavigate('about-us');
                  closeMobileMenu();
                }}
                className="block w-full text-left text-gray-900 font-medium py-2"
              >
                About Us
              </button>
              <button
                onClick={() => {
                  onNavigate('contact-us');
                  closeMobileMenu();
                }}
                className="block w-full text-left text-gray-900 font-medium py-2"
              >
                Contact Us
              </button>

              <button
                onClick={() => {
                  onGetStarted();
                  closeMobileMenu();
                }}
                className="w-full bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full px-6 py-3 font-medium text-center mt-4"
              >
                Get SME Quote
              </button>
            </div>
          </div>
        )}
      </header>

      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
});
