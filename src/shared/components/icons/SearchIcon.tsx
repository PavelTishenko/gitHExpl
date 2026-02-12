import React from 'react';

import Svg, { Circle, Line } from 'react-native-svg';

import type { IconProps } from './types';

export const SearchIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#fff',
  strokeWidth = 1.5,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={11} cy={11} r={8} stroke={color} strokeWidth={strokeWidth} />
    <Line
      x1={21}
      y1={21}
      x2={16.65}
      y2={16.65}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);
