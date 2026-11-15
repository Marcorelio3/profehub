'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  Filter,
  Search,
  SlidersHorizontal,
  Tag,
  Unlock,
  User,
  X,
} from 'lucide-react';
import * as React from 'react';

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
  { value: 'cc-by', label: 'CC BY' },
  { value: 'cc-by-sa', label: 'CC BY-SA' },
  { value: 'cc-by-nc', label: 'CC BY-NC' },
  { value: 'cc-by-nd', label: 'CC BY-ND' },
  { value: 'cc0', label: 'CC0' },
  { value: 'all-rights', label: 'Todos os direitos' },
];

const sortOptions = [
  { value: 'recent', label: 'Mais recentes' },
  { value: 'popular', label: 'Mais populares' },
  { value: 'downloads', label: 'Mais baixados' },
  { value: 'forks', label: 'Mais derivados' },
  { value: 'az', label: 'A-Z' },
  { value: 'za', label: 'Z-A' },
];

export interface LibraryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  filters: LibraryFiltersState;
  onFiltersChange: (filters: Partial<LibraryFiltersState>) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
  className?: string;
}

export interface LibraryFiltersState {
  subject: string;
  grade: string;
  license: string;
  visibility: 'all' | 'public' | 'unlisted';
  allowFork: boolean;
  sortBy: string;
  dateFrom: string;
  dateTo: string;
}

