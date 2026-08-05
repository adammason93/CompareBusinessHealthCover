import React from 'react';
import { Shield, Heart, Home, Briefcase, Users, Baby, DollarSign, FileText } from 'lucide-react';

interface InsuranceTypesProps {
  onNavigate: (page: string) => void;
}

export function InsuranceTypes({ onNavigate }: InsuranceTypesProps) {
  const insuranceTypes = [
    {
      icon: Heart,
      title: 'Life Insurance',
      slug: 'life-insurance',
      description: 'Financial protection for your loved ones if you pass away',
      coverage: 'Provides a lump sum payment to your beneficiaries',
      whoNeedsIt: [
        'Parents with dependent children',
        'Anyone with a mortgage or significant debts',
        'Sole or primary income earners',
        'Business partners'
      ],
      keyFeatures: [
        'Tax-free lump sum payment',
        'Covers funeral costs and outstanding debts',
        'Can be written in trust',
        'Fixed or decreasing cover options'
      ],
      color: 'bg-brand-surface border-brand-teal/25'
    },
    {
      icon: Briefcase,
      title: 'Income Protection',
      slug: 'income-protection',
      description: 'Replace your income if you can\'t work due to illness or injury',
      coverage: 'Monthly payments to replace a portion of your income',
      whoNeedsIt: [
        'Self-employed professionals',
        'Those without employer sick pay',
        'Main household earners',
        'People with regular financial commitments'
      ],
      keyFeatures: [
        'Covers up to 70% of your income',
        'Pays until you return to work or retire',
        'Tax-free monthly payments',
        'Flexible deferred periods'
      ],
      color: 'bg-green-50 border-green-200'
    },
    {
      icon: Home,
      title: 'Mortgage Protection',
      slug: 'mortgage-protection',
      description: 'Ensures your mortgage is paid off if something happens to you',
      coverage: 'Decreasing cover that matches your outstanding mortgage balance',
      whoNeedsIt: [
        'Homeowners with a mortgage',
        'First-time buyers',
        'Couples with joint mortgages',
        'Those wanting mortgage security'
      ],
      keyFeatures: [
        'Cover decreases with mortgage balance',
        'Lower premiums than level term',
        'Protects your family home',
        'Can cover repayment mortgages'
      ],
      color: 'bg-orange-50 border-orange-200'
    },
    {
      icon: Users,
      title: 'Family Income Benefit',
      slug: 'family-income',
      description: 'Regular income for your family instead of a lump sum',
      coverage: 'Tax-free monthly income paid to your family',
      whoNeedsIt: [
        'Families with young children',
        'Those preferring regular income over lump sum',
        'Main household earners',
        'Budget-conscious families'
      ],
      keyFeatures: [
        'Regular monthly payments',
        'Often cheaper than lump sum life insurance',
        'Inflation protection available',
        'Guaranteed payment period'
      ],
      color: 'bg-pink-50 border-pink-200'
    },
    {
      icon: DollarSign,
      title: 'Over 50s Life Insurance',
      slug: 'over-50s',
      description: 'Guaranteed acceptance life insurance for ages 50-85',
      coverage: 'Fixed lump sum with no medical questions asked',
      whoNeedsIt: [
        'People aged 50-85',
        'Those with pre-existing conditions',
        'Anyone wanting guaranteed acceptance',
        'Those planning funeral costs'
      ],
      keyFeatures: [
        'No medical examination required',
        'Guaranteed acceptance',
        'Fixed monthly premiums',
        'Covers funeral expenses'
      ],
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      icon: FileText,
      title: 'Business Protection',
      slug: 'business-protection',
      description: 'Protect your business and key personnel',
      coverage: 'Financial protection for businesses and partners',
      whoNeedsIt: [
        'Business owners',
        'Company directors',
        'Business partners',
        'Key employees'
      ],
      keyFeatures: [
        'Key person insurance',
        'Shareholder protection',
        'Partnership protection',
        'Business loan cover'
      ],
      color: 'bg-brand-teal-muted border-brand-teal/20'
    }
  ];

  const [selectedType, setSelectedType] = React.useState<string | null>(null);

  const selectedInsurance = insuranceTypes.find(t => t.slug === selectedType);

  if (selectedInsurance) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => setSelectedType(null)}
            className="mb-6 text-[#2fc4bf] hover:text-[#0da5b5] font-medium flex items-center gap-2"
          >
            ← Back to All Insurance Types
          </button>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#2fc4bf] rounded-lg flex items-center justify-center">
                <selectedInsurance.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#1D2D50]">{selectedInsurance.title}</h1>
                <p className="text-gray-600 text-lg mt-2">{selectedInsurance.description}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* What It Covers */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#1D2D50] mb-4">What It Covers</h2>
              <p className="text-gray-700 text-lg">{selectedInsurance.coverage}</p>
            </div>

            {/* Who Needs It */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#1D2D50] mb-4">Who Needs It?</h2>
              <ul className="space-y-3">
                {selectedInsurance.whoNeedsIt.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#2fc4bf] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#1D2D50] mb-4">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedInsurance.keyFeatures.map((feature, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${selectedInsurance.color}`}>
                    <p className="text-gray-700 font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-[#1D2D50] to-[#16233d] rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Get a Quote for {selectedInsurance.title}?
              </h2>
              <p className="text-white/90 mb-6 text-lg">
                Compare quotes from leading UK insurers in minutes
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="bg-[#2fc4bf] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#0da5b5] transition-colors inline-flex items-center gap-2"
              >
                Get Your Free Quote
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D2D50] mb-4">
            Insurance Types Explained
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding your options is the first step to finding the right protection. 
            Learn about different types of health and life insurance cover available.
          </p>
        </div>

        {/* Insurance Type Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {insuranceTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer border-2 border-transparent hover:border-[#2fc4bf]"
              onClick={() => setSelectedType(type.slug)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#2fc4bf] rounded-lg flex items-center justify-center flex-shrink-0">
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1D2D50] mb-2">{type.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{type.description}</p>
              <button className="text-[#2fc4bf] font-semibold hover:text-[#0da5b5] flex items-center gap-2">
                Learn More
                <span>→</span>
              </button>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1D2D50] mb-4">
            Not Sure Which Cover You Need?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our expert advisors can help you understand which insurance types are right for your circumstances and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact-us')}
              className="bg-[#2fc4bf] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0da5b5] transition-colors"
            >
              Speak to an Advisor
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="bg-gray-100 text-[#1D2D50] px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Get a Quote
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-[#2fc4bf] hover:text-[#0da5b5] font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}