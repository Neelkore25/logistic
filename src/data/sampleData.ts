import { ConsistencyCheckResult, DocumentItem, JourneyStage, ProductItem, ShipmentRecord } from '../types/export';

export const INITIAL_USER_PROFILE = {
  businessName: 'Sahyadri Organics & Agro Exports Pvt Ltd',
  ownerName: 'Sunil Patil',
  email: 'exports@sahyadriagro.in',
  phone: '+91 98230 45678',
  location: 'Palghar, Maharashtra, India',
  city: 'Palghar',
  state: 'Maharashtra',
  pincode: '401404',
  businessType: 'Private Limited Company (MSME Registered)',
  exportExperience: 'First-Time Exporter (Tier-2 MSME)',
  username: 'sahyadri_exporter',
  tradeType: 'international' as const,
  role: 'sender' as const,
  language: 'en'
};

export const INITIAL_RECEIVER_PROFILE = {
  businessName: 'Bavaria Bio-Foods GmbH & Co. KG',
  contactPerson: 'Klaus Weber',
  email: 'import@bavaria-biofoods.de',
  phone: '+49 89 2444 8920',
  location: 'Munich, Bavaria, Germany',
  country: 'Germany',
  vatId: 'DE 284 921 734',
  importerCode: 'EORI DE9821034',
  businessType: 'Organic Food Wholesaler & Importer',
  username: 'bavaria_bio'
};

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-cashew-1',
    name: 'Organic Cashew Nuts W320 Grade (Raw Kernels)',
    category: 'Edible Nuts & Dried Produce',
    origin: 'Palghar & Konkan, Maharashtra, India',
    type: 'food',
    hsCode: '08013200',
    description: 'First grade export quality whole cashew kernels W-320 (300-320 nuts/lb). Moisture max 5%, zero foreign matter, vacuum packed with nitrogen gas flush.',
    quantity: 1200,
    unit: 'Kilograms (kg)',
    weight: 1200,
    dimensions: '120 x 80 x 140 cm (4 Master Pallets)',
    productValue: 984000, // ₹9.84 Lakhs
    readinessScore: 82,
    shelfLifeDays: 730,
    certificationsNeeded: ['FSSAI Central Export License', 'APEDA RCMC', 'Phytosanitary Certificate', 'Certificate of Origin']
  },
  {
    id: 'prod-pepper-2',
    name: 'Malabar Black Pepper (Garbled Extra Bold)',
    category: 'Spices & Condiments',
    origin: 'Wayanad, Kerala / Western Ghats',
    type: 'agriculture',
    hsCode: '09041110',
    description: 'High-piperine garbled black pepper. Hand-sorted, machine-cleaned, moisture below 10.5%. Bulk packed in food-grade jute sacks with internal liner.',
    quantity: 500,
    unit: 'Kilograms (kg)',
    weight: 500,
    dimensions: '100 x 80 x 110 cm (2 Pallets)',
    productValue: 340000,
    readinessScore: 75,
    shelfLifeDays: 1095,
    certificationsNeeded: ['Spices Board RCMC', 'Phytosanitary Certificate', 'FSSAI Export NOC']
  },
  {
    id: 'prod-cotton-3',
    name: '100% Organic Cotton Bio-Washed Crew T-Shirts',
    category: 'Textiles & Apparel',
    origin: 'Tiruppur, Tamil Nadu / Mumbai',
    type: 'textile',
    hsCode: '61091000',
    description: '180 GSM combed single jersey bio-washed ring spun cotton t-shirts. Dyed using GOTS approved eco-friendly pigments.',
    quantity: 2500,
    unit: 'Pieces (pcs)',
    weight: 480,
    dimensions: '60 x 40 x 30 cm (25 Cartons)',
    productValue: 875000,
    readinessScore: 90,
    certificationsNeeded: ['AEPC Registration', 'GOTS Organic Certificate', 'Certificate of Origin']
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-iec',
    name: 'Importer Exporter Code (IEC)',
    code: 'DGFT-IEC',
    category: 'statutory',
    status: 'missing', // Set as missing to allow user to experience the AI Document Agent as requested!
    requiredFor: 'Mandatory 10-digit DGFT license without which no commercial customs clearance can take place in India.',
    mandatory: true,
    authority: 'Directorate General of Foreign Trade (DGFT)',
    canAiAssist: true,
    aiPromptSnippet: 'Need assistance preparing your IEC application on the DGFT online portal.'
  },
  {
    id: 'doc-pan',
    name: 'Permanent Account Number (PAN Card)',
    code: 'IT-PAN',
    category: 'statutory',
    status: 'available',
    requiredFor: 'Entity identity verification and GST/Customs linking.',
    mandatory: true,
    uploadedAt: '2026-08-14',
    fileSize: '1.2 MB',
    fileName: 'PAN_Sahyadri_Agro_Exports.pdf',
    authority: 'Income Tax Department of India',
    canAiAssist: false
  },
  {
    id: 'doc-gstin',
    name: 'GST Registration Certificate (GSTIN)',
    code: 'GST-REG-06',
    category: 'statutory',
    status: 'available',
    requiredFor: 'Zero-rated export supply under LUT without payment of IGST.',
    mandatory: true,
    uploadedAt: '2026-08-14',
    fileSize: '2.4 MB',
    fileName: 'GSTIN_27AAACS1234F1Z8.pdf',
    authority: 'Goods & Services Tax Network (GSTN)',
    canAiAssist: false
  },
  {
    id: 'doc-co-reg',
    name: 'Company Registration Certificate (RoC / MCA)',
    code: 'MCA-COI',
    category: 'statutory',
    status: 'available',
    requiredFor: 'Proof of legal incorporation & MSME Udyam registration.',
    mandatory: true,
    uploadedAt: '2026-08-16',
    fileSize: '3.1 MB',
    fileName: 'Sahyadri_RoC_Incorporation.pdf',
    authority: 'Ministry of Corporate Affairs (MCA)',
    canAiAssist: false
  },
  {
    id: 'doc-inv',
    name: 'Commercial Invoice (Export)',
    code: 'EXP-INV-001',
    category: 'commercial',
    status: 'available',
    requiredFor: 'Official sale contract and customs valuation for buyer and Indian customs.',
    mandatory: true,
    uploadedAt: '2026-09-02',
    fileSize: '840 KB',
    fileName: 'EXP_INV_2026_0901.pdf',
    authority: 'Sahyadri Organics & Agro Exports',
    canAiAssist: true
  },
  {
    id: 'doc-pack',
    name: 'Customs Packing List',
    code: 'EXP-PL-001',
    category: 'commercial',
    status: 'available',
    requiredFor: 'Physical inspection and verification of gross/net weights and packages.',
    mandatory: true,
    uploadedAt: '2026-09-02',
    fileSize: '710 KB',
    fileName: 'EXP_PACKING_LIST_0901.pdf',
    authority: 'Sahyadri Organics & Agro Exports',
    canAiAssist: true
  },
  {
    id: 'doc-coo',
    name: 'Certificate of Origin (CoO - Non-Preferential)',
    code: 'DGFT-COO',
    category: 'compliance',
    status: 'pending',
    requiredFor: 'Required by German customs to confirm goods originate wholly from India.',
    mandatory: true,
    authority: 'Indian Merchants Chamber (IMC) / DGFT e-CoO',
    canAiAssist: true,
    aiPromptSnippet: 'Draft the application for Certificate of Origin on the DGFT e-CoO system.'
  },
  {
    id: 'doc-sb',
    name: 'Customs Shipping Bill (LEO Ready)',
    code: 'ICEGATE-SB',
    category: 'customs',
    status: 'pending',
    requiredFor: 'Customs clearance and Let Export Order (LEO) permission at JNPT Port.',
    mandatory: true,
    authority: 'Indian Customs / ICEGATE',
    canAiAssist: true
  },
  {
    id: 'doc-bl',
    name: 'Bill of Lading (B/L) / Sea Waybill',
    code: 'MAERSK-BL',
    category: 'transport',
    status: 'pending',
    requiredFor: 'Title deed for ocean container cargo handover at Port of Hamburg.',
    mandatory: true,
    authority: 'Maersk Line / Mediterranean Shipping Company',
    canAiAssist: false
  },
  {
    id: 'doc-fssai',
    name: 'FSSAI Central Export License & NOC',
    code: 'FSSAI-EXP',
    category: 'compliance',
    status: 'available',
    requiredFor: 'Sanitary safety clearance for food shipments leaving India.',
    mandatory: true,
    uploadedAt: '2026-08-20',
    fileSize: '1.8 MB',
    fileName: 'FSSAI_Central_Export_License.pdf',
    authority: 'Food Safety and Standards Authority of India',
    canAiAssist: false
  },
  {
    id: 'doc-boe',
    name: 'Bill of Entry (Exchange Control Copy)',
    code: 'CUST-BOE',
    category: 'customs',
    status: 'available',
    requiredFor: 'Import duty documentation (available for dual-trade reference).',
    mandatory: false,
    authority: 'Indian Customs',
    canAiAssist: false
  }
];

