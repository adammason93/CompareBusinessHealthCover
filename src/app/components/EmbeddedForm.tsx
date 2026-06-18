import { MultiStepForm, FormData } from "@/app/components/MultiStepForm";

interface EmbeddedFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

export function EmbeddedForm({ onSubmit, onBack }: EmbeddedFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full aspect-square overflow-y-auto">
      <MultiStepForm onSubmit={onSubmit} onBack={onBack} />
    </div>
  );
}