export function LibraryFilters({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  filters,
  onFiltersChange,
  onClearFilters,
  activeFiltersCount,
  className,
}: LibraryFiltersProps) {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [_showMobileFilters, _setShowMobileFilters] = React.useState(false);

  const handleBadgeKeyDown = (e: React.KeyboardEvent, onClick: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  const hasActiveFilters =
    filters.subject ||
    filters.grade ||
    filters.license ||
    filters.visibility !== 'all' ||
    filters.allowFork ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className={cn('space-y-4', className)}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit(e.currentTarget.value)}
            placeholder="Buscar atividades, autores, tags..."
            className="h-10 w-full pl-10 pr-4 text-sm border rounded-lg bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Buscar atividades"
          />
        </div>
        <Button type="submit" className="whitespace-nowrap">
          <Filter className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </form>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="gap-1"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros avançados
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="gap-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            Limpar filtros ({activeFiltersCount})
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 overflow-hidden"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label htmlFor="subject-filter">Disciplina</Label>
                <Select
                  value={filters.subject}
                  onValueChange={(value) => onFiltersChange({ subject: value })}
                >
                  <SelectTrigger id="subject-filter">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as disciplinas</SelectItem>
                    {subjects.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="grade-filter">Série/Ano</Label>
                <Select
                  value={filters.grade}
                  onValueChange={(value) => onFiltersChange({ grade: value })}
                >
                  <SelectTrigger id="grade-filter">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as séries</SelectItem>
                    {grades.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="license-filter">Licença</Label>
                <Select
                  value={filters.license}
                  onValueChange={(value) => onFiltersChange({ license: value })}
                >
                  <SelectTrigger id="license-filter">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as licenças</SelectItem>
                    {licenses.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="visibility-filter">Visibilidade</Label>
                <Select
                  value={filters.visibility}
                  onValueChange={(value) =>
                    onFiltersChange({ visibility: value as LibraryFiltersState['visibility'] })
                  }
                >
                  <SelectTrigger id="visibility-filter">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <Eye className="h-4 w-4 mr-2" /> Todas
                    </SelectItem>
                    <SelectItem value="public">
                      <Unlock className="h-4 w-4 mr-2" /> Públicas
                    </SelectItem>
                    <SelectItem value="unlisted">
                      <Eye className="h-4 w-4 mr-2" /> Não listadas
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label htmlFor="sort-filter">Ordenar por</Label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => onFiltersChange({ sortBy: value })}
                >
                  <SelectTrigger id="sort-filter">
                    <SelectValue placeholder="Relevância" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date-from">De</Label>
                <Input
                  id="date-from"
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => onFiltersChange({ dateFrom: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="date-to">Até</Label>
                <Input
                  id="date-to"
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => onFiltersChange({ dateTo: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="flex items-end">
                <Label className="flex items-center gap-2 cursor-pointer w-full">
                  <Checkbox
                    checked={filters.allowFork}
                    onCheckedChange={(checked) =>
                      onFiltersChange({ allowFork: checked as boolean })
                    }
                  />
                  <span className="text-sm">Permite derivação (fork)</span>
                </Label>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {filters.subject && (
                  <button
                    type="button"
                    onClick={() => onFiltersChange({ subject: '' })}
                    onKeyDown={(e) => handleBadgeKeyDown(e, () => onFiltersChange({ subject: '' }))}
                    aria-label="Remover filtro de disciplina"
                    className="p-0 bg-transparent border-none"
                  >
                    <Badge variant="outline">
                      <Tag className="h-3 w-3 mr-1" /> {filters.subject}{' '}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  </button>
                )}
                {filters.grade && (
                  <button
                    type="button"
                    onClick={() => onFiltersChange({ grade: '' })}
                    onKeyDown={(e) => handleBadgeKeyDown(e, () => onFiltersChange({ grade: '' }))}
                    aria-label="Remover filtro de série"
                    className="p-0 bg-transparent border-none"
                  >
                    <Badge variant="outline">
                      <User className="h-3 w-3 mr-1" /> {filters.grade}{' '}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  </button>
                )}
                {filters.license && (
                  <button
                    type="button"
                    onClick={() => onFiltersChange({ license: '' })}
                    onKeyDown={(e) => handleBadgeKeyDown(e, () => onFiltersChange({ license: '' }))}
                    aria-label="Remover filtro de licença"
                    className="p-0 bg-transparent border-none"
                  >
                    <Badge variant="outline">
                      <Tag className="h-3 w-3 mr-1" /> {filters.license}{' '}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  </button>
                )}
                {filters.visibility !== 'all' && (
                  <button
                    type="button"
                    onClick={() => onFiltersChange({ visibility: 'all' })}
                    onKeyDown={(e) =>
                      handleBadgeKeyDown(e, () => onFiltersChange({ visibility: 'all' }))
                    }
                    aria-label="Remover filtro de visibilidade"
                    className="p-0 bg-transparent border-none"
                  >
                    <Badge variant="outline">
                      {filters.visibility === 'public' ? (
                        <Unlock className="h-3 w-3 mr-1" />
                      ) : (
                        <Eye className="h-3 w-3 mr-1" />
                      )}
                      {filters.visibility} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  </button>
                )}
                {filters.allowFork && (
                  <button
                    type="button"
                    onClick={() => onFiltersChange({ allowFork: false })}
                    onKeyDown={(e) =>
                      handleBadgeKeyDown(e, () => onFiltersChange({ allowFork: false }))
                    }
                    aria-label="Remover filtro de fork"
                    className="p-0 bg-transparent border-none"
                  >
                    <Badge variant="outline">
                      <Filter className="h-3 w-3 mr-1" /> Fork permitido{' '}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  </button>
                )}
                {filters.dateFrom && (
                  <button
                    type="button"
                    onClick={() => onFiltersChange({ dateFrom: '' })}
                    onKeyDown={(e) =>
                      handleBadgeKeyDown(e, () => onFiltersChange({ dateFrom: '' }))
                    }
                    aria-label="Remover filtro de data inicial"
                    className="p-0 bg-transparent border-none"
                  >
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" /> De {filters.dateFrom}{' '}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  </button>
                )}
                {filters.dateTo && (
                  <button
                    type="button"
                    onClick={() => onFiltersChange({ dateTo: '' })}
                    onKeyDown={(e) => handleBadgeKeyDown(e, () => onFiltersChange({ dateTo: '' }))}
                    aria-label="Remover filtro de data final"
                    className="p-0 bg-transparent border-none"
                  >
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" /> Até {filters.dateTo}{' '}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
