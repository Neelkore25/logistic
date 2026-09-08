import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MARKET_RECOMMENDATIONS } from '../../data/countryRules';
import {
  Users,
  Compass,
  Ship,
  Plane,
  Truck,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Globe2,
  DollarSign
} from 'lucide-react';

export const ImporterRecommendation: React.FC = () => {
  const { selectedProduct, receiverProfile, setActiveTab, setDestinationCountry } = useApp();

  const [workflowMode, setWorkflowMode] = useState<'known' | 'unknown'>('known');

  // Mode A: Importer Known fields
  const [importerId, setImporterId] = useState('EORI-DE-9821034');
  const [importerName, setImporterName] = useState(receiverProfile.businessName || 'Global Buyers Inc.');
  const [buyerCountry, setBuyerCountry] = useState(receiverProfile.country || 'Germany');
  const [selectedTransport, setSelectedTransport] = useState<'ship' | 'plane' | 'cargo'>('ship');

  const activeProduct = selectedProduct || {
    id: 'placeholder',
    name: 'Primary Export Cargo',
    hsCode: '0801.32.00',
    type: 'food' as const,
    quantity: 1000,
    unit: 'kg'
  };

  // Mode B: Importer Unknown market recommendations
  const marketOptions = MARKET_RECOMMENDATIONS[activeProduct.type === 'textile' ? 'textile' : 'cashew'] || MARKET_RECOMMENDATIONS.cashew;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Importer / Receiver Recommendation
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              Transport & Market Matching
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Choose whether you have a contracted buyer or want ExportReady to recommend the highest-demand destination countries.
          </p>
        </div>

        {/* Workflow Switcher (Section 20 requirement: Mode A vs Mode B) */}
        <div className="p-1 bg-slate-100 dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center">
          <button
            onClick={() => setWorkflowMode('known')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              workflowMode === 'known'
                ? 'bg-white dark:bg-navy-800 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            A. Importer Known
          </button>
          <button
            onClick={() => setWorkflowMode('unknown')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              workflowMode === 'unknown'
                ? 'bg-gradient-to-r from-teal-500 to-sky-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            B. Importer Unknown (Find Market)
          </button>
        </div>
      </div>

      {/* WORKFLOW A: IMPORTER KNOWN */}
      {workflowMode === 'known' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Form Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
              Enter Contracted Importer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Importer Product ID / EORI / VAT ID
                </label>
                <input
                  type="text"
                  value={importerId}
                  onChange={e => setImporterId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-mono bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Buyer Company Name
                </label>
                <input
                  type="text"
                  value={importerName}
                  onChange={e => setImporterName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Destination Country
                </label>
                <input
                  type="text"
                  value={buyerCountry}
                  onChange={e => setBuyerCountry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Transport Mode Selection & Cost Comparison (Section 20 requirement) */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Recommended Mode of Transport & Cost Analysis
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calculated for {activeProduct.quantity.toLocaleString()} {activeProduct.unit} from JNPT Mumbai to Port of Hamburg
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Mode 1: Ship (Ocean Freight FCL) - Recommended */}
              <div
                onClick={() => setSelectedTransport('ship')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  selectedTransport === 'ship'
                    ? 'border-teal-500 bg-teal-50/30 dark:bg-teal-950/30 shadow-glow-teal ring-2 ring-teal-500/20'
                    : 'bg-white/60 dark:bg-navy-850 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                      <Ship className="w-6 h-6" />
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Recommended
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    Ship (Ocean 20ft FCL)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Maersk / MSC direct container service via Suez Canal.
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Expected Shipment Time:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">22 - 24 Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Shipment Freight Cost:</span>
                      <span className="font-extrabold text-teal-600 dark:text-teal-400 text-sm">₹1,65,000</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-1">
                  {selectedTransport === 'ship' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>Best for bulk & volume nuts / textiles</span>
                </div>
              </div>

              {/* Mode 2: Plane (Air Cargo) */}
              <div
                onClick={() => setSelectedTransport('plane')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  selectedTransport === 'plane'
                    ? 'border-sky-500 bg-sky-50/30 dark:bg-sky-950/30 shadow-glow-blue ring-2 ring-sky-500/20'
                    : 'bg-white/60 dark:bg-navy-850 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                      <Plane className="w-6 h-6" />
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                      Fastest
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    Plane (Air Freight)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Lufthansa Cargo / Emirates SkyCargo via BOM Airport.
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Expected Shipment Time:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">2 - 3 Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Shipment Freight Cost:</span>
                      <span className="font-extrabold text-sky-600 dark:text-sky-400 text-sm">₹3,40,000</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-sky-600 dark:text-sky-400 font-semibold flex items-center gap-1">
                  {selectedTransport === 'plane' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>Ideal for perishable samples & urgency</span>
                </div>
              </div>

              {/* Mode 3: Multimodal / Cargo */}
              <div
                onClick={() => setSelectedTransport('cargo')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  selectedTransport === 'cargo'
                    ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                    : 'bg-white/60 dark:bg-navy-850 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <Truck className="w-6 h-6" />
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                      Door-to-Door
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    Multimodal Cargo (DDP)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Factory stuffing + Port transshipment + EU bonded trucking.
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Expected Shipment Time:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">26 - 28 Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Shipment Freight Cost:</span>
                      <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">₹1,95,000</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                  {selectedTransport === 'cargo' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>Full logistics handling included</span>
                </div>
              </div>

            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveTab('logistics')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Continue to Logistic Planning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* WORKFLOW B: IMPORTER UNKNOWN (RECOMMEND BEST AVAILABLE DESTINATION COUNTRY) */}
      {workflowMode === 'unknown' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-teal-500 shrink-0" />
            <div className="text-xs text-teal-800 dark:text-teal-200">
              <span className="font-bold">AI Market Discovery:</span> Recommending the best available importing countries for{' '}
              <strong>{activeProduct.name} (HS {activeProduct.hsCode})</strong> based on Indian trade agreements, tariff concessions, and freight economics.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketOptions.map((opt, idx) => (
              <div
                key={opt.countryCode}
                className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{opt.flag}</span>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white">
                        {opt.countryName}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {opt.demandIndex} Demand
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px] block">Annual Market Size:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{opt.marketSizeUsd}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[11px] block">Import Tariff Rate:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{opt.avgTariffRate}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[11px] block">Recommended Mode & Transit:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {opt.recommendedTransport} • {opt.transitDays} Days
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[11px] block">Estimated Shipment Cost:</span>
                      <span className="font-extrabold text-teal-600 dark:text-teal-400 text-sm">
                        ₹{opt.freightCostEstInr.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-slate-400 text-[11px] block font-semibold mb-1">Key Buyer Segments:</span>
                      <div className="flex flex-wrap gap-1">
                        {opt.topBuyerSegments.map((seg, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-navy-850 text-slate-600 dark:text-slate-300">
                            {seg}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setDestinationCountry(opt.countryCode);
                    setActiveTab('logistics');
                  }}
                  className="mt-6 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Select {opt.countryName} as Target Market</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
