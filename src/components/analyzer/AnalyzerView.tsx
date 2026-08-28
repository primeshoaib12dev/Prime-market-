import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Bookmark,
  Share2,
  ArrowRight,
  RefreshCw,
  FileText,
  DollarSign,
  Users,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Layers,
  Plus,
  X,
  Copy,
  Printer,
  FileJson,
} from 'lucide-react';
import { OpportunityBadge } from '../ui/OpportunityBadge';
import { ExportModal } from '../ui/ExportModal';
import { ProductAnalysis, ProductCategory } from '../../types';
import { PRESET_ANALYSIS_EXAMPLES, AnalyzerInput } from '../../data/demo-ai';
import { aiService } from '../../lib/ai';
import { copyToClipboard, formatCurrency } from '../../lib/utils';
import { CATEGORY_LIST } from '../../data/trends';

interface AnalyzerViewProps {
  onSaveAnalysis: (analysis: ProductAnalysis) => void;
  isSaved: (id: string) => boolean;
  onSendToListingGenerator: (product: {
    productName: string;
    category: ProductCategory;
    features: string[];
    targetCustomer: string;
  }) => void;
  prefillAnalysis?: ProductAnalysis | null;
}

export const AnalyzerView: React.FC<AnalyzerViewProps> = ({
  onSaveAnalysis,
  isSaved,
  onSendToListingGenerator,
  prefillAnalysis,
}) => {
  // Form State
  const [productName, setProductName] = useState(prefillAnalysis?.productName || '');
  const [category, setCategory] = useState<ProductCategory>(prefillAnalysis?.category || 'Electronics');
  const [price, setPrice] = useState<number | string>(prefillAnalysis?.originalPrice || 2499);
  const [currency, setCurrency] = useState(prefillAnalysis?.currency || '₹');
  const [description, setDescription] = useState(prefillAnalysis?.description || '');
  const [targetAudience, setTargetAudience] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [features, setFeatures] = useState<string[]>(
    prefillAnalysis?.features || ['40dB Hybrid Active Noise Cancellation', '45H Battery Life', 'Multipoint Bluetooth 5.3']
  );

  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [analysisResult, setAnalysisResult] = useState<ProductAnalysis | null>(prefillAnalysis || null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Add Feature Tag
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      if (!features.includes(featureInput.trim())) {
        setFeatures([...features, featureInput.trim()]);
      }
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (feat: string) => {
    setFeatures(features.filter((f) => f !== feat));
  };

  // Load Preset
  const handleLoadPreset = (example: typeof PRESET_ANALYSIS_EXAMPLES[0]) => {
    setProductName(example.data.productName);
    setCategory(example.data.category);
    setPrice(example.data.price);
    setDescription(example.data.description);
    setTargetAudience(example.data.targetAudience || '');
    setFeatures(example.data.features);
    setErrorMsg('');
  };

  // Run Analysis
  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!productName.trim()) {
      setErrorMsg('Please enter a valid product name to begin analysis.');
      return;
    }
    if (Number(price) <= 0) {
      setErrorMsg('Please enter a realistic product price.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);
    setLoadingStep('Connecting to Prime Market Intelligence engine...');

    try {
      const input: AnalyzerInput = {
        productName: productName.trim(),
        category,
        price: Number(price) || 1999,
        currency,
        description: description.trim(),
        targetAudience: targetAudience.trim(),
        features: features.length > 0 ? features : ['High durability', 'Modern aesthetic', 'Reliable performance'],
      };

      const result = await aiService.analyzeProduct(input, (step) => {
        setLoadingStep(step);
      });

      setAnalysisResult(result);
    } catch (err: unknown) {
      console.error('Analysis failed', err);
      setErrorMsg('Analysis failed. Please check your network or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickCopy = async () => {
    if (!analysisResult) return;
    const summary = `Product: ${analysisResult.productName}\nScore: ${analysisResult.opportunityScore.overall}/100\nDemand: ${analysisResult.marketDemand}\nCompetition: ${analysisResult.competitionLevel}\nRecommended Price: ${analysisResult.currency}${analysisResult.recommendedPriceRange.min} - ${analysisResult.currency}${analysisResult.recommendedPriceRange.max}\nSummary: ${analysisResult.productSummary}`;
    const ok = await copyToClipboard(summary);
    if (ok) {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="pb-6 border-b border-[#27272a] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#fafafa] tracking-tight">
              AI Product Analyzer
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#18181b] text-indigo-400 border border-[#27272a]">
              Deep Opportunity Audit
            </span>
          </div>
          <p className="text-sm text-[#71717a] mt-1">
            Simulate market demand, identify competitive vulnerabilities, and calculate optimal price elasticity.
          </p>
        </div>

        {/* 1-Click Demo Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-[#71717a] mr-1 hidden sm:inline">
            Quick Demos:
          </span>
          {PRESET_ANALYSIS_EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => handleLoadPreset(ex)}
              className="text-xs px-2.5 py-1 rounded-lg border border-[#27272a] bg-[#18181b] text-[#fafafa] hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-[#18181b] border border-[#27272a]">
            <h2 className="text-base font-bold text-[#fafafa] mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Product Specifications</span>
            </h2>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 flex items-center gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleAnalyze} className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="analyzer-product-name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. AcousticPulse ANC Wireless Headphones"
                  className="w-full text-sm rounded-lg border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-[#fafafa] placeholder:text-[#71717a] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Category & Price Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#a1a1aa] mb-1">
                    Category *
                  </label>
                  <select
                    id="analyzer-category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full text-sm rounded-lg border border-[#27272a] bg-[#09090b] px-3 py-2.5 text-[#fafafa] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {CATEGORY_LIST.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#a1a1aa] mb-1">
                    Target Price ({currency}) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="analyzer-price-input"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="2499"
                      className="w-full text-sm rounded-lg border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-[#fafafa] placeholder:text-[#71717a] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">
                  Product Description
                </label>
                <textarea
                  id="analyzer-description-input"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline key value propositions, materials, and form factor..."
                  className="w-full text-sm rounded-lg border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-[#fafafa] placeholder:text-[#71717a] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Target Audience Note */}
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  id="analyzer-target-audience"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Daily commuters, remote software engineers"
                  className="w-full text-sm rounded-lg border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-[#fafafa] placeholder:text-[#71717a] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Product Features Tag Input */}
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">
                  Product Features
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    placeholder="Add a standout feature and press Enter"
                    className="flex-1 text-sm rounded-lg border border-[#27272a] bg-[#09090b] px-3.5 py-2 text-[#fafafa] placeholder:text-[#71717a] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-2 rounded-lg bg-[#27272a] text-[#fafafa] hover:bg-[#3f3f46] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#27272a] text-[#fafafa] border border-[#3f3f46]"
                      >
                        <span>{feat}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(feat)}
                          className="hover:text-rose-400 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Analyze Button */}
              <button
                type="submit"
                id="analyzer-submit-btn"
                disabled={isLoading}
                className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-bold text-sm bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white shadow-xs transition-colors cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Marketplace Opportunity...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Product</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: AI Analysis Result Output (7 cols) */}
        <div className="lg:col-span-7">
          {isLoading ? (
            /* Loading State Skeleton */
            <div className="p-8 rounded-xl bg-[#18181b] border border-[#27272a] space-y-6 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center animate-spin">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-[#fafafa] text-base">
                    Generating Marketplace Audit
                  </h3>
                  <p className="text-xs text-indigo-400 font-medium mt-0.5">
                    {loadingStep || 'Crunching competitor matrices...'}
                  </p>
                </div>
              </div>

              {/* Skeleton cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-[#27272a] rounded-lg" />
                ))}
              </div>
              <div className="h-24 bg-[#27272a] rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 bg-[#27272a] rounded w-3/4" />
                <div className="h-4 bg-[#27272a] rounded w-1/2" />
              </div>
            </div>
          ) : analysisResult ? (
            /* Complete Professional AI Result Card */
            <div className="p-6 sm:p-8 rounded-xl bg-[#18181b] border border-[#27272a] space-y-6">
              {/* Header result with actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#27272a]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#27272a] text-indigo-400 border border-[#3f3f46]">
                      {analysisResult.category}
                    </span>
                    <span className="text-xs text-[#71717a]">
                      Target: {analysisResult.currency}{analysisResult.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#fafafa] mt-1">
                    {analysisResult.productName}
                  </h2>
                </div>

                {/* Actions Toolbar */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    id="analyzer-save-btn"
                    onClick={() => onSaveAnalysis(analysisResult)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      isSaved(analysisResult.id)
                        ? 'bg-[#18181b] border-emerald-500/50 text-emerald-400'
                        : 'bg-[#18181b] border-[#27272a] text-[#fafafa] hover:bg-[#27272a]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isSaved(analysisResult.id) ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    type="button"
                    id="analyzer-export-btn"
                    onClick={() => setIsExportOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#18181b] border border-[#27272a] text-[#fafafa] hover:bg-[#27272a] transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Export</span>
                  </button>

                  <button
                    type="button"
                    id="analyzer-to-listing-btn"
                    onClick={() => {
                      onSendToListingGenerator({
                        productName: analysisResult.productName,
                        category: analysisResult.category,
                        features: analysisResult.features,
                        targetCustomer: analysisResult.targetAudience[0]?.segment || 'discerning buyers',
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Generate Listing</span>
                  </button>
                </div>
              </div>

              {/* Core Output Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Opportunity Score */}
                <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                  <span className="text-xs font-medium text-[#71717a] uppercase">
                    Opportunity Score
                  </span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-indigo-400">
                      {analysisResult.opportunityScore.overall}
                    </span>
                    <span className="text-xs text-[#71717a]">/ 100</span>
                  </div>
                  <div className="mt-1 text-[11px] font-bold text-emerald-400">
                    {analysisResult.opportunityScore.level}
                  </div>
                </div>

                {/* 2. Market Demand */}
                <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                  <span className="text-xs font-medium text-[#71717a] uppercase">
                    Market Demand
                  </span>
                  <div className="mt-1 text-2xl font-bold text-[#fafafa]">
                    {analysisResult.marketDemand}
                  </div>
                  <div className="mt-1 text-[11px] text-[#71717a]">
                    High Search Velocity
                  </div>
                </div>

                {/* 3. Competition */}
                <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                  <span className="text-xs font-medium text-[#71717a] uppercase">
                    Competition
                  </span>
                  <div className="mt-1 text-2xl font-bold text-[#fafafa]">
                    {analysisResult.competitionLevel}
                  </div>
                  <div className="mt-1 text-[11px] text-amber-400 font-medium">
                    Manageable Entry
                  </div>
                </div>

                {/* 4. Recommended Price */}
                <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                  <span className="text-xs font-medium text-[#71717a] uppercase">
                    Recommended Price
                  </span>
                  <div className="mt-1 text-base font-bold text-[#fafafa]">
                    {analysisResult.currency}{analysisResult.recommendedPriceRange.min.toLocaleString('en-IN')} – {analysisResult.currency}{analysisResult.recommendedPriceRange.max.toLocaleString('en-IN')}
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-400 font-medium">
                    {analysisResult.recommendedPriceRange.marginEstimate}
                  </div>
                </div>
              </div>

              {/* Product Summary */}
              <div className="p-4 rounded-xl bg-[#09090b] border border-[#27272a]">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1.5">
                  Executive Product Summary
                </div>
                <p className="text-sm text-[#d4d4d8] leading-relaxed">
                  {analysisResult.productSummary}
                </p>
              </div>

              {/* Target Audience Segments */}
              <div>
                <h3 className="text-sm font-bold text-[#fafafa] mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Target Audience Personas</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analysisResult.targetAudience.map((aud, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-[#27272a] bg-[#09090b]"
                    >
                      <div className="font-bold text-xs text-indigo-400">
                        {aud.segment}
                      </div>
                      <div className="text-[11px] text-[#71717a] mt-0.5">
                        {aud.demographics}
                      </div>
                      <p className="text-xs text-[#d4d4d8] mt-2 font-medium">
                        "{aud.buyingMotivation}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses SWOT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="p-4 rounded-xl border border-[#27272a] bg-[#09090b]">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-400 mb-2 uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Competitive Strengths</span>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.strengths.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#d4d4d8]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="p-4 rounded-xl border border-[#27272a] bg-[#09090b]">
                  <div className="flex items-center gap-2 font-bold text-xs text-amber-400 mb-2 uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Risks & Vulnerabilities</span>
                  </div>
                  <ul className="space-y-2">
                    {analysisResult.weaknesses.map((weak, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#d4d4d8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                        <span>{weak}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actionable AI Recommendations */}
              <div>
                <h3 className="text-sm font-bold text-[#fafafa] mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Actionable AI Recommendations</span>
                </h3>
                <div className="space-y-2.5">
                  {analysisResult.recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-3 rounded-xl border border-[#27272a] bg-[#09090b] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                              rec.impact === 'High'
                                ? 'bg-rose-950/60 text-rose-400 border-rose-800/60'
                                : 'bg-blue-950/60 text-blue-400 border-blue-800/60'
                            }`}
                          >
                            {rec.impact} Priority
                          </span>
                          <span className="font-semibold text-xs text-[#fafafa]">
                            {rec.title}
                          </span>
                        </div>
                        <p className="text-xs text-[#a1a1aa] mt-1">
                          {rec.description}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-[#71717a] shrink-0">
                        #{rec.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Empty Prompt State */
            <div className="p-12 rounded-xl bg-[#18181b] border border-[#27272a] text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#27272a] text-indigo-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#fafafa]">
                Enter Product Details to Analyze
              </h3>
              <p className="text-xs text-[#71717a] max-w-sm mx-auto">
                Fill in the product name, pricing, and key features on the left, or pick one of the quick preset examples to preview a full report.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {analysisResult && (
        <ExportModal
          analysis={analysisResult}
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
        />
      )}
    </div>
  );
};
