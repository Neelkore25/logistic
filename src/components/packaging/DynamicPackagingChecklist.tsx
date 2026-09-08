import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DESTINATION_COUNTRIES } from '../../data/countryRules';
import {
  BoxSelect,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Globe2,
  Package,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export const DynamicPackagingChecklist: React.FC = () => {
  const {
    selectedProduct,
    destinationCountryCode,
    setDestinationCountry,
    packagingChecklist,
    toggleChecklistItem,
    products,
    selectProductById,
    triggerToast
  } = useApp();

  const [selectedPackagingType, setSelectedPackagingType] = useState<string>('Vacuum Packaging');
  const [protectionChecks, setProtectionChecks] = useState<Record<string, boolean>>({
    moisture: true,
    breakage: true,
    shock: true,
    temperature: false,
    properSealing: true,
    tamperProtection: true,
    outerPackaging: true
  });

  const activeCountry = DESTINATION_COUNTRIES.find(c => c.code === destinationCountryCode) || DESTINATION_COUNTRIES[0];

  const toggleProtection = (key: string) => {
    setProtectionChecks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const packagingTypes = [
    { id: 'Box / Carton', label: 'Box / Corrugated Carton (5-Ply/7-Ply)', icon: '📦' },
    { id: 'Plastic / Food-Grade Packaging', label: 'Plastic / Food-Grade Multilayer Pouch', icon: '🛍️' },
    { id: 'Glass Bottle', label: 'Glass Bottle / Jar Packaging', icon: '🍾' },
    { id: 'Metal Container', label: 'Metal Drum / Tin Container', icon: '🥫' },
    { id: 'Wooden Packaging', label: 'Wooden Crate / ISPM-15 Fumigated Box', icon: '🪵' },
    { id: 'Vacuum Packaging', label: 'Vacuum Packaging with Nitrogen Gas Flush', icon: '💨' },
    { id: 'Pallet Packaging', label: 'EPAL / GMA Wooden Heat-Treated Pallet', icon: '🏗️' }
  ];

  const protectionItems = [
    { id: 'moisture', label: 'Protection from Moisture & Container Condensation', desc: 'Silica gel desiccant packs & waterproof barrier polyethylene film' },
    { id: 'breakage', label: 'Protection from Breakage & Crushing', desc: 'Bursting strength tested corrugated partitions & corner protectors' },
    { id: 'shock', label: 'Shock & Vibration Protection', desc: 'Anti-vibration dunnage bags preventing container cargo shift at sea' },
    { id: 'temperature', label: 'Temperature Requirements (Reefer / Dry Cargo)', desc: 'Temperature data-logger recording 18°C-22°C ambient or cold chain' },
    { id: 'properSealing', label: 'Proper Sealing & Industrial Taping', desc: 'Heavy-duty BOPP cross-reinforced fiber adhesive seal on all carton flaps' },
    { id: 'tamperProtection', label: 'Tamper Protection & Security Seal', desc: 'Numbered barcode tamper-evident void tape and container bolt seal' },
    { id: 'outerPackaging', label: 'Suitable Outer Master Packaging & Shrink Wrap', desc: '50-micron UV resistant stretch shrink film wrapped around full pallet' }
  ];

  const checkedCount = packagingChecklist.filter(c => c.checked).length;
  const totalCount = packagingChecklist.length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Packaging & Labelling Compliance
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              Dynamic Rules Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Requirements change dynamically according to your selected export product and target country.
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl glass-card text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2 border border-teal-500/30">
          <CheckCircle2 className="w-4 h-4" />
          <span>{checkedCount} of {totalCount} Items Verified</span>
        </div>
      </div>

      {/* Product & Destination Selector Bar */}
      <div className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/60 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Active Product Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              1. Select Export Product
            </label>
            {products.length === 0 ? (
              <div className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-700 text-slate-500">
                No products added yet. Add a product in Product Setup.
              </div>
            ) : (
              <>
                <select
                  value={selectedProduct?.id || ''}
                  onChange={e => selectProductById(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.category} — HS {p.hsCode})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-teal-600 dark:text-teal-400 mt-1">
                  Active Category: <span className="font-semibold uppercase">{selectedProduct?.type || 'Standard'}</span>
                </p>
              </>
            )}
          </div>

          {/* Destination Country Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              2. Select Destination Country
            </label>
            <select
              value={destinationCountryCode}
              onChange={e => setDestinationCountry(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
            >
              {DESTINATION_COUNTRIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name} ({c.region} — {c.standardPort})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-teal-600 dark:text-teal-400 mt-1">
              Language Mandate: <span className="font-semibold">{activeCountry.languageRequirement.split('(')[0]}</span>
            </p>
          </div>

        </div>
      </div>

      {/* SECTION 18: DYNAMIC CHECKLIST */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">📦</span>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Dynamic Packing & Labelling Checklist
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tailored for {selectedProduct?.name || 'Export Cargo'} shipped to {activeCountry.name}
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
            {activeCountry.palletStandard.split('(')[0]}
          </span>
        </div>

        {/* Dynamic Checklist Items */}
        <div className="space-y-2.5">
          {packagingChecklist.map(item => (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                item.checked
                  ? 'bg-teal-50/40 dark:bg-teal-950/20 border-teal-500/40 text-slate-900 dark:text-white'
                  : 'bg-white/60 dark:bg-navy-850/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => {}} // handled by parent div
                  className="mt-1 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 pointer-events-none"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold">
                      {item.label}
                    </span>
                    {item.destinationSpecific && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                        {item.destinationSpecific} Specific
                      </span>
                    )}
                    {item.productSpecific && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        {item.productSpecific} Specific
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              <span className={`text-[10px] font-bold uppercase shrink-0 px-2 py-0.5 rounded ${
                item.checked
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-slate-100 text-slate-500 dark:bg-navy-800 dark:text-slate-400'
              }`}>
                {item.checked ? 'Passed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 19: PACKAGING TYPE & PRODUCT PROTECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Packaging Type Selector */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg space-y-4">
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Packaging Type Selection
            </h3>
            <span className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
              Cargo Suitability
            </span>
          </div>

          <div className="space-y-2">
            {packagingTypes.map(pkg => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedPackagingType(pkg.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  selectedPackagingType === pkg.id
                    ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 font-bold ring-2 ring-teal-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-navy-850/50 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                  <span className="text-lg">{pkg.icon}</span>
                  <span>{pkg.label}</span>
                </div>
                {selectedPackagingType === pkg.id && (
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 🛡 Product Protection Checklist */}
        <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg space-y-4">
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                🛡 Product Protection Checklist
              </h3>
            </div>
            <span className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
              Ocean Transit Grade
            </span>
          </div>

          <div className="space-y-2.5">
            {protectionItems.map(item => {
              const isChecked = protectionChecks[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => toggleProtection(item.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isChecked
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-white/50 dark:bg-navy-850/50 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 w-4 h-4 rounded text-teal-600 border-slate-300 pointer-events-none"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.label}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                    isChecked
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-500 dark:bg-navy-800 dark:text-slate-400'
                  }`}>
                    {isChecked ? 'Protected' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
