import React from 'react';
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SettingsIcon } from '@/shared/components/icons';
import { useColors } from '@/shared/hooks/useColors';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { borderRadius, spacing } from '@/shared/theme/spacing';

import { RepoList } from '../components/RepoList';
import { SearchBar } from '../components/SearchBar';
import { SettingsMenu } from '../components/SettingsMenu';
import { useSearchScreen } from '../hooks/useSearchScreen';

export const SearchScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const mode = useThemeStore((s) => s.mode);
  const {
    isMenuVisible,
    openMenu,
    closeMenu,
    query,
    setQuery,
    repos,
    totalCount,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    isRefreshing,
    hasSearched,
    handleRepoPress,
    handleEndReached,
    handleRefresh,
  } = useSearchScreen();

  return (
    <View
      style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <View style={styles.header}>
        <View style={styles.headerTitles}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Explore</Text>
          <Text style={[styles.titleAccent, { color: colors.accent }]}>GitHub</Text>
        </View>

        <Pressable
          onPress={openMenu}
          style={({ pressed }) => [
            styles.menuButton,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
            pressed && styles.menuButtonPressed,
          ]}
        >
          <SettingsIcon size={20} color={colors.textPrimary} />
        </Pressable>
      </View>

      <SearchBar value={query} onChangeText={setQuery} />

      <RepoList
        repos={repos}
        totalCount={totalCount}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        isError={isError}
        error={error}
        hasNextPage={hasNextPage}
        onEndReached={handleEndReached}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onRepoPress={handleRepoPress}
        hasSearched={hasSearched}
      />

      <SettingsMenu visible={isMenuVisible} onClose={closeMenu} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTitles: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.37,
  },
  titleAccent: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.37,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});
