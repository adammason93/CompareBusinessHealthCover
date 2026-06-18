# 🔍 Preview vs Production - Understanding the Difference

## Important: What You're Seeing

The screenshot you shared shows the **Figma Make preview environment** (figma.com domain). This is NOT your production website.

### Preview Environment (figma.com)
- ✅ **NOW FIXED** - Sitemap now works in preview!
- URL: `healthcovercomparison--figma--com.something.figma.com/sitemap.xml`
- Shows formatted preview with header explaining it's a preview
- Handles routing through React app
- `.htaccess` and `_redirects` files do NOT work here

### Production Environment (your domain)
- URL: `https://healthcovercomparison.co.uk/sitemap.xml`
- Serves actual XML file directly
- Uses `.htaccess`, `_redirects`, or `vercel.json` configuration
- This is what Google Search Console will access

---

## ✅ What Just Changed

I've updated your React app to handle static file requests in **both** environments:

### In Preview (Figma Make):
When you visit `/sitemap.xml` in the Figma preview:
1. React app detects the request
2. Renders a preview component with the sitemap content
3. Shows a header: "📄 Static File Preview: sitemap.xml"
4. Displays the full XML content in a readable format

### In Production (Your Domain):
When someone visits `/sitemap.xml` on your live domain:
1. Web server (Vercel/Netlify/Apache) detects the request
2. Serves the actual `/public/sitemap.xml` file directly
3. Shows raw XML (proper format for Google)
4. No React app loads at all

---

## 🧪 How to Test

### Test in Preview Environment (NOW):
1. In your Figma Make preview, navigate to `/sitemap.xml`
2. You should see a formatted preview with:
   - Header: "📄 Static File Preview: sitemap.xml"
   - Content-Type: application/xml
   - Full XML content displayed
3. This confirms the React app is working correctly

### Test in Production (After Deployment):
1. Deploy your code to your live domain
2. Open: `https://healthcovercomparison.co.uk/sitemap.xml`
3. You should see:
   - Raw XML starting with `<?xml version="1.0"`
   - NO React app elements
   - NO preview header
   - Just pure XML

---

## 📊 Quick Comparison

| Feature | Preview (Figma) | Production (Live Domain) |
|---------|----------------|-------------------------|
| **URL** | `figma.com/sitemap.xml` | `healthcovercomparison.co.uk/sitemap.xml` |
| **How served** | React component | Static file directly |
| **Shows header** | ✅ Yes (preview mode) | ❌ No (raw XML) |
| **Config files used** | None | `.htaccess` / `_redirects` / `vercel.json` |
| **Google can index** | ❌ No (preview only) | ✅ Yes (production) |
| **Purpose** | Testing & development | Live website |

---

## 🎯 What to Do Next

### Step 1: Test in Preview (NOW)
Navigate to `/sitemap.xml` in your Figma Make preview. You should now see the sitemap content with a preview header instead of "Not Found".

### Step 2: Deploy to Production
```bash
git add .
git commit -m "Fix sitemap for both preview and production"
git push
```

### Step 3: Test on Live Domain
After deployment completes (2-3 minutes):
- Open: `https://healthcovercomparison.co.uk/sitemap.xml`
- Should see raw XML (no preview header)
- This is what Google Search Console will see

### Step 4: Submit to Google Search Console
Once production test passes:
1. Go to Google Search Console
2. Navigate to: Indexing → Sitemaps
3. Enter: `sitemap.xml`
4. Click: Submit

---

## 🔧 Technical Details

### How It Works in Preview

```javascript
// In App.tsx:
if (pathname === 'sitemap.xml' || pathname === 'robots.txt') {
  return `static/${pathname}`;
}

// Renders StaticFileServer component with:
<StaticFileServer fileName="sitemap.xml" />
```

This component:
- Displays the full XML content
- Adds a visual header for clarity
- Makes it easy to see the content in preview

### How It Works in Production

```apache
# In .htaccess:
RewriteRule ^sitemap\.xml$ - [L]
```

or

```
# In _redirects:
/sitemap.xml /sitemap.xml 200
```

This configuration:
- Serves `/public/sitemap.xml` directly
- Bypasses the React app entirely
- Returns raw XML with proper Content-Type header

---

## ⚠️ Common Confusion

### "But I see the sitemap in preview, why isn't Google finding it?"

**Answer:** You're testing in the Figma Make preview environment. Google Search Console accesses your **live production domain**, not the preview.

### "The .htaccess file isn't working!"

**Answer:** `.htaccess` only works on production Apache servers (cPanel, etc.). It doesn't affect the Figma Make preview.

### "I deployed but still see 'Not Found'"

**Possible causes:**
1. Deployment not complete - wait 5 minutes
2. Browser cache - clear cache (Ctrl+Shift+R)
3. CDN cache - clear CDN if using Cloudflare
4. Wrong domain - make sure you're testing on `healthcovercomparison.co.uk`, not the Figma preview

---

## 📱 Test URLs

### Preview Environment:
- Test these URLs in your Figma Make preview window:
  - `/sitemap.xml` - Should show formatted preview
  - `/robots.txt` - Should show formatted preview
  - `/test-static.txt` - Should show formatted preview

### Production Environment:
- Test these URLs on your live domain after deployment:
  - `https://healthcovercomparison.co.uk/sitemap.xml` - Should show raw XML
  - `https://healthcovercomparison.co.uk/robots.txt` - Should show plain text
  - `https://healthcovercomparison.co.uk/test-static.txt` - Should show plain text

---

## ✅ Success Criteria

### Preview (Figma Make):
- [x] Fixed - no longer shows "Not Found"
- [x] Shows formatted preview of sitemap
- [x] Header indicates "Static File Preview"
- [x] Full XML content visible

### Production (Live Domain):
- [ ] Shows raw XML (after deployment)
- [ ] No React app elements
- [ ] Proper Content-Type: application/xml
- [ ] Google Search Console can fetch it

---

## 🚀 Summary

**Preview Environment (Figma Make):**
- ✅ Now shows sitemap content in formatted preview
- ✅ No longer shows "Not Found"
- ℹ️ This is for development/testing only

**Production Environment (Your Domain):**
- ⏳ Will serve actual XML file after deployment
- ⏳ Configuration files will handle routing
- ⏳ This is what Google Search Console will index

**Next Step:** Deploy to production and test on your live domain!

---

**Date:** March 24, 2026  
**Status:** Preview fixed ✅ | Production ready for deployment ⏳
