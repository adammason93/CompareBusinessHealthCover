import { useState, useEffect, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Calendar as CalendarComponent } from "@/app/components/ui/calendar";
import { format } from "date-fns";
import {
  Users, UserCircle, Check, Save, Clock, Edit2,
  AlertCircle, CheckCircle2, Calendar, Phone, Mail, Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SITE, telHref } from "@/app/config/site";

export interface FormData {
  compareType: string;
  currentCover: string;
  peopleCount: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  preferredContactDate?: string;
  preferredContactTime?: string;
  preferredContactMethod?: string;
  consentToContact?: boolean;
}

interface QuoteFormProps {
  onSubmit: (data: FormData) => void | Promise<void>;
  onBack: () => void;
  isSubmitting?: boolean;
  submitError?: string | null;
  /** Tighter layout when the form sits on a landing page rather than in the modal. */
  variant?: "modal" | "embedded";
  onNavigate?: (page: string) => void;
  /** Prefill the company name (personalised outreach pages). */
  initialCompanyName?: string;
}

const TITLE_LABELS: Record<string, string> = {
  mr: "Mr",
  mrs: "Mrs",
  miss: "Miss",
  ms: "Ms",
  dr: "Dr",
};

function formatTitle(title?: string) {
  if (!title) return title;
  return TITLE_LABELS[title.toLowerCase()] ?? title;
}

function readFormDraft(): Partial<FormData> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("businessHealthFormDraft");
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

const steps = [
  { number: 1, label: "Current", icon: CheckCircle2, time: 15 },
  { number: 2, label: "People", icon: Users, time: 15 },
  { number: 3, label: "Details", icon: UserCircle, time: 60 },
  { number: 4, label: "Review", icon: Check, time: 20 },
];

