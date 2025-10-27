/**
 * Utility functions for detecting and managing landing page sources
 * This ensures users are properly tagged based on which domain they came from
 */

export interface LandingPageInfo {
  source: string;
  klaviyoListId: string;
  displayName: string;
}

/**
 * Get landing page source based on current domain
 * This matches the exact logic from the JavaScript solution provided
 */
export function detectLandingPageSource(): LandingPageInfo {
  const hostname = window.location.hostname;
  
  console.log('🎯 Detecting landing page source for domain:', hostname);
  
  // Domain to landing page source mapping
  const domainMappings: Record<string, LandingPageInfo> = {
    'waitlist.kazaswap.co': {
      source: 'waitlist',
      klaviyoListId: 'UJZ4RM',
      displayName: 'Waitlist'
    },
    'launch.kazaswap.co': {
      source: 'launch',
      klaviyoListId: 'XtSKZA',
      displayName: 'Launch'
    },
    'founders.kazaswap.co': {
      source: 'founders',
      klaviyoListId: 'UF7N7A',
      displayName: 'Founders'
    },
    // Handle development/preview domains
    'localhost': {
      source: 'dev-local',
      klaviyoListId: 'UEaaSa',
      displayName: 'Development'
    }
  };
  
  // Check for exact domain match first
  if (domainMappings[hostname]) {
    const info = domainMappings[hostname];
    console.log('✅ Found exact domain match:', info);
    return info;
  }
  
  // Check for subdomain patterns (for preview domains like *.sandbox.lovable.dev)
  if (hostname.includes('sandbox') || hostname.includes('preview') || hostname.includes('lovable')) {
    // For preview/development, check URL parameters or use default
    const urlParams = new URLSearchParams(window.location.search);
    const sourceParam = urlParams.get('source') || urlParams.get('landing_page_source');
    
    if (sourceParam && domainMappings[`${sourceParam}.kazaswap.co`]) {
      console.log('✅ Using URL parameter source:', sourceParam);
      return domainMappings[`${sourceParam}.kazaswap.co`];
    }
    
    return {
      source: 'dev-preview',
      klaviyoListId: 'UEaaSa',
      displayName: 'Development Preview'
    };
  }
  
  // Default fallback
  console.log('⚠️ Unknown domain, using default:', hostname);
  return {
    source: 'organic',
    klaviyoListId: 'UEaaSa',
    displayName: 'Organic'
  };
}

/**
 * Get UTM parameters from current URL
 */
export function getUtmParameters(): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
} {
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    utm_source: urlParams.get('utm_source') || urlParams.get('source') || urlParams.get('ref') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
  };
}

/**
 * Get referrer URL and parse it
 */
export function getReferrerInfo(): {
  referrer_url?: string;
  referrer_source?: string;
} {
  const referrer = document.referrer;
  
  if (!referrer) {
    return {};
  }
  
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
    
    // Check for matches
    for (const [domain, source] of Object.entries(referrerMap)) {
      if (hostname.includes(domain)) {
        return {
          referrer_url: referrer,
          referrer_source: source
        };
      }
    }
    
    return {
      referrer_url: referrer,
      referrer_source: hostname.split('.')[0]
    };
  } catch {
    return { referrer_url: referrer };
  }
}

/**
 * Get referral code from URL
 */
export function getReferralCode(): string | undefined {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('ref') || urlParams.get('referral') || undefined;
}

/**
 * Complete landing page context for profile creation
 */
export function getLandingPageContext() {
  const landingInfo = detectLandingPageSource();
  const utmParams = getUtmParameters();
  const referralCode = getReferralCode();
  const referrerInfo = getReferrerInfo();
  
  // Priority: UTM source > referrer source > landing page source
  const finalSource = utmParams.utm_source || referrerInfo.referrer_source || landingInfo.source;
  
  console.log('📋 Complete landing page context:', {
    landing_page_source: finalSource,
    klaviyo_list_id: landingInfo.klaviyoListId,
    ...utmParams,
    referral_code: referralCode,
    ...referrerInfo
  });
  
  return {
    landing_page_source: finalSource,
    klaviyo_list_id: landingInfo.klaviyoListId,
    ...utmParams,
    referral_code: referralCode,
    referrer_url: referrerInfo.referrer_url
  };
}