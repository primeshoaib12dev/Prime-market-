import { useState, useMemo } from 'react';
import { Product, ProductFilterOptions, ProductCategory, DemandLevel, CompetitionLevel } from '../types';
import { PRODUCTS_DATA } from '../data/products';

export const DEFAULT_FILTERS: ProductFilterOptions = {
  searchQuery: '',
  category: 'All',
  brand: 'All',
  minPrice: 0,
  maxPrice: 20000,
  minRating: 0,
  demandLevel: 'All',
  competitionLevel: 'All',
  minOpportunityScore: 0,
  sortBy: 'opportunity-desc',
};

export function useProductSearch(initialProducts: Product[] = PRODUCTS_DATA) {
  const [products] = useState<Product[]>(initialProducts);
  const [filters, setFilters] = useState<ProductFilterOptions>(DEFAULT_FILTERS);

  const availableBrands = useMemo(() => {
    const brands = new Set(products.map((p) => p.brand));
    return ['All', ...Array.from(brands)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Query match
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(query);
          const matchCategory = product.category.toLowerCase().includes(query);
          const matchBrand = product.brand.toLowerCase().includes(query);
          const matchTags = (product.tags || []).some((t) => t.toLowerCase().includes(query));
          if (!matchName && !matchCategory && !matchBrand && !matchTags) {
            return false;
          }
        }

        // Category filter
        if (filters.category !== 'All' && product.category !== filters.category) {
          return false;
        }

        // Brand filter
        if (filters.brand !== 'All' && product.brand !== filters.brand) {
          return false;
        }

        // Price range
        if (product.price < filters.minPrice || product.price > filters.maxPrice) {
          return false;
        }

        // Min rating
        if (product.rating < filters.minRating) {
          return false;
        }

        // Demand level
        if (filters.demandLevel !== 'All' && product.demandLevel !== filters.demandLevel) {
          return false;
        }

        // Competition level
        if (filters.competitionLevel !== 'All' && product.competitionLevel !== filters.competitionLevel) {
          return false;
        }

        // Min opportunity score
        if (product.opportunityScore < filters.minOpportunityScore) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'opportunity-desc':
            return b.opportunityScore - a.opportunityScore;
          case 'demand-desc': {
            const demandWeight: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
            return (demandWeight[b.demandLevel] || 0) - (demandWeight[a.demandLevel] || 0);
          }
          case 'competition-asc': {
            const compWeight: Record<string, number> = { Low: 1, Medium: 2, High: 3 };
            return (compWeight[a.competitionLevel] || 0) - (compWeight[b.competitionLevel] || 0);
          }
          case 'growth-desc':
            return (b.growthPercentage || b.growthRate || 0) - (a.growthPercentage || a.growthRate || 0);
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating-desc':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [products, filters]);

  const updateFilter = <K extends keyof ProductFilterOptions>(key: K, value: ProductFilterOptions[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const setQuery = (query: string) => updateFilter('searchQuery', query);
  const setCategory = (cat: ProductCategory | 'All') => updateFilter('category', cat);
  const setBrand = (b: string | 'All') => updateFilter('brand', b);
  const setPriceRange = (min: number, max: number) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  };
  const setDemandLevel = (d: DemandLevel | 'All') => updateFilter('demandLevel', d);
  const setCompetitionLevel = (c: CompetitionLevel | 'All') => updateFilter('competitionLevel', c);
  const setMinOpportunityScore = (score: number) => updateFilter('minOpportunityScore', score);
  const setSort = (sort: ProductFilterOptions['sortBy']) => updateFilter('sortBy', sort);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      Boolean(filters.searchQuery) ||
      filters.category !== 'All' ||
      filters.brand !== 'All' ||
      filters.minPrice > 0 ||
      filters.maxPrice < 20000 ||
      filters.minRating > 0 ||
      filters.demandLevel !== 'All' ||
      filters.competitionLevel !== 'All' ||
      filters.minOpportunityScore > 0 ||
      filters.sortBy !== 'opportunity-desc'
    );
  }, [filters]);

  return {
    filters: {
      ...filters,
      query: filters.searchQuery,
    },
    updateFilter,
    setQuery,
    setCategory,
    setBrand,
    setPriceRange,
    setDemandLevel,
    setCompetitionLevel,
    setMinOpportunityScore,
    setSort,
    resetFilters,
    filteredProducts,
    totalCount: products.length,
    filteredCount: filteredProducts.length,
    availableBrands,
    hasActiveFilters,
  };
}
