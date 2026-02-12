import React from 'react';

import Svg, { Circle } from 'react-native-svg';

import type { IconProps } from './types';

export const IssueIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#fff',
  strokeWidth = 1.5,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={strokeWidth} />
    <Circle cx={12} cy={12} r={2} fill={color} />
  </Svg>
);
