export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      abandonment_check_logs: {
        Row: {
          check_type: string
          created_at: string | null
          emails_queued: number | null
          error_message: string | null
          execution_time_ms: number | null
          id: string
          metadata: Json | null
          success: boolean | null
          users_detected: number | null
        }
        Insert: {
          check_type: string
          created_at?: string | null
          emails_queued?: number | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          metadata?: Json | null
          success?: boolean | null
          users_detected?: number | null
        }
        Update: {
          check_type?: string
          created_at?: string | null
          emails_queued?: number | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          metadata?: Json | null
          success?: boolean | null
          users_detected?: number | null
        }
        Relationships: []
      }
      abandonment_cron_runs: {
        Row: {
          created_at: string | null
          emails_sent: number | null
          errors: string | null
          execution_time_ms: number | null
          id: string
          result_data: Json | null
          run_time: string | null
          sms_sent: number | null
          users_processed: number | null
        }
        Insert: {
          created_at?: string | null
          emails_sent?: number | null
          errors?: string | null
          execution_time_ms?: number | null
          id?: string
          result_data?: Json | null
          run_time?: string | null
          sms_sent?: number | null
          users_processed?: number | null
        }
        Update: {
          created_at?: string | null
          emails_sent?: number | null
          errors?: string | null
          execution_time_ms?: number | null
          id?: string
          result_data?: Json | null
          run_time?: string | null
          sms_sent?: number | null
          users_processed?: number | null
        }
        Relationships: []
      }
      admin_user_deletion_guide: {
        Row: {
          content: string
          created_at: string | null
          example_usage: string | null
          id: number
          section: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          example_usage?: string | null
          id?: number
          section: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          example_usage?: string | null
          id?: number
          section?: string
          title?: string
        }
        Relationships: []
      }
      amenities: {
        Row: {
          created_at: string
          is_active: boolean
          key: string
          label: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          is_active?: boolean
          key: string
          label: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          is_active?: boolean
          key?: string
          label?: string
          sort_order?: number
        }
        Relationships: []
      }
      app_config: {
        Row: {
          created_at: string | null
          id: string
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          author: string
          category: string
          content: string
          cover_image: string | null
          created_at: string
          created_by: string | null
          excerpt: string | null
          id: string
          read_time: string | null
          slug: string
          status: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          author?: string
          category: string
          content: string
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          id?: string
          read_time?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          author?: string
          category?: string
          content?: string
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          id?: string
          read_time?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      availability_slots: {
        Row: {
          created_at: string
          end_date: string
          id: string
          property_id: string
          start_date: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          property_id: string
          start_date: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          property_id?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_slots_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "availability_slots_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "availability_slots_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "availability_slots_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "availability_slots_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "availability_slots_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "availability_slots_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "availability_slots_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          checked_in_at: string | null
          checked_out_at: string | null
          created_at: string
          credits_spent: number
          end_date: string
          guest_id: string
          host_credits_awarded: boolean | null
          host_credits_awarded_at: string | null
          host_id: string
          id: string
          property_id: string
          start_date: string
          status: string
          swap_request_id: string
          total_nights: number
          updated_at: string
        }
        Insert: {
          checked_in_at?: string | null
          checked_out_at?: string | null
          created_at?: string
          credits_spent: number
          end_date: string
          guest_id: string
          host_credits_awarded?: boolean | null
          host_credits_awarded_at?: string | null
          host_id: string
          id?: string
          property_id: string
          start_date: string
          status?: string
          swap_request_id: string
          total_nights: number
          updated_at?: string
        }
        Update: {
          checked_in_at?: string | null
          checked_out_at?: string | null
          created_at?: string
          credits_spent?: number
          end_date?: string
          guest_id?: string
          host_credits_awarded?: boolean | null
          host_credits_awarded_at?: string | null
          host_id?: string
          id?: string
          property_id?: string
          start_date?: string
          status?: string
          swap_request_id?: string
          total_nights?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_swap_request_id_fkey"
            columns: ["swap_request_id"]
            isOneToOne: false
            referencedRelation: "active_swap_requests_with_credits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_swap_request_id_fkey"
            columns: ["swap_request_id"]
            isOneToOne: false
            referencedRelation: "swap_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_swap_request_id_fkey"
            columns: ["swap_request_id"]
            isOneToOne: false
            referencedRelation: "swap_requests_with_expiry"
            referencedColumns: ["id"]
          },
        ]
      }
      cache_refresh_queue: {
        Row: {
          created_at: string | null
          id: string
          last_refresh: string | null
          needs_refresh: boolean | null
          table_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_refresh?: string | null
          needs_refresh?: boolean | null
          table_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_refresh?: string | null
          needs_refresh?: boolean | null
          table_name?: string
        }
        Relationships: []
      }
      chat_access: {
        Row: {
          created_at: string | null
          enabled: boolean | null
          guest_id: string
          host_id: string
          id: string
          property_id: string
          swap_request_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean | null
          guest_id: string
          host_id: string
          id?: string
          property_id: string
          swap_request_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          enabled?: boolean | null
          guest_id?: string
          host_id?: string
          id?: string
          property_id?: string
          swap_request_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_access_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "abandoned_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_access_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "admin_users_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_access_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "onboarding_abandonment_realtime"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_access_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_access_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "user_onboarding_state"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_access_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "user_onboarding_status"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_access_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "abandoned_users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_access_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "admin_users_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_access_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "onboarding_abandonment_realtime"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_access_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_access_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "user_onboarding_state"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_access_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "user_onboarding_status"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "chat_access_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_access_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_access_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_access_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_access_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_access_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "chat_access_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "chat_access_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_access_swap_request_id_fkey"
            columns: ["swap_request_id"]
            isOneToOne: true
            referencedRelation: "active_swap_requests_with_credits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_access_swap_request_id_fkey"
            columns: ["swap_request_id"]
            isOneToOne: true
            referencedRelation: "swap_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_access_swap_request_id_fkey"
            columns: ["swap_request_id"]
            isOneToOne: true
            referencedRelation: "swap_requests_with_expiry"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          is_archived: boolean
          last_message_at: string | null
          swap_request_id: string | null
          updated_at: string
          user1_id: string
          user2_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_archived?: boolean
          last_message_at?: string | null
          swap_request_id?: string | null
          updated_at?: string
          user1_id: string
          user2_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_archived?: boolean
          last_message_at?: string | null
          swap_request_id?: string | null
          updated_at?: string
          user1_id?: string
          user2_id?: string
        }
        Relationships: []
      }
      credit_correction_audit: {
        Row: {
          corrected_at: string | null
          corrected_by: string | null
          correction_reason: string | null
          credits_after: number | null
          credits_before: number | null
          credits_restored: number | null
          email: string | null
          id: string
          user_id: string
        }
        Insert: {
          corrected_at?: string | null
          corrected_by?: string | null
          correction_reason?: string | null
          credits_after?: number | null
          credits_before?: number | null
          credits_restored?: number | null
          email?: string | null
          id?: string
          user_id: string
        }
        Update: {
          corrected_at?: string | null
          corrected_by?: string | null
          correction_reason?: string | null
          credits_after?: number | null
          credits_before?: number | null
          credits_restored?: number | null
          email?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string
          description: string
          id: string
          processed_at: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string
          description: string
          id?: string
          processed_at?: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string
          description?: string
          id?: string
          processed_at?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      critical_function_registry: {
        Row: {
          alert_threshold_hours: number | null
          created_at: string | null
          description: string
          expected_frequency: string | null
          function_name: string
          function_type: string
          id: string
          last_execution_at: string | null
          last_execution_count: number | null
          metadata: Json | null
          monitoring_enabled: boolean | null
          status: string | null
          status_message: string | null
          updated_at: string | null
        }
        Insert: {
          alert_threshold_hours?: number | null
          created_at?: string | null
          description: string
          expected_frequency?: string | null
          function_name: string
          function_type: string
          id?: string
          last_execution_at?: string | null
          last_execution_count?: number | null
          metadata?: Json | null
          monitoring_enabled?: boolean | null
          status?: string | null
          status_message?: string | null
          updated_at?: string | null
        }
        Update: {
          alert_threshold_hours?: number | null
          created_at?: string | null
          description?: string
          expected_frequency?: string | null
          function_name?: string
          function_type?: string
          id?: string
          last_execution_at?: string | null
          last_execution_count?: number | null
          metadata?: Json | null
          monitoring_enabled?: boolean | null
          status?: string | null
          status_message?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cron_jobs: {
        Row: {
          created_at: string | null
          description: string | null
          enabled: boolean | null
          function_name: string
          id: string
          job_name: string
          last_run: string | null
          next_run: string | null
          schedule: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          function_name: string
          id?: string
          job_name: string
          last_run?: string | null
          next_run?: string | null
          schedule: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          function_name?: string
          id?: string
          job_name?: string
          last_run?: string | null
          next_run?: string | null
          schedule?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      developer_notes: {
        Row: {
          created_at: string | null
          id: string
          note: string
          topic: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          note: string
          topic: string
        }
        Update: {
          created_at?: string | null
          id?: string
          note?: string
          topic?: string
        }
        Relationships: []
      }
      duplicate_signup_attempts: {
        Row: {
          attempted_at: string | null
          attempted_provider: string | null
          email: string
          existing_provider: string | null
          id: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          attempted_at?: string | null
          attempted_provider?: string | null
          email: string
          existing_provider?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          attempted_at?: string | null
          attempted_provider?: string | null
          email?: string
          existing_provider?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      email_queue: {
        Row: {
          attempts: number | null
          created_at: string | null
          email_type: string
          error_message: string | null
          id: string
          max_attempts: number | null
          priority: number | null
          recipient_email: string
          recipient_name: string | null
          scheduled_at: string | null
          sent_at: string | null
          status: string | null
          template_data: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          attempts?: number | null
          created_at?: string | null
          email_type: string
          error_message?: string | null
          id?: string
          max_attempts?: number | null
          priority?: number | null
          recipient_email: string
          recipient_name?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          template_data?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          attempts?: number | null
          created_at?: string | null
          email_type?: string
          error_message?: string | null
          id?: string
          max_attempts?: number | null
          priority?: number | null
          recipient_email?: string
          recipient_name?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          template_data?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      email_system_control: {
        Row: {
          disabled_at: string | null
          disabled_by: string | null
          emails_enabled: boolean
          id: number
          reason: string | null
          updated_at: string | null
        }
        Insert: {
          disabled_at?: string | null
          disabled_by?: string | null
          emails_enabled?: boolean
          id?: number
          reason?: string | null
          updated_at?: string | null
        }
        Update: {
          disabled_at?: string | null
          disabled_by?: string | null
          emails_enabled?: boolean
          id?: number
          reason?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      featured_destinations: {
        Row: {
          city: string
          country: string
          created_at: string | null
          custom_description: string | null
          custom_image_url: string | null
          destination_name: string | null
          display_order: number
          featured_at: string | null
          featured_by: string | null
          highlight_color: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          city: string
          country: string
          created_at?: string | null
          custom_description?: string | null
          custom_image_url?: string | null
          destination_name?: string | null
          display_order?: number
          featured_at?: string | null
          featured_by?: string | null
          highlight_color?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          city?: string
          country?: string
          created_at?: string | null
          custom_description?: string | null
          custom_image_url?: string | null
          destination_name?: string | null
          display_order?: number
          featured_at?: string | null
          featured_by?: string | null
          highlight_color?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      featured_properties: {
        Row: {
          created_at: string | null
          featured_at: string | null
          featured_by: string | null
          id: string
          is_active: boolean | null
          position: number
          property_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          featured_at?: string | null
          featured_by?: string | null
          id?: string
          is_active?: boolean | null
          position?: number
          property_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          featured_at?: string | null
          featured_by?: string | null
          id?: string
          is_active?: boolean | null
          position?: number
          property_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "featured_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "featured_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "featured_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "featured_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "featured_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "featured_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "featured_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "featured_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      function_call_tracking: {
        Row: {
          call_data: Json | null
          call_time: string | null
          function_name: string
          id: string
          user_id: string
        }
        Insert: {
          call_data?: Json | null
          call_time?: string | null
          function_name: string
          id?: string
          user_id: string
        }
        Update: {
          call_data?: Json | null
          call_time?: string | null
          function_name?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      function_execution_logs: {
        Row: {
          created_at: string | null
          duration_ms: number | null
          error_message: string | null
          execution_context: Json | null
          execution_type: string
          function_name: string
          id: string
          related_record_id: string | null
          related_table: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          execution_context?: Json | null
          execution_type: string
          function_name: string
          id?: string
          related_record_id?: string | null
          related_table?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          execution_context?: Json | null
          execution_type?: string
          function_name?: string
          id?: string
          related_record_id?: string | null
          related_table?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      function_monitoring_alerts: {
        Row: {
          acknowledged: boolean | null
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_type: string
          created_at: string | null
          details: Json | null
          function_name: string
          id: string
          message: string
          resolved: boolean | null
          resolved_at: string | null
          severity: string
        }
        Insert: {
          acknowledged?: boolean | null
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type: string
          created_at?: string | null
          details?: Json | null
          function_name: string
          id?: string
          message: string
          resolved?: boolean | null
          resolved_at?: string | null
          severity: string
        }
        Update: {
          acknowledged?: boolean | null
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: string
          created_at?: string | null
          details?: Json | null
          function_name?: string
          id?: string
          message?: string
          resolved?: boolean | null
          resolved_at?: string | null
          severity?: string
        }
        Relationships: []
      }
      help_tutorials: {
        Row: {
          category: string
          content: string
          cover_image: string | null
          created_at: string | null
          created_by: string | null
          excerpt: string | null
          id: string
          last_updated: string | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          updated_by: string | null
          views_count: number | null
        }
        Insert: {
          category: string
          content: string
          cover_image?: string | null
          created_at?: string | null
          created_by?: string | null
          excerpt?: string | null
          id?: string
          last_updated?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
          views_count?: number | null
        }
        Update: {
          category?: string
          content?: string
          cover_image?: string | null
          created_at?: string | null
          created_by?: string | null
          excerpt?: string | null
          id?: string
          last_updated?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      image_migration_log: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          new_bucket: string
          new_path: string | null
          old_bucket: string
          old_path: string
          record_id: string | null
          status: string | null
          table_name: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          new_bucket: string
          new_path?: string | null
          old_bucket: string
          old_path: string
          record_id?: string | null
          status?: string | null
          table_name?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          new_bucket?: string
          new_path?: string | null
          old_bucket?: string
          old_path?: string
          record_id?: string | null
          status?: string | null
          table_name?: string | null
        }
        Relationships: []
      }
      image_upload_issues: {
        Row: {
          actual_count: number | null
          detected_at: string | null
          error_details: string | null
          expected_count: number | null
          id: string
          issue_type: string | null
          property_id: string | null
          resolution_notes: string | null
          resolved: boolean | null
          resolved_at: string | null
          step_3_data: Json | null
          user_id: string | null
        }
        Insert: {
          actual_count?: number | null
          detected_at?: string | null
          error_details?: string | null
          expected_count?: number | null
          id?: string
          issue_type?: string | null
          property_id?: string | null
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          step_3_data?: Json | null
          user_id?: string | null
        }
        Update: {
          actual_count?: number | null
          detected_at?: string | null
          error_details?: string | null
          expected_count?: number | null
          id?: string
          issue_type?: string | null
          property_id?: string | null
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          step_3_data?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "image_upload_issues_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_issues_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_issues_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_issues_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_issues_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_issues_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "image_upload_issues_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "image_upload_issues_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      image_upload_logs: {
        Row: {
          attempt_time: string | null
          error_message: string | null
          id: string
          image_count: number | null
          metadata: Json | null
          property_id: string | null
          success: boolean | null
          user_id: string | null
        }
        Insert: {
          attempt_time?: string | null
          error_message?: string | null
          id?: string
          image_count?: number | null
          metadata?: Json | null
          property_id?: string | null
          success?: boolean | null
          user_id?: string | null
        }
        Update: {
          attempt_time?: string | null
          error_message?: string | null
          id?: string
          image_count?: number | null
          metadata?: Json | null
          property_id?: string | null
          success?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "image_upload_logs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_logs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_logs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_logs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_logs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_logs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "image_upload_logs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "image_upload_logs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      image_upload_queue: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          image_url: string
          is_main: boolean | null
          processed_at: string | null
          property_id: string | null
          retry_count: number | null
          status: string | null
          storage_bucket: string | null
          storage_path: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          image_url: string
          is_main?: boolean | null
          processed_at?: string | null
          property_id?: string | null
          retry_count?: number | null
          status?: string | null
          storage_bucket?: string | null
          storage_path?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          image_url?: string
          is_main?: boolean | null
          processed_at?: string | null
          property_id?: string | null
          retry_count?: number | null
          status?: string | null
          storage_bucket?: string | null
          storage_path?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "image_upload_queue_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_queue_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_queue_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_queue_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_queue_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "image_upload_queue_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "image_upload_queue_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "image_upload_queue_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      image_variants: {
        Row: {
          created_at: string | null
          file_size_bytes: number | null
          height: number | null
          id: string
          image_url: string
          mime_type: string | null
          original_image_id: string | null
          variant_type: string
          width: number | null
        }
        Insert: {
          created_at?: string | null
          file_size_bytes?: number | null
          height?: number | null
          id?: string
          image_url: string
          mime_type?: string | null
          original_image_id?: string | null
          variant_type: string
          width?: number | null
        }
        Update: {
          created_at?: string | null
          file_size_bytes?: number | null
          height?: number | null
          id?: string
          image_url?: string
          mime_type?: string | null
          original_image_id?: string | null
          variant_type?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "image_variants_original_image_id_fkey"
            columns: ["original_image_id"]
            isOneToOne: false
            referencedRelation: "property_images"
            referencedColumns: ["id"]
          },
        ]
      }
      landing_page_visits: {
        Row: {
          created_at: string | null
          hostname: string | null
          id: string
          landing_page_source: string
          landing_url: string | null
          referrer: string | null
          screen_resolution: string | null
          timestamp: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          created_at?: string | null
          hostname?: string | null
          id?: string
          landing_page_source: string
          landing_url?: string | null
          referrer?: string | null
          screen_resolution?: string | null
          timestamp?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          created_at?: string | null
          hostname?: string | null
          id?: string
          landing_page_source?: string
          landing_url?: string | null
          referrer?: string | null
          screen_resolution?: string | null
          timestamp?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      magic_link_tokens: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          purpose: string
          token: string
          used: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          purpose?: string
          token: string
          used?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          purpose?: string
          token?: string
          used?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      marketing_funnel_tracking: {
        Row: {
          abandoned_at: string | null
          abandonment_reason: string | null
          account_created_at: string | null
          created_at: string | null
          current_step: string | null
          device_info: Json | null
          email: string | null
          email_entered_at: string | null
          first_name: string | null
          funnel_stage: string | null
          id: string
          ip_address: string | null
          is_abandoned: boolean | null
          is_completed: boolean | null
          landed_at: string | null
          landing_page_source: string | null
          last_activity_at: string | null
          last_name: string | null
          onboarding_completed_at: string | null
          onboarding_started_at: string | null
          phone_number: string | null
          referrer: string | null
          session_id: string | null
          signup_started_at: string | null
          steps_completed: string[] | null
          total_steps_available: number | null
          updated_at: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          visitor_id: string | null
        }
        Insert: {
          abandoned_at?: string | null
          abandonment_reason?: string | null
          account_created_at?: string | null
          created_at?: string | null
          current_step?: string | null
          device_info?: Json | null
          email?: string | null
          email_entered_at?: string | null
          first_name?: string | null
          funnel_stage?: string | null
          id?: string
          ip_address?: string | null
          is_abandoned?: boolean | null
          is_completed?: boolean | null
          landed_at?: string | null
          landing_page_source?: string | null
          last_activity_at?: string | null
          last_name?: string | null
          onboarding_completed_at?: string | null
          onboarding_started_at?: string | null
          phone_number?: string | null
          referrer?: string | null
          session_id?: string | null
          signup_started_at?: string | null
          steps_completed?: string[] | null
          total_steps_available?: number | null
          updated_at?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          visitor_id?: string | null
        }
        Update: {
          abandoned_at?: string | null
          abandonment_reason?: string | null
          account_created_at?: string | null
          created_at?: string | null
          current_step?: string | null
          device_info?: Json | null
          email?: string | null
          email_entered_at?: string | null
          first_name?: string | null
          funnel_stage?: string | null
          id?: string
          ip_address?: string | null
          is_abandoned?: boolean | null
          is_completed?: boolean | null
          landed_at?: string | null
          landing_page_source?: string | null
          last_activity_at?: string | null
          last_name?: string | null
          onboarding_completed_at?: string | null
          onboarding_started_at?: string | null
          phone_number?: string | null
          referrer?: string | null
          session_id?: string | null
          signup_started_at?: string | null
          steps_completed?: string[] | null
          total_steps_available?: number | null
          updated_at?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
      message_reactions: {
        Row: {
          created_at: string | null
          emoji: string
          id: string
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          emoji: string
          id?: string
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          emoji?: string
          id?: string
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          image_url: string | null
          message_type: string
          read_at: string | null
          sender_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          image_url?: string | null
          message_type?: string
          read_at?: string | null
          sender_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          image_url?: string | null
          message_type?: string
          read_at?: string | null
          sender_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoring_cron_config: {
        Row: {
          alert_email: string | null
          alert_thresholds: Json | null
          alert_webhook: string | null
          created_at: string | null
          enabled: boolean | null
          id: string
          job_name: string
          last_run: string | null
          next_run: string | null
          schedule: string
          updated_at: string | null
        }
        Insert: {
          alert_email?: string | null
          alert_thresholds?: Json | null
          alert_webhook?: string | null
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          job_name: string
          last_run?: string | null
          next_run?: string | null
          schedule: string
          updated_at?: string | null
        }
        Update: {
          alert_email?: string | null
          alert_thresholds?: Json | null
          alert_webhook?: string | null
          created_at?: string | null
          enabled?: boolean | null
          id?: string
          job_name?: string
          last_run?: string | null
          next_run?: string | null
          schedule?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      nearby_activities: {
        Row: {
          address: string | null
          business_status: string | null
          category: string
          created_at: string | null
          distance_meters: number | null
          google_url: string | null
          id: string
          last_updated_from_google: string | null
          latitude: number | null
          longitude: number | null
          name: string
          opening_hours: Json | null
          phone: string | null
          photos: string[] | null
          place_id: string | null
          price_level: number | null
          property_id: string | null
          rating: number | null
          types: string[] | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          business_status?: string | null
          category: string
          created_at?: string | null
          distance_meters?: number | null
          google_url?: string | null
          id?: string
          last_updated_from_google?: string | null
          latitude?: number | null
          longitude?: number | null
          name: string
          opening_hours?: Json | null
          phone?: string | null
          photos?: string[] | null
          place_id?: string | null
          price_level?: number | null
          property_id?: string | null
          rating?: number | null
          types?: string[] | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          business_status?: string | null
          category?: string
          created_at?: string | null
          distance_meters?: number | null
          google_url?: string | null
          id?: string
          last_updated_from_google?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          opening_hours?: Json | null
          phone?: string | null
          photos?: string[] | null
          place_id?: string | null
          price_level?: number | null
          property_id?: string | null
          rating?: number | null
          types?: string[] | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nearby_activities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nearby_activities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nearby_activities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nearby_activities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nearby_activities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nearby_activities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "nearby_activities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "nearby_activities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          destination_city: string | null
          email: string
          first_name: string | null
          id: string
          ip_address: string | null
          klaviyo_profile_id: string | null
          klaviyo_sent: boolean | null
          klaviyo_sent_at: string | null
          landing_page_source: string
          last_name: string | null
          metadata: Json | null
          referrer: string | null
          status: string | null
          updated_at: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          created_at?: string | null
          destination_city?: string | null
          email: string
          first_name?: string | null
          id?: string
          ip_address?: string | null
          klaviyo_profile_id?: string | null
          klaviyo_sent?: boolean | null
          klaviyo_sent_at?: string | null
          landing_page_source?: string
          last_name?: string | null
          metadata?: Json | null
          referrer?: string | null
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          created_at?: string | null
          destination_city?: string | null
          email?: string
          first_name?: string | null
          id?: string
          ip_address?: string | null
          klaviyo_profile_id?: string | null
          klaviyo_sent?: boolean | null
          klaviyo_sent_at?: string | null
          landing_page_source?: string
          last_name?: string | null
          metadata?: Json | null
          referrer?: string | null
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      notification_settings: {
        Row: {
          created_at: string | null
          enabled: boolean
          id: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          enabled?: boolean
          id?: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          enabled?: boolean
          id?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          data: Json | null
          id: string
          idempotency_key: string | null
          read_at: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          data?: Json | null
          id?: string
          idempotency_key?: string | null
          read_at?: string | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          data?: Json | null
          id?: string
          idempotency_key?: string | null
          read_at?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      onboarding_abandonment_config: {
        Row: {
          created_at: string | null
          final_email_after_hours: number | null
          first_email_after_hours: number | null
          hours_until_abandoned: number
          id: string
          second_email_after_hours: number | null
          step: number
        }
        Insert: {
          created_at?: string | null
          final_email_after_hours?: number | null
          first_email_after_hours?: number | null
          hours_until_abandoned?: number
          id?: string
          second_email_after_hours?: number | null
          step: number
        }
        Update: {
          created_at?: string | null
          final_email_after_hours?: number | null
          first_email_after_hours?: number | null
          hours_until_abandoned?: number
          id?: string
          second_email_after_hours?: number | null
          step?: number
        }
        Relationships: []
      }
      onboarding_abandonment_emails: {
        Row: {
          clicked_at: string | null
          created_at: string | null
          email_type: string | null
          id: string
          onboarding_id: string | null
          opened_at: string | null
          resulted_in_completion: boolean | null
          sent_at: string | null
          step_abandoned: number
          user_id: string | null
        }
        Insert: {
          clicked_at?: string | null
          created_at?: string | null
          email_type?: string | null
          id?: string
          onboarding_id?: string | null
          opened_at?: string | null
          resulted_in_completion?: boolean | null
          sent_at?: string | null
          step_abandoned: number
          user_id?: string | null
        }
        Update: {
          clicked_at?: string | null
          created_at?: string | null
          email_type?: string | null
          id?: string
          onboarding_id?: string | null
          opened_at?: string | null
          resulted_in_completion?: boolean | null
          sent_at?: string | null
          step_abandoned?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_abandonment_emails_onboarding_id_fkey"
            columns: ["onboarding_id"]
            isOneToOne: false
            referencedRelation: "property_onboarding"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_abandonment_events: {
        Row: {
          abandonment_type: string | null
          created_at: string | null
          detected_at: string | null
          email_sent: boolean | null
          email_sent_at: string | null
          id: string
          minutes_on_step: number | null
          returned_at: string | null
          step_abandoned: number | null
          user_id: string | null
          user_returned: boolean | null
        }
        Insert: {
          abandonment_type?: string | null
          created_at?: string | null
          detected_at?: string | null
          email_sent?: boolean | null
          email_sent_at?: string | null
          id?: string
          minutes_on_step?: number | null
          returned_at?: string | null
          step_abandoned?: number | null
          user_id?: string | null
          user_returned?: boolean | null
        }
        Update: {
          abandonment_type?: string | null
          created_at?: string | null
          detected_at?: string | null
          email_sent?: boolean | null
          email_sent_at?: string | null
          id?: string
          minutes_on_step?: number | null
          returned_at?: string | null
          step_abandoned?: number | null
          user_id?: string | null
          user_returned?: boolean | null
        }
        Relationships: []
      }
      onboarding_abandonment_tracking: {
        Row: {
          abandoned_at: string | null
          created_at: string | null
          current_step: number
          email_sent_at: string | null
          id: string
          last_activity_at: string
          magic_link_expires_at: string | null
          magic_link_token: string | null
          user_id: string
        }
        Insert: {
          abandoned_at?: string | null
          created_at?: string | null
          current_step?: number
          email_sent_at?: string | null
          id?: string
          last_activity_at?: string
          magic_link_expires_at?: string | null
          magic_link_token?: string | null
          user_id: string
        }
        Update: {
          abandoned_at?: string | null
          created_at?: string | null
          current_step?: number
          email_sent_at?: string | null
          id?: string
          last_activity_at?: string
          magic_link_expires_at?: string | null
          magic_link_token?: string | null
          user_id?: string
        }
        Relationships: []
      }
      onboarding_abandonments: {
        Row: {
          abandoned_at: string
          abandonment_reason: string
          created_at: string
          id: string
          step: number
          step_name: string
          time_on_step_ms: number
          user_agent: string | null
          user_id: string
        }
        Insert: {
          abandoned_at?: string
          abandonment_reason: string
          created_at?: string
          id?: string
          step: number
          step_name: string
          time_on_step_ms: number
          user_agent?: string | null
          user_id: string
        }
        Update: {
          abandoned_at?: string
          abandonment_reason?: string
          created_at?: string
          id?: string
          step?: number
          step_name?: string
          time_on_step_ms?: number
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      onboarding_bypass_list: {
        Row: {
          created_at: string | null
          created_by: string | null
          reason: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          reason?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          reason?: string | null
          user_id?: string
        }
        Relationships: []
      }
      onboarding_magic_links: {
        Row: {
          click_count: number | null
          created_at: string | null
          current_step: number
          expires_at: string
          id: string
          ip_address: string | null
          last_clicked_at: string | null
          metadata: Json | null
          onboarding_id: string | null
          token: string
          token_hash: string
          used_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          click_count?: number | null
          created_at?: string | null
          current_step: number
          expires_at: string
          id?: string
          ip_address?: string | null
          last_clicked_at?: string | null
          metadata?: Json | null
          onboarding_id?: string | null
          token?: string
          token_hash: string
          used_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          click_count?: number | null
          created_at?: string | null
          current_step?: number
          expires_at?: string
          id?: string
          ip_address?: string | null
          last_clicked_at?: string | null
          metadata?: Json | null
          onboarding_id?: string | null
          token?: string
          token_hash?: string
          used_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_magic_links_onboarding_id_fkey"
            columns: ["onboarding_id"]
            isOneToOne: false
            referencedRelation: "property_onboarding"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_progress: {
        Row: {
          created_at: string | null
          current_step: number
          id: string
          step_data: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_step?: number
          id?: string
          step_data?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_step?: number
          id?: string
          step_data?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      onboarding_tokens: {
        Row: {
          clicked_at: string | null
          created_at: string | null
          expires_at: string
          id: string
          ip_address: string | null
          token: string
          used: boolean | null
          used_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          clicked_at?: string | null
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: string | null
          token: string
          used?: boolean | null
          used_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          clicked_at?: string | null
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          token?: string
          used?: boolean | null
          used_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      past_swaps: {
        Row: {
          checkout_completed_at: string
          created_at: string
          credits_used: number
          end_date: string
          guest_id: string
          host_id: string
          id: string
          original_swap_request_id: string
          property_id: string
          review_enabled_at: string
          start_date: string
          total_nights: number
        }
        Insert: {
          checkout_completed_at: string
          created_at?: string
          credits_used: number
          end_date: string
          guest_id: string
          host_id: string
          id?: string
          original_swap_request_id: string
          property_id: string
          review_enabled_at: string
          start_date: string
          total_nights: number
        }
        Update: {
          checkout_completed_at?: string
          created_at?: string
          credits_used?: number
          end_date?: string
          guest_id?: string
          host_id?: string
          id?: string
          original_swap_request_id?: string
          property_id?: string
          review_enabled_at?: string
          start_date?: string
          total_nights?: number
        }
        Relationships: [
          {
            foreignKeyName: "past_swaps_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "past_swaps_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "past_swaps_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "past_swaps_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "past_swaps_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "past_swaps_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "past_swaps_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "past_swaps_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_verification_codes: {
        Row: {
          attempts: number | null
          code: string
          created_at: string | null
          expires_at: string
          id: string
          max_attempts: number | null
          phone_number: string
          user_id: string | null
          verified: boolean | null
          verified_at: string | null
        }
        Insert: {
          attempts?: number | null
          code: string
          created_at?: string | null
          expires_at?: string
          id?: string
          max_attempts?: number | null
          phone_number: string
          user_id?: string | null
          verified?: boolean | null
          verified_at?: string | null
        }
        Update: {
          attempts?: number | null
          code?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          max_attempts?: number | null
          phone_number?: string
          user_id?: string | null
          verified?: boolean | null
          verified_at?: string | null
        }
        Relationships: []
      }
      phone_verifications: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          phone_number: string
          user_id: string | null
          verification_code: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          phone_number: string
          user_id?: string | null
          verification_code: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          phone_number?: string
          user_id?: string | null
          verification_code?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          abandonment_email_sent: boolean | null
          abandonment_email_sent_at: string | null
          address: string | null
          admin_role: string | null
          approval_rejected_at: string | null
          approval_status: string
          approved_at: string | null
          approved_by: string | null
          avatar_bucket: string | null
          avatar_is_secure: boolean | null
          avatar_path: string | null
          avatar_prompted_at: string | null
          avatar_url: string | null
          bio: string | null
          city: string | null
          country: string | null
          created_at: string
          credits: number
          email: string | null
          first_name: string | null
          first_visit_timestamp: string | null
          gender: string | null
          id: string
          is_admin: boolean | null
          is_veriff_passed: boolean | null
          job_title: string | null
          klaviyo_list_id: string | null
          klaviyo_profile_id: string | null
          klaviyo_sent: boolean | null
          klaviyo_sent_at: string | null
          landing_page_source: string | null
          last_name: string | null
          onboarding_completed: boolean | null
          onboarding_source: string | null
          phone: string | null
          phone_number: string | null
          phone_verified: boolean | null
          phone_verified_at: string | null
          preferred_country_code: string | null
          referrer: string | null
          referrer_url: string | null
          registration_completed_at: string | null
          registration_step: string | null
          rejection_reason: string | null
          should_prompt_avatar: boolean | null
          social_media: string | null
          updated_at: string
          user_id: string
          user_type: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          verification_completed_at: string | null
          verification_metadata: Json | null
          verification_method: string | null
          verified: boolean | null
          verified_at: string | null
          welcome_email_sent: boolean | null
        }
        Insert: {
          abandonment_email_sent?: boolean | null
          abandonment_email_sent_at?: string | null
          address?: string | null
          admin_role?: string | null
          approval_rejected_at?: string | null
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          avatar_bucket?: string | null
          avatar_is_secure?: boolean | null
          avatar_path?: string | null
          avatar_prompted_at?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          credits?: number
          email?: string | null
          first_name?: string | null
          first_visit_timestamp?: string | null
          gender?: string | null
          id?: string
          is_admin?: boolean | null
          is_veriff_passed?: boolean | null
          job_title?: string | null
          klaviyo_list_id?: string | null
          klaviyo_profile_id?: string | null
          klaviyo_sent?: boolean | null
          klaviyo_sent_at?: string | null
          landing_page_source?: string | null
          last_name?: string | null
          onboarding_completed?: boolean | null
          onboarding_source?: string | null
          phone?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          phone_verified_at?: string | null
          preferred_country_code?: string | null
          referrer?: string | null
          referrer_url?: string | null
          registration_completed_at?: string | null
          registration_step?: string | null
          rejection_reason?: string | null
          should_prompt_avatar?: boolean | null
          social_media?: string | null
          updated_at?: string
          user_id: string
          user_type?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          verification_completed_at?: string | null
          verification_metadata?: Json | null
          verification_method?: string | null
          verified?: boolean | null
          verified_at?: string | null
          welcome_email_sent?: boolean | null
        }
        Update: {
          abandonment_email_sent?: boolean | null
          abandonment_email_sent_at?: string | null
          address?: string | null
          admin_role?: string | null
          approval_rejected_at?: string | null
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          avatar_bucket?: string | null
          avatar_is_secure?: boolean | null
          avatar_path?: string | null
          avatar_prompted_at?: string | null
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          credits?: number
          email?: string | null
          first_name?: string | null
          first_visit_timestamp?: string | null
          gender?: string | null
          id?: string
          is_admin?: boolean | null
          is_veriff_passed?: boolean | null
          job_title?: string | null
          klaviyo_list_id?: string | null
          klaviyo_profile_id?: string | null
          klaviyo_sent?: boolean | null
          klaviyo_sent_at?: string | null
          landing_page_source?: string | null
          last_name?: string | null
          onboarding_completed?: boolean | null
          onboarding_source?: string | null
          phone?: string | null
          phone_number?: string | null
          phone_verified?: boolean | null
          phone_verified_at?: string | null
          preferred_country_code?: string | null
          referrer?: string | null
          referrer_url?: string | null
          registration_completed_at?: string | null
          registration_step?: string | null
          rejection_reason?: string | null
          should_prompt_avatar?: boolean | null
          social_media?: string | null
          updated_at?: string
          user_id?: string
          user_type?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          verification_completed_at?: string | null
          verification_metadata?: Json | null
          verification_method?: string | null
          verified?: boolean | null
          verified_at?: string | null
          welcome_email_sent?: boolean | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          approval_status: string
          approved_at: string | null
          approved_by: string | null
          attractiveness: number | null
          bathrooms: number | null
          bedrooms: number | null
          beds: number | null
          children_friendly: boolean
          city: string | null
          country: string | null
          created_at: string
          description: string | null
          general_area: string | null
          id: string
          is_visible: boolean
          latitude: number | null
          longitude: number | null
          main_image_url: string | null
          pets_friendly: boolean
          property_type: string
          rejected_at: string | null
          rejection_reason: string | null
          smoking_allowed: boolean
          square_metres: number | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          attractiveness?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          beds?: number | null
          children_friendly?: boolean
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          general_area?: string | null
          id?: string
          is_visible?: boolean
          latitude?: number | null
          longitude?: number | null
          main_image_url?: string | null
          pets_friendly: boolean
          property_type: string
          rejected_at?: string | null
          rejection_reason?: string | null
          smoking_allowed?: boolean
          square_metres?: number | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          approval_status?: string
          approved_at?: string | null
          approved_by?: string | null
          attractiveness?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          beds?: number | null
          children_friendly?: boolean
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          general_area?: string | null
          id?: string
          is_visible?: boolean
          latitude?: number | null
          longitude?: number | null
          main_image_url?: string | null
          pets_friendly?: boolean
          property_type?: string
          rejected_at?: string | null
          rejection_reason?: string | null
          smoking_allowed?: boolean
          square_metres?: number | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      property_amenities: {
        Row: {
          amenity_key: string
          created_at: string
          id: string
          property_id: string
        }
        Insert: {
          amenity_key: string
          created_at?: string
          id?: string
          property_id: string
        }
        Update: {
          amenity_key?: string
          created_at?: string
          id?: string
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_property_amenity_known"
            columns: ["amenity_key"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["key"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "property_amenities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_beds: {
        Row: {
          created_at: string
          double_beds: number
          id: string
          property_id: string
          room_number: number
          single_beds: number
        }
        Insert: {
          created_at?: string
          double_beds?: number
          id?: string
          property_id: string
          room_number: number
          single_beds?: number
        }
        Update: {
          created_at?: string
          double_beds?: number
          id?: string
          property_id?: string
          room_number?: number
          single_beds?: number
        }
        Relationships: [
          {
            foreignKeyName: "property_beds_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_beds_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_beds_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_beds_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_beds_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_beds_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "property_beds_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "property_beds_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_creation_monitoring_log: {
        Row: {
          broken_count_before: number
          created_at: string
          details: Json | null
          execution_time_ms: number | null
          failed_count: number
          fixed_count: number
          id: string
          run_at: string
          severity: string | null
          status: string
        }
        Insert: {
          broken_count_before?: number
          created_at?: string
          details?: Json | null
          execution_time_ms?: number | null
          failed_count?: number
          fixed_count?: number
          id?: string
          run_at?: string
          severity?: string | null
          status: string
        }
        Update: {
          broken_count_before?: number
          created_at?: string
          details?: Json | null
          execution_time_ms?: number | null
          failed_count?: number
          fixed_count?: number
          id?: string
          run_at?: string
          severity?: string | null
          status?: string
        }
        Relationships: []
      }
      property_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_main: boolean
          is_secure: boolean | null
          property_id: string
          storage_bucket: string | null
          storage_path: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_main?: boolean
          is_secure?: boolean | null
          property_id: string
          storage_bucket?: string | null
          storage_path?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_main?: boolean
          is_secure?: boolean | null
          property_id?: string
          storage_bucket?: string | null
          storage_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_onboarding: {
        Row: {
          abandoned_at: string | null
          abandonment_email_sent: boolean | null
          abandonment_email_sent_at: string | null
          attempt_count: number | null
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          current_step: number
          id: string
          last_activity_at: string | null
          property_id: string | null
          reminder_email_sent: boolean | null
          reminder_email_sent_at: string | null
          resumed_at: string | null
          status: string | null
          step_1_completed_at: string | null
          step_1_data: Json | null
          step_1_started_at: string | null
          step_2_completed_at: string | null
          step_2_data: Json | null
          step_2_started_at: string | null
          step_3_completed_at: string | null
          step_3_data: Json | null
          step_3_started_at: string | null
          step_4_completed_at: string | null
          step_4_data: Json | null
          step_4_started_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          abandoned_at?: string | null
          abandonment_email_sent?: boolean | null
          abandonment_email_sent_at?: string | null
          attempt_count?: number | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current_step?: number
          id?: string
          last_activity_at?: string | null
          property_id?: string | null
          reminder_email_sent?: boolean | null
          reminder_email_sent_at?: string | null
          resumed_at?: string | null
          status?: string | null
          step_1_completed_at?: string | null
          step_1_data?: Json | null
          step_1_started_at?: string | null
          step_2_completed_at?: string | null
          step_2_data?: Json | null
          step_2_started_at?: string | null
          step_3_completed_at?: string | null
          step_3_data?: Json | null
          step_3_started_at?: string | null
          step_4_completed_at?: string | null
          step_4_data?: Json | null
          step_4_started_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          abandoned_at?: string | null
          abandonment_email_sent?: boolean | null
          abandonment_email_sent_at?: string | null
          attempt_count?: number | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current_step?: number
          id?: string
          last_activity_at?: string | null
          property_id?: string | null
          reminder_email_sent?: boolean | null
          reminder_email_sent_at?: string | null
          resumed_at?: string | null
          status?: string | null
          step_1_completed_at?: string | null
          step_1_data?: Json | null
          step_1_started_at?: string | null
          step_2_completed_at?: string | null
          step_2_data?: Json | null
          step_2_started_at?: string | null
          step_3_completed_at?: string | null
          step_3_data?: Json | null
          step_3_started_at?: string | null
          step_4_completed_at?: string | null
          step_4_data?: Json | null
          step_4_started_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_onboarding_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_onboarding_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_onboarding_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_onboarding_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_onboarding_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_onboarding_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "property_onboarding_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "property_onboarding_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          referred_email: string
          referred_user_id: string | null
          referrer_id: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referred_email: string
          referred_user_id?: string | null
          referrer_id: string
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referred_email?: string
          referred_user_id?: string | null
          referrer_id?: string
          status?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          id: string
          overall_rating: number | null
          past_swap_id: string
          rating_accuracy: number
          rating_cleaning: number
          rating_communication: number
          review_text: string | null
          reviewed_user_id: string
          reviewer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          overall_rating?: number | null
          past_swap_id: string
          rating_accuracy: number
          rating_cleaning: number
          rating_communication: number
          review_text?: string | null
          reviewed_user_id: string
          reviewer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          overall_rating?: number | null
          past_swap_id?: string
          rating_accuracy?: number
          rating_cleaning?: number
          rating_communication?: number
          review_text?: string | null
          reviewed_user_id?: string
          reviewer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_past_swap_id_fkey"
            columns: ["past_swap_id"]
            isOneToOne: true
            referencedRelation: "past_swaps"
            referencedColumns: ["id"]
          },
        ]
      }
      sendgrid_config: {
        Row: {
          api_key: string
          created_at: string | null
          from_email: string
          from_name: string
          id: string
          is_active: boolean | null
          reply_to_email: string | null
          template_id_abandonment: string | null
          updated_at: string | null
        }
        Insert: {
          api_key: string
          created_at?: string | null
          from_email?: string
          from_name?: string
          id?: string
          is_active?: boolean | null
          reply_to_email?: string | null
          template_id_abandonment?: string | null
          updated_at?: string | null
        }
        Update: {
          api_key?: string
          created_at?: string | null
          from_email?: string
          from_name?: string
          id?: string
          is_active?: boolean | null
          reply_to_email?: string | null
          template_id_abandonment?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sendgrid_templates: {
        Row: {
          created_at: string | null
          dynamic_data_schema: Json | null
          id: string
          is_active: boolean | null
          template_id: string
          template_name: string
          template_type: string | null
        }
        Insert: {
          created_at?: string | null
          dynamic_data_schema?: Json | null
          id?: string
          is_active?: boolean | null
          template_id: string
          template_name: string
          template_type?: string | null
        }
        Update: {
          created_at?: string | null
          dynamic_data_schema?: Json | null
          id?: string
          is_active?: boolean | null
          template_id?: string
          template_name?: string
          template_type?: string | null
        }
        Relationships: []
      }
      superhote_faq: {
        Row: {
          answer: string
          category: string
          created_at: string | null
          id: string
          question: string
          updated_at: string | null
        }
        Insert: {
          answer: string
          category: string
          created_at?: string | null
          id?: string
          question: string
          updated_at?: string | null
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string | null
          id?: string
          question?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      support_response_templates: {
        Row: {
          category: string
          content: string
          created_at: string | null
          created_by: string | null
          id: string
          language: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          language?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          language?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      swap_requests: {
        Row: {
          created_at: string
          credits_deducted: number | null
          credits_refunded: boolean | null
          credits_refunded_at: string | null
          expires_at: string | null
          guest_id: string
          host_id: string
          host_message: string | null
          id: string
          property_id: string
          requested_end_date: string | null
          requested_start_date: string | null
          slot_id: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          credits_deducted?: number | null
          credits_refunded?: boolean | null
          credits_refunded_at?: string | null
          expires_at?: string | null
          guest_id: string
          host_id: string
          host_message?: string | null
          id?: string
          property_id: string
          requested_end_date?: string | null
          requested_start_date?: string | null
          slot_id?: string | null
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          credits_deducted?: number | null
          credits_refunded?: boolean | null
          credits_refunded_at?: string | null
          expires_at?: string | null
          guest_id?: string
          host_id?: string
          host_message?: string | null
          id?: string
          property_id?: string
          requested_end_date?: string | null
          requested_start_date?: string | null
          slot_id?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "availability_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      system_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          details: Json | null
          id: string
          message: string
          resolved: boolean | null
          resolved_at: string | null
          severity: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          details?: Json | null
          id?: string
          message: string
          resolved?: boolean | null
          resolved_at?: string | null
          severity?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          message?: string
          resolved?: boolean | null
          resolved_at?: string | null
          severity?: string | null
        }
        Relationships: []
      }
      system_constants: {
        Row: {
          created_at: string | null
          description: string | null
          key: string
          value: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          key: string
          value: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          key?: string
          value?: string
        }
        Relationships: []
      }
      system_health_checks: {
        Row: {
          check_name: string
          checked_at: string | null
          details: Json | null
          id: string
          status: string | null
        }
        Insert: {
          check_name: string
          checked_at?: string | null
          details?: Json | null
          id?: string
          status?: string | null
        }
        Update: {
          check_name?: string
          checked_at?: string | null
          details?: Json | null
          id?: string
          status?: string | null
        }
        Relationships: []
      }
      system_monitoring_results: {
        Row: {
          check_type: string
          checked_at: string | null
          details: Json | null
          id: string
          message: string | null
          status: string | null
        }
        Insert: {
          check_type: string
          checked_at?: string | null
          details?: Json | null
          id?: string
          message?: string | null
          status?: string | null
        }
        Update: {
          check_type?: string
          checked_at?: string | null
          details?: Json | null
          id?: string
          message?: string | null
          status?: string | null
        }
        Relationships: []
      }
      test_phone_numbers: {
        Row: {
          created_at: string | null
          description: string | null
          phone_number: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          phone_number: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          phone_number?: string
        }
        Relationships: []
      }
      top_destination: {
        Row: {
          city: string
          country: string
          created_at: string | null
          created_by: string | null
          description: string | null
          destination_image: string | null
          destination_name: string
          display_order: number | null
          id: string
          is_featured: boolean | null
          popularity_score: number | null
          tags: string[] | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          city: string
          country: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          destination_image?: string | null
          destination_name: string
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          popularity_score?: number | null
          tags?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          city?: string
          country?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          destination_image?: string | null
          destination_name?: string
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          popularity_score?: number | null
          tags?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      trigger_conflict_log: {
        Row: {
          conflict_type: string | null
          conflicting_triggers: string[] | null
          created_at: string | null
          description: string | null
          event_type: string
          id: string
          resolution_notes: string | null
          resolved: boolean | null
          resolved_at: string | null
          severity: string | null
          table_name: string
          timing: string
        }
        Insert: {
          conflict_type?: string | null
          conflicting_triggers?: string[] | null
          created_at?: string | null
          description?: string | null
          event_type: string
          id?: string
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          severity?: string | null
          table_name: string
          timing: string
        }
        Update: {
          conflict_type?: string | null
          conflicting_triggers?: string[] | null
          created_at?: string | null
          description?: string | null
          event_type?: string
          id?: string
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          severity?: string | null
          table_name?: string
          timing?: string
        }
        Relationships: []
      }
      trigger_monitoring_history: {
        Row: {
          alert_message: string | null
          alert_sent: boolean | null
          check_date: string | null
          check_time: string | null
          conflict_percentage: number | null
          created_at: string | null
          critical_count: number | null
          events_with_conflicts: number | null
          id: string
          max_triggers_per_event: number | null
          overall_health: string | null
          problems_detected: Json | null
          report_data: Json | null
          total_triggers: number | null
          warning_count: number | null
        }
        Insert: {
          alert_message?: string | null
          alert_sent?: boolean | null
          check_date?: string | null
          check_time?: string | null
          conflict_percentage?: number | null
          created_at?: string | null
          critical_count?: number | null
          events_with_conflicts?: number | null
          id?: string
          max_triggers_per_event?: number | null
          overall_health?: string | null
          problems_detected?: Json | null
          report_data?: Json | null
          total_triggers?: number | null
          warning_count?: number | null
        }
        Update: {
          alert_message?: string | null
          alert_sent?: boolean | null
          check_date?: string | null
          check_time?: string | null
          conflict_percentage?: number | null
          created_at?: string | null
          critical_count?: number | null
          events_with_conflicts?: number | null
          id?: string
          max_triggers_per_event?: number | null
          overall_health?: string | null
          problems_detected?: Json | null
          report_data?: Json | null
          total_triggers?: number | null
          warning_count?: number | null
        }
        Relationships: []
      }
      trigger_monitoring_runs: {
        Row: {
          alert_message: string | null
          alerts_sent: boolean | null
          conflict_percentage: number | null
          created_at: string | null
          critical_count: number | null
          full_report: Json | null
          id: string
          max_triggers_per_event: number | null
          overall_health: string | null
          problems_detected: Json | null
          run_date: string | null
          run_time: string | null
          warning_count: number | null
        }
        Insert: {
          alert_message?: string | null
          alerts_sent?: boolean | null
          conflict_percentage?: number | null
          created_at?: string | null
          critical_count?: number | null
          full_report?: Json | null
          id?: string
          max_triggers_per_event?: number | null
          overall_health?: string | null
          problems_detected?: Json | null
          run_date?: string | null
          run_time?: string | null
          warning_count?: number | null
        }
        Update: {
          alert_message?: string | null
          alerts_sent?: boolean | null
          conflict_percentage?: number | null
          created_at?: string | null
          critical_count?: number | null
          full_report?: Json | null
          id?: string
          max_triggers_per_event?: number | null
          overall_health?: string | null
          problems_detected?: Json | null
          run_date?: string | null
          run_time?: string | null
          warning_count?: number | null
        }
        Relationships: []
      }
      trigger_registry: {
        Row: {
          created_at: string | null
          event_type: string
          function_name: string
          id: string
          is_active: boolean | null
          priority: number | null
          purpose: string
          table_name: string
          timing: string
          trigger_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          function_name: string
          id?: string
          is_active?: boolean | null
          priority?: number | null
          purpose: string
          table_name: string
          timing: string
          trigger_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          function_name?: string
          id?: string
          is_active?: boolean | null
          priority?: number | null
          purpose?: string
          table_name?: string
          timing?: string
          trigger_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tutorials: {
        Row: {
          author: string | null
          category: string
          content: string
          created_at: string | null
          created_by: string | null
          display_order: number | null
          excerpt: string | null
          id: string
          is_published: boolean | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          author?: string | null
          category: string
          content: string
          created_at?: string | null
          created_by?: string | null
          display_order?: number | null
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          author?: string | null
          category?: string
          content?: string
          created_at?: string | null
          created_by?: string | null
          display_order?: number | null
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      unauthorized_access_log: {
        Row: {
          attempted_at: string | null
          blocked_reason: string | null
          id: string
          ip_address: string | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          attempted_at?: string | null
          blocked_reason?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          attempted_at?: string | null
          blocked_reason?: string | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_deletion_log: {
        Row: {
          cleanup_completed: boolean | null
          created_at: string | null
          deleted_at: string | null
          deleted_user_id: string
          id: string
        }
        Insert: {
          cleanup_completed?: boolean | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_user_id: string
          id?: string
        }
        Update: {
          cleanup_completed?: boolean | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_user_id?: string
          id?: string
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string | null
          id: string
          property_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "user_favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "user_favorites_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_slots: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          slot: unknown
          user_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          slot: unknown
          user_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          slot?: unknown
          user_id?: string
        }
        Relationships: []
      }
      user_source_tracking: {
        Row: {
          created_at: string | null
          email: string
          first_visit_timestamp: string | null
          id: string
          landing_page_source: string | null
          referrer: string | null
          signup_timestamp: string | null
          updated_at: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          visit_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_visit_timestamp?: string | null
          id?: string
          landing_page_source?: string | null
          referrer?: string | null
          signup_timestamp?: string | null
          updated_at?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          visit_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_visit_timestamp?: string | null
          id?: string
          landing_page_source?: string | null
          referrer?: string | null
          signup_timestamp?: string | null
          updated_at?: string | null
          user_id?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          visit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_source_tracking_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "landing_page_visits"
            referencedColumns: ["id"]
          },
        ]
      }
      user_verifications: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          user_id: string
          veriff_verification_id: string | null
          verification_data: Json | null
          verification_method: string | null
          verified: boolean
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
          veriff_verification_id?: string | null
          verification_data?: Json | null
          verification_method?: string | null
          verified?: boolean
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
          veriff_verification_id?: string | null
          verification_data?: Json | null
          verification_method?: string | null
          verified?: boolean
          verified_at?: string | null
        }
        Relationships: []
      }
      veriff_sessions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          decision_payload: Json | null
          id: string
          session_id: string
          session_token: string
          session_url: string
          status: string
          updated_at: string | null
          user_id: string
          vendor_data: string
          verification_result: Json | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          decision_payload?: Json | null
          id?: string
          session_id: string
          session_token: string
          session_url: string
          status?: string
          updated_at?: string | null
          user_id: string
          vendor_data: string
          verification_result?: Json | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          decision_payload?: Json | null
          id?: string
          session_id?: string
          session_token?: string
          session_url?: string
          status?: string
          updated_at?: string | null
          user_id?: string
          vendor_data?: string
          verification_result?: Json | null
        }
        Relationships: []
      }
      verification_sessions: {
        Row: {
          callback_url: string | null
          completed_at: string | null
          created_at: string
          id: string
          person_data: Json | null
          status: string
          updated_at: string
          user_id: string
          veriff_session_id: string
          veriff_url: string | null
          verification_data: Json | null
        }
        Insert: {
          callback_url?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          person_data?: Json | null
          status?: string
          updated_at?: string
          user_id: string
          veriff_session_id: string
          veriff_url?: string | null
          verification_data?: Json | null
        }
        Update: {
          callback_url?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          person_data?: Json | null
          status?: string
          updated_at?: string
          user_id?: string
          veriff_session_id?: string
          veriff_url?: string | null
          verification_data?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      abandoned_onboardings: {
        Row: {
          abandonment_email_sent: boolean | null
          abandonment_email_sent_at: string | null
          created_at: string | null
          current_step: number | null
          email: string | null
          first_name: string | null
          last_activity_at: string | null
          last_name: string | null
          phone_number: string | null
          step_name: string | null
          time_since_activity: unknown
          user_id: string | null
        }
        Relationships: []
      }
      abandoned_users: {
        Row: {
          abandonment_status: string | null
          days_inactive: number | null
          days_since_signup: number | null
          eligible_for_abandonment_email: boolean | null
          email: string | null
          first_name: string | null
          has_property: boolean | null
          last_activity_at: string | null
          last_name: string | null
          profile_abandonment_email_sent: boolean | null
          profile_abandonment_email_sent_at: string | null
          profile_onboarding_completed: boolean | null
          property_abandoned_at: string | null
          property_abandonment_email_sent: boolean | null
          property_abandonment_email_sent_at: string | null
          property_onboarding_status: string | null
          property_onboarding_step: number | null
          registration_step: string | null
          user_created_at: string | null
          user_id: string | null
        }
        Relationships: []
      }
      abandoned_users_for_frontend: {
        Row: {
          abandonment_status: string | null
          email: string | null
          email_sent: boolean | null
          email_sent_at: string | null
          first_name: string | null
          full_name: string | null
          has_property: boolean | null
          landing_page_source: string | null
          last_activity_at: string | null
          last_name: string | null
          minutes_inactive: number | null
          phone_number: string | null
          resume_link: string | null
          step_name: string | null
          step_number: number | null
          time_ago: string | null
          time_since_activity: unknown
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Relationships: []
      }
      abandonment_cron_dashboard: {
        Row: {
          avg_execution_ms: number | null
          currently_abandoned: number | null
          dashboard_generated_at: string | null
          emails_sent_24h: number | null
          failed_runs: number | null
          last_run_time: string | null
          pending_emails: number | null
          runs_last_24h: number | null
          successful_runs: number | null
          users_processed_24h: number | null
        }
        Relationships: []
      }
      abandonment_cron_health: {
        Row: {
          avg_execution_ms: number | null
          emails_sent_7d: number | null
          last_failure: string | null
          last_success: string | null
          runs_today: number | null
          success_rate_7d: number | null
        }
        Relationships: []
      }
      abandonment_cron_monitoring: {
        Row: {
          avg_duration_seconds: number | null
          failed_runs: number | null
          health_status: string | null
          is_active: boolean | null
          jobid: number | null
          jobname: string | null
          last_run: string | null
          runs_last_7_days: number | null
          schedule: string | null
          success_rate: number | null
          successful_runs: number | null
        }
        Relationships: []
      }
      active_swap_requests_with_credits: {
        Row: {
          created_at: string | null
          credits_deducted: number | null
          credits_refunded: boolean | null
          credits_refunded_at: string | null
          effective_status: string | null
          expires_at: string | null
          guest_current_credits: number | null
          guest_id: string | null
          host_current_credits: number | null
          host_id: string | null
          host_message: string | null
          hours_until_expiry: number | null
          id: string | null
          property_city: string | null
          property_id: string | null
          property_title: string | null
          requested_end_date: string | null
          requested_start_date: string | null
          slot_id: string | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "availability_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_dashboard_stats: {
        Row: {
          accepted_swaps: number | null
          active_bookings: number | null
          approved_properties: number | null
          avg_credits_per_user: number | null
          bookings_last_month: number | null
          last_updated: string | null
          new_properties_week: number | null
          new_users_month: number | null
          new_users_week: number | null
          pending_properties: number | null
          pending_swaps: number | null
          phone_verified_users: number | null
          total_bookings: number | null
          total_credits_in_system: number | null
          total_properties: number | null
          total_swap_requests: number | null
          total_users: number | null
          verified_users: number | null
        }
        Relationships: []
      }
      admin_properties_list: {
        Row: {
          address: string | null
          amenity_count: number | null
          approval_status: string | null
          bathrooms: number | null
          bedrooms: number | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string | null
          image_count: number | null
          is_featured: boolean | null
          is_visible: boolean | null
          last_name: string | null
          main_image_url: string | null
          property_type: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
        }
        Relationships: []
      }
      admin_stats_summary: {
        Row: {
          approved_properties: number | null
          approved_users: number | null
          last_updated: string | null
          pending_properties: number | null
          pending_users: number | null
          total_admins: number | null
          total_bookings: number | null
          total_credits_in_system: number | null
          total_properties: number | null
          total_swap_requests: number | null
          total_users: number | null
        }
        Relationships: []
      }
      admin_system_dashboard: {
        Row: {
          category: string | null
          metric: string | null
          status: string | null
          value: string | null
        }
        Relationships: []
      }
      admin_users_list: {
        Row: {
          approval_status: string | null
          avatar_url: string | null
          bookings_as_guest: number | null
          bookings_as_host: number | null
          created_at: string | null
          credits: number | null
          email: string | null
          first_name: string | null
          last_name: string | null
          onboarding_completed: boolean | null
          phone_number: string | null
          phone_verified: boolean | null
          property_count: number | null
          registration_step: string | null
          user_id: string | null
          user_type: string | null
          verified: boolean | null
        }
        Relationships: []
      }
      booking_history_with_credits: {
        Row: {
          checked_in_at: string | null
          checked_out_at: string | null
          created_at: string | null
          credits_spent: number | null
          end_date: string | null
          guest_current_credits: number | null
          guest_id: string | null
          host_credits_awarded: boolean | null
          host_credits_awarded_at: string | null
          host_current_credits: number | null
          host_id: string | null
          id: string | null
          property_address: string | null
          property_city: string | null
          property_id: string | null
          property_title: string | null
          request_created_at: string | null
          request_expired_at: string | null
          start_date: string | null
          status: string | null
          swap_request_id: string | null
          total_nights: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_swap_request_id_fkey"
            columns: ["swap_request_id"]
            isOneToOne: false
            referencedRelation: "active_swap_requests_with_credits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_swap_request_id_fkey"
            columns: ["swap_request_id"]
            isOneToOne: false
            referencedRelation: "swap_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_swap_request_id_fkey"
            columns: ["swap_request_id"]
            isOneToOne: false
            referencedRelation: "swap_requests_with_expiry"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_correction_summary: {
        Row: {
          first_correction: string | null
          last_correction: string | null
          total_credits_restored: number | null
          total_users_corrected: number | null
        }
        Relationships: []
      }
      cron_job_monitoring: {
        Row: {
          active: boolean | null
          command: string | null
          database: string | null
          jobid: number | null
          jobname: string | null
          nodename: string | null
          nodeport: number | null
          schedule: string | null
          username: string | null
        }
        Insert: {
          active?: boolean | null
          command?: string | null
          database?: string | null
          jobid?: number | null
          jobname?: string | null
          nodename?: string | null
          nodeport?: number | null
          schedule?: string | null
          username?: string | null
        }
        Update: {
          active?: boolean | null
          command?: string | null
          database?: string | null
          jobid?: number | null
          jobname?: string | null
          nodename?: string | null
          nodeport?: number | null
          schedule?: string | null
          username?: string | null
        }
        Relationships: []
      }
      email_system_status: {
        Row: {
          disabled_at: string | null
          disabled_by: string | null
          emails_enabled: boolean | null
          reason: string | null
          status_message: string | null
          updated_at: string | null
        }
        Insert: {
          disabled_at?: string | null
          disabled_by?: string | null
          emails_enabled?: boolean | null
          reason?: string | null
          status_message?: never
          updated_at?: string | null
        }
        Update: {
          disabled_at?: string | null
          disabled_by?: string | null
          emails_enabled?: boolean | null
          reason?: string | null
          status_message?: never
          updated_at?: string | null
        }
        Relationships: []
      }
      featured_destinations_with_images: {
        Row: {
          city: string | null
          country: string | null
          description: string | null
          destination_image: string | null
          destination_name: string | null
          display_order: number | null
          id: string | null
          popularity_score: number | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          description?: string | null
          destination_image?: string | null
          destination_name?: string | null
          display_order?: number | null
          id?: string | null
          popularity_score?: number | null
        }
        Update: {
          city?: string | null
          country?: string | null
          description?: string | null
          destination_image?: string | null
          destination_name?: string | null
          display_order?: number | null
          id?: string | null
          popularity_score?: number | null
        }
        Relationships: []
      }
      function_monitoring_dashboard: {
        Row: {
          active_alerts: number | null
          description: string | null
          executions_24h: number | null
          failures_24h: number | null
          function_name: string | null
          function_type: string | null
          last_execution_at: string | null
          last_execution_display: string | null
          monitoring_enabled: boolean | null
          status: string | null
        }
        Insert: {
          active_alerts?: never
          description?: string | null
          executions_24h?: never
          failures_24h?: never
          function_name?: string | null
          function_type?: string | null
          last_execution_at?: string | null
          last_execution_display?: never
          monitoring_enabled?: boolean | null
          status?: string | null
        }
        Update: {
          active_alerts?: never
          description?: string | null
          executions_24h?: never
          failures_24h?: never
          function_name?: string | null
          function_type?: string | null
          last_execution_at?: string | null
          last_execution_display?: never
          monitoring_enabled?: boolean | null
          status?: string | null
        }
        Relationships: []
      }
      klaviyo_sync_status: {
        Row: {
          completed_onboarding: number | null
          from_founders_intro: number | null
          has_source: number | null
          organic_users: number | null
          pending_sync: number | null
          sent_to_klaviyo: number | null
          total_users: number | null
        }
        Relationships: []
      }
      marketing_facebook_signups: {
        Row: {
          days_inactive: number | null
          email: string | null
          email_sent: boolean | null
          email_sent_at: string | null
          first_name: string | null
          last_activity: string | null
          last_name: string | null
          signup_date: string | null
          source_table: string | null
          status: string | null
          stopped_at: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_source: string | null
        }
        Relationships: []
      }
      marketing_instagram_signups: {
        Row: {
          days_inactive: number | null
          email: string | null
          email_sent: boolean | null
          email_sent_at: string | null
          first_name: string | null
          last_activity: string | null
          last_name: string | null
          signup_date: string | null
          source_table: string | null
          status: string | null
          stopped_at: string | null
          user_id: string | null
          utm_campaign: string | null
          utm_source: string | null
        }
        Relationships: []
      }
      marketing_source_stats: {
        Row: {
          abandoned: number | null
          completed: number | null
          completion_rate: number | null
          in_progress: number | null
          total_visitors: number | null
          utm_source: string | null
        }
        Relationships: []
      }
      onboarding_abandonment_analytics: {
        Row: {
          avg_hours_inactive: number | null
          completions_after_email: number | null
          count: number | null
          current_step: number | null
          final_emails_sent: number | null
          first_emails_sent: number | null
          returned_users: number | null
          second_emails_sent: number | null
          status: string | null
        }
        Relationships: []
      }
      onboarding_abandonment_dashboard: {
        Row: {
          abandoned_last_hour: number | null
          abandonments_this_week: number | null
          abandonments_today: number | null
          avg_minutes_before_abandon: number | null
          current_abandoned_users: number | null
          most_abandoned_step: number | null
        }
        Relationships: []
      }
      onboarding_abandonment_realtime: {
        Row: {
          abandoned_at: string | null
          abandonment_email_sent: boolean | null
          abandonment_email_sent_at: string | null
          abandonment_status: string | null
          current_step: number | null
          current_step_name: string | null
          email: string | null
          full_name: string | null
          has_property: boolean | null
          last_activity_at: string | null
          last_update: string | null
          minutes_inactive: number | null
          minutes_on_current_step: number | null
          onboarding_started_at: string | null
          onboarding_status: string | null
          phone_number: string | null
          step_1_complete: boolean | null
          step_2_complete: boolean | null
          step_3_complete: boolean | null
          step_4_complete: boolean | null
          user_created_at: string | null
          user_id: string | null
        }
        Relationships: []
      }
      properties_cached: {
        Row: {
          amenities: string[] | null
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          attractiveness: number | null
          bathrooms: number | null
          bedrooms: number | null
          beds: number | null
          children_friendly: boolean | null
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          general_area: string | null
          id: string | null
          image_count: number | null
          is_featured: boolean | null
          is_visible: boolean | null
          latitude: number | null
          longitude: number | null
          main_image_url: string | null
          owner_avatar: string | null
          owner_first_name: string | null
          owner_last_name: string | null
          owner_verified: boolean | null
          pets_friendly: boolean | null
          property_type: string | null
          square_metres: number | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: []
      }
      properties_complete: {
        Row: {
          address: string | null
          amenity_count: number | null
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          attractiveness: number | null
          avatar_url: string | null
          bathrooms: number | null
          bed_configuration: Json | null
          bedrooms: number | null
          beds: number | null
          children_friendly: boolean | null
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          first_name: string | null
          general_area: string | null
          id: string | null
          image_count: number | null
          is_visible: boolean | null
          last_name: string | null
          latitude: number | null
          longitude: number | null
          main_image_url: string | null
          pets_friendly: boolean | null
          property_type: string | null
          rejection_reason: string | null
          square_metres: number | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
        }
        Relationships: []
      }
      properties_public: {
        Row: {
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          bathrooms: number | null
          bedrooms: number | null
          children_friendly: boolean | null
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          general_area: string | null
          id: string | null
          latitude: number | null
          longitude: number | null
          main_image_url: string | null
          pets_friendly: boolean | null
          property_type: string | null
          square_metres: number | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          children_friendly?: boolean | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          general_area?: string | null
          id?: string | null
          latitude?: number | null
          longitude?: number | null
          main_image_url?: string | null
          pets_friendly?: boolean | null
          property_type?: string | null
          square_metres?: number | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          children_friendly?: boolean | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          general_area?: string | null
          id?: string | null
          latitude?: number | null
          longitude?: number | null
          main_image_url?: string | null
          pets_friendly?: boolean | null
          property_type?: string | null
          square_metres?: number | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      property_creation_monitoring_dashboard: {
        Row: {
          current_broken_count: number | null
          last_run_at: string | null
          last_run_status: string | null
          monitoring_runs_24h: number | null
          overall_health: string | null
          total_failed_24h: number | null
          total_fixed_24h: number | null
        }
        Relationships: []
      }
      property_duplicates: {
        Row: {
          addresses: string[] | null
          first_name: string | null
          last_name: string | null
          property_count: number | null
          property_ids: string[] | null
          titles: string[] | null
          user_id: string | null
        }
        Relationships: []
      }
      property_image_status: {
        Row: {
          approval_status: string | null
          has_main_url: boolean | null
          main_images: number | null
          property_id: string | null
          status: string | null
          title: string | null
          total_images: number | null
        }
        Relationships: []
      }
      property_nearby_activities: {
        Row: {
          activities: Json | null
          property_address: string | null
          property_id: string | null
          property_latitude: number | null
          property_longitude: number | null
          property_title: string | null
        }
        Relationships: []
      }
      public_properties: {
        Row: {
          address: string | null
          approval_status: string | null
          bathrooms: number | null
          bedrooms: number | null
          children_friendly: boolean | null
          city: string | null
          city_lower: string | null
          country: string | null
          country_lower: string | null
          created_at: string | null
          description: string | null
          general_area: string | null
          id: string | null
          is_visible: boolean | null
          latitude: number | null
          location_lower: string | null
          longitude: number | null
          main_image_url: string | null
          pets_friendly: boolean | null
          property_type: string | null
          square_metres: number | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          approval_status?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          children_friendly?: boolean | null
          city?: string | null
          city_lower?: never
          country?: string | null
          country_lower?: never
          created_at?: string | null
          description?: string | null
          general_area?: string | null
          id?: string | null
          is_visible?: boolean | null
          latitude?: number | null
          location_lower?: never
          longitude?: number | null
          main_image_url?: string | null
          pets_friendly?: boolean | null
          property_type?: string | null
          square_metres?: number | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          approval_status?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          children_friendly?: boolean | null
          city?: string | null
          city_lower?: never
          country?: string | null
          country_lower?: never
          created_at?: string | null
          description?: string | null
          general_area?: string | null
          id?: string | null
          is_visible?: boolean | null
          latitude?: number | null
          location_lower?: never
          longitude?: number | null
          main_image_url?: string | null
          pets_friendly?: boolean | null
          property_type?: string | null
          square_metres?: number | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      source_analytics: {
        Row: {
          active_days: number | null
          first_signup: string | null
          landing_page_source: string | null
          latest_signup: string | null
          signup_count: number | null
          utm_campaign: string | null
          utm_source: string | null
        }
        Relationships: []
      }
      swap_requests_with_expiry: {
        Row: {
          created_at: string | null
          days_remaining: number | null
          expires_at: string | null
          expiry_status: string | null
          guest_id: string | null
          host_id: string | null
          host_message: string | null
          hours_remaining: number | null
          id: string | null
          is_expired: boolean | null
          property_id: string | null
          requested_end_date: string | null
          requested_start_date: string | null
          slot_id: string | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          days_remaining?: never
          expires_at?: string | null
          expiry_status?: never
          guest_id?: string | null
          host_id?: string | null
          host_message?: string | null
          hours_remaining?: never
          id?: string | null
          is_expired?: never
          property_id?: string | null
          requested_end_date?: string | null
          requested_start_date?: string | null
          slot_id?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          days_remaining?: never
          expires_at?: string | null
          expiry_status?: never
          guest_id?: string | null
          host_id?: string | null
          host_message?: string | null
          hours_remaining?: never
          id?: string | null
          is_expired?: never
          property_id?: string | null
          requested_end_date?: string | null
          requested_start_date?: string | null
          slot_id?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "admin_properties_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_cached"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_complete"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_image_status"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_nearby_activities"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "swap_requests_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "public_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "availability_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      top_destinations: {
        Row: {
          avg_bedrooms: number | null
          avg_square_metres: number | null
          center_lat: number | null
          center_lng: number | null
          city: string | null
          country: string | null
          destination: string | null
          destination_image: string | null
          host_count: number | null
          max_lat: number | null
          max_lng: number | null
          min_lat: number | null
          min_lng: number | null
          property_count: number | null
        }
        Relationships: []
      }
      trigger_conflict_cards: {
        Row: {
          card_id: string | null
          color: string | null
          description: string | null
          status_text: string | null
          title: string | null
          value: string | null
        }
        Relationships: []
      }
      trigger_conflict_monitor: {
        Row: {
          description: string | null
          event_type: string | null
          risk_level: string | null
          table_name: unknown
          timing: string | null
          trigger_count: number | null
          triggers: unknown[] | null
        }
        Relationships: []
      }
      trigger_conflict_monitor_dashboard: {
        Row: {
          event: string | null
          execution_order: string | null
          functions_called: string[] | null
          has_overlapping_logic: boolean | null
          risk_assessment: string | null
          severity: string | null
          status_icon: string | null
          table_name: unknown
          trigger_count: number | null
          trigger_names: unknown[] | null
        }
        Relationships: []
      }
      trigger_health_metrics: {
        Row: {
          acceptable_count: number | null
          conflict_percentage: number | null
          critical_count: number | null
          events_with_multiple_triggers: number | null
          max_triggers_display: string | null
          max_triggers_per_event: number | null
          optimal_count: number | null
          optimal_percentage: number | null
          overall_health: string | null
          total_events: number | null
          total_triggers: number | null
          warning_count: number | null
        }
        Relationships: []
      }
      trigger_monitoring_dashboard_summary: {
        Row: {
          alert_message: string | null
          conflict_percentage: number | null
          critical_count: number | null
          days_monitored: number | null
          last_check_time: string | null
          max_triggers_per_event: number | null
          month_worst_triggers: number | null
          overall_health: string | null
          week_trend: Json | null
        }
        Relationships: []
      }
      trigger_monitoring_summary: {
        Row: {
          alerts_sent_7d: number | null
          avg_conflict_rate_7d: number | null
          avg_max_triggers_7d: number | null
          critical_issues_7d: number | null
          current_status: string | null
          last_check_date: string | null
          latest_alert: string | null
          monitoring_runs_7d: number | null
        }
        Relationships: []
      }
      trigger_summary: {
        Row: {
          event_timing: string | null
          status: string | null
          table_name: unknown
          trigger_count: number | null
          triggers: string | null
        }
        Relationships: []
      }
      user_access_status: {
        Row: {
          access_status: string | null
          has_property: boolean | null
          onboarding_completed: boolean | null
          onboarding_record_completed: boolean | null
          user_id: string | null
        }
        Relationships: []
      }
      user_onboarding_state: {
        Row: {
          approval_status: string | null
          avatar_prompted_at: string | null
          avatar_url: string | null
          current_onboarding_step: number | null
          email: string | null
          first_name: string | null
          has_property: boolean | null
          last_name: string | null
          onboarding_completed: boolean | null
          onboarding_status: string | null
          property_onboarding_completed: boolean | null
          registration_step: string | null
          should_prompt_avatar: boolean | null
          user_id: string | null
          user_state: string | null
        }
        Relationships: []
      }
      user_onboarding_status: {
        Row: {
          approval_status: string | null
          credits: number | null
          email: string | null
          first_name: string | null
          last_name: string | null
          needs_onboarding: boolean | null
          onboarding_completed: boolean | null
          phone_verified: boolean | null
          registration_step: string | null
          user_id: string | null
          user_type: string | null
          verified: boolean | null
        }
        Insert: {
          approval_status?: string | null
          credits?: number | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          needs_onboarding?: never
          onboarding_completed?: boolean | null
          phone_verified?: boolean | null
          registration_step?: string | null
          user_id?: string | null
          user_type?: string | null
          verified?: boolean | null
        }
        Update: {
          approval_status?: string | null
          credits?: number | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          needs_onboarding?: never
          onboarding_completed?: boolean | null
          phone_verified?: boolean | null
          registration_step?: string | null
          user_id?: string | null
          user_type?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
    }
    Functions: {
      accept_swap_request: {
        Args: { p_host_message?: string; p_request_id: string }
        Returns: Json
      }
      add_availability_slot: {
        Args: {
          p_end_date: string
          p_property_id: string
          p_start_date: string
        }
        Returns: string
      }
      add_nearby_activity: {
        Args: {
          p_address: string
          p_category: string
          p_latitude: number
          p_longitude: number
          p_name: string
          p_phone?: string
          p_property_id: string
          p_rating?: number
          p_website?: string
        }
        Returns: string
      }
      admin_add_favorite_for_user: {
        Args: { p_property_id: string; p_user_email: string }
        Returns: Json
      }
      admin_add_featured_destination: {
        Args: {
          p_city: string
          p_country: string
          p_custom_description?: string
          p_custom_image_url?: string
          p_display_order?: number
          p_highlight_color?: string
        }
        Returns: Json
      }
      admin_approve_user_profile: {
        Args: { p_user_email: string }
        Returns: Json
      }
      admin_authenticate: {
        Args: { p_email: string; p_password: string }
        Returns: Json
      }
      admin_can_view_user_overview: { Args: never; Returns: boolean }
      admin_delete_property_safe: {
        Args: { property_id: string }
        Returns: Json
      }
      admin_delete_user_completely: {
        Args: { target_user_id: string }
        Returns: Json
      }
      admin_fix_everything: { Args: never; Returns: string }
      admin_list_featured_destinations: { Args: never; Returns: Json }
      admin_list_pending_profiles: { Args: { p_limit?: number }; Returns: Json }
      admin_login_bypass: {
        Args: { p_email: string; p_password: string }
        Returns: Json
      }
      admin_quick_status: { Args: never; Returns: string }
      admin_remove_featured_destination: {
        Args: { p_city: string; p_country: string }
        Returns: Json
      }
      admin_search_properties: {
        Args: {
          city_filter?: string
          limit_rows?: number
          offset_rows?: number
          search_term?: string
          status_filter?: string
        }
        Returns: {
          address: string
          approval_status: string
          city: string
          country: string
          created_at: string
          id: string
          image_url: string
          owner_email: string
          owner_name: string
          title: string
        }[]
      }
      admin_trigger_user_cleanup: { Args: never; Returns: Json }
      admin_user_deletion_dashboard: { Args: never; Returns: Json }
      admin_verify_phone: {
        Args: { p_phone_number: string; p_user_id: string }
        Returns: Json
      }
      advance_registration_step: {
        Args: { p_data?: Json; p_new_step: string; p_user_id: string }
        Returns: Json
      }
      alert_broken_property_creation: { Args: never; Returns: undefined }
      analyze_function_health: {
        Args: never
        Returns: {
          alert_message: string
          alert_needed: boolean
          execution_count_24h: number
          failure_rate_24h: number
          function_name: string
          hours_since_execution: number
          last_execution: string
          status: string
        }[]
      }
      analyze_trigger_conflict_details: {
        Args: never
        Returns: {
          conflict_type: string
          description: string
          fix_priority: number
          risk_level: string
          table_name: string
          triggers_involved: string[]
        }[]
      }
      approve_user: { Args: { user_uuid: string }; Returns: undefined }
      approve_user_account: {
        Args: { p_approved_by?: string; p_user_id: string }
        Returns: Json
      }
      assign_phone_to_user: {
        Args: { p_phone_number: string; p_user_id: string }
        Returns: Json
      }
      assign_test_phone_number: {
        Args: { p_phone_number: string; p_user_id: string }
        Returns: undefined
      }
      attempt_image_recovery: { Args: { p_property_id: string }; Returns: Json }
      audit_onboarding_data: {
        Args: never
        Returns: {
          count: number
          description: string
          fix_query: string
          issue_type: string
        }[]
      }
      auto_complete_bookings: { Args: never; Returns: undefined }
      auto_fix_common_issues: { Args: never; Returns: Json }
      auto_fix_function_issues: { Args: never; Returns: Json }
      auto_fix_registration_issues: { Args: never; Returns: Json }
      auto_heal_property_creation: { Args: never; Returns: Json }
      auto_refresh_cache: { Args: never; Returns: undefined }
      before_auth_user_login: { Args: { event: Json }; Returns: Json }
      bulk_update_destination_images: { Args: { updates: Json }; Returns: Json }
      calculate_distance_meters: {
        Args: { lat1: number; lat2: number; lon1: number; lon2: number }
        Returns: number
      }
      calculate_nights: {
        Args: { end_date: string; start_date: string }
        Returns: number
      }
      calculate_overall_rating: {
        Args: { acc: number; clean: number; comm: number }
        Returns: number
      }
      can_access_dashboard: { Args: never; Returns: boolean }
      can_access_sensitive_profile_data: {
        Args: { profile_user_id: string }
        Returns: boolean
      }
      can_delete_admin: {
        Args: { deleter_id: string; target_id: string }
        Returns: boolean
      }
      can_delete_all_availability_slots: { Args: never; Returns: Json }
      can_leave_review: { Args: { past_swap_uuid: string }; Returns: boolean }
      can_make_booking: {
        Args: {
          end_date_param: string
          guest_user_id: string
          property_id_param: string
          start_date_param: string
        }
        Returns: boolean
      }
      can_manage_admin_roles: {
        Args: { check_user_id: string }
        Returns: boolean
      }
      can_user_access_message: {
        Args: { conversation_uuid: string; user_uuid: string }
        Returns: boolean
      }
      can_user_perform_action: {
        Args: { action_type: string; user_uuid: string }
        Returns: boolean
      }
      can_user_send_swap_request: {
        Args: { p_user_id?: string }
        Returns: Json
      }
      can_users_chat: {
        Args: { p_user1_id: string; p_user2_id: string }
        Returns: boolean
      }
      can_view_full_profile: {
        Args: { profile_user_id: string; requesting_user_id: string }
        Returns: boolean
      }
      can_view_private_profile: {
        Args: { profile_user_id: string; requesting_user_id: string }
        Returns: boolean
      }
      can_view_public_profile: {
        Args: { profile_user_id: string; requesting_user_id: string }
        Returns: boolean
      }
      check_abandonments_now: {
        Args: never
        Returns: {
          emails_queued: number
          execution_time_ms: number
          new_abandonments: number
          status: string
          users_detected: number
        }[]
      }
      check_admin_login: {
        Args: { p_email: string; p_password: string }
        Returns: Json
      }
      check_all_overlaps: {
        Args: never
        Returns: {
          check_type: string
          details: string
          status: string
          table_name: string
        }[]
      }
      check_and_alert: { Args: never; Returns: undefined }
      check_and_mark_abandonments: {
        Args: never
        Returns: {
          current_step: number
          email: string
          first_name: string
          hours_since_activity: number
          newly_abandoned: boolean
          onboarding_id: string
          user_id: string
        }[]
      }
      check_and_process_abandonments: { Args: never; Returns: Json }
      check_approval_eligibility: { Args: { p_user_id: string }; Returns: Json }
      check_credit_anomalies: {
        Args: never
        Returns: {
          anomaly_type: string
          details: string
          user_count: number
        }[]
      }
      check_daily_monitoring_status: { Args: never; Returns: Json }
      check_duplicate_email: { Args: { p_email: string }; Returns: boolean }
      check_email_already_registered: {
        Args: { p_email: string }
        Returns: Json
      }
      check_email_before_signup: {
        Args: { p_email: string; p_provider: string }
        Returns: Json
      }
      check_email_system_enabled: { Args: never; Returns: boolean }
      check_everything: {
        Args: never
        Returns: {
          category: string
          check_name: string
          details: string
          status: string
        }[]
      }
      check_feature_access: {
        Args: { feature_name: string; user_id: string }
        Returns: boolean
      }
      check_my_context: {
        Args: never
        Returns: {
          my_user_id: string
          properties_i_own: number
          properties_i_should_see: number
          total_properties: number
        }[]
      }
      check_onboarding_access: { Args: { p_user_id: string }; Returns: Json }
      check_onboarding_status: { Args: never; Returns: Json }
      check_orphaned_data: { Args: never; Returns: Json }
      check_performance_metrics: {
        Args: never
        Returns: {
          metric_name: string
          metric_value: string
          recommendation: string
          status: string
        }[]
      }
      check_phone_availability: {
        Args: { p_current_user_id?: string; p_phone_number: string }
        Returns: Json
      }
      check_phone_verification_required: {
        Args: { p_user_id: string }
        Returns: Json
      }
      check_property_creation_health: {
        Args: never
        Returns: {
          action_taken: string
          broken_count: number
          issue_details: Json
          severity: string
          status: string
        }[]
      }
      check_property_delete_permission: {
        Args: { property_id: string }
        Returns: Json
      }
      check_property_image_completeness: {
        Args: { p_property_id: string }
        Returns: Json
      }
      check_system_status: {
        Args: never
        Returns: {
          check_item: string
          details: string
          status: string
        }[]
      }
      check_table_trigger_conflicts: {
        Args: { p_table_name: string }
        Returns: {
          event_type: string
          functions: string[]
          recommendation: string
          risk_level: string
          status: string
          timing: string
          trigger_count: number
          triggers: string[]
        }[]
      }
      check_trigger_conflicts: {
        Args: {
          p_event_type: string
          p_new_trigger_name?: string
          p_table_name: string
          p_timing: string
        }
        Returns: {
          can_add_trigger: boolean
          existing_count: number
          existing_triggers: string[]
          recommendation: string
          warning_message: string
        }[]
      }
      check_user_can_sign_in: { Args: { p_email: string }; Returns: Json }
      check_user_can_signin: { Args: { user_email: string }; Returns: Json }
      check_user_login_and_onboarding: {
        Args: { p_email: string }
        Returns: Json
      }
      check_user_login_attempt: { Args: { email_input: string }; Returns: Json }
      check_user_onboarding_status: {
        Args: { p_user_id?: string }
        Returns: Json
      }
      check_user_registration_status: {
        Args: { p_email?: string; p_user_id?: string }
        Returns: {
          email: string
          issues: string[]
          recommendations: string[]
          status: string
          user_id: string
        }[]
      }
      cleanup_declined_swaps: { Args: never; Returns: Json }
      cleanup_deleted_users: { Args: never; Returns: Json }
      cleanup_duplicate_onboarding_sessions: { Args: never; Returns: number }
      cleanup_expired_magic_links: { Args: never; Returns: number }
      cleanup_expired_magic_tokens: { Args: never; Returns: undefined }
      cleanup_expired_onboarding_tokens: { Args: never; Returns: undefined }
      cleanup_expired_verification_codes: { Args: never; Returns: number }
      cleanup_old_function_tracking: { Args: never; Returns: number }
      cleanup_orphaned_auth_users: { Args: never; Returns: undefined }
      cleanup_property_and_user_complete: {
        Args: { target_user_id: string }
        Returns: Json
      }
      cleanup_sample_properties: {
        Args: never
        Returns: {
          deleted_count: number
          deleted_properties: string[]
        }[]
      }
      cleanup_stale_onboarding_sessions: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      cleanup_stuck_onboarding_sessions: { Args: never; Returns: number }
      cleanup_user_data_by_id: {
        Args: { target_user_id: string }
        Returns: boolean
      }
      clear_test_phone_before_signup: {
        Args: { p_phone_number: string }
        Returns: Json
      }
      complete_avatar_prompt: { Args: { p_user_id: string }; Returns: Json }
      complete_booking: { Args: { booking_uuid: string }; Returns: boolean }
      complete_onboarding: { Args: { p_user_id: string }; Returns: Json }
      complete_onboarding_flow:
        | {
            Args: {
              p_phone_number?: string
              p_skip_phone?: boolean
              p_user_id: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_first_name?: string
              p_last_name?: string
              p_phone?: string
              p_user_id: string
            }
            Returns: Json
          }
      complete_onboarding_with_image_queue: {
        Args: { p_user_id?: string }
        Returns: Json
      }
      complete_phone_onboarding: {
        Args: { p_phone_number: string; p_user_id: string }
        Returns: Json
      }
      complete_user_cleanup: { Args: { user_email: string }; Returns: Json }
      complete_user_onboarding: { Args: { p_user_id: string }; Returns: Json }
      complete_user_registration: {
        Args: { p_phone_number?: string; p_user_id: string }
        Returns: boolean
      }
      complete_user_verification: {
        Args: {
          p_user_id: string
          p_veriff_verification_id: string
          p_verification_data: Json
        }
        Returns: undefined
      }
      consolidate_profile_update_triggers: { Args: never; Returns: Json }
      create_notification: {
        Args: {
          notification_body: string
          notification_data?: Json
          notification_title: string
          notification_type: string
          p_idempotency_key?: string
          recipient_user_id: string
        }
        Returns: string
      }
      create_property_from_onboarding:
        | { Args: never; Returns: Json }
        | {
            Args: {
              p_onboarding_id: string
              p_step_1_data: Json
              p_step_2_data: Json
              p_step_3_data: Json
              p_step_4_data: Json
              p_user_id: string
            }
            Returns: string
          }
      create_referral_invitation:
        | {
            Args: { p_referred_email?: string; p_referrer_id: string }
            Returns: Json
          }
        | {
            Args: {
              p_referral_code: string
              p_referred_email: string
              p_referrer_id: string
            }
            Returns: Json
          }
      create_referral_record: {
        Args: { p_referred_email: string; p_referrer_id: string }
        Returns: Json
      }
      create_review: {
        Args: {
          accuracy_rating: number
          cleaning_rating: number
          communication_rating: number
          past_swap_uuid: string
          review_text_param?: string
        }
        Returns: string
      }
      create_sendgrid_edge_function: { Args: never; Returns: string }
      create_swap_request_notification: {
        Args: {
          guest_user_id: string
          host_user_id: string
          property_id: string
          request_type: string
          swap_request_id: string
        }
        Returns: string
      }
      create_verification_session: {
        Args: {
          p_person_data?: Json
          p_veriff_session_id: string
          p_veriff_url: string
        }
        Returns: string
      }
      cron_check_abandoned_users: { Args: never; Returns: undefined }
      cron_check_abandonments: { Args: never; Returns: undefined }
      current_user_is_verified: { Args: never; Returns: boolean }
      debug_image_upload_permission: {
        Args: { p_property_id: string; p_user_id?: string }
        Returns: Json
      }
      debug_onboarding_activity: {
        Args: { p_user_id?: string }
        Returns: {
          current_step: number
          last_activity_at: string
          onboarding_id: string
          status: string
          step_1_completed: boolean
          step_2_completed: boolean
          step_3_completed: boolean
          step_4_completed: boolean
          time_since_last_activity: unknown
          total_updates: number
          user_id: string
        }[]
      }
      debug_property_visibility: {
        Args: never
        Returns: {
          current_user_id: string
          is_own_property: boolean
          property_id: string
          property_owner_id: string
          property_title: string
          should_be_visible: boolean
        }[]
      }
      delete_abandoned_users_batch: {
        Args: { user_ids_to_delete: string[] }
        Returns: {
          deleted_user_id: string
          error_message: string
          success: boolean
        }[]
      }
      delete_all_abandoned_users: {
        Args: never
        Returns: {
          deleted_count: number
          failed_count: number
          user_ids: string[]
        }[]
      }
      delete_availability_slot: { Args: { slot_uuid: string }; Returns: Json }
      delete_availability_slot_safe: {
        Args: { confirm_deletion?: boolean; slot_uuid: string }
        Returns: Json
      }
      delete_user_for_edge_function: {
        Args: { bypass_checks?: boolean; target_user_id: string }
        Returns: Json
      }
      deny_swap_request: {
        Args: {
          p_host_message?: string
          p_refund_credits?: boolean
          p_request_id: string
        }
        Returns: Json
      }
      detect_and_log_image_issues: { Args: never; Returns: number }
      detect_and_mark_abandoned_users: { Args: never; Returns: undefined }
      detect_onboarding_abandonments: {
        Args: never
        Returns: {
          email: string
          full_name: string
          minutes_inactive: number
          new_abandonment: boolean
          phone: string
          step_abandoned: number
          step_name: string
          user_id: string
        }[]
      }
      detect_trigger_conflicts: {
        Args: never
        Returns: {
          conflict_description: string
          conflict_severity: string
          event_type: string
          recommended_action: string
          table_name: string
          timing: string
          trigger_count: number
          triggers: string[]
        }[]
      }
      detect_trigger_problems: {
        Args: never
        Returns: {
          affected_triggers: string[]
          description: string
          impact: string
          problem_type: string
          severity: string
          solution: string
          table_name: string
        }[]
      }
      dev_complete_user_onboarding: {
        Args: { p_phone_number?: string; p_user_id: string }
        Returns: Json
      }
      diagnose_favorites_issue: {
        Args: { p_user_email: string }
        Returns: {
          details: string
          issue_type: string
          recommendation: string
        }[]
      }
      diagnose_lisbon_properties_issue: {
        Args: never
        Returns: {
          details: Json
          diagnostic_type: string
          result: string
        }[]
      }
      diagnose_property_images: {
        Args: { p_property_id?: string }
        Returns: {
          has_main_image: boolean
          issue: string
          main_image_position: number
          owner_email: string
          property_id: string
          property_title: string
          recommendation: string
          total_images: number
        }[]
      }
      diagnose_property_loading: {
        Args: never
        Returns: {
          check_name: string
          details: Json
          result: string
        }[]
      }
      disable_email_system: {
        Args: { p_disabled_by?: string; p_reason?: string }
        Returns: Json
      }
      edge_delete_user_safely: {
        Args: { target_user_id: string }
        Returns: Json
      }
      email_exists: { Args: { p_email: string }; Returns: boolean }
      enable_email_system: { Args: { p_enabled_by?: string }; Returns: Json }
      enforce_correct_routing_after_auth: { Args: never; Returns: Json }
      enforce_onboarding_on_signin: { Args: never; Returns: Json }
      expire_old_swap_requests: { Args: never; Returns: number }
      expire_pending_swap_requests: {
        Args: never
        Returns: {
          expired_count: number
          request_ids: string[]
        }[]
      }
      expire_swap_requests: { Args: never; Returns: Json }
      expire_swap_requests_job: { Args: never; Returns: Json }
      extend_swap_request_expiry: {
        Args: { additional_hours?: number; request_id: string }
        Returns: Json
      }
      fetch_abandoned_users: {
        Args: {
          limit_count?: number
          min_days_inactive?: number
          status_filter?: string
        }
        Returns: {
          abandonment_status: string
          days_inactive: number
          days_since_signup: number
          eligible_for_email: boolean
          email: string
          email_sent: boolean
          full_name: string
          has_property: boolean
          last_activity_at: string
          property_step: number
          registration_step: string
          user_id: string
        }[]
      }
      finalize_property_onboarding: { Args: never; Returns: Json }
      find_properties_with_missing_images: {
        Args: never
        Returns: {
          actual_images: number
          address: string
          created_at: string
          expected_images: number
          images_missing: number
          property_id: string
          user_id: string
        }[]
      }
      find_recoverable_images: {
        Args: never
        Returns: {
          address: string
          images_in_database: number
          images_in_storage: number
          property_id: string
          recoverable_count: number
          user_id: string
        }[]
      }
      find_slow_queries: {
        Args: { duration_threshold?: unknown }
        Returns: {
          calls: number
          max_time: number
          mean_time: number
          query: string
          total_time: number
        }[]
      }
      fix_critical_trigger_conflicts: { Args: never; Returns: Json }
      fix_existing_abandoned_onboarding_images: {
        Args: never
        Returns: {
          images_transferred: number
          property_id: string
          status: string
          user_id: string
        }[]
      }
      fix_existing_user_credits: { Args: never; Returns: Json }
      fix_incorrectly_completed_onboarding: { Args: never; Returns: number }
      fix_missing_property_images: {
        Args: never
        Returns: {
          images_added: number
          main_image_set: string
          property_id: string
        }[]
      }
      fix_missing_user_profiles: { Args: never; Returns: Json }
      fix_user_registration: { Args: { user_email: string }; Returns: Json }
      force_clean_onboarding: {
        Args: { user_uuid: string }
        Returns: {
          message: string
          success: boolean
        }[]
      }
      force_complete_onboarding: {
        Args: { target_user_id: string }
        Returns: Json
      }
      force_upload_images: {
        Args: {
          p_admin_key?: string
          p_image_urls: string[]
          p_property_id: string
        }
        Returns: Json
      }
      frontend_health_check: { Args: never; Returns: Json }
      generate_article_slug: {
        Args: { article_title: string }
        Returns: string
      }
      generate_avatar_url: {
        Args: { file_extension?: string; user_uuid: string }
        Returns: string
      }
      generate_cron_edge_function_code: { Args: never; Returns: string }
      generate_function_alerts: { Args: never; Returns: number }
      generate_onboarding_magic_link: {
        Args: { p_expires_in_hours?: number; p_user_id: string }
        Returns: Json
      }
      generate_onboarding_resume_link: {
        Args: { p_user_id: string }
        Returns: Json
      }
      generate_referral_code: { Args: { user_id: string }; Returns: string }
      generate_trigger_conflict_report: { Args: never; Returns: Json }
      generate_unique_referral_code: {
        Args: { first_name: string }
        Returns: string
      }
      generate_user_referral_code: {
        Args: { p_first_name: string; p_user_id: string }
        Returns: string
      }
      generate_verification_code: { Args: never; Returns: string }
      generate_weekly_trigger_report: { Args: never; Returns: Json }
      geocode_address: { Args: { address_text: string }; Returns: Json }
      geocode_lisbon_properties: { Args: never; Returns: undefined }
      geocode_property_addresses: { Args: never; Returns: undefined }
      get_abandoned_klaviyo_users:
        | {
            Args: { p_hours_since_activity?: number; p_step?: number }
            Returns: {
              current_step: number
              email: string
              first_name: string
              hours_since_activity: number
              landing_page_source: string
              last_name: string
              phone_number: string
              step_data: Json
              step_name: string
              user_id: string
              utm_campaign: string
              utm_medium: string
              utm_source: string
            }[]
          }
        | {
            Args: {
              p_force_sync?: boolean
              p_hours_since_activity?: number
              p_limit?: number
              p_step?: number
            }
            Returns: {
              created_at: string
              current_step: number
              email: string
              first_name: string
              hours_since_activity: number
              landing_page_source: string
              last_activity_at: string
              last_name: string
              phone_number: string
              step_name: string
              user_id: string
              utm_campaign: string
              utm_medium: string
              utm_source: string
            }[]
          }
      get_abandoned_onboardings_admin: {
        Args: { p_hours_since_activity?: number; p_step?: number }
        Returns: {
          current_step: number
          email: string
          first_name: string
          last_activity_at: string
          last_name: string
          phone_number: string
          step_name: string
          user_id: string
        }[]
      }
      get_abandoned_users_by_step: {
        Args: { p_hours_since_activity?: number; p_step?: number }
        Returns: {
          current_step: number
          email: string
          first_name: string
          hours_since_activity: number
          last_name: string
          step_data: Json
          step_name: string
          user_id: string
        }[]
      }
      get_abandoned_users_dashboard: {
        Args: {
          p_include_sent?: boolean
          p_limit?: number
          p_min_minutes?: number
        }
        Returns: {
          abandonment_status: string
          email: string
          email_sent: boolean
          email_sent_at: string
          full_name: string
          has_property: boolean
          landing_page_source: string
          minutes_inactive: number
          phone_number: string
          resume_link: string
          step_name: string
          step_number: number
          time_ago: string
          user_id: string
          utm_campaign: string
          utm_medium: string
          utm_source: string
        }[]
      }
      get_abandoned_users_dashboard_v2: {
        Args: {
          p_include_sent?: boolean
          p_limit?: number
          p_min_minutes?: number
        }
        Returns: {
          abandonment_status: string
          email: string
          email_sent: boolean
          email_sent_at: string
          full_name: string
          has_property: boolean
          landing_page_source: string
          minutes_inactive: number
          phone_number: string
          resume_link: string
          step_name: string
          step_number: number
          time_ago: string
          user_id: string
          utm_campaign: string
          utm_medium: string
          utm_source: string
        }[]
      }
      get_abandoned_users_for_admin: {
        Args: never
        Returns: {
          abandoned_at: string
          can_send_email: boolean
          current_step: number
          email: string
          email_sent: boolean
          full_name: string
          last_activity_at: string
          minutes_inactive: number
          status: string
          step_name: string
          user_id: string
        }[]
      }
      get_abandoned_users_for_dashboard: {
        Args: never
        Returns: {
          abandoned_at: string
          can_send_email: boolean
          current_step: number
          email: string
          first_name: string
          last_activity_at: string
          last_name: string
          magic_link_sent: boolean
          time_since_abandonment: unknown
          user_id: string
        }[]
      }
      get_abandonment_alerts: {
        Args: never
        Returns: {
          alert_level: string
          details: Json
          message: string
        }[]
      }
      get_abandonment_cron_summary: {
        Args: never
        Returns: {
          metric: string
          value: string
        }[]
      }
      get_abandonment_dashboard_stats: {
        Args: never
        Returns: {
          currently_abandoned: number
          emails_pending: number
          emails_sent_today: number
          last_hour: number
          this_week: number
          today: number
        }[]
      }
      get_abandonment_email_status: {
        Args: never
        Returns: {
          count: number
          newest_pending: string
          oldest_pending: string
          status: string
        }[]
      }
      get_abandonment_metrics: {
        Args: never
        Returns: {
          metric_name: string
          metric_value: number
          percentage: number
        }[]
      }
      get_abandonment_stats_by_step: {
        Args: never
        Returns: {
          abandonment_rate: number
          avg_minutes_on_step: number
          step_name: string
          step_number: number
          total_abandonments: number
        }[]
      }
      get_admin_dashboard_data: {
        Args: never
        Returns: {
          approved_properties: number
          approved_users: number
          pending_properties: number
          pending_users: number
          recent_properties: Json
          recent_signups: Json
          total_properties: number
          total_users: number
        }[]
      }
      get_admin_pending_approvals: {
        Args: never
        Returns: {
          created_at: string
          days_waiting: number
          id: string
          title: string
          type: string
          user_name: string
        }[]
      }
      get_admin_property_details: {
        Args: { property_id: string }
        Returns: {
          amenities: Json
          bookings: Json
          images: Json
          owner: Json
          property: Json
          swap_requests: Json
        }[]
      }
      get_admin_redirect_only: { Args: { user_uuid: string }; Returns: string }
      get_admin_stats: { Args: never; Returns: Json }
      get_all_available_properties: {
        Args: never
        Returns: {
          bathrooms: number
          bedrooms: number
          city: string
          country: string
          created_at: string
          id: string
          main_image_url: string
          owner_avatar_url: string
          owner_first_name: string
          title: string
        }[]
      }
      get_all_properties_for_map: { Args: never; Returns: Json }
      get_all_properties_listing:
        | {
            Args: {
              exclude_featured?: boolean
              exclude_latest_members?: boolean
              limit_count?: number
              offset_count?: number
            }
            Returns: {
              address: string
              amenity_count: number
              avatar_url: string
              avg_rating: number
              bathrooms: number
              bedrooms: number
              children_friendly: boolean
              city: string
              country: string
              created_at: string
              description: string
              first_name: string
              image_count: number
              is_available: boolean
              main_image_url: string
              pets_friendly: boolean
              property_id: string
              property_type: string
              review_count: number
              square_metres: number
              title: string
              user_id: string
              username: string
            }[]
          }
        | {
            Args: never
            Returns: {
              bathrooms: number
              bedrooms: number
              city: string
              country: string
              created_at: string
              id: string
              image_count: number
              main_image_url: string
              owner_avatar_url: string
              owner_first_name: string
              title: string
            }[]
          }
      get_all_properties_no_filter: {
        Args: never
        Returns: {
          amenities: string[]
          avatar_url: string
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          description: string
          first_name: string
          general_area: string
          id: string
          images: Json[]
          last_name: string
          latitude: number
          longitude: number
          main_image_url: string
          pets_friendly: boolean
          property_type: string
          square_metres: number
          title: string
          updated_at: string
          user_id: string
          username: string
        }[]
      }
      get_all_properties_simple: {
        Args: never
        Returns: {
          id: string
          main_image_url: string
          title: string
          user_id: string
        }[]
      }
      get_all_public_properties: {
        Args: { max_results?: number }
        Returns: {
          address: string
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          description: string
          general_area: string
          id: string
          latitude: number
          longitude: number
          main_image_url: string
          pets_friendly: boolean
          property_type: string
          square_metres: number
          title: string
          updated_at: string
          user_id: string
        }[]
      }
      get_avatar_url: { Args: { p_user_id: string }; Returns: string }
      get_cached_counts: {
        Args: never
        Returns: {
          last_updated: string
          row_count: number
          table_name: string
        }[]
      }
      get_cached_properties: {
        Args: {
          exclude_own?: boolean
          limit_count?: number
          offset_count?: number
        }
        Returns: {
          amenities: string[]
          avatar_url: string
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          description: string
          first_name: string
          general_area: string
          id: string
          images: Json[]
          last_name: string
          latitude: number
          longitude: number
          main_image_url: string
          pets_friendly: boolean
          property_type: string
          square_metres: number
          title: string
          updated_at: string
          user_id: string
          username: string
        }[]
      }
      get_cached_properties_by_city: {
        Args: {
          exclude_own?: boolean
          limit_count?: number
          offset_count?: number
          search_city: string
        }
        Returns: {
          amenities: string[]
          avatar_url: string
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          description: string
          first_name: string
          general_area: string
          id: string
          images: Json[]
          last_name: string
          latitude: number
          longitude: number
          main_image_url: string
          pets_friendly: boolean
          property_type: string
          square_metres: number
          title: string
          updated_at: string
          user_id: string
          username: string
        }[]
      }
      get_cached_property_by_id: {
        Args: { property_id: string }
        Returns: {
          amenities: string[]
          avatar_url: string
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          description: string
          first_name: string
          general_area: string
          id: string
          images: Json[]
          last_name: string
          latitude: number
          longitude: number
          main_image_url: string
          pets_friendly: boolean
          property_type: string
          square_metres: number
          title: string
          updated_at: string
          user_id: string
          username: string
        }[]
      }
      get_credits_page_data: {
        Args: { p_user_id?: string }
        Returns: {
          credits: number
          is_admin: boolean
          referral_code: string
          referral_link: string
          share_message: string
          total_referrals: number
          user_email: string
          user_name: string
        }[]
      }
      get_credits_system_stats: { Args: never; Returns: Json }
      get_critical_issues: {
        Args: never
        Returns: {
          action: string
          count: number
          issue: string
          severity: string
        }[]
      }
      get_cron_job_status: {
        Args: never
        Returns: {
          is_active: boolean
          job_name: string
          last_error: string
          last_run: string
          next_run: string
          recent_failures: number
        }[]
      }
      get_cron_monitoring_status: {
        Args: never
        Returns: {
          metric: string
          status: string
          value: string
        }[]
      }
      get_cron_status: {
        Args: never
        Returns: {
          emails_sent: number
          enabled: boolean
          job_name: string
          last_run: string
          last_run_ago: unknown
          schedule: string
          success: boolean
          users_found: number
        }[]
      }
      get_cron_summary: {
        Args: never
        Returns: {
          metric: string
          value: string
        }[]
      }
      get_current_user_access: {
        Args: never
        Returns: {
          approval_status: string
          can_access_full_app: boolean
          is_admin: boolean
          onboarding_completed: boolean
          user_type: string
        }[]
      }
      get_email_template: {
        Args: {
          p_first_name?: string
          p_minutes_inactive?: number
          p_step_number: number
        }
        Returns: string
      }
      get_expiring_swap_requests: {
        Args: { hours_ahead?: number }
        Returns: {
          created_at: string
          expires_at: string
          guest_id: string
          host_id: string
          hours_until_expiry: number
          id: string
          property_id: string
        }[]
      }
      get_featured_destinations: {
        Args: { limit_count?: number }
        Returns: {
          available_properties: number
          avg_bedrooms: number
          avg_square_metres: number
          city: string
          country: string
          custom_description: string
          custom_image_url: string
          destination_id: string
          destination_name: string
          display_order: number
          featured_at: string
          highlight_color: string
          property_count: number
          sample_images: string[]
        }[]
      }
      get_featured_properties:
        | {
            Args: never
            Returns: {
              avatar_url: string
              bathrooms: number
              bedrooms: number
              city: string
              country: string
              created_at: string
              first_name: string
              id: string
              main_image_url: string
              title: string
            }[]
          }
        | {
            Args: { limit_count?: number }
            Returns: {
              amenity_count: number
              avg_rating: number
              bathrooms: number
              bedrooms: number
              children_friendly: boolean
              city: string
              country: string
              description: string
              featured_at: string
              featured_position: number
              is_available: boolean
              main_image_url: string
              owner_avatar_url: string
              owner_username: string
              pets_friendly: boolean
              property_id: string
              property_type: string
              review_count: number
              square_metres: number
              title: string
            }[]
          }
      get_featured_properties_fast: {
        Args: never
        Returns: {
          bathrooms: number
          bedrooms: number
          city: string
          country: string
          description: string
          feature_position: number
          id: string
          main_image_url: string
          property_type: string
          title: string
        }[]
      }
      get_homepage_properties: {
        Args: {
          exclude_own?: boolean
          filter_bedrooms?: number
          filter_city?: string
          filter_country?: string
          filter_pets?: boolean
          page_offset?: number
          page_size?: number
        }
        Returns: {
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          id: string
          medium_image_url: string
          owner_avatar: string
          owner_name: string
          pets_friendly: boolean
          property_type: string
          thumbnail_url: string
          title: string
          verified: boolean
        }[]
      }
      get_homepage_properties_cards: {
        Args: never
        Returns: {
          avatar_url: string
          bathrooms: number
          bedrooms: number
          city: string
          country: string
          created_at: string
          first_name: string
          id: string
          image_count: number
          main_image_url: string
          title: string
        }[]
      }
      get_klaviyo_sync_status: { Args: never; Returns: Json }
      get_landing_page_stats: { Args: never; Returns: Json }
      get_latest_members_properties:
        | {
            Args: { days_back?: number; limit_count?: number }
            Returns: {
              amenity_count: number
              avatar_url: string
              bathrooms: number
              bedrooms: number
              city: string
              country: string
              first_name: string
              is_available: boolean
              last_name: string
              main_image_url: string
              property_created_at: string
              property_id: string
              square_metres: number
              title: string
              user_created_at: string
              user_id: string
            }[]
          }
        | {
            Args: never
            Returns: {
              avatar_url: string
              bathrooms: number
              bedrooms: number
              city: string
              country: string
              created_at: string
              first_name: string
              id: string
              image_count: number
              last_name: string
              main_image_url: string
              title: string
            }[]
          }
      get_map_coordinates: { Args: { property_id: string }; Returns: Json }
      get_message_reactions: {
        Args: { msg_id: string }
        Returns: {
          count: number
          emoji: string
          user_ids: string[]
        }[]
      }
      get_monitoring_history: {
        Args: { limit_count?: number }
        Returns: {
          broken_before: number
          execution_time_ms: number
          failed: number
          fixed: number
          run_at: string
          severity: string
          status: string
        }[]
      }
      get_monitoring_status: {
        Args: never
        Returns: {
          active: boolean
          job_name: string
          last_run: string
          last_status: string
          next_run: string
          recent_failures: number
          schedule: string
        }[]
      }
      get_monitoring_summary: {
        Args: never
        Returns: {
          description: string
          metric_name: string
          metric_value: string
          status: string
        }[]
      }
      get_my_user_state: { Args: never; Returns: Json }
      get_nearby_activities: {
        Args: { p_category?: string; p_property_id: string }
        Returns: {
          address: string
          category: string
          distance_meters: number
          google_url: string
          id: string
          latitude: number
          longitude: number
          name: string
          opening_hours: Json
          phone: string
          photos: string[]
          price_level: number
          rating: number
          website: string
        }[]
      }
      get_newsletter_stats: { Args: never; Returns: Json }
      get_notifications: {
        Args: {
          limit_count?: number
          offset_count?: number
          unread_only?: boolean
        }
        Returns: {
          body: string
          created_at: string
          data: Json
          id: string
          is_read: boolean
          read_at: string
          title: string
          type: string
        }[]
      }
      get_onboarding_abandonments: {
        Args: { max_minutes?: number; min_minutes?: number }
        Returns: {
          email: string
          full_name: string
          last_seen: string
          minutes_inactive: number
          minutes_on_step: number
          phone: string
          status: string
          step_name: string
          step_number: number
          user_id: string
        }[]
      }
      get_onboarding_abandonments_admin: {
        Args: never
        Returns: {
          abandoned_at: string
          abandonment_reason: string
          step: number
          step_name: string
          time_on_step_ms: number
          user_id: string
        }[]
      }
      get_onboarding_funnel_analytics: { Args: never; Returns: Json }
      get_onboarding_resume_step: { Args: { p_user_id: string }; Returns: Json }
      get_optimized_image_url: {
        Args: {
          format?: string
          height?: number
          original_url: string
          quality?: number
          width?: number
        }
        Returns: string
      }
      get_or_create_conversation: {
        Args: { swap_request?: string; user1: string; user2: string }
        Returns: string
      }
      get_pending_automation_tasks: { Args: never; Returns: Json }
      get_pending_klaviyo_users: {
        Args: never
        Returns: {
          created_at: string
          email: string
          first_name: string
          landing_page_source: string
          last_name: string
          onboarding_completed: boolean
          phone_number: string
          referral_code: string
          user_id: string
          utm_campaign: string
          utm_medium: string
          utm_source: string
        }[]
      }
      get_pending_newsletter_klaviyo: {
        Args: never
        Returns: {
          created_at: string
          destination_city: string
          email: string
          first_name: string
          id: string
          landing_page_source: string
          last_name: string
          utm_campaign: string
          utm_medium: string
          utm_source: string
        }[]
      }
      get_phone_verification_status: {
        Args: { p_user_id: string }
        Returns: Json
      }
      get_post_login_redirect: { Args: { p_user_id: string }; Returns: Json }
      get_properties_by_city: {
        Args: { city_name: string; country_name?: string }
        Returns: {
          address: string
          approval_status: string
          approved_at: string | null
          approved_by: string | null
          attractiveness: number | null
          bathrooms: number | null
          bedrooms: number | null
          beds: number | null
          children_friendly: boolean
          city: string | null
          country: string | null
          created_at: string
          description: string | null
          general_area: string | null
          id: string
          is_visible: boolean
          latitude: number | null
          longitude: number | null
          main_image_url: string | null
          pets_friendly: boolean
          property_type: string
          rejected_at: string | null
          rejection_reason: string | null
          smoking_allowed: boolean
          square_metres: number | null
          title: string | null
          updated_at: string
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "properties"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_properties_by_city_name: {
        Args: { city_name: string; limit_count?: number }
        Returns: {
          bathrooms: number
          bedrooms: number
          city: string
          country: string
          created_at: string
          latitude: number
          longitude: number
          main_image_url: string
          property_id: string
          square_metres: number
          title: string
        }[]
      }
      get_properties_fast: {
        Args: {
          p_bedrooms?: number
          p_city?: string
          p_country?: string
          p_limit?: number
          p_offset?: number
          p_property_type?: string
          p_user_id?: string
        }
        Returns: {
          amenities: string[]
          attractiveness: number
          bathrooms: number
          bedrooms: number
          beds: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          description: string
          general_area: string
          id: string
          image_count: number
          is_featured: boolean
          is_visible: boolean
          latitude: number
          longitude: number
          main_image_url: string
          owner_avatar: string
          owner_first_name: string
          owner_last_name: string
          owner_verified: boolean
          pets_friendly: boolean
          property_type: string
          square_metres: number
          title: string
          updated_at: string
          user_id: string
        }[]
      }
      get_properties_for_display:
        | {
            Args: {
              exclude_own_properties?: boolean
              limit_count?: number
              offset_count?: number
            }
            Returns: {
              amenities: string[]
              avatar_url: string
              bathrooms: number
              bedrooms: number
              children_friendly: boolean
              city: string
              country: string
              created_at: string
              description: string
              first_name: string
              general_area: string
              id: string
              images: Json[]
              last_name: string
              latitude: number
              longitude: number
              main_image_url: string
              medium_image_url: string
              pets_friendly: boolean
              property_type: string
              square_metres: number
              thumbnail_url: string
              title: string
              updated_at: string
              user_id: string
              username: string
              verified: boolean
            }[]
          }
        | {
            Args: never
            Returns: {
              bathrooms: number
              bedrooms: number
              city: string
              country: string
              created_at: string
              id: string
              main_image_url: string
              owner_avatar_url: string
              owner_first_name: string
              title: string
            }[]
          }
      get_properties_for_homepage: {
        Args: never
        Returns: {
          bathrooms: number
          bedrooms: number
          city: string
          country: string
          created_at: string
          id: string
          main_image_url: string
          owner_avatar_url: string
          owner_first_name: string
          title: string
        }[]
      }
      get_properties_for_map: {
        Args: never
        Returns: {
          bathrooms: number
          bedrooms: number
          city: string
          country: string
          id: string
          latitude: number
          longitude: number
          main_image_url: string
          property_type: string
          square_metres: number
          title: string
        }[]
      }
      get_properties_homepage: {
        Args: { limit_count?: number; offset_count?: number }
        Returns: {
          avatar_url: string
          bathrooms: number
          bedrooms: number
          city: string
          country: string
          created_at: string
          first_name: string
          id: string
          image_count: number
          main_image_url: string
          title: string
        }[]
      }
      get_properties_lightning_fast: {
        Args: { p_user_id?: string }
        Returns: {
          amenities: Json
          approval_status: string
          approved_at: string
          availability: Json
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          description: string
          general_area: string
          id: string
          images: Json
          is_favorited: boolean
          is_visible: boolean
          latitude: number
          longitude: number
          main_image_url: string
          owner_avatar: string
          owner_name: string
          owner_type: string
          pets_friendly: boolean
          property_type: string
          square_metres: number
          title: string
          updated_at: string
          user_id: string
        }[]
      }
      get_properties_listing_count: {
        Args: { exclude_featured?: boolean; exclude_latest_members?: boolean }
        Returns: number
      }
      get_properties_optimized:
        | {
            Args: {
              filter_city?: string
              filter_country?: string
              limit_count?: number
              offset_count?: number
            }
            Returns: {
              address: string
              amenities: string[]
              avatar_url: string
              bathrooms: number
              bedrooms: number
              children_friendly: boolean
              city: string
              country: string
              description: string
              first_name: string
              images: Json
              last_name: string
              latitude: number
              longitude: number
              main_image_url: string
              pets_friendly: boolean
              property_id: string
              property_type: string
              square_metres: number
              title: string
              user_id: string
              username: string
              verified: boolean
            }[]
          }
        | {
            Args: {
              exclude_own?: boolean
              filter_city?: string
              filter_country?: string
              limit_count?: number
              offset_count?: number
            }
            Returns: {
              address: string
              amenities: string[]
              avatar_url: string
              bathrooms: number
              bedrooms: number
              children_friendly: boolean
              city: string
              country: string
              description: string
              first_name: string
              id: string
              images: Json
              last_name: string
              latitude: number
              longitude: number
              main_image_url: string
              pets_friendly: boolean
              property_type: string
              square_metres: number
              title: string
              user_id: string
              username: string
              verified: boolean
            }[]
          }
      get_properties_public: {
        Args: never
        Returns: {
          amenities: Json
          availability: Json
          bathrooms: number
          bedrooms: number
          city: string
          country: string
          created_at: string
          description: string
          id: string
          images: Json
          main_image_url: string
          owner_name: string
          property_type: string
          square_metres: number
          title: string
        }[]
      }
      get_properties_with_full_details: {
        Args: never
        Returns: {
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          description: string
          id: string
          latitude: number
          longitude: number
          main_image_url: string
          owner_avatar_url: string
          owner_bio: string
          owner_first_name: string
          owner_last_name: string
          pets_friendly: boolean
          square_metres: number
          title: string
        }[]
      }
      get_property_coordinates: { Args: { property_id: string }; Returns: Json }
      get_property_images_batch: {
        Args: { property_ids: string[] }
        Returns: {
          created_at: string
          image_url: string
          is_main: boolean
          property_id: string
        }[]
      }
      get_property_listings: {
        Args: { p_user_id?: string }
        Returns: {
          approval_status: string
          approved_at: string
          approved_by: string
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          description: string
          general_area: string
          id: string
          latitude: number
          longitude: number
          main_image_url: string
          pets_friendly: boolean
          property_type: string
          square_metres: number
          title: string
          updated_at: string
          user_id: string
        }[]
      }
      get_property_location_data: {
        Args: { property_id: string }
        Returns: Json
      }
      get_property_map_data: {
        Args: { property_id?: string }
        Returns: {
          address: string
          bathrooms: number
          bedrooms: number
          city: string
          country: string
          id: string
          latitude: number
          longitude: number
          main_image_url: string
          property_type: string
          thumbnail_url: string
          title: string
        }[]
      }
      get_property_with_neighborhood: {
        Args: { property_id: string }
        Returns: {
          nearby_places: Json
          property: Json
        }[]
      }
      get_public_profile_safe: {
        Args: { target_user_id: string }
        Returns: Json
      }
      get_public_property_listings: {
        Args: never
        Returns: {
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          id: string
          latitude: number
          longitude: number
          main_image_url: string
          owner_avatar_url: string
          owner_first_name: string
          pets_friendly: boolean
          square_metres: number
          title: string
        }[]
      }
      get_recent_activity: { Args: { limit_count?: number }; Returns: Json }
      get_recent_function_issues: {
        Args: { p_hours?: number }
        Returns: {
          function_name: string
          issue_count: number
          issue_type: string
          last_occurrence: string
          sample_error: string
        }[]
      }
      get_referral_domain: { Args: never; Returns: string }
      get_referral_link: { Args: { user_uuid: string }; Returns: string }
      get_referral_stats: { Args: { user_uuid: string }; Returns: Json }
      get_referrer_from_slug: { Args: { slug: string }; Returns: Json }
      get_registration_status: { Args: { p_user_id?: string }; Returns: Json }
      get_review_system_stats: { Args: never; Returns: Json }
      get_swap_request_with_expiry: {
        Args: { request_id: string }
        Returns: {
          created_at: string
          expires_at: string
          guest_id: string
          host_id: string
          host_message: string
          hours_remaining: number
          id: string
          is_expired: boolean
          property_id: string
          status: string
          type: string
          updated_at: string
        }[]
      }
      get_top_destinations: {
        Args: { limit_count?: number }
        Returns: {
          available_properties: number
          avg_bedrooms: number
          avg_square_metres: number
          center_lat: number
          center_lng: number
          city: string
          country: string
          destination: string
          destination_image: string
          host_count: number
          property_count: number
        }[]
      }
      get_trigger_cleanup_recommendations: {
        Args: never
        Returns: {
          issue: string
          priority: number
          recommended_action: string
          table_name: string
          triggers_to_review: string[]
        }[]
      }
      get_trigger_health_report: {
        Args: never
        Returns: {
          category: string
          metric: string
          status: string
          value: string
        }[]
      }
      get_trigger_monitoring_history: {
        Args: { p_days?: number }
        Returns: {
          alert_message: string
          alerts_sent: boolean
          conflict_percentage: number
          critical_count: number
          max_triggers: number
          overall_health: string
          run_date: string
          run_time: string
          warning_count: number
        }[]
      }
      get_unread_count: { Args: never; Returns: number }
      get_user_availability_slots: {
        Args: { property_uuid?: string }
        Returns: {
          created_at: string
          end_date: string
          has_accepted_requests: boolean
          has_pending_requests: boolean
          property_id: string
          property_title: string
          slot_id: string
          start_date: string
          total_requests: number
        }[]
      }
      get_user_average_ratings: {
        Args: { user_uuid: string }
        Returns: {
          accuracy_avg: number
          average_rating: number
          cleaning_avg: number
          communication_avg: number
          total_reviews: number
        }[]
      }
      get_user_credit_summary: {
        Args: { user_id_param: string }
        Returns: {
          current_credits: number
          recent_transactions: Json
          registration_bonus_received: boolean
          total_earned: number
          total_spent: number
        }[]
      }
      get_user_dashboard_status: { Args: { p_user_id?: string }; Returns: Json }
      get_user_deletion_history: {
        Args: { limit_count?: number }
        Returns: {
          cleanup_completed: boolean
          created_at: string
          deleted_at: string
          deleted_user_id: string
          id: string
        }[]
      }
      get_user_favorites: {
        Args: never
        Returns: {
          avatar_url: string
          city: string
          country: string
          created_at: string
          first_name: string
          id: string
          main_image_url: string
          title: string
        }[]
      }
      get_user_favorites_fast: {
        Args: { p_user_id: string }
        Returns: {
          bedrooms: number
          city: string
          country: string
          created_at: string
          description: string
          main_image_url: string
          property_id: string
          property_type: string
          title: string
        }[]
      }
      get_user_favorites_with_details: {
        Args: never
        Returns: {
          address: string
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          description: string
          favorited_at: string
          host_avatar: string
          host_name: string
          id: string
          images: string[]
          main_image_url: string
          pets_friendly: boolean
          property_type: string
          square_metres: number
          title: string
        }[]
      }
      get_user_notifications_optimized: {
        Args: { limit_count?: number; unread_only?: boolean; user_uuid: string }
        Returns: {
          body: string
          created_at: string
          data: Json
          notification_id: string
          read_at: string
          title: string
          type: string
        }[]
      }
      get_user_onboarding_resume_info: {
        Args: { p_user_id: string }
        Returns: Json
      }
      get_user_onboarding_status: {
        Args: { p_user_id?: string }
        Returns: Json
      }
      get_user_profile_data: { Args: { target_user_id: string }; Returns: Json }
      get_user_properties: {
        Args: { p_user_id?: string }
        Returns: {
          address: string
          approval_status: string
          availability_slots_count: number
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          description: string
          has_coordinates: boolean
          id: string
          image_count: number
          main_image_url: string
          pets_friendly: boolean
          property_type: string
          square_metres: number
          title: string
          updated_at: string
        }[]
      }
      get_user_referral_info: { Args: { p_user_id?: string }; Returns: Json }
      get_user_referral_link: {
        Args: { p_user_id?: string }
        Returns: {
          credits: number
          full_link: string
          referral_code: string
          total_referrals: number
        }[]
      }
      get_user_referral_stats: { Args: { p_user_id: string }; Returns: Json }
      get_user_referrals_safe: {
        Args: { user_uuid: string }
        Returns: {
          completed_at: string
          created_at: string
          id: string
          referred_user_exists: boolean
          status: string
        }[]
      }
      get_user_reviews: {
        Args: { limit_count?: number; user_uuid: string }
        Returns: {
          created_at: string
          id: string
          overall_rating: number
          rating_accuracy: number
          rating_cleaning: number
          rating_communication: number
          review_text: string
          reviewer_avatar_url: string
          reviewer_first_name: string
          reviewer_last_name: string
          swap_end_date: string
          swap_start_date: string
        }[]
      }
      get_user_status: { Args: { p_user_id: string }; Returns: Json }
      get_user_status_bulletproof: {
        Args: { user_uuid: string }
        Returns: Json
      }
      get_user_status_fast: { Args: { user_uuid: string }; Returns: Json }
      get_user_status_immediate: { Args: { p_user_id: string }; Returns: Json }
      get_user_swap_requests_optimized: {
        Args: { filter_type?: string; user_uuid: string }
        Returns: {
          created_at: string
          expires_at: string
          guest_id: string
          guest_name: string
          host_id: string
          host_name: string
          property_id: string
          property_image: string
          property_title: string
          requested_end_date: string
          requested_start_date: string
          slot_id: string
          status: string
          swap_id: string
          swap_type: string
        }[]
      }
      get_user_verification_status: {
        Args: { p_user_id: string }
        Returns: Json
      }
      get_users_batch: {
        Args: { batch_size?: number; last_id?: string }
        Returns: {
          approval_status: string
          created_at: string
          credits: number
          email: string
          first_name: string
          has_property: boolean
          id: string
          last_name: string
          phone_number: string
          user_id: string
          user_type: string
        }[]
      }
      get_users_for_email_campaign: {
        Args: { p_email_type?: string }
        Returns: {
          attempt_count: number
          current_step: number
          email: string
          first_name: string
          hours_abandoned: number
          last_name: string
          onboarding_id: string
          step_data: Json
          step_name: string
          user_id: string
        }[]
      }
      get_users_for_klaviyo_abandoned: {
        Args: never
        Returns: {
          abandoned_at: string
          current_step: number
          days_since_activity: number
          email: string
          first_name: string
          last_activity_at: string
          last_name: string
          phone_number: string
          user_id: string
        }[]
      }
      get_users_for_klaviyo_completed: {
        Args: never
        Returns: {
          created_at: string
          email: string
          first_name: string
          last_name: string
          onboarding_completed: boolean
          phone_number: string
          property_count: number
          user_id: string
        }[]
      }
      handle_avatar_upload: {
        Args: { p_file_path: string; p_user_id: string }
        Returns: Json
      }
      handle_expired_swap_requests: { Args: never; Returns: undefined }
      handle_onboarding_exit: { Args: { p_step?: number }; Returns: Json }
      handle_onboarding_resume: {
        Args: { p_token?: string; p_user_id: string }
        Returns: Json
      }
      handle_test_phone_signup: {
        Args: { p_phone_number: string; p_user_id?: string }
        Returns: Json
      }
      insert_property_fast: { Args: { p_data: Json }; Returns: Json }
      is_admin: { Args: { user_uuid: string }; Returns: boolean }
      is_admin_cached: { Args: { user_uuid: string }; Returns: boolean }
      is_admin_instant: { Args: { user_uuid: string }; Returns: boolean }
      is_admin_user:
        | {
            Args: { check_email?: string; check_user_id?: string }
            Returns: boolean
          }
        | { Args: { user_uuid: string }; Returns: boolean }
      is_admin_without_rls: {
        Args: { check_user_id: string }
        Returns: boolean
      }
      is_conversation_participant: {
        Args: { conversation_uuid: string; user_uuid: string }
        Returns: boolean
      }
      is_current_user_admin: { Args: never; Returns: boolean }
      is_own_property: { Args: { property_id: string }; Returns: boolean }
      is_slot_available: {
        Args: {
          p_end_date: string
          p_exclude_slot_id?: string
          p_property_id: string
          p_start_date: string
        }
        Returns: boolean
      }
      is_superadmin: { Args: { check_user_id: string }; Returns: boolean }
      is_test_phone_number: { Args: { phone: string }; Returns: boolean }
      is_user_approved: { Args: { user_uuid: string }; Returns: boolean }
      is_user_in_conversation: {
        Args: { conversation_uuid: string; user_uuid: string }
        Returns: boolean
      }
      is_user_verified: { Args: { user_uuid: string }; Returns: boolean }
      list_properties: {
        Args: never
        Returns: {
          address: string
          approval_status: string
          approved_at: string | null
          approved_by: string | null
          attractiveness: number | null
          bathrooms: number | null
          bedrooms: number | null
          beds: number | null
          children_friendly: boolean
          city: string | null
          country: string | null
          created_at: string
          description: string | null
          general_area: string | null
          id: string
          is_visible: boolean
          latitude: number | null
          longitude: number | null
          main_image_url: string | null
          pets_friendly: boolean
          property_type: string
          rejected_at: string | null
          rejection_reason: string | null
          smoking_allowed: boolean
          square_metres: number | null
          title: string | null
          updated_at: string
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "properties"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      log_duplicate_signup_attempt: {
        Args: {
          p_attempted_provider: string
          p_email: string
          p_ip_address?: string
          p_user_agent?: string
        }
        Returns: undefined
      }
      log_function_execution: {
        Args: {
          p_context?: Json
          p_duration_ms?: number
          p_error_message?: string
          p_execution_type: string
          p_function_name: string
          p_related_record_id?: string
          p_related_table?: string
          p_user_id?: string
        }
        Returns: string
      }
      manual_check_abandoned_users: { Args: never; Returns: Json }
      manual_process_abandonments: { Args: never; Returns: Json }
      manual_trigger_health_check: { Args: never; Returns: Json }
      manually_link_images: {
        Args: { p_image_urls: string[]; p_property_id: string }
        Returns: Json
      }
      mark_abandoned_onboarding_users: { Args: never; Returns: number }
      mark_abandoned_onboardings: { Args: never; Returns: number }
      mark_abandonment_email_sent: {
        Args: { p_user_ids: string[] }
        Returns: number
      }
      mark_all_notifications_read: { Args: never; Returns: number }
      mark_as_test_phone: {
        Args: { p_phone_number: string }
        Returns: undefined
      }
      mark_avatar_prompted:
        | { Args: { p_user_id?: string }; Returns: undefined }
        | { Args: never; Returns: boolean }
      mark_klaviyo_sent: { Args: { p_user_ids: string[] }; Returns: number }
      mark_notification_read: {
        Args: { is_read?: boolean; notification_id: string }
        Returns: boolean
      }
      mark_onboarding_abandoned: {
        Args: {
          p_abandonment_reason: string
          p_step: number
          p_step_name: string
          p_time_on_step_ms: number
        }
        Returns: Json
      }
      mark_onboarding_complete: {
        Args: { p_skip_email_verification?: boolean; p_user_id: string }
        Returns: Json
      }
      mark_users_sent_to_klaviyo: {
        Args: { list_id: string; user_ids: string[] }
        Returns: Json
      }
      monitor_and_heal_property_creation: { Args: never; Returns: Json }
      monitor_and_heal_with_logging: { Args: never; Returns: Json }
      monitor_onboarding_calls: {
        Args: never
        Returns: {
          call_count: number
          last_call: string
          potential_issue: boolean
          user_id: string
        }[]
      }
      monitor_recursive_onboarding_calls: {
        Args: never
        Returns: {
          calls_last_5_seconds: number
          calls_last_minute: number
          potential_issue: boolean
          unique_data_variations: number
          user_id: string
        }[]
      }
      move_completed_bookings_to_past_swaps: { Args: never; Returns: undefined }
      move_temp_images_to_property: {
        Args: { p_property_id: string; p_user_id: string }
        Returns: undefined
      }
      normalize_phone_number: { Args: { phone: string }; Returns: string }
      prepare_referral_for_signup: {
        Args: { p_email: string; p_referral_code: string }
        Returns: Json
      }
      prepare_sendgrid_email: {
        Args: { p_email_queue_id: string }
        Returns: Json
      }
      preview_abandonment_emails: {
        Args: never
        Returns: {
          email: string
          email_subject: string
          minutes_inactive: number
          name: string
          preview_snippet: string
          step_name: string
          step_number: number
        }[]
      }
      preview_user_deletion_impact: {
        Args: { target_user_id: string }
        Returns: Json
      }
      process_abandoned_users: { Args: never; Returns: Json }
      process_all_emails: {
        Args: never
        Returns: {
          details: Json
          failed: number
          processed: number
          skipped: number
        }[]
      }
      process_cache_refresh_queue: { Args: never; Returns: undefined }
      process_emails_direct: {
        Args: never
        Returns: {
          failed_count: number
          message: string
          processed_count: number
        }[]
      }
      process_image_upload_queue: { Args: never; Returns: Json }
      process_onboarding_abandonments: { Args: never; Returns: Json }
      process_past_swaps_automation: { Args: never; Returns: Json }
      process_referral_during_signup: {
        Args: { p_email: string; p_referral_code: string }
        Returns: Json
      }
      process_referral_signup: {
        Args: {
          p_new_user_email: string
          p_new_user_id: string
          p_referral_code: string
        }
        Returns: Json
      }
      property_has_coordinates: {
        Args: { property_id: string }
        Returns: boolean
      }
      public_check_phone_availability: {
        Args: { p_phone_number: string }
        Returns: Json
      }
      public_validate_referral_code: {
        Args: { p_referral_code: string }
        Returns: Json
      }
      queue_property_images: {
        Args: { p_images: Json; p_property_id: string }
        Returns: Json
      }
      record_abandonment_email_sent: {
        Args: {
          p_email_type: string
          p_onboarding_id: string
          p_step: number
          p_user_id: string
        }
        Returns: string
      }
      recover_orphaned_property_images: {
        Args: { p_property_id: string }
        Returns: Json
      }
      refresh_admin_stats: { Args: never; Returns: undefined }
      refresh_avatar_cache: { Args: { user_uuid: string }; Returns: undefined }
      refresh_nearby_activities_from_google: {
        Args: { p_force_refresh?: boolean; p_property_id: string }
        Returns: Json
      }
      refresh_properties_cache: { Args: never; Returns: undefined }
      refresh_property_listing_cache: { Args: never; Returns: undefined }
      refresh_property_listing_view: { Args: never; Returns: undefined }
      refresh_top_destinations: { Args: never; Returns: undefined }
      reject_user: {
        Args: { reason?: string; user_uuid: string }
        Returns: undefined
      }
      remove_avatar: { Args: { p_user_id: string }; Returns: boolean }
      request_phone_verification: {
        Args: { p_phone_number: string }
        Returns: Json
      }
      request_phone_verification_with_user: {
        Args: { p_phone_number: string; p_user_id: string }
        Returns: Json
      }
      reset_admin_password_now: { Args: never; Returns: Json }
      reset_failed_onboarding: { Args: never; Returns: Json }
      reset_klaviyo_status: { Args: { input_user_id: string }; Returns: number }
      reset_newsletter_klaviyo_status: {
        Args: { subscriber_email: string }
        Returns: number
      }
      resume_onboarding: { Args: { p_user_id: string }; Returns: Json }
      retry_image_insertion_for_property: {
        Args: { p_property_id: string }
        Returns: Json
      }
      run_credits_system_maintenance: { Args: never; Returns: string }
      run_daily_trigger_monitoring: { Args: never; Returns: Json }
      run_trigger_monitoring_check: { Args: never; Returns: Json }
      safe_create_trigger: {
        Args: {
          p_event_type: string
          p_force?: boolean
          p_function_name: string
          p_table_name: string
          p_timing: string
          p_trigger_name: string
        }
        Returns: Json
      }
      safe_delete_user: {
        Args: { confirmation_text?: string; target_user_id: string }
        Returns: Json
      }
      safe_phone_verification: { Args: never; Returns: Json }
      save_onboarding_step: {
        Args: { p_complete_step?: boolean; p_data: Json; p_step: number }
        Returns: Json
      }
      save_onboarding_step_internal: {
        Args: {
          p_complete_step?: boolean
          p_data: Json
          p_step: number
          p_user_id: string
        }
        Returns: Json
      }
      save_onboarding_step_with_validation: {
        Args: {
          p_complete_step?: boolean
          p_data: Json
          p_step: number
          p_user_id: string
        }
        Returns: Json
      }
      schedule_verification_cleanup: { Args: never; Returns: number }
      search_properties: {
        Args: { search_term: string }
        Returns: {
          address: string
          approval_status: string
          city: string
          country: string
          created_at: string
          id: string
          owner_name: string
          property_type: string
          title: string
        }[]
      }
      search_properties_by_location: {
        Args: { limit_count?: number; search_term?: string }
        Returns: {
          address: string
          approval_status: string
          bathrooms: number
          bedrooms: number
          children_friendly: boolean
          city: string
          country: string
          created_at: string
          description: string
          general_area: string
          id: string
          is_visible: boolean
          latitude: number
          longitude: number
          main_image_url: string
          pets_friendly: boolean
          property_type: string
          square_metres: number
          title: string
          updated_at: string
          user_id: string
        }[]
      }
      search_properties_fast: {
        Args: {
          limit_count?: number
          max_bedrooms?: number
          min_bedrooms?: number
          offset_count?: number
          search_city?: string
          search_country?: string
        }
        Returns: {
          avatar_url: string
          bathrooms: number
          bedrooms: number
          city: string
          country: string
          first_name: string
          id: string
          main_image_url: string
          title: string
          username: string
        }[]
      }
      search_users: {
        Args: { search_term: string }
        Returns: {
          approval_status: string
          created_at: string
          credits: number
          email: string
          full_name: string
          id: string
          phone_number: string
          user_id: string
          user_type: string
        }[]
      }
      send_abandonment_emails: { Args: never; Returns: number }
      send_abandonment_emails_cron: { Args: never; Returns: Json }
      send_abandonment_emails_via_sendgrid: { Args: never; Returns: Json }
      send_user_to_klaviyo: { Args: { p_user_id: string }; Returns: Json }
      service_role_delete_user: {
        Args: { target_user_id: string }
        Returns: Json
      }
      set_property_main_image: {
        Args: { p_image_id: string; p_property_id: string }
        Returns: boolean
      }
      should_allow_onboarding: { Args: { p_user_id: string }; Returns: Json }
      should_prompt_for_avatar: {
        Args: { p_user_id?: string }
        Returns: boolean
      }
      should_show_avatar_prompt: { Args: { p_user_id: string }; Returns: Json }
      should_show_onboarding: {
        Args: { check_user_id: string }
        Returns: boolean
      }
      skip_user_onboarding: { Args: { user_email: string }; Returns: Json }
      start_or_get_onboarding:
        | { Args: { p_user_id?: string }; Returns: Json }
        | { Args: never; Returns: Json }
      sync_all_pending_klaviyo_users: { Args: never; Returns: Json }
      sync_user_verification_statuses: {
        Args: never
        Returns: {
          changes_made: string[]
          email: string
          user_id: string
        }[]
      }
      system_status: { Args: never; Returns: string }
      test_avatar_display: {
        Args: { p_email?: string }
        Returns: {
          avatar_exists: boolean
          avatar_url: string
          file_size: number
          last_updated: string
          status: string
          test_url: string
        }[]
      }
      test_critical_function: {
        Args: { p_function_name: string; p_test_context?: Json }
        Returns: Json
      }
      test_deletion_system: { Args: never; Returns: Json }
      test_image_upload_permission: {
        Args: { p_property_id: string }
        Returns: Json
      }
      test_map_data: { Args: never; Returns: Json }
      test_property_creation_monitoring: { Args: never; Returns: Json }
      test_property_visibility: { Args: never; Returns: Json }
      test_referral_credits_system: { Args: never; Returns: Json }
      test_referral_system: { Args: { p_referral_code: string }; Returns: Json }
      test_sendgrid_email: { Args: { p_test_email?: string }; Returns: Json }
      test_signup_flow: { Args: { test_email?: string }; Returns: Json }
      test_user_deletion_system: { Args: never; Returns: Json }
      toggle_abandonment_cron: {
        Args: { p_active: boolean; p_job_name: string }
        Returns: string
      }
      toggle_favorite: { Args: { p_property_id: string }; Returns: Json }
      track_onboarding_activity: {
        Args: { p_step?: number; p_user_id: string }
        Returns: undefined
      }
      trigger_abandonment_check: {
        Args: never
        Returns: {
          emails_sent: number
          execution_time_ms: number
          message: string
          users_found: number
        }[]
      }
      update_availability_slot: {
        Args: { p_end_date: string; p_slot_id: string; p_start_date: string }
        Returns: boolean
      }
      update_avatar_url: {
        Args: { p_file_extension?: string; p_user_id: string }
        Returns: string
      }
      update_destination_image: {
        Args: { destination_id: string; new_image_url: string }
        Returns: Json
      }
      update_missing_main_images: { Args: never; Returns: undefined }
      upload_avatar: {
        Args: { p_file_extension?: string; p_user_id: string }
        Returns: string
      }
      validate_admin_access: { Args: { user_email: string }; Returns: Json }
      validate_and_prepare_referral: {
        Args: { p_email: string; p_referral_code: string }
        Returns: Json
      }
      validate_and_use_magic_link: { Args: { p_token: string }; Returns: Json }
      validate_onboarding_magic_link: {
        Args: {
          p_ip_address?: string
          p_token: string
          p_user_agent?: string
          p_user_id: string
        }
        Returns: Json
      }
      validate_registration_attempt: {
        Args: { p_email: string; p_provider?: string }
        Returns: Json
      }
      validate_signup_attempt: { Args: { email_input: string }; Returns: Json }
      validate_user_flow: {
        Args: never
        Returns: {
          affected_users: number
          description: string
          issue_type: string
          recommendation: string
        }[]
      }
      validate_user_login: { Args: { user_email: string }; Returns: Json }
      verify_critical_triggers: {
        Args: never
        Returns: {
          event_type: string
          function_name: string
          is_enabled: boolean
          table_name: string
          trigger_exists: boolean
        }[]
      }
      verify_phone_code: {
        Args: { p_code: string; p_phone_number: string }
        Returns: Json
      }
      verify_registration_system: { Args: never; Returns: Json }
      verify_user_can_access_platform: { Args: never; Returns: Json }
      verify_user_phone: { Args: never; Returns: Json }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
