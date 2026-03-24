import { createClient } from 'jsr:@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

export async function handleSignup(email: string, password: string, name: string) {
  try {
    console.log('=== SIGNUP ATTEMPT ===');
    console.log('Email:', email);
    console.log('Name:', name);
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // Auto-confirm since email server not configured
    });

    if (error) {
      console.error('Signup error from Supabase:', error);
      return { error: error.message, status: 400 };
    }

    console.log('✅ User created successfully:', data.user.id);
    
    return { 
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name,
      },
      token: data.user.id, // Using user ID as token for simplicity
      status: 201 
    };
  } catch (error: any) {
    console.error('Signup exception:', error);
    return { error: error.message || 'Signup failed', status: 500 };
  }
}

export async function handleLogin(email: string, password: string) {
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

export async function verifyToken(token: string) {
  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return { error: 'Invalid token', status: 401 };
    }

    return { 
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || '',
      },
      status: 200 
    };
  } catch (error: any) {
    return { error: error.message || 'Token verification failed', status: 401 };
  }
}