import { CheckCircle, Sparkles, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { motion } from "motion/react";

interface SuccessPageProps {
  onReset: () => void;
}

export function SuccessPage({ onReset }: SuccessPageProps) {
  return (
    <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 p-4 sm:p-6">
      <div className="max-w-xl mx-auto text-center">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="mb-6"
        >
          <div className="relative inline-flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute w-24 h-24 bg-green-200 rounded-full opacity-20"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.3
              }}
              className="absolute w-20 h-20 bg-green-300 rounded-full opacity-30"
            />
            <div className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
            Enquiry Submitted Successfully!
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </h1>
          
          <p className="text-base text-gray-700 mb-5">
            Great news! You have passed our internal qualification for a full market search.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">What Happens Next?</h2>
            
            <div className="space-y-3 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-3 p-3 bg-teal-50 rounded-xl"
              >
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Personalized Quote Analysis</h3>
                  <p className="text-xs text-gray-600">
                    Our experts are now comparing rates from leading insurers to find your best options
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Email Confirmation</h3>
                  <p className="text-xs text-gray-600">
                    Check your inbox - we've sent a confirmation with your reference number
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl"
              >
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Expert Contact</h3>
                  <p className="text-xs text-gray-600">
                    An advisor will contact you within 24 hours to discuss your personalized quotes
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-4 text-white mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Average Response Time</h3>
            </div>
            <p className="text-2xl font-bold mb-1">Under 2 Hours</p>
            <p className="text-xs opacity-90">During business hours (Mon-Fri, 9am-6pm)</p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Button 
              onClick={onReset} 
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-8 py-5 rounded-xl text-base font-semibold shadow-xl w-full sm:w-auto"
            >
              Back to Homepage
            </Button>
          </motion.div>

          {/* Trust Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-xs text-gray-600 mt-4"
          >
            Your information is secure and protected. We never share your details without permission.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}