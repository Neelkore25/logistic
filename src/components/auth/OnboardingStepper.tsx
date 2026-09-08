import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DESTINATION_COUNTRIES } from '../../data/countryRules';
import {
  X,
  CheckCircle2,
  Building2,
  Package,
  FileText,
  Globe2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export const OnboardingStepper: React.FC = () => {
  const {
    onboardingModalOpen,
    closeOnboarding,
    userProfile,
    updateUserProfile,
    selectedProduct,
    destinationCountryCode,
    setDestinationCountry,
    readinessScore,
    triggerToast
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);

  if (!onboardingModalOpen) return null;

  const steps = [
    { number: 1, title: 'Business Details', icon: Building2, desc: 'Corporate identity and MSME classification' },
    { number: 2, title: 'Products', icon: Package, desc: 'Primary export line & HSN classification' },
    { number: 3, title: 'GST / IEC / Registrations', icon: FileText, desc: 'Statutory foreign trade licenses' },
    { number: 4, title: 'Export Destination', icon: Globe2, desc: 'Target overseas market & port' },
    { number: 5, title: 'Business Verification', icon: ShieldCheck, desc: 'Compliance validation & readiness audit' }
  ];

  const handleFinish = () => {
    closeOnboarding();
    triggerToast('Onboarding Complete', 'Your business is primed for export workflow.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-navy-900 via-navy-850 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                Step {currentStep} of 5
              </span>
              <h3 className="text-lg font-bold">
                Let's get your business Export-Ready.
              </h3>
            </div>
          </div>
          <button
            onClick={closeOnboarding}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 py-4 bg-slate-50/70 dark:bg-navy-850/60 border-b border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
            {steps.map(s => {
              const isPast = s.number < currentStep;
              const isCurrent = s.number === currentStep;

              return (
                <button
                  key={s.number}
                  onClick={() => setCurrentStep(s.number)}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPast
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-teal-500 text-white ring-4 ring-teal-500/20 shadow-glow-teal'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : s.number}
                  </div>
                  <span className={`text-[10px] mt-1 font-semibold truncate max-w-[70px] ${
                    isCurrent ? 'text-teal-600 dark:text-teal-300' : 'text-slate-500'
                  }`}>
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content per step */}
        <div className="p-6">
          
          {/* Step 1: Business Details */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-xs text-teal-800 dark:text-teal-200">
                <span className="font-bold">Exporter Verification:</span> Confirm your registered legal trade name and MSME operational facility.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Registered Business Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.businessName}
                    onChange={e => updateUserProfile({ businessName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Operational City & State
                  </label>
                  <input
                    type="text"
                    value={userProfile.location}
                    onChange={e => updateUserProfile({ location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  MSME Experience Tier
                </label>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-800 text-xs font-medium text-slate-700 dark:text-slate-300">
                  {userProfile.exportExperience}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Products */}
          {currentStep === 2 && (() => {
            const product = selectedProduct || {
              name: 'Pending Product Addition',
              hsCode: '------',
              description: 'Configure your primary export commodity in the Product Setup screen.',
              category: 'General Goods',
              origin: 'India'
            };
            return (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-xs text-teal-800 dark:text-teal-200">
                  <span className="font-bold">Product Readiness:</span> Review your primary export product and Harmonized System (HS) code.
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-850 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {product.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300">
                      HS {product.hsCode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span>Category: {product.category}</span>
                    <span>Origin: {product.origin}</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Step 3: GST / IEC / Registrations */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-xs text-teal-800 dark:text-teal-200">
                <span className="font-bold">Statutory Approvals:</span> Verify critical licenses required before container booking.
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">GST Registration (GSTIN)</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Letter of Undertaking (LUT)</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Filed
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Importer Exporter Code (IEC)</span>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400">DGFT 10-digit code</p>
                  </div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    AI Assistant Available
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Export Destination */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-xs text-teal-800 dark:text-teal-200">
                <span className="font-bold">Target Market:</span> Choose your destination to automatically adapt packaging and customs regulations.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DESTINATION_COUNTRIES.map(country => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => setDestinationCountry(country.code)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      destinationCountryCode === country.code
                        ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/60 text-slate-900 dark:text-white ring-2 ring-teal-500/20 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                      <span className="text-xl">{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {country.standardPort}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Business Verification */}
          {currentStep === 5 && (
            <div className="space-y-4 text-center py-2 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Readiness Score: {readinessScore}%
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md mx-auto">
                  Your enterprise profile is configured. You can now use the interactive journey tracker, document vault, and dynamic packaging checks.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-navy-800 text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-sm mx-auto">
                Next Best Action: Complete remaining missing documents in the Document Vault.
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-850 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center gap-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg flex items-center gap-1.5"
            >
              <span>Go to Export Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
