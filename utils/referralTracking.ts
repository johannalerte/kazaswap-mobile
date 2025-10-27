export interface ReferralData {
  source: string;
  medium?: string;
  campaign?: string;
  referrer?: string;
  landingPage?: string;
}

/**
 * Extract UTM parameters from URL
 */
const getUTMParams = (): Partial<ReferralData> => {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || params.get('source') || params.get('ref') || undefined,
    medium: params.get('utm_medium') || undefined,
    campaign: params.get('utm_campaign') || undefined,
  };
};

/**
 * Parse referrer to get source name
 */
const parseReferrer = (referrer: string): string | null => {
  if (!referrer) return null;
  
  try {
    const url = new URL(referrer);
    const hostname = url.hostname.toLowerCase();
    
    // Map common referrers to friendly names
    const referrerMap: Record<string, string> = {
      'instagram.com': 'instagram',
      'facebook.com': 'facebook',
      'fb.com': 'facebook',
      'twitter.com': 'twitter',
      'x.com': 'twitter',
      'linkedin.com': 'linkedin',
      'google.com': 'google',
      'google.': 'google',
      'bing.com': 'bing',
      'yahoo.com': 'yahoo',
      'reddit.com': 'reddit',
      'tiktok.com': 'tiktok',
      'youtube.com': 'youtube',
      'pinterest.com': 'pinterest',
    };
    
    // Check for exact matches or partial matches
    for (const [domain, source] of Object.entries(referrerMap)) {
      if (hostname.includes(domain)) {
        return source;
      }
    }
    
    // Return the domain without TLD as fallback
    return hostname.split('.')[0];
  } catch {
    return null;
  }
};

/**
 * Capture referral data from URL and browser
 */
export const captureReferralData = (): ReferralData => {
  const utmParams = getUTMParams();
  const referrer = document.referrer;
  const landingPage = window.location.pathname + window.location.search;
  
  // Priority: UTM params > referrer > direct
  let source = 'direct';
  
  if (utmParams.source) {
    source = utmParams.source.toLowerCase();
  } else if (referrer) {
    const parsedSource = parseReferrer(referrer);
    if (parsedSource) {
      source = parsedSource;
    }
  }
  
  return {
    source,
    medium: utmParams.medium?.toLowerCase(),
    campaign: utmParams.campaign?.toLowerCase(),
    referrer: referrer || undefined,
    landingPage,
  };
};

/**
 * Store referral data in localStorage (only if not already stored)
 */
export const storeReferralData = (): ReferralData => {
  const STORAGE_KEY = 'kazaswap_referral_data';
  
  // Check if we already have referral data
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (existingData) {
    try {
      return JSON.parse(existingData);
    } catch {
      // If parsing fails, continue to capture new data
    }
  }
  
  // Capture and store new referral data
  const referralData = captureReferralData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(referralData));
  
  console.log('📊 Referral data captured:', referralData);
  
  return referralData;
};

/**
 * Get stored referral data
 */
export const getStoredReferralData = (): ReferralData | null => {
  const STORAGE_KEY = 'kazaswap_referral_data';
  const data = localStorage.getItem(STORAGE_KEY);
  
  if (!data) return null;
  
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

/**
 * Format source for display
 */
export const formatSourceForDisplay = (source?: string): string => {
  if (!source || source === 'direct') return 'Direct';
  
  // Capitalize first letter
  return source.charAt(0).toUpperCase() + source.slice(1);
};
