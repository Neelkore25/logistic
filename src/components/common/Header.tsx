import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage, LANGUAGES, LanguageCode } from '../../context/LanguageContext';
import {
  Globe2,
  Moon,
  Sun,
  Bell,
  HelpCircle,
  LogOut,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Building,
  UserCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    userRole,
    tradeType,
    setTradeType,
    isDarkMode,
    toggleDarkMode,
    userProfile,
    receiverProfile,
    logout,
    openDictionary,
    readinessScore,
    openOnboarding
  } = useApp();

  const { currentLanguage, setLanguage, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const activeName = userRole === 'sender' ? userProfile.businessName : receiverProfile.businessName;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-sky-500 text-white shadow-glow-teal">
            <Globe2 className="w-6 h-6 animate-pulse-glow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Export<span className="text-teal-500 dark:text-teal-400">Ready</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 dark:bg-teal-950/80 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60">
                SaaS MSME
              </span>
            </div>
            <p className="hidden md:block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              India-Ready ➔ Export-Ready ➔ Shipment Delivered
            </p>
          </div>
        </div>

        {/* Middle: Trade Scope Toggle (Domestic vs International) */}
        <div className="hidden lg:flex items-center p-1 bg-slate-100 dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <button
            onClick={() => setTradeType('domestic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tradeType === 'domestic'
                ? 'bg-white dark:bg-navy-800 text-slate-900 dark:text-teal-300 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <span>🇮🇳</span>
            <span>{t('domestic')}</span>
          </button>
          <button
            onClick={() => setTradeType('international')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tradeType === 'international'
                ? 'bg-gradient-to-r from-teal-600 to-sky-600 text-white shadow-md'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <span>🌍</span>
            <span>{t('international')}</span>
          </button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Readiness quick badge */}
          <button
            onClick={openOnboarding}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/50 hover:border-teal-400 transition-all cursor-pointer"
            title="Click to view 5-step onboarding guide"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-xs font-bold text-teal-900 dark:text-teal-200">
              {readinessScore}% Ready
            </span>
          </button>

          {/* Language Selector Dropdown (Accessible everywhere) */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 border border-slate-200/80 dark:border-slate-700/60 transition-colors"
              title="Change Language / भाषा बदलें"
            >
              <Globe2 className="w-3.5 h-3.5 text-teal-500" />
              <span>{LANGUAGES.find(l => l.code === currentLanguage)?.nativeName}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl shadow-xl glass-card bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 py-1.5 z-50">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Language
                </div>
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as LanguageCode);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-teal-50 dark:hover:bg-navy-800 transition-colors ${
                      currentLanguage === lang.code
                        ? 'font-bold text-teal-600 dark:text-teal-400 bg-teal-50/50 dark:bg-navy-800/50'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({lang.label})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Dictionary / Help modal button */}
          <button
            onClick={openDictionary}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            title="Export Glossary & Help (IEC, HS Code, CHA, Incoterms)"
          >
            <HelpCircle className="w-4 h-4 text-teal-500" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-teal-500"></span>
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl shadow-2xl glass-card bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Export Alerts (2)</span>
                  <span className="text-[10px] text-teal-600 dark:text-teal-400 cursor-pointer">Mark read</span>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40">
                    <p className="font-semibold text-amber-800 dark:text-amber-300">Action Required: IEC Missing</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                      Use the AI Document Agent to prepare your 10-digit DGFT code application.
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-800/40">
                    <p className="font-semibold text-sky-800 dark:text-sky-300">Shipment EXP-8842 Cleared</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                      Customs Let Export Order (LEO) accepted by JNPT customs.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {userRole === 'sender' ? 'EX' : 'BY'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[130px]">
                  {activeName.split(' ')[0]}
                </p>
                <p className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                  {userRole === 'sender' ? '🇮🇳 Exporter (Sender)' : '🌍 Buyer (Receiver)'}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-2xl glass-card bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 p-3 z-50">
                <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {activeName}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {userRole === 'sender' ? userProfile.email : receiverProfile.email}
                  </p>
                  <span className="mt-1.5 inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200">
                    {userRole === 'sender' ? 'Exporter Profile' : 'Receiver Profile'}
                  </span>
                </div>

                <div className="pt-2 space-y-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      openOnboarding();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                    <span>View Onboarding Stepper</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
