import { Phone, Mail } from "lucide-react";
import { Logo } from "@/app/components/Logo";
import { SITE, mailto } from "@/app/config/site";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  const handleNavigation = (page: string) => {
    onNavigate?.(page);
  };

  return (
    <footer className="bg-brand-navy-deeper text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl mb-4">Guides</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("business-health-insurance")}
                  className="hover:text-brand-teal text-left"
                >
                  Business health insurance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("small-company-health-insurance")}
                  className="hover:text-brand-teal text-left"
                >
                  Small company cover
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("sme-health-insurance-2-employees")}
                  className="hover:text-brand-teal text-left"
                >
                  Cover from 2 employees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("sme-health-insurance-cost")}
                  className="hover:text-brand-teal text-left"
                >
                  SME cost guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("business-health-insurance-tax")}
                  className="hover:text-brand-teal text-left"
                >
                  Tax treatment
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("insurance-types")}
                  className="hover:text-brand-teal text-left"
                >
                  Types of cover
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("small-business-health-insurance-providers")}
                  className="hover:text-brand-teal text-left"
                >
                  Providers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("about-us")}
                  className="hover:text-brand-teal text-left"
                >
                  About us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("how-we-compare")}
                  className="hover:text-brand-teal text-left"
                >
                  How we compare
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("editorial-policy")}
                  className="hover:text-brand-teal text-left"
                >
                  Editorial policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("blog")}
                  className="hover:text-brand-teal text-left"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("sitemap")}
                  className="hover:text-brand-teal text-left"
                >
                  Sitemap
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("disclaimer")}
                  className="hover:text-brand-teal text-left"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("privacy-policy")}
                  className="hover:text-brand-teal text-left"
                >
                  Privacy policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("terms-conditions")}
                  className="hover:text-brand-teal text-left"
                >
                  Terms &amp; conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("cookie-policy")}
                  className="hover:text-brand-teal text-left"
                >
                  Cookie policy
                </button>
              </li>
            </ul>
            <p className="mt-4 text-sm">ICO Registration: ZC107389</p>
          </div>

          <div>
            <h3 className="text-xl mb-4">Contact us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-brand-teal">
                  {SITE.phoneDisplay}
                </a>
              </div>
              {SITE.showPublicEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href={mailto()} className="hover:text-brand-teal text-sm break-all">
                    {SITE.email}
                  </a>
                </div>
              )}
              <div className="text-sm text-gray-400 mt-2">
                83, Hall Road Moorgate
                <br />
                Rotherham
                <br />
                South Yorkshire
              </div>
            </div>
          </div>

          <div className="flex justify-center items-start">
            <Logo onClick={() => handleNavigation("home")} size="lg" />
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="max-w-5xl mx-auto space-y-4 text-xs text-gray-400 leading-relaxed">
            <p>
              {SITE.name} operates as an introducer and comparison service and does not act as an
              insurance provider or offer financial advice. By submitting your details, you agree to
              be contacted by {SITE.name} and our FCA regulated broker partners and/or providers via
              phone and email.
            </p>
            <p>
              All quotes and policies are arranged and administered by our broker partners and/or
              Insurance providers and remain subject to eligibility, underwriting criteria, and their
              respective terms and conditions. {SITE.name} accepts no liability for the products,
              services, or advice provided by these broker partners or providers.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="max-w-5xl mx-auto text-center text-xs text-gray-400 space-y-2">
            <p className="font-semibold text-gray-300">Company Information</p>
            <p>
              {SITE.name} is a trading name for{" "}
              <span className="text-gray-300">MASON & HALL DIGITAL LTD</span>, which is a registered
              company in England and Wales.
            </p>
            <p>
              Company No.: <span className="text-gray-300">17086378</span> | Registered Address:{" "}
              <span className="text-gray-300">
                83, Hall Road Moorgate, Rotherham, South Yorkshire
              </span>{" "}
              | ICO Registration No.: <span className="text-gray-300">ZC107389</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
