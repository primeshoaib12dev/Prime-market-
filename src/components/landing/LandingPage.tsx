import React from 'react';
import {
  Sparkles,
  TrendingUp,
  FileText,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Search,
  Zap,
  Target,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { NavView } from '../ui/Navbar';
import { OpportunityBadge } from '../ui/OpportunityBadge';

interface LandingPageProps {
  onNavigate: (view: NavView) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#27272a] bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#18181b] text-indigo-400 border border-[#27272a] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Next-Gen Marketplace Intelligence SaaS</span>
              <span className="w-1 h-1 rounded-full bg-indigo-400" />
              <span className="text-[#71717a]">Zero Signup Required</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#fafafa] leading-[1.12]">
              Turn Product Data Into Smarter Decisions
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-[#a1a1aa] font-normal leading-relaxed max-w-2xl mx-auto">
              Prime Market uses AI-powered insights to help sellers discover opportunities, analyze products, and create better listings.
            </p>

            {/* CTA Buttons - Strictly No Login / No Signup */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                id="hero-cta-analyze"
                onClick={() => onNavigate('analyzer')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all cursor-pointer group"
              >
                <span>Start Analyzing</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                id="hero-cta-features"
                onClick={() => {
                  const el = document.getElementById('features-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onNavigate('dashboard');
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base bg-[#18181b] hover:bg-[#27272a] text-[#fafafa] border border-[#27272a] transition-all cursor-pointer"
              >
                <span>Explore Features</span>
                <ArrowUpRight className="w-4 h-4 text-[#71717a]" />
              </button>
            </div>

            {/* Fast reassurance flags */}
            <div className="mt-8 pt-6 border-t border-[#27272a] flex flex-wrap items-center justify-center gap-6 text-xs text-[#71717a]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Access • No Credit Card</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Local Session Persistence</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gemini AI Engine Ready</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero SaaS Dashboard Preview Card */}
          <div className="mt-14 max-w-5xl mx-auto rounded-xl border border-[#27272a] bg-[#18181b] shadow-2xl overflow-hidden">
            {/* Mock Top bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#09090b] border-b border-[#27272a] text-xs text-[#71717a]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-[#71717a]">prime-market.app/dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#27272a] text-indigo-400 font-medium border border-[#3f3f46]">
                  Live Intelligence Engine
                </span>
              </div>
            </div>

            {/* Card Content Interior */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                  <div className="text-xs text-[#71717a] font-medium">Opportunity Score</div>
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-emerald-400">88</span>
                    <span className="text-xs text-[#71717a]">/100</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1">Excellent Potential</div>
                </div>

                <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                  <div className="text-xs text-[#71717a] font-medium">Market Demand</div>
                  <div className="mt-1.5 text-2xl font-bold text-[#fafafa]">High</div>
                  <div className="text-[11px] text-indigo-400 font-semibold mt-1">+42.5% Search Spike</div>
                </div>

                <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                  <div className="text-xs text-[#71717a] font-medium">Competition Level</div>
                  <div className="mt-1.5 text-2xl font-bold text-[#fafafa]">Medium</div>
                  <div className="text-[11px] text-amber-400 font-semibold mt-1">Fragmented Sellers</div>
                </div>

                <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                  <div className="text-xs text-[#71717a] font-medium">Target Price Band</div>
                  <div className="mt-1.5 text-xl font-bold text-[#fafafa] font-mono">₹1,999 – ₹2,499</div>
                  <div className="text-[11px] text-[#71717a] mt-1">58% Est. Margin</div>
                </div>
              </div>

              {/* Sample Product Analysis Snippet */}
              <div className="p-4 rounded-xl border border-[#27272a] bg-[#09090b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-600 text-white">Featured Analysis</span>
                    <span className="font-semibold text-[#fafafa] text-sm">AcousticPulse Pro ANC Headphones</span>
                  </div>
                  <p className="text-xs text-[#a1a1aa] mt-1 line-clamp-1">
                    Strong buyer search intent in consumer audio with low saturation in the ₹2,000-₹2,500 price segment.
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onNavigate('analyzer')}
                    className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer"
                  >
                    View Analysis
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('generator')}
                    className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#18181b] border border-[#27272a] text-[#fafafa] hover:bg-[#27272a] cursor-pointer"
                  >
                    Generate Listing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-20 bg-[#09090b] border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
              Comprehensive SaaS Toolkit
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-[#fafafa] tracking-tight">
              Four Core Pillars of Marketplace Success
            </p>
            <p className="mt-3 text-base text-[#a1a1aa]">
              Everything high-velocity marketplace sellers need to dominate search rankings and maximize margins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1: AI Product Analyzer */}
            <div className="p-8 rounded-xl border border-[#27272a] bg-[#18181b] hover:border-indigo-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#27272a] text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#fafafa] flex items-center gap-2">
                <span>AI Product Analyzer</span>
              </h3>
              <p className="mt-2 text-sm text-[#a1a1aa] leading-relaxed">
                Enter any product concept, pricing, and specs to evaluate market viability before investing capital.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-medium text-[#d4d4d8]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Product Summary</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Target Audience</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Key Strengths & Flaws</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Suggested Price Band</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Competition Level</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Market Opportunity</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#27272a]">
                <button
                  type="button"
                  onClick={() => onNavigate('analyzer')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                >
                  <span>Launch Product Analyzer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Feature 2: AI Listing Generator */}
            <div className="p-8 rounded-xl border border-[#27272a] bg-[#18181b] hover:border-indigo-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#27272a] text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#fafafa] flex items-center gap-2">
                <span>AI Listing Generator</span>
              </h3>
              <p className="mt-2 text-sm text-[#a1a1aa] leading-relaxed">
                Generate high-converting catalog listings engineered specifically for Amazon, Flipkart, and Shopify search algorithms.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-medium text-[#d4d4d8]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Search-Optimized Title</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Full Structured Narrative</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>High-Intent SEO Keywords</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Product Hashtags & Metadata</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Short Mobile Highlights</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Social Ad Marketing Copy</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#27272a]">
                <button
                  type="button"
                  onClick={() => onNavigate('generator')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-400 hover:text-purple-300 cursor-pointer"
                >
                  <span>Launch Listing Generator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Feature 3: Market Intelligence */}
            <div className="p-8 rounded-xl border border-[#27272a] bg-[#18181b] hover:border-indigo-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#27272a] text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#fafafa] flex items-center gap-2">
                <span>Market Intelligence</span>
              </h3>
              <p className="mt-2 text-sm text-[#a1a1aa] leading-relaxed">
                Spot fast-moving niches before the competition arrives. Track demand velocity, pricing pressure, and monthly trajectories.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-medium text-[#d4d4d8]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Market Demand Index</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Competitor Concentration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Estimated % Growth</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Trending Categories</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Opportunity Score (0-100)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive Recharts</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#27272a]">
                <button
                  type="button"
                  onClick={() => onNavigate('trends')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                >
                  <span>Explore Market Trends</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Feature 4: AI Recommendations */}
            <div className="p-8 rounded-xl border border-[#27272a] bg-[#18181b] hover:border-indigo-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#27272a] text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#fafafa] flex items-center gap-2">
                <span>AI Recommendations</span>
              </h3>
              <p className="mt-2 text-sm text-[#a1a1aa] leading-relaxed">
                Receive prioritized, tactical playbooks tailored to your product catalog to fix conversion leaks and boost profitability.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-medium text-[#d4d4d8]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Improve Product Titles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dynamic Price Optimization</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Niche Audience Targeting</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bullet & Narrative Tuning</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Missing Feature Additions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>High-Impact Prioritization</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#27272a]">
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <span>Open Executive Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Spotlight */}
      <section className="py-16 bg-[#09090b] border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#71717a]">
                Coverage Verticals
              </h3>
              <p className="text-2xl font-bold text-[#fafafa] mt-1">
                Optimized for Top Marketplace Segments
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('trends')}
              className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all category trends</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { name: 'Electronics', growth: '+42.5%', score: 86 },
              { name: 'Gaming', growth: '+58.2%', score: 92 },
              { name: 'Fitness', growth: '+47.3%', score: 89 },
              { name: 'Home & Kitchen', growth: '+39.8%', score: 85 },
              { name: 'Beauty', growth: '+38.0%', score: 77 },
              { name: 'Accessories', growth: '+31.0%', score: 81 },
              { name: 'Fashion', growth: '+24.5%', score: 67 },
            ].map((cat) => (
              <div
                key={cat.name}
                className="p-3.5 rounded-xl border border-[#27272a] bg-[#18181b] hover:border-indigo-500/50 transition-colors"
              >
                <div className="text-xs font-semibold text-[#fafafa] truncate">
                  {cat.name}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-bold">
                    {cat.growth}
                  </span>
                  <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-[#27272a] text-[#fafafa] border border-[#3f3f46]">
                    {cat.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner (No Sign Up / No Login) */}
      <section className="py-20 bg-[#18181b] border-b border-[#27272a] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#fafafa]">
            Ready to Supercharge Your Marketplace Strategy?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#a1a1aa] max-w-xl mx-auto">
            Zero friction. No signups, no paywalls, and no passwords. Start running AI product analyses right this second.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              id="footer-start-analyzing-btn"
              onClick={() => onNavigate('analyzer')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Start Free Product Analysis
            </button>
            <button
              type="button"
              id="footer-explore-dashboard-btn"
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-[#fafafa] bg-[#27272a] hover:bg-[#3f3f46] border border-[#3f3f46] transition-all cursor-pointer"
            >
              Open Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#09090b] text-[#71717a] text-xs border-t border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-[#fafafa] text-sm">Prime Market</span>
            <span>— AI Marketplace Intelligence SaaS</span>
          </div>
          <div className="flex items-center gap-4 text-[#71717a]">
            <span>Portfolio Project</span>
            <span>•</span>
            <span>TypeScript + React + Express</span>
            <span>•</span>
            <span>LocalStorage Persistence</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
