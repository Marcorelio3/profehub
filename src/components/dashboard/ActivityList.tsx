'use client';

import type { Activity } from '@/components/library';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Calendar,
  Download,
  Edit,
  Eye,
  FileText,
  GitFork,
  MoreVertical,
  Share2,
  Tag,
  Trash2,
  User,
} from 'lucide-react';
import type * as React from 'react';

interface ActivityListProps {
  activities: Activity[];
  loading?: boolean;
  emptyMessage?: string;
  onView?: (activity: Activity) => void;
  onEdit?: (activity: Activity) => void;
  onDelete?: (activity: Activity) => void;
  onFork?: (activity: Activity) => void;
  onDownload?: (activity: Activity) => void;
  onShare?: (activity: Activity) => void;
  className?: string;
}

const licenseLabels: Record<string, { label: string; color: string }> = {
  'cc-by': { label: 'CC BY', color: 'bg-green-100 text-green-800' },
  'cc-by-sa': { label: 'CC BY-SA', color: 'bg-blue-100 text-blue-800' },
  'cc-by-nc': { label: 'CC BY-NC', color: 'bg-yellow-100 text-yellow-800' },
  'cc-by-nd': { label: 'CC BY-ND', color: 'bg-orange-100 text-orange-800' },
  cc0: { label: 'CC0', color: 'bg-purple-100 text-purple-800' },
  'all-rights': { label: 'Todos os direitos', color: 'bg-red-100 text-red-800' },
};

const visibilityLabels: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  private: {
    label: 'Privada',
    icon: <span className="w-2 h-2 rounded-full bg-gray-400" />,
    color: 'bg-gray-100 text-gray-800',
  },
  public: {
    label: 'Pública',
    icon: <span className="w-2 h-2 rounded-full bg-green-500" />,
    color: 'bg-green-100 text-green-800',
  },
  unlisted: {
    label: 'Não listada',
    icon: <span className="w-2 h-2 rounded-full bg-blue-500" />,
    color: 'bg-blue-100 text-blue-800',
  },
};

export function ActivityList({
  activities,
  loading = false,
  emptyMessage = 'Nenhuma atividade criada ainda',
  onView,
  onEdit,
  onDelete,
  onFork,
  onDownload,
  onShare,
  className,
}: ActivityListProps) {
  if (loading) {
    const skeletonKeys = Array.from({ length: 5 }, (_, i) => `skeleton-${i}`);
    return (
      <div className={cn('space-y-4', className)}>
        {skeletonKeys.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="animate-pulse-soft">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-3 w-1/2 bg-muted rounded" />
                  </div>
                  <div className="h-8 w-24 bg-muted rounded" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className={cn('text-center py-16', className)}>
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">{emptyMessage}</h3>
        <p className="text-muted-foreground mb-4">
          Comece criando sua primeira atividade educacional.
        </p>
        <Button onClick={onView as () => void} className="w-full sm:w-auto">
          <FileText className="h-4 w-4 mr-2" />
          Nova Atividade
        </Button>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.03 }}
        >
          <Card className="hover:bg-accent/30 transition-colors">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold truncate">{activity.title}</h3>
                    <Badge
                      variant="outline"
                      className={
                        licenseLabels[activity.license]?.color || 'bg-gray-100 text-gray-800'
                      }
                    >
                      {licenseLabels[activity.license]?.label || activity.license}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        visibilityLabels[activity.visibility]?.color || 'bg-gray-100 text-gray-800'
                      }
                    >
                      {visibilityLabels[activity.visibility]?.icon}
                      {visibilityLabels[activity.visibility]?.label}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-1 mb-2">
                    {activity.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {activity.subject}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {activity.grade}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {formatDate(activity.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {activity.viewCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" /> {activity.forkCount}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {activity.tags.slice(0, 6).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {activity.tags.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{activity.tags.length - 6}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView?.(activity)}>
                        <Eye className="h-4 w-4 mr-2" /> Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(activity)}>
                        <Edit className="h-4 w-4 mr-2" /> Editar
                      </DropdownMenuItem>
                      {activity.allowFork && (
                        <DropdownMenuItem onClick={() => onFork?.(activity)}>
                          <GitFork className="h-4 w-4 mr-2" /> Criar derivação
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onDownload?.(activity)}>
                        <Download className="h-4 w-4 mr-2" /> Baixar PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onShare?.(activity)}>
                        <Share2 className="h-4 w-4 mr-2" /> Compartilhar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete?.(activity)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
