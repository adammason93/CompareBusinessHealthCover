import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Smart response system based on keywords
const getSmartResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Health insurance basics
  if (message.includes('what is') && (message.includes('health insurance') || message.includes('private medical') || message.includes('group'))) {
    return "Business health insurance (group PMI) provides private medical cover for your employees under a scheme arranged by the employer. It helps staff access treatment faster, supports wellbeing, and is a valued employee benefit for UK SMEs.";
  }
  
  if (message.includes('how much') || message.includes('cost') || message.includes('price') || message.includes('expensive')) {
    return "Group health insurance costs depend on company size, employee ages, location, and cover level. Schemes often start from just 2 employees. Get a free SME quote for tailored pricing — click 'Get SME Quote' or call 01484 773038.";
  }
  
  if (message.includes('quote') || message.includes('get started') || message.includes('begin')) {
    return "You can get a free SME quote by clicking 'Get SME Quote' on this page, or call our team on 01484 773038. It takes a few minutes and there is no obligation.";
  }
  
  if (message.includes('cover') && (message.includes('what') || message.includes('include'))) {
    return "Business health schemes typically cover specialist consultations, diagnostics, surgery, cancer treatment, and mental health support. Cover levels vary by insurer and scheme design — your broker can explain options for your workforce.";
  }
  
  if (message.includes('business') || message.includes('company') || message.includes('employee') || message.includes('sme') || message.includes('staff')) {
    return "We specialise in SME and business health insurance — from teams of 2 to larger corporate schemes. It is a proven way to attract talent, reduce absence, and support employee wellbeing. Call 01484 773038 or start an SME quote online.";
  }
  
  if (message.includes('family') || message.includes('children') || message.includes('kids')) {
    return "Our focus is business and group health insurance for employers. If you are looking to cover employees, click 'Get SME Quote' or call 01484 773038 and our brokers can advise on the right scheme for your company.";
  }
  
  // Pre-existing conditions
  if (message.includes('pre-existing') || message.includes('existing condition') || message.includes('medical history')) {
    return "Pre-existing conditions can be covered, but it depends on the insurer and your specific situation. Some policies offer full cover, others may exclude certain conditions. It's best to discuss this when getting your quote - call 01484 773038 for personalized advice.";
  }
  
  // Comparison and benefits
  if (message.includes('why use') || message.includes('why choose') || message.includes('benefit')) {
    return "We compare quotes from leading UK insurers to find you the best deal. You save time, money, and get expert advice - all completely free. Our broker partners are FCA regulated and we have excellent reviews. Get started now or call 01484 773038!";
  }
  
  if (message.includes('compare') || message.includes('comparison')) {
    return "We compare health insurance from multiple leading UK providers to find you the best coverage at the best price. Our service is 100% complimentary with no obligation. Click 'Get Your Quote' to start comparing now!";
  }
  
  // Age-related
  if (message.includes('age') || message.includes('old') || message.includes('young')) {
    return "Health insurance is available at any age. Premiums typically increase with age, but many insurers offer competitive rates for over 50s and 60s. Get an age-specific quote by calling 01484 773038 or clicking 'Get Your Quote'.";
  }
  
  // Contact and support
  if (message.includes('contact') || message.includes('phone') || message.includes('call') || message.includes('speak')) {
    return "You can reach us at: 📞 01484 773038 (Mon-Fri 9am-5pm) or 📧 info@comparebusinesshealthcover.co.uk. We're here to help with any questions about health insurance!";
  }
  
  if (message.includes('email') || message.includes('e-mail')) {
    return "Email us at info@comparebusinesshealthcover.co.uk and we'll respond within 24 hours. For immediate assistance, call 01484 773038.";
  }
  
  // Waiting times and NHS
  if (message.includes('waiting') || message.includes('nhs') || message.includes('how long')) {
    return "Private health insurance eliminates NHS waiting times. You can typically see a specialist within days, not months. This is one of the biggest benefits of private medical insurance in the UK.";
  }
  
  // Mental health
  if (message.includes('mental health') || message.includes('therapy') || message.includes('counselling') || message.includes('counseling')) {
    return "Many health insurance policies now include mental health coverage, including therapy and counselling sessions. Coverage varies by insurer - get a personalized quote to see specific mental health benefits.";
  }
  
  // Cancer
  if (message.includes('cancer')) {
    return "Most comprehensive health insurance policies include cancer coverage, including diagnosis, treatment, and ongoing care. This is typically a core benefit. For specific cancer coverage details, call 01484 773038.";
  }
  
  // Greetings
  if (message.includes('hello') || message.includes('hi ') || message === 'hi' || message.includes('hey')) {
    return "Hello! 👋 I'm here to help with any questions about health insurance. What would you like to know?";
  }
  
  if (message.includes('thank') || message.includes('thanks')) {
    return "You're very welcome! If you need anything else, just ask. Ready to get your free quote? 😊";
  }
  
  if (message.includes('bye') || message.includes('goodbye')) {
    return "Goodbye! Feel free to come back anytime. Don't forget to get your free quote or call us at 01484 773038! 👋";
  }
  
  // Help
  if (message.includes('help') || message === '?') {
    return "I can help you with questions about: health insurance costs, coverage options, family & business plans, pre-existing conditions, getting quotes, and contacting our team. What would you like to know?";
  }
  
  // Default response
  return "That's a great question! For detailed information specific to your situation, I'd recommend: 1) Getting a free personalized quote by clicking 'Get Your Quote', or 2) Speaking with our expert team at 01484 773038. They can give you tailored advice. Is there anything else I can help with?";
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I can help with SME and business health insurance questions — cover levels, group scheme costs, and getting a quote for your team.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    // Simulate a brief "thinking" delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const responseText = getSmartResponse(messageText);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
          aria-label="Close chat overlay"
        />
      )}

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 sm:bottom-6 right-6 z-50 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 sm:w-96 sm:max-w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] sm:h-auto sm:max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1D2D50] to-[#16233d] text-white p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-brand-teal rounded-full p-2">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Chat with us</h3>
                <p className="text-xs text-gray-200">We're here to help!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 rounded-full p-1 transition-colors flex-shrink-0"
              aria-label="Close chat"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-brand-teal text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-white/90'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-lg p-3 border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-teal text-sm"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-brand-teal hover:bg-brand-teal-hover text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}