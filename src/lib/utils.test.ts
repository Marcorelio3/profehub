import { describe, expect, it } from 'vitest';
import { cn, debounce, formatDate, formatDateTime, slugify, throttle, truncate } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('joins class names', () => {
      expect(cn('a', 'b', 'c')).toBe('a b c');
    });

    it('handles conditional classes', () => {
      expect(cn('a', true && 'b', false && 'c')).toBe('a b');
    });

    it('handles object syntax', () => {
      expect(cn({ a: true, b: false, c: true })).toBe('a c');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15T12:00:00'); // Use noon to avoid timezone issues
      const formatted = formatDate(date);
      expect(formatted).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    });
  });

  describe('formatDateTime', () => {
    it('formats date time correctly', () => {
      const date = new Date('2024-01-15T10:30:00');
      const formatted = formatDateTime(date);
      expect(formatted).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}$/);
    });
  });

  describe('slugify', () => {
    it('creates slug from string', () => {
      expect(slugify('Olá Mundo!')).toBe('ola-mundo');
    });

    it('handles special characters', () => {
      expect(slugify('Test@#$%^&*()')).toBe('test');
    });
  });

  describe('truncate', () => {
    it('truncates long strings with ellipsis', () => {
      const result = truncate('Hello World', 8);
      expect(result).toContain('Hello');
      expect(result.endsWith('…')).toBe(true);
    });

    it('returns original if shorter', () => {
      expect(truncate('Hi', 10)).toBe('Hi');
    });
  });

  describe('debounce', () => {
    it('debounces function calls', async () => {
      let count = 0;
      const fn = debounce(() => count++, 50);
      fn();
      fn();
      fn();
      expect(count).toBe(0);
      await new Promise((r) => setTimeout(r, 60));
      expect(count).toBe(1);
    });
  });

  describe('throttle', () => {
    it('throttles function calls', async () => {
      let count = 0;
      const fn = throttle(() => count++, 50);
      fn();
      fn();
      fn();
      expect(count).toBe(1);
      await new Promise((r) => setTimeout(r, 60));
      fn();
      expect(count).toBe(2);
    });
  });
});
