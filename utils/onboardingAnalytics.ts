import { supabase } from '../integrations/supabase/client';

export interface OnboardingAnalytics {
  totalStarted: number;
  stepCompletionRates: {
    step1: number;
    step2: number;
    step3: number;
    step4: number;
  };
  abandonmentByStep: {
    step1: number;
    step2: number;
    step3: number;
    step4: number;
  };
  averageTimePerStep: {
    step1: number;
    step2: number;
    step3: number;
    step4: number;
  };
  completionRate: number;
}

export interface AbandonedUser {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  current_step: number;
  step_name: string;
  hours_since_activity: number;
  phone_number?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_page_source?: string;
  abandonment_reason?: string; // Real abandonment reason vs time-based
  abandoned_at?: string; // When they actually abandoned (if tracked)
  is_real_abandonment?: boolean; // True if they actually closed page/navigated away
}

export const getAbandonedUsers = async (
  hours_since_activity?: number,
  step?: number
): Promise<AbandonedUser[]> => {
  try {
    console.log(`🔍 Fetching abandoned users for ${hours_since_activity ? `last ${hours_since_activity} hours` : 'all time'}, step: ${step || 'all'}`);
    
    // Use the RPC function with type assertion to bypass TypeScript issues
    const { data, error } = await (supabase as any)
      .rpc('get_abandoned_users_dashboard', {
        p_limit: 100,  // Get up to 100 users
        p_min_minutes: 20,  // 20+ minutes inactive
        p_include_sent: true  // Include users who already got emails
      });

    if (error) {
      console.error('❌ RPC Error:', error);
      return [];
    }

    console.log('✅ RPC Success - Found users:', data?.length || 0);
    console.log('📊 Sample user data:', data?.[0]);

    // Map the RPC response to our interface
    const abandonedUsers: AbandonedUser[] = (data || []).map((u: any) => ({
      user_id: u.user_id,
      email: u.email,
      first_name: u.first_name,
      last_name: u.last_name,
      current_step: u.current_step,
      step_name: u.step_name || `Step ${u.current_step}`,
      hours_since_activity: u.hours_since_activity || 0,
      phone_number: u.phone_number,
      utm_source: u.utm_source,
      utm_medium: u.utm_medium,
      utm_campaign: u.utm_campaign,
      landing_page_source: u.landing_page_source,
      abandonment_reason: u.abandonment_reason,
      abandoned_at: u.abandoned_at,
      is_real_abandonment: u.is_real_abandonment || false,
    }));

    console.log(`✅ Returning ${abandonedUsers.length} abandoned users`);
    return abandonedUsers;
  } catch (error) {
    console.error('❌ Error fetching abandoned users:', error);
    return [];
  }
};

/**
 * Sync abandoned users to Klaviyo for email targeting
 */
export const syncAbandonedUsersToKlaviyo = async (
  hours_since_activity?: number,
  step?: number,
  limit?: number,
  force_sync?: boolean
): Promise<{
  success: boolean;
  synced_users: number;
  failed_users: number;
  users_by_step?: Record<string, number>;
  error?: string;
}> => {
  try {
    const { data, error } = await supabase.functions.invoke('sync-abandoned-klaviyo', {
      body: {
        hours_since_activity,
        step,
        limit,
        force_sync
      }
    });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error syncing abandoned users to Klaviyo:', error);
    return {
      success: false,
      synced_users: 0,
      failed_users: 0,
      error: error.message
    };
  }
};

/**
 * Get onboarding funnel analytics
 */
