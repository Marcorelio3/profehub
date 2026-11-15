import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Award,
  BookOpen,
  FileText,
  GitFork,
  Globe,
  Search,
  Share2,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: FileText,
    title: 'Editor A4 Profissional',
    description:
      'Crie atividades com formatação ABNT, páginas A4 reais, quebras de página e exportação PDF de alta qualidade.',
  },
  {
    icon: Share2,
    title: 'Biblioteca Colaborativa',
    description:
      'Compartilhe suas atividades, descubra materiais de outros professores e crie derivações (forks) com atribuição automática.',
  },
  {
    icon: GitFork,
    title: 'Controle de Direitos Autorais',
    description:
      'Licenças Creative Commons integradas (CC BY, CC BY-SA, CC BY-NC, CC BY-ND, CC0) e todos os direitos reservados.',
  },
  {
    icon: Sparkles,
    title: 'Interface Moderna',
    description:
      'Design system consistente, animações suaves, modo escuro, acessibilidade WCAG 2.1 e performance 60fps.',
  },
];

const stats = [
  { value: '10.000+', label: 'Atividades criadas' },
  { value: '5.000+', label: 'Professores ativos' },
  { value: '50.000+', label: 'Downloads mensais' },
  { value: '99.9%', label: 'Uptime garantido' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Novo: Editor A4 com colaboração em tempo real
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Plataforma Educacional <span className="text-primary">para Professores</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Crie, compartilhe e colabore em atividades educacionais de qualidade profissional.
              Editor A4 nativo, biblioteca colaborativa e controle total de direitos autorais.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" asChild className="gap-2">
                <Link href="/editor">
                  Começar Grátis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <Link href="/library">
                  Explorar Biblioteca
                  <Search className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Tudo o que você precisa para criar atividades incríveis
            </h2>
            <p className="text-lg text-muted-foreground">
              Ferramentas profissionais pensadas para a realidade do professor brasileiro.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, _index) => (
              <Card key={feature.title} className="h-full transition-all hover:shadow-elevation-3">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Por que professores escolhem o ProfeLab?
            </h2>
            <p className="text-lg text-muted-foreground">
              Construído com foco na experiência do educador brasileiro.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: 'LGPD Compliant',
                desc: 'Dados protegidos conforme lei brasileira. Consentimento granular e direito ao esquecimento.',
              },
              {
                icon: Globe,
                title: 'Feito para o Brasil',
                desc: 'Interface em português, formatação ABNT, calendário escolar brasileiro.',
              },
              {
                icon: Award,
                title: 'Qualidade Profissional',
                desc: 'Design system sênior, animações 60fps, acessibilidade WCAG 2.1 AA.',
              },
              {
                icon: Users,
                title: 'Comunidade Ativa',
                desc: 'Milhares de professores compartilhando e colaborando diariamente.',
              },
              {
                icon: BookOpen,
                title: 'Open Source',
                desc: 'Código aberto, transparente e auditável. Contribuições bem-vindas.',
              },
              {
                icon: Sparkles,
                title: 'Sempre Evoluindo',
                desc: 'Atualizações frequentes baseadas no feedback da comunidade.',
              },
            ].map((item, _index) => (
              <Card
                key={item.title}
                className="text-center p-6 transition-all hover:shadow-elevation-2"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Pronto para transformar suas aulas?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de professores que já criam atividades profissionais no ProfeLab.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="gap-2">
              <Link href="/register">
                Criar Conta Grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="gap-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/editor">
                Testar Editor
                <FileText className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
