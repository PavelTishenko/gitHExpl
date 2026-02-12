import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useColors } from '@/shared/hooks/useColors';
import { spacing } from '@/shared/theme/spacing';

interface SeparatorProps {
  style?: ViewStyle;
}

export const Separator: React.FC<SeparatorProps> = ({ style }) => {
  const colors = useColors();
  return <View style={[styles.separator, { backgroundColor: colors.separator }, style]} />;
};

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    marginVertical: spacing.md,
  },
});
