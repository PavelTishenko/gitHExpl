import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useColors } from '@/shared/hooks/useColors';
import { RepoDetailScreen } from '@/features/repo-details/screens/RepoDetailScreen';
import { SearchScreen } from '@/features/search/screens/SearchScreen';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const colors = useColors();

  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 17,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="RepoDetails"
        component={RepoDetailScreen}
        options={({ route }) => ({
          title: route.params.repo,
          headerBackTitle: 'Search',
        })}
      />
    </Stack.Navigator>
  );
};
