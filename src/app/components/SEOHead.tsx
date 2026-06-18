import { useEffect } from 'react';
import { SITE } from '@/app/config/site';

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
  keywords = 'SME health insurance UK, business health insurance, employee medical cover, compare business health cover',
  ogImage = SITE.defaultImage,
  ogType = 'website',
  canonical,
  noindex = false,
}: SEOHeadProps) {
  useEffect(() => {
    document.title = `${title} | ${SITE.name}`;

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

    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', SITE.name);
    setMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    setMetaTag('og:title', `${title} | ${SITE.name}`, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', canonical || window.location.href, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', SITE.name, true);
    setMetaTag('og:locale', 'en_GB', true);

    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', `${title} | ${SITE.name}`);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    setMetaTag('theme-color', '#2d2f5e');

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical || window.location.href.split('?')[0].split('#')[0];
  }, [title, description, keywords, ogImage, ogType, canonical, noindex]);

  return null;
}
