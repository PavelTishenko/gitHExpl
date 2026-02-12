import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@/app/navigation/types';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { GitHubRepo } from '../types';
import { useSearchRepos } from './useSearchRepos';
import { useSearchStore } from './useSearchStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

export function useSearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { query, setQuery, addToHistory } = useSearchStore();
  const [hasSearched, setHasSearched] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useSearchRepos(debouncedQuery);

  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      setHasSearched(true);
      addToHistory(debouncedQuery);
    }
  }, [debouncedQuery, addToHistory]);

  const repos = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

  const totalCount = data?.pages[0]?.total_count ?? 0;

  const handleRepoPress = useCallback(
    (repo: GitHubRepo) => {
      navigation.navigate('RepoDetails', {
        owner: repo.owner.login,
        repo: repo.name,
      });
    },
    [navigation],
  );

  const handleEndReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const openMenu = useCallback(() => setIsMenuVisible(true), []);
  const closeMenu = useCallback(() => setIsMenuVisible(false), []);

  return {
    isMenuVisible,
    openMenu,
    closeMenu,
    query,
    setQuery,
    repos,
    totalCount,
    isLoading: isLoading && !isRefetching,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage: hasNextPage ?? false,
    isRefreshing: isRefetching && !isFetchingNextPage,
    hasSearched: hasSearched && debouncedQuery.trim().length > 0,
    handleRepoPress,
    handleEndReached,
    handleRefresh,
  };
}
