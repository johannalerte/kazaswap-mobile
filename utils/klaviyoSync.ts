import { supabase } from '../integrations/supabase/client';

export const syncUsersToKlaviyo = async (forceSync = false) => {
  try {
    console.log('🎯 Starting Klaviyo sync...', forceSync ? '(FORCE SYNC)' : '');
    
    const { data, error } = await supabase.functions.invoke('sync-klaviyo-users', {
      body: { force_sync: forceSync }
    });
    
    if (error) {
      console.error('❌ Klaviyo sync error:', error);
      throw error;
    }
    
    console.log('✅ Klaviyo sync result:', data);
    return data;
  } catch (error) {
    console.error('💥 Failed to sync users to Klaviyo:', error);
    throw error;
  }
};

export const syncAbandonedUsersToKlaviyo = async (hours_since_activity = 24, step = null, limit = 100, force_sync = false) => {
  try {
    console.log('🎯 Starting abandoned users Klaviyo sync...', { hours_since_activity, step, limit, force_sync });
    
    const { data, error } = await supabase.functions.invoke('sync-abandoned-klaviyo', {
      body: { 
        hours_since_activity,
        step,
        limit,
        force_sync 
      }
    });
    
    if (error) {
      console.error('❌ Abandoned users sync error:', error);
      throw error;
    }
    
    console.log('✅ Abandoned users sync result:', data);
    return data;
  } catch (error) {
    console.error('💥 Failed to sync abandoned users to Klaviyo:', error);
    throw error;
  }
};

export const testKlaviyoSync = async (forceSync = false) => {
  try {
    const result = await syncUsersToKlaviyo(forceSync);
    console.log('Test complete:', result);
    return result;
  } catch (error) {
    console.error('Test failed:', error);
    return { error: error.message };
  }
};

export const testAbandonedSync = async () => {
  try {
    const result = await syncAbandonedUsersToKlaviyo(1); // 1 hour since activity
    console.log('Abandoned sync test complete:', result);
    return result;
  } catch (error) {
    console.error('Abandoned sync test failed:', error);
    return { error: error.message };
  }
};