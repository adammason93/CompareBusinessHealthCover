import { useState, useEffect, memo } from "react";
import { Check } from "lucide-react";

const SENTENCES = [
  "The UK's Best Health Insurance Comparison",
  "Lowest Prices on the Market",
  "Switch & Save, Hassle-Free",
] as const;

/**
 * Isolated typewriter so parent LandingPage does not re-render on every keystroke
 * (which was a major source of scroll jank on the homepage).
 */
export const HeroTypewriter = memo(function HeroTypewriter() {
  const [typewriterText, setTypewriterText] = useState("");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSentence = SENTENCES[currentSentenceIndex];
    if (!currentSentence) return;

    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && typewriterText === currentSentence) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typewriterText === "") {
        setIsDeleting(false);
        setCurrentSentenceIndex((prev) => (prev + 1) % SENTENCES.length);
      } else if (isDeleting) {
        setTypewriterText(currentSentence.substring(0, typewriterText.length - 1));
      } else {
        setTypewriterText(currentSentence.substring(0, typewriterText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, currentSentenceIndex]);

  return (
    <div className="flex items-center gap-3 min-h-[28px] sm:min-h-[32px]">
      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" aria-hidden />
      <span className="text-white text-base sm:text-lg">{typewriterText}</span>
    </div>
  );
});
