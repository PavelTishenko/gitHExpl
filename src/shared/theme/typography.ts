import { TextStyle } from 'react-native';

import { colors } from './colors';

export const typography = {
  largeTitle: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 41,
    color: colors.textPrimary,
    letterSpacing: 0.37,
  } as TextStyle,

  title1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    color: colors.textPrimary,
    letterSpacing: 0.36,
  } as TextStyle,

  title2: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    color: colors.textPrimary,
    letterSpacing: 0.35,
  } as TextStyle,

  title3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 25,
    color: colors.textPrimary,
  } as TextStyle,

  headline: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    color: colors.textPrimary,
  } as TextStyle,

  body: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    color: colors.textPrimary,
  } as TextStyle,

  callout: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    color: colors.textSecondary,
  } as TextStyle,

  subhead: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: colors.textSecondary,
  } as TextStyle,

  footnote: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: colors.textTertiary,
  } as TextStyle,

  caption: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 13,
    color: colors.textTertiary,
  } as TextStyle,
} as const;

export type Typography = typeof typography;
