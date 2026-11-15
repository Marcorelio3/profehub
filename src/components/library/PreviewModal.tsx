'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Download,
  ExternalLink,
  Eye,
  GitFork,
  Share2,
  X,
} from 'lucide-react';
import * as React from 'react';
import type { Activity } from './ActivityCard';

interface PreviewModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (activity: Activity) => void;
  onFork?: (activity: Activity) => void;
  onShare?: (activity: Activity) => void;
  onViewFull?: (activity: Activity) => void;
}

const licenseLabels: Record<string, { label: string; color: string }> = {
  'cc-by': { label: 'CC BY - Atribuição', color: 'bg-green-100 text-green-800' },
  'cc-by-sa': { label: 'CC BY-SA - Compartilha Igual', color: 'bg-blue-100 text-blue-800' },
  'cc-by-nc': { label: 'CC BY-NC - Não Comercial', color: 'bg-yellow-100 text-yellow-800' },
  'cc-by-nd': { label: 'CC BY-ND - Sem Derivações', color: 'bg-orange-100 text-orange-800' },
  cc0: { label: 'CC0 - Domínio Público', color: 'bg-purple-100 text-purple-800' },
  'all-rights': { label: 'Todos os Direitos Reservados', color: 'bg-red-100 text-red-800' },
};

const visibilityLabels: Record<
  'private' | 'public' | 'unlisted',
  { label: string; icon: React.ReactNode; color: string }
> = {
  private: {
    label: 'Privada',
    icon: <AlertCircle className="h-3 w-3" />,
    color: 'bg-gray-100 text-gray-800',
  },
  public: {
    label: 'Pública',
    icon: <CheckCircle className="h-3 w-3" />,
    color: 'bg-green-100 text-green-800',
  },
  unlisted: {
    label: 'Não listada',
    icon: <ExternalLink className="h-3 w-3" />,
    color: 'bg-blue-100 text-blue-800',
  },
};

export function PreviewModal({
  activity,
  isOpen,
  onClose,
  onDownload,
  onFork,
  onShare,
  onViewFull,
}: PreviewModalProps) {
  const [_currentPage, setCurrentPage] = React.useState(0);

  if (!activity) return null;

  const license = licenseLabels[activity.license] || {
    label: activity.license,
    color: 'bg-gray-100 text-gray-800',
  };
  const visibility =
    visibilityLabels[activity.visibility as keyof typeof visibilityLabels] ??
    visibilityLabels.private;

  const pages = activity.contentHtml.split('<div data-a4-page=').slice(1);
  const totalPages = Math.max(pages.length, 1);

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentPage((p) => Math.max(0, p - 1));
      if (e.key === 'ArrowRight') setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
    },
    [onClose, totalPages],
  );

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  React.useEffect(() => {
    setCurrentPage(0);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
            <div className="flex h-full flex-col">
              <DialogHeader className="flex-shrink-0 p-4 border-b">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="text-xl font-semibold truncate">
                      {activity.title}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-1 line-clamp-2">
                      {activity.description}
                    </DialogDescription>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-shrink-0 p-1 rounded-lg hover:bg-accent transition-colors"
                    aria-label="Fechar prévia"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Badge variant="outline" className={license.color}>
                    {license.label}
                  </Badge>
                  <Badge variant="outline" className={visibility.color}>
                    {visibility.icon}
                    {visibility.label}
                  </Badge>
                  {activity.allowFork && (
                    <Badge variant="secondary">
                      <GitFork className="h-3 w-3 mr-1" /> Fork permitido
                    </Badge>
                  )}
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-auto p-4">
                <div className="max-w-[210mm] mx-auto">
                  <div
                    className="a4-page relative"
                    style={{
                      width: '210mm',
                      minHeight: '297mm',
                      padding: '20mm',
                      boxSizing: 'border-box',
                      background: 'white',
                      boxShadow: '0 0 0 1px #e5e7eb, 0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      marginBottom: '24px',
                    }}
                  >
                    <div
                      className="relative"
                      // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is sanitized server-side and comes from TipTap editor
                      dangerouslySetInnerHTML={{ __html: activity.contentHtml }}
                    />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-400">
                      Página 1
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400">
                      ProfeLab
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex-shrink-0 p-4 border-t flex-wrap gap-3">
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={activity.author.avatarUrl} alt={activity.author.name} />
                        <AvatarFallback name={activity.author.name} />
                      </Avatar>
                      <span>{activity.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(activity.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {activity.viewCount} visualizações
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {activity.forkCount} derivações
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activity.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button variant="outline" onClick={() => onDownload?.(activity)}>
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PDF
                  </Button>
                  {activity.allowFork && (
                    <Button variant="outline" onClick={() => onFork?.(activity)}>
                      <GitFork className="h-4 w-4 mr-2" />
                      Criar derivação
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => onShare?.(activity)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                  <Button onClick={() => onViewFull?.(activity)} className="ml-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver completa
                  </Button>
                </div>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
