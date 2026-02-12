import { apiFetch } from '@/shared/services/api';

import { GitHubSearchResponse } from '../types';

export async function searchRepos(
  query: string,
  page: number = 1,
  perPage: number = 30,
): Promise<GitHubSearchResponse> {
  if (!query.trim()) {
    return { total_count: 0, incomplete_results: false, items: [] };
  }

  return apiFetch<GitHubSearchResponse>(
    `/search/repositories?q=${encodeURIComponent(query.trim())}&per_page=${perPage}&page=${page}`,
  );
}
