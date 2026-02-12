import React, { useCallback, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { CloseIcon, SearchIcon } from '@/shared/components/icons';
import { useColors } from '@/shared/hooks/useColors';
import { useThemeStore } from '@/shared/hooks/useThemeStore';
import { borderRadius, spacing } from '@/shared/theme/spacing';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search repositories...',
}) => {
  const colors = useColors();
  const mode = useThemeStore((s) => s.mode);
  const inputRef = useRef<TextInput>(null);

  const handleClear = useCallback(() => {
    onChangeText('');
    inputRef.current?.focus();
  }, [onChangeText]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.searchBackground,
          borderColor: colors.searchBorder,
        },
      ]}
    >
      <View style={styles.searchIcon}>
        <SearchIcon size={18} color={colors.textTertiary} />
      </View>
      <TextInput
        ref={inputRef}
        style={[styles.input, { color: colors.textPrimary }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        keyboardAppearance={mode}
        selectionColor={colors.accent}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <CloseIcon size={14} color={colors.textTertiary} strokeWidth={2} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    height: 48,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
});
