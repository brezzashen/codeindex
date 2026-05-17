'use client';

import { useEffect, useRef } from 'react';
import { setupOrbScene } from './scene';

interface OrbProps {
  className?: string;
  style?: React.CSSProperties;
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
  backgroundColor?: string;
}

export const Orb = ({
  className = '',
  style = {},
  hue = 0,
  hoverIntensity = 0.25,
  rotateOnHover = true,
  forceHoverState = false,
  backgroundColor = '#050608',
}: OrbProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    return setupOrbScene(container, {
      hue,
      hoverIntensity,
      rotateOnHover,
      forceHoverState,
      backgroundColor,
    });
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState, backgroundColor]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      style={{ zIndex: 0, ...style }}
    />
  );
};
