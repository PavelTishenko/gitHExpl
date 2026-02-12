import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { AlertTriangleIcon, SearchIcon } from '@/shared/components/icons';
import { useColors } from '@/shared/hooks/useColors';
import { spacing } from '@/shared/theme/spacing';
import { formatNumber } from '@/shared/utils/formatters';

import { GitHubRepo } from '../types';
import { RepoCard } from './RepoCard';

interface RepoListProps {
  repos: GitHubRepo[];
  totalCount: number;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  error: Error | null;
  hasNextPage: boolean;
  onEndReached: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onRepoPress: (repo: GitHubRepo) => void;
  hasSearched: boolean;
}

const keyExtractor = (item: GitHubRepo) => item.id.toString();

const ListFooter: React.FC<{ isFetchingNextPage: boolean }> = ({ isFetchingNextPage }) => {
  const colors = useColors();
  if (!isFetchingNextPage) {
    return <View style={styles.listFooter} />;
  }
  return (
    <View style={styles.footerLoader}>
      <ActivityIndicator size="small" color={colors.accent} />
    </View>
  );
};

const EmptyState: React.FC<{
  isLoading: boolean;
  hasSearched: boolean;
  isError: boolean;
  error: Error | null;
}> = ({ isLoading, hasSearched, isError, error }) => {
  const colors = useColors();

  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Searching repositories...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconContainer}>
          <AlertTriangleIcon size={48} color={colors.textTertiary} strokeWidth={1} />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>Something went wrong</Text>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          {error?.message ?? 'Failed to fetch repositories'}
        </Text>
      </View>
    );
  }

  if (hasSearched) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconContainer}>
          <SearchIcon size={48} color={colors.textTertiary} strokeWidth={1} />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
          No repositories found
        </Text>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Try a different search term
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <SearchIcon size={48} color={colors.textTertiary} strokeWidth={1} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>Explore GitHub</Text>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        Search for repositories by name, topic, or keyword
      </Text>
    </View>
  );
};

export const RepoList: React.FC<RepoListProps> = ({
  repos,
  totalCount,
  isLoading,
  isFetchingNextPage,
  isError,
  error,
  hasNextPage,
  onEndReached,
  onRefresh,
  isRefreshing,
  onRepoPress,
  hasSearched,
}) => {
  const colors = useColors();

  const renderItem = useCallback(
    ({ item }: { item: GitHubRepo }) => <RepoCard repo={item} onPress={onRepoPress} />,
    [onRepoPress],
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      onEndReached();
    }
  }, [hasNextPage, isFetchingNextPage, onEndReached]);

  const listHeader = useMemo(() => {
    if (!hasSearched || repos.length === 0) {
      return null;
    }
    return (
      <View style={styles.resultCount}>
        <Text style={[styles.resultCountText, { color: colors.textTertiary }]}>
          {formatNumber(totalCount)} repositories found
        </Text>
      </View>
    );
  }, [hasSearched, repos.length, totalCount, colors.textTertiary]);

  return (
    <FlatList
      data={repos}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={listHeader}
      ListEmptyComponent={
        <EmptyState
          isLoading={isLoading}
          hasSearched={hasSearched}
          isError={isError}
          error={error}
        />
      }
      ListFooterComponent={<ListFooter isFetchingNextPage={isFetchingNextPage} />}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={5}
      initialNumToRender={10}
      contentContainerStyle={repos.length === 0 ? styles.emptyList : undefined}
    />
  );
};

const styles = StyleSheet.create({
  emptyList: {
    flexGrow: 1,
  },
  resultCount: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
  },
  resultCountText: {
    fontSize: 13,
    fontWeight: '500',
  },
  footerLoader: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  listFooter: {
    height: spacing['3xl'],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing['3xl'],
    paddingTop: spacing['5xl'],
  },
  emptyIconContainer: {
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
