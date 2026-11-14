# Guia de Contribuição - ProfeHub

## Padrão Obrigatório de Issues e Pull Requests

Este documento define o fluxo de trabalho obrigatório para todas as contribuições neste repositório. **Qualquer agente, de qualquer modelo, deve seguir este padrão antes de implementar novas mudanças.**

---

## 1. Issues - Classificação Obrigatória

Toda tarefa **DEVE** ter uma Issue criada no GitHub **antes** de qualquer implementação. A Issue deve ser classificada com **exatamente um** dos seguintes labels:

| Label | Quando usar | Prefixo no título |
|-------|-------------|-------------------|
| `bug` / `correção` | Correção de comportamento incorreto, erro, regressão | `[Correção]` |
| `enhancement` / `melhoria` | Melhoria em funcionalidade existente (performance, UX, código) | `[Melhoria]` |
| `feature` / `nova-funcao` | Nova funcionalidade, nova tela, nova API, novo componente | `[Nova função]` |

### Template de Issue

```markdown
## Contexto
Descreva o problema, oportunidade ou necessidade.

## Solução Proposta
Descreva brevemente o que será implementado.

## Critérios de Aceite
- [ ] Critério 1 mensurável
- [ ] Critério 2 mensurável
- [ ] Critério 3 mensurável

## Riscos / Limitações Conhecidos
- Risco 1
- Limitação 1

## Referências
- Link para design, doc, discussão anterior
```

---

## 2. Pull Requests - Padrão Obrigatório

**Todo PR DEVE:**
1. Ser aberto a partir de uma branch `feat/`, `fix/`, `chore/`, `refactor/` referenciando a Issue (`#123`)
2. Ter a Issue relacionada mencionada na descrição (`Closes #123` ou `Related to #123`)
3. Seguir o template abaixo na descrição

### Template de PR Description

```markdown
## Issue Relacionada
Closes #XXX

## O que mudou
- Descrição clara e concisa das mudanças
- Lista de arquivos principais alterados
- Decisões de arquitetura relevantes

## Como foi validado
- [ ] Testes unitários passam (`npm test`)
- [ ] Testes de integração passam
- [ ] Build de produção成功 (`npm run build`)
- [ ] Lint/Typecheck passam (`npm run lint && npm run typecheck`)
- [ ] Testado manualmente: descreva o fluxo testado
- [ ] Capturas de tela / vídeo (se UI)

## Riscos e Limitações
- **Risco 1**: Descrição e mitigação
- **Limitação 1**: O que NÃO está coberto
- **Dívida técnica**: O que ficou para depois (com Issue criada)

## Próximos Passos
- [ ] Passo 1 (com Issue #XXX criada)
- [ ] Passo 2 (com Issue #XXX criada)

## Checklist de Qualidade
- [ ] Código segue padrões do projeto (ESLint, Prettier)
- [ ] Tipos TypeScript strict (sem `any` desnecessário)
- [ ] **Design System (OBRIGATÓRIO - ver seção 7):**
  - [ ] Nenhum spinner nu - loading usa skeleton contextual
  - [ ] Nenhuma transição brusca - tudo tem motion variant
  - [ ] Nenhum estado vazio genérico - empty states com ilustração + ação
  - [ ] Nenhum feedback faltando - toda ação tem toast/visual response
  - [ ] Focus visível - Tab navigation clara
  - [ ] Reduced motion respeitado - `@media (prefers-reduced-motion: reduce)`
  - [ ] Performance 60fps - will-change, transform/opacity only
  - [ ] Consistência - mesmos tokens duração/easing
  - [ ] Mobile - touch feedback, drawer animations
  - [ ] ARIA live regions - toasts/status
- [ ] Acessibilidade verificada (contraste 4.5:1, foco, ARIA)
- [ ] Performance considerada (bundle size, queries, Lighthouse > 90)
- [ ] Documentação atualizada (README, comentários, types)
- [ ] Segurança: validação de entrada, RLS, sanitização
```

---

## 3. Branching Strategy

