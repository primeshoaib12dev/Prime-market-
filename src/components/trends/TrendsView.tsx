import React, { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Search,
  Sparkles,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  ChevronRight,
  Flame,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import { OpportunityBadge } from '../ui/OpportunityBadge';
import { MARKET_TRENDS, FAST_GROWING_PRODUCTS } from '../../data/trends';
import { ProductCategory, ProductAnalysis } from '../../types';
import { NavView } from '../ui/Navbar';

interface TrendsViewProps {
  onNavigate: (view: NavView) => void;
  onAnalyzeProduct: (name: string, category: ProductCategory) => void;
}

export const TrendsView: React.FC<TrendsViewProps> = ({
  onNavigate,
  onAnalyzeProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortField, setSortField] = useState<'growth' | 'demand' | 'opportunity'>('growth');

  const filteredTrends = MARKET_TRENDS.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  );

  const filteredProducts = FAST_GROWING_PRODUCTS.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  ).sort((a, b) => {
    if (sortField === 'growth') return b.growthPercentage - a.growthPercentage;
    if (sortField === 'demand') return b.demandScore - a.demandScore;
    return b.opportunityScore - a.opportunityScore;
  });

  const scatterData = MARKET_TRENDS.map((t) => ({
    name: t.category,
    demand: t.demandScore,
    competition: t.competitionScore,
    opportunity: t.opportunityScore,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-[#27272a] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#fafafa] tracking-tight">
              Market Intelligence & Trends
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#18181b] text-emerald-400 border border-[#27272a]">
              Live Macro Index
            </span>
          </div>
          <p className="text-sm text-[#71717a] mt-1">
            Detect category inflection points, competitive saturation, and high-velocity niche opportunities.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#71717a]" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-medium bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-1.5 text-[#fafafa] focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All 7 Categories</option>
            {MARKET_TRENDS.map((t) => (
              <option key={t.category} value={t.category}>
                {t.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 3 High Growth Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MARKET_TRENDS.slice(0, 3).map((trend, i) => (
          <div
            key={trend.category}
            className="p-5 rounded-xl bg-[#18181b] border border-[#27272a] relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Rank #{i + 1} Vertical
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>+{trend.growthPercentage}% YoY</span>
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#fafafa] mt-2">
              {trend.category}
            </h3>

            <div className="mt-4 grid grid-cols-3 gap-2 py-3 border-y border-[#27272a] text-center">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#71717a]">Demand</span>
                <div className="text-base font-bold text-[#fafafa] mt-0.5">
                  {trend.demandScore}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#71717a]">Competition</span>
                <div className="text-base font-bold text-[#fafafa] mt-0.5">
                  {trend.competitionScore}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#71717a]">Opp Score</span>
                <div className="text-base font-bold text-emerald-400 mt-0.5">
                  {trend.opportunityScore}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <span className="text-[11px] font-semibold text-[#71717a]">Trending Queries:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {(trend.topSearchQueries || trend.topKeywords).slice(0, 3).map((q) => (
                  <span
                    key={q}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#27272a] text-[#fafafa] border border-[#3f3f46]"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Category Comparison Matrix */}
      <div className="p-6 rounded-xl bg-[#18181b] border border-[#27272a]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-[#fafafa] text-base">
              Marketplace Category Index Comparison
            </h3>
            <p className="text-xs text-[#71717a]">
              Demand vs Competition vs Calculated Opportunity Index
            </p>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredTrends} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.6} />
              <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#71717a' }} interval={0} angle={-20} textAnchor="end" stroke="#27272a" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#71717a' }} stroke="#27272a" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#09090b',
                  borderRadius: '8px',
                  border: '1px solid #27272a',
                  color: '#fafafa',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px', color: '#a1a1aa' }} />
              <Bar dataKey="demandScore" name="Demand Index" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="competitionScore" name="Competition Index" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="opportunityScore" name="Opportunity Score" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fast Growing Products Table */}
      <div className="p-6 rounded-xl bg-[#18181b] border border-[#27272a]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-[#27272a]">
          <div>
            <h3 className="font-bold text-[#fafafa] text-base">
              Fast-Growing Niche Products
            </h3>
            <p className="text-xs text-[#71717a]">
              Ranked products exhibiting breakthrough volume and attractive margin profiles
            </p>
          </div>

          {/* Sort controls */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#71717a]">Sort by:</span>
            <button
              type="button"
              onClick={() => setSortField('growth')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                sortField === 'growth'
                  ? 'bg-[#27272a] text-[#fafafa] border border-[#3f3f46]'
                  : 'text-[#71717a] hover:bg-[#27272a]'
              }`}
            >
              Growth %
            </button>
            <button
              type="button"
              onClick={() => setSortField('demand')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                sortField === 'demand'
                  ? 'bg-[#27272a] text-[#fafafa] border border-[#3f3f46]'
                  : 'text-[#71717a] hover:bg-[#27272a]'
              }`}
            >
              Demand
            </button>
            <button
              type="button"
              onClick={() => setSortField('opportunity')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                sortField === 'opportunity'
                  ? 'bg-[#27272a] text-[#fafafa] border border-[#3f3f46]'
                  : 'text-[#71717a] hover:bg-[#27272a]'
              }`}
            >
              Opp Score
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#27272a] text-[#71717a] uppercase font-semibold">
                <th className="pb-3 pr-4">Product Concept</th>
                <th className="pb-3 px-4">Category</th>
                <th className="pb-3 px-4">Avg Price</th>
                <th className="pb-3 px-4">YoY Growth</th>
                <th className="pb-3 px-4">Demand</th>
                <th className="pb-3 px-4">Competition</th>
                <th className="pb-3 px-4">Opportunity</th>
                <th className="pb-3 pl-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a]">
              {filteredProducts.map((prod) => (
                <tr key={prod.name} className="hover:bg-[#27272a]/40 transition-colors">
                  <td className="py-3.5 pr-4 font-bold text-[#fafafa]">
                    {prod.name}
                  </td>
                  <td className="py-3.5 px-4 text-[#a1a1aa]">
                    <span className="px-2 py-0.5 rounded bg-[#27272a] text-[#fafafa] text-[11px] border border-[#3f3f46]">
                      {prod.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-[#fafafa]">
                    ₹{(prod.currentPrice || prod.averagePrice || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">
                    +{prod.growthPercentage}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#fafafa]">
                      {prod.demandScore}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#71717a]">
                    {prod.competitionScore}/100
                  </td>
                  <td className="py-3.5 px-4">
                    <OpportunityBadge score={prod.opportunityScore} size="sm" />
                  </td>
                  <td className="py-3.5 pl-4 text-right">
                    <button
                      type="button"
                      onClick={() => onAnalyzeProduct(prod.name, prod.category)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#09090b] hover:bg-[#27272a] text-indigo-400 border border-[#27272a] transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span>Analyze</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
