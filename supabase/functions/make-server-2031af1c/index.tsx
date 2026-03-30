import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from 'jsr:@supabase/supabase-js@2';

// Email-enabled Hono server for HealthCoverComparison with user submissions
const app = new Hono();

// Auth helper functions
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

async function handleSignup(email: string, password: string, name: string) {
  try {
    console.log('=== SIGNUP ATTEMPT ===');
    console.log('Email:', email);
    console.log('Name:', name);
    
    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const userExists = existingUsers?.users?.some(u => u.email === email);
    
    if (userExists) {
      console.log('User already exists:', email);
      return { error: 'User already exists. Please log in instead.', status: 400 };
    }
    
    // Create user with admin API and auto-confirm email
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // Auto-confirm email since email server not configured
    });

    if (error) {
      console.error('Signup error from Supabase:', error);
      return { error: error.message, status: 400 };
    }

    console.log('✅ User created successfully:', data.user.id);
    console.log('✅ User email confirmed:', data.user.email_confirmed_at ? 'YES' : 'NO');
    
    // Now sign in the user to get a valid session token
    console.log('🔐 Signing in new user to generate session...');
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );
    
    const { data: signInData, error: signInError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('❌ Auto sign-in failed after signup:', signInError.message);
      // User created but can't auto-login - they'll need to login manually
      return { 
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.name,
        },
        token: null,
        message: 'Account created successfully! Please log in with your credentials.',
        status: 201 
      };
    }

    console.log('✅ User signed up and logged in successfully');
    
    // Return user data with access token
    return { 
      user: {
        id: signInData.user.id,
        email: signInData.user.email,
        name: signInData.user.user_metadata?.name || name,
      },
      token: signInData.session.access_token,
      status: 201 
    };
  } catch (error: any) {
    console.error('Signup exception:', error);
    return { error: error.message || 'Signup failed', status: 500 };
  }
}

async function handleLogin(email: string, password: string) {
  try {
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Email:', email);
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ Login error:', error.message);
      return { error: error.message, status: 401 };
    }

    console.log('✅ Login successful:', data.user.id);
    
    return { 
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || '',
      },
      token: data.session.access_token,
      status: 200 
    };
  } catch (error: any) {
    console.error('Login exception:', error);
    return { error: error.message || 'Login failed', status: 500 };
  }
}

async function verifyToken(token: string) {
  try {
    console.log('🔐 Verifying token...');
    console.log('Token preview:', token.substring(0, 30) + '...');
    
    // Check if this is the public anon key (not a user JWT)
    const publicAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    if (token === publicAnonKey) {
      console.log('⚠️ Token is public anon key, not a user JWT');
      return { error: 'Not a user token', status: 401 };
    }
    
    // Check if token looks like a JWT (should start with eyJ and be long)
    if (!token.startsWith('eyJ') || token.length < 100) {
      console.log('⚠️ Token does not appear to be a valid JWT');
      return { error: 'Invalid token format', status: 401 };
    }
    
    // Method 1: Try with service role key to get user from JWT
    const serviceSupabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    const { data, error } = await serviceSupabase.auth.getUser(token);

    if (error) {
      console.error('❌ Token verification failed:', error.message);
      console.error('Error details:', JSON.stringify(error));
      return { error: error.message || 'Invalid token', status: 401 };
    }
    
    if (!data.user) {
      console.error('❌ No user data returned');
      return { error: 'Invalid token', status: 401 };
    }

    console.log('✅ Token verified successfully for user:', data.user.id);
    console.log('User email:', data.user.email);
    
    return { 
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || '',
      },
      status: 200 
    };
  } catch (error: any) {
    console.error('❌ Token verification exception:', error.message);
    console.error('Exception details:', error);
    return { error: error.message || 'Token verification failed', status: 401 };
  }
}

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Blog-Admin-Secret"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-2031af1c/health", (c) => {
  return c.json({ status: "ok" });
});

// Sitemap.xml endpoint - serves XML directly
app.get("/make-server-2031af1c/sitemap.xml", (c) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
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
    <loc>https://healthcovercomparison.co.uk/blog</loc>
    <lastmod>2026-03-30</lastmod>
    <changefreq>weekly</changefreq>
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

  return c.body(sitemap, 200, {
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, max-age=3600'
  });
});

