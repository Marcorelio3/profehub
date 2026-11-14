## Contexto
Estabelecer esteira de qualidade obrigatória antes de qualquer código entrar na branch principal (main).

---

## 1. Observabilidade

### Sentry (Error Tracking + Performance)
- **Frontend**: `@sentry/nextjs` com `tracingOrigins`, `replay` (10% sessões), `profiling`
- **Backend (Edge Functions)**: `@sentry/node` em cada function
- **Source Maps**: Upload automático no build (`sentry-cli`)
- **Alertas**: 
  - Error rate > 1% em 5min
  - p95 latency > 2s
  - Crash-free users < 99.5%

### Vercel Analytics (Web Vitals + RUM)
- `@vercel/analytics` + `@vercel/speed-insights`
- Core Web Vitals: LCP, CLS, INP, TTFB
- Custom events: `activity_created`, `pdf_exported`, `collaboration_started`

### OpenTelemetry (Opcional - Futuro)
- Instrumentação customizada se migração para k8s/self-hosted
- Exporters: OTLP → Grafana/Jaeger

---

## 2. Qualidade e Lint de Código

### Biome (Substitui ESLint + Prettier + Stylelint)
```json
// biome.json
{
  "formatter": { "enabled": true, "indentStyle": "space", "indentWidth": 2 },
  "linter": { 
    "enabled": true, 
    "rules": { 
      "recommended": true,
      "suspicious": { "noExplicitAny": "error", "noConsole": "warn" },
      "correctness": { "noUnusedVariables": "error" },
      "a11y": { "useAltText": "error", "noAutofocus": "warn" }
    } 
  },
  "javascript": { "formatter": { "semicolons": "always", "trailingCommas": "all" } },
  "overrides": [{ "includes": ["**/*.test.ts", "**/*.spec.ts"], "linter": { "rules": { "suspicious": { "noConsole": "off" } } } }]
}
```

### Commitlint (Conventional Commits)
```json
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'refactor', 'docs', 'test', 'perf', 'build', 'ci', 'revert']],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 100]
  }
}
```

### Husky (Git Hooks)
```bash
# .husky/pre-commit
npx biome check --write --files-ignore-unknown=true .
npx tsc --noEmit

# .husky/commit-msg
npx commitlint --edit $1

# .husky/pre-push
npm run test:unit --if-present
```

### Knip (Unused Code Detection)
```json
// knip.json
{
  "entry": ["app/**/*.tsx", "components/**/*.tsx", "lib/**/*.ts"],
  "project": ["**/*.ts", "**/*.tsx"],
  "ignore": ["**/*.d.ts", "**/*.config.*", "**/types/**"],
  "rules": { "enumMembers": "off" }
}
```
- Roda no CI: `knip --strict`

### Arch-Contract (Architecture Boundaries)
```yaml
# .arch-contract.yml
layers:
  - name: "app"
    allow: ["components", "lib", "types"]
  - name: "components"
    allow: ["lib", "types"]
    deny: ["app", "components/ui"]
  - name: "lib"
    allow: ["types"]
    deny: ["app", "components"]
  - name: "types"
    deny: ["app", "components", "lib"]
```
- Valida no CI: `npx arch-contract check`

### Stryker (Mutation Testing)
```json
// stryker.conf.json
{
  "mutator": "typescript",
  "testRunner": "vitest",
  "thresholds": { "high": 80, "low": 60, "break": 50 },
  "reporters": ["html", "clear-text", "progress"],
  "packageManager": "npm"
}
```
- Target: Mutation score > 70% (critical paths > 85%)
- Roda nightly (não bloqueia PR)

---

## 3. Testes

