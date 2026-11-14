## Contexto
Definir especificação obrigatória de UX/UI para toda a interface do sistema, garantindo qualidade de produto sênior.

## Solução Proposta
Criar `DESIGN_SYSTEM.md` + componentes base que enforcem:

### 1. Lazy Loading
- **Imagens**: `next/image` com `loading="lazy"` + blur placeholder (thumbnails, avatars, previews)
- **Componentes pesados**: `dynamic(() => import(...), { ssr: false, loading: Skeleton })`
  - Editor TipTap (só carrega ao entrar em `/editor`)
  - PDF Preview modal
  - Charts/analytics
  - Collaboration cursors
- **Rotas**: Next.js App Router já faz code-split por rota
- **Dados**: React Query / SWR com `placeholderData` para transições suaves

### 2. Skeleton Screens (Obrigatório em todo loading assíncrono)
| Contexto | Skeleton | Duração mínima |
|----------|----------|----------------|
| ActivityCard grid | Card com linhas de texto + imagem placeholder | 300ms |
| ActivityList (dashboard) | Linhas com avatar + título + meta | 200ms |
| Editor | Toolbar + área A4 cinza + sidebar | 400ms |
| Preview Modal | Páginas A4 cinzas escalonadas | 300ms |
| Library filters | Chips cinzas pulsando | 150ms |
| Search results | Lista cards skeleton | 200ms |
| Profile/avatar | Círculo pulse | 200ms |

**Regra**: Nunca mostrar spinner nu. Sempre skeleton contextual.

### 3. Animações de Entrada/Saída (Framer Motion)
```typescript
// Variants padrão do sistema
export const variants = {
  // Páginas/telas
  page: {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
  },
  // Cards (stagger)
  card: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    enter: (i) => ({ opacity: 1, scale: 1, y: 0, transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' } }),
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
  },
  // Modais/Dialogs
  modal: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    enter: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
  },
  // Backdrop
  backdrop: {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  },
  // Sidebar/Drawer
  drawer: {
    initial: { x: '100%' },
    enter: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { x: '100%', transition: { duration: 0.2 } },
  },
  // Toasts/Notificações
  toast: {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    enter: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 30 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.15 } },
  },
  // Lista items (reorder, insert, delete)
  listItem: {
    initial: { opacity: 0, height: 0, marginTop: -10 },
    enter: { opacity: 1, height: 'auto', marginTop: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, marginTop: -10, transition: { duration: 0.2 } },
  },
}
```

**Duração base**: 200-400ms. **Easing**: `easeOut` (entrada), `easeIn` (saída). **Spring** para modais/toasts.

### 4. Estados de Progresso (Interactive Elements)
| Elemento | Estados | Visual |
|----------|---------|--------|
| Button | idle, hover, active, loading, disabled | Spinner interno (loading), scale 0.98 (active) |
| Link (next/link) | idle, hover, prefetching | Subtle underline animation |
| Input/Select | idle, focus, error, disabled, loading | Ring focus, shake (error), spinner (loading) |
| Checkbox/Radio | idle, hover, checked, indeterminate | Smooth check animation (0.15s) |
| Toggle/Switch | idle, hover, checked | Thumb slide (spring) |
| Dropdown/Menu | closed, opening, open, closing | Scale + fade (0.15s) |
| Tabs | idle, active, hover | Indicator slide (spring) |
| Pagination | idle, loading, disabled | Spinner no botão ativo |
| Drag handle | idle, hover, dragging | Opacity 0→1, cursor grab/grabbing |

**Regra**: Todo elemento interativo tem `transition: all 150ms ease` base.

### 5. Feedback Visual para Ações
| Ação | Feedback | Duração |
|------|----------|---------|
| Click button | Ripple (Material) ou scale 0.98 | 100ms |
| Form submit | Button loading state + toast sucesso/erro | 2s toast |
| Copy to clipboard | Toast "Copiado!" + check icon | 2s |
| Download start | Toast "Download iniciado" + progress | Até fim |
| Save (auto/manual) | Badge "Salvando..." → "Salvo ✓" | 1.5s |
| Delete | Modal confirm → toast "Excluído" + undo (5s) | 5s undo |
| Fork/Share | Toast + link copiado auto | 3s |
| Error | Toast vermelho + shake no elemento | 4s |
| Success | Toast verde + check | 3s |
| Warning | Toast amarelo + warning icon | 4s |

**Toasts**: Top-right, stack max 3, swipe to dismiss, pause on hover.

### 6. Transições Consistentes
| Transição | Implementação |
|-----------|---------------|
| Navegação páginas | `AnimatePresence` + `variants.page` (layout.js) |
| Modal/Dialog | `variants.modal` + `variants.backdrop` |
| Sidebar/Mobile nav | `variants.drawer` |
| Cards grid (mount/unmount/filter) | `variants.card` + `AnimatePresence` mode="popLayout" |
| Lista items (add/remove/reorder) | `variants.listItem` + `layout` prop |
| Tabs | Indicator `motion.div` com `layout` |
| Accordion | `motion.div` height auto (collapsible) |
| Tooltip/Popover | `variants.tooltip` (scale + fade) |
| Image load | Blur → sharp (next/image nativo) |
| Theme toggle | Cross-fade + rotate icon (0.3s) |

**Regra de Ouro**: 
- **Entrada**: 300-400ms, easeOut, stagger 50ms (listas)
- **Saída**: 150-200ms, easeIn, sem stagger
- **Micro-interactions**: 100-150ms, spring/ease
- **Reduced motion**: Desabilita TUDO (apenas fade 100ms)

### 7. Checklist de Qualidade (Revisão Sênior)
Antes de merge, o PR deve passar:
- [ ] **Nenhum spinner nu** - todos loading usam skeleton contextual
- [ ] **Nenhuma transição brusca** - tudo tem motion variant
- [ ] **Nenhum estado vazio genérico** - empty states com ilustração + ação
- [ ] **Nenhum feedback faltando** - toda ação tem toast/visual response
- [ ] **Focus visível** - Tab navigation clara em todos elementos
- [ ] **Reduced motion respeitado** - `@media (prefers-reduced-motion: reduce)`
- [ ] **Performance** - Animações 60fps (will-change, transform/opacity only)
- [ ] **Consistência** - Mesmos tokens de duração/easing em todo app
- [ ] **Mobile** - Touch feedback (active states), drawer animations
- [ ] **Acessibilidade** - ARIA live regions para toasts/status

## Critérios de Aceite
- [ ] `DESIGN_SYSTEM.md` criado e versionado
- [ ] Componentes base: `Button`, `Input`, `Card`, `Modal`, `Toast`, `Skeleton`, `Spinner`
- [ ] `motion` variants exportados de `@/lib/motion`
- [ ] Hook `useReducedMotion` implementado
- [ ] Storybook/visual tests para todos estados
- [ ] Documentação de uso para cada componente

## Riscos / Limitações
- Framer Motion bundle size (~18KB) - code split se necessário
- Animações complexas em mobile low-end - testar em dispositivos reais
- SSR hydration mismatch com Framer - usar `useEffect` para mount

## Referências
- Aplica a TODAS as issues de UI: #1, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, #17, #18