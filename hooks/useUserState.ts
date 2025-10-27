import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../integrations/supabase/client';

export type AppUserState = 'onboarding' | 'prompt_avatar' | 'dashboard' | 'waiting_approval';

interface UserStateResponse {
  user_state: AppUserState;
}

export const useUserState = () => {
  const [data, setData] = useState<UserStateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.rpc('get_my_user_state' as any);
      if (error) throw new Error(error.message);
      setData(data as UserStateResponse);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
};