import { describe, it, expect } from 'vitest';
import { calculateOpportunityScore, getScoreLevel, getScoreBadgeClasses } from '../src/lib/scoring';

describe('Opportunity Scoring Algorithm', () => {
  it('calculates score within 0 to 100 bounds', () => {
    const result = calculateOpportunityScore({
      demand: 80,
      competition: 40,
      growth: 35,
      pricingAlignment: 75,
      ratingPotential: 90,
    });

    expect(result.overall).toBeGreaterThanOrEqual(0);
    expect(result.overall).toBeLessThanOrEqual(100);
    expect(typeof result.overall).toBe('number');
    expect(result.level).toBeDefined();
  });

  it('rewards high demand and low competition with excellent score', () => {
    const result = calculateOpportunityScore({
      demand: 95,
      competition: 15,
      growth: 60,
      pricingAlignment: 90,
      ratingPotential: 95,
    });

    expect(result.overall).toBeGreaterThanOrEqual(85);
    expect(result.level).toBe('Excellent');
  });

  it('correctly maps score levels', () => {
    expect(getScoreLevel(90)).toBe('Excellent');
    expect(getScoreLevel(85)).toBe('Excellent');
    expect(getScoreLevel(75)).toBe('Good');
    expect(getScoreLevel(70)).toBe('Good');
    expect(getScoreLevel(55)).toBe('Medium');
    expect(getScoreLevel(50)).toBe('Medium');
    expect(getScoreLevel(30)).toBe('Low');
  });

  it('returns valid styling classes for any score level', () => {
    const classes = getScoreBadgeClasses(88);
    expect(classes.text).toContain('emerald');
    expect(classes.accent).toBe('#10b981');

    const lowClasses = getScoreBadgeClasses(35);
    expect(lowClasses.text).toContain('rose');
    expect(lowClasses.accent).toBe('#ef4444');
  });
});
