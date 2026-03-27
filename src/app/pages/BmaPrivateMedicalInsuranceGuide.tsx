import { ArrowRight, Download, Minus, Plus, FileText } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/ui/collapsible";
import { useState } from "react";

const PDF_PATH = "/downloads/bma-guide-private-medical-insurance-patients-sept-2019.pdf";
const PDF_FILENAME = "BMA-guide-private-medical-insurance-patients-Sept-2019.pdf";

interface BmaPrivateMedicalInsuranceGuideProps {
  onGetStarted: () => void;
}

export function BmaPrivateMedicalInsuranceGuide({ onGetStarted }: BmaPrivateMedicalInsuranceGuideProps) {
  const [downloadOpen, setDownloadOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      <section className="relative text-white py-16 sm:py-20 overflow-hidden" style={{ backgroundColor: "#2d2f5e" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-teal-300 text-sm font-medium uppercase tracking-wide mb-2">BMA · Patients</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Buying private medical insurance — BMA patient guide
          </h1>
          <p className="text-lg text-white/90 leading-relaxed">
            Key points from the British Medical Association’s guide for patients thinking of taking out private medical
            insurance (PMI), including questions to ask insurers, underwriting types, and what PMI usually does and does
            not cover — with the full PDF to download.
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
                The PDF below is the BMA publication{" "}
                <strong>Guide for patients thinking of taking out Private Medical Insurance</strong> (September 2019;
                reference BMA 20190273). It was produced for patients and reviewed by the BMA Patients Liaison Group. It
                explains how PMI differs from the NHS, what to check before you buy, and questions to put to insurers.
                HealthCoverCompare does not own this document; we host a copy to support informed decisions when you
                compare private medical insurance.
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                © British Medical Association 2019. The BMA is the source of record — see{" "}
                <a
                  href="https://www.bma.org.uk/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-[#0ebcc8] underline hover:text-[#0da5b5]"
                >
                  bma.org.uk
                </a>{" "}
                for official publications. Summaries here are selective; the PDF contains the full text and context.
              </p>
            </div>
          </div>
        </div>

        <Collapsible open={downloadOpen} onOpenChange={setDownloadOpen} className="rounded-lg overflow-hidden border border-gray-300 shadow-sm mb-10">
          <CollapsibleTrigger className="flex w-full items-center justify-between bg-[#e8e8e8] px-4 py-3 text-left hover:bg-[#dedede] transition-colors">
            <span className="font-bold text-gray-900">Download the BMA guide (PDF)</span>
            <span className="text-gray-700" aria-hidden>
              {downloadOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="bg-white px-4 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm sm:text-base">BMA — Private medical insurance (patient guide)</p>
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

        <h2 className="text-2xl font-bold text-[#2d2f5e] mb-6">What the guide covers (in brief)</h2>
        <p className="text-gray-600 text-sm mb-6">
          PMI (private medical insurance) helps pay for private care for many <strong>short-term, curable</strong>{" "}
          conditions; the alternative is paying yourself (“self-pay”). Policies vary widely — the BMA stresses shopping
          around and reading exclusions carefully.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            {
              title: "NHS and PMI",
              body: "The NHS provides care for people ordinarily resident in the UK. PMI is optional (or via an employer) and pays benefits under a policy for sickness or injury — it is not a substitute for understanding NHS entitlement.",
            },
            {
              title: "What benefits to check",
              body: "The guide lists areas such as consultations, inpatient/day-case care, imaging, tests, second opinions, oncology, physio, and cancer pathways — with notes that many policies exclude items marked in the full guide (e.g. some A&E, transplants, fertility, routine GP, mental health, depending on policy).",
            },
            {
              title: "Types of underwriting",
              body: "Three common types: moratorium (often “5 and 2” rules), full medical underwriting (detailed history; acute issues in the last 1–2 years may be excluded initially), and switch underwriting when moving insurer with existing conditions. Over-75s are often offered full medical underwriting only.",
            },
            {
              title: "What PMI usually excludes",
              body: "Typically not emergencies or chronic long-term conditions; cover is aimed at acute conditions and planned (elective) treatment. Chronic conditions such as Type 2 diabetes are usually not funded for ongoing care, though an acute episode may be covered depending on policy wording.",
            },
            {
              title: "Choice of consultant & hospitals",
              body: "The BMA favours patients being able to choose their consultant with GP support, and disapproves of schemes that only shortlist three consultants. Check hospital networks, overseas cover (USA may need extra cover), and whether you can top up if fees exceed insurer limits.",
            },
            {
              title: "GMC recognition vs insurer lists",
              body: "Being GMC-registered with practising privileges does not mean every insurer recognises a consultant — insurers use recognition agreements and fee schedules. Ask for covered doctors and hospitals before you buy; query non-recognition if you believe a specialist is clinically appropriate.",
            },
            {
              title: "PHIN and disputes",
              body: "The Private Health Information Network (PHIN) publishes information on doctors and hospitals — see phin.org.uk. For claim disputes, use the insurer’s process; the Financial Ombudsman Service can help if you remain unhappy.",
            },
            {
              title: "Premiums, claims & switching",
              body: "Premiums depend on age, history, postcode, and lifestyle factors. Ask about claim limits, waiting periods, no-claims discount rules, and excess. If switching insurers, seek “no worse terms” so new problems under an old policy are not wrongly treated as pre-existing exclusions.",
            },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-10">
          <span className="font-semibold text-gray-800">Useful link (from the BMA guide):</span>{" "}
          <a
            href="https://www.phin.org.uk/"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="text-[#0ebcc8] underline hover:text-[#0da5b5]"
          >
            Private Health Information Network (PHIN)
          </a>
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-[#2d2f5e] mb-3">Managed care pathways</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            The BMA raises concerns about PMI “managed care” initiatives where case managers influence pathways — arguing
            this can shift decisions away from patients, GPs, and consultants toward cost-driven models. Ask whether
            your insurer uses these and how you are involved in decisions.
          </p>
        </div>

        <div className="bg-[#2d2f5e]/5 border border-[#2d2f5e]/10 rounded-xl p-6 mb-10">
          <p className="text-gray-700 text-sm leading-relaxed">
            HealthCoverCompare is an introducer, not an insurer. We do not give regulated advice; FCA-regulated brokers
            compare products and explain terms. Use this BMA guide alongside professional advice and your policy documents.
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
