import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { SITE } from '@/app/config/site';
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface ContactUsProps {
  onGetStarted: () => void;
}

export function ContactUs({ onGetStarted }: ContactUsProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2031af1c/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ ...formData, sourceWebsite: SITE.domain })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError("Failed to send message. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#1D2D50' }}>
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
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-teal/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Have questions about health insurance? Our expert team is here to help you find the perfect coverage
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you need a quote, have questions about coverage, or want expert advice on health insurance, we're here to help. Reach out to us using any of the methods below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-teal-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-brand-teal-hover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:01484773038" className="text-brand-teal-hover hover:text-brand-teal-hover text-lg">
                      01484 773038
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri: 9am - 5pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-teal-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-brand-teal-hover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@comparebusinesshealthcover.co.uk" className="text-brand-teal-hover hover:text-brand-teal-hover">
                      info@comparebusinesshealthcover.co.uk
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-teal-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-brand-teal-hover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">
                      83, Hall Road Moorgate<br />
                      Rotherham<br />
                      South Yorkshire
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Serving customers across the UK</p>
                  </div>
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="mt-10 p-6 bg-gradient-to-br from-brand-teal-muted to-brand-surface rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Why Contact Us?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-teal-hover flex-shrink-0" />
                    Free, no-obligation quotes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-teal-hover flex-shrink-0" />
                    Expert advice from qualified specialists
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-teal-hover flex-shrink-0" />
                    Compare all leading UK insurers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-teal-hover flex-shrink-0" />
                    Fast, friendly service
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 text-sm">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{submitError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                      placeholder="john.smith@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                      placeholder="07123 456789"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-teal hover:bg-brand-teal-hover text-white py-4 text-lg rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to be contacted regarding your enquiry.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Quote CTA */}
      <section className="py-16 bg-gradient-to-br from-brand-teal-muted to-brand-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get a Quote?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Get instant quotes from leading UK insurers in just a few minutes
          </p>
          <Button
            onClick={onGetStarted}
            className="bg-brand-teal hover:bg-brand-teal-hover text-white px-8 py-6 text-lg rounded-full"
          >
            Get Your Free Quote
          </Button>
        </div>
      </section>
    </div>
  );
}