export const getOnboardingAnalytics = async (): Promise<OnboardingAnalytics | null> => {
  try {
    const { data, error } = await supabase
      .from('property_onboarding')
      .select(`
        current_step,
        completed,
        step_1_started_at,
        step_1_completed_at,
        step_2_started_at,
        step_2_completed_at,
        step_3_started_at,
        step_3_completed_at,
        step_4_started_at,
        step_4_completed_at
      `);

    if (error) throw error;

    const totalStarted = data?.length || 0;
    if (totalStarted === 0) {
      return {
        totalStarted: 0,
        stepCompletionRates: { step1: 0, step2: 0, step3: 0, step4: 0 },
        abandonmentByStep: { step1: 0, step2: 0, step3: 0, step4: 0 },
        averageTimePerStep: { step1: 0, step2: 0, step3: 0, step4: 0 },
        completionRate: 0
      };
    }

    // Calculate completion rates
    const step1Completed = data.filter(d => d.step_1_completed_at).length;
    const step2Completed = data.filter(d => d.step_2_completed_at).length;
    const step3Completed = data.filter(d => d.step_3_completed_at).length;
    const step4Completed = data.filter(d => d.step_4_completed_at).length;
    const totalCompleted = data.filter(d => d.completed).length;

    // Calculate abandonment by step
    const abandonedAtStep1 = data.filter(d => d.current_step === 1 && !d.completed).length;
    const abandonedAtStep2 = data.filter(d => d.current_step === 2 && !d.completed).length;
    const abandonedAtStep3 = data.filter(d => d.current_step === 3 && !d.completed).length;
    const abandonedAtStep4 = data.filter(d => d.current_step === 4 && !d.completed).length;

    // Calculate average time per step (in minutes)
    const calculateAverageTime = (
      startField: string,
      endField: string
    ): number => {
      const validEntries = data.filter(d => d[startField] && d[endField]);
      if (validEntries.length === 0) return 0;

      const totalMinutes = validEntries.reduce((sum, entry) => {
        const start = new Date(entry[startField]).getTime();
        const end = new Date(entry[endField]).getTime();
        return sum + (end - start) / (1000 * 60); // Convert to minutes
      }, 0);

      return totalMinutes / validEntries.length;
    };

    return {
      totalStarted,
      stepCompletionRates: {
        step1: (step1Completed / totalStarted) * 100,
        step2: (step2Completed / totalStarted) * 100,
        step3: (step3Completed / totalStarted) * 100,
        step4: (step4Completed / totalStarted) * 100
      },
      abandonmentByStep: {
        step1: abandonedAtStep1,
        step2: abandonedAtStep2,
        step3: abandonedAtStep3,
        step4: abandonedAtStep4
      },
      averageTimePerStep: {
        step1: calculateAverageTime('step_1_started_at', 'step_1_completed_at'),
        step2: calculateAverageTime('step_2_started_at', 'step_2_completed_at'),
        step3: calculateAverageTime('step_3_started_at', 'step_3_completed_at'),
        step4: calculateAverageTime('step_4_started_at', 'step_4_completed_at')
      },
      completionRate: (totalCompleted / totalStarted) * 100
    };
  } catch (error) {
    console.error('Error fetching onboarding analytics:', error);
    return null;
  }
};

/**
 * Mark abandonment emails as sent for specific users
 */
export const markAbandonmentEmailsSent = async (userIds: string[]): Promise<number> => {
  try {
    const { data, error } = await supabase.rpc('mark_abandonment_email_sent', {
      p_user_ids: userIds
    });

    if (error) throw error;
    return data || 0;
  } catch (error) {
    console.error('Error marking abandonment emails as sent:', error);
    return 0;
  }
};

/**
 * Get users who abandoned at specific time ranges for targeted campaigns
 */
export const getTargetedAbandonedUsers = async (filters: {
  step?: number;
  hoursRange: [number, number]; // [min, max] hours since activity
  utmSource?: string;
  landingPageSource?: string;
  limit?: number;
}): Promise<AbandonedUser[]> => {
  try {
    // This would need a more complex query, for now just get general abandoned users
    const users = await getAbandonedUsers(filters.hoursRange[1], filters.step);
    
    // Filter by hours range and other criteria
    return users.filter(user => {
      const hoursInRange = user.hours_since_activity >= filters.hoursRange[0] && 
                          user.hours_since_activity <= filters.hoursRange[1];
      
      const utmMatch = !filters.utmSource || user.utm_source === filters.utmSource;
      const landingMatch = !filters.landingPageSource || user.landing_page_source === filters.landingPageSource;
      
      return hoursInRange && utmMatch && landingMatch;
    }).slice(0, filters.limit || 100);
  } catch (error) {
    console.error('Error fetching targeted abandoned users:', error);
    return [];
  }
};