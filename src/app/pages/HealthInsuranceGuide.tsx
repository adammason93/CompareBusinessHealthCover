import { Check, ArrowRight, Star } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface HealthInsuranceGuideProps {
  onGetStarted: () => void;
}

export function HealthInsuranceGuide({ onGetStarted }: HealthInsuranceGuideProps) {
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
              Health Insurance Guide
            </h1>
            <p className="text-xl mb-8">
              Everything you need to know about health insurance in the UK. Get expert advice and find the perfect cover for your needs.
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
              <h2 className="text-3xl mb-6 text-gray-900">What is Health Insurance?</h2>
              <p className="text-gray-600 mb-4">
                Health insurance provides you with access to private medical treatment, giving you the choice of when and where you receive care. Unlike the NHS, private health insurance allows you to skip waiting lists and access specialists quickly.
              </p>
              <p className="text-gray-600 mb-4">
                With health insurance, you can benefit from faster diagnosis, access to cutting-edge treatments, and the comfort of private facilities.
              </p>
            </div>
            <div>
              <h2 className="text-3xl mb-6 text-gray-900">Key Benefits</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">No NHS Waiting Lists</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">Access to Private Hospitals</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">Choice of Consultants</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">Fast Diagnosis & Treatment</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">Mental Health Support</span>
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
            Ready to Compare Health Insurance?
          </h2>
          <p className="text-xl text-white mb-8">
            Get quotes from the UK's leading insurers in minutes
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