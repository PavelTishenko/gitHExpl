import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '@/shared/components/ui/Badge';
import { useColors } from '@/shared/hooks/useColors';
import { borderRadius, spacing } from '@/shared/theme/spacing';
import { formatDate } from '@/shared/utils/formatters';
import type { GitHubRepo } from '@/features/search/types';

interface RepoHeaderProps {
  repo: GitHubRepo;
}

export const RepoHeader: React.FC<RepoHeaderProps> = ({ repo }) => {
  const colors = useColors();

  const languageColor =
    repo.language && colors.languageColors[repo.language]
      ? colors.languageColors[repo.language]
      : undefined;

  return (
    <View
      style={[styles.container, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
    >
      <Text style={[styles.fullName, { color: colors.textPrimary }]}>{repo.full_name}</Text>

      {repo.description && (
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {repo.description}
        </Text>
      )}

      <View style={styles.metaRow}>
        {repo.language && (
          <Badge
            label={repo.language}
            color={languageColor ? `${languageColor}22` : colors.buttonSecondary}
            textColor={languageColor ?? colors.textSecondary}
          />
        )}
        {repo.license && <Badge label={repo.license.spdx_id} />}
      </View>

      {repo.topics && repo.topics.length > 0 && (
        <View style={styles.topicsContainer}>
          {repo.topics.slice(0, 8).map((topic) => (
            <View key={topic} style={[styles.topicChip, { backgroundColor: `${colors.info}18` }]}>
              <Text style={[styles.topicText, { color: colors.info }]}>{topic}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={[styles.datesRow, { borderTopColor: colors.separator }]}>
        <View style={styles.dateItem}>
          <Text style={[styles.dateLabel, { color: colors.textTertiary }]}>Created</Text>
          <Text style={[styles.dateValue, { color: colors.textSecondary }]}>
            {formatDate(repo.created_at)}
          </Text>
        </View>
        <View style={styles.dateItem}>
          <Text style={[styles.dateLabel, { color: colors.textTertiary }]}>Updated</Text>
          <Text style={[styles.dateValue, { color: colors.textSecondary }]}>
            {formatDate(repo.updated_at)}
          </Text>
        </View>
        <View style={styles.dateItem}>
          <Text style={[styles.dateLabel, { color: colors.textTertiary }]}>Pushed</Text>
          <Text style={[styles.dateValue, { color: colors.textSecondary }]}>
            {formatDate(repo.pushed_at)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  fullName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  topicChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  topicText: {
    fontSize: 12,
    fontWeight: '500',
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  dateItem: {
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 13,
    fontWeight: '500',
  },
});
