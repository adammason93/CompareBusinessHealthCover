import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Calendar as CalendarComponent } from "@/app/components/ui/calendar";
import { format } from "date-fns";
import { 
  Home, Users, Briefcase, UserCircle, HelpCircle, Heart, User, Building2,
  ChevronRight, ChevronLeft, Check, Info, Save, Clock, Edit2,
  AlertCircle, CheckCircle2, Calendar, Phone, Mail, MapPin, Sparkles,
  FolderOpen, LogIn, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MultiStepFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
  user?: any;
  onOpenAuth?: () => void;
}

export interface FormData {
  compareType: string;
  currentCover: string;
  lumpSum: string;
  coverType: string;
  policyTerm: string;
  peopleCount: string;
  ages: string;
  smokedVaped: string;
  medicalHistory: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  dateOfBirth?: string;
  preferredContactDate?: string;
  preferredContactTime?: string;
  preferredContactMethod?: string;
  consentToContact?: boolean;
}

const steps = [
  { number: 1, label: "Type", icon: Briefcase, time: "30s" },
  { number: 2, label: "Current", icon: CheckCircle2, time: "15s" },
  { number: 3, label: "People", icon: Users, time: "15s" },
  { number: 4, label: "Ages", icon: User, time: "30s" },
  { number: 5, label: "Health", icon: Heart, time: "15s" },
  { number: 6, label: "Medical", icon: HelpCircle, time: "20s" },
  { number: 7, label: "Details", icon: UserCircle, time: "60s" },
  { number: 8, label: "Contact", icon: Clock, time: "30s" },
  { number: 9, label: "Review", icon: Check, time: "30s" },
];

