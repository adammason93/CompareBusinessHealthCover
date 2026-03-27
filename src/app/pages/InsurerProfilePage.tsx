import { ArrowRight, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import type { InsurerPageContent } from "@/app/config/insurers";

interface InsurerProfilePageProps {
  insurer: InsurerPageContent;
  onGetStarted: () => void;
  onNavigate: (page: string) => void;
}

export function InsurerProfilePage({ insurer, onGetStarted, onNavigate }: InsurerProfilePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative text-white py-16 sm:py-20 overflow-hidden" style={{ backgroundColor: "#2d2f5e" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 text-white/90 hover:text-white text-sm mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Back to home
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center gap-10">
            <div className="bg-white rounded-xl p-8 shadow-lg flex items-center justify-center min-h-[140px] w-full max-w-md mx-auto lg:mx-0">
              <img
                src={insurer.logo}
                alt={`${insurer.name} logo`}
                className="max-w-full max-h-[100px] w-auto object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <p className="text-teal-300 text-sm font-medium uppercase tracking-wide mb-2">UK private medical insurance</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{insurer.name}</h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto lg:mx-0">{insurer.shortDescription}</p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={onGetStarted}
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-lg"
                >
                  Compare quotes <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  type="button"
                  size="lg"
                  onClick={() => onNavigate("insurers")}
                  className="rounded-full px-8 py-6 text-lg bg-white text-[#2d2f5e] font-semibold border-0 shadow-md hover:bg-gray-100 hover:text-[#2d2f5e] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2d2f5e]"
                >
                  All insurer guides
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Overview</h2>
          {insurer.intro.map((p, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="py-14 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Who it often suits</h2>
          <ul className="space-y-3">
            {insurer.whoItsFor.map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">What private medical cover can include</h2>
          <ul className="space-y-3">
            {insurer.whatYouGet.map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Things to weigh up</h2>
          <ul className="space-y-3">
            {insurer.considerations.map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-700">
                <span className="text-teal-600 font-bold flex-shrink-0" aria-hidden>
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 p-6 rounded-xl bg-[#2d2f5e]/5 border border-[#2d2f5e]/10">
            <p className="text-gray-700 text-sm leading-relaxed">
              Information on this page is for general guidance only and does not constitute insurance advice or a
              recommendation to buy a product. Cover, exclusions, and pricing depend on underwriting and the insurer’s
              current terms. FCA-regulated brokers can explain options and arrange quotes.
            </p>
          </div>
          <div className="mt-10 text-center">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-10 py-6 text-lg"
            >
              Get your free comparison <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
