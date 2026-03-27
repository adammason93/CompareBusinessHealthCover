/**
 * Header logo: shield + HealthCover / Comparison wordmark (public/logo-healthcover-comparison.png).
 */
export function BrandLogo({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  const img = (
    <img
      src="/logo-healthcover-comparison.png?v=2"
      alt="HealthCover Comparison — UK private health insurance comparison"
      className={`h-10 sm:h-11 md:h-12 w-auto max-w-[min(96vw,640px)] object-contain object-left ${className}`}
      width={1024}
      height={311}
      decoding="async"
    />
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex items-center shrink-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14aeb4] focus-visible:ring-offset-2"
        aria-label="HealthCover Comparison — Home"
      >
        {img}
      </button>
    );
  }

  return <div className="flex items-center shrink-0">{img}</div>;
}
