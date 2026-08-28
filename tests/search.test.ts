import { describe, it, expect } from 'vitest';
import { INITIAL_PRODUCTS } from '../src/data/products';

describe('Product Search and Filter Logic', () => {
  it('contains valid mock marketplace inventory', () => {
    expect(INITIAL_PRODUCTS.length).toBeGreaterThan(5);
    expect(INITIAL_PRODUCTS[0].name).toBeDefined();
    expect(INITIAL_PRODUCTS[0].opportunityScore).toBeGreaterThan(0);
  });

  it('filters products by category accurately', () => {
    const gaming = INITIAL_PRODUCTS.filter((p) => p.category === 'Gaming');
    expect(gaming.length).toBeGreaterThan(0);
    expect(gaming.every((p) => p.category === 'Gaming')).toBe(true);
  });

  it('filters products by query search', () => {
    const query = 'keyboard';
    const matches = INITIAL_PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query))
    );
    expect(matches.length).toBeGreaterThan(0);
  });

  it('sorts products by opportunity score descending', () => {
    const sorted = [...INITIAL_PRODUCTS].sort((a, b) => b.opportunityScore - a.opportunityScore);
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].opportunityScore).toBeGreaterThanOrEqual(sorted[i + 1].opportunityScore);
    }
  });

  it('filters by price boundaries correctly', () => {
    const min = 1000;
    const max = 3000;
    const filtered = INITIAL_PRODUCTS.filter((p) => p.price >= min && p.price <= max);
    expect(filtered.every((p) => p.price >= min && p.price <= max)).toBe(true);
  });
});
