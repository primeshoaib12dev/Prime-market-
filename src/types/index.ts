export type ProductCategory =
  | 'Electronics'
  | 'Gaming'
  | 'Fitness'
  | 'Fashion'
  | 'Home & Kitchen'
  | 'Beauty'
  | 'Accessories';

export type ListingTone =
  | 'Professional'
  | 'Friendly'
  | 'Premium'
  | 'Persuasive'
  | 'Minimal';

export type ScoreLevel = 'Low' | 'Medium' | 'Good' | 'Excellent';
export type DemandLevel = 'Low' | 'Medium' | 'High';
export type CompetitionLevel = 'Low' | 'Medium' | 'High';

export interface OpportunityScoreBreakdown {
  overall: number; // 0-100
  level: ScoreLevel;
  demandScore: number; // 0-100
  competitionScore: number; // 0-100 (lower competition = higher score contribution)
  growthScore: number; // 0-100
  pricingScore: number; // 0-100
  ratingScore: number; // 0-100
  rationale: string;
}

export interface TargetAudienceSegment {
  segment: string;
  demographics: string;
  painPoints: string[];
  buyingMotivation: string;
}

export interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  category: 'Pricing' | 'Listing' | 'Audience' | 'Feature' | 'Marketing';
}

export interface ProductAnalysis {
  id: string;
  productName: string;
  category: ProductCategory;
  originalPrice: number;
  currency: string;
  description: string;
  features: string[];
  opportunityScore: OpportunityScoreBreakdown;
  marketDemand: DemandLevel;
  competitionLevel: CompetitionLevel;
  recommendedPriceRange: {
    min: number;
    max: number;
    optimal: number;
    currency: string;
    marginEstimate: string;
  };
  productSummary: string;
  targetAudience: TargetAudienceSegment[];
  strengths: string[];
  weaknesses: string[];
  recommendations: RecommendationItem[];
  analyzedAt: string; // ISO string
}

export type AIListing = {
  id: string;
  productName: string;
  category: ProductCategory;
  tone: ListingTone;
  productTitle: string;
  shortDescription: string;
  fullDescription: string;
  seoKeywords: string[];
  productTags: string[];
  marketingCopy: string;
  bulletPoints: string[];
  generatedAt: string;
};

export type ProductListing = AIListing;

export interface MarketTrend {
  id: string;
  category: ProductCategory;
  demandScore: number; // 0-100
  competitionScore: number; // 0-100
  growthPercentage: number; // e.g. 34.5
  opportunityScore: number; // 0-100
  searchVolumeGrowth: number; // %
  topKeywords: string[];
  topSearchQueries?: string[];
  monthlyTrajectory: {
    month: string;
    demand: number;
    salesIndex: number;
  }[];
}

export interface FastGrowingProduct {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  currentPrice: number;
  averagePrice?: number;
  rating: number;
  reviewCount: number;
  demandScore: number;
  competitionScore: number;
  growthPercentage: number;
  opportunityScore: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  reviewsCount?: number;
  demandLevel: DemandLevel;
  competitionLevel: CompetitionLevel;
  opportunityScore: number;
  growthPercentage: number;
  growthRate?: number;
  description: string;
  features: string[];
  tags: string[];
  salesVelocity: string;
}

export interface SavedAnalysis {
  id: string;
  productName: string;
  category: ProductCategory;
  opportunityScore: number;
  marketDemand: DemandLevel;
  priceRange: string;
  savedAt: string;
  analysis: ProductAnalysis;
}

export interface DashboardStats {
  productsAnalyzed: number;
  aiGenerations: number;
  marketOpportunities: number;
  averageOpportunityScore: number;
  categoryGrowth: {
    category: ProductCategory;
    growth: number;
    opportunity: number;
  }[];
  recentAnalyses: SavedAnalysis[];
  demandVsCompetition: {
    category: string;
    demand: number;
    competition: number;
    opportunity: number;
  }[];
  monthlyTrends: {
    month: string;
    analyzed: number;
    generations: number;
    opportunities: number;
  }[];
}

export interface ProductFilterOptions {
  searchQuery: string;
  category: ProductCategory | 'All';
  brand: string | 'All';
  minPrice: number;
  maxPrice: number;
  minRating: number;
  demandLevel: DemandLevel | 'All';
  competitionLevel: CompetitionLevel | 'All';
  minOpportunityScore: number;
  sortBy:
    | 'opportunity-desc'
    | 'demand-desc'
    | 'competition-asc'
    | 'growth-desc'
    | 'price-asc'
    | 'price-desc'
    | 'rating-desc';
}
