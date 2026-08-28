import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Bookmark,
  Share2,
  Tag,
  Hash,
  ShoppingBag,
  Sliders,
  Layers,
  ArrowRight,
  Send,
} from 'lucide-react';
import { ProductCategory, ProductListing, ListingTone } from '../../types';
import { CATEGORY_LIST } from '../../data/trends';
import { PRESET_LISTING_EXAMPLES } from '../../data/demo-ai';
import { aiService } from '../../lib/ai';
import { copyToClipboard } from '../../lib/utils';

interface GeneratorViewProps {
  prefill?: {
    productName: string;
    category: ProductCategory;
    features: string[];
    targetCustomer: string;
  } | null;
  onSaveListing?: (listing: ProductListing) => void;
}

export const GeneratorView: React.FC<GeneratorViewProps> = ({
  prefill,
  onSaveListing,
}) => {
  // Input State
  const [productName, setProductName] = useState(prefill?.productName || 'ApexFlex Smart Kettle with Precise Temp Control');
  const [category, setCategory] = useState<ProductCategory>(prefill?.category || 'Home & Kitchen');
  const [featuresText, setFeaturesText] = useState(
    prefill?.features.join(', ') || '1.7L capacity, 5 precise temperature presets, Strix thermostat, 1200W fast boil, Keep-warm for 2 hours'
  );
  const [targetCustomer, setTargetCustomer] = useState(
    prefill?.targetCustomer || 'Specialty coffee enthusiasts, tea connoisseurs, modern kitchen owners'
  );
  const [tone, setTone] = useState<ListingTone>('Premium');

  // Response State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [listingResult, setListingResult] = useState<ProductListing | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync if prefill changes
  useEffect(() => {
    if (prefill) {
      setProductName(prefill.productName);
      setCategory(prefill.category);
      if (prefill.features?.length) {
        setFeaturesText(prefill.features.join(', '));
      }
      if (prefill.targetCustomer) {
        setTargetCustomer(prefill.targetCustomer);
      }
    }
  }, [prefill]);

  // Load Preset
  const handleLoadPreset = (ex: typeof PRESET_LISTING_EXAMPLES[0]) => {
    setProductName(ex.data.productName);
    setCategory(ex.data.category);
    setFeaturesText(ex.data.features.join(', '));
    setTargetCustomer(ex.data.targetCustomer);
    setTone(ex.data.tone);
  };

  // Generate Listing
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!productName.trim()) return;

    setIsGenerating(true);
    setGenerationStep('Analyzing marketplace keyword velocity...');

    try {
      const featArray = featuresText
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean);

      const result = await aiService.generateListing(
        {
          productName: productName.trim(),
          category,
          features: featArray.length > 0 ? featArray : ['High quality', 'Ergonomic build', 'Durable materials'],
          targetCustomer: targetCustomer.trim() || 'Everyday consumers',
          tone,
        },
        (step) => setGenerationStep(step)
      );

      setListingResult(result);
    } catch (err) {
      console.error('Failed to generate listing', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (key: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleCopyAll = async () => {
    if (!listingResult) return;
    const combined = `TITLE:\n${listingResult.title}\n\nSHORT HIGHLIGHTS:\n${listingResult.shortDescription}\n\nFULL DESCRIPTION:\n${listingResult.fullDescription}\n\nSEO KEYWORDS:\n${listingResult.seoKeywords.join(', ')}\n\nTAGS:\n${listingResult.tags.join(' ')}\n\nMARKETING HOOK:\n${listingResult.marketingCopy}`;
    handleCopy('all', combined);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-[#27272a] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#fafafa] tracking-tight">
              AI Listing Generator
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#18181b] text-purple-400 border border-[#27272a]">
              Conversion Optimized
            </span>
          </div>
          <p className="text-sm text-[#71717a] mt-1">
            Produce search-ranking product titles, bullet points, narrative descriptions, and SEO keywords.
          </p>
        </div>

        {/* Demo Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-[#71717a] mr-1 hidden sm:inline">
            Presets:
          </span>
          {PRESET_LISTING_EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => handleLoadPreset(ex)}
              className="text-xs px-2.5 py-1 rounded-lg border border-[#27272a] bg-[#18181b] text-[#fafafa] hover:border-purple-500 hover:text-purple-400 transition-colors cursor-pointer"
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
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Listing Parameters</span>
            </h2>

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="generator-product-name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. ApexFlex Smart Kettle"
                  className="w-full text-sm rounded-lg border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-[#fafafa] placeholder:text-[#71717a] focus:outline-none focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Category & Tone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#a1a1aa] mb-1">
                    Category *
                  </label>
                  <select
                    id="generator-category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full text-sm rounded-lg border border-[#27272a] bg-[#09090b] px-3 py-2.5 text-[#fafafa] focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                    Brand Tone
                  </label>
                  <select
                    id="generator-tone-select"
                    value={tone}
                    onChange={(e) => setTone(e.target.value as ListingTone)}
                    className="w-full text-sm rounded-lg border border-[#27272a] bg-[#09090b] px-3 py-2.5 text-[#fafafa] focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Persuasive">Persuasive / High Conversion</option>
                    <option value="Premium">Luxury / Premium</option>
                    <option value="Friendly">Friendly & Approachable</option>
                    <option value="Minimal">Minimal & Direct</option>
                  </select>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">
                  Key Features (comma-separated)
                </label>
                <textarea
                  id="generator-features-input"
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="e.g. 5 temp presets, stainless steel interior, auto shutoff..."
                  className="w-full text-sm rounded-lg border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-[#fafafa] placeholder:text-[#71717a] focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Target Customer */}
              <div>
                <label className="block text-xs font-medium text-[#a1a1aa] mb-1">
                  Target Customer Persona
                </label>
                <input
                  type="text"
                  id="generator-target-customer"
                  value={targetCustomer}
                  onChange={(e) => setTargetCustomer(e.target.value)}
                  placeholder="e.g. Tea connoisseurs, home baristas"
                  className="w-full text-sm rounded-lg border border-[#27272a] bg-[#09090b] px-3.5 py-2.5 text-[#fafafa] placeholder:text-[#71717a] focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                id="generator-submit-btn"
                disabled={isGenerating}
                className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-bold text-sm bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white shadow-xs transition-colors cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Writing Catalog Listing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Complete Listing</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Generated Listing Results (7 cols) */}
        <div className="lg:col-span-7">
          {isGenerating ? (
            /* Loading state */
            <div className="p-8 rounded-xl bg-[#18181b] border border-[#27272a] space-y-5 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center animate-spin">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-[#fafafa] text-base">
                    Generating High-Conversion Copy
                  </h3>
                  <p className="text-xs text-purple-400 font-medium">
                    {generationStep}
                  </p>
                </div>
              </div>
              <div className="h-14 bg-[#27272a] rounded-lg" />
              <div className="h-28 bg-[#27272a] rounded-lg" />
              <div className="h-32 bg-[#27272a] rounded-lg" />
            </div>
          ) : listingResult ? (
            /* Result View */
            <div className="p-6 sm:p-8 rounded-xl bg-[#18181b] border border-[#27272a] space-y-6">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
                <div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#27272a] text-purple-400 border border-[#3f3f46]">
                    Tone: {listingResult.tone}
                  </span>
                  <h2 className="text-lg font-bold text-[#fafafa] mt-1">
                    Generated Marketplace Catalog Asset
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyAll}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#09090b] border border-[#27272a] text-purple-400 hover:bg-[#27272a] transition-colors cursor-pointer"
                  >
                    {copiedKey === 'all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'all' ? 'Copied Full Listing!' : 'Copy All'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGenerate()}
                    className="p-1.5 rounded-lg border border-[#27272a] hover:bg-[#27272a] text-[#71717a] transition-colors cursor-pointer"
                    title="Regenerate"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 1. Search Optimized Title */}
              <div className="p-4 rounded-xl border border-[#27272a] bg-[#09090b]">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-[#71717a]">
                      Product Title
                    </span>
                    <span className="text-[11px] font-mono text-[#71717a]">
                      ({listingResult.title.length} characters • optimal)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('title', listingResult.title)}
                    className="text-xs font-medium text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'title' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'title' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-sm font-bold text-[#fafafa] leading-snug">
                  {listingResult.title}
                </p>
              </div>

              {/* 2. Short Description / Key Highlights */}
              <div className="p-4 rounded-xl border border-[#27272a] bg-[#09090b]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#71717a]">
                    Mobile Highlights / Short Description
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('short', listingResult.shortDescription)}
                    className="text-xs font-medium text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'short' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'short' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-xs text-[#d4d4d8] leading-relaxed">
                  {listingResult.shortDescription}
                </p>
              </div>

              {/* 3. Full Product Description */}
              <div className="p-4 rounded-xl border border-[#27272a] bg-[#09090b]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#71717a]">
                    Full Narrative Description
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('desc', listingResult.fullDescription)}
                    className="text-xs font-medium text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'desc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'desc' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-xs text-[#d4d4d8] space-y-2 leading-relaxed whitespace-pre-line">
                  {listingResult.fullDescription}
                </div>
              </div>

              {/* 4. SEO Keywords */}
              <div className="p-4 rounded-xl border border-[#27272a] bg-[#09090b]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-xs font-medium uppercase tracking-wider text-[#71717a]">
                      Target SEO Keywords
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('keywords', listingResult.seoKeywords.join(', '))}
                    className="text-xs font-medium text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'keywords' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'keywords' ? 'Copied Keywords' : 'Copy All'}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {listingResult.seoKeywords.map((kw, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleCopy(`kw-${i}`, kw)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#18181b] text-[#fafafa] border border-[#27272a] hover:border-purple-400 transition-colors cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Product Tags & Marketing Hook */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Product Tags */}
                <div className="p-4 rounded-xl border border-[#27272a] bg-[#09090b]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs font-medium uppercase tracking-wider text-[#71717a]">
                        Hashtags
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('tags', listingResult.tags.join(' '))}
                      className="text-xs font-medium text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'tags' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {listingResult.tags.map((t, i) => (
                      <span key={i} className="text-xs font-mono text-indigo-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Marketing Copy */}
                <div className="p-4 rounded-xl border border-[#27272a] bg-[#09090b]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-[#71717a]">
                      Social / Ad Hook
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy('marketing', listingResult.marketingCopy)}
                      className="text-xs font-medium text-purple-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'marketing' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <p className="text-xs text-[#d4d4d8] italic">
                    "{listingResult.marketingCopy}"
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Empty Prompt State */
            <div className="p-12 rounded-xl bg-[#18181b] border border-[#27272a] text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#27272a] text-purple-400 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#fafafa]">
                Generate Search-Dominant Listings
              </h3>
              <p className="text-xs text-[#71717a] max-w-sm mx-auto">
                Fill in the product details and tone on the left, or pick one of the presets to generate marketplace listings in seconds.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
