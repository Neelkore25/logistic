import { PaymentRecord } from '../types/export';
import { db } from './databaseService';

export interface PlanTier {
  id: string;
  name: string;
  priceInr: number;
  period: 'monthly' | 'annual';
  badge?: string;
  features: string[];
  recommended?: boolean;
}

export const PLAN_TIERS: PlanTier[] = [
  {
    id: 'plan_starter',
    name: 'MSME Starter',
    priceInr: 0,
    period: 'monthly',
    features: [
      'Basic Export Readiness Assessment',
      'Document Vault (Up to 5 uploads)',
      'Single Active Shipment Tracking',
      'Community Support & Glossary'
    ]
  },
  {
    id: 'plan_growth',
    name: 'Export Ready Pro',
    priceInr: 4999,
    period: 'monthly',
    recommended: true,
    badge: 'Most Popular for Exporters',
    features: [
      'Unlimited Document Vault & AI Agent',
      'Dynamic Packaging & Labelling Rules Engine',
      'Document Consistency Checker & Auto-Reconcile',
      'Unlimited Active Ocean & Air Shipments',
      'Export Profitability Simulator & Risk Analysis',
      'Priority CHA & Customs Desk Assistance'
    ]
  },
  {
    id: 'plan_enterprise',
    name: 'Global Enterprise',
    priceInr: 14999,
    period: 'monthly',
    features: [
      'Everything in Pro Plan',
      'Multi-user team permissions',
      'Customs ICEGATE API Auto-filing sync',
      'Dedicated Trade Finance Advisor',
      'Marine Cargo Insurance Discount Portal',
      '24/7 Priority Emergency Port Support'
    ]
  }
];

export const paymentService = {
  /**
   * Fetch all payments for a specific user
   */
  async getUserPayments(userId: string): Promise<PaymentRecord[]> {
    return await db.payments
      .where('userId')
      .equals(userId)
      .reverse()
      .sortBy('createdAt');
  },

  /**
   * Process a sandbox / mock payment
   */
  async processSandboxPayment(userId: string, plan: PlanTier): Promise<PaymentRecord> {
    // Simulate real gateway network latency (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));

    const invoiceNo = `INV-EXP-${Date.now().toString().slice(-6)}`;
    const paymentId = `pay_mock_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const newPayment: PaymentRecord = {
      id: `p-${Date.now()}`,
      userId,
      paymentId,
      amount: plan.priceInr,
      currency: 'INR',
      status: 'succeeded',
      planName: plan.name,
      billingPeriod: plan.period,
      invoiceNumber: invoiceNo,
      paymentMethod: 'UPI / NetBanking (Sandbox Test)',
      createdAt: new Date().toISOString()
    };

    await db.payments.add(newPayment);

    // Add notification
    await db.notifications.add({
      id: `notif-${Date.now()}`,
      userId,
      title: 'Payment Successful',
      message: `Your payment of ₹${plan.priceInr.toLocaleString('en-IN')} for ${plan.name} has been confirmed (Invoice: ${invoiceNo}).`,
      type: 'success',
      read: false,
      createdAt: new Date().toISOString()
    });

    return newPayment;
  },

  /**
   * Download receipt as text file
   */
  downloadReceipt(payment: PaymentRecord, businessName?: string): void {
    const text = `=====================================================
EXPORTREADY PLATFORM — PAYMENT TAX INVOICE
=====================================================
Invoice Number: ${payment.invoiceNumber}
Transaction ID: ${payment.paymentId}
Date & Time:    ${new Date(payment.createdAt).toLocaleString('en-IN')}
Status:         ${payment.status.toUpperCase()}
-----------------------------------------------------
BILLED TO:
Customer:       ${businessName || 'MSME Exporter'}
Currency:       ${payment.currency}
Plan Purchased: ${payment.planName} (${payment.billingPeriod})
Payment Method: ${payment.paymentMethod}
-----------------------------------------------------
Subtotal:       ₹${payment.amount.toLocaleString('en-IN')}
GST (18%):      ₹0.00 (Zero-rated MSME Sandbox)
TOTAL PAID:     ₹${payment.amount.toLocaleString('en-IN')}
=====================================================
ExportReady Technologies India Pvt Ltd
DGFT & Trade Enablement Platform
=====================================================`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${payment.invoiceNumber}_Receipt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
};
