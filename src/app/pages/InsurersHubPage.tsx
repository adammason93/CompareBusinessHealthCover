import { ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { INSURERS } from "@/app/config/insurers";
import { INSURER_COMPARISONS } from "@/app/config/insurerComparisons";

interface InsurersHubPageProps {
  onGetStarted: () => void;
  onNavigate: (page: string) => void;
}

export function InsurersHubPage({ onGetStarted, onNavigate }: InsurersHubPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative text-white py-16 sm:py-20 overflow-hidden" style={{ backgroundColor: "#2d2f5e" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-teal-300 text-sm font-medium uppercase tracking-wide mb-2">Guides</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">UK private health insurers</h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Short, independent-style overviews of leading PMI brands—who they suit, what to compare, and how to get
            quotes through FCA-regulated brokers.
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-lg"
          >
            Compare quotes <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSURERS.map((insurer) => (
              <a
                key={insurer.slug}
                href={`/${insurer.slug}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onNavigate(insurer.slug);
                  }
                }}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-[#0ebcc8] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ebcc8] focus-visible:ring-offset-2"
              >
                <div className="h-14 flex items-center justify-center mb-4">
                  <img
                    src={insurer.logo}
                    alt={`${insurer.name} logo`}
                    className="max-h-12 w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{insurer.name}</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{insurer.shortDescription}</p>
                <span className="text-[#0ebcc8] font-semibold text-sm">Read guide →</span>
              </a>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-10 max-w-2xl mx-auto">
            HealthCoverCompare is an introducer, not an insurer. Information is for general guidance only; brokers
            provide quotes and regulated advice.
          </p>

          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">Insurer comparisons</h2>
            <p className="text-gray-600 text-center text-sm max-w-xl mx-auto mb-8">
              High-level themes to discuss with a broker—not live prices or recommendations.
            </p>
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              {INSURER_COMPARISONS.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/${c.slug}`}
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                        e.preventDefault();
                        onNavigate(c.slug);
                      }
                    }}
                    className="inline-flex items-center justify-center rounded-full border-2 border-[#0ebcc8] text-[#0a9aa3] hover:bg-[#0ebcc8]/10 font-semibold px-6 py-3 text-sm transition-colors"
                  >
                    {c.left.name} vs {c.right.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
