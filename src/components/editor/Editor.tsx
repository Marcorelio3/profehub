'use client';

import { Button } from '@/components/ui/button';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import History from '@tiptap/extension-history';
import { useEditor } from '@tiptap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout, Loader2, Save, Share2 } from 'lucide-react';
import * as React from 'react';
import { EditorCanvas } from './EditorCanvas';
import { EditorSidebar } from './EditorSidebar';
import { SkeletonEditor } from './SkeletonEditor';
import { Toolbar } from './Toolbar';

interface EditorProps {
  initialContent?: string;
  initialMetadata?: EditorSidebarProps['metadata'];
  onSave?: (content: string, metadata: EditorSidebarProps['metadata']) => Promise<void>;
  onPublish?: (content: string, metadata: EditorSidebarProps['metadata']) => Promise<void>;
  onExportPDF?: (content: string) => Promise<void>;
  readonly?: boolean;
  className?: string;
}

type EditorSidebarProps = {
  metadata: {
    title: string;
    description: string;
    subject: string;
    grade: string;
    tags: string[];
    license: 'cc-by' | 'cc-by-sa' | 'cc-by-nc' | 'cc-by-nd' | 'cc0' | 'all-rights';
    visibility: 'private' | 'public' | 'unlisted';
    allowFork: boolean;
    allowComments: boolean;
  };
};

export function Editor({
  initialContent = '<div data-a4-page=""><p></p></div>',
  initialMetadata,
  onSave,
  onPublish,
  onExportPDF,
  readonly = false,
  className,
}: EditorProps) {
  const [content, setContent] = React.useState(initialContent);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isSaving, setIsSaving] = React.useState(false);
  const [metadata, _setMetadata] = React.useState<EditorSidebarProps['metadata']>({
    title: '',
    description: '',
    subject: '',
    grade: '',
    tags: [],
    license: 'cc-by',
    visibility: 'private',
    allowFork: true,
    allowComments: true,
    ...initialMetadata,
  });
  const [showSidebar, setShowSidebar] = React.useState(true);

  const editor = useEditor({
    extensions: [History],
    content,
    editable: !readonly,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      const pages = editor.$doc.querySelectorAll('[data-a4-page]');
      setTotalPages(pages.length);
    },
  });

  const { toast } = useToast();

  const handleSave = React.useCallback(async () => {
    if (!onSave) return;
    setIsSaving(true);
    try {
      await onSave(content, metadata);
      toast({ title: 'Salvo com sucesso', description: 'Rascunho atualizado', variant: 'success' });
    } catch (_error) {
      toast({ title: 'Erro ao salvar', description: 'Tente novamente', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  }, [onSave, content, metadata, toast]);

  const handlePublish = async () => {
    if (!onPublish) return;
    if (!metadata.title.trim()) {
      toast({
        title: 'Título obrigatório',
        description: 'Adicione um título antes de publicar',
        variant: 'destructive',
      });
      return;
    }
    setIsSaving(true);
    try {
      await onPublish(content, metadata);
      toast({
        title: 'Publicado!',
        description: 'Atividade disponível na biblioteca',
        variant: 'success',
      });
    } catch (_error) {
      toast({ title: 'Erro ao publicar', description: 'Tente novamente', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportPDF = React.useCallback(async () => {
    if (!onExportPDF) return;
    try {
      await onExportPDF(content);
      toast({ title: 'PDF gerado', description: 'Download iniciado', variant: 'success' });
    } catch (_error) {
      toast({ title: 'Erro ao gerar PDF', description: 'Tente novamente', variant: 'destructive' });
    }
  }, [onExportPDF, content, toast]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      handleExportPDF();
    }
  };

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handleExportPDF();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleSave, handleExportPDF]);

  if (!editor) {
    return (
      <div className={cn('flex h-[600px] gap-4', className)}>
        <div className="flex-1">
          <SkeletonEditor />
        </div>
        <aside className="w-72 flex-shrink-0">
          <div className="h-full bg-card border rounded-lg p-6 animate-pulse-soft space-y-4">
            <div className="h-8 w-3/4 bg-muted rounded" />
            <div className="h-8 w-full bg-muted rounded" />
            <div className="h-8 w-full bg-muted rounded" />
            <div className="h-8 w-full bg-muted rounded" />
          </div>
        </aside>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div
        className={cn('flex h-[calc(100vh-4rem)] gap-4 overflow-hidden', className)}
        onKeyDown={handleKeyDown}
      >
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between gap-4 p-4 bg-card border-b sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold">Editor de Atividade</h1>
              <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">
                Página {currentPage} de {totalPages}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(!showSidebar)}
                aria-label={showSidebar ? 'Ocultar painel lateral' : 'Mostrar painel lateral'}
              >
                <Layout className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSave}
                disabled={isSaving || readonly}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Salvar'}
              </Button>
              <Button size="sm" onClick={handlePublish} disabled={isSaving || readonly}>
                <Share2 className="h-4 w-4 mr-2" />
                Publicar
              </Button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 flex flex-col min-w-0">
              <Toolbar editor={editor} onExportPDF={handleExportPDF} />
              <div className="flex-1 overflow-auto p-4">
                <EditorCanvas
                  content={content}
                  onChange={setContent}
                  onPageChange={setCurrentPage}
                  readonly={readonly}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {showSidebar && (
                <motion.aside
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 288, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <EditorSidebar
                    _editor={editor}
                    _content={content}
                    _currentPage={currentPage}
                    _totalPages={totalPages}
                    _onContentChange={setContent}
                    onExportPDF={handleExportPDF}
                    onPublish={handlePublish}
                    onSaveDraft={handleSave}
                    isSaving={isSaving}
                  />
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ToastViewport />
      </div>
    </ToastProvider>
  );
}
