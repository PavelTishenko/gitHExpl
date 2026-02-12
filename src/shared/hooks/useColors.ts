import { useMemo } from 'react';

import { darkColors, lightColors, type AppColors } from '@/shared/theme/colors';

import { useThemeStore } from './useThemeStore';

export function useColors(): AppColors {
  const mode = useThemeStore((state) => state.mode);
  return useMemo(() => (mode === 'dark' ? darkColors : lightColors), [mode]);
}
