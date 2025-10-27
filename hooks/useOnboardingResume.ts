import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';

interface ResumeData {
  resumedOnboarding: boolean;
  currentStep: number;
  step1Data?: any;
  step2Data?: any;
  step3Data?: any;
  step4Data?: any;
  message?: string;
}

export const useOnboardingResume = () => {
  const location = useLocation();
  const [resumeData, setResumeData] = useState<ResumeData>({
    resumedOnboarding: false,
    currentStep: 1
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkResumedOnboarding = async () => {
      try {
        // Check from route state (direct navigation from email link)
        if (location.state?.resumedOnboarding) {
          console.log('🔄 Onboarding resumed from route state:', location.state);
          
          // If user was on step 4, take them back to step 3 to re-upload images
          let currentStep = location.state.currentStep || 1;
          if (currentStep === 4) {
            console.log('📸 User was on step 4, redirecting to step 3 to re-upload images');
            currentStep = 3;
          }
          
          await loadSavedOnboardingData(currentStep);
          
          // Show welcome back message
          if (location.state.message) {
            toast({
              title: "Welcome back!",
              description: location.state.message,
            });
          }
          
          setResumeData({
            resumedOnboarding: true,
            currentStep,
            message: location.state.message
          });
          
          setLoading(false);
          return;
        }
        
        // Check session storage (for page refresh scenarios)
        const sessionResumed = sessionStorage.getItem('onboarding_resumed');
        const sessionStep = sessionStorage.getItem('onboarding_step');
        
        if (sessionResumed === 'true' && sessionStep) {
          console.log('🔄 Onboarding resumed from session storage');
          
          // If user was on step 4, take them back to step 3 to re-upload images
          let currentStep = parseInt(sessionStep) || 1;
          if (currentStep === 4) {
            console.log('📸 User was on step 4, redirecting to step 3 to re-upload images');
            currentStep = 3;
          }
          
          await loadSavedOnboardingData(currentStep);
          
          // Clear session flags
          sessionStorage.removeItem('onboarding_resumed');
          sessionStorage.removeItem('onboarding_step');
          
          toast({
            title: "Welcome back!",
            description: "We've restored your previous progress. Continue where you left off.",
          });
          
          setResumeData({
            resumedOnboarding: true,
            currentStep,
            message: "Progress restored from previous session"
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error checking resumed onboarding:', error);
        setLoading(false);
      }
    };

    checkResumedOnboarding();
  }, [location.state]);

  const loadSavedOnboardingData = async (step: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch saved onboarding data
      const { data, error } = await supabase
        .from('property_onboarding')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error loading onboarding data:', error);
        return;
      }

      if (data) {
        console.log('📝 Loading saved onboarding data:', data);
        
        setResumeData(prev => ({
          ...prev,
          step1Data: (data as any).step_1_data,
          step2Data: (data as any).step_2_data, 
          step3Data: (data as any).step_3_data,
          step4Data: (data as any).step_4_data
        }));

        // Update status to 'resumed' if it was 'abandoned'
        if ((data as any).status === 'abandoned') {
          await supabase
            .from('property_onboarding')
            .update({ 
              status: 'resumed',
              resumed_at: new Date().toISOString()
            })
            .eq('id', (data as any).id);
        }
      }
    } catch (error) {
      console.error('Error loading saved onboarding data:', error);
    }
  };

  return {
    resumeData,
    loading,
    loadSavedOnboardingData
  };
};