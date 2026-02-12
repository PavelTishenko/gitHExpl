import React from 'react';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColors } from '@/shared/hooks/useColors';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { queryClient } from '@/shared/services/queryClient';

interface AppProvidersProps {
  children: React.ReactNode;
}

const InnerProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const colors = useColors();
  const mode = useThemeStore((s) => s.mode);

  const navigationTheme = React.useMemo(
    () => ({
      ...DefaultTheme,
      dark: mode === 'dark',
      colors: {
        ...DefaultTheme.colors,
        primary: colors.accent,
        background: colors.background,
        card: colors.backgroundElevated,
        text: colors.textPrimary,
        border: colors.cardBorder,
        notification: colors.accent,
      },
    }),
    [colors, mode],
  );

  return <NavigationContainer theme={navigationTheme}>{children}</NavigationContainer>;
};

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <InnerProviders>{children}</InnerProviders>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};
