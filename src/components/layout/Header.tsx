'use client';
import { motion } from 'framer-motion';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  BarChart2,
  Bell,
  BookOpen,
  LogOut,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  User,
  X,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

interface HeaderProps {
  user?: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  } | null;
  onSignOut?: () => void;
  className?: string;
}

export function Header({ user, onSignOut, className }: HeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const navigation = [
    { href: '/dashboard', label: 'Painel', icon: BookOpen },
    { href: '/library', label: 'Biblioteca', icon: Search },
    { href: '/editor', label: 'Novo Editor', icon: Plus },
    { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className,
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link
            href="/dashboard"
            className="flex items-center gap-2"
            aria-label="ProfeLab - Início"
          >
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl hidden sm:block">ProfeLab</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="h-10 w-10"
                aria-label="Buscar"
              >
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Buscar (Ctrl+K)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-10 w-10"
                aria-label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Tema</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 relative"
                aria-label="Notificações"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-medium flex items-center justify-center">
                  3
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notificações</TooltipContent>
          </Tooltip>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                  aria-label="Menu do usuário"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback name={user.name} />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2 w-full">
                    <User className="h-4 w-4 mr-2" /> Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2 w-full">
                    <Settings className="h-4 w-4 mr-2" /> Configurações
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onSignOut}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Cadastrar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t px-4 py-4 space-y-2">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t flex items-center gap-2">
            {user ? (
              <Button variant="outline" className="flex-1" onClick={onSignOut}>
                <LogOut className="h-4 w-4 mr-2" /> Sair
              </Button>
            ) : (
              <>
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Entrar
                  </Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    Cadastrar
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-background rounded-xl shadow-elevation-4 p-4"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar atividades, autores, tags... (Esc para fechar)"
                className="w-full h-12 pl-12 pr-16 text-lg border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setSearchOpen(false);
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/library?q=${encodeURIComponent(searchQuery)}`;
                    setSearchOpen(false);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-accent"
                aria-label="Fechar busca"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              Pressione <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> para buscar ou{' '}
              <kbd className="px-2 py-1 bg-muted rounded">Esc</kbd> para fechar
            </p>
          </motion.div>
        </div>
      )}
    </header>
  );
}
