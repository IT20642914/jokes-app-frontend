"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SelectedAuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const initialState = {
  isAuthenticated: false,
};

export const useAuthStore = create<SelectedAuthState>()(
  persist(
    (set) => ({
      ...initialState,

      // Action to log in
      login: () => {
        set({ isAuthenticated: true });
      },

      // Action to log out
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
