import { MessageCircle } from 'lucide-react';
import { useSiteChat } from '@/app/context/SiteChatContext';

export type SiteChatVariant =
  | 'nav'
  | 'navCompact'
  | 'hero'
  | 'mobileMenu'
  | 'sticky'
  | 'section'
  | 'modal';

const variantClass: Record<SiteChatVariant, string> = {
  nav: 'inline-flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 text-sm font-medium shadow-md rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
  navCompact:
    'inline-flex items-center justify-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 text-sm font-medium shadow-md rounded-full whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
  hero: 'button-hover-animate inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-medium shadow-lg w-full sm:w-auto text-center',
  mobileMenu:
    'w-full inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 py-3 font-medium text-center mt-4 transition-colors',
  sticky:
    'inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-teal-700 rounded-full px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base md:text-lg font-semibold shadow-lg w-full sm:w-auto whitespace-nowrap transition-colors border-2 border-white/90',
  section:
    'inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-lg font-medium w-fit transition-colors',
  modal:
    'inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors',
};

function iconClassForVariant(v: SiteChatVariant): string {
  switch (v) {
    case 'hero':
      return 'w-5 h-5 sm:w-6 sm:h-6 shrink-0';
    case 'navCompact':
      return 'w-3.5 h-3.5 shrink-0';
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
