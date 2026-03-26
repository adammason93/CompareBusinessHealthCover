import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface SeniorHealthInsuranceProps {
  onGetStarted: () => void;
}

export function SeniorHealthInsurance({ onGetStarted }: SeniorHealthInsuranceProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden" style={{ backgroundColor: '#2d2f5e' }}>
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-30">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1767082090422-2e5aeeba2afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBwYXJlbnRzJTIwY2hpbGRyZW4lMjBvdXRkb29yJTIwaGFwcHklMjBoZWFsdGh5fGVufDF8fHx8MTc3MTU5NjQxMXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Happy family"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2d2f5e] via-[#2d2f5e]/80 to-transparent"></div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Senior Health Insurance
            </h1>
            <p className="text-xl mb-8">
              Health insurance designed for those over 65. Get access to fast treatment and specialist care when you need it most.
            </p>
            <Button 
              size="lg" 
              onClick={onGetStarted} 
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-lg"
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
              <h2 className="text-3xl mb-6 text-gray-900">Healthcare in Later Life</h2>
              <p className="text-gray-600 mb-4">
                As we age, access to timely healthcare becomes increasingly important. Senior health insurance ensures you don't have to wait for NHS treatment, giving you peace of mind and faster access to care.
              </p>
              <p className="text-gray-600 mb-4">
                Many insurers offer policies specifically designed for over 65s, with coverage for age-related conditions and ongoing care needs.
              </p>
            </div>
            <div>
              <h2 className="text-3xl mb-6 text-gray-900">Senior Benefits</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">Age-Appropriate Coverage</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">No Age Limit on Renewals</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">Fast Access to Specialists</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">Post-Treatment Care</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">Home Nursing Options</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: '#0ebcc8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl text-white mb-6">
            Ready to Compare Senior Health Insurance?
          </h2>
          <p className="text-xl text-white mb-8">
            Find the right cover for your retirement years
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