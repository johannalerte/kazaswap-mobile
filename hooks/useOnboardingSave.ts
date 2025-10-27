/**
 * Frontend Fix for Multiple save_onboarding_step Calls
 * 
 * This file contains utilities to prevent duplicate API calls
 * when saving onboarding steps in your Lovable app.
 * 
 * PROBLEM: The save_onboarding_step function is being called
 * multiple times (6+ times) causing 10+ second delays.
 * 
 * SOLUTION: Implement debouncing and request deduplication
 * on the frontend to prevent unnecessary API calls.
 */

import { useCallback, useRef, useState } from 'react';
import { supabase } from '../integrations/supabase/client';

/**
 * Custom hook for debounced onboarding step saves
 * Prevents multiple rapid API calls to save_onboarding_step
 */
export function useOnboardingSave() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveRef = useRef<{
    step: number;
    dataHash: string;
    timestamp: number;
  } | null>(null);

  /**
   * Debounced save function with deduplication
   * @param step - The onboarding step number (1-4)
   * @param data - The step data to save
   * @param completeStep - Whether to mark the step as complete
   * @param immediate - Force immediate save (bypass debouncing)
   */
  const saveStep = useCallback(
    async (
      step: number,
      data: any,
      completeStep: boolean = false,
      immediate: boolean = false
    ) => {
      // Generate a hash of the data for deduplication
      const dataHash = JSON.stringify({ step, data, completeStep });
      const now = Date.now();

      console.log(`🔄 saveStep called - Step: ${step}, Complete: ${completeStep}, Immediate: ${immediate}`);

      // Check if this is a duplicate request within 2 seconds
      if (lastSaveRef.current) {
        const timeSinceLastSave = now - lastSaveRef.current.timestamp;
        const isSameData = lastSaveRef.current.dataHash === dataHash;
        
        if (isSameData && timeSinceLastSave < 2000) {
          console.log('⏭️ Skipping duplicate save request - same data within 2 seconds');
          return { success: true, cached: true };
        }
      }

      // Clear any pending save
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        console.log('🧹 Cleared pending save timeout');
      }

      // Function to actually perform the save
      const performSave = async () => {
        setIsSaving(true);
        setError(null);

        try {
          console.log(`📡 Calling save_onboarding_step RPC - Step: ${step}`);
          const { data: result, error: saveError } = await supabase.rpc(
            'save_onboarding_step',
            {
              p_step: step,
              p_data: data,
              p_complete_step: completeStep
            }
          );

          if (saveError) throw saveError;

          console.log(`✅ Save successful - Step: ${step}`);

          // Update last save reference
          lastSaveRef.current = {
            step,
            dataHash,
            timestamp: Date.now()
          };

          setIsSaving(false);
          return result;
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Save failed';
          console.error(`❌ Save failed - Step: ${step}, Error:`, errorMessage);
          setError(errorMessage);
          setIsSaving(false);
          throw err;
        }
      };

      // If immediate save is requested, bypass debouncing
      if (immediate) {
        console.log('⚡ Immediate save requested - bypassing debounce');
        return await performSave();
      }

      // Otherwise, debounce the save (wait 1 second before saving)
      console.log('⏳ Debouncing save - waiting 1 second');
      return new Promise((resolve, reject) => {
        timeoutRef.current = setTimeout(async () => {
          try {
            const result = await performSave();
            resolve(result);
          } catch (err) {
            reject(err);
          }
        }, 1000); // 1 second debounce
      });
    },
    []
  );

  /**
   * Cancel any pending saves
   */
  const cancelPendingSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    saveStep,
    cancelPendingSave,
    isSaving,
    error
  };
}

export default useOnboardingSave;