// Robots.txt endpoint
app.get("/make-server-2031af1c/robots.txt", (c) => {
  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /admin-leads
Disallow: /blog-admin
Disallow: /api/

Sitemap: https://healthcovercomparison.co.uk/sitemap.xml
`;

  return c.body(robots, 200, {
    'Content-Type': 'text/plain',
    'Cache-Control': 'public, max-age=3600'
  });
});

// Contact form endpoint
app.post("/make-server-2031af1c/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, company, message } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Prepare email content
    const emailContent = `
New Contact Form Submission from HealthCoverComparison

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company || "N/A"}

Message:
${message || "No message provided"}

---
Submitted at: ${new Date().toISOString()}
    `.trim();

    console.log("Contact form submission received:", { name, email, phone, company });

    // Send email using Resend API
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    console.log("RESEND_API_KEY exists:", !!resendApiKey);
    console.log("RESEND_API_KEY length:", resendApiKey?.length || 0);
    console.log("RESEND_API_KEY starts with 're_':", resendApiKey?.startsWith("re_"));
    console.log("RESEND_API_KEY first 10 chars:", resendApiKey?.substring(0, 10));
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      return c.json({ error: "Email service not configured", details: "API key is missing" }, 500);
    }

    if (!resendApiKey.startsWith("re_")) {
      console.error("RESEND_API_KEY does not start with 're_'");
      return c.json({ error: "Email service misconfigured", details: "API key format is invalid" }, 500);
    }

    console.log("Attempting to send email to adammason93@live.co.uk");

    // Prepare HTML email content
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #2d2f5e; border-bottom: 3px solid #0ebcc8; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>Company:</strong> ${company || "N/A"}</p>
              ${message ? `<p><strong>Message:</strong><br/>${message.replace(/\\n/g, '<br/>')}</p>` : ''}
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;"/>
              <p style="color: #666; font-size: 12px;">Submitted at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailPayload = {
      from: "HealthCoverComparison <noreply@healthcovercomparison.co.uk>",
      to: ["info@healthcovercomparison.co.uk"],
      subject: `New Contact Form Submission from ${name}`,
      html: htmlContent,
      text: emailContent,
    };

    console.log("Email payload prepared:", JSON.stringify({ ...emailPayload, html: "[HTML content]" }));

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });

    console.log("Resend API response status:", emailResponse.status);

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Failed to send email via Resend. Status:", emailResponse.status, "Error:", errorData);
      
      // Store in KV even if email fails
      const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await kv.set(submissionId, {
        name,
        email,
        phone,
        company,
        message,
        timestamp: new Date().toISOString(),
        emailError: errorData,
      });
      
      return c.json({ 
        error: "Failed to send email", 
        details: errorData,
        note: "Your submission has been saved and we'll contact you soon."
      }, 500);
    }

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully via Resend. Result:", emailResult);

    // Store submission in KV store for backup
    const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await kv.set(submissionId, {
      name,
      email,
      phone,
      company,
      message,
      timestamp: new Date().toISOString(),
    });

    return c.json({ 
      success: true, 
      message: "Contact form submitted successfully" 
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return c.json({ 
      error: "Internal server error while processing contact form" 
    }, 500);
  }
});

// Google Reviews endpoint with caching
app.get("/make-server-2031af1c/google-reviews", async (c) => {
  try {
    const PLACE_ID = "ChIJJ0AV2EEKeUgRAdZzBt6rT10";
    const CACHE_KEY = "google_reviews_cache";
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Check if we have cached reviews
    const cachedData = await kv.get(CACHE_KEY);
    if (cachedData && cachedData.timestamp) {
      const age = Date.now() - cachedData.timestamp;
      if (age < CACHE_DURATION) {
        console.log("Returning cached Google reviews");
        return c.json({ reviews: cachedData.reviews, cached: true });
      }
    }

    // Fetch fresh reviews from Google Places API
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
    if (!apiKey) {
      console.log("GOOGLE_PLACES_API_KEY not configured - skipping Google Reviews fetch");
      return c.json({ 
        reviews: [],
        rating: null,
        total_ratings: null,
        message: "API key not configured"
      }, 200);
    }

    console.log("Fetching fresh Google reviews for Place ID:", PLACE_ID);

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      console.log("Google Places API returned status:", data.status);
      // Return empty data instead of error to prevent console errors
      return c.json({ 
        reviews: [],
        rating: null,
        total_ratings: null,
        message: "API not available"
      }, 200);
    }

    const reviews = data.result?.reviews || [];
    
    // Cache the reviews
    await kv.set(CACHE_KEY, {
      reviews,
      timestamp: Date.now(),
      place_name: data.result?.name,
      rating: data.result?.rating,
      total_ratings: data.result?.user_ratings_total
    });

    console.log(`Successfully fetched ${reviews.length} Google reviews`);

    return c.json({ 
      reviews,
      place_name: data.result?.name,
      rating: data.result?.rating,
      total_ratings: data.result?.user_ratings_total,
      cached: false 
    });

  } catch (error) {
    console.log("Error fetching Google reviews - returning empty data");
    return c.json({ 
      reviews: [],
      rating: null,
      total_ratings: null,
      message: "Service temporarily unavailable"
    }, 200);
  }
});

// Signup endpoint
app.post("/make-server-2031af1c/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const result = await handleSignup(email, password, name);
    return c.json(result, result.status);
  } catch (error: any) {
    console.error("Signup route error:", error);
    return c.json({ error: error.message || "Signup failed" }, 500);
  }
});

// Login endpoint
app.post("/make-server-2031af1c/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const result = await handleLogin(email, password);
    return c.json(result, result.status);
  } catch (error: any) {
    console.error("Login route error:", error);
    return c.json({ error: error.message || "Login failed" }, 500);
  }
});

// Verify token endpoint
app.get("/make-server-2031af1c/verify", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return c.json({ error: "No token provided" }, 401);
    }

    const result = await verifyToken(token);
    return c.json(result, result.status);
  } catch (error: any) {
    console.error("Verify route error:", error);
    return c.json({ error: error.message || "Verification failed" }, 401);
  }
});

// Save form progress endpoint (protected)
app.post("/make-server-2031af1c/save-form", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const verifyResult = await verifyToken(token);
    if (verifyResult.error) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { formData } = body;

    // Save form data with user ID
    const formKey = `form_${verifyResult.user.id}`;
    await kv.set(formKey, {
      formData,
      userId: verifyResult.user.id,
      updatedAt: new Date().toISOString(),
    });

    return c.json({ success: true, message: "Form saved successfully" });
  } catch (error: any) {
    console.error("Save form error:", error);
    return c.json({ error: error.message || "Failed to save form" }, 500);
  }
});

// Get saved form endpoint (protected)
app.get("/make-server-2031af1c/get-form", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const verifyResult = await verifyToken(token);
    if (verifyResult.error) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get form data for user
    const formKey = `form_${verifyResult.user.id}`;
    const savedForm = await kv.get(formKey);

    if (!savedForm) {
      return c.json({ formData: null });
    }

    return c.json({ formData: savedForm.formData, updatedAt: savedForm.updatedAt });
  } catch (error: any) {
    console.error("Get form error:", error);
    return c.json({ error: error.message || "Failed to get form" }, 500);
  }
});

const BLOG_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function blogAdminAuthError(c: { req: { header: (n: string) => string | undefined }; json: (o: object, s?: number) => Response }) {
  const secret = Deno.env.get("BLOG_ADMIN_SECRET");
  if (!secret) {
    return c.json(
      {
        error:
          "BLOG_ADMIN_SECRET is not set. Add it under Supabase → Project Settings → Edge Functions → Secrets, then redeploy this function.",
      },
      503,
    );
  }
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const headerSecret = c.req.header("X-Blog-Admin-Secret")?.trim() ?? "";
  const auth = c.req.header("Authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  // Supabase gateway requires a valid JWT in Authorization; blog password goes in X-Blog-Admin-Secret.
  let adminToken = headerSecret;
  if (!adminToken && bearer && bearer !== anonKey) {
    adminToken = bearer;
  }
  if (!adminToken || adminToken !== secret) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  return null;
}

function slugifyTitle(title: string): string {
  const s = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "post";
}

// Public: published blog posts list
app.get("/make-server-2031af1c/blog/posts", async (c) => {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, cover_image_url, published_at, updated_at")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error) {
      console.error("blog list error:", error);
      return c.json({ error: error.message || "Failed to load posts" }, 500);
    }
    return c.json({ posts: data ?? [] });
  } catch (e: any) {
    console.error("blog list exception:", e);
    return c.json({ error: e.message || "Failed to load posts" }, 500);
  }
});

// Public: single published post by slug
app.get("/make-server-2031af1c/blog/posts/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    if (!slug || !BLOG_SLUG_RE.test(slug)) {
      return c.json({ error: "Invalid slug" }, 400);
    }
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, body, cover_image_url, published_at, updated_at")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error) {
      console.error("blog get error:", error);
      return c.json({ error: error.message || "Failed to load post" }, 500);
    }
    if (!data) {
      return c.json({ error: "Not found" }, 404);
    }
    return c.json({ post: data });
  } catch (e: any) {
    console.error("blog get exception:", e);
    return c.json({ error: e.message || "Failed to load post" }, 500);
  }
});

// Admin: all posts (drafts + published). Requires BLOG_ADMIN_SECRET.
app.get("/make-server-2031af1c/admin/blog/posts", async (c) => {
  const denied = blogAdminAuthError(c);
  if (denied) return denied;
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("admin blog list error:", error);
      return c.json({ error: error.message || "Failed to load posts" }, 500);
    }
    return c.json({ posts: data ?? [] });
  } catch (e: any) {
    console.error("admin blog list exception:", e);
    return c.json({ error: e.message || "Failed to load posts" }, 500);
  }
});

app.post("/make-server-2031af1c/admin/blog/posts", async (c) => {
  const denied = blogAdminAuthError(c);
  if (denied) return denied;
  try {
    const body = await c.req.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    if (!title) {
      return c.json({ error: "title is required" }, 400);
    }
    let slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
    if (!slug) {
      slug = slugifyTitle(title);
    }
    if (!BLOG_SLUG_RE.test(slug)) {
      return c.json(
        { error: "slug must be lowercase letters, numbers, and single hyphens (e.g. my-health-post)" },
        400,
      );
    }
    const excerpt = typeof body.excerpt === "string" ? body.excerpt : "";
    const postBody = typeof body.body === "string" ? body.body : "";
    const cover_image_url =
      typeof body.cover_image_url === "string" ? body.cover_image_url.trim().slice(0, 2048) : "";
    const published = Boolean(body.published);
    const published_at = published ? new Date().toISOString() : null;

    const { data, error } = await supabase
      .from("blog_posts")
      .insert({
        slug,
        title,
        excerpt,
        body: postBody,
        cover_image_url,
        published,
        published_at,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("admin blog insert:", error);
      if (error.code === "23505") {
        return c.json({ error: "A post with this slug already exists" }, 409);
      }
      return c.json({ error: error.message || "Failed to create post" }, 500);
    }
    return c.json({ post: data });
  } catch (e: any) {
    console.error("admin blog create exception:", e);
    return c.json({ error: e.message || "Failed to create post" }, 500);
  }
});

app.put("/make-server-2031af1c/admin/blog/posts/:id", async (c) => {
  const denied = blogAdminAuthError(c);
  if (denied) return denied;
  try {
    const id = c.req.param("id");
    if (!id) {
      return c.json({ error: "Missing id" }, 400);
    }
    const body = await c.req.json();
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (typeof body.title === "string") updates.title = body.title.trim();
    if (typeof body.excerpt === "string") updates.excerpt = body.excerpt;
    if (typeof body.body === "string") updates.body = body.body;
    if (typeof body.cover_image_url === "string") {
      updates.cover_image_url = body.cover_image_url.trim().slice(0, 2048);
    }
    if (typeof body.slug === "string") {
      const s = body.slug.trim().toLowerCase();
      if (!BLOG_SLUG_RE.test(s)) {
        return c.json({ error: "Invalid slug format" }, 400);
      }
      updates.slug = s;
    }
    if (typeof body.published === "boolean") {
      updates.published = body.published;
      if (body.published) {
        const { data: existing } = await supabase.from("blog_posts").select("published_at").eq("id", id).maybeSingle();
        updates.published_at = existing?.published_at ?? new Date().toISOString();
      } else {
        updates.published_at = null;
      }
    }

    const { data, error } = await supabase.from("blog_posts").update(updates).eq("id", id).select().single();
    if (error) {
      console.error("admin blog update:", error);
      if (error.code === "23505") {
        return c.json({ error: "Slug already in use" }, 409);
      }
      return c.json({ error: error.message || "Failed to update post" }, 500);
    }
    if (!data) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json({ post: data });
  } catch (e: any) {
    console.error("admin blog update exception:", e);
    return c.json({ error: e.message || "Failed to update post" }, 500);
  }
});

app.delete("/make-server-2031af1c/admin/blog/posts/:id", async (c) => {
  const denied = blogAdminAuthError(c);
  if (denied) return denied;
  try {
    const id = c.req.param("id");
    const { data: deleted, error } = await supabase.from("blog_posts").delete().eq("id", id).select("id").maybeSingle();
    if (error) {
      console.error("admin blog delete:", error);
      return c.json({ error: error.message || "Failed to delete" }, 500);
    }
    if (!deleted) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json({ ok: true });
  } catch (e: any) {
    console.error("admin blog delete exception:", e);
    return c.json({ error: e.message || "Failed to delete" }, 500);
  }
});

// Submit multi-step insurance form endpoint
app.post("/make-server-2031af1c/submit-form", async (c) => {
  try {
    const body = await c.req.json();
    const formData = body;

    console.log("Insurance form submission received:", formData);

    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.phone) {
      return c.json({ error: "Missing required contact details" }, 400);
    }

    // Check if user is logged in (optional)
    let userId = null;
    const authHeader = c.req.header("Authorization");
    const token = authHeader?.split(" ")[1];
    const publicAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    
    // Only verify token if it's NOT the public anon key (meaning user is logged in)
    if (token && token !== publicAnonKey && token.startsWith('eyJ') && token.length > 100) {
      console.log('🔐 User appears to be logged in, verifying token...');
      const verifyResult = await verifyToken(token);
      if (!verifyResult.error) {
        userId = verifyResult.user.id;
        console.log('✅ Form submission from authenticated user:', userId);
      } else {
        console.log('⚠️ Token verification failed, treating as anonymous submission');
      }
    } else {
      console.log('📝 Anonymous form submission (no user login)');
    }

    // Prepare email content
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #2d2f5e; border-bottom: 3px solid #0ebcc8; padding-bottom: 10px;">
              New Insurance Quote Request
            </h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <h3 style="color: #0ebcc8; margin-top: 0;">Personal Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 40%;">Name:</td>
                  <td style="padding: 8px 0;">${formData.title || ""} ${formData.firstName} ${formData.lastName || ""}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${formData.email}">${formData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px 0;"><a href="tel:${formData.phone}">${formData.phone}</a></td>
                </tr>
                ${formData.postcode ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Postcode:</td>
                  <td style="padding: 8px 0;">${formData.postcode}</td>
                </tr>
                ` : ''}
                ${formData.dateOfBirth ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Date of Birth:</td>
                  <td style="padding: 8px 0;">${formData.dateOfBirth}</td>
                </tr>
                ` : ''}
              </table>

              <h3 style="color: #0ebcc8; margin-top: 30px;">Coverage Requirements</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 40%;">Insurance Type:</td>
                  <td style="padding: 8px 0; text-transform: capitalize;">${formData.compareType?.replace('-', ' ') || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Current Cover:</td>
                  <td style="padding: 8px 0; text-transform: capitalize;">${formData.currentCover || "N/A"}</td>
                </tr>
                ${formData.lumpSum ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Lump Sum:</td>
                  <td style="padding: 8px 0;">${formData.lumpSum}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Cover Type:</td>
                  <td style="padding: 8px 0; text-transform: capitalize;">${formData.coverType?.replace('-', ' ') || "N/A"}</td>
                </tr>
                ${formData.policyTerm ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Policy Term:</td>
                  <td style="padding: 8px 0;">${formData.policyTerm}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Number of People:</td>
                  <td style="padding: 8px 0;">${formData.peopleCount || "N/A"}</td>
                </tr>
                ${formData.ages ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Ages:</td>
                  <td style="padding: 8px 0;">${formData.ages}</td>
                </tr>
                ` : ''}
              </table>

              <h3 style="color: #0ebcc8; margin-top: 30px;">Health Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 40%;">Smoker/Vaper:</td>
                  <td style="padding: 8px 0; text-transform: capitalize;">${formData.smokedVaped || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Medical History:</td>
                  <td style="padding: 8px 0; text-transform: capitalize;">${formData.medicalHistory || "N/A"}</td>
                </tr>
              </table>

              ${formData.preferredContactMethod || formData.preferredContactDate || formData.preferredContactTime ? `
              <h3 style="color: #0ebcc8; margin-top: 30px;">Contact Preferences</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${formData.preferredContactMethod ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 40%;">Preferred Method:</td>
                  <td style="padding: 8px 0; text-transform: capitalize;">${formData.preferredContactMethod}</td>
                </tr>
                ` : ''}
                ${formData.preferredContactDate ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Preferred Date:</td>
                  <td style="padding: 8px 0;">${formData.preferredContactDate}</td>
                </tr>
                ` : ''}
                ${formData.preferredContactTime ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Preferred Time:</td>
                  <td style="padding: 8px 0; text-transform: capitalize;">${formData.preferredContactTime}</td>
                </tr>
                ` : ''}
              </table>
              ` : ''}

              <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;"/>
              <p style="color: #666; font-size: 12px;">Submitted at: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
New Insurance Quote Request from HealthCoverComparison

PERSONAL DETAILS
Name: ${formData.title || ""} ${formData.firstName} ${formData.lastName || ""}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.postcode ? `Postcode: ${formData.postcode}` : ''}
${formData.dateOfBirth ? `Date of Birth: ${formData.dateOfBirth}` : ''}

COVERAGE REQUIREMENTS
Insurance Type: ${formData.compareType?.replace('-', ' ') || "N/A"}
Current Cover: ${formData.currentCover || "N/A"}
${formData.lumpSum ? `Lump Sum: ${formData.lumpSum}` : ''}
Cover Type: ${formData.coverType?.replace('-', ' ') || "N/A"}
${formData.policyTerm ? `Policy Term: ${formData.policyTerm}` : ''}
Number of People: ${formData.peopleCount || "N/A"}
${formData.ages ? `Ages: ${formData.ages}` : ''}

HEALTH INFORMATION
Smoker/Vaper: ${formData.smokedVaped || "N/A"}
Medical History: ${formData.medicalHistory || "N/A"}

${formData.preferredContactMethod || formData.preferredContactDate || formData.preferredContactTime ? `
CONTACT PREFERENCES
${formData.preferredContactMethod ? `Preferred Method: ${formData.preferredContactMethod}` : ''}
${formData.preferredContactDate ? `Preferred Date: ${formData.preferredContactDate}` : ''}
${formData.preferredContactTime ? `Preferred Time: ${formData.preferredContactTime}` : ''}
` : ''}

---
Submitted at: ${new Date().toISOString()}
    `.trim();

    // Send email using Resend API
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      // Store form data anyway
      const submissionId = `form_submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await kv.set(submissionId, {
        ...formData,
        timestamp: new Date().toISOString(),
        emailError: "API key not configured"
      });
      return c.json({ 
        error: "Email service not configured",
        note: "Your submission has been saved and we'll contact you soon."
      }, 500);
    }

    console.log("Attempting to send insurance form email to info@healthcovercomparison.co.uk and matt@myhealthpal.co.uk");

    const emailPayload = {
      from: "HealthCoverComparison <noreply@healthcovercomparison.co.uk>",
      to: ["info@healthcovercomparison.co.uk", "matt@myhealthpal.co.uk"],
      subject: `New Insurance Quote Request from ${formData.firstName} ${formData.lastName || ""}`,
      html: htmlContent,
      text: textContent,
    };

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });

    console.log("Resend API response status:", emailResponse.status);

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Failed to send email via Resend. Status:", emailResponse.status, "Error:", errorData);
      
      // Store in KV even if email fails
      const submissionId = `form_submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await kv.set(submissionId, {
        ...formData,
        timestamp: new Date().toISOString(),
        emailError: errorData,
      });
      
      return c.json({ 
        error: "Failed to send email", 
        details: errorData,
        note: "Your submission has been saved and we'll contact you soon."
      }, 500);
    }

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully via Resend. Result:", emailResult);

    // Generate submission ID
    const submissionId = `form_submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Wait 1000ms (1 second) to avoid Resend rate limit (2 requests per second max)
    console.log("⏳ Waiting 1 second before sending customer confirmation email to avoid rate limit...");
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Send confirmation email to customer
    console.log("Attempting to send confirmation email to customer:", formData.email);
    
    const customerHtmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #2d2f5e; border-bottom: 3px solid #0ebcc8; padding-bottom: 10px;">
              Thank You for Your Insurance Quote Request
            </h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p>Dear ${formData.firstName},</p>
              
              <p>Thank you for requesting a quote from <strong>HealthCoverComparison</strong>. We have received your information and our team will review your requirements.</p>
              
              <p>One of our insurance specialists will contact you shortly at <strong>${formData.phone}</strong> or via email at <strong>${formData.email}</strong> to discuss your options and provide you with a personalized quote.</p>
              
              <div style="background-color: #f0f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #0ebcc8; margin-top: 0; font-size: 16px;">Your Request Summary:</h3>
                <p style="margin: 5px 0;"><strong>Insurance Type:</strong> ${formData.compareType?.replace('-', ' ') || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Cover Type:</strong> ${formData.coverType?.replace('-', ' ') || "N/A"}</p>
                <p style="margin: 5px 0;"><strong>Number of People:</strong> ${formData.peopleCount || "N/A"}</p>
              </div>
              
              <p>If you have any immediate questions, please don't hesitate to contact us:</p>
              <p style="margin: 5px 0;">📧 Email: <a href="mailto:info@healthcovercomparison.co.uk">info@healthcovercomparison.co.uk</a></p>
              <p style="margin: 5px 0;">📞 Phone: 01484 773038</p>
              
              <p style="margin-top: 20px;">Best regards,<br/>
              <strong>The HealthCoverComparison Team</strong></p>
            </div>
            
            <p style="color: #666; font-size: 11px; text-align: center; margin-top: 20px;">
              This is an automated confirmation email. Please do not reply to this email.
            </p>
          </div>
        </body>
      </html>
    `;

    const customerEmailPayload = {
      from: "HealthCoverComparison <noreply@healthcovercomparison.co.uk>",
      to: [formData.email],
      subject: "Thank You for Your Insurance Quote Request",
      html: customerHtmlContent,
    };

    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(customerEmailPayload),
    });

    if (customerEmailResponse.ok) {
      const customerResult = await customerEmailResponse.json();
      console.log("Customer confirmation email sent successfully:", customerResult);
    } else {
      const customerError = await customerEmailResponse.text();
      console.error("Failed to send customer confirmation email:", customerError);
      // Don't fail the whole request if customer email fails
    }

    // Store submission in KV store for backup
    await kv.set(submissionId, {
      submissionId, // Include the ID in the stored data!
      ...formData,
      timestamp: new Date().toISOString(),
      emailSent: true,
    });

    // If user is logged in, also store with user reference
    if (userId) {
      const userSubmissionKey = `user_submission_${userId}_${submissionId}`;
      await kv.set(userSubmissionKey, {
        submissionId,
        ...formData,
        timestamp: new Date().toISOString(),
        emailSent: true,
      });
    }

    return c.json({ 
      success: true, 
      message: "Your insurance quote request has been submitted successfully. We'll be in touch soon!" 
    });
  } catch (error) {
    console.error("Error processing insurance form submission:", error);
    return c.json({ 
      error: "Internal server error while processing your request" 
    }, 500);
  }
});

