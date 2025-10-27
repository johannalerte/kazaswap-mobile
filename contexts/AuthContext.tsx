import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toSentenceCase } from "@/utils/stringUtils";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  credits: number;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any; data?: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  updateCredits: (newCredits: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  console.log("🔐 AuthProvider initializing...");

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState<number>(0);

  const fetchUserCredits = async (userId: string) => {
    console.log("=== FETCHING USER CREDITS ===");
    console.log("Fetching credits for user ID:", userId);

    try {
      // Use secure profile access - will only return data if user owns profile or is admin
      const { data, error } = await supabase
        .from("profiles")
        .select("credits, first_name, user_id")
        .eq("user_id", userId)
        .maybeSingle();

      console.log("Profile query result:", { data, error });
      console.log("Expected user_id:", userId);
      console.log("Returned user_id:", (data as any)?.user_id);
      console.log("Profile first_name:", (data as any)?.first_name);

      if (!error && data) {
        console.log("Setting credits to:", (data as any).credits);
        setCredits((data as any).credits);
      } else if (!data) {
        // Profile doesn't exist, create one
        console.log("Profile not found, creating new profile for user:", userId);
        await createUserProfile(userId);
        setCredits(7); // Default credits for new users
      } else if (error) {
        console.error("Error fetching credits:", error);
      }
    } catch (error) {
      console.error("Exception fetching user credits:", error);
    }
  };

  const createUserProfile = async (userId: string) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      const userData = user?.user;

      // Extract names from Google OAuth data more reliably
      let firstName = "";
      let lastName = "";

      if (userData?.user_metadata) {
        // Try direct first_name/last_name fields first
        firstName = userData.user_metadata.first_name || userData.user_metadata.given_name || "";
        lastName = userData.user_metadata.last_name || userData.user_metadata.family_name || "";

        // If no direct fields, try to extract from full_name or name
        if (!firstName && !lastName) {
          const fullName = userData.user_metadata.full_name || userData.user_metadata.name || "";
          if (fullName) {
            const nameParts = fullName.split(" ");

            // Check if this looks like a business name (contains common business words)
            const businessKeywords = [
              "company",
              "corp",
              "ltd",
              "llc",
              "inc",
              "community",
              "group",
              "team",
              "swap",
              "app",
              "platform",
            ];
            const looksLikeBusiness = businessKeywords.some((keyword) => fullName.toLowerCase().includes(keyword));

            if (looksLikeBusiness) {
              // For business names, leave empty so user can fill in during onboarding
              firstName = "";
              lastName = "";
              console.log("Detected business name, leaving names empty for user input:", fullName);
            } else {
              // Looks like a personal name, extract normally
              firstName = nameParts[0] || "";
              lastName = nameParts.slice(1).join(" ") || "";
            }
          }
        }
      }

      console.log("Google OAuth user metadata:", userData?.user_metadata);
      console.log("Extracted names:", { firstName, lastName });

      const profileData = {
        user_id: userId,
        email: userData?.email || "",
        credits: 7, // Initial credits for new users (matches DB defaults)
        first_name: toSentenceCase(firstName),
        last_name: toSentenceCase(lastName),
        phone_number: userData?.user_metadata?.phone_number || userData?.user_metadata?.phone || null,
        phone_verified: !!userData?.user_metadata?.email_verified || false,
        address: userData?.user_metadata?.address || null,
        user_type: "user",
        approval_status: "pending",
        registration_step: "started",
        onboarding_completed: false,
        avatar_url: userData?.user_metadata?.avatar_url || userData?.user_metadata?.picture || null,
      };

      const { error } = await supabase.from("profiles").insert([profileData] as any);

      if (error) {
        console.error("Error creating profile:", error);
      } else {
        console.log("Profile created successfully for user:", userId);
        console.log("Profile data:", profileData);
      }
    } catch (error) {
      console.error("Exception creating user profile:", error);
    }
  };

  useEffect(() => {
    console.log("=== AUTH CONTEXT INITIALIZATION ===");

    // First check for existing session synchronously
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("=== INITIAL SESSION CHECK ===");
      console.log("Initial session user email:", session?.user?.email || "No user");
      console.log("Initial session user ID:", session?.user?.id || "No ID");

      setSession(session);
      setUser(session?.user ?? null);

      // Fetch credits for existing session
      if (session?.user) {
        console.log("Fetching initial credits for user:", session.user.email);
        fetchUserCredits(session.user.id);
      }

      // Only set loading to false after initial check completes
      setLoading(false);
    });

    // Then set up auth state listener (but DON'T set loading here)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("=== AUTH STATE CHANGE EVENT ===");
      console.log("Event type:", event);
      console.log("Session user email:", session?.user?.email || "No user");

      setSession(session);
      setUser(session?.user ?? null);
      // ❌ REMOVED: setLoading(false) - don't set loading here!

      // Fetch credits when user signs in
      if (session?.user) {
        console.log("Fetching credits for user:", session.user.email);
        fetchUserCredits(session.user.id);
      } else {
        setCredits(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    console.log("AuthContext signUp called with:", { email, firstName, lastName });

    try {
      // First try to sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: toSentenceCase(firstName || ""),
            last_name: toSentenceCase(lastName || ""),
          },
        },
      });

      console.log("Supabase signUp result:", { data, error });

      if (error) {
        return { error };
      }

      // If user is created and confirmed immediately (no email verification)
      if (data.user && data.session) {
        console.log("User created and session established");
        return { error: null };
      }

      // If user is created but needs email confirmation, try immediate sign in
      if (data.user && !data.session) {
        console.log("User created but no session, attempting immediate sign in...");
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          console.log("Immediate sign in failed:", signInError);
          return { error: signInError };
        }

        console.log("Immediate sign in successful");
        return { error: null };
      }

      return { error: null };
    } catch (error) {
      console.error("Exception during signup:", error);
      return { error: { message: "An unexpected error occurred during signup." } };
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log("🔐 AuthContext signIn called for:", email);

    try {
      // Use standard Supabase client-side authentication
      console.log("🔐 Attempting direct signInWithPassword...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("🔐 SignIn response:", { user: data.user?.email, session: !!data.session, error });

      if (error) {
        console.error("🚨 Sign in error:", error);

        // Handle specific error cases
        if (error.message.includes("Invalid login credentials")) {
          return { error: { message: "Incorrect email or password. Please try again." } };
        }

        return { error: { message: error.message || "Failed to sign in. Please try again." } };
      }

      if (!data.user || !data.session) {
        console.error("🚨 No user or session returned");
        return { error: { message: "Authentication failed. Please try again." } };
      }

      console.log("✅ Login successful for:", data.user.email);

      // Session is automatically handled by onAuthStateChange listener
      return { error: null };
    } catch (error) {
      console.error("🚨 Sign in exception:", error);
      return { error: { message: "An unexpected error occurred. Please try again." } };
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("🔐 Starting Google OAuth sign-in...");

      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error("🚨 Google OAuth error:", error);
        return { error: { message: error.message } };
      }

      console.log("✅ Google OAuth initiated successfully");
      return { error: null, data };
    } catch (error) {
      console.error("🚨 Google OAuth exception:", error);
      return { error: { message: "An unexpected error occurred during Google sign-in." } };
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out user...");

      // Clear local state immediately
      setCredits(0);
      setUser(null);
      setSession(null);

      // Clear any session storage flags
      try {
        sessionStorage.removeItem("just_signed_up");
        sessionStorage.removeItem("property_just_listed");
      } catch (e) {
        console.warn("Could not clear session storage:", e);
      }

      // Then call Supabase signOut
      const { error } = await supabase.auth.signOut({ scope: "global" });
      if (error) {
        console.error("Logout error:", error);
      }

      console.log("User signed out successfully");
    } catch (error) {
      console.error("Exception during logout:", error);
      // Ensure local state is cleared even if API call fails
      setCredits(0);
      setUser(null);
      setSession(null);
    }
  };

  const updateCredits = (newCredits: number) => {
    setCredits(newCredits);
  };

  const value = {
    user,
    session,
    credits,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    loading,
    updateCredits,
  };

  console.log("🔐 AuthProvider render, user:", user?.email || "none", "loading:", loading);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
