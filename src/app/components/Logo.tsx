import { memo } from 'react';
import { SITE } from '@/app/config/site';
import { LOGO } from '@/app/config/brand';

interface LogoProps {
  className?: string;
  onClick?: () => void;
  /** Header default; footer uses lg */
  size?: 'sm' | 'md' | 'lg';
}

/** Width-led sizing with h-auto preserves the logo's natural proportions */
const sizes = {
  sm: 'w-48 h-auto max-w-full',
  md: 'w-56 sm:w-64 md:w-72 h-auto max-w-full',
  lg: 'w-64 sm:w-80 h-auto max-w-full',
} as const;

export const Logo = memo(function Logo({ className = '', onClick, size = 'md' }: LogoProps) {
  const image = (
    <img
      src={LOGO.src}
      alt={SITE.name}
      data-logo
      className={`block shrink-0 object-contain object-left ${sizes[size]} ${className}`}
      width={LOGO.width}
      height={LOGO.height}
      fetchPriority="high"
      decoding="async"
    />
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="inline-flex shrink-0 cursor-pointer" aria-label={`${SITE.name} home`}>
        {image}
      </button>
    );
  }

  return <div className="inline-flex shrink-0">{image}</div>;
});
