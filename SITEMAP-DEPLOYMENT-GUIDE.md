# Sitemap Deployment & Verification Guide

## Overview
This guide explains how to deploy the sitemap fixes and verify that `/sitemap.xml` is accessible on your live domain `https://healthcovercomparison.co.uk`.

## Problem Summary
The React app was intercepting requests to `/sitemap.xml` and showing "Not Found" instead of serving the static XML file. This prevented Google Search Console from accessing the sitemap.

## What Was Fixed

### 1. Platform Configuration Files Created/Updated
- ✅ **`/public/_redirects`** - Netlify configuration
- ✅ **`/public/.htaccess`** - Apache/cPanel configuration  
- ✅ **`/vercel.json`** - Vercel configuration
- ✅ **`/netlify.toml`** - Netlify TOML configuration

### 2. Key Changes
All configuration files now explicitly serve static files (`sitemap.xml`, `robots.txt`, `favicon.ico`) BEFORE routing requests to the React app.

## Deployment Steps

### If you're hosting on **Vercel**:
1. Commit and push all changes to your Git repository
2. Vercel will automatically deploy the changes
3. Wait 2-3 minutes for deployment to complete
4. Verify the sitemap is accessible (see Verification section below)

### If you're hosting on **Netlify**:
1. Commit and push all changes to your Git repository
2. Netlify will automatically deploy the changes
3. The `netlify.toml` and `_redirects` files will be used
4. Wait 2-3 minutes for deployment to complete
5. Verify the sitemap is accessible (see Verification section below)

### If you're hosting on **cPanel/Apache**:
1. Upload the following files via FTP or File Manager:
   - `/public/sitemap.xml` → Upload to domain root
   - `/public/robots.txt` → Upload to domain root
   - `/public/.htaccess` → Upload to domain root
2. Ensure `.htaccess` is active (mod_rewrite must be enabled)
3. Verify the sitemap is accessible (see Verification section below)

### If you're hosting on **Other Platforms**:
Make sure your hosting platform is configured to:
1. Serve static files from `/public` directory at the domain root
2. Route all other requests to `/index.html` for the React app

## Verification Steps

### Step 1: Test Sitemap Access
Open your browser and navigate to:
```
https://healthcovercomparison.co.uk/sitemap.xml
```

**Expected Result:** You should see XML content starting with:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"...
```

**If you see:** "Not Found" or any React app content, the static files are not being served correctly. Review your hosting platform configuration.

### Step 2: Test Robots.txt
```
https://healthcovercomparison.co.uk/robots.txt
```

**Expected Result:** Plain text file with robot directives.

### Step 3: Test with cURL (Advanced)
```bash
curl -I https://healthcovercomparison.co.uk/sitemap.xml
```

**Expected Headers:**
```
HTTP/2 200
content-type: application/xml
```

### Step 4: Validate Sitemap Format
Use Google's Sitemap Validator:
1. Go to: https://www.xml-sitemaps.com/validate-xml-sitemap.html
2. Enter: `https://healthcovercomparison.co.uk/sitemap.xml`
3. Click "Validate"

**Expected Result:** "Valid sitemap" with no errors.

## Submit to Google Search Console

Once you've verified the sitemap is accessible:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: `healthcovercomparison.co.uk`
3. Navigate to: **Indexing** → **Sitemaps**
4. Enter sitemap URL: `sitemap.xml` (or full URL: `https://healthcovercomparison.co.uk/sitemap.xml`)
5. Click **Submit**

**Expected Result:** "Success" message with status "Couldn't fetch" → "Success"

## Troubleshooting

### Issue: Still seeing "Not Found"

**Solution 1: Clear CDN Cache**
If using Cloudflare or another CDN:
1. Go to your CDN dashboard
2. Purge/clear the entire cache
3. Wait 5 minutes and test again

**Solution 2: Check File Locations**
Ensure files are in the correct location:
```
/public/sitemap.xml  ← Must exist here
/public/robots.txt   ← Must exist here
```

**Solution 3: Check Deployment Build**
Your hosting platform must copy `/public` files to the deployment root:
- Vercel: Automatically copies `/public` to deployment root
- Netlify: Automatically copies `/public` to deployment root
- cPanel: Must manually upload to domain root (e.g., `/public_html/`)

### Issue: Sitemap shows HTML instead of XML

This means the React app is still intercepting the request.

**Solution:** Check that your platform configuration file is being used:
- Vercel: `/vercel.json` must be in repository root
- Netlify: `/netlify.toml` OR `/public/_redirects` must exist
- Apache: `/.htaccess` must be in web root with mod_rewrite enabled

### Issue: "File not found" (404)

**Solution:** The file isn't in the correct location after build.
1. Check your build output directory
2. Ensure `/public` files are copied to deployment root
3. For cPanel: Manually upload `sitemap.xml` to `/public_html/`

## Current Sitemap URLs (37 pages)

The sitemap includes:
- Homepage
- Main pages (About Us, Contact Us)
- Health insurance guides (8 pages)
- Legal pages (Privacy Policy, Terms, Cookie Policy, Disclaimer)
- Sitemap page

All URLs use the format:
```
https://healthcovercomparison.co.uk/[page-name]
```

## Maintenance

### Updating the Sitemap
When adding new pages to your site:

1. Edit `/public/sitemap.xml`
2. Add the new URL entry:
```xml
<url>
  <loc>https://healthcovercomparison.co.uk/new-page</loc>
  <lastmod>2026-03-24</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```
3. Deploy the changes
4. Resubmit the sitemap in Google Search Console (optional - Google will automatically detect changes)

## Best Practices

1. **Update lastmod dates:** When content changes, update the `<lastmod>` date
2. **Set correct priorities:**
   - Homepage: 1.0
   - Main pages: 0.8-0.9
   - Legal pages: 0.5
   - Blog posts: 0.6-0.7
3. **Set appropriate change frequency:**
   - Homepage: daily
   - Content pages: weekly
   - Legal pages: monthly
4. **Monitor in Google Search Console:** Check for indexing errors weekly

## Google Search Console Expected Timeline

After successful submission:
- **Initial validation:** Immediate (should show "Success")
- **First crawl:** Within 24-48 hours
- **Full indexing:** 1-2 weeks
- **Ranking improvements:** 2-4 weeks

## Next Steps After Deployment

1. ✅ Verify sitemap is accessible at `/sitemap.xml`
2. ✅ Submit sitemap to Google Search Console
3. ✅ Submit sitemap to Bing Webmaster Tools (optional): `https://www.bing.com/webmasters`
4. ✅ Monitor "Coverage" report in Google Search Console for indexing status
5. ✅ Set up regular sitemap updates when adding new content

## Support

If issues persist after following this guide:
1. Check your hosting platform's documentation for SPA routing
2. Contact your hosting provider's support team
3. Verify that `/public` files are being deployed correctly

---

**Last Updated:** March 24, 2026  
**Status:** Ready for deployment ✅
