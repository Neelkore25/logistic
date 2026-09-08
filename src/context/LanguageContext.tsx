import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'hi' | 'gu' | 'mr' | 'ta';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' }
];

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    tagline: 'Premium Export Logistics Readiness Platform',
    journeyStarts: 'Your export journey starts here.',
    indiaReady: 'India-Ready',
    exportReady: 'Export-Ready',
    shipmentReady: 'Shipment-Ready',
    shipmentDelivered: 'Shipment-Delivered',
    coreMotto: 'What is done? What is pending? What should I do next?',
    roleSender: 'Sender (Exporter)',
    roleSenderDesc: 'Business sending goods from India',
    roleReceiver: 'Receiver (Buyer)',
    roleReceiverDesc: 'Business / Buyer importing goods',
    login: 'Log In',
    createAccount: 'Create Account',
    registerSender: 'Register as Sender',
    registerReceiver: 'Register as Receiver',
    readiness: 'Export Readiness',
    almostReady: "You're almost ready to export.",
    completeTasks: 'Complete Remaining Tasks',
    nextBestAction: 'What should you do next?',
    tradeType: 'Trade Scope',
    domestic: 'Domestic (India)',
    international: 'International (Export)',
    documentVault: 'Document Vault',
    consistencyChecker: 'Document Consistency Checker',
    packagingChecklist: 'Packaging & Labelling',
    profitabilitySimulator: 'Export Profitability Simulator',
    liveTracking: 'Live Shipment Tracking',
    dictionary: 'Export Help & Terms',
    aiAssistant: 'AI Document Agent',
    logout: 'Log Out'
  },
  hi: {
    tagline: 'प्रीमियम निर्यात लॉजिस्टिक्स तैयारी मंच',
    journeyStarts: 'आपकी निर्यात यात्रा यहाँ से शुरू होती है।',
    indiaReady: 'भारत-तैयार',
    exportReady: 'निर्यात-तैयार',
    shipmentReady: 'शिपमेंट-तैयार',
    shipmentDelivered: 'शिपमेंट डिलीवर',
    coreMotto: 'क्या पूरा हुआ? क्या बाकी है? मुझे आगे क्या करना चाहिए?',
    roleSender: 'प्रेषक (निर्यातक)',
    roleSenderDesc: 'भारत से माल भेजने वाला व्यवसाय',
    roleReceiver: 'प्राप्तकर्ता (खरीदार)',
    roleReceiverDesc: 'माल आयात करने वाला खरीदार',
    login: 'लॉग इन करें',
    createAccount: 'खाता बनाएं',
    registerSender: 'निर्यातक के रूप में पंजीकरण करें',
    registerReceiver: 'प्राप्तकर्ता के रूप में पंजीकरण करें',
    readiness: 'निर्यात तैयारी',
    almostReady: 'आप निर्यात के लिए लगभग तैयार हैं।',
    completeTasks: 'शेष कार्य पूर्ण करें',
    nextBestAction: 'आगे आपको क्या करना चाहिए?',
    tradeType: 'व्यापार प्रकार',
    domestic: 'घरेलू (भारत)',
    international: 'अंतर्राष्ट्रीय (निर्यात)',
    documentVault: 'दस्तावेज़ वॉल्ट (Document Vault)',
    consistencyChecker: 'दस्तावेज़ मिलान परीक्षक',
    packagingChecklist: 'पैकेजिंग और लेबलिंग',
    profitabilitySimulator: 'निर्यात लाभप्रदता कैलकुलेटर',
    liveTracking: 'लाइव शिपमेंट ट्रैकिंग',
    dictionary: 'निर्यात शब्दावली व सहायता',
    aiAssistant: 'AI दस्तावेज़ सहायक',
    logout: 'लॉग आउट'
  },
  gu: {
    tagline: 'પ્રીમિયમ નિકાસ લોજિસ્ટિક્સ પ્લેટફોર્મ',
    journeyStarts: 'તમારી નિકાસ યાત્રા અહીંથી શરૂ થાય છે.',
    indiaReady: 'ઇન્ડિયા-રેડી',
    exportReady: 'એક્સપોર્ટ-રેડી',
    shipmentReady: 'શિપમેન્ટ-રેડી',
    shipmentDelivered: 'શિપમેન્ટ વિતરણ',
    coreMotto: 'શું પૂર્ણ થયું? શું બાકી છે? હવે શું કરવું?',
    roleSender: 'પ્રેષક (નિકાસકાર)',
    roleSenderDesc: 'ભારતમાંથી માલ મોકલતો વ્યવસાય',
    roleReceiver: 'પ્રાપ્તકર્તા (ખરીદનાર)',
    roleReceiverDesc: 'વિદેશી આયાતકાર / ખરીદનાર',
    login: 'લૉગ ઇન કરો',
    createAccount: 'નવું ખાતું બનાવો',
    registerSender: 'નિકાસકાર તરીકે નોંધણી',
    registerReceiver: 'ખરીદનાર તરીકે નોંધણી',
    readiness: 'નિકાસ તત્પરતા',
    almostReady: 'તમે નિકાસ માટે લગભગ તૈયાર છો.',
    completeTasks: 'બાકીના કાર્યો પૂર્ણ કરો',
    nextBestAction: 'હવે તમારે શું કરવું જોઈએ?',
    tradeType: 'વેપાર ક્ષેત્ર',
    domestic: 'સ્થાનિક (ભારત)',
    international: 'આંતરરાષ્ટ્રીય (નિકાસ)',
    documentVault: 'દસ્તાવેજ વૉલ્ટ',
    consistencyChecker: 'દસ્તાવેજ સુસંગતતા ચકાસણી',
    packagingChecklist: 'પેકેજિંગ અને લેબલિંગ',
    profitabilitySimulator: 'નફાકારકતા સિમ્યુલેટર',
    liveTracking: 'લાઇવ શિપમેન્ટ ટ્રેકિંગ',
    dictionary: 'નિકાસ શબ્દકોષ',
    aiAssistant: 'AI સહાયક',
    logout: 'લૉગ આઉટ'
  },
  mr: {
    tagline: 'प्रीमियम निर्यात लॉजिस्टिक्स तयारी प्लॅटफॉर्म',
    journeyStarts: 'तुमचा निर्यात प्रवास येथून सुरू होतो.',
    indiaReady: 'इंडिया-तयार',
    exportReady: 'निर्यात-तयार',
    shipmentReady: 'शिपमेंट-तयार',
    shipmentDelivered: 'शिपमेंट वितरीत',
    coreMotto: 'काय पूर्ण झाले? काय बाकी आहे? पुढे काय करावे?',
    roleSender: 'प्रेषक (निर्यातदार)',
    roleSenderDesc: 'भारतातून माल पाठवणारा व्यवसाय',
    roleReceiver: 'स्वीकारकर्ता (खरेदीदार)',
    roleReceiverDesc: 'माल आयात करणारा खरेदीदार',
    login: 'लॉग इन करा',
    createAccount: 'नवीन खाते तयार करा',
    registerSender: 'निर्यातदार म्हणून नोंदणी',
    registerReceiver: 'खरेदीदार म्हणून नोंदणी',
    readiness: 'निर्यात तयारी',
    almostReady: 'तुम्ही निर्यातीसाठी जवळपास तयार आहात.',
    completeTasks: 'उर्वरित कामे पूर्ण करा',
    nextBestAction: 'पुढे तुम्ही काय करावे?',
    tradeType: 'व्यापार प्रकार',
    domestic: 'स्थानिक (भारत)',
    international: 'आंतरराष्ट्रीय (निर्यात)',
    documentVault: 'दस्तऐवज व्हॉल्ट (Document Vault)',
    consistencyChecker: 'दस्तऐवज सुसंगतता तपासक',
    packagingChecklist: 'पॅकेजिंग आणि लेबलिंग',
    profitabilitySimulator: 'निर्यात नफा सिम्युलेटर',
    liveTracking: 'थेट शिपमेंट ट्रॅकिंग',
    dictionary: 'निर्यात मदत आणि संज्ञा',
    aiAssistant: 'AI दस्तऐवज एजंट',
    logout: 'लॉग आउट'
  },
  ta: {
    tagline: 'பிரீமியம் ஏற்றுமதி தளவாடங்கள் தயார்நிலை தளம்',
    journeyStarts: 'உங்கள் ஏற்றுமதிப் பயணம் இங்கே தொடங்குகிறது.',
    indiaReady: 'இந்தியா-தயார்',
    exportReady: 'ஏற்றுமதி-தயார்',
    shipmentReady: 'சரக்கு-தயார்',
    shipmentDelivered: 'சரக்கு விநியோகிக்கப்பட்டது',
    coreMotto: 'என்ன முடிந்தது? என்ன நிலுவையில் உள்ளது? அடுத்து என்ன செய்ய வேண்டும்?',
    roleSender: 'அனுப்புபவர் (ஏற்றுமதியாளர்)',
    roleSenderDesc: 'இந்தியாவிலிருந்து சரக்கு அனுப்பும் வணிகம்',
    roleReceiver: 'பெறுபவர் (வாங்குபவர்)',
    roleReceiverDesc: 'பொருட்களை இறக்குமதி செய்யும் வணிகம்',
    login: 'உள்நுழைக',
    createAccount: 'கணக்கு உருவாக்குக',
    registerSender: 'ஏற்றுமதியாளராகப் பதிவு செய்க',
    registerReceiver: 'வாங்குபவராகப் பதிவு செய்க',
    readiness: 'ஏற்றுமதி தயார்நிலை',
    almostReady: 'நீங்கள் ஏற்றுமதி செய்ய தயாராக உள்ளீர்கள்.',
    completeTasks: 'மீதமுள்ள பணிகளை முடிக்கவும்',
    nextBestAction: 'அடுத்து நீங்கள் என்ன செய்ய வேண்டும்?',
    tradeType: 'வர்த்தக வகை',
    domestic: 'உள்நாட்டு (இந்தியா)',
    international: 'சர்வதேசம் (ஏற்றுமதி)',
    documentVault: 'ஆவணப் பெட்டகம்',
    consistencyChecker: 'ஆவண பொருத்த சரிபார்ப்பு',
    packagingChecklist: 'பேக்கேஜிங் & லேபிளிங்',
    profitabilitySimulator: 'லாப வரம்பு சிமுலேட்டர்',
    liveTracking: 'நேரடி சரக்கு கண்காணிப்பு',
    dictionary: 'ஏற்றுமதி உதவி & சொற்கள்',
    aiAssistant: 'AI ஆவண உதவியாளர்',
    logout: 'வெளியேறு'
  }
};

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('exportready_lang');
    return (saved as LanguageCode) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('exportready_lang', currentLanguage);
  }, [currentLanguage]);

  const t = (key: string): string => {
    return TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage: setCurrentLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
