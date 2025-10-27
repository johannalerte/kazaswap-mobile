import { supabase } from "../integrations/supabase/client";
import type { CampaignMetrics, SourceMetrics, PaidVsFree, SignUpDetail, MarketingFilters, MarketingUserDetail } from "../components/admin/marketing/types";

export const getCampaignMetrics = async (): Promise<CampaignMetrics[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('utm_campaign, registration_completed_at, created_at, onboarding_completed')
    .not('utm_campaign', 'is', null)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  const campaignMap = new Map<string, any>();

  data.forEach(profile => {
    const campaign = profile.utm_campaign;
    if (!campaign) return;

    if (!campaignMap.has(campaign)) {
      campaignMap.set(campaign, {
        campaign_id: campaign,
        campaign_name: campaign,
        total_signups: 0,
        completed_onboarding: 0,
        completion_times: [],
        last_signup_date: profile.created_at,
      });
    }

    const metrics = campaignMap.get(campaign);
    metrics.total_signups++;
    
    if (profile.onboarding_completed && profile.registration_completed_at) {
      metrics.completed_onboarding++;
      const timeToComplete = new Date(profile.registration_completed_at).getTime() - new Date(profile.created_at).getTime();
      metrics.completion_times.push(timeToComplete / (1000 * 60 * 60)); // hours
    }

    if (new Date(profile.created_at) > new Date(metrics.last_signup_date)) {
      metrics.last_signup_date = profile.created_at;
    }
  });

  return Array.from(campaignMap.values()).map(m => ({
    campaign_id: m.campaign_id,
    campaign_name: m.campaign_name,
    total_signups: m.total_signups,
    completed_onboarding: m.completed_onboarding,
    conversion_rate: m.total_signups > 0 ? (m.completed_onboarding / m.total_signups) * 100 : 0,
    avg_time_to_completion: m.completion_times.length > 0 
      ? m.completion_times.reduce((a: number, b: number) => a + b, 0) / m.completion_times.length 
      : 0,
    last_signup_date: m.last_signup_date,
  })).sort((a, b) => b.conversion_rate - a.conversion_rate);
};

export const getAcquisitionSourceMetrics = async (): Promise<SourceMetrics[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('landing_page_source, utm_source, onboarding_completed')
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  const sourceMap = new Map<string, any>();
  let totalSignups = data.length;

  data.forEach(profile => {
    const source = profile.landing_page_source || profile.utm_source || 'direct';
    
    if (!sourceMap.has(source)) {
      sourceMap.set(source, {
        source,
        total_signups: 0,
        completed_onboarding: 0,
      });
    }

    const metrics = sourceMap.get(source);
    metrics.total_signups++;
    if (profile.onboarding_completed) {
      metrics.completed_onboarding++;
    }
  });

  return Array.from(sourceMap.values()).map(m => ({
    source: m.source,
    total_signups: m.total_signups,
    completed_onboarding: m.completed_onboarding,
    conversion_rate: m.total_signups > 0 ? (m.completed_onboarding / m.total_signups) * 100 : 0,
    percentage_of_total: totalSignups > 0 ? (m.total_signups / totalSignups) * 100 : 0,
  })).sort((a, b) => b.total_signups - a.total_signups);
};

export const getPaidVsFreeComparison = async (): Promise<PaidVsFree> => {
  const sources = await getAcquisitionSourceMetrics();
  
  const paidSources = ['instagram', 'facebook', 'tiktok', 'linkedin'];
  const paid = sources.filter(s => paidSources.includes(s.source.toLowerCase()));
  const free = sources.filter(s => !paidSources.includes(s.source.toLowerCase()));

  const paidTotal = paid.reduce((sum, s) => sum + s.total_signups, 0);
  const paidCompleted = paid.reduce((sum, s) => sum + s.completed_onboarding, 0);
  const freeTotal = free.reduce((sum, s) => sum + s.total_signups, 0);
  const freeCompleted = free.reduce((sum, s) => sum + s.completed_onboarding, 0);

  return {
    paid: {
      count: paidTotal,
      sources: paid.map(s => s.source),
      conversion_rate: paidTotal > 0 ? (paidCompleted / paidTotal) * 100 : 0,
    },
    free: {
      count: freeTotal,
      sources: free.map(s => s.source),
      conversion_rate: freeTotal > 0 ? (freeCompleted / freeTotal) * 100 : 0,
    },
  };
};

