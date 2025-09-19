import React from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'sm' | 'lg';
  hover?: boolean;
  children: React.ReactNode;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass',
          {
            'glass-sm': variant === 'sm',
            'glass-lg': variant === 'lg',
            'glass-hover': hover,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
