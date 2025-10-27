import { supabase } from '../integrations/supabase/client';

export const cleanupTestUsers = async () => {
  console.log('Starting cleanup of test users...');
  
  try {
    const { data, error } = await supabase.functions.invoke('cleanup-test-users', {
      body: {}
    });

    if (error) {
      console.error('Cleanup error:', error);
      return { success: false, error: error.message };
    }

    console.log('Cleanup completed:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected cleanup error:', error);
    return { success: false, error: error.message };
  }
};

// Auto-cleanup removed to prevent page load issues