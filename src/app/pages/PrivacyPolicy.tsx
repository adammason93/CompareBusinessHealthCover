import { Shield, Mail, MapPin, Lock, Clock, UserCheck, FileText, ExternalLink } from "lucide-react";

interface PrivacyPolicyProps {
  onGetStarted: () => void;
}

export function PrivacyPolicy({ onGetStarted }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-brand-surface to-brand-teal-muted">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-navy to-brand-navy-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-brand-teal-light" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-gray-300">
            Last updated: February 2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              Compare Business Healthcover ("we", "us", "our") is committed to protecting your privacy and handling your personal data transparently and securely.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              This Privacy Policy explains how we collect, use, and protect your personal information in accordance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
            </p>
          </div>

          {/* 1. Who We Are */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">1. Who We Are</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Compare Business Healthcover is a health insurance comparison service that connects users with FCA-regulated insurance brokers and providers.
            </p>
            <div className="bg-brand-surface rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-teal-hover mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Email:</p>
                  <a href="mailto:info@comparebusinesshealthcover.co.uk" className="text-brand-teal-hover hover:text-brand-teal-hover">
                    info@comparebusinesshealthcover.co.uk
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-teal-hover mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Address:</p>
                  <p className="text-gray-700">83, Hall Road Moorgate, Rotherham, South Yorkshire</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Information We Collect */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect the following personal information:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Name</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Email address</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Phone number</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Company name (if applicable)</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Insurance requirements</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>IP address</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Website usage data</span>
              </li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Respond to your enquiries</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Connect you with FCA-regulated insurance brokers and providers</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Provide insurance quotes</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Improve our website and services</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Prevent fraud</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">Legal basis:</span> Consent and legitimate interest.
            </p>
          </section>

          {/* 4. Sharing Your Information */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">4. Sharing Your Information</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>FCA-regulated insurance brokers</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Insurance providers</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>IT and hosting providers</span>
              </li>
            </ul>
            <div className="bg-brand-teal-muted border border-brand-teal/20 rounded-xl p-4">
              <p className="text-gray-900 font-semibold mb-2">Important:</p>
              <p className="text-gray-700">
                We do not sell your personal data to unrelated third parties. All partners are required to comply with UK GDPR.
              </p>
            </div>
          </section>

          {/* 5. How Long We Keep Your Data */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">5. How Long We Keep Your Data</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain personal data only as long as necessary, typically:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Up to 12 months for enquiries</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Longer if required for legal or regulatory reasons</span>
              </li>
            </ul>
          </section>

          {/* 6. Your Rights */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">6. Your Rights</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Access your personal data</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Correct inaccurate data</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Request deletion</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Restrict processing</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Withdraw consent</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Lodge a complaint with the ICO</span>
              </li>
            </ul>
            <div className="bg-brand-surface border border-brand-teal/25 rounded-xl p-4 flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-brand-teal-hover mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-900 font-semibold mb-1">Information Commissioner's Office (ICO)</p>
                <a 
                  href="https://ico.org.uk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-teal-hover hover:text-brand-navy-dark underline"
                >
                  https://ico.org.uk
                </a>
              </div>
            </div>
          </section>

          {/* 7. Data Security */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">7. Data Security</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organisational measures to protect your data. This includes encryption, secure servers, access controls, and regular security audits to ensure your information remains safe and confidential.
            </p>
          </section>

          {/* 8. Cookies */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">8. Cookies</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We may use cookies to improve user experience and website functionality. Cookies help us understand how you use our website, remember your preferences, and provide personalised content. You can control cookie settings through your browser preferences.
            </p>
          </section>

          {/* 9. Changes to This Policy */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">9. Changes to This Policy</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We may update this policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated policy on our website with a revised "Last updated" date.
            </p>
          </section>

          {/* 10. Contact Us */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">10. Contact Us</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or how we handle your personal data, please contact us:
            </p>
            <div className="bg-brand-surface rounded-xl p-6 space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-teal-hover mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Email:</p>
                  <a href="mailto:info@comparebusinesshealthcover.co.uk" className="text-brand-teal-hover hover:text-brand-teal-hover">
                    info@comparebusinesshealthcover.co.uk
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-teal-hover mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Address:</p>
                  <p className="text-gray-700">83, Hall Road Moorgate, Rotherham, South Yorkshire</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}