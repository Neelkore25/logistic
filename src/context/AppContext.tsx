import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ChecklistItem,
  ConsistencyCheckResult,
  DocumentItem,
  DocumentStatus,
  JourneyStage,
  JourneyStageId,
  ProductItem,
  ProductType,
  ShipmentRecord,
  TradeType,
  UserRole
} from '../types/export';
import {
  INITIAL_ACTIVE_SHIPMENT,
  INITIAL_CONSISTENCY_DATA,
  INITIAL_DOCUMENTS,
  INITIAL_JOURNEY_STAGES,
  INITIAL_PRODUCTS,
  INITIAL_RECEIVER_PROFILE,
  INITIAL_USER_PROFILE
} from '../data/sampleData';
import { getDynamicPackagingChecklist } from '../data/countryRules';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
}

interface AppContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  tradeType: TradeType;
  isDarkMode: boolean;
  activeTab: string;
  userProfile: typeof INITIAL_USER_PROFILE;
  receiverProfile: typeof INITIAL_RECEIVER_PROFILE;
  products: ProductItem[];
  selectedProduct: ProductItem;
  destinationCountryCode: string;
  documents: DocumentItem[];
  journeyStages: JourneyStage[];
  activeShipment: ShipmentRecord;
  consistencyData: ConsistencyCheckResult;
  packagingChecklist: ChecklistItem[];
  readinessScore: number;
  toasts: ToastMessage[];
  aiModalOpen: boolean;
  targetAiDocument: DocumentItem | null;
  dictionaryModalOpen: boolean;
  onboardingModalOpen: boolean;
  
  // Actions
  login: (role: UserRole, username?: string) => void;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
  setTradeType: (type: TradeType) => void;
  toggleDarkMode: () => void;
  setActiveTab: (tab: string) => void;
  updateUserProfile: (data: Partial<typeof INITIAL_USER_PROFILE>) => void;
  updateReceiverProfile: (data: Partial<typeof INITIAL_RECEIVER_PROFILE>) => void;
  addProduct: (product: Omit<ProductItem, 'id' | 'readinessScore'>) => void;
  selectProductById: (id: string) => void;
  setDestinationCountry: (countryCode: string) => void;
  updateDocumentStatus: (docId: string, status: DocumentStatus, fileName?: string) => void;
  deleteDocument: (docId: string) => void;
  openAiDocumentAgent: (doc: DocumentItem) => void;
  closeAiDocumentAgent: () => void;
  resolveDocumentWithAi: (docId: string, generatedName: string) => void;
  fixConsistencyMismatch: () => void;
  toggleChecklistItem: (itemId: string) => void;
  jumpToJourneyStage: (stageId: JourneyStageId) => void;
  createNewShipment: (customData?: Partial<ShipmentRecord>) => void;
  advanceShipmentMilestone: () => void;
  openDictionary: () => void;
  closeDictionary: () => void;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  triggerToast: (title: string, message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('exportready_auth') === 'true';
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    return (localStorage.getItem('exportready_role') as UserRole) || 'sender';
  });

  const [tradeType, setTradeType] = useState<TradeType>(() => {
    return (localStorage.getItem('exportready_tradetype') as TradeType) || 'international';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('exportready_theme') === 'dark';
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userProfile, setUserProfile] = useState(INITIAL_USER_PROFILE);
  const [receiverProfile, setReceiverProfile] = useState(INITIAL_RECEIVER_PROFILE);
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState<string>(INITIAL_PRODUCTS[0].id);
  const [destinationCountryCode, setDestinationCountryCode] = useState<string>('DE'); // Germany
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [journeyStages, setJourneyStages] = useState<JourneyStage[]>(INITIAL_JOURNEY_STAGES);
  const [activeShipment, setActiveShipment] = useState<ShipmentRecord>(INITIAL_ACTIVE_SHIPMENT);
  const [consistencyData, setConsistencyData] = useState<ConsistencyCheckResult>(INITIAL_CONSISTENCY_DATA);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Modals
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [targetAiDocument, setTargetAiDocument] = useState<DocumentItem | null>(null);
  const [dictionaryModalOpen, setDictionaryModalOpen] = useState<boolean>(false);
  const [onboardingModalOpen, setOnboardingModalOpen] = useState<boolean>(false);

  // Selected product
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Dynamic packaging checklist
  const [packagingChecklist, setPackagingChecklist] = useState<ChecklistItem[]>(() => {
    return getDynamicPackagingChecklist(selectedProduct.type, destinationCountryCode);
  });

  // Sync packaging checklist when product or destination changes
  useEffect(() => {
    setPackagingChecklist(getDynamicPackagingChecklist(selectedProduct.type, destinationCountryCode));
  }, [selectedProductId, destinationCountryCode]);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('exportready_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('exportready_theme', 'light');
    }
  }, [isDarkMode]);

  // Calculate dynamic Export Readiness Score
  const calculateReadinessScore = (): number => {
    // Factors:
    // 1. Documents: weight 35% (available docs / mandatory docs)
    const mandatoryDocs = documents.filter(d => d.mandatory);
    const availableMandatoryDocs = mandatoryDocs.filter(d => d.status === 'available');
    const docScore = mandatoryDocs.length > 0 ? (availableMandatoryDocs.length / mandatoryDocs.length) * 35 : 35;

    // 2. Business profile & setup: weight 20%
    const businessScore = 20;

    // 3. Packaging & labelling checks: weight 20%
    const checkedCount = packagingChecklist.filter(c => c.checked).length;
    const packScore = packagingChecklist.length > 0 ? (checkedCount / packagingChecklist.length) * 20 : 20;

    // 4. Product setup & HS code: weight 15%
    const productScore = 15;

    // 5. Consistency check: weight 10%
    const consistencyScore = consistencyData.isConsistent ? 10 : 4;

    const total = Math.min(100, Math.round(docScore + businessScore + packScore + productScore + consistencyScore));
    return total;
  };

  const readinessScore = calculateReadinessScore();

  // Trigger toast
  const triggerToast = (title: string, message: string, type: 'success' | 'warning' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const login = (role: UserRole, username?: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('exportready_auth', 'true');
    localStorage.setItem('exportready_role', role);
    if (username) {
      setUserProfile(prev => ({ ...prev, username }));
    }
    triggerToast('Welcome to ExportReady', `Signed in successfully as ${role === 'sender' ? 'Exporter (Sender)' : 'Buyer (Receiver)'}.`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('exportready_auth');
    triggerToast('Signed Out', 'You have been safely signed out.', 'info');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const updateUserProfile = (data: Partial<typeof INITIAL_USER_PROFILE>) => {
    setUserProfile(prev => ({ ...prev, ...data }));
    triggerToast('Profile Updated', 'Business details have been saved.', 'success');
  };

  const updateReceiverProfile = (data: Partial<typeof INITIAL_RECEIVER_PROFILE>) => {
    setReceiverProfile(prev => ({ ...prev, ...data }));
    triggerToast('Receiver Updated', 'Buyer entity details updated.', 'success');
  };

  const addProduct = (product: Omit<ProductItem, 'id' | 'readinessScore'>) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: ProductItem = {
      ...product,
      id: newId,
      readinessScore: 80
    };
    setProducts(prev => [newProduct, ...prev]);
    setSelectedProductId(newId);
    triggerToast('Product Saved', `${product.name} registered under HS Code ${product.hsCode}.`, 'success');
  };

  const selectProductById = (id: string) => {
    setSelectedProductId(id);
  };

  const setDestinationCountry = (code: string) => {
    setDestinationCountryCode(code);
    triggerToast('Destination Updated', `Dynamic compliance rules adjusted for ${code}.`, 'info');
  };

  const updateDocumentStatus = (docId: string, status: DocumentStatus, fileName?: string) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          status,
          uploadedAt: status === 'available' ? 'Just now' : doc.uploadedAt,
          fileName: fileName || doc.fileName || `${doc.code}_document.pdf`,
          fileSize: '1.4 MB'
        };
      }
      return doc;
    }));

    // Update document journey stage
    setJourneyStages(prev => prev.map(st => {
      if (st.id === 'documents') {
        const remainingMissing = documents.filter(d => d.mandatory && d.status === 'missing' && d.id !== docId);
        return {
          ...st,
          status: remainingMissing.length === 0 ? 'completed' : 'action_required',
          subtitle: remainingMissing.length === 0 ? 'All 11 Documents Available' : `${11 - remainingMissing.length} of 11 Documents Available`,
          progressPercent: remainingMissing.length === 0 ? 100 : 85
        };
      }
      return st;
    }));

    triggerToast('Document Status Updated', `Document marked as ${status.toUpperCase()}.`, 'success');
  };

  const deleteDocument = (docId: string) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          status: 'missing',
          uploadedAt: undefined,
          fileName: undefined,
          fileSize: undefined
        };
      }
      return doc;
    }));
    triggerToast('Document Removed', 'Document cleared from vault.', 'warning');
  };

  const openAiDocumentAgent = (doc: DocumentItem) => {
    setTargetAiDocument(doc);
    setAiModalOpen(true);
  };

  const closeAiDocumentAgent = () => {
    setAiModalOpen(false);
    setTargetAiDocument(null);
  };

  const resolveDocumentWithAi = (docId: string, generatedName: string) => {
    updateDocumentStatus(docId, 'available', generatedName);
    closeAiDocumentAgent();
    triggerToast('AI Document Generated', `${generatedName} saved to your Document Vault. Ready for official filing review.`, 'success');
  };

  const fixConsistencyMismatch = () => {
    setConsistencyData(prev => ({
      ...prev,
      isConsistent: true,
      checkedAt: 'Just now (Auto-aligned)',
      items: prev.items.map(item => {
        if (!item.isMatch && item.field === 'Gross Weight (kg)') {
          return {
            ...item,
            invoiceValue: '1,310.00 kg',
            packingListValue: '1,310.00 kg',
            isMatch: true,
            recommendation: 'Synchronized with wooden pallet tare weight.'
          };
        }
        return item;
      })
    }));
    triggerToast('Inconsistency Resolved', 'Commercial Invoice & Packing List gross weights aligned to 1,310.00 kg.', 'success');
  };

  const toggleChecklistItem = (itemId: string) => {
    setPackagingChecklist(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    }));
  };

  const jumpToJourneyStage = (stageId: JourneyStageId) => {
    switch (stageId) {
      case 'business':
      case 'eligibility':
        setActiveTab('assessment');
        break;
      case 'documents':
        setActiveTab('vault');
        break;
      case 'certifications':
      case 'packaging':
        setActiveTab('packaging');
        break;
      case 'importer':
        setActiveTab('recommendation');
        break;
      case 'logistics':
      case 'customs':
      case 'insurance':
        setActiveTab('logistics');
        break;
      case 'shipment':
      case 'delivery':
        setActiveTab('shipments');
        break;
      default:
        setActiveTab('dashboard');
    }
  };

  const createNewShipment = (customData?: Partial<ShipmentRecord>) => {
    const trackingNo = `EXP-IN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newShip: ShipmentRecord = {
      ...INITIAL_ACTIVE_SHIPMENT,
      id: `sh-${Date.now()}`,
      trackingNumber: trackingNo,
      status: 'created',
      currentMilestoneIndex: 0,
      milestones: INITIAL_ACTIVE_SHIPMENT.milestones.map((m, idx) => ({
        ...m,
        completed: idx === 0,
        current: idx === 0
      })),
      ...customData
    };
    setActiveShipment(newShip);
    setActiveTab('shipments');
    triggerToast('Shipment Created!', `Shipment ${trackingNo} initialized with container booking.`, 'success');
  };

  const advanceShipmentMilestone = () => {
    setActiveShipment(prev => {
      const nextIdx = Math.min(prev.milestones.length - 1, prev.currentMilestoneIndex + 1);
      const updatedMilestones = prev.milestones.map((m, idx) => ({
        ...m,
        completed: idx <= nextIdx,
        current: idx === nextIdx
      }));
      const newStatus = nextIdx >= prev.milestones.length - 1 ? 'delivered' : 'in_transit';
      return {
        ...prev,
        currentMilestoneIndex: nextIdx,
        status: newStatus,
        milestones: updatedMilestones
      };
    });
    triggerToast('Milestone Updated', 'Shipment tracking updated to next transit station.', 'info');
  };

  const openDictionary = () => setDictionaryModalOpen(true);
  const closeDictionary = () => setDictionaryModalOpen(false);
  const openOnboarding = () => setOnboardingModalOpen(true);
  const closeOnboarding = () => setOnboardingModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        userRole,
        tradeType,
        isDarkMode,
        activeTab,
        userProfile,
        receiverProfile,
        products,
        selectedProduct,
        destinationCountryCode,
        documents,
        journeyStages,
        activeShipment,
        consistencyData,
        packagingChecklist,
        readinessScore,
        toasts,
        aiModalOpen,
        targetAiDocument,
        dictionaryModalOpen,
        onboardingModalOpen,
        login,
        logout,
        setUserRole,
        setTradeType,
        toggleDarkMode,
        setActiveTab,
        updateUserProfile,
        updateReceiverProfile,
        addProduct,
        selectProductById,
        setDestinationCountry,
        updateDocumentStatus,
        deleteDocument,
        openAiDocumentAgent,
        closeAiDocumentAgent,
        resolveDocumentWithAi,
        fixConsistencyMismatch,
        toggleChecklistItem,
        jumpToJourneyStage,
        createNewShipment,
        advanceShipmentMilestone,
        openDictionary,
        closeDictionary,
        openOnboarding,
        closeOnboarding,
        triggerToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
