import React from 'react';
import { useApp } from '../../context/AppContext';
import { ExportReadinessCard } from './ExportReadinessCard';
import { NextBestAction } from './NextBestAction';
import { TradeTypeToggle } from './TradeTypeToggle';
import { JourneyTracker } from './JourneyTracker';
import {
  Ship,
  FileText,
  TrendingUp,
  Package,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const DashboardHome: React.FC = () => {
  const {
    userRole,
    userProfile,
    receiverProfile,
    activeShipment,
    selectedProduct,
    setActiveTab,
    openDictionary
  } = useApp();

  const businessName = userRole === 'sender' ? userProfile.businessName : receiverProfile.businessName;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* SECTION 8: Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Good morning, {businessName} 👋
            </h1>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Let's get your next shipment ready.
          </p>
        </div>

        {/* Quick helper badge */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl glass-card text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Origin: {userProfile.location.split(',')[0]} (India)</span>
          </div>
          <button
            onClick={openDictionary}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 transition-colors"
          >
            Export Help & Terms
          </button>
        </div>
      </div>

      {/* SECTION 11: Next Best Action Banner (Top priority for user guidance) */}
      <NextBestAction />

      {/* Top Grid: Export Readiness & Trade Scope */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section 9: Prominent Export Readiness Card (2 cols) */}
        <div className="lg:col-span-2">
          <ExportReadinessCard />
        </div>

        {/* Section 12: Domestic / International selection */}
        <div className="lg:col-span-1 glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg flex flex-col justify-between">
          <TradeTypeToggle />
        </div>
      </div>

      {/* SECTION 10: Interactive Export Journey Tracker */}
      <JourneyTracker />

      {/* Active Consignment & Quick Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Shipment Telemetry Glimpse */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
                <Ship className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  Active Consignment
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Shipment #{activeShipment.trackingNumber}
                </h3>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-300 dark:border-teal-700 animate-pulse">
              🚢 In Transit
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-900/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Product & Cargo</span>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                {activeShipment.productName}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {activeShipment.quantity}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-900/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Route Corridor</span>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                JNPT Mumbai ➔ Hamburg
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Carrier: {activeShipment.carrierName}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-900/60 border border-slate-200/60 dark:border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Estimated Arrival</span>
              <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                {activeShipment.estimatedArrival}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Container: {activeShipment.containerNo?.split(' ')[0]}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Current Location: Indian Ocean / Gateway Corridor (24 Days Remaining)
            </span>
            <button
              onClick={() => setActiveTab('shipments')}
              className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View Live Map & Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Export Finance & Profitability Summary Card */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Export Profitability
                </h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                +28.4% Margin
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Export Invoice Value:</span>
                <span className="font-bold text-slate-900 dark:text-white">₹9,84,000</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Freight & Logistics Cost:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">₹1,65,000</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">RoDTEP Export Incentive:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">+₹24,600 (Refund)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">Net Estimated Profit:</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">₹2,80,400</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('simulator')}
            className="mt-6 w-full py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-navy-850 dark:hover:bg-navy-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Open Profitability Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
