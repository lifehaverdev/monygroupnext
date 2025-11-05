"use client";

import React, { ReactNode } from 'react';
import { useParallax } from '../hooks/useParallax';

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
  className?: string;
  disabled?: boolean;
}

export default function ParallaxContainer({
  children,
  speed = 0.4,
  direction = 'up',
  offset = 0,
  className = '',
  disabled = false,
}: ParallaxContainerProps) {
  const { transform } = useParallax({ speed, direction, offset, disabled });

  return (
    <div
      className={className}
      style={{
        transform,
        willChange: disabled ? 'auto' : 'transform',
      }}
    >
      {children}
    </div>
  );
}

