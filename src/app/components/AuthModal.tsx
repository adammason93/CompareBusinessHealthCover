import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { LogIn, UserPlus, Mail, Lock, User, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { publicAnonKey } from "/utils/supabase/info";
import { supabaseEdgeUrl } from "/utils/supabase/edge";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any, token: string) => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const url = supabaseEdgeUrl(endpoint);
      
      console.log('Attempting request to:', url);
      console.log('Request body:', { 
        email: formData.email, 
        name: isLogin ? undefined : formData.name 
      });

      if (isLogin) {
        // Login
        const response = await fetch(url, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok || data.error) {
          throw new Error(data.error || 'Login failed');
        }

        onAuthSuccess(data.user, data.token);
        onClose();
      } else {
        // Sign up
        const response = await fetch(url, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
          }),
        });

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok || data.error) {
          throw new Error(data.error || 'Signup failed');
        }

        console.log('✅ Signup successful! User:', data.user);
        console.log('✅ Signup token received:', data.token ? 'YES' : 'NO');
        
        // If token is returned, automatically log in the user
        if (data.token && data.user) {
          console.log('✅ Auto-login after signup');
          onAuthSuccess(data.user, data.token);
          onClose();
        } else {
          // Fallback: Switch to login mode if no token
          alert('Account created successfully! Please log in.');
          setIsLogin(true);
          setFormData({ ...formData, name: '' });
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let errorMessage = 'An error occurred';
      
      if (err.message === 'Failed to fetch') {
        errorMessage = 'Unable to connect to server. Please check your internet connection and try again.';
      } else if (err.message.includes('Invalid login credentials')) {
        errorMessage = isLogin 
          ? 'Invalid email or password. Please check your credentials and try again, or sign up if you don\'t have an account.' 
          : err.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 bg-white">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              {isLogin ? (
                <LogIn className="w-8 h-8" />
              ) : (
                <UserPlus className="w-8 h-8" />
              )}
              <h2 className="text-2xl font-bold">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
            </div>
            <p className="text-white/90">
              {isLogin
                ? "Sign in to save and access your applications"
                : "Sign up to save your progress and get quotes"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-teal-500 rounded-xl"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 h-12 border-2 border-gray-200 focus:border-teal-500 rounded-xl"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10 h-12 border-2 border-gray-200 focus:border-teal-500 rounded-xl"
                  required
                  minLength={6}
                />
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 6 characters
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                <>
                  {isLogin ? (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Create Account
                    </>
                  )}
                </>
              )}
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}