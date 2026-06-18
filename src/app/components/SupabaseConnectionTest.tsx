import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react';

export function SupabaseConnectionTest() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runTests = async () => {
    setTesting(true);
    const testResults: any = {
      health: { status: 'pending', message: '' },
      auth: { status: 'pending', message: '' },
      timestamp: new Date().toISOString(),
    };

    try {
      // Test 1: Health Check (requires Supabase auth)
      console.log('Testing health endpoint...');
      const healthUrl = 'https://bjylempevckvbpzpiicx.supabase.co/functions/v1/make-server-2031af1c/health';
      const authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqeWxlbXBldmNrdmJwenBpaWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI1ODgsImV4cCI6MjA4NDQ3ODU4OH0.QNgiklDhLOSD_cCCKvKg8CLgatgldvoT4pn3oRYH0lc';
      
      console.log('URL:', healthUrl);
      console.log('Auth header:', authHeader.substring(0, 50) + '...');
      
      const healthResponse = await fetch(healthUrl, {
        headers: {
          'Authorization': authHeader
        }
      });
      
      console.log('Response status:', healthResponse.status);
      console.log('Response headers:', healthResponse.headers);
      
      if (healthResponse.ok) {
        const data = await healthResponse.json();
        testResults.health = {
          status: 'success',
          message: 'Health endpoint is working! ✅',
          data,
        };
      } else {
        const errorText = await healthResponse.text();
        console.error('Error response:', errorText);
        testResults.health = {
          status: 'error',
          message: `Health check failed: ${healthResponse.status} - ${errorText}`,
        };
      }
    } catch (error: any) {
      console.error('Health check exception:', error);
      testResults.health = {
        status: 'error',
        message: `Health check error: ${error.message}`,
      };
    }

    try {
      // Test 2: Signup Endpoint (without actually creating a user)
      console.log('Testing signup endpoint...');
      const signupUrl = 'https://bjylempevckvbpzpiicx.supabase.co/functions/v1/make-server-2031af1c/signup';
      const signupResponse = await fetch(signupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqeWxlbXBldmNrdmJwenBpaWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI1ODgsImV4cCI6MjA4NDQ3ODU4OH0.QNgiklDhLOSD_cCCKvKg8CLgatgldvoT4pn3oRYH0lc'
        },
        body: JSON.stringify({
          // Intentionally missing fields to test endpoint response
        }),
      });

      const signupData = await signupResponse.json();
      
      if (signupResponse.status === 400 && signupData.error === 'Missing required fields') {
        testResults.auth = {
          status: 'success',
          message: 'Auth endpoints are deployed and responding correctly',
          data: signupData,
        };
      } else if (signupResponse.ok) {
        testResults.auth = {
          status: 'warning',
          message: 'Auth endpoint responded but validation may not be working',
          data: signupData,
        };
      } else {
        testResults.auth = {
          status: 'error',
          message: `Auth endpoint error: ${signupResponse.status} - ${JSON.stringify(signupData)}`,
        };
      }
    } catch (error: any) {
      testResults.auth = {
        status: 'error',
        message: `Auth endpoint error: ${error.message}`,
      };
    }

    setResults(testResults);
    setTesting(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />;
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      <div className="bg-white rounded-lg shadow-2xl p-4 max-w-md border-4 border-brand-teal">
        <h3 className="font-bold text-lg mb-3 text-brand-teal-hover">🔧 Supabase Connection Test</h3>
        
        {!results && (
          <Button
            onClick={runTests}
            disabled={testing}
            className="w-full bg-brand-teal hover:bg-brand-teal-hover"
          >
            {testing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              'Run Connection Tests'
            )}
          </Button>
        )}

        {results && (
          <div className="space-y-3">
            {/* Health Check */}
            <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
              {getStatusIcon(results.health.status)}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">Health Endpoint</div>
                <div className="text-xs text-gray-600 break-words">
                  {results.health.message}
                </div>
              </div>
            </div>

            {/* Auth Check */}
            <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
              {getStatusIcon(results.auth.status)}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">Auth Endpoints</div>
                <div className="text-xs text-gray-600 break-words">
                  {results.auth.message}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={runTests}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Test Again
              </Button>
              <Button
                onClick={() => setResults(null)}
                variant="ghost"
                size="sm"
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}