### Unitários (Vitest)
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        lines: 80,
        functions: 75,
        branches: 70,
        statements: 80
      },
      exclude: ['**/*.d.ts', '**/*.config.*', '**/test/**', '**/stories/**']
    },
    include: ['**/*.{test,spec}.{ts,tsx}'],
    globals: true
  }
})
```
- **Onde**: `lib/`, `hooks/`, `utils/`, `components/ui/`
- **Cobertura mínima**: 80% lines, 75% functions

### Integração (Vitest + MSW)
```typescript
// test/integration/activities.test.ts
import { createActivity, publishActivity, forkActivity } from '@/lib/actions/activities'
```
- **Onde**: Server Actions, API routes, Supabase helpers
- **Mock**: MSW para Supabase, external APIs

### End-to-End (Playwright)
```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
})
```

**Critical Paths (Bloqueiam Merge):**
1. `signup → onboarding → first activity → publish`
2. `login → editor → create → save → export PDF`
3. `library → search → filter → preview → fork`
4. `share → collaborator accepts → real-time edit`
5. `settings → license → publish → verify attribution`

### Codecov
- Upload automático no CI (`codecov-action@v4`)
- Flags: `unit`, `integration`, `e2e`
- PR comment com coverage diff
- Fail se coverage cai > 1% vs base

---

## 4. Segurança e Operação

### Rate Limiting
```typescript
// lib/rate-limit.ts (Upstash Redis ou Vercel KV)
export const rateLimiters = {
  auth: { limit: 10, window: '1m' },           // login/register
  api: { limit: 100, window: '1m' },           // API routes
  export: { limit: 20, window: '1h' },         // PDF export
  ai: { limit: 10, window: '1d' },             // AI assist (free tier)
  search: { limit: 60, window: '1m' },         // Library search
}
```
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`

### Security Review (Obrigatório por Release)
- `npm audit` (CI bloqueia high/critical)
- `snyk test` ou `github codeql` (PR check)
- Dependabot: auto-merge patch/minor, alert major
- Secrets: `trufflehog` / `gitleaks` no pre-commit + CI

### Performance Budget
```json
// performance-budget.json
{
  "budgets": [
    { "resource": "total", "limit": 300000 },      // 300KB JS gzipped
    { "resource": "script", "limit": 150000 },     // 150KB main thread
    { "resource": "css", "limit": 50000 },         // 50KB CSS
    { "resource": "font", "limit": 100000 },       // 100KB fonts
    { "resource": "image", "limit": 500000 },      // 500KB images/page
    { "resource": "third-party", "limit": 50000 }, // 50KB 3rd party
    { "metric": "LCP", "limit": 2500 },            // 2.5s
    { "metric": "CLS", "limit": 0.1 },             // 0.1
    { "metric": "INP", "limit": 200 },             // 200ms
    { "metric": "TTFB", "limit": 800 }             // 800ms
  ]
}
```
- Valida: `lighthouse-ci` no PR preview URL

### Separação Backend/Frontend
| Camada | Tecnologia | Responsabilidade |
|--------|------------|------------------|
| **Frontend** | Next.js 15 (RSC) | UI, estado cliente, validação UX |
| **Backend** | Supabase (PostgreSQL + Edge Functions) | Auth, DB, RLS, Storage, Realtime, PDF gen |
| **Comunicação** | Server Actions + Supabase Client | Type-safe, sem API REST manual |

**Regra**: Zero lógica de negócio no frontend. Server Actions = API boundary.

### LGPD / Legal (Aprovação Jurídica Obrigatória)
- **Termos de Uso**: `/terms` - versãoada, aceitação no onboarding
- **Política de Privacidade**: `/privacy` - LGPD compliant, DPO contato
- **Política de Cookies**: `/cookies` - banner consentimento (necessários, analytics, marketing)
- **Data Processing Agreement**: Para escolas (B2B)
- **Cookie Scanner**: `cookieyes` ou similar
- **Checklist Jurídico** (valida antes de cada release):
  - [ ] Consentimento granular (opt-in analytics/marketing)
  - [ ] Direito ao esquecimento implementado (DELETE cascata)
  - [ ] Exportação dados (JSON) - `/settings/data`
  - [ ] Retenção logs: 90 dias (errors), 30 dias (analytics)
  - [ ] Subprocessadores listados (Vercel, Supabase, Resend, Sentry)

---

## 5. Arquitetura - Princípios Obrigatórios

### Anti-Overengineering
| Princípio | Aplicação |
|-----------|-----------|
| **YAGNI** | Não criar abstração até 3º uso real |
| **Rule of 3** | Copy-paste 2x, na 3ª extrair |
| **No Premature Abstraction** | `lib/utils/` só helpers puros, não business logic |
| **Flat > Nested** | Max 3 níveis de pasta por feature |

