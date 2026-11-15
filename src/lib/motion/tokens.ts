export const motionTokens = {
  duration: {
    fast: 150,
    base: 250,
    slow: 400,
    page: 400,
  },
  easing: {
    easeOut: 'easeOut',
    easeIn: 'easeIn',
    spring: { stiffness: 300, damping: 30 },
  },
  stagger: {
    base: 50,
  },
  reduced: {
    duration: 100,
    easing: 'linear',
  },
} as const;

export type MotionDuration = keyof typeof motionTokens.duration;
export type MotionEasing = keyof typeof motionTokens.easing;

export const variants = {
  page: {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
  },
  card: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    enter: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' },
    }),
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
  },
  modal: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    enter: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
  },
  backdrop: {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  },
  drawer: {
    initial: { x: '100%' },
    enter: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { x: '100%', transition: { duration: 0.2 } },
  },
  toast: {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    enter: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 500, damping: 30 },
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.15 } },
  },
  listItem: {
    initial: { opacity: 0, height: 0, marginTop: -10 },
    enter: { opacity: 1, height: 'auto', marginTop: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, marginTop: -10, transition: { duration: 0.2 } },
  },
} as const;

export function getReducedMotionVariants<T extends Record<string, unknown>>(variants: T): T {
  const reduced = motionTokens.reduced;
  return Object.fromEntries(
    Object.entries(variants).map(([key, value]) => [
      key,
      typeof value === 'object' && value !== null
        ? Object.fromEntries(
            Object.entries(value as Record<string, unknown>).map(([k, v]) => [
              k,
              k === 'transition'
                ? { duration: reduced.duration / 1000, easing: reduced.easing }
                : v,
            ]),
          )
        : value,
    ]),
  ) as T;
}

export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}
