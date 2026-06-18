import { memo } from 'react';
import { SITE } from '@/app/config/site';
import { LOGO } from '@/app/config/brand';

interface LogoProps {
  className?: string;
  onClick?: () => void;
  /** Header default; footer uses lg */
  size?: 'sm' | 'md' | 'lg';
}

const widths = {
  sm: 'w-48 max-w-none',
  md: 'w-52 sm:w-64 max-w-none',
  lg: 'w-64 sm:w-80 max-w-none',
} as const;

export const Logo = memo(function Logo({ className = '', onClick, size = 'md' }: LogoProps) {
  const image = (
    <img
      src={LOGO.src}
      alt={SITE.name}
      className={`${widths[size]} h-auto object-contain object-left ${className}`}
      width={320}
      height={107}
      fetchPriority="high"
    />
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="shrink-0 cursor-pointer" aria-label={`${SITE.name} home`}>
        {image}
      </button>
    );
  }

  return <div className="shrink-0">{image}</div>;
});
