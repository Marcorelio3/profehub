'use client';

import { Node, mergeAttributes } from '@tiptap/core';
import type { Editor } from '@tiptap/core';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { ReactNodeViewRenderer } from '@tiptap/react';

export interface PageBreakOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pageBreak: {
      setPageBreak: () => ReturnType;
    };
  }
}

export const PageBreak = Node.create<PageBreakOptions>({
  name: 'pageBreak',
  group: 'block',
  atom: true,
  selectable: true,

  addAttributes() {
    return {};
  },

  parseHTML() {
    return [{ tag: 'hr[data-page-break]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'hr',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-page-break': '',
        class: 'page-break',
        style:
          'border: none; border-top: 2px dashed #d1d5db; margin: 24px 0; page-break-after: always;',
      }),
    ];
  },

  addCommands() {
    return {
      setPageBreak:
        () =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(PageBreakView);
  },
});

function PageBreakView(props: {
  editor: Editor;
  node: ProseMirrorNode;
  getPos: () => number | undefined;
}) {
  const { editor, getPos } = props;
  const handleClick = () => {
    const pos = getPos();
    if (pos !== undefined) {
      editor
        .chain()
        .focus()
        .deleteRange({ from: pos, to: pos + 1 })
        .run();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <hr
      className="page-break"
      style={{
        border: 'none',
        borderTop: '2px dashed #d1d5db',
        margin: '24px 0',
        pageBreakAfter: 'always',
        cursor: 'pointer',
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Remover quebra de página"
    />
  );
}
