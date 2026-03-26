/** Hero image used above the fold on the home page — referenced from index.html via Vite `injectLcpHints` */
export const LCP_HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1767082090422-2e5aeeba2afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBwYXJlbnRzJTIwY2hpbGRyZW4lMjBvdXRkb29yJTIwaGFwcHklMjBoZWFsdGh5fGVufDF8fHx8MTc3MTU5NjQxMXww&ixlib=rb-4.1.0&q=70&w=600"

/**
 * Poppins latin .woff2 (subset most UK text uses). Update if Google changes filenames.
 * Preloads shorten the CSS → font chain; browser may still reuse these when CSS loads.
 */
export const POPPINS_LATIN_WOFF2 = {
  w400: "https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2",
  w700: "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2",
} as const
