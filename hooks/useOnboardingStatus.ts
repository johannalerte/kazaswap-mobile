import { useState, useCallback } from 'react';
import { supabase } from '../integrations/supabase/client';

interface OnboardingStatus {
  has_account: boolean;
  has_incomplete_onboarding?: boolean;
  onboarding_completed?: boolean;
  needs_onboarding?: boolean;
  current_step?: number;
  onboarding_id?: string;
  status?: string;
  redirect_to: string;
  message?: string;
}

export const useOnboardingStatus = () => {
  const [data, setData] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const checkOnboardingStatus = useCallback(async (userId?: string): Promise<OnboardingStatus | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: result, error: rpcError } = await supabase.rpc('get_user_onboarding_status' as any, {
        p_user_id: userId || null
      });

      if (rpcError) {
        console.error('Error checking onboarding status:', rpcError);
        const errorInstance = new Error(rpcError.message);
        setError(errorInstance);
        return null;
      }

      const onboardingData = result as OnboardingStatus;
      setData(onboardingData);
      return onboardingData;
    } catch (error) {
      console.error('Exception checking onboarding status:', error);
      const errorInstance = error instanceof Error ? error : new Error('Unknown error');
      setError(errorInstance);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, checkOnboardingStatus };
};