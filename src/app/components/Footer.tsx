import { Star, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Phone, Mail } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  const handleNavigation = (page: string) => {
    console.log('🔗 Footer navigation to:', page);
    onNavigate?.(page);
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('about-us')}
                  className="hover:text-teal-500 text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('insurance-types')}
                  className="hover:text-teal-500 text-left"
                >
                  Insurance Types
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('partner-insurers')}
                  className="hover:text-teal-500 text-left"
                >
                  Partner Insurers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('nhs-waiting-times-england')}
                  className="hover:text-teal-500 text-left"
                >
                  NHS waiting times (England)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('bma-private-medical-insurance-guide')}
                  className="hover:text-teal-500 text-left"
                >
                  BMA private insurance guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('sitemap')}
                  className="hover:text-teal-500 text-left"
                >
                  Sitemap
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('disclaimer')}
                  className="hover:text-teal-500 text-left"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('privacy-policy')}
                  className="hover:text-teal-500 text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('terms-and-conditions')}
                  className="hover:text-teal-500 text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('cookie-policy')}
                  className="hover:text-teal-500 text-left"
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
                <a href="tel:01484773038" className="hover:text-teal-500">01484 773038</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@healthcovercomparison.co.uk" className="hover:text-teal-500 text-sm break-all">
                  info@healthcovercomparison.co.uk
                </a>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                83, Hall Road Moorgate<br />
                Rotherham<br />
                South Yorkshire
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a href="#" className="hover:text-teal-500">
                  <Facebook className="w-5 h-5" aria-hidden />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="hover:text-teal-500">
                  <Twitter className="w-5 h-5" aria-hidden />
                  <span className="sr-only">X (Twitter)</span>
                </a>
                <a href="#" className="hover:text-teal-500">
                  <Instagram className="w-5 h-5" aria-hidden />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="hover:text-teal-500">
                  <Linkedin className="w-5 h-5" aria-hidden />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="#" className="hover:text-teal-500">
                  <MessageCircle className="w-5 h-5" aria-hidden />
                  <span className="sr-only">Contact us via message</span>
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
        </div>

        {/* Disclaimer Notice */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="max-w-5xl mx-auto space-y-4 text-xs text-gray-400 leading-relaxed">
            <p>
              Healthcovercomparison operates as an introducer and comparison service and does not act as an insurance provider or offer financial advice. By submitting your details, you agree to be contacted by Healthcovercomparison and our FCA regulated broker partners and/or providers via phone and email.
            </p>
            <p>
              All quotes and policies are arranged and administered by our broker partners and/or Insurance providers and remain subject to eligibility, underwriting criteria, and their respective terms and conditions. Healthcovercomparison accepts no liability for the products, services, or advice provided by these broker partners or providers.
            </p>
          </div>
        </div>

        {/* Company Information */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="max-w-5xl mx-auto text-center text-xs text-gray-400 space-y-2">
            <p className="font-semibold text-gray-300">Company Information</p>
            <p>
              HealthCoverComparison is a trading name for <span className="text-gray-300">MASON & HALL DIGITAL LTD</span>, which is a registered company in England and Wales.
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
          <a href="#" className="hover:text-teal-500 uppercase">Compare Private Health Insurance</a>
          <a href="#" className="hover:text-teal-500 uppercase">Compare Health Insurance</a>
          <a href="#" className="hover:text-teal-500 uppercase">Compare Medical Insurance</a>
        </div>
      </div>
    </footer>
  );
}