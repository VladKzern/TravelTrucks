import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Camper, FetchCampersParams, CamperFilters } from '@/lib/types';
import { fetchCampers } from '@/lib/api';

type CampersState = {
  campers: Camper[];
  isLoading: boolean;
  page: number;
  limit: number;
  hasMore: boolean;
  filters: CamperFilters;
  favorites: string[];

  setFilters: (filters: CamperFilters) => Promise<void>;
  resetResults: () => void;
  loadCampers: (append?: boolean) => Promise<void>;
  toggleFavorite: (id: string) => void;
};

export const useCampersStore = create<CampersState>()(
  persist(
    (set, get) => ({
      campers: [],
      isLoading: false,
      page: 1,
      limit: 4,
      hasMore: true,
      filters: {},
      favorites: [],

      setFilters: async (filters) => {
        set({
          filters,
          page: 1,
          campers: [],
          hasMore: true,
        });
        await get().loadCampers(false);
      },

      resetResults: () =>
        set({
          campers: [],
          page: 1,
          hasMore: true,
        }),

      loadCampers: async (append = true) => {
        const { page, limit, filters, campers } = get();

        set({ isLoading: true });

        try {
          const params: FetchCampersParams = {
            page,
            limit,
            ...filters,
          };

          const data = await fetchCampers(params);

          const newCampers: Camper[] = Array.isArray(data.items) ? data.items : [];

          if (append) {
            set({
              campers: [...campers, ...newCampers],
              page: page + 1,
              hasMore: newCampers.length === limit,
            });
          } else {
            set({
              campers: newCampers,
              page: 2,
              hasMore: newCampers.length === limit,
            });
          }
        } catch (error) {
          console.error('Failed to load campers:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      toggleFavorite: (id) =>
        set((s) => {
          const isFav = s.favorites.includes(id);
          return {
            favorites: isFav
              ? s.favorites.filter((x) => x !== id)
              : [...s.favorites, id],
          };
        }),
    }),
    {
      name: 'traveltrucks-storage',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
