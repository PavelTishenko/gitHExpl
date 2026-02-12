import React from 'react';

import Svg, { Circle, Path } from 'react-native-svg';

import type { IconProps } from './types';

export const EyeIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', strokeWidth = 1.5 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);
