import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '@/shared/services/storage';

export type ThemeMode = 'dark' | 'light';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark',
      setMode: (mode: ThemeMode) => set({ mode }),
      toggle: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
