import React from 'react';
import { Cookie, Shield, Settings, Info } from 'lucide-react';

interface CookiePolicyProps {
  onNavigate: (page: string) => void;
}

export function CookiePolicy({ onNavigate }: CookiePolicyProps) {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Strictly Necessary Cookies',
      description: 'Essential for the website to function properly. Cannot be disabled.',
      examples: [
        'Session cookies for form submissions',
        'Authentication cookies for logged-in users',
        'Security cookies to prevent fraud',
        'Cookie consent preferences'
      ],
      duration: 'Session or up to 1 year'
    },
    {
      icon: Settings,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization.',
      examples: [
        'Remember your preferences and settings',
        'Store form data to prevent re-entry',
        'Language and region preferences',
        'Chat widget functionality'
      ],
      duration: 'Up to 2 years'
    },
    {
      icon: Info,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website.',
      examples: [
        'Google Analytics tracking',
        'Page view statistics',
        'User journey analysis',
        'Performance monitoring'
      ],
      duration: 'Up to 2 years'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-[#2fc4bf] rounded-lg flex items-center justify-center">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#1D2D50]">Cookie Policy</h1>
              <p className="text-gray-600 mt-2">Last Updated: February 2026</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-[#1D2D50] mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
            </p>
            <p className="text-gray-700">
              This Cookie Policy explains what cookies are, how we use them, and your choices regarding cookies on Compare Business Healthcover.
            </p>
          </section>

          {/* Why We Use Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-[#1D2D50] mb-4">Why We Use Cookies</h2>
            <p className="text-gray-700 mb-4">We use cookies to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Keep you signed in to your account</li>
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve our website performance and user experience</li>
              <li>Provide personalized content and recommendations</li>
              <li>Analyze website traffic and user behavior</li>
              <li>Enable essential website functionality</li>
            </ul>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-[#1D2D50] mb-6">Types of Cookies We Use</h2>
            <div className="space-y-6">
              {cookieTypes.map((type, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#2fc4bf] rounded-lg flex items-center justify-center flex-shrink-0">
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1D2D50] mb-2">{type.title}</h3>
                      <p className="text-gray-600 mb-3">{type.description}</p>
                    </div>
                  </div>
                  
                  <div className="ml-16">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Examples:</p>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mb-3">
                      {type.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-500">
                      <strong>Duration:</strong> {type.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Specific Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-[#1D2D50] mb-4">Specific Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Cookie Name</th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Purpose</th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">user</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">Stores user authentication data</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">Session</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">authToken</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">Authentication token for logged-in users</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">1 hour</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">formData</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">Saves form progress locally</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">30 days</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">cookieConsent</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">Remembers your cookie preferences</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">_ga</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">Google Analytics - tracks user sessions</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">2 years</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">_gid</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">Google Analytics - distinguishes users</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Third Party Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-[#1D2D50] mb-4">Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use services from trusted third parties that may also set cookies on your device:
            </p>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#1D2D50] mb-2">Google Analytics</h3>
                <p className="text-gray-600 text-sm mb-2">
                  We use Google Analytics to understand how visitors interact with our website. This helps us improve our services and user experience.
                </p>
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#2fc4bf] hover:underline text-sm"
                >
                  View Google's Privacy Policy →
                </a>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-[#1D2D50] mb-2">Supabase</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Our authentication and database services are provided by Supabase. They may set cookies for session management and security.
                </p>
                <a 
                  href="https://supabase.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#2fc4bf] hover:underline text-sm"
                >
                  View Supabase's Privacy Policy →
                </a>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-[#1D2D50] mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-gray-700 mb-4">
              You have several options to manage or disable cookies:
            </p>
            
            <h3 className="text-xl font-semibold text-[#2fc4bf] mb-3">Browser Settings</h3>
            <p className="text-gray-700 mb-3">
              Most web browsers allow you to control cookies through their settings. You can set your browser to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
              <li>Block all cookies</li>
              <li>Only accept first-party cookies</li>
              <li>Delete cookies when you close your browser</li>
              <li>Notify you when a cookie is set</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#2fc4bf] mb-3">Browser-Specific Instructions</h3>
            <div className="space-y-2 mb-4">
              <p className="text-gray-700">
                <strong>Chrome:</strong>{' '}
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#2fc4bf] hover:underline">
                  Cookie settings in Chrome
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Firefox:</strong>{' '}
                <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-[#2fc4bf] hover:underline">
                  Cookie settings in Firefox
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Safari:</strong>{' '}
                <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#2fc4bf] hover:underline">
                  Cookie settings in Safari
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Edge:</strong>{' '}
                <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#2fc4bf] hover:underline">
                  Cookie settings in Edge
                </a>
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-gray-700 text-sm">
                <strong>Please note:</strong> Disabling cookies may affect the functionality of our website. Some features may not work properly if cookies are blocked.
              </p>
            </div>
          </section>

          {/* Opt Out */}
          <section>
            <h2 className="text-2xl font-bold text-[#1D2D50] mb-4">Opt-Out Options</h2>
            <p className="text-gray-700 mb-4">
              You can opt out of specific types of cookies:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2fc4bf] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <p className="text-gray-700">
                    <strong>Google Analytics:</strong> Use the{' '}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#2fc4bf] hover:underline">
                      Google Analytics Opt-out Browser Add-on
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2fc4bf] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <p className="text-gray-700">
                    <strong>Advertising Cookies:</strong> Visit{' '}
                    <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-[#2fc4bf] hover:underline">
                      Your Online Choices
                    </a> to opt out of interest-based advertising
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold text-[#1D2D50] mb-4">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by updating the "Last Updated" date at the top of this page.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-[#1D2D50] mb-4">Questions About Cookies?</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:info@comparebusinesshealthcover.co.uk" className="text-[#2fc4bf] hover:underline">
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

          {/* Related Links */}
          <section className="bg-[#f0f9fa] p-6 rounded-lg border-l-4 border-[#2fc4bf]">
            <h3 className="text-xl font-bold text-[#1D2D50] mb-3">Related Policies</h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('privacy-policy')}
                className="text-[#2fc4bf] hover:underline font-medium block"
              >
                → Privacy Policy
              </button>
              <button
                onClick={() => onNavigate('terms-conditions')}
                className="text-[#2fc4bf] hover:underline font-medium block"
              >
                → Terms and Conditions
              </button>
            </div>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="bg-[#2fc4bf] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0da5b5] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}