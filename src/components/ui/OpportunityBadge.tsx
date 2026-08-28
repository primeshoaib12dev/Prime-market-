import React from 'react';
import { getScoreBadgeClasses, getScoreLevel } from '../../lib/scoring';
import { ScoreLevel } from '../../types';

interface OpportunityBadgeProps {
  score: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const OpportunityBadge: React.FC<OpportunityBadgeProps> = ({
  score,
  showLabel = true,
  size = 'md',
  className = '',
}) => {
  const level = getScoreLevel(score);
  const classes = getScoreBadgeClasses(score);

  if (size === 'sm') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${classes.badge} ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: classes.accent }} />
        <span>{score}</span>
        {showLabel && <span className="opacity-75 font-normal">/100 • {level}</span>}
      </span>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`p-4 rounded-xl border ${classes.bg} ${classes.border} ${className}`}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Opportunity Score
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-4xl font-extrabold tracking-tight ${classes.text}`}>
                {score}
              </span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                / 100
              </span>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border tracking-wide uppercase ${classes.badge}`}
          >
            {level}
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700/60 rounded-full h-2 mt-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${score}%`, backgroundColor: classes.accent }}
          />
        </div>
      </div>
    );
  }

  // Medium (default)
  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border text-sm font-medium ${classes.bg} ${classes.border} ${className}`}
    >
      <div
        className="w-2.5 h-2.5 rounded-full animate-pulse"
        style={{ backgroundColor: classes.accent }}
      />
      <span className={`font-bold ${classes.text}`}>{score}</span>
      <span className="text-xs text-slate-400 dark:text-slate-500">/ 100</span>
      {showLabel && (
        <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${classes.badge}`}>
          {level}
        </span>
      )}
    </div>
  );
};
