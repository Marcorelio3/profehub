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
- [ ] Acessibilidade verificada (contraste, foco, ARIA)
- [ ] Performance considerada (bundle size, queries)
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

## 6. Atualização deste Arquivo

Se você precisar alterar este processo:
1. Crie uma Issue `[Melhoria] Atualizar CONTRIBUTING.md`
2. Abra PR com as mudanças
3. Após merge, **todos agentes subsequentes devem seguir a nova versão**

---

**Última atualização**: 2026-11-14
**Versão**: 1.0.0