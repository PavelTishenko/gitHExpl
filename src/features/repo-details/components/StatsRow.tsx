import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useColors } from '@/shared/hooks/useColors';
import { borderRadius, spacing } from '@/shared/theme/spacing';
import { formatNumber } from '@/shared/utils/formatters';

export interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: number;
}

interface StatsRowProps {
  stats: StatItem[];
}

const StatBox: React.FC<StatItem> = ({ icon, label, value }) => {
  const colors = useColors();
  return (
    <View style={styles.statBox}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={[styles.statValue, { color: colors.textPrimary }]}>{formatNumber(value)}</Text>
      <Text style={[styles.statLabel, { color: colors.textTertiary }]}>{label}</Text>
    </View>
  );
};

export const StatsRow: React.FC<StatsRowProps> = ({ stats }) => {
  const colors = useColors();
  return (
    <View
      style={[styles.container, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
    >
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          <StatBox {...stat} />
          {index < stats.length - 1 && (
            <View style={[styles.divider, { backgroundColor: colors.cardBorder }]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    marginVertical: -spacing.lg,
    marginHorizontal: 0,
  },
});
