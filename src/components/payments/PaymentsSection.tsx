import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { PLAN_TIERS, PlanTier, paymentService } from '../../services/paymentService';
import { PaymentRecord } from '../../types/export';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  RotateCw
} from 'lucide-react';

export const PaymentsSection: React.FC = () => {
  const { userAccount, businessProfile, payments, refreshUserData, triggerToast } = useApp();
  const { t } = useLanguage();

  const [selectedPlan, setSelectedPlan] = useState<PlanTier>(PLAN_TIERS[1]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Active plan determination
  const latestSuccessfulPayment = payments.find(p => p.status === 'succeeded');
  const currentPlanName = latestSuccessfulPayment ? latestSuccessfulPayment.planName : 'MSME Starter (Free Tier)';

  const handleUpgrade = async (plan: PlanTier) => {
    if (!userAccount) return;
    setIsProcessing(true);

    try {
      const record = await paymentService.processSandboxPayment(userAccount.id, plan);
      await refreshUserData();
      triggerToast(
        'Payment Processed (Sandbox)',
        `Subscribed to ${plan.name} for ₹${plan.priceInr.toLocaleString('en-IN')}. Tax invoice generated.`,
        'success'
      );
    } catch (err: any) {
      triggerToast('Payment Failed', err.message || 'Unable to complete sandbox transaction', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadReceipt = (payment: PaymentRecord) => {
    paymentService.downloadReceipt(payment, businessProfile?.businessName);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('paymentsTitle')}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              INR (₹) Billing
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your subscription tiers, export service licenses, and view downloadable tax invoices.
          </p>
        </div>

        {/* Sandbox Indicator */}
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-xs font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>{t('sandboxNotice')}</span>
        </div>
      </div>

      {/* Current Subscription Status Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-600 text-white shadow-glow-teal">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t('currentPlan')}
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {currentPlanName}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Account ID: <span className="font-mono text-teal-600 dark:text-teal-400">{userAccount?.id}</span> • Status: Active
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Subscription Active</span>
          </span>
        </div>
      </div>

      {/* Available Plans Grid */}
      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
          {t('subscriptionTiers')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLAN_TIERS.map(plan => {
            const isCurrent = currentPlanName.toLowerCase().includes(plan.name.toLowerCase());

            return (
              <div
                key={plan.id}
                className={`p-6 rounded-2xl border flex flex-col justify-between transition-all relative ${
                  plan.recommended
                    ? 'border-teal-500 bg-teal-50/20 dark:bg-teal-950/30 shadow-glow-teal ring-2 ring-teal-500/20'
                    : 'glass-card border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {plan.name}
                    </span>
                    {plan.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500 text-white">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">
                      ₹{plan.priceInr.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400"> / month</span>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-800 opacity-80 cursor-default"
                    >
                      ✓ Currently Active Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(plan)}
                      disabled={isProcessing}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-400 hover:to-sky-500 shadow-glow-teal flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Processing Gateway...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe (Sandbox Test)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment History & Receipts Table */}
      <div className="glass-card rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-navy-850 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            {t('paymentHistory')}
          </h3>
          <span className="text-xs text-slate-500">
            {payments.length} Transaction(s)
          </span>
        </div>

        {payments.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-400">
            No payments or charges recorded yet for this account.
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {payments.map(p => (
              <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                      {p.invoiceNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {p.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                    {p.planName}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Txn ID: {p.paymentId} • Date: {new Date(p.createdAt).toLocaleDateString('en-IN')} • {p.paymentMethod}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-base font-extrabold text-slate-900 dark:text-white">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => handleDownloadReceipt(p)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-navy-800 border border-teal-200 dark:border-teal-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
