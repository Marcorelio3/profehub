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

## 4. CI/CD - Gates Obrigatórios

Todo PR deve passar nos seguintes checks antes de merge:

```yaml
# .github/workflows/ci.yml (resumo)
jobs:
  quality:
    - lint (ESLint)
    - typecheck (tsc --noEmit)
    - format (prettier --check)
  test:
    - unit (vitest)
    - integration (playwright)
  build:
    - next build (production)
  security:
    - npm audit (high/critical)
    - dependabot alerts
```

**Merge só é permitido com:** Todos checks verdes + 1 aprovação (exceto dependabot)

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

## 8. Atualização deste Arquivo

Se você precisar alterar este processo:
1. Crie uma Issue `[Melhoria] Atualizar CONTRIBUTING.md`
2. Abra PR com as mudanças
3. Após merge, **todos agentes subsequentes devem seguir a nova versão**

---

**Última atualização**: 2026-11-14
**Versão**: 1.0.0