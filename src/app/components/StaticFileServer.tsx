import { useEffect } from 'react';

interface StaticFileServerProps {
  fileName: string;
}

export function StaticFileServer({ fileName }: StaticFileServerProps) {
  useEffect(() => {
    // Serve the static file content based on filename
    const serveFile = async () => {
      let content = '';
      let contentType = 'text/plain';

      if (fileName === 'sitemap.xml') {
        contentType = 'application/xml';
        content = await fetch('/sitemap.xml').then(r => r.text()).catch(() => SITEMAP_CONTENT);
      } else if (fileName === 'robots.txt') {
        contentType = 'text/plain';
        content = await fetch('/robots.txt').then(r => r.text()).catch(() => ROBOTS_CONTENT);
      } else if (fileName === 'test-static.txt') {
        contentType = 'text/plain';
        content = TEST_STATIC_CONTENT;
      }

      // For preview environments, display as pre-formatted text
      // For production, the hosting platform will serve these files directly
      console.log('📄 Serving static file in preview mode:', fileName);
    };

    serveFile();
  }, [fileName]);

  // Load content based on file type
  let content = '';
  let contentType = 'text/plain';

  if (fileName === 'sitemap.xml') {
    contentType = 'application/xml';
    content = SITEMAP_CONTENT;
  } else if (fileName === 'robots.txt') {
    contentType = 'text/plain';
    content = ROBOTS_CONTENT;
  } else if (fileName === 'test-static.txt') {
    contentType = 'text/plain';
    content = TEST_STATIC_CONTENT;
  }

  return (
    <div style={{ 
      padding: 0, 
      margin: 0,
      backgroundColor: 'white',
      minHeight: '100vh',
      fontFamily: 'monospace',
      fontSize: '14px',
      lineHeight: '1.6'
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        background: '#2d2f5e',
        color: 'white',
        padding: '12px 20px',
        borderBottom: '2px solid #1f2454',
        zIndex: 1000
      }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
          📄 Static File Preview: {fileName}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '4px' }}>
          Content-Type: {contentType} | This is a preview. On production, this will be served as a real file.
        </div>
      </div>
      <pre style={{ 
        margin: 0, 
        padding: '20px',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        backgroundColor: '#f8f8f8',
        border: 'none',
        color: '#333'
      }}>
        {content}
      </pre>
    </div>
  );
}

// Sitemap content (embedded)
const SITEMAP_CONTENT = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Homepage -->
  <url>
    <loc>https://healthcovercomparison.co.uk/</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Main Pages -->
  <url>
    <loc>https://healthcovercomparison.co.uk/about-us</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/contact-us</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/nhs-waiting-times-england</loc>
    <lastmod>2026-03-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/bma-private-medical-insurance-guide</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>

  <!-- Health Insurance Pages -->
  <url>
    <loc>https://healthcovercomparison.co.uk/health-insurance-guide</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/business-health-insurance</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/family-health-insurance</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/self-employed-health-insurance</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/senior-health-insurance</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/international-health-insurance</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/corporate-health-insurance</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/small-company-health-insurance</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Additional Pages -->
  <url>
    <loc>https://healthcovercomparison.co.uk/insurance-types</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/partner-insurers</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Insurer guides -->
  <url>
    <loc>https://healthcovercomparison.co.uk/insurers</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.78</priority>
  </url>
  <url>
    <loc>https://healthcovercomparison.co.uk/insurers/axa-health</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>https://healthcovercomparison.co.uk/insurers/aviva</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>https://healthcovercomparison.co.uk/insurers/vitality</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>https://healthcovercomparison.co.uk/insurers/wpa</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>https://healthcovercomparison.co.uk/insurers/exeter</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>https://healthcovercomparison.co.uk/insurers/freedom</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  <url>
    <loc>https://healthcovercomparison.co.uk/insurers/cigna</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>

  <!-- Legal Pages -->
  <url>
    <loc>https://healthcovercomparison.co.uk/privacy-policy</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/terms-conditions</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/cookie-policy</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/disclaimer</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <url>
    <loc>https://healthcovercomparison.co.uk/sitemap</loc>
    <lastmod>2026-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>

</urlset>`;

const ROBOTS_CONTENT = `# robots.txt for HealthCoverCompare
# Updated: March 24, 2026

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://healthcovercomparison.co.uk/sitemap.xml

# Crawl delay (reduced for better indexing)
Crawl-delay: 5

# Block access to admin and API areas
Disallow: /admin-leads
Disallow: /api/
Disallow: /*.json$

# Explicitly allow sitemap and robots.txt
Allow: /sitemap.xml
Allow: /robots.txt

# Allow search engines to crawl all important pages
Allow: /
Allow: /about-us
Allow: /contact-us
Allow: /nhs-waiting-times-england
Allow: /bma-private-medical-insurance-guide
Allow: /health-insurance-guide
Allow: /business-health-insurance
Allow: /family-health-insurance
Allow: /self-employed-health-insurance
Allow: /senior-health-insurance
Allow: /international-health-insurance
Allow: /corporate-health-insurance
Allow: /small-company-health-insurance
Allow: /insurance-types
Allow: /partner-insurers
Allow: /insurers
Allow: /privacy-policy
Allow: /terms-conditions
Allow: /cookie-policy
Allow: /disclaimer
Allow: /sitemap`;

const TEST_STATIC_CONTENT = `This is a test file to verify static file serving is working correctly.
If you can read this at https://healthcovercomparison.co.uk/test-static.txt then your static files are being served properly.
Date: March 24, 2026`;
