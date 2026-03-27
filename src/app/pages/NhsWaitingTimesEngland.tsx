import { ArrowRight, Download, Minus, Plus, FileText } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/ui/collapsible";
import { useState } from "react";

const PDF_PATH = "/downloads/nhs-key-statistics-england-commons-library-july-2024.pdf";
const PDF_FILENAME = "NHS-key-statistics-England-Commons-Library-July-2024.pdf";

interface NhsWaitingTimesEnglandProps {
  onGetStarted: () => void;
}

export function NhsWaitingTimesEngland({ onGetStarted }: NhsWaitingTimesEnglandProps) {
  const [downloadOpen, setDownloadOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      <section className="relative text-white py-16 sm:py-20 overflow-hidden" style={{ backgroundColor: "#2d2f5e" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-teal-300 text-sm font-medium uppercase tracking-wide mb-2">England · NHS performance</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            NHS waiting times &amp; key statistics (England)
          </h1>
          <p className="text-lg text-white/90 leading-relaxed">
            Independent overview of published NHS England data on waiting lists, A&amp;E, cancer pathways, and ambulances—
            with the full UK Parliament Commons Library briefing available to download.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-lg"
            >
              Compare private health cover <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-3">
            <FileText className="w-8 h-8 text-[#2d2f5e] flex-shrink-0 mt-1" aria-hidden />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">About this resource</h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                The PDF below is the House of Commons Library research briefing{" "}
                <strong>NHS key statistics: England</strong> (Research Briefing number 07281, 16 July 2024) by Esme
                Kirk-Wade, Rachael Harker, and Sonja Stiebahl. It summarises pressures on the NHS before and after the
                Covid-19 pandemic using NHS England and related official statistics. HealthCoverCompare does not own this
                document; we host a copy to help visitors understand context when considering private medical insurance.
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                Source:{" "}
                <a
                  href="https://commonslibrary.parliament.uk/research-briefings/cbp-7281/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-[#0ebcc8] underline hover:text-[#0da5b5]"
                >
                  UK Parliament Commons Library (CBP 7281)
                </a>
                . Content is subject to the{" "}
                <a
                  href="https://www.parliament.uk/site-information/copyright-parliament/open-parliament-licence/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-[#0ebcc8] underline hover:text-[#0da5b5]"
                >
                  Open Parliament Licence
                </a>
                . Figures on this page are selective highlights; refer to the PDF for full charts, methods, and notes.
              </p>
            </div>
          </div>
        </div>

        <Collapsible open={downloadOpen} onOpenChange={setDownloadOpen} className="rounded-lg overflow-hidden border border-gray-300 shadow-sm mb-10">
          <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#e8e8e8] px-4 py-3 text-left hover:bg-[#dedede] transition-colors">
            <span className="font-bold text-gray-900">Latest NHS Waiting Times</span>
            <span className="text-gray-700" aria-hidden>
              {downloadOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="bg-white px-4 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm sm:text-base">NHS key statistics: England</p>
              <a
                href={PDF_PATH}
                download={PDF_FILENAME}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ffcc00] hover:bg-[#e6b800] text-black font-bold uppercase text-sm px-6 py-3 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2d2f5e]"
              >
                Download
                <Download className="w-5 h-5" aria-hidden />
              </a>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <h2 className="text-2xl font-bold text-[#2d2f5e] mb-6">Key figures highlighted in the briefing</h2>
        <p className="text-gray-600 text-sm mb-6">
          The following are drawn from the Commons Library summary and body text (publication July 2024; underlying NHS
          data varies by indicator). They are not real-time today—always check NHS England for the latest releases.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            {
              title: "Elective waiting list",
              body: "The waiting list for consultant-led hospital treatment rose to a record of nearly 7.8 million in September 2023. The 18-week referral-to-treatment target had not been met since early 2016.",
            },
            {
              title: "A&E four-hour standard",
              body: "The national ambition is that 95% of A&E attendances finish within four hours. Performance worsened over the 2010s; in December 2022, 50.4% of major (type 1) A&E patients waited over four hours—a first on record. In May 2024, about 40% of type 1 patients still waited over four hours.",
            },
            {
              title: "Cancer — 62 days",
              body: "The 62-day standard (85% treated within 62 days of referral) was updated to cover more referral routes. On the new measure, in May 2024 65.8% were treated within 62 days—below the 85% target.",
            },
            {
              title: "Ambulance (Category 2)",
              body: "The mean target for Category 2 calls is 18 minutes. In December 2022 the average Category 2 response peaked at about one hour 32 minutes. Performance improved after that winter but targets were still not consistently met into 2024.",
            },
            {
              title: "Workforce",
              body: "NHS staff numbers have grown: the briefing notes around 26% more doctors and 24% more nurses than five years previously (figures stated in the summary section).",
            },
            {
              title: "52-week waits",
              body: "Long waits spiked after Covid-19; NHS England aimed to eliminate 52-week waits by March 2025. The briefing discusses trends in ultra-long waiters and RTT percentiles—see the PDF for charts.",
            },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-[#2d2f5e] mb-4">Why this matters for private health insurance</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Longer NHS waits and variable performance against national standards are common reasons people explore private
            medical insurance: faster access to elective care, choice of specialist or hospital, and predictable
            pathways—subject to policy terms, underwriting, and exclusions.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Private cover does not replace emergency care in the same way as the NHS; it complements it for many
            non-emergency needs. Our FCA-regulated broker partners can explain options and compare insurers—use the quote
            journey when you are ready.
          </p>
        </div>

        <div className="text-center pb-8">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-10 py-6 text-lg"
          >
            Get a free comparison <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
