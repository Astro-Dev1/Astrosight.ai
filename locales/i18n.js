// i18n utility for multilingual support
import { useState, useEffect } from 'react';

// Import translation files
import enTranslations from './en.json';
import hiTranslations from './hi.json';
import knTranslations from './kn.json';

// Available translations
const translations = {
  en: enTranslations,
  hi: hiTranslations,
  kn: knTranslations,
};

// Default language
const DEFAULT_LANGUAGE = 'en';

// Get current language from localStorage or default
export const getLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || DEFAULT_LANGUAGE;
  }
  return DEFAULT_LANGUAGE;
};

// Set language in localStorage
export const setLanguage = (languageCode) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', languageCode);
    // Dispatch a custom event to notify components about language change
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: languageCode }));
  }
};

// Get translation for a key
export const t = (key, fallback = key, languageCode = null) => {
  const currentLanguage = languageCode || getLanguage();
  const translation = translations[currentLanguage];
  
  if (!translation) {
    return fallback;
  }
  
  // Handle nested keys (e.g., "homepage.title")
  const keys = key.split('.');
  let value = translation;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return fallback;
    }
  }
  
  return typeof value === 'string' ? value : fallback;
};

// Server-safe translation function that doesn't access localStorage
export const tServer = (key, fallback = key, languageCode = DEFAULT_LANGUAGE) => {
  const translation = translations[languageCode];
  
  if (!translation) {
    return fallback;
  }
  
  // Handle nested keys (e.g., "homepage.title")
  const keys = key.split('.');
  let value = translation;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return fallback;
    }
  }
  
  return typeof value === 'string' ? value : fallback;
};

// Custom hook for force updating components when language changes
export const useForceUpdate = () => {
  const [, setTick] = useState(0);
  const forceUpdate = () => setTick(tick => tick + 1);
  
  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate();
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('languageChanged', handleLanguageChange);
      return () => window.removeEventListener('languageChanged', handleLanguageChange);
    }
  }, []);
  
  return forceUpdate;
};

// Get available languages
export const getAvailableLanguages = () => {
  return [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  ];
};

// Check if a language is supported
export const isLanguageSupported = (languageCode) => {
  return languageCode in translations;
};

// Format number according to language
export const formatNumber = (number, languageCode = null) => {
  const lang = languageCode || getLanguage();
  
  // Use appropriate locale for number formatting
  const localeMap = {
    en: 'en-US',
    hi: 'hi-IN',
    kn: 'kn-IN',
  };
  
  const locale = localeMap[lang] || 'en-US';
  
  try {
    return new Intl.NumberFormat(locale).format(number);
  } catch (error) {
    return number.toString();
  }
};

// Format date according to language
export const formatDate = (date, options = {}, languageCode = null) => {
  const lang = languageCode || getLanguage();
  
  const localeMap = {
    en: 'en-US',
    hi: 'hi-IN',
    kn: 'kn-IN',
  };
  
  const locale = localeMap[lang] || 'en-US';
  
  try {
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  } catch (error) {
    return date.toString();
  }
};

export default {
  getLanguage,
  setLanguage,
  t,
  tServer,
  useForceUpdate,
  getAvailableLanguages,
  isLanguageSupported,
  formatNumber,
  formatDate,
};
