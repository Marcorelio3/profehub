'use client';

import { cn } from '@/lib/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

const Tabs = TabsPrimitive.Tabs;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.TabsList>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.TabsList>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.TabsList
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.TabsList.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.TabsTrigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.TabsTrigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-elevation-1',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.TabsTrigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.TabsContent>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.TabsContent>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.TabsContent
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.TabsContent.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
