'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Download,
  ExternalLink,
  Eye,
  GitFork,
  Share2,
  Tag,
  User,
} from 'lucide-react';
import type * as React from 'react';

export interface Activity {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  tags: string[];
  license: string;
  visibility: 'private' | 'public' | 'unlisted';
  allowFork: boolean;
  allowComments: boolean;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  createdAt: string;
  updatedAt: string;
  forkCount: number;
  viewCount: number;
  downloadCount: number;
  thumbnailUrl?: string;
  contentHtml: string;
}

interface ActivityCardProps {
  activity: Activity;
  variant?: 'grid' | 'list';
  onView?: (activity: Activity) => void;
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

const visibilityLabels: Record<
  'private' | 'public' | 'unlisted',
  { label: string; icon: React.ReactNode }
> = {
  private: { label: 'Privada', icon: <AlertCircle className="h-3 w-3" /> },
  public: { label: 'Pública', icon: <CheckCircle className="h-3 w-3" /> },
  unlisted: { label: 'Não listada', icon: <ExternalLink className="h-3 w-3" /> },
};

export function ActivityCard({
  activity,
  variant = 'grid',
  onView,
  onFork,
  onDownload,
  onShare,
  className,
}: ActivityCardProps) {
  const license = licenseLabels[activity.license] || {
    label: activity.license,
    color: 'bg-gray-100 text-gray-800',
  };
  const visibility =
    visibilityLabels[activity.visibility as keyof typeof visibilityLabels] ??
    visibilityLabels.private;

  const handleView = () => onView?.(activity);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleView();
    }
  };
  const handleFork = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFork?.(activity);
  };
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload?.(activity);
  };
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(activity);
  };

  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn('group', className)}
      >
        <Card className="flex flex-row items-center gap-4 p-4 hover:bg-accent/50 transition-colors">
          <button
            type="button"
            className="flex-1 min-w-0 cursor-pointer text-left p-0 bg-transparent border-none"
            onClick={handleView}
            onKeyDown={handleKeyDown}
            aria-label={`Visualizar ${activity.title}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg truncate">{activity.title}</h3>
              <Badge variant="outline" className={license.color}>
                {license.label}
              </Badge>
              <Badge variant="outline">
                {visibility.icon}
                {visibility.label}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2">{activity.description}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
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
              {activity.tags.slice(0, 5).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {activity.tags.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{activity.tags.length - 5}
                </Badge>
              )}
            </div>
          </button>
          <div className="flex items-center gap-2 ml-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.author.avatarUrl} alt={activity.author.name} />
              <AvatarFallback name={activity.author.name} />
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleView}>
                  <Eye className="h-4 w-4 mr-2" /> Visualizar
                </DropdownMenuItem>
                {activity.allowFork && (
                  <DropdownMenuItem onClick={handleFork}>
                    <GitFork className="h-4 w-4 mr-2" /> Criar derivação
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" /> Baixar PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" /> Compartilhar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={cn(className)}
    >
      <Card className="flex flex-col h-full group" onClick={handleView}>
        {activity.thumbnailUrl && (
          <div className="relative aspect-[210/297] overflow-hidden rounded-t-lg">
            <img
              src={activity.thumbnailUrl}
              alt={activity.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <Badge variant="outline" className={license.color}>
                {license.label}
              </Badge>
              <Badge variant="outline">
                {visibility.icon}
                {visibility.label}
              </Badge>
            </div>
          </div>
        )}

        <CardContent className="flex-1 flex flex-col p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {activity.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 flex-1 mb-3">
            {activity.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {activity.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {activity.tags.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{activity.tags.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground border-t pt-3">
            <span className="flex items-center gap-1">
              <Tag className="h-3 w-3" /> {activity.subject}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" /> {activity.grade}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-4 pt-0 border-t">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={activity.author.avatarUrl} alt={activity.author.name} />
              <AvatarFallback name={activity.author.name} />
            </Avatar>
            <span className="text-sm font-medium truncate max-w-[120px]">
              {activity.author.name}
            </span>
            <span className="text-xs text-muted-foreground">{formatDate(activity.createdAt)}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" /> {activity.viewCount}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3 w-3" /> {activity.forkCount}
            </span>
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3" /> {activity.downloadCount}
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
