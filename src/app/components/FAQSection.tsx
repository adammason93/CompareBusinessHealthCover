import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Is it better to pay monthly or annually for health insurance?",
    answer: "Paying annually with some insurers can offer a premium saving.  However, monthly payments offer better cash flow management and are more affordable upfront. Annual payments can save you money in the long run and are paid in one lump sum. Consider your budget and financial situation - if you can afford the annual premium, you'll likely save money, but monthly payments offer more flexibility."
  },
  {
    question: "Does health insurance cover cancer treatment?",
    answer: "Yes, most comprehensive private health insurance policies cover cancer treatment, including chemotherapy, radiotherapy, surgery, and consultations with oncologists. However, coverage can vary between policies and providers. Pre-existing cancer conditions are usually excluded. It's crucial to check your policy details and speak with your insurer about specific cancer treatments and any limitations or exclusions that may apply."
  },
  {
    question: "Can I get health insurance with a pre-existing medical condition?",
    answer: "Yes, you can get health insurance with a pre-existing condition, but that specific condition will typically be excluded from your cover.  The insurer will assess your medical history and decide what's covered. Some conditions may be covered after a certain period (known as a 'moratorium period'), usually 2 years of being symptom-free. Alternatively, 'Full Medical Underwriting' means you disclose all conditions upfront, and the insurer decides what to exclude. You'll still be covered for new conditions that arise after taking out the policy."
  },
  {
    question: "Do I need to review my health insurance every year?",
    answer: "Yes, it's highly recommended to review your health insurance annually, ideally before your renewal date. Your circumstances, health needs, and budget may change over time. Premium costs often increase at renewal, and comparing the market could help you find better value or more suitable cover. Changes in your health, family situation, or the treatments you need may mean your current policy is no longer the best fit. Regular reviews ensure you're getting the best deal and appropriate coverage for your current needs."
  },
  {
    question: "Can I add other people to my health insurance policy?",
    answer: "Yes, most health insurance providers offer family policies where you can add your spouse/partner and children. Children are typically covered at no extra cost up to a certain age (usually 18-25 if in full-time education). Adding a partner will increase your premium, but a joint policy is usually cheaper than two separate policies. Some policies also allow you to add parents or other dependents. Each person added will undergo medical underwriting, and their pre-existing conditions will be assessed separately."
  },
  {
    question: "Do I need a medical exam for health insurance?",
    answer: "Not always. Many health insurance policies use a 'moratorium' approach where you don't need a medical exam - you simply declare that you understand pre-existing conditions from the last 5 years won't be covered. Alternatively, with 'Full Medical Underwriting' (FMU), you complete a detailed medical questionnaire, and in some cases, may need a medical examination or provide medical records. FMU can be beneficial as it clearly defines what is and isn't covered from the start. The approach depends on your insurer, policy type, age, and the level of cover you're seeking."
  }
];

const howWeWorkData: FAQItem[] = [
  {
    question: "How do I get started with comparing health insurance?",
    answer: "Getting started is simple! Just click the 'Get A Quote' button and fill out our quick online form. You'll answer a few questions about yourself, your health needs, and your budget. We'll then search the market and present you with personalised quotes from leading UK insurers. The whole process takes just a few minutes, and there's no obligation to buy. Our expert advisers are also available if you need help or have questions."
  },
  {
    question: "Is your comparison service really free?",
    answer: "Yes, our service is completely free for you to use. We're paid a commission by the insurance companies when you take out a policy through us, but this doesn't affect the price you pay - you'll pay the same premium whether you go direct to the insurer or use our service. In fact, we often have access to exclusive deals that can save you money. There are no hidden fees or charges."
  },
  {
    question: "What happens after I receive my quotes?",
    answer: "Once you receive your quotes, you can take your time reviewing them with no pressure. Our broker will be available to explain the differences between policies, answer questions, and help you understand the coverage options. When you're ready, they will help you complete the application process and get your policy set up. They will handle all the paperwork and liaise with the insurer on your behalf. Even after you've purchased your policy, they're here to help with any queries or issues that may arise."
  },
  {
    question: "Can you help me switch from my current provider?",
    answer: "Absolutely! Our broker partner can help you switch providers to get better coverage or lower premiums. They will review your current policy, ensure there's no gap in coverage, and help you find a better deal. They will also advise on the best time to switch (usually at renewal to avoid cancellation fees) and handle the entire switching process for you. Switching is often easier than people think, and you could save hundreds of pounds per year while getting better cover."
  }
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
  
  // Filter data based on search query
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
    setOpenIndex(null); // Close any open accordion when switching tabs
    setSearchQuery(""); // Clear search when switching tabs
  };

  const toggleShowAll = () => {
    if (activeTab === "faq") {
      setShowAllFAQs(!showAllFAQs);
    } else {
      setShowAllHowWeWork(!showAllHowWeWork);
    }
    setOpenIndex(null); // Close any open accordion when toggling
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => handleTabChange("faq")}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === "faq"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              FAQs ({faqData.length})
            </button>
            <button
              onClick={() => handleTabChange("howWeWork")}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === "howWeWork"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              How we work ({howWeWorkData.length})
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="faq-search"
              name="faq-search"
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
            />
          </div>
        </div>

        {/* No Results Message */}
        {searchQuery && displayedData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No results found for "{searchQuery}"</p>
            <p className="text-gray-400 text-sm mt-2">Try different keywords or browse all FAQs</p>
          </div>
        )}

        {/* FAQ Accordion */}
        {displayedData.length > 0 && (
          <div className="space-y-3">
            {displayedData.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
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
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show More / Show Less Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={toggleShowAll}
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-medium transition-colors"
            >
              {showAll ? "Show Less" : `Show ${currentData.length - INITIAL_DISPLAY_COUNT} More`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}