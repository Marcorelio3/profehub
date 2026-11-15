'use client';
import { cn } from '@/lib/utils';
import { BookOpen, Github, Globe, Heart, Mail, Scale, Shield, Twitter } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  produto: [
    { label: 'Editor de Atividades', href: '/editor' },
    { label: 'Biblioteca', href: '/library' },
    { label: 'Templates', href: '/templates' },
    { label: 'Preços', href: '/pricing' },
    { label: 'Changelog', href: '/changelog' },
  ],
  empresa: [
    { label: 'Sobre nós', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Carreiras', href: '/careers' },
    { label: 'Imprensa', href: '/press' },
    { label: 'Contato', href: '/contact' },
  ],
  recursos: [
    { label: 'Documentação', href: '/docs' },
    { label: 'API', href: '/api-docs' },
    { label: 'Comunidade', href: '/community' },
    { label: 'Status', href: '/status' },
    { label: 'Ajuda', href: '/help' },
  ],
  legal: [
    { label: 'Termos de Uso', href: '/terms' },
    { label: 'Política de Privacidade', href: '/privacy' },
    { label: 'Política de Cookies', href: '/cookies' },
    { label: 'LGPD', href: '/lgpd' },
    { label: 'Licenças', href: '/licenses' },
  ],
};

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Marcorelio3/profelab', icon: Github },
  { label: 'Twitter', href: 'https://twitter.com/profelab', icon: Twitter },
  { label: 'Email', href: 'mailto:contato@profelab.com', icon: Mail },
];

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn('border-t bg-muted/30', className)}>
      <div className="container py-12 lg:py-16 px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="ProfeLab - Início">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-2xl">ProfeLab</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Plataforma educacional para professores criarem, compartilharem e colaborarem em
              atividades de qualidade profissional.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Links do produto">
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Links da empresa">
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Links de recursos">
            <h3 className="font-semibold mb-4">Recursos</h3>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Links legais">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProfeLab. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-red-500" />
              Feito para professores
            </span>
            <span className="flex items-center gap-1">
              <Scale className="h-4 w-4" />
              Licenças abertas
            </span>
            <span className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              LGPD compliant
            </span>
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              Brasil
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
