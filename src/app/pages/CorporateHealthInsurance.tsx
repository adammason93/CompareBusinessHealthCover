import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface CorporateHealthInsuranceProps {
  onGetStarted: () => void;
}

export function CorporateHealthInsurance({ onGetStarted }: CorporateHealthInsuranceProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden" style={{ backgroundColor: '#1D2D50' }}>
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-30">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1767082090422-2e5aeeba2afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBwYXJlbnRzJTIwY2hpbGRyZW4lMjBvdXRkb29yJTIwaGFwcHklMjBoZWFsdGh5fGVufDF8fHx8MTc3MTU5NjQxMXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Happy family"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1D2D50] via-[#1D2D50]/80 to-transparent"></div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-brand-teal-soft/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Corporate Health Insurance
            </h1>
            <p className="text-xl mb-8">
              Enterprise-level health insurance solutions for larger organizations. Comprehensive coverage with competitive corporate rates.
            </p>
            <Button 
              size="lg" 
              onClick={onGetStarted} 
              className="bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full px-8 py-6 text-lg"
            >
              Get Your Free Quote <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl mb-6 text-gray-900">Corporate Healthcare Solutions</h2>
              <p className="text-gray-600 mb-4">
                Large organizations need scalable health insurance solutions that offer comprehensive coverage while managing costs effectively. Our corporate plans are designed for companies with 50+ employees.
              </p>
              <p className="text-gray-600 mb-4">
                Benefit from dedicated account management, flexible plan designs, and volume discounts that make quality healthcare affordable.
              </p>
            </div>
            <div>
              <h2 className="text-3xl mb-6 text-gray-900">Corporate Features</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                  <span className="text-gray-700">Dedicated Account Manager</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                  <span className="text-gray-700">Volume Discounts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                  <span className="text-gray-700">Flexible Plan Design</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                  <span className="text-gray-700">Online Administration Portal</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                  <span className="text-gray-700">Wellbeing Programs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: '#2fc4bf' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl text-white mb-6">
            Ready to Compare Corporate Health Insurance?
          </h2>
          <p className="text-xl text-white mb-8">
            Get enterprise-level quotes with dedicated support
          </p>
          <Button 
            onClick={onGetStarted}
            className="bg-black hover:bg-gray-800 text-white rounded-full px-12 py-6 text-lg"
          >
            Start Your Free Quote
          </Button>
        </div>
      </section>
    </div>
  );
}