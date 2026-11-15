'use client';

export const dynamic = 'force-dynamic';

import { StatsCards } from '@/components/dashboard';
import { ActivityList } from '@/components/dashboard';
import { DefaultQuickActions } from '@/components/dashboard';
import type { Activity } from '@/components/library';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { FileText, Filter, Plus, Search } from 'lucide-react';
import * as React from 'react';

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Equações do 2º Grau - Lista de Exercícios',
    description:
      'Lista completa com 20 exercícios resolvidos passo a passo sobre equações quadráticas, incluindo discriminante, raízes e gráfico da parábola.',
    subject: 'Matemática',
    grade: '9º Ano',
    tags: ['equações', 'função quadrática', 'exercícios', 'ENEM'],
    license: 'cc-by-nc',
    visibility: 'public',
    allowFork: true,
    allowComments: true,
    author: { id: '1', name: 'Prof. João Silva', avatarUrl: undefined },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:22:00Z',
    forkCount: 12,
    viewCount: 1240,
    downloadCount: 356,
    thumbnailUrl: undefined,
    contentHtml: '',
  },
  {
    id: '2',
    title: 'Análise Sintática - Orações Subordinadas',
    description:
      'Material didático com teoria e exercícios sobre orações subordinadas adjetivas, adverbiais e substantivas. Inclui gabarito comentado.',
    subject: 'Português',
    grade: '2º Série EM',
    tags: ['sintaxe', 'orações subordinadas', 'gramática', 'vestibular'],
    license: 'cc-by',
    visibility: 'public',
    allowFork: true,
    allowComments: true,
    author: { id: '1', name: 'Prof. João Silva', avatarUrl: undefined },
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-10T09:15:00Z',
    forkCount: 8,
    viewCount: 890,
    downloadCount: 234,
    thumbnailUrl: undefined,
    contentHtml: '',
  },
  {
    id: '3',
    title: 'Revolução Industrial - Mapa Conceitual',
    description:
      'Mapa conceitual interativo sobre a Revolução Industrial: causas, fases, consequências sociais e econômicas. Para uso em sala ou estudo individual.',
    subject: 'História',
    grade: '8º Ano',
    tags: ['revolução industrial', 'mapa conceitual', 'século XVIII', 'transformações sociais'],
    license: 'cc-by-sa',
    visibility: 'unlisted',
    allowFork: true,
    allowComments: false,
    author: { id: '1', name: 'Prof. João Silva', avatarUrl: undefined },
    createdAt: '2024-01-05T16:45:00Z',
    updatedAt: '2024-01-12T11:30:00Z',
    forkCount: 5,
    viewCount: 445,
    downloadCount: 178,
    thumbnailUrl: undefined,
    contentHtml: '',
  },
  {
    id: '4',
    title: 'Tabela Periódica - Atividade de Colorir',
    description:
      'Atividade lúdica para memorização dos grupos e períodos da tabela periódica. Indicada para introdução ao tema no 9º ano.',
    subject: 'Química',
    grade: '9º Ano',
    tags: ['tabela periódica', 'grupos', 'períodos', 'atividade lúdica'],
    license: 'cc0',
    visibility: 'private',
    allowFork: false,
    allowComments: true,
    author: { id: '1', name: 'Prof. João Silva', avatarUrl: undefined },
    createdAt: '2024-01-22T08:00:00Z',
    updatedAt: '2024-01-22T08:00:00Z',
    forkCount: 0,
    viewCount: 12,
    downloadCount: 3,
    thumbnailUrl: undefined,
    contentHtml: '',
  },
  {
    id: '5',
    title: 'Geometria Plana - Áreas de Polígonos',
    description:
      'Série de exercícios progressivos sobre cálculo de áreas: triângulos, quadriláteros, polígonos regulares e compostos. Com gabarito.',
    subject: 'Matemática',
    grade: '7º Ano',
    tags: ['geometria', 'áreas', 'polígonos', 'triângulos', 'quadriláteros'],
    license: 'cc-by-nc',
    visibility: 'public',
    allowFork: true,
    allowComments: true,
    author: { id: '1', name: 'Prof. João Silva', avatarUrl: undefined },
    createdAt: '2023-12-28T14:20:00Z',
    updatedAt: '2024-01-02T10:10:00Z',
    forkCount: 15,
    viewCount: 2100,
    downloadCount: 567,
    thumbnailUrl: undefined,
    contentHtml: '',
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState<string>('minhas');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);

  const stats = {
    totalActivities: 24,
    totalViews: 15680,
    totalDownloads: 4321,
    totalForks: 127,
    activitiesChange: 12,
    viewsChange: 8,
    downloadsChange: 15,
    forksChange: 23,
  };

  const filteredActivities = mockActivities.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Painel do Professor</h1>
              <p className="text-muted-foreground mt-1">
                Gerencie suas atividades, veja estatísticas e crie novos materiais.
              </p>
            </div>
            <Button asChild className="gap-2">
              <Link href="/editor">
                <Plus className="h-4 w-4" />
                Nova Atividade
              </Link>
            </Button>
          </div>

          <StatsCards stats={stats} />

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg">Minhas Atividades</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/library">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Biblioteca
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs
                value={activeTab}
                onValueChange={(value: string) => setActiveTab(value)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="minhas">Minhas ({mockActivities.length})</TabsTrigger>
                  <TabsTrigger value="publicas">Públicas (18)</TabsTrigger>
                  <TabsTrigger value="rascunhos">Rascunhos (3)</TabsTrigger>
                  <TabsTrigger value="favoritas">Favoritas (7)</TabsTrigger>
                </TabsList>

                <TabsContent value="minhas" className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar nas minhas atividades..."
                      className="flex-1 h-10 px-4 text-sm border rounded-lg bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </div>

                  <ActivityList
                    activities={filteredActivities}
                    onView={(a) => window.open(`/activity/${a.id}`, '_blank')}
                    onEdit={(a) => {
                      window.location.href = `/editor/${a.id}`;
                    }}
                    onDelete={(a) => {
                      if (confirm(`Excluir "${a.title}"?`)) alert('Excluído!');
                    }}
                    onFork={(a) => alert(`Fork de "${a.title}"`)}
                    onDownload={(a) => alert(`Download de "${a.title}"`)}
                    onShare={(a) => alert(`Compartilhar "${a.title}"`)}
                  />
                </TabsContent>

                <TabsContent value="publicas">
                  <ActivityList
                    activities={mockActivities.filter((a) => a.visibility === 'public')}
                    onView={(a) => window.open(`/activity/${a.id}`, '_blank')}
                    onEdit={(a) => {
                      window.location.href = `/editor/${a.id}`;
                    }}
                    onDelete={(a) => {
                      if (confirm(`Excluir "${a.title}"?`)) alert('Excluído!');
                    }}
                    onFork={(a) => alert(`Fork de "${a.title}"`)}
                    onDownload={(a) => alert(`Download de "${a.title}"`)}
                    onShare={(a) => alert(`Compartilhar "${a.title}"`)}
                  />
                </TabsContent>

                <TabsContent value="rascunhos">
                  <ActivityList
                    activities={mockActivities.filter((a) => a.visibility === 'private')}
                    onView={(a) => window.open(`/activity/${a.id}`, '_blank')}
                    onEdit={(a) => {
                      window.location.href = `/editor/${a.id}`;
                    }}
                    onDelete={(a) => {
                      if (confirm(`Excluir "${a.title}"?`)) alert('Excluído!');
                    }}
                    onFork={(a) => alert(`Fork de "${a.title}"`)}
                    onDownload={(a) => alert(`Download de "${a.title}"`)}
                    onShare={(a) => alert(`Compartilhar "${a.title}"`)}
                  />
                </TabsContent>

                <TabsContent value="favoritas">
                  <ActivityList
                    activities={mockActivities.slice(0, 2)}
                    onView={(a) => window.open(`/activity/${a.id}`, '_blank')}
                    onEdit={(a) => {
                      window.location.href = `/editor/${a.id}`;
                    }}
                    onDelete={(a) => {
                      if (confirm(`Excluir "${a.title}"?`)) alert('Excluído!');
                    }}
                    onFork={(a) => alert(`Fork de "${a.title}"`)}
                    onDownload={(a) => alert(`Download de "${a.title}"`)}
                    onShare={(a) => alert(`Compartilhar "${a.title}"`)}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <DefaultQuickActions
            onNewActivity={() => {
              window.location.href = '/editor';
            }}
            onBrowseLibrary={() => {
              window.location.href = '/library';
            }}
            onViewAnalytics={() => {
              window.location.href = '/analytics';
            }}
            onSettings={() => {
              window.location.href = '/settings';
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

import Link from 'next/link';
