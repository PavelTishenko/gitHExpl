import React, { memo, useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { StarIcon } from '@/shared/components/icons';
import { useColors } from '@/shared/hooks/useColors';
import { borderRadius, spacing } from '@/shared/theme/spacing';
import { formatDate, formatNumber } from '@/shared/utils/formatters';

import { GitHubRepo } from '../types';

interface RepoCardProps {
  repo: GitHubRepo;
  onPress: (repo: GitHubRepo) => void;
}

const RepoCardComponent: React.FC<RepoCardProps> = ({ repo, onPress }) => {
  const colors = useColors();

  const handlePress = useCallback(() => {
    onPress(repo);
  }, [repo, onPress]);

  const dotColor = repo.language
    ? (colors.languageColors[repo.language] ?? colors.textTertiary)
    : colors.textTertiary;

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
        },
        pressed && styles.containerPressed,
      ]}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: repo.owner.avatar_url }}
          style={[
            styles.avatar,
            { borderColor: colors.avatarBorder, backgroundColor: colors.backgroundElevated },
          ]}
        />
        <View style={styles.headerText}>
          <Text style={[styles.ownerName, { color: colors.textTertiary }]} numberOfLines={1}>
            {repo.owner.login}
          </Text>
          <Text style={[styles.repoName, { color: colors.textPrimary }]} numberOfLines={1}>
            {repo.name}
          </Text>
        </View>
        <View style={[styles.starsContainer, { backgroundColor: colors.backgroundElevated }]}>
          <StarIcon size={14} color={colors.accent} filled />
          <Text style={[styles.starsCount, { color: colors.textSecondary }]}>
            {formatNumber(repo.stargazers_count)}
          </Text>
        </View>
      </View>

      {repo.description && (
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {repo.description}
        </Text>
      )}

      <View style={styles.footer}>
        {repo.language && (
          <View style={styles.languageContainer}>
            <View style={[styles.languageDot, { backgroundColor: dotColor }]} />
            <Text style={[styles.languageText, { color: colors.textSecondary }]}>
              {repo.language}
            </Text>
          </View>
        )}
        <Text style={[styles.updated, { color: colors.textTertiary }]}>
          Updated {formatDate(repo.updated_at)}
        </Text>
      </View>
    </Pressable>
  );
};

export const RepoCard = memo(RepoCardComponent, (prev, next) => {
  return prev.repo.id === next.repo.id;
});

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  containerPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
  },
  headerText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  ownerName: {
    fontSize: 12,
    fontWeight: '400',
  },
  repoName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  starsCount: {
    fontSize: 13,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.xs,
  },
  languageText: {
    fontSize: 12,
    fontWeight: '500',
  },
  updated: {
    fontSize: 12,
  },
});
