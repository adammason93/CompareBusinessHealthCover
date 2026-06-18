import { AlertTriangle, Info, Mail, Shield } from "lucide-react";

interface DisclaimerProps {
  onGetStarted: () => void;
}

export function Disclaimer({ onGetStarted }: DisclaimerProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#202555' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <AlertTriangle className="w-16 h-16 text-brand-teal-light" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Disclaimer
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Important information about our services
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Company Information */}
            <div className="mb-12 p-6 bg-gray-50 rounded-xl border-l-4 border-brand-teal">
              <div className="flex items-start gap-3 mb-4">
                <Info className="w-6 h-6 text-brand-teal-hover flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 m-0 mb-4">Company Information</h2>
                  <div className="space-y-2 text-gray-700">
                    <p className="mb-2">
                      <strong>Compare Business Healthcover</strong> is a trading name for <strong>MASON & HALL DIGITAL LTD</strong> which is a registered company in England and Wales.
                    </p>
                    <p><strong>Company No.:</strong> 17086378</p>
                    <p><strong>Registered Address:</strong> 83, Hall Road Moorgate, Rotherham, South Yorkshire</p>
                    <p><strong>ICO Registration No.:</strong> ZC107389</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nature of Service */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-brand-teal" />
                <h2 className="text-2xl font-bold text-gray-900 m-0">Nature of Our Service</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Compare Business Healthcover is a website designed to help people looking into health insurance. We are <strong>not</strong> a private health insurance company or a broker and are not able to offer any advice on any regulated financial services products.
              </p>
              <p className="text-gray-700 mb-4">
                We are an introduction-based service and have partnerships with a number of handpicked FCA regulated firms who can offer advice on private health insurance and other financial services products. The Terms and Conditions of those partners may vary.
              </p>
            </div>

            {/* User Responsibility */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Responsibility</h2>
              <p className="text-gray-700 mb-4">
                If you enter an agreement through one of our partners then you do so at your own risk and must comply with their terms and conditions. Compare Business Healthcover will not be liable for any loss or damage in connection with using this website.
              </p>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-900 text-sm mb-0">
                  <strong>Important:</strong> Any information we provide is for general information purposes only and should not be taken as financial advice.
                </p>
              </div>
            </div>

            {/* Revenue Model */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Earn Revenue</h2>
              <p className="text-gray-700">
                We are a free service for users. We earn our revenue by receiving a commission from our partners following a successful introduction from this website. This does not affect the price you pay for insurance.
              </p>
            </div>

            {/* Accuracy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Accuracy</h2>
              <p className="text-gray-700 mb-4">
                Compare Business Healthcover does not guarantee the total accuracy of the information on our site and does not accept any liability for any inaccuracies or errors.
              </p>
              <p className="text-gray-700">
                While we strive to keep all information current and accurate, insurance products, prices, and terms can change. We recommend verifying all details directly with the insurance provider before making any decisions.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Trademarks and Logos</h2>
              <p className="text-gray-700 mb-4">
                All insurer logos, policy names and brands are property of their respective owners. Any company, product and service names displayed on this site are for information purposes only.
              </p>
              <p className="text-gray-700">
                Use of these names, logos, and brands does not imply that we are endorsed by these companies.
              </p>
            </div>

            {/* Panel Coverage */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Insurer Panel</h2>
              <p className="text-gray-700">
                Some of the brokers we work with may not provide quotes from all of the insurers featured on our website. We work with a selected panel of insurance providers and brokers, but this does not represent the entire market.
              </p>
            </div>

            {/* Not Financial Advice */}
            <div className="mb-12 p-6 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Financial Advice</h2>
              <p className="text-gray-700 mb-0">
                Any information we provide is for general information purposes only and should <strong>not</strong> be taken as financial advice. For personalized advice on health insurance products, please consult with one of our FCA regulated partner firms or seek independent financial advice.
              </p>
            </div>

            {/* Regulatory Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Information</h2>
              <p className="text-gray-700 mb-4">
                Our partner firms are authorized and regulated by the Financial Conduct Authority (FCA). You can verify their regulatory status on the FCA Register at <a href="https://register.fca.org.uk" target="_blank" rel="noopener noreferrer" className="text-brand-teal-hover hover:text-brand-teal-hover underline">register.fca.org.uk</a>.
              </p>
              <p className="text-gray-700">
                Compare Business Healthcover itself is not authorized or regulated by the FCA as we do not provide financial advice or arrange insurance contracts.
              </p>
            </div>

            {/* Changes to Disclaimer */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Disclaimer</h2>
              <p className="text-gray-700">
                We may update this disclaimer from time to time. Any changes will be posted on this page, and we encourage you to review this disclaimer periodically. Your continued use of our website following any changes constitutes acceptance of those changes.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12 p-6 bg-brand-teal-muted rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-8 h-8 text-brand-teal-hover" />
                <h2 className="text-2xl font-bold text-gray-900 m-0">Contact Us</h2>
              </div>
              <p className="text-gray-700 mb-4">
                For more information around anything in this disclaimer statement or to report an issue with the content of this site, please email us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> <a href="mailto:info@comparebusinesshealthcover.co.uk" className="text-brand-teal-hover hover:text-brand-teal-hover">info@comparebusinesshealthcover.co.uk</a></p>
                <p><strong>Phone:</strong> 01484 773038</p>
                <p><strong>Address:</strong> 83, Hall Road Moorgate, Rotherham, South Yorkshire</p>
              </div>
            </div>

            {/* Final Notice */}
            <div className="p-6 bg-gray-100 rounded-xl border border-gray-300">
              <p className="text-gray-700 text-sm mb-0">
                <strong>Last Updated:</strong> January 2025
              </p>
              <p className="text-gray-700 text-sm mt-2 mb-0">
                By using this website, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}