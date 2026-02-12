import { create } from 'zustand';

export type ThemeMode = 'dark' | 'light';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'dark',
  setMode: (mode: ThemeMode) => set({ mode }),
  toggle: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
}));
