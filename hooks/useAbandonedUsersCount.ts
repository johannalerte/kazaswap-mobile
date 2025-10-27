import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export const useAbandonedUsersCount = (isAdmin: boolean) => {
  const [abandonedUsersCount, setAbandonedUsersCount] = useState(0);

  useEffect(() => {
    const fetchAbandonedUsers = async () => {
      if (!isAdmin) return;
      
      try {
        const { data, error } = await supabase
          .from('abandoned_onboardings')
          .select('user_id, last_activity_at')
          .order('last_activity_at', { ascending: false });

        if (error) {
          console.error('Error fetching abandoned users:', error);
          return;
        }

        // Count users abandoned less than 3 hours ago
        const newAbandonedCount = (data || []).filter(user => {
          if (!user.last_activity_at) return false;
          const lastActivity = new Date(user.last_activity_at);
          const now = new Date();
          const hoursDiff = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);
          return hoursDiff < 3;
        }).length;

        setAbandonedUsersCount(newAbandonedCount);
      } catch (error) {
        console.error('Error fetching abandoned users:', error);
      }
    };

    fetchAbandonedUsers();
    // Refresh every 5 minutes
    const interval = setInterval(fetchAbandonedUsers, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  return abandonedUsersCount;
};
