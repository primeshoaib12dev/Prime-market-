import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  SlidersHorizontal,
  X,
  Star,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useProductSearch } from '../../hooks/useProductSearch';
import { OpportunityBadge } from '../ui/OpportunityBadge';
import { CATEGORY_LIST } from '../../data/trends';
import { Product, ProductCategory } from '../../types';

interface SearchViewProps {
  onAnalyzeProduct: (name: string, category: ProductCategory) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ onAnalyzeProduct }) => {
  const {
    filteredProducts,
    filters,
    setQuery,
    setCategory,
    setPriceRange,
    setDemandLevel,
    setCompetitionLevel,
    setMinOpportunityScore,
    setSort,
    resetFilters,
    totalCount,
    hasActiveFilters,
  } = useProductSearch();

  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#27272a] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#fafafa] tracking-tight">
              Product Intelligence Database
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#18181b] text-indigo-400 border border-[#27272a]">
              {filteredProducts.length} of {totalCount} Products
            </span>
          </div>
          <p className="text-sm text-[#71717a] mt-1">
            Search verified marketplace inventory by keyword, demand, competitive density, and opportunity score.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowFilterDrawer(!showFilterDrawer)}
          className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-[#18181b] border border-[#27272a] text-[#fafafa] cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters {hasActiveFilters && '• Active'}</span>
        </button>
      </div>

      {/* Main Search & Control Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#71717a] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="product-search-query-input"
            value={filters.query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product name, category, or brand..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#27272a] bg-[#09090b] text-sm text-[#fafafa] placeholder:text-[#71717a] focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {filters.query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-[#fafafa] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-[#71717a] shrink-0" />
          <select
            value={filters.sortBy}
            onChange={(e) => {
              setSort(e.target.value as any);
            }}
            className="text-xs font-medium bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-2.5 text-[#fafafa] focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="opportunity-desc">Highest Opportunity Score</option>
            <option value="demand-desc">Highest Market Demand</option>
            <option value="competition-asc">Lowest Competition Density</option>
            <option value="growth-desc">Fastest Growing (%)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Content Layout: Filter Sidebar (Desktop) + Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className={`space-y-5 md:block ${showFilterDrawer ? 'block' : 'hidden'}`}>
          <div className="p-5 rounded-xl bg-[#18181b] border border-[#27272a] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#fafafa] flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-indigo-400" />
                <span>Filters</span>
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-indigo-400 hover:underline font-medium cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1.5">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setCategory(e.target.value as ProductCategory | 'All')}
                className="w-full text-xs font-medium bg-[#09090b] border border-[#27272a] rounded-lg px-2.5 py-2 text-[#fafafa] focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="All">All Categories</option>
                {CATEGORY_LIST.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Opportunity Score Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-[#a1a1aa] mb-1">
                <span>Min Opportunity Score</span>
                <span className="text-indigo-400 font-bold">
                  {filters.minOpportunityScore}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={95}
                step={5}
                value={filters.minOpportunityScore}
                onChange={(e) => setMinOpportunityScore(Number(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-[#27272a] rounded-lg cursor-pointer"
              />
            </div>

            {/* Market Demand Level */}
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1.5">
                Market Demand
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {(['All', 'High', 'Medium', 'Low'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDemandLevel(lvl)}
                    className={`py-1.5 px-2 rounded-lg font-medium text-center transition-colors cursor-pointer ${
                      filters.demandLevel === lvl
                        ? 'bg-[#27272a] text-[#fafafa] font-bold border border-[#3f3f46]'
                        : 'bg-[#09090b] border border-[#27272a] text-[#71717a] hover:bg-[#27272a]/50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Competition Level */}
            <div>
              <label className="block text-xs font-medium text-[#a1a1aa] mb-1.5">
                Competition Density
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {(['All', 'Low', 'Medium', 'High'] as const).map((comp) => (
                  <button
                    key={comp}
                    type="button"
                    onClick={() => setCompetitionLevel(comp)}
                    className={`py-1.5 px-2 rounded-lg font-medium text-center transition-colors cursor-pointer ${
                      filters.competitionLevel === comp
                        ? 'bg-[#27272a] text-[#fafafa] font-bold border border-[#3f3f46]'
                        : 'bg-[#09090b] border border-[#27272a] text-[#71717a] hover:bg-[#27272a]/50'
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid (3 cols on desktop) */}
        <div className="md:col-span-3 space-y-4">
          {filteredProducts.length === 0 ? (
            <div className="p-12 rounded-xl bg-[#18181b] border border-[#27272a] text-center">
              <Search className="w-8 h-8 text-[#71717a] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#fafafa]">
                No matching products found
              </h3>
              <p className="text-xs text-[#71717a] mt-1 max-w-sm mx-auto">
                Try widening your search terms or lowering your opportunity score filter thresholds.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-5 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-indigo-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Tag & Score Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#27272a] text-[#fafafa] border border-[#3f3f46]">
                        {product.category}
                      </span>
                      <OpportunityBadge score={product.opportunityScore} size="sm" />
                    </div>

                    {/* Title & Brand */}
                    <h3 className="font-bold text-base text-[#fafafa] mt-2 leading-snug">
                      {product.name}
                    </h3>
                    <div className="text-xs text-[#71717a] mt-0.5">
                      by {product.brand}
                    </div>

                    {/* Price & Rating */}
                    <div className="mt-3 flex items-baseline justify-between">
                      <div className="text-lg font-bold text-[#fafafa] font-mono">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-[#71717a] font-normal">({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="mt-3 grid grid-cols-3 gap-1.5 py-2.5 px-3 rounded-lg bg-[#09090b] border border-[#27272a] text-center text-xs">
                      <div>
                        <div className="text-[10px] text-[#71717a] uppercase">Demand</div>
                        <div className="font-bold text-[#fafafa]">
                          {product.demandLevel}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#71717a] uppercase">Competition</div>
                        <div className="font-bold text-[#fafafa]">
                          {product.competitionLevel}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#71717a] uppercase">Growth</div>
                        <div className="font-bold text-emerald-400">
                          +{product.growthRate}%
                        </div>
                      </div>
                    </div>

                    {/* Feature snippets */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {product.features.slice(0, 2).map((feat, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#27272a] text-[#fafafa] border border-[#3f3f46] truncate max-w-[140px]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-[#27272a] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs font-semibold text-[#a1a1aa] hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      Quick Specs
                    </button>

                    <button
                      type="button"
                      onClick={() => onAnalyzeProduct(product.name, product.category)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Analyze with AI</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Specs Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#18181b] rounded-xl max-w-lg w-full p-6 border border-[#27272a] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#27272a] text-indigo-400 border border-[#3f3f46]">
                  {selectedProduct.category}
                </span>
                <h3 className="text-lg font-bold text-[#fafafa] mt-1">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="p-1 text-[#71717a] hover:text-[#fafafa] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              {selectedProduct.description}
            </p>

            <div>
              <div className="text-xs font-bold text-[#fafafa] mb-1.5">
                Key Hardware / Design Features:
              </div>
              <ul className="text-xs space-y-1 text-[#d4d4d8]">
                {selectedProduct.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-[#27272a] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#fafafa] bg-[#27272a] hover:bg-[#3f3f46] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onAnalyzeProduct(selectedProduct.name, selectedProduct.category);
                  setSelectedProduct(null);
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
              >
                Run AI Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
