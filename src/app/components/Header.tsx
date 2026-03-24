import { ChevronDown, Search, Menu, X } from "lucide-react";
import { useState, memo } from "react";
import { ContactFormModal } from "@/app/components/ContactFormModal";

interface HeaderProps {
  onGetStarted: () => void;
  onNavigate: (page: string) => void;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  onViewSubmissions?: () => void;
  user?: any;
}

export const Header = memo(function Header({ onGetStarted, onNavigate }: HeaderProps) {
  const [healthDropdownOpen, setHealthDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      alert(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <>
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => onNavigate('home')} className="text-2xl font-bold text-teal-500">
              HealthCoverComparison
            </button>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <div 
                className="relative"
                onMouseEnter={() => setHealthDropdownOpen(true)}
                onMouseLeave={() => setHealthDropdownOpen(false)}
              >
                <button className="text-gray-900 hover:text-teal-500 flex items-center gap-1 py-2 whitespace-nowrap">
                  Health Insurance
                  <ChevronDown className="w-4 h-4" />
                </button>
                {healthDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-black text-white rounded-lg shadow-lg py-4 px-6 min-w-[280px]">
                      <ul className="space-y-3">
                        <li>
                          <button 
                            onClick={() => onNavigate('health-insurance-guide')}
                            className="hover:text-teal-500 block w-full text-left"
                          >
                            Health Insurance Guide
                          </button>
                        </li>
                        <li>
                          <button 
                            onClick={() => onNavigate('business-health-insurance')}
                            className="hover:text-teal-500 block w-full text-left"
                          >
                            Business Health Insurance
                          </button>
                        </li>
                        <li>
                          <button 
                            onClick={() => onNavigate('self-employed-health-insurance')}
                            className="hover:text-teal-500 block w-full text-left"
                          >
                            Self Employed Health Insurance
                          </button>
                        </li>
                        <li>
                          <button 
                            onClick={() => onNavigate('corporate-health-insurance')}
                            className="hover:text-teal-500 block w-full text-left"
                          >
                            Corporate Health Insurance
                          </button>
                        </li>
                        <li>
                          <button 
                            onClick={() => onNavigate('family-health-insurance')}
                            className="hover:text-teal-500 block w-full text-left"
                          >
                            Family Health Insurance
                          </button>
                        </li>
                        <li>
                          <button 
                            onClick={() => onNavigate('senior-health-insurance')}
                            className="hover:text-teal-500 block w-full text-left"
                          >
                            Senior Health Insurance
                          </button>
                        </li>
                        <li>
                          <button 
                            onClick={() => onNavigate('international-health-insurance')}
                            className="hover:text-teal-500 block w-full text-left"
                          >
                            International Health Insurance
                          </button>
                        </li>
                        <li>
                          <button 
                            onClick={() => onNavigate('small-company-health-insurance')}
                            className="hover:text-teal-500 block w-full text-left"
                          >
                            Small Company Health Insurance
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <button 
                onClick={() => onNavigate('about-us')}
                className="text-gray-900 hover:text-teal-500 py-2 whitespace-nowrap"
              >
                About Us
              </button>
              <button 
                onClick={() => onNavigate('contact-us')}
                className="text-gray-900 hover:text-teal-500 py-2 whitespace-nowrap"
              >
                Contact Us
              </button>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-full px-4 py-2 pr-10 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 w-48 xl:w-64 text-sm"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-teal-500 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Health Insurance Dropdown */}
              <div>
                <button 
                  onClick={() => setHealthDropdownOpen(!healthDropdownOpen)}
                  className="flex items-center justify-between w-full text-gray-900 font-medium py-2"
                >
                  Health Insurance
                  <ChevronDown className={`w-5 h-5 transition-transform ${healthDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {healthDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <button 
                      onClick={() => {
                        onNavigate('health-insurance-guide');
                        setMobileMenuOpen(false);
                        setHealthDropdownOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-teal-500 py-2 text-sm"
                    >
                      Health Insurance Guide
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('business-health-insurance');
                        setMobileMenuOpen(false);
                        setHealthDropdownOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-teal-500 py-2 text-sm"
                    >
                      Business Health Insurance
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('self-employed-health-insurance');
                        setMobileMenuOpen(false);
                        setHealthDropdownOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-teal-500 py-2 text-sm"
                    >
                      Self Employed Health Insurance
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('corporate-health-insurance');
                        setMobileMenuOpen(false);
                        setHealthDropdownOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-teal-500 py-2 text-sm"
                    >
                      Corporate Health Insurance
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('family-health-insurance');
                        setMobileMenuOpen(false);
                        setHealthDropdownOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-teal-500 py-2 text-sm"
                    >
                      Family Health Insurance
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('senior-health-insurance');
                        setMobileMenuOpen(false);
                        setHealthDropdownOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-teal-500 py-2 text-sm"
                    >
                      Senior Health Insurance
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('international-health-insurance');
                        setMobileMenuOpen(false);
                        setHealthDropdownOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-teal-500 py-2 text-sm"
                    >
                      International Health Insurance
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('small-company-health-insurance');
                        setMobileMenuOpen(false);
                        setHealthDropdownOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 hover:text-teal-500 py-2 text-sm"
                    >
                      Small Company Health Insurance
                    </button>
                  </div>
                )}
              </div>

              {/* Other Links */}
              <button 
                onClick={() => {
                  onNavigate('about-us');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-gray-900 font-medium py-2"
              >
                About Us
              </button>
              <button 
                onClick={() => {
                  onNavigate('contact-us');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-gray-900 font-medium py-2"
              >
                Contact Us
              </button>

              {/* Mobile Search Bar */}
              <form onSubmit={handleSearch} className="pt-4 border-t">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-full px-4 py-3 pr-10 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Get A Quote Button */}
              <button
                onClick={() => {
                  onGetStarted();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-full px-6 py-3 font-medium text-center mt-4"
              >
                Get A Quote
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
});