### Anti-Bottlenecks
| Risco | Mitigação |
|-------|-----------|
| **God Component** | Split: `<Editor>` → `<EditorToolbar>`, `<EditorSidebar>`, `<EditorCanvas>`, `<EditorStatus>` |
| **Monolithic Server Action** | Granular: `createActivity`, `updateActivityContent`, `publishActivity`, `forkActivity` |
| **N+1 Queries** | `select()` com joins, React Query `placeholderData`, Supabase `select` otimizado |
| **Bundle Bloat** | Dynamic imports: Editor, PDF Preview, Charts, AI Assist |
| **Realtime Storm** | Throttle presence (100ms), debounce cursors, limit broadcast |

### Componentização Desde Início
```
components/
├── ui/              # Primitivas (Button, Input, Card, Modal, Toast, Skeleton)
├── editor/          # Feature: TipTapEditor, Toolbar, Sidebar, Canvas, Extensions
├── library/         # Feature: ActivityCard, Grid, Filters, PreviewModal
├── dashboard/       # Feature: ActivityList, StatsCards, QuickActions
├── collaboration/   # Feature: ShareDialog, PresenceAvatars, CommentThread
├── auth/            # Feature: LoginForm, RegisterForm, OAuthButtons
└── layout/          # Feature: Header, Sidebar, Footer, ThemeToggle
```
- **Cada feature**: `components/`, `hooks/`, `actions/`, `types/`, `index.ts` (barrel)

### DRY com Critério
| ✅ Extrair | ❌ Não Extrair |
|------------|----------------|
| `cn()` classnames helper | Wrapper genérico `BaseComponent` |
| `formatDate()`, `formatNumber()` | `useActivity()` hook genérico |
| `validateEmail()`, `slugify()` | HOC `withAuth()` para tudo |
| Zod schemas compartilhados | Context provider para 1 componente |

### Impedir Reconstrução (Component Registry)
- **Storybook** obrigatório para `components/ui/`
- **Antes de criar**: Buscar no Storybook / `@/components/ui`
- **Regra**: Se existe `Button`, `Card`, `Modal`, `Input`, `Toast`, `Skeleton`, `Avatar`, `Badge`, `Dropdown`, `Tabs`, `Tooltip` → **USE**, não recrie
- **CI Check**: Script que compara novos componentes com registry (future)

---

## CI/CD Pipeline (`.github/workflows/ci.yml`)

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '22'
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ secrets.TURBO_TEAM }}

