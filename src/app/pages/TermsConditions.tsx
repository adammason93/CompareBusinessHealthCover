import { Scale, Shield, AlertCircle, FileText, Mail, MapPin, Info, CheckCircle2, XCircle, Users, Building } from "lucide-react";

interface TermsConditionsProps {
  onGetStarted: () => void;
}

export function TermsConditions({ onGetStarted }: TermsConditionsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-brand-surface to-brand-teal-muted">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-navy to-brand-navy-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-12 h-12 text-brand-teal-light" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
          </div>
          <div className="text-gray-300 space-y-1">
            <p className="text-xl">Compare Business Healthcover</p>
            <p>Effective Date: February 2026</p>
            <p>Last Updated: February 2026</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          
          {/* 1. Introduction */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms and Conditions ("Terms") govern your use of the Compare Business Healthcover website ("Website").
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using this Website, you agree to be legally bound by these Terms. If you do not agree, you must not use this Website.
            </p>
          </section>

          {/* 2. About Compare Business Healthcover */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">2. About Compare Business Healthcover</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Compare Business Healthcover is an online comparison and introducer service that connects individuals and businesses with Financial Conduct Authority (FCA) regulated insurance brokers and providers.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Compare Business Healthcover:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li className="text-gray-700 flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Is not an insurance company</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Does not provide insurance policies directly</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Does not provide financial or insurance advice</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Acts solely as an introducer</span>
              </li>
            </ul>
            <div className="bg-brand-surface rounded-xl p-6 space-y-3">
              <p className="font-semibold text-gray-900 mb-3">Contact details:</p>
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

          {/* 3. Our Service */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">3. Our Service</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Compare Business Healthcover provides an online platform that allows users to request information and quotes for health insurance products.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By submitting your information through this Website, you agree that:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>We may contact you regarding your enquiry</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>We may share your information with selected FCA-regulated brokers and insurance providers</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>These third parties may contact you directly by phone, email, or SMS</span>
              </li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-gray-900 font-semibold mb-2">Please Note:</p>
              <p className="text-gray-700">We do not guarantee that you will receive quotes or offers.</p>
            </div>
          </section>

          {/* 4. No Advice Provided */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">4. No Advice Provided</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Compare Business Healthcover does not provide financial, legal, or insurance advice.
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Any information on this Website is provided for general informational purposes only</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>You are responsible for assessing whether any insurance product is suitable for your needs</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Any insurance contract is entered into directly between you and the insurance broker or provider</span>
              </li>
            </ul>
          </section>

          {/* 5. Regulatory Status */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">5. Regulatory Status</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Compare Business Healthcover acts solely as an introducer.
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Insurance brokers and providers we work with are authorised and regulated by the Financial Conduct Authority (FCA)</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Compare Business Healthcover is not responsible for the advice, recommendations, products, or services provided by third parties</span>
              </li>
            </ul>
          </section>

          {/* 6. Accuracy of Information */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">6. Accuracy of Information</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree that:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>All information you provide is accurate and complete</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>You will not knowingly provide false or misleading information</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>We are not responsible for any consequences arising from inaccurate information provided by you</span>
              </li>
            </ul>
          </section>

          {/* 7. Third-Party Services and Liability */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">7. Third-Party Services and Liability</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Compare Business Healthcover introduces users to third-party insurance brokers and providers.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not control and are not responsible for:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Insurance products offered</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Quotes provided</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Advice given</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Contracts entered into</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Actions or omissions of third parties</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold">Important:</span> Any agreement you enter into is solely between you and the third-party provider.
            </p>
          </section>

          {/* 8. Limitation of Liability */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">8. Limitation of Liability</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the fullest extent permitted by law, Compare Business Healthcover shall not be liable for:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Any indirect or consequential loss</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Loss of profits, business, or opportunity</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Any decisions made based on third-party advice</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Website downtime or technical errors</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Loss resulting from insurance agreements</span>
              </li>
            </ul>
            <div className="bg-brand-surface border border-brand-teal/25 rounded-xl p-4">
              <p className="text-gray-700">
                <span className="font-semibold">Legal Note:</span> Nothing in these Terms excludes liability for death or personal injury caused by negligence, fraud, or any liability that cannot be excluded under UK law.
              </p>
            </div>
          </section>

          {/* 9. Website Availability */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">9. Website Availability</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not guarantee that the Website will always be available, uninterrupted, or error-free.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Modify or withdraw the Website</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Restrict access</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Suspend or terminate services</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">at any time without notice.</p>
          </section>

          {/* 10. Intellectual Property Rights */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">10. Intellectual Property Rights</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              All Website content, including text, logos, graphics, and design, is owned by or licensed to Compare Business Healthcover.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may not:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Copy</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Reproduce</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Distribute</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Modify</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">any content without prior written permission.</p>
          </section>

          {/* 11. Acceptable Use */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">11. Acceptable Use</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="space-y-2 ml-6 mb-4">
              <li className="text-gray-700 flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Use the Website for unlawful purposes</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Attempt to gain unauthorised access</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Interfere with Website functionality</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Submit false, fraudulent, or misleading information</span>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">We reserve the right to block access for misuse.</p>
          </section>

          {/* 12. Privacy and Data Protection */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">12. Privacy and Data Protection</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your personal data is processed in accordance with our Privacy Policy and UK GDPR.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using this Website, you consent to the collection and processing of your data as described in our Privacy Policy.
            </p>
          </section>

          {/* 13. Complaints */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">13. Complaints</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have a complaint about our service, please contact:
            </p>
            <div className="bg-brand-surface rounded-xl p-6 mb-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-teal-hover mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Email:</p>
                  <a href="mailto:info@comparebusinesshealthcover.co.uk" className="text-brand-teal-hover hover:text-brand-teal-hover">
                    info@comparebusinesshealthcover.co.uk
                  </a>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We will attempt to resolve complaints promptly.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Complaints relating to insurance products should be directed to the relevant insurance broker or provider.
            </p>
          </section>

          {/* 14. Indemnity */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">14. Indemnity</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to indemnify and hold harmless Compare Business Healthcover against any claims, damages, or losses arising from:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Your misuse of the Website</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>Your breach of these Terms</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-brand-teal-hover mt-1.5">•</span>
                <span>False information you provide</span>
              </li>
            </ul>
          </section>

          {/* 15. Changes to These Terms */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">15. Changes to These Terms</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to update these Terms at any time.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Updated Terms will be published on this page with the revised effective date.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Your continued use of the Website constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* 16. Governing Law */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">16. Governing Law</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms are governed by the laws of England and Wales.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          {/* 17. Contact Information */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-brand-teal-hover" />
              <h2 className="text-2xl font-bold text-gray-900">17. Contact Information</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-brand-surface rounded-xl p-6 space-y-3">
              <p className="font-semibold text-gray-900 mb-3">Compare Business Healthcover</p>
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
                  <p className="text-gray-700">123 Insurance Street, London, EC2A 4BX, United Kingdom</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}