export function QuoteForm({
  onSubmit,
  onBack,
  isSubmitting = false,
  submitError = null,
  variant = "modal",
  onNavigate,
  initialCompanyName,
}: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [savedDraft, setSavedDraft] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [peopleCountMode, setPeopleCountMode] = useState<"preset" | "custom">("preset");
  const [customPeopleCount, setCustomPeopleCount] = useState("");

  const { watch, setValue } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      ...readFormDraft(),
      ...(initialCompanyName ? { companyName: initialCompanyName } : {}),
      compareType: "sme-health",
    },
  });

  const watchedFields = watch();

  useEffect(() => {
    const count = watchedFields.peopleCount;
    if (count && !["2", "3", "4+"].includes(count)) {
      const asNumber = Number(count);
      if (Number.isFinite(asNumber) && asNumber >= 2) {
        setPeopleCountMode("custom");
        setCustomPeopleCount(String(asNumber));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && currentStep > 1) {
        localStorage.setItem("businessHealthFormDraft", JSON.stringify(watchedFields));
        setSavedDraft(true);
        setTimeout(() => setSavedDraft(false), 2000);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [watchedFields, currentStep]);

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
  const estimatedTimeRemaining = steps
    .slice(currentStep - 1)
    .reduce((acc, step) => acc + step.time, 0);

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!watchedFields.currentCover;
      case 2:
        return !!watchedFields.peopleCount && watchedFields.peopleCount !== "1";
      case 3:
        return !!(
          watchedFields.companyName?.trim() &&
          watchedFields.firstName?.trim() &&
          watchedFields.email?.trim() &&
          watchedFields.phone?.trim()
        );
      case 4:
        return !!watchedFields.consentToContact;
      default:
        return false;
    }
  };

  const goToStep = (step: number) => {
    if (step <= currentStep || completedSteps.includes(step - 1)) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (!isStepValid()) return;
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (currentStep < steps.length) {
      nextStep();
      return;
    }
    if (!isStepValid() || isSubmitting) return;
    if (typeof window !== "undefined") {
      localStorage.setItem("businessHealthFormDraft", JSON.stringify(watchedFields));
    }
    void onSubmit({
      ...watchedFields,
      compareType: "sme-health",
      title: formatTitle(watchedFields.title),
    });
  };

  const OptionButton = ({
    label,
    value,
    currentValue,
    onClick,
    icon: Icon,
  }: {
    label: string;
    value: string;
    currentValue: string;
    onClick: () => void;
    icon?: typeof CheckCircle2;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all shadow-sm ${
        currentValue === value
          ? "bg-gradient-to-r from-brand-teal-muted to-brand-surface border-2 border-brand-teal shadow-md"
          : "bg-white border-2 border-gray-200 hover:border-brand-teal/40 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-3">
        {Icon ? (
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              currentValue === value ? "bg-brand-teal text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
        ) : null}
        <div className={`text-sm sm:text-base font-semibold ${currentValue === value ? "text-brand-teal-hover" : "text-gray-900"}`}>
          {label}
        </div>
      </div>
    </button>
  );

  const minutes = Math.floor(estimatedTimeRemaining / 60);
  const seconds = estimatedTimeRemaining % 60;
  const isEmbedded = variant === "embedded";

  return (
    <div className={isEmbedded ? "bg-white py-1 px-1" : "bg-gradient-to-br from-gray-50 via-brand-surface to-brand-teal-muted py-2 sm:py-4 px-3 sm:px-6 pt-10 sm:pt-4"}>
      <div className={isEmbedded ? "w-full" : "max-w-[95%] mx-auto"}>
        <div className={`bg-white ${isEmbedded ? "rounded-lg border border-gray-200 p-3 sm:p-4 mb-3" : "rounded-xl shadow-lg p-3 sm:p-4 mb-2 sm:mb-3"}`}>
          <div className="flex justify-between items-center mb-2 gap-3">
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              Step {currentStep} of {steps.length}
            </span>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600">
              <Clock className="w-3 h-3" />
              <span>~{minutes}:{seconds.toString().padStart(2, "0")} remaining</span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-brand-teal rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] sm:text-xs text-gray-500">
              {completedSteps.length} of {steps.length} complete
            </p>
            <a
              href={telHref()}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-navy hover:text-brand-teal shrink-0"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden />
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        <AnimatePresence>
          {savedDraft ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg mb-3"
            >
              <Save className="w-4 h-4" />
              <span>Progress saved automatically</span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <form onSubmit={handleFormSubmit}>
          <div className={isEmbedded ? "space-y-4" : "bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 space-y-4"}>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Do you currently have cover in place?</h2>
                  <p className="text-sm text-gray-600">This helps the broker know if you are starting a new scheme or reviewing an existing one.</p>
                </div>
                <div className="space-y-3">
                  <OptionButton
                    label="Yes, I have existing cover"
                    value="yes"
                    currentValue={watchedFields.currentCover || ""}
                    onClick={() => setValue("currentCover", "yes")}
                    icon={CheckCircle2}
                  />
                  <OptionButton
                    label="No, I'm looking for new cover"
                    value="no"
                    currentValue={watchedFields.currentCover || ""}
                    onClick={() => setValue("currentCover", "no")}
                    icon={AlertCircle}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">How many people need cover?</h2>
                  <p className="text-sm text-gray-600">Group schemes typically start at two employees.</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["2", "3", "4+"].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => {
                        setPeopleCountMode("preset");
                        setCustomPeopleCount("");
                        setValue("peopleCount", count);
                      }}
                      className={`p-4 rounded-xl shadow-sm ${
                        peopleCountMode === "preset" && watchedFields.peopleCount === count
                          ? "bg-brand-teal-muted border-2 border-brand-teal"
                          : "bg-white border-2 border-gray-200 hover:border-brand-teal/40"
                      }`}
                    >
                      <div className="text-2xl font-bold text-brand-teal-hover">{count}</div>
                      <div className="text-xs text-gray-600">People</div>
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="custom-people-count">
                    Or enter a number (2 or more)
                  </label>
                  <Input
                    id="custom-people-count"
                    type="number"
                    inputMode="numeric"
                    min={2}
                    max={99}
                    placeholder="e.g. 12"
                    value={peopleCountMode === "custom" ? customPeopleCount : ""}
                    onFocus={() => setPeopleCountMode("custom")}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^\d]/g, "").slice(0, 2);
                      setPeopleCountMode("custom");
                      setCustomPeopleCount(raw);
                      const asNumber = Number(raw);
                      setValue("peopleCount", asNumber >= 2 ? raw : "");
                    }}
                    className="h-12 text-lg border-2 rounded-xl text-center"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Your details</h2>
                  <p className="text-sm text-gray-600">We'll pass these to an FCA-regulated broker partner so they can contact you with quotes.</p>
                </div>
                <Input
                  type="text"
                  placeholder="Company name *"
                  value={watchedFields.companyName || ""}
                  onChange={(e) => setValue("companyName", e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                  autoComplete="organization"
                />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <Select value={watchedFields.title} onValueChange={(value) => setValue("title", value)}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 rounded-xl">
                      <SelectValue placeholder="Title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                      <SelectItem value="Miss">Miss</SelectItem>
                      <SelectItem value="Ms">Ms</SelectItem>
                      <SelectItem value="Dr">Dr</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="md:col-span-3">
                    <Input
                      type="text"
                      placeholder="First name *"
                      value={watchedFields.firstName || ""}
                      onChange={(e) => setValue("firstName", e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                      autoComplete="given-name"
                    />
                  </div>
                </div>
                <Input
                  type="text"
                  placeholder="Last name"
                  value={watchedFields.lastName || ""}
                  onChange={(e) => setValue("lastName", e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                  autoComplete="family-name"
                />
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="Email address *"
                    value={watchedFields.email || ""}
                    onChange={(e) => setValue("email", e.target.value)}
                    className="h-12 pl-10 border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                    autoComplete="email"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="tel"
                    placeholder="Phone number *"
                    value={watchedFields.phone || ""}
                    onChange={(e) => setValue("phone", e.target.value)}
                    className="h-12 pl-10 border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                    autoComplete="tel"
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Postcode"
                  value={watchedFields.postcode || ""}
                  onChange={(e) => setValue("postcode", e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-brand-teal rounded-xl"
                  autoComplete="postal-code"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Preferred contact method (optional)</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "phone", label: "Phone" },
                      { value: "email", label: "Email" },
                      { value: "either", label: "Either" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setValue("preferredContactMethod", option.value)}
                        className={`px-3 py-2 rounded-xl text-sm font-medium border-2 ${
                          watchedFields.preferredContactMethod === option.value
                            ? "border-brand-teal bg-brand-teal-muted text-brand-navy"
                            : "border-gray-200 text-gray-700 hover:border-brand-teal/40"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Preferred date (optional)</p>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="h-12 w-full border-2 border-gray-200 rounded-xl px-3 text-left text-sm flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {watchedFields.preferredContactDate
                            ? watchedFields.preferredContactDate
                            : "Choose a date"}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={watchedFields.preferredContactDate ? new Date(watchedFields.preferredContactDate) : undefined}
                          onSelect={(date) => {
                            if (date) setValue("preferredContactDate", format(date, "yyyy-MM-dd"));
                            setCalendarOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Preferred time (optional)</p>
                    <Select
                      value={watchedFields.preferredContactTime}
                      onValueChange={(value) => setValue("preferredContactTime", value)}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 rounded-xl">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Review your enquiry</h2>
                  <p className="text-sm text-gray-600">Check the details, then send your enquiry. There is no obligation to buy.</p>
                </div>
                <div className="rounded-xl border border-gray-200 divide-y text-sm">
                  {[
                    ["Company", watchedFields.companyName],
                    ["Name", [watchedFields.title, watchedFields.firstName, watchedFields.lastName].filter(Boolean).join(" ")],
                    ["Email", watchedFields.email],
                    ["Phone", watchedFields.phone],
                    ["Postcode", watchedFields.postcode],
                    ["People to cover", watchedFields.peopleCount],
                    ["Existing cover", watchedFields.currentCover === "yes" ? "Yes" : watchedFields.currentCover === "no" ? "No" : ""],
                    ["Preferred contact", [watchedFields.preferredContactMethod, watchedFields.preferredContactDate, watchedFields.preferredContactTime].filter(Boolean).join(" · ")],
                  ]
                    .filter(([, value]) => value)
                    .map(([label, value]) => (
                      <div key={String(label)} className="flex justify-between gap-3 px-4 py-2">
                        <span className="text-gray-600">{label}</span>
                        <span className="font-medium text-gray-900 text-right">{value}</span>
                      </div>
                    ))}
                </div>
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="inline-flex items-center gap-2 text-sm text-brand-navy font-medium hover:underline"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit details
                </button>
                <label className="flex items-start gap-3 cursor-pointer bg-white border-2 border-gray-200 rounded-xl p-4">
                  <input
                    type="checkbox"
                    checked={!!watchedFields.consentToContact}
                    onChange={(e) => setValue("consentToContact", e.target.checked)}
                    className="mt-1 w-5 h-5 text-brand-teal border-gray-300 rounded focus:ring-2 focus:ring-brand-teal"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I agree to be contacted by Compare Business Healthcover and its FCA-regulated broker partners about this enquiry. See our{" "}
                    {onNavigate ? (
                      <button
                        type="button"
                        className="text-brand-navy font-medium underline"
                        onClick={() => onNavigate("privacy-policy")}
                      >
                        privacy policy
                      </button>
                    ) : (
                      <a href="/privacy-policy/" className="text-brand-navy font-medium underline">
                        privacy policy
                      </a>
                    )}
                    .
                  </span>
                </label>
              </div>
            )}

            {currentStep === steps.length && submitError ? (
              <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{submitError}</p>
              </div>
            ) : null}

            <div className="flex justify-between gap-3 pt-2">
              {!(isEmbedded && currentStep === 1) ? (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isSubmitting}
                className="px-5 py-3 rounded-xl"
              >
                Back
              </Button>
              ) : <span />}
              <Button
                type="submit"
                disabled={!isStepValid() || isSubmitting}
                className="px-8 py-3 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-xl shadow-lg disabled:opacity-50"
              >
                {currentStep === steps.length ? (
                  isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit enquiry"
                  )
                ) : (
                  <>
                    Continue
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
