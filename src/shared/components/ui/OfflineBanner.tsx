import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WifiOffIcon } from '@/shared/components/icons';
import { useColors } from '@/shared/hooks/useColors';
import { useNetworkStatus } from '@/shared/hooks/useNetworkStatus';
import { borderRadius, spacing } from '@/shared/theme/spacing';

export const OfflineBanner: React.FC = () => {
  const { isOffline } = useNetworkStatus();
  const colors = useColors();

  if (!isOffline) {
    return null;
  }

  return (
    <View
      style={[styles.container, { backgroundColor: colors.warning, borderColor: colors.warning }]}
    >
      <WifiOffIcon size={14} color={colors.textInverse} strokeWidth={2} />
      <Text style={[styles.text, { color: colors.textInverse }]}>
        You are offline. Showing cached data.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
});
