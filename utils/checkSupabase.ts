import { supabase } from '../integrations/supabase/client';

export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    // Simple health check query
    const { error } = await supabase
      .from('properties')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (err) {
    console.error('Failed to connect to Supabase:', err);
    return false;
  }
}