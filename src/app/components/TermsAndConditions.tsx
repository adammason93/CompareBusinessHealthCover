import React from 'react';

interface TermsAndConditionsProps {
  onNavigate: (page: string) => void;
}

export function TermsAndConditions({ onNavigate }: TermsAndConditionsProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-[#2d2f5e] mb-4">Terms and Conditions</h1>
          <p className="text-gray-600">Last Updated: February 2026</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Compare Business Health Cover ("we", "our", "us"). These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.
            </p>
            <p className="text-gray-700">
              If you do not agree with any part of these terms, please do not use our website or services.
            </p>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">2. Our Services</h2>
            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">2.1 Comparison Service</h3>
            <p className="text-gray-700 mb-4">
              Compare Business Health Cover provides a free lead generation and comparison service for health insurance products. We connect you with insurance brokers and providers who can help you compare quotes based on the information you provide. Our brokers will contact you to discuss your requirements and assist you in finding suitable coverage.
            </p>
            
            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">2.2 Information Accuracy</h3>
            <p className="text-gray-700 mb-4">
              While we strive to provide accurate and up-to-date information, we do not guarantee the accuracy, completeness, or timeliness of the information provided. Insurance quotes are estimates and may vary based on final underwriting by insurance providers.
            </p>

            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">2.3 Not Financial Advice</h3>
            <p className="text-gray-700">
              Compare Business Health Cover is a lead generation service that connects you with insurance brokers and providers. We do not provide financial or insurance advice directly. The brokers and insurance specialists we connect you with are qualified to provide guidance, but you should ensure any advice is suitable for your individual circumstances before making insurance decisions.
            </p>
          </section>

          {/* User Obligations */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">3. Your Obligations</h2>
            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">3.1 Accurate Information</h3>
            <p className="text-gray-700 mb-4">
              You agree to provide accurate, current, and complete information when using our services. Providing false or misleading information may result in incorrect quotes and could affect your insurance application.
            </p>

            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">3.2 Account Security</h3>
            <p className="text-gray-700 mb-4">
              If you create an account, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>

            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">3.3 Prohibited Uses</h3>
            <p className="text-gray-700 mb-2">You agree not to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Use our services for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Transmit any viruses, malware, or harmful code</li>
              <li>Scrape, data mine, or extract data from our website</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with the proper functioning of our services</li>
            </ul>
          </section>

          {/* Quotes and Applications */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">4. Quotes and Applications</h2>
            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">4.1 Quote Validity</h3>
            <p className="text-gray-700 mb-4">
              Quotes provided through our service are indicative only and subject to change. Final insurance premiums are determined by the insurance provider based on full underwriting.
            </p>

            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">4.2 Application Process</h3>
            <p className="text-gray-700 mb-4">
              When you submit a quote request, we will share your information with relevant insurance providers. The insurance provider will contact you directly to complete the application process.
            </p>

            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">4.3 No Guarantee</h3>
            <p className="text-gray-700">
              We do not guarantee that you will be offered insurance cover or that any quote provided will result in a policy being issued. Insurance providers make their own underwriting decisions.
            </p>
          </section>

          {/* Fees and Commission */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">5. Fees and Commission</h2>
            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">5.1 Free Service</h3>
            <p className="text-gray-700 mb-4">
              Our comparison service is free for consumers. You will not be charged any fees for using our website or obtaining quotes.
            </p>

            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">5.2 Commission</h3>
            <p className="text-gray-700">
              We may receive commission from the broker when you purchase a policy through our service. This does not affect the price you pay for insurance.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content on this website, including text, graphics, logos, images, and software, is the property of Compare Business Health Cover or its content suppliers and is protected by copyright and intellectual property laws.
            </p>
            <p className="text-gray-700">
              You may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written consent.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">7. Limitation of Liability</h2>
            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">7.1 Service Availability</h3>
            <p className="text-gray-700 mb-4">
              We do not guarantee that our website or services will be available at all times or that they will be error-free. We may suspend or restrict access to our services at any time for maintenance or other reasons.
            </p>

            <h3 className="text-xl font-semibold text-[#0ebcc8] mb-3">7.2 Liability Exclusions</h3>
            <p className="text-gray-700 mb-4">
              To the fullest extent permitted by law, we exclude all liability for any direct, indirect, incidental, or consequential damages arising from your use of our services, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Errors or inaccuracies in information provided</li>
              <li>Decisions made based on information from our website</li>
              <li>Loss of data or business interruption</li>
              <li>Actions or omissions of insurance providers</li>
              <li>Unauthorized access to your personal information</li>
            </ul>
          </section>

          {/* Third Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">8. Third Party Links</h2>
            <p className="text-gray-700">
              Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of use of these third-party sites. Your use of third-party websites is at your own risk.
            </p>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">9. Data Protection</h2>
            <p className="text-gray-700">
              We process your personal data in accordance with UK data protection laws and our{' '}
              <button
                onClick={() => onNavigate('privacy-policy')}
                className="text-[#0ebcc8] hover:underline font-medium"
              >
                Privacy Policy
              </button>
              . By using our services, you consent to such processing.
            </p>
          </section>

          {/* Complaints */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">10. Complaints</h2>
            <p className="text-gray-700 mb-4">
              If you have a complaint about our services, please contact us at{' '}
              <a href="mailto:info@comparebusinesshealthcover.co.uk" className="text-[#0ebcc8] hover:underline">
                info@comparebusinesshealthcover.co.uk
              </a>
            </p>
            <p className="text-gray-700">
              We will acknowledge your complaint within 5 business days and aim to resolve it within 8 weeks. If you are not satisfied with our response, you may refer your complaint to the Financial Ombudsman Service.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">11. Changes to These Terms</h2>
            <p className="text-gray-700">
              We may update these Terms and Conditions from time to time. We will notify you of any material changes by posting the new terms on this page and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">12. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms and Conditions are governed by and construed in accordance with the laws of England and Wales. You agree to submit to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">13. Contact Information</h2>
            <p className="text-gray-700 mb-2">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:info@comparebusinesshealthcover.co.uk" className="text-[#0ebcc8] hover:underline">
                  info@comparebusinesshealthcover.co.uk
                </a>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> 01484 773038
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> 83, Hall Road Moorgate, Rotherham, South Yorkshire
              </p>
            </div>
          </section>

          {/* Acceptance */}
          <section className="bg-[#f0f9fa] p-6 rounded-lg border-l-4 border-[#0ebcc8]">
            <h2 className="text-xl font-bold text-[#2d2f5e] mb-3">Acceptance of Terms</h2>
            <p className="text-gray-700">
              By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="bg-[#0ebcc8] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0da5b5] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}