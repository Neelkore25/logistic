export interface TranslationSchema {
  // Brand & App Taglines
  tagline: string;
  journeyStarts: string;
  indiaReady: string;
  exportReady: string;
  shipmentReady: string;
  shipmentDelivered: string;
  coreMotto: string;

  // Roles & Auth
  roleSender: string;
  roleSenderDesc: string;
  roleReceiver: string;
  roleReceiverDesc: string;
  login: string;
  createAccount: string;
  registerSender: string;
  registerReceiver: string;
  signInToPortal: string;
  selectAccountType: string;
  mobileOrEmail: string;
  username: string;
  password: string;
  confirmPassword: string;
  forgotPassword: string;
  logout: string;
  welcomeBack: string;

  // Navigation
  navDashboard: string;
  navAssessment: string;
  navProducts: string;
  navVault: string;
  navConsistency: string;
  navPackaging: string;
  navRecommendation: string;
  navSimulator: string;
  navLogistics: string;
  navShipments: string;
  navPayments: string;
  navHelp: string;

  // Trade Scope
  tradeScope: string;
  domestic: string;
  domesticDesc: string;
  international: string;
  internationalDesc: string;

  // Dashboard & Readiness
  exportReadiness: string;
  readinessNotAssessed: string;
  almostReady: string;
  actionRequiredNotice: string;
  completeTasks: string;
  nextBestAction: string;
  priorityAction: string;
  whyThisAction: string;
  activeConsignment: string;
  noActiveShipments: string;
  createExportShipment: string;
  projectedProfit: string;
  estimatedMargin: string;

  // Document Vault
  documentVault: string;
  available: string;
  pending: string;
  missing: string;
  notUploaded: string;
  uploadDocument: string;
  viewDocument: string;
  downloadDocument: string;
  replaceDocument: string;
  deleteDocument: string;
  getAiAssistance: string;
  mandatory: string;
  noDocumentsYet: string;
  uploadFirstDocumentDesc: string;

  // AI Document Agent
  aiAgentTitle: string;
  aiAgentSubtitle: string;
  aiDisclaimer: string;
  letsBegin: string;
  generateDraft: string;
  saveToVault: string;

  // Products
  productSetup: string;
  searchHsCode: string;
  saveProduct: string;
  productName: string;
  productCategory: string;
  productOrigin: string;
  productType: string;
  hsCode: string;
  noProductsYet: string;
  addFirstProductDesc: string;
  autoDetectedCategory: string;

  // Packaging & Labelling
  packagingTitle: string;
  dynamicRulesNotice: string;
  productProtection: string;

  // Consistency Checker
  consistencyTitle: string;
  documentsConsistent: string;
  inconsistencyDetected: string;
  autoAlign: string;

  // Payments
  paymentsTitle: string;
  currentPlan: string;
  subscriptionTiers: string;
  paymentHistory: string;
  upgradePlan: string;
  sandboxNotice: string;
  payWithUpi: string;

  // Shipments & Tracking
  trackingTitle: string;
  inTransit: string;
  dispatched: string;
  delivered: string;
  simulateNextStation: string;

  // Common Actions
  continueNext: string;
  previousStep: string;
  close: string;
  save: string;
  cancel: string;
  search: string;
  filter: string;
  all: string;
}
