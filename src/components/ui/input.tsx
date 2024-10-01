import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'transparent' | 'filled';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'filled', ...props }, ref) => {
    return (
      <div className="pixel-corners-wrapper w-full bg-primary p-[3px]">
        <input
          type={type}
          className={cn(
            'pixel-corners flex h-10 w-full px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
            variant === 'filled'
              ? 'bg-transparent caret-background'
              : 'bg-background',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