```
main (protegida, deploy automático)
  │
  ├── feat/nova-funcionalidade-#123  (features)
  ├── fix/correcao-bug-#456          (bug fixes)
  ├── chore/atualizacao-deps-#789    (manutenção)
  └── refactor/melhoria-codigo-#101  (refatoração)
```

- **NUNCA** commit direto na `main`
- Branch name: `<tipo>/<descrição curta>-#<issue-number>`
- Commits: mensagens claras, imperativo, referência à issue se aplicável

---

## 4. CI/CD - Gates Obrigatórios (Quality Pipeline Completa - Issue #25)

**Esteira de qualidade obrigatória definida em `QUALITY_PIPELINE.md` (Issue #25).**

### Jobs Obrigatórios (Bloqueiam Merge)
| Job | Ferramenta | Threshold | Tempo Máx |
|-----|------------|-----------|-----------|
| **Lint** | Biome (ESLint+Prettier) | 0 errors | 2 min |
| **TypeCheck** | TypeScript strict | 0 errors | 3 min |
| **Unused Code** | Knip | 0 unused exports | 1 min |
| **Architecture** | Arch-Contract | 0 violations | 1 min |
| **Commit Messages** | Commitlint | Conventional Commits | 30s |
| **Unit Tests** | Vitest | Coverage ≥ 80% lines | 5 min |
| **Integration Tests** | Vitest + MSW | Coverage ≥ 70% | 5 min |
| **E2E Tests** | Playwright | 5 critical paths pass | 10 min |
| **Security Audit** | npm audit + gitleaks | 0 high/critical | 2 min |
| **Dependency Review** | GitHub Action | 0 high | 1 min |
| **Build** | Next.js Production | Success | 5 min |
| **Performance** | Lighthouse CI | Budget met | 3 min |

**Total CI alvo**: < 15 min (com cache otimizado)

### Quality Gates - Merge Bloqueado Se:
- ❌ Qualquer job falhar
- ❌ Coverage cair > 1% vs base branch
- ❌ Lighthouse budget violado (JS > 150KB, LCP > 2.5s, CLS > 0.1)
- ❌ Commit messages inválidos
- ❌ Arquitetura violada (circular deps, layer boundaries)
- ❌ Código não utilizado detectado (Knip)

**Merge só permitido com:** Todos checks verdes + 1 aprovação (exceto dependabot)

### Nightly (Não Bloqueia PR)
- **Mutation Testing** (Stryker): Score > 70% (critical > 85%)
- **Dependency Updates**: Dependabot auto-merge patch/minor

---

## 5. Deploy Strategy

| Environment | Trigger | Branch |
|-------------|---------|--------|
| Preview (Vercel) | Push para qualquer branch | `feat/*`, `fix/*`, etc. |
| Staging | Merge para `main` (manual) | `main` |
| Production | Tag `v*` ou promote staging | `main` + tag |

---

## 7. Design System - Quality Gate Obrigatório (UI/UX)

**Toda interface DEVE seguir a especificação em `DESIGN_SYSTEM.md` (Issue #24).**

### Requisitos Não-Negociáveis
| Requisito | Implementação | Validação |
|-----------|---------------|-----------|
| **Lazy Loading** | `next/image` lazy + blur; `dynamic()` import para componentes pesados | Lighthouse Performance > 90 |
| **Skeleton Screens** | Obrigatório em todo loading assíncrono (nunca spinner nu) | Visual review + checklist PR |
| **Animações Entrada/Saída** | Framer Motion variants padronizados (page, card, modal, drawer, toast, listItem) | 200-400ms easeOut/In |
| **Estados Progresso** | Todo elemento interativo: idle, hover, active, loading, disabled, error | Visual review |
| **Feedback Visual** | Toasts (top-right, stack 3), ripple/scale click, badges status | Manual test |
| **Transições Consistentes** | AnimatePresence + variants em: páginas, modais, sidebar, cards, listas, tabs | Visual regression |

### Checklist de Revisão Sênior (Bloqueia Merge)
Antes de aprovar PR com mudanças de UI, o reviewer **DEVE** confirmar:
- [ ] Zero spinners nus encontrados
- [ ] Zero transições bruscas (pulo, corte, flash)
- [ ] Zero empty states genéricos ("Nenhum resultado", "Carregando...")
- [ ] Zero ações sem feedback (click, submit, delete, copy, download)
- [ ] Focus ring visível em 100% elementos interativos (Tab test)
- [ ] `prefers-reduced-motion` desabilita animações (teste DevTools)
- [ ] 60fps sustentado em animações (Performance tab DevTools)
- [ ] Tokens de motion consistentes (mesma duração/easing)
- [ ] Mobile: active states, touch targets 44x44px, drawer smooth
- [ ] ARIA live: `polite` para status, `assertive` para erros

### Tokens de Motion (Fonte da Verdade)
```typescript
// lib/motion/tokens.ts
export const motionTokens = {
  duration: { fast: 150, base: 250, slow: 400, page: 400 },
  easing: { easeOut: 'easeOut', easeIn: 'easeIn', spring: { stiffness: 300, damping: 30 } },
  stagger: { base: 50 },
  reduced: { duration: 100, easing: 'linear' },
} as const
```

**Qualquer desvio requer Issue `[Melhoria]` com justificativa e aprovação de 2 reviewers.**

---

## 8. Ferramentas de Qualidade (Stack Obrigatório)

| Categoria | Ferramenta | Versão | Config |
|-----------|------------|--------|--------|
| **Lint/Format** | Biome | 1.8+ | `biome.json` (strict, a11y rules) |
| **Type Check** | TypeScript | 5.5+ | `tsconfig.json` (strict, noUncheckedIndexedAccess) |
| **Commit Lint** | Commitlint | 19+ | `@commitlint/config-conventional` |
| **Git Hooks** | Husky | 9+ | `pre-commit`, `commit-msg`, `pre-push` |
| **Unused Code** | Knip | 5+ | `knip.json` (strict) |
| **Architecture** | Arch-Contract | 0.5+ | `.arch-contract.yml` (layer boundaries) |
| **Unit/Integration** | Vitest | 2+ | `vitest.config.ts` (v8 coverage) |
| **E2E** | Playwright | 1.45+ | `playwright.config.ts` (chromium, mobile) |
| **Mutation** | Stryker | 8+ | `stryker.conf.json` (threshold 70%) |
| **Coverage** | Codecov | - | Flags: unit, integration, e2e |
| **Error Tracking** | Sentry | 8+ | `@sentry/nextjs` (replay 10%, profiling) |
| **Analytics** | Vercel Analytics | - | `@vercel/analytics`, `@vercel/speed-insights` |
| **Rate Limit** | Upstash Redis | - | `@upstash/ratelimit` (Vercel KV) |
| **Security** | Gitleaks | 8+ | Pre-commit + CI |
| **Performance** | Lighthouse CI | 12+ | `lighthouserc.json` (budget enforcement) |

**Regra**: Zero config manual. Tudo versionado. Novas ferramentas = Issue `[Nova função]` + PR + docs.

---

## 9. Princípios de Arquitetura (Não-Negociáveis)

### 9.1 Anti-Overengineering
| Princípio | Regra Prática |
|-----------|---------------|
| **YAGNI** | Não criar abstração até 3º uso real (Rule of 3) |
| **Flat > Nested** | Max 3 níveis de pasta por feature |
| **No Premature Abstraction** | `lib/utils/` = helpers puros apenas, não business logic |
| **Concrete > Generic** | `formatDate()` > `format<T>(value, formatter)` |

### 9.2 Anti-Bottlenecks
| Risco | Mitigação Obrigatória |
|-------|----------------------|
| **God Component** | Split: `<Editor>` → `<Toolbar>`, `<Sidebar>`, `<Canvas>`, `<Status>` |
| **Monolithic Action** | Granular: `createActivity`, `updateContent`, `publish`, `fork` |
| **N+1 Queries** | `select()` com joins, `placeholderData`, query otimizada |
| **Bundle Bloat** | Dynamic imports: Editor, PDF, Charts, AI (code-split por rota/feature) |
| **Realtime Storm** | Throttle presence 100ms, debounce cursors, limit broadcast |

### 9.3 Componentização Desde Início
```
components/
├── ui/              # Primitivas (Button, Input, Card, Modal, Toast, Skeleton, Avatar, Badge, Dropdown, Tabs, Tooltip)
├── editor/          # Feature: TipTapEditor, Toolbar, Sidebar, Canvas, Extensions
├── library/         # Feature: ActivityCard, Grid, Filters, PreviewModal
├── dashboard/       # Feature: ActivityList, StatsCards, QuickActions
├── collaboration/   # Feature: ShareDialog, PresenceAvatars, CommentThread
├── auth/            # Feature: LoginForm, RegisterForm, OAuthButtons
└── layout/          # Feature: Header, Sidebar, Footer, ThemeToggle
```
**Cada feature**: `components/`, `hooks/`, `actions/`, `types/`, `index.ts` (barrel export)

### 9.4 DRY com Critério
| ✅ Extrair (Shared Kernel) | ❌ Não Extrair (Prematuro) |
|----------------------------|----------------------------|
| `cn()` classnames helper | Wrapper `BaseComponent` genérico |
| `formatDate()`, `formatNumber()` | Hook `useActivity()` genérico |
| `validateEmail()`, `slugify()` | HOC `withAuth()` para tudo |
| Zod schemas compartilhados | Context provider para 1 componente |

### 9.5 Impedir Reconstrução (Component Registry)
- **Storybook** obrigatório para `components/ui/`
- **Antes de criar**: Buscar no Storybook / `@/components/ui`
- **Regra**: Se existe `Button`, `Card`, `Modal`, `Input`, `Toast`, `Skeleton`, `Avatar`, `Badge`, `Dropdown`, `Tabs`, `Tooltip` → **USE**, não recrie
- **CI Check futuro**: Script compara novos componentes com registry

### 9.6 Separação Backend/Frontend (Clean Architecture)
| Camada | Tech | Responsabilidade |
|--------|------|------------------|
| **Frontend** | Next.js 15 (RSC) | UI, client state, UX validation |
| **Backend** | Supabase (PG + Edge Functions) | Auth, DB, RLS, Storage, Realtime, PDF |
| **Boundary** | Server Actions + Supabase Client | Type-safe, no manual REST API |

**Regra**: Zero business logic no frontend. Server Actions = API boundary.

---

## 10. Segurança e Legal (Obrigatório)

### Rate Limiting (Por Endpoint)
```typescript
// lib/rate-limit.ts
export const rateLimiters = {
  auth: { limit: 10, window: '1m' },      // login/register
  api: { limit: 100, window: '1m' },      // API routes
  export: { limit: 20, window: '1h' },    // PDF export
  ai: { limit: 10, window: '1d' },        // AI assist (free)
  search: { limit: 60, window: '1m' },    // Library search
}
```

### Security Review (Por Release)
- `npm audit` (CI bloqueia high/critical)
- `gitleaks` / `trufflehog` (pre-commit + CI)
- Dependabot: auto-merge patch/minor, review major
- CodeQL / Snyk scan (GitHub Advanced Security)

### LGPD / Legal (Aprovação Jurídica Antes de Launch)
- [ ] Termos de Uso (`/terms`) - versãoados, aceitos no onboarding
- [ ] Política de Privacidade (`/privacy`) - LGPD, DPO contato
- [ ] Política de Cookies (`/cookies`) - banner consentimento granular
- [ ] Data Processing Agreement (para escolas B2B)
- [ ] Direito ao esquecimento (DELETE cascata) implementado
- [ ] Exportação dados (JSON) - `/settings/data`
- [ ] Retenção: logs errors 90d, analytics 30d
- [ ] Subprocessadores listados (Vercel, Supabase, Resend, Sentry)

---

## 11. Atualização deste Arquivo

Se você precisar alterar este processo:
1. Crie uma Issue `[Melhoria] Atualizar CONTRIBUTING.md`
2. Abra PR com as mudanças
3. Após merge, **todos agentes subsequentes devem seguir a nova versão**

---

**Última atualização**: 2026-11-14
**Versão**: 1.0.0