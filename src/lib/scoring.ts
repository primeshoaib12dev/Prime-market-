import { OpportunityScoreBreakdown, ScoreLevel } from '../types';

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 40) return 'Medium';
  return 'Low';
}

export function getScoreBadgeClasses(score: number): {
  bg: string;
  text: string;
  border: string;
  badge: string;
  accent: string;
} {
  const level = getScoreLevel(score);
  switch (level) {
    case 'Excellent':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800/60',
        badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
        accent: '#10b981',
      };
    case 'Good':
      return {
        bg: 'bg-blue-50 dark:bg-blue-950/40',
        text: 'text-blue-700 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800/60',
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300 dark:border-blue-700',
        accent: '#3b82f6',
      };
    case 'Medium':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800/60',
        badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-300 dark:border-amber-700',
        accent: '#f59e0b',
      };
    case 'Low':
    default:
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/40',
        text: 'text-rose-700 dark:text-rose-400',
        border: 'border-rose-200 dark:border-rose-800/60',
        badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border-rose-300 dark:border-rose-700',
        accent: '#ef4444',
      };
  }
}

export interface CalculateScoreInput {
  demand: number; // 0-100
  competition: number; // 0-100 (100 = saturated, 0 = no competitors)
  growth: number; // -100 to 100+ (or % scale)
  pricingAlignment?: number; // 0-100
  rating?: number; // 0-5
  ratingPotential?: number; // 0-100
}

/**
 * Calculates a normalized 0-100 opportunity score.
 * Formula balances High Demand (30%), Low Competition (25%), High Growth (20%),
 * Healthy Pricing margin (15%), and Verified Customer Satisfaction (10%).
 */
export function calculateOpportunityScore(input: CalculateScoreInput): OpportunityScoreBreakdown {
  const demand = Math.max(0, Math.min(100, input.demand));
  const competition = Math.max(0, Math.min(100, input.competition));
  
  // Normalize growth: -20% to +80% clamped to 0-100
  const normalizedGrowth = Math.max(0, Math.min(100, (input.growth + 20) * 1.0));
  
  const pricingScore = Math.max(0, Math.min(100, input.pricingAlignment ?? 75));
  
  const ratingScore = input.rating !== undefined
    ? Math.max(0, Math.min(100, (input.rating / 5) * 100))
    : 78;

  // Inverted competition: lower competition is better for a seller entering market
  const competitionBenefit = 100 - competition;

  const rawWeighted =
    demand * 0.30 +
    competitionBenefit * 0.25 +
    normalizedGrowth * 0.20 +
    pricingScore * 0.15 +
    ratingScore * 0.10;

  const overall = Math.round(Math.max(5, Math.min(99, rawWeighted)));
  const level = getScoreLevel(overall);

  let rationale = '';
  if (level === 'Excellent') {
    rationale = 'High market demand combined with manageable competitor concentration and strong buyer interest makes this an optimal opportunity.';
  } else if (level === 'Good') {
    rationale = 'Solid momentum with positive growth indicators. Strong positioning or unique value proposition will capture substantial market share.';
  } else if (level === 'Medium') {
    rationale = 'Viable market, though moderate competition and pricing pressure require targeted optimization and differentiated features.';
  } else {
    rationale = 'Challenging market conditions with intense competition, low demand velocity, or restricted pricing margins.';
  }

  return {
    overall,
    level,
    demandScore: Math.round(demand),
    competitionScore: Math.round(competition),
    growthScore: Math.round(normalizedGrowth),
    pricingScore: Math.round(pricingScore),
    ratingScore: Math.round(ratingScore),
    rationale,
  };
}
