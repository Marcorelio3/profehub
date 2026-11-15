'use client';

import { SkeletonCard } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import type * as React from 'react';
import { type Activity, ActivityCard } from './ActivityCard';

interface ActivityGridProps {
  activities: Activity[];
  variant?: 'grid' | 'list';
  loading?: boolean;
  emptyMessage?: string;
  emptyAction?: React.ReactNode;
  onView?: (activity: Activity) => void;
  onFork?: (activity: Activity) => void;
  onDownload?: (activity: Activity) => void;
  onShare?: (activity: Activity) => void;
  className?: string;
}

export function ActivityGrid({
  activities,
  variant = 'grid',
  loading = false,
  emptyMessage = 'Nenhuma atividade encontrada',
  emptyAction,
  onView,
  onFork,
  onDownload,
  onShare,
  className,
}: ActivityGridProps) {
  if (loading) {
    const gridKeys = Array.from({ length: 8 }, (_, i) => `skeleton-grid-${i}`);
    const listKeys = Array.from({ length: 5 }, (_, i) => `skeleton-list-${i}`);
    return (
      <div className={cn(className)}>
        {variant === 'grid' ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gridKeys.map((key) => (
              <SkeletonCard key={key} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {listKeys.map((key) => (
              <SkeletonCard key={key} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{emptyMessage}</h3>
        <p className="text-muted-foreground mb-4 max-w-md">
          Que tal criar a primeira atividade ou ajustar os filtros de busca?
        </p>
        {emptyAction}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <motion.div
        className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', className)}
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.05 } },
        }}
      >
        {activities.map((activity, _index) => (
          <motion.div key={activity.id} variants={{ show: { opacity: 1, scale: 1, y: 0 } }}>
            <ActivityCard
              activity={activity}
              variant="grid"
              onView={onView}
              onFork={onFork}
              onDownload={onDownload}
              onShare={onShare}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn('space-y-4', className)}
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } },
      }}
    >
      {activities.map((activity, _index) => (
        <motion.div key={activity.id} variants={{ show: { opacity: 1, x: 0 } }}>
          <ActivityCard
            activity={activity}
            variant="list"
            onView={onView}
            onFork={onFork}
            onDownload={onDownload}
            onShare={onShare}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
