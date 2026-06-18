import React from 'react';
import { Shield, Award, Users, Clock } from 'lucide-react';

interface PartnerInsurersProps {
  onNavigate: (page: string) => void;
}

export function PartnerInsurers({ onNavigate }: PartnerInsurersProps) {
  const partners = [
    {
      name: 'Aviva',
      description: 'One of the UK\'s leading insurance providers with over 300 years of experience',
      specialties: ['Life Insurance', 'Income Protection', 'Business Protection'],
      rating: '4.5/5'
    },
    {
      name: 'Legal & General',
      description: 'Trusted by millions for life insurance and protection products',
      specialties: ['Life Insurance', 'Over 50s Cover', 'Income Protection'],
      rating: '4.6/5'
    },
    {
      name: 'AIG Life',
      description: 'Global insurance leader offering comprehensive protection solutions',
      specialties: ['Life Insurance', 'Income Protection', 'Business Protection'],
      rating: '4.4/5'
    },
    {
      name: 'Vitality',
      description: 'Innovative insurer rewarding healthy living with lower premiums',
      specialties: ['Life Insurance', 'Income Protection', 'Family Cover'],
      rating: '4.7/5'
    },
    {
      name: 'Royal London',
      description: 'The UK\'s largest mutual life and pensions company',
      specialties: ['Life Insurance', 'Income Protection', 'Mortgage Protection'],
      rating: '4.5/5'
    },
    {
      name: 'Zurich',
      description: 'International insurance provider with strong UK presence',
      specialties: ['Life Insurance', 'Business Protection', 'Income Protection'],
      rating: '4.3/5'
    },
    {
      name: 'Scottish Widows',
      description: 'Over 200 years of protecting UK families and businesses',
      specialties: ['Life Insurance', 'Income Protection', 'Family Cover'],
      rating: '4.4/5'
    },
    {
      name: 'LV=',
      description: 'Customer-owned insurer focused on fairness and value',
      specialties: ['Life Insurance', 'Over 50s Cover', 'Income Protection'],
      rating: '4.6/5'
    }
  ];

  const whyOurPartners = [
    {
      icon: Shield,
      title: 'FCA Regulated',
      description: 'All partners are authorized and regulated by the Financial Conduct Authority'
    },
    {
      icon: Award,
      title: 'Award-Winning',
      description: 'Industry-recognized insurers with proven track records'
    },
    {
      icon: Users,
      title: 'Millions of Customers',
      description: 'Trusted by millions of UK families and businesses'
    },
    {
      icon: Clock,
      title: 'Fast Claims',
      description: 'Efficient claims processing when you need it most'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d2f5e] mb-4">
            Our Partner Insurers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We work with the UK's leading insurance providers to bring you the best coverage options and competitive rates.
          </p>
        </div>

        {/* Why Our Partners Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {whyOurPartners.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-[#148585] rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2d2f5e] mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Partner Cards */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#2d2f5e] mb-8 text-center">
            Leading Insurance Providers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border-2 border-transparent hover:border-[#148585]">
                {/* Partner Logo Placeholder */}
                <div className="h-16 bg-gradient-to-r from-[#2d2f5e] to-[#148585] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">{partner.name}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm font-medium">{partner.rating}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4">{partner.description}</p>

                {/* Specialties */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#2d2f5e]">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {partner.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-[#f0f9fa] text-[#148585] px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#148585] mb-2">5+</div>
              <p className="text-gray-600">Partner Insurers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#148585] mb-2">FCA</div>
              <p className="text-gray-600">Regulated Partners</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#148585] mb-2">100%</div>
              <p className="text-gray-600">Free Comparison</p>
            </div>
          </div>
        </div>

        {/* How We Choose Partners */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#2d2f5e] mb-6 text-center">
            How We Select Our Partners
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#148585] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d2f5e] mb-1">Financial Strength</h3>
                  <p className="text-gray-600 text-sm">We partner only with financially stable insurers with strong credit ratings</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#148585] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d2f5e] mb-1">Customer Service</h3>
                  <p className="text-gray-600 text-sm">Partners must demonstrate excellent customer satisfaction scores</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#148585] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d2f5e] mb-1">Product Range</h3>
                  <p className="text-gray-600 text-sm">Comprehensive coverage options to meet diverse customer needs</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#148585] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d2f5e] mb-1">Competitive Pricing</h3>
                  <p className="text-gray-600 text-sm">Fair and competitive premium rates for all customer segments</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#148585] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d2f5e] mb-1">Claims Performance</h3>
                  <p className="text-gray-600 text-sm">High claims acceptance rates and fast processing times</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#148585] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">6</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d2f5e] mb-1">Regulatory Compliance</h3>
                  <p className="text-gray-600 text-sm">Full FCA authorization and adherence to industry standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#2d2f5e] to-[#1f2454] rounded-lg shadow-lg p-8 text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Compare Quotes from Leading Insurers
          </h2>
          <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
            Get personalized quotes from multiple providers in minutes. We'll help you find the best coverage at the best price.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-[#148585] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#0da5b5] transition-colors inline-flex items-center gap-2"
          >
            Get Your Free Quote
            <span>→</span>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-8">
          <p className="text-gray-700 text-sm">
            <strong>Important:</strong> Compare Business Cover is an insurance intermediary, not an insurer. 
            We may receive commission from our partner insurers, but this does not affect the price you pay. 
            All our partners are authorized and regulated by the Financial Conduct Authority (FCA).
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center">
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