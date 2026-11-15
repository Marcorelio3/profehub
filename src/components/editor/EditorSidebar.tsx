'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import type { useEditor } from '@tiptap/react';
import { AnimatePresence } from 'framer-motion';
import { Download, Eye, FileText, Lock, Settings, Share2, Tag, Unlock } from 'lucide-react';
import * as React from 'react';

interface EditorSidebarProps {
  _editor: ReturnType<typeof useEditor> | null;
  _content: string;
  _currentPage: number;
  _totalPages: number;
  _onContentChange: (content: string) => void;
  onExportPDF?: () => void;
  onPublish?: (metadata: ActivityMetadata) => void;
  onSaveDraft?: () => void;
  isSaving?: boolean;
  className?: string;
}

export interface ActivityMetadata {
  title: string;
  description: string;
  subject: string;
  grade: string;
  tags: string[];
  license: 'cc-by' | 'cc-by-sa' | 'cc-by-nc' | 'cc-by-nd' | 'cc0' | 'all-rights';
  visibility: 'private' | 'public' | 'unlisted';
  allowFork: boolean;
  allowComments: boolean;
}

const subjects = [
  'Matemática',
  'Português',
  'História',
  'Geografia',
  'Ciências',
  'Biologia',
  'Física',
  'Química',
  'Inglês',
  'Espanhol',
  'Arte',
  'Educação Física',
  'Filosofia',
  'Sociologia',
  'Outros',
];

const grades = [
  '1º Ano',
  '2º Ano',
  '3º Ano',
  '4º Ano',
  '5º Ano',
  '6º Ano',
  '7º Ano',
  '8º Ano',
  '9º Ano',
  '1º Série EM',
  '2º Série EM',
  '3º Série EM',
  'Ensino Superior',
];

const licenses = [
  {
    value: 'cc-by',
    label: 'CC BY - Atribuição',
    description: 'Permite uso comercial com atribuição',
  },
  {
    value: 'cc-by-sa',
    label: 'CC BY-SA - Compartilha Igual',
    description: 'Derivações sob mesma licença',
  },
  { value: 'cc-by-nc', label: 'CC BY-NC - Não Comercial', description: 'Apenas uso não comercial' },
  {
    value: 'cc-by-nd',
    label: 'CC BY-ND - Sem Derivações',
    description: 'Não permite obras derivadas',
  },
  { value: 'cc0', label: 'CC0 - Domínio Público', description: 'Sem restrições' },
  {
    value: 'all-rights',
    label: 'Todos os Direitos Reservados',
    description: 'Uso apenas com permissão',
  },
];

