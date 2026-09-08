import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Bot,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  Building,
  CreditCard,
  Send,
  Download,
  AlertTriangle
} from 'lucide-react';

import { aiDocumentService } from '../../services/aiDocumentService';

export const AiDocumentAgentModal: React.FC = () => {
  const {
    aiModalOpen,
    targetAiDocument,
    closeAiDocumentAgent,
    resolveDocumentWithAi,
    userProfile
  } = useApp();

  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1);

  // Form details collected by AI for IEC application - clean initial states
  const [panNumber, setPanNumber] = useState(userProfile?.pan || '');
  const [bankAccount, setBankAccount] = useState('');
  const [adCode, setAdCode] = useState('');
  const [directorAadhaar, setDirectorAadhaar] = useState('');
  const [dgftCategory, setDgftCategory] = useState('Merchant cum Manufacturer Exporter');
  const [generatedDraftText, setGeneratedDraftText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!aiModalOpen || !targetAiDocument) return null;

  const docName = targetAiDocument.name;
  const isIec = targetAiDocument.id === 'doc-iec';

  const handleGenerateDraft = async () => {
    setIsGenerating(true);
    try {
      const draft = await aiDocumentService.generateDossier({
        documentCode: targetAiDocument.code,
        documentName: targetAiDocument.name,
        businessName: userProfile?.businessName || 'Exporter Enterprise',
        location: userProfile?.location || 'India',
        pan: panNumber || 'PENDING_REGISTRATION',
        adCode: adCode || 'PENDING_AD_CODE',
        bankDetails: bankAccount || 'Designated Bank',
        signatory: directorAadhaar || 'Authorized Signatory'
      });
      setGeneratedDraftText(draft.content);
      setWizardStep(3);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToVault = async () => {
    const fileName = isIec
      ? 'DGFT_IEC_Application_Prepared_DRAFT.pdf'
      : `${targetAiDocument.code}_Prepared_DRAFT.pdf`;

    await resolveDocumentWithAi(targetAiDocument.id, fileName, generatedDraftText);
    closeAiDocumentAgent();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-teal-500/40 overflow-hidden my-8 animate-in zoom-in-95">
        
        {/* Header with AI badge */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-navy-900 via-teal-950 to-navy-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center shadow-glow-teal">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">AI Document Agent</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500 text-white">
                  Preparation Assistant
                </span>
              </div>
              <p className="text-xs text-teal-300">
                Target: {docName} ({targetAiDocument.code})
              </p>
            </div>
          </div>

          <button
            onClick={closeAiDocumentAgent}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Legal & Government Disclaimer Banner (Section 16 Requirement) */}
        <div className="px-6 py-2.5 bg-amber-500/10 border-b border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
          <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <span className="font-bold">Government Issuance Disclaimer:</span> This AI tool provides assisted document preparation and guidance for DGFT / ICEGATE filing. Official licenses are granted exclusively by the competent Government of India authority.
          </p>
        </div>

        {/* Stepper Progress */}
        <div className="px-6 pt-4 pb-2 bg-slate-50/50 dark:bg-navy-850 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className={wizardStep === 1 ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-400'}>
              1. Document Purpose
            </span>
            <span className={wizardStep === 2 ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-400'}>
              2. Data Collection
            </span>
            <span className={wizardStep === 3 ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-400'}>
              3. Review Application Draft
            </span>
            <span className={wizardStep === 4 ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-400'}>
              4. Push to Vault
            </span>
          </div>
        </div>

        {/* Wizard Body */}
        <div className="p-6">
          
          {/* STEP 1: Identify Missing Document & Explain Why Needed & General Process */}
          {wizardStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                    Missing Requirement Detected
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {docName} (10-Digit Code)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Authority: {targetAiDocument.authority}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200">
                  Status: Missing
                </span>
              </div>

              {/* Conversational AI Message (Section 16 example) */}
              <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-navy-800/80 border border-teal-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300">
                  <Bot className="w-4 h-4" />
                  <span>AI Document Agent says:</span>
                </div>
                <blockquote className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic border-l-2 border-teal-500 pl-3">
                  "Your {docName} is currently missing. An {targetAiDocument.code} is required for exporting goods from India to foreign jurisdictions. I can help you prepare the required information and guide you through the application process. Let's begin."
                </blockquote>
              </div>

              {/* General Process Explanation */}
              <div className="space-y-2 pt-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Application Workflow (DGFT Portal)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850">
                    <span className="font-bold text-teal-600 dark:text-teal-400">Step A</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">Entity Details</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Match PAN and GSTIN records.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850">
                    <span className="font-bold text-teal-600 dark:text-teal-400">Step B</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">Bank & AD Code</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Link authorized forex bank account.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850">
                    <span className="font-bold text-teal-600 dark:text-teal-400">Step C</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mt-1">Aadhaar e-Sign</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Instant DSC / OTP verification.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Data Collection Form guided by AI */}
          {wizardStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-800 dark:text-teal-200">
                <span className="font-bold">Step-by-step guidance:</span> Verify the information required for generating your DGFT application dossier.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Business PAN Number
                  </label>
                  <input
                    type="text"
                    value={panNumber}
                    onChange={e => setPanNumber(e.target.value)}
                    placeholder="e.g. AAACS1234F"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-mono bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Exporter Entity Category
                  </label>
                  <input
                    type="text"
                    value={dgftCategory}
                    onChange={e => setDgftCategory(e.target.value)}
                    placeholder="e.g. Manufacturer Exporter"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Designated Forex Bank Account & Branch
                </label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={e => setBankAccount(e.target.value)}
                  placeholder="e.g. Account No, Bank Name, IFSC / SWIFT"
                  className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Authorized Dealer (AD) Code
                  </label>
                  <input
                    type="text"
                    value={adCode}
                    onChange={e => setAdCode(e.target.value)}
                    placeholder="e.g. 0291823"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-mono bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Managing Partner / Director Signatory
                  </label>
                  <input
                    type="text"
                    value={directorAadhaar}
                    onChange={e => setDirectorAadhaar(e.target.value)}
                    placeholder="e.g. Full Name of Director"
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Review Application Information / Document Preview */}
          {wizardStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-xl border border-teal-400/60 dark:border-teal-700 bg-slate-50 dark:bg-navy-850 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-teal-500" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      AI-Prepared Application Dossier
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">
                    Draft Ready
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono bg-white dark:bg-navy-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap">
                  {generatedDraftText || `APPLICANT: ${userProfile?.businessName || 'Exporter'}\nPAN: ${panNumber || 'PENDING'}\nAD CODE: ${adCode || 'PENDING'}\nBANK: ${bankAccount || 'PENDING'}`}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-300">
                You can now save this prepared document into your <strong>Document Vault</strong>. It will automatically update your Export Readiness percentage.
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-850 flex items-center justify-between">
          {wizardStep > 1 ? (
            <button
              onClick={() => setWizardStep(prev => (prev - 1) as any)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-800 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {wizardStep === 1 && (
            <button
              onClick={() => setWizardStep(2)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center gap-1.5 cursor-pointer"
            >
              <span>Let's Begin Preparation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {wizardStep === 2 && (
            <button
              onClick={handleGenerateDraft}
              disabled={isGenerating}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center gap-1.5 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating Draft Dossier...</span>
                </>
              ) : (
                <>
                  <span>Generate Application Draft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}

          {wizardStep === 3 && (
            <button
              onClick={handleSaveToVault}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Upload into Document Vault</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