export function EnhancedMultiStepForm({ onSubmit, onBack, user, onOpenAuth }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [savedDraft, setSavedDraft] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors, touchedFields } } = useForm<FormData>({
    mode: "onChange",
    defaultValues:
      typeof window !== 'undefined'
        ? {
            compareType: 'sme-health',
            ...JSON.parse(localStorage.getItem('businessHealthFormDraft') || '{}'),
          }
        : { compareType: 'sme-health' },
  });

  const watchedFields = watch();

  // Auto-save draft every 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && currentStep > 1) {
        localStorage.setItem('businessHealthFormDraft', JSON.stringify(watchedFields));
        setSavedDraft(true);
        setTimeout(() => setSavedDraft(false), 2000);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [watchedFields, currentStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isStepValid() && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (currentStep < steps.length) {
          nextStep();
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, watchedFields]);

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
  const estimatedTimeRemaining = steps.slice(currentStep - 1).reduce((acc, step) => {
    const seconds = parseInt(step.time);
    return acc + seconds;
  }, 0);

  const nextStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    let nextStepNumber = currentStep + 1;
    
    // Skip Ages, Smoking/Vaping, and Medical History steps for SME and Corporate cover types
    if (currentStep === 3 && (watchedFields.compareType === 'sme-health' || watchedFields.compareType === 'large-corporate-health')) {
      nextStepNumber = 7; // Skip to step 7 (Contact Details)
    }
    
    // Skip Smoking/Vaping and Medical History steps for SME and Corporate when coming from Ages step
    if (currentStep === 4 && (watchedFields.compareType === 'sme-health' || watchedFields.compareType === 'large-corporate-health')) {
      nextStepNumber = 7; // Skip to step 7 (Contact Details)
    }
    
    // Skip Medical History step for SME and Corporate when coming from Smoking/Vaping step
    if (currentStep === 5 && (watchedFields.compareType === 'sme-health' || watchedFields.compareType === 'large-corporate-health')) {
      nextStepNumber = 7; // Skip to step 7 (Contact Details)
    }
    
    setCurrentStep((prev) => Math.min(nextStepNumber, steps.length));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      let prevStepNumber = currentStep - 1;
      
      // Skip Ages, Smoking/Vaping, and Medical History steps when going back for SME and Corporate cover types
      if (currentStep === 7 && (watchedFields.compareType === 'sme-health' || watchedFields.compareType === 'large-corporate-health')) {
        prevStepNumber = 3; // Go back to step 3 (People Count)
      }
      
      // Skip Smoking/Vaping and Medical History steps when going back for SME and Corporate (if somehow on step 6)
      if (currentStep === 6 && (watchedFields.compareType === 'sme-health' || watchedFields.compareType === 'large-corporate-health')) {
        prevStepNumber = 3; // Go back to step 3 (People Count)
      }
      
      // Skip Smoking/Vaping step when going back for SME and Corporate (if somehow on step 5)
      if (currentStep === 5 && (watchedFields.compareType === 'sme-health' || watchedFields.compareType === 'large-corporate-health')) {
        prevStepNumber = 3; // Go back to step 3 (People Count)
      }
      
      setCurrentStep((prev) => Math.max(prevStepNumber, 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step: number) => {
    // Skip Ages, Smoking/Vaping, and Medical History steps for SME and Corporate cover types
    if ((step === 4 || step === 5 || step === 6) && (watchedFields.compareType === 'sme-health' || watchedFields.compareType === 'large-corporate-health')) {
      return; // Don't allow navigation to Ages, Smoking/Vaping, or Medical History steps for SME/Corporate
    }
    
    if (step <= currentStep || completedSteps.includes(step - 1)) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onFormSubmit = (data: FormData) => {
    if (currentStep < steps.length) {
      nextStep();
    } else {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('businessHealthFormDraft');
      }
      onSubmit(data);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return !!watchedFields.compareType;
      case 2: return !!watchedFields.currentCover;
      case 3: return !!watchedFields.peopleCount;
      case 4: return !!watchedFields.ages;
      case 5: return !!watchedFields.smokedVaped;
      case 6: return !!watchedFields.medicalHistory;
      case 7: return !!watchedFields.firstName && !!watchedFields.email && !!watchedFields.phone;
      case 8: return true; // Contact preferences are optional
      case 9: return !!watchedFields.consentToContact;
      default: return false;
    }
  };

  const OptionButton = ({ 
    id, label, value, description, currentValue, onClick, icon: Icon 
  }: { 
    id: string; label: string; value: string; description?: string; 
    currentValue: string; onClick: () => void; icon?: any;
  }) => (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all shadow-sm ${ 
        currentValue === value
          ? 'bg-gradient-to-r from-brand-teal-muted to-blue-50 border-2 border-brand-teal shadow-md'
          : 'bg-white border-2 border-gray-200 hover:border-brand-teal/40 hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {Icon && (
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
            currentValue === value ? 'bg-brand-teal text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className={`text-sm sm:text-base font-semibold ${currentValue === value ? 'text-brand-teal-hover' : 'text-gray-900'}`}>
            {label}
          </div>
          {description && (
            <div className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
              {description}
            </div>
          )}
        </div>
        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
          currentValue === value 
            ? 'bg-brand-teal border-brand-teal' 
            : 'bg-white border-gray-300'
        }`}>
          {currentValue === value && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
        </div>
      </div>
    </motion.button>
  );

  const IconOptionCard = ({ 
    id, label, value, icon: Icon, currentValue, onClick 
  }: { 
    id: string; label: string; value: string; icon: any; 
    currentValue: string; onClick: () => void;
  }) => (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-6 rounded-xl transition-all shadow-sm ${
        currentValue === value
          ? 'bg-gradient-to-br from-brand-teal-muted to-blue-50 border-2 border-brand-teal shadow-lg'
          : 'bg-white border-2 border-gray-200 hover:border-brand-teal/40 hover:shadow-md'
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
          currentValue === value ? 'bg-brand-teal text-white' : 'bg-gray-100 text-gray-600'
        }`}>
          <Icon className="w-10 h-10" strokeWidth={1.5} />
        </div>
        <span className={`font-semibold text-center ${
          currentValue === value ? 'text-brand-teal-hover' : 'text-gray-900'
        }`}>
          {label}
        </span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
          currentValue === value 
            ? 'bg-brand-teal border-brand-teal' 
            : 'bg-white border-gray-300'
        }`}>
          {currentValue === value && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>
    </motion.button>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-brand-teal-muted py-2 sm:py-4 px-3 sm:px-6">
      <div className="max-w-[95%] mx-auto">
        {/* Header with Progress */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-2 sm:mb-3"
        >
          <div className="mb-2">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-brand-teal" />
                <span className="text-[10px] sm:text-xs font-semibold text-gray-700">
                  Step {currentStep} of {steps.length}
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
                <Clock className="w-3 h-3" />
                <span>~{Math.floor(estimatedTimeRemaining / 60)}:{(estimatedTimeRemaining % 60).toString().padStart(2, '0')} remaining</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-gradient-to-r from-brand-teal to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            {/* Step Indicators - Desktop */}
            <div className="hidden lg:flex justify-between items-center">
              {steps.map((step, idx) => (
                <div key={step.number} className="flex items-center flex-1 min-w-0">
                  <button
                    onClick={() => goToStep(step.number)}
                    disabled={step.number > currentStep && !completedSteps.includes(step.number - 1)}
                    className={`flex flex-col items-center gap-0.5 min-w-0 ${
                      step.number <= currentStep || completedSteps.includes(step.number)
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed opacity-40'
                    }`}
                  >
                    <motion.div 
                      whileHover={step.number <= currentStep ? { scale: 1.1 } : {}}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        step.number === currentStep
                          ? 'bg-brand-teal text-white shadow-lg ring-2 ring-brand-teal/25'
                          : completedSteps.includes(step.number)
                          ? 'bg-green-500 text-white'
                          : step.number < currentStep
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {completedSteps.includes(step.number) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                    </motion.div>
                    <span className={`text-[10px] font-medium text-center truncate max-w-[50px] ${
                      step.number === currentStep ? 'text-brand-teal-hover' : 'text-gray-600'
                    }`}>
                      {step.label}
                    </span>
                  </button>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-0.5 min-w-[4px] ${
                      completedSteps.includes(step.number) ? 'bg-green-400' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Indicators - Mobile */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2">
              {steps.map((step) => (
                <button
                  key={step.number}
                  onClick={() => goToStep(step.number)}
                  disabled={step.number > currentStep && !completedSteps.includes(step.number - 1)}
                  className={`flex flex-col items-center gap-1 min-w-[60px] ${
                    step.number <= currentStep || completedSteps.includes(step.number)
                      ? 'cursor-pointer'
                      : 'cursor-not-allowed opacity-40'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step.number === currentStep
                      ? 'bg-brand-teal text-white shadow-lg scale-110'
                      : completedSteps.includes(step.number)
                      ? 'bg-green-500 text-white'
                      : step.number < currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {completedSteps.includes(step.number) ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
                    step.number === currentStep ? 'text-brand-teal-hover' : 'text-gray-600'
                  }`}>
                    {step.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Auto-save indicator */}
          <AnimatePresence>
            {savedDraft && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg"
              >
                <Save className="w-4 h-4" />
                <span>Progress saved automatically</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8"
            >
              {/* Step 1: Compare Type */}
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                      What Would You Like To Compare?
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">Select the type of business health cover you need</p>
                  </div>
                  
                  <div className="space-y-3">
                    <OptionButton
                      id="A"
                      label="SME Health Insurance"
                      value="sme-health"
                      description="Employee health cover for small and medium businesses (from 2 staff)"
                      currentValue={watchedFields.compareType || 'sme-health'}
                      onClick={() => setValue("compareType", "sme-health")}
                      icon={Briefcase}
                    />
                    <OptionButton
                      id="B"
                      label="Large Corporate Health Insurance"
                      value="large-corporate-health"
                      description="Health cover for larger organisations and corporate teams"
                      currentValue={watchedFields.compareType || 'sme-health'}
                      onClick={() => setValue("compareType", "large-corporate-health")}
                      icon={Building2}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Current Cover */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Do you currently have cover in place?
                    </h2>
                    <p className="text-gray-600">This helps us understand your needs better</p>
                  </div>
                  
                  <div className="space-y-3">
                    <OptionButton
                      id="A"
                      label="Yes, I have existing cover"
                      value="yes"
                      currentValue={watchedFields.currentCover || ''}
                      onClick={() => setValue("currentCover", "yes")}
                      icon={CheckCircle2}
                    />
                    <OptionButton
                      id="B"
                      label="No, I'm looking for new cover"
                      value="no"
                      currentValue={watchedFields.currentCover || ''}
                      onClick={() => setValue("currentCover", "no")}
                      icon={AlertCircle}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: People Count */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      How many people need cover?
                    </h2>
                    <p className="text-gray-600">Select the number of individuals</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['1', '2', '3', '4+'].map((count) => (
                      <motion.button
                        key={count}
                        type="button"
                        onClick={() => setValue("peopleCount", count)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-6 rounded-xl transition-all shadow-sm ${
                          watchedFields.peopleCount === count
                            ? 'bg-gradient-to-br from-brand-teal-muted to-blue-50 border-2 border-brand-teal shadow-lg'
                            : 'bg-white border-2 border-gray-200 hover:border-brand-teal/40 hover:shadow-md'
                        }`}
                      >
                        <div className="text-3xl font-bold text-brand-teal-hover mb-2">{count}</div>
                        <div className="text-sm text-gray-600">
                          {count === '1' ? 'Person' : 'People'}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-px bg-gray-300"></div>
                      <span className="text-sm text-gray-500 font-medium">OR</span>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                    
                    <div className="max-w-md mx-auto">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter a custom number:
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="99"
                        placeholder="Enter number of people"
                        value={watchedFields.peopleCount && !['1', '2', '3', '4+'].includes(watchedFields.peopleCount) ? watchedFields.peopleCount : ''}
                        onChange={(e) => setValue("peopleCount", e.target.value)}
                        className="h-14 text-lg border-2 border-gray-200 focus:border-brand-teal rounded-xl text-center"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Ages */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      What are the ages of those needing cover?
                    </h2>
                    <p className="text-gray-600">Enter ages separated by commas (e.g., 35, 32)</p>
                  </div>
                  
                  <div className="max-w-xl">
                    <Input
                      type="text"
                      placeholder="e.g., 35, 32, 8, 5"
                      value={watchedFields.ages || ''}
                      onChange={(e) => setValue("ages", e.target.value)}
                      className="h-14 text-lg border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Smoking/Vaping */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Have you smoked or vaped in the last 12 months?
                    </h2>
                    <p className="text-gray-600">This affects your premium rates</p>
                  </div>
                  
                  <div className="space-y-3 max-w-md">
                    <OptionButton
                      id="A"
                      label="Yes"
                      value="yes"
                      currentValue={watchedFields.smokedVaped || ''}
                      onClick={() => setValue("smokedVaped", "yes")}
                      icon={AlertCircle}
                    />
                    <OptionButton
                      id="B"
                      label="No"
                      value="no"
                      currentValue={watchedFields.smokedVaped || ''}
                      onClick={() => setValue("smokedVaped", "no")}
                      icon={CheckCircle2}
                    />
                  </div>
                </div>
              )}

              {/* Step 6: Medical History */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Any significant medical history?
                    </h2>
                    <p className="text-gray-600">We need to know about any pre-existing conditions</p>
                  </div>
                  
                  <div className="space-y-3 max-w-md">
                    <OptionButton
                      id="A"
                      label="Yes"
                      value="yes"
                      currentValue={watchedFields.medicalHistory || ''}
                      onClick={() => setValue("medicalHistory", "yes")}
                      icon={AlertCircle}
                    />
                    <OptionButton
                      id="B"
                      label="No"
                      value="no"
                      currentValue={watchedFields.medicalHistory || ''}
                      onClick={() => setValue("medicalHistory", "no")}
                      icon={CheckCircle2}
                    />
                  </div>
                </div>
              )}

              {/* Step 7: Contact Details */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Your Contact Details
                    </h2>
                    <p className="text-gray-600">We'll use these details to send your personalized quotes</p>
                  </div>
                  
                  <div className="space-y-4 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Select
                        value={watchedFields.title}
                        onValueChange={(value) => setValue("title", value)}
                      >
                        <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-brand-teal rounded-xl">
                          <SelectValue placeholder="Title" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mr">Mr</SelectItem>
                          <SelectItem value="mrs">Mrs</SelectItem>
                          <SelectItem value="miss">Miss</SelectItem>
                          <SelectItem value="ms">Ms</SelectItem>
                          <SelectItem value="dr">Dr</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="md:col-span-3">
                        <Input
                          type="text"
                          placeholder="First Name *"
                          value={watchedFields.firstName || ''}
                          onChange={(e) => setValue("firstName", e.target.value)}
                          className="h-12 border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                        />
                      </div>
                    </div>

                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={watchedFields.lastName || ''}
                      onChange={(e) => setValue("lastName", e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                    />

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="email"
                        placeholder="Email Address *"
                        value={watchedFields.email || ''}
                        onChange={(e) => setValue("email", e.target.value)}
                        className="h-12 pl-10 border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="tel"
                        placeholder="Phone Number *"
                        value={watchedFields.phone || ''}
                        onChange={(e) => setValue("phone", e.target.value)}
                        className="h-12 pl-10 border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Postcode"
                        value={watchedFields.postcode || ''}
                        onChange={(e) => setValue("postcode", e.target.value)}
                        className="h-12 pl-10 border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 pl-1">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="date"
                          value={watchedFields.dateOfBirth || ''}
                          onChange={(e) => setValue("dateOfBirth", e.target.value)}
                          className="h-12 pl-10 border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                        />
                      </div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200"
                    >
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-green-900">
                          Your information is secure and will only be used to provide you with quotes. We never share your details without permission.
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Step 8: Contact Preferences */}
              {currentStep === 8 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      When would you like to be contacted?
                    </h2>
                    <p className="text-gray-600">Help us reach you at a convenient time</p>
                  </div>
                  
                  <div className="space-y-6 max-w-2xl">
                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <OptionButton
                          id="phone"
                          label="Phone"
                          value="phone"
                          currentValue={watchedFields.preferredContactMethod || ''}
                          onClick={() => setValue("preferredContactMethod", "phone")}
                          icon={Phone}
                        />
                        <OptionButton
                          id="email"
                          label="Email"
                          value="email"
                          currentValue={watchedFields.preferredContactMethod || ''}
                          onClick={() => setValue("preferredContactMethod", "email")}
                          icon={Mail}
                        />
                        <OptionButton
                          id="either"
                          label="Either"
                          value="either"
                          currentValue={watchedFields.preferredContactMethod || ''}
                          onClick={() => setValue("preferredContactMethod", "either")}
                          icon={CheckCircle2}
                        />
                      </div>
                    </div>

                    {/* Preferred Contact Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Preferred Contact Date (Optional)
                      </label>
                      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger className="w-full">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("Button clicked, opening calendar");
                              setCalendarOpen(true);
                            }}
                            className={`w-full h-12 justify-start text-left font-normal border-2 border-gray-200 hover:border-brand-teal rounded-xl px-4 py-2 bg-white flex items-center ${
                              !watchedFields.preferredContactDate && "text-gray-500"
                            }`}
                          >
                            <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                            {watchedFields.preferredContactDate ? (
                              format(new Date(watchedFields.preferredContactDate), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-[9999]" align="start" sideOffset={4}>
                          <CalendarComponent
                            mode="single"
                            selected={watchedFields.preferredContactDate ? new Date(watchedFields.preferredContactDate) : undefined}
                            onSelect={(date) => {
                              console.log("Date selected:", date);
                              if (date) {
                                setValue("preferredContactDate", date.toISOString().split('T')[0]);
                                setCalendarOpen(false);
                              }
                            }}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Preferred Contact Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Preferred Time of Day
                      </label>
                      <Select
                        value={watchedFields.preferredContactTime}
                        onValueChange={(value) => setValue("preferredContactTime", value)}
                      >
                        <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-brand-teal rounded-xl">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                          <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                          <SelectItem value="anytime">Anytime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200"
                    >
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-900">
                          These preferences are optional. If you don't specify, we'll contact you as soon as possible using the details you provided.
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Step 9: Review & Submit */}
              {currentStep === 9 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Review Your Information
                    </h2>
                    <p className="text-gray-600">Please check all details before submitting</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-brand-teal-hover" />
                            Coverage Details
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="font-medium capitalize">{watchedFields.compareType?.replace('-', ' ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">People:</span>
                              <span className="font-medium">{watchedFields.peopleCount}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <UserCircle className="w-5 h-5 text-brand-teal-hover" />
                            Personal Details
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name:</span>
                              <span className="font-medium">{watchedFields.title} {watchedFields.firstName} {watchedFields.lastName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Email:</span>
                              <span className="font-medium break-all">{watchedFields.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Phone:</span>
                              <span className="font-medium">{watchedFields.phone}</span>
                            </div>
                            {watchedFields.postcode && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Postcode:</span>
                                <span className="font-medium">{watchedFields.postcode}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Contact Preferences Section */}
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-brand-teal-hover" />
                          Contact Preferences
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Preferred Method:</span>
                            <span className="font-medium capitalize">{watchedFields.preferredContactMethod}</span>
                          </div>
                          {watchedFields.preferredContactDate && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Preferred Date:</span>
                              <span className="font-medium">{format(new Date(watchedFields.preferredContactDate), "PPP")}</span>
                            </div>
                          )}
                          {watchedFields.preferredContactTime && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Preferred Time:</span>
                              <span className="font-medium">{watchedFields.preferredContactTime}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-brand-teal-muted rounded-xl border border-brand-teal/20">
                      <Edit2 className="w-5 h-5 text-brand-teal-hover" />
                      <p className="text-sm text-brand-teal-hover">
                        Need to make changes? Click on any step above to go back and edit.
                      </p>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          {...register("consentToContact", { required: true })}
                          className="mt-1 w-5 h-5 text-brand-teal border-gray-300 rounded focus:ring-2 focus:ring-brand-teal cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900">
                          I agree to be contacted by our broker partner who are authorised and regulated by the financial conduct authority FCA.
                        </span>
                      </label>
                      {errors.consentToContact && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center gap-2"
                        >
                          <AlertCircle className="w-4 h-4" />
                          You must agree to be contacted before submitting
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 gap-4">
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            
            <Button
              type="submit"
              disabled={!isStepValid()}
              className="px-8 py-3 bg-gradient-to-r from-brand-teal to-blue-500 hover:from-brand-teal-hover hover:to-blue-600 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {currentStep === steps.length ? (
                <>
                  <span className="hidden sm:inline">Submit Application</span>
                  <span className="sm:hidden">Submit</span>
                  <Sparkles className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Continue</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Keyboard shortcut hint - only show when step is valid */}
          {(currentStep === 5 || currentStep === 8) && isStepValid() && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-sm text-gray-500 mt-4"
            >
              Press <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Enter</kbd> to continue
            </motion.p>
          )}
        </form>
      </div>
    </div>
  );
}