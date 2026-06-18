import { memo } from 'react';
import { SITE } from '@/app/config/site';
import { LOGO } from '@/app/config/brand';

interface LogoProps {
  className?: string;
  onClick?: () => void;
  /** Header default ~200px wide; footer can be slightly larger */
  size?: 'sm' | 'md' | 'lg';
}

const heights = {
  sm: 'h-10',
  md: 'h-12',
  lg: 'h-14',
} as const;

export const Logo = memo(function Logo({ className = '', onClick, size = 'md' }: LogoProps) {
  const image = (
    <img
      src={LOGO.src}
      alt={SITE.name}
      className={`${heights[size]} w-auto object-contain object-left ${className}`}
      width={240}
      height={56}
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
