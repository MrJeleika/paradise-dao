import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'pixel-corners flex h-10 w-full bg-blue-500 px-3 py-2 text-sm shadow-[-3px_0_0_0_#121212,3px_0_0_0_#121212,0_-3px_0_0_#121212,0_3px_0_0_#121212] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[inset_-3px_0_0_0_#F9F6EE,inset_3px_0_0_0_#F9F6EE,inset_0_-3px_0_0_#F9F6EE,inset_0_3px_0_0_#F9F6EE]',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
