import { useEffect } from 'react';
import { storeReferralData } from '../utils/referralTracking';

/**
 * Hook to automatically capture referral data on component mount
 * Should be used in the root/landing page component
 */
export const useReferralTracking = () => {
  useEffect(() => {
    // Capture referral data on first visit
    storeReferralData();
  }, []);
};
