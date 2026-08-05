import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface SelfEmployedHealthInsuranceProps {
  onGetStarted: () => void;
}

export function SelfEmployedHealthInsurance({ onGetStarted }: SelfEmployedHealthInsuranceProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-hero relative py-20 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-30">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1767082090422-2e5aeeba2afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBwYXJlbnRzJTIwY2hpbGRyZW4lMjBvdXRkb29yJTIwaGFwcHklMjBoZWFsdGh5fGVufDF8fHx8MTc3MTU5NjQxMXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Happy family"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent"></div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-brand-teal-soft/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-teal/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Self-Employed Health Insurance
            </h1>
            <p className="text-xl mb-8">
              As a self-employed professional, your health is your business. Get back to work faster with private health insurance tailored for the self-employed.
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
              <h2 className="text-3xl mb-6 text-gray-900">Why Self-Employed Need Cover</h2>
              <p className="text-gray-600 mb-4">
                When you're self-employed, time off work directly impacts your income. Private health insurance means you can get diagnosed and treated quickly, minimizing disruption to your business.
              </p>
              <p className="text-gray-600 mb-4">
                Without employer benefits, it's crucial to protect yourself with comprehensive health coverage that suits your lifestyle and budget.
              </p>
            </div>
            <div>
              <h2 className="text-3xl mb-6 text-gray-900">Key Advantages</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                  <span className="text-gray-700">Get Back to Work Faster</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                  <span className="text-gray-700">Protect Your Income</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                  <span className="text-gray-700">Flexible Payment Options</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                  <span className="text-gray-700">Tax Deductible Premiums</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-brand-teal flex-shrink-0" />
                  <span className="text-gray-700">Tailored Coverage Levels</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-cta py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl text-white mb-6">
            Ready to Compare Self-Employed Health Insurance?
          </h2>
          <p className="text-xl text-white mb-8">
            Find affordable cover designed for independent professionals
          </p>
          <Button 
            onClick={onGetStarted}
            className="bg-brand-navy hover:bg-brand-navy-dark text-white rounded-full px-12 py-6 text-lg"
          >
            Start Your Free Quote
          </Button>
        </div>
      </section>
    </div>
  );
}