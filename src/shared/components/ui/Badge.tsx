import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { useColors } from '@/shared/hooks/useColors';
import { borderRadius, spacing } from '@/shared/theme/spacing';

interface BadgeProps {
  label: string;
  color?: string;
  textColor?: string;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({ label, color, textColor, style }) => {
  const colors = useColors();
  const bgColor = color ?? colors.buttonSecondary;
  const txtColor = textColor ?? colors.textSecondary;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }, style]}>
      <Text style={[styles.label, { color: txtColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
});
