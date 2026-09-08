import React from 'react';
import { useApp } from '../../context/AppContext';
import { CircularProgress } from '../common/CircularProgress';
import { ArrowRight, CheckCircle, AlertCircle, FileText, BoxSelect } from 'lucide-react';

export const ExportReadinessCard: React.FC = () => {
  const { readinessScore, setActiveTab, documents, packagingChecklist } = useApp();

  const missingDocs = documents.filter(d => d.mandatory && d.status === 'missing');
  const uncheckedPackaging = packagingChecklist.filter(p => !p.checked && p.isMandatory);

  const handleCompleteTasks = () => {
    if (missingDocs.length > 0) {
      setActiveTab('vault');
    } else if (uncheckedPackaging.length > 0) {
      setActiveTab('packaging');
    } else {
      setActiveTab('shipments');
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden border border-slate-200/80 dark:border-slate-700/60 shadow-lg">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left: Score Description & Breakdown */}
        <div className="space-y-4 max-w-md text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60">
            <span>Overall MSME Readiness</span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Export Readiness
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
              {readinessScore >= 80 ? "You're almost ready to export." : "Action required to complete statutory compliance."}
            </p>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Your readiness score is calculated dynamically based on statutory Indian export documents, packaging certification, and buyer agreements.
          </p>

          {/* Quick status breakdown badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-medium">
              <FileText className="w-3.5 h-3.5 text-teal-500" />
              <span>{documents.filter(d => d.status === 'available').length} / {documents.length} Docs Ready</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-medium">
              <BoxSelect className="w-3.5 h-3.5 text-teal-500" />
              <span>{packagingChecklist.filter(p => p.checked).length} / {packagingChecklist.length} Packaging Checks</span>
            </span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleCompleteTasks}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal transition-all transform active:scale-95 cursor-pointer"
            >
              <span>Complete Remaining Tasks</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Circular Gauge */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50/70 dark:bg-navy-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-inner">
          <CircularProgress
            value={readinessScore}
            size={175}
            strokeWidth={14}
            label="Readiness"
          />
          <span className="mt-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            {readinessScore >= 80 ? '🟢 Tier-1 Readiness' : '🟡 Incomplete Documentation'}
          </span>
        </div>

      </div>

    </div>
  );
};
