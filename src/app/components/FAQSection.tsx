import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is business health insurance for SMEs?",
    answer: "Business health insurance — also called group private medical insurance (PMI) — is an employee benefit arranged by an employer to give staff access to private healthcare. For UK SMEs, it can help reduce sickness absence, support faster treatment, and strengthen your benefits package when recruiting and retaining talent. Schemes can often be set up from just two employees."
  },
  {
    question: "How many employees do I need to qualify?",
    answer: "Many group schemes are available from as few as two employees, making cover accessible to micro-businesses and growing SMEs as well as larger companies. Eligibility rules vary by insurer — factors such as company structure, location, and the level of cover required will affect which schemes you can access. Our broker partners can advise on options for your specific headcount."
  },
  {
    question: "Is business health insurance tax-efficient?",
    answer: "In most cases, employer-paid group health insurance is treated as a business expense and is generally an allowable deduction for corporation tax purposes. For employees, PMI is usually a taxable benefit in kind (PBIK) and must be reported via PAYE. Tax treatment depends on your company structure and how the scheme is set up — your broker or accountant can confirm the position for your business."
  },
  {
    question: "Can employees with pre-existing conditions be covered?",
    answer: "Group schemes handle pre-existing conditions differently to individual policies. Insurers may apply medical underwriting at a group level, use moratorium underwriting, or cover all eligible employees with certain exclusions. The approach depends on scheme size, insurer, and whether cover is compulsory or voluntary. Your broker will explain how each option affects your workforce before you commit."
  },
  {
    question: "Should we review our group scheme every year?",
    answer: "Yes. Reviewing your scheme before renewal helps ensure cover still matches your workforce, budget, and business goals. Premiums often increase at renewal, and comparing the market can identify better value or improved benefits. An annual review is especially important if your headcount, employee demographics, or benefits strategy has changed during the year."
  },
  {
    question: "Can we add new employees to an existing scheme?",
    answer: "Yes. Group policies are designed to accommodate changes in your workforce. New starters can typically be added during the policy year or at defined enrolment windows, depending on the insurer and scheme rules. Leavers are removed accordingly. Your broker or scheme administrator handles day-to-day membership changes and will advise on the process for your policy."
  },
  {
    question: "Do employees need a medical exam?",
    answer: "Most SME and corporate group schemes do not require individual medical examinations. Insurers usually apply underwriting at scheme level — for example, moratorium underwriting or full medical underwriting for the group as a whole. Employees may need to complete a health declaration when joining, but this is typically straightforward and handled as part of the enrolment process."
  },
  {
    question: "What is the difference between corporate and small company cover?",
    answer: "Corporate schemes typically serve larger workforces with more complex benefits structures, optional tiers of cover, and dedicated account management. Small company and SME schemes are designed for lower headcounts — often from two employees — with simpler administration and flexible cover levels. Both provide group PMI; the main differences are scale, features, and how the scheme is managed."
  },
];

const howWeWorkData: FAQItem[] = [
  {
    question: "How do I get an SME health insurance quote?",
    answer: "Click 'Get SME Quote' and complete the enquiry form with company size, location, and the cover you need. We introduce you to FCA-regulated broker partners who compare group schemes. There is no obligation to proceed."
  },
  {
    question: "Is your comparison service free for employers?",
    answer: "Yes. The introduction is free for employers. If you take a policy through a broker partner, they typically receive commission from the insurer. That does not usually increase the premium compared with going to the same insurer direct."
  },
  {
    question: "What happens after I receive group scheme quotes?",
    answer: "Your broker will walk you through each option — explaining cover levels, exclusions, employee eligibility, and premium breakdowns. You can take your time with no pressure to buy. When you are ready, they handle the application, insurer liaison, and employee enrolment. Ongoing support is available for renewals, membership changes, and claims queries."
  },
  {
    question: "Can you help us switch or renew our existing group scheme?",
    answer: "Yes. Our broker partners can benchmark an existing group scheme against other insurers on their panel. They should time any switch so cover does not lapse. That is not a promise the premium will fall."
  },
];

export function FAQSection() {
  const [activeTab, setActiveTab] = useState<"faq" | "howWeWork">("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAllFAQs, setShowAllFAQs] = useState(false);
  const [showAllHowWeWork, setShowAllHowWeWork] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentData = activeTab === "faq" ? faqData : howWeWorkData;
  const showAll = activeTab === "faq" ? showAllFAQs : showAllHowWeWork;
  const INITIAL_DISPLAY_COUNT = 6;

  const filteredData = searchQuery
    ? currentData.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentData;

  const displayedData = searchQuery || showAll ? filteredData : filteredData.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = !searchQuery && currentData.length > INITIAL_DISPLAY_COUNT;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleTabChange = (tab: "faq" | "howWeWork") => {
    setActiveTab(tab);
    setOpenIndex(null);
    setSearchQuery("");
  };

  const toggleShowAll = () => {
    if (activeTab === "faq") {
      setShowAllFAQs(!showAllFAQs);
    } else {
      setShowAllHowWeWork(!showAllHowWeWork);
    }
    setOpenIndex(null);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-brand-teal font-semibold uppercase tracking-wide text-sm mb-2">
            Employer guidance
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            SME Health Insurance FAQs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Common questions from UK employers about group health cover, tax, eligibility, and how our comparison service works.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => handleTabChange("faq")}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === "faq"
                  ? "bg-brand-navy text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Employer FAQs ({faqData.length})
            </button>
            <button
              onClick={() => handleTabChange("howWeWork")}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === "howWeWork"
                  ? "bg-brand-navy text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Getting a quote ({howWeWorkData.length})
            </button>
          </div>

          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employer FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/25 transition-all"
            />
          </div>
        </div>

        {searchQuery && displayedData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No results found for &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-gray-400 text-sm mt-2">Try different keywords or browse all FAQs</p>
          </div>
        )}

        {displayedData.length > 0 && (
          <div className="space-y-3">
            {displayedData.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-brand-teal/30 transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-brand-surface transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-8">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-[28rem]" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-4 bg-brand-surface border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={toggleShowAll}
              className="px-8 py-3 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full font-medium transition-colors"
            >
              {showAll ? "Show Less" : `Show ${currentData.length - INITIAL_DISPLAY_COUNT} More`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