export const getSignUpDetails = async (filters?: MarketingFilters): Promise<SignUpDetail[]> => {
  let query = supabase
    .from('profiles')
    .select(`
      user_id,
      email,
      landing_page_source,
      utm_source,
      utm_medium,
      utm_campaign,
      created_at,
      registration_completed_at,
      onboarding_completed,
      updated_at,
      registration_step
    `)
    .order('created_at', { ascending: false });

  if (filters?.source) {
    query = query.or(`landing_page_source.eq.${filters.source},utm_source.eq.${filters.source}`);
  }

  if (filters?.campaign) {
    query = query.eq('utm_campaign', filters.campaign);
  }

  if (filters?.onboardingStatus === 'completed') {
    query = query.eq('onboarding_completed', true);
  } else if (filters?.onboardingStatus === 'incomplete') {
    query = query.eq('onboarding_completed', false);
  }

  const { data, error } = await query;

  if (error || !data) return [];

  // Get onboarding step data for users
  const userIds = data.map(p => p.user_id);
  const { data: onboardingData } = await supabase
    .from('property_onboarding')
    .select('user_id, current_step')
    .in('user_id', userIds);

  const onboardingMap = new Map(
    onboardingData?.map(o => [o.user_id, o.current_step]) || []
  );

  return data.map(profile => ({
    user_id: profile.user_id,
    email: profile.email || '',
    acquisition_source: profile.landing_page_source || profile.utm_source || 'direct',
    campaign_id: profile.utm_campaign,
    utm_medium: profile.utm_medium,
    signup_date: profile.created_at,
    onboarding_completed: profile.onboarding_completed || false,
    onboarding_status: profile.onboarding_completed ? 'completed' : 'incomplete',
    onboarding_step: onboardingMap.get(profile.user_id) || null,
    reminder_email_sent: false,
    last_activity_date: profile.updated_at || profile.created_at,
    days_since_signup: calculateDaysSinceSignup(profile.created_at),
  }));
};

