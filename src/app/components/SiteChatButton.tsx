import { MessageCircle } from 'lucide-react';
import { useSiteChat } from '@/app/context/SiteChatContext';

export type SiteChatVariant = 'sticky' | 'section' | 'modal';

const variantClass: Record<SiteChatVariant, string> = {
  sticky:
    'inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-teal-700 rounded-full px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base md:text-lg font-semibold shadow-lg w-full sm:w-auto whitespace-nowrap transition-colors border-2 border-white/90',
  section:
    'inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-lg font-medium w-fit transition-colors',
  modal:
    'inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors',
};

function iconClassForVariant(v: SiteChatVariant): string {
  switch (v) {
    case 'section':
      return 'w-6 h-6 shrink-0';
    case 'modal':
      return 'w-4 h-4 shrink-0';
    case 'sticky':
      return 'w-4 h-4 sm:w-5 sm:h-5 shrink-0';
    default:
      return 'w-4 h-4 sm:w-5 sm:h-5 shrink-0';
  }
}

export function SiteChatButton({
  variant,
  className = '',
  onAfterClick,
}: {
  variant: SiteChatVariant;
  className?: string;
  onAfterClick?: () => void;
}) {
  const { openChat } = useSiteChat();

  return (
    <button
      type="button"
      className={`${variantClass[variant]} ${className}`}
      onClick={() => {
        onAfterClick?.();
        openChat();
      }}
    >
      <MessageCircle className={iconClassForVariant(variant)} aria-hidden />
      Chat to us
    </button>
  );
}