export const INITIAL_JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'business',
    title: 'Business Setup',
    subtitle: 'Entity, PAN & GST Registration',
    status: 'completed',
    explanation: 'Your legal business entity is verified and registered under Indian MSME guidelines.',
    iconName: 'Building2',
    progressPercent: 100
  },
  {
    id: 'eligibility',
    title: 'Export Eligibility',
    subtitle: 'Score: 82/100 (High Readiness)',
    status: 'completed',
    explanation: 'Assessment completed. Business passes core statutory export criteria.',
    iconName: 'ShieldCheck',
    progressPercent: 100
  },
  {
    id: 'documents',
    title: 'Document Vault',
    subtitle: '10 of 11 Documents Available',
    status: 'action_required',
    explanation: 'Your IEC certificate is missing. Use the AI Document Agent to prepare and upload it.',
    actionText: 'Upload IEC Certificate',
    iconName: 'FileText',
    progressPercent: 78
  },
  {
    id: 'certifications',
    title: 'Certifications',
    subtitle: 'FSSAI & APEDA Cleared',
    status: 'completed',
    explanation: 'Export hygiene and agricultural origin certifications are verified.',
    iconName: 'Award',
    progressPercent: 100
  },
  {
    id: 'packaging',
    title: 'Packaging & Labelling',
    subtitle: 'ISPM-15 & EU Labelling',
    status: 'in_progress',
    explanation: 'Verify nitrogen vacuum sealing and German language carton labels before container stuffing.',
    actionText: 'Review Packaging Checklist',
    iconName: 'PackageCheck',
    progressPercent: 65
  },
  {
    id: 'importer',
    title: 'Importer / Receiver',
    subtitle: 'Bavaria Bio-Foods (Germany)',
    status: 'completed',
    explanation: 'Importer EORI registered and sales contract confirmed under CIF Hamburg.',
    iconName: 'Users',
    progressPercent: 100
  },
  {
    id: 'logistics',
    title: 'Logistic Planning',
    subtitle: 'JNPT → Hamburg (Ocean FCL)',
    status: 'in_progress',
    explanation: 'Container booking with Maersk Line reserved; factory stuffing slot confirmed.',
    actionText: 'View Route & Costs',
    iconName: 'Truck',
    progressPercent: 70
  },
  {
    id: 'customs',
    title: 'Customs Clearance',
    subtitle: 'CHA Assigned at JNPT',
    status: 'in_progress',
    explanation: 'Shipping bill drafted; waiting for final container gate-in at Nhava Sheva.',
    iconName: 'Landmark',
    progressPercent: 50
  },
  {
    id: 'insurance',
    title: 'Cargo Insurance',
    subtitle: 'Marine All-Risk (ICC-A)',
    status: 'completed',
    explanation: '110% CIF invoice value insured with New India Assurance policy #NIA-EXP-8891.',
    iconName: 'ShieldAlert',
    progressPercent: 100
  },
  {
    id: 'shipment',
    title: 'Shipment Creation',
    subtitle: 'Ready for Dispatch',
    status: 'action_required',
    explanation: 'Pre-shipment review ready. Confirm checklist to dispatch container from factory.',
    actionText: 'Review & Dispatch',
    iconName: 'Ship',
    progressPercent: 40
  },
  {
    id: 'delivery',
    title: 'Delivery & Customs',
    subtitle: 'Munich Warehouse ETA: 24 Days',
    status: 'not_started',
    explanation: 'Tracking telemetry will activate once container is loaded on vessel at JNPT.',
    iconName: 'MapPin',
    progressPercent: 0
  }
];

