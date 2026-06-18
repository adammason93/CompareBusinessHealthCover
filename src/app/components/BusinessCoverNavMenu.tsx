import { BUSINESS_COVER_LINKS } from '@/app/config/navigation';

interface BusinessCoverNavMenuProps {
  onNavigate: (page: string) => void;
  onItemClick?: () => void;
  variant?: 'dropdown' | 'mobile';
}

export function BusinessCoverNavMenu({
  onNavigate,
  onItemClick,
  variant = 'dropdown',
}: BusinessCoverNavMenuProps) {
  const itemClass =
    variant === 'dropdown'
      ? 'hover:text-brand-teal block w-full text-left'
      : 'block w-full text-left text-gray-600 hover:text-brand-teal py-2 text-sm';

  return (
    <ul className={variant === 'dropdown' ? 'space-y-3' : 'space-y-2'}>
      {BUSINESS_COVER_LINKS.map(({ label, page }) => (
        <li key={page}>
          <button
            type="button"
            onClick={() => {
              onNavigate(page);
              onItemClick?.();
            }}
            className={itemClass}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}
