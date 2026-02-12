import React from 'react';

import Svg, { Line } from 'react-native-svg';

import type { IconProps } from './types';

export const CloseIcon: React.FC<IconProps> = ({
  size = 24,
  color = '#fff',
  strokeWidth = 1.5,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line
      x1={18}
      y1={6}
      x2={6}
      y2={18}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Line
      x1={6}
      y1={6}
      x2={18}
      y2={18}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </Svg>
);
