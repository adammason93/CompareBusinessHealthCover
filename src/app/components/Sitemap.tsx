import React from 'react';
import { FileText, Users, Shield, Mail, Phone, MapPin } from 'lucide-react';
import { SITE } from '@/app/config/site';

interface SitemapProps {
  onNavigate: (page: string) => void;
}

export function Sitemap({ onNavigate }: SitemapProps) {
  const sitemapSections = [
    {
      title: 'Main Pages',
      icon: FileText,
      links: [
        { label: 'Home', page: 'home' },
        { label: 'Blog', page: 'blog' },
        { label: 'About Us', page: 'about-us' },
        { label: 'Contact Us', page: 'contact-us' },
        { label: 'My Submissions', page: 'my-submissions' }
      ]
    },
    {
      title: 'SME health insurance',
      icon: Shield,
      links: [
        { label: 'Business health insurance', page: 'business-health-insurance' },
        { label: 'Small company cover', page: 'small-company-health-insurance' },
        { label: 'From 2 employees', page: 'sme-health-insurance-2-employees' },
        { label: 'Cost guide', page: 'sme-health-insurance-cost' },
        { label: 'Tax treatment', page: 'business-health-insurance-tax' },
        { label: 'Renewals', page: 'business-health-insurance-renewals' },
        { label: 'Directors', page: 'director-group-health-insurance' },
        { label: 'Providers compared', page: 'small-business-health-insurance-providers' },
        { label: 'SME guide', page: 'health-insurance-guide' },
        { label: 'Types of business PMI', page: 'insurance-types' }
      ]
    },
    {
      title: 'Legal & Compliance',
      icon: FileText,
      links: [
        { label: 'Privacy Policy', page: 'privacy-policy' },
        { label: 'Terms & Conditions', page: 'terms-conditions' },
        { label: 'Cookie Policy', page: 'cookie-policy' },
        { label: 'Complaints Procedure', page: 'contact-us' }
      ]
    },
    {
      title: 'Support',
      icon: Users,
      links: [
        { label: 'FAQs', page: 'home' },
        { label: 'How It Works', page: 'home' },
        { label: 'Get a Quote', page: 'home' },
        { label: 'Customer Reviews', page: 'home' }
      ]
    }
  ];

  const quickLinks = [
    ...(SITE.showPublicEmail
      ? [{
          icon: Mail,
          title: 'Email Us',
          content: SITE.email,
          action: () => { window.location.href = `mailto:${SITE.email}`; }
        }]
      : [{
          icon: Mail,
          title: 'Message Us',
          content: 'Use our contact form',
          action: () => onNavigate('contact-us')
        }]),
    {
      icon: Phone,
      title: 'Call Us',
      content: SITE.phoneDisplay,
      action: () => { window.location.href = `tel:${SITE.phone.replace(/\s/g, '')}`; }
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '83, Hall Road Moorgate, Rotherham, South Yorkshire',
      action: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-brand-navy mb-4">Sitemap</h1>
          <p className="text-gray-600 text-lg">
            Navigate through all pages and resources available on Compare Business Healthcover
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {quickLinks.map((link, index) => (
            <div
              key={index}
              onClick={link.action}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-teal rounded-lg flex items-center justify-center flex-shrink-0">
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy mb-1">{link.title}</h3>
                  <p className="text-gray-600 text-sm">{link.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sitemap Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {sitemapSections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-teal rounded-lg flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-brand-navy">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-brand-teal hover:text-brand-teal-hover hover:underline font-medium flex items-center gap-2 group"
                    >
                      <span className="text-gray-400 group-hover:text-brand-teal transition-colors">→</span>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Insurance Types Grid */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">All Insurance Types</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'Life Insurance',
              'Income Protection',
              'Mortgage Protection',
              'Family Income Benefit',
              'Over 50s Life Insurance',
              'Business Protection'
            ].map((type, index) => (
              <button
                key={index}
                onClick={() => onNavigate('insurance-types')}
                className="text-left p-4 rounded-lg border-2 border-gray-200 hover:border-brand-teal transition-colors group"
              >
                <span className="text-gray-700 group-hover:text-brand-teal font-medium">
                  {type}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Key Features Section */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-navy-dark rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Why Use Compare Business Healthcover?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-teal mb-2">100% Complimentary</div>
              <p className="text-white/90 text-sm">No fees or charges</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-teal mb-2">10+ Insurance Partners</div>
              <p className="text-white/90 text-sm">Leading UK providers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-teal mb-2">2 Minutes</div>
              <p className="text-white/90 text-sm">Quick quote process</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-teal mb-2">FCA Regulated</div>
              <p className="text-white/90 text-sm">Broker Partners</p>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-brand-navy mb-6">Popular Searches</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'Life insurance quotes',
              'Income protection insurance',
              'Cheap life insurance',
              'Over 50s life insurance',
              'Mortgage protection',
              'Family income benefit',
              'Business protection insurance',
              'Compare life insurance',
              'Best insurance providers UK'
            ].map((search, index) => (
              <button
                key={index}
                onClick={() => onNavigate('home')}
                className="bg-gray-100 hover:bg-brand-teal hover:text-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-brand-navy mb-4">
            Ready to Compare Insurance Quotes?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get personalised quotes from leading UK insurers in just 2 minutes. Compare prices and coverage to find the perfect protection for you and your family.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-brand-teal text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-teal-hover transition-colors inline-flex items-center gap-2"
          >
            Get Your Free Quote Now
            <span>→</span>
          </button>
        </div>

        {/* Footer Links */}
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <button onClick={() => onNavigate('about-us')} className="text-gray-600 hover:text-brand-teal">
              About Us
            </button>
            <button onClick={() => onNavigate('contact-us')} className="text-gray-600 hover:text-brand-teal">
              Contact
            </button>
            <button onClick={() => onNavigate('privacy-policy')} className="text-gray-600 hover:text-brand-teal">
              Privacy
            </button>
            <button onClick={() => onNavigate('terms-conditions')} className="text-gray-600 hover:text-brand-teal">
              Terms
            </button>
            <button onClick={() => onNavigate('cookie-policy')} className="text-gray-600 hover:text-brand-teal">
              Cookies
            </button>
            <button onClick={() => onNavigate('sitemap')} className="text-gray-600 hover:text-brand-teal">
              Sitemap
            </button>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">
            © 2026 Compare Business Healthcover. All rights reserved. ICO Registration Number: ZB592848
          </p>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-brand-teal hover:text-brand-teal-hover font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}