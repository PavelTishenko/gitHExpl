import { useInfiniteQuery } from '@tanstack/react-query';

import { searchRepos } from '../api/searchRepos';
import { GitHubSearchResponse } from '../types';

const PER_PAGE = 30;

export function useSearchRepos(query: string) {
  return useInfiniteQuery<GitHubSearchResponse>({
    queryKey: ['searchRepos', query],
    queryFn: ({ pageParam }) => searchRepos(query, pageParam as number, PER_PAGE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * PER_PAGE;
      if (totalFetched >= lastPage.total_count) {
        return undefined;
      }
      if (totalFetched >= 1000) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  });
}