export const INITIAL_CONSISTENCY_DATA: ConsistencyCheckResult = {
  isConsistent: false,
  checkedAt: 'Today at 10:45 AM',
  invoiceNumber: 'EXP-INV-2026-0901',
  packingListNumber: 'EXP-PL-2026-0901',
  items: [
    {
      field: 'Product Description',
      invoiceValue: 'Organic Cashew Nuts W320 Grade (Raw Kernels)',
      packingListValue: 'Organic Cashew Nuts W320 Grade (Raw Kernels)',
      isMatch: true
    },
    {
      field: 'Quantity & Unit',
      invoiceValue: '1,200 Kilograms (50 Cartons x 24 kg)',
      packingListValue: '1,200 Kilograms (50 Cartons x 24 kg)',
      isMatch: true
    },
    {
      field: 'Harmonized System (HS) Code',
      invoiceValue: '0801.32.00',
      packingListValue: '0801.32.00',
      isMatch: true
    },
    {
      field: 'Consignee / Importer Name',
      invoiceValue: 'Bavaria Bio-Foods GmbH & Co. KG',
      packingListValue: 'Bavaria Bio-Foods GmbH & Co. KG',
      isMatch: true
    },
    {
      field: 'Gross Weight (kg)',
      invoiceValue: '1,280.00 kg',
      packingListValue: '1,310.00 kg', // Inconsistency detected!
      isMatch: false,
      recommendation: 'Packing list lists Gross Weight as 1,310 kg while Commercial Invoice lists 1,280 kg (30 kg tare difference for wooden pallets). Customs will issue a query if these do not match exactly.'
    },
    {
      field: 'Incoterms & Currency',
      invoiceValue: 'CIF Hamburg Port - EUR €11,200',
      packingListValue: 'CIF Hamburg Port (Weight / Dimensions only)',
      isMatch: true
    }
  ]
};

