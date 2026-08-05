import { memo } from 'react';
import { SITE } from '@/app/config/site';
import { LOGO } from '@/app/config/brand';

interface LogoProps {
  className?: string;
  onClick?: () => void;
  /** Header default; footer uses lg */
  size?: 'sm' | 'md' | 'lg';
}

/** Height-led sizing keeps the wide logo proportional in header/footer layouts */
const sizes = {
  sm: 'h-8 w-auto max-w-[11rem]',
  md: 'h-9 sm:h-10 w-auto max-w-[12.5rem] sm:max-w-[15rem]',
  lg: 'h-12 sm:h-14 w-auto max-w-[16rem] sm:max-w-[19rem]',
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
