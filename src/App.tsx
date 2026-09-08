import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/Toast';
import { SplitScreenLogin } from './components/auth/SplitScreenLogin';
import { SenderRegisterModal } from './components/auth/SenderRegisterModal';
import { ReceiverRegisterModal } from './components/auth/ReceiverRegisterModal';
import { OnboardingStepper } from './components/auth/OnboardingStepper';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { EligibilityAssessment } from './components/assessment/EligibilityAssessment';
import { ProductSetup } from './components/products/ProductSetup';
import { DocumentVault } from './components/vault/DocumentVault';
import { ConsistencyChecker } from './components/consistency/ConsistencyChecker';
import { DynamicPackagingChecklist } from './components/packaging/DynamicPackagingChecklist';
import { ImporterRecommendation } from './components/recommendation/ImporterRecommendation';
import { ProfitabilitySimulator } from './components/simulator/ProfitabilitySimulator';
import { LogisticsPlanner } from './components/logistics/LogisticsPlanner';
import { ShipmentTracking } from './components/shipment/ShipmentTracking';
import { PaymentsSection } from './components/payments/PaymentsSection';
import { AiDocumentAgentModal } from './components/ai-agent/AiDocumentAgentModal';
import { ExportDictionaryModal } from './components/help/ExportDictionaryModal';
import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  Package,
  Ship,
  FileCheck2,
  BoxSelect,
  Globe,
  Calculator,
  Compass
} from 'lucide-react';

const MainAppLayout: React.FC = () => {
  const { isAuthenticated, activeTab, setActiveTab } = useApp();

  const [registerSenderOpen, setRegisterSenderOpen] = useState(false);
  const [registerReceiverOpen, setRegisterReceiverOpen] = useState(false);

  // If not logged in, render Split-Screen Login
  if (!isAuthenticated) {
    return (
      <>
        <SplitScreenLogin
          onOpenRegisterSender={() => setRegisterSenderOpen(true)}
          onOpenRegisterReceiver={() => setRegisterReceiverOpen(true)}
        />
        <SenderRegisterModal
          isOpen={registerSenderOpen}
          onClose={() => setRegisterSenderOpen(false)}
        />
        <ReceiverRegisterModal
          isOpen={registerReceiverOpen}
          onClose={() => setRegisterReceiverOpen(false)}
        />
        <ToastContainer />
      </>
    );
  }

  // Active view renderer
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'assessment':
        return <EligibilityAssessment />;
      case 'products':
        return <ProductSetup />;
      case 'vault':
        return <DocumentVault />;
      case 'consistency':
        return <ConsistencyChecker />;
      case 'packaging':
        return <DynamicPackagingChecklist />;
      case 'recommendation':
        return <ImporterRecommendation />;
      case 'simulator':
        return <ProfitabilitySimulator />;
      case 'logistics':
        return <LogisticsPlanner />;
      case 'shipments':
        return <ShipmentTracking />;
      case 'payments':
        return <PaymentsSection />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Sticky Header */}
      <Header />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop / Tablet Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Section 34 Requirement) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around">
        {[
          { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
          { id: 'vault', label: 'Vault', icon: FileText },
          { id: 'consistency', label: 'Check', icon: FileCheck2 },
          { id: 'packaging', label: 'Pack', icon: BoxSelect },
          { id: 'shipments', label: 'Track', icon: Ship }
        ].map(nav => {
          const Icon = nav.icon;
          const isActive = activeTab === nav.id;

          return (
            <button
              key={nav.id}
              onClick={() => setActiveTab(nav.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
                isActive
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{nav.label}</span>
            </button>
          );
        })}
      </div>

      {/* Modals & Overlays */}
      <SenderRegisterModal
        isOpen={registerSenderOpen}
        onClose={() => setRegisterSenderOpen(false)}
      />
      <ReceiverRegisterModal
        isOpen={registerReceiverOpen}
        onClose={() => setRegisterReceiverOpen(false)}
      />
      <OnboardingStepper />
      <AiDocumentAgentModal />
      <ExportDictionaryModal />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainAppLayout />
      </AppProvider>
    </LanguageProvider>
  );
};

export default App;
