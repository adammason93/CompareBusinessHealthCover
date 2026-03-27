import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

export function SEOHead({
  title,
  description,
  keywords = "health insurance UK, private health insurance, medical insurance, family health cover, business health insurance, FCA regulated brokers",
  ogImage = "https://healthcovercomparison.co.uk/og-image.jpg",
  ogType = "website",
  canonical,
  noindex = false
}: SEOHeadProps) {
  useEffect(() => {
    document.documentElement.lang = 'en-GB';

    // Set page title
    document.title = `${title} | HealthCoverCompare`;

    // Set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', 'HealthCoverCompare');
    setMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph tags for social sharing
    setMetaTag('og:title', `${title} | HealthCoverCompare`, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', canonical || window.location.href, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', 'HealthCoverCompare', true);
    setMetaTag('og:locale', 'en_GB', true);

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', `${title} | HealthCoverCompare`);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // Additional SEO tags
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    setMetaTag('theme-color', '#2d2f5e');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    const canonicalUrl = canonical || window.location.href.split('?')[0].split('#')[0];
    canonicalLink.href = canonicalUrl;

    // Self-referencing hreflang must match canonical (en-GB + x-default for single-locale UK site)
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => {
      const hl = el.getAttribute('hreflang');
      if (hl === 'en-GB' || hl === 'x-default') {
        el.remove();
      }
    });
    for (const hreflang of ['en-GB', 'x-default'] as const) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }

  }, [title, description, keywords, ogImage, ogType, canonical, noindex]);

  return null;
}