export const INITIAL_ACTIVE_SHIPMENT: ShipmentRecord = {
  id: 'sh-exp-8842',
  trackingNumber: 'EXP-IN-2026-8842',
  senderName: 'Sahyadri Organics & Agro Exports Pvt Ltd',
  senderLocation: 'Palghar, Maharashtra, India',
  receiverName: 'Bavaria Bio-Foods GmbH & Co. KG',
  receiverCountry: 'Germany',
  originPort: 'Jawaharlal Nehru Port Trust (JNPT / Nhava Sheva), Mumbai',
  destinationPort: 'Port of Hamburg (DEHAM), Germany',
  productName: 'Organic Cashew Nuts W320 Grade',
  quantity: '1,200 kg (50 Cartons / 4 Pallets)',
  totalValueInr: 984000,
  transportMode: 'Ocean Freight',
  carrierName: 'Maersk Line',
  vesselFlightNo: 'Maersk Mc-Kinney Moller (Voyage 2609W)',
  containerNo: 'MSKU-982144-8 (20ft FCL Reefer)',
  status: 'in_transit',
  currentMilestoneIndex: 4,
  estimatedArrival: '28 September 2026',
  departureDate: '04 September 2026',
  insurancePolicyNo: 'NIA-MAR-77391-2026',
  insuranceCoverageInr: 1082400,
  liveCoordinates: { lat: 18.9438, lng: 72.8258 },
  milestones: [
    {
      id: 'm1',
      title: 'Order Confirmed & Export Invoice Generated',
      location: 'Palghar Agro Facility',
      timestamp: '01 Sep 2026, 11:30 AM',
      completed: true,
      current: false,
      description: 'Commercial Invoice EXP-0901 finalized with buyer Bavarian Bio-Foods.'
    },
    {
      id: 'm2',
      title: 'Packaging & Labelling Inspection Completed',
      location: 'Sahyadri Packhouse, Palghar',
      timestamp: '02 Sep 2026, 04:15 PM',
      completed: true,
      current: false,
      description: 'ISPM-15 certified pallets tagged with bilingual German labels & nitrogen vacuum seal.'
    },
    {
      id: 'm3',
      title: 'Factory Pickup & Transport to Port',
      location: 'Palghar → JNPT Highway Corridor',
      timestamp: '03 Sep 2026, 08:00 AM',
      completed: true,
      current: false,
      description: 'Container sealed with high-security ISO 17712 bolt seal #IND-90214.'
    },
    {
      id: 'm4',
      title: 'Customs Cleared & Let Export Order (LEO) Granted',
      location: 'JNPT Nhava Sheva Customs, Mumbai',
      timestamp: '04 Sep 2026, 02:40 PM',
      completed: true,
      current: false,
      description: 'Indian Customs accepted Shipping Bill #SB-44012; green channel clearance issued.'
    },
    {
      id: 'm5',
      title: 'Loaded on Vessel & Departed Indian Waters',
      location: 'Arabian Sea / Gateway of India Corridor',
      timestamp: '05 Sep 2026, 06:15 AM',
      completed: true,
      current: true,
      description: 'Vessel Maersk Mc-Kinney Moller underway to Suez Canal transit.'
    },
    {
      id: 'm6',
      title: 'Suez Canal Maritime Transit',
      location: 'Red Sea → Port Said, Egypt',
      timestamp: 'Estimated 12 Sep 2026',
      completed: false,
      current: false,
      description: 'Scheduled convoy entry through Suez maritime route.'
    },
    {
      id: 'm7',
      title: 'Arrival at Destination Port & EU Customs Entry',
      location: 'Port of Hamburg (DEHAM), Germany',
      timestamp: 'Estimated 24 Sep 2026',
      completed: false,
      current: false,
      description: 'German Zoll customs import clearance and Phytosanitary quarantine check.'
    },
    {
      id: 'm8',
      title: 'Final Mile Delivery to Munich Warehouse',
      location: 'Munich Bavaria Distribution Center',
      timestamp: 'Estimated 28 Sep 2026',
      completed: false,
      current: false,
      description: 'Consignee warehouse unloading and digital Delivery Order acknowledgment.'
    }
  ]
};
