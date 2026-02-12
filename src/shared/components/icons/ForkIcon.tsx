import React from 'react';

import Svg, { Circle, Line } from 'react-native-svg';

import type { IconProps } from './types';

export const ForkIcon: React.FC<IconProps> = ({ size = 24, color = '#fff', strokeWidth = 1.5 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={18} r={3} stroke={color} strokeWidth={strokeWidth} />
    <Circle cx={6} cy={6} r={3} stroke={color} strokeWidth={strokeWidth} />
    <Circle cx={18} cy={6} r={3} stroke={color} strokeWidth={strokeWidth} />
    <Line x1={12} y1={15} x2={12} y2={12} stroke={color} strokeWidth={strokeWidth} />
    <Line x1={6} y1={9} x2={6} y2={12} stroke={color} strokeWidth={strokeWidth} />
    <Line x1={18} y1={9} x2={18} y2={12} stroke={color} strokeWidth={strokeWidth} />
    <Line x1={6} y1={12} x2={18} y2={12} stroke={color} strokeWidth={strokeWidth} />
  </Svg>
);
