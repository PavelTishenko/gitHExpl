import React from 'react';

import Svg, { Path } from 'react-native-svg';

import type { IconProps } from './types';

export const MoonIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', strokeWidth = 1.5 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
