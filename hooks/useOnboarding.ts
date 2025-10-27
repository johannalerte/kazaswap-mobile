// useOnboarding.ts - Custom hook with proper caching and debouncing
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { useOnboardingSave } from './useOnboardingSave';

// Cache to prevent duplicate requests
const onboardingCache = {
  data: null as any,
  timestamp: null as number | null,
  isValid() {
    // Cache is valid for 5 seconds
    return this.timestamp && Date.now() - this.timestamp < 5000;
  }
};

export function useOnboarding() {
  const { user } = useAuth();
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Use the new debounced save hook
  const { saveStep, isSaving, error: saveError, cancelPendingSave } = useOnboardingSave();
  
  // Track if we're already fetching to prevent duplicate requests
  const isFetchingRef = useRef(false);
  const lastFetchTimeRef = useRef(0);
  const hasFetchedRef = useRef(false);

  // Initialize onboarding (with caching and duplicate prevention)
  const initializeOnboarding = useCallback(async () => {
    if (!user) return;
    
    // Prevent duplicate requests
    if (isFetchingRef.current) {
      console.log('Already fetching onboarding data, skipping...');
      return;
    }

    // Clear cache for fresh start
    onboardingCache.data = null;
    onboardingCache.timestamp = null;

    // Rate limiting: Don't fetch if we just fetched in the last 2 seconds
    const now = Date.now();
    if (now - lastFetchTimeRef.current < 2000) {
      console.log('Rate limiting: Too soon to fetch again');
      return;
    }

    try {
      isFetchingRef.current = true;
      lastFetchTimeRef.current = now;
      setLoading(true);
      setError(null);

      // Call the RPC function with user_id parameter
      const { data, error } = await supabase.rpc('start_or_get_onboarding', {
        p_user_id: user.id
      } as any);

      if (error) {
        console.error('Error initializing onboarding:', error);
        setError(error);
        return;
      }

      if (data && (data as any).success) {
        // Update cache
        onboardingCache.data = data;
        onboardingCache.timestamp = Date.now();
        
        setOnboardingData(data);
        setCurrentStep((data as any).current_step || 1);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError(err);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [user]);

  // Save step data using the new debounced hook
  const saveStepData = useCallback(async (stepNumber: number, stepData: any, completeStep = false) => {
    if (!user) return;
    
    // Validate input
    if (!stepNumber || stepNumber < 1 || stepNumber > 4) {
      console.error('Invalid step number:', stepNumber);
      return;
    }

    try {
      // If we're marking the step complete, cancel any pending auto-save first
      if (completeStep && typeof cancelPendingSave === 'function') { cancelPendingSave(); }
      const result = await saveStep(stepNumber, stepData, completeStep, completeStep);
      
      if (result && (result as any).success) {
        // Update local state
        setOnboardingData((prev: any) => ({
          ...prev,
          [`step_${stepNumber}_data`]: stepData,
          current_step: Math.max(prev?.current_step || 1, stepNumber)
        }));
        
        // Clear cache to force refresh on next load
        onboardingCache.data = null;
        onboardingCache.timestamp = null;
      }
    } catch (err) {
      console.error('Unexpected error saving step:', err);
      setError(err);
    }
  }, [user, saveStep]);

  // Move to next step
  const nextStep = useCallback(async (currentStepData: any) => {
    if (currentStep < 4) {
      // Ensure no pending auto-saves run for the previous step
      cancelPendingSave?.();
      // Save current step as completed (immediate)
      await saveStepData(currentStep, currentStepData, true);
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, saveStepData, cancelPendingSave]);

  // Move to previous step
  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Complete entire onboarding
  const completeOnboarding = useCallback(async (): Promise<string | null> => {
    if (!user) return null;

    try {
      console.log('🎯 Completing onboarding and creating property...');

      const { data, error } = await supabase.rpc('complete_onboarding', {
        p_user_id: user.id
      });

      if (error) throw error;

      if ((data as any)?.success) {
        // Clear cache
        onboardingCache.data = null;
        onboardingCache.timestamp = null;
        
        setOnboardingData((prev: any) => ({
          ...prev,
          completed: true
        }));

        // Send welcome email after successful onboarding completion
        try {
          await supabase.functions.invoke('send-welcome-email', {
            body: {
              userEmail: user.email || '',
              userName: user.user_metadata?.first_name || 'there',
              propertyAddress: 'your property'
            }
          });
          console.log('✅ Welcome email sent successfully');
        } catch (emailError) {
          console.error('⚠️ Error sending welcome email:', emailError);
          // Don't block the flow if email fails
        }

        return (data as any).property_id;
      }

      return null;
    } catch (err: any) {
      console.error('❌ Error completing onboarding:', err);
      setError(err);
      return null;
    }
  }, [user]);

  // Initialize when user is available
  useEffect(() => {
    if (user && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      initializeOnboarding();
    } else if (!user) {
      setOnboardingData(null);
      setLoading(false);
      hasFetchedRef.current = false;
    }
  }, [user, initializeOnboarding]);

  return {
    onboardingData,
    currentStep,
    loading: loading || isSaving,
    error: error || saveError,
    saveStepData,
    nextStep,
    previousStep,
    initializeOnboarding,
    completeOnboarding
  };
}