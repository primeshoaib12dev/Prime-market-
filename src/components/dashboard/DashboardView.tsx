import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  TrendingUp,
  FileText,
  BarChart3,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ChevronRight,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { NavView } from '../ui/Navbar';
import { OpportunityBadge } from '../ui/OpportunityBadge';
import { ProductAnalysis, ProductCategory } from '../../types';
import { MARKET_TRENDS } from '../../data/trends';
import { formatDate } from '../../lib/utils';

interface DashboardViewProps {
  onNavigate: (view: NavView) => void;
  savedAnalyses: ProductAnalysis[];
  onSelectAnalysis: (analysis: ProductAnalysis) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  savedAnalyses,
  onSelectAnalysis,
}) => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Stats calculation
  const stats = useMemo(() => {
    const baseCount = 142 + savedAnalyses.length;
    const generationsCount = 384 + Math.round(savedAnalyses.length * 2.5);
    const opportunitiesCount = 29 + Math.round(savedAnalyses.filter((s) => s.opportunityScore.overall >= 80).length);
    
    // Average score
    const totalScore = savedAnalyses.reduce((acc, curr) => acc + curr.opportunityScore.overall, 81 * 10);
    const avgScore = Math.round(totalScore / (10 + savedAnalyses.length));

    return {
      productsAnalyzed: baseCount,
      aiGenerations: generationsCount,
      marketOpportunities: opportunitiesCount,
      averageScore: avgScore,
    };
  }, [savedAnalyses]);

  // Category growth chart data
  const categoryChartData = useMemo(() => {
    return MARKET_TRENDS.map((t) => ({
      category: t.category,
      demand: t.demandScore,
      competition: t.competitionScore,
      opportunity: t.opportunityScore,
      growth: t.growthPercentage,
    })).filter((item) => selectedCategory === 'All' || item.category === selectedCategory);
  }, [selectedCategory]);

  // Monthly trends trajectory chart data
  const monthlyTimelineData = [
    { month: 'Oct', analyzed: 85, generations: 190, opportunities: 14 },
    { month: 'Nov', analyzed: 110, generations: 245, opportunities: 19 },
    { month: 'Dec', analyzed: 145, generations: 320, opportunities: 26 },
    { month: 'Jan', analyzed: 125, generations: 280, opportunities: 22 },
    { month: 'Feb', analyzed: 160, generations: 370, opportunities: 31 },
    { month: 'Mar', analyzed: 175, generations: 410, opportunities: 35 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#fafafa] tracking-tight">
              Marketplace Intelligence Dashboard
            </h1>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-[#18181b] text-emerald-400 border border-[#27272a]">
              Live Real-Time Sync
            </span>
          </div>
          <p className="text-sm text-[#71717a] mt-1">
            Real-time catalog analytics, demand velocity, and AI opportunity scoring.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            id="dash-analyze-shortcut"
            onClick={() => onNavigate('analyzer')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze Product</span>
          </button>
          <button
            type="button"
            id="dash-generator-shortcut"
            onClick={() => onNavigate('generator')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#18181b] border border-[#27272a] text-[#fafafa] hover:bg-[#27272a] transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>AI Listing Generator</span>
          </button>
        </div>
      </div>

      {/* 4 Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Products Analyzed */}
        <div className="p-5 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#71717a] mb-1 font-medium">
              Products Analyzed
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#27272a] text-indigo-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#fafafa] tracking-tight">
              {stats.productsAnalyzed.toLocaleString()}
            </span>
          </div>
          <p className="text-emerald-500 text-[10px] font-medium mt-2">
            +12.5% from last week
          </p>
        </div>

        {/* Card 2: AI Generations */}
        <div className="p-5 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#71717a] mb-1 font-medium">
              AI Generations
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#27272a] text-purple-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#fafafa] tracking-tight">
              {stats.aiGenerations.toLocaleString()}
            </span>
          </div>
          <p className="text-purple-400 text-[10px] font-medium mt-2">
            +32.1% generation velocity
          </p>
        </div>

        {/* Card 3: Market Opportunities */}
        <div className="p-5 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#71717a] mb-1 font-medium">
              High-Yield Opportunities
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#27272a] text-emerald-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#fafafa] tracking-tight">
              {stats.marketOpportunities}
            </span>
          </div>
          <p className="text-emerald-500 text-[10px] font-medium mt-2">
            High demand • Low competition
          </p>
        </div>

        {/* Card 4: Average Opportunity Score */}
        <div className="p-5 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#71717a] mb-1 font-medium">
              Avg Opportunity Score
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#27272a] text-indigo-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#fafafa] tracking-tight">
              {stats.averageScore}
            </span>
            <span className="text-xs text-[#71717a]">/ 100</span>
          </div>
          {/* Storage/Score Progress Bar from theme design */}
          <div className="w-full bg-[#27272a] h-1.5 rounded-full overflow-hidden mt-3">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.averageScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chart Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#18181b] border border-[#27272a]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#71717a]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
            Category Filter:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-medium bg-[#09090b] border border-[#27272a] rounded-lg px-2.5 py-1.5 text-[#fafafa] focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            {MARKET_TRENDS.map((t) => (
              <option key={t.category} value={t.category}>
                {t.category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 bg-[#09090b] p-1 rounded-lg border border-[#27272a]">
          {(['7D', '30D', '90D', '1Y'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                timeRange === r
                  ? 'bg-[#27272a] text-white shadow-xs'
                  : 'text-[#71717a] hover:text-[#fafafa]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Recharts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Market Demand vs Competition by Category */}
        <div className="p-6 rounded-xl bg-[#18181b] border border-[#27272a]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-[#fafafa] text-base">
                Market Demand vs Competition
              </h3>
              <p className="text-xs text-[#71717a]">
                Category index comparison (Demand vs Saturation)
              </p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#27272a] text-[#a1a1aa] font-mono border border-[#3f3f46]">
              Score 0-100
            </span>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.6} />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#a1a1aa' }} stroke="#27272a" interval={0} angle={-25} textAnchor="end" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#a1a1aa' }} stroke="#27272a" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderRadius: '8px',
                    border: '1px solid #27272a',
                    color: '#fafafa',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="demand" name="Demand Index" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="competition" name="Competition Index" fill="#eab308" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category Growth Rate (%) */}
        <div className="p-6 rounded-xl bg-[#18181b] border border-[#27272a]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-[#fafafa] text-base">
                Category Growth Trajectory (% YoY)
              </h3>
              <p className="text-xs text-[#71717a]">
                Year-over-year search volume and buyer intent expansion
              </p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#27272a] text-emerald-400 font-semibold border border-[#3f3f46]">
              Fastest: Gaming (+58%)
            </span>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.6} />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#a1a1aa' }} stroke="#27272a" interval={0} angle={-25} textAnchor="end" />
                <YAxis tick={{ fontSize: 11, fill: '#a1a1aa' }} stroke="#27272a" unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderRadius: '8px',
                    border: '1px solid #27272a',
                    color: '#fafafa',
                    fontSize: '12px',
                  }}
                  formatter={(val: unknown) => [`${val}%`, 'Growth Rate']}
                />
                <Area
                  type="monotone"
                  dataKey="growth"
                  name="YoY Growth"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#growthGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Monthly Analysis Volume & Opportunities */}
        <div className="p-6 rounded-xl bg-[#18181b] border border-[#27272a] lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div>
              <h3 className="font-bold text-[#fafafa] text-base">
                Platform Activity & Opportunity Discovery Rate
              </h3>
              <p className="text-xs text-[#71717a]">
                Monthly trajectory of evaluated products and flagged high-yield opportunities
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#71717a]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span>Analyses Run</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>AI Generations</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>High Opportunities</span>
              </span>
            </div>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.6} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#a1a1aa' }} stroke="#27272a" />
                <YAxis tick={{ fontSize: 11, fill: '#a1a1aa' }} stroke="#27272a" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderRadius: '8px',
                    border: '1px solid #27272a',
                    color: '#fafafa',
                    fontSize: '12px',
                  }}
                />
                <Line type="monotone" dataKey="analyzed" name="Products Analyzed" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="generations" name="AI Generations" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="opportunities" name="High Yield Opps" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Analyses Feed Table */}
      <div className="p-6 rounded-xl bg-[#18181b] border border-[#27272a]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#27272a]">
          <div>
            <h3 className="font-bold text-[#fafafa] text-base">
              Recent Product Analyses
            </h3>
            <p className="text-xs text-[#71717a]">
              Locally saved and evaluated marketplace products
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('saved')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Saved ({savedAnalyses.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {savedAnalyses.length === 0 ? (
          <div className="py-12 text-center">
            <Sparkles className="w-8 h-8 text-[#71717a] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#fafafa]">
              No recent analyses yet
            </p>
            <p className="text-xs text-[#71717a] mt-1 max-w-sm mx-auto">
              Run your first product analysis to see real-time opportunity breakdowns here.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('analyzer')}
              className="mt-4 px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer"
            >
              Analyze a Product Now
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#27272a] text-[#71717a] uppercase font-semibold">
                  <th className="pb-3 pr-4">Product Name</th>
                  <th className="pb-3 px-4">Category</th>
                  <th className="pb-3 px-4">Demand</th>
                  <th className="pb-3 px-4">Competition</th>
                  <th className="pb-3 px-4">Opportunity Score</th>
                  <th className="pb-3 px-4">Analyzed</th>
                  <th className="pb-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {savedAnalyses.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-[#27272a]/40 transition-colors group">
                    <td className="py-3.5 pr-4 font-semibold text-[#fafafa] max-w-[220px] truncate">
                      {item.productName}
                    </td>
                    <td className="py-3.5 px-4 text-[#a1a1aa]">
                      <span className="px-2 py-0.5 rounded bg-[#27272a] text-[#a1a1aa] border border-[#3f3f46] text-[11px] font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-emerald-400">
                        {item.marketDemand}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#a1a1aa]">
                      {item.competitionLevel}
                    </td>
                    <td className="py-3.5 px-4">
                      <OpportunityBadge score={item.opportunityScore.overall} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-[#71717a]">
                      {formatDate(item.analyzedAt)}
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <button
                        type="button"
                        onClick={() => onSelectAnalysis(item)}
                        className="px-2.5 py-1 rounded text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-[#27272a] transition-colors cursor-pointer"
                      >
                        View Full Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
