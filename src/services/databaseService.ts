import Dexie, { Table } from 'dexie';
import {
  BusinessProfile,
  DocumentItem,
  NotificationItem,
  OnboardingProgress,
  PaymentRecord,
  ProductItem,
  ShipmentRecord,
  UserAccount
} from '../types/export';

export class ExportReadyDatabase extends Dexie {
  users!: Table<UserAccount, string>;
  businessProfiles!: Table<BusinessProfile, string>;
  products!: Table<ProductItem, string>;
  documents!: Table<DocumentItem, string>;
  shipments!: Table<ShipmentRecord, string>;
  payments!: Table<PaymentRecord, string>;
  notifications!: Table<NotificationItem, string>;
  onboarding!: Table<OnboardingProgress, string>;

  constructor() {
    super('ExportReadyDB');
    this.version(1).stores({
      users: 'id, email, username, role',
      businessProfiles: 'id, userId',
      products: 'id, userId, hsCode, type',
      documents: 'id, userId, code, category, status',
      shipments: 'id, userId, trackingNumber, status',
      payments: 'id, userId, paymentId, status',
      notifications: 'id, userId, read',
      onboarding: 'id, userId'
    });
  }
}

export const db = new ExportReadyDatabase();

// Default 11 statutory/commercial export document definitions that every new account starts with
// Note: For a new user, all documents start as 'missing' / not uploaded!
export const DEFAULT_DOCUMENT_TEMPLATES = [
  {
    code: 'DGFT-IEC',
    name: 'Importer Exporter Code (IEC)',
    category: 'statutory' as const,
    requiredFor: 'Mandatory 10-digit DGFT license for commercial cross-border export.',
    mandatory: true,
    authority: 'Directorate General of Foreign Trade (DGFT)',
    canAiAssist: true,
    aiPromptSnippet: 'Prepare your 10-digit DGFT IEC application dossier.'
  },
  {
    code: 'IT-PAN',
    name: 'Permanent Account Number (PAN Card)',
    category: 'statutory' as const,
    requiredFor: 'Entity identity verification and GST/ICEGATE customs profile mapping.',
    mandatory: true,
    authority: 'Income Tax Department of India',
    canAiAssist: false
  },
  {
    code: 'GST-REG-06',
    name: 'GST Registration Certificate (GSTIN)',
    category: 'statutory' as const,
    requiredFor: 'Zero-rated export supply under LUT without paying IGST upfront.',
    mandatory: true,
    authority: 'Goods & Services Tax Network (GSTN)',
    canAiAssist: false
  },
  {
    code: 'MCA-COI',
    name: 'Company Registration Certificate (RoC / MCA / Udyam)',
    category: 'statutory' as const,
    requiredFor: 'Legal proof of incorporation and MSME enterprise registration.',
    mandatory: true,
    authority: 'Ministry of Corporate Affairs (MCA) / MSME',
    canAiAssist: false
  },
  {
    code: 'EXP-INV-001',
    name: 'Commercial Invoice (Export)',
    category: 'commercial' as const,
    requiredFor: 'Official sale contract and customs valuation for buyer and customs.',
    mandatory: true,
    authority: 'Self-Certified by Exporter',
    canAiAssist: true
  },
  {
    code: 'EXP-PL-001',
    name: 'Customs Packing List',
    category: 'commercial' as const,
    requiredFor: 'Physical inspection and package weight/volume reconciliation.',
    mandatory: true,
    authority: 'Self-Certified by Exporter',
    canAiAssist: true
  },
  {
    code: 'DGFT-COO',
    name: 'Certificate of Origin (CoO)',
    category: 'compliance' as const,
    requiredFor: 'Confirms goods originate in India to claim preferential tariffs.',
    mandatory: true,
    authority: 'Export Promotion Council / Chamber of Commerce',
    canAiAssist: true,
    aiPromptSnippet: 'Draft the Certificate of Origin application on DGFT e-CoO portal.'
  },
  {
    code: 'ICEGATE-SB',
    name: 'Customs Shipping Bill (LEO Ready)',
    category: 'customs' as const,
    requiredFor: 'Electronic declaration filed on ICEGATE for Let Export Order clearance.',
    mandatory: true,
    authority: 'Indian Customs / ICEGATE',
    canAiAssist: true
  },
  {
    code: 'BL-AWB',
    name: 'Bill of Lading (B/L) / Airway Bill (AWB)',
    category: 'transport' as const,
    requiredFor: 'Document of title issued by carrier upon receiving container cargo.',
    mandatory: true,
    authority: 'Ocean Carrier / Airline',
    canAiAssist: false
  },
  {
    code: 'PROD-NOC',
    name: 'Product Quality Certificate (FSSAI / APEDA / CE)',
    category: 'compliance' as const,
    requiredFor: 'Sanitary/phytosanitary or technical safety clearance.',
    mandatory: true,
    authority: 'FSSAI / APEDA / BIS / Council',
    canAiAssist: false
  },
  {
    code: 'CUST-BOE',
    name: 'Bill of Entry / Import Declaration',
    category: 'customs' as const,
    requiredFor: 'Import clearance and duty declaration copy.',
    mandatory: false,
    authority: 'Customs Authority',
    canAiAssist: false
  }
];

export async function initializeUserDatabaseRecords(userId: string, role: 'sender' | 'receiver', tradeType: 'domestic' | 'international', businessName?: string) {
  // 1. Create empty business profile
  await db.businessProfiles.put({
    id: `bp-${userId}`,
    userId,
    businessName: businessName || '',
    location: '',
    businessType: 'Private Limited / MSME',
    exportExperience: 'First-Time Exporter (Tier-2 MSME)',
    phone: '',
    updatedAt: new Date().toISOString()
  });

  // 2. Initialize empty document vault (all required documents in 'missing' state for this specific user)
  const initialDocs: DocumentItem[] = DEFAULT_DOCUMENT_TEMPLATES.map(t => ({
    id: `doc-${userId}-${t.code}`,
    userId,
    name: t.name,
    code: t.code,
    category: t.category,
    status: 'missing', // New user starts with MISSING / Not Uploaded
    requiredFor: t.requiredFor,
    mandatory: t.mandatory,
    authority: t.authority,
    canAiAssist: t.canAiAssist,
    aiPromptSnippet: t.aiPromptSnippet
  }));

  await db.documents.bulkPut(initialDocs);

  // 3. Initialize onboarding progress at Step 1
  await db.onboarding.put({
    id: `onb-${userId}`,
    userId,
    currentStep: 1,
    completed: false,
    updatedAt: new Date().toISOString()
  });

  // 4. Initial welcome notification
  await db.notifications.put({
    id: `notif-${Date.now()}`,
    userId,
    title: 'Welcome to ExportReady',
    message: 'Your account is ready. Complete your onboarding to calculate your Export Readiness Score.',
    type: 'info',
    read: false,
    createdAt: new Date().toISOString()
  });
}
