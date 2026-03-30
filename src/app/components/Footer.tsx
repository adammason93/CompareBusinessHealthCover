import type { MouseEvent } from "react";
import { Star, Facebook, Instagram, Linkedin, MessageCircle, Phone, Mail, Twitter } from "lucide-react";

/** Set when you have an X/Twitter profile to link; icon stays hidden while null */
const TWITTER_PROFILE_URL: string | null = null;

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const hrefForPage = (page: string) => (page === 'home' ? '/' : `/${page}`);

const QUICK_LINKS: { page: string; label: string }[] = [
  { page: 'about-us', label: 'About Us' },
  { page: 'blog', label: 'Blog' },
  { page: 'contact-us', label: 'Contact us' },
  { page: 'health-insurance-guide', label: 'Health insurance guide' },
  { page: 'family-health-insurance', label: 'Family health insurance' },
  { page: 'self-employed-health-insurance', label: 'Self-employed health insurance' },
  { page: 'insurance-types', label: 'Insurance Types' },
  { page: 'insurers', label: 'UK health insurers' },
  { page: 'nhs-waiting-times-england', label: 'NHS waiting times (England)' },
  { page: 'bma-private-medical-insurance-guide', label: 'BMA private insurance guide' },
  { page: 'sitemap', label: 'Sitemap' },
  { page: 'disclaimer', label: 'Disclaimer' },
  { page: 'privacy-policy', label: 'Privacy Policy' },
  { page: 'terms-and-conditions', label: 'Terms & Conditions' },
  { page: 'cookie-policy', label: 'Cookie Policy' },
];

export function Footer({ onNavigate }: FooterProps = {}) {
  const handleNavClick = (page: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate?.(page);
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links — real <a href> for crawlers; SPA navigation on click */}
          <div>
            <h3 className="text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ page, label }) => (
                <li key={page}>
                  <a
                    href={hrefForPage(page)}
                    onClick={handleNavClick(page)}
                    className="hover:text-teal-500 text-left block"
                  >
                    {label}
                  </a>
                </li>
              ))}
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
                <a
                  href="https://www.facebook.com/profile.php?id=61575468412423"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-500"
                >
                  <Facebook className="w-5 h-5" aria-hidden />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/healthcovercomparison/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-500"
                >
                  <Instagram className="w-5 h-5" aria-hidden />
                  <span className="sr-only">Instagram</span>
                </a>
                {TWITTER_PROFILE_URL ? (
                  <a
                    href={TWITTER_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal-500"
                  >
                    <Twitter className="w-5 h-5" aria-hidden />
                    <span className="sr-only">X (Twitter)</span>
                  </a>
                ) : null}
                <a
                  href="https://www.linkedin.com/company/112598987/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-500"
                >
                  <Linkedin className="w-5 h-5" aria-hidden />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href={hrefForPage('contact-us')}
                  onClick={handleNavClick('contact-us')}
                  className="hover:text-teal-500"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden />
                  <span className="sr-only">Contact us</span>
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
          <a
            href="/"
            onClick={handleNavClick("home")}
            className="hover:text-teal-500 uppercase"
          >
            Compare Private Health Insurance
          </a>
          <a
            href="/insurance-types"
            onClick={handleNavClick("insurance-types")}
            className="hover:text-teal-500 uppercase"
          >
            Compare Health Insurance
          </a>
          <a
            href="/insurance-types"
            onClick={handleNavClick("insurance-types")}
            className="hover:text-teal-500 uppercase"
          >
            Compare Medical Insurance
          </a>
        </div>
      </div>
    </footer>
  );
}