'use client';

import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse-soft rounded-md bg-muted', className)} {...props} />;
}

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

export function SkeletonText({ lines = 3, className, ...props }: SkeletonTextProps) {
  const skeletonKeys = Array.from({ length: lines }, (_, i) => `skeleton-line-${i}`);
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {skeletonKeys.map((key) => (
        <Skeleton key={key} className="h-4 w-full" />
      ))}
    </div>
  );
}

export function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('rounded-lg border bg-card p-6 space-y-4', className)} {...props}>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

export function SkeletonEditor({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const toolbarKeys = Array.from({ length: 8 }, (_, i) => `skeleton-toolbar-${i}`);
  return (
    <div className={cn('rounded-lg border bg-card overflow-hidden', className)} {...props}>
      <div className="border-b p-3 flex items-center gap-2">
        {toolbarKeys.map((key) => (
          <Skeleton key={key} className="h-6 w-8 rounded" />
        ))}
      </div>
      <div className="p-6 space-y-4 min-h-[400px]">
        <Skeleton className="h-8 w-3/4 rounded" />
        <SkeletonText lines={15} />
      </div>
      <div className="border-t p-3 flex items-center justify-between">
        <Skeleton className="h-5 w-24 rounded" />
        <Skeleton className="h-5 w-24 rounded" />
      </div>
    </div>
  );
}

export { Skeleton };
