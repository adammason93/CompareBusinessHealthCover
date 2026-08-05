import { Star, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Phone, Mail } from "lucide-react";
import { Logo } from "@/app/components/Logo";
import { SITE, mailto } from "@/app/config/site";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  const handleNavigation = (page: string) => {
    console.log('🔗 Footer navigation to:', page);
    onNavigate?.(page);
  };

  return (
    <footer className="bg-brand-navy-deeper text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('about-us')}
                  className="hover:text-brand-teal text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('insurance-types')}
                  className="hover:text-brand-teal text-left"
                >
                  Insurance Types
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('partner-insurers')}
                  className="hover:text-brand-teal text-left"
                >
                  Partner Insurers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('sitemap')}
                  className="hover:text-brand-teal text-left"
                >
                  Sitemap
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('disclaimer')}
                  className="hover:text-brand-teal text-left"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('privacy-policy')}
                  className="hover:text-brand-teal text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('terms-and-conditions')}
                  className="hover:text-brand-teal text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('cookie-policy')}
                  className="hover:text-brand-teal text-left"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
            <p className="mt-4 text-sm">ICO Registration: ZC107389</p>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:text-brand-teal">{SITE.phoneDisplay}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={mailto()} className="hover:text-brand-teal text-sm break-all">
                  {SITE.email}
                </a>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                83, Hall Road Moorgate<br />
                Rotherham<br />
                South Yorkshire
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a href="#" className="hover:text-brand-teal">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-brand-teal">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-brand-teal">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-brand-teal">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-brand-teal">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Google Rating */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">G</div>
              <div>
                <div className="text-sm">Customer Reviews</div>
                <div className="flex items-center gap-1">
                  <span>5.0</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="flex justify-center items-start">
            <Logo onClick={() => handleNavigation('home')} size="lg" />
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="max-w-5xl mx-auto space-y-4 text-xs text-gray-400 leading-relaxed">
            <p>
              {SITE.name} operates as an introducer and comparison service and does not act as an insurance provider or offer financial advice. By submitting your details, you agree to be contacted by {SITE.name} and our FCA regulated broker partners and/or providers via phone and email.
            </p>
            <p>
              All quotes and policies are arranged and administered by our broker partners and/or Insurance providers and remain subject to eligibility, underwriting criteria, and their respective terms and conditions. {SITE.name} accepts no liability for the products, services, or advice provided by these broker partners or providers.
            </p>
          </div>
        </div>

        {/* Company Information */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="max-w-5xl mx-auto text-center text-xs text-gray-400 space-y-2">
            <p className="font-semibold text-gray-300">Company Information</p>
            <p>
              {SITE.name} is a trading name for <span className="text-gray-300">MASON & HALL DIGITAL LTD</span>, which is a registered company in England and Wales.
            </p>
            <p>
              Company No.: <span className="text-gray-300">17086378</span> | 
              Registered Address: <span className="text-gray-300">83, Hall Road Moorgate, Rotherham, South Yorkshire</span> | 
              ICO Registration No.: <span className="text-gray-300">ZC107389</span>
            </p>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-800 pt-6 flex flex-wrap justify-center gap-4 text-xs">
          <a href="#" className="hover:text-brand-teal uppercase">Compare SME Health Insurance</a>
          <a href="#" className="hover:text-brand-teal uppercase">Compare Business Healthcover</a>
          <a href="#" className="hover:text-brand-teal uppercase">Employee Health Benefits</a>
        </div>
      </div>
    </footer>
  );
}