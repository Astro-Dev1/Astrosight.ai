// Simple i18n implementation for AstroSight
import { useState, useCallback } from 'react';
import enTranslations from './en.json';
import hiTranslations from './hi.json';
import knTranslations from './kn.json';

const translations = {
  en: enTranslations,
  hi: hiTranslations,
  kn: knTranslations,
};

let currentLanguage = 'en';

// Set language
export const setLanguage = (language) => {
  if (translations[language]) {
    currentLanguage = language;
    localStorage.setItem('selectedLanguage', language);
    // Dispatch event for components to react to language change
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
  }
};

// Get current language
export const getLanguage = () => {
  return currentLanguage;
};

// Translation function
export const t = (key, defaultValue = key) => {
  try {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || defaultValue;
  } catch (error) {
    console.error('Translation error:', error);
    return defaultValue;
  }
};

// Force update hook for React components
export const useForceUpdate = () => {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick(tick => tick + 1);
  }, []);
  return update;
};

// Initialize language from localStorage
if (typeof window !== 'undefined') {
  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage = savedLanguage;
  }
}

export default {
  t,
  setLanguage,
  getLanguage,
  useForceUpdate,
};
