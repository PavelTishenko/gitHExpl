import React from 'react';
import { BackHandler, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CloseIcon, MoonIcon, SunIcon } from '@/shared/components/icons';
import { useColors } from '@/shared/hooks/useColors';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { borderRadius, spacing } from '@/shared/theme/spacing';

interface SettingsMenuProps {
  visible: boolean;
  onClose: () => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ visible, onClose }) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { mode, toggle } = useThemeStore();

  const handleCloseApp = () => {
    onClose();
    BackHandler.exitApp();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[styles.backdrop, { backgroundColor: colors.overlay }]} onPress={onClose}>
        <View
          style={[
            styles.menu,
            {
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
              marginTop: insets.top + 56,
            },
          ]}
        >
          <Text style={[styles.menuTitle, { color: colors.textPrimary }]}>Settings</Text>

          <View style={[styles.separator, { backgroundColor: colors.separator }]} />

          <Pressable
            onPress={toggle}
            style={({ pressed }) => [
              styles.menuItem,
              { backgroundColor: pressed ? colors.backgroundElevated : 'transparent' },
            ]}
          >
            <View style={styles.menuItemIconContainer}>
              {mode === 'dark' ? (
                <SunIcon size={20} color={colors.accent} />
              ) : (
                <MoonIcon size={20} color={colors.accent} />
              )}
            </View>
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemLabel, { color: colors.textPrimary }]}>Theme</Text>
              <Text style={[styles.menuItemValue, { color: colors.textSecondary }]}>
                {mode === 'dark' ? 'Dark' : 'Light'}
              </Text>
            </View>
            <View
              style={[
                styles.themeToggle,
                {
                  backgroundColor: colors.accent,
                },
              ]}
            >
              <View
                style={[
                  styles.themeToggleKnob,
                  {
                    backgroundColor: colors.textInverse,
                    alignSelf: mode === 'dark' ? 'flex-end' : 'flex-start',
                  },
                ]}
              />
            </View>
          </Pressable>

          <View style={[styles.separator, { backgroundColor: colors.separator }]} />

          <Pressable
            onPress={handleCloseApp}
            style={({ pressed }) => [
              styles.menuItem,
              { backgroundColor: pressed ? colors.backgroundElevated : 'transparent' },
            ]}
          >
            <View style={styles.menuItemIconContainer}>
              <CloseIcon size={20} color={colors.error} />
            </View>
            <View style={styles.menuItemContent}>
              <Text style={[styles.menuItemLabel, { color: colors.error }]}>Close Application</Text>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  menu: {
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '600',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  menuItemIconContainer: {
    width: 28,
    alignItems: 'center',
  },
  menuItemContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuItemValue: {
    fontSize: 13,
    marginTop: 2,
  },
  themeToggle: {
    width: 44,
    height: 26,
    borderRadius: 13,
    padding: 3,
    justifyContent: 'center',
  },
  themeToggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
