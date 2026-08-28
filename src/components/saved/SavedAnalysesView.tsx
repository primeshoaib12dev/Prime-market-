import React, { useState } from 'react';
import {
  BookmarkCheck,
  Trash2,
  Share2,
  ExternalLink,
  Sparkles,
  FileText,
  Clock,
  Download,
  Eye,
  AlertCircle,
  Layers,
} from 'lucide-react';
import { ProductAnalysis, ProductCategory } from '../../types';
import { OpportunityBadge } from '../ui/OpportunityBadge';
import { ExportModal } from '../ui/ExportModal';
import { formatDate, downloadJsonFile } from '../../lib/utils';
import { NavView } from '../ui/Navbar';

interface SavedAnalysesViewProps {
  savedAnalyses: ProductAnalysis[];
  onRemoveAnalysis: (id: string) => void;
  onClearAll: () => void;
  onNavigate: (view: NavView) => void;
  onSendToListingGenerator: (product: {
    productName: string;
    category: ProductCategory;
    features: string[];
    targetCustomer: string;
  }) => void;
  onSelectForAnalyzer: (analysis: ProductAnalysis) => void;
}

export const SavedAnalysesView: React.FC<SavedAnalysesViewProps> = ({
  savedAnalyses,
  onRemoveAnalysis,
  onClearAll,
  onNavigate,
  onSendToListingGenerator,
  onSelectForAnalyzer,
}) => {
  const [selectedForExport, setSelectedForExport] = useState<ProductAnalysis | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<ProductAnalysis | null>(null);

  const handleExportAll = () => {
    downloadJsonFile('prime-market-all-saved-analyses', savedAnalyses);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#27272a] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#fafafa] tracking-tight">
              Saved Product Analyses
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#18181b] text-indigo-400 border border-[#27272a]">
              {savedAnalyses.length} Saved In Local Storage
            </span>
          </div>
          <p className="text-sm text-[#71717a] mt-1">
            Persisted audits and recommendations accessible offline across sessions.
          </p>
        </div>

        {savedAnalyses.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#18181b] border border-[#27272a] text-[#fafafa] hover:bg-[#27272a] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export All (JSON)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all saved analyses?')) {
                  onClearAll();
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-950/30 border border-rose-900/50 text-rose-300 hover:bg-rose-950/60 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {savedAnalyses.length === 0 ? (
        /* Empty state */
        <div className="p-16 rounded-xl bg-[#18181b] border border-[#27272a] text-center space-y-4">
          <div className="w-14 h-14 rounded-xl bg-[#27272a] text-indigo-400 flex items-center justify-center mx-auto">
            <BookmarkCheck className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[#fafafa]">
            No saved product analyses found
          </h3>
          <p className="text-xs text-[#71717a] max-w-sm mx-auto">
            Run an analysis in the Product Analyzer and click "Save" to build your portfolio of evaluated products.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('analyzer')}
              className="px-5 py-2.5 rounded-lg font-semibold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
            >
              Start Product Analysis
            </button>
          </div>
        </div>
      ) : (
        /* Grid of saved items */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedAnalyses.map((analysis) => (
            <div
              key={analysis.id}
              className="p-5 rounded-xl bg-[#18181b] border border-[#27272a] hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#27272a] text-[#fafafa] border border-[#3f3f46]">
                    {analysis.category}
                  </span>
                  <OpportunityBadge score={analysis.opportunityScore.overall} size="sm" />
                </div>

                {/* Product Name */}
                <h3 className="text-base font-bold text-[#fafafa] mt-2 leading-snug">
                  {analysis.productName}
                </h3>

                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-[#71717a] mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDate(analysis.analyzedAt)}</span>
                </div>

                {/* Key Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-2 p-3 rounded-lg bg-[#09090b] border border-[#27272a] text-xs">
                  <div>
                    <span className="text-[10px] text-[#71717a] uppercase">Demand / Comp</span>
                    <div className="font-bold text-[#fafafa] mt-0.5">
                      {analysis.marketDemand} / {analysis.competitionLevel}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#71717a] uppercase">Target Band</span>
                    <div className="font-bold text-[#fafafa] mt-0.5 font-mono">
                      {analysis.currency}{analysis.recommendedPriceRange.optimal.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#a1a1aa] mt-3 line-clamp-2">
                  {analysis.productSummary}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="mt-5 pt-3 border-t border-[#27272a] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedDetail(analysis)}
                    className="p-1.5 rounded-lg text-[#71717a] hover:text-[#fafafa] hover:bg-[#27272a] cursor-pointer"
                    title="View Full Report"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedForExport(analysis)}
                    className="p-1.5 rounded-lg text-[#71717a] hover:text-[#fafafa] hover:bg-[#27272a] cursor-pointer"
                    title="Export / Print Report"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemoveAnalysis(analysis.id)}
                    className="p-1.5 rounded-lg text-[#71717a] hover:text-rose-400 hover:bg-rose-950/30 cursor-pointer"
                    title="Delete Saved Analysis"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onSendToListingGenerator({
                        productName: analysis.productName,
                        category: analysis.category,
                        features: analysis.features,
                        targetCustomer: analysis.targetAudience[0]?.segment || 'Online shoppers',
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#27272a] text-[#fafafa] border border-[#3f3f46] hover:bg-[#3f3f46] cursor-pointer transition-colors"
                  >
                    Listing
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectForAnalyzer(analysis)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-colors"
                  >
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Export Modal */}
      {selectedForExport && (
        <ExportModal
          analysis={selectedForExport}
          isOpen={true}
          onClose={() => setSelectedForExport(null)}
        />
      )}

      {/* Full Detail Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#18181b] rounded-xl max-w-2xl w-full p-6 border border-[#27272a] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
              <div>
                <OpportunityBadge score={selectedDetail.opportunityScore.overall} size="sm" />
                <h2 className="text-xl font-bold text-[#fafafa] mt-1">
                  {selectedDetail.productName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetail(null)}
                className="p-1 text-[#71717a] hover:text-[#fafafa] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-[#a1a1aa] space-y-4">
              <div>
                <span className="font-bold text-[#fafafa] block mb-1">Executive Summary</span>
                <p className="leading-relaxed">{selectedDetail.productSummary}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-[#09090b] border border-[#27272a]">
                <div>
                  <span className="font-semibold text-[#71717a] block text-[11px]">Recommended Price</span>
                  <span className="font-bold text-[#fafafa] font-mono">
                    {selectedDetail.currency}{selectedDetail.recommendedPriceRange.min} – {selectedDetail.currency}{selectedDetail.recommendedPriceRange.max}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-[#71717a] block text-[11px]">Expected Margin</span>
                  <span className="font-bold text-emerald-400">
                    {selectedDetail.recommendedPriceRange.marginEstimate}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-[#fafafa] block mb-1">AI Recommendations</span>
                <ul className="space-y-1.5">
                  {selectedDetail.recommendations.map((r) => (
                    <li key={r.id} className="p-2.5 rounded-lg bg-[#09090b] border border-[#27272a]">
                      <span className="font-bold text-indigo-400">{r.title}:</span> {r.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#27272a] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedDetail(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#fafafa] bg-[#27272a] hover:bg-[#3f3f46] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectForAnalyzer(selectedDetail);
                  setSelectedDetail(null);
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
              >
                Open in Analyzer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
