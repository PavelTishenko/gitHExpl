import { create } from 'zustand';

interface SearchState {
  query: string;
  searchHistory: string[];
  setQuery: (query: string) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
}

const MAX_HISTORY = 10;

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  searchHistory: [],

  setQuery: (query: string) => set({ query }),

  addToHistory: (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    const current = get().searchHistory;
    const filtered = current.filter((item) => item !== trimmed);
    const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY);
    set({ searchHistory: updated });
  },

  clearHistory: () => set({ searchHistory: [] }),
}));
