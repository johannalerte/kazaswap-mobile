import { supabase } from '../integrations/supabase/client';

export interface LogActivityParams {
  actionType: string;
  description: string;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, any>;
}

/**
 * Logs an admin activity to the admin_activity_log table
 * This should be called after any admin action like approving users, editing properties, etc.
 */
export async function logAdminActivity({
  actionType,
  description,
  targetType,
  targetId,
  metadata
}: LogActivityParams): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('Cannot log admin activity: No authenticated user');
      return;
    }

    const { error } = await supabase
      .from('admin_activity_log')
      .insert({
        admin_id: user.id,
        action_type: actionType,
        description,
        target_type: targetType,
        target_id: targetId,
        metadata: metadata || null
      });

    if (error) {
      console.error('Error logging admin activity:', error);
    }
  } catch (error) {
    console.error('Error in logAdminActivity:', error);
  }
}

/**
 * Common action types for consistency
 */
export const AdminActionTypes = {
  // User actions
  USER_APPROVED: 'user_approved',
  USER_REJECTED: 'user_rejected',
  USER_DELETED: 'user_deleted',
  USER_EDITED: 'user_edited',
  USER_CREDITS_ADJUSTED: 'user_credits_adjusted',

  // Property actions
  PROPERTY_APPROVED: 'property_approved',
  PROPERTY_REJECTED: 'property_rejected',
  PROPERTY_EDITED: 'property_edited',
  PROPERTY_DELETED: 'property_deleted',
  PROPERTY_FEATURED: 'property_featured',
  PROPERTY_UNFEATURED: 'property_unfeatured',

  // Credit actions
  CREDITS_ADDED: 'credits_added',
  CREDITS_DEDUCTED: 'credits_deducted',

  // Booking actions
  BOOKING_CANCELLED: 'booking_cancelled',
  BOOKING_MODIFIED: 'booking_modified',

  // System actions
  SETTINGS_CHANGED: 'settings_changed',
  BULK_ACTION: 'bulk_action',
} as const;
