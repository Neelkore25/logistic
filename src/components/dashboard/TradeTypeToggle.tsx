import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const TradeTypeToggle: React.FC = () => {
  const { tradeType, setTradeType, triggerToast } = useApp();

  const handleSelect = (type: 'domestic' | 'international') => {
    setTradeType(type);
    triggerToast(
      type === 'international' ? 'International Export Mode' : 'Domestic Trade Mode',
      type === 'international'
        ? 'Cross-border export readiness, ICEGATE customs, and foreign compliance activated.'
        : 'Domestic inter-state e-Way bill and local transit activated.',
      'info'
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Select Active Trade Scope
        </label>
        <span className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
          Tailors documentation & compliance rules
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        
        {/* Domestic Card */}
        <div
          onClick={() => handleSelect('domestic')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all relative overflow-hidden ${
            tradeType === 'domestic'
              ? 'border-amber-500/80 bg-gradient-to-br from-amber-500/10 to-orange-500/10 shadow-md ring-2 ring-amber-500/20'
              : 'glass-card border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🇮🇳</span>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Domestic Trade
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ship within Indian states & union territories
                </p>
              </div>
            </div>
            {tradeType === 'domestic' && (
              <span className="p-1 rounded-full bg-amber-500 text-white">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between">
            <span>GST e-Way Bill • Local Trucking • Inter-state E-invoicing</span>
          </div>
        </div>

        {/* International Card */}
        <div
          onClick={() => handleSelect('international')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all relative overflow-hidden ${
            tradeType === 'international'
              ? 'border-teal-500/80 bg-gradient-to-br from-teal-500/10 to-sky-500/10 shadow-glow-teal ring-2 ring-teal-500/20'
              : 'glass-card border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🌍</span>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <span>International Export</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500 text-white shadow-xs">
                    Full SaaS Suite
                  </span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Export from India to global destinations
                </p>
              </div>
            </div>
            {tradeType === 'international' && (
              <span className="p-1 rounded-full bg-teal-500 text-white">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px] text-teal-700 dark:text-teal-300 font-medium flex items-center justify-between">
            <span>ICEGATE Customs • Shipping Bill • Ocean/Air Freight • Foreign Exchange</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>
    </div>
  );
};