jobs:
  # ============ QUALITY GATES ============
  lint:
    name: Lint (Biome)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: ${{ env.NODE_VERSION }}, cache: 'npm' }
      - run: npm ci
      - run: npx biome check --strict .
  
  typecheck:
    name: TypeCheck (tsc)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: ${{ env.NODE_VERSION }}, cache: 'npm' }
      - run: npm ci
      - run: npx tsc --noEmit
  
  knip:
    name: Unused Code (Knip)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: ${{ env.NODE_VERSION }}, cache: 'npm' }
      - run: npm ci
      - run: npx knip --strict

  arch-contract:
    name: Architecture Boundaries
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: ${{ env.NODE_VERSION }}, cache: 'npm' }
      - run: npm ci
      - run: npx arch-contract check

  commitlint:
    name: Commit Messages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: ${{ env.NODE_VERSION }} }
      - run: npm ci
      - run: npx commitlint --from=origin/main --to=HEAD

  # ============ TESTS ============
  test:unit:
    name: Unit Tests (Vitest)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: ${{ env.NODE_VERSION }}, cache: 'npm' }
      - run: npm ci
      - run: npm run test:unit -- --run --coverage
      - uses: codecov/codecov-action@v4
        with: { flags: unit, token: ${{ secrets.CODECOV_TOKEN }} }

  test:integration:
    name: Integration Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: supabase/postgres:15
        env: { POSTGRES_PASSWORD: postgres }
        ports: [5432:5432]
        options: >-
          --health-cmd "pg_isready -U postgres"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: ${{ env.NODE_VERSION }}, cache: 'npm' }
      - run: npm ci
      - run: npx supabase db reset --linked
      - run: npm run test:integration -- --run
      - uses: codecov/codecov-action@v4
        with: { flags: integration, token: ${{ secrets.CODECOV_TOKEN }} }

  test:e2e:
    name: E2E Tests (Playwright)
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: ${{ env.NODE_VERSION }}, cache: 'npm' }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build
      - run: npm run test:e2e -- --project=chromium
      - uses: actions/upload-artifact@v4
        if: failure()
        with: { name: playwright-report, path: test-results/ }

  # ============ SECURITY ============
  security:audit:
    name: Security Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: ${{ env.NODE_VERSION }}, cache: 'npm' }
      - run: npm ci
      - run: npm audit --audit-level=high
      - run: npx gitleaks detect --source=. --verbose

  security:deps:
    name: Dependency Review
    runs-on: ubuntu-latest
    steps:
      - uses: actions/dependency-review-action@v4
        with: { fail-on-severity: high }

  # ============ BUILD ============
  build:
    name: Build (Next.js)
    runs-on: ubuntu-latest
    needs: [lint, typecheck, knip, arch-contract, commitlint, test:unit, test:integration, security:audit]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: ${{ env.NODE_VERSION }}, cache: 'npm' }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with: { name: nextjs-build, path: .next/, retention-days: 1 }

  # ============ PERFORMANCE ============
  performance:
    name: Performance Budget (Lighthouse CI)
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: ${{ env.NODE_VERSION }}, cache: 'npm' }
      - run: npm ci
      - run: npx lhci autorun --upload.target=temporary-public-storage
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

  # ============ MUTATION (NIGHTLY) ============
  stryker:
    name: Mutation Testing (Stryker)
    runs-on: ubuntu-latest
    if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
    timeout-minutes: 60
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: ${{ env.NODE_VERSION }}, cache: 'npm' }
      - run: npm ci
      - run: npx stryker run
      - uses: actions/upload-artifact@v4
        with: { name: stryker-report, path: reports/mutation/, retention-days: 7 }

  # ============ DEPLOY PREVIEW ============
  deploy:preview:
    name: Deploy Preview (Vercel)
    runs-on: ubuntu-latest
    needs: [build, performance]
    if: github.event_name == 'pull_request'
    steps:
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod=false'
      - name: Comment PR with Preview URL
        uses: actions/github-script@v7
        with:
          script: |
            const { data: comments } = await github.rest.issues.listComments({ owner: context.repo.owner, repo: context.repo.repo, issue_number: context.payload.pull_request.number });
            const botComment = comments.find(c => c.user.type === 'Bot' && c.body.includes('Vercel Preview'));
            const url = '${{ steps.vercel.outputs.preview-url }}';
            const body = `🚀 **Vercel Preview**: ${url}\n\n*Lighthouse CI runs automatically on this URL.*`;
            if (botComment) {
              await github.rest.issues.updateComment({ owner: context.repo.owner, repo: context.repo.repo, comment_id: botComment.id, body });
            } else {
              await github.rest.issues.createComment({ owner: context.repo.owner, repo: context.repo.repo, issue_number: context.payload.pull_request.number, body });
            }

# Branch Protection: main requer todos jobs verdes + 1 review
```

---

## Critérios de Aceite
- [ ] Pipeline CI roda < 15 min (cache otimizado)
- [ ] Quality gates bloqueiam merge se falhar (lint, typecheck, knip, arch, tests, security, build)
- [ ] Coverage > 80% unit, > 70% integration
- [ ] E2E critical paths passam em CI
- [ ] Performance budget validado no PR preview
- [ ] Mutation testing nightly > 70% score
- [ ] Security audit sem high/critical
- [ ] Commit messages válidos (conventional)
- [ ] Dependabot auto-merge patch/minor
- [ ] Preview URL automático em PRs

## Riscos / Limitações
- CI tempo: otimizar cache (node_modules, .next, supabase)
- Playwright flaky: retry 2x, screenshots on failure
- Supabase local em CI: usar `supabase/db-dev` container
- Stryker lento: só nightly, não bloqueia PR
- Lighthouse CI: quota gratuita limitada

## Referências
- Bloqueia merge em TODAS as issues: #1-#23
- CONTRIBUTING.md seção 4 (CI/CD Gates)
- Issue #24 (Design System Quality Gate)