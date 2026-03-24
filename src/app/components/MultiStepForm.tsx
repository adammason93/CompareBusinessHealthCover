import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Home, Users, Briefcase, UserCircle, HelpCircle, Heart, User } from "lucide-react";

interface MultiStepFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

export interface FormData {
  // Step 1
  compareType: string;
  
  // Step 2
  currentCover: string;
  
  // Step 3
  lumpSum: string;
  
  // Step 4
  coverType: string;
  
  // Step 5
  policyTerm: string;
  
  // Step 6
  peopleCount: string;
  
  // Step 7
  ages: string;
  
  // Step 8
  smokedVaped: string;
  
  // Step 9
  medicalHistory: string;
}

const stepLabels = ["Compare", "Current Cover", "Amount", "Cover Type", "Term", "People", "Ages", "Health", "Medical History"];

export function MultiStepForm({ onSubmit, onBack }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    mode: "onChange"
  });

  const watchedFields = watch();

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 9));
  };

  const prevStep = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const onFormSubmit = (data: FormData) => {
    if (currentStep < 9) {
      nextStep();
    } else {
      onSubmit(data);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return watchedFields.compareType;
      case 2:
        return watchedFields.currentCover;
      case 3:
        return watchedFields.lumpSum;
      case 4:
        return watchedFields.coverType;
      case 5:
        return watchedFields.policyTerm;
      case 6:
        return watchedFields.peopleCount;
      case 7:
        return watchedFields.ages;
      case 8:
        return watchedFields.smokedVaped;
      case 9:
        return watchedFields.medicalHistory;
      default:
        return false;
    }
  };

  const OptionButton = ({ 
    id, 
    label, 
    value, 
    description, 
    currentValue, 
    onClick 
  }: { 
    id: string; 
    label: string; 
    value: string; 
    description?: string; 
    currentValue: string; 
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-all ${
        currentValue === value
          ? 'bg-blue-100 border-2 border-blue-600'
          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
      }`}
    >
      <div className="flex items-start gap-2">
        <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${
          currentValue === value ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'
        }`}>
          {id}
        </span>
        <div className="flex-1">
          <div className={`font-medium text-sm ${currentValue === value ? 'text-blue-700' : 'text-gray-900'}`}>
            {label}
          </div>
          {description && (
            <div className="text-xs text-gray-600 mt-0.5">
              {description}
            </div>
          )}
        </div>
      </div>
    </button>
  );

  const IconOptionCard = ({
    id,
    label,
    value,
    icon: Icon,
    currentValue,
    onClick
  }: {
    id: string;
    label: string;
    value: string;
    icon: any;
    currentValue: string;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-6 rounded-lg transition-all ${
        currentValue === value
          ? 'bg-blue-100 border-2 border-blue-600'
          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className={`w-20 h-20 rounded-lg flex items-center justify-center ${
          currentValue === value ? 'bg-white' : 'bg-white'
        }`}>
          <Icon className="w-12 h-12 text-gray-900" strokeWidth={1.5} />
        </div>
        <div className="flex items-center gap-2">
          <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${
            currentValue === value ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-600'
          }`}>
            {id}
          </span>
          <span className={`font-medium text-sm ${currentValue === value ? 'text-blue-700' : 'text-gray-900'}`}>
            {label}
          </span>
        </div>
      </div>
    </button>
  );

  return (
    <div className="px-2 py-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          {/* Step 1: What Would You Like To Compare? */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl">What Would You Like To Compare?*</h2>
              
              <div className="space-y-2">
                <OptionButton
                  id="A"
                  label="Health Insurance"
                  value="health"
                  description="(pays private medical bills)"
                  currentValue={watchedFields.compareType || ''}
                  onClick={() => setValue("compareType", "health")}
                />
                <OptionButton
                  id="B"
                  label="Business / Company Health Insurance"
                  value="business-health"
                  description="(health cover for staff)"
                  currentValue={watchedFields.compareType || ''}
                  onClick={() => setValue("compareType", "business-health")}
                />
                <OptionButton
                  id="C"
                  label="Life Insurance"
                  value="life"
                  description="(pays sum on death)"
                  currentValue={watchedFields.compareType || ''}
                  onClick={() => setValue("compareType", "life")}
                />
                <OptionButton
                  id="D"
                  label="Income Protection"
                  value="income"
                  description="(monthly payments if unable to work)"
                  currentValue={watchedFields.compareType || ''}
                  onClick={() => setValue("compareType", "income")}
                />
                <OptionButton
                  id="E"
                  label="Business Protection"
                  value="business"
                  description="(protects your business and partners)"
                  currentValue={watchedFields.compareType || ''}
                  onClick={() => setValue("compareType", "business")}
                />
                <OptionButton
                  id="F"
                  label="Business Life Insurance"
                  value="business-life"
                  description="(protects the company and it's key individuals)"
                  currentValue={watchedFields.compareType || ''}
                  onClick={() => setValue("compareType", "business-life")}
                />
              </div>

              <Button
                type="submit"
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full"
              >
                OK
              </Button>
            </div>
          )}

          {/* Step 2: Do you currently have cover in place? */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl">Do you currently have cover in place?*</h2>
              
              <div className="space-y-3 max-w-md">
                <OptionButton
                  id="A"
                  label="Yes"
                  value="yes"
                  currentValue={watchedFields.currentCover || ''}
                  onClick={() => setValue("currentCover", "yes")}
                />
                <OptionButton
                  id="B"
                  label="No"
                  value="no"
                  currentValue={watchedFields.currentCover || ''}
                  onClick={() => setValue("currentCover", "no")}
                />
              </div>

              <Button
                type="submit"
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full"
              >
                OK
              </Button>
            </div>
          )}

          {/* Step 3: How much would you like your policy to pay you? */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl mb-2">How much would you like your policy to pay you?*</h2>
                <p className="text-gray-600">Please select lump sum required below.</p>
              </div>
              
              <div className="space-y-2 max-w-2xl">
                <Select
                  value={watchedFields.lumpSum}
                  onValueChange={(value) => setValue("lumpSum", value)}
                >
                  <SelectTrigger className="border-b-2 border-t-0 border-x-0 rounded-none px-0 text-gray-400 h-12">
                    <SelectValue placeholder="Type or select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25000">£25,000</SelectItem>
                    <SelectItem value="50000">£50,000</SelectItem>
                    <SelectItem value="75000">£75,000</SelectItem>
                    <SelectItem value="100000">£100,000</SelectItem>
                    <SelectItem value="150000">£150,000</SelectItem>
                    <SelectItem value="200000">£200,000</SelectItem>
                    <SelectItem value="250000">£250,000</SelectItem>
                    <SelectItem value="300000">£300,000</SelectItem>
                    <SelectItem value="500000">£500,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full"
              >
                OK
              </Button>
            </div>
          )}

          {/* Step 4: Which type of cover would you like? */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl">Which type of cover would you like?*</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <IconOptionCard
                  id="A"
                  label="Mortgage Cover"
                  value="mortgage"
                  icon={Home}
                  currentValue={watchedFields.coverType || ''}
                  onClick={() => setValue("coverType", "mortgage")}
                />
                <IconOptionCard
                  id="B"
                  label="Family Cover"
                  value="family"
                  icon={Users}
                  currentValue={watchedFields.coverType || ''}
                  onClick={() => setValue("coverType", "family")}
                />
                <IconOptionCard
                  id="C"
                  label="Business / Employee Cover"
                  value="business"
                  icon={Briefcase}
                  currentValue={watchedFields.coverType || ''}
                  onClick={() => setValue("coverType", "business")}
                />
                <IconOptionCard
                  id="D"
                  label="Whole of Life"
                  value="whole-life"
                  icon={UserCircle}
                  currentValue={watchedFields.coverType || ''}
                  onClick={() => setValue("coverType", "whole-life")}
                />
                <IconOptionCard
                  id="E"
                  label="Over 50's Cover"
                  value="over-50"
                  icon={Heart}
                  currentValue={watchedFields.coverType || ''}
                  onClick={() => setValue("coverType", "over-50")}
                />
                <IconOptionCard
                  id="F"
                  label="Not Sure"
                  value="not-sure"
                  icon={HelpCircle}
                  currentValue={watchedFields.coverType || ''}
                  onClick={() => setValue("coverType", "not-sure")}
                />
              </div>

              <Button
                type="submit"
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full"
              >
                OK
              </Button>
            </div>
          )}

          {/* Step 5: How long would you like your policy to run? */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl mb-2">How long would you like your policy to run?*</h2>
                <p className="text-gray-600">Please select the term in number of years</p>
              </div>
              
              <div className="space-y-2 max-w-2xl">
                <Select
                  value={watchedFields.policyTerm}
                  onValueChange={(value) => setValue("policyTerm", value)}
                >
                  <SelectTrigger className="border-b-2 border-t-0 border-x-0 rounded-none px-0 text-gray-400 h-12">
                    <SelectValue placeholder="Type or select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=">5">&gt;5</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full"
              >
                OK
              </Button>
            </div>
          )}

          {/* Step 6: How many people are to be insured? */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl">How many people are to be insured?*</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
                <IconOptionCard
                  id="A"
                  label="Single"
                  value="single"
                  icon={User}
                  currentValue={watchedFields.peopleCount || ''}
                  onClick={() => setValue("peopleCount", "single")}
                />
                <IconOptionCard
                  id="B"
                  label="Joint"
                  value="joint"
                  icon={Users}
                  currentValue={watchedFields.peopleCount || ''}
                  onClick={() => setValue("peopleCount", "joint")}
                />
                <IconOptionCard
                  id="C"
                  label="Group"
                  value="group"
                  icon={Users}
                  currentValue={watchedFields.peopleCount || ''}
                  onClick={() => setValue("peopleCount", "group")}
                />
              </div>

              <Button
                type="submit"
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full"
              >
                OK
              </Button>
            </div>
          )}

          {/* Step 7: Please enter the ages of everyone to be insured */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl mb-2">Please enter the ages of everyone to be insured*</h2>
                <p className="text-gray-600">For joint/group policies please separate ages with a comma e.g 35,34</p>
              </div>
              
              <div className="space-y-2 max-w-2xl">
                <Input
                  id="ages"
                  {...register("ages", {
                    required: "Ages are required"
                  })}
                  placeholder="Type your answer here..."
                  className="border-b-2 border-t-0 border-x-0 rounded-none px-0 text-gray-400 h-12"
                />
                {errors.ages && (
                  <p className="text-sm text-red-600">{errors.ages.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full"
              >
                OK
              </Button>
            </div>
          )}

          {/* Step 8: Have you smoked or vaped in the last 5 years? */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl mb-2">Have you smoked or vaped in the last 5 years?*</h2>
                <p className="text-gray-600">You or anyone else to be insured.</p>
              </div>
              
              <div className="space-y-3 max-w-md">
                <OptionButton
                  id="A"
                  label="Yes"
                  value="yes"
                  currentValue={watchedFields.smokedVaped || ''}
                  onClick={() => setValue("smokedVaped", "yes")}
                />
                <OptionButton
                  id="B"
                  label="No"
                  value="no"
                  currentValue={watchedFields.smokedVaped || ''}
                  onClick={() => setValue("smokedVaped", "no")}
                />
              </div>

              <Button
                type="submit"
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full"
              >
                OK
              </Button>
            </div>
          )}

          {/* Step 9: Medical History */}
          {currentStep === 9 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl mb-2">Have you ever been diagnosed with or have a family history of Heart problems, Stroke, Diabetes, Cancer, Mental Health Illnesses or anything else affecting the major organs.*</h2>
                <p className="text-gray-600">You or anyone else to be insured.</p>
              </div>
              
              <div className="space-y-3 max-w-md">
                <OptionButton
                  id="A"
                  label="Yes"
                  value="yes"
                  currentValue={watchedFields.medicalHistory || ''}
                  onClick={() => setValue("medicalHistory", "yes")}
                />
                <OptionButton
                  id="B"
                  label="No"
                  value="no"
                  currentValue={watchedFields.medicalHistory || ''}
                  onClick={() => setValue("medicalHistory", "no")}
                />
              </div>

              <Button
                type="submit"
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full"
              >
                OK
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}