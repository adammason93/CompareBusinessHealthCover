import { Check } from "lucide-react";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function FormProgress({ currentStep, totalSteps, stepLabels }: FormProgressProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white"
                      : isCurrent
                      ? "border-blue-600 text-blue-600 bg-white"
                      : "border-gray-300 text-gray-400 bg-white"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                <span
                  className={`text-xs mt-2 text-center hidden sm:block ${
                    isCurrent ? "text-blue-600 font-medium" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-all ${
                    isCompleted ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
