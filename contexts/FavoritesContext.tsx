import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface FavoriteProperty {
  id: string;
  title: string;
  location: string;
  dates: string;
  images: string[];
  hostName: string;
  hostAvatar?: string;
  city?: string;
  country?: string;
  created_at?: string;
}

interface FavoritesContextType {
  favorites: FavoriteProperty[];
  favoritesCount: number;
  addToFavorites: (property: FavoriteProperty) => Promise<void>;
  removeFromFavorites: (propertyId: string) => Promise<void>;
  isFavorite: (propertyId: string) => boolean;
  loading: boolean;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteProperty[]>([]);
  const [loading, setLoading] = useState(true); // Start with true to show skeleton initially
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  // Load favorites from database
  const loadFavorites = async () => {
    // Hold skeleton while auth is initializing
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const startTime = Date.now();
    
    try {
      // ✅ Single optimized RPC call
      const { data, error } = await supabase.rpc('get_user_favorites');

      if (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
        return;
      }

      if (!data || data.length === 0) {
        setFavorites([]);
        return;
      }

      // Transform the data
      const transformedFavorites: FavoriteProperty[] = data.map((prop: any) => ({
        id: prop.id,
        title: prop.title || 'Untitled Property',
        location: prop.city && prop.country 
          ? `${prop.city}, ${prop.country}` 
          : prop.city || prop.country || 'Unknown Location',
        city: prop.city,
        country: prop.country,
        dates: 'Available dates',
        images: prop.main_image_url ? [prop.main_image_url] : [],
        hostName: prop.first_name || 'Host',
        hostAvatar: prop.avatar_url,
        created_at: prop.created_at
      }));
      
      setFavorites(transformedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    } finally {
      // Ensure skeleton shows for at least 800ms for better UX
      const elapsedTime = Date.now() - startTime;
      const minLoadingTime = 800;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        setLoading(false);
      }, remainingTime);
    }
  };

  // Load favorites when auth state or user changes
  useEffect(() => {
    loadFavorites();
  }, [user?.id, authLoading]);

  const addToFavorites = async (property: FavoriteProperty) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save favorites",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_favorites' as any)
        .insert({
          user_id: user.id,
          property_id: property.id
        } as any);

      if (error) {
        if (error.code === '23505') {
          // Already exists - this is fine, just update UI
          if (!isFavorite(property.id)) {
            setFavorites(prev => [...prev, property]);
          }
          return;
        }
        throw error;
      }

      // Add to local state
      setFavorites(prev => {
        if (prev.some(fav => fav.id === property.id)) {
          return prev; // Already exists
        }
        return [...prev, property];
      });

      toast({
        description: "Added to favourites",
      });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: "Error",
        description: "Failed to add to favorites",
        variant: "destructive"
      });
    }
  };

  const removeFromFavorites = async (propertyId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('property_id', propertyId);

      if (error) throw error;

      // Remove from local state
      setFavorites(prev => prev.filter(fav => fav.id !== propertyId));

      const property = favorites.find(fav => fav.id === propertyId);
      toast({
        title: "Removed from favorites",
        description: `${property?.title || 'Property'} has been removed from your favorites`,
      });
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast({
        title: "Error",
        description: "Failed to remove from favorites",
        variant: "destructive"
      });
    }
  };

  const isFavorite = (propertyId: string) => {
    return favorites.some(fav => fav.id === propertyId);
  };

  const refreshFavorites = async () => {
    await loadFavorites();
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      favoritesCount: favorites.length,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      loading,
      refreshFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};