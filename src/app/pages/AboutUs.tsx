import { Shield, Heart, TrendingUp, Users, Award, CheckCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface AboutUsProps {
  onGetStarted: () => void;
}

export function AboutUs({ onGetStarted }: AboutUsProps) {
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
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              About Compare Business Healthcover
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in finding the perfect health insurance coverage for you and your family
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Compare Business Healthcover is a leading UK-based health insurance comparison service dedicated to helping individuals, families, and businesses find the most suitable and affordable private medical insurance.
                </p>
                <p>
                  We understand that navigating the world of health insurance can be overwhelming. With countless providers, policy options, and varying levels of coverage, it's difficult to know where to start. That's where we come in.
                </p>
                <p>
                  Our mission is simple: to make comparing health insurance easy, transparent, and completely free. We work with all major UK insurers to bring you comprehensive quotes tailored to your specific needs and budget.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-brand-teal-muted to-brand-surface rounded-2xl p-8">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-brand-teal-hover mb-2">10+</div>
                  <div className="text-sm text-gray-600">Insurance Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-brand-teal-hover mb-2">FCA</div>
                  <div className="text-sm text-gray-600">Regulated Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-brand-teal-hover mb-2">100%</div>
                  <div className="text-sm text-gray-600">Complimentary Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-brand-teal-muted rounded-full flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-brand-teal-hover" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Trust & Transparency
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                We believe in complete honesty. No hidden fees, no bias, no pressure. Just clear, impartial advice to help you make the best decision.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-brand-teal-muted rounded-full flex items-center justify-center mb-6 mx-auto">
                <Heart className="w-8 h-8 text-brand-teal-hover" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Customer First
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Your wellbeing is our priority. We take the time to understand your unique needs and find coverage that truly protects you and your loved ones.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-brand-teal-muted rounded-full flex items-center justify-center mb-6 mx-auto">
                <Award className="w-8 h-8 text-brand-teal-hover" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Excellence
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                We strive for excellence in everything we do, from our comparison service to our customer support. Your satisfaction is our success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting the right health insurance has never been easier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-teal to-brand-teal-hover rounded-full flex items-center justify-center mb-4 mx-auto text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tell Us Your Needs
              </h3>
              <p className="text-gray-600 text-sm">
                Complete a simple form about your health insurance requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-teal to-brand-teal-hover rounded-full flex items-center justify-center mb-4 mx-auto text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Review Options
              </h3>
              <p className="text-gray-600 text-sm">
                Receive personalised quotes with clear comparisons of coverage and costs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-teal to-brand-teal-hover rounded-full flex items-center justify-center mb-4 mx-auto text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Choose & Save
              </h3>
              <p className="text-gray-600 text-sm">
                Select the perfect policy and enjoy comprehensive health coverage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-cta py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose Compare Business Healthcover?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <CheckCircle className="w-8 h-8 text-brand-teal-light mb-3" />
              <h3 className="text-lg font-semibold mb-2">100% Complimentary Service</h3>
              <p className="text-gray-200 text-sm">
                No hidden charges, no fees. Our comparison service is completely free with no obligation to buy.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <CheckCircle className="w-8 h-8 text-brand-teal-light mb-3" />
              <h3 className="text-lg font-semibold mb-2">Independent & Impartial</h3>
              <p className="text-gray-200 text-sm">
                Our FCA regulated broker partners aren't tied to any insurer. Their advice is unbiased and focused solely on your needs.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <CheckCircle className="w-8 h-8 text-brand-teal-light mb-3" />
              <h3 className="text-lg font-semibold mb-2">All Major Insurers</h3>
              <p className="text-gray-200 text-sm">
                Our broker partners compare quotes from Bupa, AXA, Aviva, Vitality, and many more leading providers.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <CheckCircle className="w-8 h-8 text-brand-teal-light mb-3" />
              <h3 className="text-lg font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-200 text-sm">
                Our FCA regulated broker partners have the knowledge and expertise to answer your questions and guide you through the process.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <CheckCircle className="w-8 h-8 text-brand-teal-light mb-3" />
              <h3 className="text-lg font-semibold mb-2">Quick & Easy</h3>
              <p className="text-gray-200 text-sm">
                Get personalised quotes in minutes. No lengthy forms or complicated processes.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
              <CheckCircle className="w-8 h-8 text-brand-teal-light mb-3" />
              <h3 className="text-lg font-semibold mb-2">FCA Regulated Partners</h3>
              <p className="text-gray-200 text-sm">
                Our broker partners are fully authorized and regulated by the Financial Conduct Authority for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gradient-to-br from-brand-teal-muted to-brand-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Find Your Perfect Health Insurance?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Let us help you compare quotes and find the best coverage for your needs. Get started today with our free, no-obligation comparison service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={onGetStarted}
              className="bg-brand-teal hover:bg-brand-teal-hover text-white px-8 py-6 text-lg rounded-full"
            >
              Get Your Free Quote
            </Button>
            <div className="text-gray-600">or</div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-5 h-5 text-brand-teal-hover" />
              <a href="tel:01484773038" className="text-lg font-semibold hover:text-brand-teal-hover">
                01484 773038
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Mail className="w-5 h-5 text-brand-teal-hover" />
            <a href="mailto:info@comparebusinesshealthcover.co.uk" className="hover:text-brand-teal-hover">
              info@comparebusinesshealthcover.co.uk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}