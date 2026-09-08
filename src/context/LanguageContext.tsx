import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../i18n/en';
import { hi } from '../i18n/hi';
import { mr } from '../i18n/mr';
import { gu } from '../i18n/gu';
import { ta } from '../i18n/ta';
import { TranslationSchema } from '../i18n/types';

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

const DICTIONARIES: Record<LanguageCode, TranslationSchema> = {
  en,
  hi,
  mr,
  gu,
  ta
};

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: keyof TranslationSchema | string) => string;
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

  const t = (key: keyof TranslationSchema | string): string => {
    const dict = DICTIONARIES[currentLanguage] || DICTIONARIES.en;
    if (key in dict) {
      return (dict as any)[key];
    }
    return (DICTIONARIES.en as any)[key] || key;
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