// Get user submissions endpoint (protected)
app.get("/make-server-2031af1c/get-user-submissions", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const verifyResult = await verifyToken(token);
    if (verifyResult.error) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get all submissions for this user
    const prefix = `user_submission_${verifyResult.user.id}_`;
    const records = await kv.getByPrefix(prefix);

    // Extract values and sort by timestamp (newest first)
    const submissions = records.map((r: any) => r.value);
    const sortedSubmissions = submissions.sort((a: any, b: any) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return c.json({ submissions: sortedSubmissions });
  } catch (error: any) {
    console.error("Get user submissions error:", error);
    return c.json({ error: error.message || "Failed to get submissions" }, 500);
  }
});

// Alias route for user submissions (same as above)
app.get("/make-server-2031af1c/user-submissions", async (c) => {
  try {
    console.log('🔍 User submissions endpoint called');
    
    const authHeader = c.req.header("Authorization");
    console.log('Auth header present:', !!authHeader);
    
    const token = authHeader?.split(" ")[1];
    console.log('Token extracted:', token ? `${token.substring(0, 20)}...` : 'null');

    if (!token) {
      console.error('❌ No token provided');
      return c.json({ error: "Unauthorized" }, 401);
    }

    console.log('Verifying token...');
    const verifyResult = await verifyToken(token);
    console.log('Verify result:', verifyResult);
    
    if (verifyResult.error) {
      console.error('❌ Token verification failed:', verifyResult.error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    console.log('✅ Token verified for user:', verifyResult.user.id);

    // Get all submissions for this user
    const prefix = `user_submission_${verifyResult.user.id}_`;
    console.log('Searching for submissions with prefix:', prefix);
    
    const records = await kv.getByPrefix(prefix);
    console.log('Found submission records:', records.length);

    // Transform submissions to include id and created_at
    const transformedSubmissions = records.map((record: any) => {
      const sub = record.value;
      return {
        id: sub.submissionId || record.key,
        data: sub,
        created_at: sub.timestamp || new Date().toISOString(),
      };
    });

    // Sort by timestamp (newest first)
    const sortedSubmissions = transformedSubmissions.sort((a: any, b: any) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    console.log('✅ Returning submissions:', sortedSubmissions.length);

    return c.json({ submissions: sortedSubmissions });
  } catch (error: any) {
    console.error('❌ Get user submissions error:', error);
    return c.json({ error: error.message || "Failed to get submissions" }, 500);
  }
});

// Admin endpoint to get all leads (no authentication required since we use password in frontend)
app.get("/make-server-2031af1c/admin/leads", async (c) => {
  try {
    console.log('🔍 Admin leads endpoint called');
    
    // Get all form submissions with their keys
    const allRecords = await kv.getByPrefix('form_submission_');
    console.log('Found submission records:', allRecords.length);
    
    // Use a Set to track unique submission IDs to prevent duplicates
    const seenSubmissionIds = new Set();
    const uniqueRecords: any[] = [];
    
    // Filter out duplicates based on submission ID or timestamp+email combo
    for (const record of allRecords) {
      const submission = record.value || record;
      const key = record.key || `form_submission_${submission.submissionId || Date.now()}`;
      
      // Create a unique identifier for deduplication
      const uniqueId = submission.submissionId || `${submission.email}_${submission.timestamp}`;
      
      if (!seenSubmissionIds.has(uniqueId)) {
        seenSubmissionIds.add(uniqueId);
        uniqueRecords.push(record);
      } else {
        console.log('🚫 Skipping duplicate submission:', uniqueId);
      }
    }
    
    console.log('Unique records after deduplication:', uniqueRecords.length);
    
    // Transform submissions into lead format
    const leads = uniqueRecords.map((record: any) => {
      // Handle both old format (record is the value) and new format (record is {key, value})
      const submission = record.value || record;
      const key = record.key || `form_submission_${submission.submissionId || Date.now()}`;
      
      console.log('Processing record - has value:', !!record.value, 'has key:', !!record.key);
      
      return {
        id: key, // Use the actual KV key as the ID!
        submissionId: submission.submissionId || key,
        companyName: submission.companyName || '',
        leadDate: submission.timestamp || new Date().toISOString(),
        firstName: submission.firstName || '',
        lastName: submission.lastName || '',
        email: submission.email || '',
        phone: submission.phone || '',
        coverType: submission.coverType || '',
        compareType: submission.compareType || '',
        peopleCount: submission.peopleCount || '',
        isInsured: submission.isInsured || 'pending',
        source: submission.source || '',
        premiumValue: submission.premiumValue || '',
        commissionPaid: submission.commissionPaid || '',
        policyStartDate: submission.policyStartDate || '',
        insurer: submission.insurer || '',
        comments: submission.comments || '',
      };
    });
    
    // Sort by lead date (newest first)
    leads.sort((a: any, b: any) => {
      return new Date(b.leadDate).getTime() - new Date(a.leadDate).getTime();
    });
    
    console.log('✅ Returning leads:', leads.length);
    return c.json({ leads });
  } catch (error: any) {
    console.error('❌ Admin leads error:', error);
    return c.json({ error: error.message || "Failed to fetch leads" }, 500);
  }
});

// Admin endpoint to update a lead
app.put("/make-server-2031af1c/admin/leads/:id", async (c) => {
  try {
    const leadId = c.req.param('id');
    const updates = await c.req.json();
    
    console.log('📝 Updating lead:', leadId);
    console.log('Updates:', JSON.stringify(updates));
    
    // The leadId IS the KV key (we're using the actual key as ID now)
    const existingData = await kv.get(leadId);
    
    if (!existingData) {
      console.error('❌ Lead not found with key:', leadId);
      return c.json({ error: "Lead not found" }, 404);
    }
    
    console.log('Found existing data:', JSON.stringify(existingData));
    
    // Update the submission with new fields
    const updatedSubmission = {
      ...existingData,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    console.log('Saving updated data:', JSON.stringify(updatedSubmission));
    
    // Save the updated submission using the same key
    await kv.set(leadId, updatedSubmission);
    
    console.log('✅ Lead updated successfully');
    return c.json({ success: true, lead: updatedSubmission });
  } catch (error: any) {
    console.error('❌ Update lead error:', error);
    console.error('Error stack:', error.stack);
    return c.json({ error: error.message || "Failed to update lead" }, 500);
  }
});

Deno.serve(app.fetch);