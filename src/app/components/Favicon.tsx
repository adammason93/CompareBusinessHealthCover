export const FaviconSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shield Background */}
    <path
      d="M16 2L4 8V14C4 22 10 28 16 30C22 28 28 22 28 14V8L16 2Z"
      fill="#0f766e"
      stroke="#1f2356"
      strokeWidth="1"
    />
    
    {/* Medical Cross */}
    <rect x="14" y="10" width="4" height="12" rx="0.5" fill="white" />
    <rect x="10" y="14" width="12" height="4" rx="0.5" fill="white" />
    
    {/* Small Heart accent */}
    <path
      d="M16 12C14.5 10.5 12 10.5 11 12C10 13.5 11 15 13 16.5L16 19L19 16.5C21 15 22 13.5 21 12C20 10.5 17.5 10.5 16 12Z"
      fill="#ff6b6b"
      opacity="0.3"
    />
  </svg>
);

export default FaviconSVG;
