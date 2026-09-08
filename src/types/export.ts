export type UserRole = 'sender' | 'receiver';

export type TradeType = 'domestic' | 'international';

export type ProductType = 'agriculture' | 'food' | 'electronics' | 'medicine' | 'textile';

export type DocumentStatus = 'available' | 'pending' | 'missing';

export type JourneyStageId = 
  | 'business'
  | 'eligibility'
  | 'documents'
  | 'certifications'
  | 'packaging'
  | 'importer'
  | 'logistics'
  | 'customs'
  | 'insurance'
  | 'shipment'
  | 'delivery';

export type StageStatus = 'completed' | 'in_progress' | 'action_required' | 'not_started';

export interface UserAccount {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  tradeType: TradeType;
  language: string;
  createdAt: string;
}

export interface BusinessProfile {
  id: string;
  userId: string;
  businessName: string;
  ownerName?: string;
  location: string;
  city?: string;
  state?: string;
  pincode?: string;
  businessType: string;
  exportExperience: string;
  phone: string;
  email?: string;
  gstin?: string;
  iec?: string;
  pan?: string;
  adCode?: string;
  vatId?: string;
  importerCode?: string;
  country?: string;
  username?: string;
  updatedAt: string;
}

export interface JourneyStage {
  id: JourneyStageId;
  title: string;
  subtitle: string;
  status: StageStatus;
  explanation: string;
  actionText?: string;
  iconName: string;
  progressPercent: number;
}

export interface ProductItem {
  id: string;
  userId?: string;
  name: string;
  category: string;
  origin: string;
  type: ProductType;
  hsCode: string;
  description: string;
  quantity: number;
  unit: string;
  weight: number; // in kg
  dimensions: string;
  productValue: number; // in INR
  readinessScore: number; // 0-100
  shelfLifeDays?: number;
  certificationsNeeded: string[];
  createdAt?: string;
}

export interface DocumentItem {
  id: string;
  userId?: string;
  name: string;
  code: string;
  category: 'statutory' | 'customs' | 'commercial' | 'transport' | 'compliance';
  status: DocumentStatus;
  requiredFor: string;
  mandatory: boolean;
  uploadedAt?: string;
  fileSize?: string | number;
  fileName?: string;
  fileData?: string; // Base64 data URL for preview/download
  mimeType?: string;
  checksum?: string;
  authority: string;
  notes?: string;
  canAiAssist: boolean;
  aiPromptSnippet?: string;
}

export interface ConsistencyCheckResult {
  isConsistent: boolean;
  checkedAt: string;
  invoiceNumber: string;
  packingListNumber: string;
  items: {
    field: string;
    invoiceValue: string;
    packingListValue: string;
    isMatch: boolean;
    recommendation?: string;
  }[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  category: 'labelling' | 'protection' | 'compliance' | 'handling';
  description: string;
  isMandatory: boolean;
  checked: boolean;
  destinationSpecific?: string;
  productSpecific?: string;
}

export interface ImporterRecommendationOption {
  countryCode: string;
  countryName: string;
  flag: string;
  demandIndex: 'Very High' | 'High' | 'Moderate';
  avgTariffRate: string;
  marketSizeUsd: string;
  recommendedTransport: 'Ocean (FCL)' | 'Air Cargo' | 'Express Courier';
  transitDays: number;
  freightCostEstInr: number;
  topBuyerSegments: string[];
  keyRegulations: string[];
}

export interface ShipmentMilestone {
  id: string;
  title: string;
  location: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
  description: string;
}

export interface ShipmentRecord {
  id: string;
  userId?: string;
  trackingNumber: string;
  senderName: string;
  senderLocation: string;
  receiverName: string;
  receiverCountry: string;
  destinationPort: string;
  originPort: string;
  productName: string;
  quantity: string;
  totalValueInr: number;
  transportMode: 'Ocean Freight' | 'Air Cargo' | 'Multimodal';
  carrierName: string;
  vesselFlightNo: string;
  containerNo?: string;
  status: 'created' | 'dispatched' | 'in_transit' | 'customs_cleared' | 'delivered';
  currentMilestoneIndex: number;
  milestones: ShipmentMilestone[];
  estimatedArrival: string;
  departureDate: string;
  insurancePolicyNo: string;
  insuranceCoverageInr: number;
  liveCoordinates?: { lat: number; lng: number };
  createdAt?: string;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  paymentId: string;
  amount: number;
  currency: 'INR' | 'USD';
  status: 'succeeded' | 'pending' | 'failed';
  planName: string;
  billingPeriod: 'monthly' | 'annual';
  invoiceNumber: string;
  paymentMethod: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface OnboardingProgress {
  id: string;
  userId: string;
  currentStep: number;
  completed: boolean;
  updatedAt: string;
}

export interface AssessmentQuestion {
  id: number;
  category: 'business' | 'documents' | 'product' | 'packaging' | 'destination';
  question: string;
  explanation: string;
  options: { label: string; value: 'yes' | 'no' | 'not_sure'; score: number; feedback: string }[];
}

export interface TermDefinition {
  term: string;
  fullName: string;
  definition: string;
  practicalTip: string;
  category: 'Government & Tax' | 'Shipping & Transport' | 'Finance & Customs' | 'Trade Standards';
}
