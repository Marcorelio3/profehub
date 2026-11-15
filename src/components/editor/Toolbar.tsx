'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold as BoldIcon,
  CheckSquare,
  Code as CodeIcon,
  Download,
  Highlighter,
  Image as ImageIcon,
  Italic as ItalicIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Table as TableIcon,
  Type,
  Underline as UnderlineIcon,
  Undo,
  X,
} from 'lucide-react';
import type * as React from 'react';
import { useState } from 'react';

interface ToolbarProps {
  editor: Editor | null;
  onExportPDF?: () => void;
  className?: string;
}

const headingLevels: { level: 1 | 2 | 3; label: string }[] = [
  { level: 1, label: 'Titulo 1' },
  { level: 2, label: 'Titulo 2' },
  { level: 3, label: 'Titulo 3' },
];

const textAlignOptions: {
  align: 'left' | 'center' | 'right' | 'justify';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { align: 'left', label: 'Esquerda', icon: AlignLeft },
  { align: 'center', label: 'Centralizado', icon: AlignCenter },
  { align: 'right', label: 'Direita', icon: AlignRight },
  { align: 'justify', label: 'Justificado', icon: AlignJustify },
];

export function Toolbar({ editor, onExportPDF, className }: ToolbarProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  if (!editor) {
    return (
      <div
        className={cn(
          'flex flex-wrap items-center gap-1.5 p-2 bg-muted/50 rounded-lg border',
          className,
        )}
        role="toolbar"
        aria-label="Barra de ferramentas do editor"
      >
        <span className="text-muted-foreground text-sm">Editor não disponível</span>
      </div>
    );
  }

  const addLink = () => {
    if (!linkUrl.trim()) return;
    editor.chain().focus().setLink({ href: linkUrl }).run();
    setShowLinkInput(false);
    setLinkUrl('');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        editor
          .chain()
          .focus()
          .setImage({ src: reader.result as string })
          .run();
      };
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  };

  const canUndo = editor.can().undo();
  const canRedo = editor.can().redo();
  const isParagraph = editor.isActive('paragraph');
  const isCodeBlock = editor.isActive('codeBlock');
  const isBold = editor.isActive('bold');
  const isItalic = editor.isActive('italic');
  const isStrike = editor.isActive('strike');
  const isUnderline = editor.isActive('underline');
  const isCode = editor.isActive('code');
  const isHighlight = editor.isActive('highlight');
  const isBulletList = editor.isActive('bulletList');
  const isOrderedList = editor.isActive('orderedList');
  const isTaskList = editor.isActive('taskList');
  const isBlockquote = editor.isActive('blockquote');

  const headingLevelsActive = headingLevels.map(({ level, label }) => ({
    level,
    label,
    active: editor.isActive('heading', { level }),
  }));

  const textAlignActive = textAlignOptions.map(({ align, label, icon }) => ({
    align,
    label,
    icon,
    active: editor.isActive({ textAlign: align }),
  }));

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-1.5 p-2 bg-muted/50 rounded-lg border',
        className,
      )}
      role="toolbar"
      aria-label="Barra de ferramentas do editor"
    >
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.commands.undo()}
            disabled={!canUndo}
            aria-label="Desfazer"
          >
            <Undo className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Desfazer (Ctrl+Z)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.commands.redo()}
            disabled={!canRedo}
            aria-label="Refazer"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Refazer (Ctrl+Shift+Z)</TooltipContent>
      </Tooltip>

      <div className="w-px h-6 bg-border mx-1" />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon" aria-label="Estilo de paragrafo">
            <Type className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuItem
            onSelect={() => editor.chain().focus().setParagraph().run()}
            className={cn(isParagraph ? 'bg-accent' : '')}
          >
            Paragrafo
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {headingLevelsActive.map(({ level, label, active }) => (
            <DropdownMenuItem
              key={level}
              onSelect={() => editor.chain().focus().toggleHeading({ level }).run()}
              className={cn(active ? 'bg-accent' : '')}
            >
              {label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => editor.chain().focus().setCodeBlock().run()}
            className={cn(isCodeBlock ? 'bg-accent' : '')}
          >
            Bloco de Codigo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-px h-6 bg-border mx-1" />

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
            aria-label="Negrito"
            aria-pressed={isBold}
            className={isBold ? 'bg-accent' : ''}
          >
            <BoldIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Negrito (Ctrl+B)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Italico"
            aria-pressed={isItalic}
            className={isItalic ? 'bg-accent' : ''}
          >
            <ItalicIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Italico (Ctrl+I)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            aria-label="Tachado"
            aria-pressed={isStrike}
            className={isStrike ? 'bg-accent' : ''}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Tachado (Ctrl+Shift+S)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            aria-label="Sublinhado"
            aria-pressed={isUnderline}
            className={isUnderline ? 'bg-accent' : ''}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Sublinhado (Ctrl+U)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleCode().run()}
            aria-label="Codigo inline"
            aria-pressed={isCode}
            className={isCode ? 'bg-accent' : ''}
          >
            <CodeIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Codigo inline (Ctrl+E)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            aria-label="Marcador"
            aria-pressed={isHighlight}
            className={isHighlight ? 'bg-accent' : ''}
          >
            <Highlighter className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Marcador (Ctrl+Shift+H)</TooltipContent>
      </Tooltip>

      <div className="w-px h-6 bg-border mx-1" />

      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" aria-label="Alinhamento">
                <AlignLeft className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {textAlignActive.map(({ align, label, active, icon: Icon }) => (
                <DropdownMenuItem
                  key={align}
                  onSelect={() => editor.chain().focus().setTextAlign(align).run()}
                  className={cn(active ? 'bg-accent' : '')}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>Alinhamento</TooltipContent>
      </Tooltip>

      <div className="w-px h-6 bg-border mx-1" />

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            aria-label="Lista com marcadores"
            aria-pressed={isBulletList}
            className={isBulletList ? 'bg-accent' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Lista com marcadores</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label="Lista numerada"
            aria-pressed={isOrderedList}
            className={isOrderedList ? 'bg-accent' : ''}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Lista numerada</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            aria-label="Lista de tarefas"
            aria-pressed={isTaskList}
            className={isTaskList ? 'bg-accent' : ''}
          >
            <CheckSquare className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Lista de tarefas</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().setBlockquote().run()}
            aria-label="Citacao"
            aria-pressed={isBlockquote}
            className={isBlockquote ? 'bg-accent' : ''}
          >
            <Quote className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Citacao (Ctrl+Shift+B)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            aria-label="Linha horizontal"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Linha horizontal</TooltipContent>
      </Tooltip>

      <div className="w-px h-6 bg-border mx-1" />

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowLinkInput(true)}
            aria-label="Inserir link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Inserir link (Ctrl+K)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => document.getElementById('image-upload')?.click()}
            aria-label="Inserir imagem"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Inserir imagem</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
            aria-label="Inserir tabela"
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Inserir tabela</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button variant="ghost" size="icon" onClick={onExportPDF} aria-label="Exportar PDF">
            <Download className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Exportar PDF</TooltipContent>
      </Tooltip>

      {showLinkInput && (
        <div className="flex items-center gap-2 ml-auto">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://exemplo.com"
            className="h-10 w-64 px-3 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            onKeyDown={(e) => {
              if (e.key === 'Enter') addLink();
              if (e.key === 'Escape') setShowLinkInput(false);
            }}
          />
          <Button size="sm" onClick={addLink}>
            Adicionar
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setShowLinkInput(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
