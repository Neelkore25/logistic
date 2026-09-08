import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, AlertTriangle, FileUp, CheckCircle2, Bot } from 'lucide-react';

export const NextBestAction: React.FC = () => {
  const {
    documents,
    consistencyData,
    packagingChecklist,
    setActiveTab,
    openAiDocumentAgent,
    fixConsistencyMismatch
  } = useApp();

  // Find priority incomplete step
  const missingIec = documents.find(d => d.id === 'doc-iec' && d.status === 'missing');
  const missingDocs = documents.filter(d => d.mandatory && d.status === 'missing');
  const hasInconsistency = !consistencyData.isConsistent;
  const uncheckedPackaging = packagingChecklist.filter(p => !p.checked && p.isMandatory);

  if (missingIec) {
    return (
      <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-sky-500/10 border-2 border-amber-400/80 dark:border-amber-500/60 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-md mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Priority Action ➔ What should you do next?
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  Critical
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Upload your IEC (Importer Exporter Code) Certificate
              </h3>
              <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Why? </span>
                Your export documentation is incomplete. Indian customs cannot approve your Shipping Bill on ICEGATE without an active DGFT IEC.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => openAiDocumentAgent(missingIec)}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 shadow-glow-teal flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>Get AI Assistance</span>
            </button>
            <button
              onClick={() => setActiveTab('vault')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-white dark:bg-navy-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-navy-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Upload Document</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (hasInconsistency) {
    return (
      <div className="rounded-2xl p-5 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-teal-500/10 border-2 border-rose-400/80 dark:border-rose-500/60 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-500 text-white shadow-md mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                  Priority Action ➔ What should you do next?
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  Audit Alert
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Resolve Document Inconsistency (Invoice vs Packing List)
              </h3>
              <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Why? </span>
                Gross weight discrepancy detected (1,280 kg vs 1,310 kg). Indian customs will delay cargo gate-in if documents do not synchronize.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={fixConsistencyMismatch}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-glow-teal flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Auto-Align Weights</span>
            </button>
            <button
              onClick={() => setActiveTab('consistency')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-white dark:bg-navy-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-navy-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>View Checker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (uncheckedPackaging.length > 0) {
    return (
      <div className="rounded-2xl p-5 bg-gradient-to-r from-sky-500/10 via-teal-500/10 to-indigo-500/10 border-2 border-sky-400/80 dark:border-sky-500/60 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-sky-500 text-white shadow-md mt-0.5">
              <FileUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                  Priority Action ➔ What should you do next?
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Complete Dynamic Packaging & Labelling Checklist
              </h3>
              <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Why? </span>
                Germany (EU) requires ISPM-15 wooden pallet certification stamps and German language translation labels.
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('packaging')}
            className="shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Review Checklist →</span>
          </button>
        </div>
      </div>
    );
  }

  // All clear state
  return (
    <div className="rounded-2xl p-5 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-sm">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Status: All Core Requirements Ready
          </span>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Your export consignment is primed for final dispatch & vessel booking.
          </h4>
        </div>
      </div>
      <button
        onClick={() => setActiveTab('shipments')}
        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
      >
        <span>Track Live Shipment</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
