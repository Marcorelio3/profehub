'use client';

import { Header } from '@/components/layout';
import { ActivityGrid } from '@/components/library';
import { LibraryFilters } from '@/components/library';
import { PreviewModal } from '@/components/library';
import type { Activity, LibraryFiltersState } from '@/components/library';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BookOpen, Eye, Plus } from 'lucide-react';
import * as React from 'react';

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Equações do 2º Grau - Lista de Exercícios Completa',
    description:
      'Lista completa com 20 exercícios resolvidos passo a passo sobre equações quadráticas, incluindo discriminante, raízes reais e complexas, vértice da parábola e gráfico. Inclui gabarito detalhado.',
    subject: 'Matemática',
    grade: '9º Ano',
    tags: ['equações', 'função quadrática', 'exercícios', 'ENEM', 'vestibular'],
    license: 'cc-by-nc',
    visibility: 'public',
    allowFork: true,
    allowComments: true,
    author: { id: '2', name: 'Prof. Maria Santos', avatarUrl: undefined },
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-25T14:22:00Z',
    forkCount: 45,
    viewCount: 5240,
    downloadCount: 1356,
    thumbnailUrl: undefined,
    contentHtml:
      '<div data-a4-page=""><h1>Equações do 2º Grau</h1><p>Lista de exercícios...</p></div>',
  },
  {
    id: '2',
    title: 'Análise Sintática - Orações Subordinadas',
    description:
      'Material didático completo com teoria e exercícios sobre orações subordinadas adjetivas, adverbiais e substantivas. Inclui gabarito comentado e dicas para vestibular.',
    subject: 'Português',
    grade: '2º Série EM',
    tags: ['sintaxe', 'orações subordinadas', 'gramática', 'vestibular', 'ENEM'],
    license: 'cc-by',
    visibility: 'public',
    allowFork: true,
    allowComments: true,
    author: { id: '3', name: 'Prof. Carlos Oliveira', avatarUrl: undefined },
    createdAt: '2024-01-18T09:15:00Z',
    updatedAt: '2024-01-18T09:15:00Z',
    forkCount: 32,
    viewCount: 3890,
    downloadCount: 934,
    thumbnailUrl: undefined,
    contentHtml:
      '<div data-a4-page=""><h1>Análise Sintática</h1><p>Teoria e exercícios...</p></div>',
  },
  {
    id: '3',
    title: 'Revolução Industrial - Mapa Conceitual Interativo',
    description:
      'Mapa conceitual detalhado sobre a Revolução Industrial: causas, fases (Inglaterra, Europa, EUA), consequências sociais, econômicas e ambientais. Pronto para uso em sala de aula.',
    subject: 'História',
    grade: '8º Ano',
    tags: [
      'revolução industrial',
      'mapa conceitual',
      'século XVIII',
      'transformações sociais',
      'capitalismo',
    ],
    license: 'cc-by-sa',
    visibility: 'public',
    allowFork: true,
    allowComments: false,
    author: { id: '4', name: 'Prof. Ana Costa', avatarUrl: undefined },
    createdAt: '2024-01-15T16:45:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
    forkCount: 28,
    viewCount: 2445,
    downloadCount: 678,
    thumbnailUrl: undefined,
    contentHtml:
      '<div data-a4-page=""><h1>Revolução Industrial</h1><p>Mapa conceitual...</p></div>',
  },
  {
    id: '4',
    title: 'Tabela Periódica - Atividade de Colorir e Memorizar',
    description:
      'Atividade lúdica e educativa para memorização dos grupos, períodos, famílias e propriedades periódicas da tabela periódica. Indicada para introdução ao tema no 9º ano do Ensino Fundamental.',
    subject: 'Química',
    grade: '9º Ano',
    tags: ['tabela periódica', 'grupos', 'períodos', 'atividade lúdica', 'propriedades periódicas'],
    license: 'cc0',
    visibility: 'public',
    allowFork: true,
    allowComments: true,
    author: { id: '5', name: 'Prof. Roberto Lima', avatarUrl: undefined },
    createdAt: '2024-01-22T08:00:00Z',
    updatedAt: '2024-01-22T08:00:00Z',
    forkCount: 15,
    viewCount: 1120,
    downloadCount: 423,
    thumbnailUrl: undefined,
    contentHtml:
      '<div data-a4-page=""><h1>Tabela Periódica</h1><p>Atividade de colorir...</p></div>',
  },
  {
    id: '5',
    title: 'Geometria Plana - Áreas de Polígonos',
    description:
      'Série de exercícios progressivos sobre cálculo de áreas: triângulos (fórmula de Heron), quadriláteros, polígonos regulares e figuras compostas. Com gabarito passo a passo.',
    subject: 'Matemática',
    grade: '7º Ano',
    tags: ['geometria', 'áreas', 'polígonos', 'triângulos', 'quadriláteros', 'fórmula de Heron'],
    license: 'cc-by-nc',
    visibility: 'public',
    allowFork: true,
    allowComments: true,
    author: { id: '6', name: 'Prof. Patricia Alves', avatarUrl: undefined },
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-15T10:10:00Z',
    forkCount: 38,
    viewCount: 4100,
    downloadCount: 1567,
    thumbnailUrl: undefined,
    contentHtml: '<div data-a4-page=""><h1>Geometria Plana</h1><p>Exercícios de áreas...</p></div>',
  },
  {
    id: '6',
    title: 'Célula Animal e Vegetal - Atividade de Rotulação',
    description:
      'Atividade prática para identificação e rotulação das organelas da célula animal e vegetal. Inclui descrição das funções de cada organela e questões de fixação.',
    subject: 'Biologia',
    grade: '7º Ano',
    tags: ['célula', 'organelas', 'citologia', 'rotulação', 'célula animal', 'célula vegetal'],
    license: 'cc-by',
    visibility: 'public',
    allowFork: true,
    allowComments: true,
    author: { id: '7', name: 'Prof. Fernanda Rocha', avatarUrl: undefined },
    createdAt: '2024-01-08T11:00:00Z',
    updatedAt: '2024-01-08T11:00:00Z',
    forkCount: 22,
    viewCount: 2780,
    downloadCount: 834,
    thumbnailUrl: undefined,
    contentHtml:
      '<div data-a4-page=""><h1>Célula Animal e Vegetal</h1><p>Atividade de rotulação...</p></div>',
  },
  {
    id: '7',
    title: 'Lei de Ohm e Circuitos Elétricos - Problemas Resolvidos',
    description:
      'Coleção de 15 problemas resolvidos sobre Lei de Ohm, potência elétrica, associação de resistores (série e paralelo) e circuitos mistos. Nível Ensino Médio.',
    subject: 'Física',
    grade: '2º Série EM',
    tags: ['eletricidade', 'Lei de Ohm', 'circuitos', 'resistores', 'potência elétrica', 'ENEM'],
    license: 'cc-by-nc',
    visibility: 'public',
    allowFork: true,
    allowComments: true,
    author: { id: '8', name: 'Prof. Marcos Ferreira', avatarUrl: undefined },
    createdAt: '2024-01-05T13:30:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    forkCount: 18,
    viewCount: 1950,
    downloadCount: 567,
    thumbnailUrl: undefined,
    contentHtml: '<div data-a4-page=""><h1>Lei de Ohm</h1><p>Problemas resolvidos...</p></div>',
  },
  {
    id: '8',
    title: 'Mapa do Brasil - Regiões, Estados e Capitais',
    description:
      'Atividade completa de geografia do Brasil: mapa político para colorir, tabela de regiões/estados/capitais, questões sobre características regionais e desafios atuais.',
    subject: 'Geografia',
    grade: '6º Ano',
    tags: ['Brasil', 'regiões', 'estados', 'capitais', 'mapa político', 'geografia brasileira'],
    license: 'cc-by-sa',
    visibility: 'public',
    allowFork: true,
    allowComments: true,
    author: { id: '9', name: 'Prof. Juliana Mendes', avatarUrl: undefined },
    createdAt: '2024-01-03T10:00:00Z',
    updatedAt: '2024-01-03T10:00:00Z',
    forkCount: 31,
    viewCount: 3560,
    downloadCount: 1234,
    thumbnailUrl: undefined,
    contentHtml:
      '<div data-a4-page=""><h1>Mapa do Brasil</h1><p>Atividade de geografia...</p></div>',
  },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = React.useState<string>('todas');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filters, setFilters] = React.useState<LibraryFiltersState>({
    subject: '',
    grade: '',
    license: '',
    visibility: 'all',
    allowFork: false,
    sortBy: 'recent',
    dateFrom: '',
    dateTo: '',
  });
  const [selectedActivity, setSelectedActivity] = React.useState<Activity | null>(null);

  const filteredActivities = React.useMemo(() => {
    let result = [...mockActivities];

    if (searchQuery) {
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          a.author.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (filters.subject) {
      result = result.filter((a) => a.subject === filters.subject);
    }
    if (filters.grade) {
      result = result.filter((a) => a.grade === filters.grade);
    }
    if (filters.license) {
      result = result.filter((a) => a.license === filters.license);
    }
    if (filters.visibility !== 'all') {
      result = result.filter((a) => a.visibility === filters.visibility);
    }
    if (filters.allowFork) {
      result = result.filter((a) => a.allowFork);
    }
    if (filters.dateFrom) {
      result = result.filter((a) => a.createdAt >= filters.dateFrom);
    }
    if (filters.dateTo) {
      result = result.filter((a) => a.createdAt <= filters.dateTo);
    }

    switch (filters.sortBy) {
      case 'popular':
        result.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 'downloads':
        result.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      case 'forks':
        result.sort((a, b) => b.forkCount - a.forkCount);
        break;
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [searchQuery, filters]);

  const activeFiltersCount = React.useMemo(() => {
    let count = 0;
    if (filters.subject) count++;
    if (filters.grade) count++;
    if (filters.license) count++;
    if (filters.visibility !== 'all') count++;
    if (filters.allowFork) count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    return count;
  }, [filters]);

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters: Partial<LibraryFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      subject: '',
      grade: '',
      license: '',
      visibility: 'all',
      allowFork: false,
      sortBy: 'recent',
      dateFrom: '',
      dateTo: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-6 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Biblioteca de Atividades</h1>
                <p className="text-muted-foreground mt-1">
                  Descubra, use e colabore em milhares de atividades criadas por professores.
                </p>
              </div>
              <Button className="gap-2">
                <Link href="/editor">
                  <Plus className="h-4 w-4" />
                  Criar Atividade
                </Link>
              </Button>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={(value: string) => setActiveTab(value)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="todas">Todas ({mockActivities.length})</TabsTrigger>
                <TabsTrigger value="populares">Populares</TabsTrigger>
                <TabsTrigger value="recentes">Recentés</TabsTrigger>
                <TabsTrigger value="minhas">Minhas</TabsTrigger>
              </TabsList>

              <TabsContent value="todas">
                <div className="flex flex-col lg:flex-row gap-6">
                  <aside className="lg:w-72 flex-shrink-0 hidden lg:block">
                    <LibraryFilters
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      onSearchSubmit={handleSearchSubmit}
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                      onClearFilters={handleClearFilters}
                      activeFiltersCount={activeFiltersCount}
                    />
                  </aside>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted-foreground">
                        {filteredActivities.length} atividade
                        {filteredActivities.length !== 1 ? 's' : ''} encontrada
                        {filteredActivities.length !== 1 ? 's' : ''}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={viewMode === 'grid' ? 'default' : 'outline'}
                          size="icon"
                          onClick={() => setViewMode('grid')}
                          aria-label="Visualização em grade"
                        >
                          <BookOpen className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={viewMode === 'list' ? 'default' : 'outline'}
                          size="icon"
                          onClick={() => setViewMode('list')}
                          aria-label="Visualização em lista"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <ActivityGrid
                      activities={filteredActivities}
                      variant={viewMode}
                      onView={(a) => setSelectedActivity(a)}
                      onFork={(a) => alert(`Fork de "${a.title}"`)}
                      onDownload={(a) => alert(`Download de "${a.title}"`)}
                      onShare={(a) => alert(`Compartilhar "${a.title}"`)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="populares">
                <ActivityGrid
                  activities={[...mockActivities]
                    .sort((a, b) => b.viewCount - a.viewCount)
                    .slice(0, 12)}
                  variant={viewMode}
                  onView={(a) => setSelectedActivity(a)}
                  onFork={(a) => alert(`Fork de "${a.title}"`)}
                  onDownload={(a) => alert(`Download de "${a.title}"`)}
                  onShare={(a) => alert(`Compartilhar "${a.title}"`)}
                />
              </TabsContent>

              <TabsContent value="recentes">
                <ActivityGrid
                  activities={[...mockActivities]
                    .sort(
                      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                    )
                    .slice(0, 12)}
                  variant={viewMode}
                  onView={(a) => setSelectedActivity(a)}
                  onFork={(a) => alert(`Fork de "${a.title}"`)}
                  onDownload={(a) => alert(`Download de "${a.title}"`)}
                  onShare={(a) => alert(`Compartilhar "${a.title}"`)}
                />
              </TabsContent>

              <TabsContent value="minhas">
                <div className="text-center py-16">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Você não tem atividades publicadas</h3>
                  <p className="text-muted-foreground mb-4">
                    Comece criando sua primeira atividade para aparecer aqui.
                  </p>
                  <Button className="gap-2">
                    <Link href="/editor">
                      <Plus className="h-4 w-4" />
                      Criar Atividade
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <PreviewModal
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onDownload={(a) => alert(`Download de "${a.title}"`)}
        onFork={(a) => alert(`Fork de "${a.title}"`)}
        onShare={(a) => alert(`Compartilhar "${a.title}"`)}
        onViewFull={(a) => {
          setSelectedActivity(null);
          alert(`Ver completa: ${a.title}`);
        }}
      />
    </div>
  );
}

import Link from 'next/link';
