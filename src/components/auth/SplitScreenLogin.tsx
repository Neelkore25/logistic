import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage, LANGUAGES, LanguageCode } from '../../context/LanguageContext';
import { UserRole } from '../../types/export';
import { GlobeAnimation } from '../common/GlobeAnimation';
import {
  Globe2,
  ShieldCheck,
  Building2,
  Users2,
  ArrowRight,
  Lock,
  Mail,
  User,
  CheckCircle2,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface SplitScreenLoginProps {
  onOpenRegisterSender: () => void;
  onOpenRegisterReceiver: () => void;
}

export const SplitScreenLogin: React.FC<SplitScreenLoginProps> = ({
  onOpenRegisterSender,
  onOpenRegisterReceiver
}) => {
  const { login } = useApp();
  const { currentLanguage, setLanguage, t } = useLanguage();

  const [selectedRole, setSelectedRole] = useState<UserRole>('sender');
  const [identifier, setIdentifier] = useState('exports@sahyadriagro.in');
  const [username, setUsername] = useState('sahyadri_exporter');
  const [password, setPassword] = useState('••••••••••••');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [registerChoiceOpen, setRegisterChoiceOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, username);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-900 text-slate-100 overflow-x-hidden selection:bg-teal-500 selection:text-white">
      
      {/* Top Global Bar for Language & Quick Mode */}
      <div className="absolute top-4 right-6 z-30 flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-teal-300 border border-teal-500/30 backdrop-blur-md transition-colors"
          >
            <Globe2 className="w-3.5 h-3.5 text-teal-400" />
            <span>{LANGUAGES.find(l => l.code === currentLanguage)?.nativeName}</span>
            <ChevronDown className="w-3 h-3 text-teal-400 opacity-70" />
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-2xl bg-navy-900 border border-slate-700 py-2 z-50">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Select Platform Language
              </div>
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as LanguageCode);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-navy-800 transition-colors ${
                    currentLanguage === lang.code ? 'font-bold text-teal-400 bg-navy-800/60' : 'text-slate-300'
                  }`}
                >
                  <span>{lang.nativeName}</span>
                  <span className="text-[10px] text-slate-500">({lang.label})</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LEFT SIDE: Branding, Value Prop & Globe Visual */}
      <div className="lg:w-1/2 min-h-[460px] lg:min-h-screen bg-india-world p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500 text-white shadow-glow-teal">
              <Globe2 className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">
                Export<span className="text-teal-400">Ready</span>
              </h1>
              <span className="text-xs font-semibold text-teal-300 tracking-wider uppercase">
                Indian MSME Readiness Platform
              </span>
            </div>
          </div>
        </div>

        {/* Center: Globe visualization & Statement */}
        <div className="my-auto py-8 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-300 border border-teal-400/25 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tier-2 & Tier-3 Exporter Enablement</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-lg">
            {t('journeyStarts')}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-md leading-relaxed">
            Simplifying international trade logistics for Indian businesses: from local factory stuffing to global customs delivery.
          </p>

          {/* Interactive Globe */}
          <div className="mt-6 w-full max-w-sm flex justify-center">
            <GlobeAnimation className="scale-90 sm:scale-100" />
          </div>

          {/* 4-Stage Progressive Workflow */}
          <div className="mt-6 flex items-center justify-center flex-wrap gap-2 text-xs font-bold text-slate-300">
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-teal-300">
              🇮🇳 India-Ready
            </span>
            <span className="text-teal-500">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-sky-300">
              📋 Export-Ready
            </span>
            <span className="text-teal-500">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-teal-300">
              📦 Shipment Ready
            </span>
            <span className="text-teal-500">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-emerald-300">
              🏁 Delivered
            </span>
          </div>
        </div>

        {/* Footer Principles */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Bank & Customs Grade Compliance</span>
          </div>
          <span>v2.4 LTS</span>
        </div>
      </div>

      {/* RIGHT SIDE: Split-screen Login Card */}
      <div className="lg:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center relative bg-slate-950">
        
        <div className="w-full max-w-md space-y-8">
          
          {/* Header */}
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Sign in to your portal
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
              Choose your role and manage your export or import shipment workflow.
            </p>
          </div>

          {/* Section 3: Entry Selection (Sender vs Receiver) */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Select Your Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              
              {/* Sender Option */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('sender');
                  setIdentifier('exports@sahyadriagro.in');
                  setUsername('sahyadri_exporter');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  selectedRole === 'sender'
                    ? 'bg-gradient-to-br from-navy-850 to-teal-950 border-teal-500 shadow-glow-teal text-white ring-2 ring-teal-500/20'
                    : 'bg-navy-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  {selectedRole === 'sender' && (
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  )}
                </div>
                <div className="font-bold text-sm text-white">Sender</div>
                <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                  Exporter / Business sending goods from India
                </div>
              </button>

              {/* Receiver Option */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('receiver');
                  setIdentifier('import@bavaria-biofoods.de');
                  setUsername('bavaria_bio');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  selectedRole === 'receiver'
                    ? 'bg-gradient-to-br from-navy-850 to-sky-950 border-sky-500 shadow-glow-blue text-white ring-2 ring-sky-500/20'
                    : 'bg-navy-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                    <Users2 className="w-5 h-5" />
                  </div>
                  {selectedRole === 'receiver' && (
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  )}
                </div>
                <div className="font-bold text-sm text-white">Receiver</div>
                <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                  Buyer / Business receiving imported goods
                </div>
              </button>

            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Field: Mobile / Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mobile Number or Business Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="e.g. exports@sahyadriagro.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                />
              </div>
            </div>

            {/* Field: Username */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                />
              </div>
            </div>

            {/* Field: Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                <a href="#forgot" className="text-[11px] text-teal-400 hover:text-teal-300 transition-colors">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors"
                />
              </div>
            </div>

            {/* Action 1: Submit Login */}
            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-500 via-teal-600 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] cursor-pointer"
            >
              <span>{t('login')} as {selectedRole === 'sender' ? 'Sender (Exporter)' : 'Receiver (Buyer)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Action 2: Create Account Options (Sender vs Receiver) */}
          <div className="pt-4 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-400 mb-3">
              Don't have an ExportReady account yet?
            </p>

            <div className="relative inline-block w-full">
              <button
                type="button"
                onClick={() => setRegisterChoiceOpen(!registerChoiceOpen)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-teal-300 bg-navy-900 hover:bg-navy-850 border border-teal-500/30 flex items-center justify-center gap-2 transition-colors"
              >
                <span>{t('createAccount')}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {registerChoiceOpen && (
                <div className="mt-2 w-full rounded-xl p-2 bg-navy-900 border border-slate-700 shadow-xl text-left space-y-1.5 animate-in fade-in">
                  <button
                    onClick={() => {
                      setRegisterChoiceOpen(false);
                      onOpenRegisterSender();
                    }}
                    className="w-full p-2.5 rounded-lg text-left hover:bg-teal-500/10 text-xs text-white border border-transparent hover:border-teal-500/30 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-teal-300">Register as Sender</div>
                      <div className="text-[10px] text-slate-400">For Indian Exporters & Manufacturers</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                  </button>

                  <button
                    onClick={() => {
                      setRegisterChoiceOpen(false);
                      onOpenRegisterReceiver();
                    }}
                    className="w-full p-2.5 rounded-lg text-left hover:bg-sky-500/10 text-xs text-white border border-transparent hover:border-sky-500/30 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-sky-300">Register as Receiver</div>
                      <div className="text-[10px] text-slate-400">For Overseas & Domestic Importers/Buyers</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
