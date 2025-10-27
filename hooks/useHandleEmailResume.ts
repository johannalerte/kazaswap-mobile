import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

export const useHandleEmailResume = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeStep, setResumeStep] = useState(1);
  const [savedData, setSavedData] = useState<any>(null);

  useEffect(() => {
    handleEmailResume();
  }, []);

  const handleEmailResume = async () => {
    try {
      // Check if user came from email
      const resumed = searchParams.get('resumed');
      const step = searchParams.get('step');
      const from = searchParams.get('from');
      
      if (from === 'email') {
        console.log('User resumed from email, step:', step);
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Not authenticated, save return URL and redirect to login
          const returnUrl = window.location.href;
          sessionStorage.setItem('onboarding_return_url', returnUrl);
          
          toast.info('Please log in to continue with your property setup');
          navigate('/signin', { 
            state: { returnUrl } 
          });
          return;
        }
        
        // User is authenticated, show welcome message
        toast.success("Welcome back! We've restored your previous progress.", {
          duration: 5000,
        });
        
        // Set the resume step
        if (step) {
          setResumeStep(parseInt(step));
        }
        
        // Load saved onboarding data
        const data = await loadSavedData(session.user.id);
        setSavedData(data);
        
        // Update status from abandoned to resumed
        await updateOnboardingStatus(session.user.id);
      }
    } catch (error) {
      console.error('Error handling email resume:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('property_onboarding')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (data && !error) {
        console.log('Loaded saved onboarding data:', data);
        // Return the data to be used in your form
        return {
          step1: (data as any).step_1_data || {},
          step2: (data as any).step_2_data || {},
          step3: (data as any).step_3_data || {},
          step4: (data as any).step_4_data || {},
          currentStep: (data as any).current_step
        };
      }
    } catch (err) {
      console.error('Error loading saved data:', err);
    }
    return null;
  };

  const updateOnboardingStatus = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('property_onboarding')
        .update({ 
          status: 'resumed',
          resumed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('status', 'abandoned');
      
      if (error) {
        console.error('Error updating onboarding status:', error);
      } else {
        console.log('Updated onboarding status to resumed');
      }
    } catch (err) {
      console.error('Error in updateOnboardingStatus:', err);
    }
  };

  return {
    isLoading,
    resumeStep,
    savedData,
    isResumedFromEmail: searchParams.get('from') === 'email'
  };
};