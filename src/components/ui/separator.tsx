'use client';

import { cn } from '@/lib/utils';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Separator>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Separator
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className,
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Separator.displayName;

export { Separator };
