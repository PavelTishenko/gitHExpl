import React from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AlertTriangleIcon } from '@/shared/components/icons';
import { useColors } from '@/shared/hooks/useColors';
import { borderRadius, spacing } from '@/shared/theme/spacing';

import { OwnerCard } from '../components/OwnerCard';
import { RepoHeader } from '../components/RepoHeader';
import { StatsRow } from '../components/StatsRow';
import { useRepoDetailScreen } from '../hooks/useRepoDetailScreen';

export const RepoDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { colors, repo, stats, isLoading, isError, error, statusBarStyle, handleOpenInBrowser } =
    useRepoDetailScreen();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={statusBarStyle} backgroundColor={colors.background} />
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Loading repository...
        </Text>
      </View>
    );
  }

  if (isError || !repo) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={statusBarStyle} backgroundColor={colors.background} />
        <View style={styles.errorIconContainer}>
          <AlertTriangleIcon size={48} color={colors.error} strokeWidth={1} />
        </View>
        <Text style={[styles.errorTitle, { color: colors.textPrimary }]}>
          Failed to load repository
        </Text>
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>
          {error?.message ?? 'Repository not found'}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={colors.background} />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <RepoHeader repo={repo} />
        <StatsRow stats={stats} />
        <OwnerCard owner={repo.owner} />

        <View
          style={[
            styles.infoCard,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <InfoRow label="Default Branch" value={repo.default_branch} />
          <InfoRow label="Size" value={`${(repo.size / 1024).toFixed(1)} MB`} />
          <InfoRow label="Visibility" value={repo.visibility} />
          {repo.homepage && <InfoRow label="Homepage" value={repo.homepage} isLink />}
        </View>

        <Pressable
          onPress={handleOpenInBrowser}
          style={({ pressed }) => [
            styles.openButton,
            { backgroundColor: colors.buttonPrimary },
            pressed && styles.openButtonPressed,
          ]}
        >
          <Text style={[styles.openButtonText, { color: colors.buttonPrimaryText }]}>
            Open in GitHub
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
  isLink?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, isLink }) => {
  const colors = useColors();

  const handlePress = () => {
    if (isLink) {
      Linking.openURL(value.startsWith('http') ? value : `https://${value}`);
    }
  };

  return (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, { color: colors.textTertiary }]}>{label}</Text>
      {isLink ? (
        <Pressable onPress={handlePress}>
          <Text style={[styles.infoValue, { color: colors.info }]} numberOfLines={1}>
            {value}
          </Text>
        </Pressable>
      ) : (
        <Text style={[styles.infoValue, { color: colors.textSecondary }]} numberOfLines={1}>
          {value}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing['3xl'],
  },
  content: {
    padding: spacing.lg,
  },
  loadingText: {
    fontSize: 15,
    marginTop: spacing.lg,
  },
  errorIconContainer: {
    marginBottom: spacing.lg,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
  },
  infoCard: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    maxWidth: '60%',
  },
  openButton: {
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  openButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  openButtonText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
