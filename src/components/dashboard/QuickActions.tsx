'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { BarChart2, Plus, Search, Settings } from 'lucide-react';
import type * as React from 'react';

interface QuickAction {
  label: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  color?: string;
  bgColor?: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

export function QuickActions({ actions, className }: QuickActionsProps) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="h-full transition-all hover:shadow-elevation-2">
            <CardContent className="p-6">
              <Button
                variant={action.variant || 'outline'}
                className={cn(
                  'w-full h-24 flex flex-col items-center justify-center gap-3',
                  action.color && `text-${action.color}`,
                  action.bgColor && `bg-${action.bgColor}`,
                )}
                onClick={action.onClick}
              >
                <div
                  className="p-2 rounded-xl"
                  style={{
                    backgroundColor: action.bgColor || 'var(--primary)',
                    color: action.color || 'white',
                  }}
                >
                  {action.icon}
                </div>
                <div className="text-center">
                  <p className="font-medium">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export function DefaultQuickActions({
  onNewActivity,
  onBrowseLibrary,
  onViewAnalytics,
  onSettings,
  className,
}: {
  onNewActivity: () => void;
  onBrowseLibrary: () => void;
  onViewAnalytics: () => void;
  onSettings: () => void;
  className?: string;
}) {
  const actions: QuickAction[] = [
    {
      label: 'Nova Atividade',
      description: 'Crie do zero ou use template',
      icon: <Plus className="h-5 w-5" />,
      onClick: onNewActivity,
      bgColor: 'bg-blue-500',
    },
    {
      label: 'Biblioteca',
      description: 'Explore atividades públicas',
      icon: <Search className="h-5 w-5" />,
      onClick: onBrowseLibrary,
      bgColor: 'bg-green-500',
    },
    {
      label: 'Analytics',
      description: 'Veja suas estatísticas',
      icon: <BarChart2 className="h-5 w-5" />,
      onClick: onViewAnalytics,
      bgColor: 'bg-purple-500',
    },
    {
      label: 'Configurações',
      description: 'Perfil, conta, preferências',
      icon: <Settings className="h-5 w-5" />,
      onClick: onSettings,
      bgColor: 'bg-gray-500',
    },
  ];

  return <QuickActions actions={actions} className={className} />;
}
