'use client';

import { Node, mergeAttributes } from '@tiptap/core';
import type { Editor } from '@tiptap/core';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import type { Decoration } from '@tiptap/pm/view';
import { ReactNodeViewRenderer } from '@tiptap/react';

export interface A4PageOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    a4Page: {
      setA4Page: () => ReturnType;
    };
  }
}

export const A4Page = Node.create<A4PageOptions>({
  name: 'a4Page',
  group: 'block',
  content: 'block+',
  defining: true,
  isolating: true,

  addAttributes() {
    return {
      pageNumber: {
        default: 1,
        parseHTML: (element) =>
          Number.parseInt(element.getAttribute('data-page-number') || '1', 10),
        renderHTML: (attributes) => ({ 'data-page-number': attributes.pageNumber }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-a4-page]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-a4-page': '',
        class: 'a4-page relative',
        style:
          'width: 210mm; min-height: 297mm; padding: 20mm; box-sizing: border-box; background: white; box-shadow: 0 0 0 1px #e5e7eb, 0 4px 6px -1px rgb(0 0 0 / 0.1);',
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setA4Page:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            content: [{ type: 'paragraph' }],
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(A4PageView);
  },
});

function A4PageView(props: {
  node: ProseMirrorNode;
  editor: Editor;
  getPos: () => number;
  decorations: readonly Decoration[];
  updateAttributes: (attrs: Record<string, unknown>) => void;
}) {
  const { node } = props;
  const pageNumber = node.attrs.pageNumber || 1;

  return (
    <div
      className="a4-page relative"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm',
        boxSizing: 'border-box',
        background: 'white',
        boxShadow: '0 0 0 1px #e5e7eb, 0 4px 6px -1px rgb(0 0 0 / 0.1)',
        margin: '0 auto 24px',
      }}
      data-page-number={pageNumber}
    >
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-400">
        Página {pageNumber}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400">
        ProfeLab
      </div>
      <div className="relative min-h-[257mm]">
        <div
          className="prose prose-gray max-w-none focus:outline-none min-h-full"
          contentEditable
          data-node-view-wrapper
        />
      </div>
    </div>
  );
}
