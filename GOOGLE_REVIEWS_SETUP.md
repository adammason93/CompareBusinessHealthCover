# Google Reviews Setup Guide

## Current Status
✅ Backend endpoint created: `/make-server-2031af1c/google-reviews`
✅ Frontend component updated to fetch real reviews
✅ Place ID configured: `ChIJJ0AV2EEKeUgRAdZzBt6rT10` (Rotherham, UK)
✅ Caching implemented (24 hours to save API costs)
✅ Fallback to sample reviews if API fails

## What You Need to Do

### Step 1: Get Your Google Places API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Places API"
4. Go to Credentials → Create Credentials → API Key
5. Copy your API key (starts with something like `AIza...`)

### Step 2: Secure Your API Key (Important!)
1. Click "Edit API key" in Google Cloud Console
2. Under "API restrictions":
   - Select "Restrict key"
   - Check only "Places API"
3. Under "Application restrictions":
   - Choose "HTTP referrers"
   - Add: `https://*.supabase.co/*`
4. Click "Save"

### Step 3: Add API Key to Your Environment
In your Supabase dashboard:
1. Go to Project Settings → Edge Functions
2. Add a new secret:
   - Name: `GOOGLE_PLACES_API_KEY`
   - Value: Your API key from Step 1

### Step 4: Test It!
Once the API key is added:
1. Refresh your website
2. Check the browser console (F12)
3. Look for: "Successfully fetched X Google reviews"
4. Your real reviews should now appear!

## How It Works
1. **First Load**: Fetches reviews from Google Places API
2. **Cached for 24 hours**: Subsequent visits use cached data (saves API costs)
3. **Automatic Updates**: Fresh data fetched once per day
4. **Fallback**: If API fails, shows professional sample reviews

## Cost Information
- Google gives **$200 free credit/month**
- Place Details API: ~$0.017 per request
- With 24-hour caching: Very low cost even with high traffic
- Estimated cost: $0-2/month for typical website traffic

## Troubleshooting
If reviews don't load:
1. Check browser console for errors
2. Verify API key is set correctly in Supabase
3. Make sure billing is enabled in Google Cloud
4. Check that Place ID is correct
5. Sample reviews will show automatically if there's any issue

## Your Place ID
Place ID: `ChIJJ0AV2EEKeUgRAdZzBt6rT10`
Location: Rotherham, UK

This Place ID is already configured in the backend code.
