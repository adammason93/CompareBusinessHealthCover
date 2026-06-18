import React from 'react';
import { FileText, Users, Shield, Mail, Phone, MapPin } from 'lucide-react';

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
        { label: 'About Us', page: 'about-us' },
        { label: 'Contact Us', page: 'contact-us' },
        { label: 'My Submissions', page: 'my-submissions' }
      ]
    },
    {
      title: 'Insurance Information',
      icon: Shield,
      links: [
        { label: 'Insurance Types Explained', page: 'insurance-types' },
        { label: 'Partner Insurers', page: 'partner-insurers' },
        { label: 'Life Insurance', page: 'insurance-types' },
        { label: 'Income Protection', page: 'insurance-types' },
        { label: 'Mortgage Protection', page: 'insurance-types' }
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
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@comparebusinesshealthcover.co.uk',
      action: () => window.location.href = 'mailto:info@comparebusinesshealthcover.co.uk'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '01484 773038',
      action: () => window.location.href = 'tel:01484773038'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '83, Hall Road Moorgate, Rotherham, South Yorkshire',
      action: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-4xl font-bold text-[#2d2f5e] mb-4">Sitemap</h1>
          <p className="text-gray-600 text-lg">
            Navigate through all pages and resources available on Compare Business Cover
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
                <div className="w-12 h-12 bg-[#148585] rounded-lg flex items-center justify-center flex-shrink-0">
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2d2f5e] mb-1">{link.title}</h3>
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
                <div className="w-10 h-10 bg-[#148585] rounded-lg flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#2d2f5e]">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-[#148585] hover:text-[#0da5b5] hover:underline font-medium flex items-center gap-2 group"
                    >
                      <span className="text-gray-400 group-hover:text-[#148585] transition-colors">→</span>
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
          <h2 className="text-2xl font-bold text-[#2d2f5e] mb-6">All Insurance Types</h2>
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
                className="text-left p-4 rounded-lg border-2 border-gray-200 hover:border-[#148585] transition-colors group"
              >
                <span className="text-gray-700 group-hover:text-[#148585] font-medium">
                  {type}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Key Features Section */}
        <div className="bg-gradient-to-r from-[#2d2f5e] to-[#1f2454] rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Why Use Compare Business Cover?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#148585] mb-2">100% Complimentary</div>
              <p className="text-white/90 text-sm">No fees or charges</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#148585] mb-2">10+ Insurance Partners</div>
              <p className="text-white/90 text-sm">Leading UK providers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#148585] mb-2">2 Minutes</div>
              <p className="text-white/90 text-sm">Quick quote process</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#148585] mb-2">FCA Regulated</div>
              <p className="text-white/90 text-sm">Broker Partners</p>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#2d2f5e] mb-6">Popular Searches</h2>
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
                className="bg-gray-100 hover:bg-[#148585] hover:text-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-[#2d2f5e] mb-4">
            Ready to Compare Insurance Quotes?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get personalized quotes from leading UK insurers in just 2 minutes. Compare prices and coverage to find the perfect protection for you and your family.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-[#148585] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#0da5b5] transition-colors inline-flex items-center gap-2"
          >
            Get Your Free Quote Now
            <span>→</span>
          </button>
        </div>

        {/* Footer Links */}
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <button onClick={() => onNavigate('about-us')} className="text-gray-600 hover:text-[#148585]">
              About Us
            </button>
            <button onClick={() => onNavigate('contact-us')} className="text-gray-600 hover:text-[#148585]">
              Contact
            </button>
            <button onClick={() => onNavigate('privacy-policy')} className="text-gray-600 hover:text-[#148585]">
              Privacy
            </button>
            <button onClick={() => onNavigate('terms-conditions')} className="text-gray-600 hover:text-[#148585]">
              Terms
            </button>
            <button onClick={() => onNavigate('cookie-policy')} className="text-gray-600 hover:text-[#148585]">
              Cookies
            </button>
            <button onClick={() => onNavigate('sitemap')} className="text-gray-600 hover:text-[#148585]">
              Sitemap
            </button>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">
            © 2026 Compare Business Cover. All rights reserved. ICO Registration Number: ZB592848
          </p>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-[#148585] hover:text-[#0da5b5] font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}