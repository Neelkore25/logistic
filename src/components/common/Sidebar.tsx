import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  LayoutDashboard,
  ShieldCheck,
  Package,
  FileText,
  FileCheck2,
  BoxSelect,
  Globe,
  Calculator,
  Compass,
  Ship,
  HelpCircle,
  Sparkles,
  CreditCard,
  Database
} from 'lucide-react';

interface NavItem {
  id: string;
  labelKey: string;
  defaultLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    documents,
    consistencyData,
    readinessScore,
    isReadinessAssessed,
    openDictionary,
    openOnboarding
  } = useApp();
  const { t } = useLanguage();

  const missingDocsCount = documents.filter(d => d.mandatory && d.status === 'missing').length;

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      labelKey: 'dashboard',
      defaultLabel: 'Main Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'assessment',
      labelKey: 'assessment',
      defaultLabel: 'Export Eligibility',
      icon: ShieldCheck,
      badge: isReadinessAssessed ? `${readinessScore}%` : 'Pending',
      badgeColor: isReadinessAssessed && readinessScore >= 80
        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
    },
    {
      id: 'products',
      labelKey: 'products',
      defaultLabel: 'Products & HS Code',
      icon: Package
    },
    {
      id: 'vault',
      labelKey: 'documentVault',
      defaultLabel: 'Document Vault',
      icon: FileText,
      badge: missingDocsCount > 0 ? `${missingDocsCount} Missing` : 'Complete',
      badgeColor: missingDocsCount > 0 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
    },
    {
      id: 'consistency',
      labelKey: 'consistencyChecker',
      defaultLabel: 'Consistency Checker',
      icon: FileCheck2,
      badge: !consistencyData ? 'Pending' : !consistencyData.isConsistent ? 'Review' : 'Match',
      badgeColor: !consistencyData
        ? 'bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-slate-300'
        : !consistencyData.isConsistent
        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
    },
    {
      id: 'packaging',
      labelKey: 'packagingChecklist',
      defaultLabel: 'Packaging & Labelling',
      icon: BoxSelect
    },
    {
      id: 'recommendation',
      labelKey: 'recommendation',
      defaultLabel: 'Importer & Markets',
      icon: Globe
    },
    {
      id: 'simulator',
      labelKey: 'profitabilitySimulator',
      defaultLabel: 'Profitability Simulator',
      icon: Calculator
    },
    {
      id: 'logistics',
      labelKey: 'logistics',
      defaultLabel: 'Logistics & Costs',
      icon: Compass
    },
    {
      id: 'shipments',
      labelKey: 'liveTracking',
      defaultLabel: 'Shipment & Tracking',
      icon: Ship,
      badge: 'Live',
      badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 animate-pulse'
    },
    {
      id: 'payments',
      labelKey: 'navPayments',
      defaultLabel: 'Pricing & Plans',
      icon: CreditCard,
      badge: 'SaaS Pro',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
    },
    {
      id: 'database',
      labelKey: 'navDatabase',
      defaultLabel: 'Live Database',
      icon: Database,
      badge: 'IndexedDB',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
    }
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-slate-200/80 dark:border-slate-800/80 glass-panel h-[calc(100vh-4rem)] sticky top-16 transition-colors">
      
      {/* Top Banner: Core Principle Reminder */}
      <div className="p-3.5 m-3 rounded-xl bg-gradient-to-br from-navy-900 via-navy-850 to-teal-950 text-white shadow-md border border-teal-500/20">
        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Export Guidance</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-300 italic">
          "What is done? What is pending? What should I do next?"
        </p>
        <button
          onClick={openOnboarding}
          className="mt-2.5 w-full text-center py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-400/30 transition-all"
        >
          View Onboarding Steps ➔
        </button>
      </div>

      {/* Main navigation links */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500 to-sky-600 text-white shadow-glow-teal'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-900 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-500 dark:text-teal-400'
                  }`}
                />
                <span className="truncate">{item.defaultLabel}</span>
              </div>

              {item.badge && (
                <span
                  className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Helper */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80">
        <button
          onClick={openDictionary}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors border border-dashed border-slate-300 dark:border-slate-700"
        >
          <HelpCircle className="w-4 h-4 text-teal-500" />
          <span>Export Jargon & Help</span>
        </button>
      </div>

    </aside>
  );
};