export function EditorSidebar({
  _editor,
  _content,
  _currentPage,
  _totalPages,
  _onContentChange,
  onExportPDF,
  onPublish,
  onSaveDraft,
  isSaving,
  className,
}: EditorSidebarProps) {
  const [activeTab, setActiveTab] = React.useState<string>('content');
  const [metadata, setMetadata] = React.useState<ActivityMetadata>({
    title: '',
    description: '',
    subject: '',
    grade: '',
    tags: [],
    license: 'cc-by',
    visibility: 'private',
    allowFork: true,
    allowComments: true,
  });
  const [tagInput, setTagInput] = React.useState('');

  const wordCount = React.useMemo(() => {
    const text = _content
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return text ? text.split(' ').length : 0;
  }, [_content]);

  const charCount = React.useMemo(() => {
    return _content.replace(/<[^>]*>/g, '').length;
  }, [_content]);

  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setMetadata((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tag: string) => {
    setMetadata((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handlePublish = () => {
    if (!metadata.title.trim()) {
      alert('Por favor, adicione um título antes de publicar.');
      return;
    }
    onPublish?.(metadata);
  };

  return (
    <aside className={cn('w-72 flex-shrink-0 flex flex-col', className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content" className="px-2">
            <FileText className="h-4 w-4 mx-auto" />
          </TabsTrigger>
          <TabsTrigger value="metadata" className="px-2">
            <Tag className="h-4 w-4 mx-auto" />
          </TabsTrigger>
          <TabsTrigger value="settings" className="px-2">
            <Settings className="h-4 w-4 mx-auto" />
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="content" className="flex-1 overflow-y-auto p-3 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Estrutura do Documento</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Páginas</span>
                    <span className="font-medium">{_totalPages}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Página atual</span>
                    <span className="font-medium">{_currentPage}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Palavras</span>
                    <span className="font-medium">{wordCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Caracteres</span>
                    <span className="font-medium">{charCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={onExportPDF}
                >
                  <Download className="h-4 w-4" />
                  Exportar PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={onSaveDraft}
                  disabled={isSaving}
                >
                  <FileText className="h-4 w-4" />
                  {isSaving ? 'Salvando...' : 'Salvar Rascunho'}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={handlePublish}
                >
                  <Share2 className="h-4 w-4" />
                  Publicar
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metadata" className="flex-1 overflow-y-auto p-3 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Metadados da Atividade</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div>
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={metadata.title}
                    onChange={(e) => setMetadata((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Título da atividade"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    value={metadata.description}
                    onChange={(e) =>
                      setMetadata((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Breve descrição do conteúdo"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Disciplina</Label>
                  <Select
                    value={metadata.subject}
                    onValueChange={(value) => setMetadata((prev) => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Selecione a disciplina" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="grade">Série/Ano</Label>
                  <Select
                    value={metadata.grade}
                    onValueChange={(value) => setMetadata((prev) => ({ ...prev, grade: value }))}
                  >
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="Selecione a série/ano" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {metadata.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="hover:text-primary/70"
                          aria-label={`Remover tag ${tag}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagAdd}
                      placeholder="Adicionar tag + Enter"
                      className="px-2 py-1 text-xs border rounded-full bg-background min-w-[120px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Licença e Visibilidade</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div>
                  <Label>Licença de Uso</Label>
                  <Select
                    value={metadata.license}
                    onValueChange={(value: ActivityMetadata['license']) =>
                      setMetadata((prev) => ({ ...prev, license: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a licença" />
                    </SelectTrigger>
                    <SelectContent>
                      {licenses.map((l) => (
                        <SelectItem key={l.value} value={l.value}>
                          <div>
                            <div className="font-medium">{l.label}</div>
                            <div className="text-xs text-muted-foreground">{l.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Visibilidade</Label>
                  <Select
                    value={metadata.visibility}
                    onValueChange={(value: ActivityMetadata['visibility']) =>
                      setMetadata((prev) => ({ ...prev, visibility: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a visibilidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">
                        <Lock className="h-4 w-4 mr-2" />
                        Privada (apenas você)
                      </SelectItem>
                      <SelectItem value="unlisted">
                        <Eye className="h-4 w-4 mr-2" />
                        Não listada (quem tem o link)
                      </SelectItem>
                      <SelectItem value="public">
                        <Unlock className="h-4 w-4 mr-2" />
                        Pública (na biblioteca)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer" htmlFor="allow-fork">
                    <Checkbox
                      id="allow-fork"
                      checked={metadata.allowFork}
                      onCheckedChange={(checked: boolean) =>
                        setMetadata((prev) => ({ ...prev, allowFork: checked }))
                      }
                    />
                    <span className="text-sm">Permitir que outros criem derivações (fork)</span>
                  </label>
                  <label
                    className="flex items-center gap-2 cursor-pointer"
                    htmlFor="allow-comments"
                  >
                    <Checkbox
                      id="allow-comments"
                      checked={metadata.allowComments}
                      onCheckedChange={(checked: boolean) =>
                        setMetadata((prev) => ({ ...prev, allowComments: checked }))
                      }
                    />
                    <span className="text-sm">Permitir comentários</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="flex-1 overflow-y-auto p-3 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Preferências do Editor</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Checkbox defaultChecked id="spell-check" />
                    <span className="text-sm">Correção ortográfica automática</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Checkbox defaultChecked id="auto-save" />
                    <span className="text-sm">Salvamento automático</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Checkbox id="focus-mode" />
                    <span className="text-sm">Modo foco (ocultar sidebar)</span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Checkbox id="show-ruler" />
                    <span className="text-sm">Mostrar régua e margens</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Atalhos de Teclado</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2 text-xs text-muted-foreground">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded">Ctrl+B</kbd> Negrito
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded">Ctrl+I</kbd> Itálico
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded">Ctrl+U</kbd> Sublinhado
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded">Ctrl+K</kbd> Link
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded">Ctrl+Z</kbd> Desfazer
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded">Ctrl+Shift+Z</kbd> Refazer
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded">Ctrl+S</kbd> Salvar
                  </div>
                  <div>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded">Ctrl+P</kbd> Exportar PDF
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Sobre</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                <p>ProfeLab Editor v1.0.0</p>
                <p className="mt-1">Built with TipTap + Next.js 15</p>
              </CardContent>
            </Card>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </aside>
  );
}
