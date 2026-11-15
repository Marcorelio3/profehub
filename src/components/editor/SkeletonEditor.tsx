'use client';

import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonEditorProps {
  className?: string;
}

export function SkeletonEditor({ className }: SkeletonEditorProps) {
  return (
    <div className={cn('space-y-6 animate-pulse', className)}>
      <Skeleton className="h-10 w-3/4 rounded-lg" />
      <div className="mx-auto max-w-[210mm]">
        <div className="space-y-4">
          <Skeleton className="h-8 w-full rounded" />
          <Skeleton className="h-8 w-full rounded" />
          <SkeletonText lines={8} />
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded" />
            <Skeleton className="h-20 w-full rounded" />
            <Skeleton className="h-20 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
