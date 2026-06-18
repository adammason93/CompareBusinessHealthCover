import { BRAND } from '@/app/config/brand';

/** Shield mark from the Compare Business Healthcover logo */
export const FaviconSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M16 2L5 7.5V14.5C5 21.5 10 27 16 29.5C22 27 27 21.5 27 14.5V7.5L16 2Z"
      fill={BRAND.navy}
    />
    <path
      d="M16 2L16 29.5C22 27 27 21.5 27 14.5V7.5L16 2Z"
      fill={BRAND.teal}
    />
    <rect x="13.5" y="10" width="2.5" height="9" rx="0.4" fill="white" />
    <rect x="10.5" y="13.5" width="8" height="2.5" rx="0.4" fill="white" />
    <path
      d="M11.5 17.5C12.5 15.5 14 14.5 16 14.5C18 14.5 19.5 15.5 20.5 17.5C21.2 18.8 21 20.2 20 21.2C18.8 22.4 17.2 22.4 16 22.4C14.8 22.4 13.2 22.4 12 21.2C11 20.2 10.8 18.8 11.5 17.5Z"
      stroke="white"
      strokeWidth="1.2"
      fill="none"
    />
    <path
      d="M12.5 18.2H14.2L15.1 20.1L16 17.8L16.9 20.1L17.8 18.2H19.5"
      stroke="white"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default FaviconSVG;
