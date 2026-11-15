'use client';

import { cn } from '@/lib/utils';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Color from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import type { EditorState } from '@tiptap/pm/state';
import { EditorContent, useEditor } from '@tiptap/react';
import { useCallback, useRef } from 'react';
import { A4Page, PageBreak } from './extensions';

interface EditorCanvasProps {
  content?: string;
  onChange?: (content: string) => void;
  onPageChange?: (page: number) => void;
  readonly?: boolean;
  className?: string;
  _placeholder?: string;
}

const extensions = [
  History,
  Heading.configure({ levels: [1, 2, 3] }),
  Bold,
  Italic,
  Strike,
  Code,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: { class: 'text-primary underline underline-offset-2' },
  }),
  Image.configure({
    HTMLAttributes: { class: 'rounded-lg max-w-full h-auto' },
  }),
  BulletList,
  OrderedList,
  Blockquote.configure({
    HTMLAttributes: { class: 'border-l-4 border-primary pl-4 italic text-muted-foreground' },
  }),
  HorizontalRule,
  CodeBlock,
  Paragraph,
  Underline,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  TextStyle,
  Color,
  Highlight.configure({ multicolor: true }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Table.configure({ resizable: true }),
  TableRow,
  TableCell,
  TableHeader,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'a4Page') {
        return 'Comece a digitar sua atividade...';
      }
      return '';
    },
    emptyEditorClass: 'text-muted-foreground',
  }),
  A4Page,
  PageBreak,
];

export function EditorCanvas({
  content,
  onChange,
  onPageChange,
  readonly = false,
  className,
  _placeholder = 'Comece a digitar sua atividade...',
}: EditorCanvasProps) {
  const editorRef = useRef<ReturnType<typeof useEditor> | null>(null);
  const pageObserverRef = useRef<IntersectionObserver | null>(null);

  const editor = useEditor({
    extensions,
    content: content || '<div data-a4-page=""><p></p></div>',
    editable: !readonly,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
      detectCurrentPage(editor);
    },
    onCreate: ({ editor }) => {
      editorRef.current = editor;
      setupPageObserver(editor);
    },
    onDestroy: () => {
      editorRef.current = null;
      pageObserverRef.current?.disconnect();
    },
    editorProps: {
      attributes: {
        class: 'prose prose-gray max-w-none focus:outline-none min-h-[257mm]',
        style: 'line-height: 1.7;',
      },
    },
  });

  const setupPageObserver = useCallback(
    (_editorInstance: ReturnType<typeof useEditor>) => {
      if (typeof window === 'undefined') return;

      pageObserverRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const pageElement = entry.target as HTMLElement;
              const pageNumber = Number.parseInt(pageElement.dataset.pageNumber || '1', 10);
              onPageChange?.(pageNumber);
            }
          }
        },
        { rootMargin: '-50% 0px -50% 0px', threshold: 0.1 },
      );

      setTimeout(() => {
        const pages = document.querySelectorAll('[data-a4-page]');
        for (const page of pages) {
          pageObserverRef.current?.observe(page);
        }
      }, 100);
    },
    [onPageChange],
  );

  const detectCurrentPage = useCallback(
    (editorInstance: ReturnType<typeof useEditor>) => {
      if (!editorInstance) return;

      const state = editorInstance.state as EditorState;
      const { selection } = state;

      let currentPage = 1;
      state.doc.descendants((node: ProseMirrorNode, pos: number) => {
        if (node.type.name === 'a4Page') {
          const pageEnd = pos + node.nodeSize;
          if (selection.from <= pageEnd) {
            currentPage = (node.attrs.pageNumber as number) || 1;
            return false;
          }
        }
        return true;
      });

      onPageChange?.(currentPage);
    },
    [onPageChange],
  );

  const addPage = useCallback(() => {
    editor?.chain().focus().setA4Page().run();
  }, [editor]);

  if (!editor) {
    return (
      <div className={cn('rounded-lg border bg-card', className)}>
        <SkeletonEditor />
      </div>
    );
  }

  return (
    <div className={cn('rounded-lg border bg-card overflow-hidden', className)}>
      <div className="bg-muted/50 border-b p-3 flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground">Editor de Atividade A4</span>
        <span className="flex-1" />
        <button
          type="button"
          onClick={addPage}
          disabled={readonly}
          className="text-sm text-primary hover:text-primary/80 disabled:opacity-50"
          aria-label="Adicionar nova página A4"
        >
          + Adicionar página
        </button>
      </div>
      <div className="p-4 max-w-[250mm] mx-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function SkeletonEditor() {
  const toolbarKeys = Array.from({ length: 8 }, (_, i) => `toolbar-${i}`);
  const lineKeys = Array.from({ length: 12 }, (_, i) => `line-${i}`);

  return (
    <div className="p-6 space-y-4 min-h-[400px]">
      <div className="border-b p-3 flex items-center gap-2">
        {toolbarKeys.map((key) => (
          <div key={key} className="h-6 w-8 rounded bg-muted animate-pulse-soft" />
        ))}
      </div>
      <div className="space-y-3">
        <div className="h-8 w-3/4 rounded bg-muted animate-pulse-soft" />
        {lineKeys.map((key) => (
          <div key={key} className="h-4 w-full rounded bg-muted animate-pulse-soft" />
        ))}
      </div>
    </div>
  );
}
