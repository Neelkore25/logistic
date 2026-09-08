import React from 'react';
import {
  FileText,
  Award,
  PackageCheck,
  Truck,
  Landmark,
  Anchor,
  Ship,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const ExportTimeline: React.FC = () => {
  const steps = [
    { id: 1, title: 'Documents', duration: '2 Days', desc: 'Commercial Invoice, Packing List & LUT generation', icon: FileText, status: 'completed' },
    { id: 2, title: 'Certification', duration: '3 Days', desc: 'FSSAI Export NOC & Phytosanitary inspection', icon: Award, status: 'completed' },
    { id: 3, title: 'Packaging', duration: '2 Days', desc: 'Nitrogen vacuum pack & ISPM-15 pallet stamping', icon: PackageCheck, status: 'completed' },
    { id: 4, title: 'Pickup', duration: '1 Day', desc: 'Factory container stuffing & Palghar to JNPT transit', icon: Truck, status: 'completed' },
    { id: 5, title: 'Customs', duration: '1 Day', desc: 'ICEGATE Shipping Bill & Let Export Order (LEO)', icon: Landmark, status: 'completed' },
    { id: 6, title: 'Port', duration: '2 Days', desc: 'Terminal Gate-in & vessel crane loading at Nhava Sheva', icon: Anchor, status: 'completed' },
    { id: 7, title: 'Transit', duration: '15 Days', desc: 'Ocean passage via Arabian Sea & Suez Canal route', icon: Ship, status: 'in_progress' },
    { id: 8, title: 'Delivery', duration: '2 Days', desc: 'Port of Hamburg Zoll clearance & Munich warehouse drop', icon: CheckCircle2, status: 'pending' }
  ];

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg space-y-5">
      
      {/* SECTION 24: Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Estimated Export Timeline
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            End-to-end movement duration from factory order to foreign warehouse receipt
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-xs font-bold text-teal-700 dark:text-teal-300">
          <Clock className="w-4 h-4" />
          <span>Total Expected Duration: 28 Days</span>
        </div>
      </div>

      {/* Visual Workflow Steps (Section 24 requirement: Documents ↓ Certification ↓ Packaging ↓ Pickup ↓ Customs ↓ Port ↓ Transit ↓ Delivery) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {steps.map((step, idx) => {
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                step.status === 'completed'
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20'
                  : step.status === 'in_progress'
                  ? 'border-sky-400 dark:border-sky-700 bg-sky-50/40 dark:bg-sky-950/30 shadow-sm ring-2 ring-sky-400/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-900/50 text-slate-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold opacity-60">Step {idx + 1}</span>
                  <div className={`p-1.5 rounded-lg ${
                    step.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : step.status === 'in_progress'
                      ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 animate-pulse'
                      : 'bg-slate-200 dark:bg-navy-800 text-slate-500'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  {step.title}
                </h4>
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                  {step.duration}
                </span>
              </div>

              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
