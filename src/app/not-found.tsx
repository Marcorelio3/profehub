'use client';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-9xl font-bold text-primary/20">404</h1>
      <h2 className="text-3xl font-bold tracking-tight">Página não encontrada</h2>
      <p className="text-muted-foreground max-w-md">
        Desculpe, não conseguimos encontrar a página que você procura. Ela pode ter sido movida ou
        não existir.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={() => {
            window.location.href = '/dashboard';
          }}
        >
          <Home className="mr-2 h-4 w-4" /> Voltar ao Painel
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            window.location.reload();
          }}
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Tentar Novamente
        </Button>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Página não encontrada',
};
