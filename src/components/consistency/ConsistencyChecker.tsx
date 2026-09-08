import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  FileText,
  Layers,
  Info
} from 'lucide-react';

export const ConsistencyChecker: React.FC = () => {
  const { consistencyData, fixConsistencyMismatch, triggerToast } = useApp();

  const handleRecheck = () => {
    triggerToast('Re-checking Consistency', 'Running automated field OCR and regex comparison on Invoice and Packing List.', 'info');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Document Consistency Checker
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              Commercial Invoice ↔ Packing List
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Automated pre-customs audit verifying critical shipment metrics match across trade documents.
          </p>
        </div>

        <button
          onClick={handleRecheck}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-navy-850 hover:bg-slate-100 dark:hover:bg-navy-800 border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Re-run Comparison</span>
        </button>
      </div>

      {/* Workflow Stepper (Section 17 requirement: Documents ↓ Pending List ↓ Consistency Check ↓ Result) */}
      <div className="glass-card rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
        <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-semibold text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-bold">
            <FileText className="w-4 h-4" />
            <span>1. Documents</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">➔</span>

          <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-bold">
            <Layers className="w-4 h-4" />
            <span>2. Pending List</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">➔</span>

          <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-bold">
            <FileCheck2 className="w-4 h-4" />
            <span>3. Consistency Check</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">➔</span>

          <div className={`flex items-center gap-1.5 font-bold ${
            consistencyData.isConsistent ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
          }`}>
            {consistencyData.isConsistent ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>4. Result</span>
          </div>
        </div>
      </div>

      {/* Overall Status Banner */}
      <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        consistencyData.isConsistent
          ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
          : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
      }`}>
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl text-white mt-0.5 ${
            consistencyData.isConsistent ? 'bg-emerald-500 shadow-md' : 'bg-rose-500 shadow-md'
          }`}>
            {consistencyData.isConsistent ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
                consistencyData.isConsistent ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'
              }`}>
                Audit Verdict
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Checked: {consistencyData.checkedAt}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              {consistencyData.isConsistent ? '✅ Documents Consistent' : '⚠️ Inconsistency Detected'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              {consistencyData.isConsistent
                ? 'All mandatory metrics (weights, quantities, HS codes, and party names) match between Commercial Invoice & Packing List.'
                : 'One or more fields do not reconcile. Indian Customs may issue a query or hold cargo at JNPT Port.'}
            </p>
          </div>
        </div>

        {!consistencyData.isConsistent && (
          <button
            onClick={fixConsistencyMismatch}
            className="shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-glow-teal flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Auto-Align & Reconcile</span>
          </button>
        )}
      </div>

      {/* Comparison Table / Side-by-Side Cards */}
      <div className="glass-card rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-850 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-900 dark:text-white">Commercial Invoice: </span>
            <span className="font-mono text-teal-600 dark:text-teal-400">{consistencyData.invoiceNumber}</span>
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white">Packing List: </span>
            <span className="font-mono text-teal-600 dark:text-teal-400">{consistencyData.packingListNumber}</span>
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {consistencyData.items.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 transition-colors ${
                !item.isMatch
                  ? 'bg-rose-50/50 dark:bg-rose-950/20'
                  : 'hover:bg-slate-50/40 dark:hover:bg-navy-850/40'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Field Label & Match Indicator */}
                <div className="md:w-1/4">
                  <div className="flex items-center gap-2">
                    {item.isMatch ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.field}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase mt-1 inline-block px-1.5 py-0.5 rounded ${
                    item.isMatch
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {item.isMatch ? 'Exact Match' : 'Mismatch'}
                  </span>
                </div>

                {/* Values Comparison */}
                <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">Commercial Invoice</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{item.invoiceValue}</span>
                  </div>

                  <div className={`p-2.5 rounded-lg border ${
                    item.isMatch
                      ? 'bg-slate-100 dark:bg-navy-900 border-slate-200 dark:border-slate-800'
                      : 'bg-rose-100/60 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 font-bold text-rose-800 dark:text-rose-200'
                  }`}>
                    <span className="text-[10px] text-slate-400 font-semibold block mb-0.5">Packing List</span>
                    <span>{item.packingListValue}</span>
                  </div>
                </div>

                {/* Audit recommendation */}
                <div className="md:w-1/4 text-xs text-slate-500 dark:text-slate-400">
                  {item.recommendation ? (
                    <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-800 dark:text-amber-300">
                      <strong>CHA Tip: </strong>{item.recommendation}
                    </div>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ Customs Verification Ready
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
