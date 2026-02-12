import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { useColors } from '@/shared/hooks/useColors';
import { borderRadius, spacing } from '@/shared/theme/spacing';

interface ChipProps {
  label: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({ label, icon, style }) => {
  const colors = useColors();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.buttonSecondary, borderColor: colors.cardBorder },
        style,
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: spacing.xs,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
});
