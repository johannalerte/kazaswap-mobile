import { useEffect, useRef } from 'react';
import { supabase } from '../integrations/supabase/client';

interface AbandonmentData {
  step: number;
  stepName: string;
  timeOnStep: number; // milliseconds
  reason: 'page_close' | 'navigation' | 'tab_switch' | 'page_hidden';
}

/**
 * Hook to track real page abandonment during onboarding
 * Detects when users actually leave/close the page vs just being inactive
 */
export const usePageAbandonmentTracking = (currentStep: number, isOnboardingComplete: boolean) => {
  const stepStartTime = useRef<number>(Date.now());
  const isTrackingRef = useRef<boolean>(true);

  // Update step start time when step changes
  useEffect(() => {
    if (!isOnboardingComplete) {
      stepStartTime.current = Date.now();
    }
  }, [currentStep, isOnboardingComplete]);

  // Stop tracking when onboarding is complete
  useEffect(() => {
    isTrackingRef.current = !isOnboardingComplete;
  }, [isOnboardingComplete]);

  const markAbandonment = async (reason: AbandonmentData['reason']) => {
    if (!isTrackingRef.current) return;

    const timeOnStep = Date.now() - stepStartTime.current;
    const stepNames = {
      1: 'Property Details',
      2: 'More Details', 
      3: 'Photos',
      4: 'Availability'
    };

    try {
      console.log('🚪 Tracking page abandonment:', {
        step: currentStep,
        reason,
        timeOnStep: Math.round(timeOnStep / 1000) + 's'
      });

      await supabase.rpc('mark_onboarding_abandoned', {
        p_step: currentStep,
        p_step_name: stepNames[currentStep as keyof typeof stepNames],
        p_time_on_step_ms: timeOnStep,
        p_abandonment_reason: reason
      });
    } catch (error) {
      console.error('Failed to track abandonment:', error);
    }
  };

  useEffect(() => {
    if (isOnboardingComplete) return;

    // Track page visibility changes (tab switching, minimizing)
    const handleVisibilityChange = () => {
      if (document.hidden && isTrackingRef.current) {
        markAbandonment('page_hidden');
      }
    };

    // Track page unload (closing browser/tab, navigation)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isTrackingRef.current) {
        markAbandonment('page_close');
        
        // Show confirmation dialog to prevent accidental abandonment
        const message = 'You haven\'t finished setting up your property. Are you sure you want to leave?';
        e.returnValue = message;
        return message;
      }
    };

    // Track navigation away from onboarding (using popstate for SPA navigation)
    const handleNavigation = () => {
      if (isTrackingRef.current && !window.location.pathname.includes('/onboarding')) {
        markAbandonment('navigation');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handleNavigation);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [currentStep, isOnboardingComplete]);

  // Return function to manually mark completion (when user finishes onboarding)
  return {
    markComplete: () => {
      isTrackingRef.current = false;
      console.log('✅ Onboarding completed - abandonment tracking stopped');
    }
  };
};