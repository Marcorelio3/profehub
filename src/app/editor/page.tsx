'use client';
import { Editor } from '@/components/editor';
import { Header } from '@/components/layout';

export default function EditorPage() {
  const handleSave = async (_content: string, _metadata: EditorSidebarProps['metadata']) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handlePublish = async (_content: string, _metadata: EditorSidebarProps['metadata']) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  const handleExportPDF = async (_content: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 lg:p-6">
        <Editor onSave={handleSave} onPublish={handlePublish} onExportPDF={handleExportPDF} />
      </main>
    </div>
  );
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
