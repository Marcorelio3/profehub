# ProfeLab - Plataforma Educacional para Professores

[![CI/CD](https://github.com/Marcorelio3/profelab/actions/workflows/ci.yml/badge.svg)](https://github.com/Marcorelio3/profelab/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

**ProfeLab** é uma plataforma completa para professores criarem, compartilharem e colaborarem em atividades educacionais no formato A4, com controle de direitos autorais via licenças Creative Commons.

## Índice

- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológica](#-stack-tecnológica)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração do Supabase](#-configuração-do-supabase)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Arquitetura](#-arquitetura)
- [Testes](#-testes)
- [CI/CD](#-cicd)
- [Deploy](#-deploy)
- [Licenças Creative Commons](#-licenças-creative-commons)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## Funcionalidades

### Editor de Atividades A4
- **Páginas A4 reais** - Visualização fiel ao papel A4 (210mm x 297mm)
- **Quebra de página automática** - PageBreak inteligente
- **Toolbar completa** - Formatação rica (negrito, itálico, listas, títulos, alinhamento, código, citações)
- **Metadados educacionais** - Disciplina, série, tags, licença CC, visibilidade, fork/comentários
- **Exportação PDF** - Geração de PDF pronto para impressão
- **Auto-save** - Salvamento automático durante edição

### Biblioteca Colaborativa
- **Busca avançada** - Por título, descrição, autor, tags, disciplina
- **Filtros múltiplos** - Disciplina, série, licença, visibilidade, data, fork
- **Visualizações** - Grid (cards) e Lista (compacta)
- **Ordenação** - Recentes, populares, downloads, forks, A-Z
- **Preview modal** - Visualização completa antes de baixar
- **Derivações (Fork)** - Crie versões próprias de atividades públicas
- **Estatísticas** - Views, downloads, forks por atividade

### Dashboard do Professor
- **Estatísticas pessoais** - Total de atividades, visualizações, downloads, forks
- **Lista de atividades** - Gerencie suas criações (editar, publicar, duplicar, excluir)
- **Ações rápidas** - Nova atividade, importar, acessar biblioteca
- **Atividade recente** - Últimas ações na plataforma

### Configurações Completas
- **Perfil público** - Foto, bio, disciplina, série, instituição, localização, site
- **Notificações** - Email e push granulares (atividades, comentários, forks, menções, digest)
- **Privacidade** - Visibilidade do perfil/atividades, mensagens, indexação SEO, email público
- **Aparência** - Tema (claro/escuro/sistema), modo compacto, animações, alto contraste
- **Segurança** - 2FA (preparado), alteração de senha, sessões ativas, encerramento remoto
- **Conta** - Exportação de dados (JSON), exclusão permanente

### Autenticação
- **Email/Senha** - Validação forte, medidor de força, confirmação
- **OAuth** - Google, GitHub (preparado)
- **Recuperação de senha** - Fluxo completo com email
- **Proteção de rotas** - Middleware com redirect automático

---

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| **Framework** | Next.js App Router | 15.x |
| **Linguagem** | TypeScript | 5.x |
| **Runtime** | React | 19 RC |
| **Estilização** | Tailwind CSS | 3.4+ |
| **Componentes UI** | Radix UI Primitives | 1.1+ |
| **Animações** | Framer Motion | 11+ |
| **Editor Rico** | TipTap | 2.6+ |
| **Banco/Backend** | Supabase (PostgreSQL + Auth + Realtime + Storage) | 2.45+ |
| **Validação** | Zod | 3.23+ |
| **Formulários** | React Hook Form + Resolvers | Latest |
| **Temas** | next-themes | Latest |
| **Toasts** | Sonner | 1.5+ |
| **Ícones** | Lucide React | 0.44+ |
| **Utilitários** | clsx, tailwind-merge, class-variance-authority | Latest |

### Qualidade & Testes
| Ferramenta | Finalidade |
|------------|------------|
| **Biome** | Lint + Format (rápido, Rust-based) |
| **TypeScript** | Type checking strict mode |
| **Vitest** | Unit + Integration tests |
| **Playwright** | E2E tests cross-browser |
| **Knip** | Unused code detection |
| **Arch-Contract** | Architecture boundaries enforcement |
| **Stryker** | Mutation testing |
| **Lighthouse CI** | Performance budgets |
| **Husky + Commitlint** | Git hooks + conventional commits |

---

## Pré-requisitos

- **Node.js** ≥ 22.0.0
- **npm** ≥ 10.8.0
- **Conta Supabase** (gratuita em [supabase.com](https://supabase.com))
- **Git** para versionamento

---

## Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/Marcorelio3/profelab.git
cd profelab
```

### 2. Instale dependências
```bash
npm install
```

### 3. Configure variáveis de ambiente
```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais (veja [Variáveis de Ambiente](#-variáveis-de-ambiente)).

### 4. Configure o banco de dados Supabase
```bash
# Opção A: Via Supabase CLI (recomendado para desenvolvimento local)
npx supabase start
npx supabase db reset

# Opção B: Via Dashboard Supabase (produção)
# Execute o SQL em supabase/migrations/001_initial_schema.sql no SQL Editor
```

### 5. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

Acesse: **http://localhost:3000**

---

## Configuração do Supabase

### 1. Crie um projeto no Supabase
1. Acesse [supabase.com](https://supabase.com) e crie uma conta/projeto
2. Anote: **Project URL** e **anon public key**

### 2. Execute as migrações
No **SQL Editor** do Supabase Dashboard, execute o conteúdo de:
```
supabase/migrations/001_initial_schema.sql
```

Isso criará:
- Tabelas: `profiles`, `activities`, `comments`, `likes`, `follows`, `notifications`
- Índices otimizados para busca
- Row Level Security (RLS) policies
- Funções helper (contadores, stats, notificações)
- Triggers `updated_at`
- Publicação Realtime
- Buckets Storage: `avatars`, `thumbnails`, `exports`

### 3. Configure Storage Policies
As policies já estão no SQL, mas verifique no Dashboard > Storage se os buckets foram criados:
- `avatars` (público, 5MB, imagens)
- `thumbnails` (público, 10MB, imagens)
- `exports` (privado, 50MB, PDFs)

### 4. Configure Auth Providers (Opcional)
Em **Authentication > Providers**:
- Habilite **Google** e adicione Client ID/Secret
- Habilite **GitHub** e adicione Client ID/Secret
- Configure **Redirect URLs**: `https://seu-dominio.com/auth/callback`

### 5. Configure Email Templates (Opcional)
Em **Authentication > Email Templates** personalize:
- Confirm signup
- Reset password
- Magic link

---

## Variáveis de Ambiente

Crie `.env.local` na raiz:

```env
# =============================================================================
# SUPABASE (Obrigatório)
# =============================================================================
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui

# =============================================================================
# APP CONFIG
# =============================================================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ProfeLab

# =============================================================================
# OAUTH PROVIDERS (Opcional)
# =============================================================================
GOOGLE_CLIENT_ID=seu-google-client-id
GOOGLE_CLIENT_SECRET=seu-google-client-secret
GITHUB_CLIENT_ID=seu-github-client-id
GITHUB_CLIENT_SECRET=seu-github-client-secret

# =============================================================================
# EMAIL (Opcional - para produção use Resend, SendGrid, etc.)
# =============================================================================
SMTP_HOST=smtp.seuprovedor.com
SMTP_PORT=587
SMTP_USER=seu-usuario
SMTP_PASS=sua-senha
EMAIL_FROM=noreply@seudominio.com

# =============================================================================
# ANALYTICS/MONITORING (Opcional)
# =============================================================================
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SENTRY_DSN=https://xxx@sentry.io/xxx
```

> **⚠️ Segurança:** Nunca commite `.env.local`. O arquivo `.env.example` serve como template.

---

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor dev com Turbopack
npm run dev:debug        # Dev com debug logging

# Build & Produção
npm run build            # Build de produção
npm run start            # Inicia servidor de produção

# Qualidade de Código
npm run lint             # Biome check (strict)
npm run lint:fix         # Biome auto-fix
npm run format           # Formata com Biome
npm run typecheck        # TypeScript strict check

# Testes
npm run test:unit        # Vitest unit + coverage
npm run test:integration # Vitest integration tests
npm run test:e2e         # Playwright E2E
npm run test:e2e:ui      # Playwright com UI
npm run test:mutation    # Stryker mutation testing

# Arquitetura
npm run knip             # Unused code detection
npm run arch             # Arch-Contract boundaries check

# Banco de Dados (Supabase CLI)
npm run db:generate      # Gera types TypeScript do schema
npm run db:push          # Push migrações para Supabase
npm run db:reset         # Reset banco local
npm run db:studio        # Abre Supabase Studio local

# Performance
npm run lighthouse       # Lighthouse CI budgets

# Git
npm run prepare          # Instala Husky hooks
```

---

## Estrutura do Projeto

```
profelab/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Pipeline CI/CD completo
├── .husky/
│   ├── pre-commit                 # Lint + format antes de commit
│   └── commit-msg                 # Valida conventional commits
├── e2e/                           # Playwright E2E tests
│   ├── home.spec.ts
│   └── auth.spec.ts
├── public/                        # Assets estáticos
├── src/
│   ├── actions/                   # Server Actions (mutations)
│   │   ├── activities.ts          # CRUD atividades, fork, stats
│   │   ├── auth.ts                # Sign up/in/out, password, profile
│   │   ├── library.ts             # Comments, likes, tags, subjects
│   │   └── *.integration.test.ts  # Testes de integração
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # Route group: login, register, forgot, reset
│   │   ├── (dashboard)/           # Route group: dashboard, editor, settings
│   │   ├── api/                   # API Routes
│   │   │   ├── activities/        # REST Activities
│   │   │   └── auth/              # Auth callbacks, reset
│   │   ├── auth/callback/         # OAuth callback handler
│   │   ├── dashboard/             # Dashboard page
│   │   ├── editor/                # Editor page
│   │   ├── library/               # Biblioteca page
│   │   ├── settings/              # Settings page
│   │   ├── globals.css            # Estilos globais + design tokens
│   │   ├── layout.tsx             # Root layout + providers
│   │   ├── page.tsx               # Landing page
│   │   └── providers.tsx          # Theme, Toaster, Tooltip providers
│   ├── components/
│   │   ├── ui/                    # 14 componentes base (Button, Input, Card, etc.)
│   │   ├── layout/                # Header, Footer
│   │   ├── editor/                # Editor, Toolbar, Canvas, Sidebar, Extensions
│   │   │   └── extensions/        # A4Page, PageBreak (TipTap nodes)
│   │   ├── library/               # ActivityCard, Grid, Filters, PreviewModal
│   │   └── dashboard/             # ActivityList, StatsCards, QuickActions
│   ├── hooks/
│   │   └── use-toast.ts           # Toast hook (Sonner wrapper)
│   ├── lib/
│   │   ├── supabase/              # Clients (client.ts, server.ts)
│   │   ├── motion/                # Framer Motion tokens & variants
│   │   ├── utils.ts               # cn(), formatDate, formatDateTime
│   │   └── rate-limit.ts          # Rate limiting helpers
│   ├── types/                     # TypeScript definitions
│   └── middleware.ts              # Auth protection middleware
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql # Schema completo com RLS
├── test/
│   ├── setup.ts                   # Vitest unit setup
│   ├── setup-integration.ts       # Vitest integration setup
│   └── utils.tsx                  # Testing Library custom render
├── .env.example                   # Template de variáveis
├── biome.json                     # Biome config (lint + format)
├── knip.config.ts                 # Knip config
├── arch-contract.json             # Architecture boundaries
├── stryker.conf.json              # Stryker mutation config
├── lighthouserc.json              # Lighthouse CI budgets
├── playwright.config.ts           # Playwright config
├── vitest.config.ts               # Vitest unit config
├── vitest.integration.config.ts   # Vitest integration config
├── tailwind.config.ts             # Tailwind + design system
├── tsconfig.json                  # TypeScript strict config
├── next.config.ts                 # Next.js config
├── package.json
└── README.md
```

---

## Arquitetura

### Princípios
- **Server Components First** - Renderização no servidor por padrão
- **Server Actions** - Mutations seguras sem API routes expostas
- **Type Safety** - TypeScript strict em toda a codebase
- **Architecture Boundaries** - Arch-Contract impede acoplamento indevido
- **Design System** - Tokens centralizados (cores, espaçamento, motion)

### Camadas (Arch-Contract)

```
app (pages) → components (ui, layout, editor, library, dashboard)
                    ↓
              hooks, lib/utils
                    ↓
              lib/supabase (client/server)
                    ↓
              actions (server-only)
                    ↓
              database (PostgreSQL + RLS)
```

**Regras de dependência** (enforced by Arch-Contract):
- `ui` → nenhum componente interno
- `layout` → `ui` apenas
- `editor` → `ui`, `lib/utils`, TipTap
- `library` → `ui`, `lib/utils`
- `dashboard` → `ui`, `editor`
- `actions` → `lib/supabase/server` apenas
- `api` → `@supabase/auth-helpers-nextjs` apenas

---

## Testes

### Unitários (Vitest + Testing Library)
```bash
npm run test:unit
```
- Cobertura alvo: **80% statements, 70% branches, 70% functions, 80% lines**
- Localização: `src/**/*.test.{ts,tsx}`
- Setup: `test/setup.ts` (mocks completos: Supabase, Next.js, Radix, TipTap, Framer Motion)

### Integração (Vitest)
```bash
npm run test:integration
```
- Testam Server Actions com Supabase mockado
- Localização: `src/**/*.integration.test.ts`
- Setup: `test/setup-integration.ts`

### E2E (Playwright)
```bash
npm run test:e2e
# ou com UI
npm run test:e2e:ui
```
- Browsers: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Testes: Home page, Login, Register, validações
- Localização: `e2e/*.spec.ts`

### Mutation Testing (Stryker)
```bash
npm run test:mutation
```
- Thresholds: **High 80%, Low 60%, Break 60%**
- Report: `reports/mutation/index.html`

### Arquitetura (Arch-Contract)
```bash
npm run arch
```
- Verifica boundaries entre módulos
- Falha se houver import proibido

### Unused Code (Knip)
```bash
npm run knip
```
- Detecta exports, dependências, arquivos não usados
- Strict mode enabled

---

## CI/CD Pipeline

O workflow `.github/workflows/ci.yml` executa em **PRs e push para main/develop**:

### Stages Paralelos
1. **Lint & TypeCheck** - Biome + TypeScript
2. **Unit & Integration Tests** - Vitest + Coverage → Codecov
3. **Mutation Testing** - Stryker (apenas PRs)
4. **Architecture Contract** - Arch-Contract
5. **Knip** - Unused code check

### Stage Sequencial (depende dos acima)
6. **Build** - Next.js production build

### Stages Pós-Build (paralelos)
7. **E2E Tests** - Playwright multi-browser
8. **Lighthouse CI** - Performance budgets

### Deploy
9. **Preview (Vercel)** - Apenas PRs
10. **Production (Vercel)** - Apenas push para main

### Notificações
- Slack webhook (configurável via `SLACK_WEBHOOK_URL`)

### Status Badges
Adicione ao README:
```markdown
[![CI/CD](https://github.com/Marcorelio3/profelab/actions/workflows/ci.yml/badge.svg)](https://github.com/Marcorelio3/profelab/actions/workflows/ci.yml)
```

---

## Deploy

### Vercel (Recomendado)

1. **Conecte o repositório** no [Vercel Dashboard](https://vercel.com/dashboard)
2. **Configure Environment Variables** (copie de `.env.local`)
3. **Deploy automático**:
   - **Preview**: Toda PR ganha URL única
   - **Production**: Push para `main` faz deploy automático

### Configuração Vercel (`vercel.ts` ou `vercel.json`)
```ts
// vercel.ts
import { routes, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  framework: 'nextjs',
  buildCommand: 'npm run build',
  devCommand: 'npm run dev',
  installCommand: 'npm install',
  regions: ['gru1'], // São Paulo
  functions: {
    'src/app/api/**/*.ts': {
      maxDuration: 30,
    },
  },
  headers: [
    routes.cacheControl('/static/**', { public: true, maxAge: '1 year', immutable: true }),
  ],
  crons: [
    { path: '/api/cron/cleanup', schedule: '0 3 * * *' },
  ],
};
```

### Variáveis de Produção no Vercel
Adicione todas as variáveis de `.env.local` no **Project Settings > Environment Variables**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (ex: `https://profelab.com`)
- OAuth credentials
- Email credentials

### Domínio Personalizado
Em **Settings > Domains**: adicione `profelab.com` e configure DNS.

---

## Licenças Creative Commons

O ProfeLab suporta **6 licenças Creative Commons** + **Todos os Direitos Reservados**:

| Código | Licença | Descrição | Uso Comercial | Derivações | Compartilhar Igual |
|--------|---------|-----------|---------------|------------|-------------------|
| `cc-by` | CC BY 4.0 | Atribuição | ✅ | ✅ | ❌ |
| `cc-by-sa` | CC BY-SA 4.0 | Atribuição + CompartilhaIgual | ✅ | ✅ | ✅ |
| `cc-by-nc` | CC BY-NC 4.0 | Atribuição + NãoComercial | ❌ | ✅ | ❌ |
| `cc-by-nd` | CC BY-ND 4.0 | Atribuição + SemDerivações | ✅ | ❌ | ❌ |
| `cc-by-nc-sa` | CC BY-NC-SA 4.0 | Atribuição + NãoComercial + CompartilhaIgual | ❌ | ✅ | ✅ |
| `cc-by-nc-nd` | CC BY-NC-ND 4.0 | Atribuição + NãoComercial + SemDerivações | ❌ | ❌ | ❌ |
| `cc0` | CC0 1.0 | Domínio Público | ✅ | ✅ | N/A |
| `all-rights` | Todos Reservados | Copyright tradicional | ❌ | ❌ | ❌ |

### Como funciona no Editor
1. Professor seleciona licença no **Sidebar do Editor**
2. Licença salva no banco com a atividade
3. **Biblioteca** mostra badge da licença em cada card
4. **Preview Modal** exibe resumo da licença + link para deed legal
5. **Fork** respeita licença: CC-BY-SA exige mesma licença na derivação

### Badges visuais
```tsx
// Componente LicenseBadge exibe:
// CC BY 4.0  → Verde
// CC BY-SA 4.0 → Azul
// CC BY-NC 4.0 → Laranja
// CC0 → Roxo
// Todos Reservados → Vermelho
```

### Links legais
- [Creative Commons Licenses](https://creativecommons.org/licenses/)
- [CC BY 4.0 Deed](https://creativecommons.org/licenses/by/4.0/deed.pt_BR)
- [CC0 1.0 Deed](https://creativecommons.org/publicdomain/zero/1.0/deed.pt_BR)

---

## Contribuição

### Como contribuir
1. **Fork** o repositório
2. Crie branch: `git checkout -b feat/minha-feature`
3. Commit seguindo [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: adiciona filtro por autor na biblioteca"
   ```
4. Push: `git push origin feat/minha-feature`
5. Abra **Pull Request**

### Padrões obrigatórios
- ✅ **TypeScript strict** - sem `any`, tipos explícitos
- ✅ **Biome formatado** - `npm run lint:fix` antes do commit
- ✅ **Testes** - Novas features precisam testes unit/E2E
- ✅ **Arch-Contract** - Respeite boundaries de arquitetura
- ✅ **Commits convencionais** - `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`

### Code Review Checklist
- [ ] Tipos TypeScript corretos
- [ ] Acessibilidade (ARIA, focus, contraste)
- [ ] Performance (memo, lazy, suspense)
- [ ] Testes passando (`npm run test:unit && npm run test:e2e`)
- [ ] Sem código não utilizado (`npm run knip`)
- [ ] Arquitetura respeitada (`npm run arch`)
- [ ] Documentação atualizada se necessário

### Issues
Use templates em `.github/ISSUE_TEMPLATE/`:
- 🐛 Bug Report
- ✨ Feature Request
- 📚 Documentation
- 🔧 Refactor

---

## Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

```
MIT License

Copyright (c) 2024 ProfeLab Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Licenças de Dependências
Todas as dependências são open source com licenças compatíveis (MIT, Apache-2.0, BSD-3-Clause, ISC). Verifique `npm ls --prod --parseable` para lista completa.

---

## Suporte & Comunidade

- **Issues**: [GitHub Issues](https://github.com/Marcorelio3/profelab/issues)
- **Discussões**: [GitHub Discussions](https://github.com/Marcorelio3/profelab/discussions)
- **Email**: suporte@profelab.com (configure no deploy)

---

## Roadmap

### v1.1 - Colaboração Avançada
- [ ] Comentários em tempo real (Realtime)
- [ ] Co-edição simultânea (Yjs/Automerge)
- [ ] Notificações push nativas (Web Push API)

### v1.2 - IA & Automação
- [ ] Geração de atividades com IA (Vercel AI SDK)
- [ ] Sugestão de tags/disciplina automática
- [ ] Correção ortográfica/gramatical integrada

### v1.3 - Ecossistema
- [ ] Marketplace de templates
- [ ] Integração Google Classroom / Moodle
- [ ] App mobile (React Native/Expo)

### v1.4 - Enterprise
- [ ] Multi-tenancy (escolas/redes)
- [ ] SSO (SAML/OIDC)
- [ ] Auditoria LGPD completa

---

## Créditos

Desenvolvido com ❤️ para a comunidade educacional brasileira.

**Tecnologias que tornaram isso possível:**
- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Supabase](https://supabase.com/) - The Open Source Firebase Alternative
- [TipTap](https://tiptap.dev/) - Headless Editor Framework
- [Radix UI](https://www.radix-ui.com/) - Primitives for React
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [Vercel](https://vercel.com/) - Deployment Platform

---

<div align="center">

**Feito por professores, para professores** 🍎

[⭐ Deixe uma estrela no GitHub](https://github.com/Marcorelio3/profelab) se este projeto te ajudou!

</div>