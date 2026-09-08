import React from 'react';
import { DollarSign, Truck, Ship, ShieldCheck, Box, Landmark } from 'lucide-react';

export const ExportCostBreakdown: React.FC = () => {
  const costItems = [
    { label: 'Ex-Factory Goods Value (FOB Base)', amount: 550000, category: 'Product', icon: Box, color: 'text-teal-500' },
    { label: 'Ocean Freight (20ft FCL Container JNPT ➔ Hamburg)', amount: 165000, category: 'Freight', icon: Ship, color: 'text-sky-500' },
    { label: 'Factory Stuffing & Transport (Palghar to Port)', amount: 18000, category: 'Inland', icon: Truck, color: 'text-indigo-500' },
    { label: 'Export Packaging & ISPM-15 Wooden Pallets', amount: 35000, category: 'Packaging', icon: Box, color: 'text-amber-500' },
    { label: 'Terminal Handling Charges (THC) & Port Gate-In', amount: 14500, category: 'Port', icon: Landmark, color: 'text-purple-500' },
    { label: 'Customs Clearance (CHA Fees & ICEGATE)', amount: 12000, category: 'Customs', icon: Landmark, color: 'text-rose-500' },
    { label: 'Marine All-Risk Cargo Insurance (ICC-A 110%)', amount: 8500, category: 'Insurance', icon: ShieldCheck, color: 'text-emerald-500' }
  ];

  const totalCost = costItems.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-4">
      {/* SECTION 23: Total Export Cost Display */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-teal-950 text-white shadow-xl border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
            Estimated Total Export Cost
          </span>
          <h3 className="text-3xl sm:text-4xl font-black mt-0.5 text-white">
            ₹{totalCost.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Complete CIF cost breakdown from factory floor in Palghar to destination port in Hamburg, Germany.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold text-center shrink-0">
          Zero Upfront IGST (Covered under LUT)
        </div>
      </div>

      {/* Visual Component Breakdown Cards (Section 23 requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {costItems.map((item, idx) => {
          const Icon = item.icon;
          const percentage = ((item.amount / totalCost) * 100).toFixed(1);

          return (
            <div
              key={idx}
              className="p-4 rounded-xl glass-card border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-slate-100 dark:bg-navy-900 ${item.color} shrink-0 mt-0.5`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {item.category} • {percentage}%
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                    {item.label}
                  </h4>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
