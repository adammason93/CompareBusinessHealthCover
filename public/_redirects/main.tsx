# Serve static files directly
/sitemap.xml /sitemap.xml 200
/robots.txt /robots.txt 200
/favicon.ico /favicon.ico 200

# API endpoints (if any)
/api/* /api/:splat 200

# All other requests go to index.html (SPA fallback)
/* /index.html 200
