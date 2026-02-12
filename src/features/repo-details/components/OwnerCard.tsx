import React from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { useColors } from '@/shared/hooks/useColors';
import { borderRadius, spacing } from '@/shared/theme/spacing';
import type { GitHubOwner } from '@/features/search/types';

interface OwnerCardProps {
  owner: GitHubOwner;
}

export const OwnerCard: React.FC<OwnerCardProps> = ({ owner }) => {
  const colors = useColors();

  const handlePress = () => {
    Linking.openURL(owner.html_url);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
        pressed && styles.pressed,
      ]}
    >
      <Image
        source={{ uri: owner.avatar_url }}
        style={[
          styles.avatar,
          { borderColor: colors.cardBorder, backgroundColor: colors.backgroundElevated },
        ]}
      />
      <View style={styles.info}>
        <Text style={[styles.login, { color: colors.textPrimary }]}>{owner.login}</Text>
        <Text style={[styles.type, { color: colors.textTertiary }]}>{owner.type}</Text>
      </View>
      <Text style={[styles.arrow, { color: colors.textTertiary }]}>›</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  pressed: {
    opacity: 0.85,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  login: {
    fontSize: 17,
    fontWeight: '600',
  },
  type: {
    fontSize: 13,
    marginTop: 2,
  },
  arrow: {
    fontSize: 24,
    fontWeight: '300',
  },
});
