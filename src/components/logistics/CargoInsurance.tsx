import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ShieldAlert, FileText, Info } from 'lucide-react';

export const CargoInsurance: React.FC = () => {
  const [selectedClause, setSelectedClause] = useState<'A' | 'B' | 'C'>('A');

  const insuranceOptions = [
    {
      clause: 'A',
      title: 'Institute Cargo Clauses (A) — All-Risk Comprehensive',
      coverage: '110% CIF Invoice Value (Covers theft, piracy, water damage, jettison, container drop & war/strike risks)',
      premium: '₹8,500 (0.85% of CIF value)',
      isRecommended: true
    },
    {
      clause: 'B',
      title: 'Institute Cargo Clauses (B) — Named Perils',
      coverage: 'Covers earthquake, volcanic eruption, collision, capsizing, and water washing overboard',
      premium: '₹5,800 (0.58% of CIF value)',
      isRecommended: false
    },
    {
      clause: 'C',
      title: 'Institute Cargo Clauses (C) — Basic Catastrophic Cover',
      coverage: 'Covers only fire, explosion, vessel stranding, sinking and general average sacrifice',
      premium: '₹3,400 (0.34% of CIF value)',
      isRecommended: false
    }
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg space-y-4">
      
      {/* SECTION 25: Header & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Marine & Air Cargo Insurance
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mandatory insurance protection under CIF Incoterms before container loading
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Active Policy #NIA-MAR-77391-2026</span>
        </span>
      </div>

      {/* Insurance Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {insuranceOptions.map(opt => (
          <div
            key={opt.clause}
            onClick={() => setSelectedClause(opt.clause as any)}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
              selectedClause === opt.clause
                ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/30 shadow-sm ring-2 ring-teal-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-navy-850 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                  Clause ({opt.clause})
                </span>
                {opt.isRecommended && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Industry Standard
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                {opt.title}
              </h4>

              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {opt.coverage}
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-900 dark:text-white">{opt.premium}</span>
              {selectedClause === opt.clause && (
                <span className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
        <Info className="w-4 h-4 text-teal-500 shrink-0" />
        <span>Insurer: <strong>The New India Assurance Co. Ltd. (Govt of India Undertaking)</strong> • Survey Agent at Destination: Munich Marine Surveyors GmbH.</span>
      </div>

    </div>
  );
};