export const calculateDaysSinceSignup = (signupDate: string): number => {
  const now = new Date();
  const signup = new Date(signupDate);
  const diffTime = Math.abs(now.getTime() - signup.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const shouldSendReminder = (signup: SignUpDetail): boolean => {
  return !signup.onboarding_completed && signup.days_since_signup >= 3;
};

/**
 * Helper: Calculate days since a date
 */
const calculateDaysSince = (dateString: string): number => {
  const now = new Date();
  const past = new Date(dateString);
  const diffTime = Math.abs(now.getTime() - past.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Fetch Facebook sign-ups with all details
 */
export const getFacebookSignups = async (): Promise<MarketingUserDetail[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        user_id,
        email,
        first_name,
        utm_source,
        utm_medium,
        utm_campaign,
        landing_page_source,
        created_at,
        registration_completed_at,
        onboarding_completed,
        updated_at,
        abandonment_email_sent,
        abandonment_email_sent_at
      `)
      .or('utm_source.ilike.%facebook%,utm_source.ilike.%fb%,landing_page_source.ilike.%facebook%')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Get onboarding step data (including incomplete)
    const userIds = (data || []).map(p => p.user_id);
    const { data: onboardingData } = await supabase
      .from('property_onboarding')
      .select('user_id, current_step, completed')
      .in('user_id', userIds);

    const onboardingMap = new Map(
      onboardingData?.map(o => [o.user_id, { step: o.current_step, completed: o.completed }]) || []
    );

    // Transform to match the interface - Include ALL users with proper status
    return (data || []).map(user => {
      const onboarding = onboardingMap.get(user.user_id);
      const daysSinceSignup = calculateDaysSince(user.created_at);
      const daysInactive = user.updated_at 
        ? calculateDaysSince(user.updated_at)
        : calculateDaysSince(user.created_at);
      
      // Determine status: completed, in_progress, or abandoned
      let status: 'completed' | 'in_progress' | 'abandoned';
      if (user.onboarding_completed) {
        status = 'completed';
      } else if (onboarding?.step && daysInactive < 3) {
        status = 'in_progress';
      } else {
        status = 'abandoned';
      }
      
      return {
        user_id: user.user_id,
        email: user.email || '',
        first_name: user.first_name || null,
        source: 'facebook',
        campaign: user.utm_campaign || '—',
        signup_date: user.created_at,
        onboarding_status: status,
        onboarding_step: onboarding?.step || null,
        days_since_signup: daysSinceSignup,
        days_inactive: daysInactive,
        should_send_reminder: !user.onboarding_completed && daysSinceSignup >= 3,
        abandonment_email_sent: user.abandonment_email_sent || false,
        abandonment_email_sent_at: user.abandonment_email_sent_at || null
      };
    }).filter(user => !user.email.toLowerCase().includes('yopmail'));
  } catch (error) {
    console.error('Error fetching Facebook sign-ups:', error);
    return [];
  }
};

/**
 * Fetch Instagram sign-ups with all details
 */
export const getInstagramSignups = async (): Promise<MarketingUserDetail[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        user_id,
        email,
        first_name,
        utm_source,
        utm_medium,
        utm_campaign,
        landing_page_source,
        created_at,
        registration_completed_at,
        onboarding_completed,
        updated_at,
        abandonment_email_sent,
        abandonment_email_sent_at
      `)
      .or('utm_source.ilike.%instagram%,utm_source.ilike.%ig%,landing_page_source.ilike.%instagram%')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Get onboarding step data (including incomplete)
    const userIds = (data || []).map(p => p.user_id);
    const { data: onboardingData } = await supabase
      .from('property_onboarding')
      .select('user_id, current_step, completed')
      .in('user_id', userIds);

    const onboardingMap = new Map(
      onboardingData?.map(o => [o.user_id, { step: o.current_step, completed: o.completed }]) || []
    );

    // Transform to match the interface - Include ALL users with proper status
    return (data || []).map(user => {
      const onboarding = onboardingMap.get(user.user_id);
      const daysSinceSignup = calculateDaysSince(user.created_at);
      const daysInactive = user.updated_at 
        ? calculateDaysSince(user.updated_at)
        : calculateDaysSince(user.created_at);
      
      // Determine status: completed, in_progress, or abandoned
      let status: 'completed' | 'in_progress' | 'abandoned';
      if (user.onboarding_completed) {
        status = 'completed';
      } else if (onboarding?.step && daysInactive < 3) {
        status = 'in_progress';
      } else {
        status = 'abandoned';
      }
      
      return {
        user_id: user.user_id,
        email: user.email || '',
        first_name: user.first_name || null,
        source: 'instagram',
        campaign: user.utm_campaign || '—',
        signup_date: user.created_at,
        onboarding_status: status,
        onboarding_step: onboarding?.step || null,
        days_since_signup: daysSinceSignup,
        days_inactive: daysInactive,
        should_send_reminder: !user.onboarding_completed && daysSinceSignup >= 3,
        abandonment_email_sent: user.abandonment_email_sent || false,
        abandonment_email_sent_at: user.abandonment_email_sent_at || null
      };
    }).filter(user => !user.email.toLowerCase().includes('yopmail'));
  } catch (error) {
    console.error('Error fetching Instagram sign-ups:', error);
    return [];
  }
};
