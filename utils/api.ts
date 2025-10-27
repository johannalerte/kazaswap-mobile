/**
 * API configuration utilities for Supabase functions
 */

// Get the correct Supabase functions URL based on environment
export const getSupabaseFunctionsUrl = () => {
  // For Lovable apps, use the configured Supabase URL from environment
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://elweutkgdoftooxpakyj.supabase.co';
  return `${supabaseUrl}/functions/v1`;
};

// Helper to make authenticated requests to Supabase functions
export const callSupabaseFunction = async (
  functionName: string, 
  data?: any, 
  authToken?: string
) => {
  const baseUrl = getSupabaseFunctionsUrl();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsd2V1dGtnZG9mdG9veHBha3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5OTY0OTIsImV4cCI6MjA3MTU3MjQ5Mn0.I35xRhFf_lfXSrYWyde_stcl8GRBUq08BUX-l7kOnRY'
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${baseUrl}/${functionName}`, {
    method: 'POST',
    headers,
    body: data ? JSON.stringify(data) : undefined
  });

  if (!response.ok) {
    throw new Error(`Function ${functionName} returned ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

// Environment detection
export const isDevelopment = () => {
  return import.meta.env.DEV || window.location.hostname === 'localhost';
};

export const getEnvironmentConfig = () => {
  return {
    isDev: isDevelopment(),
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    functionsUrl: getSupabaseFunctionsUrl()
  };
};