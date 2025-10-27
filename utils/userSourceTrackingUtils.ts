import { supabase } from '../integrations/supabase/client';

export interface UserSourceData {
  email: string;
  landing_page_source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  referrer: string | null;
  signup_timestamp: string | null;
  created_at: string;
}

export interface SourceAnalysis {
  totalVisits: number;
  totalSignups: number;
  conversionRate: number;
  landingPages: SourceCount[];
  utmSources: SourceCount[];
  utmMediums: SourceCount[];
  utmCampaigns: SourceCount[];
  referrers: SourceCount[];
}

export interface SourceCount {
  name: string;
  count: number;
  percentage: number;
}

/**
 * Fetch all user source tracking data from profiles table
 */
export const getUserSourceTracking = async (): Promise<UserSourceData[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('email, landing_page_source, utm_source, utm_medium, utm_campaign, created_at, registration_completed_at')
      .order('created_at', { ascending: false });
    if (error) throw error;
    
    // Map profiles data to UserSourceData format
    return (data || []).map(profile => ({
      email: profile.email || '',
      landing_page_source: profile.landing_page_source,
      utm_source: profile.utm_source,
      utm_medium: profile.utm_medium,
      utm_campaign: profile.utm_campaign,
      utm_term: null,
      referrer: null,
      signup_timestamp: profile.registration_completed_at,
      created_at: profile.created_at
    }));
  } catch (error) {
    console.error('Error fetching user source tracking:', error);
    return [];
  }
};

/**
 * Analyze user sources and calculate metrics
 */
export const analyzeUserSources = (data: UserSourceData[]): SourceAnalysis => {
  const totalVisits = data.length;
  const totalSignups = data.filter(d => d.signup_timestamp).length;
  const conversionRate = totalVisits > 0 ? (totalSignups / totalVisits) * 100 : 0;

  // Helper function to aggregate sources
  const aggregateSources = (
    sourceExtractor: (item: UserSourceData) => string | null
  ): SourceCount[] => {
    const counts = new Map<string, number>();

    data.forEach(item => {
      const source = sourceExtractor(item);
      if (source) {
        counts.set(source, (counts.get(source) || 0) + 1);
      }
    });

    return Array.from(counts.entries())
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalVisits > 0 ? (count / totalVisits) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count);
  };

  // Extract domain from referrer URL
  const extractDomain = (url: string | null): string | null => {
    if (!url) return null;
    try {
      const domain = new URL(url).hostname;
      return domain.replace(/^www\./, '');
    } catch {
      return url;
    }
  };

  return {
    totalVisits,
    totalSignups,
    conversionRate,
    landingPages: aggregateSources(d => d.landing_page_source),
    utmSources: aggregateSources(d => d.utm_source),
    utmMediums: aggregateSources(d => d.utm_medium),
    utmCampaigns: aggregateSources(d => d.utm_campaign),
    referrers: aggregateSources(d => extractDomain(d.referrer))
  };
};

/**
 * Get top N sources from a source array
 */
export const getTopSources = (sources: SourceCount[], limit: number = 10): SourceCount[] => {
  return sources.slice(0, limit);
};
