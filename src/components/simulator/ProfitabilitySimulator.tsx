import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calculator,
  TrendingUp,
  ShieldAlert,
  HelpCircle,
  Sparkles,
  DollarSign,
  ArrowRight,
  PieChart,
  Layers
} from 'lucide-react';

export const ProfitabilitySimulator: React.FC = () => {
  const { selectedProduct, setActiveTab } = useApp();

  // Inputs with sensible defaults based on active product
  const [sellingPriceEur, setSellingPriceEur] = useState<number>(11500); // Foreign buyer price in EUR
  const [exchangeRate, setExchangeRate] = useState<number>(90.5); // 1 EUR = ~90.5 INR
  const [productCostInr, setProductCostInr] = useState<number>(550000); // Ex-factory raw goods
  const [packagingCostInr, setPackagingCostInr] = useState<number>(35000); // Pallet + ISPM-15 + vacuum
  const [oceanFreightInr, setOceanFreightInr] = useState<number>(165000); // Shipping line FCL
  const [chaCustomsInr, setChaCustomsInr] = useState<number>(22000); // CHA documentation & gate-in
  const [insuranceInr, setInsuranceInr] = useState<number>(8500); // Marine ICC-A
  const [rodtepIncentivePercent, setRodtepIncentivePercent] = useState<number>(2.5); // RoDTEP refund from DGFT

  // Calculations
  const grossRevenueInr = Math.round(sellingPriceEur * exchangeRate);
  const totalShipmentCostInr = packagingCostInr + oceanFreightInr + chaCustomsInr + insuranceInr;
  const totalCostInr = productCostInr + totalShipmentCostInr;
  const rodtepRefundInr = Math.round((productCostInr * rodtepIncentivePercent) / 100);
  const netProfitInr = grossRevenueInr - totalCostInr + rodtepRefundInr;
  const marginPercent = grossRevenueInr > 0 ? ((netProfitInr / grossRevenueInr) * 100).toFixed(1) : '0';

  // Expert Risk Score calculation
  const getRiskEvaluation = () => {
    if (netProfitInr < 100000) {
      return {
        level: 'High Risk',
        badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
        score: '68 / 100 (Caution)',
        advice: 'Low profit buffer. A 3% currency swing or port demurrage could erode MSME margin. Renegotiate CIF price or request 30% advance.'
      };
    }
    if (netProfitInr < 220000) {
      return {
        level: 'Medium Risk',
        badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
        score: '32 / 100 (Acceptable)',
        advice: 'Healthy export margins. Consider booking forward contract with bank to lock the EUR/INR exchange rate.'
      };
    }
    return {
      level: 'Low Risk',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      score: '15 / 100 (Safe & Highly Viable)',
      advice: 'Exceptional profitability. Ample cushion against marine freight adjustments and demurrage.'
    };
  };

  const risk = getRiskEvaluation();

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Export Profitability Simulator
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              MSME Financial Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Simulate real financial outcomes, logistics overheads, RoDTEP subsidies, and foreign currency risk.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('logistics')}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-md flex items-center gap-1.5 transition-all"
        >
          <span>View Detailed Cost Breakdown</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: Simulation Sliders & Inputs (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg space-y-4">
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Financial & Cost Variables
            </h3>
            <span className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
              Product: {selectedProduct?.name || 'Standard Export Cargo'}
            </span>
          </div>

          <div className="space-y-4">
            
            {/* Foreign Price & FX Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Foreign Invoice Value (EUR €)
                </label>
                <input
                  type="number"
                  value={sellingPriceEur}
                  onChange={e => setSellingPriceEur(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-mono bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Exchange Rate (1 EUR = INR ₹)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={exchangeRate}
                  onChange={e => setExchangeRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-mono bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Product FOB Cost */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Ex-Factory Product Cost (INR):</span>
                <span className="font-bold">₹{productCostInr.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={200000}
                max={1200000}
                step={10000}
                value={productCostInr}
                onChange={e => setProductCostInr(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            {/* Ocean Freight Cost */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Ocean Freight / Shipping Line (INR):</span>
                <span className="font-bold">₹{oceanFreightInr.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={50000}
                max={400000}
                step={5000}
                value={oceanFreightInr}
                onChange={e => setOceanFreightInr(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>

            {/* Packaging, CHA & Insurance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Packaging (INR)
                </label>
                <input
                  type="number"
                  value={packagingCostInr}
                  onChange={e => setPackagingCostInr(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs font-mono bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  CHA Clearance (INR)
                </label>
                <input
                  type="number"
                  value={chaCustomsInr}
                  onChange={e => setChaCustomsInr(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs font-mono bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Cargo Insurance (INR)
                </label>
                <input
                  type="number"
                  value={insuranceInr}
                  onChange={e => setInsuranceInr(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs font-mono bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* RoDTEP Incentive Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>DGFT RoDTEP Refund Rate ({rodtepIncentivePercent}%):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  +₹{rodtepRefundInr.toLocaleString('en-IN')} Cash Back
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={0.1}
                value={rodtepIncentivePercent}
                onChange={e => setRodtepIncentivePercent(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* RIGHT: Financial Outcome & Expert Risk Score (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Profit Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Projected Outcome
            </span>

            <div>
              <span className="text-xs text-slate-400">Net Estimated Profit (INR)</span>
              <h3 className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                ₹{netProfitInr.toLocaleString('en-IN')}
              </h3>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">
                Net Margin: <span className="text-emerald-600 dark:text-emerald-400">{marginPercent}%</span> of gross realization
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Gross Export Realization:</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{grossRevenueInr.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Total Logistics Overhead:</span>
                <span className="font-semibold text-rose-500">-₹{totalShipmentCostInr.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Ex-Factory Goods Cost:</span>
                <span className="font-semibold text-rose-500">-₹{productCostInr.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Government Incentive (RoDTEP):</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">+₹{rodtepRefundInr.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Section 21: Expert Risk Score */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-teal-500" />
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Expert Risk Score
                </h4>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${risk.badgeColor}`}>
                {risk.level}
              </span>
            </div>

            <div className="pt-1">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Vulnerability Index: {risk.score}
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                {risk.advice}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-navy-900 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <div>• <strong>Forex Hedging:</strong> RBI authorized forward contract suggested.</div>
              <div>• <strong>ECGC Cover:</strong> Export credit insurance protects against overseas buyer insolvency.</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
