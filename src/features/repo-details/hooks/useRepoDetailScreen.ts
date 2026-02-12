import React, { useCallback, useMemo } from 'react';
import { Linking } from 'react-native';

import { useRoute, type RouteProp } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import type { RootStackParamList } from '@/app/navigation/types';
import { EyeIcon, ForkIcon, IssueIcon, StarIcon } from '@/shared/components/icons';
import { useColors } from '@/shared/hooks/useColors';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { apiFetch } from '@/shared/services/api';
import type { GitHubRepo } from '@/features/search/types';

import type { StatItem } from '../components/StatsRow';

type DetailRouteProp = RouteProp<RootStackParamList, 'RepoDetails'>;

export function useRepoDetailScreen() {
  const colors = useColors();
  const mode = useThemeStore((s) => s.mode);
  const route = useRoute<DetailRouteProp>();
  const { owner, repo: repoName } = route.params;

  const {
    data: repo,
    isLoading,
    isError,
    error,
  } = useQuery<GitHubRepo>({
    queryKey: ['repo', owner, repoName],
    queryFn: () => apiFetch<GitHubRepo>(`/repos/${owner}/${repoName}`),
  });

  const stats: StatItem[] = useMemo(() => {
    if (!repo) {
      return [];
    }
    return [
      {
        icon: React.createElement(StarIcon, { size: 20, color: colors.accent }),
        label: 'Stars',
        value: repo.stargazers_count,
      },
      {
        icon: React.createElement(ForkIcon, { size: 20, color: colors.info }),
        label: 'Forks',
        value: repo.forks_count,
      },
      {
        icon: React.createElement(EyeIcon, { size: 20, color: colors.textSecondary }),
        label: 'Watchers',
        value: repo.watchers_count,
      },
      {
        icon: React.createElement(IssueIcon, { size: 20, color: colors.success }),
        label: 'Issues',
        value: repo.open_issues_count,
      },
    ];
  }, [repo, colors]);

  const statusBarStyle: 'light-content' | 'dark-content' =
    mode === 'dark' ? 'light-content' : 'dark-content';

  const handleOpenInBrowser = useCallback(() => {
    if (repo?.html_url) {
      Linking.openURL(repo.html_url);
    }
  }, [repo?.html_url]);

  return {
    colors,
    repo,
    stats,
    isLoading,
    isError,
    error,
    statusBarStyle,
    handleOpenInBrowser,
  };
}
