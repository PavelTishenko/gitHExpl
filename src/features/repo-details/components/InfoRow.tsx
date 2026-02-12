import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { useColors } from '@/shared/hooks/useColors';
import { borderRadius, spacing } from '@/shared/theme/spacing';

interface InfoRowProps {
  label: string;
  value: string;
  isLink?: boolean;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value, isLink }) => {
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
});
