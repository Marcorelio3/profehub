'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Download, Eye, FileText, GitFork, TrendingDown, TrendingUp } from 'lucide-react';
import type * as React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon: React.ReactNode;
  bgColor: string;
  className?: string;
}

function StatCard({ title, value, change, icon, bgColor, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(className)}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold mt-1 text-foreground">{value}</p>
              {change !== undefined && (
                <div className="flex items-center gap-1 mt-2 text-sm">
                  {change >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span
                    className={cn('font-medium', change >= 0 ? 'text-green-600' : 'text-red-600')}
                  >
                    {change >= 0 ? '+' : ''}
                    {change}% vs mês anterior
                  </span>
                </div>
              )}
            </div>
            <div className={cn('p-3 rounded-xl', bgColor)}>{icon}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface StatsCardsProps {
  stats: {
    totalActivities: number;
    totalViews: number;
    totalDownloads: number;
    totalForks: number;
    activitiesChange?: number;
    viewsChange?: number;
    downloadsChange?: number;
    forksChange?: number;
  };
  className?: string;
}

export function StatsCards({ stats, className }: StatsCardsProps) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      <StatCard
        title="Atividades"
        value={stats.totalActivities}
        change={stats.activitiesChange}
        icon={<FileText className="h-6 w-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatCard
        title="Visualizações"
        value={stats.totalViews.toLocaleString('pt-BR')}
        change={stats.viewsChange}
        icon={<Eye className="h-6 w-6 text-green-600" />}
        bgColor="bg-green-50"
      />
      <StatCard
        title="Downloads"
        value={stats.totalDownloads.toLocaleString('pt-BR')}
        change={stats.downloadsChange}
        icon={<Download className="h-6 w-6 text-purple-600" />}
        bgColor="bg-purple-50"
      />
      <StatCard
        title="Derivações"
        value={stats.totalForks.toLocaleString('pt-BR')}
        change={stats.forksChange}
        icon={<GitFork className="h-6 w-6 text-orange-600" />}
        bgColor="bg-orange-50"
      />
    </div>
  );
}
