import React, { useState, useEffect } from 'react';
import { Navbar, NavView } from './components/ui/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { AnalyzerView } from './components/analyzer/AnalyzerView';
import { GeneratorView } from './components/generator/GeneratorView';
import { TrendsView } from './components/trends/TrendsView';
import { SearchView } from './components/search/SearchView';
import { SavedAnalysesView } from './components/saved/SavedAnalysesView';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ProductAnalysis, ProductCategory } from './types';
import { INITIAL_SAVED_ANALYSES } from './data/demo-ai';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<NavView>('dashboard');

  // Persistent Saved Analyses
  const [savedAnalyses, setSavedAnalyses] = useLocalStorage<ProductAnalysis[]>(
    'pm_saved_analyses_v1',
    INITIAL_SAVED_ANALYSES
  );

  // Transition state
  const [prefillAnalysis, setPrefillAnalysis] = useState<ProductAnalysis | null>(null);
  const [prefillListing, setPrefillListing] = useState<{
    productName: string;
    category: ProductCategory;
    features: string[];
    targetCustomer: string;
  } | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Check URL hash on load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as NavView;
    const validViews: NavView[] = [
      'landing',
      'dashboard',
      'analyzer',
      'generator',
      'trends',
      'search',
      'saved',
    ];
    if (validViews.includes(hash)) {
      setCurrentView(hash);
    }
  }, []);

  const handleNavigate = (view: NavView) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save Analysis Handler
  const handleSaveAnalysis = (analysis: ProductAnalysis) => {
    const exists = savedAnalyses.some((a) => a.id === analysis.id || a.productName === analysis.productName);
    if (exists) {
      // Update existing
      setSavedAnalyses((prev) => prev.map((a) => (a.id === analysis.id ? analysis : a)));
      showToast('Analysis updated in saved portfolio');
    } else {
      setSavedAnalyses((prev) => [analysis, ...prev]);
      showToast('Saved to your intelligence portfolio!');
    }
  };

  const handleRemoveAnalysis = (id: string) => {
    setSavedAnalyses((prev) => prev.filter((a) => a.id !== id));
    showToast('Analysis removed from saved items', 'info');
  };

  const handleClearAll = () => {
    setSavedAnalyses([]);
    showToast('All saved analyses cleared', 'info');
  };

  const isAnalysisSaved = (id: string) => {
    return savedAnalyses.some((a) => a.id === id);
  };

  const handleSendToListingGenerator = (product: {
    productName: string;
    category: ProductCategory;
    features: string[];
    targetCustomer: string;
  }) => {
    setPrefillListing(product);
    handleNavigate('generator');
  };

  const handleAnalyzeProductTrigger = (name: string, category: ProductCategory) => {
    setPrefillAnalysis({
      id: `analysis-${Date.now()}`,
      productName: name,
      category,
      originalPrice: 1999,
      currency: '₹',
      description: `Marketplace listing for ${name} in the ${category} category.`,
      features: ['High build quality', 'Competitive design', 'Modern ergonomics'],
      opportunityScore: {
        overall: 84,
        level: 'Good',
        breakdown: {
          demandScore: 88,
          competitionScore: 42,
          marginPotential: 82,
          growthRateScore: 86,
          marketFitScore: 84,
        },
      },
      marketDemand: 'High',
      competitionLevel: 'Medium',
      recommendedPriceRange: {
        min: 1799,
        max: 2299,
        optimal: 1999,
        marginEstimate: '54% Gross Margin',
      },
      targetAudience: [
        {
          segment: 'Core Category Enthusiasts',
          demographics: 'Ages 22-45, tech & value conscious',
          painPoints: ['High pricing from incumbent brands', 'Subpar longevity'],
          buyingMotivation: 'Looking for reliable performance at a fair direct-to-consumer price point',
        },
      ],
      strengths: [
        'Rapidly rising search volume across marketplace platforms',
        'Strong consumer price acceptance in the ₹1,800 - ₹2,300 segment',
      ],
      weaknesses: [
        'Requires strong packaging and high-resolution lifestyle product photography',
        'Initial ad spend needed to overcome established category leaders',
      ],
      recommendations: [
        {
          id: 'rec-1',
          category: 'Pricing',
          priority: 1,
          title: 'Introductory Launch Discount',
          description: 'Launch at ₹1,799 for the first 14 days to capture verified reviews before increasing to ₹2,199.',
          impact: 'High',
        },
        {
          id: 'rec-2',
          category: 'Listing',
          priority: 2,
          title: 'Lead with Problem-Solving Bullet Points',
          description: 'Highlight the top 2 features within the first 80 characters of mobile search results.',
          impact: 'Medium',
        },
      ],
      productSummary: `The ${name} represents a high-velocity opportunity in the ${category} space with balanced entry friction and resilient market demand.`,
      analyzedAt: new Date().toISOString(),
    });
    handleNavigate('analyzer');
  };

  const handleSelectAnalysis = (analysis: ProductAnalysis) => {
    setPrefillAnalysis(analysis);
    handleNavigate('analyzer');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#18181b] text-[#fafafa] shadow-2xl border border-[#27272a] text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Main SaaS Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        savedCount={savedAnalyses.length}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {currentView === 'landing' && <LandingPage onNavigate={handleNavigate} />}

        {currentView === 'dashboard' && (
          <DashboardView
            onNavigate={handleNavigate}
            savedAnalyses={savedAnalyses}
            onSelectAnalysis={handleSelectAnalysis}
          />
        )}

        {currentView === 'analyzer' && (
          <AnalyzerView
            onSaveAnalysis={handleSaveAnalysis}
            isSaved={isAnalysisSaved}
            onSendToListingGenerator={handleSendToListingGenerator}
            prefillAnalysis={prefillAnalysis}
          />
        )}

        {currentView === 'generator' && (
          <GeneratorView
            prefill={prefillListing}
            onSaveListing={(listing) => {
              showToast('Listing generated and ready for copy!');
            }}
          />
        )}

        {currentView === 'trends' && (
          <TrendsView
            onNavigate={handleNavigate}
            onAnalyzeProduct={handleAnalyzeProductTrigger}
          />
        )}

        {currentView === 'search' && (
          <SearchView onAnalyzeProduct={handleAnalyzeProductTrigger} />
        )}

        {currentView === 'saved' && (
          <SavedAnalysesView
            savedAnalyses={savedAnalyses}
            onRemoveAnalysis={handleRemoveAnalysis}
            onClearAll={handleClearAll}
            onNavigate={handleNavigate}
            onSendToListingGenerator={handleSendToListingGenerator}
            onSelectForAnalyzer={handleSelectAnalysis}
          />
        )}
      </main>

      {/* Elegant Dark SaaS Footer */}
      <footer className="px-6 sm:px-8 py-4 border-t border-[#27272a] bg-[#09090b] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] text-[#71717a] uppercase font-semibold tracking-wider">
              API Status: Optimal
            </span>
          </div>
          <span className="text-[10px] text-[#3f3f46] font-mono">v2.4.1-stable</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => handleNavigate('landing')}
            className="text-[10px] text-[#71717a] hover:text-[#fafafa] uppercase font-bold tracking-wider transition-colors cursor-pointer"
          >
            Product Overview
          </button>
          <button
            type="button"
            onClick={() => handleNavigate('dashboard')}
            className="text-[10px] text-[#71717a] hover:text-[#fafafa] uppercase font-bold tracking-wider transition-colors cursor-pointer"
          >
            Intelligence Hub
          </button>
          <button
            type="button"
            onClick={() => handleNavigate('analyzer')}
            className="text-[10px] text-[#71717a] hover:text-[#fafafa] uppercase font-bold tracking-wider transition-colors cursor-pointer"
          >
            Product Analyzer
          </button>
          <button
            type="button"
            onClick={() => handleNavigate('generator')}
            className="text-[10px] text-indigo-400 hover:text-indigo-300 uppercase font-bold tracking-wider transition-colors cursor-pointer"
          >
            AI Listing Studio
          </button>
        </div>
      </footer>
    </div>
  );
}
