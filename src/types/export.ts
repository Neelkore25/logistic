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
  name: string;
  category: string;
  origin: string;
  type: ProductType;
  hsCode: string;
  description: string;
  quantity: number;
  unit: string;
  weight: number; // in kg
  dimensions: string; // e.g. "40 x 30 x 25 cm"
  productValue: number; // in INR
  readinessScore: number; // 0-100
  shelfLifeDays?: number;
  certificationsNeeded: string[];
}

export interface DocumentItem {
  id: string;
  name: string;
  code: string;
  category: 'statutory' | 'customs' | 'commercial' | 'transport' | 'compliance';
  status: DocumentStatus;
  requiredFor: string;
  mandatory: boolean;
  uploadedAt?: string;
  fileSize?: string;
  fileName?: string;
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
