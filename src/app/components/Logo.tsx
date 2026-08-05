import { memo } from 'react';
import { SITE } from '@/app/config/site';
import { LOGO } from '@/app/config/brand';

interface LogoProps {
  className?: string;
  onClick?: () => void;
  /** Header default; footer uses lg */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Height + aspect-ratio sizing keeps the wide logo proportional and readable.
 * Width is derived from the image ratio (897×247) — never set both axes independently.
 */
const sizes = {
  sm: 'h-10 w-auto max-w-[12rem]',
  md: 'h-12 sm:h-[3.25rem] w-auto max-w-[14rem] sm:max-w-[15rem]',
  lg: 'h-14 sm:h-16 w-auto max-w-[16rem] sm:max-w-[18rem]',
} as const;

const aspectRatio = `${LOGO.width} / ${LOGO.height}`;

export const Logo = memo(function Logo({ className = '', onClick, size = 'md' }: LogoProps) {
  const image = (
    <img
      src={LOGO.src}
      alt={SITE.name}
      data-logo
      className={`block shrink-0 object-contain object-left ${sizes[size]} ${className}`}
      style={{ aspectRatio }}
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
