import React from 'react';

import Svg, { Line, Path } from 'react-native-svg';

import type { IconProps } from './types';

export const WifiOffIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#fff',
  strokeWidth = 1.5,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line
      x1={1}
      y1={1}
      x2={23}
      y2={23}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.71 5.05A16 16 0 0 1 22.56 9"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.53 16.11a6 6 0 0 1 6.95 0"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1={12}
      y1={20}
      x2={12.01}
      y2={20}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);
